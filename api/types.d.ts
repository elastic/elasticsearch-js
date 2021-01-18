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

export type Aggregate = ValueAggregate | DocCountAggregate | AutoDateHistogramAggregate | FiltersAggregate | SignificantTermsAggregate<object> | TermsAggregate<object> | BucketAggregate | CompositeBucketAggregate | MultiBucketAggregate<object> | SingleBucketAggregate | MatrixStatsAggregate | BoxPlotAggregate | ExtendedStatsAggregate | GeoBoundsAggregate | GeoCentroidAggregate | PercentilesAggregate | ScriptedMetricAggregate | StatsAggregate | StringStatsAggregate | TopHitsAggregate | TopMetricsAggregate | KeyedValueAggregate | TDigestPercentilesAggregate | HdrPercentilesAggregate
export interface AggregateBase {
  meta?: Record<string, any>
}

export interface AggregationContainer {
  adjacency_matrix?: AdjacencyMatrixAggregation
  aggs?: Record<string, AggregationContainer>
  aggregations?: Record<string, AggregationContainer>
  auto_date_histogram?: AutoDateHistogramAggregation
  avg?: AverageAggregation
  avg_bucket?: AverageBucketAggregation
  boxplot?: BoxplotAggregation
  bucket_script?: BucketScriptAggregation
  bucket_selector?: BucketSelectorAggregation
  bucket_sort?: BucketSortAggregation
  cardinality?: CardinalityAggregation
  children?: ChildrenAggregation
  composite?: CompositeAggregation
  cumulative_cardinality?: CumulativeCardinalityAggregation
  cumulative_sum?: CumulativeSumAggregation
  date_histogram?: DateHistogramAggregation
  date_range?: DateRangeAggregation
  derivative?: DerivativeAggregation
  extended_stats?: ExtendedStatsAggregation
  extended_stats_bucket?: ExtendedStatsBucketAggregation
  filter?: QueryContainer
  filters?: FiltersAggregation
  geo_bounds?: GeoBoundsAggregation
  geo_centroid?: GeoCentroidAggregation
  geo_distance?: GeoDistanceAggregation
  geohash_grid?: GeoHashGridAggregation
  geotile_grid?: GeoTileGridAggregation
  global?: GlobalAggregation
  histogram?: HistogramAggregation
  ip_range?: IpRangeAggregation
  matrix_stats?: MatrixStatsAggregation
  max?: MaxAggregation
  max_bucket?: MaxBucketAggregation
  median_absolute_deviation?: MedianAbsoluteDeviationAggregation
  meta?: Record<string, string | number | boolean>
  min?: MinAggregation
  min_bucket?: MinBucketAggregation
  missing?: MissingAggregation
  moving_avg?: MovingAverageAggregation
  moving_fn?: MovingFunctionAggregation
  nested?: NestedAggregation
  parent?: ParentAggregation
  percentile_ranks?: PercentileRanksAggregation
  percentiles?: PercentilesAggregation
  percentiles_bucket?: PercentilesBucketAggregation
  range?: RangeAggregation
  rare_terms?: RareTermsAggregation
  reverse_nested?: ReverseNestedAggregation
  sampler?: SamplerAggregation
  scripted_metric?: ScriptedMetricAggregation
  serial_diff?: SerialDifferencingAggregation
  significant_terms?: SignificantTermsAggregation
  significant_text?: SignificantTextAggregation
  stats?: StatsAggregation
  stats_bucket?: StatsBucketAggregation
  string_stats?: StringStatsAggregation
  sum?: SumAggregation
  sum_bucket?: SumBucketAggregation
  terms?: TermsAggregation
  top_hits?: TopHitsAggregation
  top_metrics?: TopMetricsAggregation
  value_count?: ValueCountAggregation
  weighted_avg?: WeightedAverageAggregation
  variable_width_histogram?: VariableWidthHistogramAggregation
}

export interface AutoDateHistogramAggregate extends AggregateBase {
  interval: DateMathTime
}

export interface BoxPlotAggregate extends AggregateBase {
  min: double
  max: double
  q1: double
  q2: double
  q3: double
}

export type Bucket = CompositeBucket | DateHistogramBucket | FiltersBucketItem | IpRangeBucket | RangeBucket | RareTermsBucket<object> | SignificantTermsBucket<object> | KeyedBucket<object>
export interface BucketAggregate extends AggregateBase {
  after_key: Record<string, any>
  bg_count: long
  doc_count: long
  doc_count_error_upper_bound: long
  sum_other_doc_count: long
  interval: DateMathTime
  items: Bucket
}

export interface BucketBase {
}

export interface CompositeBucket extends BucketBase {
}

export interface CompositeBucketAggregate extends MultiBucketAggregate<Record<string, any>> {
  after_key: Record<string, any>
}

export interface DateHistogramBucket extends BucketBase {
}

export interface DocCountAggregate extends AggregateBase {
  doc_count: double
}

export interface ExtendedStatsAggregate extends StatsAggregate {
  sum_of_squares: double
  variance: double
  variance_population: double
  variance_sampling: double
  std_deviation: double
  std_deviation_population: double
  std_deviation_sampling: double
  std_deviation_bounds: StandardDeviationBounds
}

export interface FiltersAggregate extends AggregateBase {
  buckets: Array<FiltersBucketItem> | Record<string, FiltersBucketItem>
}

export interface FiltersBucketItem extends BucketBase {
  doc_count: long
}

export interface GeoBounds {
  bottom_right: LatLon
  top_left: LatLon
}

export interface GeoBoundsAggregate extends AggregateBase {
  bounds: GeoBounds
}

export interface GeoCentroidAggregate extends AggregateBase {
  count: long
  location: GeoLocation
}

export interface HdrPercentileItem {
  key: double
  value: double
}

export interface HdrPercentilesAggregate extends AggregateBase {
  values: Array<HdrPercentileItem>
}

export interface IpRangeBucket extends BucketBase {
}

export interface KeyedBucket<TKey = unknown> extends BucketBase {
}

export interface KeyedValueAggregate extends ValueAggregate {
  keys: Array<string>
}

export interface MatrixStatsAggregate extends AggregateBase {
  correlation: Record<string, double>
  covariance: Record<string, double>
  count: integer
  kurtosis: double
  mean: double
  skewness: double
  variance: double
  name: string
}

export type Missing = string | integer | boolean
export interface MultiBucketAggregate<TBucket = unknown> extends AggregateBase {
  buckets: Array<TBucket>
}

export interface PercentileItem {
  percentile: double
  value: double
}

export interface PercentilesAggregate extends AggregateBase {
  items: Array<PercentileItem>
}

export interface RangeBucket extends BucketBase {
}

export interface RareTermsBucket<TKey = unknown> extends BucketBase {
}

export interface ScriptedMetricAggregate extends AggregateBase {
}

export interface SignificantTermsAggregate<TKey = unknown> extends MultiBucketAggregate<TKey> {
  bg_count: long
  doc_count: long
}

export interface SignificantTermsBucket<TKey = unknown> extends BucketBase {
}

export interface SingleBucketAggregate extends AggregateBase {
}

export interface StandardDeviationBounds {
  lower: double
  upper: double
  lower_population: double
  upper_population: double
  lower_sampling: double
  upper_sampling: double
}

export interface StatsAggregate extends AggregateBase {
  avg: double
  count: double
  max: double
  min: double
  sum: double
}

export interface StringStatsAggregate extends AggregateBase {
  count: long
  min_length: integer
  max_length: integer
  avg_length: double
  entropy: long
  distribution: Record<string, double>
}

export interface TDigestPercentilesAggregate extends AggregateBase {
  values: Record<string, double>
}

export interface TermsAggregate<TKey = unknown> extends MultiBucketAggregate<TKey> {
  doc_count_error_upper_bound: long
  sum_other_doc_count: long
}

export interface TopHitsAggregate extends AggregateBase {
}

export interface TopMetricsAggregate extends AggregateBase {
  sort: Array<double>
  metrics: Array<double>
}

export interface ValueAggregate extends AggregateBase {
  value: double
  value_as_string?: string
}

export interface AdjacencyMatrixAggregation {
  filters?: Record<string, QueryContainer>
}

export interface AutoDateHistogramAggregation {
  buckets?: integer
  field?: Field
  format?: string
  minimum_interval?: MinimumInterval
  missing?: Date
  offset?: string
  params?: Record<string, any>
  script?: Script
  time_zone?: string
}

export type MinimumInterval = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year'

export interface ChildrenAggregation {
  type?: RelationName
}

export interface CompositeAggregation {
  after?: Record<string, string | float>
  size?: integer
  sources?: Array<Record<string, CompositeAggregationSource>>
}

export interface CompositeAggregationSource {
  terms?: TermsAggregation
  histogram?: HistogramAggregation
  date_histogram?: DateHistogramAggregation
  geotile_grid?: GeoTileGridAggregation
}

export interface DateHistogramAggregation {
  calendar_interval?: DateInterval | Time
  extended_bounds?: ExtendedBounds<DateMath>
  hard_bounds?: ExtendedBounds<DateMath>
  field?: Field
  fixed_interval?: DateInterval | Time
  format?: string
  interval?: DateInterval | Time
  min_doc_count?: integer
  missing?: Date
  offset?: Time
  order?: HistogramOrder
  params?: Record<string, any>
  script?: Script
  time_zone?: string
}

export type DateInterval = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year'

export interface DateRangeAggregation {
  field?: Field
  format?: string
  missing?: Missing
  ranges?: Array<DateRangeExpression>
  time_zone?: string
}

export interface DateRangeExpression {
  from?: DateMath | float
  key?: string
  to?: DateMath | float
}

export interface FiltersAggregation {
  filters?: Record<string, QueryContainer> | Array<QueryContainer>
  other_bucket?: boolean
  other_bucket_key?: string
}

export interface GeoDistanceAggregation {
  distance_type?: GeoDistanceType
  field?: Field
  origin?: GeoLocation | string
  ranges?: Array<AggregationRange>
  unit?: DistanceUnit
}

export interface GeoHashGridAggregation {
  bounds?: BoundingBox
  field?: Field
  precision?: GeoHashPrecision
  shard_size?: integer
  size?: integer
}

export interface GeoTileGridAggregation {
  field?: Field
  precision?: GeoTilePrecision
  shard_size?: integer
  size?: integer
}

export interface GlobalAggregation {
}

export interface ExtendedBounds<T = unknown> {
  max: T
  min: T
}

export interface HistogramAggregation {
  extended_bounds?: ExtendedBounds<double>
  hard_bounds?: ExtendedBounds<double>
  field?: Field
  interval?: double
  min_doc_count?: integer
  missing?: double
  offset?: double
  order?: HistogramOrder
  script?: Script
  format?: string
}

export interface HistogramOrder {
  count_ascending: HistogramOrder
  count_descending: HistogramOrder
  key: string
  key_ascending: HistogramOrder
  key_descending: HistogramOrder
  order: SortOrder
}

export interface IpRangeAggregation {
  field?: Field
  ranges?: Array<IpRangeAggregationRange>
}

export interface IpRangeAggregationRange {
  from?: string
  mask?: string
  to?: string
}

export interface MissingAggregation {
  field?: Field
  missing?: Missing
}

export interface NestedAggregation {
  path?: Field
}

export interface ParentAggregation {
  type?: RelationName
}

export interface RangeAggregation {
  field?: Field
  ranges?: Array<AggregationRange>
  script?: Script
}

export interface RareTermsAggregation {
  exclude?: string | Array<string>
  field?: Field
  include?: string | Array<string> | TermsInclude
  max_doc_count?: long
  missing?: Missing
  precision?: double
  value_type?: string
}

export interface ReverseNestedAggregation {
  path?: Field
}

export interface SamplerAggregation {
  execution_hint?: SamplerAggregationExecutionHint
  max_docs_per_value?: integer
  script?: Script
  shard_size?: integer
}

export type SamplerAggregationExecutionHint = 'map' | 'global_ordinals' | 'bytes_hash'

export interface SignificantTermsAggregation {
  background_filter?: QueryContainer
  chi_square?: ChiSquareHeuristic
  exclude?: string | Array<string>
  execution_hint?: TermsAggregationExecutionHint
  field?: Field
  gnd?: GoogleNormalizedDistanceHeuristic
  include?: string | Array<string>
  min_doc_count?: long
  mutual_information?: MutualInformationHeuristic
  percentage?: PercentageScoreHeuristic
  script_heuristic?: ScriptedHeuristic
  shard_min_doc_count?: long
  shard_size?: integer
  size?: integer
}

export interface ChiSquareHeuristic {
  background_is_superset: boolean
  include_negatives: boolean
}

export interface GoogleNormalizedDistanceHeuristic {
  background_is_superset: boolean
}

export interface MutualInformationHeuristic {
  background_is_superset: boolean
  include_negatives: boolean
}

export interface PercentageScoreHeuristic {
}

export interface ScriptedHeuristic {
  script: Script
}

export interface SignificantTextAggregation {
  background_filter?: QueryContainer
  chi_square?: ChiSquareHeuristic
  exclude?: string | Array<string>
  execution_hint?: TermsAggregationExecutionHint
  field?: Field
  filter_duplicate_text?: boolean
  gnd?: GoogleNormalizedDistanceHeuristic
  include?: string | Array<string>
  min_doc_count?: long
  mutual_information?: MutualInformationHeuristic
  percentage?: PercentageScoreHeuristic
  script_heuristic?: ScriptedHeuristic
  shard_min_doc_count?: long
  shard_size?: integer
  size?: integer
  source_fields?: Array<Field>
}

export interface TermsAggregation {
  collect_mode?: TermsAggregationCollectMode
  exclude?: string | Array<string>
  execution_hint?: TermsAggregationExecutionHint
  field?: Field
  include?: string | Array<string> | TermsInclude
  min_doc_count?: integer
  missing?: Missing
  value_type?: string
  order?: Record<string, SortOrder>
  script?: Script
  shard_size?: integer
  show_term_doc_count_error?: boolean
  size?: integer
}

export type TermsAggregationCollectMode = 'depth_first' | 'breadth_first'

export type TermsAggregationExecutionHint = 'map' | 'global_ordinals' | 'global_ordinals_hash' | 'global_ordinals_low_cardinality'

export interface TermsInclude {
  num_partitions: long
  partition: long
}

export interface VariableWidthHistogramAggregation {
  field?: Field
  buckets?: integer
  shard_size?: integer
  initial_buffer?: integer
}

export interface MatrixStatsAggregation {
  mode?: MatrixStatsMode
}

export type MatrixStatsMode = 'avg' | 'min' | 'max' | 'sum' | 'median'

export interface AverageAggregation {
}

export interface BoxplotAggregation {
  compression?: double
}

export interface CardinalityAggregation {
  precision_threshold?: integer
  rehash?: boolean
  field?: Field
}

export interface ExtendedStatsAggregation {
  sigma?: double
  field?: Field
}

export interface GeoBoundsAggregation {
  wrap_longitude?: boolean
}

export interface GeoCentroidAggregation {
}

export interface MaxAggregation {
}

export interface MedianAbsoluteDeviationAggregation {
  compression?: double
  field?: Field
  missing?: Missing
}

export interface MinAggregation {
}

export interface PercentileRanksAggregation {
  keyed?: boolean
  values?: Array<double>
  field?: Field
  hdr?: HdrMethod
  tdigest?: TDigest
}

export interface HdrMethod {
  number_of_significant_value_digits?: integer
}

export interface PercentilesAggregation {
  keyed?: boolean
  percents?: Array<double>
  field?: Field
  missing?: Missing
  hdr?: HdrMethod
  tdigest?: TDigest
}

export interface TDigest {
  compression?: integer
}

export interface ScriptedMetricAggregation {
  combine_script?: Script
  init_script?: Script
  map_script?: Script
  params?: Record<string, any>
  reduce_script?: Script
}

export interface StatsAggregation {
}

export interface StringStatsAggregation {
  field?: Field
  missing?: object
  script?: Script
  show_distribution?: boolean
}

export interface SumAggregation {
}

export interface TopHitsAggregation {
  docvalue_fields?: Array<Field>
  explain?: boolean
  from?: integer
  highlight?: Highlight
  script_fields?: Record<string, ScriptField>
  size?: integer
  sort?: string | Record<Field, NestedSort> | Array<Record<string, Sort | SortOrder | Record<Field, NestedSort>>>
  _source?: boolean | SourceFilter
  stored_fields?: Array<Field>
  track_scores?: boolean
  version?: boolean
  seq_no_primary_term?: boolean
}

export interface TopMetricsAggregation {
  metrics?: Array<TopMetricsValue>
  size?: integer
  sort?: Array<Sort>
}

export interface TopMetricsValue {
  field: Field
}

export interface ValueCountAggregation {
}

export type ValueType = 'string' | 'long' | 'double' | 'number' | 'date' | 'date_nanos' | 'ip' | 'numeric' | 'geo_point' | 'boolean'

export interface WeightedAverageAggregation {
  format?: string
  value?: WeightedAverageValue
  value_type?: ValueType
  weight?: WeightedAverageValue
}

export interface WeightedAverageValue {
  field: Field
  missing: double
  script: Script
}

export type GapPolicy = 'skip' | 'insert_zeros'

export interface AverageBucketAggregation {
}

export interface BucketScriptAggregation {
  script?: Script
}

export interface BucketSelectorAggregation {
  script?: Script
}

export interface BucketSortAggregation {
  from?: integer
  gap_policy?: GapPolicy
  size?: integer
  sort?: Array<Sort>
}

export interface CumulativeCardinalityAggregation {
}

export interface CumulativeSumAggregation {
}

export interface DerivativeAggregation {
}

export interface ExtendedStatsBucketAggregation {
  sigma?: double
}

export interface MaxBucketAggregation {
}

export interface MinBucketAggregation {
}

export interface MovingAverageAggregation {
  minimize?: boolean
  model?: MovingAverageModel
  predict?: integer
  window?: integer
}

export interface MovingAverageModel {
  name: string
}

export interface MovingFunctionAggregation {
  script?: string
  shift?: integer
  window?: integer
}

export interface PercentilesBucketAggregation {
  percents?: Array<double>
}

export interface SerialDifferencingAggregation {
  lag?: integer
}

export interface StatsBucketAggregation {
}

export interface SumBucketAggregation {
}

export type StopWords = string | Array<string>
export interface ICharFilter {
  type: string
  version: string
}

export interface ITokenFilter {
  type: string
  version: string
}

export interface ITokenizer {
  type: string
  version: string
}

export interface CatRequestBase extends RequestBase {
  format?: string
  h?: Array<string>
  help?: boolean
  local?: boolean
  master_timeout?: Time
  s?: Array<string>
  v?: boolean
}

export interface CatAliasesRecord {
  alias: string
  filter: string
  index: string
  indexRouting: string
  searchRouting: string
}

export interface CatAliasesRequest extends CatRequestBase {
  name?: Names
  expand_wildcards?: ExpandWildcards
}

export type CatAliasesResponse = CatAliasesRecord[]

export interface CatAllocationRecord {
  'disk.avail': string
  'disk.indices': string
  'disk.percent': string
  disk_ratio: string
  'disk.total': string
  'disk.used': string
  host: string
  ip: string
  node: string
  shards: string
}

export interface CatAllocationRequest extends CatRequestBase {
  node_id?: NodeIds
  bytes?: Bytes
}

export type CatAllocationResponse = CatAllocationRecord[]

export interface CatCountRecord {
  count: string
  epoch: string
  timestamp: string
}

export interface CatCountRequest extends CatRequestBase {
  index?: Indices
}

export type CatCountResponse = CatCountRecord[]

export interface CatDataFrameAnalyticsRecord {
  assignment_explanation: string
  create_time: string
  description: string
  dest_index: string
  failure_reason: string
  id: string
  model_memory_limit: string
  'node.address': string
  'node.ephemeral_id': string
  'node.id': string
  'node.name': string
  progress: string
  source_index: string
  state: string
  type: string
  version: string
}

export interface CatDataFrameAnalyticsRequest extends CatRequestBase {
  id?: Id
  allow_no_match?: boolean
  bytes?: Bytes
}

export type CatDataFrameAnalyticsResponse = CatDataFrameAnalyticsRecord[]

export interface CatDatafeedsRecord {
  assignment_explanation: string
  'buckets.count': string
  id: string
  'node.address': string
  'node.ephemeral_id': string
  'node.id': string
  'node.name': string
  'search.bucket_avg': string
  'search.count': string
  'search.exp_avg_hour': string
  'search.time': string
  state: DatafeedState
}

export interface CatDatafeedsRequest extends CatRequestBase {
  datafeed_id?: Id
  allow_no_datafeeds?: boolean
}

export type CatDatafeedsResponse = CatDatafeedsRecord[]

export interface CatFielddataRecord {
  field: string
  host: string
  id: string
  ip: string
  node: string
  size: string
}

export interface CatFielddataRequest extends CatRequestBase {
  fields?: Fields
  bytes?: Bytes
}

export type CatFielddataResponse = CatFielddataRecord[]

export interface CatHealthRecord {
  cluster: string
  epoch: string
  init: string
  'node.data': string
  'node.total': string
  pending_tasks: string
  pri: string
  relo: string
  shards: string
  status: string
  timestamp: string
  unassign: string
}

export interface CatHealthRequest extends CatRequestBase {
  include_timestamp?: boolean
}

export type CatHealthResponse = CatHealthRecord[]

export interface CatHelpRecord {
  endpoint: string
}

export interface CatHelpRequest extends CatRequestBase {
}

export type CatHelpResponse = CatHelpRecord[]

export interface CatIndicesRecord {
  'docs.count': string
  'docs.deleted': string
  health: string
  index: string
  pri: string
  'pri.store.size': string
  rep: string
  status: string
  'store.size': string
  tm: string
  uuid: string
}

export interface CatIndicesRequest extends CatRequestBase {
  index?: Indices
  bytes?: Bytes
  expand_wildcards?: ExpandWildcards
  health?: Health
  include_unloaded_segments?: boolean
  pri?: boolean
}

export type CatIndicesResponse = CatIndicesRecord[]

export interface CatJobsRecord {
  assignment_explanation: string
  'buckets.count': string
  'buckets.time.exp_avg': string
  'buckets.time.exp_avg_hour': string
  'buckets.time.max': string
  'buckets.time.min': string
  'buckets.time.total': string
  'data.buckets': string
  'data.earliest_record': string
  'data.empty_buckets': string
  'data.input_bytes': string
  'data.input_fields': string
  'data.input_records': string
  'data.invalid_dates': string
  'data.last': string
  'data.last_empty_bucket': string
  'data.last_sparse_bucket': string
  'data.latest_record': string
  'data.missing_fields': string
  'data.out_of_order_timestamps': string
  'data.processed_fields': string
  'data.processed_records': string
  'data.sparse_buckets': string
  'forecasts.memory.avg': string
  'forecasts.memory.min': string
  'forecasts.memory.total': string
  'forecasts.records.avg': string
  'forecasts.records.max': string
  'forecasts.records.min': string
  'forecasts.records.total': string
  'forecasts.time.avg': string
  'forecasts.time.max': string
  'forecasts.time.min': string
  'forecasts.total': string
  id: string
  'model.bucket_allocation_failures': string
  'model.by_fields': string
  'model.bytes': string
  'model.categorization_status': ModelCategorizationStatus
  'model.categorized_doc_count': string
  'model.dead_category_count': string
  'model.frequent_category_count': string
  'model.log_time': string
  'model.memory_limit': string
  'model.memory_status': ModelMemoryStatus
  'model.over_fields': string
  'model.partition_fields': string
  'model.rare_category_count': string
  'model.timestamp': string
  'node.address': string
  'node.ephemeral_id': string
  'node.id': string
  'node.name': string
  opened_time: string
  state: JobState
}

export interface CatJobsRequest extends CatRequestBase {
  job_id?: Id
  allow_no_jobs?: boolean
  bytes?: Bytes
}

export type CatJobsResponse = CatJobsRecord[]

export type ModelCategorizationStatus = 'ok' | 'warn'

export type ModelMemoryStatus = 'ok' | 'soft_limit' | 'hard_limit'

export interface CatMasterRecord {
  id: string
  ip: string
  node: string
}

export interface CatMasterRequest extends CatRequestBase {
}

export type CatMasterResponse = CatMasterRecord[]

export interface CatNodeAttributesRecord {
  attr: string
  host: string
  id: string
  ip: string
  node: string
  port: long
  pid: long
  value: string
}

export interface CatNodeAttributesRequest extends CatRequestBase {
}

export type CatNodeAttributesResponse = CatNodeAttributesRecord[]

export interface CatNodesRecord {
  build: string
  completion_size: string
  cpu: string
  disk_available: string
  fielddata_evictions: string
  fielddata_memory: string
  file_descriptor_current: integer
  file_descriptor_max: integer
  file_descriptor_percent: integer
  filter_cache_evictions: string
  filter_cache_memory: string
  flush_total: string
  flush_total_time: string
  get_current: string
  get_exists_time: string
  get_exists_total: string
  get_missing_time: string
  get_missing_total: string
  get_time: string
  get_total: string
  heap_current: string
  heap_max: string
  heap_percent: string
  id_cache_memory: string
  indexing_delete_current: string
  indexing_delete_time: string
  indexing_delete_total: string
  indexing_index_current: string
  indexing_index_time: string
  indexing_index_total: string
  ip: string
  jdk: string
  load_15m: string
  load_5m: string
  load_1m: string
  master: string
  merges_current: string
  merges_current_docs: string
  merges_current_size: string
  merges_total: string
  merges_total_docs: string
  merges_total_time: string
  name: string
  node_id: string
  node_role: string
  percolate_current: string
  percolate_memory: string
  percolate_queries: string
  percolate_time: string
  percolate_total: string
  pid: string
  port: string
  ram_current: string
  ram_max: string
  ram_percent: string
  refresh_time: string
  refresh_total: string
  search_fetch_current: string
  search_fetch_time: string
  search_fetch_total: string
  search_open_contexts: string
  search_query_current: string
  search_query_time: string
  search_query_total: string
  segments_count: string
  segments_index_writer_max_memory: string
  segments_index_writer_memory: string
  segments_memory: string
  segments_version_map_memory: string
  uptime: string
  version: string
}

export interface CatNodesRequest extends CatRequestBase {
  bytes?: Bytes
  full_id?: boolean
}

export type CatNodesResponse = CatNodesRecord[]

export interface CatPendingTasksRecord {
  insertOrder: integer
  priority: string
  source: string
  timeInQueue: string
}

export interface CatPendingTasksRequest extends CatRequestBase {
}

export type CatPendingTasksResponse = CatPendingTasksRecord[]

export interface CatPluginsRecord {
  component: string
  description: string
  id: string
  isolation: string
  name: string
  type: string
  url: string
  version: string
}

export interface CatPluginsRequest extends CatRequestBase {
}

export type CatPluginsResponse = CatPluginsRecord[]

export interface CatRecoveryRecord {
  bytes: string
  bytes_percent: string
  bytes_recovered: string
  bytes_total: string
  files: string
  files_percent: string
  files_recovered: string
  files_total: string
  index: string
  repository: string
  shard: string
  snapshot: string
  source_host: string
  source_node: string
  stage: string
  target_host: string
  target_node: string
  time: string
  translog_ops: long
  translog_ops_percent: string
  translog_ops_recovered: long
  type: string
}

export interface CatRecoveryRequest extends CatRequestBase {
  index?: Indices
  active_only?: boolean
  bytes?: Bytes
  detailed?: boolean
}

export type CatRecoveryResponse = CatRecoveryRecord[]

export interface CatRepositoriesRecord {
  id: string
  type: string
}

export interface CatRepositoriesRequest extends CatRequestBase {
}

export type CatRepositoriesResponse = CatRepositoriesRecord[]

export interface CatSegmentsRecord {
  committed: string
  compound: string
  'docs.count': string
  'docs.deleted': string
  generation: string
  id: string
  index: string
  ip: string
  prirep: string
  searchable: string
  segment: string
  shard: string
  size: string
  'size.memory': string
  version: string
}

export interface CatSegmentsRequest extends CatRequestBase {
  index?: Indices
  bytes?: Bytes
}

export type CatSegmentsResponse = CatSegmentsRecord[]

