'use strict'

import { test } from 'tap'
import { Q } from '../../dsl'

test('NOT', t => {
  t.test('Bool query', t => {
    const query = Q.bool(
      Q.must(Q.match('foo', 'bar')),
      Q.filter(Q.term('baz', 'faz'))
    )

    t.deepEqual(Q.not(query), {
      bool: {
        must_not: [{
          bool: {
            must: [{ match: { foo: 'bar' } }],
            filter: [{ term: { baz: 'faz' } }]
          }
        }]
      }
    })

    t.end()
  })

  t.test('Bool query (with must_not)', t => {
    const query = Q.bool(
      Q.must(Q.match('foo', 'bar')),
      Q.mustNot(Q.term('baz', 'faz'))
    )
    t.deepEqual(Q.not(query), {
      bool: {
        must_not: [{ match: { foo: 'bar' } }],
        must: [{ term: { baz: 'faz' } }]
      }
    })

    t.end()
  })

  t.test('Bool query (only must)', t => {
    const query = Q.bool(
      Q.must(Q.match('foo', 'bar'))
    )

    t.deepEqual(Q.not(query), {
      bool: {
        must_not: [{
          match: { foo: 'bar' }
        }]
      }
    })

    t.end()
  })

  t.test('Bool query (only must_not)', t => {
    const query = Q.bool(
      Q.mustNot(Q.match('foo', 'bar'))
    )

    t.deepEqual(Q.not(query), {
      bool: {
        must: [{
          match: { foo: 'bar' }
        }]
      }
    })

    t.end()
  })

  t.test('Must clause', t => {
    const query = Q.must(Q.match('foo', 'bar'))

    t.deepEqual(Q.not(query), {
      bool: {
        must_not: [{
          match: { foo: 'bar' }
        }]
      }
    })

    t.end()
  })

  t.test('Should clause', t => {
    const query = Q.should(Q.match('foo', 'bar'))

    t.deepEqual(Q.not(query), {
      bool: {
        must_not: [{
          bool: {
            should: [{
              match: { foo: 'bar' }
            }]
          }
        }]
      }
    })

    t.end()
  })

  t.test('Filter clause', t => {
    const query = Q.filter(Q.match('foo', 'bar'))

    t.deepEqual(Q.not(query), {
      bool: {
        must_not: [{
          bool: {
            filter: [{
              match: { foo: 'bar' }
            }]
          }
        }]
      }
    })

    t.end()
  })

  t.test('Must clause', t => {
    const query = Q.mustNot(Q.match('foo', 'bar'))

    t.deepEqual(Q.not(query), {
      bool: {
        must: [{
          match: { foo: 'bar' }
        }]
      }
    })

    t.end()
  })

  t.test('Condition', t => {
    const query = Q.match('foo', 'bar')

    t.deepEqual(Q.not(query), {
      bool: {
        must_not: [{
          match: { foo: 'bar' }
        }]
      }
    })

    t.end()
  })

  t.end()
})
