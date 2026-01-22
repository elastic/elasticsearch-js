/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const { Client, errors, Transport, SniffingTransport } = require('@elastic/elasticsearch')

console.log('CJS Import Test:')
console.log('✓ Client imported:', typeof Client === 'function')
console.log('✓ errors imported:', typeof errors === 'object')
console.log('✓ Transport imported:', typeof Transport === 'function')
console.log('✓ SniffingTransport imported:', typeof SniffingTransport === 'function')

const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'changeme'
  }
})

console.log('✓ Client instantiation successful')
console.log('\nAll CJS tests passed! ✅')
