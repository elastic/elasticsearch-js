/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'tap'
import { Client } from '../../../'
import { connection } from '../../utils'

test('Search should have an additional documents property', async t => {
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      t.equal(params.querystring, 'filter_path=hits.hits._id%2Chits.hits._source')
      return {
        body: {
          hits: {
            hits: [
              { _id: '1', _source: { one: 'one' } },
              { _id: '2', _source: { two: 'two' } },
              { _id: '3', _source: { three: 'three' } }
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
    query: { match_all: {} }
  })
  t.same(result, [
    { _id: '1', one: 'one' },
    { _id: '2', two: 'two' },
    { _id: '3', three: 'three' }
  ])
})

test('kGetHits fallback', async t => {
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      t.equal(params.querystring, 'filter_path=hits.hits._id%2Chits.hits._source')
      return { body: {} }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const result = await client.helpers.search({
    index: 'test',
    query: { match_all: {} }
  })
  t.same(result, [])
})

test('Merge filter paths (snake_case)', async t => {
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      t.equal(params.querystring, 'filter_path=foo%2Chits.hits._id%2Chits.hits._source')
      return {
        body: {
          hits: {
            hits: [
              { _id: '1', _source: { one: 'one' } },
              { _id: '2', _source: { two: 'two' } },
              { _id: '3', _source: { three: 'three' } }
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
    filter_path: 'foo',
    query: { match_all: {} }
  })
  t.same(result, [
    { _id: '1', one: 'one' },
    { _id: '2', two: 'two' },
    { _id: '3', three: 'three' }
  ])
})
