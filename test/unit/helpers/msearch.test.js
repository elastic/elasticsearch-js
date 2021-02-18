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
const { Client, errors } = require('../../../')
const { connection } = require('../../utils')
const FakeTimers = require('@sinonjs/fake-timers')

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

  const m = client.helpers.msearch({ operations: 1 })

  const result = await m.search(
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

  t.deepEqual(result.documents, [
    { one: 'one' },
    { two: 'two' },
    { three: 'three' }
  ])

  t.teardown(() => m.stop())
})

test('Multiple searches (inside async iterator)', t => {
  t.plan(6)

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

  const m = client.helpers.msearch({ operations: 2 })

  m.search({ index: 'test' }, { query: { match: { foo: 'bar' } } }, (err, result) => {
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

    t.deepEqual(result.documents, [
      { one: 'one' },
      { two: 'two' },
      { three: 'three' }
    ])
  })

  m.search({ index: 'test' }, { query: { match: { foo: 'bar' } } }, (err, result) => {
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

    t.deepEqual(result.documents, [
      { four: 'four' },
      { five: 'five' },
      { six: 'six' }
    ])
  })

  t.teardown(() => m.stop())
})

test('Multiple searches (async iterator exits)', t => {
  t.plan(6)

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

  const m = client.helpers.msearch()

  m.search({ index: 'test' }, { query: {} }, (err, result) => {
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

    t.deepEqual(result.documents, [
      { one: 'one' },
      { two: 'two' },
      { three: 'three' }
    ])
  })

  m.search({ index: 'test' }, { query: { match: { foo: 'bar' } } }, (err, result) => {
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

    t.deepEqual(result.documents, [
      { four: 'four' },
      { five: 'five' },
      { six: 'six' }
    ])
  })

  setImmediate(() => m.stop())
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

  const m = client.helpers.msearch({ operations: 1 })

  m.stop()

  try {
    await m.search(
      { index: 'test' },
      { query: { match: { foo: 'bar' } } }
    )
  } catch (err) {
    t.strictEqual(err.message, 'The msearch processor has been stopped')
  }

  t.teardown(() => m.stop())
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

  const m = client.helpers.msearch()

  m.stop()

  m.search({ index: 'test' }, { query: { match: { foo: 'bar' } } }, (err, result) => {
    t.strictEqual(err.message, 'The msearch processor has been stopped')
  })
})

test('Bad header', t => {
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

  const m = client.helpers.msearch()

  m.search(null, { query: { match: { foo: 'bar' } } }, (err, result) => {
    t.strictEqual(err.message, 'The header should be an object')
  })

  m.search(null, { query: { match: { foo: 'bar' } } })
    .catch(err => {
      t.strictEqual(err.message, 'The header should be an object')
    })

  t.teardown(() => m.stop())
})

