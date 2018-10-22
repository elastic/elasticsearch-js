'use strict'

const { test } = require('tap')
const { URL } = require('url')
const { buildServer } = require('../utils')
const {
  NoLivingConnectionsError,
  SerializationError,
  DeserializationError,
  TimeoutError,
  ResponseError
} = require('../../lib/errors')

const ConnectionPool = require('../../lib/ConnectionPool')
const Serializer = require('../../lib/Serializer')
const Transport = require('../../lib/Transport')
const { RoundRobinSelector } = require('../../lib/Selectors')

test('Basic', t => {
  t.plan(2)
  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({
      selector: new RoundRobinSelector()
    })
    pool.addConnection(`http://localhost:${port}`)

    const transport = new Transport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 3,
      requestTimeout: 30000,
      sniffInterval: false,
      sniffOnStart: false
    })

    transport.request({
      method: 'GET',
      path: '/hello'
    }, (err, body) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
    })
  })
})

test('Send POST', t => {
  t.plan(4)
  function handler (req, res) {
    t.match(req.headers, {
      'content-type': 'application/json',
      'content-length': '17'
    })
    var json = ''
    req.setEncoding('utf8')
    req.on('data', chunk => { json += chunk })
    req.on('error', err => t.fail(err))
    req.on('end', () => {
      t.deepEqual(JSON.parse(json), { hello: 'world' })
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end(JSON.stringify({ hello: 'world' }))
    })
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({
      selector: new RoundRobinSelector()
    })
    pool.addConnection(`http://localhost:${port}`)

    const transport = new Transport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 3,
      requestTimeout: 30000,
      sniffInterval: false,
      sniffOnStart: false
    })

    transport.request({
      method: 'POST',
      path: '/hello',
      body: { hello: 'world' }
    }, (err, body) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
    })
  })
})

test('NoLivingConnectionsError', t => {
  t.plan(1)
  const pool = new ConnectionPool({
    selector: new RoundRobinSelector()
  })

  const transport = new Transport({
    emit: () => {},
    connectionPool: pool,
    serializer: new Serializer(),
    maxRetries: 3,
    requestTimeout: 30000,
    sniffInterval: false,
    sniffOnStart: false
  })

  transport.request({
    method: 'GET',
    path: '/hello'
  }, (err, body) => {
    t.ok(err instanceof NoLivingConnectionsError)
  })
})

test('SerializationError', t => {
  t.plan(1)
  const pool = new ConnectionPool({
    selector: new RoundRobinSelector()
  })
  pool.addConnection('http://localhost:9200')

  const transport = new Transport({
    emit: () => {},
    connectionPool: pool,
    serializer: new Serializer(),
    maxRetries: 3,
    requestTimeout: 30000,
    sniffInterval: false,
    sniffOnStart: false
  })

  const body = { hello: 'world' }
  body.o = body
  transport.request({
    method: 'POST',
    path: '/hello',
    body
  }, (err, body) => {
    t.ok(err instanceof SerializationError)
  })
})

test('DeserializationError', t => {
  t.plan(1)
  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end('{"hello)')
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({
      selector: new RoundRobinSelector()
    })
    pool.addConnection(`http://localhost:${port}`)

    const transport = new Transport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 3,
      requestTimeout: 30000,
      sniffInterval: false,
      sniffOnStart: false
    })

    transport.request({
      method: 'GET',
      path: '/hello'
    }, (err, body) => {
      t.ok(err instanceof DeserializationError)
    })
  })
})

test('TimeoutError (should call markDead on the failing connection)', t => {
  t.plan(2)

  class CustomConnectionPool extends ConnectionPool {
    markDead (connection) {
      t.strictEqual(connection.id, 'node1')
      super.markDead(connection)
    }
  }

  function handler (req, res) {
    setTimeout(() => {
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end(JSON.stringify({ hello: 'world' }))
    }, 1000)
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new CustomConnectionPool({
      selector: new RoundRobinSelector()
    })
    pool.addConnection({
      host: new URL(`http://localhost:${port}`),
      id: 'node1'
    })

    const transport = new Transport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 0,
      requestTimeout: 500,
      sniffInterval: false,
      sniffOnStart: false
    })

    transport.request({
      method: 'GET',
      path: '/hello'
    }, (err, body) => {
      t.ok(err instanceof TimeoutError)
    })
  })
})

