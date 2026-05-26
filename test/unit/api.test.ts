/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Readable } from 'node:stream'
import { test } from 'tap'
import { connection } from '../utils'
import { Client } from '../..'
import { Transport } from '@elastic/transport'
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

test('Api request metadata', t => {
  t.test('name', async t => {
    class TestTransport extends Transport {
      // @ts-expect-error
      async request (params, options) {
        t.equal(params.meta.name, 'synonyms.put_synonym_rule')
        return super.request(params, options)
      }
    }

    const Connection = connection.buildMockConnection({
      onRequest () {
        return {
          statusCode: 200,
          body: { took: 42 }
        }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      // @ts-expect-error
      Transport: TestTransport,
      Connection
    })
    // @ts-expect-error
    await client.synonyms.putSynonymRule({ set_id: 'foo', rule_id: 'bar' })
  })

  t.test('pathParts', async t => {
    class TestTransport extends Transport {
      // @ts-expect-error
      async request (params, options) {
        t.strictSame(params.meta.pathParts, {
          set_id: 'foo',
          rule_id: 'bar'
        })
        return super.request(params, options)
      }
    }

    const Connection = connection.buildMockConnection({
      onRequest () {
        return {
          statusCode: 200,
          body: { took: 42 }
        }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      // @ts-expect-error
      Transport: TestTransport,
      Connection
    })
    // @ts-expect-error
    await client.synonyms.putSynonymRule({ set_id: 'foo', rule_id: 'bar' })
  })

  t.test('acceptedParams', async t => {
    class TestTransport extends Transport {
      // @ts-expect-error
      async request (params, options) {
        t.strictSame(params.meta.acceptedParams, {
          path: ['set_id', 'rule_id'],
          body: ['synonyms'],
          query: ['refresh'],
        })
        return super.request(params, options)
      }
    }

    const Connection = connection.buildMockConnection({
      onRequest () {
        return {
          statusCode: 200,
          body: { took: 42 }
        }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      // @ts-expect-error
      Transport: TestTransport,
      Connection
    })
    // @ts-expect-error
    await client.synonyms.putSynonymRule({ set_id: 'foo', rule_id: 'bar' })
  })

  t.end()
})

test('bulk operations validation', t => {
  const Connection = connection.buildMockConnection({
    onRequest (_opts) {
      return { statusCode: 200, body: { took: 1, errors: false, items: [] } }
    }
  })
  const client = new Client({ node: 'http://localhost:9200', Connection })

  t.test('passes with a non-empty array', async t => {
    const result = await client.bulk({
      operations: [{ index: { _index: 'test' } }, { foo: 'bar' }]
    })
    t.equal(result.errors, false)
  })

  t.test('passes with a non-empty NDJSON string', async t => {
    // @ts-expect-error - string is a valid bulk body but not yet reflected in types
    const result = await client.bulk({
      operations: '{"index":{"_index":"test"}}\n{"foo":"bar"}\n'
    })
    t.equal(result.errors, false)
  })

  t.test('passes with a non-empty Buffer', async t => {
    // @ts-expect-error - Buffer is a valid bulk body but not yet reflected in types
    const result = await client.bulk({
      operations: Buffer.from('{"index":{"_index":"test"}}\n{"foo":"bar"}\n')
    })
    t.equal(result.errors, false)
  })

  t.test('passes with a Readable stream', async t => {
    const stream = Readable.from(['{"index":{"_index":"test"}}\n{"foo":"bar"}\n'])
    // @ts-expect-error - Readable is a valid bulk body but not yet reflected in types
    const result = await client.bulk({
      operations: stream
    })
    t.equal(result.errors, false)
  })

  t.end()
})
