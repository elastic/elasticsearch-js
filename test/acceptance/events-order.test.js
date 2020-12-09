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
const intoStream = require('into-stream')
const { Client, Connection, events } = require('../../index')
const {
  TimeoutError,
  ConnectionError,
  ResponseError,
  RequestAbortedError,
  SerializationError,
  DeserializationError
} = require('../../lib/errors')
const {
  buildServer,
  connection: {
    MockConnection,
    MockConnectionError,
    MockConnectionTimeout,
    buildMockConnection
  }
} = require('../utils')

test('No errors', t => {
  t.plan(10)

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const order = [
    events.SERIALIZATION,
    events.REQUEST,
    events.DESERIALIZATION,
    events.RESPONSE
  ]

  client.on(events.SERIALIZATION, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.SERIALIZATION)
  })

  client.on(events.REQUEST, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.REQUEST)
  })

  client.on(events.DESERIALIZATION, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.DESERIALIZATION)
  })

  client.on(events.RESPONSE, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.RESPONSE)
  })

  client.info((err, result) => {
    t.error(err)
    t.strictEqual(order.length, 0)
  })
})

test('Connection error', t => {
  t.plan(10)

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnectionError,
    maxRetries: 1
  })

  const order = [
    events.SERIALIZATION,
    events.REQUEST,
    events.REQUEST,
    events.RESPONSE
  ]

  client.on(events.SERIALIZATION, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.SERIALIZATION)
  })

  client.on(events.REQUEST, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.REQUEST)
  })

  client.on(events.DESERIALIZATION, (_err, request) => {
    t.fail('Should not be called')
  })

  client.on(events.RESPONSE, (err, request) => {
    t.ok(err instanceof ConnectionError)
    t.strictEqual(order.shift(), events.RESPONSE)
  })

  client.info((err, result) => {
    t.ok(err instanceof ConnectionError)
    t.strictEqual(order.length, 0)
  })
})

test('TimeoutError error', t => {
  t.plan(10)

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnectionTimeout,
    maxRetries: 1
  })

  const order = [
    events.SERIALIZATION,
    events.REQUEST,
    events.REQUEST,
    events.RESPONSE
  ]

  client.on(events.SERIALIZATION, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.SERIALIZATION)
  })

  client.on(events.REQUEST, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.REQUEST)
  })

  client.on(events.DESERIALIZATION, (_err, request) => {
    t.fail('Should not be called')
  })

  client.on(events.RESPONSE, (err, request) => {
    t.ok(err instanceof TimeoutError)
    t.strictEqual(order.shift(), events.RESPONSE)
  })

  client.info((err, result) => {
    t.ok(err instanceof TimeoutError)
    t.strictEqual(order.length, 0)
  })
})

test('RequestAbortedError error', t => {
  t.plan(8)

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnectionTimeout,
    maxRetries: 1
  })

  const order = [
    events.SERIALIZATION,
    events.REQUEST,
    events.RESPONSE
  ]

  client.on(events.SERIALIZATION, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.SERIALIZATION)
  })

  client.on(events.REQUEST, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.REQUEST)
  })

  client.on(events.DESERIALIZATION, (_err, request) => {
    t.fail('Should not be called')
  })

  client.on(events.RESPONSE, (err, request) => {
    t.ok(err instanceof RequestAbortedError)
    t.strictEqual(order.shift(), events.RESPONSE)
  })

  const request = client.info((err, result) => {
    t.ok(err instanceof RequestAbortedError)
    t.strictEqual(order.length, 0)
  })

  request.abort()
})

test('ResponseError error (no retry)', t => {
  t.plan(10)

  const MockConnection = buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 400,
        body: { hello: 'world' }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection,
    maxRetries: 1
  })

  const order = [
    events.SERIALIZATION,
    events.REQUEST,
    events.DESERIALIZATION,
    events.RESPONSE
  ]

  client.on(events.SERIALIZATION, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.SERIALIZATION)
  })

  client.on(events.REQUEST, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.REQUEST)
  })

  client.on(events.DESERIALIZATION, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.DESERIALIZATION)
  })

  client.on(events.RESPONSE, (err, request) => {
    t.ok(err instanceof ResponseError)
    t.strictEqual(order.shift(), events.RESPONSE)
  })

  client.info((err, result) => {
    t.ok(err instanceof ResponseError)
    t.strictEqual(order.length, 0)
  })
})

