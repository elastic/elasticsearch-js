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
const buffer = require('buffer')
const intoStream = require('into-stream')
const { ConnectionPool, Transport, Connection, errors, Client: ProductClient } = require('../../index')
const { CloudConnectionPool } = require('../../lib/pool')
const { Client, buildServer, connection } = require('../utils')
const { buildMockConnection } = connection

let clientVersion = require('../../package.json').version
if (clientVersion.includes('-')) {
  clientVersion = clientVersion.slice(0, clientVersion.indexOf('-')) + 'p'
}
const nodeVersion = process.versions.node

test('Configure host', t => {
  t.test('Single string', t => {
    const client = new Client({
      node: 'http://localhost:9200'
    })
    const pool = client.connectionPool
    t.match(pool.connections.find(c => c.id === 'http://localhost:9200/'), {
      url: new URL('http://localhost:9200'),
      id: 'http://localhost:9200/',
      ssl: null,
      deadCount: 0,
      resurrectTimeout: 0,
      roles: {
        master: true,
        data: true,
        ingest: true,
        ml: false
      }
    })
    t.end()
  })

  t.test('Array of strings', t => {
    const client = new Client({
      nodes: ['http://localhost:9200', 'http://localhost:9201']
    })
    const pool = client.connectionPool
    t.match(pool.connections.find(c => c.id === 'http://localhost:9200/'), {
      url: new URL('http://localhost:9200'),
      id: 'http://localhost:9200/',
      ssl: null,
      deadCount: 0,
      resurrectTimeout: 0,
      roles: {
        master: true,
        data: true,
        ingest: true,
        ml: false
      }
    })
    t.match(pool.connections.find(c => c.id === 'http://localhost:9201/'), {
      url: new URL('http://localhost:9201'),
      id: 'http://localhost:9201/',
      ssl: null,
      deadCount: 0,
      resurrectTimeout: 0,
      roles: {
        master: true,
        data: true,
        ingest: true,
        ml: false
      }
    })

    t.end()
  })

  t.test('Single object', t => {
    const client = new Client({
      node: {
        url: new URL('http://localhost:9200'),
        id: 'node',
        roles: {
          master: true,
          data: false,
          ingest: false
        },
        ssl: 'ssl'
      }
    })
    const pool = client.connectionPool
    t.match(pool.connections.find(c => c.id === 'node'), {
      url: new URL('http://localhost:9200'),
      id: 'node',
      ssl: 'ssl',
      deadCount: 0,
      resurrectTimeout: 0
    })

    t.same(pool.connections.find(c => c.id === 'node').roles, {
      master: true,
      data: false,
      ingest: false,
      ml: false
    })

    t.end()
  })

  t.test('Array of objects', t => {
    const client = new Client({
      nodes: [{
        url: new URL('http://localhost:9200'),
        id: 'node1',
        roles: {
          master: true,
          data: false,
          ingest: false
        },
        ssl: 'ssl'
      }, {
        url: new URL('http://localhost:9200'),
        id: 'node2',
        roles: {
          master: false,
          data: true,
          ingest: false
        },
        ssl: 'ssl'
      }]
    })
    const pool = client.connectionPool
    t.match(pool.connections.find(c => c.id === 'node1'), {
      url: new URL('http://localhost:9200'),
      id: 'node1',
      ssl: 'ssl',
      deadCount: 0,
      resurrectTimeout: 0
    })

    t.same(pool.connections.find(c => c.id === 'node1').roles, {
      master: true,
      data: false,
      ingest: false,
      ml: false
    })

    t.match(pool.connections.find(c => c.id === 'node2'), {
      url: new URL('http://localhost:9200'),
      id: 'node2',
      ssl: 'ssl',
      deadCount: 0,
      resurrectTimeout: 0
    })

    t.same(pool.connections.find(c => c.id === 'node2').roles, {
      master: false,
      data: true,
      ingest: false,
      ml: false
    })

    t.end()
  })

  t.test('Custom headers', t => {
    const client = new Client({
      node: {
        url: new URL('http://localhost:9200'),
        headers: { 'x-foo': 'bar' },
        id: 'node'
      }
    })
    const pool = client.connectionPool
    t.match(pool.connections.find(c => c.id === 'node'), {
      url: new URL('http://localhost:9200'),
      headers: { 'x-foo': 'bar' }
    })
    t.end()
  })

  t.test('Missing node conf', t => {
    try {
      new Client() // eslint-disable-line
      t.fail('Should fail')
    } catch (err) {
      t.ok(err)
    }
    t.end()
  })

  t.end()
})

