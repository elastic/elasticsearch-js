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

import FakeTimers from '@sinonjs/fake-timers'
import { AssertionError } from 'node:assert'
import { createReadStream } from 'node:fs'
import * as http from 'node:http'
import { join } from 'node:path'
import split from 'split2'
import { Readable } from 'node:stream'
import { test } from 'tap'
import { Client, errors } from '../../../'
import { buildServer, connection } from '../../utils'
const { sleep } = require('../../integration/helper')

let clientVersion: string = require('../../../package.json').version // eslint-disable-line
if (clientVersion.includes('-')) {
  clientVersion = clientVersion.slice(0, clientVersion.indexOf('-')) + 'p'
}
let transportVersion: string = require('@elastic/transport/package.json').version // eslint-disable-line
if (transportVersion.includes('-')) {
  transportVersion = transportVersion.slice(0, transportVersion.indexOf('-')) + 'p'
}
const nodeVersion = process.versions.node

const dataset = [
  { user: 'jon', age: 23 },
  { user: 'arya', age: 18 },
  { user: 'tyrion', age: 39 }
]

interface Document {
  user: string
  age: number
}

test('bulk index', t => {
  t.test('datasource as array', t => {
    t.test('Should perform a bulk request', async t => {
      let count = 0
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          t.equal(params.path, '/_bulk')
          t.match(params.headers, {
            'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8',
            'x-elastic-client-meta': `es=${clientVersion},js=${nodeVersion},t=${transportVersion},hc=${nodeVersion},h=bp`
          })
          // @ts-expect-error
          const [action, payload] = params.body.split('\n')
          t.same(JSON.parse(action), { index: { _index: 'test' } })
          t.same(JSON.parse(payload), dataset[count++])
          return { body: { errors: false, items: [{}] } }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      const result = await client.helpers.bulk<Document>({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 1,
        onDocument (doc) {
          t.type(doc.user, 'string') // testing that doc is type of Document
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

    t.test('Should perform a bulk request (with concurrency)', async t => {
      let count = 0
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          t.equal(params.path, '/_bulk')
          t.match(params.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })
          t.notMatch(params.headers, {
            'x-elastic-client-meta': `es=${clientVersion},js=${nodeVersion},t=${transportVersion},hc=${nodeVersion},h=bp`
          })
          // @ts-expect-error
          const [action, payload] = params.body.split('\n')
          t.same(JSON.parse(action), { index: { _index: 'test' } })
          t.same(JSON.parse(payload), dataset[count++])
          return { body: { errors: false, items: [{}] } }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection,
        enableMetaHeader: false
      })
      const result = await client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 3,
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

    t.test('Should perform a bulk request (high flush size)', async t => {
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          t.equal(params.path, '/_bulk')
          t.match(params.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })
          // @ts-expect-error
          t.equal(params.body.split('\n').filter(Boolean).length, 6)
          return { body: { errors: false, items: new Array(3).fill({}) } }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      const result = await client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 5000000,
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

    t.test('refreshOnCompletion', async t => {
      let count = 0
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          if (params.method === 'GET') {
            t.equal(params.path, '/_all/_refresh')
            return { body: { acknowledged: true } }
          } else {
            t.equal(params.path, '/_bulk')
            t.match(params.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })
            // @ts-expect-error
            const [action, payload] = params.body.split('\n')
            t.same(JSON.parse(action), { index: { _index: 'test' } })
            t.same(JSON.parse(payload), dataset[count++])
            return { body: { errors: false, items: [{}] } }
          }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      const result = await client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 1,
        refreshOnCompletion: true,
        onDocument (doc) {
          return {
            index: { _index: 'test' }
          }
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

    t.test('refreshOnCompletion custom index', async t => {
      let count = 0
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          if (params.method === 'GET') {
            t.equal(params.path, '/test/_refresh')
            return { body: { acknowledged: true } }
          } else {
            t.equal(params.path, '/_bulk')
            t.match(params.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })
            // @ts-expect-error
            const [action, payload] = params.body.split('\n')
            t.same(JSON.parse(action), { index: { _index: 'test' } })
            t.same(JSON.parse(payload), dataset[count++])
            return { body: { errors: false, items: [{}] } }
          }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      const result = await client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 1,
        refreshOnCompletion: 'test',
        onDocument (doc) {
          return {
            index: { _index: 'test' }
          }
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

    t.test('Should perform a bulk request (custom action)', async t => {
      let count = 0
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          t.equal(params.path, '/_bulk')
          t.match(params.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })
          // @ts-expect-error
          const [action, payload] = params.body.split('\n')
          t.same(JSON.parse(action), { index: { _index: 'test', _id: count } })
          t.same(JSON.parse(payload), dataset[count++])
          return { body: { errors: false, items: [{}] } }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      let id = 0
      const result = await client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 1,
        onDocument (doc) {
          return {
            index: {
              _index: 'test',
              _id: String(id++)
            }
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

    t.test('Should perform a bulk request (retry)', async t => {
      async function handler (req: http.IncomingMessage, res: http.ServerResponse) {
        t.equal(req.url, '/_bulk')
        t.match(req.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })

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
      const result = await client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 1,
        wait: 10,
        retries: 1,
        onDocument (doc) {
          return {
            index: { _index: 'test' }
          }
        },
        onDrop (doc) {
          t.same(doc, {
            status: 429,
            error: null,
            operation: { index: { _index: 'test' } },
            document: { user: 'arya', age: 18 },
            retried: true
          })
        }
      })

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

    t.test('Should perform a bulk request (retry a single document from batch)', async t => {
      function handler (req: http.IncomingMessage, res: http.ServerResponse) {
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({
          took: 0,
          errors: true,
          items: [
            { index: { status: 200 } },
            { index: { status: 429 } },
            { index: { status: 200 } }
          ]
        }))
      }

      const [{ port }, server] = await buildServer(handler)
      const client = new Client({ node: `http://localhost:${port}` })
      const result = await client.helpers.bulk({
        datasource: dataset.slice(),
        concurrency: 1,
        wait: 10,
        retries: 0,
        onDocument (doc) {
          return {
            index: { _index: 'test' }
          }
        },
        onDrop (doc) {
          t.same(doc, {
            status: 429,
            error: null,
            operation: { index: { _index: 'test' } },
            document: { user: 'arya', age: 18 },
            retried: false
          })
        }
      })

      t.type(result.time, 'number')
      t.type(result.bytes, 'number')
      t.match(result, {
        total: 3,
        successful: 2,
        retry: 0,
        failed: 1,
        aborted: false
      })
      server.stop()
    })

    t.test('Should perform a bulk request (failure)', async t => {
      async function handler (req: http.IncomingMessage, res: http.ServerResponse) {
        t.equal(req.url, '/_bulk')
        t.match(req.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })

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
      const result = await client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 1,
        wait: 10,
        onDocument (doc) {
          return {
            index: { _index: 'test' }
          }
        },
        onDrop (doc) {
          t.same(doc, {
            status: 400,
            error: { something: 'went wrong' },
            operation: { index: { _index: 'test' } },
            document: { user: 'arya', age: 18 },
            retried: false
          })
        }
      })

      t.type(result.time, 'number')
      t.type(result.bytes, 'number')
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
        onRequest (_params) {
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
        concurrency: 1,
        onDocument (_doc) {
          return {
            index: { _index: 'test' }
          }
        },
        onDrop (_doc) {
          t.fail('This should never be called')
        }
      })

      try {
        await b
        t.fail('Should throw')
      } catch (err: any) {
        t.ok(err instanceof errors.ResponseError)
      }
    })

    t.test('Server error (high flush size, to trigger the finish error)', async t => {
      const MockConnection = connection.buildMockConnection({
        onRequest (_params) {
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
        concurrency: 1,
        onDocument (_doc) {
          return {
            index: { _index: 'test' }
          }
        },
        onDrop (_doc) {
          t.fail('This should never be called')
        }
      })

      try {
        await b
        t.fail('Should throw')
      } catch (err: any) {
        t.ok(err instanceof errors.ResponseError)
      }
    })

    t.test('Should abort a bulk request', async t => {
      async function handler (req: http.IncomingMessage, res: http.ServerResponse) {
        t.equal(req.url, '/_bulk')
        t.match(req.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })

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
        wait: 10,
        onDocument (_doc) {
          return {
            index: { _index: 'test' }
          }
        },
        onDrop (_doc) {
          b.abort()
        }
      })

      const result = await b
      t.type(result.time, 'number')
      t.type(result.bytes, 'number')
      t.match(result, {
        total: 2,
        successful: 1,
        retry: 0,
        failed: 1,
        aborted: true
      })
      server.stop()
    })

    t.test('Invalid operation', t => {
      t.plan(2)
      const MockConnection = connection.buildMockConnection({
        onRequest (_params) {
          return { body: { errors: false, items: [{}] } }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      client.helpers
        .bulk({
          datasource: dataset.slice(),
          flushBytes: 1,
          concurrency: 1,
          // @ts-expect-error
          onDocument (_doc) {
            return {
              foo: { _index: 'test' }
            }
          }
        })
        .catch(err => {
          t.ok(err instanceof errors.ConfigurationError)
          t.equal(err.message, 'Bulk helper invalid action: \'foo\'')
        })
    })

    t.test('should call onSuccess callback for each indexed document', async t => {
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          // @ts-expect-error
          let [action] = params.body.split('\n')
          action = JSON.parse(action)
          return { body: { errors: false, items: [action] } }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })

      let count = 0
      await client.helpers.bulk<Document>({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 1,
        onDocument (_doc) {
          return {
            index: { _index: 'test' }
          }
        },
        onSuccess ({ result, document }) {
          t.same(result, { index: { _index: 'test' }})
          t.same(document, dataset[count++])
        },
        onDrop (_doc) {
          t.fail('This should never be called')
        }
      })
      t.equal(count, 3)
      t.end()
    })

    t.end()
  })

  t.test('datasource as stream', t => {
    t.test('Should perform a bulk request', async t => {
      let count = 0
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          t.equal(params.path, '/_bulk')
          t.match(params.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })
          // @ts-expect-error
          const [action, payload] = params.body.split('\n')
          t.same(JSON.parse(action), { index: { _index: 'test', _id: count } })
          t.same(JSON.parse(payload), dataset[count++])
          return { body: { errors: false, items: [{}] } }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      const stream = createReadStream(join(__dirname, '..', '..', 'fixtures', 'small-dataset.ndjson'), 'utf8')

      let id = 0
      const result = await client.helpers.bulk({
        datasource: stream.pipe(split()),
        flushBytes: 1,
        concurrency: 1,
        onDocument (doc) {
          return {
            index: {
              _index: 'test',
              _id: String(id++)
            }
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

    t.test('onSuccess is called for each indexed document', async t => {
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          // @ts-expect-error
          let [action] = params.body.split('\n')
          action = JSON.parse(action)
          return { body: { errors: false, items: [action] } }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })
      const stream = createReadStream(join(__dirname, '..', '..', 'fixtures', 'small-dataset.ndjson'), 'utf8')

      let count = 0
      await client.helpers.bulk<Document>({
        datasource: stream.pipe(split()),
        flushBytes: 1,
        concurrency: 1,
        onDocument (_doc) {
          return {
            index: { _index: 'test' }
          }
        },
        onSuccess ({ result, document }) {
          t.same(result, { index: { _index: 'test' }})
          t.same(document, dataset[count++])
        },
        onDrop (_doc) {
          t.fail('This should never be called')
        }
      })
      t.equal(count, 3)
      t.end()
    })

    t.end()
  })

  t.test('datasource as async generator', t => {
    t.test('Should perform a bulk request', async t => {
      let count = 0
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          t.equal(params.path, '/_bulk')
          t.match(params.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })
          // @ts-expect-error
          const [action, payload] = params.body.split('\n')
          t.same(JSON.parse(action), { index: { _index: 'test' } })
          t.same(JSON.parse(payload), dataset[count++])
          return { body: { errors: false, items: [{}] } }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })

      async function * generator () {
        const data = dataset.slice()
        for (const doc of data) {
          yield doc
        }
      }

      const result = await client.helpers.bulk({
        datasource: generator(),
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

    t.test('onSuccess is called for each indexed document', async t => {
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          // @ts-expect-error
          let [action] = params.body.split('\n')
          action = JSON.parse(action)
          return { body: { errors: false, items: [action] } }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })

      async function * generator () {
        const data = dataset.slice()
        for (const doc of data) {
          yield doc
        }
      }

      let count = 0
      await client.helpers.bulk<Document>({
        datasource: generator(),
        flushBytes: 1,
        concurrency: 1,
        onDocument (_doc) {
          return {
            index: { _index: 'test' }
          }
        },
        onSuccess ({ result, document }) {
          t.same(result, { index: { _index: 'test' }})
          t.same(document, dataset[count++])
        },
        onDrop (_doc) {
          t.fail('This should never be called')
        }
      })
      t.equal(count, 3)
      t.end()
    })
    t.end()
  })

  t.test('Should use payload returned by `onDocument`', async t => {
    let count = 0
    const updatedAt = '1970-01-01T12:00:00.000Z'
    const MockConnection = connection.buildMockConnection({
      onRequest (params) {
        t.equal(params.path, '/_bulk')
        t.match(params.headers, {
          'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8',
          'x-elastic-client-meta': `es=${clientVersion},js=${nodeVersion},t=${transportVersion},hc=${nodeVersion},h=bp`
        })
        // @ts-expect-error
        const [action, payload] = params.body.split('\n')
        t.same(JSON.parse(action), { index: { _index: 'test' } })
        t.same(JSON.parse(payload), { ...dataset[count++], updatedAt })
        return { body: { errors: false, items: [{}] } }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })
    const result = await client.helpers.bulk<Document>({
      datasource: dataset.slice(),
      flushBytes: 1,
      concurrency: 1,
      onDocument (doc) {
        t.type(doc.user, 'string') // testing that doc is type of Document
        return [
          {
            index: {
              _index: 'test'
            }
          },
          { ...doc, updatedAt }
        ]
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

  t.end()
})

test('bulk create', t => {
  t.test('Should perform a bulk request', async t => {
    let count = 0
    const MockConnection = connection.buildMockConnection({
      onRequest (params) {
        t.equal(params.path, '/_bulk')
        t.match(params.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })
        // @ts-expect-error
        const [action, payload] = params.body.split('\n')
        t.same(JSON.parse(action), { create: { _index: 'test', _id: count } })
        t.same(JSON.parse(payload), dataset[count++])
        return { body: { errors: false, items: [{}] } }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })
    let id = 0
    const result = await client.helpers.bulk({
      datasource: dataset.slice(),
      flushBytes: 1,
      concurrency: 1,
      onDocument (doc) {
        return {
          create: {
            _index: 'test',
            _id: String(id++)
          }
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

  t.test('Should use payload returned by `onDocument`', async t => {
    let count = 0
    const updatedAt = '1970-01-01T12:00:00.000Z'
    const MockConnection = connection.buildMockConnection({
      onRequest (params) {
        t.equal(params.path, '/_bulk')
        t.match(params.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })
        // @ts-expect-error
        const [action, payload] = params.body.split('\n')
        t.same(JSON.parse(action), { create: { _index: 'test', _id: count } })
        t.same(JSON.parse(payload), { ...dataset[count++], updatedAt })
        return { body: { errors: false, items: [{}] } }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })
    let id = 0
    const result = await client.helpers.bulk({
      datasource: dataset.slice(),
      flushBytes: 1,
      concurrency: 1,
      onDocument (doc) {
        return [
          {
            create: {
              _index: 'test',
              _id: String(id++)
            }
          },
          { ...doc, updatedAt }
        ]
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



  t.end()
})

test('bulk update', t => {
  t.test('Should perform a bulk request', async t => {
    let count = 0
    const MockConnection = connection.buildMockConnection({
      onRequest (params) {
        t.equal(params.path, '/_bulk')
        t.match(params.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })
        // @ts-expect-error
        const [action, payload] = params.body.split('\n')
        t.same(JSON.parse(action), { update: { _index: 'test', _id: count } })
        t.same(JSON.parse(payload), { doc: dataset[count++], doc_as_upsert: true })
        return { body: { errors: false, items: [{}] } }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })
    let id = 0
    const result = await client.helpers.bulk({
      datasource: dataset.slice(),
      flushBytes: 1,
      concurrency: 1,
      onDocument (doc) {
        return [{
          update: {
            _index: 'test',
            _id: String(id++)
          }
        }, {
          doc_as_upsert: true
        }]
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

  t.test('Should perform a bulk request dataset as string)', async t => {
    let count = 0
    const MockConnection = connection.buildMockConnection({
      onRequest (params) {
        t.equal(params.path, '/_bulk')
        t.match(params.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })
        // @ts-expect-error
        const [action, payload] = params.body.split('\n')
        t.same(JSON.parse(action), { update: { _index: 'test', _id: count } })
        t.same(JSON.parse(payload), { doc: dataset[count++] })
        return { body: { errors: false, items: [{}] } }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })
    let id = 0
    const result = await client.helpers.bulk({
      datasource: dataset.map(d => JSON.stringify(d)),
      flushBytes: 1,
      concurrency: 1,
      onDocument (doc) {
        return [{
          update: {
            _index: 'test',
            _id: String(id++)
          }
        }, {}]
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

  t.test('Should track the number of noop results', async t => {
    let count = 0
    const MockConnection = connection.buildMockConnection({
      onRequest (params) {
        t.equal(params.path, '/_bulk')
        t.match(params.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })
        // @ts-expect-error
        const [action, payload] = params.body.split('\n')
        t.same(JSON.parse(action), { update: { _index: 'test', _id: count } })
        t.same(JSON.parse(payload), { doc: dataset[count++], doc_as_upsert: true })
        return { body: { errors: false, items: [{ update: { result: 'noop' } }] } }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })
    let id = 0
    const result = await client.helpers.bulk({
      datasource: dataset.slice(),
      flushBytes: 1,
      concurrency: 1,
      onDocument (doc) {
        return [{
          update: {
            _index: 'test',
            _id: String(id++)
          }
        }, {
          doc_as_upsert: true
        }]
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
      noop: 3,
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
        t.equal(params.path, '/_bulk')
        t.match(params.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })
        // @ts-expect-error
        t.same(JSON.parse(params.body), { delete: { _index: 'test', _id: count++ } })
        return { body: { errors: false, items: [{}] } }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })
    let id = 0
    const result = await client.helpers.bulk({
      datasource: dataset.slice(),
      flushBytes: 1,
      concurrency: 1,
      onDocument (doc) {
        return {
          delete: {
            _index: 'test',
            _id: String(id++)
          }
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

  t.test('Should perform a bulk request (failure)', async t => {
    async function handler (req: http.IncomingMessage, res: http.ServerResponse) {
      t.equal(req.url, '/_bulk')
      t.match(req.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })

      let body = ''
      req.setEncoding('utf8')
      for await (const chunk of req) {
        body += chunk
      }

      res.setHeader('content-type', 'application/json')

      if (JSON.parse(body).delete._id === '1') {
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
    let id = 0

    const result = await client.helpers.bulk({
      datasource: dataset.slice(),
      flushBytes: 1,
      concurrency: 1,
      wait: 10,
      onDocument (doc) {
        return {
          delete: {
            _index: 'test',
            _id: String(id++)
          }
        }
      },
      onDrop (doc) {
        t.same(doc, {
          status: 400,
          error: { something: 'went wrong' },
          operation: { delete: { _index: 'test', _id: 1 } },
          document: null,
          retried: false
        })
      }
    })

    t.type(result.time, 'number')
    t.type(result.bytes, 'number')
    t.match(result, {
      total: 3,
      successful: 2,
      retry: 0,
      failed: 1,
      aborted: false
    })
    server.stop()
  })

  t.test('Should call onDrop on the correct document when doing a mix of operations that includes deletes', async t => {
    // checks to ensure onDrop doesn't provide the wrong document when some operations are deletes
    // see https://github.com/elastic/elasticsearch-js/issues/1751
    async function handler (req: http.IncomingMessage, res: http.ServerResponse) {
      res.setHeader('content-type', 'application/json')
      res.end(JSON.stringify({
        took: 0,
        errors: true,
        items: [
          { delete: { status: 200 } },
          { index: { status: 429 } },
          { index: { status: 200 } }
        ]
      }))
    }

    const [{ port }, server] = await buildServer(handler)
    const client = new Client({ node: `http://localhost:${port}` })
    let counter = 0
    const result = await client.helpers.bulk({
      datasource: dataset.slice(),
      concurrency: 1,
      wait: 10,
      retries: 0,
      onDocument (doc) {
        counter++
        if (counter === 1) {
          return {
            delete: {
              _index: 'test',
              _id: String(counter)
            }
          }
        } else {
          return {
            index: {
              _index: 'test',
            }
          }
        }
      },
      onDrop (doc) {
        t.same(doc, {
          status: 429,
          error: null,
          operation: { index: { _index: 'test' } },
          document: { user: "arya", age: 18 },
          retried: false,
        })
      }
    })

    t.type(result.time, 'number')
    t.type(result.bytes, 'number')
    t.match(result, {
      total: 3,
      successful: 2,
      retry: 0,
      failed: 1,
      aborted: false
    })
    server.stop()
  })

  t.test('should call onSuccess callback with delete action object', async t => {
    const MockConnection = connection.buildMockConnection({
      onRequest (params) {
        // @ts-expect-error
        let [action, payload] = params.body.split('\n')
        action = JSON.parse(action)
        return { body: { errors: false, items: [action] } }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })

    let docCount = 0
    let successCount = 0
    await client.helpers.bulk<Document>({
      datasource: dataset.slice(),
      flushBytes: 1,
      concurrency: 1,
      onDocument (_doc) {
        if (docCount++ === 1) {
          return {
            delete: {
              _index: 'test',
              _id: String(docCount)
            }
          }
        } else {
          return {
            index: { _index: 'test' }
          }
        }
      },
      onSuccess ({ result, document }) {
        const item = dataset[successCount]
        if (successCount++ === 1) {
          t.same(result, {
            delete: {
              _index: 'test',
              _id: String(successCount)
            }
          })
        } else {
          t.same(result, { index: { _index: 'test' }})
          t.same(document, item)
        }
      },
      onDrop (_doc) {
        t.fail('This should never be called')
      }
    })

    t.end()
  })

  t.end()
})

test('transport options', t => {
  t.test('Should pass transport options in request', async t => {
    let count = 0
    const MockConnection = connection.buildMockConnection({
      onRequest (params) {
        count++

        if (params.path === '/_bulk') {
          t.match(params.headers, {
            'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8',
            foo: 'bar'
          })
          return { body: { errors: false, items: [{}] } }
        }

        t.equal(params.path, '/_all/_refresh')
        t.match(params.headers, {
          foo: 'bar'
        })
        return { body: {} }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })

    const result = await client.helpers.bulk({
      datasource: dataset.slice(),
      flushBytes: 1,
      concurrency: 1,
      onDocument (doc) {
        return { index: { _index: 'test' } }
      },
      onDrop (doc) {
        t.fail('This should never be called')
      },
      refreshOnCompletion: true
    }, {
      headers: {
        foo: 'bar'
      }
    })

    t.equal(count, 4) // three bulk requests, one refresh
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

  t.test('Should not allow asStream request option', async t => {
    t.plan(2)

    const client = new Client({
      node: 'http://localhost:9200',
    })

    try {
      await client.helpers.bulk({
        datasource: dataset.slice(),
        flushBytes: 1,
        concurrency: 1,
        onDocument (doc) {
          return { index: { _index: 'test' } }
        },
        onDrop (doc) {
          t.fail('This should never be called')
        },
        refreshOnCompletion: true
      }, {
        headers: {
          foo: 'bar'
        },
        asStream: true,
      })
    } catch (err: any) {
      t.ok(err instanceof AssertionError)
      t.equal(err.message, 'bulk helper: the asStream request option is not supported')
    }
  })

  t.end()
})

test('errors', t => {
  t.test('datasource type', async t => {
    const client = new Client({
      node: 'http://localhost:9200'
    })
    try {
      await client.helpers.bulk({
        // @ts-expect-error
        datasource: 'hello',
        onDocument (doc) {
          return {
            index: { _index: 'test' }
          }
        }
      })
    } catch (err: any) {
      t.ok(err instanceof errors.ConfigurationError)
      t.equal(err.message, 'bulk helper: the datasource must be an array or a buffer or a readable stream or an async generator')
    }
  })

  t.test('missing datasource', async t => {
    const client = new Client({
      node: 'http://localhost:9200'
    })
    try {
      // @ts-expect-error
      await client.helpers.bulk({
        onDocument (doc) {
          return {
            index: { _index: 'test' }
          }
        }
      })
    } catch (err: any) {
      t.ok(err instanceof errors.ConfigurationError)
      t.equal(err.message, 'bulk helper: the datasource is required')
    }
  })

  t.test('missing onDocument', async t => {
    const client = new Client({
      node: 'http://localhost:9200'
    })
    try {
      // @ts-expect-error
      await client.helpers.bulk({
        datasource: dataset.slice()
      })
    } catch (err: any) {
      t.ok(err instanceof errors.ConfigurationError)
      t.equal(err.message, 'bulk helper: the onDocument callback is required')
    }
  })

  t.end()
})

test('Flush interval', t => {
  t.test('Slow producer', async t => {
    const clock = FakeTimers.install({ toFake: ['setTimeout', 'clearTimeout'] })
    t.teardown(() => clock.uninstall())

    let count = 0
    const MockConnection = connection.buildMockConnection({
      onRequest (params) {
        t.equal(params.path, '/_bulk')
        t.match(params.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })
        // @ts-expect-error
        const [action, payload] = params.body.split('\n')
        t.same(JSON.parse(action), { index: { _index: 'test' } })
        t.same(JSON.parse(payload), dataset[count++])
        return { body: { errors: false, items: [{}] } }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })

    const result = await client.helpers.bulk({
      datasource: (async function * generator () {
        for (const chunk of dataset) {
          await clock.nextAsync()
          yield chunk
        }
      })(),
      flushBytes: 5000000,
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

  t.test('Abort operation', async t => {
    const clock = FakeTimers.install({ toFake: ['setTimeout', 'clearTimeout'] })
    t.teardown(() => clock.uninstall())

    let count = 0
    const MockConnection = connection.buildMockConnection({
      onRequest (params) {
        t.ok(count < 2)
        t.equal(params.path, '/_bulk')
        t.match(params.headers, { 'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8' })
        // @ts-expect-error
        const [action, payload] = params.body.split('\n')
        t.same(JSON.parse(action), { index: { _index: 'test' } })
        t.same(JSON.parse(payload), dataset[count++])
        return { body: { errors: false, items: [{}] } }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
      Connection: MockConnection
    })

    const b = client.helpers.bulk({
      datasource: (async function * generator () {
        for (const chunk of dataset) {
          await clock.nextAsync()
          if (chunk.user === 'tyrion') {
            // Needed otherwise in Node.js 10
            // the second request will never be sent
            await Promise.resolve()
            // @ts-ignore
            b.abort()
          }
          yield chunk
        }
      })(),
      flushBytes: 5000000,
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

    const result = await b

    t.type(result.time, 'number')
    t.type(result.bytes, 'number')
    t.match(result, {
      total: 2,
      successful: 2,
      retry: 0,
      failed: 0,
      aborted: true
    })
  })

  t.test('Operation stats', async t => {
    let count = 0
    const MockConnection = connection.buildMockConnection({
      onRequest (params) {
        t.equal(params.path, '/_bulk')
        t.match(params.headers, {
          'content-type': 'application/vnd.elasticsearch+x-ndjson; compatible-with=8',
          'x-elastic-client-meta': `es=${clientVersion},js=${nodeVersion},t=${transportVersion},hc=${nodeVersion},h=bp`
        })
        // @ts-expect-error
        const [action, payload] = params.body.split('\n')
        t.same(JSON.parse(action), { index: { _index: 'test' } })
        t.same(JSON.parse(payload), dataset[count++])
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
    const result = await b

    t.type(result.time, 'number')
    t.type(result.bytes, 'number')
    t.match(result, b.stats)
    t.match(result, {
      total: 3,
      successful: 3,
      retry: 0,
      failed: 0,
      aborted: false
    })
  })

  test(`flush timeout does not lock process when flushInterval is less than server timeout`, async t => {
    const flushInterval = 500

    async function handler (req: http.IncomingMessage, res: http.ServerResponse) {
      setTimeout(() => {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ errors: false, items: [{}] }))
      }, 1000)
    }

    const [{ port }, server] = await buildServer(handler)
    const client = new Client({ node: `http://localhost:${port}` })

    async function * generator () {
      const data = dataset.slice()
      for (const doc of data) {
        await sleep(flushInterval)
        yield doc
      }
    }

    const result = await client.helpers.bulk({
      datasource: Readable.from(generator()),
      flushBytes: 1,
      flushInterval: flushInterval,
      concurrency: 1,
      onDocument (_) {
        return {
          index: { _index: 'test' }
        }
      },
      onDrop (_) {
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

    server.stop()
  })

  test(`flush timeout does not lock process when flushInterval is greater than server timeout`, async t => {
    const flushInterval = 500

    async function handler (req: http.IncomingMessage, res: http.ServerResponse) {
      setTimeout(() => {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ errors: false, items: [{}] }))
      }, 250)
    }

    const [{ port }, server] = await buildServer(handler)
    const client = new Client({ node: `http://localhost:${port}` })

    async function * generator () {
      const data = dataset.slice()
      for (const doc of data) {
        await sleep(flushInterval)
        yield doc
      }
    }

    const result = await client.helpers.bulk({
      datasource: Readable.from(generator()),
      flushBytes: 1,
      flushInterval: flushInterval,
      concurrency: 1,
      onDocument (_) {
        return {
          index: { _index: 'test' }
        }
      },
      onDrop (_) {
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

    server.stop()
  })

  test(`flush timeout does not lock process when flushInterval is equal to server timeout`, async t => {
    const flushInterval = 500

    async function handler (req: http.IncomingMessage, res: http.ServerResponse) {
      setTimeout(() => {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ errors: false, items: [{}] }))
      }, flushInterval)
    }

    const [{ port }, server] = await buildServer(handler)
    const client = new Client({ node: `http://localhost:${port}` })

    async function * generator () {
      const data = dataset.slice()
      for (const doc of data) {
        await sleep(flushInterval)
        yield doc
      }
    }

    const result = await client.helpers.bulk({
      datasource: Readable.from(generator()),
      flushBytes: 1,
      flushInterval: flushInterval,
      concurrency: 1,
      onDocument (_) {
        return {
          index: { _index: 'test' }
        }
      },
      onDrop (_) {
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

    server.stop()
  })

  t.end()
})

