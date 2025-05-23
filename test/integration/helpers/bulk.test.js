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
  const result = await client.helpers.bulk({
    datasource: stream.pipe(split()),
    refreshOnCompletion: INDEX,
    onDrop (doc) {
      t.fail('It should not drop any document')
    },
    onDocument (doc) {
      return {
        index: { _index: INDEX }
      }
    }
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

  const { body } = await client.count({ index: INDEX })
  t.match(body, { count: 5000 })
})

test('bulk index with custom id', async t => {
  const stream = createReadStream(datasetPath)
  const result = await client.helpers.bulk({
    datasource: stream.pipe(split(JSON.parse)),
    onDrop (doc) {
      t.fail('It should not drop any document')
    },
    onDocument (doc) {
      return {
        index: {
          _index: INDEX,
          _id: doc.id
        }
      }
    }
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

  t.equal(body._index, INDEX)
  t.equal(body._id, '19273860')
  t.equal(body._source.id, '19273860')
})

test('abort the operation on document drop', async t => {
  const stream = createReadStream(datasetPath)
  const b = client.helpers.bulk({
    datasource: stream.pipe(split(JSON.parse)),
    concurrency: 1,
    onDrop (doc) {
      t.equal(doc.status, 400)
      t.equal(doc.error.type, 'mapper_parsing_exception')
      t.equal(doc.document.id, '45924372')
      b.abort()
    },
    onDocument (doc) {
      if (doc.id === '45924372') { // id of document n° 500
        // this will break the mapping
        doc.title = { foo: 'bar' }
      }
      return {
        index: {
          _index: INDEX,
          _id: doc.id
        }
      }
    }
  })

  const result = await b
  t.type(result.time, 'number')
  t.type(result.bytes, 'number')
  t.equal(result.total - 1, result.successful)
  t.match(result, {
    retry: 0,
    failed: 1,
    aborted: true
  })
})

test('bulk delete', async t => {
  const indexResult = await client.helpers.bulk({
    datasource: createReadStream(datasetPath).pipe(split(JSON.parse)),
    refreshOnCompletion: true,
    onDrop (doc) {
      t.fail('It should not drop any document')
    },
    onDocument (doc) {
      return {
        index: {
          _index: INDEX,
          _id: doc.id
        }
      }
    }
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

  const { body: afterIndex } = await client.count({ index: INDEX })
  t.match(afterIndex, { count: 5000 })

  const deleteResult = await client.helpers.bulk({
    datasource: createReadStream(datasetPath).pipe(split(JSON.parse)),
    refreshOnCompletion: true,
    onDrop (doc) {
      t.fail('It should not drop any document')
    },
    onDocument (doc) {
      return {
        delete: {
          _index: INDEX,
          _id: doc.id
        }
      }
    }
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

  const { body: afterDelete } = await client.count({ index: INDEX })
  t.match(afterDelete, { count: 0 })
})
