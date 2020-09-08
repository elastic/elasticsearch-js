'use strict'

import { test } from 'tap'
/* eslint-disable no-unused-vars */
import * as types from '../../dsl/lib/types'
/* eslint-enable no-unused-vars */
import { Q } from '../../dsl'

test('Q is a function that creates the final query object', t => {
  t.type(Q, 'function')

  t.deepEqual(Q(c('a'), c('b'), c('c')), {
    query: {
      bool: {
        must: [
          c('a'),
          c('b'),
          c('c')
        ]
      }
    }
  })

  const topLevelKeys = [
    'aggs',
    'collapse',
    'explain',
    'from',
    'highlight',
    'indices_boost',
    'min_score',
    'post_filter',
    'profile',
    'rescore',
    'script_fields',
    'search_after',
    'size',
    'slice',
    'sort',
    '_source',
    'suggest',
    'terminate_after',
    'timeout',
    'track_scores',
    'version'
  ]

  const randomTopLevelKey = topLevelKeys[Math.floor(Math.random() * topLevelKeys.length)]

  t.deepEqual(Q({ match: { foo: 'bar' } }, { match: { foo: 'baz' } }, { [randomTopLevelKey]: 42 }), {
    query: {
      bool: {
        must: [
          { match: { foo: 'bar' } },
          { match: { foo: 'baz' } }
        ]
      }
    },
    [randomTopLevelKey]: 42
  })

  t.deepEqual(Q({ match: { foo: 'bar' } }, { [randomTopLevelKey]: 42 }), {
    query: {
      match: { foo: 'bar' }
    },
    [randomTopLevelKey]: 42
  })

  t.deepEqual(Q({ query: { function_score: { max_boost: 42 } } }, { [randomTopLevelKey]: 42 }), {
    query: {
      function_score: { max_boost: 42 }
    },
    [randomTopLevelKey]: 42
  })

  t.deepEqual(Q({ query: { bool: {} } }, { [randomTopLevelKey]: 42 }), {
    query: {
      bool: {}
    },
    [randomTopLevelKey]: 42
  })

  t.end()
})

test('Compile a query (safe)', t => {
  t.type(Q.param, 'function')
  t.type(Q.compile, 'function')

  const query = Q(
    Q.match('a', Q.param('a')),
    Q.match('b', Q.param('b')),
    Q.match('c', Q.param('c'))
  )

  interface Input {
    a: number,
    b: number,
    c: number
  }
  const compiledQuery = Q.compile<Input>(query)

  t.deepEqual(compiledQuery({ a: 1, b: 2, c: 3 }), {
    query: {
      bool: {
        must: [
          { match: { a: 1 } },
          { match: { b: 2 } },
          { match: { c: 3 } }
        ]
      }
    }
  })

  try {
    Q.compile(Q.bool())
  } catch (err) {
    t.is(err.message, 'The query does not contain any use of `Q.params`')
  }

  t.end()
})

test('Compile a query (unsafe)', t => {
  t.type(Q.param, 'function')
  t.type(Q.compile, 'function')

  const query = Q(
    Q.match('a', Q.param('a')),
    Q.match('b', Q.param('b')),
    Q.match('c', Q.param('c'))
  )

  interface Input {
    a: number,
    b: number,
    c: number
  }
  const compiledQuery = Q.compileUnsafe<Input>(query)

  t.deepEqual(compiledQuery({ a: 1, b: 2, c: 3 }), {
    query: {
      bool: {
        must: [
          { match: { a: 1 } },
          { match: { b: 2 } },
          { match: { c: 3 } }
        ]
      }
    }
  })

  try {
    Q.compileUnsafe(Q.bool())
  } catch (err) {
    t.is(err.message, 'The query does not contain any use of `Q.params`')
  }

  t.end()
})

