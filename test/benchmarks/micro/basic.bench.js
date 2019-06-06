'use strict'

const assert = require('assert')
const { bench } = require('../suite')()
const { Client, Transport } = require('../../../index')
const { connection } = require('../../utils')

bench('Initialization', { warmup: 5, measure: 10, iterations: 1000 }, async b => {
  b.start()
  for (var i = 0; i < b.iterations; i++) {
    const client = new Client({ // eslint-disable-line
      node: 'http://localhost:9200'
    })
  }
  b.end()
})

bench('Call api with lazy loading', { warmup: 5, measure: 10 }, async b => {
  const client = new Client({
    node: 'http://localhost:9200',
    Connection: connection.MockConnection
  })

  b.start()
  await client.info()
  b.end()
})

bench('Call api without lazy loading', { warmup: 5, measure: 10 }, async b => {
  const client = new Client({
    node: 'http://localhost:9200',
    Connection: connection.MockConnection
  })

  await client.info()
  b.start()
  await client.info()
  b.end()
})

bench('Basic get', { warmup: 5, measure: 10, iterations: 1000 }, async b => {
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
  for (var i = 0; i < b.iterations; i++) {
    await client.search({
      index: 'test',
      type: 'doc',
      q: 'foo:bar'
    })
  }
  b.end()
})

bench('Basic post', { warmup: 5, measure: 10, iterations: 1000 }, async b => {
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
  for (var i = 0; i < b.iterations; i++) {
    await client.search({
      index: 'test',
      type: 'doc',
      body: {
        query: {
          match: { foo: 'bar' }
        }
      }
    })
  }
  b.end()
})

bench('Basic get (multiple connections)', { warmup: 5, measure: 10, iterations: 1000 }, async b => {
  const nodes = []
  for (var port = 9200; port < 10200; port++) {
    nodes.push(`http://localhost:${port}`)
  }
  const client = new Client({
    nodes,
    Connection: connection.MockConnection
  })
  assert.strictEqual(client.connectionPool.connections.size, 1000)

  // we run the method twice to skip the lazy loading overhead
  await client.search({
    index: 'test',
    type: 'doc',
    q: 'foo:bar'
  })
  b.start()
  for (var i = 0; i < b.iterations; i++) {
    await client.search({
      index: 'test',
      type: 'doc',
      q: 'foo:bar'
    })
  }
  b.end()
})

bench('ConnectionPool.getConnection (10 connections)', { warmup: 5, measure: 10, iterations: 1000 }, async b => {
  const nodes = []
  for (var port = 9200; port < 9200 + 10; port++) {
    nodes.push(`http://localhost:${port}`)
  }
  const client = new Client({
    nodes,
    Connection: connection.MockConnection
  })
  assert.strictEqual(client.connectionPool.connections.size, 10)

  const opts = {
    filter: Transport.internals.defaultNodeFilter,
    selector: Transport.internals.roundRobinSelector()
  }

  var id = 0
  b.start()
  for (var i = 0; i < b.iterations; i++) {
    var conn = client.connectionPool.getConnection(opts)
    if (conn.id !== `http://localhost:${9200 + id}/`) {
      throw new Error(`Wrong connection: i: ${9200 + id} - id: ${conn.id}`)
    }
    if (++id > 9) id = 0
  }
  b.end()
})

bench('ConnectionPool.getConnection (1000 connections)', { warmup: 5, measure: 10, iterations: 1000 }, async b => {
  const nodes = []
  for (var port = 9200; port < 9200 + 1000; port++) {
    nodes.push(`http://localhost:${port}`)
  }
  const client = new Client({
    nodes,
    Connection: connection.MockConnection
  })
  assert.strictEqual(client.connectionPool.connections.size, 1000)

  const opts = {
    filter: Transport.internals.defaultNodeFilter,
    selector: Transport.internals.roundRobinSelector()
  }

  var id = 0
  b.start()
  for (var i = 0; i < b.iterations; i++) {
    var conn = client.connectionPool.getConnection(opts)
    if (conn.id !== `http://localhost:${9200 + id}/`) {
      throw new Error(`Wrong connection: i: ${9200 + id} - id: ${conn.id}`)
    }
    if (++id > 999) id = 0
  }
  b.end()
})