export interface CatShardsRecord {
  'completion.size': string
  docs: string
  'fielddata.evictions': string
  'fielddata.memory_size': string
  'filter_cache.memory_size': string
  'flush.total': string
  'flush.total_time': string
  'get.current': string
  'get.exists_time': string
  'get.exists_total': string
  'get.missing_time': string
  'get.missing_total': string
  'get.time': string
  'get.total': string
  id: string
  'id_cache.memory_size': string
  index: string
  'indexing.delete_current': string
  'indexing.delete_time': string
  'indexing.delete_total': string
  'indexing.index_current': string
  'indexing.index_time': string
  'indexing.index_total': string
  ip: string
  'merges.current': string
  'merges.current_docs': string
  'merges.current_size': string
  'merges.total_docs': string
  'merges.total_size': string
  'merges.total_time': string
  node: string
  'percolate.current': string
  'percolate.memory_size': string
  'percolate.queries': string
  'percolate.time': string
  'percolate.total': string
  prirep: string
  'refresh.time': string
  'refresh.total': string
  'search.fetch_current': string
  'search.fetch_time': string
  'search.fetch_total': string
  'search.open_contexts': string
  'search.query_current': string
  'search.query_time': string
  'search.query_total': string
  'segments.count': string
  'segments.fixed_bitset_memory': string
  'segments.index_writer_max_memory': string
  'segments.index_writer_memory': string
  'segments.memory': string
  'segments.version_map_memory': string
  shard: string
  state: string
  store: string
  'warmer.current': string
  'warmer.total': string
  'warmer.total_time': string
}

export interface CatShardsRequest extends CatRequestBase {
  index?: Indices
  bytes?: Bytes
}

export type CatShardsResponse = CatShardsRecord[]

export interface CatSnapshotsRecord {
  duration: Time
  end_epoch: long
  end_time: string
  failed_shards: long
  id: string
  indices: long
  start_epoch: long
  start_time: string
  status: string
  successful_shards: long
  total_shards: long
}

export interface CatSnapshotsRequest extends CatRequestBase {
  repository?: Names
  ignore_unavailable?: boolean
}

export type CatSnapshotsResponse = CatSnapshotsRecord[]

export interface CatTasksRecord {
  action: string
  ip: string
  node: string
  parent_task_id: string
  running_time: string
  start_time: string
  task_id: string
  timestamp: string
  type: string
}

export interface CatTasksRequest extends CatRequestBase {
  actions?: Array<string>
  detailed?: boolean
  node_id?: Array<string>
  parent_task?: long
}

export type CatTasksResponse = CatTasksRecord[]

export interface CatTemplatesRecord {
  index_patterns: string
  name: string
  order: long
  version: long
  composed_of: string
}

export interface CatTemplatesRequest extends CatRequestBase {
  name?: Name
}

export type CatTemplatesResponse = CatTemplatesRecord[]

export interface CatThreadPoolRecord {
  active: integer
  completed: long
  core: integer
  ephemeral_node_id: string
  host: string
  ip: string
  keep_alive: Time
  largest: integer
  max: integer
  name: string
  node_id: string
  node_name: string
  pool_size: integer
  port: integer
  pid: integer
  queue: integer
  queue_size: integer
  rejected: long
  size: integer
  type: string
}

export interface CatThreadPoolRequest extends CatRequestBase {
  thread_pool_patterns?: Names
  size?: Size
}

export type CatThreadPoolResponse = CatThreadPoolRecord[]

export interface CatTrainedModelsRecord {
  created_by: string
  create_time: string
  data_frame_analytics_id: string
  description: string
  heap_size: string
  id: string
  'ingest.count': long
  'ingest.current': long
  'ingest.failed': long
  'ingest.pipelines': string
  'ingest.time': long
  license: string
  operations: string
  version: string
}

export interface CatTrainedModelsRequest extends CatRequestBase {
  model_id?: Id
  allow_no_match?: boolean
  bytes?: Bytes
  from?: integer
  size?: integer
}

export type CatTrainedModelsResponse = CatTrainedModelsRecord[]

export interface CatTransformsRecord {
  changes_last_detection_time: string
  checkpoint_duration_time_exp_avg: long
  create_time: Date
  description: string
  dest_index: string
  documents_indexed: long
  documents_processed: long
  frequency: Time
  id: string
  indexed_documents_exp_avg: long
  index_failure: long
  index_time: long
  index_total: long
  max_page_search_size: long
  pages_processed: long
  pipeline: string
  processed_documents_exp_avg: long
  processing_time: long
  reason: string
  search_failure: long
  search_time: long
  search_total: long
  source_index: Indices
  state: TransformState
  transform_type: TransformType
  trigger_count: long
  version: string
}

export interface CatTransformsRequest extends CatRequestBase {
  transform_id?: Id
  allow_no_match?: boolean
  from?: integer
  size?: integer
}

export type CatTransformsResponse = CatTransformsRecord[]

export type TransformState = 'STARTED' | 'INDEXING' | 'ABORTING' | 'STOPPING' | 'STOPPED' | 'FAILED'

export type TransformType = 'batch' | 'continuous'

export type ClusterStatus = 'green' | 'yellow' | 'red'

export interface NodesResponseBase extends ResponseBase {
  _nodes: NodeStatistics
}

export interface NodeStatistics {
  failed: integer
  failures: Array<ErrorCause>
  successful: integer
  total: integer
}

export interface AllocationDecision {
  decider: string
  decision: AllocationExplainDecision
  explanation: string
}

export type AllocationExplainDecision = 'NO' | 'YES' | 'THROTTLE' | 'ALWAYS'

export interface AllocationStore {
  allocation_id: string
  found: boolean
  in_sync: boolean
  matching_size_in_bytes: long
  matching_sync_id: boolean
  store_exception: string
}

export interface ClusterAllocationExplainRequest extends RequestBase {
  include_disk_info?: boolean
  include_yes_decisions?: boolean
  body?: {
    index?: IndexName
    primary?: boolean
    shard?: integer
  }
}

export interface ClusterAllocationExplainResponse extends ResponseBase {
  allocate_explanation: string
  allocation_delay: string
  allocation_delay_in_millis: long
  can_allocate: Decision
  can_move_to_other_node: Decision
  can_rebalance_cluster: Decision
  can_rebalance_cluster_decisions: Array<AllocationDecision>
  can_rebalance_to_other_node: Decision
  can_remain_decisions: Array<AllocationDecision>
  can_remain_on_current_node: Decision
  configured_delay: string
  configured_delay_in_mills: long
  current_node: CurrentNode
  current_state: string
  index: string
  move_explanation: string
  node_allocation_decisions: Array<NodeAllocationExplanation>
  primary: boolean
  rebalance_explanation: string
  remaining_delay: string
  remaining_delay_in_millis: long
  shard: integer
  unassigned_info: UnassignedInformation
}

export interface CurrentNode {
  id: string
  name: string
  attributes: Record<string, string>
  transport_address: string
  weight_ranking: integer
}

export type Decision = 'yes' | 'no' | 'worse_balance' | 'throttled' | 'awaiting_info' | 'allocation_delayed' | 'no_valid_shard_copy' | 'no_attempt'

export interface NodeAllocationExplanation {
  deciders: Array<AllocationDecision>
  node_attributes: Record<string, string>
  node_decision: Decision
  node_id: string
  node_name: string
  store: AllocationStore
  transport_address: string
  weight_ranking: integer
}

export interface UnassignedInformation {
  at: Date
  last_allocation_status: string
  reason: UnassignedInformationReason
}

export type UnassignedInformationReason = 'INDEX_CREATED' | 'CLUSTER_RECOVERED' | 'INDEX_REOPENED' | 'DANGLING_INDEX_IMPORTED' | 'NEW_INDEX_RESTORED' | 'EXISTING_INDEX_RESTORED' | 'REPLICA_ADDED' | 'ALLOCATION_FAILED' | 'NODE_LEFT' | 'REROUTE_CANCELLED' | 'REINITIALIZED' | 'REALLOCATED_REPLICA' | 'PRIMARY_FAILED' | 'FORCED_EMPTY_PRIMARY' | 'MANUAL_ALLOCATION'

export interface ClusterHealthRequest extends RequestBase {
  index?: Indices
  expand_wildcards?: ExpandWildcards
  level?: Level
  local?: boolean
  master_timeout?: Time
  timeout?: Time
  wait_for_active_shards?: string
  wait_for_events?: WaitForEvents
  wait_for_nodes?: string
  wait_for_no_initializing_shards?: boolean
  wait_for_no_relocating_shards?: boolean
  wait_for_status?: WaitForStatus
}

export interface ClusterHealthResponse extends ResponseBase {
  active_primary_shards: integer
  active_shards: integer
  active_shards_percent_as_number: double
  cluster_name: string
  delayed_unassigned_shards: integer
  indices: Record<IndexName, IndexHealthStats>
  initializing_shards: integer
  number_of_data_nodes: integer
  number_of_in_flight_fetch: integer
  number_of_nodes: integer
  number_of_pending_tasks: integer
  relocating_shards: integer
  status: Health
  task_max_waiting_in_queue_millis: long
  timed_out: boolean
  unassigned_shards: integer
}

export interface IndexHealthStats {
  active_primary_shards: integer
  active_shards: integer
  initializing_shards: integer
  number_of_replicas: integer
  number_of_shards: integer
  relocating_shards: integer
  shards: Record<string, ShardHealthStats>
  status: Health
  unassigned_shards: integer
}

export interface ShardHealthStats {
  active_shards: integer
  initializing_shards: integer
  primary_active: boolean
  relocating_shards: integer
  status: Health
  unassigned_shards: integer
}

export interface ClusterPendingTasksRequest extends RequestBase {
  local?: boolean
  master_timeout?: Time
}

export interface ClusterPendingTasksResponse extends ResponseBase {
  tasks: Array<PendingTask>
}

export interface PendingTask {
  insert_order: integer
  priority: string
  source: string
  time_in_queue: string
  time_in_queue_millis: integer
}

export interface ClusterRerouteDecision {
  decider: string
  decision: string
  explanation: string
}

export interface ClusterRerouteExplanation {
  command: string
  decisions: Array<ClusterRerouteDecision>
  parameters: ClusterRerouteParameters
}

export interface ClusterRerouteParameters {
  allow_primary: boolean
  from_node: string
  index: string
  node: string
  shard: integer
  to_node: string
}

export interface ClusterRerouteRequest extends RequestBase {
  dry_run?: boolean
  explain?: boolean
  master_timeout?: Time
  metric?: Array<string>
  retry_failed?: boolean
  timeout?: Time
  body?: {
    commands?: Array<ClusterRerouteCommand>
  }
}

export interface ClusterRerouteResponse extends ResponseBase {
  explanations: Array<ClusterRerouteExplanation>
  state: Array<string>
}

export interface ClusterRerouteCommand {
  name: string
}

export interface ClusterGetSettingsRequest extends RequestBase {
  flat_settings?: boolean
  include_defaults?: boolean
  master_timeout?: Time
  timeout?: Time
}

export interface ClusterGetSettingsResponse extends ResponseBase {
  persistent: Record<string, any>
  transient: Record<string, any>
}

export interface ClusterPutSettingsRequest extends RequestBase {
  flat_settings?: boolean
  master_timeout?: Time
  timeout?: Time
  body: {
    persistent?: Record<string, any>
    transient?: Record<string, any>
  }
}

export interface ClusterPutSettingsResponse extends ResponseBase {
  acknowledged: boolean
  persistent: Record<string, any>
  transient: Record<string, any>
}

export interface ClusterStateRequest extends RequestBase {
  metric?: Metrics
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  flat_settings?: boolean
  ignore_unavailable?: boolean
  local?: boolean
  master_timeout?: Time
  wait_for_metadata_version?: long
  wait_for_timeout?: Time
}

export interface ClusterStateResponse extends ResponseBase {
  cluster_name: string
  cluster_uuid: string
  master_node: string
  state: Array<string>
  state_uuid: string
  version: long
}

export interface ClusterFileSystem {
  available_in_bytes: long
  free_in_bytes: long
  total_in_bytes: long
}

export interface ClusterIndicesShardsIndexStats {
  primaries: ClusterShardMetrics
  replication: ClusterShardMetrics
  shards: ClusterShardMetrics
}

export interface ClusterIndicesShardsStats {
  index: ClusterIndicesShardsIndexStats
  primaries: double
  replication: double
  total: double
}

export interface ClusterIndicesStats {
  completion: CompletionStats
  count: long
  docs: DocStats
  fielddata: FielddataStats
  query_cache: QueryCacheStats
  segments: SegmentsStats
  shards: ClusterIndicesShardsStats
  store: StoreStats
}

export interface ClusterIngestStats {
  number_of_pipelines: integer
  processor_stats: Record<string, ClusterProcessorStats>
}

export interface ClusterJvm {
  max_uptime_in_millis: long
  mem: ClusterJvmMemory
  threads: long
  versions: Array<ClusterJvmVersion>
}

export interface ClusterJvmMemory {
  heap_max_in_bytes: long
  heap_used_in_bytes: long
}

export interface ClusterJvmVersion {
  bundled_jdk: boolean
  count: integer
  using_bundled_jdk: boolean
  version: string
  vm_name: string
  vm_vendor: string
  vm_version: string
}

export interface ClusterNetworkTypes {
  http_types: Record<string, integer>
  transport_types: Record<string, integer>
}

export interface ClusterNodeCount {
  coordinating_only: integer
  data: integer
  ingest: integer
  master: integer
  total: integer
  voting_only: integer
}

export interface ClusterNodesStats {
  count: ClusterNodeCount
  discovery_types: Record<string, integer>
  fs: ClusterFileSystem
  ingest: ClusterIngestStats
  jvm: ClusterJvm
  network_types: ClusterNetworkTypes
  os: ClusterOperatingSystemStats
  packaging_types: Array<NodePackagingType>
  plugins: Array<PluginStats>
  process: ClusterProcess
  versions: Array<string>
}

export interface ClusterOperatingSystemName {
  count: integer
  name: string
}

export interface ClusterOperatingSystemStats {
  allocated_processors: integer
  available_processors: integer
  mem: OperatingSystemMemoryInfo
  names: Array<ClusterOperatingSystemName>
  pretty_names: Array<ClusterOperatingSystemPrettyNane>
}

export interface ClusterProcess {
  cpu: ClusterProcessCpu
  open_file_descriptors: ClusterProcessOpenFileDescriptors
}

export interface ClusterProcessCpu {
  percent: integer
}

export interface ClusterProcessOpenFileDescriptors {
  avg: long
  max: long
  min: long
}

export interface ClusterProcessorStats {
  count: long
  current: long
  failed: long
  time_in_millis: long
}

export interface ClusterShardMetrics {
  avg: double
  max: double
  min: double
}

export interface ClusterStatsRequest extends RequestBase {
  node_id?: NodeIds
  flat_settings?: boolean
  timeout?: Time
}

export interface ClusterStatsResponse extends NodesResponseBase {
  cluster_name: string
  cluster_uuid: string
  indices: ClusterIndicesStats
  nodes: ClusterNodesStats
  status: ClusterStatus
  timestamp: long
}

export interface NodePackagingType {
  count: integer
  flavor: string
  type: string
}

export interface OperatingSystemMemoryInfo {
  free_in_bytes: long
  free_percent: integer
  total_in_bytes: long
  used_in_bytes: long
  used_percent: integer
}

export interface HotThreadInformation {
  hosts: Array<string>
  node_id: string
  node_name: string
  threads: Array<string>
}

export interface NodesHotThreadsRequest extends RequestBase {
  node_id?: NodeIds
  ignore_idle_threads?: boolean
  interval?: Time
  snapshots?: long
  threads?: long
  thread_type?: ThreadType
  timeout?: Time
}

export interface NodesHotThreadsResponse extends ResponseBase {
  hot_threads: Array<HotThreadInformation>
}

export interface ClusterOperatingSystemPrettyNane {
  count: integer
  pretty_name: string
}

export interface NodeInfo {
  attributes: Record<string, string>
  build_flavor: string
  build_hash: string
  build_type: string
  host: string
  http: NodeInfoHttp
  ip: string
  jvm: NodeJvmInfo
  name: string
  network: NodeInfoNetwork
  os: NodeOperatingSystemInfo
  plugins: Array<PluginStats>
  process: NodeProcessInfo
  roles: Array<NodeRole>
  settings: Array<string>
  thread_pool: Record<string, NodeThreadPoolInfo>
  total_indexing_buffer: long
  transport: NodeInfoTransport
  transport_address: string
  version: string
}

export interface NodeInfoHttp {
  bound_address: Array<string>
  max_content_length: string
  max_content_length_in_bytes: long
  publish_address: string
}

export interface NodeInfoJvmMemory {
  direct_max: string
  direct_max_in_bytes: long
  heap_init: string
  heap_init_in_bytes: long
  heap_max: string
  heap_max_in_bytes: long
  non_heap_init: string
  non_heap_init_in_bytes: long
  non_heap_max: string
  non_heap_max_in_bytes: long
}

export interface NodeInfoMemory {
  total: string
  total_in_bytes: long
}

export interface NodeInfoNetwork {
  primary_interface: NodeInfoNetworkInterface
  refresh_interval: integer
}

export interface NodeInfoNetworkInterface {
  address: string
  mac_address: string
  name: string
}

export interface NodeInfoOSCPU {
  cache_size: string
  cache_size_in_bytes: integer
  cores_per_socket: integer
  mhz: integer
  model: string
  total_cores: integer
  total_sockets: integer
  vendor: string
}

export interface NodeInfoTransport {
  bound_address: Array<string>
  publish_address: string
}

export interface NodeJvmInfo {
  gc_collectors: Array<string>
  mem: NodeInfoJvmMemory
  memory_pools: Array<string>
  pid: integer
  start_time_in_millis: long
  version: string
  vm_name: string
  vm_vendor: string
  vm_version: string
}

export interface NodeOperatingSystemInfo {
  arch: string
  available_processors: integer
  cpu: NodeInfoOSCPU
  mem: NodeInfoMemory
  name: string
  pretty_name: string
  refresh_interval_in_millis: integer
  swap: NodeInfoMemory
  version: string
}

export interface NodeProcessInfo {
  id: long
  mlockall: boolean
  refresh_interval_in_millis: long
}

export type NodeRole = 'master' | 'data' | 'client' | 'ingest' | 'ml' | 'voting_only' | 'transform' | 'remote_cluster_client' | 'coordinating_only'

export interface NodesInfoRequest extends RequestBase {
  node_id?: NodeIds
  metric?: Metrics
  flat_settings?: boolean
  timeout?: Time
}

export interface NodesInfoResponse extends NodesResponseBase {
  cluster_name: string
  nodes: Record<string, NodeInfo>
}

export interface NodeThreadPoolInfo {
  core: integer
  keep_alive: string
  max: integer
  queue_size: integer
  size: integer
  type: string
}

export interface AdaptiveSelectionStats {
  avg_queue_size: long
  avg_response_time: long
  avg_response_time_ns: long
  avg_service_time: string
  avg_service_time_ns: long
  outgoing_searches: long
  rank: string
}

export interface BreakerStats {
  estimated_size: string
  estimated_size_in_bytes: long
  limit_size: string
  limit_size_in_bytes: long
  overhead: float
  tripped: float
}

export interface CPUStats {
  percent: integer
  sys: string
  sys_in_millis: long
  total: string
  total_in_millis: long
  user: string
  user_in_millis: long
}

export interface DataPathStats {
  available: string
  available_in_bytes: long
  disk_queue: string
  disk_reads: long
  disk_read_size: string
  disk_read_size_in_bytes: long
  disk_writes: long
  disk_write_size: string
  disk_write_size_in_bytes: long
  free: string
  free_in_bytes: long
  mount: string
  path: string
  total: string
  total_in_bytes: long
  type: string
}

export interface ExtendedMemoryStats extends MemoryStats {
  free_percent: integer
  used_percent: integer
}

export interface FileSystemStats {
  data: Array<DataPathStats>
  timestamp: long
  total: TotalFileSystemStats
}

export interface GarbageCollectionGenerationStats {
  collection_count: long
  collection_time: string
  collection_time_in_millis: long
}

export interface GarbageCollectionStats {
  collectors: Record<string, GarbageCollectionGenerationStats>
}

export interface HttpStats {
  current_open: integer
  total_opened: long
}

export interface JvmClassesStats {
  current_loaded_count: long
  total_loaded_count: long
  total_unloaded_count: long
}

export interface MemoryStats {
  resident: string
  resident_in_bytes: long
  share: string
  share_in_bytes: long
  total_virtual: string
  total_virtual_in_bytes: long
}

export interface NodeBufferPool {
  count: long
  total_capacity: string
  total_capacity_in_bytes: long
  used: string
  used_in_bytes: long
}

export interface NodeJvmStats {
  buffer_pools: Record<string, NodeBufferPool>
  classes: JvmClassesStats
  gc: GarbageCollectionStats
  mem: MemoryStats
  threads: ThreadStats
  timestamp: long
  uptime: string
  uptime_in_millis: long
}

export interface NodesStatsRequest extends RequestBase {
  node_id?: NodeIds
  metric?: Metrics
  index_metric?: Metrics
  completion_fields?: Array<Field>
  fielddata_fields?: Array<Field>
  fields?: Array<Field>
  groups?: boolean
  include_segment_file_sizes?: boolean
  level?: Level
  timeout?: Time
  types?: Array<string>
}

export interface NodesStatsResponse extends NodesResponseBase {
  cluster_name: string
  nodes: Record<string, NodeStats>
}

export interface NodeStats {
  adaptive_selection: Record<string, AdaptiveSelectionStats>
  breakers: Record<string, BreakerStats>
  fs: FileSystemStats
  host: string
  http: HttpStats
  indices: IndexStats
  ingest: NodeIngestStats
  ip: Array<string>
  jvm: NodeJvmStats
  name: string
  os: OperatingSystemStats
  process: ProcessStats
  roles: Array<NodeRole>
  script: ScriptStats
  thread_pool: Record<string, ThreadCountStats>
  timestamp: long
  transport: TransportStats
  transport_address: string
}

export interface OperatingSystemStats {
  cpu: CPUStats
  mem: ExtendedMemoryStats
  swap: MemoryStats
  timestamp: long
}

export interface ProcessStats {
  cpu: CPUStats
  mem: MemoryStats
  open_file_descriptors: integer
  timestamp: long
}

export interface ScriptStats {
  cache_evictions: long
  compilations: long
}

export interface ThreadCountStats {
  active: long
  completed: long
  largest: long
  queue: long
  rejected: long
  threads: long
}

export interface ThreadStats {
  count: long
  peak_count: long
}

export interface TotalFileSystemStats {
  available: string
  available_in_bytes: long
  free: string
  free_in_bytes: long
  total: string
  total_in_bytes: long
}

export interface TransportStats {
  rx_count: long
  rx_size: string
  rx_size_in_bytes: long
  server_open: integer
  tx_count: long
  tx_size: string
  tx_size_in_bytes: long
}

export interface IngestStats {
  count: long
  current: long
  failed: long
  processors: Array<KeyedProcessorStats>
  time_in_millis: long
}

export interface KeyedProcessorStats {
  statistics: ProcessStats
  type: string
}

export interface NodeIngestStats {
  pipelines: Record<string, IngestStats>
  total: IngestStats
}

export interface NodesUsageRequest extends RequestBase {
  node_id?: NodeIds
  metric?: Metrics
  timeout?: Time
}

export interface NodesUsageResponse extends NodesResponseBase {
  cluster_name: string
  nodes: Record<string, NodeUsageInformation>
}

export interface NodeUsageInformation {
  rest_actions: Record<string, integer>
  since: Date
  timestamp: Date
  aggregations: any
}

export interface PingRequest extends RequestBase {
}

export interface PingResponse extends ResponseBase {
}

export interface ReloadSecureSettingsRequest extends RequestBase {
  node_id?: NodeIds
  timeout?: Time
}

export interface ReloadSecureSettingsResponse extends NodesResponseBase {
  cluster_name: string
  nodes: Record<string, NodeStats>
}

export interface RemoteInfo {
  connected: boolean
  initial_connect_timeout: Time
  max_connections_per_cluster: integer
  num_nodes_connected: long
  seeds: Array<string>
  skip_unavailable: boolean
}

export interface RemoteInfoRequest extends RequestBase {
}

export interface RemoteInfoResponse extends DictionaryResponseBase<string, RemoteInfo> {
}

export interface RootNodeInfoRequest extends RequestBase {
}

export interface RootNodeInfoResponse extends ResponseBase {
  cluster_name: string
  cluster_uuid: string
  name: string
  tagline: string
  version: ElasticsearchVersionInfo
}

export interface CancelTasksRequest extends RequestBase {
  task_id?: TaskId
  actions?: Array<string>
  nodes?: Array<string>
  parent_task_id?: string
}

export interface CancelTasksResponse extends ResponseBase {
  node_failures: Array<ErrorCause>
  nodes: Record<string, TaskExecutingNode>
}

export interface GetTaskRequest extends RequestBase {
  task_id: Id
  timeout?: Time
  wait_for_completion?: boolean
}

export interface GetTaskResponse extends ResponseBase {
  completed: boolean
  task: TaskInfo
}

export interface TaskInfo {
  action: string
  cancellable: boolean
  children: Array<TaskInfo>
  description: string
  headers: Record<string, string>
  id: long
  node: string
  running_time_in_nanos: long
  start_time_in_millis: long
  status: TaskStatus
  type: string
}

export interface ListTasksRequest extends RequestBase {
  actions?: Array<string>
  detailed?: boolean
  group_by?: GroupBy
  nodes?: Array<string>
  parent_task_id?: string
  timeout?: Time
  wait_for_completion?: boolean
}

export interface ListTasksResponse extends ResponseBase {
  node_failures: Array<ErrorCause>
  nodes: Record<string, TaskExecutingNode>
}

export interface TaskExecutingNode {
  attributes: Record<string, string>
  host: string
  ip: string
  name: string
  roles: Array<string>
  tasks: Record<TaskId, TaskState>
  transport_address: string
}

export interface TaskRetries {
  bulk: integer
  search: integer
}

export interface TaskState {
  action: string
  cancellable: boolean
  description: string
  headers: Record<string, string>
  id: long
  node: string
  parent_task_id: TaskId
  running_time_in_nanos: long
  start_time_in_millis: long
  status: TaskStatus
  type: string
}

export interface TaskStatus {
  batches: long
  created: long
  deleted: long
  noops: long
  requests_per_second: float
  retries: TaskRetries
  throttled_millis: long
  throttled_until_millis: long
  total: long
  updated: long
  version_conflicts: long
}

export type Bytes = 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb'

export type Conflicts = 'abort' | 'proceed'

export type DefaultOperator = 'AND' | 'OR'

export type ExpandWildcards = 'open' | 'closed' | 'hidden' | 'none' | 'all'

export type GroupBy = 'nodes' | 'parents' | 'none'

export type Health = 'green' | 'yellow' | 'red'

export type Level = 'cluster' | 'indices' | 'shards'

export type OpType = 'index' | 'create'

export type Refresh = boolean | RefreshOptions
export type RefreshOptions = 'wait_for'

export type SearchType = 'query_then_fetch' | 'dfs_query_then_fetch'

export interface ShardFailure {
  index: string
  node: string
  reason: ErrorCause
  shard: integer
  status?: string
}

export type Size = 'Raw' | 'k' | 'm' | 'g' | 't' | 'p'

export type SuggestMode = 'missing' | 'popular' | 'always'

export type ThreadType = 'cpu' | 'wait' | 'block'

export type VersionType = 'internal' | 'external' | 'external_gte' | 'force'

export type WaitForEvents = 'immediate' | 'urgent' | 'high' | 'normal' | 'low' | 'languid'

export type WaitForStatus = 'green' | 'yellow' | 'red'

export interface LazyDocument {
}

export interface RequestBase {
  error_trace?: boolean
  filter_path?: string | Array<string>
  human?: boolean
  pretty?: boolean
  source_query_string?: string
}

export interface AcknowledgedResponseBase extends ResponseBase {
  acknowledged: boolean
}

export interface DictionaryResponseBase<TKey = unknown, TValue = unknown> extends ResponseBase {
  [key: string]: TValue
}

export interface ElasticsearchVersionInfo {
  build_date: Date
  build_flavor: string
  build_hash: string
  build_snapshot: boolean
  build_type: string
  lucene_version: string
  minimum_index_compatibility_version: string
  minimum_wire_compatibility_version: string
  number: string
}

export interface ErrorResponse {
  error: MainError
  status: integer
}

export interface IndicesResponseBase extends AcknowledgedResponseBase {
  _shards: ShardStatistics
}