test('Authentication', t => {
  t.test('Basic', t => {
    t.test('Node with basic auth data in the url', t => {
      t.plan(3)

      function handler (req, res) {
        t.match(req.headers, {
          authorization: 'Basic Zm9vOmJhcg=='
        })
        res.setHeader('Content-Type', 'application/json;utf=8')
        res.end(JSON.stringify({ hello: 'world' }))
      }

      buildServer(handler, ({ port }, server) => {
        const client = new Client({
          node: `http://foo:bar@localhost:${port}`
        })

        client.info((err, { body }) => {
          t.error(err)
          t.same(body, { hello: 'world' })
          server.stop()
        })
      })
    }, { skip: true })

    t.test('Node with basic auth data in the url (array of nodes)', t => {
      t.plan(3)

      function handler (req, res) {
        t.match(req.headers, {
          authorization: 'Basic Zm9vOmJhcg=='
        })
        res.setHeader('Content-Type', 'application/json;utf=8')
        res.end(JSON.stringify({ hello: 'world' }))
      }

      buildServer(handler, ({ port }, server) => {
        const client = new Client({
          nodes: [`http://foo:bar@localhost:${port}`]
        })

        client.info((err, { body }) => {
          t.error(err)
          t.same(body, { hello: 'world' })
          server.stop()
        })
      })
    })

    t.test('Node with basic auth data in the options', t => {
      t.plan(3)

      function handler (req, res) {
        t.match(req.headers, {
          authorization: 'Basic Zm9vOmJhcg=='
        })
        res.setHeader('Content-Type', 'application/json;utf=8')
        res.end(JSON.stringify({ hello: 'world' }))
      }

      buildServer(handler, ({ port }, server) => {
        const client = new Client({
          node: `http://localhost:${port}`,
          auth: {
            username: 'foo',
            password: 'bar'
          }
        })

        client.info((err, { body }) => {
          t.error(err)
          t.same(body, { hello: 'world' })
          server.stop()
        })
      })
    })

    t.test('Custom basic authentication per request', t => {
      t.plan(6)

      let first = true
      function handler (req, res) {
        t.match(req.headers, {
          authorization: first ? 'hello' : 'Basic Zm9vOmJhcg=='
        })
        res.setHeader('Content-Type', 'application/json;utf=8')
        res.end(JSON.stringify({ hello: 'world' }))
      }

      buildServer(handler, ({ port }, server) => {
        const client = new Client({
          node: `http://foo:bar@localhost:${port}`
        })

        client.info({}, {
          headers: {
            authorization: 'hello'
          }
        }, (err, { body }) => {
          t.error(err)
          t.same(body, { hello: 'world' })
          first = false

          client.info((err, { body }) => {
            t.error(err)
            t.same(body, { hello: 'world' })
            server.stop()
          })
        })
      })
    })

    t.test('Override default basic authentication per request', t => {
      t.plan(6)

      let first = true
      function handler (req, res) {
        t.match(req.headers, {
          authorization: first ? 'hello' : 'Basic Zm9vOmJhcg=='
        })
        res.setHeader('Content-Type', 'application/json;utf=8')
        res.end(JSON.stringify({ hello: 'world' }))
      }

      buildServer(handler, ({ port }, server) => {
        const client = new Client({
          node: `http://localhost:${port}`,
          auth: {
            username: 'foo',
            password: 'bar'
          }
        })

        client.info({}, {
          headers: {
            authorization: 'hello'
          }
        }, (err, { body }) => {
          t.error(err)
          t.same(body, { hello: 'world' })
          first = false

          client.info((err, { body }) => {
            t.error(err)
            t.same(body, { hello: 'world' })
            server.stop()
          })
        })
      })
    })

    t.end()
  })

  t.test('ApiKey', t => {
    t.test('Node with ApiKey auth data in the options as string', t => {
      t.plan(3)

      function handler (req, res) {
        t.match(req.headers, {
          authorization: 'ApiKey Zm9vOmJhcg=='
        })
        res.setHeader('Content-Type', 'application/json;utf=8')
        res.end(JSON.stringify({ hello: 'world' }))
      }

      buildServer(handler, ({ port }, server) => {
        const client = new Client({
          node: `http://localhost:${port}`,
          auth: {
            apiKey: 'Zm9vOmJhcg=='
          }
        })

        client.info((err, { body }) => {
          t.error(err)
          t.same(body, { hello: 'world' })
          server.stop()
        })
      })
    })

    t.test('Node with ApiKey auth data in the options as object', t => {
      t.plan(3)

      function handler (req, res) {
        t.match(req.headers, {
          authorization: 'ApiKey Zm9vOmJhcg=='
        })
        res.setHeader('Content-Type', 'application/json;utf=8')
        res.end(JSON.stringify({ hello: 'world' }))
      }

      buildServer(handler, ({ port }, server) => {
        const client = new Client({
          node: `http://localhost:${port}`,
          auth: {
            apiKey: { id: 'foo', api_key: 'bar' }
          }
        })

        client.info((err, { body }) => {
          t.error(err)
          t.same(body, { hello: 'world' })
          server.stop()
        })
      })
    })

    t.test('Custom ApiKey authentication per request', t => {
      t.plan(6)

      let first = true
      function handler (req, res) {
        t.match(req.headers, {
          authorization: first ? 'ApiKey Zm9vOmJhcg==' : 'Basic Zm9vOmJhcg=='
        })
        res.setHeader('Content-Type', 'application/json;utf=8')
        res.end(JSON.stringify({ hello: 'world' }))
      }

      buildServer(handler, ({ port }, server) => {
        const client = new Client({
          node: `http://foo:bar@localhost:${port}`
        })

        client.info({}, {
          headers: {
            authorization: 'ApiKey Zm9vOmJhcg=='
          }
        }, (err, { body }) => {
          t.error(err)
          t.same(body, { hello: 'world' })
          first = false

          client.info((err, { body }) => {
            t.error(err)
            t.same(body, { hello: 'world' })
            server.stop()
          })
        })
      })
    })

    t.test('Override default ApiKey authentication per request', t => {
      t.plan(6)

      let first = true
      function handler (req, res) {
        t.match(req.headers, {
          authorization: first ? 'hello' : 'ApiKey Zm9vOmJhcg=='
        })
        res.setHeader('Content-Type', 'application/json;utf=8')
        res.end(JSON.stringify({ hello: 'world' }))
      }

      buildServer(handler, ({ port }, server) => {
        const client = new Client({
          node: `http://localhost:${port}`,
          auth: {
            apiKey: 'Zm9vOmJhcg=='
          }
        })

        client.info({}, {
          headers: {
            authorization: 'hello'
          }
        }, (err, { body }) => {
          t.error(err)
          t.same(body, { hello: 'world' })
          first = false

          client.info((err, { body }) => {
            t.error(err)
            t.same(body, { hello: 'world' })
            server.stop()
          })
        })
      })
    })

    t.test('ApiKey should take precedence over basic auth (in url)', t => {
      t.plan(3)

      function handler (req, res) {
        t.match(req.headers, {
          authorization: 'ApiKey Zm9vOmJhcg=='
        })
        res.setHeader('Content-Type', 'application/json;utf=8')
        res.end(JSON.stringify({ hello: 'world' }))
      }

      buildServer(handler, ({ port }, server) => {
        const client = new Client({
          node: `http://user:pwd@localhost:${port}`,
          auth: {
            apiKey: 'Zm9vOmJhcg=='
          }
        })

        client.info((err, { body }) => {
          t.error(err)
          t.same(body, { hello: 'world' })
          server.stop()
        })
      })
    })

    t.test('ApiKey should take precedence over basic auth (in opts)', t => {
      t.plan(3)

      function handler (req, res) {
        t.match(req.headers, {
          authorization: 'ApiKey Zm9vOmJhcg=='
        })
        res.setHeader('Content-Type', 'application/json;utf=8')
        res.end(JSON.stringify({ hello: 'world' }))
      }

      buildServer(handler, ({ port }, server) => {
        const client = new Client({
          node: `http://localhost:${port}`,
          auth: {
            apiKey: 'Zm9vOmJhcg==',
            username: 'user',
            password: 'pwd'
          }
        })

        client.info((err, { body }) => {
          t.error(err)
          t.same(body, { hello: 'world' })
          server.stop()
        })
      })
    })

    t.end()
  })

  t.end()
})

