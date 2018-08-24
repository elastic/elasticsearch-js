'use strict'

const { test } = require('tap')
const Transport = require('../../../src/lib/transport')
const Host = require('../../../src/lib/host')
const errors = require('../../../src/lib/errors')

test('Constructor', t => {
  t.test('Accepts a log class', t => {
    t.plan(1)
    function MyAwesomeLogClass () {}
    const transport = new Transport({ log: MyAwesomeLogClass })
    t.type(transport.log, MyAwesomeLogClass)
  })

  t.test('Accepts a connection pool', t => {
    t.plan(1)
    function MyAwesomeConnectionPoolClass () {}
    MyAwesomeConnectionPoolClass.prototype = Object.create(Transport.connectionPools.main.prototype)
    const transport = new Transport({ connectionPool: MyAwesomeConnectionPoolClass })
    t.type(transport.connectionPool, MyAwesomeConnectionPoolClass)
  })

  t.test('Accepts a connection pool that is defined in Transport.connectionPools', t => {
    t.plan(1)
    function MyAwesomeConnectionPoolClass () {}
    MyAwesomeConnectionPoolClass.prototype = Object.create(Transport.connectionPools.main.prototype)
    Transport.connectionPools.custom = MyAwesomeConnectionPoolClass
    const transport = new Transport({ connectionPool: 'custom' })
    t.type(transport.connectionPool, MyAwesomeConnectionPoolClass)
    delete Transport.connectionPools.custom
  })

  t.test('Should call immediately sniff if sniffOnStart is true', t => {
    t.plan(1)
    const restore = stub('sniff', () => {
      t.ok('Called')
    })
    new Transport({ sniffOnStart: true }) // eslint-disable-line
    restore()
  })

  t.test('Sniff interval', t => {
    t.plan(2)
    const restore = stub('sniff', () => {
      t.ok('Called')
    })
    const transport = new Transport({ sniffInterval: 50 }) // eslint-disable-line
    setTimeout(() => {
      transport.closed = true
      restore()
    }, 110)
  })

  t.end()
})

function stub (name, fn) {
  const original = Transport.prototype[name]
  Transport.prototype[name] = fn
  return function () {
    Transport.prototype[name] = original
  }
}
