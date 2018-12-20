'use strict'

const { Client } = require('../../../index')
const { bench, beforeEach, afterEach } = require('./suite')()

const node = process.env.ES_HOST || 'http://localhost:9200'

const smallDocument = require('./fixtures/small_document.json')
const largeDocument = require('./fixtures/large_document.json')

const client = new Client({ node })

beforeEach(async b => {
  b.client = client
  await b.client.indices.delete({ index: 'test-*' })
})

afterEach(async b => {
  await b.client.indices.delete({ index: 'test-*' })
})

bench('Ping', { warmup: 3, measure: 5, iterations: 100 }, async b => {
  b.start()
  for (var i = 0; i < b.iterations; i++) {
    await b.client.ping()
  }
  b.end()
})

bench('Create index', { warmup: 3, measure: 5, iterations: 10 }, async b => {
  b.start()
  for (var i = 0; i < b.iterations; i++) {
    await b.client.indices.create({ index: `test-create-${i}` })
  }
  b.end()
})

bench('Index small document', { warmup: 3, measure: 5, iterations: 100 }, async b => {
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

bench('Index large document', { warmup: 3, measure: 5, iterations: 100 }, async b => {
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

bench('Get small document', { warmup: 3, measure: 5, iterations: 1000 }, async b => {
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

bench('Get large document', { warmup: 3, measure: 5, iterations: 1000 }, async b => {
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

bench('Search small document', { warmup: 3, measure: 5, iterations: 1000 }, async b => {
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

bench('Search large document', { warmup: 3, measure: 5, iterations: 1000 }, async b => {
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

bench('Update small document', { warmup: 3, measure: 5, iterations: 100 }, async b => {
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
