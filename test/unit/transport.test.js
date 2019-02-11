'use strict'

const { test } = require('tap')
const { URL } = require('url')
const { createGunzip } = require('zlib')
const intoStream = require('into-stream')
const {
  buildServer,
  connection: { MockConnection, MockConnectionTimeout, MockConnectionError }
} = require('../utils')
const {
  NoLivingConnectionsError,
  SerializationError,
  DeserializationError,
  TimeoutError,
  ResponseError,
  ConnectionError,
  ConfigurationError
} = require('../../lib/errors')

const ConnectionPool = require('../../lib/ConnectionPool')
const Connection = require('../../lib/Connection')
const Serializer = require('../../lib/Serializer')
const Transport = require('../../lib/Transport')

test('Basic', t => {
  t.plan(2)
  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({ Connection })
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
    }, (err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Basic (promises support)', t => {
  t.plan(1)

  const pool = new ConnectionPool({ Connection: MockConnection })
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

  transport
    .request({
      method: 'GET',
      path: '/hello'
    })
    .then(({ body }) => {
      t.deepEqual(body, { hello: 'world' })
    })
    .catch(t.fail)
})

test('Basic (options + promises support)', t => {
  t.plan(1)

  const pool = new ConnectionPool({ Connection: MockConnection })
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

  transport
    .request({
      method: 'GET',
      path: '/hello'
    }, {
      requestTimeout: 1000
    })
    .then(({ body }) => {
      t.deepEqual(body, { hello: 'world' })
    })
    .catch(t.fail)
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
    const pool = new ConnectionPool({ Connection })
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
    }, (err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Send POST (ndjson)', t => {
  t.plan(4)

  const bulkBody = [
    { hello: 'world' },
    { winter: 'is coming' },
    { you_know: 'for search' }
  ]

  function handler (req, res) {
    t.match(req.headers, {
      'content-type': 'application/x-ndjson',
      'content-length': '67'
    })
    var json = ''
    req.setEncoding('utf8')
    req.on('data', chunk => { json += chunk })
    req.on('error', err => t.fail(err))
    req.on('end', () => {
      t.strictEqual(
        json,
        JSON.stringify(bulkBody[0]) + '\n' +
        JSON.stringify(bulkBody[1]) + '\n' +
        JSON.stringify(bulkBody[2]) + '\n'
      )
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end(JSON.stringify({ hello: 'world' }))
    })
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({ Connection })
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
      bulkBody
    }, (err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Send stream', t => {
  t.plan(4)
  function handler (req, res) {
    t.match(req.headers, {
      'content-type': 'application/json'
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
    const pool = new ConnectionPool({ Connection })
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
      body: intoStream(JSON.stringify({ hello: 'world' }))
    }, (err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Send stream (bulkBody)', t => {
  t.plan(4)
  function handler (req, res) {
    t.match(req.headers, {
      'content-type': 'application/x-ndjson'
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
    const pool = new ConnectionPool({ Connection })
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
      bulkBody: intoStream(JSON.stringify({ hello: 'world' }))
    }, (err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Not JSON payload from server', t => {
  t.plan(2)
  function handler (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello!')
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({ Connection })
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
    }, (err, { body }) => {
      t.error(err)
      t.strictEqual(body, 'hello!')
      server.stop()
    })
  })
})

test('NoLivingConnectionsError', t => {
  t.plan(1)
  const pool = new ConnectionPool({ Connection })

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
  }, (err, { body }) => {
    t.ok(err instanceof NoLivingConnectionsError)
  })
})

test('SerializationError', t => {
  t.plan(1)
  const pool = new ConnectionPool({ Connection })
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
  }, (err, { body }) => {
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
    const pool = new ConnectionPool({ Connection })
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
    }, (err, { body }) => {
      t.ok(err instanceof DeserializationError)
      server.stop()
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

  const pool = new CustomConnectionPool({ Connection: MockConnectionTimeout })
  pool.addConnection({
    url: new URL('http://localhost:9200'),
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
  }, (err, { body }) => {
    t.ok(err instanceof TimeoutError)
  })
})

test('ConnectionError (should call markDead on the failing connection)', t => {
  t.plan(2)

  class CustomConnectionPool extends ConnectionPool {
    markDead (connection) {
      t.strictEqual(connection.id, 'node1')
      super.markDead(connection)
    }
  }

  const pool = new CustomConnectionPool({ Connection: MockConnectionError })
  pool.addConnection({
    url: new URL('http://localhost:9200'),
    id: 'node1'
  })

  const transport = new Transport({
    emit: () => {},
    connectionPool: pool,
    serializer: new Serializer(),
    maxRetries: 0,
    requestTimeout: 30000,
    sniffInterval: false,
    sniffOnStart: false
  })

  transport.request({
    method: 'GET',
    path: '/hello'
  }, (err, { body }) => {
    t.ok(err instanceof ConnectionError)
  })
})

test('Retry mechanism', t => {
  t.plan(2)

  var count = 0
  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    if (count > 0) {
      res.end(JSON.stringify({ hello: 'world' }))
    } else {
      setTimeout(() => {
        res.end(JSON.stringify({ hello: 'world' }))
      }, 1000)
    }
    count++
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({ Connection })
    pool.addConnection([{
      url: new URL(`http://localhost:${port}`),
      id: 'node1'
    }, {
      url: new URL(`http://localhost:${port}`),
      id: 'node2'
    }, {
      url: new URL(`http://localhost:${port}`),
      id: 'node3'
    }])

    const transport = new Transport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 1,
      requestTimeout: 250,
      sniffInterval: false,
      sniffOnStart: false
    })

    transport.request({
      method: 'GET',
      path: '/hello'
    }, (err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Custom retry mechanism', t => {
  t.plan(2)

  var count = 0
  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    if (count > 0) {
      res.end(JSON.stringify({ hello: 'world' }))
    } else {
      setTimeout(() => {
        res.end(JSON.stringify({ hello: 'world' }))
      }, 1000)
    }
    count++
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({ Connection })
    pool.addConnection([{
      url: new URL(`http://localhost:${port}`),
      id: 'node1'
    }, {
      url: new URL(`http://localhost:${port}`),
      id: 'node2'
    }, {
      url: new URL(`http://localhost:${port}`),
      id: 'node3'
    }])

    const transport = new Transport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 0,
      requestTimeout: 250,
      sniffInterval: false,
      sniffOnStart: false
    })

    transport.request({
      method: 'GET',
      path: '/hello'
    }, {
      maxRetries: 1
    }, (err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Should not retry on 429', t => {
  t.plan(3)

  var count = 0
  function handler (req, res) {
    t.strictEqual(count++, 0)
    res.statusCode = 429
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({ Connection })
    pool.addConnection([{
      url: new URL(`http://localhost:${port}`),
      id: 'node1'
    }, {
      url: new URL(`http://localhost:${port}`),
      id: 'node2'
    }, {
      url: new URL(`http://localhost:${port}`),
      id: 'node3'
    }])

    const transport = new Transport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 5,
      requestTimeout: 250,
      sniffInterval: false,
      sniffOnStart: false
    })

    transport.request({
      method: 'GET',
      path: '/hello'
    }, (err, result) => {
      t.ok(err)
      t.strictEqual(err.statusCode, 429)
      server.stop()
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

  const pool = new CustomConnectionPool({ Connection: MockConnection })
  pool.addConnection({
    url: new URL('http://localhost:9200'),
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
  }, (err, { body }) => {
    t.error(err)
    t.deepEqual(body, { hello: 'world' })
  })
})

test('Should call resurrect on every request', t => {
  t.plan(3)

  class CustomConnectionPool extends ConnectionPool {
    resurrect (now) {
      t.type(now, 'number')
    }
  }

  const pool = new CustomConnectionPool({ Connection: MockConnection })
  pool.addConnection({
    url: new URL('http://localhost:9200'),
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
  }, (err, { body }) => {
    t.error(err)
    t.deepEqual(body, { hello: 'world' })
  })
})

test('Should return a request aborter utility', t => {
  t.plan(1)

  const pool = new ConnectionPool({ Connection, MockConnection })
  pool.addConnection({
    url: new URL('http://localhost:9200'),
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

test('Retry mechanism and abort', t => {
  t.plan(1)

  function handler (req, res) {
    setTimeout(() => {
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end(JSON.stringify({ hello: 'world' }))
    }, 1000)
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({ Connection })
    pool.addConnection([{
      url: new URL(`http://localhost:${port}`),
      id: 'node1'
    }, {
      url: new URL(`http://localhost:${port}`),
      id: 'node2'
    }, {
      url: new URL(`http://localhost:${port}`),
      id: 'node3'
    }])

    var count = 0
    const transport = new Transport({
      emit: event => {
        if (event === 'request' && count++ > 0) {
          request.abort()
          server.stop()
          t.pass('ok')
        }
      },
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 2,
      requestTimeout: 100,
      sniffInterval: false,
      sniffOnStart: false
    })

    const request = transport.request({
      method: 'GET',
      path: '/hello'
    }, (e, { body }) => {
      t.fail('Should not be called')
    })
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
    const pool = new ConnectionPool({ Connection })
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
    }, (err, { body }) => {
      t.ok(err instanceof ResponseError)
      t.deepEqual(err.body, { status: 500 })
      t.strictEqual(err.statusCode, 500)
      server.stop()
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
    const pool = new ConnectionPool({ Connection })
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
      path: '/hello'
    }, {
      requestTimeout: 2000
    }, (err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('sniff', t => {
  t.test('sniffOnStart', t => {
    t.plan(3)

    class CustomConnectionPool extends ConnectionPool {
      update () {
        t.ok('called')
        return this
      }

      nodesToHost (nodes) {
        t.ok('called')
        return []
      }
    }

    function handler (req, res) {
      t.strictEqual(req.url, '/sniff')
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end(JSON.stringify({ hello: 'world' }))
    }

    buildServer(handler, ({ port }, server) => {
      const pool = new CustomConnectionPool({ Connection })
      pool.addConnection(`http://localhost:${port}`)

      // eslint-disable-next-line
      new Transport({
        emit: () => {},
        connectionPool: pool,
        serializer: new Serializer(),
        maxRetries: 3,
        requestTimeout: 30000,
        sniffInterval: false,
        sniffOnStart: true,
        sniffEndpoint: '/sniff'
      })

      setTimeout(() => server.stop(), 100)
    })
  })

  t.test('sniffOnConnectionFault', t => {
    t.plan(3)

    class CustomConnectionPool extends ConnectionPool {
      update () {
        t.ok('called')
        return this
      }

      nodesToHost (nodes) {
        t.ok('called')
        return []
      }
    }

    function handler (req, res) {
      if (req.url === '/other/sniff') {
        res.setHeader('Content-Type', 'application/json;utf=8')
        res.end(JSON.stringify({ hello: 'world' }))
      } else {
        setTimeout(() => res.end(), 1000)
      }
    }

    buildServer(handler, ({ port }, server) => {
      const pool = new CustomConnectionPool({ Connection })
      pool.addConnection(`http://localhost:${port}`)
      pool.addConnection(`http://localhost:${port}/other`)

      const transport = new Transport({
        emit: () => {},
        connectionPool: pool,
        serializer: new Serializer(),
        maxRetries: 0,
        requestTimeout: 500,
        sniffInterval: false,
        sniffOnConnectionFault: true,
        sniffEndpoint: '/sniff'
      })

      transport.request({
        method: 'GET',
        path: '/'
      }, (err, { body }) => {
        t.ok(err instanceof TimeoutError)
      })

      setTimeout(() => server.stop(), 1100)
    })
  })

  t.test('sniffInterval', t => {
    t.plan(9)

    class CustomConnectionPool extends ConnectionPool {
      update () {
        return this
      }

      nodesToHost (nodes) {
        return []
      }
    }

    function handler (req, res) {
      // this should be called 6 times
      t.ok('called')
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end(JSON.stringify({ hello: 'world' }))
    }

    buildServer(handler, ({ port }, server) => {
      const pool = new CustomConnectionPool({ Connection })
      pool.addConnection(`http://localhost:${port}`)

      const transport = new Transport({
        emit: () => {},
        connectionPool: pool,
        serializer: new Serializer(),
        maxRetries: 3,
        requestTimeout: 3000,
        sniffInterval: 1,
        sniffEndpoint: '/sniff'
      })

      const params = { method: 'GET', path: '/' }
      setTimeout(() => {
        transport.request(params, t.error)
      }, 100)

      setTimeout(() => {
        transport.request(params, t.error)
      }, 200)

      setTimeout(() => {
        transport.request(params, t.error)
      }, 300)

      setTimeout(() => {
        server.stop()
      }, 400)
    })
  })

  t.test('errored', t => {
    t.plan(1)

    class CustomConnectionPool extends ConnectionPool {
      nodesToHost () {
        t.fail('This should not be called')
      }
    }

    const pool = new CustomConnectionPool({ Connection: MockConnectionError })
    pool.addConnection('http://localhost:9200')

    const transport = new Transport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 0,
      requestTimeout: 30000,
      sniffInterval: false,
      sniffEndpoint: '/sniff'
    })

    transport.sniff((err, hosts) => {
      t.ok(err instanceof ConnectionError)
    })
  })

  t.end()
})

test(`Should mark as dead connections where the statusCode is 502/3/4
      and return a ResponseError if there are no more attempts`, t => {
  ;[502, 503, 504].forEach(runTest)

  function runTest (statusCode) {
    t.test(statusCode, t => {
      t.plan(3)

      class CustomConnectionPool extends ConnectionPool {
        markDead (connection) {
          t.ok('called')
          super.markDead(connection)
        }
      }

      const pool = new CustomConnectionPool({ Connection: MockConnection })
      pool.addConnection('http://localhost:9200')

      const transport = new Transport({
        emit: () => {},
        connectionPool: pool,
        serializer: new Serializer(),
        maxRetries: 0,
        requestTimeout: 30000,
        sniffInterval: false,
        sniffOnStart: false
      })

      transport.request({
        method: 'GET',
        path: `/${statusCode}`
      }, (err, { body }) => {
        t.ok(err instanceof ResponseError)
        t.match(err, {
          body: { hello: 'world' },
          headers: { 'content-type': 'application/json;utf=8' },
          statusCode: statusCode
        })
      })
    })
  }

  t.end()
})

test('Should retry the request if the statusCode is 502/3/4', t => {
  ;[502, 503, 504].forEach(runTest)

  function runTest (statusCode) {
    t.test(statusCode, t => {
      t.plan(3)

      var first = true
      function handler (req, res) {
        if (first) {
          first = false
          res.statusCode = statusCode
        }
        res.setHeader('Content-Type', 'application/json;utf=8')
        res.end(JSON.stringify({ hello: 'world' }))
      }

      class CustomConnectionPool extends ConnectionPool {
        markDead (connection) {
          t.ok('called')
        }
      }

      buildServer(handler, ({ port }, server) => {
        const pool = new CustomConnectionPool({ Connection })
        pool.addConnection(`http://localhost:${port}`)

        const transport = new Transport({
          emit: () => {},
          connectionPool: pool,
          serializer: new Serializer(),
          maxRetries: 1,
          requestTimeout: 30000,
          sniffInterval: false,
          sniffOnStart: false
        })

        transport.request({
          method: 'GET',
          path: '/hello'
        }, (err, { body }) => {
          t.error(err)
          t.deepEqual(body, { hello: 'world' })
          server.stop()
        })
      })
    })
  }

  t.end()
})

test('Ignore status code', t => {
  t.plan(4)

  const pool = new ConnectionPool({ Connection: MockConnection })
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

  transport.request({
    method: 'GET',
    path: '/404'
  }, {
    ignore: [404]
  }, (err, { body }) => {
    t.error(err)
    t.deepEqual(body, { hello: 'world' })
  })

  transport.request({
    method: 'GET',
    path: '/404'
  }, (err, { body }) => {
    t.ok(err instanceof ResponseError)
  })

  transport.request({
    method: 'GET',
    path: '/404'
  }, {
    ignore: [403, 405]
  }, (err, { body }) => {
    t.ok(err instanceof ResponseError)
  })
})

test('Should serialize the querystring', t => {
  t.plan(2)

  function handler (req, res) {
    t.strictEqual(req.url, '/hello?hello=world&you_know=for%20search')
    res.end('ok')
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({ Connection })
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
      path: '/hello',
      querystring: {
        hello: 'world',
        you_know: 'for search'
      }
    }, (err, { body }) => {
      t.error(err)
      server.stop()
    })
  })
})

test('timeout option', t => {
  function handler (req, res) {
    setTimeout(() => {
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end(JSON.stringify({ hello: 'world' }))
    }, 1000)
  }

  t.test('as number', t => {
    t.test('global', t => {
      t.plan(1)

      buildServer(handler, ({ port }, server) => {
        const pool = new ConnectionPool({ Connection })
        pool.addConnection({
          url: new URL(`http://localhost:${port}`),
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
        }, (err, { body }) => {
          t.ok(err instanceof TimeoutError)
          server.stop()
        })
      })
    })

    t.test('custom', t => {
      t.plan(1)

      buildServer(handler, ({ port }, server) => {
        const pool = new ConnectionPool({ Connection })
        pool.addConnection({
          url: new URL(`http://localhost:${port}`),
          id: 'node1'
        })

        const transport = new Transport({
          emit: () => {},
          connectionPool: pool,
          serializer: new Serializer(),
          maxRetries: 0,
          requestTimeout: 30000,
          sniffInterval: false,
          sniffOnStart: false
        })

        transport.request({
          method: 'GET',
          path: '/hello'
        }, {
          requestTimeout: 500
        }, (err, { body }) => {
          t.ok(err instanceof TimeoutError)
          server.stop()
        })
      })
    })

    t.end()
  })

  t.test('as string', t => {
    t.test('global', t => {
      t.plan(1)

      buildServer(handler, ({ port }, server) => {
        const pool = new ConnectionPool({ Connection })
        pool.addConnection({
          url: new URL(`http://localhost:${port}`),
          id: 'node1'
        })

        const transport = new Transport({
          emit: () => {},
          connectionPool: pool,
          serializer: new Serializer(),
          maxRetries: 0,
          requestTimeout: '0.5s',
          sniffInterval: false,
          sniffOnStart: false
        })

        transport.request({
          method: 'GET',
          path: '/hello'
        }, (err, { body }) => {
          t.ok(err instanceof TimeoutError)
          server.stop()
        })
      })
    })

    t.test('custom', t => {
      t.plan(1)

      buildServer(handler, ({ port }, server) => {
        const pool = new ConnectionPool({ Connection })
        pool.addConnection({
          url: new URL(`http://localhost:${port}`),
          id: 'node1'
        })

        const transport = new Transport({
          emit: () => {},
          connectionPool: pool,
          serializer: new Serializer(),
          maxRetries: 0,
          requestTimeout: '30s',
          sniffInterval: false,
          sniffOnStart: false
        })

        transport.request({
          method: 'GET',
          path: '/hello'
        }, {
          requestTimeout: '0.5s'
        }, (err, { body }) => {
          t.ok(err instanceof TimeoutError)
          server.stop()
        })
      })
    })

    t.end()
  })

  t.end()
})

test('Should cast to boolean HEAD request', t => {
  t.test('2xx response', t => {
    t.plan(3)
    const pool = new ConnectionPool({ Connection: MockConnection })
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

    transport.request({
      method: 'HEAD',
      path: '/200'
    }, (err, { body, statusCode }) => {
      t.error(err)
      t.strictEqual(statusCode, 200)
      t.strictEqual(body, true)
    })
  })

  t.test('404 response', t => {
    t.plan(3)
    const pool = new ConnectionPool({ Connection: MockConnection })
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

    transport.request({
      method: 'HEAD',
      path: '/404'
    }, (err, { body, statusCode }) => {
      t.error(err)
      t.strictEqual(statusCode, 404)
      t.strictEqual(body, false)
    })
  })

  t.test('4xx response', t => {
    t.plan(2)

    const pool = new ConnectionPool({ Connection: MockConnection })
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

    transport.request({
      method: 'HEAD',
      path: '/400'
    }, (err, { body, statusCode }) => {
      t.ok(err instanceof ResponseError)
      t.strictEqual(statusCode, 400)
    })
  })

  t.test('5xx response', t => {
    t.plan(2)
    const pool = new ConnectionPool({ Connection: MockConnection })
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

    transport.request({
      method: 'HEAD',
      path: '/500'
    }, (err, { body, statusCode }) => {
      t.ok(err instanceof ResponseError)
      t.strictEqual(statusCode, 500)
    })
  })

  t.end()
})

test('Suggest compression', t => {
  t.plan(2)
  function handler (req, res) {
    t.match(req.headers, {
      'accept-encoding': 'gzip,deflate'
    })
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({ Connection })
    pool.addConnection(`http://localhost:${port}`)

    const transport = new Transport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 3,
      requestTimeout: 30000,
      sniffInterval: false,
      sniffOnStart: false,
      suggestCompression: true
    })

    transport.request({
      method: 'GET',
      path: '/hello'
    }, (err, { body }) => {
      t.error(err)
      server.stop()
    })
  })
})

test('Warning header', t => {
  t.test('Single warning', t => {
    t.plan(3)

    const warn = '112 - "cache down" "Wed, 21 Oct 2015 07:28:00 GMT"'
    function handler (req, res) {
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.setHeader('Warning', warn)
      res.end(JSON.stringify({ hello: 'world' }))
    }

    buildServer(handler, ({ port }, server) => {
      const pool = new ConnectionPool({ Connection })
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
      }, (err, { warnings }) => {
        t.error(err)
        t.deepEqual(warnings, [warn])
        warnings.forEach(w => t.type(w, 'string'))
        server.stop()
      })
    })
  })

  t.test('Multiple warnings', t => {
    t.plan(4)

    const warn1 = '112 - "cache down" "Wed, 21 Oct 2015 07:28:00 GMT"'
    const warn2 = '199 agent "Error message" "2015-01-01"'
    function handler (req, res) {
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.setHeader('Warning', warn1 + ',' + warn2)
      res.end(JSON.stringify({ hello: 'world' }))
    }

    buildServer(handler, ({ port }, server) => {
      const pool = new ConnectionPool({ Connection })
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
      }, (err, { warnings }) => {
        t.error(err)
        t.deepEqual(warnings, [warn1, warn2])
        warnings.forEach(w => t.type(w, 'string'))
        server.stop()
      })
    })
  })

  t.test('No warnings', t => {
    t.plan(2)

    function handler (req, res) {
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end(JSON.stringify({ hello: 'world' }))
    }

    buildServer(handler, ({ port }, server) => {
      const pool = new ConnectionPool({ Connection })
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
      }, (err, { warnings }) => {
        t.error(err)
        t.strictEqual(warnings, null)
        server.stop()
      })
    })
  })

  t.test('Multiple warnings and external warning', t => {
    t.plan(5)

    const warn1 = '112 - "cache down" "Wed, 21 Oct 2015 07:28:00 GMT"'
    const warn2 = '199 agent "Error message" "2015-01-01"'
    function handler (req, res) {
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.setHeader('Warning', warn1 + ',' + warn2)
      res.end(JSON.stringify({ hello: 'world' }))
    }

    buildServer(handler, ({ port }, server) => {
      const pool = new ConnectionPool({ Connection })
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
      }, {
        warnings: ['winter is coming']
      }, (err, { warnings }) => {
        t.error(err)
        t.deepEqual(warnings, ['winter is coming', warn1, warn2])
        warnings.forEach(w => t.type(w, 'string'))
        server.stop()
      })
    })
  })

  t.end()
})

