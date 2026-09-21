/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'tap'
import { execFileSync } from 'node:child_process'

const { buildLookup } = require('../integration/test-builder.js') as {
  buildLookup: (path: string) => string
}

function evalLookup (path: string, body: unknown): unknown {
  const expr = buildLookup(path)
  const script = `const response = { body: ${JSON.stringify(body)} }; process.stdout.write(JSON.stringify(${expr}))`
  return JSON.parse(execFileSync(process.execPath, ['-e', script], { encoding: 'utf8' }))
}

function assertValidJs (t: { doesNotThrow: (fn: () => void) => void }, path: string): void {
  const expr = buildLookup(path)
  t.doesNotThrow(() => execFileSync(process.execPath, ['-e', `const response = {body:{}}; ${expr}`]))
}

test('escaped dots stay one key', t => {
  t.equal(buildLookup('logs\\.otel.enabled'), 'response.body?.["logs.otel"]?.["enabled"]')
  t.equal(evalLookup('logs\\.otel.enabled', { 'logs.otel': { enabled: true } }), true)
  t.end()
})

test('plain dotted path still splits', t => {
  t.equal(evalLookup('foo.bar', { foo: { bar: 1 } }), 1)
  t.end()
})

test('numeric path segment is an index', t => {
  t.equal(evalLookup('0.name', [{ name: 'a' }]), 'a')
  t.end()
})

test('$body is the raw body', t => {
  t.match(buildLookup('$body'), /response\.body/)
  t.end()
})

test('quote and slash in a key stay valid js', t => {
  t.equal(buildLookup("foo.bar'baz"), 'response.body?.["foo"]?.["bar\'baz"]')
  t.equal(evalLookup("foo.bar'baz", { foo: { "bar'baz": 2 } }), 2)
  assertValidJs(t, 'logs\\.otel.enabled')
  t.end()
})

test('adversarial path segments stay valid js', t => {
  assertValidJs(t, '../')
  assertValidJs(t, '?#')
  t.equal(evalLookup('?#', { '?#': 4 }), 4)
  t.same(evalLookup('', { x: 1 }), { x: 1 })
  t.end()
})
