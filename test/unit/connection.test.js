// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { test } = require('tap')
const { inspect } = require('util')
const { createGzip, createDeflate } = require('zlib')
const { URL } = require('url')
const { Agent } = require('http')
const intoStream = require('into-stream')
const { buildServer } = require('../utils')
const Connection = require('../../lib/Connection')
const { TimeoutError, ConfigurationError } = require('../../lib/errors')

test('Basic (http)', t => {
  t.plan(4)

  function handler (req, res) {
    t.match(req.headers, {
      'x-custom-test': 'true',
      connection: 'keep-alive'
    })
    res.end('ok')
  }

  buildServer(handler, ({ port }, server) => {
    const connection = new Connection({
      url: new URL(`http://localhost:${port}`)
    })
    connection.request({
      path: '/hello',
      method: 'GET',
      headers: {
        'X-Custom-Test': true
      }
    }, (err, res) => {
      t.error(err)

      t.match(res.headers, {
        connection: 'keep-alive'
      })

      var payload = ''
      res.setEncoding('utf8')
      res.on('data', chunk => { payload += chunk })
      res.on('error', err => t.fail(err))
      res.on('end', () => {
        t.strictEqual(payload, 'ok')
        server.stop()
      })
    })
  })
})

test('Basic (https)', t => {
  t.plan(4)

  function handler (req, res) {
    t.match(req.headers, {
      'x-custom-test': 'true',
      connection: 'keep-alive'
    })
    res.end('ok')
  }

  buildServer(handler, { secure: true }, ({ port }, server) => {
    const connection = new Connection({
      url: new URL(`https://localhost:${port}`)
    })
    connection.request({
      path: '/hello',
      method: 'GET',
      headers: {
        'X-Custom-Test': true
      }
    }, (err, res) => {
      t.error(err)

      t.match(res.headers, {
        connection: 'keep-alive'
      })

      var payload = ''
      res.setEncoding('utf8')
      res.on('data', chunk => { payload += chunk })
      res.on('error', err => t.fail(err))
      res.on('end', () => {
        t.strictEqual(payload, 'ok')
        server.stop()
      })
    })
  })
})

test('Basic (https with ssl agent)', t => {
  t.plan(4)

  function handler (req, res) {
    t.match(req.headers, {
      'x-custom-test': 'true',
      connection: 'keep-alive'
    })
    res.end('ok')
  }

  buildServer(handler, { secure: true }, ({ port, key, cert }, server) => {
    const connection = new Connection({
      url: new URL(`https://localhost:${port}`),
      ssl: { key, cert }
    })
    connection.request({
      path: '/hello',
      method: 'GET',
      headers: {
        'X-Custom-Test': true
      }
    }, (err, res) => {
      t.error(err)

      t.match(res.headers, {
        connection: 'keep-alive'
      })

      var payload = ''
      res.setEncoding('utf8')
      res.on('data', chunk => { payload += chunk })
      res.on('error', err => t.fail(err))
      res.on('end', () => {
        t.strictEqual(payload, 'ok')
        server.stop()
      })
    })
  })
})

test('Custom http agent', t => {
  t.plan(5)

  function handler (req, res) {
    t.match(req.headers, {
      'x-custom-test': 'true',
      connection: 'keep-alive'
    })
    res.end('ok')
  }

  buildServer(handler, ({ port }, server) => {
    const agent = new Agent({
      keepAlive: true,
      keepAliveMsecs: 1000,
      maxSockets: 256,
      maxFreeSockets: 256
    })
    agent.custom = true
    const connection = new Connection({
      url: new URL(`http://localhost:${port}`),
      agent: () => agent
    })
    t.true(connection.agent.custom)
    connection.request({
      path: '/hello',
      method: 'GET',
      headers: {
        'X-Custom-Test': true
      }
    }, (err, res) => {
      t.error(err)

      t.match(res.headers, {
        connection: 'keep-alive'
      })

      var payload = ''
      res.setEncoding('utf8')
      res.on('data', chunk => { payload += chunk })
      res.on('error', err => t.fail(err))
      res.on('end', () => {
        t.strictEqual(payload, 'ok')
        server.stop()
      })
    })
  })
})

