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
  const results = await client.helpers.search({
    index: INDEX,
    body: {
      query: {
        match: {
          title: 'javascript'
        }
      }
    }
  })
  t.strictEqual(results.length, 10)
  for (const result of results) {
    t.true(result.title.toLowerCase().includes('javascript'))
  }
})