test('Custom headers per request', t => {
  t.plan(3)

  function handler (req, res) {
    t.match(req.headers, {
      'x-foo': 'bar',
      'x-baz': 'faz'
    })
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://foo:bar@localhost:${port}`
    })

    client.info({}, {
      headers: {
        'x-foo': 'bar',
        'x-baz': 'faz'
      }
    }, (err, { body }) => {
      t.error(err)
      t.same(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Client close', t => {
  t.plan(2)

  class MyConnectionPool extends ConnectionPool {
    empty (callback) {
      t.ok('called')
      super.empty(callback)
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    ConnectionPool: MyConnectionPool
  })

  client.close(() => t.pass('Closed'))
})

test('Client close (promise)', t => {
  t.plan(2)

  class MyConnectionPool extends ConnectionPool {
    empty (callback) {
      t.ok('called')
      super.empty(callback)
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    ConnectionPool: MyConnectionPool
  })

  client.close()
    .then(() => t.pass('Closed'))
})

test('Extend client APIs', t => {
  t.test('Extend a single method', t => {
    t.plan(5)

    const client = new Client({ node: 'http://localhost:9200' })
    client.extend('method', ({ makeRequest, result, ConfigurationError }) => {
      t.type(makeRequest, 'function')
      t.ok(new ConfigurationError() instanceof Error)
      t.same(result, {
        body: null,
        statusCode: null,
        headers: null,
        warnings: null
      })

      return (params, options) => {
        t.same(params, { you_know: 'for search' })
        t.same(options, { winter: 'is coming' })
      }
    })

    client.method(
      { you_know: 'for search' },
      { winter: 'is coming' }
    )
  })

  t.test('Create a namespace and a method', t => {
    t.plan(5)

    const client = new Client({ node: 'http://localhost:9200' })
    client.extend('namespace.method', ({ makeRequest, result, ConfigurationError }) => {
      t.type(makeRequest, 'function')
      t.ok(new ConfigurationError() instanceof Error)
      t.same(result, {
        body: null,
        statusCode: null,
        headers: null,
        warnings: null
      })

      return (params, options) => {
        t.same(params, { you_know: 'for search' })
        t.same(options, { winter: 'is coming' })
      }
    })

    client.namespace.method(
      { you_know: 'for search' },
      { winter: 'is coming' }
    )
  })

  t.test('Create a namespace and multiple methods', t => {
    t.plan(10)

    const client = new Client({ node: 'http://localhost:9200' })
    client.extend('namespace.method1', ({ makeRequest, result, ConfigurationError }) => {
      t.type(makeRequest, 'function')
      t.ok(new ConfigurationError() instanceof Error)
      t.same(result, {
        body: null,
        statusCode: null,
        headers: null,
        warnings: null
      })

      return (params, options) => {
        t.same(params, { you_know: 'for search' })
        t.same(options, { winter: 'is coming' })
      }
    })

    client.extend('namespace.method2', ({ makeRequest, result, ConfigurationError }) => {
      t.type(makeRequest, 'function')
      t.ok(new ConfigurationError() instanceof Error)
      t.same(result, {
        body: null,
        statusCode: null,
        headers: null,
        warnings: null
      })

      return (params, options) => {
        t.same(params, { you_know: 'for search' })
        t.same(options, { winter: 'is coming' })
      }
    })

    client.namespace.method1(
      { you_know: 'for search' },
      { winter: 'is coming' }
    )

    client.namespace.method2(
      { you_know: 'for search' },
      { winter: 'is coming' }
    )
  })

  t.test('Cannot override an existing method', t => {
    t.plan(1)

    const client = new Client({ node: 'http://localhost:9200' })
    try {
      client.extend('index', () => {})
      t.fail('Should throw')
    } catch (err) {
      t.equal(err.message, 'The method "index" already exists')
    }
  })

  t.test('Cannot override an existing namespace and method', t => {
    t.plan(1)

    const client = new Client({ node: 'http://localhost:9200' })
    try {
      client.extend('indices.delete', () => {})
      t.fail('Should throw')
    } catch (err) {
      t.equal(err.message, 'The method "delete" already exists on namespace "indices"')
    }
  })

  t.test('Can override an existing method with { force: true }', t => {
    t.plan(1)

    const client = new Client({ node: 'http://localhost:9200' })
    try {
      client.extend('index', { force: true }, () => t.pass('Called'))
    } catch (err) {
      t.fail('Should not throw')
    }
  })

  t.test('Can override an existing namespace and method with { force: true }', t => {
    t.plan(1)

    const client = new Client({ node: 'http://localhost:9200' })
    try {
      client.extend('indices.delete', { force: true }, () => t.pass('Called'))
    } catch (err) {
      t.fail('Should not throw')
    }
  })

  t.test('Should call the transport.request method', t => {
    t.plan(2)

    class MyTransport extends Transport {
      request (params, options) {
        t.same(params, { you_know: 'for search' })
        t.same(options, { winter: 'is coming' })
      }
    }

    const client = new Client({
      node: 'http://localhost:9200',
      Transport: MyTransport
    })
    client.extend('method', ({ makeRequest, result, ConfigurationError }) => {
      return (params, options) => makeRequest(params, options)
    })

    client.method(
      { you_know: 'for search' },
      { winter: 'is coming' }
    )
  })

  t.test('Should support callbacks', t => {
    t.plan(2)

    const client = new Client({ node: 'http://localhost:9200' })
    client.extend('method', ({ makeRequest, result, ConfigurationError }) => {
      return (params, options, callback) => {
        callback(null, { hello: 'world' })
      }
    })

    client.method(
      { you_know: 'for search' },
      { winter: 'is coming' },
      (err, res) => {
        t.error(err)
        t.same(res, { hello: 'world' })
      }
    )
  })

  t.test('Should support promises', t => {
    t.plan(1)

    const client = new Client({ node: 'http://localhost:9200' })
    client.extend('method', ({ makeRequest, result, ConfigurationError }) => {
      return (params, options) => {
        return new Promise((resolve, reject) => {
          resolve({ hello: 'world' })
        })
      }
    })

    client
      .method(
        { you_know: 'for search' },
        { winter: 'is coming' }
      )
      .then(res => t.same(res, { hello: 'world' }))
      .catch(err => t.fail(err))
  })

  t.end()
})

test('Elastic cloud config', t => {
  t.test('Basic', t => {
    t.plan(5)
    const client = new Client({
      cloud: {
        // 'localhost$abcd$efgh'
        id: 'name:bG9jYWxob3N0JGFiY2QkZWZnaA==',
        username: 'elastic',
        password: 'changeme'
      }
    })

    const pool = client.connectionPool
    t.ok(pool instanceof CloudConnectionPool)
    t.match(pool.connections.find(c => c.id === 'https://abcd.localhost/'), {
      url: new URL('https://elastic:changeme@abcd.localhost'),
      id: 'https://abcd.localhost/',
      headers: {
        authorization: 'Basic ' + Buffer.from('elastic:changeme').toString('base64')
      },
      ssl: { secureProtocol: 'TLSv1_2_method' },
      deadCount: 0,
      resurrectTimeout: 0,
      roles: {
        master: true,
        data: true,
        ingest: true,
        ml: false
      }
    })

    t.equal(client.transport.compression, 'gzip')
    t.equal(client.transport.suggestCompression, true)
    t.same(pool._ssl, { secureProtocol: 'TLSv1_2_method' })
  })

  t.test('Without kibana component', t => {
    t.plan(5)
    const client = new Client({
      cloud: {
        // 'localhost$abcd$'
        id: 'name:bG9jYWxob3N0JGFiY2Qk',
        username: 'elastic',
        password: 'changeme'
      }
    })

    const pool = client.connectionPool
    t.ok(pool instanceof CloudConnectionPool)
    t.match(pool.connections.find(c => c.id === 'https://abcd.localhost/'), {
      url: new URL('https://elastic:changeme@abcd.localhost'),
      id: 'https://abcd.localhost/',
      headers: {
        authorization: 'Basic ' + Buffer.from('elastic:changeme').toString('base64')
      },
      ssl: { secureProtocol: 'TLSv1_2_method' },
      deadCount: 0,
      resurrectTimeout: 0,
      roles: {
        master: true,
        data: true,
        ingest: true,
        ml: false
      }
    })

    t.equal(client.transport.compression, 'gzip')
    t.equal(client.transport.suggestCompression, true)
    t.same(pool._ssl, { secureProtocol: 'TLSv1_2_method' })
  })

  t.test('Auth as separate option', t => {
    t.plan(5)
    const client = new Client({
      cloud: {
        // 'localhost$abcd$efgh'
        id: 'name:bG9jYWxob3N0JGFiY2QkZWZnaA=='
      },
      auth: {
        username: 'elastic',
        password: 'changeme'
      }
    })

    const pool = client.connectionPool
    t.ok(pool instanceof CloudConnectionPool)
    t.match(pool.connections.find(c => c.id === 'https://abcd.localhost/'), {
      url: new URL('https://elastic:changeme@abcd.localhost'),
      id: 'https://abcd.localhost/',
      headers: {
        authorization: 'Basic ' + Buffer.from('elastic:changeme').toString('base64')
      },
      ssl: { secureProtocol: 'TLSv1_2_method' },
      deadCount: 0,
      resurrectTimeout: 0,
      roles: {
        master: true,
        data: true,
        ingest: true,
        ml: false
      }
    })

    t.equal(client.transport.compression, 'gzip')
    t.equal(client.transport.suggestCompression, true)
    t.same(pool._ssl, { secureProtocol: 'TLSv1_2_method' })
  })

  t.test('ApiKey should take precedence over basic auth', t => {
    t.plan(5)
    const client = new Client({
      cloud: {
        // 'localhost$abcd$efgh'
        id: 'name:bG9jYWxob3N0JGFiY2QkZWZnaA=='
      },
      auth: {
        username: 'elastic',
        password: 'changeme',
        apiKey: 'Zm9vOmJhcg=='
      }
    })

    const pool = client.connectionPool
    t.ok(pool instanceof CloudConnectionPool)
    t.match(pool.connections.find(c => c.id === 'https://abcd.localhost/'), {
      url: new URL('https://elastic:changeme@abcd.localhost'),
      id: 'https://abcd.localhost/',
      headers: {
        authorization: 'ApiKey Zm9vOmJhcg=='
      },
      ssl: { secureProtocol: 'TLSv1_2_method' },
      deadCount: 0,
      resurrectTimeout: 0,
      roles: {
        master: true,
        data: true,
        ingest: true,
        ml: false
      }
    })

    t.equal(client.transport.compression, 'gzip')
    t.equal(client.transport.suggestCompression, true)
    t.same(pool._ssl, { secureProtocol: 'TLSv1_2_method' })
  })

  t.test('Override default options', t => {
    t.plan(4)
    const client = new Client({
      cloud: {
        // 'localhost$abcd$efgh'
        id: 'name:bG9jYWxob3N0JGFiY2QkZWZnaA==',
        username: 'elastic',
        password: 'changeme'
      },
      compression: false,
      suggestCompression: false,
      ssl: {
        secureProtocol: 'TLSv1_1_method'
      }
    })

    t.ok(client.connectionPool instanceof CloudConnectionPool)
    t.equal(client.transport.compression, false)
    t.equal(client.transport.suggestCompression, false)
    t.same(client.connectionPool._ssl, { secureProtocol: 'TLSv1_1_method' })
  })

  t.end()
})

test('Opaque Id support', t => {
  t.test('No opaqueId', t => {
    t.plan(3)

    function handler (req, res) {
      t.equal(req.headers['x-opaque-id'], undefined)
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end(JSON.stringify({ hello: 'world' }))
    }

    buildServer(handler, ({ port }, server) => {
      const client = new Client({
        node: `http://localhost:${port}`
      })

      client.search({
        index: 'test',
        q: 'foo:bar'
      }, (err, { body }) => {
        t.error(err)
        t.same(body, { hello: 'world' })
        server.stop()
      })
    })
  })

  t.test('No prefix', t => {
    t.plan(3)

    function handler (req, res) {
      t.equal(req.headers['x-opaque-id'], 'bar')
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end(JSON.stringify({ hello: 'world' }))
    }

    buildServer(handler, ({ port }, server) => {
      const client = new Client({
        node: `http://localhost:${port}`
      })

      client.search({
        index: 'test',
        q: 'foo:bar'
      }, {
        opaqueId: 'bar'
      }, (err, { body }) => {
        t.error(err)
        t.same(body, { hello: 'world' })
        server.stop()
      })
    })
  })

  t.test('With prefix', t => {
    t.plan(3)

    function handler (req, res) {
      t.equal(req.headers['x-opaque-id'], 'foo-bar')
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end(JSON.stringify({ hello: 'world' }))
    }

    buildServer(handler, ({ port }, server) => {
      const client = new Client({
        node: `http://localhost:${port}`,
        opaqueIdPrefix: 'foo-'
      })

      client.search({
        index: 'test',
        q: 'foo:bar'
      }, {
        opaqueId: 'bar'
      }, (err, { body }) => {
        t.error(err)
        t.same(body, { hello: 'world' })
        server.stop()
      })
    })
  })

  t.end()
})

test('Correctly handles the same header cased differently', t => {
  t.plan(4)

  function handler (req, res) {
    t.equal(req.headers.authorization, 'Basic foobar')
    t.equal(req.headers.foo, 'baz')
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://localhost:${port}`,
      auth: {
        username: 'hello',
        password: 'world'
      },
      headers: {
        Authorization: 'Basic foobar',
        Foo: 'bar'
      }
    })

    client.search({
      index: 'test',
      q: 'foo:bar'
    }, {
      headers: {
        foo: 'baz'
      }
    }, (err, { body }) => {
      t.error(err)
      t.same(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Random selector', t => {
  t.plan(2)

  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://localhost:${port}`,
      nodeSelector: 'random'
    })

    client.search({
      index: 'test',
      q: 'foo:bar'
    }, (err, { body }) => {
      t.error(err)
      t.same(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Disable keep alive agent', t => {
  t.plan(3)

  function handler (req, res) {
    t.equal(req.headers.connection, 'close')
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://localhost:${port}`,
      agent: false
    })

    client.search({
      index: 'test',
      q: 'foo:bar'
    }, (err, { body }) => {
      t.error(err)
      t.same(body, { hello: 'world' })
      server.stop()
    })
  })
}, { skip: true })

test('name property as string', t => {
  t.plan(1)

  const client = new Client({
    node: 'http://localhost:9200',
    name: 'client-name'
  })

  t.equal(client.name, 'client-name')
})

test('name property as symbol', t => {
  t.plan(1)

  const symbol = Symbol('client-name')
  const client = new Client({
    node: 'http://localhost:9200',
    name: symbol
  })

  t.equal(client.name, symbol)
})

// The nodejs http agent will try to wait for the whole
// body to arrive before closing the request, so this
// test might take some time.
test('Bad content length', t => {
  t.plan(3)

  let count = 0
  function handler (req, res) {
    count += 1
    const body = JSON.stringify({ hello: 'world' })
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.setHeader('Content-Length', body.length + '')
    res.end(body.slice(0, -5))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({ node: `http://localhost:${port}`, maxRetries: 1 })
    client.info((err, { body }) => {
      t.ok(err instanceof errors.ConnectionError)
      t.equal(err.message, 'Response aborted while reading the body')
      t.equal(count, 2)
      server.stop()
    })
  })
})

test('Socket destryed while reading the body', t => {
  t.plan(3)

  let count = 0
  function handler (req, res) {
    count += 1
    const body = JSON.stringify({ hello: 'world' })
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.setHeader('Content-Length', body.length + '')
    res.write(body.slice(0, -5))
    setTimeout(() => {
      res.socket.destroy()
    }, 500)
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({ node: `http://localhost:${port}`, maxRetries: 1 })
    client.info((err, { body }) => {
      t.ok(err instanceof errors.ConnectionError)
      t.equal(err.message, 'Response aborted while reading the body')
      t.equal(count, 2)
      server.stop()
    })
  })
})