test('Disable keep alive', t => {
  t.plan(3)

  function handler (req, res) {
    t.match(req.headers, {
      'x-custom-test': 'true',
      connection: 'close'
    })
    res.end('ok')
  }

  buildServer(handler, ({ port }, server) => {
    const connection = new Connection({
      url: new URL(`http://localhost:${port}`),
      agent: { keepAlive: false }
    })
    connection.request({
      path: '/hello',
      method: 'GET',
      headers: {
        'X-Custom-Test': true
      }
    }, (err, res) => {
      t.error(err)

      t.match(res.headers, {
        connection: 'close'
      })
      server.stop()
    })
  })
})

test('Timeout support', t => {
  t.plan(1)

  function handler (req, res) {
    setTimeout(
      () => res.end('ok'),
      1000
    )
  }

  buildServer(handler, ({ port }, server) => {
    const connection = new Connection({
      url: new URL(`http://localhost:${port}`)
    })
    connection.request({
      path: '/hello',
      method: 'GET',
      timeout: 500
    }, (err, res) => {
      t.ok(err instanceof TimeoutError)
      server.stop()
    })
  })
})

test('querystring', t => {
  t.test('Should concatenate the querystring', t => {
    t.plan(2)

    function handler (req, res) {
      t.strictEqual(req.url, '/hello?hello=world&you_know=for%20search')
      res.end('ok')
    }

    buildServer(handler, ({ port }, server) => {
      const connection = new Connection({
        url: new URL(`http://localhost:${port}`)
      })
      connection.request({
        path: '/hello',
        method: 'GET',
        querystring: 'hello=world&you_know=for%20search'
      }, (err, res) => {
        t.error(err)
        server.stop()
      })
    })
  })

  t.test('If the querystring is null should not do anything', t => {
    t.plan(2)

    function handler (req, res) {
      t.strictEqual(req.url, '/hello')
      res.end('ok')
    }

    buildServer(handler, ({ port }, server) => {
      const connection = new Connection({
        url: new URL(`http://localhost:${port}`)
      })
      connection.request({
        path: '/hello',
        method: 'GET',
        querystring: null
      }, (err, res) => {
        t.error(err)
        server.stop()
      })
    })
  })

  t.end()
})

test('Body request', t => {
  t.plan(2)

  function handler (req, res) {
    var payload = ''
    req.setEncoding('utf8')
    req.on('data', chunk => { payload += chunk })
    req.on('error', err => t.fail(err))
    req.on('end', () => {
      t.strictEqual(payload, 'hello')
      res.end('ok')
    })
  }

  buildServer(handler, ({ port }, server) => {
    const connection = new Connection({
      url: new URL(`http://localhost:${port}`)
    })
    connection.request({
      path: '/hello',
      method: 'POST',
      body: 'hello'
    }, (err, res) => {
      t.error(err)
      server.stop()
    })
  })
})

test('Send body as buffer', t => {
  t.plan(2)

  function handler (req, res) {
    var payload = ''
    req.setEncoding('utf8')
    req.on('data', chunk => { payload += chunk })
    req.on('error', err => t.fail(err))
    req.on('end', () => {
      t.strictEqual(payload, 'hello')
      res.end('ok')
    })
  }

  buildServer(handler, ({ port }, server) => {
    const connection = new Connection({
      url: new URL(`http://localhost:${port}`)
    })
    connection.request({
      path: '/hello',
      method: 'POST',
      body: Buffer.from('hello')
    }, (err, res) => {
      t.error(err)
      server.stop()
    })
  })
})

