'use strict'

const { createReadStream } = require('fs')
const { join } = require('path')
const split = require('split2')
const { test } = require('tap')
const { Client, errors } = require('../../../')
const { buildServer, connection } = require('../../utils')

const dataset = [
  { user: 'jon', age: 23 },
  { user: 'arya', age: 18 },
  { user: 'tyrion', age: 39 }
]

test('bulk index', t => {
  t.test('datasource as array', t => {
    t.test('Should perform a bulk request', async t => {
      let count = 0
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          t.strictEqual(params.path, '/_bulk')
          t.match(params.headers, { 'Content-Type': 'application/x-ndjson' })
          const [action, payload] = params.body.split('\n')
          t.deepEqual(JSON.parse(action), { index: { _index: 'test' } })
          t.deepEqual(JSON.parse(payload), dataset[count++])
          return { body: { errors: false, items: [{}] } }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      const b = client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 1
      })

      b.onDrop(doc => {
        t.fail('This should never be called')
      })

      const result = await b.index({ _index: 'test' })
      t.type(result.time, 'number')
      t.match(result, {
        total: 3,
        successful: 3,
        retry: 0,
        failed: 0,
        aborted: false
      })
    })

    t.test('Should perform a bulk request (with concurrency)', async t => {
      let count = 0
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          t.strictEqual(params.path, '/_bulk')
          t.match(params.headers, { 'Content-Type': 'application/x-ndjson' })
          const [action, payload] = params.body.split('\n')
          t.deepEqual(JSON.parse(action), { index: { _index: 'test' } })
          t.deepEqual(JSON.parse(payload), dataset[count++])
          return { body: { errors: false, items: [{}] } }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      const b = client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 3
      })

      b.onDrop(doc => {
        t.fail('This should never be called')
      })

      const result = await b.index({ _index: 'test' })
      t.type(result.time, 'number')
      t.match(result, {
        total: 3,
        successful: 3,
        retry: 0,
        failed: 0,
        aborted: false
      })
    })

    t.test('Should perform a bulk request (high flush size)', async t => {
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          t.strictEqual(params.path, '/_bulk')
          t.match(params.headers, { 'Content-Type': 'application/x-ndjson' })
          t.strictEqual(params.body.split('\n').filter(Boolean).length, 6)
          return { body: { errors: false, items: new Array(3).fill({}) } }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      const b = client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 5000000,
        concurrency: 1
      })

      b.onDrop(doc => {
        t.fail('This should never be called')
      })

      const result = await b.index({ _index: 'test' })
      t.type(result.time, 'number')
      t.match(result, {
        total: 3,
        successful: 3,
        retry: 0,
        failed: 0,
        aborted: false
      })
    })

    t.test('Should perform a bulk request (custom action)', async t => {
      let count = 0
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          t.strictEqual(params.path, '/_bulk')
          t.match(params.headers, { 'Content-Type': 'application/x-ndjson' })
          const [action, payload] = params.body.split('\n')
          t.deepEqual(JSON.parse(action), { index: { _index: 'test', _id: count } })
          t.deepEqual(JSON.parse(payload), dataset[count++])
          return { body: { errors: false, items: [{}] } }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      const b = client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 1
      })

      b.onDrop(doc => {
        t.fail('This should never be called')
      })

      let id = 0
      const result = await b.index({ _index: 'test' }, doc => ({ _id: id++ }))
      t.type(result.time, 'number')
      t.match(result, {
        total: 3,
        successful: 3,
        retry: 0,
        failed: 0,
        aborted: false
      })
    })

    t.test('Should perform a bulk request (retry)', async t => {
      async function handler (req, res) {
        t.strictEqual(req.url, '/_bulk')
        t.match(req.headers, { 'content-type': 'application/x-ndjson' })

        let body = ''
        req.setEncoding('utf8')
        for await (const chunk of req) {
          body += chunk
        }
        const [, payload] = body.split('\n')

        res.setHeader('content-type', 'application/json')

        if (JSON.parse(payload).user === 'arya') {
          res.end(JSON.stringify({
            took: 0,
            errors: true,
            items: [{
              index: {
                status: 429
              }
            }]
          }))
        } else {
          res.end(JSON.stringify({
            took: 0,
            errors: false,
            items: [{}]
          }))
        }
      }

      const [{ port }, server] = await buildServer(handler)
      const client = new Client({ node: `http://localhost:${port}` })
      const b = client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 1,
        wait: 10,
        retries: 1
      })

      b.onDrop(doc => {
        t.deepEqual(doc, {
          status: 429,
          error: null,
          operation: { index: { _index: 'test' } },
          document: { user: 'arya', age: 18 },
          retried: true
        })
      })

      const result = await b.index({ _index: 'test' })
      t.type(result.time, 'number')
      t.type(result.bytes, 'number')
      t.match(result, {
        total: 3,
        successful: 2,
        retry: 2,
        failed: 1,
        aborted: false
      })
      server.stop()
    })

    t.test('Should perform a bulk request (failure)', async t => {
      async function handler (req, res) {
        t.strictEqual(req.url, '/_bulk')
        t.match(req.headers, { 'content-type': 'application/x-ndjson' })

        let body = ''
        req.setEncoding('utf8')
        for await (const chunk of req) {
          body += chunk
        }
        const [, payload] = body.split('\n')

        res.setHeader('content-type', 'application/json')

        if (JSON.parse(payload).user === 'arya') {
          res.end(JSON.stringify({
            took: 0,
            errors: true,
            items: [{
              index: {
                status: 400,
                error: { something: 'went wrong' }
              }
            }]
          }))
        } else {
          res.end(JSON.stringify({
            took: 0,
            errors: false,
            items: [{}]
          }))
        }
      }

      const [{ port }, server] = await buildServer(handler)
      const client = new Client({ node: `http://localhost:${port}` })
      const b = client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 1,
        wait: 10
      })

      b.onDrop(doc => {
        t.deepEqual(doc, {
          status: 400,
          error: { something: 'went wrong' },
          operation: { index: { _index: 'test' } },
          document: { user: 'arya', age: 18 },
          retried: false
        })
      })

      const result = await b.index({ _index: 'test' })
      t.type(result.time, 'number')
      t.match(result, {
        total: 3,
        successful: 2,
        retry: 0,
        failed: 1,
        aborted: false
      })
      server.stop()
    })

    t.test('Server error', async t => {
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          return {
            statusCode: 500,
            body: { somothing: 'went wrong' }
          }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      const b = client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 1
      })

      b.onDrop(doc => {
        t.fail('This should never be called')
      })

      try {
        await b.index({ _index: 'test' })
        t.fail('Should throw')
      } catch (err) {
        t.true(err instanceof errors.ResponseError)
      }
    })

    t.test('Server error (high flush size, to trigger the finish error)', async t => {
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          return {
            statusCode: 500,
            body: { somothing: 'went wrong' }
          }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      const b = client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 5000000,
        concurrency: 1
      })

      b.onDrop(doc => {
        t.fail('This should never be called')
      })

      try {
        await b.index({ _index: 'test' })
        t.fail('Should throw')
      } catch (err) {
        t.true(err instanceof errors.ResponseError)
      }
    })

    t.test('Should abort a bulk request', async t => {
      async function handler (req, res) {
        t.strictEqual(req.url, '/_bulk')
        t.match(req.headers, { 'content-type': 'application/x-ndjson' })

        let body = ''
        req.setEncoding('utf8')
        for await (const chunk of req) {
          body += chunk
        }
        const [, payload] = body.split('\n')

        res.setHeader('content-type', 'application/json')

        if (JSON.parse(payload).user === 'arya') {
          res.end(JSON.stringify({
            took: 0,
            errors: true,
            items: [{
              index: {
                status: 400,
                error: { something: 'went wrong' }
              }
            }]
          }))
        } else {
          res.end(JSON.stringify({
            took: 0,
            errors: false,
            items: [{}]
          }))
        }
      }

      const [{ port }, server] = await buildServer(handler)
      const client = new Client({ node: `http://localhost:${port}` })
      const b = client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 1,
        wait: 10
      })

      b.onDrop(doc => {
        b.abort()
      })

      const result = await b.index({ _index: 'test' })
      t.type(result.time, 'number')
      t.match(result, {
        total: 2,
        successful: 1,
        retry: 0,
        failed: 1,
        aborted: true
      })
      server.stop()
    })

    t.end()
  })

  t.test('datasource as stream', t => {
    t.test('Should perform a bulk request', async t => {
      let count = 0
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          t.strictEqual(params.path, '/_bulk')
          t.match(params.headers, { 'Content-Type': 'application/x-ndjson' })
          const [action, payload] = params.body.split('\n')
          t.deepEqual(JSON.parse(action), { index: { _index: 'test', _id: count } })
          t.deepEqual(JSON.parse(payload), dataset[count++])
          return { body: { errors: false, items: [{}] } }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      const stream = createReadStream(join(__dirname, '..', '..', 'fixtures', 'small-dataset.ndjson'), 'utf8')
      const b = client.helpers.bulk({
        datasource: stream.pipe(split()),
        flushBytes: 1,
        concurrency: 1
      })

      b.onDrop(doc => {
        t.fail('This should never be called')
      })

      let id = 0
      const result = await b.index({ _index: 'test' }, doc => ({ _id: id++ }))
      t.type(result.time, 'number')
      t.match(result, {
        total: 3,
        successful: 3,
        retry: 0,
        failed: 0,
        aborted: false
      })
    })

    t.end()
  })

  t.end()
})

