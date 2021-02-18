/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict'

const { test } = require('tap')
const { URL } = require('url')
const FakeTimers = require('@sinonjs/fake-timers')
const { createGunzip, gzipSync } = require('zlib')
const os = require('os')
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
  ConfigurationError,
  RequestAbortedError
} = require('../../lib/errors')

const ConnectionPool = require('../../lib/pool/ConnectionPool')
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

test('Basic - failing (promises support)', t => {
  t.plan(1)

  const pool = new ConnectionPool({ Connection: MockConnectionTimeout })
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
    .catch(err => {
      t.ok(err instanceof TimeoutError)
    })
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
    let json = ''
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
    let json = ''
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
    let json = ''
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
    let json = ''
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

test('NoLivingConnectionsError (null connection)', t => {
  t.plan(3)
  const pool = new ConnectionPool({ Connection })
  pool.addConnection('http://localhost:9200')

  const transport = new Transport({
    emit: () => {},
    connectionPool: pool,
    serializer: new Serializer(),
    maxRetries: 3,
    requestTimeout: 30000,
    sniffInterval: false,
    sniffOnStart: false,
    nodeSelector (connections) {
      t.is(connections.length, 1)
      t.true(connections[0] instanceof Connection)
      return null
    }
  })

  transport.request({
    method: 'GET',
    path: '/hello'
  }, (err, { body }) => {
    t.ok(err instanceof NoLivingConnectionsError)
  })
})

test('NoLivingConnectionsError (undefined connection)', t => {
  t.plan(3)
  const pool = new ConnectionPool({ Connection })
  pool.addConnection('http://localhost:9200')

  const transport = new Transport({
    emit: () => {},
    connectionPool: pool,
    serializer: new Serializer(),
    maxRetries: 3,
    requestTimeout: 30000,
    sniffInterval: false,
    sniffOnStart: false,
    nodeSelector (connections) {
      t.is(connections.length, 1)
      t.true(connections[0] instanceof Connection)
      return undefined
    }
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

test('SerializationError (bulk)', t => {
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

  const bulkBody = { hello: 'world' }
  bulkBody.o = bulkBody
  transport.request({
    method: 'POST',
    path: '/hello',
    bulkBody
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

  let count = 0
  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    if (count > 0) {
      res.end(JSON.stringify({ hello: 'world' }))
    } else {
      res.statusCode = 504
      res.end(JSON.stringify({ error: true }))
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

test('Should not retry if the body is a stream', t => {
  t.plan(2)

  let count = 0
  function handler (req, res) {
    count++
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.statusCode = 504
    res.end(JSON.stringify({ error: true }))
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
      sniffInterval: false,
      sniffOnStart: false
    })

    transport.request({
      method: 'POST',
      path: '/hello',
      body: intoStream(JSON.stringify({ hello: 'world' }))
    }, (err, { body }) => {
      t.ok(err instanceof ResponseError)
      t.strictEqual(count, 1)
      server.stop()
    })
  })
})

test('Should not retry if the bulkBody is a stream', t => {
  t.plan(2)

  let count = 0
  function handler (req, res) {
    count++
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.statusCode = 504
    res.end(JSON.stringify({ error: true }))
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
      sniffInterval: false,
      sniffOnStart: false
    })

    transport.request({
      method: 'POST',
      path: '/hello',
      bulkBody: intoStream(JSON.stringify([{ hello: 'world' }]))
    }, (err, { body }) => {
      t.ok(err instanceof ResponseError)
      t.strictEqual(count, 1)
      server.stop()
    })
  })
})

test('No retry', t => {
  t.plan(2)

  let count = 0
  function handler (req, res) {
    count++
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.statusCode = 504
    res.end(JSON.stringify({ error: true }))
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
      maxRetries: 3,
      sniffInterval: false,
      sniffOnStart: false
    })

    transport.request({
      method: 'POST',
      path: '/hello',
      body: intoStream(JSON.stringify({ hello: 'world' }))
    }, {
      maxRetries: 0
    }, (err, { body }) => {
      t.ok(err instanceof ResponseError)
      t.strictEqual(count, 1)
      server.stop()
    })
  })
})

test('Custom retry mechanism', t => {
  t.plan(2)

  let count = 0
  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    if (count > 0) {
      res.end(JSON.stringify({ hello: 'world' }))
    } else {
      res.statusCode = 504
      res.end(JSON.stringify({ error: true }))
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

  let count = 0
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
  t.plan(5)

  class CustomConnectionPool extends ConnectionPool {
    resurrect ({ now, requestId, name }) {
      t.type(now, 'number')
      t.type(requestId, 'number')
      t.type(name, 'string')
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
    sniffOnStart: false,
    name: 'elasticsearch-js'
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

  const pool = new ConnectionPool({ Connection: MockConnection })
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
  }, (err, result) => {
    t.ok(err instanceof RequestAbortedError)
  })

  request.abort()
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

    let count = 0
    const transport = new Transport({
      emit: event => {
        if (event === 'request' && count++ > 0) {
          request.abort()
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
    }, (err, result) => {
      t.ok(err instanceof RequestAbortedError)
      server.stop()
    })
  })
})

test('Abort a request with the promise API', t => {
  t.plan(1)

  const pool = new ConnectionPool({ Connection: MockConnection })
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
  })

  request
    .then(() => {
      t.fail('Should not be called')
    })
    .catch(err => {
      t.ok(err instanceof RequestAbortedError)
    })

  request.abort()
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
    t.plan(1)

    class MyTransport extends Transport {
      sniff (opts) {
        t.strictEqual(opts.reason, Transport.sniffReasons.SNIFF_ON_START)
      }
    }

    const pool = new ConnectionPool({ Connection })
    pool.addConnection('http://localhost:9200')

    // eslint-disable-next-line
    new MyTransport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 3,
      requestTimeout: 30000,
      sniffInterval: false,
      sniffOnStart: true,
      sniffEndpoint: '/sniff'
    })
  })

  t.test('sniffOnConnectionFault', t => {
    t.plan(2)

    class MyTransport extends Transport {
      sniff (opts) {
        t.strictEqual(opts.reason, Transport.sniffReasons.SNIFF_ON_CONNECTION_FAULT)
      }
    }

    const pool = new ConnectionPool({ Connection: MockConnectionTimeout })
    pool.addConnection('http://localhost:9200')

    const transport = new MyTransport({
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
  })

  t.test('sniffInterval', t => {
    t.plan(6)

    const clock = FakeTimers.install({ toFake: ['Date'] })
    t.teardown(() => clock.uninstall())

    class MyTransport extends Transport {
      sniff (opts) {
        t.strictEqual(opts.reason, Transport.sniffReasons.SNIFF_INTERVAL)
      }
    }

    const pool = new ConnectionPool({ Connection: MockConnection })
    pool.addConnection('http://localhost:9200')

    const transport = new MyTransport({
      emit: () => {},
      connectionPool: pool,
      serializer: new Serializer(),
      maxRetries: 3,
      requestTimeout: 3000,
      sniffInterval: 1,
      sniffEndpoint: '/sniff'
    })

    const params = { method: 'GET', path: '/' }
    clock.tick(100)
    transport.request(params, t.error)

    clock.tick(200)
    transport.request(params, t.error)

    clock.tick(300)
    transport.request(params, t.error)
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

      let first = true
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
  t.plan(3)
  function handler (req, res) {
    t.match(req.headers, {
      'accept-encoding': 'gzip,deflate'
    })

    const body = gzipSync(JSON.stringify({ hello: 'world' }))
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.setHeader('Content-Encoding', 'gzip')
    res.setHeader('Content-Length', Buffer.byteLength(body))
    res.end(body)
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
      t.deepEqual(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Broken compression', t => {
  t.plan(2)
  function handler (req, res) {
    t.match(req.headers, {
      'accept-encoding': 'gzip,deflate'
    })

    const body = gzipSync(JSON.stringify({ hello: 'world' }))
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.setHeader('Content-Encoding', 'gzip')
    // we are not setting the content length on purpose
    res.end(body.slice(0, -5))
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
      t.ok(err)
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

      let payload = ''
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
      let json = ''
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
      let json = ''
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

  t.test('gzip stream body', t => {
    t.plan(4)
    function handler (req, res) {
      t.match(req.headers, {
        'content-type': 'application/json',
        'content-encoding': 'gzip'
      })
      let json = ''
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
        body: intoStream(JSON.stringify({ you_know: 'for search' }))
      }, {
        compression: 'gzip'
      }, (err, { body }) => {
        t.error(err)
        t.deepEqual(body, { you_know: 'for search' })
        server.stop()
      })
    })
  })

  t.test('Should throw on invalid compression value', t => {
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

  t.test('Should skip the compression for empty strings/null/undefined', t => {
    t.plan(9)

    function handler (req, res) {
      t.strictEqual(req.headers['content-encoding'], undefined)
      t.strictEqual(req.headers['content-type'], undefined)
      res.end()
    }

    buildServer(handler, ({ port }, server) => {
      const pool = new ConnectionPool({ Connection })
      pool.addConnection(`http://localhost:${port}`)

      const transport = new Transport({
        emit: () => {},
        connectionPool: pool,
        serializer: new Serializer(),
        maxRetries: 3,
        compression: 'gzip',
        requestTimeout: 30000,
        sniffInterval: false,
        sniffOnStart: false
      })

      transport.request({
        method: 'DELETE',
        path: '/hello',
        body: ''
      }, (err, { body }) => {
        t.error(err)
        transport.request({
          method: 'GET',
          path: '/hello',
          body: null
        }, (err, { body }) => {
          t.error(err)
          transport.request({
            method: 'GET',
            path: '/hello',
            body: undefined
          }, (err, { body }) => {
            t.error(err)
            server.stop()
          })
        })
      })
    })
  })

  t.test('Retry a gzipped body', t => {
    t.plan(7)

    let count = 0
    function handler (req, res) {
      t.match(req.headers, {
        'content-type': 'application/json',
        'content-encoding': 'gzip'
      })
      let json = ''
      req
        .pipe(createGunzip())
        .on('data', chunk => { json += chunk })
        .on('error', err => t.fail(err))
        .on('end', () => {
          t.deepEqual(JSON.parse(json), { you_know: 'for search' })
          res.setHeader('Content-Type', 'application/json;utf=8')
          if (count++ > 0) {
            res.end(JSON.stringify({ you_know: 'for search' }))
          } else {
            setTimeout(() => {
              res.end(JSON.stringify({ you_know: 'for search' }))
            }, 1000)
          }
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
        requestTimeout: 250,
        sniffInterval: false,
        sniffOnStart: false
      })

      transport.request({
        method: 'POST',
        path: '/hello',
        body: { you_know: 'for search' }
      }, {
        compression: 'gzip'
      }, (err, { body, meta }) => {
        t.error(err)
        t.deepEqual(body, { you_know: 'for search' })
        t.strictEqual(count, 2)
        server.stop()
      })
    })
  })

  t.end()
})

test('Headers configuration', t => {
  t.test('Global option', t => {
    t.plan(3)
    function handler (req, res) {
      t.match(req.headers, { 'x-foo': 'bar' })
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
        headers: {
          'x-foo': 'bar'
        }
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

  t.test('Global option and custom option', t => {
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
        headers: {
          'x-foo': 'bar'
        }
      })

      transport.request({
        method: 'GET',
        path: '/hello'
      }, {
        headers: { 'x-baz': 'faz' }
      }, (err, { body }) => {
        t.error(err)
        t.deepEqual(body, { hello: 'world' })
        server.stop()
      })
    })
  })

  t.test('Custom options should override global option', t => {
    t.plan(3)
    function handler (req, res) {
      t.match(req.headers, { 'x-foo': 'faz' })
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
        headers: {
          'x-foo': 'bar'
        }
      })

      transport.request({
        method: 'GET',
        path: '/hello'
      }, {
        headers: { 'x-foo': 'faz' }
      }, (err, { body }) => {
        t.error(err)
        t.deepEqual(body, { hello: 'world' })
        server.stop()
      })
    })
  })

  t.end()
})