test('Send body as stream', t => {
  t.plan(2)

  function handler (req, res) {
    var payload = ''
    req.setEncoding('utf8')
    req.on('data', chunk => { payload += chunk })
    req.on('error', err => t.fail(err))
    req.on('end', () => {
      t.strictEqual(payload, 'hello')
      res.end('ok')
    })
  }

  buildServer(handler, ({ port }, server) => {
    const connection = new Connection({
      url: new URL(`http://localhost:${port}`)
    })
    connection.request({
      path: '/hello',
      method: 'POST',
      body: intoStream('hello')
    }, (err, res) => {
      t.error(err)
      server.stop()
    })
  })
})

test('Should handle compression', t => {
  t.test('gzip', t => {
    t.plan(3)

    function handler (req, res) {
      res.writeHead(200, {
        'Content-Type': 'application/json;utf=8',
        'Content-Encoding': 'gzip'
      })
      intoStream(JSON.stringify({ hello: 'world' }))
        .pipe(createGzip())
        .pipe(res)
    }

    buildServer(handler, ({ port }, server) => {
      const connection = new Connection({
        url: new URL(`http://localhost:${port}`)
      })
      connection.request({
        path: '/hello',
        method: 'GET'
      }, (err, res) => {
        t.error(err)

        t.match(res.headers, {
          'content-type': 'application/json;utf=8',
          'content-encoding': 'gzip'
        })

        var payload = ''
        res.setEncoding('utf8')
        res.on('data', chunk => { payload += chunk })
        res.on('error', err => t.fail(err))
        res.on('end', () => {
          t.deepEqual(JSON.parse(payload), { hello: 'world' })
          server.stop()
        })
      })
    })
  })

  t.test('deflate', t => {
    t.plan(3)

    function handler (req, res) {
      res.writeHead(200, {
        'Content-Type': 'application/json;utf=8',
        'Content-Encoding': 'deflate'
      })
      intoStream(JSON.stringify({ hello: 'world' }))
        .pipe(createDeflate())
        .pipe(res)
    }

    buildServer(handler, ({ port }, server) => {
      const connection = new Connection({
        url: new URL(`http://localhost:${port}`)
      })
      connection.request({
        path: '/hello',
        method: 'GET'
      }, (err, res) => {
        t.error(err)

        t.match(res.headers, {
          'content-type': 'application/json;utf=8',
          'content-encoding': 'deflate'
        })

        var payload = ''
        res.setEncoding('utf8')
        res.on('data', chunk => { payload += chunk })
        res.on('error', err => t.fail(err))
        res.on('end', () => {
          t.deepEqual(JSON.parse(payload), { hello: 'world' })
          server.stop()
        })
      })
    })
  })

  t.end()
})

test('Should not close a connection if there are open requests', t => {
  t.plan(4)

  function handler (req, res) {
    setTimeout(() => res.end('ok'), 1000)
  }

  buildServer(handler, ({ port }, server) => {
    const connection = new Connection({
      url: new URL(`http://localhost:${port}`)
    })

    setTimeout(() => {
      t.strictEqual(connection._openRequests, 1)
      connection.close()
    }, 500)

    connection.request({
      path: '/hello',
      method: 'GET'
    }, (err, res) => {
      t.error(err)
      t.strictEqual(connection._openRequests, 0)

      var payload = ''
      res.setEncoding('utf8')
      res.on('data', chunk => { payload += chunk })
      res.on('error', err => t.fail(err))
      res.on('end', () => {
        t.strictEqual(payload, 'ok')
        server.stop()
      })
    })
  })
})

test('Url with auth', t => {
  t.plan(2)

  function handler (req, res) {
    t.match(req.headers, {
      authorization: 'Basic Zm9vOmJhcg=='
    })
    res.end('ok')
  }

  buildServer(handler, ({ port }, server) => {
    const connection = new Connection({
      url: new URL(`http://foo:bar@localhost:${port}`),
      auth: { username: 'foo', password: 'bar' }
    })
    connection.request({
      path: '/hello',
      method: 'GET'
    }, (err, res) => {
      t.error(err)
      server.stop()
    })
  })
})

