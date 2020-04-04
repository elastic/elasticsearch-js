// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

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
  t.plan(13)

  buildCluster(({ nodes, shutdown, kill }) => {
    const client = new Client({
      node: nodes[Object.keys(nodes)[0]].url,
      sniffInterval: 50
    })

    // Should be 1 because SNIFF wasn't run yet
    t.strictEqual(client.connectionPool.size, 1)

    // SNIFF is triggered by API calls
    // See Transport.js => makeRequest() => getConnection() => sniff()
    let run = 0
    let expectedSize
    client.on(events.SNIFF, (err, result) => {
      run += 1
      if (run > 3) { return }

      t.error(err)
      const { reason, hosts } = result.meta.sniff
      t.strictEqual(reason, Transport.sniffReasons.SNIFF_INTERVAL)

      // Test assumptions about connectionPool and hosts
      t.strictEqual(client.connectionPool.size, expectedSize)
      t.strictEqual(hosts.length, expectedSize)

      if (run === 3) {
        return // at this point, 'node1' and 'node2' should be killed
      }

      // Should kill the node and run SNIFF again
      // Should get here 2x, to kill 'node1' and 'node2'
      kill(`node${run}`, () => {
        setTimeout(() => {
          expectedSize = 4 - run // from 4 to 3, later 2
          client.info()
        }, 60) // wait > sniffInterval
      })
    })

    // SNIFF should be run only when:
    // 1) delay is greater than sniffInterval
    // 2) delay is greater than time of last sniff + sniffInterval
    setTimeout(() => client.info(), 20)
    setTimeout(() => client.info(), 30)
    setTimeout(() => {
      expectedSize = 4
      client.info()
    }, 60) // meets 1) and 2)
    setTimeout(() => client.info(), 70)
    setTimeout(() => client.info(), 80)

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
          callback(new errors.ConnectionError('kaboom'), null)
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
