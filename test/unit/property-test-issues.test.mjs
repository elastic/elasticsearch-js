/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'tap'
import { parseFailures, planActions, marker, readMarker } from '../../scripts/property-test-issues.mjs'

const tap = [
  'TAP version 14',
  '# Subtest: passes',
  'ok 1 - passes # time=1ms',
  '# Subtest: first bug',
  '    not ok 1 - inner assertion',
  'not ok 2 - first bug # time=2ms',
  // tap never runs todo tests, so this line has no Hegel report
  'not ok 3 - known bug # TODO tracked in #1',
  '# Subtest: second bug',
  'not ok 4 - second bug # time=3ms',
  '1..4'
].join('\n')

const stderr = [
  'const draw_1 = "a";',
  '',
  'To reproduce this failure, replay it with the Hegel builder:',
  '    .reproduceFailure("AAA")',
  'const draw_1 = 2;',
  'To reproduce this failure, replay it with the Hegel builder:',
  '    .reproduceFailure("BBB")'
].join('\n')

test('parseFailures pairs top-level failures with Hegel examples, skipping TODOs', t => {
  t.same(parseFailures('x.test.mjs', tap, stderr), [
    { file: 'x.test.mjs', key: 'x.test.mjs > first bug', example: stderr.split('\n').slice(0, 4).join('\n'), blob: 'AAA' },
    { file: 'x.test.mjs', key: 'x.test.mjs > second bug', example: stderr.split('\n').slice(4).join('\n'), blob: 'BBB' }
  ])
  t.end()
})

test('parseFailures omits examples when they cannot be paired reliably', t => {
  const failures = parseFailures('x.test.mjs', tap, 'const draw_1 = 1;\n    .reproduceFailure("AAA")')
  t.same(failures.map(f => [f.key, f.example, f.blob]), [
    ['x.test.mjs > first bug', null, null],
    ['x.test.mjs > second bug', null, null]
  ])
  t.end()
})

test('planActions dedupes against existing issues and caps new ones', t => {
  const failures = ['a', 'b', 'c', 'd'].map(k => ({ key: k, example: `ex ${k}`, blob: `blob-${k}` }))
  const issues = [
    { number: 1, state: 'OPEN', key: 'a', text: 'mentions blob-a' },
    { number: 2, state: 'OPEN', key: 'b', text: 'old example only' },
    { number: 3, state: 'CLOSED', key: 'c', text: 'blob-c' }
  ]
  t.same(planActions(failures, issues, 5).map(a => [a.type, a.issue?.number ?? a.failure.key]), [
    ['comment', 2],
    ['reopen', 3],
    ['create', 'd']
  ])
  t.same(planActions(failures, [], 2).map(a => a.type), ['create', 'create', 'skip-cap', 'skip-cap'])
  t.end()
})

test('planActions plans one action per key when a run reports the same key twice', t => {
  const failures = [{ key: 'a', example: null, blob: 'x' }, { key: 'a', example: null, blob: 'y' }]
  t.same(planActions(failures, [], 5).map(a => a.type), ['create'])
  t.end()
})

test('planActions ignores issues closed as not planned', t => {
  const failures = [{ key: 'a', example: null, blob: 'x' }]
  const issue = { number: 1, state: 'CLOSED', stateReason: 'NOT_PLANNED', key: 'a', text: '' }
  t.same(planActions(failures, [issue], 5), [{ type: 'ignore', failure: failures[0], issue }])
  t.end()
})

test('marker keys cannot end the HTML comment and round-trip', t => {
  const key = 'x.test.mjs > a --> b -- c'
  const m = marker(key)
  t.equal(m.indexOf('-->'), m.length - 3)
  t.equal(readMarker(`body\n${m}\nmore`), key)
  t.equal(readMarker('no marker'), null)
  t.equal(readMarker('<!-- property-test-key: %E0 -->'), null)
  t.end()
})