test('Content length too big (buffer)', t => {
  t.plan(4)

  class MockConnection extends Connection {
    request (params, callback) {
      const stream = intoStream(JSON.stringify({ hello: 'world' }))
      stream.statusCode = 200
      stream.headers = {
        'content-type': 'application/json;utf=8',
        'content-encoding': 'gzip',
        'content-length': buffer.constants.MAX_LENGTH + 10,
        connection: 'keep-alive',
        date: new Date().toISOString()
      }
      stream.on('close', () => t.pass('Stream destroyed'))
      process.nextTick(callback, null, stream)
      return { abort () {} }
    }
  }

  const client = new Client({ node: 'http://localhost:9200', Connection: MockConnection })
  client.info((err, result) => {
    t.ok(err instanceof errors.RequestAbortedError)
    t.equal(err.message, `The content length (${buffer.constants.MAX_LENGTH + 10}) is bigger than the maximum allowed buffer (${buffer.constants.MAX_LENGTH})`)
    t.equal(result.meta.attempts, 0)
  })
})

test('Content length too big (string)', t => {
  t.plan(4)

  class MockConnection extends Connection {
    request (params, callback) {
      const stream = intoStream(JSON.stringify({ hello: 'world' }))
      stream.statusCode = 200
      stream.headers = {
        'content-type': 'application/json;utf=8',
        'content-length': buffer.constants.MAX_STRING_LENGTH + 10,
        connection: 'keep-alive',
        date: new Date().toISOString()
      }
      stream.on('close', () => t.pass('Stream destroyed'))
      process.nextTick(callback, null, stream)
      return { abort () {} }
    }
  }

  const client = new Client({ node: 'http://localhost:9200', Connection: MockConnection })
  client.info((err, result) => {
    t.ok(err instanceof errors.RequestAbortedError)
    t.equal(err.message, `The content length (${buffer.constants.MAX_STRING_LENGTH + 10}) is bigger than the maximum allowed string (${buffer.constants.MAX_STRING_LENGTH})`)
    t.equal(result.meta.attempts, 0)
  })
})

