/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

// Fuzz target: Client bulk helper
// Feeds arbitrary objects and strings to the bulk helper chunking
// and serialisation logic.

import { Client } from '../../index.js'

const client = new Client({
  node: 'http://localhost:9200'
})

// Stub the transport request to avoid actual network traffic
client.transport.request = async () => {
  return {
    body: { items: [], errors: false },
    statusCode: 200,
    headers: {},
    warnings: null
  }
}

function fuzz (buf) {
  const str = buf.toString('utf8')
  const docs = []

  // We feed objects, strings, and nulls
  for (const char of str) {
    if (char === 'o') docs.push({ index: { _index: 'test' } })
    else if (char === 'd') docs.push({ doc: char })
    else if (char === 's') docs.push(char)
    else if (char === 'n') docs.push(null)
  }

  client.helpers.bulk({
    datasource: docs,
    onDocument () {
      return { index: { _index: 'test' } }
    },
    flushBytes: 100, // Small flush size to trigger frequent chunking
    retries: 0
  }).catch(err => {
    if (
      err instanceof TypeError ||
      err.message?.includes('Validation Failed') ||
      err.message?.includes('Invalid')
    ) {
      return
    }
    console.error('CRASH (async):', err)
    process.exit(1)
  })
}

export { fuzz }
