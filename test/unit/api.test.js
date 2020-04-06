// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

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

test('Pass unknown parameters as query parameters (and get a warning)', t => {
  t.plan(4)

  function handler (req, res) {
    t.strictEqual(req.url, '/test/_search?q=foo%3Abar&winter=is%20coming')
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://localhost:${port}`
    })

    client.search({
      index: 'test',
      q: 'foo:bar',
      winter: 'is coming'
    }, (err, { body, warnings }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
      t.deepEqual(warnings, ['Client - Unknown parameter: "winter", sending it as query parameter'])
      server.stop()
    })
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

if (Number(process.version.split('.')[0].slice(1)) >= 8) {
  require('./api-async')(test)
}