test('Content length too big custom (buffer)', t => {
  t.plan(4)

  class MockConnection extends Connection {
    request (params, callback) {
      const stream = intoStream(JSON.stringify({ hello: 'world' }))
      stream.statusCode = 200
      stream.headers = {
        'content-type': 'application/json;utf=8',
        'content-encoding': 'gzip',
        'content-length': 1100,
        connection: 'keep-alive',
        date: new Date().toISOString()
      }
      stream.on('close', () => t.pass('Stream destroyed'))
      process.nextTick(callback, null, stream)
      return { abort () {} }
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection,
    maxCompressedResponseSize: 1000
  })
  client.info((err, result) => {
    t.ok(err instanceof errors.RequestAbortedError)
    t.equal(err.message, 'The content length (1100) is bigger than the maximum allowed buffer (1000)')
    t.equal(result.meta.attempts, 0)
  })
})

test('Content length too big custom (string)', t => {
  t.plan(4)

  class MockConnection extends Connection {
    request (params, callback) {
      const stream = intoStream(JSON.stringify({ hello: 'world' }))
      stream.statusCode = 200
      stream.headers = {
        'content-type': 'application/json;utf=8',
        'content-length': 1100,
        connection: 'keep-alive',
        date: new Date().toISOString()
      }
      stream.on('close', () => t.pass('Stream destroyed'))
      process.nextTick(callback, null, stream)
      return { abort () {} }
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection,
    maxResponseSize: 1000
  })
  client.info((err, result) => {
    t.ok(err instanceof errors.RequestAbortedError)
    t.equal(err.message, 'The content length (1100) is bigger than the maximum allowed string (1000)')
    t.equal(result.meta.attempts, 0)
  })
})

