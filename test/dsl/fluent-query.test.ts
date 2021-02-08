'use strict'

import { test } from 'tap'
/* eslint-disable no-unused-vars */
import * as types from '../../dsl/lib/types'
/* eslint-enable no-unused-vars */
import { F, Q } from '../../dsl'

test('match', t => {
  t.deepEqual(
    F()
      .match('foo', 'bar')
      .match('foo', 'baz')
      .build(),
    Q(
      Q.match('foo', 'bar'),
      Q.match('foo', 'baz')
    )
  )

  t.deepEqual(
    F()
      .match('foo', ['bar', 'baz'])
      .build(),
    Q(
      Q.match('foo', ['bar', 'baz'])
    )
  )

  t.end()
})

test('matchPhrase', t => {
  t.deepEqual(
    F()
      .matchPhrase('foo', 'bar')
      .build(),
    Q(Q.matchPhrase('foo', 'bar'))
  )

  t.end()
})

test('matchPhrasePrefix', t => {
  t.deepEqual(
    F()
      .matchPhrasePrefix('foo', 'bar')
      .build(),
    Q(Q.matchPhrasePrefix('foo', 'bar'))
  )

  t.end()
})

test('multiMatch', t => {
  t.deepEqual(
    F()
      .multiMatch(['foo1', 'foo2'], 'bar')
      .build(),
    Q(Q.multiMatch(['foo1', 'foo2'], 'bar'))
  )

  t.end()
})

test('matchAll', t => {
  t.deepEqual(
    F()
      .matchAll()
      .build(),
    Q(Q.matchAll())
  )

  t.deepEqual(
    F()
      .matchAll({ boost: 1 })
      .build(),
    Q(Q.matchAll({ boost: 1 }))
  )

  t.end()
})

test('matchNone', t => {
  t.deepEqual(
    F()
      .matchNone()
      .build(),
    Q(Q.matchNone())
  )

  t.end()
})

test('common', t => {
  t.deepEqual(
    F()
      .common('key', 'val')
      .build(),
    Q(Q.common('key', 'val'))
  )

  t.deepEqual(
    F()
      .common('key', 'val', { boost: 1 })
      .build(),
    Q(Q.common('key', 'val', { boost: 1 }))
  )

  t.deepEqual(
    F()
      .common('key', ['val1', 'val2'])
      .build(),
    Q(Q.common('key', ['val1', 'val2']))
  )

  t.end()
})

test('queryString', t => {
  t.deepEqual(
    F()
      .queryString('val', { boost: 1 })
      .build(),
    Q(Q.queryString('val', { boost: 1 }))
  )

  t.end()
})

test('simpleQueryString', t => {
  t.deepEqual(
    F()
      .simpleQueryString('val', { boost: 1 })
      .build(),
    Q(Q.simpleQueryString('val', { boost: 1 }))
  )

  t.end()
})

test('term', t => {
  t.deepEqual(
    F()
      .term('key', 'val')
      .build(),
    Q(Q.term('key', 'val'))
  )

  t.deepEqual(
    F()
      .term('key', 'val', { boost: 1 })
      .build(),
    Q(Q.term('key', 'val', { boost: 1 }))
  )

  t.deepEqual(
    F()
      .term('key', ['val1', 'val2'])
      .build(),
    Q(Q.term('key', ['val1', 'val2']))
  )

  t.end()
})

test('terms', t => {
  t.deepEqual(
    F()
      .terms('key', ['val1', 'val2'])
      .build(),
    Q(Q.terms('key', ['val1', 'val2']))
  )

  t.deepEqual(
    F()
      .terms('key', ['val1', 'val2'], { boost: 1 })
      .build(),
    Q(Q.terms('key', ['val1', 'val2'], { boost: 1 }))
  )

  t.end()
})

test('termsSet', t => {
  t.deepEqual(
    F()
      .termsSet('key', ['val1', 'val2'])
      .build(),
    Q(Q.termsSet('key', ['val1', 'val2']))
  )

  t.deepEqual(
    F()
      .termsSet('key', ['val1', 'val2'], { boost: 1 })
      .build(),
    Q(Q.termsSet('key', ['val1', 'val2'], { boost: 1 }))
  )

  t.end()
})

