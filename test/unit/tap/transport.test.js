'use strict'

const { test } = require('tap')
const { stub, useFakeTimers } = require('sinon')
const Transport = require('../../../src/lib/transport')
const Host = require('../../../src/lib/host')
const errors = require('../../../src/lib/errors')
const randomSelector = require('../../../src/lib/selectors/random')
const nodeList = require('../../fixtures/short_node_list.5.0.json')

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
    const stb = stub(Transport.prototype, 'sniff').callsFake(() => {
      t.ok('Called')
      stb.restore()
    })
    new Transport({ sniffOnStart: true }) // eslint-disable-line
  })

  t.test('Sniff interval', t => {
    t.plan(1)
    const transport = new Transport({ sniffInterval: 50 }) // eslint-disable-line
    stub(transport, 'sniff')
    setTimeout(() => {
      transport.closed = true
      t.true(transport.sniff.calledTwice)
    }, 110)
  })

  t.end()
})

test('config.sniffedNodesProtocol', t => {
  t.test('Assigns to itself', t => {
    t.plan(1)
    const protocol = {}
    const transport = new Transport({
      sniffedNodesProtocol: protocol
    })
    t.deepEqual(transport.sniffedNodesProtocol, protocol)
  })

  t.test('Defaults to null when no host is given', t => {
    t.plan(1)
    const transport = new Transport({
      hosts: []
    })
    t.strictEqual(transport.sniffedNodesProtocol, null)
  })

  t.test('Defaults to http when a single http host is given', t => {
    t.plan(1)
    const transport = new Transport({
      hosts: [new Host({ protocol: 'http' })]
    })
    t.strictEqual(transport.sniffedNodesProtocol, 'http')
  })

  t.test('Defaults to http when multiple http hosts are given', t => {
    t.plan(1)
    const transport = new Transport({
      hosts: [
        new Host({ protocol: 'http' }),
        'http://elastic.co',
        { host: 'foo', path: 'bar' }
      ]
    })
    t.strictEqual(transport.sniffedNodesProtocol, 'http')
  })

  t.test('Defaults to https when a single https host is given', t => {
    t.plan(1)
    const transport = new Transport({
      hosts: [new Host({ protocol: 'https' })]
    })
    t.strictEqual(transport.sniffedNodesProtocol, 'https')
  })

  t.test('Defaults to https when multiple https hosts are given', t => {
    t.plan(1)
    const transport = new Transport({
      hosts: [
        new Host({ protocol: 'https' }),
        'https://elastic.co',
        { host: 'foo', path: 'bar', protocol: 'https' }
      ]
    })
    t.strictEqual(transport.sniffedNodesProtocol, 'https')
  })

  t.end()
})

test('Hosts config', t => {
  var stb = null

  t.beforeEach(done => {
    stb = stub(Transport.connectionPools.main.prototype, 'setHosts')
    done()
  })

  t.afterEach(done => {
    stb.restore()
    done()
  })

  t.test('Should reject everything that is not a string or object', t => {
    t.plan(2)
    try {
      new Transport({ hosts: ['localhost', 1234] }) // eslint-disable-line
      t.fail('should throw')
    } catch (err) {
      t.ok(err)
    }
    try {
      new Transport({ hosts: [1234] }) // eslint-disable-line
      t.fail('should throw')
    } catch (err) {
      t.ok(err)
    }
  })

  t.test('Should accept the config value on the host key', t => {
    t.plan(2)
    const transport = new Transport({ host: 'localhost' })
    t.strictEqual(transport.connectionPool.setHosts.callCount, 1)
    t.deepEqual(
      transport.connectionPool.setHosts.lastCall.args[0],
      [new Host('localhost')]
    )
  })

  t.test('Should accept the config value on the hosts key', t => {
    t.plan(2)
    const transport = new Transport({ hosts: 'localhost' })
    t.strictEqual(transport.connectionPool.setHosts.callCount, 1)
    t.deepEqual(
      transport.connectionPool.setHosts.lastCall.args[0],
      [new Host('localhost')]
    )
  })

  t.test('Should accept the config value on the host key (as Host)', t => {
    t.plan(2)
    const host = new Host('localhost')
    const transport = new Transport({ host: host })
    t.strictEqual(transport.connectionPool.setHosts.callCount, 1)
    t.deepEqual(
      transport.connectionPool.setHosts.lastCall.args[0],
      [host]
    )
  })

  t.test('Should accept the config value on the hosts key (as array of strings)', t => {
    t.plan(2)
    const transport = new Transport({ hosts: ['localhost'] })
    t.strictEqual(transport.connectionPool.setHosts.callCount, 1)
    t.deepEqual(
      transport.connectionPool.setHosts.lastCall.args[0],
      [new Host('localhost')]
    )
  })

  t.test('Should accept the config value on the hosts key (as array of objects)', t => {
    t.plan(2)
    const transport = new Transport({
      hosts: [{
        protocol: 'https',
        host: 'myescluster.com',
        port: '777',
        path: '/bon/iver',
        query: { access: 'all' }
      }]
    })
    t.strictEqual(transport.connectionPool.setHosts.callCount, 1)
    t.deepEqual(
      transport.connectionPool.setHosts.lastCall.args[0],
      [new Host('https://myescluster.com:777/bon/iver?access=all')]
    )
  })

  t.end()
})

