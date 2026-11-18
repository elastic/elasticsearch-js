/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'tap'
import assert from 'node:assert/strict'
import * as hegel from '@hegeldev/hegel'
import * as gs from '@hegeldev/hegel/generators'
import { errors } from '../../index.js'
import { json, jsonObject, scalar, scriptedClient, ndjson, query, roundTrip } from './gen.mjs'

// per-document server behavior: how many 429s before the final status
const fate = gs.record({ throttled: gs.integers({ minValue: 0, maxValue: 3 }), status: gs.sampledFrom([200, 201, 400, 404, 409]) })

test('bulk helper delivers every document once and accounts for each exactly once', async () => await hegel.testAsync(async tc => {
  const docs = tc.draw(gs.arrays(gs.record({
    op: gs.sampledFrom(['index', 'create', 'update', 'delete']),
    fate,
    payload: jsonObject
  }), { maxSize: 12 })).map((d, id) => ({ ...d, id: String(id) }))
  const retries = tc.draw(gs.integers({ minValue: 0, maxValue: 3 }))
  const attempts = new Map()

  const { client, sent } = scriptedClient(({ body }) => {
    const lines = ndjson(body)
    const items = []
    for (let i = 0; i < lines.length; i++) {
      const [op] = Object.keys(lines[i])
      const { _id } = lines[i][op]
      if (op !== 'delete') i++
      const n = attempts.get(_id) ?? 0
      attempts.set(_id, n + 1)
      const { status } = docs[_id].fate
      const final = n >= docs[_id].fate.throttled ? status : 429
      items.push({ [op]: { _index: 'i', _id, status: final, ...(final >= 400 ? { error: { type: 'x', reason: String(final) } } : {}) } })
    }
    return { body: { errors: items.some(it => Object.values(it)[0].status >= 400), items } }
  })

  const dropped = []
  const succeeded = []
  const stats = await client.helpers.bulk({
    datasource: docs,
    onDocument: d => d.op === 'update' ? [{ update: { _index: 'i', _id: d.id } }, {}] : { [d.op]: { _index: 'i', _id: d.id } },
    concurrency: tc.draw(gs.integers({ minValue: 1, maxValue: 3 })),
    flushBytes: tc.draw(gs.integers({ minValue: 1, maxValue: 2000 })),
    retries,
    wait: 0,
    onDrop: d => dropped.push(d),
    onSuccess: s => succeeded.push(s)
  })

  const expectDropped = docs.filter(d => d.fate.status >= 400 || d.fate.throttled > retries)
  assert.equal(stats.total, docs.length)
  assert.equal(stats.failed, expectDropped.length)
  assert.equal(stats.successful, docs.length - expectDropped.length)
  assert.equal(succeeded.length, stats.successful)
  assert.deepEqual(dropped.map(d => Object.values(d.operation)[0]._id).sort(), expectDropped.map(d => d.id).sort())
  for (const d of dropped) {
    const doc = docs[Object.values(d.operation)[0]._id]
    assert.equal(d.status, doc.fate.throttled > retries ? 429 : doc.fate.status)
  }

  // what went over the wire for each document matches what onDocument asked for
  const lines = sent.flatMap(r => ndjson(r.body))
  for (let i = 0; i < lines.length; i++) {
    const [op] = Object.keys(lines[i])
    const doc = docs[lines[i][op]._id]
    assert.equal(op, doc.op)
    if (op === 'delete') continue
    const payload = lines[++i]
    assert.deepEqual(payload, roundTrip(op === 'update' ? { doc } : doc))
  }
}))

test('bulk helper drops deletes that are still throttled after all retries', async () => await hegel.testAsync(async tc => {
  const ops = tc.draw(gs.arrays(gs.sampledFrom(['index', 'delete']), { minSize: 1, maxSize: 5 }))
  const retries = tc.draw(gs.integers({ minValue: 0, maxValue: 2 }))
  const { client } = scriptedClient(({ body }) => ({
    body: { errors: true, items: ndjson(body).flatMap(l => l.index != null || l.delete != null ? [{ [Object.keys(l)[0]]: { status: 429 } }] : []) }
  }))
  const dropped = []
  const stats = await client.helpers.bulk({
    datasource: ops.map((op, i) => ({ op, i })),
    onDocument: d => ({ [d.op]: { _index: 'i', _id: String(d.i) } }),
    retries,
    wait: 0,
    onDrop: d => dropped.push(d)
  })
  assert.equal(stats.failed, ops.length)
  assert.deepEqual(dropped.map(d => [Object.keys(d.operation)[0], d.document]), ops.map((op, i) => [op, op === 'delete' ? null : { op, i }]))
}))

