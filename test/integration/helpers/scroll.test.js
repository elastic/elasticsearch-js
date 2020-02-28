'use strict'

const { createReadStream } = require('fs')
const { join } = require('path')
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
  const b = client.helpers.bulk({
    datasource: stream.pipe(split())
  })
  const result = await b.index({ _index: INDEX })
  if (result.failed > 0) {
    throw new Error('Failed bulk indexing docs')
  }
  await client.indices.refresh()
})

afterEach(async () => {
  await client.indices.delete({ index: INDEX }, { ignore: 404 })
})

test('search helper', async t => {
  const scrollSearch = await client.helpers.scrollSearch({
    index: INDEX,
    body: {
      query: {
        match: {
          title: 'javascript'
        }
      }
    }
  })

  var count = 0
  for await (const search of scrollSearch) {
    count += 1
    for (const doc of search.documents) {
      t.true(doc.title.toLowerCase().includes('javascript'))
    }
  }
  t.strictEqual(count, 11)
})

test('clear a scroll search', async t => {
  const scrollSearch = await client.helpers.scrollSearch({
    index: INDEX,
    body: {
      query: {
        match: {
          title: 'javascript'
        }
      }
    }
  })

  var count = 0
  for await (const search of scrollSearch) {
    count += 1
    if (count === 2) {
      search.clear()
    }
  }
  t.strictEqual(count, 2)
})

test('scroll documents', async t => {
  const scrollSearch = await client.helpers.scrollDocuments({
    index: INDEX,
    body: {
      query: {
        match: {
          title: 'javascript'
        }
      }
    }
  })

  var count = 0
  for await (const doc of scrollSearch) {
    count += 1
    t.true(doc.title.toLowerCase().includes('javascript'))
  }
  t.strictEqual(count, 106)
})
