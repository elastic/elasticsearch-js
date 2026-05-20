/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'tap'
import { connection } from '../utils'
import { Client, SniffingTransport } from '../..'

test('SniffingTransport', t => {
  t.test('sniff - success', t => {
    t.plan(3)

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: connection.MockConnectionSniff
    })

    const transport = client.transport as SniffingTransport
    transport.diagnostic.once('sniff', (err, result) => {
      t.equal(err, null)
      t.ok(result != null)
      t.ok(result?.meta.sniff.hosts.length > 0)
    })

    transport.sniff({ reason: 'test' })
  })

  t.test('sniff - already sniffing, exits early', t => {
    const client = new Client({
      node: 'http://localhost:9200',
      Connection: connection.MockConnectionSniff
    })

    const transport = client.transport as SniffingTransport
    transport.isSniffing = true

    let sniffEventFired = false
    transport.diagnostic.once('sniff', () => { sniffEventFired = true })
    transport.sniff({ reason: 'test' })

    t.equal(sniffEventFired, false, 'sniff diagnostic should not fire when already sniffing')
    t.equal(transport.isSniffing, true)
    t.end()
  })

  t.test('sniff - error', t => {
    t.plan(1)

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: connection.MockConnectionError
    })

    const transport = client.transport as SniffingTransport
    transport.diagnostic.once('sniff', (err) => {
      t.ok(err != null)
    })

    transport.sniff({ reason: 'test' })
  })

  t.end()
})
