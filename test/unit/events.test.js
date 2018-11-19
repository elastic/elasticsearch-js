'use strict'

const { test } = require('tap')
const { Client, events } = require('../../index')
const { TimeoutError } = require('../../lib/errors')
const { connection: { MockConnection, MockConnectionTimeout } } = require('../utils')

test('Should emit a request event when a request is performed', t => {
  t.plan(3)

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.on(events.REQUEST, (connection, request) => {
    t.match(connection, {
      id: 'http://localhost:9200'
    })
    t.match(request, {
      method: 'GET',
      path: '/test/doc/_search',
      querystring: 'q=foo%3Abar'
    })
  })

  client.search({
    index: 'test',
    type: 'doc',
    q: 'foo:bar'
  }, (err, result) => {
    t.error(err)
  })
})

test('Should emit a response event in case of a successful response', t => {
  t.plan(4)

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.on(events.RESPONSE, (connection, request, response) => {
    t.match(connection, {
      id: 'http://localhost:9200'
    })
    t.match(request, {
      method: 'GET',
      path: '/test/doc/_search',
      querystring: 'q=foo%3Abar'
    })
    t.match(response, {
      body: { hello: 'world' },
      statusCode: 200,
      headers: {
        'content-type': 'application/json;utf=8',
        'connection': 'keep-alive'
      },
      warnings: null
    })
  })

  client.search({
    index: 'test',
    type: 'doc',
    q: 'foo:bar'
  }, (err, result) => {
    t.error(err)
  })
})

test('Should emit an error event in case of a failing response', t => {
  t.plan(4)

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnectionTimeout,
    maxRetries: 0
  })

  client.on(events.RESPONSE, (connection, request, response) => {
    t.fail('This should not be called')
  })

  client.on(events.ERROR, (error, connection, request) => {
    t.ok(error instanceof TimeoutError)
    t.match(connection, {
      id: 'http://localhost:9200'
    })
    t.match(request, {
      method: 'GET',
      path: '/test/doc/_search',
      querystring: 'q=foo%3Abar'
    })
  })

  client.search({
    index: 'test',
    type: 'doc',
    q: 'foo:bar',
    requestTimeout: 500
  }, (err, result) => {
    t.ok(err instanceof TimeoutError)
  })
})
