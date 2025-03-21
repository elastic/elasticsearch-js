/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'tap'
import { connection } from '../utils'
import { Client } from '../..'
import * as T from '../../lib/api/types'

test('Api with top level body', async t => {
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

test('Api with keyed body', async t => {
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

test('With generic document', async t => {
  t.plan(1)

  interface Doc {
    foo: string
  }

  const Connection = connection.buildMockConnection({
    onRequest (_opts) {
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

