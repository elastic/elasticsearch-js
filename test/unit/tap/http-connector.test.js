'use strict'

const { test } = require('tap')
const { pipeline } = require('readable-stream')
const { createGzip, createDeflate } = require('zlib')
const parseUrl = require('url').parse
const sts = require('string-to-stream')
const HttpConnection = require('../../../src/lib/connectors/http')
const ConnectionAbstract = require('../../../src/lib/connection')
const Host = require('../../../src/lib/host')
const { IncomingMessage, ClientRequest, buildServer } = require('../../utils')

test('Constructor', t => {
  t.test('Should create an object that extends ConnectionAbstract', t => {
    t.plan(1)
    const conn = new HttpConnection(new Host())
    t.type(conn, ConnectionAbstract)
  })

  t.test('The protocol should be http or https', t => {
    t.plan(1)
    try {
      new HttpConnection(new Host('thrifty://es.com/stuff')) // eslint-disable-line
      t.fail('Should throw')
    } catch (err) {
      t.ok(err)
    }
  })

  t.test('Should accept a custom agent', t => {
    t.plan(1)
    const agent = {}
    const conn = new HttpConnection(new Host(), { createNodeAgent: () => agent })
    t.deepEqual(conn.agent, agent)
  })

  t.test('The agent can be false', t => {
    t.plan(1)
    const conn = new HttpConnection(new Host(), { createNodeAgent: () => false })
    t.strictEqual(conn.agent, false)
  })

  t.end()
})

test('makeReqParams', t => {
  t.test('Should read the host object properly', t => {
    t.plan(1)
    const host = new Host('john:dude@pizza.com:9200/pizza/cheese?shrooms=true')
    const conn = new HttpConnection(host, {})
    t.deepEqual(conn.makeReqParams(), {
      method: 'GET',
      protocol: 'http:',
      hostname: 'pizza.com',
      port: 9200,
      path: '/pizza/cheese?shrooms=true',
      headers: host.headers,
      agent: conn.agent
    })
  })

  t.test('Should merge the query objects with the host', t => {
    t.plan(1)
    const host = new Host('https://elastic.co/path/prefix/for/user/1')
    const conn = new HttpConnection(host, {})
    const reqParams = conn.makeReqParams({
      method: 'GET',
      path: '/items',
      query: {
        q: 'pizza'
      }
    })
    t.strictEqual(reqParams.path, '/path/prefix/for/user/1/items?q=pizza')
  })

  t.test('Should merge the query', t => {
    t.plan(1)
    const conn = new HttpConnection(new Host('http://elastic.co/pref-x?userId=12345&token=42069'))
    const reqParams = conn.makeReqParams({
      method: 'PUT',
      path: '/stuff',
      query: {
        q: 'pizza'
      }
    })

    t.strictEqual(reqParams.path, '/pref-x/stuff?userId=12345&token=42069&q=pizza')
  })

  t.test('Works well with minimum params', t => {
    t.plan(1)
    const conn = new HttpConnection(new Host('http://elastic.co'))
    const reqParams = conn.makeReqParams({
      method: 'PUT',
      path: '/stuff'
    })

    t.deepEqual(reqParams, {
      method: 'PUT',
      protocol: 'http:',
      hostname: 'elastic.co',
      port: 80,
      path: '/stuff',
      headers: null,
      agent: conn.agent
    })
  })

  t.end()
})