test('match returns a match query', t => {
  t.type(Q.match, 'function')

  t.test('simple query', t => {
    t.deepEqual(Q.match('foo', 'bar'), {
      match: { foo: 'bar' }
    })
    t.end()
  })

  t.test('simple query', t => {
    t.deepEqual(Q.match('foo', ['bar', 'baz']), [
      { match: { foo: 'bar' } },
      { match: { foo: 'baz' } }
    ])
    t.end()
  })

  t.test('complex query', t => {
    t.deepEqual(Q.match('foo', 'bar', { analyzer: 'and' }), {
      match: {
        foo: {
          query: 'bar',
          analyzer: 'and'
        }
      }
    })
    t.end()
  })

  t.end()
})

test('matchPhrase returns a match_phrase query', t => {
  t.type(Q.matchPhrase, 'function')

  t.test('simple query', t => {
    t.deepEqual(Q.matchPhrase('foo', 'bar'), {
      match_phrase: { foo: 'bar' }
    })
    t.end()
  })

  t.test('complex query', t => {
    t.deepEqual(Q.matchPhrase('foo', 'bar', { analyzer: 'test' }), {
      match_phrase: {
        foo: {
          query: 'bar',
          analyzer: 'test'
        }
      }
    })
    t.end()
  })

  t.end()
})

test('matchPhrasePrefix returns a match_phrase_prefix query', t => {
  t.type(Q.matchPhrasePrefix, 'function')

  t.test('simple query', t => {
    t.deepEqual(Q.matchPhrasePrefix('foo', 'bar'), {
      match_phrase_prefix: { foo: 'bar' }
    })
    t.end()
  })

  t.test('complex query', t => {
    t.deepEqual(Q.matchPhrasePrefix('foo', 'bar', { max_expansions: 10 }), {
      match_phrase_prefix: {
        foo: {
          query: 'bar',
          max_expansions: 10
        }
      }
    })
    t.end()
  })

  t.end()
})

test('multiMatch returns a multi_match query', t => {
  t.type(Q.multiMatch, 'function')

  t.deepEqual(Q.multiMatch(['foo', 'baz'], 'bar', { analyzer: 'best_fields' }), {
    multi_match: {
      query: 'bar',
      fields: ['foo', 'baz'],
      analyzer: 'best_fields'
    }
  })

  t.end()
})

test('matchAll returns a match_all query', t => {
  t.type(Q.matchAll, 'function')

  t.deepEqual(Q.matchAll({ norm_field: 'foobar' }), {
    match_all: { norm_field: 'foobar' }
  })

  t.end()
})

test('matchNone returns a match_none query', t => {
  t.type(Q.matchNone, 'function')

  t.deepEqual(Q.matchNone(), {
    match_none: {}
  })

  t.end()
})

test('common returns a common query', t => {
  t.type(Q.common, 'function')

  t.deepEqual(Q.common('foo', 'bar', { cutoff_frequency: 0.001 }), {
    common: {
      foo: {
        query: 'bar',
        cutoff_frequency: 0.001
      }
    }
  })

  t.end()
})

test('queryString returns a query_string query', t => {
  t.type(Q.queryString, 'function')

  t.deepEqual(Q.queryString('foo', { default_field: 'content' }), {
    query_string: {
      query: 'foo',
      default_field: 'content'
    }
  })

  t.end()
})

test('simpleQueryString returns a simple_query_string query', t => {
  t.type(Q.simpleQueryString, 'function')

  t.deepEqual(Q.simpleQueryString('foo', { analyzer: 'content' }), {
    simple_query_string: {
      query: 'foo',
      analyzer: 'content'
    }
  })

  t.end()
})

test('term returns a term query', t => {
  t.type(Q.term, 'function')

  t.test('simple query', t => {
    t.deepEqual(Q.term('foo', 'bar'), {
      term: { foo: 'bar' }
    })
    t.end()
  })

  t.test('complex query', t => {
    t.deepEqual(Q.term('foo', 'bar', { boost: 2.0 }), {
      term: {
        foo: {
          value: 'bar',
          boost: 2.0
        }
      }
    })
    t.end()
  })

  t.end()
})

test('terms returns a terms query', t => {
  t.type(Q.terms, 'function')

  t.deepEqual(Q.terms('foo', ['bar', 'baz']), {
    terms: { foo: ['bar', 'baz'] }
  })

  t.deepEqual(
    Q.terms('foo', ['bar', 'baz']),
    Q.term('foo', ['bar', 'baz'])
  )

  t.end()
})

