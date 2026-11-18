/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// Properties of the generated API layer: how request params are routed into the
// method, path, querystring and body the client actually puts on the wire.

import { test } from 'tap'
import assert from 'node:assert/strict'
import * as hegel from '@hegeldev/hegel'
import * as gs from '@hegeldev/hegel/generators'
import { json, jsonObject, scriptedClient, ndjson, query, roundTrip } from './gen.mjs'

const name = gs.text({ minSize: 1, maxSize: 15 })
// keys that are neither path, query nor known body params of any API
const unknownKey = gs.fromRegex('zz_[a-z]{1,6}', { fullmatch: true })
const queryValue = gs.fromRegex('[a-z0-9]{1,8}', { fullmatch: true })

const segments = path => path.split('/').slice(1).map(decodeURIComponent)
const body = b => b == null || b === '' ? undefined : JSON.parse(b)

test('document APIs percent-encode path params into the right route', async () => await hegel.testAsync(async tc => {
  const { client, sent } = scriptedClient(() => ({}))
  const index = tc.draw(name)
  const id = tc.draw(name)
  const api = tc.draw(gs.sampledFrom(['index', 'create', 'get', 'delete', 'update', 'exists']))
  const params = { index, id }
  if (api === 'index' || api === 'create') params.document = tc.draw(jsonObject)
  if (api === 'update') params.doc = tc.draw(jsonObject)
  await client[api](params)
  const [{ method, path }] = sent
  const expected = {
    index: ['PUT', [index, '_doc', id]],
    create: ['PUT', [index, '_create', id]],
    get: ['GET', [index, '_doc', id]],
    exists: ['HEAD', [index, '_doc', id]],
    delete: ['DELETE', [index, '_doc', id]],
    update: ['POST', [index, '_update', id]]
  }[api]
  assert.equal(method, expected[0])
  assert.deepEqual(segments(path), expected[1])
}))

test('search routes each param to path, querystring or body', async () => await hegel.testAsync(async tc => {
  const { client, sent } = scriptedClient(() => ({ body: { hits: { hits: [] } } }))
  const index = tc.draw(gs.optional(gs.oneOf(name, gs.arrays(name, { minSize: 1, maxSize: 3 }))))
  const bodyParams = tc.draw(gs.record({ size: gs.optional(gs.integers({ minValue: 0, maxValue: 100 })), query: gs.optional(jsonObject), track_total_hits: gs.optional(gs.booleans()) }))
  const queryParams = tc.draw(gs.record({ routing: gs.optional(queryValue), preference: gs.optional(queryValue) }))
  const unknown = Object.fromEntries(tc.draw(gs.arrays(gs.tuples(unknownKey, json), { maxSize: 3 })))
  const userQuery = tc.draw(gs.optional(gs.arrays(gs.tuples(unknownKey, queryValue), { maxSize: 3 }).map(Object.fromEntries)))
  const userBody = tc.draw(gs.optional(gs.arrays(gs.tuples(unknownKey, json), { maxSize: 3 }).map(Object.fromEntries)))
  const strip = o => Object.fromEntries(Object.entries(o).filter(([, v]) => v != null))

  await client.search({
    ...(index != null ? { index } : {}),
    ...strip(bodyParams),
    ...strip(queryParams),
    ...unknown,
    ...(userQuery != null ? { querystring: userQuery } : {}),
    ...(userBody != null ? { body: userBody } : {})
  })
  const [req] = sent
  assert.deepEqual(segments(req.path), index != null ? [[index].flat().join(','), '_search'] : ['_search'])
  assert.deepEqual(query(req.querystring), { ...userQuery, ...strip(queryParams) })
  const expectedBody = { ...userBody, ...strip(bodyParams), ...unknown }
  assert.deepEqual(body(req.body), Object.keys(expectedBody).length > 0 || userBody != null ? roundTrip(expectedBody) : undefined)
}))

test('a "field:direction" sort string goes to the querystring, anything else to the body', async () => await hegel.testAsync(async tc => {
  const { client, sent } = scriptedClient(() => ({ body: { hits: { hits: [] } } }))
  const sort = tc.draw(gs.oneOf(
    gs.tuples(queryValue, gs.sampledFrom(['asc', 'desc'])).map(p => p.join(':')),
    queryValue,
    gs.arrays(queryValue, { minSize: 1, maxSize: 3 })
  ))
  await client.search({ index: 'i', sort })
  const [req] = sent
  if (typeof sort === 'string' && sort.includes(':')) {
    assert.equal(query(req.querystring).sort, sort)
    assert.equal(body(req.body)?.sort, undefined)
  } else {
    assert.deepEqual(body(req.body).sort, sort)
    assert.equal(query(req.querystring).sort, undefined)
  }
}))

test('bulk serializes operations as one ndjson line per entry', async () => await hegel.testAsync(async tc => {
  const { client, sent } = scriptedClient(() => ({ body: { errors: false, items: [] } }))
  const operations = tc.draw(gs.arrays(jsonObject, { minSize: 1, maxSize: 6 }))
  const index = tc.draw(gs.optional(name))
  await client.bulk({ operations, ...(index != null ? { index } : {}) })
  const [req] = sent
  assert.deepEqual(segments(req.path), index != null ? [index, '_bulk'] : ['_bulk'])
  assert.match(req.headers['content-type'], /x-ndjson/)
  assert.ok(req.body.endsWith('\n'))
  assert.deepEqual(ndjson(req.body), roundTrip(operations))
}))

test('API calls return the parsed body, or the full result with meta: true', async () => await hegel.testAsync(async tc => {
  const responseBody = tc.draw(jsonObject)
  const { client } = scriptedClient(() => ({ body: responseBody }))
  const meta = tc.draw(gs.booleans())
  const res = await client.info({}, { meta })
  const expected = roundTrip(responseBody)
  if (meta) {
    assert.deepEqual(res.body, expected)
    assert.equal(res.statusCode, 200)
  } else {
    assert.deepEqual(res, expected)
  }
}))