test('bulk helper never builds a request over maxRequestBytes unless one operation alone is bigger', async () => await hegel.testAsync(async tc => {
  const docs = tc.draw(gs.arrays(jsonObject, { minSize: 1, maxSize: 15 }))
  const maxRequestBytes = tc.draw(gs.integers({ minValue: 1, maxValue: 400 }))
  const { client, sent } = scriptedClient(({ body }) => ({ body: { errors: false, items: ndjson(body).filter((_, i) => i % 2 === 0).map(() => ({ index: { status: 201 } })) } }))
  const stats = await client.helpers.bulk({ datasource: docs, onDocument: () => ({ index: { _index: 'i' } }), maxRequestBytes, flushBytes: 1e6, wait: 0 })
  assert.equal(stats.successful, docs.length)
  for (const { body } of sent) {
    if (ndjson(body).length > 2) assert.ok(Buffer.byteLength(body) <= maxRequestBytes, `${Buffer.byteLength(body)} > ${maxRequestBytes}`)
  }
  assert.deepEqual(sent.flatMap(r => ndjson(r.body)).filter((_, i) => i % 2 === 1), roundTrip(docs))
}))

test('msearch helper resolves each search with its own response', async () => await hegel.testAsync(async tc => {
  const searches = tc.draw(gs.arrays(gs.record({ fate, query: jsonObject }), { maxSize: 10 })).map((s, id) => ({ ...s, id }))
  const retries = tc.draw(gs.integers({ minValue: 0, maxValue: 3 }))
  const attempts = new Map()
  const { client } = scriptedClient(({ body }) => {
    const lines = ndjson(body)
    const responses = []
    for (let i = 0; i < lines.length; i += 2) {
      const id = lines[i].id
      const n = attempts.get(id) ?? 0
      attempts.set(id, n + 1)
      const s = searches[id]
      const status = n >= s.fate.throttled ? s.fate.status : 429
      responses.push(status >= 400
        ? { status, error: { type: 'x', reason: 'y' } }
        : { status, hits: { hits: [{ _id: String(id), _source: { id, query: lines[i + 1].query } }] } })
    }
    return { body: { responses } }
  })
  const m = client.helpers.msearch({
    operations: tc.draw(gs.integers({ minValue: 1, maxValue: 5 })),
    concurrency: tc.draw(gs.integers({ minValue: 1, maxValue: 3 })),
    retries,
    wait: 0
  })
  const settled = Promise.allSettled(searches.map(s => m.search({ id: s.id }, { query: s.query })))
  m.stop()
  await m
  const results = await settled
  results.forEach((r, i) => {
    const s = searches[i]
    const status = s.fate.throttled > retries ? 429 : s.fate.status
    if (status >= 400) {
      assert.equal(r.status, 'rejected')
      assert.ok(r.reason instanceof errors.ResponseError)
      assert.equal(r.reason.meta.body.status, status)
    } else {
      assert.equal(r.status, 'fulfilled', String(r.reason))
      assert.deepEqual(r.value.documents, [roundTrip({ id: i, query: s.query })])
    }
  })
}))