test('termsSet returns a terms_set query', t => {
  t.type(Q.termsSet, 'function')

  t.deepEqual(Q.termsSet('foo', ['bar', 'baz'], { minimum_should_match_field: 'required_matches' }), {
    terms_set: {
      foo: {
        terms: ['bar', 'baz'],
        minimum_should_match_field: 'required_matches'
      }
    }
  })

  t.end()
})

test('range returns a range query', t => {
  t.type(Q.range, 'function')

  t.deepEqual(Q.range('foo', { gte: 2 }), {
    range: { foo: { gte: 2 } }
  })

  t.end()
})

test('exists returns a exists query', t => {
  t.type(Q.exists, 'function')

  t.deepEqual(Q.exists('foo'), {
    exists: { field: 'foo' }
  })

  t.deepEqual(Q.exists(['foo', 'bar']), [{
    exists: { field: 'foo' }
  }, {
    exists: { field: 'bar' }
  }])

  t.end()
})

test('prefix returns a prefix query', t => {
  t.type(Q.prefix, 'function')

  t.test('simple query', t => {
    t.deepEqual(Q.prefix('foo', 'bar'), {
      prefix: { foo: 'bar' }
    })
    t.end()
  })

  t.test('complex query', t => {
    t.deepEqual(Q.prefix('foo', 'bar', { boost: 2.0 }), {
      prefix: {
        foo: {
          value: 'bar',
          boost: 2.0
        }
      }
    })
    t.end()
  })

  t.end()
})

test('wildcard returns a wildcard query', t => {
  t.type(Q.wildcard, 'function')

  t.test('simple query', t => {
    t.deepEqual(Q.wildcard('foo', 'bar'), {
      wildcard: { foo: 'bar' }
    })
    t.end()
  })

  t.test('complex query', t => {
    t.deepEqual(Q.wildcard('foo', 'bar', { boost: 2.0 }), {
      wildcard: {
        foo: {
          value: 'bar',
          boost: 2.0
        }
      }
    })
    t.end()
  })

  t.end()
})

test('regexp returns a regexp query', t => {
  t.type(Q.regexp, 'function')

  t.test('simple query', t => {
    t.deepEqual(Q.regexp('foo', 'bar'), {
      regexp: { foo: 'bar' }
    })
    t.end()
  })

  t.test('complex query', t => {
    t.deepEqual(Q.regexp('foo', 'bar', { boost: 2.0 }), {
      regexp: {
        foo: {
          value: 'bar',
          boost: 2.0
        }
      }
    })
    t.end()
  })

  t.end()
})

test('fuzzy returns a fuzzy query', t => {
  t.type(Q.fuzzy, 'function')

  t.test('simple query', t => {
    t.deepEqual(Q.fuzzy('foo', 'bar'), {
      fuzzy: { foo: 'bar' }
    })
    t.end()
  })

  t.test('complex query', t => {
    t.deepEqual(Q.fuzzy('foo', 'bar', { boost: 2.0 }), {
      fuzzy: {
        foo: {
          value: 'bar',
          boost: 2.0
        }
      }
    })
    t.end()
  })

  t.end()
})

test('ids returns a ids query', t => {
  t.type(Q.ids, 'function')

  t.deepEqual(Q.ids('foo', ['bar', 'baz'], { type: '_doc' }), {
    ids: {
      foo: {
        values: ['bar', 'baz'],
        type: '_doc'
      }
    }
  })

  t.end()
})

