'use strict'

import { test } from 'tap'
import { Q } from '../../dsl'

test('OR', t => {
  t.test('Bool and Bool', t => {
    noShouldClauses(
      t,
      Q.bool(Q.must(Q.match('foo', 'bar'))),
      Q.bool(Q.filter(Q.term('baz', 'faz')))
    )

    shouldClauses(
      t,
      Q.bool(Q.must(Q.match('foo', 'bar'))),
      Q.bool(Q.should(Q.term('baz', 'faz')))
    )

    sameClauseNoShould(
      t,
      Q.bool(Q.must(Q.match('foo', 'bar'))),
      Q.bool(Q.must(Q.term('baz', 'faz')))
    )

    sameClauseYesShould(
      t,
      Q.bool(Q.should(Q.match('foo', 'bar'))),
      Q.bool(Q.should(Q.term('baz', 'faz')))
    )

    moreNoShould(
      t,
      Q.bool(Q.must(Q.match('foo', 'bar'))),
      Q.bool(Q.filter(Q.term('baz', 'faz'))),
      Q.bool(Q.filter(Q.term('winter', 'is coming')))
    )

    moreYesShould(
      t,
      Q.bool(Q.must(Q.match('foo', 'bar'))),
      Q.bool(Q.filter(Q.term('baz', 'faz'))),
      Q.bool(Q.should(Q.term('winter', 'is coming')))
    )

    t.end()
  })

  t.test('Bool and Clause', t => {
    noShouldClauses(
      t,
      Q.bool(Q.must(Q.match('foo', 'bar'))),
      Q.filter(Q.term('baz', 'faz'))
    )

    shouldClauses(
      t,
      Q.bool(Q.must(Q.match('foo', 'bar'))),
      Q.should(Q.term('baz', 'faz'))
    )

    sameClauseNoShould(
      t,
      Q.bool(Q.must(Q.match('foo', 'bar'))),
      Q.must(Q.term('baz', 'faz'))
    )

    sameClauseYesShould(
      t,
      Q.bool(Q.should(Q.match('foo', 'bar'))),
      Q.should(Q.term('baz', 'faz'))
    )

    moreNoShould(
      t,
      Q.bool(Q.must(Q.match('foo', 'bar'))),
      Q.filter(Q.term('baz', 'faz')),
      Q.filter(Q.term('winter', 'is coming'))
    )

    moreYesShould(
      t,
      Q.bool(Q.must(Q.match('foo', 'bar'))),
      Q.filter(Q.term('baz', 'faz')),
      Q.should(Q.term('winter', 'is coming'))
    )

    t.end()
  })

  t.test('Clause and Bool', t => {
    noShouldClauses(
      t,
      Q.must(Q.match('foo', 'bar')),
      Q.bool(Q.filter(Q.term('baz', 'faz')))
    )

    shouldClauses(
      t,
      Q.must(Q.match('foo', 'bar')),
      Q.bool(Q.should(Q.term('baz', 'faz')))
    )

    sameClauseNoShould(
      t,
      Q.must(Q.match('foo', 'bar')),
      Q.bool(Q.must(Q.term('baz', 'faz')))
    )

    sameClauseYesShould(
      t,
      Q.should(Q.match('foo', 'bar')),
      Q.bool(Q.should(Q.term('baz', 'faz')))
    )

    moreNoShould(
      t,
      Q.must(Q.match('foo', 'bar')),
      Q.filter(Q.term('baz', 'faz')),
      Q.bool(Q.filter(Q.term('winter', 'is coming')))
    )

    moreYesShould(
      t,
      Q.must(Q.match('foo', 'bar')),
      Q.filter(Q.term('baz', 'faz')),
      Q.bool(Q.should(Q.term('winter', 'is coming')))
    )

    t.end()
  })

  t.test('Clause and Clause', t => {
    noShouldClauses(
      t,
      Q.must(Q.match('foo', 'bar')),
      Q.filter(Q.term('baz', 'faz'))
    )

    shouldClauses(
      t,
      Q.must(Q.match('foo', 'bar')),
      Q.should(Q.term('baz', 'faz'))
    )

    sameClauseNoShould(
      t,
      Q.must(Q.match('foo', 'bar')),
      Q.must(Q.term('baz', 'faz'))
    )

    sameClauseYesShould(
      t,
      Q.should(Q.match('foo', 'bar')),
      Q.should(Q.term('baz', 'faz'))
    )

    moreNoShould(
      t,
      Q.must(Q.match('foo', 'bar')),
      Q.filter(Q.term('baz', 'faz')),
      Q.filter(Q.term('winter', 'is coming'))
    )

    moreYesShould(
      t,
      Q.must(Q.match('foo', 'bar')),
      Q.filter(Q.term('baz', 'faz')),
      Q.should(Q.term('winter', 'is coming'))
    )

    t.end()
  })

  t.test('Bool and Condition', t => {
    const query1 = Q.bool(Q.must(Q.match('foo', 'bar')))
    const query2 = Q.term('baz', 'faz')

    t.deepEqual(Q.or(query1, query2), {
      query: {
        bool: {
          should: [
            { bool: { must: [{ match: { foo: 'bar' } }] } },
            { term: { baz: 'faz' } }
          ]
        }
      }
    })

    t.end()
  })

  t.test('Bool (with should) and Condition', t => {
    const query1 = Q.bool(Q.should(Q.match('foo', 'bar')))
    const query2 = Q.term('baz', 'faz')

    t.deepEqual(Q.or(query1, query2), {
      query: {
        bool: {
          should: [
            { match: { foo: 'bar' } },
            { term: { baz: 'faz' } }
          ]
        }
      }
    })

    t.end()
  })

  t.test('Condition and Condition', t => {
    const query1 = Q.match('foo', 'bar')
    const query2 = Q.term('baz', 'faz')

    t.deepEqual(Q.or(query1, query2), {
      query: {
        bool: {
          should: [
            { match: { foo: 'bar' } },
            { term: { baz: 'faz' } }
          ]
        }
      }
    })

    t.end()
  })

  t.end()

  function noShouldClauses (t, query1, query2) {
    t.test('No should clauses', t => {
      t.deepEqual(Q.or(query1, query2), {
        query: {
          bool: {
            should: [
              { bool: { must: [{ match: { foo: 'bar' } }] } },
              { bool: { filter: [{ term: { baz: 'faz' } }] } }
            ]
          }
        }
      })

      t.end()
    })
  }

  function shouldClauses (t, query1, query2) {
    t.test('Should clauses', t => {
      t.deepEqual(Q.or(query1, query2), {
        query: {
          bool: {
            should: [
              { bool: { must: [{ match: { foo: 'bar' } }] } },
              { term: { baz: 'faz' } }
            ]
          }
        }
      })

      t.end()
    })
  }

  function sameClauseNoShould (t, query1, query2) {
    t.test('same clauses without should', t => {
      t.deepEqual(Q.or(query1, query2), {
        query: {
          bool: {
            should: [
              { bool: { must: [{ match: { foo: 'bar' } }] } },
              { bool: { must: [{ term: { baz: 'faz' } }] } }
            ]
          }
        }
      })

      t.end()
    })
  }

  function sameClauseYesShould (t, query1, query2) {
    t.test('same clauses with should', t => {
      t.deepEqual(Q.or(query1, query2), {
        query: {
          bool: {
            should: [
              { match: { foo: 'bar' } },
              { term: { baz: 'faz' } }
            ]
          }
        }
      })

      t.end()
    })
  }

  function moreNoShould (t, query1, query2, query3) {
    t.test('More than two clauses without should', t => {
      t.deepEqual(Q.or(query1, query2, query3), {
        query: {
          bool: {
            should: [
              { bool: { must: [{ match: { foo: 'bar' } }] } },
              { bool: { filter: [{ term: { baz: 'faz' } }] } },
              { bool: { filter: [{ term: { winter: 'is coming' } }] } }
            ]
          }
        }
      })

      t.end()
    })
  }

  function moreYesShould (t, query1, query2, query3) {
    t.test('More than two clauses with should', t => {
      t.deepEqual(Q.or(query1, query2, query3), {
        query: {
          bool: {
            should: [
              { bool: { must: [{ match: { foo: 'bar' } }] } },
              { bool: { filter: [{ term: { baz: 'faz' } }] } },
              { term: { winter: 'is coming' } }
            ]
          }
        }
      })

      t.end()
    })
  }
})