test('Url with querystring', t => {
  t.plan(2)

  function handler (req, res) {
    t.strictEqual(req.url, '/hello?foo=bar&baz=faz')
    res.end('ok')
  }

  buildServer(handler, ({ port }, server) => {
    const connection = new Connection({
      url: new URL(`http://localhost:${port}?foo=bar`)
    })
    connection.request({
      path: '/hello',
      method: 'GET',
      querystring: 'baz=faz'
    }, (err, res) => {
      t.error(err)
      server.stop()
    })
  })
})

test('Custom headers for connection', t => {
  t.plan(3)

  function handler (req, res) {
    t.match(req.headers, {
      'x-custom-test': 'true',
      'x-foo': 'bar'
    })
    res.end('ok')
  }

  buildServer(handler, ({ port }, server) => {
    const connection = new Connection({
      url: new URL(`http://localhost:${port}`),
      headers: { 'x-foo': 'bar' }
    })
    connection.request({
      path: '/hello',
      method: 'GET',
      headers: {
        'X-Custom-Test': true
      }
    }, (err, res) => {
      t.error(err)
      // should not update the default
      t.deepEqual(connection.headers, { 'x-foo': 'bar' })
      server.stop()
    })
  })
})

// TODO: add a check that the response is not decompressed
test('asStream set to true', t => {
  t.plan(2)

  function handler (req, res) {
    res.end('ok')
  }

  buildServer(handler, ({ port }, server) => {
    const connection = new Connection({
      url: new URL(`http://localhost:${port}`)
    })
    connection.request({
      path: '/hello',
      method: 'GET',
      asStream: true
    }, (err, res) => {
      t.error(err)

      var payload = ''
      res.setEncoding('utf8')
      res.on('data', chunk => { payload += chunk })
      res.on('error', err => t.fail(err))
      res.on('end', () => {
        t.strictEqual(payload, 'ok')
        server.stop()
      })
    })
  })
})

test('Connection id should not contain credentials', t => {
  const connection = new Connection({
    url: new URL('http://user:password@localhost:9200')
  })
  t.strictEqual(connection.id, 'http://localhost:9200/')
  t.end()
})

test('Should throw if the protocol is not http or https', t => {
  try {
    new Connection({ // eslint-disable-line
      url: new URL('nope://nope')
    })
    t.fail('Should throw')
  } catch (err) {
    t.ok(err instanceof ConfigurationError)
    t.is(err.message, 'Invalid protocol: \'nope:\'')
  }
  t.end()
})

// https://github.com/nodejs/node/commit/b961d9fd83
test('Should disallow two-byte characters in URL path', t => {
  t.plan(1)

  const connection = new Connection({
    url: new URL('http://localhost:9200')
  })
  connection.request({
    path: '/thisisinvalid\uffe2',
    method: 'GET'
  }, (err, res) => {
    t.strictEqual(
      err.message,
      'ERR_UNESCAPED_CHARACTERS: /thisisinvalid\uffe2'
    )
  })
})

test('setRole', t => {
  t.test('Update the value of a role', t => {
    t.plan(2)

    const connection = new Connection({
      url: new URL('http://localhost:9200')
    })

    t.deepEqual(connection.roles, {
      master: true,
      data: true,
      ingest: true,
      ml: false
    })

    connection.setRole('master', false)

    t.deepEqual(connection.roles, {
      master: false,
      data: true,
      ingest: true,
      ml: false
    })
  })

  t.test('Invalid role', t => {
    t.plan(2)

    const connection = new Connection({
      url: new URL('http://localhost:9200')
    })

    try {
      connection.setRole('car', true)
      t.fail('Shoud throw')
    } catch (err) {
      t.true(err instanceof ConfigurationError)
      t.is(err.message, 'Unsupported role: \'car\'')
    }
  })

  t.test('Invalid value', t => {
    t.plan(2)

    const connection = new Connection({
      url: new URL('http://localhost:9200')
    })

    try {
      connection.setRole('master', 1)
      t.fail('Shoud throw')
    } catch (err) {
      t.true(err instanceof ConfigurationError)
      t.is(err.message, 'enabled should be a boolean')
    }
  })

  t.end()
})

