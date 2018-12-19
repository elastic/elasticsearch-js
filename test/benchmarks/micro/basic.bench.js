'use strict'

const bench = require('./suite')({
  repetitions: { warmup: 2, measure: 5 }
})
const { Client } = require('../../../index')
const { connection } = require('../../utils')

bench('Initialization', async b => {
  b.start()
  const client = new Client({ // eslint-disable-line
    node: 'http://localhost:9200'
  })
  b.end()
})

bench('Call api with lazy loading', async b => {
  const client = new Client({
    node: 'http://localhost:9200',
    Connection: connection.MockConnection
  })

  b.start()
  await client.info()
  b.end()
})

bench('Call api without lazy loading', async b => {
  const client = new Client({
    node: 'http://localhost:9200',
    Connection: connection.MockConnection
  })

  await client.info()
  b.start()
  await client.info()
  b.end()
})

bench('Basic get', async b => {
  const client = new Client({
    node: 'http://localhost:9200',
    Connection: connection.MockConnection
  })

  // we run the method twice to skip the lazy loading overhead
  await client.search({
    index: 'test',
    type: 'doc',
    q: 'foo:bar'
  })
  b.start()
  await client.search({
    index: 'test',
    type: 'doc',
    q: 'foo:bar'
  })
  b.end()
})

bench('Basic post', async b => {
  const client = new Client({
    node: 'http://localhost:9200',
    Connection: connection.MockConnection
  })

  // we run the method twice to skip the lazy loading overhead
  await client.search({
    index: 'test',
    type: 'doc',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  })
  b.start()
  await client.search({
    index: 'test',
    type: 'doc',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  })
  b.end()
})
