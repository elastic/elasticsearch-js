'use strict'

const { test } = require('tap')
const { factory: ca, proxyFactory: proxy } = require('../../../src/lib/client_action')
const noop = () => {}

function mockClient () {
  return {
    transport: {
      request: function (params, cb) {
        process.nextTick(() => cb(null, params))
      }
    },
    __mock: true
  }
}

function buildClientAction (opts = {}) {
  if (!opts.urls && !opts.url) {
    opts.url = { fmt: '/' }
  }

  return ca(opts).bind(mockClient())
}

function buildClientActionProxy (fn, opts = {}) {
  return proxy(fn, opts).bind(mockClient())
}

test('Client action runner', t => {
  t.test('Should create an empty params set when no params are sent', t => {
    t.plan(2)
    const action = buildClientAction()

    action((err, params) => {
      t.error(err)
      t.deepEqual(params, {
        method: 'GET',
        path: '/',
        query: {}
      })
    })
  })
  t.end()
})

test('Proxy', t => {
  t.test('It proxies to the passed function', t => {
    t.plan(1)
    const action = buildClientActionProxy(t.pass)
    action({}, noop)
  })

  t.test('Should have the correct context', t => {
    t.plan(1)
    const action = buildClientActionProxy(function (params, cb) {
      t.ok(this.__mock)
      cb(null, params)
    })
    action({}, noop)
  })

  t.test('Should work also without the options object', t => {
    t.plan(1)
    const action = buildClientActionProxy((params, cb) => {
      t.deepEqual(params, {})
      cb(null, params)
    })
    action(noop)
  })

  t.test('Supports a params transformation function', t => {
    t.plan(1)
    const action = buildClientActionProxy((params, cb) => {
      t.ok(params.transformed)
      cb(null, params)
    }, {
      transform: params => {
        params.transformed = true
      }
    })
    action(noop)
  })

  t.test('Returns the proxied function\'s return value', t => {
    t.plan(1)
    const action = buildClientActionProxy((params, cb) => {
      return { hello: 'world' }
    })
    t.deepEqual(action(noop), { hello: 'world' })
  })

  t.end()
})

