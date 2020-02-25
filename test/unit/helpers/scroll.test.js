'use strict'

const { test } = require('tap')
const { Client } = require('../../../')
const { connection } = require('../../utils')

test('Scroll search', async t => {
  var count = 0
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {
        body: {
          _scroll_id: count === 3 ? undefined : 'id',
          count,
          hits: {
            hits: [
              { _source: { one: 'one' } },
              { _source: { two: 'two' } },
              { _source: { three: 'three' } }
            ]
          }
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const scrollSearch = client.helpers.scrollSearch({
    index: 'test',
    body: { foo: 'bar' }
  })

  for await (const result of scrollSearch) {
    t.strictEqual(result.body.count, count)
    if (count < 3) {
      t.strictEqual(result.body._scroll_id, 'id')
    } else {
      t.strictEqual(result.body._scroll_id, undefined)
    }
    count += 1
  }
})

test('Clear a scroll search', async t => {
  var count = 0
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      if (params.method === 'DELETE') {
        const body = JSON.parse(params.body)
        t.strictEqual(body.scroll_id, 'id')
      }
      return {
        body: {
          _scroll_id: count === 3 ? undefined : 'id',
          count,
          hits: {
            hits: [
              { _source: { one: 'one' } },
              { _source: { two: 'two' } },
              { _source: { three: 'three' } }
            ]
          }
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const scrollSearch = client.helpers.scrollSearch({
    index: 'test',
    body: { foo: 'bar' }
  })

  for await (const result of scrollSearch) {
    if (count === 2) {
      t.fail('The scroll search should be cleared')
    }
    t.strictEqual(result.body.count, count)
    if (count === 1) {
      await result.clear()
    }
    count += 1
  }
})

test('Scroll search documents', async t => {
  var count = 0
  const MockConnection = connection.buildMockConnection({
    onRequest (params) {
      return {
        body: {
          _scroll_id: count === 3 ? undefined : 'id',
          count,
          hits: {
            hits: [
              { _source: { val: 1 * count } },
              { _source: { val: 2 * count } },
              { _source: { val: 3 * count } }
            ]
          }
        }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  const scrollSearch = client.helpers.scrollDocuments({
    index: 'test',
    body: { foo: 'bar' }
  })

  let n = 1
  for await (const hit of scrollSearch) {
    t.deepEqual(hit, { val: n * count })
    n += 1
    if (n === 4) {
      count += 1
      n = 1
    }
  }
})