test('nodeFilter and nodeSelector', t => {
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
    sniffOnStart: false,
    nodeFilter: () => {
      t.ok('called')
      return true
    },
    nodeSelector: conns => {
      t.ok('called')
      return conns[0]
    }
  })

  transport.request({
    method: 'GET',
    path: '/hello'
  }, (err, { body }) => {
    t.error(err)
    t.deepEqual(body, { hello: 'world' })
  })
})

test('Should accept custom querystring in the optons object', t => {
  t.test('Options object', t => {
    t.plan(3)

    function handler (req, res) {
      t.strictEqual(req.url, '/hello?foo=bar')
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
        querystring: { foo: 'bar' }
      }, (err, { body }) => {
        t.error(err)
        t.deepEqual(body, { hello: 'world' })
        server.stop()
      })
    })
  })

  t.test('Options object and params', t => {
    t.plan(3)

    function handler (req, res) {
      t.strictEqual(req.url, '/hello?baz=faz&foo=bar')
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
        path: '/hello',
        querystring: { baz: 'faz' }
      }, {
        querystring: { foo: 'bar' }
      }, (err, { body }) => {
        t.error(err)
        t.deepEqual(body, { hello: 'world' })
        server.stop()
      })
    })
  })

  t.end()
})

test('Should add an User-Agent header', t => {
  t.plan(2)
  const clientVersion = require('../../package.json').version
  const userAgent = `elasticsearch-js/${clientVersion} (${os.platform()} ${os.release()}-${os.arch()}; Node.js ${process.version})`

  function handler (req, res) {
    t.match(req.headers, {
      'user-agent': userAgent
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
      sniffOnStart: false
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

test('Should pass request params and options to generateRequestId', t => {
  t.plan(3)

  const pool = new ConnectionPool({ Connection: MockConnection })
  pool.addConnection('http://localhost:9200')

  const params = { method: 'GET', path: '/hello' }
  const options = { context: { winter: 'is coming' } }

  const transport = new Transport({
    emit: () => {},
    connectionPool: pool,
    serializer: new Serializer(),
    maxRetries: 3,
    requestTimeout: 30000,
    sniffInterval: false,
    sniffOnStart: false,
    generateRequestId: function (requestParams, requestOptions) {
      t.deepEqual(requestParams, params)
      t.deepEqual(requestOptions, options)
      return 'id'
    }
  })

  transport.request(params, options, t.error)
})

test('Secure json parsing', t => {
  t.test('__proto__ protection', t => {
    t.plan(2)
    function handler (req, res) {
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end('{"__proto__":{"a":1}}')
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
        t.true(err instanceof DeserializationError)
        t.is(err.message, 'Object contains forbidden prototype property')
        server.stop()
      })
    })
  })

  t.test('constructor protection', t => {
    t.plan(2)
    function handler (req, res) {
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end('{"constructor":{"prototype":{"bar":"baz"}}}')
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
        t.true(err instanceof DeserializationError)
        t.is(err.message, 'Object contains forbidden prototype property')
        server.stop()
      })
    })
  })

  t.end()
})

