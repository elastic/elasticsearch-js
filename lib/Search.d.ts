
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
import { Unionize, UnionToIntersection, Mutable, OmitByValue, OmitByValueExact } from 'utility-types';
import T from "../api/types";

type InvalidAggregationRequest = unknown;

// ensures aggregations work with requests where aggregation options are a union type,
// e.g. { transaction_groups: { composite: any } | { terms: any } }.
// Union keys are not included in keyof. The type will fall back to keyof T if
// UnionToIntersection fails, which happens when there are conflicts between the union
// types, e.g. { foo: string; bar?: undefined } | { foo?: undefined; bar: string };
type ValidAggregationKeysOf<
  T extends Record<string, any>
> = keyof (UnionToIntersection<T> extends never ? T : UnionToIntersection<T>);

type CompositeKeysOf<
  TAggregation extends Aggregation
> = TAggregation extends {
  composite: { sources: Array<infer Source> };
}
  ? Record<keyof Source, string | number | null>
  : unknown;

type BucketingAggregationTypeName = 
  | 'adjacency_matrix'
  | 'auto_date_histogram'
  | 'children'
  | 'composite'
  | 'date_histogram'
  | 'date_range'
  // | 'diversified_sampler' not defined yet
  | 'filter'
  | 'filters'
  | 'geo_distance'
  | 'geohash_grid'
  | 'geotile_grid'
  | 'global'
  | 'histogram'
  | 'ip_range'
  | 'missing'
  | 'nested'
  | 'reverse_nested'
  | 'parent'
  | 'range'
  | 'rare_terms'
  | 'reverse_nested'
  | 'sampler'
  | 'significant_terms'
  // | 'significant_text' does not support sub-aggregations
  | 'terms'
  // | 'variable_width_histogram' not defined yet

type PipelineAggregationTypeName =
  'bucket_script'
  | 'bucket_selector'
  | 'bucket_sort'
  | 'avg_bucket'
  | 'max_bucket'
  | 'min_bucket'
  | 'sum_bucket'
  | 'cumulative_cardinality'
  | 'cumulative_sum'
  | 'derivative'
  | 'percentiles_bucket'
  | 'moving_avg'
  | 'moving_fn'
  | 'moving_percentiles'
  | 'normalize'
  | 'serial_diff'
  | 'stats_bucket'
  | 'extended_stats_bucket'
  | 'inference';

type AggregationTypeName = Exclude<keyof T.AggregationContainer, 'aggs' | 'aggregations'>;

type NonBucketingAggregationTypeName = Exclude<AggregationTypeName, BucketingAggregationTypeName>;

type ErrorSubAggregationsNotSupported = 'This aggregation type does not support sub-aggregations';

type Aggregation = ExclusiveUnion<
  Unionize<{
    [TBucketingAggregationName in BucketingAggregationTypeName]: T.AggregationContainer[TBucketingAggregationName]
  }> & Partial<UnionToIntersection<AggregationRequest>>,
  Unionize<{
    [TBucketingAggregationName in NonBucketingAggregationTypeName]: T.AggregationContainer[TBucketingAggregationName]
  }>,
  ErrorSubAggregationsNotSupported
>
// Making AggregationMap a Partial means we can work around TS behaviour
// where it considers all keys in the union type to be optional keys.
// See https://github.com/microsoft/TypeScript/pull/19513
type AggregationMap = Partial<{
  [key:string]: Aggregation
}>;

type AggregationRequest = ({
  aggs?: AggregationMap
} | { aggregations?: AggregationMap });

type MaybeKeyed<TAggregation, TBucket, TKeys extends string = string> = TAggregation extends Record<string, { keyed: true }> ? Record<TKeys, TBucket> : { buckets: TBucket[] };

