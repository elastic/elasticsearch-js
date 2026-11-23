/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'tap'
import assert from 'node:assert/strict'
import * as hegel from '@hegeldev/hegel'
import * as gs from '@hegeldev/hegel/generators'
import buffer from 'node:buffer'
import { Client, errors } from '../../index.js'
import { hostname, scriptedClient } from './gen.mjs'

// header names/values Node will accept on the wire
const headerName = gs.fromRegex('x-[a-z0-9-]{1,10}', { fullmatch: true })
const headerValue = gs.fromRegex('[ -~]{0,20}', { fullmatch: true }).map(v => v.trim())
const headerMap = gs.arrays(gs.tuples(headerName, headerValue), { maxSize: 4 }).map(Object.fromEntries)

const base64 = s => Buffer.from(s).toString('base64')

test('cloud.id "name:base64(host$es[$kb])" resolves to https://<es>.<host> with compression', async () => await hegel.testAsync(async tc => {
  const host = tc.draw(hostname)
  const es = tc.draw(gs.fromRegex('[a-z0-9]{1,12}', { fullmatch: true }))
  const kb = tc.draw(gs.optional(gs.fromRegex('[a-z0-9]{1,12}', { fullmatch: true })))
  const name = tc.draw(gs.text({ alphabet: 'abc-_', maxSize: 8 }))
  const { client, sent } = scriptedClient(() => ({}), { cloud: { id: `${name}:${base64([host, es, kb].filter(p => p != null).join('$'))}` } })
  assert.deepEqual(client.connectionPool.connections.map(c => c.url.href), [`https://${es}.${host}/`])
  await client.index({ index: 'i', document: { a: 1 } })
  assert.equal(sent[0].headers['content-encoding'], 'gzip')
}))

test('a malformed cloud.id only ever throws ConfigurationError', async () => await hegel.test(tc => {
  const id = tc.draw(gs.oneOf(
    gs.text(),
    gs.tuples(gs.text({ maxSize: 5 }), gs.text()).map(([n, rest]) => `${n}:${base64(rest)}`),
    gs.tuples(gs.text({ minSize: 1 }), gs.text({ minSize: 1 })).map(([host, es]) => `name:${base64(`${host}$${es}`)}`)
  ))
  try {
    // eslint-disable-next-line no-new
    new Client({ cloud: { id } })
  } catch (err) {
    assert.ok(err instanceof errors.ConfigurationError, `${err.name}: ${err.message}`)
  }
}))

test('credentials in the node URL become a basic auth header', async () => await hegel.testAsync(async tc => {
  const username = tc.draw(gs.text({ minSize: 1, maxSize: 10 }))
  const password = tc.draw(gs.text({ minSize: 1, maxSize: 10 }))
  const node = `http://${encodeURIComponent(username)}:${encodeURIComponent(password)}@localhost:9200`
  const { client, sent } = scriptedClient(() => ({}), { node })
  await client.info()
  const auth = sent[0].headers.authorization
  assert.match(auth, /^Basic /)
  assert.equal(Buffer.from(auth.slice(6), 'base64').toString(), `${username}:${password}`)
}))

