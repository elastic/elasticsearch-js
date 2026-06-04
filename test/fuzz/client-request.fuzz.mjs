/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

// Fuzz target: Client API paths / request paths
// Feeds arbitrary strings to the core request dispatcher logic.

import { Client } from '../../index.js'

const client = new Client({
  node: 'http://localhost:9200'
})

function fuzz (buf) {
  const str = buf.toString('utf8')

  const parts = str.split('&')
  const headers = {}
  const querystring = {}

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      headers[parts[i]] = parts[i + 1] || ''
    } else {
      querystring[parts[i]] = parts[i + 1] || ''
    }
  }

  try {
    // We don't await this as we're testing the synchronous setup
    // and immediate asynchronous dispatch paths inside undici.
    client.transport.request({
      method: 'GET',
      path: `/${str}`,
      querystring,
      headers
    }).catch((err) => {
      if (
        err instanceof TypeError ||
        err.message?.includes('Invalid header') ||
        err.message?.includes('invalid URL') ||
        err.message?.includes('Invalid character') ||
        err.message?.includes('Invalid URI') ||
        err.name === 'ConnectionError'
      ) {
        return
      }
      // If we get an unexpected async error, crash the process
      console.error('CRASH (async):', err)
      process.exit(1)
    })
  } catch (err) {
    if (
      err instanceof TypeError ||
      err.message?.includes('Invalid header') ||
      err.message?.includes('invalid URL') ||
      err.message?.includes('Invalid character') ||
      err.message?.includes('Invalid URI')
    ) {
      return
    }
    throw err
  }
}

export { fuzz }
