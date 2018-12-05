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

    client.on(events.SNIFF, (err, { reason }) => {
      t.error(err)
      t.strictEqual(reason, Transport.sniffReasons.DEFAULT)
    })

    // run the sniffer
    client.transport.sniff((err, hosts) => {
      t.error(err)
      t.strictEqual(hosts.length, 4)

      const ids = Object.keys(nodes)
      for (var i = 0; i < hosts.length; i++) {
        const id = ids[i]
        t.deepEqual(hosts[i], {
          url: new URL(nodes[id].url),
          id: id,
          roles: {
            master: true,
            data: true,
            ingest: true
          },
          ssl: null,
          agent: null
        })
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
    client.on(events.SNIFF, (err, { hosts, reason }) => {
      t.error(err)
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

  buildCluster(({ nodes, shutdown }) => {
    const client = new Client({
      nodes: [
        // TODO: this url may cause a flaky test
        'http://localhost:9200',
        nodes[Object.keys(nodes)[0]].url
      ],
      maxRetries: 0,
      sniffOnConnectionFault: true
    })
    t.strictEqual(client.connectionPool.connections.size, 2)

    // this event will be triggered by the connection fault
    client.on(events.SNIFF, (err, { hosts, reason }) => {
      t.error(err)
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
