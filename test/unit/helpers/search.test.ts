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

