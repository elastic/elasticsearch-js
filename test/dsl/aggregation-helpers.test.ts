'use strict'

import { test } from 'tap'
import { A } from '../../dsl'

const shorthandError = new Error('This method does not support shorthand options')

test('A is a function that generates the final aggs object', t => {
  t.type(A, 'function')

  t.test('Basic', t => {
    t.deepEqual(A({ a: 1 }, { b: 2 }, { c: 3 }), {
      aggs: {
        a: 1,
        b: 2,
        c: 3
      }
    })
    t.end()
  })

  t.test('Should discard falsy values', t => {
    t.deepEqual(A({ a: 1 }, false, { b: 2 }, null, { c: 3 }), {
      aggs: {
        a: 1,
        b: 2,
        c: 3
      }
    })
    t.end()
  })

  t.end()
})

test('A.aggs is a method to add nested aggregations', t => {
  t.test('Plain agg', t => {
    const main = A.main.terms('foo')

    t.deepEqual(main, {
      main: { terms: { field: 'foo' } }
    })

    const agg1 = A.sumAgg.sum('bar')
    const agg2 = A.avgAgg.avg('baz')

    A.main.aggs(main, agg1, agg2)

    t.deepEqual(main, {
      main: {
        terms: { field: 'foo' },
        aggs: {
          sumAgg: { sum: { field: 'bar' } },
          avgAgg: { avg: { field: 'baz' } }
        }
      }
    })

    t.end()
  })

  t.test('Already nested agg', t => {
    const main = A.main.terms('foo', A.statsAgg.stats('faz'))

    t.deepEqual(main, {
      main: {
        terms: { field: 'foo' },
        aggs: {
          statsAgg: { stats: { field: 'faz' } }
        }
      }
    })

    const agg1 = A.sumAgg.sum('bar')
    const agg2 = A.avgAgg.avg('baz')

    A.main.aggs(main, agg1, agg2)

    t.deepEqual(main, {
      main: {
        terms: { field: 'foo' },
        aggs: {
          statsAgg: { stats: { field: 'faz' } },
          sumAgg: { sum: { field: 'bar' } },
          avgAgg: { avg: { field: 'baz' } }
        }
      }
    })

    t.end()
  })

  t.test('Should filter falsy aggs', t => {
    const main = A.main.terms('foo')

    t.deepEqual(main, {
      main: { terms: { field: 'foo' } }
    })

    const agg1 = A.sumAgg.sum('bar')
    const agg2 = A.avgAgg.avg('baz')

    A.main.aggs(main, agg1, null, agg2, false)

    t.deepEqual(main, {
      main: {
        terms: { field: 'foo' },
        aggs: {
          sumAgg: { sum: { field: 'bar' } },
          avgAgg: { avg: { field: 'baz' } }
        }
      }
    })

    t.end()
  })

  t.end()
})

