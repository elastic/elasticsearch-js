// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { test } = require('tap')
const { CloudConnectionPool } = require('../../lib/pool')
const Connection = require('../../lib/Connection')

test('Should expose a cloudConnection property', t => {
  const pool = new CloudConnectionPool({ Connection })
  pool.addConnection('http://localhost:9200/')
  t.ok(pool.cloudConnection instanceof Connection)
  t.end()
})

test('Get connection should always return cloudConnection', t => {
  const pool = new CloudConnectionPool({ Connection })
  const conn = pool.addConnection('http://localhost:9200/')
  t.deepEqual(pool.getConnection(), conn)
  t.end()
})

test('pool.empty should reset cloudConnection', t => {
  const pool = new CloudConnectionPool({ Connection })
  pool.addConnection('http://localhost:9200/')
  t.ok(pool.cloudConnection instanceof Connection)
  pool.empty(() => {
    t.strictEqual(pool.cloudConnection, null)
    t.end()
  })
})
