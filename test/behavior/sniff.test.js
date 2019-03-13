/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict'

const { test } = require('tap')
const { URL } = require('url')
const { buildCluster } = require('../utils')
const { Client, Connection, Transport, events, errors } = require('../../index')

/**
 * The aim of this test is to verify how the sniffer behaves
 * in a multi node situation.
 * The `buildCluster` utility can boot an arbitrary number
 * of nodes, that you can kill or spawn at your will.
 * The sniffer component can be tested with its callback
 * or by using the `sniff` event (to handle automatically
 * triggered sniff).
 */

test('Should update the connection pool', t => {
  t.plan(10)

  buildCluster(({ nodes, shutdown }) => {
    const client = new Client({
      node: nodes[Object.keys(nodes)[0]].url
    })
    t.strictEqual(client.connectionPool.connections.size, 1)

    client.on(events.SNIFF, (err, request) => {
      t.error(err)
      t.strictEqual(
        request.meta.sniff.reason,
        Transport.sniffReasons.DEFAULT
      )
    })

    // run the sniffer
    client.transport.sniff((err, hosts) => {
      t.error(err)
      t.strictEqual(hosts.length, 4)

      const ids = Object.keys(nodes)
      for (var i = 0; i < hosts.length; i++) {
        const id = ids[i]
        // the first node will be an update of the existing one
        if (id === 'node0') {
          t.deepEqual(hosts[i], {
            url: new URL(nodes[id].url),
            id: id,
            roles: {
              master: true,
              data: true,
              ingest: true,
              ml: false
            }
          })
        } else {
          t.deepEqual(hosts[i], {
            url: new URL(nodes[id].url),
            id: id,
            roles: {
              master: true,
              data: true,
              ingest: true,
              ml: false
            },
            ssl: null,
            agent: null
          })
        }
      }

      t.strictEqual(client.connectionPool.connections.size, 4)
    })
    t.teardown(shutdown)
  })
})

test('Sniff interval', t => {
  t.plan(10)

  buildCluster(({ nodes, shutdown, kill }) => {
    const client = new Client({
      node: nodes[Object.keys(nodes)[0]].url,
      sniffInterval: 50
    })

    // this event will be triggered by api calls
    client.on(events.SNIFF, (err, request) => {
      t.error(err)
      const { hosts, reason } = request.meta.sniff
      t.strictEqual(
        client.connectionPool.connections.size,
        hosts.length
      )
      t.strictEqual(reason, Transport.sniffReasons.SNIFF_INTERVAL)
    })

    t.strictEqual(client.connectionPool.connections.size, 1)
    setTimeout(() => client.info(t.error), 60)

    setTimeout(() => {
      // let's kill a node
      kill('node1')
      client.info(t.error)
    }, 150)

    setTimeout(() => {
      t.strictEqual(client.connectionPool.connections.size, 3)
    }, 200)

    t.teardown(shutdown)
  })
})

test('Sniff on start', t => {
  t.plan(4)

  buildCluster(({ nodes, shutdown, kill }) => {
    const client = new Client({
      node: nodes[Object.keys(nodes)[0]].url,
      sniffOnStart: true
    })

    client.on(events.SNIFF, (err, request) => {
      t.error(err)
      const { hosts, reason } = request.meta.sniff
      t.strictEqual(
        client.connectionPool.connections.size,
        hosts.length
      )
      t.strictEqual(reason, Transport.sniffReasons.SNIFF_ON_START)
    })

    t.strictEqual(client.connectionPool.connections.size, 1)
    t.teardown(shutdown)
  })
})

test('Should not close living connections', t => {
  t.plan(3)

  buildCluster(({ nodes, shutdown, kill }) => {
    class MyConnection extends Connection {
      close () {
        t.fail('Should not be called')
      }
    }

    const client = new Client({
      node: {
        url: new URL(nodes[Object.keys(nodes)[0]].url),
        id: 'node1'
      },
      Connection: MyConnection
    })

    t.strictEqual(client.connectionPool.connections.size, 1)
    client.transport.sniff((err, hosts) => {
      t.error(err)
      t.strictEqual(
        client.connectionPool.connections.size,
        hosts.length
      )
    })

    t.teardown(shutdown)
  })
})

test('Sniff on connection fault', t => {
  t.plan(5)

  buildCluster(({ nodes, shutdown, kill }) => {
    class MyConnection extends Connection {
      request (params, callback) {
        if (this.id === 'http://localhost:9200/') {
          callback(new Error('kaboom'), null)
          return {}
        } else {
          return super.request(params, callback)
        }
      }
    }

    const client = new Client({
      nodes: [
        'http://localhost:9200',
        nodes[Object.keys(nodes)[0]].url
      ],
      maxRetries: 0,
      sniffOnConnectionFault: true,
      Connection: MyConnection
    })

    t.strictEqual(client.connectionPool.connections.size, 2)
    // this event will be triggered by the connection fault
    client.on(events.SNIFF, (err, request) => {
      t.error(err)
      const { hosts, reason } = request.meta.sniff
      t.strictEqual(
        client.connectionPool.connections.size,
        hosts.length
      )
      t.strictEqual(reason, Transport.sniffReasons.SNIFF_ON_CONNECTION_FAULT)
    })

    client.info((err, result) => {
      t.ok(err instanceof errors.ConnectionError)
    })

    t.teardown(shutdown)
  })
})