type AggregationResultOf<TAggregation extends Aggregation, TDocument extends unknown> = (Record<AggregationTypeName, unknown> & {
  adjacency_matrix: {
    buckets:Array<{
      key:string;
      doc_count:number;
    } & AggregationResponseOf<TAggregation, TDocument>>
  };
  auto_date_histogram:{
    interval:string;
    buckets:Array<{
      key:string | number;
      key_as_string:string;
      doc_count:number;
    } & AggregationResponseOf<TAggregation, TDocument>>
  };
  avg: {
    value: number | null;
    value_as_string?: string;
  };
  avg_bucket: {
    value: number | null;
  };
  boxplot: {
    min: number | null,
    max: number | null,
    q1: number | null,
    q2: number | null,
    q3: number | null
  };
  bucket_script: {
    value: unknown;
  };
  bucket_selector: undefined;
  bucket_sort: undefined;
  cardinality: {
    value:number;
  };
  children:{
    doc_count:number;
  } & AggregationResponseOf<TAggregation, TDocument>;
  composite: {
    after_key: CompositeKeysOf<TAggregation>;
    buckets: Array<{
      doc_count: number;
      key: CompositeKeysOf<TAggregation>;
    }>
  };
  cumulative_cardinality: {
    value: number;
  };
  cumulative_sum: {
    value: number;
  };
  date_histogram: MaybeKeyed<
    TAggregation,
    {
      key:string | number;
      key_as_string:string;
      doc_count:number;
    } & AggregationResponseOf<TAggregation, TDocument>
  >;
  date_range: MaybeKeyed<
    TAggregation,
    Partial<{ from:string | number; from_as_string:string }>
    & Partial<{ to:string | number; to_as_string:string }>
    & {
      doc_count:number;
      key:string;
    }
  >;
  derivative: {
    value: number | null;
  } | undefined;
  extended_stats: {
    count: number;
    min: number | null;
    max: number | null;
    avg: number | null;
    sum: number;
    sum_of_squares: number | null;
    variance: number | null;
    variance_population: number | null;
    variance_sampling: number | null;
    std_deviation: number | null;
    std_deviation_population: number | null;
    std_deviation_sampling: number | null;
    std_deviation_bounds: {
      upper: number | null;
      lower: number | null;
      upper_population: number | null;
      lower_population: number | null;
      upper_sampling: number | null;
      lower_sampling: number | null;
    };
  } & ({
    min_as_string: string;
    max_as_string: string;
    avg_as_string: string;
    sum_of_squares_as_string: string;
    variance_population_as_string: string;
    variance_sampling_as_string: string;
    std_deviation_as_string: string;
    std_deviation_population_as_string: string;
    std_deviation_sampling_as_string: string;
    std_deviation_bounds_as_string: {
      upper: string;
      lower: string;
      upper_population: string;
      lower_population: string;
      upper_sampling: string;
      lower_sampling: string;
    };
  } | {});
  extended_stats_bucket: {
    count: number;
    min: number | null;
    max: number | null;
    avg: number | null;
    sum: number | null;
    sum_of_squares: number | null;
    variance: number | null;
    variance_population: number | null;
    variance_sampling: number | null;
    std_deviation: number | null;
    std_deviation_population: number | null;
    std_deviation_sampling: number | null;
    std_deviation_bounds: {
      upper: number | null;
      lower: number | null;
      upper_population: number | null;
      lower_population: number | null;
      upper_sampling: number | null;
      lower_sampling: number | null;
    };
  };
  filter: {
    doc_count:number;
  } & AggregationResponseOf<TAggregation, TDocument>;
  filters: {
    buckets:  TAggregation extends { filters: { filters: any[] } } ? (Array<{
      doc_count:number;
    } & AggregationResponseOf<TAggregation, TDocument>>)
    : TAggregation extends { filters: { filters: Record<string, any> } } ? (
      {
        [key in keyof TAggregation['filters']['filters']]: {
          doc_count:number;
        } & AggregationResponseOf<TAggregation, TDocument>
      } & (TAggregation extends { filters: { other_bucket_key: infer TOtherBucketKey } } ? Record<TOtherBucketKey & string, { doc_count:number} & AggregationResponseOf<TAggregation, TDocument>> : unknown)
      & (TAggregation extends { filters: { other_bucket: true } } ? { _other: { doc_count:number } & AggregationResponseOf<TAggregation, TDocument> } : unknown)
    )
    : unknown
  };
  geo_bounds: {
    top_left: {
      lat: number | null;
      lon: number | null;
    };
    bottom_right: {
      lat: number | null;
      lon: number | null;
    };
  };
  geo_centroid: {
    count: number;
    location: {
      lat: number;
      lon: number;
    };
  };
  geo_distance: MaybeKeyed<
    TAggregation,
    {
      from:number;
      to?:number;
      doc_count:number;
    } & AggregationResponseOf<TAggregation, TDocument>
  >;
  geo_hash: {
    buckets:Array<{
      doc_count:number;
      key:string;
    } & AggregationResponseOf<TAggregation, TDocument>>
  };
  geotile_grid: {
    buckets:Array<{
      doc_count:number;
      key:string;
    } & AggregationResponseOf<TAggregation, TDocument>>
  };
  global: {
    doc_count: number;
  } & AggregationResponseOf<TAggregation, TDocument>;
  histogram: MaybeKeyed<TAggregation, {
    key:number;
    doc_count:number;
  } & AggregationResponseOf<TAggregation, TDocument>>;
  ip_range: MaybeKeyed<TAggregation, {
    key:string;
    from?:string;
    to?:string;
    doc_count:number;
  }, TAggregation extends { ip_range: { ranges: Array<infer TRangeType> } } ? TRangeType extends { key: infer TKeys } ? TKeys : string : string>;
  inference: {
    value: number;
    prediction_probability: number;
    prediction_score: number;
  };
  max: {
    value: number | null;
    value_as_string?: string;
  };
  max_bucket: {
    value: number | null;
  };
  min: {
    value: number | null;
    value_as_string?: string;
  };
  min_bucket:{
    value: number | null;
  };
  median_absolute_deviation: {
    value: number | null;
  };
  moving_avg: {
    value: number | null;
  } | undefined;
  moving_fn: {
    value: number | null;
  };
  moving_percentiles: TAggregation extends Record<string, { keyed: false }> ? Array<{key:number; value:number | null }> : Record<string, number | null> | undefined;
  missing: {
    doc_count:number;
  } & AggregationResponseOf<TAggregation, TDocument>;
  nested: {
    doc_count:number;
  } & AggregationResponseOf<TAggregation, TDocument>;
  normalize: {
    value: number | null;
    // TODO: should be perhaps based on input? ie when `format` is specified
    value_as_string?: string;
  };
  parent: {
    doc_count:number;
  } & AggregationResponseOf<TAggregation, TDocument>;
  percentiles: TAggregation extends Record<string, { keyed: false }> ? Array<{key:number; value:number | null }> : Record<string, number | null>;
  percentile_ranks: TAggregation extends Record<string, { keyed: false }> ? Array<{key:number; value:number | null }> : Record<string, number | null>;
  percentiles_bucket: TAggregation extends Record<string, { keyed: false }> ? Array<{key:number; value:number | null }> : Record<string, number | null>;
  range: MaybeKeyed<TAggregation, {
    key:string;
    from?:number;
    to?:number;
    doc_count:number;
  }, TAggregation extends { range: { ranges: Array<infer TRangeType> } } ? TRangeType extends { key: infer TKeys } ? TKeys : string : string>;
  rare_terms: Array<{
    key:string | number;
    doc_count:number;
  } & AggregationResponseOf<TAggregation, TDocument>>;
  reverse_nested: {
    doc_count:number;
  } & AggregationResponseOf<TAggregation, TDocument>;
  sampler: {
    doc_count:number;
  } & AggregationResponseOf<TAggregation, TDocument>;
  scripted_metric: {
    value: unknown;
  };
  serial_diff: {
    value: number | null;
    // TODO: should be perhaps based on input? ie when `format` is specified
    value_as_string?: string;
  };
  significant_terms: {
    doc_count:number;
    bg_count:number;
    buckets:Array<{
      key:string | number;
      score:number;
      doc_count:number;
      bg_count:number;
    } & AggregationResponseOf<TAggregation, TDocument>>;
  };
  significant_text: {
    doc_count:number;
    buckets:Array<{
      key:string;
      doc_count:number;
      score:number;
      bg_count: number;
    }>;
  };
  stats: {
    count: number;
    min: number | null;
    max: number | null;
    avg: number | null;
    sum: number;
  } & ({
    min_as_string: string;
    max_as_string: string;
    avg_as_string: string;
    sum_as_string: string;
  } | {});
  stats_bucket: {
    count: number;
    min: number | null;
    max: number | null;
    avg: number | null;
    sum: number;
  };
  string_stats: {
    count:number;
    min_length: number | null;
    max_length: number | null;
    avg_length: number | null;
    entropy: number | null;
    distribution: Record<string, number>;
  };
  sum: {
    value: number | null;
    value_as_string?: string;
  };
  sum_bucket: {
    value: number | null;
  };
  terms: {
    doc_count_error_upper_bound:number;
    sum_other_doc_count:number;
    buckets:Array<{
      doc_count:number;
      key:string | number;
    } & AggregationResponseOf<TAggregation, TDocument>>
  };
  top_hits: {
    hits: {
      total: {
        value: number;
        relation: 'eq' | 'gte';
      };
      max_score:number | null;
      hits: Array<{
        _index:string;
        _type:string;
        _id:string;
        _source: TDocument;
        _sort: number | string | Array<number | string>;
        _score:number | null;
      }>;
    };
  };
  top_metrics: {
    top: Array<{
      sort: number | string | Array<number | string>;
      metrics: Record<TAggregation extends Record<string, { metrics: Array<{ field: infer TKeys}> }> ? TKeys : string, string | number | null>;
    }>;
  }
  weighted_avg: { value: number | null };
  value_count: {
    value: number | null;
  };
  // t_test: {} not defined
})[ValidAggregationKeysOf<TAggregation> & AggregationTypeName]