test('range', t => {
  t.deepEqual(
    F()
      .range('key', { gt: 10 })
      .build(),
    Q(Q.range('key', { gt: 10 }))
  )

  t.end()
})

test('exists', t => {
  t.deepEqual(
    F()
      .exists('key')
      .build(),
    Q(Q.exists('key'))
  )

  t.deepEqual(
    F()
      .exists(['key1', 'key2'])
      .build(),
    Q(Q.exists(['key1', 'key2']))
  )

  t.end()
})

test('prefix', t => {
  t.deepEqual(
    F()
      .prefix('key', 'val')
      .build(),
    Q(Q.prefix('key', 'val'))
  )

  t.deepEqual(
    F()
      .prefix('key', 'val', { boost: 1 })
      .build(),
    Q(Q.prefix('key', 'val', { boost: 1 }))
  )

  t.deepEqual(
    F()
      .prefix('key', ['val1', 'val2'])
      .build(),
    Q(Q.prefix('key', ['val1', 'val2']))
  )

  t.end()
})

test('wildcard', t => {
  t.deepEqual(
    F()
      .wildcard('key', 'val')
      .build(),
    Q(Q.wildcard('key', 'val'))
  )

  t.deepEqual(
    F()
      .wildcard('key', 'val', { boost: 1 })
      .build(),
    Q(Q.wildcard('key', 'val', { boost: 1 }))
  )

  t.deepEqual(
    F()
      .wildcard('key', ['val1', 'val2'])
      .build(),
    Q(Q.wildcard('key', ['val1', 'val2']))
  )

  t.end()
})

test('regexp', t => {
  t.deepEqual(
    F()
      .regexp('key', 'val')
      .build(),
    Q(Q.regexp('key', 'val'))
  )

  t.deepEqual(
    F()
      .regexp('key', 'val', { boost: 1 })
      .build(),
    Q(Q.regexp('key', 'val', { boost: 1 }))
  )

  t.deepEqual(
    F()
      .regexp('key', ['val1', 'val2'])
      .build(),
    Q(Q.regexp('key', ['val1', 'val2']))
  )

  t.end()
})

test('fuzzy', t => {
  t.deepEqual(
    F()
      .fuzzy('key', 'val')
      .build(),
    Q(Q.fuzzy('key', 'val'))
  )

  t.deepEqual(
    F()
      .fuzzy('key', 'val', { boost: 1 })
      .build(),
    Q(Q.fuzzy('key', 'val', { boost: 1 }))
  )

  t.deepEqual(
    F()
      .fuzzy('key', ['val1', 'val2'])
      .build(),
    Q(Q.fuzzy('key', ['val1', 'val2']))
  )

  t.end()
})

test('ids', t => {
  t.deepEqual(
    F()
      .ids('key', ['val1', 'val2'])
      .build(),
    Q(Q.ids('key', ['val1', 'val2']))
  )

  t.end()
})

test('minShouldMatch', t => {
  t.deepEqual(
    F()
      .minShouldMatch(42)
      .build(),
    Q(Q.minShouldMatch(42))
  )

  t.end()
})

test('name', t => {
  t.deepEqual(
    F()
      .name('test')
      .build(),
    Q(Q.name('test'))
  )

  t.end()
})

test('size', t => {
  t.deepEqual(
    F()
      .size(42)
      .build(),
    Q(Q.size(42))
  )

  t.end()
})

test('script', t => {
  t.deepEqual(
    F().script("doc['num1'].value > 1").build(),
    Q(Q.script("doc['num1'].value > 1"))
  )

  t.deepEqual(
    F().script("doc['num1'].value > 1", 'painless').build(),
    Q(Q.script("doc['num1'].value > 1", 'painless'))
  )

  t.deepEqual(
    F().script("doc['num1'].value > 1", { foo: 'bar' }).build(),
    Q(Q.script("doc['num1'].value > 1", { foo: 'bar' }))
  )

  t.deepEqual(
    F().script("doc['num1'].value > 1", { foo: 'bar' }, 'painless').build(),
    Q(Q.script("doc['num1'].value > 1", { foo: 'bar' }, 'painless'))
  )

  t.end()
})

