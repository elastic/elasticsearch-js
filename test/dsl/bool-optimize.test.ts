'use strict'

import { test } from 'tap'
import { Q } from '../../dsl'

test('must only query', t => {
  const query = Q.bool(
    Q.match('1', '2'),
    Q.term('3', '4'),
    Q.must(
      Q.match('5', '6'),
      Q.term('7', '8')
    ),
    Q.bool(
      Q.must(
        Q.match('9', '10'),
        Q.term('11', '12')
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        must: [
          { match: { 1: '2' } },
          { term: { 3: '4' } },
          { match: { 5: '6' } },
          { term: { 7: '8' } },
          { match: { 9: '10' } },
          { term: { 11: '12' } }
        ]
      }
    }
  })

  t.end()
})

test('must and must_not query', t => {
  const query = Q.bool(
    Q.match('1', '2'),
    Q.term('3', '4'),
    Q.mustNot(
      Q.match('5', '6'),
      Q.term('7', '8')
    ),
    Q.bool(
      Q.must(
        Q.match('9', '10'),
        Q.term('11', '12')
      )
    ),
    Q.bool(
      Q.mustNot(
        Q.match('13', '14'),
        Q.term('15', '16')
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        must: [
          { match: { 1: '2' } },
          { term: { 3: '4' } },
          { match: { 9: '10' } },
          { term: { 11: '12' } }
        ],
        must_not: [
          { match: { 5: '6' } },
          { term: { 7: '8' } },
          { match: { 13: '14' } },
          { term: { 15: '16' } }
        ]
      }
    }
  })

  t.end()
})

test('must and must_not query (mixed and nested)', t => {
  const query = Q.bool(
    Q.match('1', '2'),
    Q.term('3', '4'),
    Q.mustNot(
      Q.match('5', '6'),
      Q.term('7', '8')
    ),
    Q.bool(
      Q.must(
        Q.match('9', '10'),
        Q.term('11', '12')
      )
    ),
    Q.bool(
      Q.mustNot(
        Q.match('13', '14')
      ),
      Q.must(
        Q.term('15', '16')
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        must: [
          { match: { 1: '2' } },
          { term: { 3: '4' } },
          { match: { 9: '10' } },
          { term: { 11: '12' } },
          { term: { 15: '16' } }
        ],
        must_not: [
          { match: { 5: '6' } },
          { term: { 7: '8' } },
          { match: { 13: '14' } }
        ]
      }
    }
  })

  t.end()
})

test('must and should query', t => {
  const query = Q.bool(
    Q.must(
      Q.match('1', '2'),
      Q.term('3', '4')
    ),
    Q.should(
      Q.match('5', '6'),
      Q.term('7', '8')
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        must: [
          { match: { 1: '2' } },
          { term: { 3: '4' } }
        ],
        should: [
          { match: { 5: '6' } },
          { term: { 7: '8' } }
        ]
      }
    }
  })

  t.end()
})

test('must and should query (nested) / 1', t => {
  const query = Q.bool(
    Q.must(
      Q.match('1', '2'),
      Q.term('3', '4')
    ),
    Q.must(
      Q.bool(
        Q.must(
          Q.match('5', '6'),
          Q.term('7', '8')
        ),
        Q.should(
          Q.match('9', '10'),
          Q.term('11', '12')
        )
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        must: [
          { match: { 1: '2' } },
          { term: { 3: '4' } },
          {
            bool: {
              must: [
                { match: { 5: '6' } },
                { term: { 7: '8' } }
              ],
              should: [
                { match: { 9: '10' } },
                { term: { 11: '12' } }
              ]
            }
          }
        ]
      }
    }
  })

  t.end()
})

test('must and should query (nested) / 2', t => {
  const query = Q.bool(
    Q.match('1', '2'),
    Q.term('3', '4'),
    Q.must(
      Q.bool(
        Q.must(
          Q.match('5', '6'),
          Q.term('7', '8')
        ),
        Q.should(
          Q.match('9', '10'),
          Q.term('11', '12')
        )
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        must: [
          { match: { 1: '2' } },
          { term: { 3: '4' } },
          {
            bool: {
              must: [
                { match: { 5: '6' } },
                { term: { 7: '8' } }
              ],
              should: [
                { match: { 9: '10' } },
                { term: { 11: '12' } }
              ]
            }
          }
        ]
      }
    }
  })

  t.end()
})

test('must and filter query / 1', t => {
  const query = Q.bool(
    Q.match('1', '2'),
    Q.term('3', '4'),
    Q.filter(
      Q.bool(
        Q.must(
          Q.match('5', '6'),
          Q.term('7', '8')
        ),
        Q.filter(
          Q.match('9', '10'),
          Q.term('11', '12')
        )
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        must: [
          { match: { 1: '2' } },
          { term: { 3: '4' } }
        ],
        filter: [
          { match: { 5: '6' } },
          { term: { 7: '8' } },
          { match: { 9: '10' } },
          { term: { 11: '12' } }
        ]
      }
    }
  })

  t.end()
})