test('Sniff', t => {
  var transport = null
  var stb = null

  t.beforeEach(done => {
    stb = stub(Transport.connectionPools.main.prototype, 'setHosts')
    transport = new Transport({ suggestCompression: true })
    stub(transport, 'request').callsFake(function (params, cb) {
      setTimeout(() => {
        cb(null, {
          ok: true,
          cluster_name: 'clustername',
          nodes: nodeList
        }, 200)
      }, 0)
    })
    done()
  })

  t.afterEach(done => {
    stb.restore()
    done()
  })

  t.test('Works without a callback', t => {
    t.plan(1)
    transport.sniff()
    setTimeout(() => {
      t.true(transport.request.calledOnce)
    }, 10)
  })

  t.test('It should call the nodesToHostCallback with the list of nodes', t => {
    t.plan(1)
    transport.nodesToHostCallback = nodes => t.deepEqual(nodes, nodeList)
    transport.sniff()
  })

  t.test('Takes the host config, converts them into Host objects and passes them to connectionPool.setHost', t => {
    t.plan(8)
    transport.sniff(() => {
      t.true(transport.connectionPool.setHosts.calledTwice)
      const hosts = transport.connectionPool.setHosts.lastCall.args[0]
      t.strictEqual(hosts.length, 2)

      t.type(hosts[0], Host)
      t.strictEqual(hosts[0].host, '127.0.0.1')
      t.strictEqual(hosts[0].port, 9400)

      t.type(hosts[1], Host)
      t.strictEqual(hosts[1].host, 'published.hostname')
      t.strictEqual(hosts[1].port, 9440)
    })
  })

  t.test('passed back errors caught from the request', t => {
    t.plan(1)
    transport.request.func = function (params, cb) {
      process.nextTick(() => {
        cb(new Error('kaboom'))
      })
    }

    transport.sniff(err => {
      t.strictEqual(err.message, 'kaboom')
    })
  })

  t.test('passed back the full server response and status code', t => {
    t.plan(4)
    transport.sniff(function (err, resp, status) {
      t.error(err)
      t.true(resp.ok)
      t.strictEqual(resp.cluster_name, 'clustername')
      t.strictEqual(status, 200)
    })
  })

  t.end()
})

test('request', t => {
  t.test('Rejects GET request wit a body (callback)', t => {
    t.plan(1)
    const transport = new Transport()
    transport.request({
      body: 'something',
      method: 'GET'
    }, err => {
      t.ok(err)
    })
  })

  t.test('Rejects GET request wit a body (promise)', t => {
    t.plan(1)
    const transport = new Transport()
    transport
      .request({
        body: 'something',
        method: 'GET'
      })
      .then(() => t.fail('Should fails'))
      .catch(err => t.ok(err))
  })

  t.test('Should serialize the body before calling the internal request', t => {
    t.plan(2)
    const transport = new Transport({ hosts: 'localhost' })
    const conn = getConnection(transport)
    const body = { _id: '1234', name: 'tyrion' }
    conn.request = function (params) {
      t.deepEqual(JSON.parse(params.body), body)
      t.strictEqual(params.headers['content-type'], 'application/json')
      transport.close()
    }

    transport.request({ body })
  })

  t.test('Should serialize the bulk bodies before calling the internal request', t => {
    t.plan(2)
    const transport = new Transport({ hosts: 'localhost' })
    const conn = getConnection(transport)
    const body = [{ _id: '1234' }, { name: 'tyrion' }]
    conn.request = function (params) {
      t.strictEqual(params.body, JSON.stringify(body[0]) + '\n' + JSON.stringify(body[1]) + '\n')
      t.strictEqual(params.headers['content-type'], 'application/x-ndjson')
      transport.close()
    }

    transport.request({ body, bulkBody: true })
  })

  t.test('Serialization error', t => {
    t.plan(1)
    const transport = new Transport({ hosts: 'localhost' })
    const body = { _id: '1234' }
    body.body = body
    try {
      transport.request({ body, bulkBody: true })
      t.fail('should throw')
    } catch (err) {
      t.ok(err)
    }
  })

  t.test('NoConnections error', t => {
    t.plan(3)
    const transport = new Transport()
    transport.request({}, (err, body, status) => {
      t.type(err, errors.NoConnections)
      t.strictEqual(body, undefined)
      t.strictEqual(status, undefined)
    })
  })

  t.test('sycn selector error', t => {
    t.plan(1)
    const transport = new Transport({
      hosts: 'localhost',
      selector: function () {
        throw new Error('kaboom')
      }
    })

    transport.request({}, err => {
      t.strictEqual(err.message, 'kaboom')
    })
  })

  t.test('asycn selector error', t => {
    t.plan(1)
    const transport = new Transport({
      hosts: 'localhost',
      selector: function (connections, cb) {
        process.nextTick(() => {
          cb(new Error('kaboom'))
        })
      }
    })

    transport.request({}, err => {
      t.strictEqual(err.message, 'kaboom')
    })
  })

  t.test('Connection error (0 retries)', t => {
    t.plan(4)
    var attempts = 0
    const transport = new Transport({
      hosts: ['localhost'],
      maxRetries: 0,
      selector: connections => {
        connections.forEach(conn => {
          conn.request = function (params, cb) {
            attempts++
            cb(new Error('kaboom'))
          }
        })
        return randomSelector(connections)
      }
    })

    transport.request({}, (err, resp, body) => {
      t.type(err, errors.ConnectionFault)
      t.strictEqual(resp, undefined)
      t.strictEqual(resp, undefined)
      t.strictEqual(attempts, 1)
      transport.close()
    })
  })

  t.test('Connection error (5 retries)', t => {
    t.plan(4)
    var attempts = 0
    const transport = new Transport({
      hosts: [
        'localhost/1',
        'localhost/2',
        'localhost/3',
        'localhost/4',
        'localhost/5',
        'localhost/6'
      ],
      maxRetries: 5,
      selector: connections => {
        connections.forEach(conn => {
          conn.request = function (params, cb) {
            attempts++
            cb(new Error('kaboom'))
          }
        })
        return randomSelector(connections)
      }
    })

    transport.request({}, (err, resp, body) => {
      t.type(err, errors.ConnectionFault)
      t.strictEqual(resp, undefined)
      t.strictEqual(resp, undefined)
      t.strictEqual(attempts, 6)
      transport.close()
    })
  })

  t.end()
})