test('Param casting', t => {
  t.test('duration', t => {
    var action = null

    t.beforeEach(done => {
      action = buildClientAction({
        params: {
          one: { type: 'duration' },
          two: { type: 'duration' },
          three: { type: 'duration' },
          four: { type: 'duration' }
        }
      })
      done()
    })

    t.test('Accepts a number, string or interval', t => {
      t.plan(4)

      action({
        one: 1500,
        two: '500',
        three: '15m'
      }, (err, params) => {
        t.error(err)
        t.strictEqual(params.query.one, 1500)
        t.strictEqual(params.query.two, '500')
        t.strictEqual(params.query.three, '15m')
      })
    })

    t.test('Should reject date values', t => {
      t.plan(1)

      action({ one: new Date() }, (err, params) => {
        t.ok(err)
      })
    })

    t.test('Should reject array values', t => {
      t.plan(1)

      action({ one: [123] }, (err, params) => {
        t.ok(err)
      })
    })

    t.test('Should reject object values', t => {
      t.plan(1)

      action({ one: {} }, (err, params) => {
        t.ok(err)
      })
    })

    t.test('Values not defined should not be present in the query', t => {
      t.plan(5)

      action({
        one: 1500,
        two: '500'
      }, (err, params) => {
        t.error(err)
        t.strictEqual(params.query.one, 1500)
        t.strictEqual(params.query.two, '500')
        t.notOk(params.query.hasOwnProperty('three'))
        t.notOk(params.query.hasOwnProperty('four'))
      })
    })

    t.end()
  })

  t.test('list', t => {
    var action = null

    t.beforeEach(done => {
      action = buildClientAction({
        params: {
          one: { type: 'list' },
          two: { type: 'list' },
          three: { type: 'list' }
        }
      })
      done()
    })

    t.test('Accepts a string, number or array', t => {
      t.plan(2)

      action({
        one: 'some,strings',
        two: 1430,
        three: ['some', 'strings']
      }, (err, params) => {
        t.error(err)
        t.deepEqual(params.query, {
          one: 'some,strings',
          two: 1430,
          three: 'some,strings'
        })
      })
    })

    t.test('Should reject regex values', t => {
      t.plan(1)

      action({ one: /reg/g }, (err, params) => {
        t.ok(err)
      })
    })

    t.test('Should reject object values', t => {
      t.plan(1)

      action({ one: {} }, (err, params) => {
        t.ok(err)
      })
    })

    t.end()
  })

  t.test('enum', t => {
    var action = null

    t.beforeEach(done => {
      action = buildClientAction({
        params: {
          one: {
            type: 'enum',
            options: ['opt', 'other opt', '150', 'true']
          }
        }
      })
      done()
    })

    t.test('Accepts any value in the list / 1', t => {
      t.plan(2)

      action({ one: 'opt' }, (err, params) => {
        t.error(err)
        t.strictEqual(params.query.one, 'opt')
      })
    })

    t.test('Accepts any value in the list / 2', t => {
      t.plan(2)

      action({ one: 150 }, (err, params) => {
        t.error(err)
        t.strictEqual(params.query.one, '150')
      })
    })

    t.test('Should reject any value not present in the list', t => {
      t.plan(1)

      action({ one: 'hello' }, (err, params) => {
        t.ok(err)
      })
    })

    t.end()
  })

  t.test('boolean', t => {
    var action = null

    t.beforeEach(done => {
      action = buildClientAction({
        params: {
          one: { type: 'boolean' },
          two: { type: 'boolean' },
          three: { type: 'boolean' },
          four: { type: 'boolean' },
          five: { type: 'boolean' },
          six: { type: 'boolean' }
        }
      })
      done()
    })

    t.test('Casts `off`, `no` and other falsey things to false', t => {
      t.plan(2)

      action({
        one: 'off',
        two: 'no',
        three: false,
        four: '',
        five: 0
      }, (err, params) => {
        t.error(err)
        t.deepEqual(params.query, {
          one: false,
          two: false,
          three: false,
          four: false,
          five: false
        })
      })
    })

    t.test('Casts most everything else to true', t => {
      t.plan(2)

      action({
        one: 'yes',
        two: 'ok',
        three: true,
        four: 1,
        five: new Date(),
        six: {}
      }, (err, params) => {
        t.error(err)
        t.deepEqual(params.query, {
          one: true,
          two: true,
          three: true,
          four: true,
          five: true,
          six: true
        })
      })
    })

    t.end()
  })

  t.test('number', t => {
    var action = null

    t.beforeEach(done => {
      action = buildClientAction({
        params: {
          one: { type: 'number' },
          two: { type: 'number' },
          three: { type: 'number' },
          four: { type: 'number' },
          five: { type: 'number' },
          six: { type: 'number' }
        }
      })
      done()
    })

    t.test('Should cast integers', t => {
      t.plan(2)

      action({
        one: '42',
        two: '-69',
        three: 15,
        four: -100,
        five: '0xFF',
        six: 0xFFF
      }, (err, params) => {
        t.error(err)
        t.strictDeepEqual(params.query, {
          one: 42,
          two: -69,
          three: 15,
          four: -100,
          five: 255,
          six: 4095
        })
      })
    })

    t.test('Should cast floats', t => {
      t.plan(2)

      action({
        one: '-1.6',
        two: '4.536',
        three: -2.6,
        four: 3.1415,
        five: 8e5,
        six: '123e-2'
      }, (err, params) => {
        t.error(err)
        t.strictDeepEqual(params.query, {
          one: -1.6,
          two: 4.536,
          three: -2.6,
          four: 3.1415,
          five: 800000,
          six: 1.23
        })
      })
    })

    t.test('Should reject dates', t => {
      t.plan(1)

      action({ one: new Date() }, (err, params) => {
        t.ok(err)
      })
    })

    t.test('Should reject objects', t => {
      t.plan(1)

      action({ one: {} }, (err, params) => {
        t.ok(err)
      })
    })

    t.test('Should reject arrays', t => {
      t.plan(1)

      action({ one: [] }, (err, params) => {
        t.ok(err)
      })
    })

    t.test('Should reject regex', t => {
      t.plan(1)

      action({ one: /reg/g }, (err, params) => {
        t.ok(err)
      })
    })

    t.end()
  })

  t.test('string', t => {
    var action = null

    t.beforeEach(done => {
      action = buildClientAction({
        params: {
          one: { type: 'string' },
          two: { type: 'string' },
          three: { type: 'string' },
          four: { type: 'string' },
          five: { type: 'string' },
          six: { type: 'string' }
        }
      })
      done()
    })

    t.test('Accepts numbers and strings', t => {
      t.plan(2)

      action({
        one: '42',
        two: '-69',
        three: 15,
        four: -100,
        five: '0xFF',
        six: 0xFFF
      }, (err, params) => {
        t.error(err)
        t.strictDeepEqual(params.query, {
          one: '42',
          two: '-69',
          three: '15',
          four: '-100',
          five: '0xFF',
          six: '4095'
        })
      })
    })

    t.test('Should reject dates', t => {
      t.plan(1)

      action({ one: new Date() }, (err, params) => {
        t.ok(err)
      })
    })

    t.test('Should reject objects', t => {
      t.plan(1)

      action({ one: {} }, (err, params) => {
        t.ok(err)
      })
    })

    t.test('Should reject arrays', t => {
      t.plan(1)

      action({ one: [] }, (err, params) => {
        t.ok(err)
      })
    })

    t.test('Should reject regex', t => {
      t.plan(1)

      action({ one: /reg/g }, (err, params) => {
        t.ok(err)
      })
    })

    t.end()
  })

  t.test('time', t => {
    var action = null

    t.beforeEach(done => {
      action = buildClientAction({
        params: {
          one: { type: 'time' },
          two: { type: 'time' },
          three: { type: 'time' },
          four: { type: 'time' },
          five: { type: 'time' },
          six: { type: 'time' }
        }
      })
      done()
    })

    t.test('Accepts numbers, strings and dates', t => {
      t.plan(2)
      const now = new Date()

      action({
        one: '42',
        two: '-69',
        three: 15,
        four: -100,
        five: now
      }, (err, params) => {
        t.error(err)
        t.strictDeepEqual(params.query, {
          one: '42',
          two: '-69',
          three: '15',
          four: '-100',
          five: '' + now.getTime()
        })
      })
    })

    t.test('Should reject objects', t => {
      t.plan(1)

      action({ one: {} }, (err, params) => {
        t.ok(err)
      })
    })

    t.test('Should reject arrays', t => {
      t.plan(1)

      action({ one: [] }, (err, params) => {
        t.ok(err)
      })
    })

    t.test('Should reject regex', t => {
      t.plan(1)

      action({ one: /reg/g }, (err, params) => {
        t.ok(err)
      })
    })

    t.end()
  })

  t.end()
})