test('scrollDocuments yields every page in order and clears the last scroll id exactly once', async () => await hegel.testAsync(async tc => {
  const pages = tc.draw(gs.arrays(gs.arrays(json, { minSize: 1, maxSize: 4 }), { maxSize: 5 }))
  const throttled = tc.draw(gs.arrays(gs.integers({ minValue: 0, maxValue: 2 }), { minSize: pages.length + 1, maxSize: pages.length + 1 }))
  const maxRetries = 2
  let page = 0
  let tries = 0
  const scrollIds = []
  const cleared = []
  const searchScrolls = []
  const { client } = scriptedClient(({ method, path, body, querystring }) => {
    if (method === 'DELETE') {
      cleared.push(JSON.parse(body).scroll_id)
      return { body: { succeeded: true } }
    }
    if (path === '/_search/scroll') scrollIds.push(JSON.parse(body).scroll_id)
    else searchScrolls.push(query(querystring).scroll)
    if (tries++ < throttled[page]) return { statusCode: 429, body: {} }
    tries = 0
    const hits = (pages[page] ?? []).map(_source => ({ _source }))
    return { body: { _scroll_id: `s${page++}`, hits: { hits } } }
  })
  const docs = []
  for await (const doc of client.helpers.scrollDocuments({ index: 'i' }, { wait: 0, maxRetries })) docs.push(doc)
  assert.deepEqual(docs, roundTrip(pages.flat()))
  assert.ok(searchScrolls.every(s => s === '1m'))
  // every scroll request (including 429 retries) carries the id returned by the previous page
  assert.deepEqual([...new Set(scrollIds)], pages.map((_, i) => `s${i}`))
  assert.deepEqual(cleared, [`s${Math.max(pages.length - 1, 0)}`])
}))

test('helpers.search returns _id merged with _source and keeps user filter_path', async () => await hegel.testAsync(async tc => {
  const hits = tc.draw(gs.arrays(gs.tuples(gs.text({ minSize: 1, maxSize: 8 }), jsonObject), { maxSize: 5 }))
  const filterPath = tc.draw(gs.optional(gs.fromRegex('[a-z.]{1,10}', { fullmatch: true })))
  const { client, sent } = scriptedClient(() => ({ body: { hits: { hits: hits.map(([_id, _source]) => ({ _id, _source })) } } }))
  const docs = await client.helpers.search({ index: 'i', ...(filterPath != null ? { filter_path: filterPath } : {}) })
  assert.deepEqual(docs, hits.map(([_id, src]) => ({ _id, ...roundTrip(src) })))
  const fp = query(sent[0].querystring).filter_path.split(',')
  assert.ok(fp.includes('hits.hits._id') && fp.includes('hits.hits._source'))
  if (filterPath != null) assert.equal(fp[0], filterPath)
}))

test('esql toRecords zips each row with the column names', async () => await hegel.testAsync(async tc => {
  const names = tc.draw(gs.arrays(gs.text({ minSize: 1, maxSize: 8 }), { maxSize: 5, unique: true }))
  const rows = tc.draw(gs.arrays(gs.arrays(json, { minSize: names.length, maxSize: names.length }), { maxSize: 5 }))
  const columns = names.map(name => ({ name, type: 'keyword' }))
  const { client, sent } = scriptedClient(() => ({ body: { columns, values: rows } }))
  const { records, columns: cols } = await client.helpers.esql({ query: 'FROM i' }).toRecords()
  assert.deepEqual(cols, columns)
  assert.deepEqual(records, roundTrip(rows).map(row => Object.fromEntries(names.map((n, i) => [n, row[i]]))))
  const req = { ...query(sent[0].querystring), ...JSON.parse(sent[0].body) }
  assert.equal(req.format, 'json')
  assert.equal(String(req.columnar), 'false')
}))

test('scrollSearch clear() stops scrolling and clears the current scroll id once', async () => await hegel.testAsync(async tc => {
  const total = tc.draw(gs.integers({ minValue: 1, maxValue: 6 }))
  const stopAt = tc.draw(gs.integers({ minValue: 0, maxValue: total - 1 }))
  let page = 0
  const cleared = []
  const { client } = scriptedClient(({ method, body }) => {
    if (method === 'DELETE') {
      cleared.push(JSON.parse(body).scroll_id)
      return { body: {} }
    }
    const hits = page < total ? [{ _source: { page } }] : []
    return { body: { _scroll_id: `s${page++}`, hits: { hits } } }
  })
  const seen = []
  for await (const res of client.helpers.scrollSearch({ index: 'i' }, { wait: 0 })) {
    seen.push(...res.documents.map(d => d.page))
    if (seen.length - 1 === stopAt) await res.clear()
  }
  assert.deepEqual(seen, Array.from({ length: stopAt + 1 }, (_, i) => i))
  assert.deepEqual(cleared, [`s${stopAt}`])
}))

