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
import { connection } from '../utils'
import { Client } from '../..'
import * as T from '../../lib/api/types'

test('Api without body key and top level body', async t => {
  t.plan(2)

  const Connection = connection.buildMockConnection({
    onRequest (opts) {
      // @ts-expect-error
      t.same(JSON.parse(opts.body), { query: { match_all: {} } })
      return {
        statusCode: 200,
        body: { took: 42 }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection
  })

  const response = await client.search({
    index: 'test',
    allow_no_indices: true,
    query: { match_all: {} }
  })

  t.equal(response.took, 42)
})

test('Api with body key and top level body', async t => {
  t.plan(2)

  const Connection = connection.buildMockConnection({
    onRequest (opts) {
      // @ts-expect-error
      t.same(JSON.parse(opts.body), { query: { match_all: {} } })
      return {
        statusCode: 200,
        body: { took: 42 }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection
  })

  const response = await client.search({
    index: 'test',
    allow_no_indices: true,
    body: {
      query: { match_all: {} }
    }
  })

  t.equal(response.took, 42)
})

test('Api without body key and keyed body', async t => {
  t.plan(2)

  const Connection = connection.buildMockConnection({
    onRequest (opts) {
      // @ts-expect-error
      t.same(JSON.parse(opts.body), { foo: 'bar' })
      return {
        statusCode: 200,
        body: { result: 'created' }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection
  })

  const response = await client.create({
    index: 'test',
    id: '1',
    document: { foo: 'bar' }
  })

  t.equal(response.result, 'created')
})

test('Api with body key and keyed body', async t => {
  t.plan(2)

  const Connection = connection.buildMockConnection({
    onRequest (opts) {
      // @ts-expect-error
      t.same(JSON.parse(opts.body), { foo: 'bar' })
      return {
        statusCode: 200,
        body: { result: 'created' }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection
  })

  const response = await client.create({
    index: 'test',
    id: '1',
    body: { foo: 'bar' }
  })

  t.equal(response.result, 'created')
})

test('Using the body key should not mutate the body', async t => {
  t.plan(2)

  const Connection = connection.buildMockConnection({
    onRequest (opts) {
      // @ts-expect-error
      t.same(JSON.parse(opts.body), { query: { match_all: {} }, sort: 'foo' })
      return {
        statusCode: 200,
        body: { took: 42 }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection
  })

  const body = { query: { match_all: {} } }
  await client.search({
    index: 'test',
    sort: 'foo',
    body
  })

  t.same(body, { query: { match_all: {} } })
})

test('Using the body key with a string value', async t => {
  t.plan(2)

  const Connection = connection.buildMockConnection({
    onRequest (opts) {
      // @ts-expect-error
      t.same(JSON.parse(opts.body), { query: { match_all: {} } })
      return {
        statusCode: 200,
        body: { took: 42 }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection
  })

  try {
    const body = { query: { match_all: {} } }
    await client.search({
      index: 'test',
      // @ts-expect-error
      body: JSON.stringify(body)
    })
    t.pass('ok!')
  } catch (err: any) {
    t.fail(err)
  }
})

test('With generic document', async t => {
  t.plan(1)

  interface Doc {
    foo: string
  }

  const Connection = connection.buildMockConnection({
    onRequest (opts) {
      return {
        statusCode: 200,
        body: {
          took: 42,
          hits: {
            hits: [{
              _source: { foo: 'bar' }
            }]
          },
          aggregations: {
            unique: {
              buckets: [{ key: 'bar' }]
            }
          }
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection
  })

  const response = await client.search<Doc>({
    index: 'test',
    allow_no_indices: true,
    query: { match_all: {} },
    aggregations: {
      unique: {
        terms: {
          field: 'foo'
        }
      }
    }
  })

  t.equal(response.hits.hits[0]._source?.foo, 'bar')
})

test('With generic document and aggregation', async t => {
  t.plan(2)

  interface Doc {
    foo: string
  }

  interface Aggregations {
    unique: T.AggregationsTermsAggregateBase<{ key: string }>
  }

  const Connection = connection.buildMockConnection({
    onRequest (opts) {
      return {
        statusCode: 200,
        body: {
          took: 42,
          hits: {
            hits: [{
              _source: { foo: 'bar' }
            }]
          },
          aggregations: {
            unique: {
              buckets: [{ key: 'bar' }]
            }
          }
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection
  })

  const response = await client.search<Doc, Aggregations>({
    index: 'test',
    allow_no_indices: true,
    query: { match_all: {} },
    aggregations: {
      unique: {
        terms: {
          field: 'foo'
        }
      }
    }
  })

  t.equal(response.hits.hits[0]._source?.foo, 'bar')
  t.ok(Array.isArray(response.aggregations?.unique.buckets))
})

