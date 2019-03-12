'use strict'

const { Client } = require('../../../index')
const { statSync } = require('fs')
const { join } = require('path')
const { bench, beforeEach, afterEach } = require('../suite')({
  report: {
    url: process.env.ES_RESULT_CLUSTER_URL,
    username: process.env.ES_RESULT_CLUSTER_USERNAME,
    password: process.env.ES_RESULT_CLUSTER_PASSWORD
  }
})

const node = process.env.ELASTICSEARCH_URL || 'http://localhost:9200'

const smallDocument = require('./fixtures/small_document.json')
const smallDocumentInfo = {
  name: 'small_document.json',
  size: statSync(join(__dirname, 'fixtures', 'small_document.json')).size,
  num_documents: 1
}
const largeDocument = require('./fixtures/large_document.json')
const largeDocumentInfo = {
  name: 'large_document.json',
  size: statSync(join(__dirname, 'fixtures', 'large_document.json')).size,
  num_documents: 1
}

const client = new Client({ node })

beforeEach(async b => {
  b.client = client
  await b.client.indices.delete({ index: 'test-*' })
})

afterEach(async b => {
  await b.client.indices.delete({ index: 'test-*' })
})

bench('Ping', {
  warmup: 3,
  measure: 5,
  iterations: 100,
  action: 'ping'
}, async b => {
  b.start()
  for (var i = 0; i < b.iterations; i++) {
    await b.client.ping()
  }
  b.end()
})

bench('Create index', {
  warmup: 3,
  measure: 5,
  iterations: 10,
  action: 'indices.create'
}, async b => {
  b.start()
  for (var i = 0; i < b.iterations; i++) {
    await b.client.indices.create({ index: `test-create-${i}` })
  }
  b.end()
})

bench('Index small document', {
  warmup: 3,
  measure: 5,
  iterations: 100,
  dataset: smallDocumentInfo,
  action: 'create'
}, async b => {
  const now = Date.now() + ''
  const index = `test-${now}`
  await b.client.indices.create({ index })

  b.start()
  for (var i = 0; i < b.iterations; i++) {
    await b.client.create({
      index,
      type: '_doc',
      id: i + now,
      body: smallDocument
    })
  }
  b.end()
})

bench('Index large document', {
  warmup: 3,
  measure: 5,
  iterations: 100,
  dataset: largeDocumentInfo,
  action: 'create'
}, async b => {
  const now = Date.now() + ''
  const index = `test-${now}`
  await b.client.indices.create({ index })

  b.start()
  for (var i = 0; i < b.iterations; i++) {
    await b.client.create({
      index,
      type: '_doc',
      id: i + now,
      body: largeDocument
    })
  }
  b.end()
})

bench('Get small document', {
  warmup: 3,
  measure: 5,
  iterations: 1000,
  dataset: smallDocumentInfo,
  action: 'get'
}, async b => {
  const now = Date.now() + ''
  const index = `test-${now}`
  await b.client.indices.create({ index })

  await b.client.create({
    index,
    type: '_doc',
    id: now,
    body: smallDocument
  })

  b.start()
  for (var i = 0; i < b.iterations; i++) {
    await b.client.get({
      index,
      type: '_doc',
      id: now
    })
  }
  b.end()
})

bench('Get large document', {
  warmup: 3,
  measure: 5,
  iterations: 1000,
  dataset: largeDocumentInfo,
  action: 'get'
}, async b => {
  const now = Date.now() + ''
  const index = `test-${now}`
  await b.client.indices.create({ index })

  await b.client.create({
    index,
    type: '_doc',
    id: now,
    body: largeDocument
  })

  b.start()
  for (var i = 0; i < b.iterations; i++) {
    await b.client.get({
      index,
      type: '_doc',
      id: now
    })
  }
  b.end()
})

bench('Search small document', {
  warmup: 3,
  measure: 5,
  iterations: 1000,
  dataset: smallDocumentInfo,
  action: 'search'
}, async b => {
  const now = Date.now() + ''
  const index = `test-${now}`
  await b.client.indices.create({ index })

  await b.client.create({
    index,
    type: '_doc',
    id: now,
    refresh: true,
    body: smallDocument
  })

  b.start()
  for (var i = 0; i < b.iterations; i++) {
    await b.client.search({
      index,
      type: '_doc',
      body: {
        query: {
          match: { cuisine: 'mexican' }
        }
      }
    })
  }
  b.end()
})

bench('Search large document', {
  warmup: 3,
  measure: 5,
  iterations: 1000,
  dataset: largeDocumentInfo,
  action: 'search'
}, async b => {
  const now = Date.now() + ''
  const index = `test-${now}`
  await b.client.indices.create({ index })

  await b.client.create({
    index,
    type: '_doc',
    id: now,
    refresh: true,
    body: largeDocument
  })

  b.start()
  for (var i = 0; i < b.iterations; i++) {
    await b.client.search({
      index,
      type: '_doc',
      body: {
        query: {
          match: { 'user.lang': 'en' }
        }
      }
    })
  }
  b.end()
})

bench('Update small document', {
  warmup: 3,
  measure: 5,
  iterations: 100,
  dataset: smallDocumentInfo,
  action: 'update'
}, async b => {
  const now = Date.now() + ''
  const index = `test-${now}`
  await b.client.indices.create({ index })

  await b.client.create({
    index,
    type: '_doc',
    id: now,
    refresh: true,
    body: smallDocument
  })

  b.start()
  for (var i = 0; i < b.iterations; i++) {
    await b.client.update({
      index,
      type: '_doc',
      id: now,
      body: {
        doc: { cuisine: 'italian' + i }
      }
    })
  }
  b.end()
})