export interface ResponseBase {
}

export interface ShardsOperationResponseBase extends ResponseBase {
  _shards: ShardStatistics
}

export type DateMath = string

export interface DateMathTime {
  factor: integer
  interval: DateMathTimeUnit
}

export type DateMathTimeUnit = 'Second' | 'Minute' | 'Hour' | 'Day' | 'Week' | 'Month' | 'Year'

export interface Distance {
  precision: double
  unit: DistanceUnit
}

export type DistanceUnit = 'in' | 'ft' | 'yd' | 'mi' | 'nmi' | 'km' | 'm' | 'cm' | 'mm'

export type GeoDistanceType = 'arc' | 'plane'

export type GeoShapeRelation = 'intersects' | 'disjoint' | 'within' | 'contains'

export interface ClusterStatistics {
  skipped: integer
  successful: integer
  total: integer
}

export interface ShardStatistics {
  failed: integer
  successful: integer
  total: integer
  failures?: Array<ShardFailure>
  skipped?: integer
}

export type MinimumShouldMatch = integer | string
export interface AggregationRange {
  from?: double
  key?: string
  to?: double
}

export interface IndexedScript extends ScriptBase {
  id: string
}

export interface InlineScript extends ScriptBase {
  source: string
}

export type Script = InlineScript | IndexedScript | string
export interface ScriptBase {
  lang: string
  params?: Record<string, any>
}

export interface ScriptField {
  script: Script
}

export type ShapeRelation = 'intersects' | 'disjoint' | 'within'

export interface CompletionStats {
  size_in_bytes: long
}

export interface DocStats {
  count: long
  deleted: long
}

export interface FielddataStats {
  evictions: long
  memory_size_in_bytes: long
}

export interface FlushStats {
  periodic: long
  total: long
  total_time: string
  total_time_in_millis: long
}

export interface GetStats {
  current: long
  exists_time: string
  exists_time_in_millis: long
  exists_total: long
  missing_time: string
  missing_time_in_millis: long
  missing_total: long
  time: string
  time_in_millis: long
  total: long
}

export interface IndexingStats {
  index_current: long
  delete_current: long
  delete_time: string
  delete_time_in_millis: long
  delete_total: long
  is_throttled: boolean
  noop_update_total: long
  throttle_time: string
  throttle_time_in_millis: long
  index_time: string
  index_time_in_millis: long
  index_total: long
  types: Record<string, IndexingStats>
}

export interface MergesStats {
  current: long
  current_docs: long
  current_size: string
  current_size_in_bytes: long
  total: long
  total_auto_throttle: string
  total_auto_throttle_in_bytes: long
  total_docs: long
  total_size: string
  total_size_in_bytes: long
  total_stopped_time: string
  total__stopped_time_in_millis: long
  total_throttled_time: string
  total_throttled_time_in_millis: long
  total_time: string
  total_time_in_millis: long
}

export interface PluginStats {
  classname: string
  description: string
  elasticsearch_version: string
  extended_plugins: Array<string>
  has_native_controller: boolean
  java_version: string
  name: string
  version: string
}

export interface QueryCacheStats {
  cache_count: long
  cache_size: long
  evictions: long
  hit_count: long
  memory_size_in_bytes: long
  miss_count: long
  total_count: long
}

export interface RecoveryStats {
  current_as_source: long
  current_as_target: long
  throttle_time: string
  throttle_time_in_millis: long
}

export interface RefreshStats {
  external_total: long
  external_total_time_in_millis: long
  total: long
  total_time: string
  total_time_in_millis: long
}

export interface RequestCacheStats {
  evictions: long
  hit_count: long
  memory_size: string
  memory_size_in_bytes: long
  miss_count: long
}

export interface SearchStats {
  fetch_current: long
  fetch_time_in_millis: long
  fetch_total: long
  open_contexts: long
  query_current: long
  query_time_in_millis: long
  query_total: long
  scroll_current: long
  scroll_time_in_millis: long
  scroll_total: long
  suggest_current: long
  suggest_time_in_millis: long
  suggest_total: long
}

export interface SegmentsStats {
  count: long
  doc_values_memory_in_bytes: long
  file_sizes: Record<string, ShardFileSizeInfo>
  fixed_bit_set_memory_in_bytes: long
  index_writer_max_memory_in_bytes: long
  index_writer_memory_in_bytes: long
  max_unsafe_auto_id_timestamp: long
  memory_in_bytes: long
  norms_memory_in_bytes: long
  points_memory_in_bytes: long
  stored_fields_memory_in_bytes: long
  terms_memory_in_bytes: long
  term_vectors_memory_in_bytes: long
  version_map_memory_in_bytes: long
}

export interface StoreStats {
  size: string
  size_in_bytes: double
}

export interface TranslogStats {
  earliest_last_modified_age: long
  operations: long
  size: string
  size_in_bytes: long
  uncommitted_operations: integer
  uncommitted_size: string
  uncommitted_size_in_bytes: long
}

export interface WarmerStats {
  current: long
  total: long
  total_time: string
  total_time_in_millis: long
}

export type Time = string | integer
export type Result = 'Error' | 'created' | 'updated' | 'deleted' | 'not_found' | 'noop'

export interface BulkIndexByScrollFailure {
  cause: MainError
  id: string
  index: string
  status: integer
  type: string
}

export interface Retries {
  bulk: long
  search: long
}

export interface BulkRequest<TSource = unknown> extends RequestBase {
  index?: IndexName
  type?: TypeName
  pipeline?: string
  refresh?: Refresh
  routing?: Routing
  _source?: boolean
  _source_excludes?: Field | Array<Field>
  _source_includes?: Field | Array<Field>
  timeout?: Time
  type_query_string?: string
  wait_for_active_shards?: string
  require_alias?: boolean
  body: Array<BulkOperationContainer | TSource>
}

export interface BulkResponse extends ResponseBase {
  errors: boolean
  items: Array<BulkResponseItemContainer>
  took: long
  ingest_took?: long
}

export interface BulkCreateOperation extends BulkOperation {
}

export interface BulkDeleteOperation extends BulkOperation {
}

export interface BulkIndexOperation extends BulkOperation {
}

export interface BulkOperation {
  _id: Id
  _index: IndexName
  retry_on_conflict: integer
  routing: Routing
  version: long
  version_type: VersionType
}

export interface BulkOperationContainer {
  index?: BulkIndexOperation
  create?: BulkCreateOperation
  update?: BulkUpdateOperation
  delete?: BulkDeleteOperation
}

export interface BulkUpdateOperation extends BulkOperation {
}

export interface BulkCreateResponseItem extends BulkResponseItemBase {
}

export interface BulkDeleteResponseItem extends BulkResponseItemBase {
}

export interface BulkIndexResponseItem extends BulkResponseItemBase {
}

export interface BulkResponseItemBase {
  _id?: string | null
  _index: string
  status: integer
  error?: ErrorCause
  _primary_term?: long
  result?: string
  _seq_no?: long
  _shards?: ShardStatistics
  _type?: string
  _version?: long
  forced_refresh?: boolean
  get?: InlineGet<LazyDocument>
}

export interface BulkResponseItemContainer {
  index?: BulkIndexResponseItem
  create?: BulkCreateResponseItem
  update?: BulkUpdateResponseItem
  delete?: BulkDeleteResponseItem
}

export interface BulkUpdateResponseItem extends BulkResponseItemBase {
}

export interface DeleteByQueryRequest extends RequestBase {
  index: Indices
  type?: TypeNames
  allow_no_indices?: boolean
  analyzer?: string
  analyze_wildcard?: boolean
  conflicts?: Conflicts
  default_operator?: DefaultOperator
  df?: string
  expand_wildcards?: ExpandWildcards
  from?: long
  ignore_unavailable?: boolean
  lenient?: boolean
  preference?: string
  query_on_query_string?: string
  refresh?: boolean
  request_cache?: boolean
  requests_per_second?: long
  routing?: Routing
  scroll?: Time
  scroll_size?: long
  search_timeout?: Time
  search_type?: SearchType
  size?: long
  slices?: long
  sort?: Array<string>
  source_enabled?: boolean
  source_excludes?: Array<Field>
  source_includes?: Array<Field>
  stats?: Array<string>
  terminate_after?: long
  timeout?: Time
  version?: boolean
  wait_for_active_shards?: string
  wait_for_completion?: boolean
  body: {
    max_docs?: long
    query?: QueryContainer
    slice?: SlicedScroll
  }
}

export interface DeleteByQueryResponse extends ResponseBase {
  batches: long
  deleted: long
  failures: Array<BulkIndexByScrollFailure>
  noops: long
  requests_per_second: float
  retries: Retries
  slice_id: integer
  task: TaskId
  throttled_millis: long
  throttled_until_millis: long
  timed_out: boolean
  took: long
  total: long
  version_conflicts: long
}

export interface DeleteByQueryRethrottleRequest extends RequestBase {
  task_id: Id
  requests_per_second?: long
}

export interface DeleteByQueryRethrottleResponse extends ListTasksResponse {
}

export interface MultiGetOperation {
  can_be_flattened?: boolean
  _id: Id
  _index: IndexName
  routing?: string
  _source?: boolean | SourceFilter
  stored_fields?: Array<Field>
  version?: long
  version_type?: VersionType
}

export interface MultiGetRequest extends RequestBase {
  index?: IndexName
  type?: TypeName
  preference?: string
  realtime?: boolean
  refresh?: boolean
  routing?: Routing
  source_enabled?: boolean
  source_excludes?: Array<Field>
  source_includes?: Array<Field>
  stored_fields?: Array<Field>
  body: {
    docs?: Array<MultiGetOperation>
  }
}

export interface MultiGetHit<TDocument = unknown> {
  found: boolean
  _id: string
  _index: string
  _primary_term: long
  _routing: string
  _seq_no: long
  _source: TDocument
  _type: string
  _version: long
}

export interface MultiGetResponse<TDocument = unknown> extends ResponseBase {
  docs: Array<MultiGetHit<TDocument>>
}

export interface MultiTermVectorOperation {
  doc: object
  fields: Array<Field>
  field_statistics: boolean
  filter: TermVectorFilter
  _id: Id
  _index: IndexName
  offsets: boolean
  payloads: boolean
  positions: boolean
  routing: Routing
  term_statistics: boolean
  version: long
  version_type: VersionType
}

export interface MultiTermVectorsRequest extends RequestBase {
  index?: IndexName
  type?: TypeName
  fields?: Array<Field>
  field_statistics?: boolean
  offsets?: boolean
  payloads?: boolean
  positions?: boolean
  preference?: string
  realtime?: boolean
  routing?: Routing
  term_statistics?: boolean
  version?: long
  version_type?: VersionType
  body?: {
    docs?: Array<MultiTermVectorOperation>
    ids?: Array<Id>
  }
}

export interface MultiTermVectorsResponse extends ResponseBase {
  docs: Array<TermVectorsResult>
}

export interface ReindexDestination {
  index: IndexName
  op_type?: OpType
  pipeline?: string
  routing?: ReindexRouting
  version_type?: VersionType
}

export interface ReindexRequest extends RequestBase {
  refresh?: boolean
  requests_per_second?: long
  scroll?: Time
  slices?: long
  timeout?: Time
  wait_for_active_shards?: string
  wait_for_completion?: boolean
  require_alias?: boolean
  body: {
    conflicts?: Conflicts
    dest?: ReindexDestination
    max_docs?: long
    script?: Script
    size?: long
    source?: ReindexSource
  }
}

export interface ReindexResponse extends ResponseBase {
  batches: long
  created: long
  failures: Array<BulkIndexByScrollFailure>
  noops: long
  retries: Retries
  slice_id: integer
  task: TaskId
  timed_out: boolean
  took: Time
  total: long
  updated: long
  version_conflicts: long
}

export interface ReindexRouting {
}

export interface ReindexSource {
  index: Indices
  query?: QueryContainer
  remote?: RemoteSource
  size: integer
  slice?: SlicedScroll
  sort?: Array<Sort>
  _source?: Array<Field>
}

export interface RemoteSource {
  connect_timeout: Time
  host: Uri
  password: string
  socket_timeout: Time
  username: string
}

export interface ReindexNode {
  attributes: Record<string, string>
  host: string
  ip: string
  name: string
  roles: Array<string>
  tasks: Record<TaskId, ReindexTask>
  transport_address: string
}

export interface ReindexRethrottleRequest extends RequestBase {
  task_id: Id
  requests_per_second?: long
}

export interface ReindexRethrottleResponse extends ResponseBase {
  nodes: Record<string, ReindexNode>
}

export interface ReindexStatus {
  batches: long
  created: long
  deleted: long
  noops: long
  requests_per_second: float
  retries: Retries
  throttled_millis: long
  throttled_until_millis: long
  total: long
  updated: long
  version_conflicts: long
}

export interface ReindexTask {
  action: string
  cancellable: boolean
  description: string
  id: long
  node: string
  running_time_in_nanos: long
  start_time_in_millis: long
  status: ReindexStatus
  type: string
}

export interface UpdateByQueryRequest extends RequestBase {
  index: Indices
  type?: TypeNames
  allow_no_indices?: boolean
  analyzer?: string
  analyze_wildcard?: boolean
  conflicts?: Conflicts
  default_operator?: DefaultOperator
  df?: string
  expand_wildcards?: ExpandWildcards
  from?: long
  ignore_unavailable?: boolean
  lenient?: boolean
  pipeline?: string
  preference?: string
  query_on_query_string?: string
  refresh?: boolean
  request_cache?: boolean
  requests_per_second?: long
  routing?: Routing
  scroll?: Time
  scroll_size?: long
  search_timeout?: Time
  search_type?: SearchType
  size?: long
  slices?: long
  sort?: Array<string>
  source_enabled?: boolean
  source_excludes?: Array<Field>
  source_includes?: Array<Field>
  stats?: Array<string>
  terminate_after?: long
  timeout?: Time
  version?: boolean
  version_type?: boolean
  wait_for_active_shards?: string
  wait_for_completion?: boolean
  body?: {
    max_docs?: long
    query?: QueryContainer
    script?: Script
    slice?: SlicedScroll
  }
}

export interface UpdateByQueryResponse extends ResponseBase {
  batches: long
  failures: Array<BulkIndexByScrollFailure>
  noops: long
  requests_per_second: float
  retries: Retries
  task: TaskId
  timed_out: boolean
  took: long
  total: long
  updated: long
  version_conflicts: long
}

export interface WriteResponseBase extends ResponseBase {
  _id: string
  _index: string
  _primary_term: long
  result: Result
  _seq_no: long
  _shards: ShardStatistics
  _type?: string
  _version: long
  forced_refresh?: boolean
}

export interface CreateRequest<TDocument = unknown> extends RequestBase {
  id: Id
  index: IndexName
  type?: TypeName
  pipeline?: string
  refresh?: Refresh
  routing?: Routing
  timeout?: Time
  version?: long
  version_type?: VersionType
  wait_for_active_shards?: string
  body: TDocument
}

export interface CreateResponse extends WriteResponseBase {
}

export interface DeleteRequest extends RequestBase {
  id: Id
  index: IndexName
  type?: TypeName
  if_primary_term?: long
  if_seq_no?: long
  refresh?: Refresh
  routing?: Routing
  timeout?: Time
  version?: long
  version_type?: VersionType
  wait_for_active_shards?: string
}

export interface DeleteResponse extends WriteResponseBase {
}

export interface DocumentExistsRequest extends RequestBase {
  id: Id
  index: IndexName
  type?: TypeName
  preference?: string
  realtime?: boolean
  refresh?: boolean
  routing?: Routing
  source_enabled?: boolean
  source_excludes?: Array<Field>
  source_includes?: Array<Field>
  stored_fields?: Array<Field>
  version?: long
  version_type?: VersionType
}

export interface GetRequest extends RequestBase {
  id: Id
  index: IndexName
  type?: TypeName
  preference?: string
  realtime?: boolean
  refresh?: boolean
  routing?: Routing
  source_enabled?: boolean
  _source_excludes?: Array<Field>
  _source_includes?: Array<Field>
  stored_fields?: Array<Field>
  version?: long
  version_type?: VersionType
  _source?: boolean | string | Array<string>
}

export interface GetResponse<TDocument = unknown> extends ResponseBase {
  _index: string
  fields?: Record<string, LazyDocument>
  found: boolean
  _id: string
  _primary_term: long
  _routing: string
  _seq_no: long
  _source: TDocument
  _type: string
  _version: long
}

export interface IndexRequest<TDocument = unknown> extends RequestBase {
  id?: Id
  index: IndexName
  type?: TypeName
  if_primary_term?: long
  if_seq_no?: long
  op_type?: OpType
  pipeline?: string
  refresh?: Refresh
  routing?: Routing
  timeout?: Time
  version?: long
  version_type?: VersionType
  wait_for_active_shards?: string
  require_alias?: boolean
  body: TDocument
}

export interface IndexResponse extends WriteResponseBase {
}

export interface SourceRequest extends RequestBase {
  id: Id
  index: IndexName
  type?: TypeName
  preference?: string
  realtime?: boolean
  refresh?: boolean
  routing?: Routing
  source_enabled?: boolean
  source_excludes?: Array<Field>
  source_includes?: Array<Field>
  version?: long
  version_type?: VersionType
}

export interface SourceResponse<TDocument = unknown> extends ResponseBase {
  body: TDocument
}

export interface SourceExistsRequest extends RequestBase {
  id: Id
  index: IndexName
  type?: TypeName
  preference?: string
  realtime?: boolean
  refresh?: boolean
  routing?: Routing
  source_enabled?: boolean
  source_excludes?: Array<Field>
  source_includes?: Array<Field>
  version?: long
  version_type?: VersionType
}

export interface FieldStatistics {
  doc_count: integer
  sum_doc_freq: long
  sum_ttf: long
}

export interface TermVector {
  field_statistics: FieldStatistics
  terms: Record<string, TermVectorTerm>
}

export interface TermVectorFilter {
  max_doc_freq: integer
  max_num_terms: integer
  max_term_freq: integer
  max_word_length: integer
  min_doc_freq: integer
  min_term_freq: integer
  min_word_length: integer
}

export interface TermVectorsRequest<TDocument = unknown> extends RequestBase {
  index: IndexName
  id?: Id
  type?: TypeName
  fields?: Array<Field>
  field_statistics?: boolean
  offsets?: boolean
  payloads?: boolean
  positions?: boolean
  preference?: string
  realtime?: boolean
  routing?: Routing
  term_statistics?: boolean
  version?: long
  version_type?: VersionType
  body?: {
    doc?: TDocument
    filter?: TermVectorFilter
    per_field_analyzer?: Record<Field, string>
  }
}

export interface TermVectorsResponse extends ResponseBase {
  found: boolean
  _id: string
  _index: string
  term_vectors: Record<Field, TermVector>
  took: long
  _type: string
  _version: long
}

export interface TermVectorsResult {
  found: boolean
  id: string
  index: string
  term_vectors: Record<Field, TermVector>
  took: long
  version: long
}

export interface TermVectorTerm {
  doc_freq: integer
  score: double
  term_freq: integer
  tokens: Array<Token>
  ttf: integer
}

export interface Token {
  end_offset: integer
  payload: string
  position: integer
  start_offset: integer
}

export interface UpdateRequest<TDocument = unknown, TPartialDocument = unknown> extends RequestBase {
  id: Id
  index: IndexName
  type?: TypeName
  if_primary_term?: long
  if_seq_no?: long
  lang?: string
  refresh?: Refresh
  require_alias?: boolean
  retry_on_conflict?: long
  routing?: Routing
  source_enabled?: boolean
  timeout?: Time
  wait_for_active_shards?: string
  _source?: boolean | string | Array<string>
  _source_excludes?: Array<Field>
  _source_includes?: Array<Field>
  body: {
    detect_noop?: boolean
    doc?: TPartialDocument
    doc_as_upsert?: boolean
    script?: Script
    scripted_upsert?: boolean
    _source?: boolean | SourceFilter
    upsert?: TDocument
  }
}

export interface UpdateResponse<TDocument = unknown> extends WriteResponseBase {
  get?: InlineGet<TDocument>
}

export interface IndexState {
  aliases: Record<IndexName, Alias>
  mappings: TypeMapping
  settings: Record<string, any>
}

export interface Alias {
  filter?: QueryContainer
  index_routing?: Routing
  is_hidden?: boolean
  is_write_index?: boolean
  routing?: Routing
  search_routing?: Routing
}

export interface AliasDefinition {
  filter?: QueryContainer
  index_routing?: string
  is_write_index?: boolean
  routing?: string
  search_routing?: string
}

export interface BulkAliasRequest extends RequestBase {
  master_timeout?: Time
  timeout?: Time
  body: {
    actions?: Array<AliasAction>
  }
}

export interface BulkAliasResponse extends AcknowledgedResponseBase {
}

export interface AliasExistsRequest extends RequestBase {
  name: Names
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  local?: boolean
}

export interface AliasAction {
}

export interface DeleteAliasRequest extends RequestBase {
  index: Indices
  name: Names
  master_timeout?: Time
  timeout?: Time
}

export interface DeleteAliasResponse extends ResponseBase {
}

export interface GetAliasRequest extends RequestBase {
  name?: Names
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  local?: boolean
}

export interface GetAliasResponse extends DictionaryResponseBase<IndexName, IndexAliases> {
}

export interface IndexAliases {
  aliases: Record<string, AliasDefinition>
}

export interface PutAliasRequest extends RequestBase {
  index: Indices
  name: Name
  master_timeout?: Time
  timeout?: Time
  body?: {
    filter?: QueryContainer
    index_routing?: Routing
    is_write_index?: boolean
    routing?: Routing
    search_routing?: Routing
  }
}

export interface PutAliasResponse extends ResponseBase {
}

export interface AnalyzeDetail {
  charfilters: Array<CharFilterDetail>
  custom_analyzer: boolean
  tokenfilters: Array<TokenDetail>
  tokenizer: TokenDetail
}

export interface AnalyzeRequest extends RequestBase {
  index?: IndexName
  body?: {
    analyzer?: string
    attributes?: Array<string>
    char_filter?: Array<string | ICharFilter>
    explain?: boolean
    field?: Field
    filter?: Array<string | ITokenFilter>
    normalizer?: string
    text?: Array<string>
    tokenizer?: string | ITokenizer
  }
}

export interface AnalyzeResponse extends ResponseBase {
  detail: AnalyzeDetail
  tokens: Array<AnalyzeToken>
}

export interface AnalyzeToken {
  end_offset: long
  position: long
  position_length: long
  start_offset: long
  token: string
  type: string
}

export interface CharFilterDetail {
  filtered_text: Array<string>
  name: string
}

export interface ExplainAnalyzeToken {
  bytes: string
  end_offset: long
  keyword: boolean
  position: long
  positionLength: long
  start_offset: long
  termFrequency: long
  token: string
  type: string
}

export interface TokenDetail {
  name: string
  tokens: Array<ExplainAnalyzeToken>
}

export interface CloneIndexRequest extends RequestBase {
  index: IndexName
  target: Name
  master_timeout?: Time
  timeout?: Time
  wait_for_active_shards?: string
  body?: {
    aliases?: Record<IndexName, Alias>
    settings?: Record<string, any>
  }
}

export interface CloneIndexResponse extends AcknowledgedResponseBase {
  index: string
  shards_acknowledged: boolean
}

export interface CreateIndexRequest extends RequestBase {
  index: IndexName
  include_type_name?: boolean
  master_timeout?: Time
  timeout?: Time
  wait_for_active_shards?: string
  body?: {
    aliases?: Record<IndexName, Alias>
    mappings?: TypeMapping
    settings?: Record<string, any>
  }
}

export interface CreateIndexResponse extends AcknowledgedResponseBase {
  index: string
  shards_acknowledged: boolean
}

export interface DeleteIndexRequest extends RequestBase {
  index: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  master_timeout?: Time
  timeout?: Time
}

export interface DeleteIndexResponse extends IndicesResponseBase {
}

export interface FreezeIndexRequest extends RequestBase {
  index: IndexName
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  master_timeout?: Time
  timeout?: Time
  wait_for_active_shards?: string
}

export interface FreezeIndexResponse extends AcknowledgedResponseBase {
  shards_acknowledged: boolean
}

export interface GetIndexRequest extends RequestBase {
  index: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  flat_settings?: boolean
  ignore_unavailable?: boolean
  include_defaults?: boolean
  include_type_name?: boolean
  local?: boolean
  master_timeout?: Time
}

export interface GetIndexResponse extends DictionaryResponseBase<IndexName, IndexState> {
}

export interface ExistsResponse extends ResponseBase {
  exists: boolean
}

export interface IndexExistsRequest extends RequestBase {
  index: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  flat_settings?: boolean
  ignore_unavailable?: boolean
  include_defaults?: boolean
  local?: boolean
}

export interface CloseIndexRequest extends RequestBase {
  index: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  master_timeout?: Time
  timeout?: Time
  wait_for_active_shards?: string
}

export interface CloseIndexResponse extends AcknowledgedResponseBase {
  indices: Record<string, CloseIndexResult>
  shards_acknowledged: boolean
}

export interface CloseIndexResult {
  closed: boolean
  shards: Record<string, CloseShardResult>
}

export interface CloseShardResult {
  failures: Array<ShardFailure>
}

export interface OpenIndexRequest extends RequestBase {
  index: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  master_timeout?: Time
  timeout?: Time
  wait_for_active_shards?: string
}

export interface OpenIndexResponse extends AcknowledgedResponseBase {
}

export interface RolloverConditions {
  max_age: Time
  max_docs: long
  max_size: string
}

export interface RolloverIndexRequest extends RequestBase {
  alias: Alias
  new_index?: IndexName
  dry_run?: boolean
  include_type_name?: boolean
  master_timeout?: Time
  timeout?: Time
  wait_for_active_shards?: string
  body?: {
    aliases?: Record<IndexName, Alias>
    conditions?: RolloverConditions
    mappings?: TypeMapping
    settings?: Record<string, any>
  }
}

export interface RolloverIndexResponse extends AcknowledgedResponseBase {
  conditions: Record<string, boolean>
  dry_run: boolean
  new_index: string
  old_index: string
  rolled_over: boolean
  shards_acknowledged: boolean
}

export interface ShrinkIndexRequest extends RequestBase {
  index: IndexName
  target: IndexName
  master_timeout?: Time
  timeout?: Time
  wait_for_active_shards?: string
  body?: {
    aliases?: Record<IndexName, Alias>
    settings?: Record<string, any>
  }
}

export interface ShrinkIndexResponse extends AcknowledgedResponseBase {
  shards_acknowledged: boolean
}

export interface SplitIndexRequest extends RequestBase {
  index: IndexName
  target: IndexName
  master_timeout?: Time
  timeout?: Time
  wait_for_active_shards?: string
  body?: {
    aliases?: Record<IndexName, Alias>
    settings?: Record<string, any>
  }
}

export interface SplitIndexResponse extends AcknowledgedResponseBase {
  shards_acknowledged: boolean
}

export interface TypeExistsRequest extends RequestBase {
  index: Indices
  type: TypeNames
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  local?: boolean
}

export interface UnfreezeIndexRequest extends RequestBase {
  index: IndexName
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  master_timeout?: Time
  timeout?: Time
  wait_for_active_shards?: string
}

export interface UnfreezeIndexResponse extends AcknowledgedResponseBase {
  shards_acknowledged: boolean
}

export interface GetIndexSettingsRequest extends RequestBase {
  index?: Indices
  name?: Names
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  flat_settings?: boolean
  ignore_unavailable?: boolean
  include_defaults?: boolean
  local?: boolean
  master_timeout?: Time
}

export interface GetIndexSettingsResponse extends DictionaryResponseBase<IndexName, IndexState> {
}

export interface DeleteIndexTemplateRequest extends RequestBase {
  name: Name
  master_timeout?: Time
  timeout?: Time
}

export interface DeleteIndexTemplateResponse extends AcknowledgedResponseBase {
}

export interface GetIndexTemplateRequest extends RequestBase {
  name?: Names
  flat_settings?: boolean
  include_type_name?: boolean
  local?: boolean
  master_timeout?: Time
}

export interface GetIndexTemplateResponse extends DictionaryResponseBase<string, TemplateMapping> {
}

export interface TemplateMapping {
  aliases: Record<IndexName, Alias>
  index_patterns: Array<string>
  mappings: TypeMapping
  order: integer
  settings: Record<string, any>
  version: integer
}

