/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
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
