/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const { createReadStream } = require('node:fs')
const { join } = require('node:path')
const split = require('split2')
const { test, beforeEach, afterEach } = require('tap')
const { waitCluster } = require('../../utils')
const { Client, errors } = require('../../../')

const INDEX = `test-helpers-${process.pid}`
const client = new Client({
  node: process.env.TEST_ES_SERVER || 'http://localhost:9200'
})

beforeEach(async () => {
  await waitCluster(client)
  await client.indices.create({ index: INDEX })
  const stream = createReadStream(join(__dirname, '..', '..', 'fixtures', 'stackoverflow.ndjson'))
  const result = await client.helpers.bulk({
    datasource: stream.pipe(split()),
    refreshOnCompletion: true,
    onDocument (doc) {
      return {
        index: { _index: INDEX }
      }
    }
  })
  if (result.failed > 0) {
    throw new Error('Failed bulk indexing docs')
  }
})

afterEach(async () => {
  await client.indices.delete({ index: INDEX }, { ignore: 404 })
})

test('Basic', t => {
  t.plan(4)
  const m = client.helpers.msearch({ operations: 1 })

  m.search(
    { index: INDEX },
    { query: { match: { title: 'javascript' } } },
    (err, result) => {
      t.error(err)
      t.equal(result.body.hits.total.value, 106)
    }
  )

  m.search(
    { index: INDEX },
    { query: { match: { title: 'ruby' } } },
    (err, result) => {
      t.error(err)
      t.equal(result.body.hits.total.value, 29)
    }
  )

  t.teardown(() => m.stop())
})

test('Bad request', t => {
  t.plan(3)
  const m = client.helpers.msearch({ operations: 1 })

  m.search(
    { index: INDEX },
    { query: { match: { title: 'javascript' } } },
    (err, result) => {
      t.error(err)
      t.equal(result.body.hits.total.value, 106)
    }
  )

  m.search(
    { index: INDEX },
    { query: { foo: { title: 'ruby' } } },
    (err, result) => {
      t.ok(err instanceof errors.ResponseError)
    }
  )

  t.teardown(() => m.stop())
})

test('Send multiple request concurrently over the concurrency limit', t => {
  t.plan(20)
  const m = client.helpers.msearch({ operations: 1 })

  for (let i = 0; i < 10; i++) {
    m.search(
      { index: INDEX },
      { query: { match: { title: 'javascript' } } },
      (err, result) => {
        t.error(err)
        t.equal(result.body.hits.total.value, 106)
      }
    )
  }

  t.teardown(() => m.stop())
})
