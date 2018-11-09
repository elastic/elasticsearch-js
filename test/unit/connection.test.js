'use strict'

const { test } = require('tap')
const { createGzip, createDeflate } = require('zlib')
const { URL } = require('url')
const intoStream = require('into-stream')
const { buildServer } = require('../utils')
const Connection = require('../../lib/Connection')
const { TimeoutError } = require('../../lib/errors')

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
      url: new URL(`http://foo:bar@localhost:${port}`)
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