test('request', t => {
  t.test('Should use http if the protocol is http', t => {
    t.plan(1)
    const conn = new HttpConnection(new Host('http://elastic.co'))
    t.deepEqual(conn.hand, require('http'))
  })

  t.test('Should use https if the protocol is https', t => {
    t.plan(1)
    const conn = new HttpConnection(new Host('https://elastic.co'))
    t.deepEqual(conn.hand, require('https'))
  })

  t.test('request with incoming message error', t => {
    t.plan(3)
    const conn = new HttpConnection(new Host('https://elastic.co'))
    conn.hand.request = function (reqParams, cb) {
      const response = new IncomingMessage({
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })

      cb(response)

      setTimeout(() => {
        response.emit('error', new Error('kaboom'))
      }, 50)

      return new ClientRequest()
    }

    conn.request({}, (err, res, status) => {
      t.strictEqual(err.message, 'kaboom')
      t.strictEqual(res, undefined)
      t.strictEqual(status, undefined)
    })
  })

  t.test('normal response', t => {
    t.plan(4)

    const body = JSON.stringify({ hello: 'world' })
    function handler (req, res) {
      t.strictEqual(req.url, '/user/1')
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(body)
    }

    buildServer(handler, port => {
      const conn = new HttpConnection(new Host(`http://localhost:${port}`))
      conn.request({
        method: 'GET',
        path: '/user/1'
      }, (err, res, status) => {
        t.error(err)
        t.strictEqual(res, body)
        t.strictEqual(status, 200)
      })
    })
  })

  t.test('normal response (gzip compressed)', t => {
    t.plan(5)

    const elements = []
    for (var i = 0; i < 500; i++) elements.push({ hello: 'world' })
    const body = JSON.stringify(elements)

    function handler (req, res) {
      t.strictEqual(req.url, '/user/1')
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Content-Encoding', 'gzip')
      pipeline(sts(body), createGzip(), res, t.error)
    }

    buildServer(handler, port => {
      const conn = new HttpConnection(new Host(`http://localhost:${port}`))
      conn.request({
        method: 'GET',
        path: '/user/1'
      }, (err, res, status) => {
        t.error(err)
        t.strictEqual(res, body)
        t.strictEqual(status, 200)
      })
    })
  })

  t.test('normal response (deflate compressed)', t => {
    t.plan(5)

    const elements = []
    for (var i = 0; i < 500; i++) elements.push({ hello: 'world' })
    const body = JSON.stringify(elements)

    function handler (req, res) {
      t.strictEqual(req.url, '/user/1')
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Content-Encoding', 'deflate')
      pipeline(sts(body), createDeflate(), res, t.error)
    }

    buildServer(handler, port => {
      const conn = new HttpConnection(new Host(`http://localhost:${port}`))
      conn.request({
        method: 'GET',
        path: '/user/1'
      }, (err, res, status) => {
        t.error(err)
        t.strictEqual(res, body)
        t.strictEqual(status, 200)
      })
    })
  })

  t.test('Should handle decompression errors', t => {
    t.plan(4)

    const body = JSON.stringify({ hello: 'world' })

    function handler (req, res) {
      t.strictEqual(req.url, '/user/1')
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Content-Encoding', 'deflate')
      res.end(body)
    }

    buildServer(handler, port => {
      const conn = new HttpConnection(new Host(`http://localhost:${port}`))
      conn.request({
        method: 'GET',
        path: '/user/1'
      }, (err, res, status) => {
        t.ok(err)
        t.strictEqual(res, undefined)
        t.strictEqual(status, undefined)
      })
    })
  })

  t.test('Should ignore serialization errors', t => {
    t.plan(4)

    const body = '{"hello'

    function handler (req, res) {
      t.strictEqual(req.url, '/user/1')
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(body)
    }

    buildServer(handler, port => {
      const conn = new HttpConnection(new Host(`http://localhost:${port}`))
      conn.request({
        method: 'GET',
        path: '/user/1'
      }, (err, res, status) => {
        t.error(err)
        t.strictEqual(res, body)
        t.strictEqual(status, 200)
      })
    })
  })

  t.end()
})

test('HTTP specifics', t => {
  t.test('Uses TCP no delay', t => {
    t.plan(4)
    const conn = new HttpConnection(new Host('https://elastic.co'))
    conn.hand.request = function (reqParams, cb) {
      const response = new IncomingMessage({
        statusCode: 200,
        body: JSON.stringify({ hello: 'world' }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      cb(response)

      const request = new ClientRequest()
      request.setNoDelay = function () {
        t.ok('called')
      }
      return request
    }

    conn.request({}, (err, res, status) => {
      t.error(err)
      t.strictEqual(res, JSON.stringify({ hello: 'world' }))
      t.strictEqual(status, 200)
    })
  })

  t.test('Should set the Content-Length header properly', t => {
    t.plan(4)
    const body = 'pasta and 𝄞' // Buffer.byteLength(body, 'utf8') === 14
    const conn = new HttpConnection(new Host('https://elastic.co'))
    conn.hand.request = function (reqParams, cb) {
      const response = new IncomingMessage({
        statusCode: 200,
        body: body,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8'
        }
      })
      cb(response)

      const request = new ClientRequest()
      request.setHeader = function (key, value) {
        if (key.toLowerCase() === 'content-length') {
          t.strictEqual(value, 14)
        }
      }
      return request
    }

    conn.request({ body }, (err, res, status) => {
      t.error(err)
      t.strictEqual(res, body)
      t.strictEqual(status, 200)
    })
  })

  t.test('Should not the the Accept-Encoding header by default', t => {
    t.plan(4)
    const body = JSON.stringify({ hello: 'world' })
    const conn = new HttpConnection(new Host('https://elastic.co'))
    conn.hand.request = function (reqParams, cb) {
      t.strictEqual(reqParams.headers, null)
      const response = new IncomingMessage({
        statusCode: 200,
        body: body,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      cb(response)

      return new ClientRequest()
    }

    conn.request({ body }, (err, res, status) => {
      t.error(err)
      t.strictEqual(res, body)
      t.strictEqual(status, 200)
    })
  })

  t.test('Should set the Accept-Encoding header when specified', t => {
    t.plan(4)
    const body = JSON.stringify({ hello: 'world' })
    const conn = new HttpConnection(new Host({ suggestCompression: true }))
    conn.hand.request = function (reqParams, cb) {
      t.strictEqual(reqParams.headers['Accept-Encoding'], 'gzip,deflate')
      const response = new IncomingMessage({
        statusCode: 200,
        body: body,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      cb(response)

      return new ClientRequest()
    }

    conn.request({ body }, (err, res, status) => {
      t.error(err)
      t.strictEqual(res, body)
      t.strictEqual(status, 200)
    })
  })

  t.end()
})

test('Should destroy any connection created', t => {
  t.plan(1)
  const conn = new HttpConnection(new Host('localhost'))
  const name = conn.agent.getName(parseUrl('http://localhost/'))
  conn.agent.sockets[name] = [
    { destroy: function () {} },
    { destroy: function () {} },
    { destroy: function () {} },
    { destroy: function () {} },
    { destroy: function () {} },
    { destroy: function () {} },
    { destroy: function () {} },
    { destroy: function () {} },
    { destroy: function () {} },
    { destroy: function () {} }
  ]
  conn.setStatus('closed')
  t.deepEqual(conn.agent.sockets, [])
})