test('Bad body', t => {
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

  const m = client.helpers.msearch()

  m.search({ index: 'test' }, null, (err, result) => {
    t.strictEqual(err.message, 'The body should be an object')
  })

  m.search({ index: 'test' }, null)
    .catch(err => {
      t.strictEqual(err.message, 'The body should be an object')
    })

  t.teardown(() => m.stop())
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

  const m = client.helpers.msearch({ operations: 1, wait: 10 })

  const result = await m.search(
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

  t.deepEqual(result.documents, [
    { one: 'one' },
    { two: 'two' },
    { three: 'three' }
  ])

  t.teardown(() => m.stop())
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

  const m = client.helpers.msearch({ operations: 1 })

  try {
    await m.search(
      { index: 'test' },
      { query: { match: { foo: 'bar' } } }
    )
  } catch (err) {
    t.true(err instanceof errors.ResponseError)
  }

  t.teardown(() => m.stop())
})

test('Entire msearch fails', t => {
  t.plan(4)

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

  const m = client.helpers.msearch({ operations: 1 })

  m.search({ index: 'test' }, { query: {} }, (err, result) => {
    t.true(err instanceof errors.ResponseError)
    t.deepEqual(result.documents, [])
  })

  m.search({ index: 'test' }, { query: {} }, (err, result) => {
    t.true(err instanceof errors.ResponseError)
    t.deepEqual(result.documents, [])
  })

  t.teardown(() => m.stop())
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

  const m = client.helpers.msearch()

  m.stop()

  m.then(
    () => t.pass('called'),
    e => t.fail('Should not fail')
  )

  m.catch(e => t.fail('Should not fail'))
})

test('Stop the msearch helper with an error', t => {
  t.plan(3)

  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {}
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const m = client.helpers.msearch()

  m.stop(new Error('kaboom'))

  m.then(
    () => t.fail('Should fail'),
    err => t.is(err.message, 'kaboom')
  )

  m.catch(err => t.is(err.message, 'kaboom'))

  m.search({ index: 'test' }, { query: {} }, (err, result) => {
    t.is(err.message, 'kaboom')
  })
})

test('Multiple searches (concurrency = 1)', t => {
  t.plan(6)

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

  const m = client.helpers.msearch({ operations: 1, concurrency: 1 })

  m.search({ index: 'test' }, { query: {} }, (err, result) => {
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

    t.deepEqual(result.documents, [
      { one: 'one' },
      { two: 'two' },
      { three: 'three' }
    ])
  })

  m.search({ index: 'test' }, { query: {} }, (err, result) => {
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

    t.deepEqual(result.documents, [
      { one: 'one' },
      { two: 'two' },
      { three: 'three' }
    ])
  })

  t.teardown(() => m.stop())
})

test('Flush interval', t => {
  t.plan(4)
  const clock = FakeTimers.install({ toFake: ['setTimeout', 'clearTimeout'] })
  t.teardown(() => clock.uninstall())

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

  const m = client.helpers.msearch()

  m.search({ index: 'test' }, { query: { match: { foo: 'bar' } } }, (err, result) => {
    t.error(err)
    t.is(result.documents.length, 3)
  })

  m.search({ index: 'test' }, { query: { match: { foo: 'bar' } } }, (err, result) => {
    t.error(err)
    t.is(result.documents.length, 3)
  })

  setImmediate(clock.next)

  t.teardown(() => m.stop())
})

test('Flush interval - early stop', t => {
  t.plan(3)

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

  const m = client.helpers.msearch()

  m.search({ index: 'test' }, { query: { match: { foo: 'bar' } } }, (err, result) => {
    t.error(err)
    t.is(result.documents.length, 3)
  })

  setImmediate(() => {
    m.search({ index: 'test' }, { query: { match: { foo: 'bar' } } }, (err, result) => {
      t.ok(err instanceof errors.ConfigurationError)
    })
  })

  m.stop()
})

test('Stop should resolve the helper', t => {
  t.plan(1)

  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {
        body: {
          responses: []
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const m = client.helpers.msearch()
  setImmediate(m.stop)

  m.then(() => t.pass('Called'))
    .catch(() => t.fail('Should not fail'))
})

test('Stop should resolve the helper (error)', t => {
  t.plan(3)

  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {
        body: {
          responses: []
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const m = client.helpers.msearch()
  setImmediate(m.stop, new Error('kaboom'))

  m.then(() => t.fail('Should not fail'))
    .catch(err => t.is(err.message, 'kaboom'))

  m.catch(err => t.is(err.message, 'kaboom'))

  m.then(() => t.fail('Should not fail'), err => t.is(err.message, 'kaboom'))
})

test('Should use req options', async t => {
  t.plan(1)

  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      t.match(params.headers, {
        foo: 'bar'
      })

      return {
        body: {
          responses: [{
            status: 200,
            hits: { hits: [] }
          }]
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const m = client.helpers.msearch({ operations: 1 }, {
    headers: {
      foo: 'bar'
    }
  })

  await m.search(
    { index: 'test' },
    { query: { match: { foo: 'bar' } } }
  )

  t.teardown(() => m.stop())
})