test('must and filter query / 2', t => {
  const query = Q.bool(
    Q.match('1', '2'),
    Q.term('3', '4'),
    Q.filter(
      Q.bool(
        Q.match('5', '6'),
        Q.term('7', '8'),
        Q.filter(
          Q.match('9', '10'),
          Q.term('11', '12')
        )
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        must: [
          { match: { 1: '2' } },
          { term: { 3: '4' } }
        ],
        filter: [
          { match: { 5: '6' } },
          { term: { 7: '8' } },
          { match: { 9: '10' } },
          { term: { 11: '12' } }
        ]
      }
    }
  })

  t.end()
})

test('all but should query / 1', t => {
  const query = Q.bool(
    Q.match('1', '2'),
    Q.term('3', '4'),
    Q.mustNot(
      Q.match('5', '6'),
      Q.term('7', '8')
    ),
    Q.bool(
      Q.filter(
        Q.match('9', '10'),
        Q.term('11', '12')
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        must: [
          { match: { 1: '2' } },
          { term: { 3: '4' } }
        ],
        must_not: [
          { match: { 5: '6' } },
          { term: { 7: '8' } }
        ],
        filter: [
          { match: { 9: '10' } },
          { term: { 11: '12' } }
        ]
      }
    }
  })

  t.end()
})

test('all but should query / 2', t => {
  const query = Q.bool(
    Q.match('1', '2'),
    Q.term('3', '4'),
    Q.bool(
      Q.mustNot(
        Q.match('5', '6'),
        Q.term('7', '8')
      ),
      Q.filter(
        Q.match('9', '10'),
        Q.term('11', '12')
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        must: [
          { match: { 1: '2' } },
          { term: { 3: '4' } }
        ],
        must_not: [
          { match: { 5: '6' } },
          { term: { 7: '8' } }
        ],
        filter: [
          { match: { 9: '10' } },
          { term: { 11: '12' } }
        ]
      }
    }
  })

  t.end()
})

test('all but should query / 3', t => {
  const query = Q.bool(
    Q.mustNot(
      Q.match('1', '2'),
      Q.term('3', '4')
    ),
    Q.must(
      Q.bool(
        Q.mustNot(
          Q.match('5', '6'),
          Q.term('7', '8')
        ),
        Q.filter(
          Q.match('9', '10'),
          Q.term('11', '12')
        )
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        must_not: [
          { match: { 5: '6' } },
          { term: { 7: '8' } },
          { match: { 1: '2' } },
          { term: { 3: '4' } }
        ],
        filter: [
          { match: { 9: '10' } },
          { term: { 11: '12' } }
        ]
      }
    }
  })

  t.end()
})

test('all but should query / 4', t => {
  const query = Q.bool(
    Q.must(
      Q.match('17', '18'),
      Q.term('19', '20')
    ),
    Q.mustNot(
      Q.match('1', '2'),
      Q.term('3', '4')
    ),
    Q.must(
      Q.bool(
        Q.must(
          Q.match('13', '14'),
          Q.term('15', '16')
        ),
        Q.mustNot(
          Q.match('5', '6'),
          Q.term('7', '8')
        ),
        Q.filter(
          Q.match('9', '10'),
          Q.term('11', '12')
        )
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        must: [
          { match: { 17: '18' } },
          { term: { 19: '20' } },
          { match: { 13: '14' } },
          { term: { 15: '16' } }
        ],
        must_not: [
          { match: { 5: '6' } },
          { term: { 7: '8' } },
          { match: { 1: '2' } },
          { term: { 3: '4' } }
        ],
        filter: [
          { match: { 9: '10' } },
          { term: { 11: '12' } }
        ]
      }
    }
  })

  t.end()
})

test('filter with should', t => {
  const query = Q.bool(
    Q.filter(
      Q.bool(
        Q.must(
          Q.match('1', '2'),
          Q.term('3', '4')
        ),
        Q.should(
          Q.match('5', '6'),
          Q.term('7', '8')
        )
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        filter: [
          {
            bool: {
              must: [
                { match: { 1: '2' } },
                { term: { 3: '4' } }
              ],
              should: [
                { match: { 5: '6' } },
                { term: { 7: '8' } }
              ]
            }
          }
        ]
      }
    }
  })

  t.end()
})