test('msearch rejects non-object searches and any search after stop()', async () => await hegel.testAsync(async tc => {
  const { client, sent } = scriptedClient(() => ({ body: { responses: [] } }))
  const header = tc.draw(gs.oneOf(jsonObject, json))
  const body = tc.draw(gs.oneOf(jsonObject, json))
  const isObject = v => typeof v === 'object' && v != null && !Array.isArray(v)
  // assume before creating the helper, which starts a flush timer
  tc.assume(!isObject(header) || !isObject(body))
  const m = client.helpers.msearch()
  await assert.rejects(m.search(header, body), errors.ConfigurationError)
  const error = tc.draw(gs.optional(gs.text().map(msg => new Error(msg))))
  m.stop(error)
  await assert.rejects(m.search({}, {}), error ?? errors.ConfigurationError)
  if (error != null) await assert.rejects(m, error)
  else await m
  assert.equal(sent.length, 0)
}))

test('bulk sends string payloads verbatim and wraps update chunks in doc', async () => await hegel.testAsync(async tc => {
  const docs = tc.draw(gs.arrays(gs.tuples(gs.sampledFrom(['index', 'update']), jsonObject, gs.booleans()), { minSize: 1, maxSize: 6 }))
    .map(([op, doc, asString]) => ({ op, chunk: asString ? JSON.stringify(doc) : doc, doc }))
  const { client, sent } = scriptedClient(({ body }) => ({
    body: { errors: false, items: ndjson(body).filter((_, i) => i % 2 === 0).map(l => ({ [Object.keys(l)[0]]: { status: 200 } })) }
  }))
  let i = 0
  const stats = await client.helpers.bulk({
    datasource: docs.map(d => d.chunk),
    onDocument: () => {
      // update must return [action, options] (see docs/reference/client-helpers.md)
      const { op } = docs[i++]
      return op === 'update' ? [{ update: { _index: 'i' } }, {}] : { index: { _index: 'i' } }
    }
  })
  assert.equal(stats.successful, docs.length)
  const payloads = sent.flatMap(r => ndjson(r.body)).filter((_, i) => i % 2 === 1)
  assert.deepEqual(payloads, docs.map(d => roundTrip(d.op === 'update' ? { doc: d.doc } : d.doc)))
}))

test('bulk refreshOnCompletion refreshes the right index, or nothing', async () => await hegel.testAsync(async tc => {
  const refreshOnCompletion = tc.draw(gs.oneOf(gs.booleans(), gs.text({ alphabet: 'abc-', minSize: 1, maxSize: 8 })))
  const { client, sent } = scriptedClient(({ path }) => ({ body: path.endsWith('_bulk') ? { errors: false, items: [{ index: { status: 201 } }] } : {} }))
  await client.helpers.bulk({ datasource: [{}], onDocument: () => ({ index: { _index: 'i' } }), refreshOnCompletion })
  const refreshes = sent.filter(r => r.path.endsWith('/_refresh')).map(r => decodeURIComponent(r.path.split('/')[1]))
  if (refreshOnCompletion === false) assert.deepEqual(refreshes, [])
  else assert.deepEqual(refreshes, [refreshOnCompletion === true ? '_all' : refreshOnCompletion])
}))

test('bulk rejects missing or unsupported datasources and unknown actions with ConfigurationError', async () => await hegel.testAsync(async tc => {
  const { client, sent } = scriptedClient(() => ({}))
  const datasource = tc.draw(gs.oneOf(gs.none(), scalar, jsonObject))
  await assert.rejects(client.helpers.bulk({ datasource: datasource ?? undefined, onDocument: () => ({ index: {} }) }), errors.ConfigurationError)
  const action = tc.draw(gs.text({ minSize: 1, maxSize: 8 }))
  tc.assume(!['index', 'create', 'update', 'delete'].includes(action))
  await assert.rejects(client.helpers.bulk({ datasource: [{}], onDocument: () => ({ [action]: {} }) }), errors.ConfigurationError)
  assert.equal(sent.length, 0)
}))
