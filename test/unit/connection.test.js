'use strict'

const { test } = require('tap')
const { buildServer } = require('../utils')
const Connection = require('../../lib/Connection')

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
      host: {
        href: `http://localhost:${port}`,
        protocol: 'http:'
      }
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
      host: {
        href: `https://localhost:${port}`,
        protocol: 'https:'
      }
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
      host: {
        href: `https://localhost:${port}`,
        protocol: 'https:'
      },
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
      host: {
        href: `http://localhost:${port}`,
        protocol: 'http:'
      },
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
      host: {
        href: `http://localhost:${port}`,
        protocol: 'http:'
      }
    })
    connection.request({
      path: '/hello',
      method: 'GET',
      timeout: 500
    }, (err, res) => {
      t.ok(err.message, 'Request timed out')
    })
  })
})
