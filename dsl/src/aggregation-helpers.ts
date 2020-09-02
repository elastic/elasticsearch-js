/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* eslint camelcase: 0 */
/* eslint no-undef: 0 */
/* eslint no-use-before-define: 0 */
/* eslint no-redeclare: 0 */

import * as t from './types'

interface anyObject {
  [key: string]: any
}

type aggsOptions = anyObject | string

function _A (...aggregations: any[]): any {
  return {
    aggs: Object.assign.apply(null, aggregations.filter(falsy))
  }
}

interface Aggregations {
  (...aggregations: any[]): any
  [name: string]: {
    // add aggregations to a parent aggregation
    aggs(...aggregations: any[]): t.Aggregation
    // Metric aggregations
    avg(opts: aggsOptions): t.Aggregation
    weightedAvg(opts: aggsOptions): t.Aggregation
    cardinality(opts: aggsOptions): t.Aggregation
    extendedStats(opts: aggsOptions): t.Aggregation
    geoBounds(opts: aggsOptions): t.Aggregation
    geoCentroid(opts: aggsOptions): t.Aggregation
    max(opts: aggsOptions): t.Aggregation
    min(opts: aggsOptions): t.Aggregation
    percentiles(opts: aggsOptions): t.Aggregation
    percentileRanks(opts: aggsOptions): t.Aggregation
    scriptedMetric(opts: aggsOptions): t.Aggregation
    stats(opts: aggsOptions): t.Aggregation
    sum(opts: aggsOptions): t.Aggregation
    topHits(opts: aggsOptions): t.Aggregation
    valueCount(opts: aggsOptions): t.Aggregation
    medianAbsoluteDeviation(opts: aggsOptions): t.Aggregation
    // Buckets aggregations
    adjacencyMatrix(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    autoDateHistogram(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    children(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    composite(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    dateHistogram(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    dateRange(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    diversifiedSampler(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    filter(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    filters(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    geoDistance(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    geohashGrid(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    geotileGrid(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    global(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    histogram(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    ipRange(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    missing(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    nested(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    parent(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    range(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    reverseNested(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    sampler(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    significantTerms(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    significantText(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    terms(opts: aggsOptions, ...aggregations: any[]): t.Aggregation
    // Pipeline aggregations
    avgBucket (opts: aggsOptions): t.Aggregation
    derivative (opts: aggsOptions): t.Aggregation
    maxBucket (opts: aggsOptions): t.Aggregation
    minBucket (opts: aggsOptions): t.Aggregation
    sumBucket (opts: aggsOptions): t.Aggregation
    statsBucket (opts: aggsOptions): t.Aggregation
    extendedStatsBucket (opts: aggsOptions): t.Aggregation
    percentilesBucket (opts: aggsOptions): t.Aggregation
    movingAvg (opts: aggsOptions): t.Aggregation
    movingFn (opts: aggsOptions): t.Aggregation
    cumulativeSum (opts: aggsOptions): t.Aggregation
    bucketScript (opts: aggsOptions): t.Aggregation
    bucketSelector (opts: aggsOptions): t.Aggregation
    bucketSort (opts: aggsOptions): t.Aggregation
    serialDiff (opts: aggsOptions): t.Aggregation
    // Matrix aggregations
    matrixStats (opts: aggsOptions): t.Aggregation
  }
}

const aggregations = {
  get: function (target: unknown, name: string) {
    return {
      // add aggregations to a parent aggregation
      aggs (...aggregations: any[]): t.Aggregation {
        return updateAggsObject(name, aggregations)
      },

      // Metric aggregations
      avg (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('avg', name, isString(opts) ? 'field' : null, opts)
      },

      weightedAvg (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('weighted_avg', name, null, opts)
      },

      cardinality (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('cardinality', name, isString(opts) ? 'field' : null, opts)
      },

      extendedStats (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('extended_stats', name, isString(opts) ? 'field' : null, opts)
      },

      geoBounds (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('geo_bounds', name, isString(opts) ? 'field' : null, opts)
      },

      geoCentroid (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('geo_centroid', name, isString(opts) ? 'field' : null, opts)
      },

      max (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('max', name, isString(opts) ? 'field' : null, opts)
      },

      min (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('min', name, isString(opts) ? 'field' : null, opts)
      },

      percentiles (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('percentiles', name, isString(opts) ? 'field' : null, opts)
      },

      percentileRanks (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('percentile_ranks', name, null, opts)
      },

      scriptedMetric (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('scripted_metric', name, null, opts)
      },

      stats (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('stats', name, isString(opts) ? 'field' : null, opts)
      },

      sum (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('sum', name, isString(opts) ? 'field' : null, opts)
      },

      topHits (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('top_hits', name, null, opts)
      },

      valueCount (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('value_count', name, isString(opts) ? 'field' : null, opts)
      },

      medianAbsoluteDeviation (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('median_absolute_deviation', name, isString(opts) ? 'field' : null, opts)
      },

      // Buckets aggregations
      adjacencyMatrix (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('adjacency_matrix', name, null, opts, aggregations)
      },

      autoDateHistogram (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('auto_date_histogram', name, isString(opts) ? 'field' : null, opts, aggregations)
      },

      children (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('children', name, isString(opts) ? 'type' : null, opts, aggregations)
      },

      composite (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('composite', name, null, opts, aggregations)
      },

      dateHistogram (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('date_histogram', name, null, opts, aggregations)
      },

      dateRange (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('date_range', name, null, opts, aggregations)
      },

      diversifiedSampler (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('diversified_sampler', name, isString(opts) ? 'field' : null, opts, aggregations)
      },

      filter (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('filter', name, null, opts, aggregations)
      },

      filters (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('filters', name, null, opts, aggregations)
      },

      geoDistance (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('geo_distance', name, null, opts, aggregations)
      },

      geohashGrid (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('geohash_grid', name, isString(opts) ? 'field' : null, opts, aggregations)
      },

      geotileGrid (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('geotile_grid', name, isString(opts) ? 'field' : null, opts, aggregations)
      },

      global (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('global', name, null, opts, aggregations)
      },

      histogram (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('histogram', name, null, opts, aggregations)
      },

      ipRange (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('ip_range', name, null, opts, aggregations)
      },

      missing (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('missing', name, isString(opts) ? 'field' : null, opts, aggregations)
      },

      nested (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('nested', name, isString(opts) ? 'path' : null, opts, aggregations)
      },

      parent (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('parent', name, isString(opts) ? 'type' : null, opts, aggregations)
      },

      range (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('range', name, null, opts, aggregations)
      },

      reverseNested (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('reverse_nested', name, null, opts, aggregations)
      },

      sampler (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('sampler', name, null, opts, aggregations)
      },

      significantTerms (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('significant_terms', name, isString(opts) ? 'field' : null, opts, aggregations)
      },

      significantText (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('significant_text', name, isString(opts) ? 'field' : null, opts, aggregations)
      },

      terms (opts: aggsOptions, ...aggregations: any[]): t.Aggregation {
        return generateAggsObject('terms', name, isString(opts) ? 'field' : null, opts, aggregations)
      },

      // Pipeline aggregations
      avgBucket (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('avg_bucket', name, isString(opts) ? 'buckets_path' : null, opts)
      },

      derivative (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('derivative', name, isString(opts) ? 'buckets_path' : null, opts)
      },

      maxBucket (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('max_bucket', name, isString(opts) ? 'buckets_path' : null, opts)
      },

      minBucket (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('min_bucket', name, isString(opts) ? 'buckets_path' : null, opts)
      },

      sumBucket (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('sum_bucket', name, isString(opts) ? 'buckets_path' : null, opts)
      },

      statsBucket (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('stats_bucket', name, isString(opts) ? 'buckets_path' : null, opts)
      },

      extendedStatsBucket (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('extended_stats_bucket', name, isString(opts) ? 'buckets_path' : null, opts)
      },

      percentilesBucket (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('percentiles_bucket', name, isString(opts) ? 'buckets_path' : null, opts)
      },

      movingAvg (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('moving_avg', name, isString(opts) ? 'buckets_path' : null, opts)
      },

      movingFn (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('moving_fn', name, null, opts)
      },

      cumulativeSum (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('cumulative_sum', name, isString(opts) ? 'buckets_path' : null, opts)
      },

      bucketScript (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('bucket_script', name, null, opts)
      },

      bucketSelector (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('bucket_selector', name, null, opts)
      },

      bucketSort (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('bucket_sort', name, null, opts)
      },

      serialDiff (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('serial_diff', name, isString(opts) ? 'buckets_path' : null, opts)
      },

      // Matrix aggregations
      matrixStats (opts: aggsOptions): t.Aggregation {
        return generateAggsObject('matrix_stats', name, isString(opts) ? 'fields' : null, opts)
      }
    }
  }
}

const A = new Proxy(_A, aggregations) as Aggregations

function generateAggsObject (type: string, name: string, defaultField: string | null, opts: any = {}, aggregations: any[] = []): t.Aggregation {
  if (typeof opts === 'string' && typeof defaultField === 'string') {
    opts = { [defaultField]: opts }
  } else if (typeof opts === 'string' && defaultField === null) {
    throw new Error('This method does not support shorthand options')
  }

  if (aggregations.length > 0) {
    return {
      [name]: {
        [type]: opts,
        aggs: Object.assign.apply(null, aggregations.filter(falsy))
      }
    }
  } else {
    return {
      [name]: {
        [type]: opts
      }
    }
  }
}

function updateAggsObject (name: string, aggregations: any[]): t.Aggregation {
  const [main, ...others] = aggregations.filter(falsy)
  main[name].aggs = Object.assign(main[name].aggs || {}, ...others)
  return main
}

function falsy (val: any): boolean {
  return !!val
}

function isString (val: any): val is string {
  return typeof val === 'string'
}

export default A
