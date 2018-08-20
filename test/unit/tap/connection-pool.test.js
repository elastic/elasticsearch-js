'use strict'

const { test } = require('tap')
const ConnectionAbstract = require('../../../src/lib/connection')
const ConnectionPool = require('../../../src/lib/connection_pool')
const Host = require('../../../src/lib/host')

test('Adding/Removing/Syncing connections', t => {
  var pool = null
  var host = null
  var host2 = null
  var conn = null
  var conn2 = null

  t.beforeEach(done => {
    pool = new ConnectionPool({})
    host = new Host('localhost:9200')
    host2 = new Host('localhost:9300')
    conn = new ConnectionAbstract(host)
    conn2 = new ConnectionAbstract(host2)
    done()
  })

  t.test('addConnection only adds the connections if it doesn\'t already exists / 1', t => {
    t.plan(4)

    t.strictEqual(length(pool.index), 0)
    pool.addConnection(conn)
    const index = {}
    index[host.toString()] = conn
    t.deepEqual(pool.index, index)
    t.deepEqual(pool._conns.alive, [conn])
    t.deepEqual(pool._conns.dead, [])
  })

  t.test('addConnection only adds the connections if it doesn\'t already exists / 2', t => {
    t.plan(3)

    t.strictEqual(length(pool.index), 0)
    pool.addConnection(conn)
    t.strictEqual(length(pool.index), 1)
    pool.addConnection(conn)
    t.strictEqual(length(pool.index), 1)
  })

  t.test('removeConnection (if it exists) / 1', t => {
    t.plan(3)

    t.strictEqual(length(pool.index), 0)
    pool.addConnection(conn)
    t.strictEqual(length(pool.index), 1)
    pool.removeConnection(conn)
    t.strictEqual(length(pool.index), 0)
  })

  t.test('removeConnection (if it exists) / 2', t => {
    t.plan(3)

    t.strictEqual(length(pool.index), 0)
    pool.addConnection(conn)
    t.strictEqual(length(pool.index), 1)
    pool.removeConnection(conn2)
    t.strictEqual(length(pool.index), 1)
  })

  t.test('closes the connection when it removes it', t => {
    t.plan(4)

    pool.addConnection(conn)
    t.strictEqual(conn.status, 'alive')
    t.strictEqual(conn.listenerCount('status set'), 1)

    pool.removeConnection(conn)
    t.strictEqual(conn.status, 'closed')
    t.strictEqual(conn.listenerCount('status set'), 0)
  })

  t.test('setHosts should override the internal node list', t => {
    t.plan(2)

    pool.setHosts([host, host2])
    t.strictEqual(length(pool.index), 2)
    pool.setHosts([host])
    t.strictEqual(length(pool.index), 1)
  })

  t.end()
})

test('Connection selection', t => {
  var pool = null
  var host = null
  var host2 = null

  t.beforeEach(done => {
    pool = new ConnectionPool({})
    host = new Host('localhost:9200')
    host2 = new Host('localhost:9300')
    pool.setHosts([host, host2])
    done()
  })

  t.test('Should detect if the selector is async', t => {
    t.plan(1)

    pool.selector = function (list, cb) {
      cb()
    }

    pool.select(t.error)
  })

  t.test('Should detect if the selector is not async', t => {
    t.plan(1)

    pool.selector = function (list) {}

    pool.select(t.error)
  })

  t.test('Sync selectors should still return async', t => {
    t.plan(4)

    const order = [1, 2]
    pool.selector = function (list) {
      return list[0]
    }

    pool.select((err, selection) => {
      t.error(err)
      t.deepEqual(selection.host, host)
      t.strictEqual(order.shift(), 2)
    })

    t.strictEqual(order.shift(), 1)
  })

  t.test('Should catch errors in sync selectors', t => {
    t.plan(1)

    pool.selector = function (list) {
      return JSON.notAMethod()
    }

    pool.select((err, selection) => {
      t.ok(err)
    })
  })

  t.end()
})