test('asStream set to true', t => {
  t.plan(3)
  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const pool = new ConnectionPool({ Connection })
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
    }, {
      asStream: true
    }, (err, { body, headers }) => {
      t.error(err)
      t.match(headers, {
        connection: 'keep-alive',
        'content-type': 'application/json;utf=8'
      })

      var payload = ''
      body.setEncoding('utf8')
      body.on('data', chunk => { payload += chunk })
      body.on('error', err => t.fail(err))
      body.on('end', () => {
        t.deepEqual(JSON.parse(payload), { hello: 'world' })
        server.stop()
      })
    })
  })
})

test('Compress request', t => {
  t.test('gzip as request option', t => {
    t.plan(4)
    function handler (req, res) {
      t.match(req.headers, {
        'content-type': 'application/json',
        'content-encoding': 'gzip'
      })
      var json = ''
      req
        .pipe(createGunzip())
        .on('data', chunk => { json += chunk })
        .on('error', err => t.fail(err))
        .on('end', () => {
          t.deepEqual(JSON.parse(json), { you_know: 'for search' })
          res.setHeader('Content-Type', 'application/json;utf=8')
          res.end(JSON.stringify({ you_know: 'for search' }))
        })
    }

    buildServer(handler, ({ port }, server) => {
      const pool = new ConnectionPool({ Connection })
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
        body: { you_know: 'for search' }
      }, {
        compression: 'gzip'
      }, (err, { body }) => {
        t.error(err)
        t.deepEqual(body, { you_know: 'for search' })
        server.stop()
      })
    })
  })

  t.test('gzip as transport option', t => {
    t.plan(4)
    function handler (req, res) {
      t.match(req.headers, {
        'content-type': 'application/json',
        'content-encoding': 'gzip'
      })
      var json = ''
      req
        .pipe(createGunzip())
        .on('data', chunk => { json += chunk })
        .on('error', err => t.fail(err))
        .on('end', () => {
          t.deepEqual(JSON.parse(json), { you_know: 'for search' })
          res.setHeader('Content-Type', 'application/json;utf=8')
          res.end(JSON.stringify({ you_know: 'for search' }))
        })
    }

    buildServer(handler, ({ port }, server) => {
      const pool = new ConnectionPool({ Connection })
      pool.addConnection(`http://localhost:${port}`)

      const transport = new Transport({
        emit: () => {},
        connectionPool: pool,
        serializer: new Serializer(),
        maxRetries: 3,
        requestTimeout: 30000,
        sniffInterval: false,
        sniffOnStart: false,
        compression: 'gzip'
      })

      transport.request({
        method: 'POST',
        path: '/hello',
        body: { you_know: 'for search' }
      }, (err, { body }) => {
        t.error(err)
        t.deepEqual(body, { you_know: 'for search' })
        server.stop()
      })
    })
  })

  test('Should throw on invalid compression value', t => {
    t.plan(2)

    try {
      new Transport({ // eslint-disable-line
        emit: () => {},
        connectionPool: new ConnectionPool({ Connection }),
        serializer: new Serializer(),
        maxRetries: 3,
        requestTimeout: 30000,
        sniffInterval: false,
        sniffOnStart: false,
        compression: 'deflate'
      })
      t.fail('Should throw')
    } catch (err) {
      t.true(err instanceof ConfigurationError)
      t.is(err.message, 'Invalid compression: \'deflate\'')
    }
  })

  t.end()
})
