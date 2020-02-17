'use strict'

const { test } = require('tap')
const { Client } = require('../../../')
const { connection } = require('../../utils')

test('Search should have an additional documents property', async t => {
  const MockConnection = connection.buildMockConnection({
    body: {
      hits: {
        hits: [
          { _source: { one: 'one' } },
          { _source: { two: 'two' } },
          { _source: { three: 'three' } }
        ]
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const result = await client.helpers.search({
    index: 'test',
    body: { foo: 'bar' }
  })
  t.ok(result.body !== undefined)
  t.ok(result.statusCode !== undefined)
  t.ok(result.headers !== undefined)
  t.ok(result.warnings !== undefined)
  t.deepEqual(result.documents, [
    { one: 'one' },
    { two: 'two' },
    { three: 'three' }
  ])
})
