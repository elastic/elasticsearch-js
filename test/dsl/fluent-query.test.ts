'use strict'

import { test } from 'tap'
/* eslint-disable no-unused-vars */
import * as types from '../../dsl/lib/types'
/* eslint-enable no-unused-vars */
import { F } from '../../dsl'

test('match', t => {
  t.deepEqual(F()
    .match('foo', 'bar')
    .match('foo', 'baz')
    .build(), {
    query: {
      bool: {
        must: [
          { match: { foo: 'bar' } },
          { match: { foo: 'baz' } }
        ]
      }
    }
  })

  t.deepEqual(F()
    .match('foo', ['bar', 'baz'])
    .build(), {
    query: {
      bool: {
        must: [
          { match: { foo: 'bar' } },
          { match: { foo: 'baz' } }
        ]
      }
    }
  })

  t.end()
})

test('matchPhrase', t => {
  t.deepEqual(F()
    .matchPhrase('foo', 'bar')
    .build(), {
    query: {
      match_phrase: { foo: 'bar' },
    }
  })

  t.end()
})

test('matchPhrasePrefix', t => {
  t.deepEqual(F()
    .matchPhrasePrefix('foo', 'bar')
    .build(), {
    query: {
      match_phrase_prefix: { foo: 'bar' },
    }
  })

  t.end()
})