test('must returns a must block', t => {
  t.type(Q.must, 'function')

  t.deepEqual(Q.must(c('foo'), c('bar'), c('baz')), {
    must: [c('foo'), c('bar'), c('baz')]
  })

  // should flat arrays
  t.deepEqual(Q.must(c('foo'), [c('bar')], c('baz')), {
    must: [c('foo'), c('bar'), c('baz')]
  })

  t.deepEqual(
    Q.must(
      c('foo'),
      Q.must(c('bar')),
      Q.bool(Q.must(c('baz')))
    ),
    { must: [c('foo'), c('bar'), c('baz')] }
  )

  t.deepEqual(
    Q.must(
      c('foo'),
      Q.must(c('bar'), Q.bool(Q.must(c('faz')))),
      Q.bool(Q.must(c('baz')))
    ),
    { must: [c('foo'), c('bar'), c('faz'), c('baz')] }
  )

  t.deepEqual(
    Q.must(
      c('foo'),
      Q.must(c('bar')),
      Q.bool(Q.should(c('baz')))
    ),
    { must: [c('foo'), c('bar'), { bool: Q.should(c('baz')) }] }
  )

  t.deepEqual(
    Q.must(
      c('foo'),
      Q.must(c('bar')),
      Q.should(c('baz'))
    ),
    { must: [c('foo'), c('bar'), { bool: Q.should(c('baz')) }] }
  )

  t.end()
})

test('should returns a should block', t => {
  t.type(Q.should, 'function')

  t.deepEqual(Q.should(c('foo'), c('bar'), c('baz')), {
    should: [c('foo'), c('bar'), c('baz')]
  })

  // should flat arrays
  t.deepEqual(Q.should(c('foo'), [c('bar')], c('baz')), {
    should: [c('foo'), c('bar'), c('baz')]
  })

  t.deepEqual(
    Q.should(
      c('foo'),
      Q.should(c('bar')),
      Q.bool(Q.should(c('baz')))
    ),
    { should: [c('foo'), c('bar'), c('baz')] }
  )

  t.deepEqual(
    Q.should(
      c('foo'),
      Q.should(c('bar'), Q.bool(Q.should(c('faz')))),
      Q.bool(Q.should(c('baz')))
    ),
    { should: [c('foo'), c('bar'), c('faz'), c('baz')] }
  )

  t.deepEqual(
    Q.should(
      c('foo'),
      Q.should(c('bar')),
      Q.bool(Q.must(c('baz')))
    ),
    { should: [c('foo'), c('bar'), { bool: Q.must(c('baz')) }] }
  )

  t.deepEqual(
    Q.should(
      c('foo'),
      Q.should(c('bar')),
      Q.must(c('baz'))
    ),
    { should: [c('foo'), c('bar'), { bool: Q.must(c('baz')) }] }
  )

  t.deepEqual(
    Q.should(
      c('foo'),
      Q.should(c('bar')),
      Q.bool(Q.should(c('baz'), c('faz')), { minimum_should_match: 1 })
    ),
    {
      should: [
        c('foo'), c('bar'),
        { bool: { ...Q.should(c('baz'), c('faz')), minimum_should_match: 1 } }
      ]
    }
  )

  t.deepEqual(
    Q.should(
      c('foo'),
      Q.should(c('bar')),
      { ...Q.should(c('baz'), c('faz')), minimum_should_match: 1 }
    ),
    {
      should: [
        c('foo'), c('bar'),
        { bool: { ...Q.should(c('baz'), c('faz')), minimum_should_match: 1 } }
      ]
    }
  )

  t.deepEqual(
    Q.should(
      c('foo'),
      { ...Q.should(c('bar1'), c('bar2')), minimum_should_match: 1 },
      Q.bool(Q.should(c('baz1'), c('baz2')), { minimum_should_match: 1 })
    ),
    {
      should: [
        c('foo'),
        { bool: { ...Q.should(c('bar1'), c('bar2')), minimum_should_match: 1 } },
        { bool: { ...Q.should(c('baz1'), c('baz2')), minimum_should_match: 1 } }
      ]
    }
  )

  t.end()
})

