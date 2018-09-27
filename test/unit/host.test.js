'use strict'

const { test } = require('tap')
const Host = require('../../src/lib/host')

const hostDefaults = {
  protocol: 'http',
  host: 'localhost',
  port: 9200,
  path: '',
  query: {},
  headers: null,
  suggestCompression: false,
  ssl: {
    pfx: null,
    key: null,
    passphrase: null,
    cert: null,
    ca: null,
    ciphers: null,
    rejectUnauthorized: false,
    secureProtocol: null
  }
}

test('Constructor', t => {
  t.test('It properly sets the defaults', t => {
    t.plan(1)
    const host = new Host()
    t.deepEqual(host, hostDefaults)
  })

  t.test('It should accept a query string', t => {
    t.plan(1)
    const host = new Host({ query: 'beep=boop' })
    t.deepEqual(host.query, { beep: 'boop' })
  })

  t.test('It should accept other generic params', t => {
    t.plan(1)
    const headers = { 'X-Special-Routing-Header': 'pie' }
    const host = new Host({ headers })
    t.deepEqual(host.headers, headers)
  })

  t.test('Should accept a string for the entire url', t => {
    t.plan(1)
    const host = new Host('john:dude@pizza.com:420/pizza/cheese?shrooms=true')
    t.deepEqual(host, Object.assign({}, hostDefaults, {
      headers: {
        Authorization: 'Basic am9objpkdWRl'
      },
      protocol: 'http',
      host: 'pizza.com',
      port: 420,
      path: '/pizza/cheese',
      query: {
        shrooms: 'true'
      }
    }))
  })

  t.test('It uses the default port based on the protocol', t => {
    t.plan(2)
    t.strictEqual(new Host('https://example.com').port, 443)
    t.strictEqual(new Host('http://example.com').port, 80)
  })

  t.test('Should parse simple urls properly', t => {
    t.plan(15)
    var host

    host = new Host('localhost')
    t.strictEqual(host.host, 'localhost')
    t.strictEqual(host.path, '')
    t.strictEqual(host.port, 80)

    host = new Host('/elasticsearch')
    t.strictEqual(host.host, 'localhost')
    t.strictEqual(host.path, '/elasticsearch')
    t.strictEqual(host.port, 80)

    host = new Host('//localhost/elasticsearch')
    t.strictEqual(host.host, 'localhost')
    t.strictEqual(host.path, '/elasticsearch')
    t.strictEqual(host.port, 80)

    host = new Host('localhost:9200')
    t.strictEqual(host.host, 'localhost')
    t.strictEqual(host.path, '')
    t.strictEqual(host.port, 9200)

    host = new Host('localhost:9200/elasticsearch')
    t.strictEqual(host.host, 'localhost')
    t.strictEqual(host.path, '/elasticsearch')
    t.strictEqual(host.port, 9200)
  })

  t.test('It should ignore anything that is not a string or object', t => {
    t.plan(1)
    const host = new Host(1234)
    t.deepEqual(host, hostDefaults)
  })

  t.test('It default auth values from the `httpAuth` setting', t => {
    t.plan(1)
    const host = new Host('http://localhost:9200', {
      httpAuth: 'username:password'
    })
    t.strictEqual(host.headers.Authorization, `Basic ${base64('username:password')}`)
  })

  t.end()
})

test('makeUrl', t => {
  t.test('Merges parameters', t => {
    t.plan(1)
    const host = new Host({
      path: '/prefix',
      query: {
        user_id: 123
      }
    })

    t.strictEqual(host.makeUrl({
      path: '/hello',
      query: { param: 1 }
    }), 'http://localhost:9200/prefix/hello?user_id=123&param=1')
  })

  t.test('It ensures that path starts with a forward slash', t => {
    t.plan(1)
    const host = new Host()
    host.path = 'prefix'
    t.strictEqual(
      host.makeUrl({ path: '/hello' }),
      'http://localhost:9200/prefix/hello'
    )
  })

  t.test('It creates proper url without any params', t => {
    t.plan(3)
    var host = new Host()
    t.strictEqual(host.makeUrl(), 'http://localhost:9200/')

    host = new Host({ host: 'john', port: 80 })
    t.strictEqual(host.makeUrl(), 'http://john/')

    host = new Host({ host: 'italy', path: '/pie', auth: 'user:pass' })
    t.strictEqual(host.makeUrl(), 'http://italy:9200/pie')
  })

  t.test('outputs valid relative urls when the host is empty', t => {
    t.plan(1)
    const host = new Host({
      host: false,
      path: '/path',
      query: { this: 'that' }
    })

    t.strictEqual(host.toString(), '/path?this=that')
  })

  t.end()
})

test('toString', t => {
  t.plan(1)
  const host = new Host({
    path: '/pasta',
    host: 'google.com'
  })

  t.strictEqual(host.toString(), host.makeUrl())
})

test('getHeaders', t => {
  t.test('Merges the passed in headers with the default headers', t => {
    t.plan(1)
    const host = new Host({ headers: { 'bar': 'baz' } })

    t.deepEqual(
      host.getHeaders({ 'x-custom': 'foo' }),
      { 'x-custom': 'foo', 'bar': 'baz' }
    )
  })

  t.test('It should override the default headers', t => {
    t.plan(1)
    const host = new Host({ headers: { 'bar': 'baz' } })

    t.deepEqual(
      host.getHeaders({ 'bar': 'foo' }),
      { 'bar': 'foo' }
    )
  })

  t.test('Should add Accept-Encoding header when the suggestCompression setting is true', t => {
    t.plan(1)
    const host = new Host({ suggestCompression: true })

    t.deepEqual(
      host.getHeaders(),
      { 'Accept-Encoding': 'gzip,deflate' }
    )
  })

  t.end()
})

function base64 (str) {
  return Buffer.from(str, 'utf8').toString('base64')
}