test('passing of control params from spec', t => {
  t.test('passes bulkBody', t => {
    t.plan(2)

    const action = buildClientAction({ bulkBody: true })
    action({}, (err, params) => {
      t.error(err)
      t.true(params.bulkBody)
    })
  })

  t.test('sets castExists when the method in the spec is HEAD', t => {
    t.plan(2)

    const action = buildClientAction({ method: 'HEAD' })
    action({}, (err, params) => {
      t.error(err)
      t.true(params.castExists)
    })
  })

  t.end()
})

test('body handling', t => {
  t.test('passed the body when it is set', t => {
    t.plan(2)
    const action = buildClientAction({ needsBody: true })
    const body = JSON.stringify({ hello: 'world' })
    action({ body }, function (err, params) {
      t.error(err)
      t.deepEqual(params.body, body)
    })
  })

  t.test('errors when the body is not set but required', t => {
    t.plan(1)
    const action = buildClientAction({ needsBody: true })
    action({}, function (err, params) {
      t.ok(err)
    })
  })

  t.end()
})

test('passing of http method', t => {
  t.test('uppercases and passed the default method', t => {
    t.plan(2)
    const action = buildClientAction({ method: 'POST' })
    action({ method: 'get' }, function (err, params) {
      t.error(err)
      t.strictEqual(params.method, 'GET')
    })
  })

  t.test('uppercases and passed the default method', t => {
    t.plan(2)
    const action = buildClientAction({ method: 'POST' })

    action({}, function (err, params) {
      t.error(err)
      t.strictEqual(params.method, 'POST')
    })
  })

  t.end()
})

