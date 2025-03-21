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
const { Client } = require('../../../')

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

test('search helper', async t => {
  const scrollSearch = client.helpers.scrollSearch({
    index: INDEX,
    body: {
      query: {
        match: {
          title: 'javascript'
        }
      }
    }
  })

  let count = 0
  for await (const search of scrollSearch) {
    count += 1
    for (const doc of search.documents) {
      t.ok(doc.title.toLowerCase().includes('javascript'))
    }
  }
  t.equal(count, 11)
})

test('clear a scroll search', async t => {
  const scrollSearch = client.helpers.scrollSearch({
    index: INDEX,
    body: {
      query: {
        match: {
          title: 'javascript'
        }
      }
    }
  })

  let count = 0
  for await (const search of scrollSearch) {
    count += 1
    if (count === 2) {
      search.clear()
    }
  }
  t.equal(count, 2)
})

test('scroll documents', async t => {
  const scrollSearch = client.helpers.scrollDocuments({
    index: INDEX,
    body: {
      query: {
        match: {
          title: 'javascript'
        }
      }
    }
  })

  let count = 0
  for await (const doc of scrollSearch) {
    count += 1
    t.ok(doc.title.toLowerCase().includes('javascript'))
  }
  t.equal(count, 106)
})
