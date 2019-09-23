// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { test } = require('tap')
const { Client, events } = require('../../index')
const { TimeoutError, SerializationError } = require('../../lib/errors')
const { connection: { MockConnection, MockConnectionTimeout } } = require('../utils')

test('Should emit a prepare-request event when starting a request', t => {
  t.plan(3)

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.on(events.PREPARE_REQUEST, (err, request) => {
    t.error(err)
    t.match(request, {
      meta: {
        context: null,
        name: 'elasticsearch-js',
        request: {
          params: null,
          options: null,
          id: 1
        },
        connection: null,
        attempts: 0,
        aborted: false
      },
      params: {
        path: '/test/_search',
        querystring: {
          q: 'foo:bar'
        },
        method: 'GET',
        body: ''
      },
      options: {}
    })
  })

  client.search({
    index: 'test',
    q: 'foo:bar'
  }, (err, result) => {
    t.error(err)
  })
})

test('Request event', t => {
  t.test('Should emit a request event when a request is performed', t => {
    t.plan(3)

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })

    client.on(events.REQUEST, (err, request) => {
      t.error(err)
      t.match(request, {
        body: null,
        statusCode: null,
        headers: null,
        warnings: null,
        meta: {
          context: null,
          name: 'elasticsearch-js',
          request: {
            params: {
              method: 'GET',
              path: '/test/_search',
              body: '',
              querystring: 'q=foo%3Abar',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': '0'
              }
            },
            options: {},
            id: 1
          },
          connection: {
            id: 'http://localhost:9200'
          },
          attempts: 0,
          aborted: false
        }
      })
    })

    client.search({
      index: 'test',
      q: 'foo:bar'
    }, (err, result) => {
      t.error(err)
    })
  })

  t.test('Should emit a request event if there is a serialization error', t => {
    t.plan(3)

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })

    client.on(events.REQUEST, (err, request) => {
      t.ok(err instanceof SerializationError)
      t.match(request, {
        body: null,
        statusCode: null,
        headers: null,
        warnings: null,
        meta: {
          context: null,
          name: 'elasticsearch-js',
          request: {
            params: null,
            options: null,
            id: 1
          },
          connection: null,
          attempts: 0,
          aborted: false
        }
      })
    })

    const obj = {}
    obj.o = obj
    client.search({
      index: 'test',
      body: obj
    }, (err, result) => {
      t.ok(err instanceof SerializationError)
    })
  })

  t.test('Should emit a request event if the request has been aborted', t => {
    t.plan(6)

    var req
    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnectionTimeout
    })

    var count = 0
    client.on(events.REQUEST, (err, request) => {
      if (count++ > 0) {
        req.abort()
      }
      t.error(err)
      t.match(request, {
        body: null,
        statusCode: null,
        headers: null,
        warnings: null,
        meta: {
          context: null,
          name: 'elasticsearch-js',
          request: {
            params: {
              method: 'GET',
              path: '/test/_search',
              body: '',
              querystring: 'q=foo%3Abar',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': '0'
              }
            },
            options: {},
            id: 1
          },
          connection: {
            id: 'http://localhost:9200'
          },
          attempts: count - 1,
          aborted: count > 1
        }
      })
    })

    req = client.search({
      index: 'test',
      q: 'foo:bar'
    }, (e, result) => {
      t.fail('Should not be called')
    })
  })

  t.end()
})

test('Response event', t => {
  t.test('Should emit a response event in case of a successful response', t => {
    t.plan(3)

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })

    client.on(events.RESPONSE, (err, request) => {
      t.error(err)
      t.match(request, {
        body: { hello: 'world' },
        statusCode: 200,
        headers: {
          'content-type': 'application/json;utf=8',
          connection: 'keep-alive'
        },
        warnings: null,
        meta: {
          context: null,
          name: 'elasticsearch-js',
          request: {
            params: {
              method: 'GET',
              path: '/test/_search',
              body: '',
              querystring: 'q=foo%3Abar',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': '0'
              }
            },
            options: {},
            id: 1
          },
          connection: {
            id: 'http://localhost:9200'
          },
          attempts: 0,
          aborted: false
        }
      })
    })

    client.search({
      index: 'test',
      q: 'foo:bar'
    }, (err, result) => {
      t.error(err)
    })
  })

  t.test('Should emit a response event with the error set', t => {
    t.plan(3)

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnectionTimeout,
      maxRetries: 0
    })

    client.on(events.RESPONSE, (err, request) => {
      t.ok(err instanceof TimeoutError)
      t.match(request, {
        body: null,
        statusCode: null,
        headers: null,
        warnings: null,
        meta: {
          context: null,
          name: 'elasticsearch-js',
          request: {
            params: {
              method: 'GET',
              path: '/test/_search',
              body: '',
              querystring: 'q=foo%3Abar',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': '0'
              }
            },
            options: {
              requestTimeout: 500
            },
            id: 1
          },
          connection: {
            id: 'http://localhost:9200'
          },
          attempts: 0,
          aborted: false
        }
      })
    })

    client.search({
      index: 'test',
      q: 'foo:bar'
    }, {
      requestTimeout: 500
    }, (err, result) => {
      t.ok(err instanceof TimeoutError)
    })
  })

  t.end()
})