test('Content length too big custom option (buffer)', t => {
  t.plan(4)

  class MockConnection extends Connection {
    request (params, callback) {
      const stream = intoStream(JSON.stringify({ hello: 'world' }))
      stream.statusCode = 200
      stream.headers = {
        'content-type': 'application/json;utf=8',
        'content-encoding': 'gzip',
        'content-length': 1100,
        connection: 'keep-alive',
        date: new Date().toISOString()
      }
      stream.on('close', () => t.pass('Stream destroyed'))
      process.nextTick(callback, null, stream)
      return { abort () {} }
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })
  client.info({}, { maxCompressedResponseSize: 1000 }, (err, result) => {
    t.ok(err instanceof errors.RequestAbortedError)
    t.equal(err.message, 'The content length (1100) is bigger than the maximum allowed buffer (1000)')
    t.equal(result.meta.attempts, 0)
  })
})

test('Content length too big custom option (string)', t => {
  t.plan(4)

  class MockConnection extends Connection {
    request (params, callback) {
      const stream = intoStream(JSON.stringify({ hello: 'world' }))
      stream.statusCode = 200
      stream.headers = {
        'content-type': 'application/json;utf=8',
        'content-length': 1100,
        connection: 'keep-alive',
        date: new Date().toISOString()
      }
      stream.on('close', () => t.pass('Stream destroyed'))
      process.nextTick(callback, null, stream)
      return { abort () {} }
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })
  client.info({}, { maxResponseSize: 1000 }, (err, result) => {
    t.ok(err instanceof errors.RequestAbortedError)
    t.equal(err.message, 'The content length (1100) is bigger than the maximum allowed string (1000)')
    t.equal(result.meta.attempts, 0)
  })
})

test('Content length too big custom option override (buffer)', t => {
  t.plan(4)

  class MockConnection extends Connection {
    request (params, callback) {
      const stream = intoStream(JSON.stringify({ hello: 'world' }))
      stream.statusCode = 200
      stream.headers = {
        'content-type': 'application/json;utf=8',
        'content-encoding': 'gzip',
        'content-length': 1100,
        connection: 'keep-alive',
        date: new Date().toISOString()
      }
      stream.on('close', () => t.pass('Stream destroyed'))
      process.nextTick(callback, null, stream)
      return { abort () {} }
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection,
    maxCompressedResponseSize: 2000
  })
  client.info({}, { maxCompressedResponseSize: 1000 }, (err, result) => {
    t.ok(err instanceof errors.RequestAbortedError)
    t.equal(err.message, 'The content length (1100) is bigger than the maximum allowed buffer (1000)')
    t.equal(result.meta.attempts, 0)
  })
})

test('Content length too big custom option override (string)', t => {
  t.plan(4)

  class MockConnection extends Connection {
    request (params, callback) {
      const stream = intoStream(JSON.stringify({ hello: 'world' }))
      stream.statusCode = 200
      stream.headers = {
        'content-type': 'application/json;utf=8',
        'content-length': 1100,
        connection: 'keep-alive',
        date: new Date().toISOString()
      }
      stream.on('close', () => t.pass('Stream destroyed'))
      process.nextTick(callback, null, stream)
      return { abort () {} }
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection,
    maxResponseSize: 2000
  })
  client.info({}, { maxResponseSize: 1000 }, (err, result) => {
    t.ok(err instanceof errors.RequestAbortedError)
    t.equal(err.message, 'The content length (1100) is bigger than the maximum allowed string (1000)')
    t.equal(result.meta.attempts, 0)
  })
})

