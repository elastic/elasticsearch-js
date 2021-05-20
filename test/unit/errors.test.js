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

/* eslint no-prototype-builtins: 0 */

const { test } = require('tap')
const { errors } = require('../../index')

test('ElasticsearchClientError', t => {
  const err = new errors.ElasticsearchClientError()
  t.ok(err instanceof Error)
  t.end()
})

test('TimeoutError', t => {
  const err = new errors.TimeoutError()
  t.ok(err instanceof Error)
  t.ok(err instanceof errors.ElasticsearchClientError)
  t.ok(err.hasOwnProperty('meta'))
  t.end()
})

test('ConnectionError', t => {
  const err = new errors.ConnectionError()
  t.ok(err instanceof Error)
  t.ok(err instanceof errors.ElasticsearchClientError)
  t.ok(err.hasOwnProperty('meta'))
  t.end()
})

test('NoLivingConnectionsError', t => {
  const err = new errors.NoLivingConnectionsError()
  t.ok(err instanceof Error)
  t.ok(err instanceof errors.ElasticsearchClientError)
  t.ok(err.hasOwnProperty('meta'))
  t.end()
})

test('SerializationError', t => {
  const err = new errors.SerializationError()
  t.ok(err instanceof Error)
  t.ok(err instanceof errors.ElasticsearchClientError)
  t.notOk(err.hasOwnProperty('meta'))
  t.ok(err.hasOwnProperty('data'))
  t.end()
})

test('DeserializationError', t => {
  const err = new errors.DeserializationError()
  t.ok(err instanceof Error)
  t.ok(err instanceof errors.ElasticsearchClientError)
  t.notOk(err.hasOwnProperty('meta'))
  t.ok(err.hasOwnProperty('data'))
  t.end()
})

test('ConfigurationError', t => {
  const err = new errors.ConfigurationError()
  t.ok(err instanceof Error)
  t.ok(err instanceof errors.ElasticsearchClientError)
  t.notOk(err.hasOwnProperty('meta'))
  t.end()
})

test('ResponseError', t => {
  const meta = {
    body: 1,
    statusCode: 1,
    headers: 1
  }
  const err = new errors.ResponseError(meta)
  t.ok(err instanceof Error)
  t.ok(err instanceof errors.ElasticsearchClientError)
  t.ok(err.hasOwnProperty('meta'))
  t.ok(err.body)
  t.ok(err.statusCode)
  t.ok(err.headers)
  t.end()
})

test('RequestAbortedError', t => {
  const err = new errors.RequestAbortedError()
  t.ok(err instanceof Error)
  t.ok(err instanceof errors.ElasticsearchClientError)
  t.ok(err.hasOwnProperty('meta'))
  t.end()
})

test('ResponseError with meaningful message / 1', t => {
  const meta = {
    body: {
      error: {
        root_cause: [
          {
            type: 'index_not_found_exception',
            reason: 'no such index [foo]',
            'resource.type': 'index_expression',
            'resource.id': 'foo',
            index_uuid: '_na_',
            index: 'foo'
          }
        ],
        type: 'index_not_found_exception',
        reason: 'no such index [foo]',
        'resource.type': 'index_expression',
        'resource.id': 'foo',
        index_uuid: '_na_',
        index: 'foo'
      },
      status: 404
    },
    statusCode: 404,
    headers: {}
  }
  const err = new errors.ResponseError(meta)
  t.equal(err.message, 'index_not_found_exception: [index_not_found_exception] Reason: no such index [foo]')
  t.equal(err.toString(), JSON.stringify(meta.body))
  t.end()
})

test('ResponseError with meaningful message / 2', t => {
  const meta = {
    body: {
      error: {
        root_cause: [
          {
            type: 'index_not_found_exception',
            reason: 'no such index [foo]',
            'resource.type': 'index_expression',
            'resource.id': 'foo',
            index_uuid: '_na_',
            index: 'foo'
          },
          {
            type: 'nested_cause',
            reason: 'this is a nested cause',
            'resource.type': 'index_expression',
            'resource.id': 'foo',
            index_uuid: '_na_',
            index: 'foo'
          }
        ],
        type: 'index_not_found_exception',
        reason: 'no such index [foo]',
        'resource.type': 'index_expression',
        'resource.id': 'foo',
        index_uuid: '_na_',
        index: 'foo'
      },
      status: 404
    },
    statusCode: 404,
    headers: {}
  }
  const err = new errors.ResponseError(meta)
  t.equal(err.message, 'index_not_found_exception: [index_not_found_exception] Reason: no such index [foo]; [nested_cause] Reason: this is a nested cause')
  t.equal(err.toString(), JSON.stringify(meta.body))
  t.end()
})

test('ResponseError with meaningful message / 3', t => {
  const meta = {
    body: {
      error: {
        type: 'index_not_found_exception',
        reason: 'no such index [foo]',
        'resource.type': 'index_expression',
        'resource.id': 'foo',
        index_uuid: '_na_',
        index: 'foo'
      },
      status: 404
    },
    statusCode: 404,
    headers: {}
  }
  const err = new errors.ResponseError(meta)
  t.equal(err.message, 'index_not_found_exception')
  t.equal(err.toString(), JSON.stringify(meta.body))
  t.end()
})