test('mustNot returns a must_not block', t => {
  t.type(Q.mustNot, 'function')

  t.deepEqual(Q.mustNot(c('foo'), c('bar'), c('baz')), {
    must_not: [c('foo'), c('bar'), c('baz')]
  })

  // should flat arrays
  t.deepEqual(Q.mustNot(c('foo'), [c('bar')], c('baz')), {
    must_not: [c('foo'), c('bar'), c('baz')]
  })

  t.deepEqual(
    Q.mustNot(
      c('foo'),
      Q.mustNot(c('bar')),
      Q.bool(Q.mustNot(c('baz')))
    ),
    { must_not: [c('foo'), c('bar'), c('baz')] }
  )

  t.deepEqual(
    Q.mustNot(
      c('foo'),
      Q.mustNot(c('bar'), Q.bool(Q.mustNot(c('faz')))),
      Q.bool(Q.mustNot(c('baz')))
    ),
    { must_not: [c('foo'), c('bar'), c('faz'), c('baz')] }
  )

  t.deepEqual(
    Q.mustNot(
      c('foo'),
      Q.mustNot(c('bar')),
      Q.bool(Q.should(c('baz')))
    ),
    { must_not: [c('foo'), c('bar'), { bool: Q.should(c('baz')) }] }
  )

  t.deepEqual(
    Q.mustNot(
      c('foo'),
      Q.mustNot(c('bar')),
      Q.should(c('baz'))
    ),
    { must_not: [c('foo'), c('bar'), { bool: Q.should(c('baz')) }] }
  )

  t.end()
})

test('filter returns a filter block', t => {
  t.type(Q.filter, 'function')

  t.deepEqual(Q.filter(c('foo'), c('bar'), c('baz')), {
    filter: [c('foo'), c('bar'), c('baz')]
  })

  // should flat arrays
  t.deepEqual(Q.filter(c('foo'), [c('bar')], c('baz')), {
    filter: [c('foo'), c('bar'), c('baz')]
  })

  t.deepEqual(
    Q.filter(
      c('foo'),
      Q.filter(c('bar')),
      Q.bool(Q.filter(c('baz')))
    ),
    { filter: [c('foo'), c('bar'), c('baz')] }
  )

  t.deepEqual(
    Q.filter(
      c('foo'),
      Q.filter(c('bar'), Q.bool(Q.filter(c('faz')))),
      Q.bool(Q.filter(c('baz')))
    ),
    { filter: [c('foo'), c('bar'), c('faz'), c('baz')] }
  )

  t.deepEqual(
    Q.filter(
      c('foo'),
      Q.filter(c('bar')),
      Q.bool(Q.should(c('baz')))
    ),
    { filter: [c('foo'), c('bar'), { bool: Q.should(c('baz')) }] }
  )

  t.deepEqual(
    Q.filter(
      c('foo'),
      Q.filter(c('bar')),
      Q.should(c('baz'))
    ),
    { filter: [c('foo'), c('bar'), { bool: Q.should(c('baz')) }] }
  )

  t.end()
})

test('bool returns a bool query block', t => {
  t.type(Q.bool, 'function')

  t.deepEqual(Q.bool(Q.must(c('foo')), Q.should(c('bar')), Q.filter(c('baz'))), {
    bool: {
      must: [c('foo')],
      should: [c('bar')],
      filter: [c('baz')]
    }
  })

  t.deepEqual(Q.bool(), { bool: {} })
  t.deepEqual(Q.bool(undefined), { bool: {} })

  t.deepEqual(Q.bool(Q.must(c('foo')), Q.should(c('bar')), Q.mustNot(c('foz')), Q.filter(c('baz'), c('faz'))), {
    bool: {
      must: [c('foo')],
      must_not: [c('foz')],
      should: [c('bar')],
      filter: [c('baz'), c('faz')]
    }
  })

  t.deepEqual(Q.bool(
    c('foo'),
    Q.bool(
      Q.name('name'),
      Q.must(c('faz'))
    ),
    Q.should(c('bar')),
    Q.filter(c('baz'))
  ), {
    bool: {
      must: [
        c('foo'),
        { bool: { must: [c('faz')], _name: 'name' } }
      ],
      should: [c('bar')],
      filter: [c('baz')]
    }
  })

  t.deepEqual(Q.bool(
    Q.must(Q.term('hello', 'world')),
    Q.match('foo', 'bar'),
    Q.match('baz', 'faz'),
    Q.minShouldMatch(1)
  ), {
    bool: {
      must: [
        { term: { hello: 'world' } }
      ],
      should: [
        { match: { foo: 'bar' } },
        { match: { baz: 'faz' } }
      ],
      minimum_should_match: 1
    }
  })

  t.deepEqual(Q.bool(
    Q.must(Q.term('hello', 'world')),
    Q.match('foo', 'bar'),
    Q.match('baz', 'faz'),
    Q.minShouldMatch(2)
  ), {
    bool: {
      must: [
        { term: { hello: 'world' } },
        { match: { foo: 'bar' } },
        { match: { baz: 'faz' } }
      ]
    }
  })

  t.deepEqual(Q.bool(
    Q.match('foo', 'bar'),
    Q.match('baz', 'faz'),
    Q.minShouldMatch(2)
  ), {
    bool: {
      must: [
        { match: { foo: 'bar' } },
        { match: { baz: 'faz' } }
      ]
    }
  })

  t.deepEqual(Q.bool(
    Q.match('foo', ['bar', 'baz'])
  ), {
    bool: {
      must: [
        { match: { foo: 'bar' } },
        { match: { foo: 'baz'} }
      ]
    }
  })

  t.end()
})