export interface IndexTemplateExistsRequest extends RequestBase {
  name: Names
  flat_settings?: boolean
  local?: boolean
  master_timeout?: Time
}

export interface PutIndexTemplateRequest extends RequestBase {
  name: Name
  create?: boolean
  flat_settings?: boolean
  include_type_name?: boolean
  master_timeout?: Time
  timeout?: Time
  body: {
    aliases?: Record<IndexName, Alias>
    index_patterns?: Array<string>
    mappings?: TypeMapping
    order?: integer
    settings?: Record<string, any>
    version?: integer
  }
}

export interface PutIndexTemplateResponse extends AcknowledgedResponseBase {
}

export interface UpdateIndexSettingsRequest extends RequestBase {
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  flat_settings?: boolean
  ignore_unavailable?: boolean
  master_timeout?: Time
  preserve_existing?: boolean
  timeout?: Time
  body: {
    index?: Record<string, any>
  }
}

export interface UpdateIndexSettingsResponse extends AcknowledgedResponseBase {
}

export interface GetFieldMappingRequest extends RequestBase {
  fields: Fields
  index?: Indices
  type?: TypeNames
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  include_defaults?: boolean
  include_type_name?: boolean
  local?: boolean
}

export interface GetFieldMappingResponse extends DictionaryResponseBase<IndexName, TypeFieldMappings> {
}

export interface TypeFieldMappings {
  mappings: Record<Field, FieldMapping>
}

export interface GetMappingRequest extends RequestBase {
  index?: Indices
  type?: TypeNames
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  include_type_name?: boolean
  local?: boolean
  master_timeout?: Time
}

export interface GetMappingResponse extends DictionaryResponseBase<IndexName, IndexMappings> {
}

export interface IndexMappings {
  item: TypeMapping
  mappings: TypeMapping
}

export interface PutMappingRequest extends RequestBase {
  index?: Indices
  type?: TypeName
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  include_type_name?: boolean
  master_timeout?: Time
  timeout?: Time
  body: {
    all_field?: AllField
    date_detection?: boolean
    dynamic?: boolean | DynamicMapping
    dynamic_date_formats?: Array<string>
    dynamic_templates?: Record<string, DynamicTemplate>
    field_names_field?: FieldNamesField
    index_field?: IndexField
    meta?: Record<string, any>
    numeric_detection?: boolean
    properties?: Record<PropertyName, IProperty>
    routing_field?: RoutingField
    size_field?: SizeField
    source_field?: SourceField
  }
}

export interface PutMappingResponse extends IndicesResponseBase {
}

export interface RecoveryBytes {
  percent: string
  recovered: long
  reused: long
  total: long
}

export interface RecoveryFileDetails {
  length: long
  name: string
  recovered: long
}

export interface RecoveryFiles {
  details: Array<RecoveryFileDetails>
  percent: string
  recovered: long
  reused: long
  total: long
}

export interface RecoveryIndexStatus {
  bytes: RecoveryBytes
  files: RecoveryFiles
  size: RecoveryBytes
  source_throttle_time_in_millis: long
  target_throttle_time_in_millis: long
  total_time_in_millis: long
}

export interface RecoveryOrigin {
  hostname: string
  id: string
  ip: string
  name: string
}

export interface RecoveryStartStatus {
  check_index_time: long
  total_time_in_millis: string
}

export interface RecoveryStatus {
  shards: Array<ShardRecovery>
}

export interface RecoveryStatusRequest extends RequestBase {
  index?: Indices
  active_only?: boolean
  detailed?: boolean
}

export interface RecoveryStatusResponse extends DictionaryResponseBase<IndexName, RecoveryStatus> {
}

export interface RecoveryTranslogStatus {
  percent: string
  recovered: long
  total: long
  total_on_start: long
  total_time: string
  total_time_in_millis: long
}

export interface RecoveryVerifyIndex {
  check_index_time_in_millis: long
  total_time_in_millis: long
}

export interface ShardRecovery {
  id: long
  index: RecoveryIndexStatus
  primary: boolean
  source: RecoveryOrigin
  stage: string
  start: RecoveryStartStatus
  start_time_in_millis: Date
  stop_time_in_millis: Date
  target: RecoveryOrigin
  total_time_in_millis: long
  translog: RecoveryTranslogStatus
  type: string
  verify_index: RecoveryVerifyIndex
}

export interface IndexSegment {
  shards: Record<string, ShardsSegment>
}

export interface Segment {
  attributes: Record<string, string>
  committed: boolean
  compound: boolean
  deleted_docs: long
  generation: integer
  memory_in_bytes: double
  search: boolean
  size_in_bytes: double
  num_docs: long
  version: string
}

export interface SegmentsRequest extends RequestBase {
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  verbose?: boolean
}

export interface SegmentsResponse extends ResponseBase {
  indices: Record<string, IndexSegment>
  _shards: ShardStatistics
}

export interface ShardSegmentRouting {
  node: string
  primary: boolean
  state: string
}

export interface ShardsSegment {
  num_committed_segments: integer
  routing: ShardSegmentRouting
  num_search_segments: integer
  segments: Record<string, Segment>
}

export interface IndicesShardStores {
  shards: Record<string, ShardStoreWrapper>
}

export interface IndicesShardStoresRequest extends RequestBase {
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  status?: Array<string>
}

export interface IndicesShardStoresResponse extends ResponseBase {
  indices: Record<string, IndicesShardStores>
}

export interface ShardStore {
  allocation: ShardStoreAllocation
  allocation_id: string
  attributes: Record<string, any>
  id: string
  legacy_version: long
  name: string
  store_exception: ShardStoreException
  transport_address: string
}

export type ShardStoreAllocation = 'primary' | 'replica' | 'unused'

export interface ShardStoreException {
  reason: string
  type: string
}

export interface ShardStoreWrapper {
  stores: Array<ShardStore>
}

export interface IndexStats {
  completion: CompletionStats
  docs: DocStats
  fielddata: FielddataStats
  flush: FlushStats
  get: GetStats
  indexing: IndexingStats
  merges: MergesStats
  query_cache: QueryCacheStats
  recovery: RecoveryStats
  refresh: RefreshStats
  request_cache: RequestCacheStats
  search: SearchStats
  segments: SegmentsStats
  store: StoreStats
  translog: TranslogStats
  warmer: WarmerStats
}

export interface IndicesStats {
  primaries: IndexStats
  shards: Record<string, Array<ShardStats>>
  total: IndexStats
  uuid: string
}

export interface IndicesStatsRequest extends RequestBase {
  metric?: Metrics
  index?: Indices
  completion_fields?: Array<Field>
  expand_wildcards?: ExpandWildcards
  fielddata_fields?: Array<Field>
  fields?: Array<Field>
  forbid_closed_indices?: boolean
  groups?: Array<string>
  include_segment_file_sizes?: boolean
  include_unloaded_segments?: boolean
  level?: Level
}

export interface IndicesStatsResponse extends ResponseBase {
  indices: Record<string, IndicesStats>
  _shards: ShardStatistics
  _all: IndicesStats
}

export interface ShardCommit {
  generation: integer
  id: string
  num_docs: long
  user_data: Record<string, string>
}

export interface ShardCompletion {
  size_in_bytes: long
}

export interface ShardDocs {
  count: long
  deleted: long
}

export interface ShardFielddata {
  evictions: long
  memory_size_in_bytes: long
}

export interface ShardFileSizeInfo {
  description: string
  size_in_bytes: long
}

export interface ShardFlush {
  total: long
  total_time_in_millis: long
}

export interface ShardGet {
  current: long
  exists_time_in_millis: long
  exists_total: long
  missing_time_in_millis: long
  missing_total: long
  time_in_millis: long
  total: long
}

export interface ShardIndexing {
  delete_current: long
  delete_time_in_millis: long
  delete_total: long
  index_current: long
  index_failed: long
  index_time_in_millis: long
  index_total: long
  is_throttled: boolean
  noop_update_total: long
  throttle_time_in_millis: long
}

export interface ShardMerges {
  current: long
  current_docs: long
  current_size_in_bytes: long
  total: long
  total_auto_throttle_in_bytes: long
  total_docs: long
  total_size_in_bytes: long
  total_stopped_time_in_millis: long
  total_throttled_time_in_millis: long
  total_time_in_millis: long
}

export interface ShardPath {
  data_path: string
  is_custom_data_path: boolean
  state_path: string
}

export interface ShardQueryCache {
  cache_count: long
  cache_size: long
  evictions: long
  hit_count: long
  memory_size_in_bytes: long
  miss_count: long
  total_count: long
}

export interface ShardRefresh {
  listeners: long
  total: long
  total_time_in_millis: long
}

export interface ShardRequestCache {
  evictions: long
  hit_count: long
  memory_size_in_bytes: long
  miss_count: long
}

export interface ShardRouting {
  node: string
  primary: boolean
  relocating_node: string
  state: ShardRoutingState
}

export type ShardRoutingState = 'UNASSIGNED' | 'INITIALIZING' | 'STARTED' | 'RELOCATING'

export interface ShardSearch {
  fetch_current: long
  fetch_time_in_millis: long
  fetch_total: long
  open_contexts: long
  query_current: long
  query_time_in_millis: long
  query_total: long
  scroll_current: long
  scroll_time_in_millis: long
  scroll_total: long
  suggest_current: long
  suggest_time_in_millis: long
  suggest_total: long
}

export interface ShardSegments {
  count: long
  doc_values_memory_in_bytes: long
  file_sizes: Record<string, ShardFileSizeInfo>
  fixed_bit_set_memory_in_bytes: long
  index_writer_memory_in_bytes: long
  max_unsafe_auto_id_timestamp: long
  memory_in_bytes: long
  norms_memory_in_bytes: long
  points_memory_in_bytes: long
  stored_fields_memory_in_bytes: long
  terms_memory_in_bytes: long
  term_vectors_memory_in_bytes: long
  version_map_memory_in_bytes: long
}

export interface ShardSequenceNumber {
  global_checkpoint: long
  local_checkpoint: long
  max_seq_no: long
}

export interface ShardStats {
  commit: ShardCommit
  completion: ShardCompletion
  docs: ShardDocs
  fielddata: ShardFielddata
  flush: ShardFlush
  get: ShardGet
  indexing: ShardIndexing
  merges: ShardMerges
  shard_path: ShardPath
  query_cache: ShardQueryCache
  recovery: ShardStatsRecovery
  refresh: ShardRefresh
  request_cache: ShardRequestCache
  routing: ShardRouting
  search: ShardSearch
  segments: ShardSegments
  seq_no: ShardSequenceNumber
  store: ShardStatsStore
  translog: ShardTransactionLog
  warmer: ShardWarmer
}

export interface ShardStatsRecovery {
  current_as_source: long
  current_as_target: long
  throttle_time_in_millis: long
}

export interface ShardStatsStore {
  size_in_bytes: long
}

export interface ShardTransactionLog {
  operations: long
  size_in_bytes: long
  uncommitted_operations: long
  uncommitted_size_in_bytes: long
}

export interface ShardWarmer {
  current: long
  total: long
  total_time_in_millis: long
}

export interface ReloadDetails {
  index: string
  reloaded_analyzers: Array<string>
  reloaded_node_ids: Array<string>
}

export interface ReloadSearchAnalyzersRequest extends RequestBase {
  index: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
}

export interface ReloadSearchAnalyzersResponse extends ResponseBase {
  reload_details: Array<ReloadDetails>
  _shards: ShardStatistics
}

export interface ClearCacheRequest extends RequestBase {
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  fielddata?: boolean
  fields?: Array<Field>
  ignore_unavailable?: boolean
  query?: boolean
  request?: boolean
}

export interface ClearCacheResponse extends ShardsOperationResponseBase {
}

export interface FlushRequest extends RequestBase {
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  force?: boolean
  ignore_unavailable?: boolean
  wait_if_ongoing?: boolean
}

export interface FlushResponse extends ShardsOperationResponseBase {
}

export interface ForceMergeRequest extends RequestBase {
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  flush?: boolean
  ignore_unavailable?: boolean
  max_num_segments?: long
  only_expunge_deletes?: boolean
}

export interface ForceMergeResponse extends ShardsOperationResponseBase {
}

export interface RefreshRequest extends RequestBase {
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
}

export interface RefreshResponse extends ShardsOperationResponseBase {
}

export interface SyncedFlushRequest extends RequestBase {
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
}

export interface SyncedFlushResponse extends ShardsOperationResponseBase {
}

export interface Pipeline {
  description: string
  on_failure: Array<ProcessorContainer>
  processors: Array<ProcessorContainer>
}

export interface ProcessorBase {
  if: string
  ignore_failure: boolean
  on_failure: Array<ProcessorContainer>
  tag: string
}

export interface ProcessorContainer {
  attachment: AttachmentProcessor
  append: AppendProcessor
  csv: CsvProcessor
  convert: ConvertProcessor
  date: DateProcessor
  date_index_name: DateIndexNameProcessor
  dot_expander: DotExpanderProcessor
  enrich: EnrichProcessor
  fail: FailProcessor
  foreach: ForeachProcessor
  json: JsonProcessor
  user_agent: UserAgentProcessor
  kv: KeyValueProcessor
  geoip: GeoIpProcessor
  grok: GrokProcessor
  gsub: GsubProcessor
  join: JoinProcessor
  lowercase: LowercaseProcessor
  remove: RemoveProcessor
  rename: RenameProcessor
  script: ScriptProcessor
  set: SetProcessor
  sort: SortProcessor
  split: SplitProcessor
  trim: TrimProcessor
  uppercase: UppercaseProcessor
  urldecode: UrlDecodeProcessor
  bytes: BytesProcessor
  dissect: DissectProcessor
  set_security_user: SetSecurityUserProcessor
  pipeline: PipelineProcessor
  drop: DropProcessor
  circle: CircleProcessor
}

export interface DeletePipelineRequest extends RequestBase {
  id: Id
  master_timeout?: Time
  timeout?: Time
}

export interface DeletePipelineResponse extends AcknowledgedResponseBase {
}

export interface GetPipelineRequest extends RequestBase {
  id?: Id
  master_timeout?: Time
}

export interface GetPipelineResponse extends DictionaryResponseBase<string, Pipeline> {
}

export interface GrokProcessorPatternsRequest extends RequestBase {
}

export interface GrokProcessorPatternsResponse extends ResponseBase {
  patterns: Record<string, string>
}

export interface AppendProcessor extends ProcessorBase {
  field: Field
  value: Array<any>
}

export interface BytesProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  target_field: Field
}

export interface CircleProcessor extends ProcessorBase {
  error_distance: double
  field: Field
  ignore_missing: boolean
  shape_type: ShapeType
  target_field: Field
}

export interface ConvertProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  target_field: Field
  type: ConvertProcessorType
}

export type ConvertProcessorType = 'integer' | 'long' | 'float' | 'double' | 'string' | 'boolean' | 'auto'

export interface CsvProcessor extends ProcessorBase {
  empty_value: any
  field: Field
  ignore_missing: boolean
  quote: string
  separator: string
  target_fields: Array<Field>
  trim: boolean
}

export interface DateIndexNameProcessor extends ProcessorBase {
  date_formats: Array<string>
  date_rounding: DateRounding
  field: Field
  index_name_format: string
  index_name_prefix: string
  locale: string
  timezone: string
}

export interface DateProcessor extends ProcessorBase {
  field: Field
  formats: Array<string>
  locale: string
  target_field: Field
  timezone: string
}

export type DateRounding = 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y'

export interface DissectProcessor extends ProcessorBase {
  append_separator: string
  field: Field
  ignore_missing: boolean
  pattern: string
}

export interface DotExpanderProcessor extends ProcessorBase {
  field: Field
  path: string
}

export interface DropProcessor extends ProcessorBase {
}

export interface EnrichProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  max_matches: integer
  override: boolean
  policy_name: string
  shape_relation: GeoShapeRelation
  target_field: Field
}

export interface FailProcessor extends ProcessorBase {
  message: string
}

export interface ForeachProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  processor: ProcessorContainer
}

export interface GrokProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  pattern_definitions: Record<string, string>
  patterns: Array<string>
  trace_match: boolean
}

export interface GsubProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  pattern: string
  replacement: string
  target_field: Field
}

export interface JoinProcessor extends ProcessorBase {
  field: Field
  separator: string
  target_field: Field
}

export interface JsonProcessor extends ProcessorBase {
  add_to_root: boolean
  field: Field
  target_field: Field
}

export interface KeyValueProcessor extends ProcessorBase {
  exclude_keys: Array<string>
  field: Field
  field_split: string
  ignore_missing: boolean
  include_keys: Array<string>
  prefix: string
  strip_brackets: boolean
  target_field: Field
  trim_key: string
  trim_value: string
  value_split: string
}

export interface LowercaseProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  target_field: Field
}

export interface PipelineProcessor extends ProcessorBase {
  name: string
}

export interface RemoveProcessor extends ProcessorBase {
  field: Array<Field>
  ignore_missing: boolean
}

export interface RenameProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  target_field: Field
}

export interface ScriptProcessor extends ProcessorBase {
  id: string
  lang: string
  params: Record<string, any>
  source: string
}

export interface SetProcessor extends ProcessorBase {
  field: Field
  override: boolean
  value: any
}

export interface SetSecurityUserProcessor extends ProcessorBase {
  field: Field
  properties: Array<string>
}

export type ShapeType = 'geo_shape' | 'shape'

export interface SortProcessor extends ProcessorBase {
  field: Field
  order: SortOrder
  target_field: Field
}

export interface SplitProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  preserve_trailing: boolean
  separator: string
  target_field: Field
}

export interface TrimProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  target_field: Field
}

export interface UppercaseProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  target_field: Field
}

export interface UrlDecodeProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  target_field: Field
}

export interface AttachmentProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  indexed_chars: long
  indexed_chars_field: Field
  properties: Array<string>
  target_field: Field
}

export interface GeoIpProcessor extends ProcessorBase {
  database_file: string
  field: Field
  first_only: boolean
  ignore_missing: boolean
  properties: Array<string>
  target_field: Field
}

export interface UserAgentProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  options: Array<UserAgentProperty>
  regex_file: string
  target_field: Field
}

export type UserAgentProperty = 'NAME' | 'MAJOR' | 'MINOR' | 'PATCH' | 'OS' | 'OS_NAME' | 'OS_MAJOR' | 'OS_MINOR' | 'DEVICE' | 'BUILD'

export interface PutPipelineRequest extends RequestBase {
  id: Id
  master_timeout?: Time
  timeout?: Time
  body: {
    description?: string
    on_failure?: Array<ProcessorContainer>
    processors?: Array<ProcessorContainer>
  }
}

export interface PutPipelineResponse extends AcknowledgedResponseBase {
}

export interface DocumentSimulation {
  _id: string
  _index: string
  _ingest: Ingest
  _parent: string
  _routing: string
  _source: LazyDocument
  _type: string
}

export interface Ingest {
  timestamp: Date
}

export interface PipelineSimulation {
  doc: DocumentSimulation
  processor_results: Array<PipelineSimulation>
  tag: string
}

export interface SimulatePipelineDocument {
  _id: Id
  _index: IndexName
  _source: any
}

export interface SimulatePipelineRequest extends RequestBase {
  id?: Id
  verbose?: boolean
  body: {
    docs?: Array<SimulatePipelineDocument>
    pipeline?: Pipeline
  }
}

export interface SimulatePipelineResponse extends ResponseBase {
  docs: Array<PipelineSimulation>
}

export type CategoryId = string

export interface Date {
}

export interface DateField {
  field: Field
  format?: string
  include_unmapped?: boolean
}

export type double = number

export interface ErrorCause {
  type: string
  reason: string
  caused_by?: ErrorCause
  shard?: integer | string
  stack_trace?: string
  bytes_limit?: long
  bytes_wanted?: long
  column?: integer
  col?: integer
  failed_shards?: Array<ShardFailure>
  grouped?: boolean
  index?: string
  index_uuid?: string
  language?: string
  licensed_expired_feature?: string
  line?: integer
  max_buckets?: integer
  phase?: string
  resource_id?: Array<string>
  'resource.id'?: string
  resource_type?: string
  'resource.type'?: string
  script?: string
  script_stack?: Array<string>
}

export type Field = string

export type Fields = Field | Array<Field>
export type float = number

export type Fuzziness = string | integer
export type GeoHashPrecision = number

export type GeoTilePrecision = number

export type Id = string | number
export type Ids = string | number | Array<string>
export type IndexName = string

export type Indices = string | Array<string>
export type integer = number

export interface LatLon {
  lat: double
  lon: double
}

export type long = number

export interface MainError extends ErrorCause {
  headers?: Record<string, string>
  root_cause: Array<ErrorCause>
}

export type Metrics = string | Array<string>
export type MultiTermQueryRewrite = string

export type Name = string

export type Names = string

export type NodeIds = string

export type PropertyName = string

export type RelationName = string

export type Routing = string | number
export type TaskId = string

export type TypeName = string

export type TypeNames = string | Array<string>
export type Uri = string

export type DynamicMapping = 'strict'

export interface TypeMapping {
  all_field?: AllField
  date_detection?: boolean
  dynamic?: boolean | DynamicMapping
  dynamic_date_formats?: Array<string>
  dynamic_templates?: Record<string, DynamicTemplate>
  _field_names?: FieldNamesField
  index_field?: IndexField
  _meta?: Record<string, any>
  numeric_detection?: boolean
  properties: Record<PropertyName, IProperty>
  _routing?: RoutingField
  _size?: SizeField
  _source?: SourceField
}

export interface DynamicTemplate {
  mapping: IProperty
  match: string
  match_mapping_type: string
  match_pattern: MatchType
  path_match: string
  path_unmatch: string
  unmatch: string
}

export type MatchType = 'simple' | 'regex'

export interface FieldMapping {
}

export interface AllField {
  analyzer: string
  enabled: boolean
  omit_norms: boolean
  search_analyzer: string
  similarity: string
  store: boolean
  store_term_vector_offsets: boolean
  store_term_vector_payloads: boolean
  store_term_vector_positions: boolean
  store_term_vectors: boolean
}

export interface FieldNamesField {
  enabled: boolean
}

export interface IndexField {
  enabled: boolean
}

export interface RoutingField {
  required: boolean
}

export interface SizeField {
  enabled: boolean
}

export interface SourceField {
  compress: boolean
  compress_threshold: string
  enabled: boolean
  excludes: Array<string>
  includes: Array<string>
}

export interface IProperty {
  local_metadata?: Record<string, any>
  meta?: Record<string, string>
  name?: PropertyName
  type: string
  properties?: Record<PropertyName, IProperty>
}

export interface StoredScript {
  lang: string
  source: string
}

export interface DeleteScriptRequest extends RequestBase {
  id: Id
  master_timeout?: Time
  timeout?: Time
}

export interface DeleteScriptResponse extends AcknowledgedResponseBase {
}

export interface ExecutePainlessScriptRequest extends RequestBase {
  body?: {
    context?: string
    context_setup?: PainlessContextSetup
    script?: InlineScript
  }
}

export interface ExecutePainlessScriptResponse<TResult = unknown> extends ResponseBase {
  result: TResult
}

export interface PainlessContextSetup {
  document: any
  index: IndexName
  query: QueryContainer
}

export interface GetScriptRequest extends RequestBase {
  id: Id
  master_timeout?: Time
}

export interface GetScriptResponse extends ResponseBase {
  script: StoredScript
}

export interface PutScriptRequest extends RequestBase {
  id: Id
  context?: Name
  master_timeout?: Time
  timeout?: Time
  body: {
    script?: StoredScript
  }
}

export interface PutScriptResponse extends AcknowledgedResponseBase {
}

export interface SnapshotRepository {
  type: string
}

export interface CleanupRepositoryRequest extends RequestBase {
  repository: Name
  master_timeout?: Time
  timeout?: Time
}

export interface CleanupRepositoryResponse extends ResponseBase {
  results: CleanupRepositoryResults
}

export interface CleanupRepositoryResults {
  deleted_blobs: long
  deleted_bytes: long
}

export interface CreateRepositoryRequest extends RequestBase {
  repository: Name
  master_timeout?: Time
  timeout?: Time
  verify?: boolean
  body: {
    repository?: SnapshotRepository
  }
}

export interface CreateRepositoryResponse extends AcknowledgedResponseBase {
}

export interface DeleteRepositoryRequest extends RequestBase {
  repository: Names
  master_timeout?: Time
  timeout?: Time
}

export interface DeleteRepositoryResponse extends AcknowledgedResponseBase {
}

export interface GetRepositoryRequest extends RequestBase {
  repository?: Names
  local?: boolean
  master_timeout?: Time
}

export interface GetRepositoryResponse extends ResponseBase {
  repositories: Record<string, SnapshotRepository>
}

export interface CompactNodeInfo {
  name: string
}

export interface VerifyRepositoryRequest extends RequestBase {
  repository: Name
  master_timeout?: Time
  timeout?: Time
}

export interface VerifyRepositoryResponse extends ResponseBase {
  nodes: Record<string, CompactNodeInfo>
}

export interface RestoreRequest extends RequestBase {
  repository: Name
  snapshot: Name
  master_timeout?: Time
  wait_for_completion?: boolean
  body?: {
    ignore_index_settings?: Array<string>
    ignore_unavailable?: boolean
    include_aliases?: boolean
    include_global_state?: boolean
    index_settings?: UpdateIndexSettingsRequest
    indices?: Indices
    partial?: boolean
    rename_pattern?: string
    rename_replacement?: string
  }
}

export interface RestoreResponse extends ResponseBase {
  snapshot: SnapshotRestore
}

export interface SnapshotRestore {
  indices: Array<IndexName>
  snapshot: string
  shards: ShardStatistics
}

export interface SnapshotInfo {
  duration_in_millis: long
  end_time: Date
  end_time_in_millis: long
  failures: Array<SnapshotShardFailure>
  indices: Array<IndexName>
  metadata: Record<string, any>
  snapshot: string
  shards: ShardStatistics
  start_time: Date
  start_time_in_millis: long
  state: string
}

export interface SnapshotShardFailure {
  index: string
  node_id: string
  reason: string
  shard_id: string
  status: string
}

export interface DeleteSnapshotRequest extends RequestBase {
  repository: Name
  snapshot: Name
  master_timeout?: Time
}

export interface DeleteSnapshotResponse extends AcknowledgedResponseBase {
}

export interface GetSnapshotRequest extends RequestBase {
  repository: Name
  snapshot: Names
  ignore_unavailable?: boolean
  master_timeout?: Time
  verbose?: boolean
}

export interface GetSnapshotResponse extends ResponseBase {
  snapshots: Array<SnapshotInfo>
}

export interface SnapshotRequest extends RequestBase {
  repository: Name
  snapshot: Name
  master_timeout?: Time
  wait_for_completion?: boolean
  body?: {
    ignore_unavailable?: boolean
    include_global_state?: boolean
    indices?: Indices
    metadata?: Record<string, any>
    partial?: boolean
  }
}

export interface SnapshotResponse extends ResponseBase {
  accepted: boolean
  snapshot: SnapshotInfo
}

export interface FileCountSnapshotStats {
  file_count: integer
  size_in_bytes: long
}

export interface SnapshotIndexStats {
  shards: Record<string, SnapshotShardsStats>
  shards_stats: SnapshotShardsStats
  stats: SnapshotStats
}

export interface SnapshotShardsStats {
  done: long
  failed: long
  finalizing: long
  initializing: long
  started: long
  total: long
}

export interface SnapshotStats {
  incremental: FileCountSnapshotStats
  start_time_in_millis: long
  time_in_millis: long
  total: FileCountSnapshotStats
}

export interface SnapshotStatus {
  include_global_state: boolean
  indices: Record<string, SnapshotIndexStats>
  repository: string
  shards_stats: SnapshotShardsStats
  snapshot: string
  state: string
  stats: SnapshotStats
  uuid: string
}

export interface SnapshotStatusRequest extends RequestBase {
  repository?: Name
  snapshot?: Names
  ignore_unavailable?: boolean
  master_timeout?: Time
}

export interface SnapshotStatusResponse extends ResponseBase {
  snapshots: Array<SnapshotStatus>
}

export interface MatchAllQuery extends QueryBase {
  norm_field?: string
}

export interface MatchNoneQuery extends QueryBase {
}

export type Operator = 'and' | 'or' | 'AND' | 'OR'