test('passing of ignore param', t => {
  t.test('passes ignore as an array', t => {
    t.plan(2)
    const action = buildClientAction()
    action({ ignore: 404 }, (err, params) => {
      t.error(err)
      t.deepEqual(params.ignore, [404])
    })
  })

  t.end()
})

test('passing requestTimeout', t => {
  t.test('passes passes the spec value by default', t => {
    t.plan(2)
    const action = buildClientAction({ requestTimeout: 100 })
    action({}, (err, params) => {
      t.error(err)
      t.strictEqual(params.requestTimeout, 100)
    })
  })

  t.test('passes the provided value', t => {
    t.plan(2)
    const action = buildClientAction({ requestTimeout: 100 })
    action({ requestTimeout: 3000 }, (err, params) => {
      t.error(err)
      t.strictEqual(params.requestTimeout, 3000)
    })
  })

  t.test('passes nothing be default', t => {
    t.plan(2)
    const action = buildClientAction()
    action({}, (err, params) => {
      t.error(err)
      t.false(params.hasOwnProperty('requestTimeout'))
    })
  })

  t.end()
})

test('url resolver', t => {
  const action = buildClientAction({
    urls: [
      {
        fmt: '/<%=index%>/<%=type%>/<%=id%>/<%=thing%>',
        req: {
          index: { type: 'list' },
          id: { type: 'any' }
        },
        opt: {
          type: {
            type: 'list',
            'default': '_all'
          },
          thing: {
            type: 'any',
            'default': ''
          }
        }
      }
    ]
  })

  t.test('rejects a url if it required params that are not present', t => {
    t.plan(2)
    action({ type: ['type1', 'type2'] }, (err, params) => {
      t.ok(err)
      t.notOk(params)
    })
  })

  t.test('uses the default value for optional params', t => {
    t.plan(2)
    action({ index: 'index1', id: '1' }, (err, params) => {
      t.error(err)
      t.strictEqual(params.path, '/index1/_all/1/')
    })
  })

  t.test('casts both optional and required args', t => {
    t.plan(2)
    action({
      index: ['index1', 'index2'],
      id: '123',
      type: ['_all', '-pizza'],
      thing: 'poo'
    }, (err, params) => {
      t.error(err)
      t.strictEqual(params.path, '/index1%2Cindex2/_all%2C-pizza/123/poo')
    })
  })

  t.end()
})

test('param collection', t => {
  const action = buildClientAction({
    params: {
      a: { type: 'list', required: true },
      b: { type: 'duration', 'default': '15m' },
      q: { type: 'any' }
    }
  })

  t.test('collects all of the params into params.query', t => {
    t.plan(2)
    action({
      a: 'pizza',
      b: '1M'
    }, (err, params) => {
      t.error(err)
      t.deepEqual(params.query, {
        a: 'pizza',
        b: '1M'
      })
    })
  })

  t.test('includes extra params', t => {
    t.plan(2)
    action({
      a: 'pizza',
      b: '3w',
      c: 'popular'
    }, (err, params) => {
      t.error(err)
      t.deepEqual(params.query, {
        a: 'pizza',
        b: '3w',
        c: 'popular'
      })
    })
  })

  t.test('excludes default values', t => {
    t.plan(2)
    action({
      a: 'pizza',
      b: '15m'
    }, (err, params) => {
      t.error(err)
      t.deepEqual(params.query, {
        a: 'pizza'
      })
    })
  })

  t.test('does not include non-query param keys', t => {
    t.plan(2)
    action({
      a: 'pizza',
      b: '3w',
      q: 'beep',
      body: '{ "mmm": "json" }',
      requestTimeout: 1000,
      method: 'head',
      ignore: 201
    }, (err, params) => {
      t.error(err)
      t.deepEqual(params.query, {
        a: 'pizza',
        b: '3w',
        q: 'beep'
      })
    })
  })

  t.test('enforces required params', t => {
    t.plan(1)
    action({ b: '3w' }, (err) => t.ok(err))
  })

  t.test('does not modify the incoming params object', t => {
    t.plan(2)
    const action = buildClientAction({
      url: {
        req: { index: { type: 'string' } },
        fmt: '/<%= index %>'
      }
    })
    action({ index: 'index' }, (err, params) => {
      t.error(err)
      t.deepEqual(params, {
        method: 'GET',
        path: '/index',
        query: {}
      })
    })
  })

  t.end()
})
