'use strict'

import { test } from 'tap'
/* eslint-disable no-unused-vars */
import * as types from '../../dsl/lib/types'
/* eslint-enable no-unused-vars */
import { F, Q } from '../../dsl'

test('match', t => {
  t.deepEqual(F()
    .match('foo', 'bar')
    .match('foo', 'baz')
    .build(),
    Q(
      Q.match('foo', 'bar'),
      Q.match('foo', 'baz')
    )
  )

  t.deepEqual(F()
    .match('foo', ['bar', 'baz'])
    .build(),
    Q(
      Q.match('foo', ['bar', 'baz'])
    )
  )

  t.end()
})

test('matchPhrase', t => {
  t.deepEqual(F()
    .matchPhrase('foo', 'bar')
    .build(),
    Q(Q.matchPhrase('foo', 'bar'))
  )

  t.end()
})

test('matchPhrasePrefix', t => {
  t.deepEqual(F()
    .matchPhrasePrefix('foo', 'bar')
    .build(),
    Q(Q.matchPhrasePrefix('foo', 'bar'))
  )

  t.end()
})

test('multiMatch', t => {
  t.deepEqual(F()
    .multiMatch(['foo1', 'foo2'], 'bar')
    .build(),
    Q(Q.multiMatch(['foo1', 'foo2'], 'bar'))
  )

  t.end()
})

test('matchAll', t => {
  t.deepEqual(F()
    .matchAll()
    .build(),
    Q(Q.matchAll())
  )

  t.deepEqual(F()
    .matchAll({ boost: 1 })
    .build(),
    Q(Q.matchAll({ boost: 1 }))
  )

  t.end()
})

test('matchNone', t => {
  t.deepEqual(F()
    .matchNone()
    .build(),
    Q(Q.matchNone())
  )

  t.end()
})
