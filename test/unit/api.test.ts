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

import { test } from 'tap'
import { connection } from '../utils'
import { Client, errors } from '../..'

test('Api without body key and top level body', async t => {
  t.plan(1)

  const Connection = connection.buildMockConnection({
    onRequest (opts) {
      return {
        statusCode: 200,
        body: { took: 42 }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection
  })

  const response = await client.search({
    index: 'test',
    allow_no_indices: true,
    query: { match_all: {} }
  })

  t.equal(response.took, 42)
})

test('Api with body key and top level body', async t => {
  t.plan(1)

  const Connection = connection.buildMockConnection({
    onRequest (opts) {
      return {
        statusCode: 200,
        body: { took: 42 }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection
  })

  const response = await client.search({
    index: 'test',
    allow_no_indices: true,
    body: {
      query: { match_all: {} }
    }
  })

  t.equal(response.took, 42)
})

test('Api with body key and top level body conflict', async t => {
  t.plan(1)

  const Connection = connection.buildMockConnection({
    onRequest (opts) {
      return {
        statusCode: 200,
        body: { took: 42 }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection
  })

  try {
    await client.search({
      index: 'test',
      allow_no_indices: true,
      query: { match_all: {} },
      body: {
        query: { match_all: {} }
      }
    })
  } catch (err: any) {
    t.ok(err instanceof errors.ConfigurationError)
  }
})

test('Unknown key', async t => {
  t.plan(1)

  const Connection = connection.buildMockConnection({
    onRequest (opts) {
      return {
        statusCode: 200,
        body: { took: 42 }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection
  })

  try {
    await client.search({
      index: 'test',
      // @ts-expect-error
      bdoy: {
        query: { match_all: {} }
      }
    })
  } catch (err: any) {
    t.ok(err instanceof errors.ConfigurationError)
  }
})

test('Api without body key and keyed body', async t => {
  t.plan(1)

  const Connection = connection.buildMockConnection({
    onRequest (opts) {
      return {
        statusCode: 200,
        body: { result: 'created' }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection
  })

  const response = await client.create({
    index: 'test',
    id: '1',
    document: { foo: 'bar' }
  })

  t.equal(response.result, 'created')
})

test('Api with body key and keyed body', async t => {
  t.plan(1)

  const Connection = connection.buildMockConnection({
    onRequest (opts) {
      return {
        statusCode: 200,
        body: { result: 'created' }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection
  })

  const response = await client.create({
    index: 'test',
    id: '1',
    body: { foo: 'bar' }
  })

  t.equal(response.result, 'created')
})

test('Api with body key and keyed body conflict', async t => {
  t.plan(1)

  const Connection = connection.buildMockConnection({
    onRequest (opts) {
      return {
        statusCode: 200,
        body: { result: 'created' }
      }
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection
  })

  try {
    await client.create({
      index: 'test',
      id: '1',
      document: { foo: 'bar' },
      body: { foo: 'bar' }
    })
  } catch (err: any) {
    t.ok(err instanceof errors.ConfigurationError)
  }
})
