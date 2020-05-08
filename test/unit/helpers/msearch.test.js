// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { test } = require('tap')
const { Client, errors } = require('../../../')
const { connection } = require('../../utils')

test('Basic', async t => {
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {
        body: {
          responses: [{
            status: 200,
            hits: {
              hits: [
                { _source: { one: 'one' } },
                { _source: { two: 'two' } },
                { _source: { three: 'three' } }
              ]
            }
          }]
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const s = client.helpers.msearch({ operations: 1 })

  const result = await s.search(
    { index: 'test' },
    { query: { match: { foo: 'bar' } } }
  )

  t.deepEqual(result.body, {
    status: 200,
    hits: {
      hits: [
        { _source: { one: 'one' } },
        { _source: { two: 'two' } },
        { _source: { three: 'three' } }
      ]
    }
  })

  t.teardown(() => s.stop())
})

test('Multiple searches (inside async iterator)', t => {
  t.plan(4)

  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {
        body: {
          responses: [{
            status: 200,
            hits: {
              hits: [
                { _source: { one: 'one' } },
                { _source: { two: 'two' } },
                { _source: { three: 'three' } }
              ]
            }
          }, {
            status: 200,
            hits: {
              hits: [
                { _source: { four: 'four' } },
                { _source: { five: 'five' } },
                { _source: { six: 'six' } }
              ]
            }
          }]
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const s = client.helpers.msearch({ operations: 2 })

  s.search({ index: 'test' }, { query: { match: { foo: 'bar' } } }, (err, result) => {
    t.error(err)
    t.deepEqual(result.body, {
      status: 200,
      hits: {
        hits: [
          { _source: { one: 'one' } },
          { _source: { two: 'two' } },
          { _source: { three: 'three' } }
        ]
      }
    })
  })

  s.search({ index: 'test' }, { query: { match: { foo: 'bar' } } }, (err, result) => {
    t.error(err)
    t.deepEqual(result.body, {
      status: 200,
      hits: {
        hits: [
          { _source: { four: 'four' } },
          { _source: { five: 'five' } },
          { _source: { six: 'six' } }
        ]
      }
    })
  })

  t.teardown(() => s.stop())
})

test('Multiple searches (async iterator exits)', t => {
  t.plan(4)

  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {
        body: {
          responses: [{
            status: 200,
            hits: {
              hits: [
                { _source: { one: 'one' } },
                { _source: { two: 'two' } },
                { _source: { three: 'three' } }
              ]
            }
          }, {
            status: 200,
            hits: {
              hits: [
                { _source: { four: 'four' } },
                { _source: { five: 'five' } },
                { _source: { six: 'six' } }
              ]
            }
          }]
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const s = client.helpers.msearch()

  s.search({ index: 'test' }, { query: {} }, (err, result) => {
    t.error(err)
    t.deepEqual(result.body, {
      status: 200,
      hits: {
        hits: [
          { _source: { one: 'one' } },
          { _source: { two: 'two' } },
          { _source: { three: 'three' } }
        ]
      }
    })
  })

  s.search({ index: 'test' }, { query: { match: { foo: 'bar' } } }, (err, result) => {
    t.error(err)
    t.deepEqual(result.body, {
      status: 200,
      hits: {
        hits: [
          { _source: { four: 'four' } },
          { _source: { five: 'five' } },
          { _source: { six: 'six' } }
        ]
      }
    })
  })

  setImmediate(() => s.stop())
})

test('Stop a msearch processor (promises)', async t => {
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {}
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const s = client.helpers.msearch({ operations: 1 })

  s.stop()

  try {
    await s.search(
      { index: 'test' },
      { query: { match: { foo: 'bar' } } }
    )
  } catch (err) {
    t.strictEqual(err.message, 'The msearch processor has been stopped')
  }

  t.teardown(() => s.stop())
})

test('Stop a msearch processor (callbacks)', t => {
  t.plan(1)

  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {}
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const s = client.helpers.msearch()

  s.stop()

  s.search({ index: 'test' }, { query: { match: { foo: 'bar' } } }, (err, result) => {
    t.strictEqual(err.message, 'The msearch processor has been stopped')
  })
})

test('Bad header', t => {
  t.plan(1)

  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {}
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const s = client.helpers.msearch()

  s.search(null, { query: { match: { foo: 'bar' } } }, (err, result) => {
    t.strictEqual(err.message, 'The header should be an object')
  })

  t.teardown(() => s.stop())
})

test('Bad body', t => {
  t.plan(1)

  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {}
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const s = client.helpers.msearch()

  s.search({ index: 'test' }, null, (err, result) => {
    t.strictEqual(err.message, 'The body should be an object')
  })

  t.teardown(() => s.stop())
})

test('Retry on 429', async t => {
  let count = 0
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      if (count++ === 0) {
        return {
          body: {
            responses: [{
              status: 429,
              error: {}
            }]
          }
        }
      } else {
        return {
          body: {
            responses: [{
              status: 200,
              hits: {
                hits: [
                  { _source: { one: 'one' } },
                  { _source: { two: 'two' } },
                  { _source: { three: 'three' } }
                ]
              }
            }]
          }
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const s = client.helpers.msearch({ operations: 1, wait: 10 })

  const result = await s.search(
    { index: 'test' },
    { query: { match: { foo: 'bar' } } }
  )

  t.deepEqual(result.body, {
    status: 200,
    hits: {
      hits: [
        { _source: { one: 'one' } },
        { _source: { two: 'two' } },
        { _source: { three: 'three' } }
      ]
    }
  })

  t.teardown(() => s.stop())
})

test('Single search errors', async t => {
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {
        body: {
          responses: [{
            status: 400,
            error: { foo: 'bar' }
          }]
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const s = client.helpers.msearch({ operations: 1 })

  try {
    await s.search(
      { index: 'test' },
      { query: { match: { foo: 'bar' } } }
    )
  } catch (err) {
    t.true(err instanceof errors.ResponseError)
  }

  t.teardown(() => s.stop())
})

test('Entire msearch fails', t => {
  t.plan(2)

  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 500,
        body: {
          status: 500,
          error: { foo: 'bar' }
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const s = client.helpers.msearch({ operations: 1 })

  s.search({ index: 'test' }, { query: {} }, (err, result) => {
    t.true(err instanceof errors.ResponseError)
  })

  s.search({ index: 'test' }, { query: {} }, (err, result) => {
    t.true(err instanceof errors.ResponseError)
  })

  t.teardown(() => s.stop())
})

test('Resolves the msearch helper', t => {
  t.plan(1)

  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {}
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const s = client.helpers.msearch()

  s.stop()

  s.then(
    () => t.pass('called'),
    e => t.fail('Should not fail')
  )

  s.catch(e => t.fail('Should not fail'))
})

test('Stop the msearch helper with an error', t => {
  t.plan(2)

  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {}
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const s = client.helpers.msearch()

  s.stop(new Error('kaboom'))

  s.then(
    () => t.fail('Should fail'),
    err => t.is(err.message, 'kaboom')
  )

  s.catch(err => t.is(err.message, 'kaboom'))
})

test('Multiple searches (concurrency = 1)', t => {
  t.plan(4)

  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {
        body: {
          responses: [{
            status: 200,
            hits: {
              hits: [
                { _source: { one: 'one' } },
                { _source: { two: 'two' } },
                { _source: { three: 'three' } }
              ]
            }
          }]
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const s = client.helpers.msearch({ operations: 1, concurrency: 1 })

  s.search({ index: 'test' }, { query: {} }, (err, result) => {
    t.error(err)
    t.deepEqual(result.body, {
      status: 200,
      hits: {
        hits: [
          { _source: { one: 'one' } },
          { _source: { two: 'two' } },
          { _source: { three: 'three' } }
        ]
      }
    })
  })

  s.search({ index: 'test' }, { query: {} }, (err, result) => {
    t.error(err)
    t.deepEqual(result.body, {
      status: 200,
      hits: {
        hits: [
          { _source: { one: 'one' } },
          { _source: { two: 'two' } },
          { _source: { three: 'three' } }
        ]
      }
    })
  })

  t.teardown(() => s.stop())
})
