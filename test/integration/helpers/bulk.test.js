'use strict'

const { createReadStream } = require('fs')
const { join } = require('path')
const split = require('split2')
const { test, beforeEach, afterEach } = require('tap')
const { Client } = require('../../../')

const INDEX = `test-helpers-${process.pid}`
const client = new Client({
  node: process.env.TEST_ES_SERVER || 'http://localhost:9200'
})

beforeEach(async () => {
  await client.indices.create({ index: INDEX })
})

afterEach(async () => {
  await client.indices.delete({ index: INDEX }, { ignore: 404 })
})

test('bulk index', async t => {
  const stream = createReadStream(join(__dirname, '..', '..', 'fixtures', 'stackoverflow.ndjson'))
  const b = client.helpers.bulk({
    datasource: stream.pipe(split())
  })

  b.onDrop(() => t.fail('It should not drop any document'))

  const result = await b.index({ _index: INDEX })

  t.type(result.time, 'number')
  t.match(result, {
    total: 5000,
    successful: 5000,
    retry: 0,
    bytes: 10932728,
    failed: 0,
    aborted: false
  })

  await client.indices.refresh({ index: INDEX })
  const { body } = await client.count({ index: INDEX })
  t.match(body, { count: 5000 })
})

test('bulk index with custom id', async t => {
  const stream = createReadStream(join(__dirname, '..', '..', 'fixtures', 'stackoverflow.ndjson'))
  const b = client.helpers.bulk({
    datasource: stream.pipe(split(JSON.parse))
  })

  b.onDrop(() => t.fail('It should not drop any document'))

  const result = await b.index({ _index: INDEX }, doc => {
    return { _id: doc.id }
  })

  t.type(result.time, 'number')
  t.match(result, {
    total: 5000,
    successful: 5000,
    retry: 0,
    bytes: 9850871,
    failed: 0,
    aborted: false
  })

  const { body } = await client.get({
    index: INDEX,
    id: '19273860' // id of document n° 4242
  })

  t.strictEqual(body._index, INDEX)
  t.strictEqual(body._id, '19273860')
  t.strictEqual(body._source.id, '19273860')
})