test('Util.inspect Connection class should hide agent, ssl and auth', t => {
  t.plan(1)

  const connection = new Connection({
    url: new URL('http://user:password@localhost:9200'),
    id: 'node-id',
    headers: { foo: 'bar' }
  })

  // Removes spaces and new lines because
  // utils.inspect is handled differently
  // between major versions of Node.js
  function cleanStr (str) {
    return str
      .replace(/\s/g, '')
      .replace(/(\r\n|\n|\r)/gm, '')
  }

  t.strictEqual(cleanStr(inspect(connection)), cleanStr(`{ url: 'http://localhost:9200/',
  id: 'node-id',
  headers: { foo: 'bar' },
  deadCount: 0,
  resurrectTimeout: 0,
  _openRequests: 0,
  status: 'alive',
  roles: { master: true, data: true, ingest: true, ml: false } }`)
  )
})

test('connection.toJSON should hide agent, ssl and auth', t => {
  t.plan(1)

  const connection = new Connection({
    url: new URL('http://user:password@localhost:9200'),
    id: 'node-id',
    headers: { foo: 'bar' }
  })

  t.deepEqual(connection.toJSON(), {
    url: 'http://localhost:9200/',
    id: 'node-id',
    headers: {
      foo: 'bar'
    },
    deadCount: 0,
    resurrectTimeout: 0,
    _openRequests: 0,
    status: 'alive',
    roles: {
      master: true,
      data: true,
      ingest: true,
      ml: false
    }
  })
})

// https://github.com/elastic/elasticsearch-js/issues/843
test('Port handling', t => {
  t.test('http 80', t => {
    const connection = new Connection({
      url: new URL('http://localhost:80')
    })

    t.strictEqual(
      connection.buildRequestObject({}).port,
      undefined
    )

    t.end()
  })

  t.test('https 443', t => {
    const connection = new Connection({
      url: new URL('https://localhost:443')
    })

    t.strictEqual(
      connection.buildRequestObject({}).port,
      undefined
    )

    t.end()
  })

  t.end()
})

test('Authorization header', t => {
  t.test('None', t => {
    const connection = new Connection({
      url: new URL('http://localhost:9200')
    })

    t.deepEqual(connection.headers, {})

    t.end()
  })

  t.test('Basic', t => {
    const connection = new Connection({
      url: new URL('http://localhost:9200'),
      auth: { username: 'foo', password: 'bar' }
    })

    t.deepEqual(connection.headers, { authorization: 'Basic Zm9vOmJhcg==' })

    t.end()
  })

  t.test('ApiKey (string)', t => {
    const connection = new Connection({
      url: new URL('http://localhost:9200'),
      auth: { apiKey: 'Zm9vOmJhcg==' }
    })

    t.deepEqual(connection.headers, { authorization: 'ApiKey Zm9vOmJhcg==' })

    t.end()
  })

  t.test('ApiKey (object)', t => {
    const connection = new Connection({
      url: new URL('http://localhost:9200'),
      auth: { apiKey: { id: 'foo', api_key: 'bar' } }
    })

    t.deepEqual(connection.headers, { authorization: 'ApiKey Zm9vOmJhcg==' })

    t.end()
  })

  t.end()
})

test('Should not add agent and ssl to the serialized connection', t => {
  const connection = new Connection({
    url: new URL('http://localhost:9200')
  })

  t.strictEqual(
    JSON.stringify(connection),
    '{"url":"http://localhost:9200/","id":"http://localhost:9200/","headers":{},"deadCount":0,"resurrectTimeout":0,"_openRequests":0,"status":"alive","roles":{"master":true,"data":true,"ingest":true,"ml":false}}'
  )

  t.end()
})
