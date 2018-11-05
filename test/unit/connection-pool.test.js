'use strict'

const { test } = require('tap')
const { URL } = require('url')
const ConnectionPool = require('../../lib/ConnectionPool')
const Connection = require('../../lib/Connection')
const { buildServer } = require('../utils')

test('API', t => {
  t.test('addConnection', t => {
    const pool = new ConnectionPool()
    const href = 'http://localhost:9200/'
    pool.addConnection(href)
    t.ok(pool.connections.get(href) instanceof Connection)
    t.deepEqual(pool.alive, [href])
    t.deepEqual(pool.dead, [])
    t.end()
  })

  t.test('addConnection should throw with two connections with the same id', t => {
    const pool = new ConnectionPool()
    const href = 'http://localhost:9200/'
    pool.addConnection(href)
    try {
      pool.addConnection(href)
      t.fail('Should throw')
    } catch (err) {
      t.is(err.message, `Connection with id '${href}' is already present`)
    }
    t.end()
  })

  t.test('markDead', t => {
    const pool = new ConnectionPool()
    const href = 'http://localhost:9200/'
    var connection = pool.addConnection(href)
    pool.markDead(connection)
    connection = pool.connections.get(href)
    t.strictEqual(connection.deadCount, 1)
    t.true(connection.resurrectTimeout > 0)
    t.deepEqual(pool.alive, [])
    t.deepEqual(pool.dead, [href])
    t.end()
  })

  t.test('markDead should sort the dead queue by deadTimeout', t => {
    const pool = new ConnectionPool()
    const href1 = 'http://localhost:9200/1'
    const href2 = 'http://localhost:9200/2'
    const conn1 = pool.addConnection(href1)
    const conn2 = pool.addConnection(href2)
    pool.markDead(conn2)
    setTimeout(() => {
      pool.markDead(conn1)
      t.deepEqual(pool.dead, [href2, href1])
      t.end()
    }, 10)
  })

  t.test('markAlive', t => {
    const pool = new ConnectionPool()
    const href = 'http://localhost:9200/'
    var connection = pool.addConnection(href)
    pool.markDead(connection)
    pool.markAlive(connection)
    connection = pool.connections.get(href)
    t.strictEqual(connection.deadCount, 0)
    t.strictEqual(connection.resurrectTimeout, 0)
    t.deepEqual(pool.alive, [href])
    t.deepEqual(pool.dead, [])
    t.end()
  })

  t.test('resurrect', t => {
    t.test('ping strategy', t => {
      t.test('alive', t => {
        function handler (req, res) {
          res.end()
        }

        buildServer(handler, ({ port }, server) => {
          const pool = new ConnectionPool({
            resurrectStrategy: 'ping',
            pingTimeout: 3000
          })
          const href = `http://localhost:${port}/`
          var connection = pool.addConnection(href)
          pool.markDead(connection)
          pool.resurrect(Date.now() + 1000 * 60 * 3, (isAlive, connection) => {
            t.true(isAlive)
            connection = pool.connections.get(connection.id)
            t.strictEqual(connection.deadCount, 0)
            t.strictEqual(connection.resurrectTimeout, 0)
            t.deepEqual(pool.alive, [href])
            t.deepEqual(pool.dead, [])
            t.end()
          })
        })
      })

      t.test('dead', t => {
        buildServer(() => {}, ({ port }, server) => {
          server.close()
          const pool = new ConnectionPool({
            resurrectStrategy: 'ping',
            pingTimeout: 3000
          })
          const href = `http://localhost:${port}/`
          var connection = pool.addConnection(href)
          pool.markDead(connection)
          pool.resurrect(Date.now() + 1000 * 60 * 3, (isAlive, connection) => {
            t.false(isAlive)
            connection = pool.connections.get(connection.id)
            t.strictEqual(connection.deadCount, 2)
            t.true(connection.resurrectTimeout > 0)
            t.deepEqual(pool.alive, [])
            t.deepEqual(pool.dead, [href])
            t.end()
          })
        })
      })

      t.end()
    })

    t.test('optimistic strategy', t => {
      const pool = new ConnectionPool({
        resurrectStrategy: 'optimistic'
      })
      const href = 'http://localhost:9200/'
      var connection = pool.addConnection(href)
      pool.markDead(connection)
      pool.resurrect(Date.now() + 1000 * 60 * 3, (isAlive, connection) => {
        t.true(isAlive)
        connection = pool.connections.get(connection.id)
        t.strictEqual(connection.deadCount, 1)
        t.true(connection.resurrectTimeout > 0)
        t.deepEqual(pool.alive, [href])
        t.deepEqual(pool.dead, [])
        t.end()
      })
    })

    t.test('none strategy', t => {
      const pool = new ConnectionPool({
        resurrectStrategy: 'none'
      })
      const href = 'http://localhost:9200/'
      var connection = pool.addConnection(href)
      pool.markDead(connection)
      pool.resurrect(Date.now() + 1000 * 60 * 3, (isAlive, connection) => {
        t.ok(isAlive === null)
        t.ok(connection === null)
        connection = pool.connections.get(href)
        t.strictEqual(connection.deadCount, 1)
        t.true(connection.resurrectTimeout > 0)
        t.deepEqual(pool.alive, [])
        t.deepEqual(pool.dead, [href])
        t.end()
      })
    })

    t.end()
  })

  t.test('getConnection', t => {
    t.test('Should return a connection', t => {
      const pool = new ConnectionPool()
      const href = 'http://localhost:9200/'
      pool.addConnection(href)
      t.ok(pool.getConnection() instanceof Connection)
      t.end()
    })

    t.test('filter option', t => {
      const pool = new ConnectionPool()
      const href1 = 'http://localhost:9200/'
      const href2 = 'http://localhost:9200/other'
      pool.addConnection([href1, href2])

      const filter = node => node.id === href1
      t.strictEqual(pool.getConnection({ filter }).id, href1)
      t.end()
    })

    t.test('weighter option', t => {
      const pool = new ConnectionPool()
      const href1 = 'http://localhost:9200/'
      const href2 = 'http://localhost:9200/other'
      pool.addConnection([href1, href2])

      const weighter = node => node.id === href1
      t.strictEqual(pool.getConnection({ weighter }).id, href2)
      t.end()
    })

    t.test('filter should be run before the weighter', t => {
      const pool = new ConnectionPool()
      const href1 = 'http://localhost:9200/'
      const href2 = 'http://localhost:9200/other'
      pool.addConnection([href1, href2])

      const filter = node => node.id === href1
      const weighter = node => node.id !== href2
      t.strictEqual(pool.getConnection({ weighter, filter }).id, href1)
      t.end()
    })

    t.test('filter and weighter should get Connection objects', t => {
      t.plan(3)
      const pool = new ConnectionPool()
      const href1 = 'http://localhost:9200/'
      const href2 = 'http://localhost:9200/other'
      pool.addConnection([href1, href2])

      const filter = node => {
        t.ok(node instanceof Connection)
        return true
      }
      const weighter = node => t.ok(node instanceof Connection)
      pool.getConnection({ weighter, filter })
    })

    t.test('filter and weighter should get alive connections', t => {
      t.plan(3)
      const pool = new ConnectionPool()
      const href1 = 'http://localhost:9200/'
      const href2 = 'http://localhost:9200/other'
      const conn = pool.addConnection(href1)
      pool.addConnection([href2, `${href2}/stuff`])
      pool.markDead(conn)

      const filter = node => {
        t.strictEqual(node.status, Connection.statuses.ALIVE)
        return true
      }
      const weighter = node => t.strictEqual(node.status, Connection.statuses.ALIVE)
      pool.getConnection({ weighter, filter })
    })

    t.test('filter and weighter as ConnectionPool option', t => {
      t.plan(3)

      const href1 = 'http://localhost:9200/'
      const href2 = 'http://localhost:9200/other'
      const pool = new ConnectionPool({
        nodeFilter: node => {
          t.ok('called')
          return node.id === href1
        },
        nodeWeighter: node => {
          t.ok('called')
          return node.id !== href2
        }
      })
      pool.addConnection([href1, href2])
      t.strictEqual(pool.getConnection().id, href1)
    })

    t.end()
  })

  t.test('removeConnection', t => {
    const pool = new ConnectionPool()
    const href = 'http://localhost:9200/'
    var connection = pool.addConnection(href)
    t.ok(pool.getConnection() instanceof Connection)
    pool.removeConnection(connection)
    t.strictEqual(pool.getConnection(), null)
    t.end()
  })

  t.test('empty', t => {
    const pool = new ConnectionPool()
    pool.addConnection('http://localhost:9200/')
    pool.addConnection('http://localhost:9201/')
    pool.empty()
    t.strictEqual(pool.connections.size, 0)
    t.deepEqual(pool.alive, [])
    t.deepEqual(pool.dead, [])
    t.end()
  })

  t.test('urlToHost', t => {
    const pool = new ConnectionPool()
    const url = 'http://localhost:9200'
    t.deepEqual(
      pool.urlToHost(url),
      { host: new URL(url) }
    )
    t.end()
  })

  t.test('nodesToHost', t => {
    const pool = new ConnectionPool()
    const nodes = {
      a1: {
        http: {
          publish_address: '127.0.0.1:9200'
        },
        roles: ['master', 'data', 'ingest']
      },
      a2: {
        http: {
          publish_address: '127.0.0.1:9202'
        },
        roles: ['master', 'data', 'ingest']
      }
    }

    t.deepEqual(pool.nodesToHost(nodes), [{
      host: new URL('http://127.0.0.1:9200'),
      id: 'a1',
      roles: {
        master: true,
        data: true,
        ingest: true
      }
    }, {
      host: new URL('http://127.0.0.1:9201'),
      id: 'a2',
      roles: {
        master: true,
        data: true,
        ingest: true
      }
    }])
    t.end()
  })

  t.end()
})
