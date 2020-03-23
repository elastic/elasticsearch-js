// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { test } = require('tap')
const { Client } = require('../../../')
const { connection } = require('../../utils')

test('Search should have an additional documents property', async t => {
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {
        body: {
          hits: {
            hits: [
              { _source: { one: 'one' } },
              { _source: { two: 'two' } },
              { _source: { three: 'three' } }
            ]
          }
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const result = await client.helpers.search({
    index: 'test',
    body: { foo: 'bar' }
  })
  t.deepEqual(result, [
    { one: 'one' },
    { two: 'two' },
    { three: 'three' }
  ])
})
