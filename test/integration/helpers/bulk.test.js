'use strict'

const { createReadStream } = require('fs')
const { join } = require('path')
const split = require('split2')
const { test, beforeEach, afterEach } = require('tap')
const { waitCluster } = require('../../utils')
const { Client } = require('../../../')

const datasetPath = join(__dirname, '..', '..', 'fixtures', 'stackoverflow.ndjson')
const INDEX = `test-helpers-${process.pid}`
const client = new Client({
  node: process.env.TEST_ES_SERVER || 'http://localhost:9200'
})

beforeEach(async () => {
  await waitCluster(client)
  await client.indices.create({ index: INDEX })
})

afterEach(async () => {
  await client.indices.delete({ index: INDEX }, { ignore: 404 })
})

test('bulk index', async t => {
  const stream = createReadStream(datasetPath)
  const b = client.helpers.bulk({
    datasource: stream.pipe(split())
  })

  b.onDrop(() => t.fail('It should not drop any document'))

  const result = await b.index({ _index: INDEX })

  t.type(result.time, 'number')
  t.type(result.bytes, 'number')
  t.match(result, {
    total: 5000,
    successful: 5000,
    retry: 0,
    failed: 0,
    aborted: false
  })

  await client.indices.refresh({ index: INDEX })
  const { body } = await client.count({ index: INDEX })
  t.match(body, { count: 5000 })
})

test('bulk index with custom id', async t => {
  const stream = createReadStream(datasetPath)
  const b = client.helpers.bulk({
    datasource: stream.pipe(split(JSON.parse))
  })

  b.onDrop(() => t.fail('It should not drop any document'))

  const result = await b.index({ _index: INDEX }, doc => {
    return { _id: doc.id }
  })

  t.type(result.time, 'number')
  t.type(result.bytes, 'number')
  t.match(result, {
    total: 5000,
    successful: 5000,
    retry: 0,
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

test('abort the operation on document drop', async t => {
  const stream = createReadStream(datasetPath)
  const b = client.helpers.bulk({
    datasource: stream.pipe(split(JSON.parse)),
    concurrency: 1
  })

  b.onDrop(doc => {
    t.strictEqual(doc.status, 400)
    t.strictEqual(doc.error.type, 'mapper_parsing_exception')
    t.strictEqual(doc.document.id, '45924372')
    b.abort()
  })

  const result = await b.index({ _index: INDEX }, doc => {
    if (doc.id === '45924372') { // id of document n° 500
      // this will break the mapping
      doc.title = { foo: 'bar' }
    }
    return { _id: doc.id }
  })

  t.type(result.time, 'number')
  t.type(result.bytes, 'number')
  t.strictEqual(result.total - 1, result.successful)
  t.match(result, {
    retry: 0,
    failed: 1,
    aborted: true
  })
})

test('bulk delete', async t => {
  const b1 = client.helpers.bulk({
    datasource: createReadStream(datasetPath).pipe(split(JSON.parse))
  })

  b1.onDrop(() => t.fail('It should not drop any document'))

  const indexResult = await b1.index({ _index: INDEX }, doc => {
    return { _id: doc.id }
  })

  t.type(indexResult.time, 'number')
  t.type(indexResult.bytes, 'number')
  t.match(indexResult, {
    total: 5000,
    successful: 5000,
    retry: 0,
    failed: 0,
    aborted: false
  })

  await client.indices.refresh({ index: INDEX })
  const { body: afterIndex } = await client.count({ index: INDEX })
  t.match(afterIndex, { count: 5000 })

  const b2 = client.helpers.bulk({
    datasource: createReadStream(datasetPath).pipe(split(JSON.parse))
  })

  b2.onDrop(() => t.fail('It should not drop any document'))

  const deleteResult = await b2.delete({ _index: INDEX }, doc => {
    return { _id: doc.id }
  })

  t.type(deleteResult.time, 'number')
  t.type(deleteResult.bytes, 'number')
  t.match(deleteResult, {
    total: 5000,
    successful: 5000,
    retry: 0,
    failed: 0,
    aborted: false
  })

  await client.indices.refresh({ index: INDEX })
  const { body: afterDelete } = await client.count({ index: INDEX })
  t.match(afterDelete, { count: 0 })
})
