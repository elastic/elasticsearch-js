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
const { Client, errors } = require('../../../')
const { connection } = require('../../utils')
let clientVersion = require('../../../package.json').version
if (clientVersion.includes('-')) {
  clientVersion = clientVersion.slice(0, clientVersion.indexOf('-')) + 'p'
}
const nodeVersion = process.versions.node

test('Scroll search', async t => {
  let count = 0
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      t.match(params.headers, {
        'x-elastic-client-meta': `es=${clientVersion},js=${nodeVersion},t=${clientVersion},hc=${nodeVersion},h=s`
      })

      count += 1
      if (params.method === 'POST') {
        t.strictEqual(params.querystring, 'scroll=1m')
      }
      if (count === 4) {
        // final automated clear
        t.strictEqual(params.method, 'DELETE')
      }
      return {
        body: {
          _scroll_id: 'id',
          count,
          hits: {
            hits: count === 3
              ? []
              : [
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

  const scrollSearch = client.helpers.scrollSearch({
    index: 'test',
    body: { foo: 'bar' }
  })

  for await (const result of scrollSearch) {
    t.strictEqual(result.body.count, count)
    t.strictEqual(result.body._scroll_id, 'id')
  }
})

test('Clear a scroll search', async t => {
  let count = 0
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      t.notMatch(params.headers, {
        'x-elastic-client-meta': `es=${clientVersion},js=${nodeVersion},t=${clientVersion},hc=${nodeVersion},h=s`
      })
      if (params.method === 'DELETE') {
        const body = JSON.parse(params.body)
        t.strictEqual(body.scroll_id, 'id')
      }
      return {
        body: {
          _scroll_id: count === 3 ? undefined : 'id',
          count,
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
    Connection: MockConnection,
    enableMetaHeader: false
  })

  const scrollSearch = client.helpers.scrollSearch({
    index: 'test',
    body: { foo: 'bar' }
  })

  for await (const result of scrollSearch) {
    if (count === 2) {
      t.fail('The scroll search should be cleared')
    }
    t.strictEqual(result.body.count, count)
    if (count === 1) {
      await result.clear()
    }
    count += 1
  }
})

test('Scroll search (retry)', async t => {
  let count = 0
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      count += 1
      if (count === 1) {
        return { body: {}, statusCode: 429 }
      }
      if (count === 5) {
        // final automated clear
        t.strictEqual(params.method, 'DELETE')
      }
      return {
        statusCode: 200,
        body: {
          _scroll_id: 'id',
          count,
          hits: {
            hits: count === 4
              ? []
              : [
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

  const scrollSearch = client.helpers.scrollSearch({
    index: 'test',
    body: { foo: 'bar' }
  }, {
    wait: 10
  })

  for await (const result of scrollSearch) {
    t.strictEqual(result.body.count, count)
    t.notStrictEqual(result.body.count, 1)
    t.strictEqual(result.body._scroll_id, 'id')
  }
})

test('Scroll search (retry throws and maxRetries)', async t => {
  const maxRetries = 5
  const expectedAttempts = maxRetries + 1
  let count = 0
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      count += 1
      return { body: {}, statusCode: 429 }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection,
    maxRetries
  })

  const scrollSearch = client.helpers.scrollSearch({
    index: 'test',
    body: { foo: 'bar' }
  }, {
    wait: 10,
    ignore: [404]
  })

  try {
    for await (const result of scrollSearch) { // eslint-disable-line
      t.fail('we should not be here')
    }
  } catch (err) {
    t.true(err instanceof errors.ResponseError)
    t.strictEqual(err.statusCode, 429)
    t.strictEqual(count, expectedAttempts)
  }
})

test('Scroll search (retry throws later)', async t => {
  const maxRetries = 5
  const expectedAttempts = maxRetries + 2
  let count = 0
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      count += 1
      // filter_path should not be added if is not already present
      t.strictEqual(params.querystring, 'scroll=1m')
      if (count > 1) {
        return { body: {}, statusCode: 429 }
      }
      return {
        statusCode: 200,
        body: {
          _scroll_id: 'id',
          count,
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
    Connection: MockConnection,
    maxRetries
  })

  const scrollSearch = client.helpers.scrollSearch({
    index: 'test',
    body: { foo: 'bar' }
  }, {
    wait: 10
  })

  try {
    for await (const result of scrollSearch) { // eslint-disable-line
      t.strictEqual(result.body.count, count)
    }
  } catch (err) {
    t.true(err instanceof errors.ResponseError)
    t.strictEqual(err.statusCode, 429)
    t.strictEqual(count, expectedAttempts)
  }
})

test('Scroll search documents', async t => {
  let count = 0
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      if (count === 0) {
        t.strictEqual(params.querystring, 'filter_path=hits.hits._source%2C_scroll_id&scroll=1m')
      } else {
        if (params.method !== 'DELETE') {
          t.strictEqual(params.querystring, 'scroll=1m')
          t.strictEqual(params.body, '{"scroll_id":"id"}')
        }
      }
      return {
        body: {
          _scroll_id: 'id',
          count,
          hits: {
            hits: count === 3
              ? []
              : [
                  { _source: { val: 1 * count } },
                  { _source: { val: 2 * count } },
                  { _source: { val: 3 * count } }
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

  const scrollSearch = client.helpers.scrollDocuments({
    index: 'test',
    body: { foo: 'bar' }
  })

  let n = 1
  for await (const hit of scrollSearch) {
    t.deepEqual(hit, { val: n * count })
    n += 1
    if (n === 4) {
      count += 1
      n = 1
    }
  }
})

test('Should not retry if maxRetries = 0', async t => {
  const maxRetries = 0
  const expectedAttempts = 1
  let count = 0
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      count += 1
      return { body: {}, statusCode: 429 }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection,
    maxRetries
  })

  const scrollSearch = client.helpers.scrollSearch({
    index: 'test',
    body: { foo: 'bar' }
  }, {
    wait: 10,
    ignore: [404]
  })

  try {
    for await (const result of scrollSearch) { // eslint-disable-line
      t.fail('we should not be here')
    }
  } catch (err) {
    t.true(err instanceof errors.ResponseError)
    t.strictEqual(err.statusCode, 429)
    t.strictEqual(count, expectedAttempts)
  }
})

test('Fix querystring for scroll search', async t => {
  let count = 0
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      if (count === 0) {
        t.strictEqual(params.querystring, 'size=1&scroll=1m')
      } else {
        if (params.method !== 'DELETE') {
          t.strictEqual(params.querystring, 'scroll=1m')
        }
      }
      return {
        body: {
          _scroll_id: 'id',
          hits: {
            hits: count === 3
              ? []
              : [
                  { _source: { val: count } }
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

  const scrollSearch = client.helpers.scrollSearch({
    index: 'test',
    size: 1,
    body: { foo: 'bar' }
  })

  for await (const response of scrollSearch) {
    t.strictEqual(response.body.hits.hits.length, 1)
    count += 1
  }
})