test('client headers are sent on every request and can override defaults', async () => await hegel.testAsync(async tc => {
  const headers = tc.draw(headerMap)
  const userAgent = tc.draw(gs.optional(headerValue))
  const enableMetaHeader = tc.draw(gs.booleans())
  const { client, sent } = scriptedClient(() => ({}), {
    headers: { ...headers, ...(userAgent != null ? { 'user-agent': userAgent } : {}) },
    enableMetaHeader
  })
  await client.info()
  await client.ping()
  for (const req of sent) {
    for (const [k, v] of Object.entries(headers)) assert.equal(req.headers[k], v)
    if (userAgent != null) assert.equal(req.headers['user-agent'], userAgent)
    else assert.match(req.headers['user-agent'], /^elasticsearch-js\//)
    assert.equal(req.headers['x-elastic-client-meta'] != null, enableMetaHeader)
  }
}))

test('stack mode sends compatibility headers, serverless sends the api version', async () => await hegel.testAsync(async tc => {
  const serverMode = tc.draw(gs.sampledFrom(['stack', 'serverless']))
  const { client, sent } = scriptedClient(() => ({}), { serverMode })
  await client.index({ index: 'i', document: { a: 1 } })
  const { headers } = sent[0]
  if (serverMode === 'serverless') {
    assert.equal(headers['elastic-api-version'], '2023-10-31')
    assert.equal(headers['content-type'], 'application/json')
  } else {
    assert.equal(headers['elastic-api-version'], undefined)
    assert.match(headers['content-type'], /^application\/vnd\.elasticsearch\+json; compatible-with=\d+$/)
    assert.match(headers.accept, /^application\/vnd\.elasticsearch\+json; compatible-with=\d+/)
  }
}))

test('child clients share the pool, send their own headers, and never mutate the parent', async () => await hegel.testAsync(async tc => {
  const parentHeaders = tc.draw(headerMap)
  const childHeaders = tc.draw(headerMap)
  const { client: parent, sent } = scriptedClient(() => ({}), { headers: parentHeaders })
  const child = parent.child({ headers: childHeaders })
  assert.equal(child.connectionPool, parent.connectionPool)
  await child.info()
  await parent.info()
  const [fromChild, fromParent] = sent.map(r => r.headers)
  for (const [k, v] of Object.entries(childHeaders)) assert.equal(fromChild[k], v)
  for (const [k, v] of Object.entries(parentHeaders)) assert.equal(fromParent[k], v)
  for (const k of Object.keys(childHeaders)) {
    if (!(k in parentHeaders)) assert.equal(fromParent[k], undefined, `child header ${k} leaked into parent`)
  }
}))

// matches elasticsearch-py, where client.options(headers=...) merges over the parent's headers
test('child headers merge over the parent headers', async () => await hegel.testAsync(async tc => {
  const parentHeaders = tc.draw(headerMap)
  const childHeaders = tc.draw(headerMap)
  const { client, sent } = scriptedClient(() => ({}), { headers: parentHeaders })
  await client.child({ headers: childHeaders }).info()
  for (const [k, v] of Object.entries({ ...parentHeaders, ...childHeaders })) assert.equal(sent[0].headers[k], v)
}))

test('grandchild headers merge over child and parent headers', async () => await hegel.testAsync(async tc => {
  const parentHeaders = tc.draw(headerMap)
  const childHeaders = tc.draw(headerMap)
  const grandchildHeaders = tc.draw(headerMap)
  const { client, sent } = scriptedClient(() => ({}), { headers: parentHeaders })
  await client.child({ headers: childHeaders }).child({ headers: grandchildHeaders }).info()
  for (const [k, v] of Object.entries({ ...parentHeaders, ...childHeaders, ...grandchildHeaders })) assert.equal(sent[0].headers[k], v)
}))

test('caFingerprint is rejected whenever any node is plain http', async () => await hegel.test(tc => {
  const protocols = tc.draw(gs.arrays(gs.sampledFrom(['http', 'https']), { minSize: 1, maxSize: 4 }))
  const nodes = protocols.map((p, i) => `${p}://node${i}:9200`)
  const make = () => new Client({ nodes, caFingerprint: 'AA:BB' })
  if (protocols.includes('http')) assert.throws(make, errors.ConfigurationError)
  else assert.equal(make().connectionPool.size, nodes.length)
}))

test('maxResponseSize and maxCompressedResponseSize are rejected only above the buffer limits', async () => await hegel.test(tc => {
  const key = tc.draw(gs.sampledFrom(['maxResponseSize', 'maxCompressedResponseSize']))
  const limit = key === 'maxResponseSize' ? buffer.constants.MAX_STRING_LENGTH : buffer.constants.MAX_LENGTH
  const value = limit + tc.draw(gs.integers({ minValue: -1000, maxValue: 1000 }))
  const make = () => new Client({ node: 'http://localhost:9200', [key]: value })
  if (value > limit) assert.throws(make, errors.ConfigurationError)
  else assert.doesNotThrow(make)
}))

test('stack mode connects to every node, serverless only to the first', async () => await hegel.test(tc => {
  const nodes = tc.draw(gs.arrays(hostname, { minSize: 1, maxSize: 5, unique: true })).map(h => `https://${h}:9200`)
  const serverMode = tc.draw(gs.sampledFrom(['stack', 'serverless']))
  const client = new Client({ nodes, serverMode })
  const expected = serverMode === 'serverless' ? nodes.slice(0, 1) : nodes
  assert.deepEqual(client.connectionPool.connections.map(c => c.url.origin), expected.map(n => new URL(n).origin))
}))

test('basic auth comes from the first node URL carrying both username and password', async () => await hegel.testAsync(async tc => {
  const creds = tc.draw(gs.arrays(gs.record({
    username: gs.text({ alphabet: 'abc', maxSize: 3 }),
    password: gs.text({ alphabet: 'xyz', maxSize: 3 })
  }), { minSize: 1, maxSize: 4 }))
  const nodes = creds.map(({ username, password }, i) => {
    const url = new URL(`http://node${i}:9200`)
    url.username = username
    url.password = password
    return url.href
  })
  const { client, sent } = scriptedClient(() => ({}), { node: undefined, nodes })
  await client.info()
  const first = creds.find(c => c.username !== '' && c.password !== '')
  if (first == null) assert.equal(sent[0].headers.authorization, undefined)
  else assert.equal(sent[0].headers.authorization, `Basic ${base64(`${first.username}:${first.password}`)}`)
}))

test('disablePrototypePoisoningProtection controls which poisoned responses are rejected', async () => await hegel.testAsync(async tc => {
  const option = tc.draw(gs.sampledFrom([undefined, true, false, 'proto', 'constructor']))
  const kind = tc.draw(gs.sampledFrom(['proto', 'constructor']))
  const value = tc.draw(gs.integers())
  const body = kind === 'proto' ? `{"__proto__":{"x":${value}}}` : `{"constructor":{"prototype":{"x":${value}}}}`
  const { client } = scriptedClient(() => ({ body }), option != null ? { disablePrototypePoisoningProtection: option } : {})
  // false means protection is on for both forms; a string enables only that form
  const rejected = option === false || option === kind
  if (rejected) await assert.rejects(client.info(), errors.DeserializationError)
  else await client.info()
}))

test('sniffing replaces the pool with the published http addresses', async () => await hegel.testAsync(async tc => {
  const published = tc.draw(gs.arrays(gs.tuples(hostname, gs.integers({ minValue: 1, maxValue: 65535 })), { minSize: 1, maxSize: 5, unique: true }))
  const withHostname = tc.draw(gs.booleans())
  const nodes = Object.fromEntries(published.map(([host, port], i) => [`n${i}`, {
    http: { publish_address: withHostname ? `${host}/10.0.0.${i}:${port}` : `${host}:${port}` }
  }]))
  const { client, sent } = scriptedClient(() => ({ body: { nodes } }))
  const sniffed = new Promise(resolve => client.diagnostic.on('sniff', (err, res) => resolve([err, res])))
  client.transport.sniff({ reason: 'test', requestId: 1 })
  const [err, res] = await sniffed
  assert.equal(err, null)
  assert.equal(sent[0].path, '_nodes/_all/http')
  assert.equal(res.meta.sniff.reason, 'test')
  assert.deepEqual(client.connectionPool.connections.map(c => c.url.href).sort(), published.map(([h, p]) => new URL(`http://${h}:${p}`).href).sort())
}))