test('nested returns a nested query block', t => {
  t.type(Q.nested, 'function')

  const query = Q.bool(Q.must(c('foo')), Q.should(c('bar')), Q.filter(c('baz')))
  t.deepEqual(Q.nested('foo', query, { ignore_unmapped: true }), {
    nested: {
      path: 'foo',
      ignore_unmapped: true,
      ...query
    }
  })

  t.end()
})

test('constantScore returns a constant_score query block', t => {
  t.type(Q.constantScore, 'function')

  const query = Q.bool(Q.must(c('foo')), Q.should(c('bar')), Q.filter(c('baz')))
  t.deepEqual(Q.constantScore(query, 2.0), {
    constant_score: {
      boost: 2.0,
      filter: query
    }
  })

  t.end()
})

test('disMax returns a dis_max query block', t => {
  t.type(Q.disMax, 'function')

  t.test('simple query', t => {
    t.deepEqual(Q.disMax([c('a'), c('b'), c('c')]), {
      dis_max: {
        queries: [c('a'), c('b'), c('c')]
      }
    })
    t.end()
  })

  t.test('complex query', t => {
    t.deepEqual(Q.disMax([c('a'), c('b'), c('c')], { tie_breaker: 1.0, boost: 1.0 }), {
      dis_max: {
        tie_breaker: 1.0,
        boost: 1.0,
        queries: [c('a'), c('b'), c('c')]
      }
    })
    t.end()
  })

  t.end()
})

test('functionScore returns a function_score query block', t => {
  t.type(Q.functionScore, 'function')

  t.deepEqual(Q.functionScore({ max_boost: 42 }), {
    function_score: { max_boost: 42 }
  })

  t.end()
})

test('boosting returns a boosting query block', t => {
  t.type(Q.boosting, 'function')

  t.deepEqual(Q.boosting({ negative_boost: 42 }), {
    boosting: { negative_boost: 42 }
  })

  t.end()
})

test('sort returns a sort block', t => {
  t.type(Q.sort, 'function')

  t.test('simple sort', t => {
    t.deepEqual(Q.sort('foo', { order: 'asc' }), {
      sort: [{ foo: { order: 'asc' } }]
    })
    t.end()
  })

  // t.test('multiple sorts', t => {
  //   t.deepEqual(Q.sort([{ foo: { order: 'asc' } }, { bar: { order: 'desc' } }]), {
  //     sort: [
  //       { foo: { order: 'asc' } },
  //       { bar: { order: 'desc' } }
  //     ]
  //   })
  //   t.end()
  // })

  t.end()
})

test('size', t => {
  t.type(Q.size, 'function')

  t.deepEqual(Q.size(5), { size: 5 })

  t.end()
})

test('minShouldMatch', t => {
  t.type(Q.minShouldMatch, 'function')

  t.deepEqual(Q.minShouldMatch(5), { minimum_should_match: 5 })

  t.end()
})

test('name', t => {
  t.type(Q.name, 'function')

  t.deepEqual(Q.name('test'), { _name: 'test' })

  t.end()
})

// build a condition bloc
function c (key: string): types.Condition {
  return { match: { [key]: key } }
}
