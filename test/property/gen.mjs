/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import * as gs from '@hegeldev/hegel/generators'
import { BaseConnection, Client } from '../../index.js'

const finite = gs.floats({ allowNan: false, allowInfinity: false })

export const scalar = gs.oneOf(
  gs.none(),
  gs.booleans(),
  gs.integers({ minValue: -1e9, maxValue: 1e9 }),
  finite,
  gs.text()
)

// arbitrary JSON-compatible values
export const json = gs.recursive(scalar, children => gs.oneOf(
  gs.arrays(children, { maxSize: 5 }),
  gs.arrays(gs.tuples(gs.text({ maxSize: 10 }), children), { maxSize: 5 })
    .map(entries => Object.fromEntries(entries))
), { maxLeaves: 30 })

export const jsonObject = gs.arrays(gs.tuples(gs.text({ maxSize: 10 }), json), { maxSize: 6 })
  .map(entries => Object.fromEntries(entries))

export const hostname = gs.fromRegex('[a-z][a-z0-9-]{0,10}(\\.[a-z][a-z0-9]{0,5}){0,2}', { fullmatch: true })

/**
 * Builds a real Client whose connections never touch the network: every request the
 * client sends is recorded in `sent` and answered by `handler(params)`, which returns
 * `{ statusCode?, body?, headers? }`. Everything above the socket (client, API layer,
 * helpers, transport, serializer) runs for real.
 */
export function scriptedClient (handler, opts = {}) {
  const sent = []
  class ScriptedConnection extends BaseConnection {
    async request (params) {
      // real connections send their own headers (e.g. auth) under the request's
      sent.push({ ...params, headers: { ...this.headers, ...params.headers } })
      const { statusCode = 200, body = {}, headers = {} } = await handler(sent.at(-1))
      return {
        statusCode,
        headers: { 'content-type': 'application/json', 'x-elastic-product': 'Elasticsearch', ...headers },
        body: typeof body === 'string' ? body : JSON.stringify(body)
      }
    }
  }
  const client = new Client({ node: 'http://localhost:9200', Connection: ScriptedConnection, maxRetries: 0, ...opts })
  return { client, sent }
}

// parses a newline-delimited JSON request body as sent on the wire
export const ndjson = body => body.split('\n').filter(l => l !== '').map(l => JSON.parse(l))

export const query = qs => Object.fromEntries(new URLSearchParams(qs ?? ''))
export const roundTrip = v => JSON.parse(JSON.stringify(v))