test('ResponseError error (with retry)', t => {
  t.plan(14)

  const MockConnection = buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 504,
        body: { hello: 'world' }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection,
    maxRetries: 1
  })

  const order = [
    events.SERIALIZATION,
    events.REQUEST,
    events.DESERIALIZATION,
    events.REQUEST,
    events.DESERIALIZATION,
    events.RESPONSE
  ]

  client.on(events.SERIALIZATION, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.SERIALIZATION)
  })

  client.on(events.REQUEST, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.REQUEST)
  })

  client.on(events.DESERIALIZATION, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.DESERIALIZATION)
  })

  client.on(events.RESPONSE, (err, request) => {
    t.ok(err instanceof ResponseError)
    t.strictEqual(order.shift(), events.RESPONSE)
  })

  client.info((err, result) => {
    t.ok(err instanceof ResponseError)
    t.strictEqual(order.length, 0)
  })
})

test('Serialization Error', t => {
  t.plan(6)

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection,
    maxRetries: 1
  })

  const order = [
    events.SERIALIZATION,
    events.REQUEST
  ]

  client.on(events.SERIALIZATION, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.SERIALIZATION)
  })

  client.on(events.REQUEST, (err, request) => {
    t.ok(err instanceof SerializationError)
    t.strictEqual(order.shift(), events.REQUEST)
  })

  client.on(events.DESERIALIZATION, (_err, request) => {
    t.fail('Should not be called')
  })

  client.on(events.RESPONSE, (_err, request) => {
    t.fail('Should not be called')
  })

  const body = {}
  body.o = body
  client.index({ index: 'test', body }, (err, result) => {
    t.ok(err instanceof SerializationError)
    t.strictEqual(order.length, 0)
  })
})

test('Deserialization Error', t => {
  t.plan(10)

  class MockConnection extends Connection {
    request (params, callback) {
      const body = '{"hello":"wor'
      const stream = intoStream(body)
      stream.statusCode = 200
      stream.headers = {
        'content-type': 'application/json;utf=8',
        'content-length': body.length,
        connection: 'keep-alive',
        date: new Date().toISOString()
      }
      stream.on('close', () => t.pass('Stream destroyed'))
      process.nextTick(callback, null, stream)
      return { abort () {} }
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection,
    maxRetries: 1
  })

  const order = [
    events.SERIALIZATION,
    events.REQUEST,
    events.DESERIALIZATION,
    events.RESPONSE
  ]

  client.on(events.SERIALIZATION, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.SERIALIZATION)
  })

  client.on(events.REQUEST, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.REQUEST)
  })

  client.on(events.DESERIALIZATION, (err, request) => {
    t.error(err)
    t.strictEqual(order.shift(), events.DESERIALIZATION)
  })

  client.on(events.RESPONSE, (err, request) => {
    t.ok(err instanceof DeserializationError)
    t.strictEqual(order.shift(), events.RESPONSE)
  })

  client.info((err, result) => {
    t.ok(err instanceof DeserializationError)
    t.strictEqual(order.length, 0)
  })
})

test('Socket destroyed while reading the body', t => {
  t.plan(14)

  function handler (req, res) {
    const body = JSON.stringify({ hello: 'world' })
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.setHeader('Content-Length', body.length + '')
    res.write(body.slice(0, -5))
    setTimeout(() => {
      res.socket.destroy()
    }, 500)
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({ node: `http://localhost:${port}`, maxRetries: 1 })

    const order = [
      events.SERIALIZATION,
      events.REQUEST,
      events.DESERIALIZATION,
      events.REQUEST,
      events.DESERIALIZATION,
      events.RESPONSE
    ]

    client.on(events.SERIALIZATION, (err, request) => {
      t.error(err)
      t.strictEqual(order.shift(), events.SERIALIZATION)
    })

    client.on(events.REQUEST, (err, request) => {
      t.error(err)
      t.strictEqual(order.shift(), events.REQUEST)
    })

    client.on(events.DESERIALIZATION, (err, request) => {
      t.error(err)
      t.strictEqual(order.shift(), events.DESERIALIZATION)
    })

    client.on(events.RESPONSE, (err, request) => {
      t.ok(err instanceof ConnectionError)
      t.strictEqual(order.shift(), events.RESPONSE)
    })

    client.info((err, result) => {
      t.ok(err instanceof ConnectionError)
      t.strictEqual(order.length, 0)
      server.stop()
    })
  })
})
