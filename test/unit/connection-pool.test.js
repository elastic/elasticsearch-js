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
    t.strictEqual(pool.connections.get(href).status, Connection.statuses.ALIVE)
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
    t.strictEqual(connection.status, Connection.statuses.ALIVE)
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
            t.strictEqual(connection.status, Connection.statuses.ALIVE)
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
            t.strictEqual(connection.status, Connection.statuses.DEAD)
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
        t.strictEqual(connection.status, Connection.statuses.ALIVE)
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
        t.strictEqual(connection.status, Connection.statuses.DEAD)
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

    t.test('filter and weighter should get Connection objects', t => {
      t.plan(2)
      const pool = new ConnectionPool()
      const href1 = 'http://localhost:9200/'
      const href2 = 'http://localhost:9200/other'
      pool.addConnection([href1, href2])

      const filter = node => {
        t.ok(node instanceof Connection)
        return true
      }
      pool.getConnection({ filter })
    })

    t.test('filter should get alive connections', t => {
      t.plan(2)
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
      pool.getConnection({ filter })
    })

    t.test('filter as ConnectionPool option', t => {
      t.plan(3)

      const href1 = 'http://localhost:9200/'
      const href2 = 'http://localhost:9200/other'
      const pool = new ConnectionPool({
        nodeFilter: node => {
          t.ok('called')
          return true
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
    t.deepEqual(pool.dead, [])
    t.end()
  })

  t.test('urlToHost', t => {
    const pool = new ConnectionPool()
    const url = 'http://localhost:9200'
    t.deepEqual(
      pool.urlToHost(url),
      { url: new URL(url) }
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
      url: new URL('http://127.0.0.1:9200'),
      id: 'a1',
      roles: {
        master: true,
        data: true,
        ingest: true
      }
    }, {
      url: new URL('http://127.0.0.1:9201'),
      id: 'a2',
      roles: {
        master: true,
        data: true,
        ingest: true
      }
    }])
    t.end()
  })

  t.test('update', t => {
    t.test('Should not update existing connections', t => {
      t.plan(2)
      class CustomConnectionPool extends ConnectionPool {
        markAlive () {
          t.fail('Should not be called')
        }
      }
      const pool = new CustomConnectionPool()
      pool.addConnection([{
        url: new URL('http://127.0.0.1:9200'),
        id: 'a1',
        roles: {
          master: true,
          data: true,
          ingest: true
        }
      }, {
        url: new URL('http://127.0.0.1:9201'),
        id: 'a2',
        roles: {
          master: true,
          data: true,
          ingest: true
        }
      }])

      pool.update([{
        url: new URL('http://127.0.0.1:9200'),
        id: 'a1',
        roles: null
      }, {
        url: new URL('http://127.0.0.1:9201'),
        id: 'a2',
        roles: null
      }])

      t.ok(pool.connections.get('a1').roles !== null)
      t.ok(pool.connections.get('a2').roles !== null)
    })

    t.test('Should not update existing connections (mark alive)', t => {
      t.plan(4)
      class CustomConnectionPool extends ConnectionPool {
        markAlive (connection) {
          t.ok('called')
          super.markAlive(connection)
        }
      }
      const pool = new CustomConnectionPool()
      const conn1 = pool.addConnection({
        url: new URL('http://127.0.0.1:9200'),
        id: 'a1',
        roles: {
          master: true,
          data: true,
          ingest: true
        }
      })

      const conn2 = pool.addConnection({
        url: new URL('http://127.0.0.1:9201'),
        id: 'a2',
        roles: {
          master: true,
          data: true,
          ingest: true
        }
      })

      pool.markDead(conn1)
      pool.markDead(conn2)

      pool.update([{
        url: new URL('http://127.0.0.1:9200'),
        id: 'a1',
        roles: null
      }, {
        url: new URL('http://127.0.0.1:9201'),
        id: 'a2',
        roles: null
      }])

      t.ok(pool.connections.get('a1').roles !== null)
      t.ok(pool.connections.get('a2').roles !== null)
    })

    t.test('Add a new connection', t => {
      t.plan(2)
      const pool = new ConnectionPool()
      pool.addConnection({
        url: new URL('http://127.0.0.1:9200'),
        id: 'a1',
        roles: {
          master: true,
          data: true,
          ingest: true
        }
      })

      pool.update([{
        url: new URL('http://127.0.0.1:9200'),
        id: 'a1',
        roles: null
      }, {
        url: new URL('http://127.0.0.1:9201'),
        id: 'a2',
        roles: null
      }])

      t.ok(pool.connections.get('a1').roles !== null)
      t.true(pool.connections.has('a2'))
    })

    t.test('Remove old connections', t => {
      t.plan(3)
      const pool = new ConnectionPool()
      pool.addConnection({
        url: new URL('http://127.0.0.1:9200'),
        id: 'a1',
        roles: null
      })

      pool.update([{
        url: new URL('http://127.0.0.1:9200'),
        id: 'a2',
        roles: null
      }, {
        url: new URL('http://127.0.0.1:9201'),
        id: 'a3',
        roles: null
      }])

      t.false(pool.connections.has('a1'))
      t.true(pool.connections.has('a2'))
      t.true(pool.connections.has('a3'))
    })

    t.end()
  })

  t.end()
})