test('Retry mechanism', t => {
  t.plan(2)

  var count = 0
  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    if (count++ === 1) {
      res.end(JSON.stringify({ hello: 'world' }))
    } else {
      setTimeout(() => {
        res.end(JSON.stringify({ hello: 'world' }))
      }, 1000)
    }
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({
      selector: new RoundRobinSelector()
    })
    pool.addConnection([{
      host: new URL(`http://localhost:${port}`),
      id: 'node1'
    }, {
      host: new URL(`http://localhost:${port}`),
      id: 'node2'
    }])

    const transport = new Transport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 1,
      requestTimeout: 500,
      sniffInterval: false,
      sniffOnStart: false
    })

    transport.request({
      method: 'GET',
      path: '/hello'
    }, (err, body) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
    })
  })
})

test('Should call markAlive with a successful response', t => {
  t.plan(3)

  class CustomConnectionPool extends ConnectionPool {
    markAlive (connection) {
      t.strictEqual(connection.id, 'node1')
      super.markAlive(connection)
    }
  }

  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new CustomConnectionPool({
      selector: new RoundRobinSelector()
    })
    pool.addConnection({
      host: new URL(`http://localhost:${port}`),
      id: 'node1'
    })

    const transport = new Transport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 3,
      requestTimeout: 30000,
      sniffInterval: false,
      sniffOnStart: false
    })

    transport.request({
      method: 'GET',
      path: '/hello'
    }, (err, body) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
    })
  })
})

test('Should call resurrect on every request', t => {
  t.plan(3)

  class CustomConnectionPool extends ConnectionPool {
    resurrect (now) {
      t.type(now, 'number')
    }
  }

  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new CustomConnectionPool({
      selector: new RoundRobinSelector()
    })
    pool.addConnection({
      host: new URL(`http://localhost:${port}`),
      id: 'node1'
    })

    const transport = new Transport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 3,
      requestTimeout: 30000,
      sniffInterval: false,
      sniffOnStart: false
    })

    transport.request({
      method: 'GET',
      path: '/hello'
    }, (err, body) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
    })
  })
})

test('Should return a request aborter utility', t => {
  t.plan(1)

  function handler (req, res) {
    setTimeout(() => {
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end(JSON.stringify({ hello: 'world' }))
    }, 1000)
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({
      selector: new RoundRobinSelector()
    })
    pool.addConnection({
      host: new URL(`http://localhost:${port}`),
      id: 'node1'
    })

    const transport = new Transport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 3,
      requestTimeout: 30000,
      sniffInterval: false,
      sniffOnStart: false
    })

    const request = transport.request({
      method: 'GET',
      path: '/hello'
    }, (_err, body) => {
      t.fail('Should not be called')
    })

    request.abort()
    t.pass('ok')
  })
})

test('ResponseError', t => {
  t.plan(3)

  function handler (req, res) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ status: 500 }))
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({
      selector: new RoundRobinSelector()
    })
    pool.addConnection(`http://localhost:${port}`)

    const transport = new Transport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 3,
      requestTimeout: 30000,
      sniffInterval: false,
      sniffOnStart: false
    })

    transport.request({
      method: 'GET',
      path: '/hello'
    }, (err, body) => {
      t.ok(err instanceof ResponseError)
      t.deepEqual(err.response, { status: 500 })
      t.strictEqual(err.statusCode, 500)
    })
  })
})

test('Override requestTimeout', t => {
  t.plan(2)
  function handler (req, res) {
    setTimeout(() => {
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end(JSON.stringify({ hello: 'world' }))
    }, 1000)
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({
      selector: new RoundRobinSelector()
    })
    pool.addConnection(`http://localhost:${port}`)

    const transport = new Transport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 3,
      requestTimeout: 500,
      sniffInterval: false,
      sniffOnStart: false
    })

    transport.request({
      method: 'GET',
      path: '/hello',
      timeout: 2000
    }, (err, body) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
    })
  })
})