test('Request aborter', t => {
  t.test('Returns an abort function wrapped in an object (callback)', t => {
    t.plan(2)
    const transport = new Transport()
    const ret = transport.request({}, noop)
    t.type(ret, Object)
    t.type(ret.abort, Function)
  })

  t.test('Returns an abort function wrapped in an object (promise)', t => {
    t.plan(2)
    const transport = new Transport()
    const ret = transport.request({})
    t.type(ret, Object)
    t.type(ret.abort, Function)
    ret.then(noop, noop)
  })

  t.test('The request should never be called if abort is executed in the same tick', t => {
    t.plan(1)
    const transport = new Transport({ host: 'localhost' })
    const conn = getConnection(transport)
    stub(conn, 'request').callsFake(() => t.fail('Should never be called'))
    transport.request({}).abort()
    process.nextTick(() => t.pass('Done'))
  })

  t.test('Calls the function returned by the connector if it has been called', t => {
    t.plan(1)
    const transport = new Transport({ host: 'localhost' })
    const conn = getConnection(transport)
    stub(conn, 'request').callsFake(() => {
      process.nextTick(() => ret.abort())
      return function () {
        t.pass('Called')
      }
    })
    var ret = transport.request({})
  })

  t.end()
})

test('timeout', t => {
  t.test('uses 30 seconds for the default', t => {
    t.plan(2)
    const clock = useFakeTimers()
    const transport = new Transport({})

    transport
      .request({})
      .then(noop, noop)

    t.strictEqual(Object.keys(clock.timers).length, 1)
    for (var key in clock.timers) {
      t.strictEqual(clock.timers[key].delay, 30000)
      clearTimeout(clock.timers[key].id)
    }

    clock.restore()
  })

  t.test('inherits the requestTimeout from the transport', t => {
    t.plan(2)
    const clock = useFakeTimers()
    const transport = new Transport({ requestTimeout: 5000 })

    transport
      .request({})
      .then(noop, noop)

    t.strictEqual(Object.keys(clock.timers).length, 1)
    for (var key in clock.timers) {
      t.strictEqual(clock.timers[key].delay, 5000)
      clearTimeout(clock.timers[key].id)
    }

    clock.restore()
  })

  t.test('inherits the pingTimeout from the transport', t => {
    t.plan(2)
    const clock = useFakeTimers()
    const transport = new Transport({
      requestTimeout: 4000,
      pingTimeout: 5000
    })

    transport
      .request({ path: '/', method: 'HEAD' })
      .then(noop, noop)

    t.strictEqual(Object.keys(clock.timers).length, 1)
    for (var key in clock.timers) {
      t.strictEqual(clock.timers[key].delay, 5000)
      clearTimeout(clock.timers[key].id)
    }

    clock.restore()
  })

  t.end()
})

function getConnection (transport, status) {
  return transport.connectionPool.getConnections(status || 'alive', 1)[0]
}

function noop () {}