test('maxResponseSize cannot be bigger than buffer.constants.MAX_STRING_LENGTH', t => {
  t.plan(2)

  try {
    new Client({ // eslint-disable-line
      node: 'http://localhost:9200',
      maxResponseSize: buffer.constants.MAX_STRING_LENGTH + 10
    })
    t.fail('should throw')
  } catch (err) {
    t.ok(err instanceof errors.ConfigurationError)
    t.equal(err.message, `The maxResponseSize cannot be bigger than ${buffer.constants.MAX_STRING_LENGTH}`)
  }
})

test('maxCompressedResponseSize cannot be bigger than buffer.constants.MAX_STRING_LENGTH', t => {
  t.plan(2)

  try {
    new Client({ // eslint-disable-line
      node: 'http://localhost:9200',
      maxCompressedResponseSize: buffer.constants.MAX_LENGTH + 10
    })
    t.fail('should throw')
  } catch (err) {
    t.ok(err instanceof errors.ConfigurationError)
    t.equal(err.message, `The maxCompressedResponseSize cannot be bigger than ${buffer.constants.MAX_LENGTH}`)
  }
})

test('Meta header enabled', t => {
  t.plan(2)

  class MockConnection extends Connection {
    request (params, callback) {
      t.match(params.headers, { 'x-elastic-client-meta': `es=${clientVersion},js=${nodeVersion},t=${clientVersion},hc=${nodeVersion}` })
      const stream = intoStream(JSON.stringify({ hello: 'world' }))
      stream.statusCode = 200
      stream.headers = {
        'content-type': 'application/json;utf=8',
        'content-length': '17',
        connection: 'keep-alive',
        date: new Date().toISOString()
      }
      process.nextTick(callback, null, stream)
      return { abort () {} }
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.info((err, result) => {
    t.error(err)
  })
})

test('Meta header disabled', t => {
  t.plan(2)

  class MockConnection extends Connection {
    request (params, callback) {
      t.notMatch(params.headers, { 'x-elastic-client-meta': `es=${clientVersion},js=${nodeVersion},t=${clientVersion},hc=${nodeVersion}` })
      const stream = intoStream(JSON.stringify({ hello: 'world' }))
      stream.statusCode = 200
      stream.headers = {
        'content-type': 'application/json;utf=8',
        'content-length': '17',
        connection: 'keep-alive',
        date: new Date().toISOString()
      }
      process.nextTick(callback, null, stream)
      return { abort () {} }
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection,
    enableMetaHeader: false
  })

  client.info((err, result) => {
    t.error(err)
  })
})

test('Prototype poisoning protection enabled by default', t => {
  t.plan(1)

  class MockConnection extends Connection {
    request (params, callback) {
      const stream = intoStream('{"__proto__":{"foo":"bar"}}')
      stream.statusCode = 200
      stream.headers = {
        'content-type': 'application/json;utf=8',
        'content-length': '27',
        connection: 'keep-alive',
        date: new Date().toISOString()
      }
      process.nextTick(callback, null, stream)
      return { abort () {} }
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.info((err, result) => {
    t.ok(err instanceof errors.DeserializationError)
  })
})

test('Disable prototype poisoning protection', t => {
  t.plan(1)

  class MockConnection extends Connection {
    request (params, callback) {
      const stream = intoStream('{"__proto__":{"foo":"bar"}}')
      stream.statusCode = 200
      stream.headers = {
        'content-type': 'application/json;utf=8',
        'content-length': '27',
        connection: 'keep-alive',
        date: new Date().toISOString()
      }
      process.nextTick(callback, null, stream)
      return { abort () {} }
    }
  }

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection,
    disablePrototypePoisoningProtection: true
  })

  client.info((err, result) => {
    t.error(err)
  })
})

test('API compatibility header (json)', t => {
  t.plan(4)

  function handler (req, res) {
    t.equal(req.headers.accept, 'application/vnd.elasticsearch+json; compatible-with=7')
    t.equal(req.headers['content-type'], 'application/vnd.elasticsearch+json; compatible-with=7')
    res.setHeader('Content-Type', 'application/vnd.elasticsearch+json; compatible-with=7')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    process.env.ELASTIC_CLIENT_APIVERSIONING = 'true'
    const client = new Client({
      node: `http://localhost:${port}`
    })

    client.index({ index: 'foo', body: {} }, (err, { body }) => {
      t.error(err)
      t.same(body, { hello: 'world' })
      server.stop()
      delete process.env.ELASTIC_CLIENT_APIVERSIONING
    })
  })
})

test('API compatibility header (x-ndjson)', t => {
  t.plan(4)

  function handler (req, res) {
    t.equal(req.headers.accept, 'application/vnd.elasticsearch+json; compatible-with=7')
    t.equal(req.headers['content-type'], 'application/vnd.elasticsearch+x-ndjson; compatible-with=7')
    res.setHeader('Content-Type', 'application/vnd.elasticsearch+json; compatible-with=7')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    process.env.ELASTIC_CLIENT_APIVERSIONING = 'true'
    const client = new Client({
      node: `http://localhost:${port}`
    })

    client.bulk({ index: 'foo', body: [{}, {}] }, (err, { body }) => {
      t.error(err)
      t.same(body, { hello: 'world' })
      server.stop()
      delete process.env.ELASTIC_CLIENT_APIVERSIONING
    })
  })
})

test('Bearer auth', t => {
  t.plan(3)

  function handler (req, res) {
    t.match(req.headers, {
      authorization: 'Bearer Zm9vOmJhcg=='
    })
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      node: `http://localhost:${port}`,
      auth: {
        bearer: 'Zm9vOmJhcg=='
      }
    })

    client.info((err, { body }) => {
      t.error(err)
      t.same(body, { hello: 'world' })
      server.stop()
    })
  })
})

test('Check server fingerprint (success)', t => {
  t.plan(1)

  function handler (req, res) {
    res.end('ok')
  }

  buildServer(handler, { secure: true }, ({ port, caFingerprint }, server) => {
    const client = new Client({
      node: `https://localhost:${port}`,
      caFingerprint
    })

    client.info((err, res) => {
      t.error(err)
      server.stop()
    })
  })
})