export interface QueryContainer {
  bool?: BoolQuery
  boosting?: BoostingQuery
  common?: Record<string, CommonTermsQuery | string>
  constant_score?: ConstantScoreQuery
  dis_max?: DisMaxQuery
  distance_feature?: Record<string, DistanceFeatureQuery | string> | DistanceFeatureQuery
  exists?: ExistsQuery
  function_score?: FunctionScoreQuery
  fuzzy?: Record<string, FuzzyQuery | string>
  geo_bounding_box?: Record<string, GeoBoundingBoxQuery | string>
  geo_distance?: Record<string, GeoDistanceQuery | string>
  geo_polygon?: Record<string, GeoPolygonQuery | string>
  geo_shape?: Record<string, GeoShapeQuery | string>
  has_child?: HasChildQuery
  has_parent?: HasParentQuery
  ids?: IdsQuery
  intervals?: Record<string, IntervalsQuery | string>
  is_conditionless?: boolean
  is_strict?: boolean
  is_verbatim?: boolean
  is_writable?: boolean
  match?: Record<string, MatchQuery | string | float | boolean>
  match_all?: MatchAllQuery
  match_bool_prefix?: Record<string, MatchBoolPrefixQuery | string>
  match_none?: MatchNoneQuery
  match_phrase?: Record<string, MatchPhraseQuery | string>
  match_phrase_prefix?: Record<string, MatchPhrasePrefixQuery | string>
  more_like_this?: MoreLikeThisQuery
  multi_match?: MultiMatchQuery
  nested?: NestedQuery
  parent_id?: ParentIdQuery
  percolate?: PercolateQuery
  pinned?: PinnedQuery
  prefix?: Record<string, PrefixQuery | string>
  query_string?: QueryStringQuery
  range?: Record<string, RangeQuery>
  rank_feature?: Record<string, RankFeatureQuery | string>
  raw_query?: RawQuery
  regexp?: Record<string, RegexpQuery | string>
  script?: ScriptQuery
  script_score?: ScriptScoreQuery
  shape?: Record<string, ShapeQuery | string>
  simple_query_string?: SimpleQueryStringQuery
  span_containing?: SpanContainingQuery
  field_masking_span?: SpanFieldMaskingQuery
  span_first?: SpanFirstQuery
  span_multi?: SpanMultiTermQuery
  span_near?: SpanNearQuery
  span_not?: SpanNotQuery
  span_or?: SpanOrQuery
  span_term?: Record<string, SpanTermQuery | string>
  span_within?: SpanWithinQuery
  term?: Record<string, TermQuery | string | float | boolean>
  terms?: Record<string, TermsQuery | Array<string>>
  terms_set?: Record<string, TermsSetQuery | string>
  wildcard?: Record<string, WildcardQuery | string>
  type?: TypeQuery
}

export interface FieldLookup {
  id?: Id
  index?: IndexName
  path?: Field
  routing?: Routing
}

export interface QueryBase {
  boost?: float
  _name?: string
}

export interface BoolQuery {
  filter?: QueryContainer | Array<QueryContainer>
  minimum_should_match?: MinimumShouldMatch
  must?: QueryContainer | Array<QueryContainer>
  must_not?: QueryContainer | Array<QueryContainer>
  should?: QueryContainer | Array<QueryContainer>
  _name?: string
}

export interface BoostingQuery {
  negative_boost?: double
  negative?: QueryContainer
  positive?: QueryContainer
}

export interface ConstantScoreQuery {
  filter?: QueryContainer
  boost?: float
}

export interface DisMaxQuery {
  queries?: Array<QueryContainer>
  tie_breaker?: double
  boost?: float
}

export interface FunctionScoreQuery {
  boost_mode?: FunctionBoostMode
  functions?: Array<ScoreFunction>
  max_boost?: double
  min_score?: double
  query?: QueryContainer
  score_mode?: FunctionScoreMode
  boost?: float
}

export type FunctionBoostMode = 'multiply' | 'replace' | 'sum' | 'avg' | 'max' | 'min'

export type FunctionScoreMode = 'multiply' | 'sum' | 'avg' | 'first' | 'max' | 'min'

export interface ScoreFunction {
  filter?: QueryContainer
  weight?: double
}

export interface CommonTermsQuery extends QueryBase {
  analyzer?: string
  cutoff_frequency?: double
  high_freq_operator?: Operator
  low_freq_operator?: Operator
  minimum_should_match?: MinimumShouldMatch
  query?: string
}

export interface IntervalsAllOf {
  intervals?: Array<IntervalsContainer>
  max_gaps?: integer
  ordered?: boolean
  filter?: IntervalsFilter
}

export interface IntervalsAnyOf {
  intervals?: Array<IntervalsContainer>
  filter?: IntervalsFilter
}

export interface IntervalsContainer {
  all_of?: IntervalsAllOf
  any_of?: IntervalsAnyOf
  fuzzy?: IntervalsFuzzy
  match?: IntervalsMatch
  prefix?: IntervalsPrefix
  wildcard?: IntervalsWildcard
}

export interface IntervalsFilter {
  after?: IntervalsContainer
  before?: IntervalsContainer
  contained_by?: IntervalsContainer
  containing?: IntervalsContainer
  not_contained_by?: IntervalsContainer
  not_containing?: IntervalsContainer
  not_overlapping?: IntervalsContainer
  overlapping?: IntervalsContainer
  script?: Script
}

export interface IntervalsFuzzy {
  analyzer?: string
  fuzziness?: Fuzziness
  prefix_length?: integer
  term?: string
  transpositions?: boolean
  use_field?: Field
}

export interface IntervalsMatch {
  analyzer?: string
  max_gaps?: integer
  ordered?: boolean
  query?: string
  use_field?: Field
  filter?: IntervalsFilter
}

export interface IntervalsPrefix {
  analyzer?: string
  prefix?: string
  use_field?: Field
}

export interface IntervalsQuery extends QueryBase {
  all_of?: IntervalsAllOf
  any_of?: IntervalsAnyOf
  fuzzy?: IntervalsFuzzy
  match?: IntervalsMatch
  prefix?: IntervalsPrefix
  wildcard?: IntervalsWildcard
}

export interface IntervalsWildcard {
  analyzer?: string
  pattern?: string
  use_field?: Field
}

export interface MatchQuery extends QueryBase {
  analyzer?: string
  auto_generate_synonyms_phrase_query?: boolean
  cutoff_frequency?: double
  fuzziness?: Fuzziness
  fuzzy_rewrite?: MultiTermQueryRewrite
  fuzzy_transpositions?: boolean
  lenient?: boolean
  max_expansions?: integer
  minimum_should_match?: MinimumShouldMatch
  operator?: Operator
  prefix_length?: integer
  query?: string | float | boolean
  zero_terms_query?: ZeroTermsQuery
}

export interface MatchBoolPrefixQuery extends QueryBase {
  analyzer?: string
  fuzziness?: Fuzziness
  fuzzy_rewrite?: MultiTermQueryRewrite
  fuzzy_transpositions?: boolean
  max_expansions?: integer
  minimum_should_match?: MinimumShouldMatch
  operator?: Operator
  prefix_length?: integer
  query?: string
}

export interface MatchPhraseQuery extends QueryBase {
  analyzer?: string
  query?: string
  slop?: integer
}

export interface MatchPhrasePrefixQuery extends QueryBase {
  analyzer?: string
  max_expansions?: integer
  query?: string
  slop?: integer
  zero_terms_query?: ZeroTermsQuery
}

export interface MultiMatchQuery extends QueryBase {
  analyzer?: string
  auto_generate_synonyms_phrase_query?: boolean
  cutoff_frequency?: double
  fields?: Array<Field>
  fuzziness?: Fuzziness
  fuzzy_rewrite?: MultiTermQueryRewrite
  fuzzy_transpositions?: boolean
  lenient?: boolean
  max_expansions?: integer
  minimum_should_match?: MinimumShouldMatch
  operator?: Operator
  prefix_length?: integer
  query?: string
  slop?: integer
  tie_breaker?: double
  type?: TextQueryType
  use_dis_max?: boolean
  zero_terms_query?: ZeroTermsQuery
}

export type TextQueryType = 'best_fields' | 'most_fields' | 'cross_fields' | 'phrase' | 'phrase_prefix' | 'bool_prefix'

export type ZeroTermsQuery = 'all' | 'none'

export interface QueryStringQuery extends QueryBase {
  allow_leading_wildcard?: boolean
  analyzer?: string
  analyze_wildcard?: boolean
  auto_generate_synonyms_phrase_query?: boolean
  default_field?: Field
  default_operator?: Operator
  enable_position_increments?: boolean
  escape?: boolean
  fields?: Array<Field>
  fuzziness?: Fuzziness
  fuzzy_max_expansions?: integer
  fuzzy_prefix_length?: integer
  fuzzy_rewrite?: MultiTermQueryRewrite
  fuzzy_transpositions?: boolean
  lenient?: boolean
  max_determinized_states?: integer
  minimum_should_match?: MinimumShouldMatch
  phrase_slop?: double
  query?: string
  quote_analyzer?: string
  quote_field_suffix?: string
  rewrite?: MultiTermQueryRewrite
  tie_breaker?: double
  time_zone?: string
  type?: TextQueryType
}

export type SimpleQueryStringFlags = 'NONE' | 'AND' | 'OR' | 'NOT' | 'PREFIX' | 'PHRASE' | 'PRECEDENCE' | 'ESCAPE' | 'WHITESPACE' | 'FUZZY' | 'NEAR' | 'SLOP' | 'ALL'

export interface SimpleQueryStringQuery extends QueryBase {
  analyzer?: string
  analyze_wildcard?: boolean
  auto_generate_synonyms_phrase_query?: boolean
  default_operator?: Operator
  fields?: Array<Field>
  flags?: SimpleQueryStringFlags
  fuzzy_max_expansions?: integer
  fuzzy_prefix_length?: integer
  fuzzy_transpositions?: boolean
  lenient?: boolean
  minimum_should_match?: MinimumShouldMatch
  query?: string
  quote_field_suffix?: string
}

export interface GeoCoordinate extends GeoLocation {
  z?: double
}

export interface GeoLocation {
  lat?: double
  lon?: double
}

export type GeoValidationMethod = 'coerce' | 'ignore_malformed' | 'strict'

export interface BoundingBox {
  bottom_right?: GeoLocation
  top_left?: GeoLocation
  wkt?: string
}

export interface GeoBoundingBoxQuery extends QueryBase {
  bounding_box?: BoundingBox
  type?: GeoExecution
  validation_method?: GeoValidationMethod
}

export type GeoExecution = 'memory' | 'indexed'

export interface GeoDistanceQuery extends QueryBase {
  distance?: Distance
  distance_type?: GeoDistanceType
  location?: GeoLocation
  validation_method?: GeoValidationMethod
}

export interface GeoPolygonQuery extends QueryBase {
  points?: Array<GeoLocation>
  validation_method?: GeoValidationMethod
}

export interface GeoShape {
  type?: string
}

export interface GeoShapeQuery extends QueryBase {
  ignore_unmapped?: boolean
  indexed_shape?: FieldLookup
  relation?: GeoShapeRelation
  shape?: GeoShape
}

export type ChildScoreMode = 'none' | 'avg' | 'sum' | 'max' | 'min'

export interface HasChildQuery extends QueryBase {
  ignore_unmapped?: boolean
  inner_hits?: InnerHits
  max_children?: integer
  min_children?: integer
  query?: QueryContainer
  score_mode?: ChildScoreMode
  type?: RelationName
}

export interface HasParentQuery extends QueryBase {
  ignore_unmapped?: boolean
  inner_hits?: InnerHits
  parent_type?: RelationName
  query?: QueryContainer
  score?: boolean
}

export interface NestedQuery extends QueryBase {
  ignore_unmapped?: boolean
  inner_hits?: InnerHits
  path?: Field
  query?: QueryContainer
  score_mode?: NestedScoreMode
}

export type NestedScoreMode = 'avg' | 'sum' | 'min' | 'max' | 'none'

export interface ParentIdQuery extends QueryBase {
  id?: Id
  ignore_unmapped?: boolean
  type?: RelationName
}

export interface RawQuery {
  raw?: string
}

export interface SpanQuery extends QueryBase {
  span_containing?: SpanContainingQuery
  field_masking_span?: SpanFieldMaskingQuery
  span_first?: SpanFirstQuery
  span_gap?: SpanGapQuery
  span_multi?: SpanMultiTermQuery
  span_near?: SpanNearQuery
  span_not?: SpanNotQuery
  span_or?: SpanOrQuery
  span_term?: SpanTermQuery
  span_within?: SpanWithinQuery
}

export interface SpanContainingQuery {
  big?: SpanQuery
  little?: SpanQuery
}

export interface SpanFieldMaskingQuery {
  field?: Field
  query?: SpanQuery
}

export interface SpanFirstQuery {
  end?: integer
  match?: SpanQuery
}

export interface SpanGapQuery {
  field?: Field
  width?: integer
}

export interface SpanMultiTermQuery {
  match?: QueryContainer
}

export interface SpanNearQuery {
  clauses?: Array<SpanQuery>
  in_order?: boolean
  slop?: integer
}

export interface SpanNotQuery {
  dist?: integer
  exclude?: SpanQuery
  include?: SpanQuery
  post?: integer
  pre?: integer
}

export interface SpanOrQuery {
  clauses?: Array<SpanQuery>
}

export interface SpanTermQuery {
}

export interface SpanWithinQuery {
  big?: SpanQuery
  little?: SpanQuery
}

export interface DistanceFeatureQuery extends QueryBase {
  origin?: Array<number> | GeoCoordinate | DateMath
  pivot?: Distance | Time
  field?: Field
}

export interface MoreLikeThisQuery extends QueryBase {
  analyzer?: string
  boost_terms?: double
  fields?: Array<Field>
  include?: boolean
  like?: Array<Like>
  max_doc_freq?: integer
  max_query_terms?: integer
  max_word_length?: integer
  min_doc_freq?: integer
  minimum_should_match?: MinimumShouldMatch
  min_term_freq?: integer
  min_word_length?: integer
  per_field_analyzer?: Record<Field, string>
  routing?: Routing
  stop_words?: StopWords
  unlike?: Array<Like>
  version?: long
  version_type?: VersionType
}

export type Like = string | LikeDocument
export interface LikeDocument {
  doc?: any
  fields?: Array<Field>
  _id?: Id
  _index?: IndexName
  per_field_analyzer?: Record<Field, string>
  routing?: Routing
}

export interface PercolateQuery extends QueryBase {
  document?: any
  documents?: Array<any>
  field?: Field
  id?: Id
  index?: IndexName
  preference?: string
  routing?: Routing
  version?: long
}

export interface PinnedQuery extends QueryBase {
  ids?: Array<Id>
  organic?: QueryContainer
}

export interface RankFeatureFunction {
}

export interface RankFeatureQuery extends QueryBase {
  function?: RankFeatureFunction
}

export interface ScriptQuery extends QueryBase {
  script?: Script
}

export interface ScriptScoreQuery extends QueryBase {
  query?: QueryContainer
  script?: Script
}

export interface ShapeQuery extends QueryBase {
  ignore_unmapped?: boolean
  indexed_shape?: FieldLookup
  relation?: ShapeRelation
  shape?: GeoShape
}

export interface ExistsQuery extends QueryBase {
  field?: Field
}

export interface FuzzyQuery extends QueryBase {
  max_expansions?: integer
  prefix_length?: integer
  rewrite?: MultiTermQueryRewrite
  transpositions?: boolean
}

export interface IdsQuery extends QueryBase {
  values?: Array<Id>
}

export interface PrefixQuery extends QueryBase {
  rewrite?: MultiTermQueryRewrite
}

export interface RangeQuery extends QueryBase {
  gt?: double | DateMath
  gte?: double | DateMath
  lt?: double | DateMath
  lte?: double | DateMath
  relation?: RangeRelation
  time_zone?: string
  from?: double | DateMath
  to?: double | DateMath
}

export type RangeRelation = 'within' | 'contains' | 'intersects'

export interface RegexpQuery extends QueryBase {
  flags?: string
  max_determinized_states?: integer
  value?: string
}

export interface TermQuery extends QueryBase {
  value?: string | float | boolean
}

export interface TermsQuery extends QueryBase {
  terms?: Array<string>
  index?: IndexName
  id?: Id
  path?: string
  routing?: Routing
}

export interface TermsSetQuery extends QueryBase {
  minimum_should_match_field?: Field
  minimum_should_match_script?: Script
  terms?: Array<string>
}

export interface TypeQuery extends QueryBase {
  value: string
}

export interface WildcardQuery extends QueryBase {
  rewrite?: MultiTermQueryRewrite
}

export interface CountRequest extends RequestBase {
  index?: Indices
  type?: TypeNames
  allow_no_indices?: boolean
  analyzer?: string
  analyze_wildcard?: boolean
  default_operator?: DefaultOperator
  df?: string
  expand_wildcards?: ExpandWildcards
  ignore_throttled?: boolean
  ignore_unavailable?: boolean
  lenient?: boolean
  min_score?: double
  preference?: string
  query_on_query_string?: string
  routing?: Routing
  terminate_after?: long
  body?: {
    query?: QueryContainer
  }
}

export interface CountResponse extends ResponseBase {
  count: long
  _shards: ShardStatistics
}

export interface ExplainRequest extends RequestBase {
  id: Id
  index: IndexName
  type?: TypeName
  analyzer?: string
  analyze_wildcard?: boolean
  default_operator?: DefaultOperator
  df?: string
  lenient?: boolean
  preference?: string
  query_on_query_string?: string
  routing?: Routing
  source_enabled?: boolean
  source_excludes?: Array<Field>
  source_includes?: Array<Field>
  stored_fields?: Array<Field>
  body?: {
    query?: QueryContainer
  }
}

export interface ExplainResponse<TDocument = unknown> extends ResponseBase {
  explanation: ExplanationDetail
  get: InlineGet<TDocument>
  matched: boolean
}

export interface Explanation {
  description: string
  details: Array<ExplanationDetail>
  value: float
}

export interface ExplanationDetail {
  description: string
  details: Array<ExplanationDetail>
  value: float
}

export interface InlineGet<TDocument = unknown> {
  fields?: Record<string, LazyDocument>
  found: boolean
  _seq_no: long
  _primary_term: long
  _source: TDocument
}

export interface FieldCapabilities {
  aggregatable: boolean
  indices: Indices
  meta: Record<string, Array<string>>
  non_aggregatable_indices: Indices
  non_searchable_indices: Indices
  searchable: boolean
}

export interface FieldCapabilitiesRequest extends RequestBase {
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  fields?: Field | Array<Field>
  ignore_unavailable?: boolean
  include_unmapped?: boolean
}

export interface FieldCapabilitiesResponse extends ResponseBase {
  fields: Record<Field, Record<string, FieldCapabilities>>
}

export interface MultiSearchRequest extends RequestBase {
  index?: Indices
  type?: TypeNames
  ccs_minimize_roundtrips?: boolean
  max_concurrent_searches?: long
  max_concurrent_shard_requests?: long
  pre_filter_shard_size?: long
  search_type?: SearchType
  total_hits_as_integer?: boolean
  typed_keys?: boolean
  body: {
    operations?: Record<string, SearchRequest>
  }
}

export interface MultiSearchResponse extends ResponseBase {
  responses: Array<SearchResponse<any>>
}

export interface ClearScrollRequest extends RequestBase {
  scroll_id?: Ids
  body?: {
    scroll_id?: Array<string>
  }
}

export interface ClearScrollResponse extends ResponseBase {
}

export interface ScrollRequest extends RequestBase {
  scroll_id?: Id
  total_hits_as_integer?: boolean
  scroll?: Time
  body?: {
    scroll?: Time
    scroll_id?: string
  }
}

export interface ScrollResponse<TDocument = unknown> extends SearchResponse<TDocument> {
}

export interface SlicedScroll {
  field: Field
  id: integer
  max: integer
}

export interface SearchRequest extends RequestBase {
  index?: Indices
  type?: TypeNames
  allow_no_indices?: boolean
  allow_partial_search_results?: boolean
  analyzer?: string
  analyze_wildcard?: boolean
  batched_reduce_size?: long
  ccs_minimize_roundtrips?: boolean
  default_operator?: DefaultOperator
  df?: string
  docvalue_fields?: Array<Field>
  expand_wildcards?: ExpandWildcards
  ignore_throttled?: boolean
  ignore_unavailable?: boolean
  lenient?: boolean
  max_concurrent_shard_requests?: long
  preference?: string
  pre_filter_shard_size?: long
  query_on_query_string?: string
  request_cache?: boolean
  routing?: Routing
  scroll?: Time
  search_type?: SearchType
  sequence_number_primary_term?: boolean
  stats?: Array<string>
  stored_fields?: Array<Field>
  suggest_field?: Field
  suggest_mode?: SuggestMode
  suggest_size?: long
  suggest_text?: string
  total_hits_as_integer?: boolean
  track_total_hits?: boolean | integer
  typed_keys?: boolean
  rest_total_hits_as_int?: boolean
  _source_excludes?: Field | Array<Field>
  _source_includes?: Field | Array<Field>
  seq_no_primary_term?: boolean
  q?: string
  size?: integer
  from?: integer
  sort?: Array<Field | Record<string, Sort | SortOrder>>
  body?: {
    aggs?: Record<string, AggregationContainer>
    aggregations?: Record<string, AggregationContainer>
    collapse?: FieldCollapse
    explain?: boolean
    from?: integer
    highlight?: Highlight
    track_total_hits?: boolean | integer
    indices_boost?: Array<Record<IndexName, double>>
    docvalue_fields?: DocValueField | Array<Field | DocValueField>
    min_score?: double
    post_filter?: QueryContainer
    profile?: boolean
    query?: QueryContainer
    rescore?: Rescore | Array<Rescore>
    script_fields?: Record<string, ScriptField>
    search_after?: Array<integer | string>
    size?: integer
    slice?: SlicedScroll
    sort?: Array<Field | Record<string, Sort | SortOrder>>
    _source?: boolean | Fields | SourceFilter
    fields?: Array<Field | DateField>
    suggest?: Record<string, SuggestBucket>
    terminate_after?: long
    timeout?: string
    track_scores?: boolean
    version?: boolean
    seq_no_primary_term?: boolean
    stored_fields?: Field | Array<Field>
    pit?: PointInTimeReference
  }
}

export interface SearchResponse<TDocument = unknown> extends ResponseBase {
  took: long
  timed_out: boolean
  _shards: ShardStatistics
  hits: HitsMetadata<TDocument>
  aggregations?: Record<string, Aggregate>
  _clusters?: ClusterStatistics
  documents?: Array<TDocument>
  fields?: Record<string, LazyDocument>
  max_score?: double
  num_reduce_phases?: long
  profile?: Profile
  pit_id?: string
  _scroll_id?: string
  suggest?: SuggestDictionary<TDocument>
  terminated_early?: boolean
}

export interface SearchNode {
  name: string
  transport_address: string
}

export interface SearchShard {
  index: string
  node: string
  primary: boolean
  relocating_node: string
  shard: integer
  state: string
}

export interface SearchShardsRequest extends RequestBase {
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  local?: boolean
  preference?: string
  routing?: Routing
}

export interface SearchShardsResponse extends ResponseBase {
  nodes: Record<string, SearchNode>
  shards: Array<Array<SearchShard>>
}

export interface SearchTemplateRequest extends RequestBase {
  index?: Indices
  type?: TypeNames
  allow_no_indices?: boolean
  ccs_minimize_roundtrips?: boolean
  expand_wildcards?: ExpandWildcards
  explain?: boolean
  ignore_throttled?: boolean
  ignore_unavailable?: boolean
  preference?: string
  profile?: boolean
  routing?: Routing
  scroll?: Time
  search_type?: SearchType
  total_hits_as_integer?: boolean
  typed_keys?: boolean
  body?: {
    id?: string
    params?: Record<string, any>
    source?: string
  }
}

export interface RenderSearchTemplateRequest extends RequestBase {
  body?: {
    file?: string
    params?: Record<string, any>
    source?: string
  }
}

export interface RenderSearchTemplateResponse extends ResponseBase {
  template_output: LazyDocument
}

export interface FieldCollapse {
  field: Field
  inner_hits?: InnerHits | Array<InnerHits>
  max_concurrent_group_searches?: integer
}

export type BoundaryScanner = 'chars' | 'sentence' | 'word'

export interface Highlight {
  fields: Record<Field, HighlightField>
  type?: HighlighterType
  boundary_chars?: string
  boundary_max_scan?: integer
  boundary_scanner?: BoundaryScanner
  boundary_scanner_locale?: string
  encoder?: HighlighterEncoder
  fragmenter?: HighlighterFragmenter
  fragment_offset?: integer
  fragment_size?: integer
  max_fragment_length?: integer
  no_match_size?: integer
  number_of_fragments?: integer
  order?: HighlighterOrder
  post_tags?: Array<string>
  pre_tags?: Array<string>
  require_field_match?: boolean
  tags_schema?: HighlighterTagsSchema
}

export type HighlighterEncoder = 'default' | 'html'

export type HighlighterFragmenter = 'simple' | 'span'

export type HighlighterOrder = 'score'

export type HighlighterTagsSchema = 'styled'

export type HighlighterType = 'plain' | 'fvh' | 'unified'

export interface HighlightField {
  boundary_chars?: string
  boundary_max_scan?: integer
  boundary_scanner?: BoundaryScanner
  boundary_scanner_locale?: string
  field?: Field
  force_source?: boolean
  fragmenter?: HighlighterFragmenter
  fragment_offset?: integer
  fragment_size?: integer
  highlight_query?: QueryContainer
  matched_fields?: Array<Field>
  max_fragment_length?: integer
  no_match_size?: integer
  number_of_fragments?: integer
  order?: HighlighterOrder
  phrase_limit?: integer
  post_tags?: Array<string>
  pre_tags?: Array<string>
  require_field_match?: boolean
  tags_schema?: HighlighterTagsSchema
  type?: HighlighterType | string
}

export interface Hit<TDocument = unknown> {
  _index: IndexName
  _id: Id
  _score?: double
  _type?: TypeName
  _explanation?: Explanation
  fields?: Record<string, LazyDocument>
  highlight?: Record<string, Array<string>>
  inner_hits?: Record<string, InnerHitsResult>
  matched_queries?: Array<string>
  _nested?: NestedIdentity
  _ignored?: Array<string>
  _shard?: string
  _node?: string
  _routing?: string
  _source: TDocument
  _seq_no?: long
  _primary_term?: long
  _version?: long
  sort?: Array<long | double | string>
}

export interface HitsMetadata<T = unknown> {
  total: TotalHits | long
  hits: Array<Hit<T>>
  max_score?: double
}

export interface InnerHitsMetadata {
  total: TotalHits | long
  hits: Array<Hit<LazyDocument>>
  max_score?: double
}

export interface InnerHitsResult {
  hits: InnerHitsMetadata
}

export interface NestedIdentity {
  field: Field
  offset: integer
  _nested?: NestedIdentity
}

export interface TotalHits {
  relation: TotalHitsRelation
  value: long
}

export type TotalHitsRelation = 'eq' | 'gte'

export interface InnerHits {
  name?: string
  size?: integer
  from?: integer
  collapse?: FieldCollapse
  docvalue_fields?: Array<Field>
  explain?: boolean
  highlight?: Highlight
  ignore_unmapped?: boolean
  script_fields?: Record<string, ScriptField>
  seq_no_primary_term?: boolean
  fields?: Array<Field>
  sort?: Array<Record<string, Sort | SortOrder>>
  _source?: boolean | SourceFilter
  version?: boolean
}

export interface PointInTimeReference {
  id: string
  keep_alive?: Time
}

export interface AggregationBreakdown {
  build_aggregation: long
  build_aggregation_count: long
  build_leaf_collector: long
  build_leaf_collector_count: long
  collect: long
  collect_count: long
  initialize: long
  initialize_count: long
  reduce: long
  reduce_count: long
}

export interface AggregationProfile {
  breakdown: AggregationBreakdown
  description: string
  time_in_nanos: long
  type: string
  debug: AggregationProfileDebug
  children?: Array<AggregationProfileDebug>
}

export interface AggregationProfileDebug {
}

export interface Collector {
  name: string
  reason: string
  time_in_nanos: long
  children?: Array<Collector>
}

export interface Profile {
  shards: Array<ShardProfile>
}

