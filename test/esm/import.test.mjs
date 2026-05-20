/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'tap'
import { tableFromJSON, RecordBatchStreamWriter } from 'apache-arrow'
import {
  BaseConnection,
  BaseConnectionPool,
  Client,
  CloudConnectionPool,
  ClusterConnectionPool,
  Diagnostic,
  HttpConnection,
  Serializer,
  SniffingTransport,
  Transport,
  UndiciConnection,
  WeightedConnectionPool,
  errors,
  events,
  estypes
} from '../../esm/index.js'

test('ESM imports work correctly', t => {
  t.plan(5)
  t.equal(typeof Client, 'function', 'Client should be a function')
  t.equal(typeof errors, 'object', 'errors should be an object')
  t.equal(typeof SniffingTransport, 'function', 'SniffingTransport should be a function')
  t.equal(typeof estypes, 'object', 'estypes should be an object')

  const client = new Client({
    node: 'http://localhost:9200',
    auth: {
      username: 'elastic',
      password: 'changeme'
    }
  })

  t.ok(client, 'Client should instantiate successfully')
})

test('ESM imports from @elastic/transport should work correctly', t => {
  t.plan(11)
  t.equal(typeof Transport, 'function', 'Transport should be a function')
  t.equal(typeof BaseConnection, 'function', 'BaseConnection should be a function')
  t.equal(typeof BaseConnectionPool, 'function', 'BaseConnectionPool should be a function')
  t.equal(typeof CloudConnectionPool, 'function', 'CloudConnectionPool should be a function')
  t.equal(typeof ClusterConnectionPool, 'function', 'ClusterConnectionPool should be a function')
  t.equal(typeof Diagnostic, 'function', 'Diagnostic should be a function')
  t.equal(typeof HttpConnection, 'function', 'HttpConnection should be a function')
  t.equal(typeof Serializer, 'function', 'Serializer should be a function')
  t.equal(typeof UndiciConnection, 'function', 'UndiciConnection should be a function')
  t.equal(typeof WeightedConnectionPool, 'function', 'WeightedConnectionPool should be a function')
  t.equal(typeof events, 'object', 'events should be an object')
})

test('Apache Arrow loads correctly via ESM helpers', async t => {
  const testRecords = [
    { amount: 4.9 },
    { amount: 8.2 },
    { amount: 15.5 },
  ]

  const arrowTable = tableFromJSON(testRecords)
  const rawData = await RecordBatchStreamWriter.writeAll(arrowTable).toUint8Array()

  class MockConnection extends BaseConnection {
    async request (_params, _options) {
      return {
        body: Buffer.from(rawData),
        statusCode: 200,
        headers: {
          'content-type': 'application/vnd.elasticsearch+arrow+stream',
          'x-elastic-product': 'Elasticsearch',
          'content-length': String(rawData.byteLength),
        },
      }
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection,
  })

  t.test('toArrowTable returns an Arrow Table instance', async t => {
    const result = await client.helpers.esql({ query: 'FROM test' }).toArrowTable()
    t.equal(result.constructor.name, 'Table', 'result should be an Arrow Table')
    t.equal(result.numRows, testRecords.length, 'table should have correct number of rows')
    t.end()
  })

  t.test('toArrowReader returns a readable Arrow stream', async t => {
    const reader = await client.helpers.esql({ query: 'FROM test' }).toArrowReader()
    t.ok(reader.isStream(), 'result should be an Arrow stream reader')
    t.end()
  })

  t.end()
})
