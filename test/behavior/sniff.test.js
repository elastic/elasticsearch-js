// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { test } = require('tap')
const { URL } = require('url')
const { buildCluster } = require('../utils')
const { Client, Connection, Transport, events, errors } = require('../../index')

/**
 * The aims to verify the dead connection has been marked correctly.
 * Dead connection might be detected after the connectionPool has been updated.
 * 1. ES Client sends requests by one node in the given node list
 * 2. ES Client sniffs by using another connection connected to another node
 * 3. 1st node return internal error
 * 4. Sniff function returns the updated nodes without the problematic node (1st node)
 * 5. Search request fails
 *
 * The dead connection has already been removed in sniff result, we MUST not mark it again
  */

test('Should mark the dead connections', t => {
  t.plan(7)

  buildCluster({ clusterPartiallySeparated: true }, ({ nodes, shutdown, kill, spawn }) => {
    const client = new Client({
      node: nodes[Object.keys(nodes)[0]].url,
      sniffOnStart: false,
      sniffOnConnectionFault: false,
      sniffInterval: false,
      maxRetries: 0 // should not retry in this test case
    })

    client.transport.sniff((err, hosts) => {
      t.error(err)
      t.strictEqual(hosts.length, 3)
      t.strictEqual(client.connectionPool.size, 3)

      client.search({
        index: 'err-index',
        body: { foo: 'bar' }
      }, (err, result) => {
        t.ok(err instanceof errors.ResponseError)
        t.strictEqual(result.statusCode, 502)
      })
    })

    client.search({
      index: 'err-index',
      body: { foo: 'bar' }
    }, (err, result) => {
      t.ok(err instanceof errors.ResponseError)
      t.strictEqual(result.statusCode, 502)
    })

    t.teardown(shutdown)
  })
})

/**
 * The aims to verify the following situation.
 * 1. ES Client sends requests with the node option provided in the client initialization
 * 2. The responses return errors before sniffing the cluster
 * 3. The client sniffs the cluster and updates the connection pool
 * 4. Client requests again
 */

test('Should update the connection pool when # of dead connections > 1', t => {
  t.plan(8)

  buildCluster(({ nodes, shutdown }) => {
    const client = new Client({
      node: Object.keys(nodes).map(nodeid => nodes[nodeid].url),
      sniffOnStart: false,
      sniffOnConnectionFault: false,
      sniffInterval: false,
      maxRetries: 0 // should not retry in this test case
    })

    const requested = new Promise((resolve, reject) => {
      const CLIENT_REQUESTS_COUNT = 2

      let count = CLIENT_REQUESTS_COUNT

      for (let i = 0; i < CLIENT_REQUESTS_COUNT; ++i) {
        client.search({
          index: 'err-index',
          body: { foo: 'bar' }
        }, (err, result) => {
          t.ok(err instanceof errors.ResponseError)
          t.strictEqual(result.statusCode, 502)
          if (--count === 0) {
            resolve('error response received before sniffing')
          }
        })
      }
    })

    // run the sniffer after the previous requests return
    requested.then(value => {
      client.transport.sniff((err, hosts) => {
        t.error(err)
        t.strictEqual(hosts.length, 4)
        t.strictEqual(client.connectionPool.size, 4)

        // client requests again
        client.search({
          index: 'ok-index',
          body: { foo: 'bar' }
        }, (err, result) => {
          t.error(err)
        })
      })
    })

    t.teardown(shutdown)
  })
})

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
    t.strictEqual(client.connectionPool.size, 1)

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

      t.strictEqual(client.connectionPool.size, 4)
    })
    t.teardown(shutdown)
  })
})

test('Should handle hostnames in publish_address', t => {
  t.plan(10)

  buildCluster({ hostPublishAddress: true }, ({ nodes, shutdown }) => {
    const client = new Client({
      node: nodes[Object.keys(nodes)[0]].url
    })
    t.strictEqual(client.connectionPool.size, 1)

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

      for (var i = 0; i < hosts.length; i++) {
        // the first node will be an update of the existing one
        t.strictEqual(hosts[i].url.hostname, 'localhost')
      }

      t.strictEqual(client.connectionPool.size, 4)
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
        client.connectionPool.size,
        hosts.length
      )
      t.strictEqual(reason, Transport.sniffReasons.SNIFF_INTERVAL)
    })

    t.strictEqual(client.connectionPool.size, 1)
    setTimeout(() => client.info(t.error), 60)

    setTimeout(() => {
      // let's kill a node
      kill('node1')
      client.info(t.error)
    }, 150)

    setTimeout(() => {
      t.strictEqual(client.connectionPool.size, 3)
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
        client.connectionPool.size,
        hosts.length
      )
      t.strictEqual(reason, Transport.sniffReasons.SNIFF_ON_START)
    })

    t.strictEqual(client.connectionPool.size, 1)
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

    t.strictEqual(client.connectionPool.size, 1)
    client.transport.sniff((err, hosts) => {
      t.error(err)
      t.strictEqual(
        client.connectionPool.size,
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

    t.strictEqual(client.connectionPool.size, 2)
    // this event will be triggered by the connection fault
    client.on(events.SNIFF, (err, request) => {
      t.error(err)
      const { hosts, reason } = request.meta.sniff
      t.strictEqual(
        client.connectionPool.size,
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
