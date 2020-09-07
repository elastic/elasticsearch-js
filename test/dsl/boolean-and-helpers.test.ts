'use strict'

import { test } from 'tap'
import { Q } from '../../dsl'

test('AND', t => {
  t.test('Bool and Bool', t => {
    noShouldClauses(
      t,
      Q.bool(Q.must(Q.match('foo', 'bar'))),
      Q.bool(Q.filter(Q.term('baz', 'faz')))
    )

    noShouldClausesWithName(
      t,
      Q.bool(Q.must(Q.match('foo', 'bar')), Q.name('name')),
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

    t.deepEqual(Q.and(query1, query2), {
      query: {
        bool: {
          must: [
            { match: { foo: 'bar' } },
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

    t.deepEqual(Q.and(query1, query2), {
      query: {
        bool: {
          must: [{ term: { baz: 'faz' } }],
          should: [{ match: { foo: 'bar' } }]
        }
      }
    })

    t.end()
  })

  t.test('Condition and Condition', t => {
    const query1 = Q.match('foo', 'bar')
    const query2 = Q.term('baz', 'faz')

    t.deepEqual(Q.and(query1, query2), {
      query: {
        bool: {
          must: [
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
      t.deepEqual(Q.and(query1, query2), {
        query: {
          bool: {
            must: [{ match: { foo: 'bar' } }],
            filter: [{ term: { baz: 'faz' } }]
          }
        }
      })

      t.end()
    })
  }

  function noShouldClausesWithName (t, query1, query2) {
    t.test('No should clauses with name', t => {
      t.deepEqual(Q.and(query1, query2), {
        query: {
          bool: {
            must: [{
              bool: {
                must: [{ match: { foo: 'bar' } }],
                _name: 'name'
              }
            }],
            filter: [{ term: { baz: 'faz' } }]
          }
        }
      })

      t.deepEqual(Q.and(query1, query2), Q.and(query2, query1))

      t.end()
    })
  }

  function shouldClauses (t, query1, query2) {
    t.test('Should clauses', t => {
      t.deepEqual(Q.and(query1, query2), {
        query: {
          bool: {
            must: [
              { match: { foo: 'bar' } },
              {
                bool: {
                  should: [
                    { term: { baz: 'faz' } }
                  ]
                }
              }
            ]
          }
        }
      })

      t.end()
    })
  }

  function sameClauseNoShould (t, query1, query2) {
    t.test('same clauses without should', t => {
      t.deepEqual(Q.and(query1, query2), {
        query: {
          bool: {
            must: [
              { match: { foo: 'bar' } },
              { term: { baz: 'faz' } }
            ]
          }
        }
      })

      t.end()
    })
  }

  function sameClauseYesShould (t, query1, query2) {
    t.test('same clauses with should', t => {
      t.deepEqual(Q.and(query1, query2), {
        query: {
          bool: {
            must: [
              {
                bool: {
                  should: [
                    { term: { baz: 'faz' } }
                  ]
                }
              }
            ],
            should: [
              { match: { foo: 'bar' } }
            ]
          }
        }
      })

      t.end()
    })
  }

  function moreNoShould (t, query1, query2, query3) {
    t.test('More than two clauses without should', t => {
      t.deepEqual(Q.and(query1, query2, query3), {
        query: {
          bool: {
            must: [{ match: { foo: 'bar' } }],
            filter: [
              { term: { baz: 'faz' } },
              { term: { winter: 'is coming' } }
            ]
          }
        }
      })

      t.end()
    })
  }

  function moreYesShould (t, query1, query2, query3) {
    t.test('More than two clauses with should', t => {
      t.deepEqual(Q.and(query1, query2, query3), {
        query: {
          bool: {
            must: [
              { match: { foo: 'bar' } },
              {
                bool: {
                  should: [
                    { term: { winter: 'is coming' } }
                  ]
                }
              }
            ],
            filter: [{ term: { baz: 'faz' } }]
          }
        }
      })

      t.end()
    })
  }
})
