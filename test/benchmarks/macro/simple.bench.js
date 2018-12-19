'use strict'

const { Client } = require('../../../index')
const { bench, beforeEach, afterEach } = require('./suite')()

const node = process.env.ES_HOST || 'http://localhost:9200'
const INDEX = process.env.INDEX || 'benchmarking-js'
const TYPE = process.env.TYPE || '_doc'

const smallDocument = require('./fixtures/small_document.json')
const largeDocument = require('./fixtures/large_document.json')

beforeEach(async b => {
  b.client = new Client({ node })
  await b.client.indices.delete({ index: 'test-*' })
  const { body } = await b.client.indices.exists({ index: INDEX })
  if (body === false) {
    await b.client.indices.create({ index: INDEX })
  }
})

afterEach(async b => {
  await b.client.indices.delete({ index: 'test-*' })
  await b.client.close()
  b.client = null
})

bench('Ping 100 times', { warmup: 3, measure: 5 }, async b => {
  b.start()
  for (var i = 0; i < 100; i++) {
    await b.client.ping()
  }
  b.end()
})

bench('Create index 10 times', { warmup: 3, measure: 5 }, async b => {
  b.start()
  for (var i = 0; i < 10; i++) {
    await b.client.indices.create({ index: `test-create-${i}` })
  }
  b.end()
})

bench('Index small document 100 times', { warmup: 3, measure: 5 }, async b => {
  const now = Date.now() + ''
  b.start()
  for (var i = 0; i < 100; i++) {
    await b.client.create({
      index: INDEX,
      type: TYPE,
      id: i + now,
      body: smallDocument
    })
  }
  b.end()
})

bench('Index large document 100 times', { warmup: 3, measure: 5 }, async b => {
  const now = Date.now() + ''
  b.start()
  for (var i = 0; i < 100; i++) {
    await b.client.create({
      index: INDEX,
      type: TYPE,
      id: i + now,
      body: largeDocument
    })
  }
  b.end()
})

bench('Get small document 100 times', { warmup: 3, measure: 5 }, async b => {
  const now = Date.now() + ''
  await b.client.create({
    index: INDEX,
    type: TYPE,
    id: now,
    body: smallDocument
  })

  b.start()
  for (var i = 0; i < 100; i++) {
    await b.client.get({
      index: INDEX,
      type: TYPE,
      id: now
    })
  }
  b.end()
})

bench('Get large document 100 times', { warmup: 3, measure: 5 }, async b => {
  const now = Date.now() + ''
  await b.client.create({
    index: INDEX,
    type: TYPE,
    id: now,
    body: largeDocument
  })

  b.start()
  for (var i = 0; i < 100; i++) {
    await b.client.get({
      index: INDEX,
      type: TYPE,
      id: now
    })
  }
  b.end()
})