test('Lowercase headers utilty', t => {
  t.plan(4)
  const { lowerCaseHeaders } = Transport.internals

  t.deepEqual(lowerCaseHeaders({
    Foo: 'bar',
    Faz: 'baz',
    'X-Hello': 'world'
  }), {
    foo: 'bar',
    faz: 'baz',
    'x-hello': 'world'
  })

  t.deepEqual(lowerCaseHeaders({
    Foo: 'bar',
    faz: 'baz',
    'X-hello': 'world'
  }), {
    foo: 'bar',
    faz: 'baz',
    'x-hello': 'world'
  })

  t.strictEqual(lowerCaseHeaders(null), null)

  t.strictEqual(lowerCaseHeaders(undefined), undefined)
})

test('The callback with a sync error should be called in the next tick - json', t => {
  t.plan(4)
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

  const body = { a: true }
  body.o = body

  const transportReturn = transport.request({
    method: 'POST',
    path: '/hello',
    body
  }, (err, { body }) => {
    t.ok(err instanceof SerializationError)
  })

  t.type(transportReturn.then, 'function')
  t.type(transportReturn.catch, 'function')
  t.type(transportReturn.abort, 'function')
})

test('The callback with a sync error should be called in the next tick - ndjson', t => {
  t.plan(4)
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

  const field = { a: true }
  field.o = field

  const transportReturn = transport.request({
    method: 'POST',
    path: '/hello',
    bulkBody: [field]
  }, (err, { body }) => {
    t.ok(err instanceof SerializationError)
  })

  t.type(transportReturn.then, 'function')
  t.type(transportReturn.catch, 'function')
  t.type(transportReturn.abort, 'function')
})