type AggregationResponseOfMap<TAggregationMap extends AggregationMap, TDocument extends unknown> = OmitByValueExact<{
  [TAggregationName in keyof TAggregationMap]: TAggregationMap[TAggregationName] extends Aggregation ? AggregationResultOf<
    TAggregationMap[TAggregationName],
    TDocument
  > : never // using never means we effectively ignore optional keys, using {} creates a union type of { ... } | {}
}, undefined>; // filter out aggregations that don't have a response, e.g. bucket_selector

type AggregationResponseOf<TAggregationRequest, TDocument = unknown> = TAggregationRequest extends { aggs?: AggregationMap } ?
  AggregationResponseOfMap<TAggregationRequest['aggs'], TDocument>
  : TAggregationRequest extends { aggregations?: AggregationMap } ?
  AggregationResponseOfMap<TAggregationRequest['aggregations'], TDocument>
   : {};

type WrapAggregationResponse<T> = keyof T extends never ? { aggregations?: unknown } : { aggregations?: T }; 

type SearchResponseOf<TAggregationRequest extends AggregationRequest, TDocument = unknown> = AggregationResponseOf<TAggregationRequest, TDocument>;

export type InferSearchResponseOf<TRequest extends T.SearchRequest, TDocument = unknown> =
  Omit<T.SearchResponse<TDocument>, 'aggregations'> & (TRequest['body'] extends AggregationRequest ? WrapAggregationResponse<SearchResponseOf<TRequest['body'], TDocument>> : { aggregations?: InvalidAggregationRequest })

// from EUI

/**
 * Returns member keys in U not present in T set to never
 * T = { 'one', 'two', 'three' }
 * U = { 'three', 'four', 'five' }
 * returns { 'four': never, 'five': never }
 */
type DisambiguateSet<T, U, ErrorMessage = never> = {
  [P in Exclude<keyof UnionToIntersection<T>, keyof UnionToIntersection<U>>]?: ErrorMessage
};
/**
 * Allow either T or U, preventing any additional keys of the other type from being present
 */
type ExclusiveUnion<T, U, ErrorMessage = never> = T | U extends object ? (DisambiguateSet<T, U, ErrorMessage> & U) | (DisambiguateSet<U, T, ErrorMessage> & T) : T | U;