test('avg', t => {
  t.deepEqual(A.aggName.avg({ field: 'foo' }), {
    aggName: {
      avg: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.avg('foo'), {
    aggName: {
      avg: {
        field: 'foo'
      }
    }
  })

  t.end()
})

test('weightedAvg', t => {
  t.deepEqual(A.aggName.weightedAvg({ field: 'foo' }), {
    aggName: {
      weighted_avg: {
        field: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.weightedAvg('foo'),
    shorthandError
  )

  t.end()
})

test('cardinality', t => {
  t.deepEqual(A.aggName.cardinality({ field: 'foo' }), {
    aggName: {
      cardinality: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.cardinality('foo'), {
    aggName: {
      cardinality: {
        field: 'foo'
      }
    }
  })

  t.end()
})

test('extendedStats', t => {
  t.deepEqual(A.aggName.extendedStats({ field: 'foo' }), {
    aggName: {
      extended_stats: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.extendedStats('foo'), {
    aggName: {
      extended_stats: {
        field: 'foo'
      }
    }
  })

  t.end()
})

test('geoBounds', t => {
  t.deepEqual(A.aggName.geoBounds({ field: 'foo' }), {
    aggName: {
      geo_bounds: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.geoBounds('foo'), {
    aggName: {
      geo_bounds: {
        field: 'foo'
      }
    }
  })

  t.end()
})

test('geoCentroid', t => {
  t.deepEqual(A.aggName.geoCentroid({ field: 'foo' }), {
    aggName: {
      geo_centroid: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.geoCentroid('foo'), {
    aggName: {
      geo_centroid: {
        field: 'foo'
      }
    }
  })

  t.end()
})

test('max', t => {
  t.deepEqual(A.aggName.max({ field: 'foo' }), {
    aggName: {
      max: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.max('foo'), {
    aggName: {
      max: {
        field: 'foo'
      }
    }
  })

  t.end()
})

test('min', t => {
  t.deepEqual(A.aggName.min({ field: 'foo' }), {
    aggName: {
      min: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.min('foo'), {
    aggName: {
      min: {
        field: 'foo'
      }
    }
  })

  t.end()
})

test('percentiles', t => {
  t.deepEqual(A.aggName.percentiles({ field: 'foo' }), {
    aggName: {
      percentiles: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.percentiles('foo'), {
    aggName: {
      percentiles: {
        field: 'foo'
      }
    }
  })

  t.end()
})

test('percentileRanks', t => {
  t.deepEqual(A.aggName.percentileRanks({ field: 'foo' }), {
    aggName: {
      percentile_ranks: {
        field: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.percentileRanks('foo'),
    shorthandError
  )

  t.end()
})

test('scriptedMetric', t => {
  t.deepEqual(A.aggName.scriptedMetric({ field: 'foo' }), {
    aggName: {
      scripted_metric: {
        field: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.scriptedMetric('foo'),
    shorthandError
  )

  t.end()
})

test('stats', t => {
  t.deepEqual(A.aggName.stats({ field: 'foo' }), {
    aggName: {
      stats: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.stats('foo'), {
    aggName: {
      stats: {
        field: 'foo'
      }
    }
  })

  t.end()
})

test('sum', t => {
  t.deepEqual(A.aggName.sum({ field: 'foo' }), {
    aggName: {
      sum: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.sum('foo'), {
    aggName: {
      sum: {
        field: 'foo'
      }
    }
  })

  t.end()
})

test('topHits', t => {
  t.deepEqual(A.aggName.topHits({ field: 'foo' }), {
    aggName: {
      top_hits: {
        field: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.topHits('foo'),
    shorthandError
  )

  t.end()
})

test('valueCount', t => {
  t.deepEqual(A.aggName.valueCount({ field: 'foo' }), {
    aggName: {
      value_count: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.valueCount('foo'), {
    aggName: {
      value_count: {
        field: 'foo'
      }
    }
  })

  t.end()
})

test('medianAbsoluteDeviation', t => {
  t.deepEqual(A.aggName.medianAbsoluteDeviation({ field: 'foo' }), {
    aggName: {
      median_absolute_deviation: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.medianAbsoluteDeviation('foo'), {
    aggName: {
      median_absolute_deviation: {
        field: 'foo'
      }
    }
  })

  t.end()
})

test('adjacencyMatrix', t => {
  t.deepEqual(A.aggName.adjacencyMatrix({ field: 'foo' }), {
    aggName: {
      adjacency_matrix: {
        field: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.adjacencyMatrix('foo'),
    shorthandError
  )

  const agg = A.aggName.adjacencyMatrix(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      adjacency_matrix: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('autoDateHistogram', t => {
  t.deepEqual(A.aggName.autoDateHistogram({ field: 'foo' }), {
    aggName: {
      auto_date_histogram: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.autoDateHistogram('foo'), {
    aggName: {
      auto_date_histogram: {
        field: 'foo'
      }
    }
  })

  const agg = A.aggName.autoDateHistogram(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      auto_date_histogram: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('children', t => {
  t.deepEqual(A.aggName.children({ type: 'foo' }), {
    aggName: {
      children: {
        type: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.children('foo'), {
    aggName: {
      children: {
        type: 'foo'
      }
    }
  })

  const agg = A.aggName.children(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      children: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('composite', t => {
  t.deepEqual(A.aggName.composite({ field: 'foo' }), {
    aggName: {
      composite: {
        field: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.composite('foo'),
    shorthandError
  )

  const agg = A.aggName.composite(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      composite: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('dateHistogram', t => {
  t.deepEqual(A.aggName.dateHistogram({ field: 'foo' }), {
    aggName: {
      date_histogram: {
        field: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.dateHistogram('foo'),
    shorthandError
  )

  const agg = A.aggName.dateHistogram(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      date_histogram: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('dateRange', t => {
  t.deepEqual(A.aggName.dateRange({ field: 'foo' }), {
    aggName: {
      date_range: {
        field: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.dateRange('foo'),
    shorthandError
  )

  const agg = A.aggName.dateRange(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      date_range: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('diversifiedSampler', t => {
  t.deepEqual(A.aggName.diversifiedSampler({ field: 'foo' }), {
    aggName: {
      diversified_sampler: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.diversifiedSampler('foo'), {
    aggName: {
      diversified_sampler: {
        field: 'foo'
      }
    }
  })

  const agg = A.aggName.diversifiedSampler(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      diversified_sampler: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('filter', t => {
  t.deepEqual(A.aggName.filter({ field: 'foo' }), {
    aggName: {
      filter: {
        field: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.filter('foo'),
    shorthandError
  )

  const agg = A.aggName.filter(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      filter: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('filters', t => {
  t.deepEqual(A.aggName.filters({ field: 'foo' }), {
    aggName: {
      filters: {
        field: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.filters('foo'),
    shorthandError
  )

  const agg = A.aggName.filters(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      filters: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('geoDistance', t => {
  t.deepEqual(A.aggName.geoDistance({ field: 'foo' }), {
    aggName: {
      geo_distance: {
        field: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.geoDistance('foo'),
    shorthandError
  )

  const agg = A.aggName.geoDistance(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      geo_distance: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('geohashGrid', t => {
  t.deepEqual(A.aggName.geohashGrid({ field: 'foo' }), {
    aggName: {
      geohash_grid: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.geohashGrid('foo'), {
    aggName: {
      geohash_grid: {
        field: 'foo'
      }
    }
  })

  const agg = A.aggName.geohashGrid(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      geohash_grid: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('geotileGrid', t => {
  t.deepEqual(A.aggName.geotileGrid({ field: 'foo' }), {
    aggName: {
      geotile_grid: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.geotileGrid('foo'), {
    aggName: {
      geotile_grid: {
        field: 'foo'
      }
    }
  })

  const agg = A.aggName.geotileGrid(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      geotile_grid: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('global', t => {
  t.deepEqual(A.aggName.global({}), {
    aggName: {
      global: {}
    }
  })

  t.throws(
    () => A.aggName.global('foo'),
    shorthandError
  )

  const agg = A.aggName.global(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      global: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('histogram', t => {
  t.deepEqual(A.aggName.histogram({ field: 'foo' }), {
    aggName: {
      histogram: {
        field: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.histogram('foo'),
    shorthandError
  )

  const agg = A.aggName.histogram(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      histogram: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('ipRange', t => {
  t.deepEqual(A.aggName.ipRange({ field: 'foo' }), {
    aggName: {
      ip_range: {
        field: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.ipRange('foo'),
    shorthandError
  )

  const agg = A.aggName.ipRange(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      ip_range: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('missing', t => {
  t.deepEqual(A.aggName.missing({ field: 'foo' }), {
    aggName: {
      missing: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.missing('foo'), {
    aggName: {
      missing: {
        field: 'foo'
      }
    }
  })

  const agg = A.aggName.missing(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      missing: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('nested', t => {
  t.deepEqual(A.aggName.nested({ path: 'foo' }), {
    aggName: {
      nested: {
        path: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.nested('foo'), {
    aggName: {
      nested: {
        path: 'foo'
      }
    }
  })

  const agg = A.aggName.nested(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      nested: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('parent', t => {
  t.deepEqual(A.aggName.parent({ type: 'foo' }), {
    aggName: {
      parent: {
        type: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.parent('foo'), {
    aggName: {
      parent: {
        type: 'foo'
      }
    }
  })

  const agg = A.aggName.parent(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      parent: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('range', t => {
  t.deepEqual(A.aggName.range({ field: 'foo' }), {
    aggName: {
      range: {
        field: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.range('foo'),
    shorthandError
  )

  const agg = A.aggName.range(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      range: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('reverseNested', t => {
  t.deepEqual(A.aggName.reverseNested({ field: 'foo' }), {
    aggName: {
      reverse_nested: {
        field: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.reverseNested('foo'),
    shorthandError
  )

  const agg = A.aggName.reverseNested(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      reverse_nested: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('sampler', t => {
  t.deepEqual(A.aggName.sampler({ shard_size: 42 }), {
    aggName: {
      sampler: {
        shard_size: 42
      }
    }
  })

  t.throws(
    () => A.aggName.sampler('foo'),
    shorthandError
  )

  const agg = A.aggName.sampler(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      sampler: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('significantTerms', t => {
  t.deepEqual(A.aggName.significantTerms({ field: 'foo' }), {
    aggName: {
      significant_terms: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.significantTerms('foo'), {
    aggName: {
      significant_terms: {
        field: 'foo'
      }
    }
  })

  const agg = A.aggName.significantTerms(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      significant_terms: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('significantText', t => {
  t.deepEqual(A.aggName.significantText({ field: 'foo' }), {
    aggName: {
      significant_text: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.significantText('foo'), {
    aggName: {
      significant_text: {
        field: 'foo'
      }
    }
  })

  const agg = A.aggName.significantText(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      significant_text: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('terms', t => {
  t.deepEqual(A.aggName.terms({ field: 'foo' }), {
    aggName: {
      terms: {
        field: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.terms('foo'), {
    aggName: {
      terms: {
        field: 'foo'
      }
    }
  })

  const agg = A.aggName.terms(
    { field: 'foo' },
    A.sumAgg.sum('bar'),
    A.avgAgg.avg('baz')
  )
  t.deepEqual(agg, {
    aggName: {
      terms: {
        field: 'foo'
      },
      aggs: {
        sumAgg: {
          sum: { field: 'bar' }
        },
        avgAgg: {
          avg: { field: 'baz' }
        }
      }
    }
  })

  t.end()
})

test('avgBucket', t => {
  t.deepEqual(A.aggName.avgBucket({ buckets_path: 'foo' }), {
    aggName: {
      avg_bucket: {
        buckets_path: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.avgBucket('foo'), {
    aggName: {
      avg_bucket: {
        buckets_path: 'foo'
      }
    }
  })

  t.end()
})

test('derivative', t => {
  t.deepEqual(A.aggName.derivative({ buckets_path: 'foo' }), {
    aggName: {
      derivative: {
        buckets_path: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.derivative('foo'), {
    aggName: {
      derivative: {
        buckets_path: 'foo'
      }
    }
  })

  t.end()
})

test('maxBucket', t => {
  t.deepEqual(A.aggName.maxBucket({ buckets_path: 'foo' }), {
    aggName: {
      max_bucket: {
        buckets_path: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.maxBucket('foo'), {
    aggName: {
      max_bucket: {
        buckets_path: 'foo'
      }
    }
  })

  t.end()
})

test('minBucket', t => {
  t.deepEqual(A.aggName.minBucket({ buckets_path: 'foo' }), {
    aggName: {
      min_bucket: {
        buckets_path: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.minBucket('foo'), {
    aggName: {
      min_bucket: {
        buckets_path: 'foo'
      }
    }
  })

  t.end()
})

test('sumBucket', t => {
  t.deepEqual(A.aggName.sumBucket({ buckets_path: 'foo' }), {
    aggName: {
      sum_bucket: {
        buckets_path: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.sumBucket('foo'), {
    aggName: {
      sum_bucket: {
        buckets_path: 'foo'
      }
    }
  })

  t.end()
})

test('statsBucket', t => {
  t.deepEqual(A.aggName.statsBucket({ buckets_path: 'foo' }), {
    aggName: {
      stats_bucket: {
        buckets_path: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.statsBucket('foo'), {
    aggName: {
      stats_bucket: {
        buckets_path: 'foo'
      }
    }
  })

  t.end()
})

test('extendedStatsBucket', t => {
  t.deepEqual(A.aggName.extendedStatsBucket({ buckets_path: 'foo' }), {
    aggName: {
      extended_stats_bucket: {
        buckets_path: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.extendedStatsBucket('foo'), {
    aggName: {
      extended_stats_bucket: {
        buckets_path: 'foo'
      }
    }
  })

  t.end()
})

test('percentilesBucket', t => {
  t.deepEqual(A.aggName.percentilesBucket({ buckets_path: 'foo' }), {
    aggName: {
      percentiles_bucket: {
        buckets_path: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.percentilesBucket('foo'), {
    aggName: {
      percentiles_bucket: {
        buckets_path: 'foo'
      }
    }
  })

  t.end()
})

test('movingAvg', t => {
  t.deepEqual(A.aggName.movingAvg({ buckets_path: 'foo' }), {
    aggName: {
      moving_avg: {
        buckets_path: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.movingAvg('foo'), {
    aggName: {
      moving_avg: {
        buckets_path: 'foo'
      }
    }
  })

  t.end()
})

test('movingFn', t => {
  t.deepEqual(A.aggName.movingFn({ buckets_path: 'foo' }), {
    aggName: {
      moving_fn: {
        buckets_path: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.movingFn('foo'),
    shorthandError
  )

  t.end()
})

test('cumulativeSum', t => {
  t.deepEqual(A.aggName.cumulativeSum({ buckets_path: 'foo' }), {
    aggName: {
      cumulative_sum: {
        buckets_path: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.cumulativeSum('foo'), {
    aggName: {
      cumulative_sum: {
        buckets_path: 'foo'
      }
    }
  })

  t.end()
})

test('bucketScript', t => {
  t.deepEqual(A.aggName.bucketScript({ buckets_path: 'foo' }), {
    aggName: {
      bucket_script: {
        buckets_path: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.bucketScript('foo'),
    shorthandError
  )

  t.end()
})

test('bucketSelector', t => {
  t.deepEqual(A.aggName.bucketSelector({ buckets_path: 'foo' }), {
    aggName: {
      bucket_selector: {
        buckets_path: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.bucketSelector('foo'),
    shorthandError
  )

  t.end()
})

test('bucketSort', t => {
  t.deepEqual(A.aggName.bucketSort({ buckets_path: 'foo' }), {
    aggName: {
      bucket_sort: {
        buckets_path: 'foo'
      }
    }
  })

  t.throws(
    () => A.aggName.bucketSort('foo'),
    shorthandError
  )

  t.end()
})

test('serialDiff', t => {
  t.deepEqual(A.aggName.serialDiff({ buckets_path: 'foo' }), {
    aggName: {
      serial_diff: {
        buckets_path: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.serialDiff('foo'), {
    aggName: {
      serial_diff: {
        buckets_path: 'foo'
      }
    }
  })

  t.end()
})

test('matrixStats', t => {
  t.deepEqual(A.aggName.matrixStats({ fields: 'foo' }), {
    aggName: {
      matrix_stats: {
        fields: 'foo'
      }
    }
  })

  t.deepEqual(A.aggName.matrixStats('foo'), {
    aggName: {
      matrix_stats: {
        fields: 'foo'
      }
    }
  })

  t.end()
})
