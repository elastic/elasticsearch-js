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

  client.on(events.REQUEST, (err, meta) => {
    t.error(err)
    t.match(meta, {
      connection: {
        id: 'http://localhost:9200'
      },
      request: {
        method: 'GET',
        path: '/test/doc/_search',
        querystring: 'q=foo%3Abar'
      },
      response: null,
      attempts: 0,
      aborted: false
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
  t.plan(3)

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.on(events.RESPONSE, (err, meta) => {
    t.error(err)
    t.match(meta, {
      connection: {
        id: 'http://localhost:9200'
      },
      request: {
        method: 'GET',
        path: '/test/doc/_search',
        querystring: 'q=foo%3Abar'
      },
      response: {
        body: { hello: 'world' },
        statusCode: 200,
        headers: {
          'content-type': 'application/json;utf=8',
          'connection': 'keep-alive'
        },
        warnings: null
      },
      attempts: 0,
      aborted: false
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

test('Should emit a response event with the error set', t => {
  t.plan(3)

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnectionTimeout,
    maxRetries: 0
  })

  client.on(events.RESPONSE, (err, meta) => {
    t.ok(err instanceof TimeoutError)
    t.match(meta, {
      connection: {
        id: 'http://localhost:9200'
      },
      request: {
        method: 'GET',
        path: '/test/doc/_search',
        querystring: 'q=foo%3Abar'
      },
      response: null,
      attempts: 0,
      aborted: false
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