test('must', t => {
  const q1 = F().must(
    F().match('foo', 'bar'),
    F().term('hello', 'world'),
    F().should(
      F().match('one', 'two').match('three', 'four')
    ),
    F().match('faz', ['baz', 'zaz'])
  )

  const q2 = Q.must(
    Q.match('foo', 'bar'),
    Q.term('hello', 'world'),
    Q.should(
      Q.match('one', 'two'),
      Q.match('three', 'four')
    ),
    Q.match('faz', ['baz', 'zaz'])
  )

  t.deepEqual(q1.buildQuery(), Q.bool(q2))

  t.end()
})

test('should', t => {
  const q1 = F().should(
    F().match('foo', 'bar'),
    F().term('hello', 'world'),
    F().must(
      F().match('one', 'two').match('three', 'four')
    ),
    F().match('faz', ['baz', 'zaz'])
  )

  const q2 = Q.should(
    Q.match('foo', 'bar'),
    Q.term('hello', 'world'),
    Q.must(
      Q.match('one', 'two'),
      Q.match('three', 'four')
    ),
    Q.match('faz', ['baz', 'zaz'])
  )

  t.deepEqual(q1.buildQuery(), Q.bool(q2))

  t.end()
})

test('mustNot', t => {
  const q1 = F().mustNot(
    F().match('foo', 'bar'),
    F().term('hello', 'world'),
    F().should(
      F().match('one', 'two').match('three', 'four')
    ),
    F().match('faz', ['baz', 'zaz'])
  )

  const q2 = Q.mustNot(
    Q.match('foo', 'bar'),
    Q.term('hello', 'world'),
    Q.should(
      Q.match('one', 'two'),
      Q.match('three', 'four')
    ),
    Q.match('faz', ['baz', 'zaz'])
  )

  t.deepEqual(q1.buildQuery(), Q.bool(q2))

  t.end()
})

test('filter', t => {
  const q1 = F().filter(
    F().match('foo', 'bar'),
    F().term('hello', 'world'),
    F().should(
      F().match('one', 'two').match('three', 'four')
    ),
    F().match('faz', ['baz', 'zaz'])
  )

  const q2 = Q.filter(
    Q.match('foo', 'bar'),
    Q.term('hello', 'world'),
    Q.should(
      Q.match('one', 'two'),
      Q.match('three', 'four')
    ),
    Q.match('faz', ['baz', 'zaz'])
  )

  t.deepEqual(q1.buildQuery(), Q.bool(q2))

  t.end()
})

test('and', t => {
  const q1 = F()
    .match('foo', 'bar')
    .match('foo', 'baz')

  const q2 = F()
    .should(
      F()
        .term('foo', 'bar')
        .term('foo', 'baz')
    )

  t.deepEqual(
    q1.clone().and(q2).buildQuery(),
    Q.and(q1.buildQuery(), q2.buildQuery())
  )

  const q3 = F()
    .match('foo', 'bar')
    .match('foo', 'baz')
    .sort('foo')

  const q4 = F()
    .should(
      F()
        .term('foo', 'bar')
        .term('foo', 'baz')
    )

  t.deepEqual(
    q3.clone().and(q4).buildQuery(),
    Q.and(q3.buildQuery(), q4.buildQuery())
  )

  t.end()
})

test('toJSON', t => {
  const q1 = F()
    .match('foo', 'bar')

  t.strictEqual(
    JSON.stringify(q1),
    '{"match":{"foo":"bar"}}'
  )

  const q2 = F()
    .match('foo', 'bar')
    .match('foo', 'baz')

  t.strictEqual(
    JSON.stringify(q2),
    '{"bool":{"must":[{"match":{"foo":"bar"}},{"match":{"foo":"baz"}}]}}'
  )

  t.end()
})