test('nested with only should', t => {
  const query = Q.bool(
    Q.should(
      Q.bool(
        Q.should(
          Q.match('1', '2'),
          Q.term('3', '4')
        )
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        should: [
          { match: { 1: '2' } },
          { term: { 3: '4' } }
        ]
      }
    }
  })

  t.end()
})

test('nested with only should and minimum_should_match / 1', t => {
  const query = Q.bool(
    Q.should(
      Q.bool(
        Q.should(
          Q.match('1', '2'),
          Q.term('3', '4')
        ),
        Q.minShouldMatch(1)
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        should: [{
          bool: {
            should: [
              { match: { 1: '2' } },
              { term: { 3: '4' } }
            ],
            minimum_should_match: 1
          }
        }]
      }
    }
  })

  t.end()
})

test('nested with only should and minimum_should_match / 2', t => {
  const query = Q.bool(
    Q.bool(
      Q.should(
        Q.match('1', '2'),
        Q.term('3', '4')
      ),
      Q.minShouldMatch(2)
    ),
    Q.should(Q.match('5', '6'))
  )

  t.deepEqual(query, {
    query: {
      bool: {
        must: [{
          bool: {
            should: [
              { match: { 1: '2' } },
              { term: { 3: '4' } }
            ],
            minimum_should_match: 2
          }
        }],
        should: [{
          match: { 5: '6' }
        }]
      }
    }
  })

  t.end()
})

test('nested with should and other clause', t => {
  const query = Q.bool(
    Q.should(
      Q.bool(
        Q.should(
          Q.match('1', '2'),
          Q.term('3', '4')
        ),
        Q.mustNot(
          Q.match('5', '6'),
          Q.term('7', '8')
        )
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        should: [{
          bool: {
            should: [
              { match: { 1: '2' } },
              { term: { 3: '4' } }
            ],
            must_not: [
              { match: { 5: '6' } },
              { term: { 7: '8' } }
            ]
          }
        }]
      }
    }
  })

  t.end()
})

test('nested with only should', t => {
  const query = Q.bool(
    Q.should(
      Q.match('1', '2')
    ),
    Q.should(
      Q.term('3', '4')
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        should: [
          { match: { 1: '2' } },
          { term: { 3: '4' } }
        ]
      }
    }
  })

  t.end()
})

test('nested with only should and minimum_should_match', t => {
  const query = Q.bool(
    Q.should(
      Q.match('1', '2')
    ),
    Q.should(
      Q.term('3', '4')
    ),
    Q.minShouldMatch(1)
  )

  t.deepEqual(query, {
    query: {
      bool: {
        should: [
          { match: { 1: '2' } },
          { term: { 3: '4' } }
        ],
        minimum_should_match: 1
      }
    }
  })

  t.end()
})

test('Should not merge up named queries / 1', t => {
  const query = Q.bool(
    Q.match('1', '2'),
    Q.term('3', '4'),
    Q.must(
      Q.match('5', '6'),
      Q.term('7', '8')
    ),
    Q.bool(
      Q.name('test'),
      Q.must(
        Q.match('9', '10'),
        Q.term('11', '12')
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        must: [
          { match: { 1: '2' } },
          { term: { 3: '4' } },
          { match: { 5: '6' } },
          { term: { 7: '8' } },
          {
            bool: {
              _name: 'test',
              must: [
                { match: { 9: '10' } },
                { term: { 11: '12' } }
              ]
            }
          }
        ]
      }
    }
  })

  t.end()
})

test('Should not merge up named queries / 2', t => {
  const query = Q.bool(
    Q.match('1', '2'),
    Q.term('3', '4'),
    Q.must(
      Q.match('5', '6'),
      Q.term('7', '8'),
      Q.bool(
        Q.name('test'),
        Q.must(
          Q.match('9', '10'),
          Q.term('11', '12')
        )
      )
    )
  )

  t.deepEqual(query, {
    query: {
      bool: {
        must: [
          { match: { 1: '2' } },
          { term: { 3: '4' } },
          { match: { 5: '6' } },
          { term: { 7: '8' } },
          {
            bool: {
              _name: 'test',
              must: [
                { match: { 9: '10' } },
                { term: { 11: '12' } }
              ]
            }
          }
        ]
      }
    }
  })

  t.end()
})

test('_name defined twice', t => {
  try {
    Q.bool(
      Q.name('foo'),
      Q.name('bar')
    )
    t.fail('should throw')
  } catch (err) {
    t.is(err.message, 'The query name has already been defined')
  }

  t.end()
})

test('minimum_should_match defined twice', t => {
  try {
    Q.bool(
      Q.minShouldMatch(4),
      Q.minShouldMatch(2)
    )
    t.fail('should throw')
  } catch (err) {
    t.is(err.message, 'minimum_should_match has already been defined')
  }

  t.end()
})
