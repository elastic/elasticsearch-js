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
const { Client, errors } = require('../../index')
const { buildServer } = require('../utils')

test('Basic (callback)', t => {
  t.plan(2)

  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://localhost:${port}`
    })

    client.search({
      index: 'test',
      q: 'foo:bar'
    }, (err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Basic (promises)', t => {
  t.plan(1)

  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://localhost:${port}`
    })

    client
      .search({
        index: 'test',
        q: 'foo:bar'
      })
      .then(({ body }) => {
        t.deepEqual(body, { hello: 'world' })
        server.stop()
      })
      .catch(t.fail)
  })
})

test('Error (callback)', t => {
  t.plan(1)

  function handler (req, res) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://localhost:${port}`
    })

    client.search({
      index: 'test',
      q: 'foo:bar'
    }, (err, { body }) => {
      t.ok(err)
      server.stop()
    })
  })
})

test('Error (promises)', t => {
  t.plan(1)

  function handler (req, res) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://localhost:${port}`
    })

    client
      .search({
        index: 'test',
        q: 'foo:bar'
      })
      .then(t.fail)
      .catch(err => {
        t.ok(err)
        server.stop()
      })
  })
})

test('Abort method (callback)', t => {
  t.plan(3)

  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://localhost:${port}`
    })

    const request = client.search({
      index: 'test',
      q: 'foo:bar'
    }, (err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
      server.stop()
    })

    t.type(request.abort, 'function')
  })
})

test('Abort method (promises)', t => {
  t.plan(2)

  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://localhost:${port}`
    })

    const request = client.search({
      index: 'test',
      q: 'foo:bar'
    })

    request
      .then(({ body }) => {
        t.deepEqual(body, { hello: 'world' })
        server.stop()
      })
      .catch(t.fail)

    t.type(request.abort, 'function')
  })
})

test('Basic (options and callback)', t => {
  t.plan(2)

  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://localhost:${port}`
    })

    client.search({
      index: 'test',
      q: 'foo:bar'
    }, {
      requestTimeout: 10000
    }, (err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Basic (options and promises)', t => {
  t.plan(1)

  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://localhost:${port}`
    })

    client
      .search({
        index: 'test',
        q: 'foo:bar'
      }, {
        requestTimeout: 10000
      })
      .then(({ body }) => {
        t.deepEqual(body, { hello: 'world' })
        server.stop()
      })
      .catch(t.fail)
  })
})

test('If the API uses the same key for both url and query parameter, the url should win', t => {
  t.plan(2)

  function handler (req, res) {
    t.strictEqual(req.url, '/index/_bulk')
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://localhost:${port}`
    })

    // bulk has two `type` parameters
    client.bulk({
      index: 'index',
      body: []
    }, (err, { body, warnings }) => {
      t.error(err)
      server.stop()
    })
  })
})

test('ConfigurationError (callback)', t => {
  t.plan(1)

  const client = new Client({
    node: 'http://localhost:9200'
  })

  client.index({
    body: { foo: 'bar' }
  }, (err, { body }) => {
    t.ok(err instanceof errors.ConfigurationError)
  })
})

test('ConfigurationError (promises)', t => {
  t.plan(1)

  const client = new Client({
    node: 'http://localhost:9200'
  })

  client
    .index({ body: { foo: 'bar' } })
    .then(t.fail)
    .catch(err => {
      t.ok(err instanceof errors.ConfigurationError)
    })
})

test('The callback with a sync error should be called in the next tick', t => {
  t.plan(4)

  const client = new Client({
    node: 'http://localhost:9200'
  })

  const transportReturn = client.index({ body: { foo: 'bar' } }, (err, result) => {
    t.ok(err instanceof errors.ConfigurationError)
  })

  t.type(transportReturn.then, 'function')
  t.type(transportReturn.catch, 'function')
  t.type(transportReturn.abort, 'function')
})

if (Number(process.version.split('.')[0].slice(1)) >= 8) {
  require('./api-async')(test)
}
