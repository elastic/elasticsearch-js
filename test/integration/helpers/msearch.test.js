// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { createReadStream } = require('fs')
const { join } = require('path')
const split = require('split2')
const { skip, test, beforeEach, afterEach } = require('tap')
const semver = require('semver')
const { waitCluster } = require('../../utils')
const { Client, errors } = require('../../../')

if (semver.lt(process.versions.node, '10.0.0')) {
  skip('The msearch helper does not work in Node.js v8')
  process.exit(0)
}

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
  const s = client.helpers.msearch({ operations: 1 })

  s.search(
    { index: INDEX },
    { query: { match: { title: 'javascript' } } },
    (err, result) => {
      t.error(err)
      t.strictEqual(result.body.hits.total.value, 106)
    }
  )

  s.search(
    { index: INDEX },
    { query: { match: { title: 'ruby' } } },
    (err, result) => {
      t.error(err)
      t.strictEqual(result.body.hits.total.value, 29)
    }
  )

  t.teardown(() => s.stop())
})

test('Bad request', t => {
  t.plan(3)
  const s = client.helpers.msearch({ operations: 1 })

  s.search(
    { index: INDEX },
    { query: { match: { title: 'javascript' } } },
    (err, result) => {
      t.error(err)
      t.strictEqual(result.body.hits.total.value, 106)
    }
  )

  s.search(
    { index: INDEX },
    { query: { foo: { title: 'ruby' } } },
    (err, result) => {
      t.true(err instanceof errors.ResponseError)
    }
  )

  t.teardown(() => s.stop())
})

test('Send multiple request concurrently over the concurrency limit', t => {
  t.plan(20)
  const s = client.helpers.msearch({ operations: 1 })

  for (let i = 0; i < 10; i++) {
    s.search(
      { index: INDEX },
      { query: { match: { title: 'javascript' } } },
      (err, result) => {
        t.error(err)
        t.strictEqual(result.body.hits.total.value, 106)
      }
    )
  }

  t.teardown(() => s.stop())
})
