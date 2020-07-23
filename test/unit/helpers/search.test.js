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
const { Client } = require('../../../')
const { connection } = require('../../utils')

test('Search should have an additional documents property', async t => {
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      t.strictEqual(params.querystring, 'filter_path=hits.hits._source')
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

test('kGetHits fallback', async t => {
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      t.strictEqual(params.querystring, 'filter_path=hits.hits._source')
      return { body: {} }
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
  t.deepEqual(result, [])
})

test('Merge filter paths (snake_case)', async t => {
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      t.strictEqual(params.querystring, 'filter_path=foo%2Chits.hits._source')
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
    filter_path: 'foo',
    body: { foo: 'bar' }
  })
  t.deepEqual(result, [
    { one: 'one' },
    { two: 'two' },
    { three: 'three' }
  ])
})

test('Merge filter paths (camelCase)', async t => {
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      t.strictEqual(params.querystring, 'filter_path=foo%2Chits.hits._source')
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
    filterPath: 'foo',
    body: { foo: 'bar' }
  })
  t.deepEqual(result, [
    { one: 'one' },
    { two: 'two' },
    { three: 'three' }
  ])
})