test(`Connection selection with no living nodes
      it should ping all of the dead nodes, in order of oldest timeout,
      and return the first that's okay`, t => {
  t.plan(2)

  const pool = new ConnectionPool({ deadTimeout: 1000 })
  const connections = [
    new ConnectionAbstract(new Host('http://localhost:9200')),
    new ConnectionAbstract(new Host('http://localhost:9201')),
    new ConnectionAbstract(new Host('http://localhost:9202')),
    new ConnectionAbstract(new Host('http://localhost:9203'))
  ]

  connections.forEach((conn, index) => {
    pool.addConnection(conn)
    conn.ping = function (params, cb) {
      if (cb === undefined) {
        cb = params
        params = {}
      }
      if (index !== connections.length - 1) {
        process.nextTick(() => cb(new Error('Keep trying')))
      } else {
        process.nextTick(() => cb(null, true))
      }
    }
    conn.setStatus('dead')
  })

  pool.select((err, selection) => {
    t.error(err)
    t.deepEqual(
      selection.host,
      connections[connections.length - 1].host
    )
    pool.close()
  })
})

test('Connection state management', t => {
  var pool = null
  var host = null
  var host2 = null
  var conn = null
  var conn2 = null

  t.beforeEach(done => {
    pool = new ConnectionPool({})
    host = new Host('localhost:9200')
    host2 = new Host('localhost:9300')
    conn = new ConnectionAbstract(host)
    conn2 = new ConnectionAbstract(host2)
    pool.addConnection(conn)
    pool.addConnection(conn2)
    done()
  })

  t.afterEach(done => {
    pool.close()
    done()
  })

  t.test('Should move an alive connection to dead', t => {
    t.plan(2)

    conn.setStatus('dead')
    t.deepEqual(pool._conns.alive, [conn2])
    t.deepEqual(pool._conns.dead, [conn])
  })

  t.test('Does nothing when a connections is re-alive', t => {
    t.plan(4)

    const last = pool._conns.alive[pool._conns.alive.length - 1]
    const first = pool._conns.alive[0]

    first.setStatus('alive')
    t.deepEqual(
      pool._conns.alive[0],
      first
    )
    t.deepEqual(
      pool._conns.alive[pool._conns.alive.length - 1],
      last
    )

    last.setStatus('alive')
    t.deepEqual(
      pool._conns.alive[0],
      first
    )
    t.deepEqual(
      pool._conns.alive[pool._conns.alive.length - 1],
      last
    )
  })

  t.end()
})

test('getConnection returns the connections from the alive list', t => {
  t.plan(1)

  const pool = new ConnectionPool({})
  const host = new Host('localhost:9200')
  const host2 = new Host('localhost:9300')
  pool.setHosts([host, host2])

  t.deepEqual(
    pool.getConnections(),
    pool._conns.alive
  )
})

test('calcDeadTimeout', t => {
  t.test('Should be configurable via config.calcDeadTimeout', t => {
    t.plan(1)
    const pool = new ConnectionPool({ calcDeadTimeout: 'flat' })
    t.strictEqual(pool.calcDeadTimeout, ConnectionPool.calcDeadTimeoutOptions.flat)
    pool.close()
  })

  t.test('"flat" always return the base timeout', t => {
    t.plan(3)
    const pool = new ConnectionPool({ calcDeadTimeout: 'flat' })
    t.strictEqual(pool.calcDeadTimeout(0, 1000), 1000)
    t.strictEqual(pool.calcDeadTimeout(10, 5000), 5000)
    t.strictEqual(pool.calcDeadTimeout(25, 10000), 10000)
    pool.close()
  })

  t.test('"exponential" always increases the timeout based on the attempts', t => {
    t.plan(3)
    const pool = new ConnectionPool({ calcDeadTimeout: 'exponential' })
    t.strictEqual(pool.calcDeadTimeout(0, 1000), 1000)
    t.true(pool.calcDeadTimeout(10, 5000) > 5000)
    t.true(pool.calcDeadTimeout(25, 10000) > 10000)
    pool.close()
  })

  t.test('"exponential" should produce predicatable results', t => {
    t.plan(3)
    const pool = new ConnectionPool({ calcDeadTimeout: 'exponential' })
    t.strictEqual(pool.calcDeadTimeout(0, 1000), 1000)
    t.strictEqual(pool.calcDeadTimeout(4, 10000), 40000)
    t.strictEqual(pool.calcDeadTimeout(25, 30000), 18e5)
    pool.close()
  })

  t.test('"exponential" should respect config.maxDeadTimeout', t => {
    t.plan(3)
    const pool = new ConnectionPool({
      calcDeadTimeout: 'exponential',
      maxDeadTimeout: 10000
    })
    t.strictEqual(pool.calcDeadTimeout(0, 1000), 1000)
    t.strictEqual(pool.calcDeadTimeout(10, 1000), 10000)
    t.strictEqual(pool.calcDeadTimeout(100, 1000), 10000)
    pool.close()
  })

  t.end()
})

function length (obj) {
  return Object.keys(obj).length
}
