// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { test } = require('tap')
const { URL } = require('url')
const lolex = require('lolex')
const workq = require('workq')
const { buildCluster } = require('../utils')
const { Client, events } = require('../../index')

/**
 * The aim of this test is to verify how the resurrect logic behaves
 * in a multi node situation.
 * The `buildCluster` utility can boot an arbitrary number
 * of nodes, that you can kill or spawn at your will.
 * The resurrect API can be tested with its callback
 * or by using the `resurrect` event (to handle automatically
 * triggered resurrections).
 */

test('Should execute the recurrect API with the ping strategy', t => {
  t.plan(8)

  const clock = lolex.install({ toFake: ['Date'] })
  const q = workq()

  buildCluster({ numberOfNodes: 2 }, cluster => {
    const client = new Client({
      nodes: [{
        url: new URL(cluster.nodes[Object.keys(cluster.nodes)[0]].url),
        id: 'node0'
      }, {
        url: new URL(cluster.nodes[Object.keys(cluster.nodes)[1]].url),
        id: 'node1'
      }],
      maxRetries: 0
    })

    client.on(events.RESURRECT, (err, meta) => {
      t.error(err)
      t.strictEqual(meta.strategy, 'ping')
      t.false(meta.isAlive)
      t.strictEqual(meta.connection.id, 'node0')
      t.strictEqual(meta.name, 'elasticsearch-js')
      t.deepEqual(meta.request, { id: 2 })
    })

    q.add((q, done) => {
      cluster.kill('node0')
      setTimeout(done, 100)
    })

    q.add((q, done) => {
      client.info((err, result) => {
        t.ok(err)
        done()
      })
    })

    q.add((q, done) => {
      clock.tick(1000 * 61)
      client.info((err, result) => {
        t.error(err)
        done()
      })
    })

    t.teardown(() => {
      clock.uninstall()
      cluster.shutdown()
    })
  })
})

test('Resurrect a node and handle 502/3/4 status code', t => {
  t.plan(15)

  const clock = lolex.install({ toFake: ['Date'] })
  const q = workq()

  var count = 0
  function handler (req, res) {
    res.statusCode = count++ < 2 ? 502 : 200
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildCluster({ handler, numberOfNodes: 2 }, ({ nodes, shutdown }) => {
    const client = new Client({
      nodes: [{
        url: new URL(nodes[Object.keys(nodes)[0]].url),
        id: 'node0'
      }, {
        url: new URL(nodes[Object.keys(nodes)[1]].url),
        id: 'node1'
      }],
      maxRetries: 0
    })

    var idCount = 2
    client.on(events.RESURRECT, (err, meta) => {
      t.error(err)
      t.strictEqual(meta.strategy, 'ping')
      t.strictEqual(meta.connection.id, 'node0')
      t.strictEqual(meta.name, 'elasticsearch-js')
      t.deepEqual(meta.request, { id: idCount++ })
      if (count < 4) {
        t.false(meta.isAlive)
      } else {
        t.true(meta.isAlive)
      }
    })

    q.add((q, done) => {
      client.info((err, result) => {
        t.ok(err)
        done()
      })
    })

    q.add((q, done) => {
      clock.tick(1000 * 61)
      client.info((err, result) => {
        t.error(err)
        done()
      })
    })

    q.add((q, done) => {
      clock.tick(1000 * 10 * 60)
      client.info((err, result) => {
        t.error(err)
        done()
      })
    })

    t.teardown(() => {
      clock.uninstall()
      shutdown()
    })
  })
})

test('Should execute the recurrect API with the optimistic strategy', t => {
  t.plan(8)

  const clock = lolex.install({ toFake: ['Date'] })
  const q = workq()

  buildCluster({ numberOfNodes: 2 }, cluster => {
    const client = new Client({
      nodes: [{
        url: new URL(cluster.nodes[Object.keys(cluster.nodes)[0]].url),
        id: 'node0'
      }, {
        url: new URL(cluster.nodes[Object.keys(cluster.nodes)[1]].url),
        id: 'node1'
      }],
      maxRetries: 0,
      resurrectStrategy: 'optimistic'
    })

    client.on(events.RESURRECT, (err, meta) => {
      t.error(err)
      t.strictEqual(meta.strategy, 'optimistic')
      t.true(meta.isAlive)
      t.strictEqual(meta.connection.id, 'node0')
      t.strictEqual(meta.name, 'elasticsearch-js')
      t.deepEqual(meta.request, { id: 2 })
    })

    q.add((q, done) => {
      cluster.kill('node0')
      setTimeout(done, 100)
    })

    q.add((q, done) => {
      client.info((err, result) => {
        t.ok(err)
        done()
      })
    })

    q.add((q, done) => {
      clock.tick(1000 * 61)
      client.info((err, result) => {
        t.error(err)
        done()
      })
    })

    t.teardown(() => {
      clock.uninstall()
      cluster.shutdown()
    })
  })
})
