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
const { Client, errors } = require('../../')
const Mock = require('@elastic/elasticsearch-mock')

test('Mock should work', async t => {
  t.plan(1)

  const mock = new Mock()
  const client = new Client({
    node: 'http://localhost:9200',
    Connection: mock.getConnection()
  })

  mock.add({
    method: 'GET',
    path: '/_cat/indices'
  }, () => {
    return { status: 'ok' }
  })

  const response = await client.cat.indices()
  t.same(response.body, { status: 'ok' })
})

test('Return an error', async t => {
  t.plan(1)

  const mock = new Mock()
  const client = new Client({
    node: 'http://localhost:9200',
    Connection: mock.getConnection()
  })

  mock.add({
    method: 'GET',
    path: '/_cat/indices'
  }, () => {
    return new errors.ResponseError({
      body: { errors: {}, status: 500 },
      statusCode: 500
    })
  })

  try {
    await client.cat.indices()
    t.fail('Should throw')
  } catch (err) {
    t.ok(err instanceof errors.ResponseError)
  }
})