export interface QueryBreakdown {
  advance: long
  advance_count: long
  build_scorer: long
  build_scorer_count: long
  create_weight: long
  create_weight_count: long
  match: long
  match_count: long
  shallow_advance: long
  shallow_advance_count: long
  next_doc: long
  next_doc_count: long
  score: long
  score_count: long
  compute_max_score: long
  compute_max_score_count: long
  set_min_competitive_score: long
  set_min_competitive_score_count: long
}

export interface QueryProfile {
  breakdown: QueryBreakdown
  description: string
  time_in_nanos: long
  type: string
  children?: Array<QueryProfile>
}

export interface SearchProfile {
  collector: Array<Collector>
  query: Array<QueryProfile>
  rewrite_time: long
}

export interface ShardProfile {
  aggregations: Array<AggregationProfile>
  id: string
  searches: Array<SearchProfile>
}

export interface Rescore {
  query: RescoreQuery
  window_size: integer
}

export interface RescoreQuery {
  rescore_query: QueryContainer
  query_weight: double
  rescore_query_weight: double
  score_mode?: ScoreMode
}

export type ScoreMode = 'avg' | 'max' | 'min' | 'multiply' | 'total'

export interface NestedSort {
  nested: NestedSortValue
}

export interface NestedSortValue {
  filter: QueryContainer
  max_children: integer
  path: Field
}

export type NumericType = 'long' | 'double' | 'date' | 'date_nanos'

export interface Sort {
  missing?: Missing
  mode?: SortMode
  nested?: NestedSort
  numeric_type?: NumericType
  unmapped_type?: string
  order: SortOrder
}

export type SortMode = 'min' | 'max' | 'sum' | 'avg' | 'median'

export type SortOrder = 'asc' | 'desc'

export interface DocValueField {
  field: Field
  format?: string
}

export interface SourceFilter {
  excludes?: Fields
  includes?: Fields
}

export interface Suggest<T = unknown> {
  length: integer
  offset: integer
  options: Array<SuggestOption<T>>
  text: string
}

export interface SuggestBucket {
  completion: CompletionSuggester
  phrase: PhraseSuggester
  prefix: string
  regex: string
  term: TermSuggester
  text: string
}

export interface SuggestDictionary<T = unknown> {
  item: Array<Suggest<T>>
  keys: Array<string>
  values: Array<Array<Suggest<T>>>
}

export interface SuggestOption<TDocument = unknown> {
  collate_match: boolean
  contexts: Record<string, Array<Context>>
  fields: Record<string, LazyDocument>
  freq: long
  highlighted: string
  _id: string
  _index: IndexName
  _score: double
  score: double
  _source: TDocument
  text: string
}

export interface CompletionSuggester {
  contexts: Record<string, Array<SuggestContextQuery>>
  fuzzy: SuggestFuzziness
  prefix: string
  regex: string
  skip_duplicates: boolean
}

export interface SuggestFuzziness {
  fuzziness: Fuzziness
  min_length: integer
  prefix_length: integer
  transpositions: boolean
  unicode_aware: boolean
}

export type Context = string | GeoLocation
export interface SuggestContextQuery {
  boost: double
  context: Context
  neighbours: Array<Distance> | Array<integer>
  precision: Distance | integer
  prefix: boolean
}

export interface DirectGenerator {
  field: Field
  max_edits: integer
  max_inspections: float
  max_term_freq: float
  min_doc_freq: float
  min_word_length: integer
  post_filter: string
  pre_filter: string
  prefix_length: integer
  size: integer
  suggest_mode: SuggestMode
}

export interface PhraseSuggestCollate {
  params: Record<string, any>
  prune: boolean
  query: PhraseSuggestCollateQuery
}

export interface PhraseSuggestCollateQuery {
  id: Id
  source: string
}

export interface PhraseSuggester {
  collate: PhraseSuggestCollate
  confidence: double
  direct_generator: Array<DirectGenerator>
  force_unigrams: boolean
  gram_size: integer
  highlight: PhraseSuggestHighlight
  max_errors: double
  real_word_error_likelihood: double
  separator: string
  shard_size: integer
  smoothing: SmoothingModelContainer
  text: string
  token_limit: integer
}

export interface PhraseSuggestHighlight {
  post_tag: string
  pre_tag: string
}

export interface LaplaceSmoothingModel {
  alpha: double
}

export interface LinearInterpolationSmoothingModel {
  bigram_lambda: double
  trigram_lambda: double
  unigram_lambda: double
}

export interface SmoothingModelContainer {
  laplace: LaplaceSmoothingModel
  linear_interpolation: LinearInterpolationSmoothingModel
  stupid_backoff: StupidBackoffSmoothingModel
}

export interface StupidBackoffSmoothingModel {
  discount: double
}

export type StringDistance = 'internal' | 'damerau_levenshtein' | 'levenshtein' | 'jaro_winkler' | 'ngram'

export type SuggestSort = 'score' | 'frequency'

export interface TermSuggester {
  lowercase_terms: boolean
  max_edits: integer
  max_inspections: integer
  max_term_freq: float
  min_doc_freq: float
  min_word_length: integer
  prefix_length: integer
  shard_size: integer
  sort: SuggestSort
  string_distance: StringDistance
  suggest_mode: SuggestMode
  text: string
}

export interface ValidateQueryRequest extends RequestBase {
  index?: Indices
  type?: TypeNames
  allow_no_indices?: boolean
  all_shards?: boolean
  analyzer?: string
  analyze_wildcard?: boolean
  default_operator?: DefaultOperator
  df?: string
  expand_wildcards?: ExpandWildcards
  explain?: boolean
  ignore_unavailable?: boolean
  lenient?: boolean
  query_on_query_string?: string
  rewrite?: boolean
  body?: {
    query?: QueryContainer
  }
}

export interface ValidateQueryResponse extends ResponseBase {
  explanations: Array<ValidationExplanation>
  _shards: ShardStatistics
  valid: boolean
}

export interface ValidationExplanation {
  error: string
  explanation: string
  index: string
  valid: boolean
}

export interface AsyncSearchDeleteRequest extends RequestBase {
  id: Id
}

export interface AsyncSearchDeleteResponse extends AcknowledgedResponseBase {
}

export interface AsyncSearchGetRequest extends RequestBase {
  id: Id
  body?: {
    keep_alive?: Time
    typed_keys?: boolean
    wait_for_completion_timeout?: Time
  }
}

export interface AsyncSearchGetResponse<TDocument = unknown> extends ResponseBase {
}

export interface AsyncSearchSubmitRequest extends RequestBase {
  index?: Indices
  body?: {
    aggs?: Record<string, AggregationContainer>
    allow_no_indices?: boolean
    allow_partial_search_results?: boolean
    analyzer?: string
    analyze_wildcard?: boolean
    batched_reduce_size?: long
    collapse?: FieldCollapse
    default_operator?: DefaultOperator
    df?: string
    docvalue_fields?: Array<Field>
    expand_wildcards?: ExpandWildcards
    explain?: boolean
    from?: integer
    highlight?: Highlight
    ignore_throttled?: boolean
    ignore_unavailable?: boolean
    indices_boost?: Record<IndexName, double>
    keep_alive?: Time
    keep_on_completion?: boolean
    lenient?: boolean
    max_concurrent_shard_requests?: long
    min_score?: double
    post_filter?: QueryContainer
    preference?: string
    profile?: boolean
    query?: QueryContainer
    query_on_query_string?: string
    request_cache?: boolean
    rescore?: Array<Rescore>
    routing?: Routing
    script_fields?: Record<string, ScriptField>
    search_after?: Array<any>
    search_type?: SearchType
    sequence_number_primary_term?: boolean
    size?: integer
    sort?: Array<Sort>
    _source?: boolean | SourceFilter
    stats?: Array<string>
    stored_fields?: Array<Field>
    suggest?: Record<string, SuggestBucket>
    suggest_field?: Field
    suggest_mode?: SuggestMode
    suggest_size?: long
    suggest_text?: string
    terminate_after?: long
    timeout?: string
    track_scores?: boolean
    track_total_hits?: boolean
    typed_keys?: boolean
    version?: boolean
    wait_for_completion_timeout?: Time
  }
}

export interface AsyncSearchSubmitResponse<TDocument = unknown> extends ResponseBase {
}

export interface CreateAutoFollowPatternRequest extends RequestBase {
  name: Name
  body: {
    follow_index_pattern?: string
    leader_index_patterns?: Array<string>
    max_outstanding_read_requests?: long
    max_outstanding_write_requests?: integer
    max_poll_timeout?: Time
    max_read_request_operation_count?: integer
    max_read_request_size?: string
    max_retry_delay?: Time
    max_write_buffer_count?: integer
    max_write_buffer_size?: string
    max_write_request_operation_count?: integer
    max_write_request_size?: string
    remote_cluster?: string
  }
}

export interface CreateAutoFollowPatternResponse extends AcknowledgedResponseBase {
}

export interface DeleteAutoFollowPatternRequest extends RequestBase {
  name: Name
}

export interface DeleteAutoFollowPatternResponse extends AcknowledgedResponseBase {
}

export interface AutoFollowPattern {
  follow_index_pattern: string
  leader_index_patterns: Array<string>
  max_outstanding_read_requests: long
  max_outstanding_write_requests: integer
  read_poll_timeout: Time
  max_read_request_operation_count: integer
  max_read_request_size: string
  max_retry_delay: Time
  max_write_buffer_count: integer
  max_write_buffer_size: string
  max_write_request_operation_count: integer
  max_write_request_size: string
  remote_cluster: string
}

export interface GetAutoFollowPatternRequest extends RequestBase {
  name?: Name
}

export interface GetAutoFollowPatternResponse extends ResponseBase {
  patterns: Record<string, AutoFollowPattern>
}

export interface PauseAutoFollowPatternRequest extends RequestBase {
  name: Name
}

export interface PauseAutoFollowPatternResponse extends AcknowledgedResponseBase {
}

export interface ResumeAutoFollowPatternRequest extends RequestBase {
  name: Name
}

export interface ResumeAutoFollowPatternResponse extends AcknowledgedResponseBase {
}

export interface CreateFollowIndexRequest extends RequestBase {
  index: IndexName
  wait_for_active_shards?: string
  body: {
    leader_index?: IndexName
    max_outstanding_read_requests?: long
    max_outstanding_write_requests?: long
    max_read_request_operation_count?: long
    max_read_request_size?: string
    max_retry_delay?: Time
    max_write_buffer_count?: long
    max_write_buffer_size?: string
    max_write_request_operation_count?: long
    max_write_request_size?: string
    read_poll_timeout?: Time
    remote_cluster?: string
  }
}

export interface CreateFollowIndexResponse extends ResponseBase {
  follow_index_created: boolean
  follow_index_shards_acked: boolean
  index_following_started: boolean
}

export interface FollowIndexReadException {
  exception: ErrorCause
  from_seq_no: long
  retries: integer
}

export interface FollowIndexShardStats {
  bytes_read: long
  failed_read_requests: long
  failed_write_requests: long
  fatal_exception: ErrorCause
  follower_aliases_version: long
  follower_global_checkpoint: long
  follower_index: string
  follower_mapping_version: long
  follower_max_seq_no: long
  follower_settings_version: long
  last_requested_seq_no: long
  leader_global_checkpoint: long
  leader_index: string
  leader_max_seq_no: long
  operations_read: long
  operations_written: long
  outstanding_read_requests: integer
  outstanding_write_requests: integer
  read_exceptions: Array<FollowIndexReadException>
  remote_cluster: string
  shard_id: integer
  successful_read_requests: long
  successful_write_requests: long
  time_since_last_read_millis: long
  total_read_remote_exec_time_millis: long
  total_read_time_millis: long
  total_write_time_millis: long
  write_buffer_operation_count: long
  write_buffer_size_in_bytes: long
}

export interface FollowIndexStats {
  index: string
  shards: Array<FollowIndexShardStats>
}

export interface FollowIndexStatsRequest extends RequestBase {
  index: Indices
}

export interface FollowIndexStatsResponse extends ResponseBase {
  indices: Array<FollowIndexStats>
}

export interface FollowConfig {
  max_outstanding_read_requests: integer
  max_outstanding_write_requests: integer
  max_read_request_operation_count: integer
  max_read_request_size: string
  max_retry_delay: Time
  max_write_buffer_count: integer
  max_write_buffer_size: string
  max_write_request_operation_count: integer
  max_write_request_size: string
  read_poll_timeout: Time
}

export type FollowerIndexStatus = 'active' | 'paused'

export interface FollowerInfo {
  follower_index: string
  leader_index: string
  parameters: FollowConfig
  remote_cluster: string
  status: FollowerIndexStatus
}

export interface FollowInfoRequest extends RequestBase {
  index: Indices
}

export interface FollowInfoResponse extends ResponseBase {
  follower_indices: Array<FollowerInfo>
}

export interface ForgetFollowerIndexRequest extends RequestBase {
  index: IndexName
  body: {
    follower_cluster?: string
    follower_index?: IndexName
    follower_index_uuid?: string
    leader_remote_cluster?: string
  }
}

export interface ForgetFollowerIndexResponse extends ResponseBase {
  _shards: ShardStatistics
}

export interface PauseFollowIndexRequest extends RequestBase {
  index: IndexName
}

export interface PauseFollowIndexResponse extends AcknowledgedResponseBase {
}

export interface ResumeFollowIndexRequest extends RequestBase {
  index: IndexName
  body?: {
    max_outstanding_read_requests?: long
    max_outstanding_write_requests?: long
    max_read_request_operation_count?: long
    max_read_request_size?: string
    max_retry_delay?: Time
    max_write_buffer_count?: long
    max_write_buffer_size?: string
    max_write_request_operation_count?: long
    max_write_request_size?: string
    read_poll_timeout?: Time
  }
}

export interface ResumeFollowIndexResponse extends AcknowledgedResponseBase {
}

export interface UnfollowIndexRequest extends RequestBase {
  index: IndexName
}

export interface UnfollowIndexResponse extends AcknowledgedResponseBase {
}

export interface AutoFollowedCluster {
  cluster_name: string
  last_seen_metadata_version: long
  time_since_last_check_millis: Date
}

export interface CcrAutoFollowStats {
  auto_followed_clusters: Array<AutoFollowedCluster>
  number_of_failed_follow_indices: long
  number_of_failed_remote_cluster_state_requests: long
  number_of_successful_follow_indices: long
  recent_auto_follow_errors: Array<ErrorCause>
}

export interface CcrFollowStats {
  indices: Array<FollowIndexStats>
}

export interface CcrStatsRequest extends RequestBase {
}

export interface CcrStatsResponse extends ResponseBase {
  auto_follow_stats: CcrAutoFollowStats
  follow_stats: CcrFollowStats
}

export interface EnrichPolicy {
  enrich_fields: Array<Field>
  indices: Indices
  match_field: Field
  query: string
}

export interface NamedPolicy extends EnrichPolicy {
  name: string
}

export interface NamedPolicyConfig {
  geo_match: NamedPolicy
  match: NamedPolicy
}

export interface NamedPolicyMetadata {
  config: NamedPolicyConfig
}

export interface DeleteEnrichPolicyRequest extends RequestBase {
  name: Name
}

export interface DeleteEnrichPolicyResponse extends AcknowledgedResponseBase {
}

export type EnrichPolicyPhase = 'SCHEDULED' | 'RUNNING' | 'COMPLETE' | 'FAILED'

export interface ExecuteEnrichPolicyRequest extends RequestBase {
  name: Name
  wait_for_completion?: boolean
}

export interface ExecuteEnrichPolicyResponse extends ResponseBase {
  status: ExecuteEnrichPolicyStatus
  task_id: TaskId
}

export interface ExecuteEnrichPolicyStatus {
  phase: EnrichPolicyPhase
}

export interface GetEnrichPolicyRequest extends RequestBase {
  name?: Names
}

export interface GetEnrichPolicyResponse extends ResponseBase {
  policies: Array<NamedPolicyMetadata>
}

export interface PutEnrichPolicyRequest extends RequestBase {
  name: Name
  body: {
    geo_match?: EnrichPolicy
    match?: EnrichPolicy
  }
}

export interface PutEnrichPolicyResponse extends AcknowledgedResponseBase {
}

export interface CoordinatorStats {
  executed_searches_total: long
  node_id: string
  queue_size: integer
  remote_requests_current: integer
  remote_requests_total: long
}

export interface EnrichStatsRequest extends RequestBase {
}

export interface EnrichStatsResponse extends ResponseBase {
  coordinator_stats: Array<CoordinatorStats>
  executing_policies: Array<ExecutingPolicy>
}

export interface ExecutingPolicy {
  name: string
  task: TaskInfo
}

export interface GraphExploreRequest extends RequestBase {
  index: Indices
  type?: TypeNames
  routing?: Routing
  timeout?: Time
  body?: {
    connections?: Hop
    controls?: GraphExploreControls
    query?: QueryContainer
    vertices?: Array<GraphVertexDefinition>
  }
}

export interface GraphExploreResponse extends ResponseBase {
  connections: Array<GraphConnection>
  failures: Array<ShardFailure>
  timed_out: boolean
  took: long
  vertices: Array<GraphVertex>
}

export interface GraphExploreControls {
  sample_diversity: SampleDiversity
  sample_size: integer
  timeout: Time
  use_significance: boolean
}

export interface GraphVertexDefinition {
  exclude: Array<string>
  field: Field
  include: Array<GraphVertexInclude>
  min_doc_count: long
  shard_min_doc_count: long
  size: integer
}

export interface GraphVertexInclude {
  boost: double
  term: string
}

export interface Hop {
  connections: Hop
  query: QueryContainer
  vertices: Array<GraphVertexDefinition>
}

export interface SampleDiversity {
  field: Field
  max_docs_per_value: integer
}

export interface GraphConnection {
  doc_count: long
  source: long
  target: long
  weight: double
}

export interface GraphVertex {
  depth: long
  field: string
  term: string
  weight: double
}

export interface Phase {
  actions: Record<string, LifecycleAction>
  min_age: Time
}

export interface Phases {
  cold: Phase
  delete: Phase
  hot: Phase
  warm: Phase
}

export interface Policy {
  phases: Phases
}

export interface LifecycleAction {
}

export interface DeleteLifecycleRequest extends RequestBase {
  policy: Name
}

export interface DeleteLifecycleResponse extends AcknowledgedResponseBase {
}

export interface ExplainLifecycleRequest extends RequestBase {
  index: IndexName
  only_errors?: boolean
  only_managed?: boolean
}

export interface ExplainLifecycleResponse extends ResponseBase {
  indices: Record<string, LifecycleExplain>
}

export interface LifecycleExplain {
  action: string
  action_time_millis: Date
  age: Time
  failed_step: string
  failed_step_retry_count: integer
  index: IndexName
  is_auto_retryable_error: boolean
  lifecycle_date_millis: Date
  managed: boolean
  phase: string
  phase_time_millis: Date
  policy: string
  step: string
  step_info: Record<string, any>
  step_time_millis: Date
}

export interface GetLifecycleRequest extends RequestBase {
  policy?: Name
}

export interface GetLifecycleResponse extends DictionaryResponseBase<string, LifecyclePolicy> {
}

export interface LifecyclePolicy {
  modified_date: Date
  policy: Policy
  version: integer
}

export interface GetIlmStatusRequest extends RequestBase {
}

export interface GetIlmStatusResponse extends ResponseBase {
  operation_mode: LifecycleOperationMode
}

export type LifecycleOperationMode = 'RUNNING' | 'STOPPING' | 'STOPPED'

export interface MoveToStepRequest extends RequestBase {
  index: IndexName
  body?: {
    current_step?: StepKey
    next_step?: StepKey
  }
}

export interface MoveToStepResponse extends AcknowledgedResponseBase {
}

export interface StepKey {
  action: string
  name: string
  phase: string
}

export interface PutLifecycleRequest extends RequestBase {
  policy: Name
  body?: {
    policy?: Policy
  }
}

export interface PutLifecycleResponse extends AcknowledgedResponseBase {
}

export interface RemovePolicyRequest extends RequestBase {
  index: IndexName
}

export interface RemovePolicyResponse extends ResponseBase {
  failed_indexes: Array<string>
  has_failures: boolean
}

export interface RetryIlmRequest extends RequestBase {
  index: IndexName
}

export interface RetryIlmResponse extends AcknowledgedResponseBase {
}

export interface StartIlmRequest extends RequestBase {
}

export interface StartIlmResponse extends AcknowledgedResponseBase {
}

export interface StopIlmRequest extends RequestBase {
}

export interface StopIlmResponse extends AcknowledgedResponseBase {
}

export interface MinimalLicenseInformation {
  expiry_date_in_millis: long
  mode: LicenseType
  status: LicenseStatus
  type: LicenseType
  uid: string
}

export interface NativeCodeInformation {
  build_hash: string
  version: string
}

export interface XPackBuildInformation {
  date: Date
  hash: string
}

export interface XPackFeature {
  available: boolean
  description: string
  enabled: boolean
  native_code_info: NativeCodeInformation
}

export interface XPackFeatures {
  analytics: XPackFeature
  ccr: XPackFeature
  data_frame: XPackFeature
  data_science: XPackFeature
  enrich: XPackFeature
  flattened: XPackFeature
  frozen_indices: XPackFeature
  graph: XPackFeature
  ilm: XPackFeature
  logstash: XPackFeature
  ml: XPackFeature
  monitoring: XPackFeature
  rollup: XPackFeature
  security: XPackFeature
  slm: XPackFeature
  spatial: XPackFeature
  sql: XPackFeature
  transform: XPackFeature
  vectors: XPackFeature
  voting_only: XPackFeature
  watcher: XPackFeature
}

export interface XPackInfoRequest extends RequestBase {
  categories?: Array<string>
}

export interface XPackInfoResponse extends ResponseBase {
  build: XPackBuildInformation
  features: XPackFeatures
  license: MinimalLicenseInformation
  tagline: string
}

export interface AlertingCount {
  active: long
  total: long
}

export interface AlertingExecution {
  actions: Record<string, ExecutionAction>
}

export interface AlertingInput {
  input: Record<string, AlertingCount>
  trigger: Record<string, AlertingCount>
}

export interface AlertingUsage extends XPackUsage {
  count: AlertingCount
  execution: AlertingExecution
  watch: AlertingInput
}

export interface AuditUsage extends SecurityFeatureToggle {
  outputs: Array<string>
}

export interface CcrUsage extends XPackUsage {
  auto_follow_patterns_count: integer
  follower_indices_count: integer
}

export interface DataFeed {
  count: long
}

export interface ExecutionAction {
  total: long
  total_in_ms: long
}

export interface FlattenedUsage extends XPackUsage {
  field_count: integer
}

export interface IlmPolicyStatistics {
  indices_managed: integer
  phases: Phases
}

export interface IlmUsage {
  policy_count: integer
  policy_stats: Array<IlmPolicyStatistics>
}

export interface IpFilterUsage {
  http: boolean
  transport: boolean
}

export interface Job {
  allow_lazy_open: boolean
  analysis_config: AnalysisConfig
  analysis_limits: AnalysisLimits
  background_persist_interval: Time
  create_time: Date
  data_description: DataDescription
  description: string
  finished_time: Date
  job_id: string
  job_type: string
  model_plot: ModelPlotConfig
  model_snapshot_id: string
  model_snapshot_retention_days: long
  renormalization_window_days: long
  results_index_name: string
  results_retention_days: long
}

export interface JobStatistics {
  avg: double
  max: double
  min: double
  total: double
}

export interface MachineLearningUsage extends XPackUsage {
  datafeeds: Record<string, DataFeed>
  jobs: Record<string, Job>
  node_count: integer
}

export interface MonitoringUsage extends XPackUsage {
  collection_enabled: boolean
  enabled_exporters: Record<string, long>
}

export interface QueryUsage {
  count: integer
  failed: integer
  paging: integer
  total: integer
}

export interface RealmUsage extends XPackUsage {
  name: Array<string>
  order: Array<long>
  size: Array<long>
}

export interface RoleMappingUsage {
  enabled: integer
  size: integer
}

export interface RoleUsage {
  dls: boolean
  fls: boolean
  size: long
}

export interface SecurityFeatureToggle {
  enabled: boolean
}

export interface SecurityUsage extends XPackUsage {
  anonymous: SecurityFeatureToggle
  audit: AuditUsage
  ipfilter: IpFilterUsage
  realms: Record<string, RealmUsage>
  role_mapping: Record<string, RoleMappingUsage>
  roles: Record<string, RoleUsage>
  ssl: SslUsage
  system_key: SecurityFeatureToggle
}

export interface SlmUsage extends XPackUsage {
  policy_count: integer
  policy_stats: SnapshotLifecycleStats
}

export interface SnapshotLifecycleStats {
  retention_deletion_time: string
  retention_deletion_time_millis: long
  retention_failed: long
  retention_runs: long
  retention_timed_out: long
  total_snapshots_deleted: long
  total_snapshot_deletion_failures: long
  total_snapshots_failed: long
  total_snapshots_taken: long
}

export interface SqlUsage extends XPackUsage {
  features: Record<string, integer>
  queries: Record<string, QueryUsage>
}

export interface SslUsage {
  http: SecurityFeatureToggle
  transport: SecurityFeatureToggle
}

export interface VectorUsage extends XPackUsage {
  dense_vector_dims_avg_count: integer
  dense_vector_fields_count: integer
  sparse_vector_fields_count: integer
}

export interface XPackUsage {
  available: boolean
  enabled: boolean
}

export interface XPackUsageRequest extends RequestBase {
  master_timeout?: Time
}

export interface XPackUsageResponse extends ResponseBase {
  watcher: AlertingUsage
  ccr: CcrUsage
  data_frame: XPackUsage
  data_science: XPackUsage
  enrich: XPackUsage
  flattened: FlattenedUsage
  graph: XPackUsage
  ilm: IlmUsage
  logstash: XPackUsage
  ml: MachineLearningUsage
  monitoring: MonitoringUsage
  rollup: XPackUsage
  security: SecurityUsage
  slm: SlmUsage
  sql: SqlUsage
  transform: XPackUsage
  vectors: VectorUsage
  voting_only: XPackUsage
}

export interface DeleteLicenseRequest extends RequestBase {
}

export interface DeleteLicenseResponse extends ResponseBase {
}

export interface GetBasicLicenseStatusRequest extends RequestBase {
}

export interface GetBasicLicenseStatusResponse extends ResponseBase {
  eligible_to_start_basic: boolean
}

export interface GetLicenseRequest extends RequestBase {
  accept_enterprise?: boolean
  local?: boolean
}

export interface GetLicenseResponse extends ResponseBase {
  license: LicenseInformation
}

export interface License {
  expiry_date_in_millis: long
  issue_date_in_millis: long
  issued_to: string
  issuer: string
  max_nodes: long
  signature: string
  type: LicenseType
  uid: string
}

export interface LicenseInformation {
  expiry_date: Date
  expiry_date_in_millis: long
  issue_date: Date
  issue_date_in_millis: long
  issued_to: string
  issuer: string
  max_nodes: long
  max_resource_units: integer
  status: LicenseStatus
  type: LicenseType
  uid: string
  expirty_date_in_millis: long
  start_date_in_millis: long
}

export type LicenseStatus = 'active' | 'valid' | 'invalid' | 'expired'

export type LicenseType = 'missing' | 'trial' | 'basic' | 'standard' | 'dev' | 'silver' | 'gold' | 'platinum' | 'enterprise'

export interface GetTrialLicenseStatusRequest extends RequestBase {
}

export interface GetTrialLicenseStatusResponse extends ResponseBase {
  eligible_to_start_trial: boolean
}

export interface LicenseAcknowledgement {
  license: Array<string>
  message: string
}

export interface PostLicenseRequest extends RequestBase {
  acknowledge?: boolean
  body?: {
    license?: License
  }
}

export interface PostLicenseResponse extends ResponseBase {
  acknowledge: LicenseAcknowledgement
  acknowledged: boolean
  license_status: LicenseStatus
}

export interface StartBasicLicenseRequest extends RequestBase {
  acknowledge?: boolean
}

export interface StartBasicLicenseResponse extends AcknowledgedResponseBase {
  acknowledge: Record<string, Array<string>>
  basic_was_started: boolean
  error_message: string
}

export interface StartTrialLicenseRequest extends RequestBase {
  acknowledge?: boolean
  type_query_string?: string
}

export interface StartTrialLicenseResponse extends AcknowledgedResponseBase {
  error_message: string
  trial_was_started: boolean
}

export interface CloseJobRequest extends RequestBase {
  job_id: Id
  allow_no_jobs?: boolean
  force?: boolean
  timeout?: Time
}

