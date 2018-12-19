'use strict'

const { test } = require('tap')
const { URL } = require('url')
const { Client, ConnectionPool } = require('../../index')
const { buildServer } = require('../utils')

test('Configure host', t => {
  t.test('Single string', t => {
    const client = new Client({
      node: 'http://localhost:9200'
    })
    const pool = client.connectionPool
    t.match(pool.connections.get('http://localhost:9200/'), {
      url: new URL('http://localhost:9200'),
      id: 'http://localhost:9200/',
      ssl: null,
      deadCount: 0,
      resurrectTimeout: 0,
      roles: {
        master: true,
        data: true,
        ingest: true,
        coordinating: true,
        machine_learning: true
      }
    })
    t.end()
  })

  t.test('Array of strings', t => {
    const client = new Client({
      nodes: ['http://localhost:9200', 'http://localhost:9201']
    })
    const pool = client.connectionPool
    t.match(pool.connections.get('http://localhost:9200/'), {
      url: new URL('http://localhost:9200'),
      id: 'http://localhost:9200/',
      ssl: null,
      deadCount: 0,
      resurrectTimeout: 0,
      roles: {
        master: true,
        data: true,
        ingest: true,
        coordinating: true,
        machine_learning: true
      }
    })
    t.match(pool.connections.get('http://localhost:9201/'), {
      url: new URL('http://localhost:9201'),
      id: 'http://localhost:9201/',
      ssl: null,
      deadCount: 0,
      resurrectTimeout: 0,
      roles: {
        master: true,
        data: true,
        ingest: true,
        coordinating: true,
        machine_learning: true
      }
    })

    t.end()
  })

  t.test('Single object', t => {
    const client = new Client({
      node: {
        url: new URL('http://localhost:9200'),
        id: 'node',
        roles: {
          master: true,
          data: false
        },
        ssl: 'ssl'
      }
    })
    const pool = client.connectionPool
    t.match(pool.connections.get('node'), {
      url: new URL('http://localhost:9200'),
      id: 'node',
      ssl: 'ssl',
      deadCount: 0,
      resurrectTimeout: 0,
      roles: {
        master: true,
        data: false
      }
    })
    t.end()
  })

  t.test('Array of objects', t => {
    const client = new Client({
      nodes: [{
        url: new URL('http://localhost:9200'),
        id: 'node1',
        roles: {
          master: true,
          data: false
        },
        ssl: 'ssl'
      }, {
        url: new URL('http://localhost:9200'),
        id: 'node2',
        roles: {
          master: false,
          data: true
        },
        ssl: 'ssl'
      }]
    })
    const pool = client.connectionPool
    t.match(pool.connections.get('node1'), {
      url: new URL('http://localhost:9200'),
      id: 'node1',
      ssl: 'ssl',
      deadCount: 0,
      resurrectTimeout: 0,
      roles: {
        master: true,
        data: false
      }
    })
    t.match(pool.connections.get('node2'), {
      url: new URL('http://localhost:9200'),
      id: 'node2',
      ssl: 'ssl',
      deadCount: 0,
      resurrectTimeout: 0,
      roles: {
        master: false,
        data: true
      }
    })
    t.end()
  })

  t.test('Custom headers', t => {
    const client = new Client({
      node: {
        url: new URL('http://localhost:9200'),
        headers: { 'x-foo': 'bar' },
        id: 'node'
      }
    })
    const pool = client.connectionPool
    t.match(pool.connections.get('node'), {
      url: new URL('http://localhost:9200'),
      headers: { 'x-foo': 'bar' }
    })
    t.end()
  })

  t.test('Missing node conf', t => {
    try {
      new Client() // eslint-disable-line
      t.fail('Should fail')
    } catch (err) {
      t.ok(err)
    }
    t.end()
  })

  t.end()
})

test('Node with auth data in the url', t => {
  t.plan(3)

  function handler (req, res) {
    t.match(req.headers, {
      authorization: 'Basic Zm9vOmJhcg=='
    })
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://foo:bar@localhost:${port}`
    })

    client.info((err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Custom authentication per request', t => {
  t.plan(6)

  var first = true
  function handler (req, res) {
    t.match(req.headers, {
      authorization: first ? 'hello' : 'Basic Zm9vOmJhcg=='
    })
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://foo:bar@localhost:${port}`
    })

    client.info({}, {
      headers: {
        authorization: 'hello'
      }
    }, (err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
      first = false

      client.info((err, { body }) => {
        t.error(err)
        t.deepEqual(body, { hello: 'world' })
        server.stop()
      })
    })
  })
})

test('Custom headers per request', t => {
  t.plan(3)

  function handler (req, res) {
    t.match(req.headers, {
      'x-foo': 'bar',
      'x-baz': 'faz'
    })
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://foo:bar@localhost:${port}`
    })

    client.info({}, {
      headers: {
        'x-foo': 'bar',
        'x-baz': 'faz'
      }
    }, (err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Client close', t => {
  t.plan(2)

  class MyConnectionPool extends ConnectionPool {
    empty (callback) {
      t.ok('called')
      super.empty(callback)
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    ConnectionPool: MyConnectionPool
  })

  client.close(() => t.pass('Closed'))
})

test('Client close (promise)', t => {
  t.plan(2)

  class MyConnectionPool extends ConnectionPool {
    empty (callback) {
      t.ok('called')
      super.empty(callback)
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    ConnectionPool: MyConnectionPool
  })

  client.close()
    .then(() => t.pass('Closed'))
})
