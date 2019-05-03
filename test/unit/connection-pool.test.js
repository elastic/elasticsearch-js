/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict'

const { test } = require('tap')
const { URL } = require('url')
const ConnectionPool = require('../../lib/ConnectionPool')
const Connection = require('../../lib/Connection')
const { defaultNodeFilter, roundRobinSelector } = require('../../lib/Transport').internals
const { connection: { MockConnection, MockConnectionTimeout } } = require('../utils')

test('API', t => {
  t.test('addConnection', t => {
    const pool = new ConnectionPool({ Connection })
    const href = 'http://localhost:9200/'
    pool.addConnection(href)
    t.ok(pool.connections.get(href) instanceof Connection)
    t.strictEqual(pool.connections.get(href).status, Connection.statuses.ALIVE)
    t.deepEqual(pool.dead, [])
    t.end()
  })

  t.test('addConnection should throw with two connections with the same id', t => {
    const pool = new ConnectionPool({ Connection })
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

  t.test('addConnection (should store the auth data)', t => {
    const pool = new ConnectionPool({ Connection })
    const href = 'http://localhost:9200/'
    pool.addConnection('http://foo:bar@localhost:9200')

    t.ok(pool.connections.get(href) instanceof Connection)
    t.strictEqual(pool.connections.get(href).status, Connection.statuses.ALIVE)
    t.deepEqual(pool.dead, [])
    t.deepEqual(pool._auth, { username: 'foo', password: 'bar' })

    pool.addConnection('http://localhost:9201')
    t.strictEqual(pool.connections.get('http://localhost:9201/').url.username, 'foo')
    t.strictEqual(pool.connections.get('http://localhost:9201/').url.password, 'bar')
    t.end()
  })

  t.test('markDead', t => {
    const pool = new ConnectionPool({ Connection, sniffEnabled: true })
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
    const pool = new ConnectionPool({ Connection })
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
    const pool = new ConnectionPool({ Connection, sniffEnabled: true })
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
        const pool = new ConnectionPool({
          resurrectStrategy: 'ping',
          pingTimeout: 3000,
          Connection: MockConnection,
          sniffEnabled: true
        })
        const href = 'http://localhost:9200/'
        var connection = pool.addConnection(href)
        pool.markDead(connection)
        const opts = {
          now: Date.now() + 1000 * 60 * 3,
          requestId: 1,
          name: 'elasticsearch-js'
        }
        pool.resurrect(opts, (isAlive, connection) => {
          t.true(isAlive)
          connection = pool.connections.get(connection.id)
          t.strictEqual(connection.deadCount, 0)
          t.strictEqual(connection.resurrectTimeout, 0)
          t.strictEqual(connection.status, Connection.statuses.ALIVE)
          t.deepEqual(pool.dead, [])
          t.end()
        })
      })

      t.test('dead', t => {
        const pool = new ConnectionPool({
          resurrectStrategy: 'ping',
          pingTimeout: 3000,
          Connection: MockConnectionTimeout,
          sniffEnabled: true
        })
        const href = 'http://localhost:9200/'
        var connection = pool.addConnection(href)
        pool.markDead(connection)
        const opts = {
          now: Date.now() + 1000 * 60 * 3,
          requestId: 1,
          name: 'elasticsearch-js'
        }
        pool.resurrect(opts, (isAlive, connection) => {
          t.false(isAlive)
          connection = pool.connections.get(connection.id)
          t.strictEqual(connection.deadCount, 2)
          t.true(connection.resurrectTimeout > 0)
          t.strictEqual(connection.status, Connection.statuses.DEAD)
          t.deepEqual(pool.dead, [href])
          t.end()
        })
      })

      t.end()
    })

    t.test('optimistic strategy', t => {
      const pool = new ConnectionPool({
        resurrectStrategy: 'optimistic',
        Connection,
        sniffEnabled: true
      })
      const href = 'http://localhost:9200/'
      var connection = pool.addConnection(href)
      pool.markDead(connection)
      const opts = {
        now: Date.now() + 1000 * 60 * 3,
        requestId: 1,
        name: 'elasticsearch-js'
      }
      pool.resurrect(opts, (isAlive, connection) => {
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
        resurrectStrategy: 'none',
        Connection,
        sniffEnabled: true
      })
      const href = 'http://localhost:9200/'
      var connection = pool.addConnection(href)
      pool.markDead(connection)
      const opts = {
        now: Date.now() + 1000 * 60 * 3,
        requestId: 1,
        name: 'elasticsearch-js'
      }
      pool.resurrect(opts, (isAlive, connection) => {
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
      const pool = new ConnectionPool({ Connection })
      const href = 'http://localhost:9200/'
      pool.addConnection(href)
      t.ok(pool.getConnection() instanceof Connection)
      t.end()
    })

    t.test('filter option', t => {
      const pool = new ConnectionPool({ Connection })
      const href1 = 'http://localhost:9200/'
      const href2 = 'http://localhost:9200/other'
      pool.addConnection([href1, href2])

      const filter = node => node.id === href1
      t.strictEqual(pool.getConnection({ filter }).id, href1)
      t.end()
    })

    t.test('filter should get Connection objects', t => {
      t.plan(2)
      const pool = new ConnectionPool({ Connection })
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
      const pool = new ConnectionPool({ Connection })
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

    t.end()
  })

  t.test('removeConnection', t => {
    const pool = new ConnectionPool({ Connection })
    const href = 'http://localhost:9200/'
    var connection = pool.addConnection(href)
    t.ok(pool.getConnection() instanceof Connection)
    pool.removeConnection(connection)
    t.strictEqual(pool.getConnection(), null)
    t.end()
  })

  t.test('empty', t => {
    const pool = new ConnectionPool({ Connection })
    pool.addConnection('http://localhost:9200/')
    pool.addConnection('http://localhost:9201/')
    pool.empty(() => {
      t.strictEqual(pool.connections.size, 0)
      t.deepEqual(pool.dead, [])
      t.end()
    })
  })

  t.test('urlToHost', t => {
    const pool = new ConnectionPool({ Connection })
    const url = 'http://localhost:9200'
    t.deepEqual(
      pool.urlToHost(url),
      { url: new URL(url) }
    )
    t.end()
  })

  t.test('nodesToHost', t => {
    t.test('publish_address as ip address (IPv4)', t => {
      const pool = new ConnectionPool({ Connection })
      const nodes = {
        a1: {
          http: {
            publish_address: '127.0.0.1:9200'
          },
          roles: ['master', 'data', 'ingest']
        },
        a2: {
          http: {
            publish_address: '127.0.0.1:9201'
          },
          roles: ['master', 'data', 'ingest']
        }
      }

      t.deepEqual(pool.nodesToHost(nodes, 'http:'), [{
        url: new URL('http://127.0.0.1:9200'),
        id: 'a1',
        roles: {
          master: true,
          data: true,
          ingest: true,
          ml: false
        }
      }, {
        url: new URL('http://127.0.0.1:9201'),
        id: 'a2',
        roles: {
          master: true,
          data: true,
          ingest: true,
          ml: false
        }
      }])

      t.strictEqual(pool.nodesToHost(nodes, 'http:')[0].url.host, '127.0.0.1:9200')
      t.strictEqual(pool.nodesToHost(nodes, 'http:')[1].url.host, '127.0.0.1:9201')
      t.end()
    })

    t.test('publish_address as ip address (IPv6)', t => {
      const pool = new ConnectionPool({ Connection })
      const nodes = {
        a1: {
          http: {
            publish_address: '[::1]:9200'
          },
          roles: ['master', 'data', 'ingest']
        },
        a2: {
          http: {
            publish_address: '[::1]:9201'
          },
          roles: ['master', 'data', 'ingest']
        }
      }

      t.deepEqual(pool.nodesToHost(nodes, 'http:'), [{
        url: new URL('http://[::1]:9200'),
        id: 'a1',
        roles: {
          master: true,
          data: true,
          ingest: true,
          ml: false
        }
      }, {
        url: new URL('http://[::1]:9201'),
        id: 'a2',
        roles: {
          master: true,
          data: true,
          ingest: true,
          ml: false
        }
      }])

      t.strictEqual(pool.nodesToHost(nodes, 'http:')[0].url.host, '[::1]:9200')
      t.strictEqual(pool.nodesToHost(nodes, 'http:')[1].url.host, '[::1]:9201')
      t.end()
    })

    t.test('publish_address as host/ip (IPv4)', t => {
      const pool = new ConnectionPool({ Connection })
      const nodes = {
        a1: {
          http: {
            publish_address: 'example.com/127.0.0.1:9200'
          },
          roles: ['master', 'data', 'ingest']
        },
        a2: {
          http: {
            publish_address: 'example.com/127.0.0.1:9201'
          },
          roles: ['master', 'data', 'ingest']
        }
      }

      t.deepEqual(pool.nodesToHost(nodes, 'http:'), [{
        url: new URL('http://example.com:9200'),
        id: 'a1',
        roles: {
          master: true,
          data: true,
          ingest: true,
          ml: false
        }
      }, {
        url: new URL('http://example.com:9201'),
        id: 'a2',
        roles: {
          master: true,
          data: true,
          ingest: true,
          ml: false
        }
      }])

      t.strictEqual(pool.nodesToHost(nodes, 'http:')[0].url.host, 'example.com:9200')
      t.strictEqual(pool.nodesToHost(nodes, 'http:')[1].url.host, 'example.com:9201')
      t.end()
    })

    t.test('publish_address as host/ip (IPv6)', t => {
      const pool = new ConnectionPool({ Connection })
      const nodes = {
        a1: {
          http: {
            publish_address: 'example.com/[::1]:9200'
          },
          roles: ['master', 'data', 'ingest']
        },
        a2: {
          http: {
            publish_address: 'example.com/[::1]:9201'
          },
          roles: ['master', 'data', 'ingest']
        }
      }

      t.deepEqual(pool.nodesToHost(nodes, 'http:'), [{
        url: new URL('http://example.com:9200'),
        id: 'a1',
        roles: {
          master: true,
          data: true,
          ingest: true,
          ml: false
        }
      }, {
        url: new URL('http://example.com:9201'),
        id: 'a2',
        roles: {
          master: true,
          data: true,
          ingest: true,
          ml: false
        }
      }])

      t.strictEqual(pool.nodesToHost(nodes, 'http:')[0].url.host, 'example.com:9200')
      t.strictEqual(pool.nodesToHost(nodes, 'http:')[1].url.host, 'example.com:9201')
      t.end()
    })

    t.test('Should use the configure protocol', t => {
      const pool = new ConnectionPool({ Connection })
      const nodes = {
        a1: {
          http: {
            publish_address: 'example.com/127.0.0.1:9200'
          },
          roles: ['master', 'data', 'ingest']
        },
        a2: {
          http: {
            publish_address: 'example.com/127.0.0.1:9201'
          },
          roles: ['master', 'data', 'ingest']
        }
      }

      t.strictEqual(pool.nodesToHost(nodes, 'https:')[0].url.protocol, 'https:')
      t.strictEqual(pool.nodesToHost(nodes, 'http:')[1].url.protocol, 'http:')
      t.end()
    })

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
      const pool = new CustomConnectionPool({ Connection })
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
      const pool = new CustomConnectionPool({ Connection })
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

    t.test('Should not update existing connections (same url, different id)', t => {
      t.plan(2)
      class CustomConnectionPool extends ConnectionPool {
        markAlive () {
          t.fail('Should not be called')
        }
      }
      const pool = new CustomConnectionPool({ Connection })
      pool.addConnection([{
        url: new URL('http://127.0.0.1:9200'),
        id: 'http://127.0.0.1:9200/',
        roles: {
          master: true,
          data: true,
          ingest: true
        }
      }])

      pool.update([{
        url: new URL('http://127.0.0.1:9200'),
        id: 'a1',
        roles: true
      }])

      // roles will never be updated, we only use it to do
      // a dummy check to see if the connection has been updated
      t.deepEqual(pool.connections.get('a1').roles, {
        master: true,
        data: true,
        ingest: true,
        ml: false
      })
      t.strictEqual(pool.connections.get('http://127.0.0.1:9200/'), undefined)
    })

    t.test('Add a new connection', t => {
      t.plan(2)
      const pool = new ConnectionPool({ Connection })
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
      const pool = new ConnectionPool({ Connection })
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

test('Node selector', t => {
  t.test('round-robin', t => {
    t.plan(1)
    const pool = new ConnectionPool({ Connection })
    pool.addConnection('http://localhost:9200/')
    t.true(pool.getConnection({ selector: roundRobinSelector() }) instanceof Connection)
  })

  t.test('random', t => {
    t.plan(1)
    const pool = new ConnectionPool({ Connection })
    pool.addConnection('http://localhost:9200/')
    t.true(pool.getConnection({ selector: roundRobinSelector() }) instanceof Connection)
  })

  t.end()
})

test('Node filter', t => {
  t.test('default', t => {
    t.plan(1)
    const pool = new ConnectionPool({ Connection })
    pool.addConnection({ url: new URL('http://localhost:9200/') })
    t.true(pool.getConnection({ filter: defaultNodeFilter }) instanceof Connection)
  })

  t.test('Should filter master only nodes', t => {
    t.plan(1)
    const pool = new ConnectionPool({ Connection })
    pool.addConnection({
      url: new URL('http://localhost:9200/'),
      roles: {
        master: true,
        data: false,
        ingest: false,
        ml: false
      }
    })
    t.strictEqual(pool.getConnection({ filter: defaultNodeFilter }), null)
  })

  t.end()
})

test('Single node behavior', t => {
  t.test('sniffing disabled (markDead and markAlive should be noop)', t => {
    t.plan(2)
    const pool = new ConnectionPool({ Connection, sniffEnabled: false })
    const conn = pool.addConnection('http://localhost:9200/')
    pool.markDead(conn)
    t.strictEqual(pool.dead.length, 0)
    pool.markAlive(conn)
    t.strictEqual(pool.dead.length, 0)
  })

  t.test('sniffing enabled (markDead and markAlive should work)', t => {
    t.plan(2)
    const pool = new ConnectionPool({ Connection, sniffEnabled: true })
    const conn = pool.addConnection('http://localhost:9200/')
    pool.markDead(conn)
    t.strictEqual(pool.dead.length, 1)
    pool.markAlive(conn)
    t.strictEqual(pool.dead.length, 0)
  })

  t.end()
})