export interface CloseJobResponse extends ResponseBase {
  closed: boolean
}

export interface ChunkingConfig {
  mode: ChunkingMode
  time_span: Time
}

export type ChunkingMode = 'auto' | 'manual' | 'off'

export interface DatafeedConfig {
  aggregations: Record<string, AggregationContainer>
  chunking_config: ChunkingConfig
  datafeed_id: string
  frequency: Time
  indices: Indices
  job_id: string
  max_empty_searches: integer
  query: QueryContainer
  query_delay: Time
  script_fields: Record<string, ScriptField>
  scroll_size: integer
}

export type DatafeedState = 'started' | 'stopped' | 'starting' | 'stopping'

export interface DatafeedStats {
  assignment_explanation: string
  datafeed_id: string
  node: DiscoveryNode
  state: DatafeedState
  timing_stats: DatafeedTimingStats
}

export interface DatafeedTimingStats {
  bucket_count: long
  exponential_average_search_time_per_hour_ms: double
  job_id: string
  search_count: long
  total_search_time_ms: double
}

export interface DiscoveryNode {
  attributes: Record<string, string>
  ephemeral_id: string
  id: string
  name: string
  transport_address: string
}

export interface DeleteCalendarRequest extends RequestBase {
  calendar_id: Id
}

export interface DeleteCalendarResponse extends AcknowledgedResponseBase {
}

export interface DeleteCalendarEventRequest extends RequestBase {
  calendar_id: Id
  event_id: Id
}

export interface DeleteCalendarEventResponse extends AcknowledgedResponseBase {
}

export interface DeleteCalendarJobRequest extends RequestBase {
  calendar_id: Id
  job_id: Id
}

export interface DeleteCalendarJobResponse extends ResponseBase {
  calendar_id: string
  description: string
  job_ids: Array<Id>
}

export interface DeleteDatafeedRequest extends RequestBase {
  datafeed_id: Id
  force?: boolean
}

export interface DeleteDatafeedResponse extends AcknowledgedResponseBase {
}

export interface DeleteExpiredDataRequest extends RequestBase {
}

export interface DeleteExpiredDataResponse extends ResponseBase {
  deleted: boolean
}

export interface DeleteFilterRequest extends RequestBase {
  filter_id: Id
}

export interface DeleteFilterResponse extends AcknowledgedResponseBase {
}

export interface DeleteForecastRequest extends RequestBase {
  job_id: Id
  forecast_id?: Id
  allow_no_forecasts?: boolean
  timeout?: Time
}

export interface DeleteForecastResponse extends AcknowledgedResponseBase {
}

export interface DeleteJobRequest extends RequestBase {
  job_id: Id
  force?: boolean
  wait_for_completion?: boolean
}

export interface DeleteJobResponse extends AcknowledgedResponseBase {
}

export interface DeleteModelSnapshotRequest extends RequestBase {
  job_id: Id
  snapshot_id: Id
}

export interface DeleteModelSnapshotResponse extends AcknowledgedResponseBase {
}

export interface EstimateModelMemoryRequest extends RequestBase {
  body: {
    analysis_config?: AnalysisConfig
    max_bucket_cardinality?: Record<Field, long>
    overall_cardinality?: Record<Field, long>
  }
}

export interface EstimateModelMemoryResponse extends ResponseBase {
  model_memory_estimate: string
}

export interface FlushJobRequest extends RequestBase {
  job_id: Id
  skip_time?: string
  body?: {
    advance_time?: Date
    calc_interim?: boolean
    end?: Date
    start?: Date
  }
}

export interface FlushJobResponse extends ResponseBase {
  flushed: boolean
}

export interface ForecastJobRequest extends RequestBase {
  job_id: Id
  body?: {
    duration?: Time
    expires_in?: Time
  }
}

export interface ForecastJobResponse extends AcknowledgedResponseBase {
  forecast_id: string
}

export interface GetAnomalyRecordsRequest extends RequestBase {
  job_id: Id
  body?: {
    desc?: boolean
    end?: Date
    exclude_interim?: boolean
    page?: Page
    record_score?: double
    sort?: Field
    start?: Date
  }
}

export interface GetAnomalyRecordsResponse extends ResponseBase {
  count: long
  records: Array<AnomalyRecord>
}

export interface GetBucketsRequest extends RequestBase {
  job_id: Id
  timestamp?: Id
  body?: {
    anomaly_score?: double
    desc?: boolean
    end?: Date
    exclude_interim?: boolean
    expand?: boolean
    page?: Page
    sort?: Field
    start?: Date
  }
}

export interface GetBucketsResponse extends ResponseBase {
  buckets: Array<ResultBucket>
  count: long
}

export interface GetCalendarEventsRequest extends RequestBase {
  calendar_id: Id
  end?: Date
  job_id?: string
  start?: string
  body?: {
    from?: integer
    size?: integer
  }
}

export interface GetCalendarEventsResponse extends ResponseBase {
  count: integer
  events: Array<ScheduledEvent>
}

export interface Calendar {
  calendar_id: string
  description: string
  job_ids: Array<string>
}

export interface GetCalendarsRequest extends RequestBase {
  calendar_id?: Id
  body?: {
    page?: Page
  }
}

export interface GetCalendarsResponse extends ResponseBase {
  calendars: Array<Calendar>
  count: long
}

export interface GetCategoriesRequest extends RequestBase {
  job_id: Id
  category_id?: CategoryId
  body?: {
    page?: Page
  }
}

export interface GetCategoriesResponse extends ResponseBase {
  categories: Array<CategoryDefinition>
  count: long
}

export interface GetDatafeedStatsRequest extends RequestBase {
  datafeed_id?: Id
  allow_no_datafeeds?: boolean
}

export interface GetDatafeedStatsResponse extends ResponseBase {
  count: long
  datafeeds: Array<DatafeedStats>
}

export interface GetDatafeedsRequest extends RequestBase {
  datafeed_id?: Id
  allow_no_datafeeds?: boolean
}

export interface GetDatafeedsResponse extends ResponseBase {
  count: long
  datafeeds: Array<DatafeedConfig>
}

export interface Filter {
  description: string
  filter_id: string
  items: Array<string>
}

export interface GetFiltersRequest extends RequestBase {
  filter_id?: Id
  from?: integer
  size?: integer
}

export interface GetFiltersResponse extends ResponseBase {
  count: long
  filters: Array<Filter>
}

export interface GetInfluencersRequest extends RequestBase {
  job_id: Id
  body?: {
    descending?: boolean
    end?: Date
    exclude_interim?: boolean
    influencer_score?: double
    page?: Page
    sort?: Field
    start?: Date
  }
}

export interface GetInfluencersResponse extends ResponseBase {
  count: long
  influencers: Array<BucketInfluencer>
}

export interface GetJobStatsRequest extends RequestBase {
  job_id?: Id
  allow_no_jobs?: boolean
}

export interface GetJobStatsResponse extends ResponseBase {
  count: long
  jobs: Array<JobStats>
}

export interface GetJobsRequest extends RequestBase {
  job_id?: Id
  allow_no_jobs?: boolean
}

export interface GetJobsResponse extends ResponseBase {
  count: long
  jobs: Array<Job>
}

export interface GetModelSnapshotsRequest extends RequestBase {
  job_id: Id
  snapshot_id?: Id
  body?: {
    desc?: boolean
    end?: Date
    page?: Page
    sort?: Field
    start?: Date
  }
}

export interface GetModelSnapshotsResponse extends ResponseBase {
  count: long
  model_snapshots: Array<ModelSnapshot>
}

export interface GetOverallBucketsRequest extends RequestBase {
  job_id: Id
  body?: {
    allow_no_jobs?: boolean
    bucket_span?: Time
    end?: Date
    exclude_interim?: boolean
    overall_score?: double
    start?: Date
    top_n?: integer
  }
}

export interface GetOverallBucketsResponse extends ResponseBase {
  count: long
  overall_buckets: Array<OverallBucket>
}

export interface Page {
  from: integer
  size: integer
}

export interface AnalysisConfig {
  bucket_span: Time
  categorization_field_name: Field
  categorization_filters: Array<string>
  detectors: Array<Detector>
  influencers: Array<Field>
  latency: Time
  multivariate_by_fields: boolean
  summary_count_field_name: Field
}

export interface AnalysisLimits {
  categorization_examples_limit: long
  model_memory_limit: string
}

export interface AnalysisMemoryLimit {
  model_memory_limit: string
}

export interface DataDescription {
  format: string
  time_field: Field
  time_format: string
}

export interface JobForecastStatistics {
  memory_bytes: JobStatistics
  processing_time_ms: JobStatistics
  records: JobStatistics
  status: Record<string, long>
  total: long
}

export type JobState = 'closing' | 'closed' | 'opened' | 'failed' | 'opening'

export interface JobStats {
  assignment_explanation: string
  data_counts: DataCounts
  forecasts_stats: JobForecastStatistics
  job_id: string
  model_size_stats: ModelSizeStats
  node: DiscoveryNode
  open_time: Time
  state: JobState
  timing_stats: TimingStats
}

export type MemoryStatus = 'ok' | 'soft_limit' | 'hard_limit'

export interface ModelPlotConfig {
  terms: Array<Field>
}

export interface ModelPlotConfigEnabled {
  enabled: boolean
}

export interface TimingStats {
  average_bucket_processing_time_ms: double
  bucket_count: long
  exponential_average_bucket_processing_time_ms: double
  exponential_average_bucket_processing_time_per_hour_ms: double
  job_id: string
  maximum_bucket_processing_time_ms: double
  minimum_bucket_processing_time_ms: double
}

export type AppliesTo = 'actual' | 'typical' | 'diff_from_typical' | 'time'

export type ConditionOperator = 'gt' | 'gte' | 'lt' | 'lte'

export interface DetectionRule {
  actions: Array<RuleAction>
  conditions: Array<RuleCondition>
  scope: Record<Field, FilterRef>
}

export interface Detector {
  custom_rules: Array<DetectionRule>
  detector_description: string
  detector_index: integer
  exclude_frequent: ExcludeFrequent
  function: string
  use_null: boolean
}

export interface FilterRef {
  filter_id: Id
  filter_type: RuleFilterType
}

export type RuleAction = 'skip_result' | 'skip_model_update'

export interface RuleCondition {
  applies_to: AppliesTo
  operator: ConditionOperator
  value: double
}

export type RuleFilterType = 'include' | 'exclude'

export interface DataCounts {
  bucket_count: long
  earliest_record_timestamp: Date
  empty_bucket_count: long
  input_bytes: long
  input_field_count: long
  input_record_count: long
  invalid_date_count: long
  job_id: string
  last_data_time: Date
  latest_empty_bucket_timestamp: Date
  latest_record_timestamp: Date
  latest_sparse_bucket_timestamp: Date
  missing_field_count: long
  out_of_order_timestamp_count: long
  processed_field_count: long
  processed_record_count: long
  sparse_bucket_count: long
}

export interface ModelSizeStats {
  bucket_allocation_failures_count: long
  job_id: string
  log_time: Date
  memory_status: MemoryStatus
  model_bytes: long
  result_type: string
  timestamp: Date
  total_by_field_count: long
  total_over_field_count: long
  total_partition_field_count: long
}

export interface ModelSnapshot {
  description: string
  job_id: string
  latest_record_time_stamp: Date
  latest_result_time_stamp: Date
  model_size_stats: ModelSizeStats
  retain: boolean
  snapshot_doc_count: long
  snapshot_id: string
  timestamp: Date
}

export interface AnomalyCause {
  actual: Array<double>
  by_field_name: string
  by_field_value: string
  correlated_by_field_value: string
  field_name: string
  function: string
  function_description: string
  influencers: Array<Influence>
  over_field_name: string
  over_field_value: string
  partition_field_name: string
  partition_field_value: string
  probability: double
  typical: Array<double>
}

export interface AnomalyRecord {
  actual: Array<double>
  bucket_span: Time
  by_field_name: string
  by_field_value: string
  causes: Array<AnomalyCause>
  detector_index: integer
  field_name: string
  function: string
  function_description: string
  influencers: Array<Influence>
  initial_record_score: double
  is_interim: boolean
  job_id: string
  over_field_name: string
  over_field_value: string
  partition_field_name: string
  partition_field_value: string
  probability: double
  record_score: double
  result_type: string
  timestamp: Date
  typical: Array<double>
}

export interface BucketInfluencer {
  bucket_span: long
  influencer_field_name: string
  influencer_field_value: string
  influencer_score: double
  initial_influencer_score: double
  is_interim: boolean
  job_id: string
  probability: double
  result_type: string
  timestamp: Date
}

export interface CategoryDefinition {
  category_id: long
  examples: Array<string>
  job_id: string
  max_matching_length: long
  regex: string
  terms: string
}

export interface Influence {
  influencer_field_name: string
  influencer_field_values: Array<string>
}

export interface OverallBucket {
  bucket_span: long
  is_interim: boolean
  jobs: Array<OverallBucketJobInfo>
  overall_score: double
  result_type: string
  timestamp: Date
}

export interface OverallBucketJobInfo {
  job_id: string
  max_anomaly_score: double
}

export interface PartitionScore {
  initial_record_score: double
  partition_field_name: string
  partition_field_value: string
  probability: double
  record_score: double
}

export interface ResultBucket {
  anomaly_score: double
  bucket_influencers: Array<BucketInfluencer>
  bucket_span: Time
  event_count: long
  initial_anomaly_score: double
  is_interim: boolean
  job_id: string
  partition_scores: Array<PartitionScore>
  processing_time_ms: double
  result_type: string
  timestamp: Date
}

export interface AnomalyDetectors {
  categorization_analyzer: CategorizationAnalyzer
  categorization_examples_limit: integer
  model_memory_limit: string
  model_snapshot_retention_days: integer
}

export interface CategorizationAnalyzer {
  filter: Array<ITokenFilter>
  tokenizer: string
}

export interface Datafeeds {
  scroll_size: integer
}

export interface Defaults {
  anomaly_detectors: AnomalyDetectors
  datafeeds: Datafeeds
}

export interface Limits {
  max_model_memory_limit: string
}

export interface MachineLearningInfoRequest extends RequestBase {
}

export interface MachineLearningInfoResponse extends ResponseBase {
  defaults: Defaults
  limits: Limits
  upgrade_mode: boolean
}

export interface OpenJobRequest extends RequestBase {
  job_id: Id
  body?: {
    timeout?: Time
  }
}

export interface OpenJobResponse extends ResponseBase {
  opened: boolean
}

export interface PostCalendarEventsRequest extends RequestBase {
  calendar_id: Id
  body: {
    events?: Array<ScheduledEvent>
  }
}

export interface PostCalendarEventsResponse extends ResponseBase {
  events: Array<ScheduledEvent>
}

export interface ScheduledEvent {
  calendar_id: Id
  description: string
  end_time: Date
  event_id: Id
  start_time: Date
}

export interface PostJobDataRequest extends RequestBase {
  job_id: Id
  reset_end?: Date
  reset_start?: Date
  body: {
    data?: Array<any>
  }
}

export interface PostJobDataResponse extends ResponseBase {
  bucket_count: long
  earliest_record_timestamp: Date
  empty_bucket_count: long
  input_bytes: long
  input_field_count: long
  input_record_count: long
  invalid_date_count: long
  job_id: string
  last_data_time: Date
  latest_record_timestamp: Date
  missing_field_count: long
  out_of_order_timestamp_count: long
  processed_field_count: long
  processed_record_count: long
  sparse_bucket_count: long
}

export interface PreviewDatafeedRequest extends RequestBase {
  datafeed_id: Id
}

export interface PreviewDatafeedResponse<TDocument = unknown> extends ResponseBase {
  data: Array<TDocument>
}

export interface PutCalendarRequest extends RequestBase {
  calendar_id: Id
  body?: {
    description?: string
  }
}

export interface PutCalendarResponse extends ResponseBase {
  calendar_id: string
  description: string
  job_ids: Array<string>
}

export interface PutCalendarJobRequest extends RequestBase {
  calendar_id: Id
  job_id: Id
}

export interface PutCalendarJobResponse extends ResponseBase {
  calendar_id: string
  description: string
  job_ids: Array<string>
}

export interface PutDatafeedRequest extends RequestBase {
  datafeed_id: Id
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_throttled?: boolean
  ignore_unavailable?: boolean
  body: {
    aggregations?: Record<string, AggregationContainer>
    chunking_config?: ChunkingConfig
    frequency?: Time
    indices?: Indices
    job_id?: Id
    max_empty_searches?: integer
    query?: QueryContainer
    query_delay?: Time
    script_fields?: Record<string, ScriptField>
    scroll_size?: integer
  }
}

export interface PutDatafeedResponse extends ResponseBase {
  aggregations: Record<string, AggregationContainer>
  chunking_config: ChunkingConfig
  datafeed_id: string
  frequency: Time
  indices: Indices
  job_id: string
  max_empty_searches: integer
  query: QueryContainer
  query_delay: Time
  script_fields: Record<string, ScriptField>
  scroll_size: integer
}

export interface PutFilterRequest extends RequestBase {
  filter_id: Id
  body: {
    description?: string
    items?: Array<string>
  }
}

export interface PutFilterResponse extends ResponseBase {
  description: string
  filter_id: string
  items: Array<string>
}

export type ExcludeFrequent = 'all' | 'none' | 'by' | 'over'

export interface PutJobRequest extends RequestBase {
  job_id: Id
  body: {
    allow_lazy_open?: boolean
    analysis_config?: AnalysisConfig
    analysis_limits?: AnalysisLimits
    data_description?: DataDescription
    description?: string
    model_plot?: ModelPlotConfig
    model_snapshot_retention_days?: long
    results_index_name?: IndexName
  }
}

export interface PutJobResponse extends ResponseBase {
  allow_lazy_open: boolean
  analysis_config: AnalysisConfig
  analysis_limits: AnalysisLimits
  background_persist_interval: Time
  create_time: Date
  data_description: DataDescription
  description: string
  job_id: string
  job_type: string
  model_plot: ModelPlotConfig
  model_snapshot_id: string
  model_snapshot_retention_days: long
  renormalization_window_days: long
  results_index_name: string
  results_retention_days: long
}

export interface RevertModelSnapshotRequest extends RequestBase {
  job_id: Id
  snapshot_id: Id
  body?: {
    delete_intervening_results?: boolean
  }
}

export interface RevertModelSnapshotResponse extends ResponseBase {
  model: ModelSnapshot
}

export interface SetUpgradeModeRequest extends RequestBase {
  enabled?: boolean
  timeout?: Time
}

export interface SetUpgradeModeResponse extends AcknowledgedResponseBase {
}

export interface StartDatafeedRequest extends RequestBase {
  datafeed_id: Id
  body?: {
    end?: Date
    start?: Date
    timeout?: Time
  }
}

export interface StartDatafeedResponse extends ResponseBase {
  started: boolean
}

export interface StopDatafeedRequest extends RequestBase {
  datafeed_id: Id
  allow_no_datafeeds?: boolean
  body?: {
    force?: boolean
    timeout?: Time
  }
}

export interface StopDatafeedResponse extends ResponseBase {
  stopped: boolean
}

export interface UpdateDatafeedRequest extends RequestBase {
  datafeed_id: Id
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_throttled?: boolean
  ignore_unavailable?: boolean
  body: {
    aggregations?: Record<string, AggregationContainer>
    chunking_config?: ChunkingConfig
    frequency?: Time
    indices?: Indices
    job_id?: Id
    max_empty_searches?: integer
    query?: QueryContainer
    query_delay?: Time
    script_fields?: Record<string, ScriptField>
    scroll_size?: integer
  }
}

export interface UpdateDatafeedResponse extends ResponseBase {
  aggregations: Record<string, AggregationContainer>
  chunking_config: ChunkingConfig
  datafeed_id: string
  frequency: Time
  indices: Indices
  job_id: string
  max_empty_searches: integer
  query: QueryContainer
  query_delay: Time
  script_fields: Record<string, ScriptField>
  scroll_size: integer
}

export interface UpdateFilterRequest extends RequestBase {
  filter_id: Id
  body: {
    add_items?: Array<string>
    description?: string
    remove_items?: Array<string>
  }
}

export interface UpdateFilterResponse extends ResponseBase {
  description: string
  filter_id: string
  items: Array<string>
}

export interface UpdateJobRequest extends RequestBase {
  job_id: Id
  body: {
    allow_lazy_open?: boolean
    analysis_limits?: AnalysisMemoryLimit
    background_persist_interval?: Time
    custom_settings?: Record<string, any>
    description?: string
    model_plot_config?: ModelPlotConfigEnabled
    model_snapshot_retention_days?: long
    renormalization_window_days?: long
    results_retention_days?: long
  }
}

export interface UpdateJobResponse extends ResponseBase {
}

export interface UpdateModelSnapshotRequest extends RequestBase {
  job_id: Id
  snapshot_id: Id
  body: {
    description?: string
    retain?: boolean
  }
}

export interface UpdateModelSnapshotResponse extends AcknowledgedResponseBase {
  model: ModelSnapshot
}

export interface ValidateDetectorRequest extends RequestBase {
  body: {
    detector?: Detector
  }
}

export interface ValidateDetectorResponse extends AcknowledgedResponseBase {
}

export interface ValidateJobRequest extends RequestBase {
  body: {
    analysis_config?: AnalysisConfig
    analysis_limits?: AnalysisLimits
    data_description?: DataDescription
    description?: string
    model_plot?: ModelPlotConfig
    model_snapshot_retention_days?: long
    results_index_name?: IndexName
  }
}

export interface ValidateJobResponse extends AcknowledgedResponseBase {
}

export interface DeprecationInfo {
  details: string
  level: DeprecationWarningLevel
  message: string
  url: string
}

export interface DeprecationInfoRequest extends RequestBase {
  index?: IndexName
}

export interface DeprecationInfoResponse extends ResponseBase {
  cluster_settings: Array<DeprecationInfo>
  index_settings: Record<string, Array<DeprecationInfo>>
  node_settings: Array<DeprecationInfo>
}

export type DeprecationWarningLevel = 'none' | 'info' | 'warning' | 'critical'

export interface CreateRollupJobRequest extends RequestBase {
  id: Id
  body: {
    cron?: string
    groups?: RollupGroupings
    index_pattern?: string
    metrics?: Array<RollupFieldMetric>
    page_size?: long
    rollup_index?: IndexName
  }
}

export interface CreateRollupJobResponse extends AcknowledgedResponseBase {
}

export interface DeleteRollupJobRequest extends RequestBase {
  id: Id
}

export interface DeleteRollupJobResponse extends AcknowledgedResponseBase {
}

export interface GetRollupCapabilitiesRequest extends RequestBase {
  id?: Id
}

export interface GetRollupCapabilitiesResponse extends DictionaryResponseBase<IndexName, RollupCapabilities> {
}

export interface RollupCapabilities {
  rollup_jobs: Array<RollupCapabilitiesJob>
}

export interface RollupCapabilitiesJob {
  fields: Record<Field, Record<string, any>>
  index_pattern: string
  job_id: string
  rollup_index: string
}

export interface GetRollupIndexCapabilitiesRequest extends RequestBase {
  index: Id
}

export interface GetRollupIndexCapabilitiesResponse extends DictionaryResponseBase<IndexName, RollupIndexCapabilities> {
}

export interface RollupIndexCapabilities {
  rollup_jobs: Array<RollupIndexCapabilitiesJob>
}

export interface RollupIndexCapabilitiesJob {
  fields: Record<Field, Record<string, string>>
  index_pattern: string
  job_id: string
  rollup_index: string
}

export interface GetRollupJobRequest extends RequestBase {
  id?: Id
}

export interface GetRollupJobResponse extends ResponseBase {
  jobs: Array<RollupJobInformation>
}

export type IndexingJobState = 'started' | 'indexing' | 'stopping' | 'stopped' | 'aborting'

export interface RollupJobConfiguration {
  cron: string
  groups: RollupGroupings
  id: string
  index_pattern: string
  metrics: Array<RollupFieldMetric>
  page_size: long
  rollup_index: IndexName
  timeout: Time
}

export interface RollupJobInformation {
  config: RollupJobConfiguration
  stats: RollupJobStats
  status: RollupJobStatus
}

export interface RollupJobStats {
  documents_processed: long
  index_failures: long
  index_time_in_ms: long
  index_total: long
  pages_processed: long
  rollups_indexed: long
  search_failures: long
  search_time_in_ms: long
  search_total: long
  trigger_count: long
}

export interface RollupJobStatus {
  current_position: Record<string, any>
  job_state: IndexingJobState
  upgraded_doc_id: boolean
}

export interface DateHistogramRollupGrouping {
  delay: Time
  field: Field
  format: string
  interval: Time
  time_zone: string
}

export interface HistogramRollupGrouping {
  fields: Array<Field>
  interval: long
}

export interface RollupFieldMetric {
  field: Field
  metrics: Array<RollupMetric>
}

export interface RollupGroupings {
  date_histogram: DateHistogramRollupGrouping
  histogram: HistogramRollupGrouping
  terms: TermsRollupGrouping
}

export type RollupMetric = 'min' | 'max' | 'sum' | 'avg' | 'value_count'

export interface TermsRollupGrouping {
  fields: Array<Field>
}

export interface RollupSearchRequest extends RequestBase {
  index: Indices
  type?: TypeName
  total_hits_as_integer?: boolean
  typed_keys?: boolean
  body: {
    aggs?: Record<string, AggregationContainer>
    query?: QueryContainer
    size?: integer
  }
}

export interface RollupSearchResponse<TDocument = unknown> extends ResponseBase {
}

export interface StartRollupJobRequest extends RequestBase {
  id: Id
}

export interface StartRollupJobResponse extends ResponseBase {
  started: boolean
}

export interface StopRollupJobRequest extends RequestBase {
  id: Id
  timeout?: Time
  wait_for_completion?: boolean
}

export interface StopRollupJobResponse extends ResponseBase {
  stopped: boolean
}

export interface SecurityNode {
  name: string
}

export interface ApiKeyPrivileges {
  names: Array<string>
  privileges: Array<string>
}

export interface ApiKeyRole {
  cluster: Array<string>
  index: Array<ApiKeyPrivileges>
}

export interface CreateApiKeyRequest extends RequestBase {
  refresh?: Refresh
  body: {
    expiration?: Time
    name?: string
    role_descriptors?: Record<string, ApiKeyRole>
  }
}

export interface CreateApiKeyResponse extends ResponseBase {
  api_key: string
  expiration: Date
  id: string
  name: string
}

export interface ApiKeys {
  creation: Date
  expiration: Date
  id: string
  invalidated: boolean
  name: string
  realm: string
  username: string
}

export interface GetApiKeyRequest extends RequestBase {
  id?: string
  name?: string
  owner?: boolean
  realm_name?: string
  username?: string
}

export interface GetApiKeyResponse extends ResponseBase {
  api_keys: Array<ApiKeys>
}

export interface InvalidateApiKeyRequest extends RequestBase {
  body: {
    id?: string
    name?: string
    owner?: boolean
    realm_name?: string
    username?: string
  }
}

export interface InvalidateApiKeyResponse extends ResponseBase {
  error_count: integer
  error_details: Array<ErrorCause>
  invalidated_api_keys: Array<string>
  previously_invalidated_api_keys: Array<string>
}

export interface AuthenticateRequest extends RequestBase {
}

export interface AuthenticateResponse extends ResponseBase {
  authentication_realm: RealmInfo
  email: string
  full_name: string
  lookup_realm: RealmInfo
  metadata: Record<string, any>
  roles: Array<string>
  username: string
}

export interface RealmInfo {
  name: string
  type: string
}

export interface ClearCachedRealmsRequest extends RequestBase {
  realms: Names
  usernames?: Array<string>
}

export interface ClearCachedRealmsResponse extends ResponseBase {
  cluster_name: string
  nodes: Record<string, SecurityNode>
}

export interface DeletePrivilegesRequest extends RequestBase {
  application: Name
  name: Name
  refresh?: Refresh
}

export interface DeletePrivilegesResponse extends DictionaryResponseBase<string, Record<string, FoundUserPrivilege>> {
}

export interface FoundUserPrivilege {
  found: boolean
}

export interface GetBuiltinPrivilegesRequest extends RequestBase {
}

export interface GetBuiltinPrivilegesResponse extends ResponseBase {
  cluster: Array<string>
  index: Array<string>
}

