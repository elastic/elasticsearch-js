'use strict'

const { test } = require('tap')
const { buildServer } = require('../../utils')
const Transport = require('../../../src/lib/transport')
const errors = require('../../../src/lib/errors')
const ConnectionPool = require('../../../src/lib/connection_pool')

test('400', t => {
  t.plan(5)

  function handler (req, res) {
    t.strictEqual(req.url, '/400')
    res.statusCode = 400
    res.end('sorry')
  }

  buildServer(handler, port => {
    const transport = new Transport({ host: `localhost:${port}` })
    transport.request({ path: '/400' }, (err, body, status) => {
      t.type(err, errors[400])
      t.type(err, errors.BadRequest)
      t.strictEqual(body, 'sorry')
      t.strictEqual(status, 400)
    })
  })
})

test('404', t => {
  t.test('Without castExists', t => {
    t.plan(5)

    function handler (req, res) {
      t.strictEqual(req.url, '/404')
      res.statusCode = 404
      res.end('sorry')
    }

    buildServer(handler, port => {
      const transport = new Transport({ host: `localhost:${port}` })
      transport.request({ path: '/404' }, (err, body, status) => {
        t.type(err, errors[404])
        t.type(err, errors.NotFound)
        t.strictEqual(body, 'sorry')
        t.strictEqual(status, 404)
      })
    })
  })

  t.test('With castExists', t => {
    t.plan(4)

    function handler (req, res) {
      t.strictEqual(req.url, '/404')
      res.statusCode = 404
      res.end('sorry')
    }

    buildServer(handler, port => {
      const transport = new Transport({ host: `localhost:${port}` })
      transport.request({ path: '/404', castExists: true }, (err, body, status) => {
        t.strictEqual(err, undefined)
        t.strictEqual(body, false)
        t.strictEqual(status, 404)
      })
    })
  })

  t.end()
})

test('500', t => {
  t.plan(5)

  function handler (req, res) {
    t.strictEqual(req.url, '/500')
    res.statusCode = 500
    res.end('sorry')
  }

  buildServer(handler, port => {
    const transport = new Transport({ host: `localhost:${port}` })
    transport.request({ path: '/500' }, (err, body, status) => {
      t.type(err, errors[500])
      t.type(err, errors.InternalServerError)
      t.strictEqual(body, 'sorry')
      t.strictEqual(status, 500)
    })
  })
})

test('530', t => {
  t.plan(4)

  function handler (req, res) {
    t.strictEqual(req.url, '/530')
    res.statusCode = 530
    res.end('sorry')
  }

  buildServer(handler, port => {
    const transport = new Transport({ host: `localhost:${port}` })
    transport.request({ path: '/530' }, (err, body, status) => {
      t.type(err, errors.Generic)
      t.strictEqual(body, 'sorry')
      t.strictEqual(status, 530)
    })
  })
})

test('200', t => {
  t.test('With castExists', t => {
    t.plan(4)

    function handler (req, res) {
      t.strictEqual(req.url, '/200')
      res.statusCode = 200
      res.end('stuff')
    }

    buildServer(handler, port => {
      const transport = new Transport({ host: `localhost:${port}` })
      transport.request({ path: '/200', castExists: true }, (err, body, status) => {
        t.error(err)
        t.strictEqual(body, true)
        t.strictEqual(status, 200)
      })
    })
  })

  t.test('Partial response body (json)', t => {
    t.plan(4)

    function handler (req, res) {
      t.strictEqual(req.url, '/200')
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end('{"hello":"wor')
    }

    buildServer(handler, port => {
      const transport = new Transport({ host: `localhost:${port}` })
      transport.request({ path: '/200' }, (err, body, status) => {
        t.type(err, errors.Serialization)
        t.strictEqual(body, '{"hello":"wor')
        t.strictEqual(status, 200)
      })
    })
  })

  t.test('Valid response body (json)', t => {
    t.plan(4)

    function handler (req, res) {
      t.strictEqual(req.url, '/200')
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ hello: 'world' }))
    }

    buildServer(handler, port => {
      const transport = new Transport({ host: `localhost:${port}` })
      transport.request({ path: '/200' }, (err, body, status) => {
        t.error(err)
        t.deepEqual(body, { hello: 'world' })
        t.strictEqual(status, 200)
      })
    })
  })

  t.test('Valid response body (plain text)', t => {
    t.plan(4)

    function handler (req, res) {
      t.strictEqual(req.url, '/200')
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end('hello world!')
    }

    buildServer(handler, port => {
      const transport = new Transport({ host: `localhost:${port}` })
      transport.request({ path: '/200' }, (err, body, status) => {
        t.error(err)
        t.strictEqual(body, 'hello world!')
        t.strictEqual(status, 200)
      })
    })
  })

  t.test('Valid response body with promise (plain text)', t => {
    t.plan(2)

    function handler (req, res) {
      t.strictEqual(req.url, '/200')
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end('hello world!')
    }

    buildServer(handler, port => {
      const transport = new Transport({ host: `localhost:${port}` })
      transport.request({ path: '/200' })
        .then(body => t.strictEqual(body, 'hello world!'))
        .catch(err => t.fail(err))
    })
  })

  t.end()
})

test('Request timeout', t => {
  t.plan(2)

  function handler (req, res) {
    t.strictEqual(req.url, '/200')
    setTimeout(() => {
      res.statusCode = 200
      res.end('hello world!')
    }, 100)
  }

  buildServer(handler, port => {
    const transport = new Transport({ host: `localhost:${port}` })
    transport.request({ path: '/200', requestTimeout: 50 }, (err, body, status) => {
      t.type(err, errors.RequestTimeout)
    })
  })
})
