/* eslint camelcase: 0 */
'use strict'

const { test } = require('tap')
const { inherits } = require('util')
const { Writable } = require('readable-stream')
const es = require('../../../src/elasticsearch')

test('Should be able to use the specified API version', t => {
  const apis = require('../../../src/lib/apis')

  t.test('Use the default API by default', t => {
    t.plan(1)
    const pkg = require('../../../package.json')
    const { default_api_branch } = pkg.config
    const client = new es.Client()
    t.deepEqual(client.bulk, apis[default_api_branch].bulk)
    client.close()
  })

  t.test('Use a custom API version', t => {
    t.plan(1)
    const client = new es.Client({ apiVersion: '5.0' })
    t.deepEqual(client.bulk, apis['5.0'].bulk)
    client.close()
  })

  t.end()
})

test('Closing the client causes it\'s transport to be closed', t => {
  t.plan(1)

  const client = new es.Client()
  client.transport.close = function () {
    t.pass('Close called')
  }
  client.close()
})

test('The default log level should be `warning`', t => {
  t.plan(5)

  const client = new es.Client()
  t.ok(client.transport.log.listenerCount('error'))
  t.ok(client.transport.log.listenerCount('warning'))
  t.notOk(client.transport.log.listenerCount('info'))
  t.notOk(client.transport.log.listenerCount('debug'))
  t.notOk(client.transport.log.listenerCount('trace'))
  client.close()
})

test('Should accepts a stream type logger', t => {
  t.plan(1)

  function NullStream () {
    Writable.call(this)
  }

  inherits(NullStream, Writable)

  NullStream.prototype._write = function () {
    t.pass('Called')
  }

  const client = new es.Client({
    log: [{ type: 'stream', stream: new NullStream() }]
  })

  client.transport.log.error(new Error())
  client.close()
})