test('bulk create', t => {
  t.test('Should perform a bulk request', async t => {
    let count = 0
    const MockConnection = connection.buildMockConnection({
      onRequest (params) {
        t.strictEqual(params.path, '/_bulk')
        t.match(params.headers, { 'Content-Type': 'application/x-ndjson' })
        const [action, payload] = params.body.split('\n')
        t.deepEqual(JSON.parse(action), { create: { _index: 'test', _id: count } })
        t.deepEqual(JSON.parse(payload), dataset[count++])
        return { body: { errors: false, items: [{}] } }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })
    const b = client.helpers.bulk({
      datasource: dataset.slice(),
      flushBytes: 1,
      concurrency: 1
    })

    b.onDrop(doc => {
      t.fail('This should never be called')
    })

    let id = 0
    const result = await b.create({ _index: 'test' }, doc => ({ _id: id++ }))
    t.type(result.time, 'number')
    t.match(result, {
      total: 3,
      successful: 3,
      retry: 0,
      failed: 0,
      aborted: false
    })
  })
  t.end()
})

test('bulk update', t => {
  t.test('Should perform a bulk request', async t => {
    let count = 0
    const MockConnection = connection.buildMockConnection({
      onRequest (params) {
        t.strictEqual(params.path, '/_bulk')
        t.match(params.headers, { 'Content-Type': 'application/x-ndjson' })
        const [action, payload] = params.body.split('\n')
        t.deepEqual(JSON.parse(action), { update: { _index: 'test', _id: count } })
        t.deepEqual(JSON.parse(payload), { doc: dataset[count++], doc_as_upsert: true })
        return { body: { errors: false, items: [{}] } }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })
    const b = client.helpers.bulk({
      datasource: dataset.slice(),
      flushBytes: 1,
      concurrency: 1
    })

    b.onDrop(doc => {
      t.fail('This should never be called')
    })

    let id = 0
    const result = await b.update({ _index: 'test' }, doc => {
      return [{ _id: id++ }, { doc_as_upsert: true }]
    })
    t.type(result.time, 'number')
    t.match(result, {
      total: 3,
      successful: 3,
      retry: 0,
      failed: 0,
      aborted: false
    })
  })
  t.end()
})

test('bulk delete', t => {
  t.test('Should perform a bulk request', async t => {
    let count = 0
    const MockConnection = connection.buildMockConnection({
      onRequest (params) {
        t.strictEqual(params.path, '/_bulk')
        t.match(params.headers, { 'Content-Type': 'application/x-ndjson' })
        t.deepEqual(JSON.parse(params.body), { delete: { _index: 'test', _id: count++ } })
        return { body: { errors: false, items: [{}] } }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })
    const b = client.helpers.bulk({
      datasource: dataset.slice(),
      flushBytes: 1,
      concurrency: 1
    })

    b.onDrop(doc => {
      t.fail('This should never be called')
    })

    let id = 0
    const result = await b.delete({ _index: 'test' }, doc => ({ _id: id++ }))
    t.type(result.time, 'number')
    t.match(result, {
      total: 3,
      successful: 3,
      retry: 0,
      failed: 0,
      aborted: false
    })
  })

  t.test('Should perform a bulk request (failure)', async t => {
    async function handler (req, res) {
      t.strictEqual(req.url, '/_bulk')
      t.match(req.headers, { 'content-type': 'application/x-ndjson' })

      let body = ''
      req.setEncoding('utf8')
      for await (const chunk of req) {
        body += chunk
      }

      res.setHeader('content-type', 'application/json')

      if (JSON.parse(body).delete._id === 1) {
        res.end(JSON.stringify({
          took: 0,
          errors: true,
          items: [{
            delete: {
              status: 400,
              error: { something: 'went wrong' }
            }
          }]
        }))
      } else {
        res.end(JSON.stringify({
          took: 0,
          errors: false,
          items: [{}]
        }))
      }
    }

    const [{ port }, server] = await buildServer(handler)
    const client = new Client({ node: `http://localhost:${port}` })
    const b = client.helpers.bulk({
      datasource: dataset.slice(),
      flushBytes: 1,
      concurrency: 1,
      wait: 10
    })

    b.onDrop(doc => {
      t.deepEqual(doc, {
        status: 400,
        error: { something: 'went wrong' },
        operation: { delete: { _index: 'test', _id: 1 } },
        document: null,
        retried: false
      })
    })

    let id = 0
    const result = await b.delete({ _index: 'test' }, doc => {
      return { _id: id++ }
    })
    t.type(result.time, 'number')
    t.match(result, {
      total: 3,
      successful: 2,
      retry: 0,
      failed: 1,
      aborted: false
    })
    server.stop()
  })

  t.end()
})