export interface GetPrivilegesRequest extends RequestBase {
  application?: Name
  name?: Name
}

export interface GetPrivilegesResponse extends DictionaryResponseBase<string, Record<string, PrivilegesActions>> {
}

export interface ApplicationGlobalUserPrivileges {
  manage: ManageUserPrivileges
}

export interface ApplicationResourcePrivileges {
  application: string
  privileges: Array<string>
  resources: Array<string>
}

export interface FieldSecuritySettings {
  except: Array<string>
  grant: Array<string>
}

export interface GetUserPrivilegesRequest extends RequestBase {
}

export interface GetUserPrivilegesResponse extends ResponseBase {
  applications: Array<ApplicationResourcePrivileges>
  cluster: Array<string>
  global: Array<GlobalPrivileges>
  indices: Array<UserIndicesPrivileges>
  run_as: Array<string>
}

export interface GlobalPrivileges {
  application: ApplicationGlobalUserPrivileges
}

export interface ManageUserPrivileges {
  applications: Array<string>
}

export interface QueryUserPrivileges {
  term: TermUserPrivileges
}

export interface TermUserPrivileges {
  apps: boolean
}

export interface UserIndicesPrivileges {
  field_security: FieldSecuritySettings
  names: Array<string>
  privileges: Array<string>
  query: QueryUserPrivileges
}

export interface ApplicationPrivilegesCheck {
  application: string
  privileges: Array<string>
  resources: Array<string>
}

export interface HasPrivilegesRequest extends RequestBase {
  user?: Name
  body: {
    application?: Array<ApplicationPrivilegesCheck>
    cluster?: Array<string>
    index?: Array<IndexPrivilegesCheck>
  }
}

export interface HasPrivilegesResponse extends ResponseBase {
  application: Record<string, Array<ResourcePrivileges>>
  cluster: Record<string, boolean>
  has_all_requested: boolean
  index: Array<ResourcePrivileges>
  username: string
}

export interface IndexPrivilegesCheck {
  names: Array<string>
  privileges: Array<string>
}

export interface ResourcePrivileges {
  privileges: Record<string, boolean>
  resource: string
}

export interface PrivilegesActions {
  actions: Array<string>
  metadata: Record<string, any>
}

export interface PutPrivilegesRequest extends RequestBase {
  refresh?: Refresh
  body: {
    applications?: Record<string, Record<string, PrivilegesActions>>
  }
}

export interface PutPrivilegesResponse extends DictionaryResponseBase<string, Record<string, PutPrivilegesStatus>> {
}

export interface PutPrivilegesStatus {
  created: boolean
}

export interface FieldSecurity {
  except: Array<Field>
  grant: Array<Field>
}

export interface DeleteRoleMappingRequest extends RequestBase {
  name: Name
  refresh?: Refresh
}

export interface DeleteRoleMappingResponse extends ResponseBase {
  found: boolean
}

export interface GetRoleMappingRequest extends RequestBase {
  name?: Name
}

export interface GetRoleMappingResponse extends DictionaryResponseBase<string, XPackRoleMapping> {
}

export interface XPackRoleMapping {
  enabled: boolean
  metadata: Record<string, any>
  roles: Array<string>
  rules: RoleMappingRuleBase
}

export interface PutRoleMappingRequest extends RequestBase {
  name: Name
  refresh?: Refresh
  body: {
    enabled?: boolean
    metadata?: Record<string, any>
    roles?: Array<string>
    rules?: RoleMappingRuleBase
    run_as?: Array<string>
  }
}

export interface PutRoleMappingResponse extends ResponseBase {
  created: boolean
  role_mapping: PutRoleMappingStatus
}

export interface PutRoleMappingStatus {
  created: boolean
}

export interface RoleMappingRuleBase {
}

export interface ClearCachedRolesRequest extends RequestBase {
  name: Names
}

export interface ClearCachedRolesResponse extends ResponseBase {
  cluster_name: string
  nodes: Record<string, SecurityNode>
}

export interface DeleteRoleRequest extends RequestBase {
  name: Name
  refresh?: Refresh
}

export interface DeleteRoleResponse extends ResponseBase {
  found: boolean
}

export interface GetRoleRequest extends RequestBase {
  name?: Name
}

export interface GetRoleResponse extends DictionaryResponseBase<string, XPackRole> {
}

export interface XPackRole {
  cluster: Array<string>
  indices: Array<IndicesPrivileges>
  metadata: Record<string, any>
  run_as: Array<string>
}

export interface ApplicationPrivileges {
  application: string
  privileges: Array<string>
  resources: Array<string>
}

export interface IndicesPrivileges {
  field_security: FieldSecurity
  names: Indices
  privileges: Array<string>
  query: QueryContainer
}

export interface PutRoleRequest extends RequestBase {
  name: Name
  refresh?: Refresh
  body: {
    applications?: Array<ApplicationPrivileges>
    cluster?: Array<string>
    global?: Record<string, any>
    indices?: Array<IndicesPrivileges>
    metadata?: Record<string, any>
    run_as?: Array<string>
  }
}

export interface PutRoleResponse extends ResponseBase {
  role: PutRoleStatus
}

export interface PutRoleStatus {
  created: boolean
}

export interface ChangePasswordRequest extends RequestBase {
  username?: Name
  refresh?: Refresh
  body: {
    password?: string
  }
}

export interface ChangePasswordResponse extends ResponseBase {
}

export interface DeleteUserRequest extends RequestBase {
  username: Name
  refresh?: Refresh
}

export interface DeleteUserResponse extends ResponseBase {
  found: boolean
}

export interface DisableUserRequest extends RequestBase {
  username: Name
  refresh?: Refresh
}

export interface DisableUserResponse extends ResponseBase {
}

export interface EnableUserRequest extends RequestBase {
  username: Name
  refresh?: Refresh
}

export interface EnableUserResponse extends ResponseBase {
}

export interface GetUserRequest extends RequestBase {
  username?: Names
}

export interface GetUserResponse extends DictionaryResponseBase<string, XPackUser> {
}

export interface XPackUser {
  email: string
  full_name: string
  metadata: Record<string, any>
  roles: Array<string>
  username: string
}

export type AccessTokenGrantType = 'password'

export interface GetUserAccessTokenRequest extends RequestBase {
  body: {
    grant_type?: AccessTokenGrantType
    scope?: string
  }
}

export interface GetUserAccessTokenResponse extends ResponseBase {
  access_token: string
  expires_in: long
  scope: string
  type: string
}

export interface InvalidateUserAccessTokenRequest extends RequestBase {
}

export interface InvalidateUserAccessTokenResponse extends ResponseBase {
  error_count: long
  error_details: Array<ErrorCause>
  invalidated_tokens: long
  previously_invalidated_tokens: long
}

export interface PutUserRequest extends RequestBase {
  username: Name
  refresh?: Refresh
  body: {
    email?: string
    full_name?: string
    metadata?: Record<string, any>
    password?: string
    password_hash?: string
    roles?: Array<string>
  }
}

export interface PutUserResponse extends ResponseBase {
  created: boolean
}

export interface SnapshotLifecycleConfig {
  ignore_unavailable: boolean
  include_global_state: boolean
  indices: Indices
}

export interface SnapshotLifecycleInProgress {
  name: string
  start_time_millis: Date
  state: string
  uuid: string
}

export interface SnapshotLifecycleInvocationRecord {
  snapshot_name: string
  time: Date
}

export interface SnapshotLifecyclePolicy {
  config: SnapshotLifecycleConfig
  name: string
  repository: string
  retention: SnapshotRetentionConfiguration
  schedule: CronExpression
}

export interface SnapshotLifecyclePolicyMetadata {
  in_progress: SnapshotLifecycleInProgress
  last_failure: SnapshotLifecycleInvocationRecord
  last_success: SnapshotLifecycleInvocationRecord
  modified_date_millis: Date
  next_execution_millis: Date
  policy: SnapshotLifecyclePolicy
  version: integer
}

export interface SnapshotRetentionConfiguration {
  expire_after: Time
  max_count: integer
  min_count: integer
}

export interface DeleteSnapshotLifecycleRequest extends RequestBase {
  policy_id: Name
}

export interface DeleteSnapshotLifecycleResponse extends AcknowledgedResponseBase {
}

export interface ExecuteSnapshotLifecycleRequest extends RequestBase {
  policy_id: Name
}

export interface ExecuteSnapshotLifecycleResponse extends ResponseBase {
  snapshot_name: string
}

export interface ExecuteRetentionRequest extends RequestBase {
}

export interface ExecuteRetentionResponse extends AcknowledgedResponseBase {
}

export interface GetSnapshotLifecycleRequest extends RequestBase {
  policy_id?: Names
}

export interface GetSnapshotLifecycleResponse extends DictionaryResponseBase<string, SnapshotLifecyclePolicyMetadata> {
}

export interface GetSnapshotLifecycleStatsRequest extends RequestBase {
}

export interface GetSnapshotLifecycleStatsResponse extends ResponseBase {
  retention_deletion_time: string
  retention_deletion_time_millis: long
  retention_failed: long
  retention_runs: long
  retention_timed_out: long
  total_snapshots_deleted: long
  total_snapshot_deletion_failures: long
  total_snapshots_failed: long
  total_snapshots_taken: long
}

export interface GetSnapshotLifecycleManagementStatusRequest extends RequestBase {
}

export interface GetSnapshotLifecycleManagementStatusResponse extends ResponseBase {
  operation_mode: LifecycleOperationMode
}

export interface PutSnapshotLifecycleRequest extends RequestBase {
  policy_id: Name
  body?: {
    config?: SnapshotLifecycleConfig
    name?: string
    repository?: string
    retention?: SnapshotRetentionConfiguration
    schedule?: CronExpression
  }
}

export interface PutSnapshotLifecycleResponse extends AcknowledgedResponseBase {
}

export interface StartSnapshotLifecycleManagementRequest extends RequestBase {
}

export interface StartSnapshotLifecycleManagementResponse extends AcknowledgedResponseBase {
}

export interface StopSnapshotLifecycleManagementRequest extends RequestBase {
}

export interface StopSnapshotLifecycleManagementResponse extends AcknowledgedResponseBase {
}

export interface ClearSqlCursorRequest extends RequestBase {
  body: {
    cursor?: string
  }
}

export interface ClearSqlCursorResponse extends ResponseBase {
  succeeded: boolean
}

export interface QuerySqlRequest extends RequestBase {
  format?: string
  body: {
    columnar?: boolean
    cursor?: string
    fetch_size?: integer
    filter?: QueryContainer
    query?: string
    time_zone?: string
  }
}

export interface QuerySqlResponse extends ResponseBase {
  columns: Array<SqlColumn>
  cursor: string
  rows: Array<Array<SqlValue>>
  values: Array<Array<SqlValue>>
}

export interface SqlColumn {
  name: string
  type: string
}

export interface SqlValue extends LazyDocument {
}

export interface TranslateSqlRequest extends RequestBase {
  body: {
    fetch_size?: integer
    filter?: QueryContainer
    query?: string
    time_zone?: string
  }
}

export interface TranslateSqlResponse extends ResponseBase {
  result: SearchRequest
}

export interface ClusterCertificateInformation {
  alias: string
  expiry: Date
  format: string
  has_private_key: boolean
  path: string
  serial_number: string
  subject_dn: string
}

export interface GetCertificatesRequest extends RequestBase {
}

export interface GetCertificatesResponse extends ResponseBase {
  certificates: Array<ClusterCertificateInformation>
}

export interface TransformDestination {
  index: IndexName
  pipeline: string
}

export interface TransformSource {
  index: Indices
  query: QueryContainer
}

export interface TransformSyncContainer {
  time: TransformTimeSync
}

export interface TransformTimeSync {
  delay: Time
  field: Field
}

export interface DeleteTransformRequest extends RequestBase {
  transform_id: Name
  force?: boolean
}

export interface DeleteTransformResponse extends AcknowledgedResponseBase {
}

export interface GetTransformRequest extends RequestBase {
  transform_id?: Name
  allow_no_match?: boolean
  from?: integer
  size?: integer
}

export interface GetTransformResponse extends ResponseBase {
  count: long
  transforms: Array<Transform>
}

export interface GetTransformStatsRequest extends RequestBase {
  transform_id: Name
  allow_no_match?: boolean
  from?: long
  size?: long
}

export interface GetTransformStatsResponse extends ResponseBase {
  count: long
  transforms: Array<TransformStats>
}

export interface NodeAttributes {
  attributes: Record<string, string>
  ephemeral_id: string
  id: string
  name: string
  transport_address: string
}

export interface TransformCheckpointingInfo {
  changes_last_detected_at: long
  changes_last_detected_at_date_time: Date
  last: TransformCheckpointStats
  next: TransformCheckpointStats
  operations_behind: long
}

export interface TransformCheckpointStats {
  checkpoint: long
  checkpoint_progress: TransformProgress
  timestamp: Date
  timestamp_millis: long
  time_upper_bound: Date
  time_upper_bound_millis: long
}

export interface TransformIndexerStats {
  documents_indexed: long
  documents_processed: long
  exponential_avg_checkpoint_duration_ms: double
  exponential_avg_documents_indexed: double
  exponential_avg_documents_processed: double
  index_failures: long
  index_time_in_ms: long
  index_total: long
  pages_processed: long
  processing_time_in_ms: long
  processing_total: long
  search_failures: long
  search_time_in_ms: long
  search_total: long
  trigger_count: long
}

export interface TransformProgress {
  docs_indexed: long
  docs_processed: long
  docs_remaining: long
  percent_complete: double
  total_docs: long
}

export interface TransformStats {
  checkpointing: TransformCheckpointingInfo
  id: string
  node: NodeAttributes
  reason: string
  state: string
  stats: TransformIndexerStats
}

export interface SingleGroupSource {
  field: Field
  script: Script
}

export interface TransformPivot {
  aggregations: Record<string, AggregationContainer>
  group_by: Record<string, SingleGroupSource>
  max_page_search_size: integer
}

export interface PreviewTransformRequest extends RequestBase {
  body: {
    description?: string
    dest?: TransformDestination
    frequency?: Time
    pivot?: TransformPivot
    source?: TransformSource
    sync?: TransformSyncContainer
  }
}

export interface PreviewTransformResponse<TTransform = unknown> extends ResponseBase {
  generated_dest_index: IndexState
  preview: Array<TTransform>
}

export interface PutTransformRequest extends RequestBase {
  transform_id: Name
  defer_validation?: boolean
  body: {
    description?: string
    dest?: TransformDestination
    frequency?: Time
    pivot?: TransformPivot
    source?: TransformSource
    sync?: TransformSyncContainer
  }
}

export interface PutTransformResponse extends AcknowledgedResponseBase {
}

export interface StartTransformRequest extends RequestBase {
  transform_id: Name
  timeout?: Time
}

export interface StartTransformResponse extends AcknowledgedResponseBase {
}

export interface StopTransformRequest extends RequestBase {
  transform_id: Name
  allow_no_match?: boolean
  force?: boolean
  timeout?: Time
  wait_for_checkpoint?: boolean
  wait_for_completion?: boolean
}

export interface StopTransformResponse extends AcknowledgedResponseBase {
}

export interface UpdateTransformRequest extends RequestBase {
  transform_id: Name
  defer_validation?: boolean
  body: {
    description?: string
    dest?: TransformDestination
    frequency?: Time
    source?: TransformSource
    sync?: TransformSyncContainer
  }
}

export interface UpdateTransformResponse extends ResponseBase {
  create_time: long
  create_time_date_time: Date
  description: string
  dest: TransformDestination
  frequency: Time
  id: string
  pivot: TransformPivot
  source: TransformSource
  sync: TransformSyncContainer
  version: string
}

export interface Watch {
  actions: Record<string, Action>
  condition: ConditionContainer
  input: InputContainer
  metadata: Record<string, any>
  status: WatchStatus
  throttle_period: string
  transform: TransformContainer
  trigger: TriggerContainer
}

export type AcknowledgementState = 'awaits_successful_execution' | 'ackable' | 'acked'

export interface AcknowledgeState {
  state: AcknowledgementState
  timestamp: Date
}

export interface AcknowledgeWatchRequest extends RequestBase {
  watch_id: Name
  action_id?: Names
}

export interface AcknowledgeWatchResponse extends ResponseBase {
  status: WatchStatus
}

export interface ActionStatus {
  ack: AcknowledgeState
  last_execution: ExecutionState
  last_successful_execution: ExecutionState
  last_throttle: ThrottleState
}

export interface ActivationState {
  active: boolean
  timestamp: Date
}

export interface ExecutionState {
  successful: boolean
  timestamp: Date
}

export interface ThrottleState {
  reason: string
  timestamp: Date
}

export interface WatchStatus {
  actions: Record<string, ActionStatus>
  last_checked: Date
  last_met_condition: Date
  state: ActivationState
  version: integer
}

export interface Action {
  action_type: ActionType
  condition: ConditionContainer
  foreach: string
  max_iterations: integer
  name: string
  throttle_period: Time
  transform: TransformContainer
}

export type ActionType = 'email' | 'webhook' | 'index' | 'logging' | 'slack' | 'pagerduty'

export interface EmailBody {
  html: string
  text: string
}

export type EmailPriority = 'lowest' | 'low' | 'normal' | 'high' | 'highest'

export interface PagerDutyContext {
  href: string
  src: string
  type: PagerDutyContextType
}

export type PagerDutyContextType = 'link' | 'image'

export interface PagerDutyEvent {
  account: string
  attach_payload: boolean
  client: string
  client_url: string
  context: Array<PagerDutyContext>
  description: string
  event_type: PagerDutyEventType
  incident_key: string
}

export type PagerDutyEventType = 'trigger' | 'resolve' | 'acknowledge'

export interface SlackAttachment {
  author_icon: string
  author_link: string
  author_name: string
  color: string
  fallback: string
  fields: Array<SlackAttachmentField>
  footer: string
  footer_icon: string
  image_url: string
  pretext: string
  text: string
  thumb_url: string
  title: string
  title_link: string
  ts: Date
}

export interface SlackAttachmentField {
  short: boolean
  title: string
  value: string
}

export interface SlackDynamicAttachment {
  attachment_template: SlackAttachment
  list_path: string
}

export interface SlackMessage {
  attachments: Array<SlackAttachment>
  dynamic_attachments: SlackDynamicAttachment
  from: string
  icon: string
  text: string
  to: Array<string>
}

export interface ActivateWatchRequest extends RequestBase {
  watch_id: Name
}

export interface ActivateWatchResponse extends ResponseBase {
  status: ActivationStatus
}

export interface ActivationStatus {
  actions: Record<string, ActionStatus>
  state: ActivationState
}

export interface AlwaysCondition {
}

export interface ArrayCompareCondition {
  array_path: string
  comparison: string
  path: string
  quantifier: Quantifier
  value: any
}

export interface CompareCondition {
  comparison: string
  path: string
  value: any
}

export interface ConditionContainer {
  always: AlwaysCondition
  array_compare: ArrayCompareCondition
  compare: CompareCondition
  never: NeverCondition
  script: ScriptCondition
}

export type ConditionType = 'always' | 'never' | 'script' | 'compare' | 'array_compare'

export interface NeverCondition {
}

export type Quantifier = 'some' | 'all'

export interface ScriptCondition {
  lang: string
  params: Record<string, any>
}

export interface DeactivateWatchRequest extends RequestBase {
  watch_id: Name
}

export interface DeactivateWatchResponse extends ResponseBase {
  status: ActivationStatus
}

export interface DeleteWatchRequest extends RequestBase {
  id: Name
}

export interface DeleteWatchResponse extends ResponseBase {
  found: boolean
  _id: string
  _version: integer
}

export type ActionExecutionState = 'awaits_execution' | 'checking' | 'execution_not_needed' | 'throttled' | 'executed' | 'failed' | 'deleted_while_queued' | 'not_executed_already_queued'

export interface ExecuteWatchRequest extends RequestBase {
  id?: Name
  debug?: boolean
  body?: {
    action_modes?: Record<string, ActionExecutionMode>
    alternative_input?: Record<string, any>
    ignore_condition?: boolean
    record_execution?: boolean
    simulated_actions?: SimulatedActions
    trigger_data?: ScheduleTriggerEvent
    watch?: Watch
  }
}

export interface ExecuteWatchResponse extends ResponseBase {
  _id: string
  watch_record: WatchRecord
}

export interface ExecutionResult {
  actions: Array<ExecutionResultAction>
  condition: ExecutionResultCondition
  execution_duration: integer
  execution_time: Date
  input: ExecutionResultInput
}

export interface ExecutionResultAction {
  email: EmailActionResult
  id: string
  index: IndexActionResult
  logging: LoggingActionResult
  pagerduty: PagerDutyActionResult
  reason: string
  slack: SlackActionResult
  status: Status
  type: ActionType
  webhook: WebhookActionResult
}

export interface ExecutionResultCondition {
  met: boolean
  status: Status
  type: ConditionType
}

export interface ExecutionResultInput {
  payload: Record<string, any>
  status: Status
  type: InputType
}

export interface TriggerEventResult {
  manual: TriggerEventContainer
  triggered_time: Date
  type: string
}

export interface WatchRecord {
  condition: ConditionContainer
  input: InputContainer
  messages: Array<string>
  metadata: Record<string, any>
  node: string
  result: ExecutionResult
  state: ActionExecutionState
  trigger_event: TriggerEventResult
  user: string
  watch_id: string
}

export type ActionExecutionMode = 'simulate' | 'force_simulate' | 'execute' | 'force_execute' | 'skip'

export interface HttpInputRequestResult extends HttpInputRequest {
}

export interface HttpInputResponseResult {
  body: string
  headers: Record<string, Array<string>>
  status: integer
}

export interface SimulatedActions {
  actions: Array<string>
  all: SimulatedActions
  use_all: boolean
}

export type Status = 'success' | 'failure' | 'simulated' | 'throttled'

export interface EmailActionResult {
  account: string
  message: EmailResult
  reason: string
}

export interface EmailResult {
  bcc: Array<string>
  body: EmailBody
  cc: Array<string>
  from: string
  id: string
  priority: EmailPriority
  reply_to: Array<string>
  sent_date: Date
  subject: string
  to: Array<string>
}

export interface IndexActionResult {
  id: string
  response: IndexActionResultIndexResponse
}

export interface IndexActionResultIndexResponse {
  created: boolean
  id: string
  index: IndexName
  result: Result
  version: integer
}

export interface LoggingActionResult {
  logged_text: string
}

export interface PagerDutyActionEventResult {
  event: PagerDutyEvent
  reason: string
  request: HttpInputRequestResult
  response: HttpInputResponseResult
}

export interface PagerDutyActionResult {
  sent_event: PagerDutyActionEventResult
}

export interface SlackActionMessageResult {
  message: SlackMessage
  reason: string
  request: HttpInputRequestResult
  response: HttpInputResponseResult
  status: Status
  to: string
}

export interface SlackActionResult {
  account: string
  sent_messages: Array<SlackActionMessageResult>
}

export interface WebhookActionResult {
  request: HttpInputRequestResult
  response: HttpInputResponseResult
}

export interface GetWatchRequest extends RequestBase {
  id: Name
}

export interface GetWatchResponse extends ResponseBase {
  found: boolean
  _id: string
  status: WatchStatus
  watch: Watch
}

export interface ChainInput {
  inputs: Record<string, InputContainer>
}

export type ConnectionScheme = 'http' | 'https'

export interface HttpInput {
  extract: Array<string>
  request: HttpInputRequest
  response_content_type: ResponseContentType
}

export interface HttpInputAuthentication {
  basic: HttpInputBasicAuthentication
}

export interface HttpInputBasicAuthentication {
  password: string
  username: string
}

export type HttpInputMethod = 'head' | 'get' | 'post' | 'put' | 'delete'

export interface HttpInputProxy {
  host: string
  port: integer
}

export interface HttpInputRequest {
  auth?: HttpInputAuthentication
  body?: string
  connection_timeout?: Time
  headers?: Record<string, string>
  host?: string
  method?: HttpInputMethod
  params?: Record<string, string>
  path?: string
  port?: integer
  proxy?: HttpInputProxy
  read_timeout?: Time
  scheme?: ConnectionScheme
  url?: string
}

export interface IndicesOptions {
  allow_no_indices: boolean
  expand_wildcards: ExpandWildcards
  ignore_unavailable: boolean
}

export interface InputContainer {
  chain: ChainInput
  http: HttpInput
  search: SearchInput
  simple: SimpleInput
}

export type InputType = 'http' | 'search' | 'simple'

export type ResponseContentType = 'json' | 'yaml' | 'text'

export interface SearchInput {
  extract: Array<string>
  request: SearchInputRequest
  timeout: Time
}

export interface SearchInputRequest {
  body?: SearchRequest
  indices?: Array<IndexName>
  indices_options?: IndicesOptions
  search_type?: SearchType
  template?: SearchTemplateRequest
}

export interface SimpleInput {
  payload: Record<string, any>
}

export interface PutWatchRequest extends RequestBase {
  id: Name
  active?: boolean
  if_primary_term?: long
  if_sequence_number?: long
  version?: long
  body?: {
    actions?: Record<string, Action>
    condition?: ConditionContainer
    input?: InputContainer
    metadata?: Record<string, any>
    throttle_period?: string
    transform?: TransformContainer
    trigger?: TriggerContainer
  }
}

export interface PutWatchResponse extends ResponseBase {
  created: boolean
  _id: string
  _primary_term: long
  _seq_no: long
  _version: integer
}

export interface CronExpression extends ScheduleBase {
}

export interface DailySchedule {
  at: Array<string> | TimeOfDay
}

export type Day = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

export interface HourlySchedule {
  minute: Array<integer>
}

export interface Interval extends ScheduleBase {
  factor: long
  unit: IntervalUnit
}

export type IntervalUnit = 's' | 'm' | 'h' | 'd' | 'w'

export type Month = 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december'

export interface ScheduleBase {
}

export interface ScheduleContainer {
  cron: CronExpression
  daily: DailySchedule
  hourly: HourlySchedule
  interval: Interval
  monthly: Array<TimeOfMonth>
  weekly: Array<TimeOfWeek>
  yearly: Array<TimeOfYear>
}

export interface ScheduleTriggerEvent {
  scheduled_time: Date | string
  triggered_time: Date | string
}

export interface TimeOfDay {
  hour: Array<integer>
  minute: Array<integer>
}

export interface TimeOfMonth {
  at: Array<string>
  on: Array<integer>
}

export interface TimeOfWeek {
  at: Array<string>
  on: Array<Day>
}

export interface TimeOfYear {
  at: Array<string>
  int: Array<Month>
  on: Array<integer>
}

export interface StartWatcherRequest extends RequestBase {
}

export interface StartWatcherResponse extends AcknowledgedResponseBase {
}

export interface StopWatcherRequest extends RequestBase {
}

export interface StopWatcherResponse extends AcknowledgedResponseBase {
}

export interface ChainTransform {
  transforms: Array<TransformContainer>
}

export interface ScriptTransform {
  lang: string
  params: Record<string, any>
}

export interface SearchTransform {
  request: SearchInputRequest
  timeout: Time
}

export interface Transform {
}

export interface TransformContainer {
  chain: ChainTransform
  script: ScriptTransform
  search: SearchTransform
}

export interface TriggerContainer {
  schedule: ScheduleContainer
}

export interface TriggerEventContainer {
  schedule: ScheduleTriggerEvent
}

export type ExecutionPhase = 'awaits_execution' | 'started' | 'input' | 'condition' | 'actions' | 'watch_transform' | 'aborted' | 'finished'

export interface ExecutionThreadPool {
  max_size: long
  queue_size: long
}

export interface WatcherNodeStats {
  current_watches: Array<WatchRecordStats>
  execution_thread_pool: ExecutionThreadPool
  queued_watches: Array<WatchRecordQueuedStats>
  watch_count: long
  watcher_state: WatcherState
}

export type WatcherState = 'stopped' | 'starting' | 'started' | 'stopping'

export interface WatcherStatsRequest extends RequestBase {
  metric?: Metrics
  emit_stacktraces?: boolean
}

export interface WatcherStatsResponse extends ResponseBase {
  cluster_name: string
  manually_stopped: boolean
  stats: Array<WatcherNodeStats>
}

export interface WatchRecordQueuedStats {
  execution_time: Date
  triggered_time: Date
  watch_id: string
  watch_record_id: string
}

export interface WatchRecordStats extends WatchRecordQueuedStats {
  execution_phase: ExecutionPhase
}

