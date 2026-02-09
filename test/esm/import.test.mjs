/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'tap'
import {
  BaseConnection,
  BaseConnectionPool,
  Client,
  CloudConnectionPool,
  ClusterConnectionPool,
  Diagnostic,
  HttpConnection,
  Serializer,
  SniffingTransport,
  Transport,
  UndiciConnection,
  WeightedConnectionPool,
  errors,
  events,
  estypes
} from '../../esm/index.js'

test('ESM imports work correctly', t => {
  t.plan(5)
  t.equal(typeof Client, 'function', 'Client should be a function')
  t.equal(typeof errors, 'object', 'errors should be an object')
  t.equal(typeof SniffingTransport, 'function', 'SniffingTransport should be a function')
  t.equal(typeof estypes, 'object', 'estypes should be an object')

  const client = new Client({
    node: 'http://localhost:9200',
    auth: {
      username: 'elastic',
      password: 'changeme'
    }
  })

  t.ok(client, 'Client should instantiate successfully')
})

test('ESM imports from @elastic/transport should work correctly', t => {
  t.plan(11)
  t.equal(typeof Transport, 'function', 'Transport should be a function')
  t.equal(typeof BaseConnection, 'function', 'BaseConnection should be a function')
  t.equal(typeof BaseConnectionPool, 'function', 'BaseConnectionPool should be a function')
  t.equal(typeof CloudConnectionPool, 'function', 'CloudConnectionPool should be a function')
  t.equal(typeof ClusterConnectionPool, 'function', 'ClusterConnectionPool should be a function')
  t.equal(typeof Diagnostic, 'function', 'Diagnostic should be a function')
  t.equal(typeof HttpConnection, 'function', 'HttpConnection should be a function')
  t.equal(typeof Serializer, 'function', 'Serializer should be a function')
  t.equal(typeof UndiciConnection, 'function', 'UndiciConnection should be a function')
  t.equal(typeof WeightedConnectionPool, 'function', 'WeightedConnectionPool should be a function')
  t.equal(typeof events, 'object', 'events should be an object')
})
