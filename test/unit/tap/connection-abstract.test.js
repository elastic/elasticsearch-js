'use strict'

const { test } = require('tap')
const { stub } = require('sinon')
const ConnectionAbstract = require('../../../src/lib/connection')
const Host = require('../../../src/lib/host')
const noop = () => {}

test('Constructs with defaults for host', t => {
  t.plan(1)
  const host = new Host('localhost:9200')
  const conn = new ConnectionAbstract(host)
  t.deepEqual(conn.host, host)
})

test('It requires a valid host', t => {
  t.plan(2)

  try {
    new ConnectionAbstract() // eslint-disable-line
    t.fail('should throw')
  } catch (err) {
    t.ok(err)
  }

  try {
    new ConnectionAbstract({}) // eslint-disable-line
    t.fail('should throw')
  } catch (err) {
    t.ok(err)
  }
})

test('The request method should be overridden', t => {
  t.plan(1)

  const host = new Host('localhost:9200')
  const conn = new ConnectionAbstract(host)

  try {
    conn.request()
    t.fail('should throw')
  } catch (err) {
    t.ok(err)
  }
})

test('ping', t => {
  t.test('Should accept just a callback', t => {
    t.plan(3)
    const host = new Host('localhost:9200')
    const conn = new ConnectionAbstract(host)
    stub(conn, 'request')

    conn.ping(noop)
    t.true(conn.request.calledOnce)
    t.type(conn.request.lastCall.args[0], Object)
    t.type(conn.request.lastCall.args[1], Function)
  })

  t.test('Should accept just params', t => {
    t.plan(3)
    const host = new Host('localhost:9200')
    const conn = new ConnectionAbstract(host)
    stub(conn, 'request')

    conn.ping({})
    t.true(conn.request.calledOnce)
    t.type(conn.request.lastCall.args[0], Object)
    t.type(conn.request.lastCall.args[1], Function)
  })

  t.test('Allows overriding the requestTimeout, method and path', t => {
    t.plan(3)
    const host = new Host('localhost:9200')
    const conn = new ConnectionAbstract(host)
    stub(conn, 'request')

    const params = {
      requestTimeout: 1000,
      method: 'HEAD',
      path: '/'
    }
    conn.ping(params)
    t.true(conn.request.calledOnce)
    t.deepEqual(conn.request.lastCall.args[0], params)
    t.type(conn.request.lastCall.args[1], Function)
  })

  t.test('Defaults to the pingTimeout in the config', t => {
    t.plan(2)
    const host = new Host('localhost:9200')
    const conn = new ConnectionAbstract(host, { pingTimeout: 1000 })
    const callback = { cb: noop }

    stub(conn, 'request')
    stub(callback, 'cb')

    conn.ping(callback.cb)
    setTimeout(() => t.true(callback.cb.notCalled), 500)
    setTimeout(() => t.true(callback.cb.calledOnce), 1100)
  })

  t.test('It calls it\'s own request method', t => {
    t.plan(1)
    const host = new Host('localhost:9200')
    const conn = new ConnectionAbstract(host, { pingTimeout: 1000 })
    stub(conn, 'request')

    conn.ping()
    t.true(conn.request.calledOnce)
  })

  t.end()
})

test('setStatus', t => {
  t.test('Emits the "status set" event with `new`, `old` and `conn` args', t => {
    t.plan(2)
    const host = new Host('localhost:9200')
    const conn = new ConnectionAbstract(host)

    conn.emit = function (eventName) {
      t.strictEqual(eventName, 'status set')
      t.deepEqual(
        Array.prototype.slice.call(arguments, 1),
        ['closed', undefined, conn]
      )
    }

    conn.setStatus('closed')
  })

  t.test('Updated the status property', t => {
    t.plan(1)
    const host = new Host('localhost:9200')
    const conn = new ConnectionAbstract(host)

    conn.setStatus('closed')
    t.strictEqual(conn.status, 'closed')
  })

  t.end()
})
