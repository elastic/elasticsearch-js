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

const { createReadStream } = require('fs')
const { join } = require('path')
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
      t.strictEqual(result.body.hits.total.value, 106)
    }
  )

  m.search(
    { index: INDEX },
    { query: { match: { title: 'ruby' } } },
    (err, result) => {
      t.error(err)
      t.strictEqual(result.body.hits.total.value, 29)
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
      t.strictEqual(result.body.hits.total.value, 106)
    }
  )

  m.search(
    { index: INDEX },
    { query: { foo: { title: 'ruby' } } },
    (err, result) => {
      t.true(err instanceof errors.ResponseError)
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
        t.strictEqual(result.body.hits.total.value, 106)
      }
    )
  }

  t.teardown(() => m.stop())
})