test('Check server fingerprint (failure)', t => {
  t.plan(2)

  function handler (req, res) {
    res.end('ok')
  }

  buildServer(handler, { secure: true }, ({ port }, server) => {
    const client = new Client({
      node: `https://localhost:${port}`,
      caFingerprint: 'FO:OB:AR'
    })

    client.info((err, res) => {
      t.ok(err instanceof errors.ConnectionError)
      t.equal(err.message, 'Server certificate CA fingerprint does not match the value configured in caFingerprint')
      server.stop()
    })
  })
})

test('caFingerprint can\'t be configured over http / 1', t => {
  t.plan(2)

  try {
    new Client({ // eslint-disable-line
      node: 'http://localhost:9200',
      caFingerprint: 'FO:OB:AR'
    })
    t.fail('shuld throw')
  } catch (err) {
    t.ok(err instanceof errors.ConfigurationError)
    t.equal(err.message, 'You can\'t configure the caFingerprint with a http connection')
  }
})

test('caFingerprint can\'t be configured over http / 2', t => {
  t.plan(2)

  try {
    new Client({ // eslint-disable-line
      nodes: ['http://localhost:9200'],
      caFingerprint: 'FO:OB:AR'
    })
    t.fail('should throw')
  } catch (err) {
    t.ok(err instanceof errors.ConfigurationError)
    t.equal(err.message, 'You can\'t configure the caFingerprint with a http connection')
  }
})

test('caFingerprint can\'t be configured over http / 3', t => {
  t.plan(1)

  try {
    new Client({ // eslint-disable-line
      nodes: ['https://localhost:9200'],
      caFingerprint: 'FO:OB:AR'
    })
    t.pass('should not throw')
  } catch (err) {
    t.fail('shuld not throw')
  }
})

test('caFingerprint can\'t be configured over http / 4', t => {
  t.plan(2)

  try {
    new Client({ // eslint-disable-line
      node: { url: new URL('http://localhost:9200') },
      caFingerprint: 'FO:OB:AR'
    })
    t.fail('shuld throw')
  } catch (err) {
    t.ok(err instanceof errors.ConfigurationError)
    t.equal(err.message, 'You can\'t configure the caFingerprint with a http connection')
  }
})

test('caFingerprint can\'t be configured over http / 5', t => {
  t.plan(2)

  try {
    new Client({ // eslint-disable-line
      nodes: [{ url: new URL('http://localhost:9200') }],
      caFingerprint: 'FO:OB:AR'
    })
    t.fail('should throw')
  } catch (err) {
    t.ok(err instanceof errors.ConfigurationError)
    t.equal(err.message, 'You can\'t configure the caFingerprint with a http connection')
  }
})

test('Error body that is not a json', t => {
  t.plan(5)

  const MockConnection = buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 400,
        body: '<html><body>error!</body></html>',
        headers: { 'content-type': 'text/html' }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection,
    maxRetries: 1
  })

  client.info((err, result) => {
    t.ok(err instanceof errors.ResponseError)
    t.equal(err.name, 'ResponseError')
    t.equal(err.body, '<html><body>error!</body></html>')
    t.equal(err.message, '<html><body>error!</body></html>')
    t.equal(err.statusCode, 400)
  })
})

test('Issue #1521 with promises', async t => {
  t.plan(1)

  const delay = () => new Promise(resolve => setTimeout(resolve, 10))

  const MockConnection = buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 200,
        headers: {
          'x-elastic-product': 'Elasticsearch'
        },
        body: {
          name: '1ef419078577',
          cluster_name: 'docker-cluster',
          cluster_uuid: 'cQ5pAMvRRTyEzObH4L5mTA',
          version: {
            number: '8.0.0-SNAPSHOT',
            build_flavor: 'default',
            build_type: 'docker',
            build_hash: '5fb4c050958a6b0b6a70a6fb3e616d0e390eaac3',
            build_date: '2021-07-10T01:45:02.136546168Z',
            build_snapshot: true,
            lucene_version: '8.9.0',
            minimum_wire_compatibility_version: '7.15.0',
            minimum_index_compatibility_version: '7.0.0'
          },
          tagline: 'You Know, for Search'
        }
      }
    }
  })

  class MyTransport extends Transport {
    request (params, options = {}, callback) {
      if (typeof options === 'function') {
        callback = options
        options = {}
      }

      if (typeof callback === 'undefined') {
        return delay()
          .then(() => super.request(params, options))
      }

      // Callback support
      delay()
        .then(() => super.request(params, options, callback))
    }
  }

  const client = new ProductClient({
    node: 'http://localhost:9200',
    Transport: MyTransport,
    Connection: MockConnection
  })

  try {
    await client.search({})
    t.pass('ok')
  } catch (err) {
    t.fail(err)
  }
})

test('Issue #1521 with callbacks', t => {
  t.plan(1)

  const delay = () => new Promise(resolve => setTimeout(resolve, 10))

  const MockConnection = buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 200,
        headers: {
          'x-elastic-product': 'Elasticsearch'
        },
        body: {
          name: '1ef419078577',
          cluster_name: 'docker-cluster',
          cluster_uuid: 'cQ5pAMvRRTyEzObH4L5mTA',
          version: {
            number: '8.0.0-SNAPSHOT',
            build_flavor: 'default',
            build_type: 'docker',
            build_hash: '5fb4c050958a6b0b6a70a6fb3e616d0e390eaac3',
            build_date: '2021-07-10T01:45:02.136546168Z',
            build_snapshot: true,
            lucene_version: '8.9.0',
            minimum_wire_compatibility_version: '7.15.0',
            minimum_index_compatibility_version: '7.0.0'
          },
          tagline: 'You Know, for Search'
        }
      }
    }
  })

  class MyTransport extends Transport {
    request (params, options = {}, callback) {
      if (typeof options === 'function') {
        callback = options
        options = {}
      }

      if (typeof callback === 'undefined') {
        return delay()
          .then(() => super.request(params, options))
      }

      // Callback support
      delay()
        .then(() => super.request(params, options, callback))
    }
  }

  const client = new ProductClient({
    node: 'http://localhost:9200',
    Transport: MyTransport,
    Connection: MockConnection
  })

  client.search({}, (err, result) => {
    t.error(err)
  })
})
