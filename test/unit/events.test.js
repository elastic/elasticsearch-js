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
const semver = require('semver')
const { Client, events } = require('../../index')
const { TimeoutError } = require('../../lib/errors')
const {
  connection: {
    MockConnection,
    MockConnectionTimeout
  }
} = require('../utils')

test('Should emit a request event when a request is performed', t => {
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
            querystring: 'q=foo%3Abar'
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

test('Should emit a request event once when a request is performed', t => {
  t.plan(4)

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.once(events.REQUEST, (err, request) => {
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
            querystring: 'q=foo%3Abar'
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

  client.search({
    index: 'test',
    q: 'foo:bar'
  }, (err, result) => {
    t.error(err)
  })
})

test('Remove an event', { skip: semver.lt(process.versions.node, '10.0.0') }, t => {
  t.plan(4)

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.on(events.REQUEST, onRequest)
  function onRequest (err, request) {
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
            querystring: 'q=foo%3Abar'
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

    client.off('request', onRequest)
  }

  client.search({
    index: 'test',
    q: 'foo:bar'
  }, (err, result) => {
    t.error(err)
  })

  client.search({
    index: 'test',
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
            querystring: 'q=foo%3Abar'
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

test('Should emit a response event with the error set', t => {
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
            querystring: 'q=foo%3Abar'
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

test('Emit event', t => {
  t.plan(2)

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.on(events.REQUEST, (err, request) => {
    t.error(err)
    t.deepEqual(request, { hello: 'world' })
  })

  client.emit(events.REQUEST, null, { hello: 'world' })
})
