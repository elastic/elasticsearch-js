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
const { errors } = require('../../index')

test('ElasticsearchClientError', t => {
  const err = new errors.ElasticsearchClientError()
  t.true(err instanceof Error)
  t.end()
})

test('TimeoutError', t => {
  const err = new errors.TimeoutError()
  t.true(err instanceof Error)
  t.true(err instanceof errors.ElasticsearchClientError)
  t.true(err.hasOwnProperty('meta'))
  t.end()
})

test('ConnectionError', t => {
  const err = new errors.ConnectionError()
  t.true(err instanceof Error)
  t.true(err instanceof errors.ElasticsearchClientError)
  t.true(err.hasOwnProperty('meta'))
  t.end()
})

test('NoLivingConnectionsError', t => {
  const err = new errors.NoLivingConnectionsError()
  t.true(err instanceof Error)
  t.true(err instanceof errors.ElasticsearchClientError)
  t.true(err.hasOwnProperty('meta'))
  t.end()
})

test('SerializationError', t => {
  const err = new errors.SerializationError()
  t.true(err instanceof Error)
  t.true(err instanceof errors.ElasticsearchClientError)
  t.false(err.hasOwnProperty('meta'))
  t.end()
})

test('DeserializationError', t => {
  const err = new errors.DeserializationError()
  t.true(err instanceof Error)
  t.true(err instanceof errors.ElasticsearchClientError)
  t.false(err.hasOwnProperty('meta'))
  t.end()
})

test('ConfigurationError', t => {
  const err = new errors.ConfigurationError()
  t.true(err instanceof Error)
  t.true(err instanceof errors.ElasticsearchClientError)
  t.false(err.hasOwnProperty('meta'))
  t.end()
})

test('ResponseError', t => {
  const meta = {
    body: 1,
    statusCode: 1,
    headers: 1
  }
  const err = new errors.ResponseError(meta)
  t.true(err instanceof Error)
  t.true(err instanceof errors.ElasticsearchClientError)
  t.true(err.hasOwnProperty('meta'))
  t.ok(err.body)
  t.ok(err.statusCode)
  t.ok(err.headers)
  t.end()
})
