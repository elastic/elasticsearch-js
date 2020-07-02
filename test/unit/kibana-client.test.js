// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { test } = require('tap')
const semver = require('semver')
const { Client, errors } = require('../../index')
const { connection } = require('../utils')

/**
 * Subclass method
 * pros:
 *   - idiomatic way of solving the problem
 *   - safe from binding issues
 * cons:
 *   - needs to use symbols for accessing "private" properties in kibana core
 */
const kTransportRequest = Symbol('kibana-client-transport-request')
class KibanaClient extends Client {
  constructor (opts) {
    super(opts)
    this[kTransportRequest] = super.transport.request.bind(super.transport)
  }

  get transport () {
    return { request: this[kTransportRequest] }
  }

  get connectionPool () {
    return undefined
  }

  get serializer () {
    return undefined
  }

  child () {
    throw new errors.ElasticsearchClientError('Cannot access child method')
  }

  close () {
    throw new errors.ElasticsearchClientError('Cannot access close method')
  }

  extend () {
    throw new errors.ElasticsearchClientError('Cannot access extend method')
  }

  emit () {
    throw new errors.ElasticsearchClientError('Cannot access emit method')
  }

  on () {
    throw new errors.ElasticsearchClientError('Cannot access on method')
  }

  once () {
    throw new errors.ElasticsearchClientError('Cannot access once method')
  }
}

/**
 * builder method
 * pros:
 *   - no need to use symbols in kibana core for accesssing properties
 * cons:
 *   - hackier solution, it requires a lot of small adjustments for binding the client instance
 */
function buildKibanaClient (opts) {
  const client = new Client(opts)

  return {
    ...client,
    transport: {
      request: client.transport.request.bind(client.transport)
    },
    connectionPool: undefined,
    serializer: undefined,
    helpers: {
      search: client.helpers.search.bind(client.helpers),
      scrollSearch: client.helpers.scrollSearch.bind(client.helpers),
      scrollDocuments: client.helpers.scrollDocuments.bind(client.helpers),
      msearch: client.helpers.msearch.bind(client.helpers),
      bulk: client.helpers.bulk.bind(client.helpers)
    },
    emit () {
      throw new errors.ElasticsearchClientError('Cannot access emit method')
    },
    on () {
      throw new errors.ElasticsearchClientError('Cannot access on method')
    },
    once () {
      throw new errors.ElasticsearchClientError('Cannot access once method')
    },
    child () {
      throw new errors.ElasticsearchClientError('Cannot access child method')
    },
    close () {
      throw new errors.ElasticsearchClientError('Cannot access close method')
    },
    extend () {
      throw new errors.ElasticsearchClientError('Cannot access extend method')
    }
  }
}

function getClient (type, opts) {
  if (type === 'subclass') {
    return new KibanaClient(opts)
  } else {
    return buildKibanaClient(opts)
  }
}

function runTest (type) {
  test(type, t => {
    t.test('Basic', async t => {
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          return { body: { hello: 'world' } }
        }
      })

      const client = getClient(type, {
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      const response = await client.info()
      t.deepEqual(response.body, { hello: 'world' })
    })

    t.test('Multiple connections', async t => {
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          return { body: { hello: 'world' } }
        }
      })

      const client = getClient(type, {
        nodes: [
          'http://localhost:9200',
          'http://localhost:9201',
          'http://localhost:9202'
        ],
        Connection: MockConnection
      })
      let response = await client.info()
      t.deepEqual(response.body, { hello: 'world' })
      t.strictEqual(response.meta.connection.id, 'http://localhost:9200/')

      response = await client.info()
      t.deepEqual(response.body, { hello: 'world' })
      t.strictEqual(response.meta.connection.id, 'http://localhost:9201/')

      response = await client.info()
      t.deepEqual(response.body, { hello: 'world' })
      t.strictEqual(response.meta.connection.id, 'http://localhost:9202/')
    })

    t.test('Can use helpers', { skip: semver.lt(process.versions.node, '10.0.0') }, async t => {
      const dataset = [
        { user: 'jon', age: 23 },
        { user: 'arya', age: 18 },
        { user: 'tyrion', age: 39 }
      ]
      let count = 0
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          t.strictEqual(params.path, '/_bulk')
          t.match(params.headers, { 'content-type': 'application/x-ndjson' })
          const [action, payload] = params.body.split('\n')
          t.deepEqual(JSON.parse(action), { index: { _index: 'test' } })
          t.deepEqual(JSON.parse(payload), dataset[count++])
          return { body: { errors: false, items: [{}] } }
        }
      })

      const client = getClient(type, {
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      const result = await client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 1,
        onDocument (doc) {
          return {
            index: { _index: 'test' }
          }
        },
        onDrop (doc) {
          t.fail('This should never be called')
        }
      })

      t.type(result.time, 'number')
      t.type(result.bytes, 'number')
      t.match(result, {
        total: 3,
        successful: 3,
        retry: 0,
        failed: 0,
        aborted: false
      })
    })

    t.test('Use transport.request', async t => {
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          return { body: { hello: 'world' } }
        }
      })

      const client = getClient(type, {
        node: 'http://localhost:9200',
        Connection: MockConnection
      })

      const response = await client.transport.request({
        method: 'GET',
        path: '/',
        querystring: null,
        body: null
      })
      t.deepEqual(response.body, { hello: 'world' })
    })

    t.test('Can\'t access other transport methods', async t => {
      const client = getClient(type, {
        node: 'http://localhost:9200'
      })

      t.strictEqual(client.transport.connectionPool, undefined)
    })

    t.test('Can\'t access connection pool', async t => {
      const client = getClient(type, {
        node: 'http://localhost:9200'
      })

      t.strictEqual(client.connectionPool, undefined)
    })

    t.test('Can\'t access serializer', async t => {
      const client = getClient(type, {
        node: 'http://localhost:9200'
      })

      t.strictEqual(client.serializer, undefined)
    })

    t.test('Can\'t use child method', async t => {
      const client = getClient(type, {
        node: 'http://localhost:9200'
      })

      t.throws(() => {
        client.child()
      })
    })

    t.test('Can\'t use close method', async t => {
      const client = getClient(type, {
        node: 'http://localhost:9200'
      })

      t.throws(() => {
        client.close()
      })
    })

    t.test('Can\'t use extend method', async t => {
      const client = getClient(type, {
        node: 'http://localhost:9200'
      })

      t.throws(() => {
        client.extend()
      })
    })

    t.test('Can\'t use events methods', async t => {
      const client = getClient(type, {
        node: 'http://localhost:9200'
      })

      t.throws(() => {
        client.emit()
      })

      t.throws(() => {
        client.on()
      })

      t.throws(() => {
        client.once()
      })
    })

    t.end()
  })
}

runTest('subclass')
runTest('builder')
