/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'tap'

test('CommonJS imports work correctly', async (t) => {
  const { Client, errors, Transport, SniffingTransport } = require('../../')

  t.equal(typeof Client, 'function', 'Client should be a function')
  t.equal(typeof errors, 'object', 'errors should be an object')
  t.equal(typeof Transport, 'function', 'Transport should be a function')
  t.equal(typeof SniffingTransport, 'function', 'SniffingTransport should be a function')

  const client = new Client({
    node: 'http://localhost:9200',
    auth: {
      username: 'elastic',
      password: 'changeme'
    }
  })

  t.ok(client, 'Client should instantiate successfully')
})
