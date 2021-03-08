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

export type AccessTokenGrantType = 'password' | 'client_credentials' | '_kerberos' | 'refresh_token'

export interface AcknowledgeState {
  state: AcknowledgementState
  timestamp: DateString
}

export interface AcknowledgeWatchRequest extends RequestBase {
  watch_id: Name
  action_id?: Names
}

export interface AcknowledgeWatchResponse extends ResponseBase {
  status: WatchStatus
}

export interface AcknowledgedResponseBase extends ResponseBase {
  acknowledged: boolean
}

export type AcknowledgementState = 'awaits_successful_execution' | 'ackable' | 'acked'

export interface Action {
  action_type?: ActionType
  condition?: ConditionContainer
  foreach?: string
  max_iterations?: integer
  name?: string
  throttle_period?: Time
  throttle_period_in_millis?: EpochMillis
  transform?: TransformContainer
  index: ActionIndex
}

export type ActionExecutionMode = 'simulate' | 'force_simulate' | 'execute' | 'force_execute' | 'skip'

export type ActionExecutionState = 'awaits_execution' | 'checking' | 'execution_not_needed' | 'throttled' | 'executed' | 'failed' | 'deleted_while_queued' | 'not_executed_already_queued'

export type ActionIds = string

export interface ActionIndex {
  index: IndexName
}

export interface ActionStatus {
  ack: AcknowledgeState
  last_execution?: ExecutionState
  last_successful_execution?: ExecutionState
  last_throttle?: ThrottleState
}

export type ActionType = 'email' | 'webhook' | 'index' | 'logging' | 'slack' | 'pagerduty'

export interface ActivateWatchRequest extends RequestBase {
  watch_id: Name
}

export interface ActivateWatchResponse extends ResponseBase {
  status: ActivationStatus
}

export interface ActivationState {
  active: boolean
  timestamp: Timestamp
}

export interface ActivationStatus {
  actions: Record<IndexName, ActionStatus>
  state: ActivationState
  version: integer
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

export interface AdjacencyMatrixAggregation extends BucketAggregationBase {
  filters?: Record<string, QueryContainer>
}

export type Aggregate = SingleBucketAggregate | AutoDateHistogramAggregate | FiltersAggregate | SignificantTermsAggregate<any> | TermsAggregate<any> | BucketAggregate | CompositeBucketAggregate | MultiBucketAggregate<Bucket> | MatrixStatsAggregate | KeyedValueAggregate | MetricAggregate

export interface AggregateBase {
  meta?: Record<string, any>
}

export type AggregateName = string

export interface Aggregation {
  meta?: Record<string, any>
  name?: string
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
  diversified_sampler?: DiversifiedSamplerAggregation
  extended_stats?: ExtendedStatsAggregation
  extended_stats_bucket?: ExtendedStatsBucketAggregation
  filter?: QueryContainer
  filters?: FiltersAggregation
  geo_bounds?: GeoBoundsAggregation
  geo_centroid?: GeoCentroidAggregation
  geo_distance?: GeoDistanceAggregation
  geohash_grid?: GeoHashGridAggregation
  geo_line?: GeoLineAggregation
  geotile_grid?: GeoTileGridAggregation
  global?: GlobalAggregation
  histogram?: HistogramAggregation
  ip_range?: IpRangeAggregation
  line?: GeoLineAggregation
  matrix_stats?: MatrixStatsAggregation
  max?: MaxAggregation
  max_bucket?: MaxBucketAggregation
  median_absolute_deviation?: MedianAbsoluteDeviationAggregation
  meta?: Record<string, any>
  min?: MinAggregation
  min_bucket?: MinBucketAggregation
  missing?: MissingAggregation
  moving_avg?: MovingAverageAggregation
  moving_percentiles?: MovingPercentilesAggregation
  moving_fn?: MovingFunctionAggregation
  nested?: NestedAggregation
  normalize?: NormalizeAggregation
  parent?: ParentAggregation
  percentile_ranks?: PercentileRanksAggregation
  percentiles?: PercentilesAggregation
  percentiles_bucket?: PercentilesBucketAggregation
  range?: RangeAggregation
  rare_terms?: RareTermsAggregation
  rate?: RateAggregation
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
  t_test?: TTestAggregation
  top_metrics?: TopMetricsAggregation
  value_count?: ValueCountAggregation
  weighted_avg?: WeightedAverageAggregation
  variable_width_histogram?: VariableWidthHistogramAggregation
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

export interface AggregationRange {
  from?: double
  key?: string
  to?: double
}

export type AggregationVisitorScope = 'Unknown' | 'Aggregation' | 'Bucket'

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

export interface Alias {
  filter?: QueryContainer
  index_routing?: Routing
  is_hidden?: boolean
  is_write_index?: boolean
  routing?: Routing
  search_routing?: Routing
}

export interface AliasAction {
}

export interface AliasDefinition {
  filter?: QueryContainer
  index_routing?: string
  is_write_index?: boolean
  routing?: string
  search_routing?: string
}

export interface AliasExistsRequest extends RequestBase {
  name: Names
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  local?: boolean
}

export type AliasExistsResponse = boolean

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

export interface AllocationDecision {
  decider: string
  decision: AllocationExplainDecision
  explanation: string
}

export type AllocationEnable = 'all' | 'primaries' | 'new_primaries' | 'none'

export type AllocationExplainDecision = 'NO' | 'YES' | 'THROTTLE' | 'ALWAYS'

export interface AllocationStore {
  allocation_id: string
  found: boolean
  in_sync: boolean
  matching_size_in_bytes: long
  matching_sync_id: boolean
  store_exception: string
}

export type AllowRebalance = 'always' | 'indices_primaries_active' | 'indices_all_active'

export interface AlwaysCondition {
}

export interface AnalysisConfig {
  bucket_span: TimeSpan
  categorization_field_name?: Field
  categorization_filters?: Array<string>
  detectors: Array<Detector>
  influencers: Fields
  latency?: Time
  multivariate_by_fields?: boolean
  per_partition_categorization?: PerPartitionCategorization
  summary_count_field_name?: Field
  categorization_analyzer?: CategorizationAnalyzer | string
}

export interface AnalysisLimits {
  categorization_examples_limit?: long
  model_memory_limit: string
}

export interface AnalysisMemoryLimit {
  model_memory_limit: string
}

export interface AnalyzeDetail {
  analyzer?: AnalyzerDetail
  charfilters?: Array<CharFilterDetail>
  custom_analyzer: boolean
  tokenfilters?: Array<TokenDetail>
  tokenizer?: TokenDetail
}

export interface AnalyzeRequest extends RequestBase {
  index?: IndexName
  body?: {
    analyzer?: string
    attributes?: Array<string>
    char_filter?: Array<string | CharFilter>
    explain?: boolean
    field?: Field
    filter?: Array<string | TokenFilter>
    normalizer?: string
    text?: TextToAnalyze
    tokenizer?: string | Tokenizer
  }
}

export interface AnalyzeResponse extends ResponseBase {
  detail?: AnalyzeDetail
  tokens?: Array<AnalyzeToken>
}

export interface AnalyzeToken {
  end_offset: long
  position: long
  position_length?: long
  start_offset: long
  token: string
  type: string
}

export interface AnalyzerBase {
  type: string
  version: string
}

export interface AnalyzerDetail {
  name: string
  tokens: Array<ExplainAnalyzeToken>
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

export interface AnomalyDetectors {
  categorization_analyzer: CategorizationAnalyzer
  categorization_examples_limit: integer
  model_memory_limit: string
  model_snapshot_retention_days: integer
}

export interface AnomalyRecord {
  actual?: Array<double>
  bucket_span: Time
  by_field_name?: string
  by_field_value?: string
  causes?: Array<AnomalyCause>
  detector_index: integer
  field_name?: string
  function?: string
  function_description?: string
  influencers?: Array<Influence>
  initial_record_score: double
  is_interim: boolean
  job_id: string
  over_field_name?: string
  over_field_value?: string
  partition_field_name?: string
  partition_field_value?: string
  probability: double
  record_score: double
  result_type: string
  timestamp: EpochMillis
  typical?: Array<double>
}

export interface ApiKeyPrivileges {
  names: Array<string>
  privileges: Array<string>
}

export interface ApiKeyRole {
  cluster: Array<string>
  index: Array<ApiKeyPrivileges>
}

export interface ApiKeys {
  creation: DateString
  expiration: DateString
  id: string
  invalidated: boolean
  name: string
  realm: string
  username: string
}

export interface AppendProcessor extends ProcessorBase {
  field: Field
  value: Array<any>
}

export interface ApplicationGlobalUserPrivileges {
  manage: ManageUserPrivileges
}

export interface ApplicationPrivileges {
  application: string
  privileges: Array<string>
  resources: Array<string>
}

export interface ApplicationPrivilegesCheck {
  application: string
  privileges: Array<string>
  resources: Array<string>
}

export interface ApplicationResourcePrivileges {
  application: string
  privileges: Array<string>
  resources: Array<string>
}

export type ApplicationsPrivileges = Record<Name, ResourcePrivileges>

export type AppliesTo = 'actual' | 'typical' | 'diff_from_typical' | 'time'

export interface ArrayCompareCondition {
  array_path: string
  comparison: string
  path: string
  quantifier: Quantifier
  value: any
}

export interface AsciiFoldingTokenFilter extends TokenFilterBase {
  preserve_original: boolean
}

export interface AsyncSearch<TDocument = unknown> {
  aggregations?: Record<string, Aggregate>
  _clusters?: ClusterStatistics
  fields?: Record<string, any>
  hits: HitsMetadata<TDocument>
  max_score?: double
  num_reduce_phases?: long
  profile?: Profile
  _scroll_id?: string
  _shards: ShardStatistics
  suggest?: Record<SuggestionName, Array<Suggest<TDocument>>>
  terminated_early?: boolean
  timed_out: boolean
  took: long
}

export interface AsyncSearchDeleteRequest extends RequestBase {
  id: Id
}

export interface AsyncSearchDeleteResponse extends AcknowledgedResponseBase {
}

export interface AsyncSearchDocumentResponseBase<TDocument = unknown> extends AsyncSearchResponseBase {
  response: AsyncSearch<TDocument>
}

export interface AsyncSearchGetRequest extends RequestBase {
  id: Id
  body?: {
    keep_alive?: Time
    typed_keys?: boolean
    wait_for_completion_timeout?: Time
  }
}

export interface AsyncSearchGetResponse<TDocument = unknown> extends AsyncSearchDocumentResponseBase<TDocument> {
}

export interface AsyncSearchResponseBase extends ResponseBase {
  id: string
  is_partial: boolean
  is_running: boolean
  expiration_time_in_millis: EpochMillis
  start_time_in_millis: EpochMillis
}

export interface AsyncSearchStatusRequest extends RequestBase {
  id: Id
}

export interface AsyncSearchStatusResponse<TDocument = unknown> extends AsyncSearchResponseBase {
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
    docvalue_fields?: Fields
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
    sort?: Sort
    _source?: boolean | SourceFilter
    stats?: Array<string>
    stored_fields?: Fields
    suggest?: Record<string, SuggestContainer>
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

export interface AsyncSearchSubmitResponse<TDocument = unknown> extends AsyncSearchDocumentResponseBase<TDocument> {
}

export interface AttachmentProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  indexed_chars: long
  indexed_chars_field: Field
  properties: Array<string>
  target_field: Field
}

export interface AuditUsage extends SecurityFeatureToggle {
  outputs: Array<string>
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
  enabled: boolean
  authentication_type: string
}

export interface AuthenticatedUser extends XPackUser {
  authentication_realm: UserRealm
  lookup_realm: UserRealm
  authentication_provider?: AuthenticationProvider
  authentication_type: string
}

export interface AuthenticationProvider {
  type: string
  name: string
}

export interface AutoDateHistogramAggregate extends MultiBucketAggregate<KeyedBucket<long>> {
  interval: DateMathTime
}

export interface AutoDateHistogramAggregation extends BucketAggregationBase {
  buckets?: integer
  field?: Field
  format?: string
  minimum_interval?: MinimumInterval
  missing?: DateString
  offset?: string
  params?: Record<string, any>
  script?: Script
  time_zone?: string
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

export interface AutoFollowedCluster {
  cluster_name: string
  last_seen_metadata_version: long
  time_since_last_check_millis: DateString
}

export interface AverageAggregation extends FormatMetricAggregationBase {
}

export interface AverageBucketAggregation extends PipelineAggregationBase {
}

export interface BaseUrlConfig {
  url_name: string
  url_value: string
}

export interface BinaryProperty extends DocValuesPropertyBase {
}

export interface BoolQuery extends QueryBase {
  filter?: QueryContainer | Array<QueryContainer>
  minimum_should_match?: MinimumShouldMatch
  must?: QueryContainer | Array<QueryContainer>
  must_not?: QueryContainer | Array<QueryContainer>
  should?: QueryContainer | Array<QueryContainer>
}

export interface BooleanProperty extends DocValuesPropertyBase {
  boost: double
  fielddata: NumericFielddata
  index: boolean
  null_value: boolean
}

export interface BoostingQuery extends QueryBase {
  negative_boost?: double
  negative?: QueryContainer
  positive?: QueryContainer
}

export type BoundaryScanner = 'chars' | 'sentence' | 'word'

export interface BoundingBox {
  bottom_right?: GeoLocation
  top_left?: GeoLocation
  wkt?: string
}

export interface BoxPlotAggregate extends AggregateBase {
  min: double
  max: double
  q1: double
  q2: double
  q3: double
}

export interface BoxplotAggregation extends MetricAggregationBase {
  compression?: double
}

export interface BreakerStats {
  estimated_size: string
  estimated_size_in_bytes: long
  limit_size: string
  limit_size_in_bytes: long
  overhead: float
  tripped: float
}

export type Bucket = CompositeBucket | DateHistogramBucket | FiltersBucketItem | IpRangeBucket | RangeBucket | RareTermsBucket<any> | SignificantTermsBucket<any> | KeyedBucket<any>

export interface BucketAggregate extends AggregateBase {
  after_key: Record<string, any>
  bg_count: long
  doc_count: long
  doc_count_error_upper_bound: long
  sum_other_doc_count: long
  interval: DateMathTime
  items: Bucket
}

export interface BucketAggregationBase extends Aggregation {
  aggregations?: Record<string, AggregationContainer>
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
  timestamp: DateString
}

export interface BucketScriptAggregation extends PipelineAggregationBase {
  script?: Script
}

export interface BucketSelectorAggregation extends PipelineAggregationBase {
  script?: Script
}

export interface BucketSortAggregation extends Aggregation {
  from?: integer
  gap_policy?: GapPolicy
  size?: integer
  sort?: Sort
}

export interface BucketsPath {
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

export interface BulkCreateOperation extends BulkOperation {
}

export interface BulkCreateResponseItem extends BulkResponseItemBase {
}

export interface BulkDeleteOperation extends BulkOperation {
}

export interface BulkDeleteResponseItem extends BulkResponseItemBase {
}

export interface BulkIndexByScrollFailure {
  cause: MainError
  id: string
  index: string
  status: integer
  type: string
}

export interface BulkIndexOperation extends BulkOperation {
}

export interface BulkIndexResponseItem extends BulkResponseItemBase {
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

export interface BulkRequest<TSource = unknown> extends RequestBase {
  index?: IndexName
  type?: Type
  pipeline?: string
  refresh?: Refresh
  routing?: Routing
  _source?: boolean
  _source_excludes?: Fields
  _source_includes?: Fields
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
  get?: InlineGet<Record<string, any>>
}

export interface BulkResponseItemContainer {
  index?: BulkIndexResponseItem
  create?: BulkCreateResponseItem
  update?: BulkUpdateResponseItem
  delete?: BulkDeleteResponseItem
}

export interface BulkUpdateOperation extends BulkOperation {
}

export interface BulkUpdateResponseItem extends BulkResponseItemBase {
}

export type ByteSize = long | string

export type Bytes = 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb'

export interface BytesProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  target_field: Field
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

export interface Calendar {
  calendar_id: string
  description: string
  job_ids: Array<string>
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

export interface CardinalityAggregation extends MetricAggregationBase {
  precision_threshold?: integer
  rehash?: boolean
}

export interface CatAliasesRecord {
  alias: string
  filter?: string
  index: IndexName
  'routing.index'?: string
  'routing.search'?: string
  is_write_index?: string
}

export interface CatAliasesRequest extends CatRequestBase {
  name?: Names
  expand_wildcards?: ExpandWildcards
}

export type CatAliasesResponse = CatAliasesRecord[]

export interface CatAllocationRecord {
  'disk.avail'?: ByteSize
  'disk.indices'?: ByteSize
  'disk.percent'?: Percentage
  disk_ratio?: string
  'disk.total'?: ByteSize
  'disk.used'?: ByteSize
  host?: string
  ip?: string
  node: string
  shards?: string
}

export interface CatAllocationRequest extends CatRequestBase {
  node_id?: NodeIds
  bytes?: Bytes
}

export type CatAllocationResponse = CatAllocationRecord[]

export interface CatCountRecord {
  count: string
  epoch?: EpochMillis
  timestamp?: DateString
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
  assignment_explanation?: string
  'buckets.count': string
  id: string
  'node.address'?: string
  'node.ephemeral_id'?: string
  'node.id'?: string
  'node.name'?: string
  'search.bucket_avg'?: string
  'search.count': string
  'search.exp_avg_hour'?: string
  'search.time'?: string
  state: DatafeedState
}

export interface CatDatafeedsRequest extends CatRequestBase {
  datafeed_id?: Id
  allow_no_datafeeds?: boolean
}

export type CatDatafeedsResponse = CatDatafeedsRecord[]

export interface CatFielddataRecord {
  field?: string
  host?: string
  id?: string
  ip?: string
  node?: string
  size?: string
}

export interface CatFielddataRequest extends CatRequestBase {
  fields?: Fields
  bytes?: Bytes
}

export type CatFielddataResponse = CatFielddataRecord[]

export interface CatHealthRecord {
  cluster: string
  epoch?: EpochMillis
  init: string
  'node.data': string
  'node.total': string
  pending_tasks: string
  pri: string
  relo: string
  shards: string
  status: string
  timestamp?: DateString
  unassign: string
  max_task_wait_time: string
  active_shards_percent: string
}

export interface CatHealthRequest extends CatRequestBase {
  include_timestamp?: boolean
  ts?: boolean
}

export type CatHealthResponse = CatHealthRecord[]

export interface CatHelpRecord {
  endpoint: string
}

export interface CatHelpRequest extends CatRequestBase {
}

export type CatHelpResponse = CatHelpRecord[]

export interface CatIndicesRecord {
  'docs.count'?: string
  'docs.deleted'?: string
  health?: string
  index?: IndexName
  i?: string
  pri?: string
  'pri.store.size'?: ByteSize
  rep?: string
  status?: string
  'store.size'?: ByteSize
  tm?: string
  uuid?: Uuid
  cd?: string
  cds?: DateString
  'creation.date'?: string
  'creation.date.string'?: DateString
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
  assignment_explanation?: string
  'buckets.count': string
  'buckets.time.exp_avg'?: string
  'buckets.time.exp_avg_hour'?: string
  'buckets.time.max'?: string
  'buckets.time.min'?: string
  'buckets.time.total'?: string
  'data.buckets'?: string
  'data.earliest_record'?: string
  'data.empty_buckets'?: string
  'data.input_bytes'?: ByteSize
  'data.input_fields'?: string
  'data.input_records'?: string
  'data.invalid_dates'?: string
  'data.last'?: string
  'data.last_empty_bucket'?: string
  'data.last_sparse_bucket'?: string
  'data.latest_record'?: string
  'data.missing_fields'?: string
  'data.out_of_order_timestamps'?: string
  'data.processed_fields'?: string
  'data.processed_records': string
  'data.sparse_buckets'?: string
  'forecasts.memory.avg'?: string
  'forecasts.memory.min'?: string
  'forecasts.memory.total'?: string
  'forecasts.records.avg'?: string
  'forecasts.records.max'?: string
  'forecasts.records.min'?: string
  'forecasts.records.total'?: string
  'forecasts.time.avg'?: string
  'forecasts.time.max'?: string
  'forecasts.time.min'?: string
  'forecasts.total'?: string
  id: Id
  'model.bucket_allocation_failures'?: string
  'model.by_fields'?: string
  'model.bytes': ByteSize
  'model.categorization_status'?: ModelCategorizationStatus
  'model.categorized_doc_count'?: string
  'model.dead_category_count'?: string
  'model.frequent_category_count'?: string
  'model.log_time'?: string
  'model.memory_limit'?: string
  'model.memory_status': ModelMemoryStatus
  'model.over_fields'?: string
  'model.partition_fields'?: string
  'model.rare_category_count'?: string
  'model.timestamp'?: string
  'node.address'?: string
  'node.ephemeral_id'?: Id
  'node.id'?: Id
  'node.name'?: string
  opened_time?: string
  state: JobState
}

export interface CatJobsRequest extends CatRequestBase {
  job_id?: Id
  allow_no_jobs?: boolean
  bytes?: Bytes
}

export type CatJobsResponse = CatJobsRecord[]

export interface CatMasterRecord {
  id: string
  ip: string
  node: string
  host: string
}

export interface CatMasterRequest extends CatRequestBase {
}

export type CatMasterResponse = CatMasterRecord[]

export interface CatNodeAttributesRecord {
  attr: string
  host?: string
  id?: Id
  ip?: string
  node?: string
  port?: long
  pid?: long
  value: string
}

export interface CatNodeAttributesRequest extends CatRequestBase {
}

export type CatNodeAttributesResponse = CatNodeAttributesRecord[]

export interface CatNodesRecord {
  build?: string
  completion_size?: string
  cpu?: string
  diskAvail?: ByteSize
  diskTotal?: ByteSize
  diskUsed?: ByteSize
  diskUsedPercent?: ByteSize
  fielddata_evictions?: string
  fielddata_memory?: string
  'file_desc.current'?: string
  'file_desc.max'?: string
  'file_desc.percent'?: Percentage
  filter_cache_evictions?: string
  filter_cache_memory?: string
  flush_total?: string
  flush_total_time?: string
  get_current?: string
  get_exists_time?: string
  get_exists_total?: string
  get_missing_time?: string
  get_missing_total?: string
  get_time?: string
  get_total?: string
  'heap.current'?: string
  'heap.max'?: string
  'heap.percent'?: string
  http?: string
  id?: Id
  id_cache_memory?: string
  indexing_delete_current?: string
  indexing_delete_time?: string
  indexing_delete_total?: string
  indexing_index_current?: string
  indexing_index_time?: string
  indexing_index_total?: string
  ip?: string
  jdk?: string
  load_15m?: string
  load_5m?: string
  load_1m?: string
  master?: string
  merges_current?: string
  merges_current_docs?: string
  merges_current_size?: string
  merges_total?: string
  merges_total_docs?: string
  merges_total_time?: string
  name?: string
  node_id?: Id
  'node.role'?: string
  percolate_current?: string
  percolate_memory?: string
  percolate_queries?: string
  percolate_time?: string
  percolate_total?: string
  pid?: string
  port?: string
  'ram.current'?: string
  'ram.max'?: string
  'ram.percent'?: Percentage
  refresh_time?: string
  refresh_total?: string
  search_fetch_current?: string
  search_fetch_time?: string
  search_fetch_total?: string
  search_open_contexts?: string
  search_query_current?: string
  search_query_time?: string
  search_query_total?: string
  segments_count?: string
  segments_index_writer_max_memory?: string
  segments_index_writer_memory?: string
  segments_memory?: string
  segments_version_map_memory?: string
  uptime?: string
  version?: string
  disk?: ByteSize
  dt?: ByteSize
  du?: ByteSize
  dup?: string
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
  description?: string
  id?: Id
  isolation?: string
  name: string
  type?: Type
  url?: string
  version: string
}

export interface CatPluginsRequest extends CatRequestBase {
}

export type CatPluginsResponse = CatPluginsRecord[]

export interface CatRecoveryRecord {
  bytes?: string
  b?: string
  bytes_percent?: Percentage
  bp?: Percentage
  bytes_recovered?: string
  br?: string
  bytes_total?: string
  tb?: string
  files?: string
  f?: string
  files_percent?: Percentage
  fp?: Percentage
  files_recovered?: string
  fr?: string
  files_total?: string
  tf?: string
  index?: IndexName
  i?: IndexName
  repository?: string
  rep?: string
  shard?: string
  s?: string
  snapshot?: string
  snap?: string
  source_host?: string
  shost?: string
  source_node?: string
  stage?: string
  st?: string
  target_host?: string
  thost?: string
  target_node?: string
  time?: string
  t?: string
  translog_ops?: string
  to?: string
  translog_ops_percent?: Percentage
  top?: Percentage
  translog_ops_recovered?: string
  tor?: string
  type?: Type
  ty?: Type
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

export interface CatRequestBase extends RequestBase, CommonCatQueryParameters {
}

export interface CatResponseBase<TCatRecord = unknown> extends ResponseBase {
}

export interface CatSegmentsRecord {
  committed?: string
  compound?: string
  'docs.count'?: string
  'docs.deleted'?: string
  generation?: string
  id?: Id
  index?: IndexName
  i?: IndexName
  ip?: string
  prirep?: string
  searchable?: string
  segment?: string
  shard?: string
  size?: ByteSize
  'size.memory'?: ByteSize
  version?: string
}

export interface CatSegmentsRequest extends CatRequestBase {
  index?: Indices
  bytes?: Bytes
}

export type CatSegmentsResponse = CatSegmentsRecord[]

export interface CatShardsRecord {
  'completion.size'?: string
  docs?: string
  'fielddata.evictions'?: string
  'fielddata.memory_size'?: string
  'filter_cache.memory_size'?: string
  'flush.total'?: string
  'flush.total_time'?: string
  'get.current'?: string
  'get.exists_time'?: string
  'get.exists_total'?: string
  'get.missing_time'?: string
  'get.missing_total'?: string
  'get.time'?: string
  'get.total'?: string
  id?: Id
  'id_cache.memory_size'?: string
  index?: IndexName
  i?: IndexName
  'indexing.delete_current'?: string
  'indexing.delete_time'?: string
  'indexing.delete_total'?: string
  'indexing.index_current'?: string
  'indexing.index_time'?: string
  'indexing.index_total'?: string
  ip?: string
  'merges.current'?: string
  'merges.current_docs'?: string
  'merges.current_size'?: string
  'merges.total_docs'?: string
  'merges.total_size'?: string
  'merges.total_time'?: string
  node?: string
  'percolate.current'?: string
  'percolate.memory_size'?: string
  'percolate.queries'?: string
  'percolate.time'?: string
  'percolate.total'?: string
  prirep?: string
  'refresh.time'?: string
  'refresh.total'?: string
  'search.fetch_current'?: string
  'search.fetch_time'?: string
  'search.fetch_total'?: string
  'search.open_contexts'?: string
  'search.query_current'?: string
  'search.query_time'?: string
  'search.query_total'?: string
  'segments.count'?: string
  'segments.fixed_bitset_memory'?: string
  'segments.index_writer_max_memory'?: string
  'segments.index_writer_memory'?: string
  'segments.memory'?: string
  'segments.version_map_memory'?: string
  shard?: string
  state?: string
  store?: string
  'warmer.current'?: string
  'warmer.total'?: string
  'warmer.total_time'?: string
}

export interface CatShardsRequest extends CatRequestBase {
  index?: Indices
  bytes?: Bytes
}

export type CatShardsResponse = CatShardsRecord[]

export interface CatSnapshotsRecord {
  duration: Time
  end_epoch: EpochMillis
  end_time: string
  failed_shards: string
  id: Id
  indices: string
  start_epoch: EpochMillis
  start_time: string
  status: string
  successful_shards: string
  total_shards: string
}

export interface CatSnapshotsRequest extends CatRequestBase {
  repository?: Names
  ignore_unavailable?: boolean
}

export type CatSnapshotsResponse = CatSnapshotsRecord[]

export interface CatTasksRecord {
  action: string
  ip?: string
  node?: string
  parent_task_id?: string
  running_time?: string
  start_time?: string
  task_id?: string
  timestamp?: string
  type?: string
  description?: string
  x_opaque_id?: string
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
  order?: string
  version?: string
  composed_of?: string
}

export interface CatTemplatesRequest extends CatRequestBase {
  name?: Name
}

export type CatTemplatesResponse = CatTemplatesRecord[]

export interface CatThreadPoolRecord {
  active?: string
  completed?: string
  core?: string
  ephemeral_node_id?: Id
  host?: string
  h?: string
  id?: Id
  ip?: string
  i?: string
  keep_alive?: Time
  largest?: string
  max?: string
  name?: string
  node_id?: Id
  node_name?: string
  pool_size?: string
  port?: string
  po?: string
  pid?: string
  queue?: string
  queue_size?: string
  rejected?: string
  size?: string
  type?: string
}

export interface CatThreadPoolRequest extends CatRequestBase {
  thread_pool_patterns?: Names
  size?: Size | boolean
}

export type CatThreadPoolResponse = CatThreadPoolRecord[]

export interface CatTrainedModelsRecord {
  created_by?: string
  create_time: DateString
  data_frame_analytics_id?: string
  'data_frame.id': Id
  description?: string
  heap_size: ByteSize
  id: Id
  'ingest.count'?: long
  'ingest.current'?: long
  'ingest.failed'?: long
  'ingest.pipelines': string
  'ingest.time'?: long
  license?: string
  operations: string
  version?: string
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
  create_time: DateString
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

export interface CategorizationAnalyzer {
  filter?: Array<string | TokenFilter>
  tokenizer?: string | Tokenizer
  char_filter?: Array<string | CharFilter>
}

export interface CategoryDefinition {
  category_id: long
  examples: Array<string>
  job_id: string
  max_matching_length: long
  regex: string
  terms: string
}

export type CategoryId = string

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

export interface CcrUsage extends XPackUsage {
  auto_follow_patterns_count: integer
  follower_indices_count: integer
}

export interface ChainInput {
  inputs: Record<string, InputContainer>
}

export interface ChainTransform {
  transforms: Array<TransformContainer>
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

export type CharFilter = HtmlStripCharFilter | MappingCharFilter | PatternReplaceTokenFilter

export interface CharFilterBase {
  type: string
  version?: string
}

export interface CharFilterDetail {
  filtered_text: Array<string>
  name: string
}

export interface CharFilterTypes {
  char_filter_types: Array<FieldTypesStats>
  tokenizer_types: Array<FieldTypesStats>
  filter_types: Array<FieldTypesStats>
  analyzer_types: Array<FieldTypesStats>
  built_in_char_filters: Array<FieldTypesStats>
  built_in_tokenizers: Array<FieldTypesStats>
  built_in_filters: Array<FieldTypesStats>
  built_in_analyzers: Array<FieldTypesStats>
}

export interface CharGroupTokenizer extends TokenizerBase {
  tokenize_on_chars: Array<string>
}

export type CharacterType = 'Whitespace' | 'Alpha' | 'Comment'

export interface ChiSquareHeuristic {
  background_is_superset: boolean
  include_negatives: boolean
}

export type ChildScoreMode = 'none' | 'avg' | 'sum' | 'max' | 'min'

export interface ChildrenAggregation extends BucketAggregationBase {
  type?: RelationName
}

export interface ChunkingConfig {
  mode: ChunkingMode
  time_span?: Time
}

export type ChunkingMode = 'auto' | 'manual' | 'off'

export interface CircleProcessor extends ProcessorBase {
  error_distance: double
  field: Field
  ignore_missing: boolean
  shape_type: ShapeType
  target_field: Field
}

export interface CircuitBreakerSettings {
  fielddata_limit: string
  fielddata_overhead: float
  request_limit: string
  request_overhead: float
  total_limit: string
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

export interface ClearCacheRequest extends RequestBase {
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  fielddata?: boolean
  fields?: Fields
  ignore_unavailable?: boolean
  query?: boolean
  request?: boolean
}

export interface ClearCacheResponse extends ShardsOperationResponseBase {
}

export interface ClearCachedRealmsRequest extends RequestBase {
  realms: Names
  usernames?: Array<string>
}

export interface ClearCachedRealmsResponse extends ResponseBase {
  cluster_name: string
  nodes: Record<string, SecurityNode>
}

export interface ClearCachedRolesRequest extends RequestBase {
  name: Names
}

export interface ClearCachedRolesResponse extends ResponseBase {
  cluster_name: string
  nodes: Record<string, SecurityNode>
}

export interface ClearScrollRequest extends RequestBase {
  scroll_id?: Ids
  body?: {
    scroll_id?: Array<string>
  }
}

export interface ClearScrollResponse extends ResponseBase {
}

export interface ClearSqlCursorRequest extends RequestBase {
  body: {
    cursor?: string
  }
}

export interface ClearSqlCursorResponse extends ResponseBase {
  succeeded: boolean
}

export interface CloneIndexRequest extends RequestBase {
  index: IndexName
  target: Name
  master_timeout?: Time
  timeout?: Time
  wait_for_active_shards?: string | number
  body?: {
    aliases?: Record<IndexName, Alias>
    settings?: Record<string, any>
  }
}

export interface CloneIndexResponse extends AcknowledgedResponseBase {
  index: string
  shards_acknowledged: boolean
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

export interface CloseJobRequest extends RequestBase {
  job_id: Id
  allow_no_jobs?: boolean
  force?: boolean
  timeout?: Time
}

export interface CloseJobResponse extends ResponseBase {
  closed: boolean
}

export interface CloseShardResult {
  failures: Array<ShardFailure>
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
  allocate_explanation?: string
  allocation_delay?: string
  allocation_delay_in_millis?: long
  can_allocate?: Decision
  can_move_to_other_node?: Decision
  can_rebalance_cluster?: Decision
  can_rebalance_cluster_decisions?: Array<AllocationDecision>
  can_rebalance_to_other_node?: Decision
  can_remain_decisions?: Array<AllocationDecision>
  can_remain_on_current_node?: Decision
  cluster_info?: ClusterInfo
  configured_delay?: string
  configured_delay_in_millis?: long
  current_node?: CurrentNode
  current_state: string
  index: string
  move_explanation?: string
  node_allocation_decisions?: Array<NodeAllocationExplanation>
  primary: boolean
  rebalance_explanation?: string
  remaining_delay?: string
  remaining_delay_in_millis?: long
  shard: integer
  unassigned_info?: UnassignedInformation
}

export interface ClusterCertificateInformation {
  alias: string
  expiry: DateString
  format: string
  has_private_key: boolean
  path: string
  serial_number: string
  subject_dn: string
}

export interface ClusterFileSystem {
  available_in_bytes: long
  free_in_bytes: long
  total_in_bytes: long
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
  defaults: Record<string, any>
}

export interface ClusterHealthRequest extends RequestBase {
  index?: Indices
  expand_wildcards?: ExpandWildcards
  level?: Level
  local?: boolean
  master_timeout?: Time
  timeout?: Time
  wait_for_active_shards?: WaitForActiveShards
  wait_for_events?: WaitForEvents
  wait_for_nodes?: string
  wait_for_no_initializing_shards?: boolean
  wait_for_no_relocating_shards?: boolean
  wait_for_status?: WaitForStatus
}

export interface ClusterHealthResponse extends ResponseBase {
  active_primary_shards: integer
  active_shards: integer
  active_shards_percent_as_number: Percentage
  cluster_name: string
  delayed_unassigned_shards: integer
  indices?: Record<IndexName, IndexHealthStats>
  initializing_shards: integer
  number_of_data_nodes: integer
  number_of_in_flight_fetch: integer
  number_of_nodes: integer
  number_of_pending_tasks: integer
  relocating_shards: integer
  status: Health
  task_max_waiting_in_queue_millis: EpochMillis
  timed_out: boolean
  unassigned_shards: integer
}

export interface ClusterIndicesShardsIndexStats {
  primaries: ClusterShardMetrics
  replication: ClusterShardMetrics
  shards: ClusterShardMetrics
}

export interface ClusterIndicesShardsStats {
  index?: ClusterIndicesShardsIndexStats
  primaries?: double
  replication?: double
  total?: double
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
  mappings: FieldTypesMappings
  analysis: CharFilterTypes
  versions?: Array<IndicesVersionsStats>
}

export interface ClusterInfo {
  nodes: Record<string, NodeDiskUsage>
  shard_sizes: Record<string, long>
  shard_paths: Record<string, string>
  reserved_sizes: Array<ReservedSize>
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
  data_cold: integer
  data_content: integer
  data_warm: integer
  data_hot: integer
  ml: integer
  remote_cluster_client: integer
  transform: integer
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

export interface ClusterOperatingSystemPrettyNane {
  count: integer
  pretty_name: string
}

export interface ClusterOperatingSystemStats {
  allocated_processors: integer
  available_processors: integer
  mem: OperatingSystemMemoryInfo
  names: Array<ClusterOperatingSystemName>
  pretty_names: Array<ClusterOperatingSystemPrettyNane>
}

export interface ClusterPendingTasksRequest extends RequestBase {
  local?: boolean
  master_timeout?: Time
}

export interface ClusterPendingTasksResponse extends ResponseBase {
  tasks: Array<PendingTask>
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

export interface ClusterRerouteCommand {
  cancel: ClusterRerouteCommandAction
}

export interface ClusterRerouteCommandAction {
  index: IndexName
  shard: integer
  node: string
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
  metric?: Metrics
  retry_failed?: boolean
  timeout?: Time
  body?: {
    commands?: Array<ClusterRerouteCommand>
  }
}

export interface ClusterRerouteResponse extends ResponseBase {
  acknowledged: boolean
  explanations: Array<ClusterRerouteExplanation>
  state: Array<string>
}

export interface ClusterShardMetrics {
  avg: double
  max: double
  min: double
}

export interface ClusterStateBlockIndex {
  description: string
  retryable: boolean
  levels: Array<string>
  aliases?: Array<IndexAlias>
  aliases_version?: integer
  version?: integer
  mapping_version?: integer
  settings_version?: integer
  routing_num_shards?: integer
  state?: string
}

export interface ClusterStateBlocks {
  indices?: Record<IndexName, Record<string, ClusterStateBlockIndex>>
}

export interface ClusterStateMetadata {
  cluster_uuid: Uuid
  cluster_uuid_committed: boolean
  templates: ClusterStateMetadataTemplate
  indices?: Record<IndexName, Record<string, ClusterStateBlockIndex>>
  'index-graveyard': ClusterStateMetadataIndexGraveyard
  cluster_coordination: ClusterStateMetadataClusterCoordination
}

export interface ClusterStateMetadataClusterCoordination {
  term: integer
  last_committed_config: Array<string>
  last_accepted_config: Array<string>
  voting_config_exclusions: Array<string>
}

export interface ClusterStateMetadataIndexGraveyard {
  tombstones: Array<string>
}

export interface ClusterStateMetadataTemplate {
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
  cluster_uuid: Uuid
  master_node?: string
  state?: Array<string>
  state_uuid?: Uuid
  version?: integer
  blocks?: ClusterStateBlocks
  metadata?: ClusterStateMetadata
}

export interface ClusterStatistics {
  skipped: integer
  successful: integer
  total: integer
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

export type ClusterStatus = 'green' | 'yellow' | 'red'

export interface Collector {
  name: string
  reason: string
  time_in_nanos: long
  children?: Array<Collector>
}

export interface CommonCatQueryParameters {
  format?: string
  h?: Names
  help?: boolean
  local?: boolean
  master_timeout?: Time
  s?: Array<string>
  v?: boolean
}

export interface CommonGramsTokenFilter extends TokenFilterBase {
  common_words: Array<string>
  common_words_path: string
  ignore_case: boolean
  query_mode: boolean
}

export interface CommonQueryParameters {
  error_trace?: boolean
  filter_path?: string | Array<string>
  human?: boolean
  pretty?: boolean
  source_query_string?: string
}

export interface CommonTermsQuery extends QueryBase {
  analyzer?: string
  cutoff_frequency?: double
  high_freq_operator?: Operator
  low_freq_operator?: Operator
  minimum_should_match?: MinimumShouldMatch
  query?: string
}

export interface CompactNodeInfo {
  name: string
}

export interface CompareCondition {
  comparison: string
  path: string
  value: any
}

export interface CompletionProperty extends DocValuesPropertyBase {
  analyzer: string
  contexts: Array<SuggestContext>
  max_input_length: integer
  preserve_position_increments: boolean
  preserve_separators: boolean
  search_analyzer: string
}

export interface CompletionStats {
  size_in_bytes: long
  fields?: Record<Field, CompletionStats>
}

export interface CompletionSuggestOption<TDocument = unknown> {
  collate_match?: boolean
  contexts: Record<string, Array<Context>>
  fields: Record<string, any>
  _id: string
  _index: IndexName
  _type?: Type
  _routing: Routing
  _score: double
  _source: TDocument
  text: string
}

export interface CompletionSuggester extends SuggesterBase {
  contexts?: Record<string, Array<SuggestContextQuery>>
  fuzzy?: SuggestFuzziness
  prefix?: string
  regex?: string
  skip_duplicates?: boolean
}

export interface CompositeAggregation extends BucketAggregationBase {
  after?: Record<string, string | float | null>
  size?: integer
  sources?: Array<Record<string, CompositeAggregationSource>>
}

export interface CompositeAggregationSource {
  terms?: TermsAggregation
  histogram?: HistogramAggregation
  date_histogram?: DateHistogramAggregation
  geotile_grid?: GeoTileGridAggregation
}

export interface CompositeBucketKeys {
}
export type CompositeBucket = CompositeBucketKeys |
    { [property: string]: Aggregate }

export interface CompositeBucketAggregate extends MultiBucketAggregate<Record<string, any>> {
  after_key: Record<string, any>
}

export interface CompoundWordTokenFilterBase extends TokenFilterBase {
  hyphenation_patterns_path: string
  max_subword_size: integer
  min_subword_size: integer
  min_word_size: integer
  only_longest_match: boolean
  word_list: Array<string>
  word_list_path: string
}

export interface Condition {
}

export interface ConditionContainer {
  always?: AlwaysCondition
  array_compare?: ArrayCompareCondition
  compare?: CompareCondition
  never?: NeverCondition
  script?: ScriptCondition
}

export type ConditionOperator = 'gt' | 'gte' | 'lt' | 'lte'

export interface ConditionTokenFilter extends TokenFilterBase {
  filter: Array<string>
  script: Script
}

export type ConditionType = 'always' | 'never' | 'script' | 'compare' | 'array_compare'

export type Conflicts = 'abort' | 'proceed'

export type ConnectionScheme = 'http' | 'https'

export interface ConstantKeywordProperty extends PropertyBase {
  value: object
}

export interface ConstantScoreQuery extends QueryBase {
  filter?: QueryContainer
  boost?: float
}

export type Context = string | GeoLocation

export interface ConvertProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  target_field: Field
  type: ConvertProcessorType
}

export type ConvertProcessorType = 'integer' | 'long' | 'float' | 'double' | 'string' | 'boolean' | 'auto'

export interface CoordinatorStats {
  executed_searches_total: long
  node_id: string
  queue_size: integer
  remote_requests_current: integer
  remote_requests_total: long
}

export interface CorePropertyBase extends PropertyBase {
  copy_to: Fields
  fields: Record<PropertyName, PropertyBase>
  similarity: string
  store: boolean
}

export type CountFunction = 'Count' | 'HighCount' | 'LowCount'

export interface CountRequest extends RequestBase {
  index?: Indices
  type?: Types
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
  q?: string
  body?: {
    query?: QueryContainer
  }
}

export interface CountResponse extends ResponseBase {
  count: long
  _shards: ShardStatistics
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
  expiration: long
  id: string
  name: string
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

export interface CreateRequest<TDocument = unknown> extends RequestBase {
  id: Id
  index: IndexName
  type?: Type
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

export interface CronExpression extends ScheduleBase {
}

export interface CsvProcessor extends ProcessorBase {
  empty_value: any
  field: Field
  ignore_missing: boolean
  quote: string
  separator: string
  target_fields: Fields
  trim: boolean
}

export interface CumulativeCardinalityAggregation extends PipelineAggregationBase {
}

export interface CumulativeSumAggregation extends PipelineAggregationBase {
}

export interface CurrentNode {
  id: string
  name: string
  attributes: Record<string, string>
  transport_address: string
  weight_ranking: integer
}

export interface CustomAnalyzer extends AnalyzerBase {
  char_filter: Array<string>
  filter: Array<string>
  position_increment_gap: integer
  position_offset_gap: integer
  tokenizer: string
}

export interface CustomResponseBuilderBase {
}

export interface CustomSettings {
  custom_urls?: Array<UrlConfig>
  created_by?: string
  job_tags?: Record<string, string>
}

export type DFIIndependenceMeasure = 'standardized' | 'saturated' | 'chisquared'

export type DFRAfterEffect = 'no' | 'b' | 'l'

export type DFRBasicModel = 'be' | 'd' | 'g' | 'if' | 'in' | 'ine' | 'p'

export interface DailySchedule {
  at: Array<string> | TimeOfDay
}

export type DataAttachmentFormat = 'json' | 'yaml'

export interface DataCounts {
  bucket_count: long
  earliest_record_timestamp: long
  empty_bucket_count: long
  input_bytes: long
  input_field_count: long
  input_record_count: long
  invalid_date_count: long
  job_id: string
  last_data_time: long
  latest_empty_bucket_timestamp: long
  latest_record_timestamp: long
  latest_sparse_bucket_timestamp: long
  missing_field_count: long
  out_of_order_timestamp_count: long
  processed_field_count: long
  processed_record_count: long
  sparse_bucket_count: long
}

export interface DataDescription {
  format?: string
  time_field: Field
  time_format?: string
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

export interface Datafeed {
  aggregations?: Record<string, AggregationContainer>
  aggs?: Record<string, AggregationContainer>
  chunking_config: ChunkingConfig
  datafeed_id: string
  frequency?: Timestamp
  indices: Array<string>
  indexes?: Array<string>
  job_id: Id
  max_empty_searches?: integer
  query: QueryContainer
  query_delay?: Timestamp
  script_fields?: Record<string, ScriptField>
  scroll_size?: integer
  delayed_data_check_config: DelayedDataCheckConfig
  runtime_mappings?: RuntimeFields
}

export interface DatafeedCount {
  count: long
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

export interface Datafeeds {
  scroll_size: integer
}

export interface DateDecayFunctionKeys extends DecayFunctionBase {
}
export type DateDecayFunction = DateDecayFunctionKeys |
    { [property: string]: DecayPlacement<DateMath, Time> }

export interface DateField {
  field: Field
  format?: string
  include_unmapped?: boolean
}

export interface DateHistogramAggregation extends BucketAggregationBase {
  calendar_interval?: DateInterval | Time
  extended_bounds?: ExtendedBounds<DateMath | long>
  hard_bounds?: ExtendedBounds<DateMath | long>
  field?: Field
  fixed_interval?: DateInterval | Time
  format?: string
  interval?: DateInterval | Time
  min_doc_count?: integer
  missing?: DateString
  offset?: Time
  order?: HistogramOrder
  params?: Record<string, any>
  script?: Script
  time_zone?: string
}

export interface DateHistogramBucketKeys {
}
export type DateHistogramBucket = DateHistogramBucketKeys |
    { [property: string]: Aggregate }

export interface DateHistogramRollupGrouping {
  delay: Time
  field: Field
  format: string
  interval: Time
  time_zone: string
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

export type DateInterval = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year'

export type DateMath = string

export type DateMathExpression = string

export type DateMathOperation = '+' | '-'

export type DateMathTime = string

export interface DateMathTimeParsed {
  factor: integer
  interval: DateMathTimeUnit
}

export type DateMathTimeUnit = 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y'

export interface DateNanosProperty extends DocValuesPropertyBase {
  boost: double
  format: string
  ignore_malformed: boolean
  index: boolean
  null_value: DateString
  precision_step: integer
}

export interface DateProcessor extends ProcessorBase {
  field: Field
  formats: Array<string>
  locale: string
  target_field: Field
  timezone: string
}

export interface DateProperty extends DocValuesPropertyBase {
  boost: double
  fielddata: NumericFielddata
  format: string
  ignore_malformed: boolean
  index: boolean
  null_value: DateString
  precision_step: integer
}

export interface DateRangeAggregation extends BucketAggregationBase {
  field?: Field
  format?: string
  missing?: Missing
  ranges?: Array<DateRangeExpression>
  time_zone?: string
}

export interface DateRangeExpression {
  from?: DateMath | float
  from_as_string?: string
  key?: string
  to?: DateMath | float
  doc_count?: long
}

export interface DateRangeProperty extends RangePropertyBase {
  format: string
}

export type DateRounding = 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y'

export type DateString = string

export type Day = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

export interface DeactivateWatchRequest extends RequestBase {
  watch_id: Name
}

export interface DeactivateWatchResponse extends ResponseBase {
  status: ActivationStatus
}

export type DecayFunction = DateDecayFunction | NumericDecayFunction | GeoDecayFunction

export interface DecayFunctionBase extends ScoreFunctionBase {
  multi_value_mode?: MultiValueMode
}

export interface DecayPlacement<TOrigin = unknown, TScale = unknown> {
  decay?: double
  offset?: TScale
  scale?: TScale
  origin?: TOrigin
}

export type Decision = 'yes' | 'no' | 'worse_balance' | 'throttled' | 'awaiting_info' | 'allocation_delayed' | 'no_valid_shard_copy' | 'no_attempt'

export type DefaultOperator = 'AND' | 'OR'

export interface Defaults {
  anomaly_detectors: AnomalyDetectors
  datafeeds: Datafeeds
}

export interface DelayedDataCheckConfig {
  check_window?: Time
  enabled: boolean
}

export interface DeleteAliasRequest extends RequestBase {
  index: Indices
  name: Names
  master_timeout?: Time
  timeout?: Time
}

export interface DeleteAliasResponse extends ResponseBase {
}

export interface DeleteAutoFollowPatternRequest extends RequestBase {
  name: Name
}

export interface DeleteAutoFollowPatternResponse extends AcknowledgedResponseBase {
}

export interface DeleteByQueryRequest extends RequestBase {
  index: Indices
  type?: Types
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
  source_excludes?: Fields
  source_includes?: Fields
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
  batches?: long
  deleted?: long
  failures?: Array<BulkIndexByScrollFailure>
  noops?: long
  requests_per_second?: float
  retries?: Retries
  slice_id?: integer
  task?: TaskId
  throttled_millis?: long
  throttled_until_millis?: long
  timed_out?: boolean
  took?: long
  total?: long
  version_conflicts?: long
}

export interface DeleteByQueryRethrottleRequest extends RequestBase {
  task_id: Id
  requests_per_second?: long
}

export interface DeleteByQueryRethrottleResponse extends ListTasksResponse {
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

export interface DeleteCalendarRequest extends RequestBase {
  calendar_id: Id
}

export interface DeleteCalendarResponse extends AcknowledgedResponseBase {
}

export interface DeleteDatafeedRequest extends RequestBase {
  datafeed_id: Id
  force?: boolean
}

export interface DeleteDatafeedResponse extends AcknowledgedResponseBase {
}

export interface DeleteEnrichPolicyRequest extends RequestBase {
  name: Name
}

export interface DeleteEnrichPolicyResponse extends AcknowledgedResponseBase {
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

export interface DeleteIndexTemplateRequest extends RequestBase {
  name: Name
  master_timeout?: Time
  timeout?: Time
}

export interface DeleteIndexTemplateResponse extends AcknowledgedResponseBase {
}

export interface DeleteJobRequest extends RequestBase {
  job_id: Id
  force?: boolean
  wait_for_completion?: boolean
}

export interface DeleteJobResponse extends AcknowledgedResponseBase {
}

export interface DeleteLicenseRequest extends RequestBase {
}

export interface DeleteLicenseResponse extends ResponseBase {
}

export interface DeleteLifecycleRequest extends RequestBase {
  policy?: Name
  policy_id: Id
}

export interface DeleteLifecycleResponse extends AcknowledgedResponseBase {
}

export interface DeleteModelSnapshotRequest extends RequestBase {
  job_id: Id
  snapshot_id: Id
}

export interface DeleteModelSnapshotResponse extends AcknowledgedResponseBase {
}

export interface DeletePipelineRequest extends RequestBase {
  id: Id
  master_timeout?: Time
  timeout?: Time
}

export interface DeletePipelineResponse extends AcknowledgedResponseBase {
}

export interface DeletePrivilegesRequest extends RequestBase {
  application: Name
  name: Name
  refresh?: Refresh
}

export interface DeletePrivilegesResponse extends DictionaryResponseBase<string, Record<string, FoundUserPrivilege>> {
}

export interface DeleteRepositoryRequest extends RequestBase {
  repository: Names
  master_timeout?: Time
  timeout?: Time
}

export interface DeleteRepositoryResponse extends AcknowledgedResponseBase {
}

export interface DeleteRequest extends RequestBase {
  id: Id
  index: IndexName
  type?: Type
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

export interface DeleteRoleMappingRequest extends RequestBase {
  name: Name
  refresh?: Refresh
}

export interface DeleteRoleMappingResponse extends ResponseBase {
  found: boolean
}

export interface DeleteRoleRequest extends RequestBase {
  name: Name
  refresh?: Refresh
}

export interface DeleteRoleResponse extends ResponseBase {
  found: boolean
}

export interface DeleteRollupJobRequest extends RequestBase {
  id: Id
}

export interface DeleteRollupJobResponse extends AcknowledgedResponseBase {
}

export interface DeleteScriptRequest extends RequestBase {
  id: Id
  master_timeout?: Time
  timeout?: Time
}

export interface DeleteScriptResponse extends AcknowledgedResponseBase {
}

export interface DeleteSnapshotLifecycleRequest extends RequestBase {
  policy_id: Name
}

export interface DeleteSnapshotLifecycleResponse extends AcknowledgedResponseBase {
}

export interface DeleteSnapshotRequest extends RequestBase {
  repository: Name
  snapshot: Name
  master_timeout?: Time
}

export interface DeleteSnapshotResponse extends AcknowledgedResponseBase {
}

export interface DeleteTransformRequest extends RequestBase {
  transform_id: Name
  force?: boolean
}

export interface DeleteTransformResponse extends AcknowledgedResponseBase {
}

export interface DeleteUserRequest extends RequestBase {
  username: Name
  refresh?: Refresh
}

export interface DeleteUserResponse extends ResponseBase {
  found: boolean
}

export interface DeleteWatchRequest extends RequestBase {
  id: Name
}

export interface DeleteWatchResponse extends ResponseBase {
  found: boolean
  _id: string
  _version: integer
}

export type DelimitedPayloadEncoding = 'int' | 'float' | 'identity'

export interface DelimitedPayloadTokenFilter extends TokenFilterBase {
  delimiter: string
  encoding: DelimitedPayloadEncoding
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
  ml_settings: Array<DeprecationInfo>
}

export type DeprecationWarningLevel = 'none' | 'info' | 'warning' | 'critical'

export interface DerivativeAggregation extends PipelineAggregationBase {
}

export interface DetectionRule {
  actions: Array<RuleAction>
  conditions: Array<RuleCondition>
  scope?: Record<Field, FilterRef>
}

export interface Detector {
  by_field_name?: Field
  custom_rules?: Array<DetectionRule>
  detector_description?: string
  detector_index?: integer
  exclude_frequent?: ExcludeFrequent
  field_name?: Field
  function: string
  use_null?: boolean
  over_field_name?: Field
  partition_field_name?: Field
}

export interface DictionaryDecompounderTokenFilter extends CompoundWordTokenFilterBase {
}

export interface DictionaryResponseBase<TKey = unknown, TValue = unknown> extends ResponseBase {
  [key: string]: TValue
}

export interface DirectGenerator {
  field: Field
  max_edits?: integer
  max_inspections?: float
  max_term_freq?: float
  min_doc_freq?: float
  min_word_length?: integer
  post_filter?: string
  pre_filter?: string
  prefix_length?: integer
  size?: integer
  suggest_mode?: SuggestMode
}

export interface DisMaxQuery extends QueryBase {
  queries?: Array<QueryContainer>
  tie_breaker?: double
  boost?: float
}

export interface DisableUserRequest extends RequestBase {
  username: Name
  refresh?: Refresh
}

export interface DisableUserResponse extends ResponseBase {
}

export interface DiscoveryNode {
  attributes: Record<string, string>
  ephemeral_id: string
  id: string
  name: string
  transport_address: string
}

export interface DiskUsage {
  path: string
  total_bytes: long
  used_bytes: long
  free_bytes: long
  free_disk_percent: double
  used_disk_percent: double
}

export interface DissectProcessor extends ProcessorBase {
  append_separator: string
  field: Field
  ignore_missing: boolean
  pattern: string
}

export type Distance = string

export interface DistanceFeatureQuery extends QueryBase {
  origin?: Array<number> | GeoCoordinate | DateMath
  pivot?: Distance | Time
  field?: Field
}

export interface DistanceParsed {
  precision: double
  unit: DistanceUnit
}

export type DistanceUnit = 'in' | 'ft' | 'yd' | 'mi' | 'nmi' | 'km' | 'm' | 'cm' | 'mm'

export type DistinctCountFunction = 'DistinctCount' | 'LowDistinctCount' | 'HighDistinctCount'

export interface DiversifiedSamplerAggregation extends BucketAggregationBase {
  execution_hint?: SamplerAggregationExecutionHint
  max_docs_per_value?: integer
  script?: Script
  shard_size?: integer
  field?: Field
}

export interface DocStats {
  count: long
  deleted: long
}

export interface DocValueField {
  field: Field
  format?: string
}

export interface DocValuesPropertyBase extends CorePropertyBase {
  doc_values: boolean
}

export interface DocumentExistsRequest extends RequestBase {
  id: Id
  index: IndexName
  type?: Type
  preference?: string
  realtime?: boolean
  refresh?: boolean
  routing?: Routing
  source_enabled?: boolean
  source_excludes?: Fields
  source_includes?: Fields
  stored_fields?: Fields
  version?: long
  version_type?: VersionType
}

export type DocumentExistsResponse = boolean

export interface DocumentSimulation {
  _id: string
  _index: string
  _ingest: Ingest
  _parent: string
  _routing: string
  _source: Record<string, any>
  _type: string
}

export interface DotExpanderProcessor extends ProcessorBase {
  field: Field
  path: string
}

export interface DoubleRangeProperty extends RangePropertyBase {
}

export interface DropProcessor extends ProcessorBase {
}

export type DynamicMapping = 'strict'

export interface DynamicResponseBase extends ResponseBase {
}

export interface DynamicTemplate {
  mapping?: PropertyBase
  match?: string
  match_mapping_type?: string
  match_pattern?: MatchType
  path_match?: string
  path_unmatch?: string
  unmatch?: string
}

export type EdgeNGramSide = 'front' | 'back'

export interface EdgeNGramTokenFilter extends TokenFilterBase {
  max_gram: integer
  min_gram: integer
  side: EdgeNGramSide
}

export interface EdgeNGramTokenizer extends TokenizerBase {
  custom_token_chars: string
  max_gram: integer
  min_gram: integer
  token_chars: Array<TokenChar>
}

export interface ElasticsearchResponse {
}

export interface ElasticsearchUrlFormatter {
}

export interface ElasticsearchVersionInfo {
  build_date: DateString
  build_flavor: string
  build_hash: string
  build_snapshot: boolean
  build_type: string
  lucene_version: string
  minimum_index_compatibility_version: string
  minimum_wire_compatibility_version: string
  number: string
}

export interface ElisionTokenFilter extends TokenFilterBase {
  articles: Array<string>
  articles_case: boolean
}

export interface EmailActionResult {
  account?: string
  message: EmailResult
  reason?: string
}

export interface EmailBody {
  html: string
  text: string
}

export type EmailPriority = 'lowest' | 'low' | 'normal' | 'high' | 'highest'

export interface EmailResult {
  bcc?: Array<string>
  body?: EmailBody
  cc?: Array<string>
  from?: string
  id: Id
  priority?: EmailPriority
  reply_to?: Array<string>
  sent_date: DateString
  subject: string
  to: Array<string>
}

export interface EmptyObject {
}

export interface EnableUserRequest extends RequestBase {
  username: Name
  refresh?: Refresh
}

export interface EnableUserResponse extends ResponseBase {
}

export interface EnrichPolicy {
  enrich_fields: Fields
  indices: Indices
  match_field: Field
  query?: string
}

export type EnrichPolicyPhase = 'SCHEDULED' | 'RUNNING' | 'COMPLETE' | 'FAILED'

export interface EnrichProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  max_matches: integer
  override: boolean
  policy_name: string
  shape_relation: GeoShapeRelation
  target_field: Field
}

export interface EnrichStatsRequest extends RequestBase {
}

export interface EnrichStatsResponse extends ResponseBase {
  coordinator_stats: Array<CoordinatorStats>
  executing_policies: Array<ExecutingPolicy>
}

export type EpochMillis = string | long

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
  index_uuid?: Uuid
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

export interface ErrorResponse {
  error: MainError
  status: integer
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

export interface EwmaModelSettings {
  alpha?: float
}

export type ExcludeFrequent = 'all' | 'none' | 'by' | 'over'

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

export interface ExecuteRetentionRequest extends RequestBase {
}

export interface ExecuteRetentionResponse extends AcknowledgedResponseBase {
}

export interface ExecuteSnapshotLifecycleRequest extends RequestBase {
  policy_id: Name
}

export interface ExecuteSnapshotLifecycleResponse extends ResponseBase {
  snapshot_name: string
}

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
  _id: Id
  watch_record: WatchRecord
}

export interface ExecutingPolicy {
  name: string
  task: TaskInfo
}

export interface ExecutionAction {
  total: long
  total_in_ms: long
}

export type ExecutionPhase = 'awaits_execution' | 'started' | 'input' | 'condition' | 'actions' | 'watch_transform' | 'aborted' | 'finished'

export interface ExecutionResult {
  actions: Array<ExecutionResultAction>
  condition: ExecutionResultCondition
  execution_duration: integer
  execution_time: DateString
  input: ExecutionResultInput
}

export interface ExecutionResultAction {
  email?: EmailActionResult
  id: Id
  index?: IndexActionResult
  logging?: LoggingActionResult
  pagerduty?: PagerDutyActionResult
  reason?: string
  slack?: SlackActionResult
  status: Status
  type: ActionType
  webhook?: WebhookActionResult
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

export interface ExecutionState {
  successful: boolean
  timestamp: DateString
}

export interface ExecutionThreadPool {
  max_size: long
  queue_size: long
}

export interface ExistsQuery extends QueryBase {
  field?: Field
}

export type ExpandWildcardOptions = 'open' | 'closed' | 'hidden' | 'none' | 'all'

export type ExpandWildcards = ExpandWildcardOptions | Array<ExpandWildcardOptions>

export interface ExplainAnalyzeToken {
  bytes: string
  end_offset: long
  keyword?: boolean
  position: long
  positionLength: long
  start_offset: long
  termFrequency: long
  token: string
  type: string
}

export interface ExplainLifecycleRequest extends RequestBase {
  index: IndexName
  only_errors?: boolean
  only_managed?: boolean
}

export interface ExplainLifecycleResponse extends ResponseBase {
  indices: Record<string, LifecycleExplain>
}

export interface ExplainRequest extends RequestBase {
  id: Id
  index: IndexName
  type?: Type
  analyzer?: string
  analyze_wildcard?: boolean
  default_operator?: DefaultOperator
  df?: string
  lenient?: boolean
  preference?: string
  query_on_query_string?: string
  routing?: Routing
  _source?: boolean | Fields | SourceFilter
  _source_excludes?: Fields
  _source_includes?: Fields
  stored_fields?: Fields
  q?: string
  body?: {
    query?: QueryContainer
  }
}

export interface ExplainResponse<TDocument = unknown> extends ResponseBase {
  _index: IndexName
  _type?: TypeName
  _id: Id
  matched: boolean
  explanation?: ExplanationDetail
  get?: InlineGet<TDocument>
}

export interface Explanation {
  description: string
  details: Array<ExplanationDetail>
  value: float
}

export interface ExplanationDetail {
  description: string
  details?: Array<ExplanationDetail>
  value: float
}

export interface ExtendedBounds<T = unknown> {
  max: T
  min: T
}

export interface ExtendedMemoryStats extends MemoryStats {
  free_percent: integer
  used_percent: integer
}

export interface ExtendedStatsAggregate extends StatsAggregate {
  std_deviation_bounds: StandardDeviationBounds
  sum_of_squares?: double
  variance?: double
  variance_population?: double
  variance_sampling?: double
  std_deviation?: double
  std_deviation_population?: double
  std_deviation_sampling?: double
}

export interface ExtendedStatsAggregation extends FormatMetricAggregationBase {
  sigma?: double
}

export interface ExtendedStatsBucketAggregation extends PipelineAggregationBase {
  sigma?: double
}

export interface FailProcessor extends ProcessorBase {
  message: string
}

export type Field = string

export interface FieldAliasProperty extends PropertyBase {
  path: Field
}

export interface FieldCapabilities {
  aggregatable: boolean
  indices?: Indices
  meta?: Record<string, Array<string>>
  non_aggregatable_indices?: Indices
  non_searchable_indices?: Indices
  searchable: boolean
  type: string
}

export interface FieldCapabilitiesBodyIndexFilter {
  range?: FieldCapabilitiesBodyIndexFilterRange
  match_none?: EmptyObject
  term?: FieldCapabilitiesBodyIndexFilterTerm
}

export interface FieldCapabilitiesBodyIndexFilterRange {
  timestamp: FieldCapabilitiesBodyIndexFilterRangeTimestamp
}

export interface FieldCapabilitiesBodyIndexFilterRangeTimestamp {
  gte?: integer
  gt?: integer
  lte?: integer
  lt?: integer
}

export interface FieldCapabilitiesBodyIndexFilterTerm {
  versionControl: FieldCapabilitiesBodyIndexFilterTermVersionControl
}

export interface FieldCapabilitiesBodyIndexFilterTermVersionControl {
  value: string
}

export interface FieldCapabilitiesRequest extends RequestBase {
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  fields?: Fields
  ignore_unavailable?: boolean
  include_unmapped?: boolean
  body?: {
    index_filter?: FieldCapabilitiesBodyIndexFilter
  }
}

export interface FieldCapabilitiesResponse extends ResponseBase {
  indices: Indices
  fields: Record<Field, Record<string, FieldCapabilities>>
}

export interface FieldCollapse {
  field: Field
  inner_hits?: InnerHits | Array<InnerHits>
  max_concurrent_group_searches?: integer
}

export interface FieldLookup {
  id?: Id
  index?: IndexName
  path?: Field
  routing?: Routing
}

export interface FieldMapping {
}

export interface FieldNameQuery {
  field?: Field
}

export interface FieldNamesField {
  enabled: boolean
}

export interface FieldSecurity {
  except: Fields
  grant: Fields
}

export interface FieldSecuritySettings {
  except: Array<string>
  grant: Array<string>
}

export interface FieldSort {
  missing?: Missing
  mode?: SortMode
  nested?: NestedSortValue
  order?: SortOrder
  unmapped_type?: FieldType
}

export interface FieldStat {
  count: number
  cardinality: number
  top_hits: Array<TopHit>
  mean_value?: number
  median_value?: number
  max_value?: number
  min_value?: number
  earliest?: string
  latest?: string
}

export interface FieldStatistics {
  doc_count: integer
  sum_doc_freq: long
  sum_ttf: long
}

export type FieldType = 'none' | 'geo_point' | 'geo_shape' | 'ip' | 'binary' | 'keyword' | 'text' | 'search_as_you_type' | 'date' | 'date_nanos' | 'boolean' | 'completion' | 'nested' | 'object' | 'murmur3' | 'token_count' | 'percolator' | 'integer' | 'long' | 'short' | 'byte' | 'float' | 'half_float' | 'scaled_float' | 'double' | 'integer_range' | 'float_range' | 'long_range' | 'double_range' | 'date_range' | 'ip_range' | 'alias' | 'join' | 'rank_feature' | 'rank_features' | 'flattened' | 'shape' | 'histogram' | 'constant_keyword'

export interface FieldTypesMappings {
  field_types: Array<FieldTypesStats>
}

export interface FieldTypesStats {
  name: Name
  count: integer
  index_count: integer
}

export type FieldValueFactorModifier = 'none' | 'log' | 'log1p' | 'log2p' | 'ln' | 'ln1p' | 'ln2p' | 'square' | 'sqrt' | 'reciprocal'

export interface FieldValueFactorScoreFunction extends ScoreFunctionBase {
  field: Field
  factor?: double
  missing?: double
  modifier?: FieldValueFactorModifier
}

export interface Fielddata {
  filter: FielddataFilter
  loading: FielddataLoading
}

export interface FielddataFilter {
  frequency: FielddataFrequencyFilter
  regex: FielddataRegexFilter
}

export interface FielddataFrequencyFilter {
  max: double
  min: double
  min_segment_size: integer
}

export type FielddataLoading = 'eager' | 'eager_global_ordinals'

export interface FielddataRegexFilter {
  pattern: string
}

export interface FielddataSettings {
  cache_expire: Time
  cache_size: string
}

export interface FielddataStats {
  evictions?: long
  memory_size_in_bytes: long
  fields?: Record<Field, FielddataStats>
}

export type Fields = Field | Array<Field>

export interface FileCountSnapshotStats {
  file_count: integer
  size_in_bytes: long
}

export interface FileSystemStats {
  data: Array<DataPathStats>
  timestamp: long
  total: TotalFileSystemStats
}

export type FileSystemStorageImplementation = 'simplefs' | 'niofs' | 'mmapfs' | 'default_fs'

export interface Filter {
  description: string
  filter_id: string
  items: Array<string>
}

export interface FilterRef {
  filter_id: Id
  filter_type: RuleFilterType
}

export interface FiltersAggregate extends AggregateBase {
  buckets: Array<FiltersBucketItem> | Record<string, FiltersBucketItem>
}

export interface FiltersAggregation extends BucketAggregationBase {
  filters?: Record<string, QueryContainer> | Array<QueryContainer>
  other_bucket?: boolean
  other_bucket_key?: string
}

export interface FiltersBucketItemKeys {
  doc_count: long
}
export type FiltersBucketItem = FiltersBucketItemKeys |
    { [property: string]: Aggregate }

export interface FindStructureRequest<TBody = unknown> {
  charset?: string
  column_names?: string
  delimiter?: string
  explain?: boolean
  format?: string
  grok_pattern?: string
  has_header_row?: boolean
  lines_to_sample?: uint
  quote?: string
  should_trim_fields?: boolean
  timeout?: Time
  timestamp_field?: Field
  timestamp_format?: string
  body: TBody
}

export interface FindStructureResponse {
  charset: string
  has_header_row: boolean
  has_byte_order_marker: boolean
  format: string
  field_stats: Record<Field, FieldStat>
  sample_start: string
  num_messages_analyzed: number
  mappings: TypeMapping
  quote: string
  delimiter: string
  need_client_timezone: boolean
  num_lines_analyzed: number
  column_names?: Array<string>
  explanation?: Array<string>
  grok_pattern?: string
  multiline_start_pattern?: string
  exclude_lines_pattern?: string
  java_timestamp_formats?: Array<string>
  joda_timestamp_formats?: Array<string>
  timestamp_field?: string
  should_trim_fields?: boolean
}

export interface FingerprintAnalyzer extends AnalyzerBase {
  max_output_size: integer
  preserve_original: boolean
  separator: string
  stopwords: StopWords
  stopwords_path: string
}

export interface FingerprintTokenFilter extends TokenFilterBase {
  max_output_size: integer
  separator: string
}

export interface FlattenedProperty extends PropertyBase {
  boost: double
  depth_limit: integer
  doc_values: boolean
  eager_global_ordinals: boolean
  ignore_above: integer
  index: boolean
  index_options: IndexOptions
  null_value: string
  similarity: string
  split_queries_on_whitespace: boolean
}

export interface FlattenedUsage extends XPackUsage {
  field_count: integer
}

export interface FloatRangeProperty extends RangePropertyBase {
}

export interface FlushJobRequest extends RequestBase {
  job_id: Id
  skip_time?: string
  body?: {
    advance_time?: DateString
    calc_interim?: boolean
    end?: DateString
    start?: DateString
  }
}

export interface FlushJobResponse extends ResponseBase {
  flushed: boolean
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

export interface FlushStats {
  periodic: long
  total: long
  total_time?: string
  total_time_in_millis: long
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

export interface FollowInfoRequest extends RequestBase {
  index: Indices
}

export interface FollowInfoResponse extends ResponseBase {
  follower_indices: Array<FollowerInfo>
}

export type FollowerIndexStatus = 'active' | 'paused'

export interface FollowerInfo {
  follower_index: string
  leader_index: string
  parameters: FollowConfig
  remote_cluster: string
  status: FollowerIndexStatus
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

export interface ForeachProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  processor: ProcessorContainer
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

export interface ForecastStatistics {
  forecasted_jobs: long
  memory_bytes: JobStatistics
  processing_time_ms: JobStatistics
  records: JobStatistics
  status: Record<string, long>
  total: long
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

export interface FormatMetricAggregationBase extends MetricAggregationBase {
  format?: string
}

export interface FormattableMetricAggregation extends MetricAggregationBase {
  format?: string
}

export interface FoundUserPrivilege {
  found: boolean
}

export interface FreezeIndexRequest extends RequestBase {
  index: IndexName
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  master_timeout?: Time
  timeout?: Time
  wait_for_active_shards?: string | number
}

export interface FreezeIndexResponse extends AcknowledgedResponseBase {
  shards_acknowledged: boolean
}

export type FunctionBoostMode = 'multiply' | 'replace' | 'sum' | 'avg' | 'max' | 'min'

export interface FunctionScoreContainer {
  exp?: DecayFunction
  gauss?: DecayFunction
  linear?: DecayFunction
  field_value_factor?: FieldValueFactorScoreFunction
  random_score?: RandomScoreFunction
  script_score?: ScriptScoreFunction
  filter?: QueryContainer
  weight?: double
}

export type FunctionScoreMode = 'multiply' | 'sum' | 'avg' | 'first' | 'max' | 'min'

export interface FunctionScoreQuery extends QueryBase {
  boost_mode?: FunctionBoostMode
  functions?: Array<FunctionScoreContainer>
  max_boost?: double
  min_score?: double
  query?: QueryContainer
  score_mode?: FunctionScoreMode
  boost?: float
}

export type Fuzziness = string | integer

export interface FuzzyQuery extends QueryBase {
  max_expansions?: integer
  prefix_length?: integer
  rewrite?: MultiTermQueryRewrite
  transpositions?: boolean
  fuzziness?: Fuzziness
  value: any
}

export type GapPolicy = 'skip' | 'insert_zeros'

export interface GarbageCollectionGenerationStats {
  collection_count: long
  collection_time: string
  collection_time_in_millis: long
}

export interface GarbageCollectionStats {
  collectors: Record<string, GarbageCollectionGenerationStats>
}

export interface GenericProperty extends DocValuesPropertyBase {
  analyzer: string
  boost: double
  fielddata: StringFielddata
  ignore_above: integer
  index: boolean
  index_options: IndexOptions
  norms: boolean
  null_value: string
  position_increment_gap: integer
  search_analyzer: string
  term_vector: TermVectorOption
  type: string
}

export interface GeoBoundingBoxQuery extends QueryBase {
  bounding_box?: BoundingBox
  type?: GeoExecution
  validation_method?: GeoValidationMethod
}

export interface GeoBounds {
  bottom_right: LatLon
  top_left: LatLon
}

export interface GeoBoundsAggregate extends AggregateBase {
  bounds: GeoBounds
}

export interface GeoBoundsAggregation extends MetricAggregationBase {
  wrap_longitude?: boolean
}

export interface GeoCentroidAggregate extends AggregateBase {
  count: long
  location: GeoLocation
}

export interface GeoCentroidAggregation extends MetricAggregationBase {
  count?: long
  location?: GeoLocation
}

export type GeoCoordinate = Array<double> | ThreeDimensionalPoint

export interface GeoDecayFunctionKeys extends DecayFunctionBase {
}
export type GeoDecayFunction = GeoDecayFunctionKeys |
    { [property: string]: DecayPlacement<GeoLocation, Distance> }

export interface GeoDistanceAggregation extends BucketAggregationBase {
  distance_type?: GeoDistanceType
  field?: Field
  origin?: GeoLocation | string
  ranges?: Array<AggregationRange>
  unit?: DistanceUnit
}

export interface GeoDistanceQuery extends QueryBase {
  distance?: Distance
  distance_type?: GeoDistanceType
  location?: GeoLocation
  validation_method?: GeoValidationMethod
}

export interface GeoDistanceSortKeys {
  mode?: SortMode
  distance_type?: GeoDistanceType
  order?: SortOrder
  unit?: DistanceUnit
}
export type GeoDistanceSort = GeoDistanceSortKeys |
    { [property: string]: Array<GeoLocation> }

export type GeoDistanceType = 'arc' | 'plane'

export type GeoExecution = 'memory' | 'indexed'

export type GeoFormat = 'GeoJson' | 'WellKnownText'

export interface GeoHashGridAggregation extends BucketAggregationBase {
  bounds?: BoundingBox
  field?: Field
  precision?: GeoHashPrecision
  shard_size?: integer
  size?: integer
}

export type GeoHashPrecision = number

export interface GeoIpProcessor extends ProcessorBase {
  database_file: string
  field: Field
  first_only: boolean
  ignore_missing: boolean
  properties: Array<string>
  target_field: Field
}

export interface GeoLineAggregate extends AggregateBase {
  type: string
  geometry: LineStringGeoShape
  properties: GeoLineProperties
}

export interface GeoLineAggregation {
  point: GeoLinePoint
  sort: GeoLineSort
  include_sort?: boolean
  sort_order?: SortOrder
  size?: integer
}

export interface GeoLinePoint {
  field: Field
}

export interface GeoLineProperties {
  complete: boolean
  sort_values: Array<double>
}

export interface GeoLineSort {
  field: Field
}

export type GeoLocation = Array<double> | TwoDimensionalPoint

export type GeoOrientation = 'ClockWise' | 'CounterClockWise'

export type GeoPointFielddataFormat = 'array' | 'doc_values' | 'compressed' | 'disabled'

export interface GeoPointProperty extends DocValuesPropertyBase {
  ignore_malformed: boolean
  ignore_z_value: boolean
  null_value: GeoLocation
}

export interface GeoPolygonQuery extends QueryBase {
  points?: Array<GeoLocation>
  validation_method?: GeoValidationMethod
}

export interface GeoShape {
  type?: string
}

export interface GeoShapeProperty extends DocValuesPropertyBase {
  coerce: boolean
  ignore_malformed: boolean
  ignore_z_value: boolean
  orientation: GeoOrientation
  strategy: GeoStrategy
}

export interface GeoShapeQuery extends QueryBase {
  ignore_unmapped?: boolean
  indexed_shape?: FieldLookup
  relation?: GeoShapeRelation
  shape?: GeoShape
}

export type GeoShapeRelation = 'intersects' | 'disjoint' | 'within' | 'contains'

export type GeoStrategy = 'recursive' | 'term'

export interface GeoTileGridAggregation extends BucketAggregationBase {
  field?: Field
  precision?: GeoTilePrecision
  shard_size?: integer
  size?: integer
}

export type GeoTilePrecision = number

export type GeoTree = 'geohash' | 'quadtree'

export type GeoValidationMethod = 'coerce' | 'ignore_malformed' | 'strict'

export type GeographicFunction = 'LatLong'

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

export interface GetAnomalyRecordsRequest extends RequestBase {
  job_id: Id
  body?: {
    desc?: boolean
    end?: DateString
    exclude_interim?: boolean
    page?: Page
    record_score?: double
    sort?: Field
    start?: DateString
  }
}

export interface GetAnomalyRecordsResponse extends ResponseBase {
  count: long
  records: Array<AnomalyRecord>
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

export interface GetAutoFollowPatternRequest extends RequestBase {
  name?: Name
}

export interface GetAutoFollowPatternResponse extends ResponseBase {
  patterns: Record<string, AutoFollowPattern>
}

export interface GetBasicLicenseStatusRequest extends RequestBase {
}

export interface GetBasicLicenseStatusResponse extends ResponseBase {
  eligible_to_start_basic: boolean
}

export interface GetBucketsRequest extends RequestBase {
  job_id: Id
  timestamp?: Id
  body?: {
    anomaly_score?: double
    desc?: boolean
    end?: DateString
    exclude_interim?: boolean
    expand?: boolean
    page?: Page
    sort?: Field
    start?: DateString
  }
}

export interface GetBucketsResponse extends ResponseBase {
  buckets: Array<ResultBucket>
  count: long
}

export interface GetBuiltinPrivilegesRequest extends RequestBase {
}

export interface GetBuiltinPrivilegesResponse extends ResponseBase {
  cluster: Array<string>
  index: Array<string>
}

export interface GetCalendarEventsRequest extends RequestBase {
  calendar_id: Id
  end?: DateString
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

export interface GetCertificatesRequest extends RequestBase {
}

export interface GetCertificatesResponse extends ResponseBase {
  certificates: Array<ClusterCertificateInformation>
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
  exclude_generated?: boolean
}

export interface GetDatafeedsResponse extends ResponseBase {
  count: long
  datafeeds: Array<Datafeed>
}

export interface GetEnrichPolicyRequest extends RequestBase {
  name?: Names
}

export interface GetEnrichPolicyResponse extends ResponseBase {
  policies: Array<NamedPolicyMetadata>
}

export interface GetFieldMappingRequest extends RequestBase {
  fields: Fields
  index?: Indices
  type?: Types
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  include_defaults?: boolean
  include_type_name?: boolean
  local?: boolean
}

export interface GetFieldMappingResponse extends DictionaryResponseBase<IndexName, TypeFieldMappings> {
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

export interface GetIlmStatusRequest extends RequestBase {
}

export interface GetIlmStatusResponse extends ResponseBase {
  operation_mode: LifecycleOperationMode
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

export interface GetIndexTemplateRequest extends RequestBase {
  name?: Names
  flat_settings?: boolean
  include_type_name?: boolean
  local?: boolean
  master_timeout?: Time
}

export interface GetIndexTemplateResponse extends DictionaryResponseBase<string, TemplateMapping> {
}

export interface GetInfluencersRequest extends RequestBase {
  job_id: Id
  body?: {
    descending?: boolean
    end?: DateString
    exclude_interim?: boolean
    influencer_score?: double
    page?: Page
    sort?: Field
    start?: DateString
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
  exclude_generated?: boolean
}

export interface GetJobsResponse extends ResponseBase {
  count: long
  jobs: Array<Job>
}

export interface GetLicenseRequest extends RequestBase {
  accept_enterprise?: boolean
  local?: boolean
}

export interface GetLicenseResponse extends ResponseBase {
  license: LicenseInformation
}

export interface GetLifecycleRequest extends RequestBase {
  policy?: Name
}

export interface GetLifecycleResponse extends DictionaryResponseBase<string, LifecyclePolicy> {
}

export interface GetMappingRequest extends RequestBase {
  index?: Indices
  type?: Types
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  include_type_name?: boolean
  local?: boolean
  master_timeout?: Time
}

export interface GetMappingResponse extends DictionaryResponseBase<IndexName, IndexMappings> {
}

export interface GetModelSnapshotsRequest extends RequestBase {
  job_id: Id
  snapshot_id?: Id
  body?: {
    desc?: boolean
    end?: DateString
    page?: Page
    sort?: Field
    start?: DateString
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
    end?: DateString
    exclude_interim?: boolean
    overall_score?: double
    start?: DateString
    top_n?: integer
  }
}

export interface GetOverallBucketsResponse extends ResponseBase {
  count: long
  overall_buckets: Array<OverallBucket>
}

export interface GetPipelineRequest extends RequestBase {
  id?: Id
  master_timeout?: Time
}

export interface GetPipelineResponse extends DictionaryResponseBase<string, Pipeline> {
}

export interface GetPrivilegesRequest extends RequestBase {
  application?: Name
  name?: Name
}

export interface GetPrivilegesResponse extends DictionaryResponseBase<string, Record<string, PrivilegesActions>> {
}

export interface GetRepositoryRequest extends RequestBase {
  repository?: Names
  local?: boolean
  master_timeout?: Time
}

export interface GetRepositoryResponse extends ResponseBase {
  repositories: Record<string, SnapshotRepository>
}

export interface GetRequest extends RequestBase {
  id: Id
  index: IndexName
  type?: Type
  preference?: string
  realtime?: boolean
  refresh?: boolean
  routing?: Routing
  source_enabled?: boolean
  _source_excludes?: Fields
  _source_includes?: Fields
  stored_fields?: Fields
  version?: long
  version_type?: VersionType
  _source?: boolean | string | Array<string>
}

export interface GetResponse<TDocument = unknown> extends ResponseBase {
  _index: string
  fields?: Record<string, any>
  found: boolean
  _id: string
  _primary_term?: long
  _routing?: string
  _seq_no?: long
  _source?: TDocument
  _type: string
  _version?: long
}

export interface GetRoleMappingRequest extends RequestBase {
  name?: Name
}

export interface GetRoleMappingResponse extends DictionaryResponseBase<string, XPackRoleMapping> {
}

export interface GetRoleRequest extends RequestBase {
  name?: Name
}

export interface GetRoleResponse extends DictionaryResponseBase<string, XPackRole> {
}

export interface GetRollupCapabilitiesRequest extends RequestBase {
  id?: Id
}

export interface GetRollupCapabilitiesResponse extends DictionaryResponseBase<IndexName, RollupCapabilities> {
}

export interface GetRollupIndexCapabilitiesRequest extends RequestBase {
  index: Id
}

export interface GetRollupIndexCapabilitiesResponse extends DictionaryResponseBase<IndexName, RollupIndexCapabilities> {
}

export interface GetRollupJobRequest extends RequestBase {
  id?: Id
}

export interface GetRollupJobResponse extends ResponseBase {
  jobs: Array<RollupJobInformation>
}

export interface GetScriptRequest extends RequestBase {
  id: Id
  master_timeout?: Time
}

export interface GetScriptResponse extends ResponseBase {
  _id: Id
  found: boolean
  script?: StoredScript
}

export interface GetSnapshotLifecycleManagementStatusRequest extends RequestBase {
}

export interface GetSnapshotLifecycleManagementStatusResponse extends ResponseBase {
  operation_mode: LifecycleOperationMode
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

export interface GetStats {
  current: long
  exists_time?: string
  exists_time_in_millis: long
  exists_total: long
  missing_time?: string
  missing_time_in_millis: long
  missing_total: long
  time?: string
  time_in_millis: long
  total: long
}

export interface GetTaskRequest extends RequestBase {
  task_id: Id
  timeout?: Time
  wait_for_completion?: boolean
}

export interface GetTaskResponse extends ResponseBase {
  completed: boolean
  task: TaskInfo
  response?: TaskStatus
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

export interface GetTrialLicenseStatusRequest extends RequestBase {
}

export interface GetTrialLicenseStatusResponse extends ResponseBase {
  eligible_to_start_trial: boolean
}

export interface GetUserAccessTokenRequest extends RequestBase {
  body: {
    grant_type?: AccessTokenGrantType
    scope?: string
    password?: string
    kerberos_ticket?: string
    refresh_token?: string
    username?: string
  }
}

export interface GetUserAccessTokenResponse extends ResponseBase {
  access_token: string
  expires_in: long
  scope?: string
  type: string
  refresh_token: string
  kerberos_authentication_response_token?: string
  authentication: AuthenticatedUser
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

export interface GetUserRequest extends RequestBase {
  username?: Names
}

export interface GetUserResponse extends DictionaryResponseBase<string, XPackUser> {
}

export interface GetWatchRequest extends RequestBase {
  id: Name
}

export interface GetWatchResponse extends ResponseBase {
  found: boolean
  _id: Id
  status?: WatchStatus
  watch?: Watch
  _primary_term?: integer
  _seq_no?: integer
  _version?: integer
}

export interface GlobalAggregation extends BucketAggregationBase {
}

export interface GlobalPrivileges {
  application: ApplicationGlobalUserPrivileges
}

export interface GoogleNormalizedDistanceHeuristic {
  background_is_superset: boolean
}

export interface GraphConnection {
  doc_count: long
  source: long
  target: long
  weight: double
}

export interface GraphExploreControls {
  sample_diversity?: SampleDiversity
  sample_size: integer
  timeout?: Time
  use_significance: boolean
}

export interface GraphExploreRequest extends RequestBase {
  index: Indices
  type?: Types
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

export interface GraphVertex {
  depth: long
  field: string
  term: string
  weight: double
}

export interface GraphVertexDefinition {
  exclude?: Array<string>
  field: Field
  include?: Array<GraphVertexInclude>
  min_doc_count?: long
  shard_min_doc_count?: long
  size?: integer
}

export interface GraphVertexInclude {
  boost: double
  term: string
}

export interface GrokProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  pattern_definitions: Record<string, string>
  patterns: Array<string>
  trace_match: boolean
}

export interface GrokProcessorPatternsRequest extends RequestBase {
}

export interface GrokProcessorPatternsResponse extends ResponseBase {
  patterns: Record<string, string>
}

export type GroupBy = 'nodes' | 'parents' | 'none'

export interface GsubProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  pattern: string
  replacement: string
  target_field: Field
}

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

export interface HasPrivilegesRequest extends RequestBase {
  user?: Name
  body: {
    application?: Array<ApplicationPrivilegesCheck>
    cluster?: Array<string>
    index?: Array<IndexPrivilegesCheck>
  }
}

export interface HasPrivilegesResponse extends ResponseBase {
  application: ApplicationsPrivileges
  cluster: Record<string, boolean>
  has_all_requested: boolean
  index: Record<IndexName, Privileges>
  username: string
}

export interface HdrMethod {
  number_of_significant_value_digits?: integer
}

export interface HdrPercentileItem {
  key: double
  value: double
}

export interface HdrPercentilesAggregate extends AggregateBase {
  values: Array<HdrPercentileItem>
}

export type Health = 'green' | 'yellow' | 'red'

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
  highlight_query?: QueryContainer
}

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
  matched_fields?: Fields
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

export type HighlighterEncoder = 'default' | 'html'

export type HighlighterFragmenter = 'simple' | 'span'

export type HighlighterOrder = 'score'

export type HighlighterTagsSchema = 'styled'

export type HighlighterType = 'plain' | 'fvh' | 'unified'

export interface HistogramAggregation extends BucketAggregationBase {
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
  _count?: SortOrder
  _key?: SortOrder
}

export interface HistogramProperty extends PropertyBase {
  ignore_malformed: boolean
}

export interface HistogramRollupGrouping {
  fields: Fields
  interval: long
}

export interface Hit<TDocument = unknown> {
  _index: IndexName
  _id: Id
  _score?: double
  _type?: Type
  _explanation?: Explanation
  fields?: Record<string, any>
  highlight?: Record<string, Array<string>>
  inner_hits?: Record<string, InnerHitsResult>
  matched_queries?: Array<string>
  _nested?: NestedIdentity
  _ignored?: Array<string>
  _shard?: string
  _node?: string
  _routing?: string
  _source?: TDocument
  _seq_no?: long
  _primary_term?: long
  _version?: long
  sort?: SortResults
}

export interface HitMetadata<TDocument = unknown> {
  _id: string
  _index: string
  _primary_term: long
  _routing: string
  _seq_no: long
  _source: TDocument
  _type: string
  _version: long
}

export interface HitsMetadata<T = unknown> {
  total: TotalHits | long
  hits: Array<Hit<T>>
  max_score?: double
}

export interface HoltLinearModelSettings {
  alpha?: float
  beta?: float
}

export interface HoltWintersModelSettings {
  alpha?: float
  beta?: float
  gamma?: float
  pad?: boolean
  period?: integer
  type?: HoltWintersType
}

export type HoltWintersType = 'add' | 'mult'

export interface Hop {
  connections?: Hop
  query: QueryContainer
  vertices: Array<GraphVertexDefinition>
}

export interface HotThreadInformation {
  hosts: Array<string>
  node_id: string
  node_name: string
  threads: Array<string>
}

export interface HourlySchedule {
  minute: Array<integer>
}

export interface HtmlStripCharFilter extends CharFilterBase {
}

export interface HttpInput {
  extract: Array<string>
  request: HttpInputRequestDefinition
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

export interface HttpInputRequestDefinition {
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

export interface HttpInputRequestResult extends HttpInputRequestDefinition {
}

export interface HttpInputResponseResult {
  body: string
  headers: Record<string, Array<string>>
  status: integer
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD'

export interface HttpStats {
  current_open: integer
  total_opened: long
}

export interface HunspellTokenFilter extends TokenFilterBase {
  dedup: boolean
  dictionary: string
  locale: string
  longest_only: boolean
}

export interface HyphenationDecompounderTokenFilter extends CompoundWordTokenFilterBase {
}

export type IBDistribution = 'll' | 'spl'

export type IBLambda = 'df' | 'ttf'

export interface IcuAnalyzer extends AnalyzerBase {
  method: IcuNormalizationType
  mode: IcuNormalizationMode
}

export type IcuCollationAlternate = 'shifted' | 'non-ignorable'

export type IcuCollationCaseFirst = 'lower' | 'upper'

export type IcuCollationDecomposition = 'no' | 'identical'

export type IcuCollationStrength = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'identical'

export interface IcuCollationTokenFilter extends TokenFilterBase {
  alternate: IcuCollationAlternate
  caseFirst: IcuCollationCaseFirst
  caseLevel: boolean
  country: string
  decomposition: IcuCollationDecomposition
  hiraganaQuaternaryMode: boolean
  language: string
  numeric: boolean
  strength: IcuCollationStrength
  variableTop: string
  variant: string
}

export interface IcuFoldingTokenFilter extends TokenFilterBase {
  unicode_set_filter: string
}

export interface IcuNormalizationCharFilter extends CharFilterBase {
  mode: IcuNormalizationMode
  name: IcuNormalizationType
}

export type IcuNormalizationMode = 'decompose' | 'compose'

export interface IcuNormalizationTokenFilter extends TokenFilterBase {
  name: IcuNormalizationType
}

export type IcuNormalizationType = 'nfc' | 'nfkc' | 'nfkc_cf'

export interface IcuTokenizer extends TokenizerBase {
  rule_files: string
}

export type IcuTransformDirection = 'forward' | 'reverse'

export interface IcuTransformTokenFilter extends TokenFilterBase {
  dir: IcuTransformDirection
  id: string
}

export type Id = string

export type Ids = string | Array<string>

export interface IdsQuery extends QueryBase {
  values?: Array<Id>
}

export interface IlmPolicyStatistics {
  indices_managed: integer
  phases: Phases
}

export interface IlmUsage {
  policy_count: integer
  policy_stats: Array<IlmPolicyStatistics>
}

export interface IndexActionResult {
  response: IndexActionResultIndexResponse
}

export interface IndexActionResultIndexResponse {
  created: boolean
  id: Id
  index: IndexName
  result: Result
  version: integer
  type?: Type
}

export type IndexAlias = string

export interface IndexAliases {
  aliases: Record<string, AliasDefinition>
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

export type IndexExistsResponse = boolean

export interface IndexField {
  enabled: boolean
}

export interface IndexHealthStats {
  active_primary_shards: integer
  active_shards: integer
  initializing_shards: integer
  number_of_replicas: integer
  number_of_shards: integer
  relocating_shards: integer
  shards?: Record<string, ShardHealthStats>
  status: Health
  unassigned_shards: integer
}

export interface IndexMappings {
  item: TypeMapping
  mappings: TypeMapping
}

export type IndexMetrics = string

export type IndexName = string

export type IndexOptions = 'docs' | 'freqs' | 'positions' | 'offsets'

export interface IndexPrivilegesCheck {
  names: Array<string>
  privileges: Array<string>
}

export interface IndexRequest<TDocument = unknown> extends RequestBase {
  id?: Id
  index: IndexName
  type?: Type
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

export interface IndexSegment {
  shards: Record<string, ShardsSegment | Array<ShardsSegment>>
}

export type IndexSortMissing = '_first' | '_last'

export type IndexSortMode = 'min' | 'max'

export type IndexSortOrder = 'asc' | 'desc'

export interface IndexState {
  aliases: Record<IndexName, Alias>
  mappings: TypeMapping
  settings: Record<string, any>
}

export interface IndexStats {
  completion?: CompletionStats
  docs?: DocStats
  fielddata?: FielddataStats
  flush?: FlushStats
  get?: GetStats
  indexing?: IndexingStats
  merges?: MergesStats
  query_cache?: QueryCacheStats
  recovery?: RecoveryStats
  refresh?: RefreshStats
  request_cache?: RequestCacheStats
  search?: SearchStats
  segments?: SegmentsStats
  store?: StoreStats
  translog?: TranslogStats
  warmer?: WarmerStats
}

export interface IndexTemplateExistsRequest extends RequestBase {
  name: Names
  flat_settings?: boolean
  local?: boolean
  master_timeout?: Time
}

export type IndexTemplateExistsResponse = boolean

export interface IndexedScript extends ScriptBase {
  id: string
}

export type IndexingJobState = 'started' | 'indexing' | 'stopping' | 'stopped' | 'aborting'

export interface IndexingStats {
  index_current: long
  delete_current: long
  delete_time?: string
  delete_time_in_millis: long
  delete_total: long
  is_throttled: boolean
  noop_update_total: long
  throttle_time?: string
  throttle_time_in_millis: long
  index_time?: string
  index_time_in_millis: long
  index_total: long
  index_failed: long
  types?: Record<string, IndexingStats>
}

export type Indices = string | Array<string>

export interface IndicesModuleSettings {
  circuit_breaker_settings: CircuitBreakerSettings
  fielddata_settings: FielddataSettings
  qeueries_cache_size: string
  recovery_settings: IndicesRecoverySettings
}

export interface IndicesOptions {
  allow_no_indices: boolean
  expand_wildcards: ExpandWildcards
  ignore_unavailable: boolean
}

export interface IndicesPrivileges {
  field_security?: FieldSecurity
  names: Indices
  privileges: Array<string>
  query?: QueryContainer
}

export interface IndicesRecoverySettings {
  compress: boolean
  concurrent_small_file_streams: integer
  concurrent_streams: integer
  file_chunk_size: string
  max_bytes_per_second: string
  translog_operations: integer
  translog_size: string
}

export interface IndicesResponseBase extends AcknowledgedResponseBase {
  _shards?: ShardStatistics
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

export interface IndicesStats {
  primaries: IndexStats
  shards?: Record<string, Array<ShardStats>>
  total: IndexStats
  uuid?: string
}

export interface IndicesStatsRequest extends RequestBase {
  metric?: Metrics
  index?: Indices
  completion_fields?: Fields
  expand_wildcards?: ExpandWildcards
  fielddata_fields?: Fields
  fields?: Fields
  forbid_closed_indices?: boolean
  groups?: string | Array<string>
  include_segment_file_sizes?: boolean
  include_unloaded_segments?: boolean
  level?: Level
  types?: Types
}

export interface IndicesStatsResponse extends ResponseBase {
  indices?: Record<string, IndicesStats>
  _shards: ShardStatistics
  _all: IndicesStats
}

export interface IndicesVersionsStats {
  index_count: integer
  primary_shard_count: integer
  total_primary_bytes: long
  version: string
}

export interface Influence {
  influencer_field_name: string
  influencer_field_values: Array<string>
}

export type InfoContentFunction = 'InfoContent' | 'HighInfoContent' | 'LowInfoContent'

export interface Ingest {
  timestamp: DateString
}

export interface IngestStats {
  count: long
  current: long
  failed: long
  processors: Array<KeyedProcessorStats>
  time_in_millis: long
}

export interface InlineGet<TDocument = unknown> {
  fields?: Record<string, any>
  found: boolean
  _seq_no: long
  _primary_term: long
  _routing?: Routing
  _source: TDocument
}

export interface InlineScript extends ScriptBase {
  source: string
}

export interface InnerHits {
  name?: string
  size?: integer
  from?: integer
  collapse?: FieldCollapse
  docvalue_fields?: Fields
  explain?: boolean
  highlight?: Highlight
  ignore_unmapped?: boolean
  script_fields?: Record<string, ScriptField>
  seq_no_primary_term?: boolean
  fields?: Fields
  sort?: Sort
  _source?: boolean | SourceFilter
  version?: boolean
}

export interface InnerHitsMetadata {
  total: TotalHits | long
  hits: Array<Hit<Record<string, any>>>
  max_score?: double
}

export interface InnerHitsResult {
  hits: InnerHitsMetadata
}

export interface Input {
}

export interface InputContainer {
  chain?: ChainInput
  http?: HttpInput
  search?: SearchInput
  simple?: SimpleInput
}

export type InputType = 'http' | 'search' | 'simple'

export interface IntegerRangeProperty extends RangePropertyBase {
}

export interface Interval extends ScheduleBase {
  factor: long
  unit: IntervalUnit
}

export type IntervalUnit = 's' | 'm' | 'h' | 'd' | 'w'

export interface Intervals {
  filter?: IntervalsFilter
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

export interface InvalidateApiKeyRequest extends RequestBase {
  body: {
    id?: string
    ids?: Array<string>
    name?: string
    owner?: boolean
    realm_name?: string
    username?: string
  }
}

export interface InvalidateApiKeyResponse extends ResponseBase {
  error_count: integer
  error_details?: Array<ErrorCause>
  invalidated_api_keys: Array<string>
  previously_invalidated_api_keys: Array<string>
}

export interface InvalidateUserAccessTokenRequest extends RequestBase {
  body: {
    token?: string
    refresh_token?: string
    realm_name?: string
    username?: string
  }
}

export interface InvalidateUserAccessTokenResponse extends ResponseBase {
  error_count: long
  error_details?: Array<ErrorCause>
  invalidated_tokens: long
  previously_invalidated_tokens: long
}

export interface IpFilterUsage {
  http: boolean
  transport: boolean
}

export interface IpProperty extends DocValuesPropertyBase {
  boost: double
  index: boolean
  null_value: string
}

export interface IpRangeAggregation extends BucketAggregationBase {
  field?: Field
  ranges?: Array<IpRangeAggregationRange>
}

export interface IpRangeAggregationRange {
  from?: string
  mask?: string
  to?: string
}

export interface IpRangeBucketKeys {
}
export type IpRangeBucket = IpRangeBucketKeys |
    { [property: string]: Aggregate }

export interface IpRangeProperty extends RangePropertyBase {
}

export interface Job {
  allow_lazy_open?: boolean
  analysis_config: AnalysisConfig
  analysis_limits?: AnalysisLimits
  background_persist_interval: Time
  create_time: integer
  data_description: DataDescription
  description: string
  finished_time: integer
  job_id: string
  job_type: string
  model_plot: ModelPlotConfig
  model_snapshot_id: string
  model_snapshot_retention_days: long
  renormalization_window_days: long
  results_index_name?: IndexName
  results_retention_days: long
  groups: Array<string>
  model_plot_config?: ModelPlotConfig
  custom_settings?: CustomSettings
  job_version?: string
  deleting?: boolean
  daily_model_snapshot_retention_after_days?: long
}

export interface JobForecastStatistics {
  memory_bytes: JobStatistics
  processing_time_ms: JobStatistics
  records: JobStatistics
  status: Record<string, long>
  total: long
}

export type JobState = 'closing' | 'closed' | 'opened' | 'failed' | 'opening'

export interface JobStatistics {
  avg: double
  max: double
  min: double
  total: double
}

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
  deleting?: boolean
}

export interface JoinProcessor extends ProcessorBase {
  field: Field
  separator: string
  target_field: Field
}

export interface JoinProperty extends PropertyBase {
  relations: Record<RelationName, Array<RelationName>>
}

export interface JsonProcessor extends ProcessorBase {
  add_to_root: boolean
  field: Field
  target_field: Field
}

export interface JvmClassesStats {
  current_loaded_count: long
  total_loaded_count: long
  total_unloaded_count: long
}

export interface JvmPool {
  max: string
  max_in_bytes: long
  peak_max: string
  peak_max_in_bytes: long
  peak_used: string
  peak_used_in_bytes: long
  used: string
  used_in_bytes: long
}

export interface KStemTokenFilter extends TokenFilterBase {
}

export type KeepTypesMode = 'include' | 'exclude'

export interface KeepTypesTokenFilter extends TokenFilterBase {
  mode: KeepTypesMode
  types: Array<string>
}

export interface KeepWordsTokenFilter extends TokenFilterBase {
  keep_words: Array<string>
  keep_words_case: boolean
  keep_words_path: string
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

export interface KeyedBucketKeys<TKey = unknown> {
  doc_count: long
  key: TKey
  key_as_string: string
}
export type KeyedBucket<TKey = unknown> = KeyedBucketKeys<TKey> |
    { [property: string]: Aggregate }

export interface KeyedProcessorStats {
  statistics: ProcessStats
  type: string
}

export interface KeyedValueAggregate extends ValueAggregate {
  keys: Array<string>
}

export interface KeywordAnalyzer extends AnalyzerBase {
}

export interface KeywordMarkerTokenFilter extends TokenFilterBase {
  ignore_case: boolean
  keywords: Array<string>
  keywords_path: string
  keywords_pattern: string
}

export interface KeywordProperty extends DocValuesPropertyBase {
  boost: double
  eager_global_ordinals: boolean
  ignore_above: integer
  index: boolean
  index_options: IndexOptions
  normalizer: string
  norms: boolean
  null_value: string
  split_queries_on_whitespace: boolean
}

export interface KeywordTokenizer extends TokenizerBase {
  buffer_size: integer
}

export interface KibanaUrlConfig extends BaseUrlConfig {
  time_range?: string
}

export interface KuromojiAnalyzer extends AnalyzerBase {
  mode: KuromojiTokenizationMode
  user_dictionary: string
}

export interface KuromojiIterationMarkCharFilter extends CharFilterBase {
  normalize_kana: boolean
  normalize_kanji: boolean
}

export interface KuromojiPartOfSpeechTokenFilter extends TokenFilterBase {
  stoptags: Array<string>
}

export interface KuromojiReadingFormTokenFilter extends TokenFilterBase {
  use_romaji: boolean
}

export interface KuromojiStemmerTokenFilter extends TokenFilterBase {
  minimum_length: integer
}

export type KuromojiTokenizationMode = 'normal' | 'search' | 'extended'

export interface KuromojiTokenizer extends TokenizerBase {
  discard_punctuation: boolean
  mode: KuromojiTokenizationMode
  nbest_cost: integer
  nbest_examples: string
  user_dictionary: string
  user_dictionary_rules: Array<string>
}

export type Language = 'Arabic' | 'Armenian' | 'Basque' | 'Brazilian' | 'Bulgarian' | 'Catalan' | 'Chinese' | 'Cjk' | 'Czech' | 'Danish' | 'Dutch' | 'English' | 'Estonian' | 'Finnish' | 'French' | 'Galician' | 'German' | 'Greek' | 'Hindi' | 'Hungarian' | 'Indonesian' | 'Irish' | 'Italian' | 'Latvian' | 'Norwegian' | 'Persian' | 'Portuguese' | 'Romanian' | 'Russian' | 'Sorani' | 'Spanish' | 'Swedish' | 'Turkish' | 'Thai'

export interface LanguageAnalyzer extends AnalyzerBase {
  language: Language
  stem_exclusion: Array<string>
  stopwords: StopWords
  stopwords_path: string
  type: string
}

export interface LaplaceSmoothingModel {
  alpha: double
}

export interface LatLon {
  lat: double
  lon: double
}

export interface LengthTokenFilter extends TokenFilterBase {
  max: integer
  min: integer
}

export interface LetterTokenizer extends TokenizerBase {
}

export type Level = 'cluster' | 'indices' | 'shards'

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

export interface LicenseAcknowledgement {
  license: Array<string>
  message: string
}

export interface LicenseInformation {
  expiry_date: DateString
  expiry_date_in_millis: long
  issue_date: DateString
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

export interface LifecycleAction {
}

export interface LifecycleExplain {
  action: string
  action_time_millis: DateString
  age: Time
  failed_step: string
  failed_step_retry_count: integer
  index: IndexName
  is_auto_retryable_error: boolean
  lifecycle_date_millis: DateString
  managed: boolean
  phase: string
  phase_time_millis: DateString
  policy: string
  step: string
  step_info: Record<string, any>
  step_time_millis: DateString
}

export type LifecycleOperationMode = 'RUNNING' | 'STOPPING' | 'STOPPED'

export interface LifecyclePolicy {
  modified_date: DateString
  policy: Policy
  version: integer
}

export type Like = string | LikeDocument

export interface LikeDocument {
  doc?: any
  fields?: Fields
  _id?: Id
  _index?: IndexName
  per_field_analyzer?: Record<Field, string>
  routing?: Routing
}

export interface LimitTokenCountTokenFilter extends TokenFilterBase {
  consume_all_tokens: boolean
  max_token_count: integer
}

export interface Limits {
  max_model_memory_limit: string
  effective_max_model_memory_limit: string
}

export interface LineStringGeoShape {
  coordinates: Array<GeoCoordinate>
}

export interface LinearInterpolationSmoothingModel {
  bigram_lambda: double
  trigram_lambda: double
  unigram_lambda: double
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
  node_failures?: Array<ErrorCause>
  nodes: Record<string, TaskExecutingNode>
}

export interface LoadAverageStats {
  '15m': float
  '5m': float
  '1m': float
}

export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace'

export interface LoggingActionResult {
  logged_text: string
}

export type LongId = string

export interface LongRangeProperty extends RangePropertyBase {
}

export interface LowercaseProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  target_field: Field
}

export interface LowercaseTokenFilter extends TokenFilterBase {
  language: string
}

export interface LowercaseTokenizer extends TokenizerBase {
}

export interface MachineLearningInfoRequest extends RequestBase {
}

export interface MachineLearningInfoResponse extends ResponseBase {
  defaults: Defaults
  limits: Limits
  upgrade_mode: boolean
}

export interface MachineLearningUsage extends XPackUsage {
  datafeeds: Record<string, DatafeedCount>
  jobs: Record<string, Job>
  node_count: integer
}

export interface MainError extends ErrorCause {
  headers?: Record<string, string>
  root_cause: Array<ErrorCause>
}

export interface ManageUserPrivileges {
  applications: Array<string>
}

export interface MappingCharFilter extends CharFilterBase {
  mappings: Array<string>
  mappings_path: string
}

export interface MatchAllQuery extends QueryBase {
  norm_field?: string
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

export interface MatchNoneQuery extends QueryBase {
}

export interface MatchPhrasePrefixQuery extends QueryBase {
  analyzer?: string
  max_expansions?: integer
  query?: string
  slop?: integer
  zero_terms_query?: ZeroTermsQuery
}

export interface MatchPhraseQuery extends QueryBase {
  analyzer?: string
  query?: string
  slop?: integer
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

export type MatchType = 'simple' | 'regex'

export interface MatrixAggregation extends Aggregation {
  fields?: Fields
  missing?: Record<Field, double>
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

export interface MatrixStatsAggregation extends MatrixAggregation {
  mode?: MatrixStatsMode
}

export type MatrixStatsMode = 'avg' | 'min' | 'max' | 'sum' | 'median'

export interface MaxAggregation extends FormatMetricAggregationBase {
}

export interface MaxBucketAggregation extends PipelineAggregationBase {
}

export interface MedianAbsoluteDeviationAggregation extends FormatMetricAggregationBase {
  compression?: double
}

export interface MemoryStats {
  resident: string
  resident_in_bytes: long
  share: string
  share_in_bytes: long
  total_virtual: string
  total_virtual_in_bytes: long
}

export type MemoryStatus = 'ok' | 'soft_limit' | 'hard_limit'

export interface MergesStats {
  current: long
  current_docs: long
  current_size?: string
  current_size_in_bytes: long
  total: long
  total_auto_throttle?: string
  total_auto_throttle_in_bytes: long
  total_docs: long
  total_size?: string
  total_size_in_bytes: long
  total_stopped_time?: string
  total_stopped_time_in_millis: long
  total_throttled_time?: string
  total_throttled_time_in_millis: long
  total_time?: string
  total_time_in_millis: long
}

export type MetricAggregate = ValueAggregate | BoxPlotAggregate | GeoBoundsAggregate | GeoCentroidAggregate | GeoLineAggregate | PercentilesAggregate | ScriptedMetricAggregate | StatsAggregate | StringStatsAggregate | TopHitsAggregate | TopMetricsAggregate | ExtendedStatsAggregate | TDigestPercentilesAggregate | HdrPercentilesAggregate

export interface MetricAggregationBase {
  field?: Field
  missing?: Missing
  script?: Script
}

export type MetricFunction = 'Min' | 'Max' | 'Median' | 'HighMedian' | 'LowMedian' | 'Mean' | 'HighMean' | 'LowMean' | 'Metric' | 'Varp' | 'HighVarp' | 'LowVarp'

export type Metrics = string | Array<string>

export interface MinAggregation extends FormatMetricAggregationBase {
}

export interface MinBucketAggregation extends PipelineAggregationBase {
}

export interface MinimalLicenseInformation {
  expiry_date_in_millis: long
  mode: LicenseType
  status: LicenseStatus
  type: LicenseType
  uid: string
}

export type MinimumInterval = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year'

export type MinimumShouldMatch = integer | string

export type Missing = string | integer | double | boolean

export interface MissingAggregation extends BucketAggregationBase {
  field?: Field
  missing?: Missing
}

export type ModelCategorizationStatus = 'ok' | 'warn'

export type ModelMemoryStatus = 'ok' | 'soft_limit' | 'hard_limit'

export interface ModelPlotConfig {
  terms: Field
  enabled: boolean
  annotations_enabled?: boolean
}

export interface ModelPlotConfigEnabled {
  enabled: boolean
}

export interface ModelSizeStats {
  bucket_allocation_failures_count: long
  job_id: string
  log_time: DateString
  memory_status: MemoryStatus
  model_bytes: long
  result_type: string
  timestamp: DateString
  total_by_field_count: long
  total_over_field_count: long
  total_partition_field_count: long
}

export interface ModelSnapshot {
  description: string
  job_id: string
  latest_record_time_stamp: DateString
  latest_result_time_stamp: DateString
  model_size_stats: ModelSizeStats
  retain: boolean
  snapshot_doc_count: long
  snapshot_id: string
  timestamp: DateString
}

export interface MonitoringUsage extends XPackUsage {
  collection_enabled: boolean
  enabled_exporters: Record<string, long>
}

export type Month = 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december'

export interface MoreLikeThisQuery extends QueryBase {
  analyzer?: string
  boost_terms?: double
  fields?: Fields
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

export interface MoveToStepRequest extends RequestBase {
  index: IndexName
  body?: {
    current_step?: StepKey
    next_step?: StepKey
  }
}

export interface MoveToStepResponse extends AcknowledgedResponseBase {
}

export interface MovingAverageAggregation extends PipelineAggregationBase {
  minimize?: boolean
  model?: MovingAverageModel
  settings: MovingAverageSettings
  predict?: integer
  window?: integer
}

export type MovingAverageModel = 'linear' | 'simple' | 'ewma' | 'holt' | 'holt_winters'

export type MovingAverageSettings = EwmaModelSettings | HoltLinearModelSettings | HoltWintersModelSettings

export interface MovingFunctionAggregation extends PipelineAggregationBase {
  script?: string
  shift?: integer
  window?: integer
}

export interface MovingPercentilesAggregation extends PipelineAggregationBase {
  window?: integer
  shift?: integer
}

export interface MultiBucketAggregate<TBucket = unknown> extends AggregateBase {
  buckets: Array<TBucket>
}

export interface MultiGetHit<TDocument = unknown> {
  error?: MainError
  fields?: Record<string, any>
  found?: boolean
  _id: string
  _index: string
  _primary_term?: long
  _routing?: Routing
  _seq_no?: long
  _source?: TDocument
  _type?: Type
  _version?: long
}

export interface MultiGetOperation {
  can_be_flattened?: boolean
  _id: Id
  _index?: IndexName
  routing?: Routing
  _source?: boolean | Fields | SourceFilter
  stored_fields?: Fields
  _type?: Type
  version?: long
  version_type?: VersionType
}

export interface MultiGetRequest extends RequestBase {
  index?: IndexName
  type?: Type
  preference?: string
  realtime?: boolean
  refresh?: boolean
  routing?: Routing
  source_enabled?: boolean
  _source?: boolean | Fields
  _source_excludes?: Fields
  _source_includes?: Fields
  stored_fields?: Fields
  body: {
    docs?: Array<MultiGetOperation>
    ids?: Array<Id>
  }
}

export interface MultiGetResponse<TDocument = unknown> extends ResponseBase {
  docs: Array<MultiGetHit<TDocument>>
}

export interface MultiMatchQuery extends QueryBase {
  analyzer?: string
  auto_generate_synonyms_phrase_query?: boolean
  cutoff_frequency?: double
  fields?: Fields
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

export interface MultiSearchRequest extends RequestBase {
  index?: Indices
  type?: Types
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

export interface MultiSearchTemplateRequest extends RequestBase {
  index?: Indices
  type?: Types
  ccs_minimize_roundtrips?: boolean
  max_concurrent_searches?: long
  search_type?: SearchType
  total_hits_as_integer?: boolean
  typed_keys?: boolean
  body: {
    operations?: Record<string, SearchTemplateRequest>
  }
}

export type MultiTermQueryRewrite = string

export interface MultiTermVectorOperation {
  doc: object
  fields: Fields
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
  type?: Type
  fields?: Fields
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

export type MultiValueMode = 'min' | 'max' | 'avg' | 'sum'

export interface MultiplexerTokenFilter extends TokenFilterBase {
  filters: Array<string>
  preserve_original: boolean
}

export interface Murmur3HashProperty extends DocValuesPropertyBase {
}

export interface MutualInformationHeuristic {
  background_is_superset: boolean
  include_negatives: boolean
}

export interface NGramTokenFilter extends TokenFilterBase {
  max_gram: integer
  min_gram: integer
}

export interface NGramTokenizer extends TokenizerBase {
  custom_token_chars: string
  max_gram: integer
  min_gram: integer
  token_chars: Array<TokenChar>
}

export type Name = string

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

export interface NamedQueryKeys<TQuery = unknown> {
  boost?: float
  _name?: string
  ignore_unmapped?: boolean
}
export type NamedQuery<TQuery = unknown> = NamedQueryKeys<TQuery> |
    { [property: string]: TQuery }

export type Names = string | Array<string>

export interface NativeCodeInformation {
  build_hash: string
  version: string
}

export interface NestedAggregation extends BucketAggregationBase {
  path?: Field
}

export interface NestedIdentity {
  field: Field
  offset: integer
  _nested?: NestedIdentity
}

export interface NestedProperty extends ObjectProperty {
  include_in_parent: boolean
  include_in_root: boolean
}

export interface NestedQuery extends QueryBase {
  ignore_unmapped?: boolean
  inner_hits?: InnerHits
  path?: Field
  query?: QueryContainer
  score_mode?: NestedScoreMode
}

export type NestedScoreMode = 'avg' | 'sum' | 'min' | 'max' | 'none'

export interface NestedSortValue {
  filter: QueryContainer
  max_children?: integer
  path: Field
}

export interface NeverCondition {
}

export interface NodeAllocationExplanation {
  deciders: Array<AllocationDecision>
  node_attributes: Record<string, string>
  node_decision: Decision
  node_id: string
  node_name: string
  store?: AllocationStore
  transport_address: string
  weight_ranking: integer
}

export interface NodeAttributes {
  attributes: Record<string, string>
  ephemeral_id: string
  id: string
  name: string
  transport_address: string
}

export interface NodeBufferPool {
  count: long
  total_capacity: string
  total_capacity_in_bytes: long
  used: string
  used_in_bytes: long
}

export interface NodeDiskUsage {
  node_name: string
  least_available: DiskUsage
  most_available: DiskUsage
}

export type NodeIds = string

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

export interface NodeIngestStats {
  pipelines: Record<string, IngestStats>
  total: IngestStats
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

export interface NodePackagingType {
  count: integer
  flavor: string
  type: string
}

export interface NodeProcessInfo {
  id: long
  mlockall: boolean
  refresh_interval_in_millis: long
}

export interface NodeReloadException {
  name: string
  reload_exception: NodeReloadExceptionCausedBy
}

export interface NodeReloadExceptionCausedBy {
  type: string
  reason: string
  caused_by?: NodeReloadExceptionCausedBy
}

export type NodeRole = 'master' | 'data' | 'client' | 'ingest' | 'ml' | 'voting_only' | 'transform' | 'remote_cluster_client' | 'coordinating_only'

export interface NodeStatistics {
  failed: integer
  failures?: Array<ErrorCause>
  successful: integer
  total: integer
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

export interface NodeThreadPoolInfo {
  core: integer
  keep_alive: string
  max: integer
  queue_size: integer
  size: integer
  type: string
}

export interface NodeUsageInformation {
  rest_actions: Record<string, integer>
  since: EpochMillis
  timestamp: EpochMillis
  aggregations: Record<string, any>
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

export interface NodesResponseBase extends ResponseBase {
  _nodes: NodeStatistics
}

export interface NodesStatsRequest extends RequestBase {
  node_id?: NodeIds
  metric?: Metrics
  index_metric?: Metrics
  completion_fields?: Fields
  fielddata_fields?: Fields
  fields?: Fields
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

export interface NodesUsageRequest extends RequestBase {
  node_id?: NodeIds
  metric?: Metrics
  timeout?: Time
}

export interface NodesUsageResponse extends NodesResponseBase {
  cluster_name: string
  nodes: Record<string, NodeUsageInformation>
}

export type NonNullSumFunction = 'NonNullSum' | 'HighNonNullSum' | 'LowNonNullSum'

export type NonZeroCountFunction = 'NonZeroCount' | 'LowNonZeroCount' | 'HighNonZeroCount'

export interface NoriAnalyzer extends AnalyzerBase {
  decompound_mode: NoriDecompoundMode
  stoptags: Array<string>
  user_dictionary: string
}

export type NoriDecompoundMode = 'discard' | 'none' | 'mixed'

export interface NoriPartOfSpeechTokenFilter extends TokenFilterBase {
  stoptags: Array<string>
}

export interface NoriTokenizer extends TokenizerBase {
  decompound_mode: NoriDecompoundMode
  discard_punctuation: boolean
  user_dictionary: string
  user_dictionary_rules: Array<string>
}

export type Normalization = 'no' | 'h1' | 'h2' | 'h3' | 'z'

export interface NormalizeAggregation extends PipelineAggregationBase {
  method?: NormalizeMethod
}

export type NormalizeMethod = 'rescale_0_1' | 'rescale_0_100' | 'percent_of_sum' | 'mean' | 'zscore' | 'softmax'

export interface NumberProperty extends DocValuesPropertyBase {
  boost: double
  coerce: boolean
  fielddata: NumericFielddata
  ignore_malformed: boolean
  index: boolean
  null_value: double
  scaling_factor: double
}

export type NumberType = 'float' | 'half_float' | 'scaled_float' | 'double' | 'integer' | 'long' | 'short' | 'byte'

export interface NumericDecayFunctionKeys extends DecayFunctionBase {
}
export type NumericDecayFunction = NumericDecayFunctionKeys |
    { [property: string]: DecayPlacement<double, double> }

export interface NumericFielddata {
  format: NumericFielddataFormat
}

export type NumericFielddataFormat = 'array' | 'disabled'

export type NumericType = 'long' | 'double' | 'date' | 'date_nanos'

export interface ObjectProperty extends CorePropertyBase {
  dynamic: boolean | DynamicMapping
  enabled: boolean
  properties: Record<PropertyName, PropertyBase>
}

export type OpType = 'index' | 'create'

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
  shards_acknowledged: boolean
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

export interface OperatingSystemMemoryInfo {
  free_in_bytes: long
  free_percent: integer
  total_in_bytes: long
  used_in_bytes: long
  used_percent: integer
}

export interface OperatingSystemStats {
  cpu: CPUStats
  mem: ExtendedMemoryStats
  swap: MemoryStats
  timestamp: long
}

export type Operator = 'and' | 'or' | 'AND' | 'OR'

export interface OverallBucket {
  bucket_span: long
  is_interim: boolean
  jobs: Array<OverallBucketJobInfo>
  overall_score: double
  result_type: string
  timestamp: DateString
}

export interface OverallBucketJobInfo {
  job_id: string
  max_anomaly_score: double
}

export interface Page {
  from: integer
  size: integer
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

export interface PainlessContextSetup {
  document: any
  index: IndexName
  query: QueryContainer
}

export interface ParentAggregation extends BucketAggregationBase {
  type?: RelationName
}

export interface ParentIdQuery extends QueryBase {
  id?: Id
  ignore_unmapped?: boolean
  type?: RelationName
}

export interface PartitionScore {
  initial_record_score: double
  partition_field_name: string
  partition_field_value: string
  probability: double
  record_score: double
}

export interface PathHierarchyTokenizer extends TokenizerBase {
  buffer_size: integer
  delimiter: string
  replacement: string
  reverse: boolean
  skip: integer
}

export interface PatternAnalyzer extends AnalyzerBase {
  flags: string
  lowercase: boolean
  pattern: string
  stopwords: StopWords
}

export interface PatternCaptureTokenFilter extends TokenFilterBase {
  patterns: Array<string>
  preserve_original: boolean
}

export interface PatternReplaceCharFilter extends CharFilterBase {
  flags: string
  pattern: string
  replacement: string
}

export interface PatternReplaceTokenFilter extends TokenFilterBase {
  flags: string
  pattern: string
  replacement: string
}

export interface PatternTokenizer extends TokenizerBase {
  flags: string
  group: integer
  pattern: string
}

export interface PauseAutoFollowPatternRequest extends RequestBase {
  name: Name
}

export interface PauseAutoFollowPatternResponse extends AcknowledgedResponseBase {
}

export interface PauseFollowIndexRequest extends RequestBase {
  index: IndexName
}

export interface PauseFollowIndexResponse extends AcknowledgedResponseBase {
}

export interface PendingTask {
  insert_order: integer
  priority: string
  source: string
  time_in_queue: string
  time_in_queue_millis: integer
}

export interface PerPartitionCategorization {
  enabled?: boolean
  stop_on_warn?: boolean
}

export type Percentage = string | float

export interface PercentageScoreHeuristic {
}

export interface PercentileItem {
  percentile: double
  value: double
}

export interface PercentileRanksAggregation extends FormatMetricAggregationBase {
  keyed?: boolean
  values?: Array<double>
  hdr?: HdrMethod
  tdigest?: TDigest
}

export interface PercentilesAggregate extends AggregateBase {
  items: Array<PercentileItem>
}

export interface PercentilesAggregation extends FormatMetricAggregationBase {
  keyed?: boolean
  percents?: Array<double>
  hdr?: HdrMethod
  tdigest?: TDigest
}

export interface PercentilesBucketAggregation extends PipelineAggregationBase {
  percents?: Array<double>
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

export interface PercolatorProperty extends PropertyBase {
}

export interface Phase {
  actions: Record<string, LifecycleAction>
  min_age?: Time
}

export interface Phases {
  cold?: Phase
  delete?: Phase
  hot?: Phase
  warm?: Phase
}

export type PhoneticEncoder = 'metaphone' | 'double_metaphone' | 'soundex' | 'refined_soundex' | 'caverphone1' | 'caverphone2' | 'cologne' | 'nysiis' | 'koelnerphonetik' | 'haasephonetik' | 'beider_morse' | 'daitch_mokotoff'

export type PhoneticLanguage = 'any' | 'comomon' | 'cyrillic' | 'english' | 'french' | 'german' | 'hebrew' | 'hungarian' | 'polish' | 'romanian' | 'russian' | 'spanish'

export type PhoneticNameType = 'generic' | 'ashkenazi' | 'sephardic'

export type PhoneticRuleType = 'approx' | 'exact'

export interface PhoneticTokenFilter extends TokenFilterBase {
  encoder: PhoneticEncoder
  languageset: Array<PhoneticLanguage>
  max_code_len: integer
  name_type: PhoneticNameType
  replace: boolean
  rule_type: PhoneticRuleType
}

export interface PhraseSuggestCollate {
  params?: Record<string, any>
  prune?: boolean
  query: PhraseSuggestCollateQuery
}

export interface PhraseSuggestCollateQuery {
  id?: Id
  source?: string
}

export interface PhraseSuggestHighlight {
  post_tag: string
  pre_tag: string
}

export interface PhraseSuggestOption {
  text: string
  highlighted: string
  score: double
}

export interface PhraseSuggester extends SuggesterBase {
  collate?: PhraseSuggestCollate
  confidence?: double
  direct_generator?: Array<DirectGenerator>
  force_unigrams?: boolean
  gram_size?: integer
  highlight?: PhraseSuggestHighlight
  max_errors?: double
  real_word_error_likelihood?: double
  separator?: string
  shard_size?: integer
  smoothing?: SmoothingModelContainer
  text?: string
  token_limit?: integer
}

export interface PingRequest extends RequestBase {
}

export type PingResponse = boolean

export interface PinnedQuery extends QueryBase {
  ids?: Array<Id>
  organic?: QueryContainer
}

export interface Pipeline {
  description: string
  on_failure: Array<ProcessorContainer>
  processors: Array<ProcessorContainer>
}

export interface PipelineAggregationBase extends Aggregation {
  buckets_path?: BucketsPath
  format?: string
  gap_policy?: GapPolicy
}

export type PipelineFailure = 'BadAuthentication' | 'BadResponse' | 'PingFailure' | 'SniffFailure' | 'CouldNotStartSniffOnStartup' | 'MaxTimeoutReached' | 'MaxRetriesReached' | 'Unexpected' | 'BadRequest' | 'NoNodesAttempted'

export interface PipelineProcessor extends ProcessorBase {
  name: string
}

export interface PipelineSimulation {
  doc: DocumentSimulation
  processor_results: Array<PipelineSimulation>
  tag: string
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
  licensed: boolean
  type: string
}

export interface PointInTimeReference {
  id: string
  keep_alive?: Time
}

export interface Policy {
  phases: Phases
}

export interface PorterStemTokenFilter extends TokenFilterBase {
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

export interface PostJobDataRequest extends RequestBase {
  job_id: Id
  reset_end?: DateString
  reset_start?: DateString
  body: {
    data?: Array<any>
  }
}

export interface PostJobDataResponse extends ResponseBase {
  bucket_count: long
  earliest_record_timestamp: integer
  empty_bucket_count: long
  input_bytes: long
  input_field_count: long
  input_record_count: long
  invalid_date_count: long
  job_id: string
  last_data_time: integer
  latest_record_timestamp: integer
  missing_field_count: long
  out_of_order_timestamp_count: long
  processed_field_count: long
  processed_record_count: long
  sparse_bucket_count: long
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

export interface PredicateTokenFilter extends TokenFilterBase {
  script: Script
}

export interface PrefixQuery extends QueryBase {
  rewrite?: MultiTermQueryRewrite
  value: string
}

export interface PreviewDatafeedRequest extends RequestBase {
  datafeed_id: Id
}

export interface PreviewDatafeedResponse<TDocument = unknown> extends ResponseBase {
  data: Array<TDocument>
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

export type Privileges = Record<string, boolean>

export interface PrivilegesActions {
  actions: Array<string>
  metadata: Record<string, any>
}

export interface ProcessStats {
  cpu: CPUStats
  mem: MemoryStats
  open_file_descriptors: integer
  timestamp: long
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

export interface Profile {
  shards: Array<ShardProfile>
}

export interface PropertyBase {
  local_metadata?: Record<string, any>
  meta?: Record<string, string>
  name?: PropertyName
  type?: string
  properties?: Record<PropertyName, PropertyBase>
  ignore_above?: integer
  dynamic?: boolean | DynamicMapping
  fields?: Record<PropertyName, PropertyBase>
}

export type PropertyName = string

export interface PropertyWithClrOrigin {
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

export interface PutCalendarJobRequest extends RequestBase {
  calendar_id: Id
  job_id: Id
}

export interface PutCalendarJobResponse extends ResponseBase {
  calendar_id: string
  description: string
  job_ids: Array<string>
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
    indices?: Array<string>
    indexes?: Array<string>
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

export interface PutEnrichPolicyRequest extends RequestBase {
  name: Name
  body: {
    geo_match?: EnrichPolicy
    match?: EnrichPolicy
  }
}

export interface PutEnrichPolicyResponse extends AcknowledgedResponseBase {
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
  create_time: DateString
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

export interface PutLifecycleRequest extends RequestBase {
  policy?: Name
  policy_id?: Id
  body?: {
    policy?: Policy
  }
}

export interface PutLifecycleResponse extends AcknowledgedResponseBase {
}

export interface PutMappingRequest extends RequestBase {
  index?: Indices
  type?: Type
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
    dynamic_templates?: Record<string, DynamicTemplate> | Array<Record<string, DynamicTemplate>>
    field_names_field?: FieldNamesField
    index_field?: IndexField
    meta?: Record<string, any>
    numeric_detection?: boolean
    properties?: Record<PropertyName, PropertyBase>
    routing_field?: RoutingField
    size_field?: SizeField
    source_field?: SourceField
  }
}

export interface PutMappingResponse extends IndicesResponseBase {
}

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

export interface PutUserRequest extends RequestBase {
  username: Name
  refresh?: Refresh
  body: {
    email?: string | null
    full_name?: string | null
    metadata?: Record<string, any>
    password?: string
    password_hash?: string
    roles?: Array<string>
  }
}

export interface PutUserResponse extends ResponseBase {
  created: boolean
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

export type Quantifier = 'some' | 'all'

export interface QueryBase {
  boost?: float
  _name?: string
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

export interface QueryCacheStats {
  cache_count: long
  cache_size: long
  evictions: long
  hit_count: long
  memory_size_in_bytes: long
  miss_count: long
  total_count: long
}

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
  geo_bounding_box?: NamedQuery<GeoBoundingBoxQuery | string>
  geo_distance?: NamedQuery<GeoDistanceQuery | string>
  geo_polygon?: NamedQuery<GeoPolygonQuery | string>
  geo_shape?: NamedQuery<GeoShapeQuery | string>
  has_child?: HasChildQuery
  has_parent?: HasParentQuery
  ids?: IdsQuery
  intervals?: NamedQuery<IntervalsQuery | string>
  is_conditionless?: boolean
  is_strict?: boolean
  is_verbatim?: boolean
  is_writable?: boolean
  match?: NamedQuery<MatchQuery | string | float | boolean>
  match_all?: MatchAllQuery
  match_bool_prefix?: NamedQuery<MatchBoolPrefixQuery | string>
  match_none?: MatchNoneQuery
  match_phrase?: NamedQuery<MatchPhraseQuery | string>
  match_phrase_prefix?: NamedQuery<MatchPhrasePrefixQuery | string>
  more_like_this?: MoreLikeThisQuery
  multi_match?: MultiMatchQuery
  nested?: NestedQuery
  parent_id?: ParentIdQuery
  percolate?: PercolateQuery
  pinned?: PinnedQuery
  prefix?: NamedQuery<PrefixQuery | string>
  query_string?: QueryStringQuery
  range?: NamedQuery<RangeQuery>
  rank_feature?: NamedQuery<RankFeatureQuery | string>
  regexp?: NamedQuery<RegexpQuery | string>
  script?: ScriptQuery
  script_score?: ScriptScoreQuery
  shape?: NamedQuery<ShapeQuery | string>
  simple_query_string?: SimpleQueryStringQuery
  span_containing?: SpanContainingQuery
  field_masking_span?: SpanFieldMaskingQuery
  span_first?: SpanFirstQuery
  span_multi?: SpanMultiTermQuery
  span_near?: SpanNearQuery
  span_not?: SpanNotQuery
  span_or?: SpanOrQuery
  span_term?: NamedQuery<SpanTermQuery | string>
  span_within?: SpanWithinQuery
  term?: NamedQuery<TermQuery | string | float | boolean>
  terms?: NamedQuery<TermsQuery | Array<string>>
  terms_set?: NamedQuery<TermsSetQuery | string>
  wildcard?: NamedQuery<WildcardQuery | string>
  type?: TypeQuery
}

export interface QueryProfile {
  breakdown: QueryBreakdown
  description: string
  time_in_nanos: long
  type: string
  children?: Array<QueryProfile>
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
  rows: Array<Array<Record<string, any>>>
  values: Array<Array<Record<string, any>>>
}

export interface QueryStringQuery extends QueryBase {
  allow_leading_wildcard?: boolean
  analyzer?: string
  analyze_wildcard?: boolean
  auto_generate_synonyms_phrase_query?: boolean
  default_field?: Field
  default_operator?: Operator
  enable_position_increments?: boolean
  escape?: boolean
  fields?: Fields
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

export interface QueryUsage {
  count: integer
  failed: integer
  paging: integer
  total: integer
}

export interface QueryUserPrivileges {
  term: TermUserPrivileges
}

export interface RandomScoreFunction extends ScoreFunctionBase {
  field?: Field
  seed?: long | string
}

export interface RangeAggregation extends BucketAggregationBase {
  field?: Field
  ranges?: Array<AggregationRange>
  script?: Script
}

export interface RangeBucketKeys {
}
export type RangeBucket = RangeBucketKeys |
    { [property: string]: Aggregate }

export interface RangePropertyBase extends DocValuesPropertyBase {
  boost: double
  coerce: boolean
  index: boolean
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

export type RangeType = 'integer_range' | 'float_range' | 'long_range' | 'double_range' | 'date_range' | 'ip_range'

export interface RankFeatureFunction {
}

export interface RankFeatureProperty extends PropertyBase {
  positive_score_impact: boolean
}

export interface RankFeatureQuery extends QueryBase {
  function?: RankFeatureFunction
}

export interface RankFeaturesProperty extends PropertyBase {
}

export type RareFunction = 'Rare' | 'FreqRare'

export interface RareTermsAggregation extends BucketAggregationBase {
  exclude?: string | Array<string>
  field?: Field
  include?: string | Array<string> | TermsInclude
  max_doc_count?: long
  missing?: Missing
  precision?: double
  value_type?: string
}

export interface RareTermsBucketKeys<TKey = unknown> {
}
export type RareTermsBucket<TKey = unknown> = RareTermsBucketKeys<TKey> |
    { [property: string]: Aggregate }

export interface RateAggregation extends FormatMetricAggregationBase {
  unit?: DateInterval
  mode?: RateMode
}

export type RateMode = 'sum' | 'value_count'

export interface RealmInfo {
  name: string
  type: string
}

export interface RealmUsage extends XPackUsage {
  name: Array<string>
  order: Array<long>
  size: Array<long>
}

export type RebalanceEnable = 'all' | 'primaries' | 'replicas' | 'none'

export interface RecoveryBytes {
  percent: Percentage
  recovered?: ByteSize
  recovered_in_bytes: ByteSize
  reused?: ByteSize
  reused_in_bytes: ByteSize
  total?: ByteSize
  total_in_bytes: ByteSize
}

export interface RecoveryFileDetails {
  length: long
  name: string
  recovered: long
}

export interface RecoveryFiles {
  details?: Array<RecoveryFileDetails>
  percent: Percentage
  recovered: long
  reused: long
  total: long
}

export interface RecoveryIndexStatus {
  bytes?: RecoveryBytes
  files: RecoveryFiles
  size: RecoveryBytes
  source_throttle_time?: Time
  source_throttle_time_in_millis: EpochMillis
  target_throttle_time?: Time
  target_throttle_time_in_millis: EpochMillis
  total_time_in_millis: EpochMillis
  total_time?: Time
}

export type RecoveryInitialShards = 'quorem' | 'quorem-1' | 'full' | 'full-1'

export interface RecoveryOrigin {
  hostname?: string
  host?: string
  transport_address?: string
  id?: string
  ip?: string
  name?: string
  bootstrap_new_history_uuid?: boolean
}

export interface RecoveryStartStatus {
  check_index_time: long
  total_time_in_millis: string
}

export interface RecoveryStats {
  current_as_source: long
  current_as_target: long
  throttle_time?: string
  throttle_time_in_millis: long
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
  percent: Percentage
  recovered: long
  total: long
  total_on_start: long
  total_time?: string
  total_time_in_millis: EpochMillis
}

export interface RecoveryVerifyIndex {
  check_index_time?: Time
  check_index_time_in_millis: EpochMillis
  total_time?: Time
  total_time_in_millis: EpochMillis
}

export type Refresh = boolean | RefreshOptions

export type RefreshOptions = 'wait_for'

export interface RefreshRequest extends RequestBase {
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
}

export interface RefreshResponse extends ShardsOperationResponseBase {
}

export interface RefreshStats {
  external_total: long
  external_total_time_in_millis: long
  listeners: long
  total: long
  total_time?: string
  total_time_in_millis: long
}

export interface RegexpQuery extends QueryBase {
  flags?: string
  max_determinized_states?: integer
  value?: string
}

export interface ReindexDestination {
  index: IndexName
  op_type?: OpType
  pipeline?: string
  routing?: ReindexRouting
  version_type?: VersionType
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

export interface ReindexRethrottleRequest extends RequestBase {
  task_id: Id
  requests_per_second?: long
}

export interface ReindexRethrottleResponse extends ResponseBase {
  nodes: Record<string, ReindexNode>
}

export interface ReindexRouting {
}

export interface ReindexSource {
  index: Indices
  query?: QueryContainer
  remote?: RemoteSource
  size?: integer
  slice?: SlicedScroll
  sort?: Sort
  _source?: Fields
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

export type RelationName = string

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

export interface ReloadSecureSettingsRequest extends RequestBase {
  node_id?: NodeIds
  timeout?: Time
  body?: {
    secure_settings_password?: string
  }
}

export interface ReloadSecureSettingsResponse extends NodesResponseBase {
  cluster_name: string
  nodes: Record<string, NodeStats | NodeReloadException>
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

export interface RemoteSource {
  connect_timeout: Time
  host: Uri
  password: string
  socket_timeout: Time
  username: string
}

export interface RemoveDuplicatesTokenFilter extends TokenFilterBase {
}

export interface RemovePolicyRequest extends RequestBase {
  index: IndexName
}

export interface RemovePolicyResponse extends ResponseBase {
  failed_indexes: Array<string>
  has_failures: boolean
}

export interface RemoveProcessor extends ProcessorBase {
  field: Fields
  ignore_missing: boolean
}

export interface RenameProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  target_field: Field
}

export interface RenderSearchTemplateRequest extends RequestBase {
  body?: {
    file?: string
    params?: Record<string, any>
    source?: string
  }
}

export interface RenderSearchTemplateResponse extends ResponseBase {
  template_output: Record<string, any>
}

export interface RequestBase extends CommonQueryParameters {
}

export interface RequestCacheStats {
  evictions: long
  hit_count: long
  memory_size?: string
  memory_size_in_bytes: long
  miss_count: long
}

export interface Rescore {
  query: RescoreQuery
  window_size?: integer
}

export interface RescoreQuery {
  rescore_query: QueryContainer
  query_weight?: double
  rescore_query_weight?: double
  score_mode?: ScoreMode
}

export interface ReservedSize {
  node_id: string
  path: string
  total: long
  shards: Array<string>
}

export type ResourcePrivileges = Record<Name, Privileges>

export interface ResponseBase {
}

export type ResponseContentType = 'json' | 'yaml' | 'text'

export interface RestartWatcherResponse extends AcknowledgedResponseBase {
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

export type Result = 'Error' | 'created' | 'updated' | 'deleted' | 'not_found' | 'noop'

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
  timestamp: DateString
}

export interface ResumeAutoFollowPatternRequest extends RequestBase {
  name: Name
}

export interface ResumeAutoFollowPatternResponse extends AcknowledgedResponseBase {
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

export interface Retries {
  bulk: long
  search: long
}

export interface RetryIlmRequest extends RequestBase {
  index: IndexName
}

export interface RetryIlmResponse extends AcknowledgedResponseBase {
}

export interface ReverseNestedAggregation extends BucketAggregationBase {
  path?: Field
}

export interface ReverseTokenFilter extends TokenFilterBase {
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

export type RewriteMultiTerm = 'constant_score' | 'scoring_boolean' | 'constant_score_boolean' | 'top_terms_N' | 'top_terms_boost_N' | 'top_terms_blended_freqs_N'

export interface RoleMappingRuleBase {
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

export interface RollupCapabilities {
  rollup_jobs: Array<RollupCapabilitiesJob>
}

export interface RollupCapabilitiesJob {
  fields: Record<Field, Record<string, any>>
  index_pattern: string
  job_id: string
  rollup_index: string
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

export interface RollupIndexCapabilities {
  rollup_jobs: Array<RollupIndexCapabilitiesJob>
}

export interface RollupIndexCapabilitiesJob {
  fields: Record<Field, Record<string, string>>
  index_pattern: string
  job_id: string
  rollup_index: string
}

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

export type RollupMetric = 'min' | 'max' | 'sum' | 'avg' | 'value_count'

export interface RollupSearchRequest extends RequestBase {
  index: Indices
  type?: Type
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

export interface RootNodeInfoRequest extends RequestBase {
}

export interface RootNodeInfoResponse extends ResponseBase {
  cluster_name: string
  cluster_uuid: string
  name: string
  tagline: string
  version: ElasticsearchVersionInfo
}

export type Routing = string | number

export interface RoutingField {
  required: boolean
}

export type RuleAction = 'skip_result' | 'skip_model_update'

export interface RuleCondition {
  applies_to: AppliesTo
  operator: ConditionOperator
  value: double
}

export type RuleFilterType = 'include' | 'exclude'

export interface RuntimeField {
  format?: string
  script?: StoredScript
  type: FieldType
}

export type RuntimeFields = Record<Field, RuntimeField>

export interface SampleDiversity {
  field: Field
  max_docs_per_value: integer
}

export interface SamplerAggregation extends BucketAggregationBase {
  shard_size?: integer
}

export type SamplerAggregationExecutionHint = 'map' | 'global_ordinals' | 'bytes_hash'

export interface Schedule {
}

export interface ScheduleBase {
}

export interface ScheduleContainer {
  cron?: CronExpression
  daily?: DailySchedule
  hourly?: HourlySchedule
  interval?: Interval
  monthly?: Array<TimeOfMonth>
  weekly?: Array<TimeOfWeek>
  yearly?: Array<TimeOfYear>
}

export interface ScheduleTriggerEvent {
  scheduled_time: DateString | string
  triggered_time?: DateString | string
}

export interface ScheduledEvent {
  calendar_id: Id
  description: string
  end_time: DateString
  event_id: Id
  start_time: DateString
}

export interface ScoreFunctionBase {
  filter?: QueryContainer
  weight?: double
}

export type ScoreMode = 'avg' | 'max' | 'min' | 'multiply' | 'total'

export interface ScoreSort {
  mode?: SortMode
  order?: SortOrder
}

export type Script = InlineScript | IndexedScript | string

export interface ScriptBase {
  lang?: string
  params?: Record<string, any>
}

export interface ScriptCondition {
  lang: string
  params?: Record<string, any>
  source: string
}

export interface ScriptField {
  script: Script
}

export type ScriptLang = 'painless' | 'expression' | 'mustache'

export interface ScriptProcessor extends ProcessorBase {
  id: string
  lang: string
  params: Record<string, any>
  source: string
}

export interface ScriptQuery extends QueryBase {
  script?: Script
}

export interface ScriptScoreFunction extends ScoreFunctionBase {
  script: Script
}

export interface ScriptScoreQuery extends QueryBase {
  query?: QueryContainer
  script?: Script
}

export interface ScriptSort {
  order?: SortOrder
  script: Script
  type?: string
}

export interface ScriptStats {
  cache_evictions: long
  compilations: long
}

export interface ScriptTransform {
  lang: string
  params: Record<string, any>
}

export interface ScriptedHeuristic {
  script: Script
}

export interface ScriptedMetricAggregate extends AggregateBase {
  value: any
}

export interface ScriptedMetricAggregation extends MetricAggregationBase {
  combine_script?: Script
  init_script?: Script
  map_script?: Script
  params?: Record<string, any>
  reduce_script?: Script
}

export type ScrollId = string

export type ScrollIds = string

export interface ScrollRequest extends RequestBase {
  scroll_id?: Id
  scroll?: Time
  rest_total_hits_as_int?: boolean
  total_hits_as_integer?: boolean
  body?: {
    scroll?: Time
    scroll_id?: ScrollId
    rest_total_hits_as_int?: boolean
  }
}

export interface ScrollResponse<TDocument = unknown> extends SearchResponse<TDocument> {
  failed_shards?: Array<ScrollResponseFailedShard>
}

export interface ScrollResponseErrorReason {
  type: string
  reason: string
}

export interface ScrollResponseFailedShard {
  shard: integer
  reason: ScrollResponseErrorReason
}

export interface SearchAsYouTypeProperty extends CorePropertyBase {
  analyzer: string
  index: boolean
  index_options: IndexOptions
  max_shingle_size: integer
  norms: boolean
  search_analyzer: string
  search_quote_analyzer: string
  term_vector: TermVectorOption
}

export interface SearchInput {
  extract: Array<string>
  request: SearchInputRequestDefinition
  timeout: Time
}

export interface SearchInputRequestDefinition {
  body?: SearchRequest
  indices?: Array<IndexName>
  indices_options?: IndicesOptions
  search_type?: SearchType
  template?: SearchTemplateRequest
}

export interface SearchNode {
  name: string
  transport_address: string
}

export interface SearchProfile {
  collector: Array<Collector>
  query: Array<QueryProfile>
  rewrite_time: long
}

export interface SearchRequest extends RequestBase {
  index?: Indices
  type?: Types
  allow_no_indices?: boolean
  allow_partial_search_results?: boolean
  analyzer?: string
  analyze_wildcard?: boolean
  batched_reduce_size?: long
  ccs_minimize_roundtrips?: boolean
  default_operator?: DefaultOperator
  df?: string
  docvalue_fields?: Fields
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
  stored_fields?: Fields
  suggest_field?: Field
  suggest_mode?: SuggestMode
  suggest_size?: long
  suggest_text?: string
  total_hits_as_integer?: boolean
  track_total_hits?: boolean | integer
  typed_keys?: boolean
  rest_total_hits_as_int?: boolean
  _source_excludes?: Fields
  _source_includes?: Fields
  seq_no_primary_term?: boolean
  q?: string
  size?: integer
  from?: integer
  sort?: Array<string>
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
    sort?: Sort
    _source?: boolean | Fields | SourceFilter
    fields?: Array<Field | DateField>
    suggest?: Record<string, SuggestContainer>
    terminate_after?: long
    timeout?: string
    track_scores?: boolean
    version?: boolean
    seq_no_primary_term?: boolean
    stored_fields?: Fields
    pit?: PointInTimeReference
    runtime_mappings?: RuntimeFields
  }
}

export interface SearchResponse<TDocument = unknown> extends ResponseBase {
  took: long
  timed_out: boolean
  _shards: ShardStatistics
  hits: HitsMetadata<TDocument>
  aggregations?: Record<AggregateName, Aggregate>
  _clusters?: ClusterStatistics
  documents?: Array<TDocument>
  fields?: Record<string, any>
  max_score?: double
  num_reduce_phases?: long
  profile?: Profile
  pit_id?: string
  _scroll_id?: ScrollId
  suggest?: Record<SuggestionName, Array<Suggest<TDocument>>>
  terminated_early?: boolean
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

export interface SearchStats {
  fetch_current: long
  fetch_time_in_millis: long
  fetch_total: long
  open_contexts?: long
  query_current: long
  query_time_in_millis: long
  query_total: long
  scroll_current: long
  scroll_time_in_millis: long
  scroll_total: long
  suggest_current: long
  suggest_time_in_millis: long
  suggest_total: long
  groups?: Record<string, SearchStats>
}

export interface SearchTemplateRequest extends RequestBase {
  index?: Indices
  type?: Types
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
  body: {
    id?: string
    params?: Record<string, any>
    source?: string
  }
}

export interface SearchTransform {
  request: SearchInputRequestDefinition
  timeout: Time
}

export type SearchType = 'query_then_fetch' | 'dfs_query_then_fetch'

export interface SecurityFeatureToggle {
  enabled: boolean
}

export interface SecurityNode {
  name: string
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

export interface SegmentsStats {
  count: long
  doc_values_memory_in_bytes: long
  file_sizes: Record<string, ShardFileSizeInfo>
  fixed_bit_set_memory_in_bytes: long
  index_writer_max_memory_in_bytes?: long
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

export interface SerialDifferencingAggregation extends PipelineAggregationBase {
  lag?: integer
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

export interface SetUpgradeModeRequest extends RequestBase {
  enabled?: boolean
  timeout?: Time
}

export interface SetUpgradeModeResponse extends AcknowledgedResponseBase {
}

export type ShapeOrientation = 'ClockWise' | 'CounterClockWise'

export interface ShapeProperty extends DocValuesPropertyBase {
  coerce: boolean
  ignore_malformed: boolean
  ignore_z_value: boolean
  orientation: ShapeOrientation
}

export interface ShapeQuery extends QueryBase {
  ignore_unmapped?: boolean
  indexed_shape?: FieldLookup
  relation?: ShapeRelation
  shape?: GeoShape
}

export type ShapeRelation = 'intersects' | 'disjoint' | 'within'

export type ShapeType = 'geo_shape' | 'shape'

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

export interface ShardFailure {
  index: string
  node: string
  reason: ErrorCause
  shard: integer
  status?: string
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
  periodic: long
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

export interface ShardHealthStats {
  active_shards: integer
  initializing_shards: integer
  primary_active: boolean
  relocating_shards: integer
  status: Health
  unassigned_shards: integer
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

export interface ShardLease {
  id: string
  retaining_seq_no: long
  timestamp: long
  source: string
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

export interface ShardProfile {
  aggregations: Array<AggregationProfile>
  id: string
  searches: Array<SearchProfile>
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

export interface ShardRecovery {
  id: long
  index: RecoveryIndexStatus
  primary: boolean
  source: RecoveryOrigin
  stage: string
  start?: RecoveryStartStatus
  start_time?: DateString
  start_time_in_millis: EpochMillis
  stop_time?: DateString
  stop_time_in_millis: EpochMillis
  target: RecoveryOrigin
  total_time?: DateString
  total_time_in_millis: EpochMillis
  translog: RecoveryTranslogStatus
  type: string
  verify_index: RecoveryVerifyIndex
}

export interface ShardRefresh {
  listeners: long
  total: long
  total_time_in_millis: long
  external_total: long
  external_total_time_in_millis: long
}

export interface ShardRequestCache {
  evictions: long
  hit_count: long
  memory_size_in_bytes: long
  miss_count: long
}

export interface ShardRetentionLeases {
  primary_term: long
  version: long
  leases: Array<ShardLease>
}

export interface ShardRouting {
  node: string
  primary: boolean
  relocating_node?: string
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

export interface ShardSegmentRouting {
  node: string
  primary: boolean
  state: string
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

export interface ShardStatistics {
  failed: integer
  successful: integer
  total: integer
  failures?: Array<ShardFailure>
  skipped?: integer
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
  retention_leases: ShardRetentionLeases
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
  reserved_in_bytes: long
  size_in_bytes: long
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

export interface ShardTransactionLog {
  earliest_last_modified_age: long
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

export interface ShardsOperationResponseBase extends ResponseBase {
  _shards: ShardStatistics
}

export interface ShardsSegment {
  num_committed_segments: integer
  routing: ShardSegmentRouting
  num_search_segments: integer
  segments: Record<string, Segment>
}

export interface ShingleTokenFilter extends TokenFilterBase {
  filler_token: string
  max_shingle_size: integer
  min_shingle_size: integer
  output_unigrams: boolean
  output_unigrams_if_no_shingles: boolean
  token_separator: string
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

export interface SignificantTermsAggregate<TKey = unknown> extends MultiBucketAggregate<TKey> {
  bg_count: long
  doc_count: long
}

export interface SignificantTermsAggregation extends BucketAggregationBase {
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

export interface SignificantTermsBucketKeys<TKey = unknown> {
}
export type SignificantTermsBucket<TKey = unknown> = SignificantTermsBucketKeys<TKey> |
    { [property: string]: Aggregate }

export interface SignificantTextAggregation extends BucketAggregationBase {
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
  source_fields?: Fields
}

export interface SimpleAnalyzer extends AnalyzerBase {
}

export interface SimpleInput {
  payload: Record<string, any>
}

export type SimpleQueryStringFlags = 'NONE' | 'AND' | 'OR' | 'NOT' | 'PREFIX' | 'PHRASE' | 'PRECEDENCE' | 'ESCAPE' | 'WHITESPACE' | 'FUZZY' | 'NEAR' | 'SLOP' | 'ALL'

export interface SimpleQueryStringQuery extends QueryBase {
  analyzer?: string
  analyze_wildcard?: boolean
  auto_generate_synonyms_phrase_query?: boolean
  default_operator?: Operator
  fields?: Fields
  flags?: SimpleQueryStringFlags | string
  fuzzy_max_expansions?: integer
  fuzzy_prefix_length?: integer
  fuzzy_transpositions?: boolean
  lenient?: boolean
  minimum_should_match?: MinimumShouldMatch
  query?: string
  quote_field_suffix?: string
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

export interface SimulatedActions {
  actions: Array<string>
  all: SimulatedActions
  use_all: boolean
}

export interface SingleBucketAggregateKeys extends AggregateBase {
  doc_count: double
}
export type SingleBucketAggregate = SingleBucketAggregateKeys |
    { [property: string]: Aggregate }

export interface SingleGroupSource {
  field: Field
  script: Script
}

export type Size = 'Raw' | 'k' | 'm' | 'g' | 't' | 'p'

export interface SizeField {
  enabled: boolean
}

export interface SlackActionMessageResult {
  message: SlackMessage
  request?: HttpInputRequestResult
  response?: HttpInputResponseResult
}

export interface SlackActionResult {
  account?: string
  message: SlackMessage
}

export interface SlackAttachment {
  author_icon?: string
  author_link?: string
  author_name: string
  color?: string
  fallback?: string
  fields?: Array<SlackAttachmentField>
  footer?: string
  footer_icon?: string
  image_url?: string
  pretext?: string
  text?: string
  thumb_url?: string
  title: string
  title_link?: string
  ts?: DateString
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
  dynamic_attachments?: SlackDynamicAttachment
  from: string
  icon?: string
  text: string
  to: Array<string>
}

export interface SlicedScroll {
  field?: Field
  id: integer
  max: integer
}

export interface SlmUsage extends XPackUsage {
  policy_count: integer
  policy_stats: SnapshotLifecycleStats
}

export interface SmoothingModel {
}

export interface SmoothingModelContainer {
  laplace: LaplaceSmoothingModel
  linear_interpolation: LinearInterpolationSmoothingModel
  stupid_backoff: StupidBackoffSmoothingModel
}

export interface SnapshotIndexStats {
  shards: Record<string, SnapshotShardsStats>
  shards_stats: SnapshotShardsStats
  stats: SnapshotStats
}

export interface SnapshotInfo {
  data_streams: Array<string>
  duration_in_millis: long
  end_time?: DateString
  end_time_in_millis?: long
  failures?: Array<SnapshotShardFailure>
  include_global_state?: boolean
  indices: Array<IndexName>
  metadata?: Record<string, any>
  reason?: string
  snapshot: string
  shards?: ShardStatistics
  start_time?: DateString
  start_time_in_millis?: long
  state?: string
  uuid: string
  version?: string
  version_id?: integer
}

export interface SnapshotLifecycleConfig {
  ignore_unavailable: boolean
  include_global_state: boolean
  indices: Indices
}

export interface SnapshotLifecycleInProgress {
  name: string
  start_time_millis: DateString
  state: string
  uuid: string
}

export interface SnapshotLifecycleInvocationRecord {
  snapshot_name: string
  time: DateString
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
  modified_date_millis: DateString
  next_execution_millis: DateString
  policy: SnapshotLifecyclePolicy
  version: integer
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

export interface SnapshotRepository {
  type: string
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
  accepted?: boolean
  snapshot?: SnapshotInfo
}

export interface SnapshotRestore {
  indices: Array<IndexName>
  snapshot: string
  shards: ShardStatistics
}

export interface SnapshotRetentionConfiguration {
  expire_after: Time
  max_count: integer
  min_count: integer
}

export interface SnapshotShardFailure {
  index: string
  node_id: string
  reason: string
  shard_id: string
  status: string
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

export interface SnowballAnalyzer extends AnalyzerBase {
  language: SnowballLanguage
  stopwords: StopWords
}

export type SnowballLanguage = 'Armenian' | 'Basque' | 'Catalan' | 'Danish' | 'Dutch' | 'English' | 'Finnish' | 'French' | 'German' | 'German2' | 'Hungarian' | 'Italian' | 'Kp' | 'Lovins' | 'Norwegian' | 'Porter' | 'Portuguese' | 'Romanian' | 'Russian' | 'Spanish' | 'Swedish' | 'Turkish'

export interface SnowballTokenFilter extends TokenFilterBase {
  language: SnowballLanguage
}

export type Sort = SortCombinations | Array<SortCombinations>

export type SortCombinations = Field | SortContainer | SortOrder

export interface SortContainerKeys {
  _score?: ScoreSort
  _doc?: ScoreSort
  _geo_distance?: GeoDistanceSort
  _script?: ScriptSort
}
export type SortContainer = SortContainerKeys |
    { [property: string]: FieldSort | SortOrder }

export type SortMode = 'min' | 'max' | 'sum' | 'avg' | 'median'

export type SortOrder = 'asc' | 'desc' | '_doc'

export interface SortProcessor extends ProcessorBase {
  field: Field
  order: SortOrder
  target_field: Field
}

export type SortResults = Array<long | double | string | null>

export type SortSpecialField = '_score' | '_doc'

export interface SourceExistsRequest extends RequestBase {
  id: Id
  index: IndexName
  type?: Type
  preference?: string
  realtime?: boolean
  refresh?: boolean
  routing?: Routing
  source_enabled?: boolean
  source_excludes?: Fields
  source_includes?: Fields
  version?: long
  version_type?: VersionType
}

export type SourceExistsResponse = boolean

export interface SourceField {
  compress: boolean
  compress_threshold: string
  enabled: boolean
  excludes: Array<string>
  includes: Array<string>
}

export interface SourceFilter {
  excludes?: Fields
  includes?: Fields
  exclude?: Fields
  include?: Fields
}

export interface SourceRequest extends RequestBase {
  id: Id
  index: IndexName
  type?: Type
  preference?: string
  realtime?: boolean
  refresh?: boolean
  routing?: Routing
  source_enabled?: boolean
  _source_excludes?: Fields
  _source_includes?: Fields
  version?: long
  version_type?: VersionType
}

export interface SourceResponse<TDocument = unknown> extends ResponseBase {
  body: TDocument
}

export interface SpanContainingQuery extends QueryBase {
  big?: SpanQuery
  little?: SpanQuery
}

export interface SpanFieldMaskingQuery extends QueryBase {
  field?: Field
  query?: SpanQuery
}

export interface SpanFirstQuery extends QueryBase {
  end?: integer
  match?: SpanQuery
}

export interface SpanGapQuery extends QueryBase {
  field?: Field
  width?: integer
}

export interface SpanMultiTermQuery extends QueryBase {
  match?: QueryContainer
}

export interface SpanNearQuery extends QueryBase {
  clauses?: Array<SpanQuery>
  in_order?: boolean
  slop?: integer
}

export interface SpanNotQuery extends QueryBase {
  dist?: integer
  exclude?: SpanQuery
  include?: SpanQuery
  post?: integer
  pre?: integer
}

export interface SpanOrQuery extends QueryBase {
  clauses?: Array<SpanQuery>
}

export interface SpanQuery extends QueryBase {
  span_containing?: NamedQuery<SpanContainingQuery | string>
  field_masking_span?: NamedQuery<SpanFieldMaskingQuery | string>
  span_first?: NamedQuery<SpanFirstQuery | string>
  span_gap?: NamedQuery<SpanGapQuery | integer>
  span_multi?: SpanMultiTermQuery
  span_near?: NamedQuery<SpanNearQuery | string>
  span_not?: NamedQuery<SpanNotQuery | string>
  span_or?: NamedQuery<SpanOrQuery | string>
  span_term?: NamedQuery<SpanTermQuery | string>
  span_within?: NamedQuery<SpanWithinQuery | string>
}

export interface SpanSubQuery extends QueryBase {
}

export interface SpanTermQuery extends QueryBase {
  value: string
}

export interface SpanWithinQuery extends QueryBase {
  big?: SpanQuery
  little?: SpanQuery
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

export interface SplitProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  preserve_trailing: boolean
  separator: string
  target_field: Field
}

export interface SqlColumn {
  name: string
  type: string
}

export interface SqlUsage extends XPackUsage {
  features: Record<string, integer>
  queries: Record<string, QueryUsage>
}

export interface SslUsage {
  http: SecurityFeatureToggle
  transport: SecurityFeatureToggle
}

export interface StandardAnalyzer extends AnalyzerBase {
  max_token_length: integer
  stopwords: StopWords
}

export interface StandardDeviationBounds {
  lower?: double
  upper?: double
  lower_population?: double
  upper_population?: double
  lower_sampling?: double
  upper_sampling?: double
}

export interface StandardTokenizer extends TokenizerBase {
  max_token_length: integer
}

export interface StartBasicLicenseRequest extends RequestBase {
  acknowledge?: boolean
}

export interface StartBasicLicenseResponse extends AcknowledgedResponseBase {
  acknowledge: Record<string, string | Array<string>>
  basic_was_started: boolean
  error_message: string
}

export interface StartDatafeedRequest extends RequestBase {
  datafeed_id: Id
  body?: {
    end?: DateString
    start?: DateString
    timeout?: Time
  }
}

export interface StartDatafeedResponse extends ResponseBase {
  node: NodeIds
  started: boolean
}

export interface StartIlmRequest extends RequestBase {
}

export interface StartIlmResponse extends AcknowledgedResponseBase {
}

export interface StartRollupJobRequest extends RequestBase {
  id: Id
}

export interface StartRollupJobResponse extends ResponseBase {
  started: boolean
}

export interface StartSnapshotLifecycleManagementRequest extends RequestBase {
}

export interface StartSnapshotLifecycleManagementResponse extends AcknowledgedResponseBase {
}

export interface StartTransformRequest extends RequestBase {
  transform_id: Name
  timeout?: Time
}

export interface StartTransformResponse extends AcknowledgedResponseBase {
}

export interface StartTrialLicenseRequest extends RequestBase {
  acknowledge?: boolean
  type_query_string?: string
}

export interface StartTrialLicenseResponse extends AcknowledgedResponseBase {
  error_message: string
  trial_was_started: boolean
}

export interface StartWatcherRequest extends RequestBase {
}

export interface StartWatcherResponse extends AcknowledgedResponseBase {
}

export interface StatsAggregate extends AggregateBase {
  count: double
  sum: double
  avg?: double
  max?: double
  min?: double
}

export interface StatsAggregation extends FormatMetricAggregationBase {
}

export interface StatsBucketAggregation extends PipelineAggregationBase {
}

export type Status = 'success' | 'failure' | 'simulated' | 'throttled'

export interface StemmerOverrideTokenFilter extends TokenFilterBase {
  rules: Array<string>
  rules_path: string
}

export interface StemmerTokenFilter extends TokenFilterBase {
  language: string
}

export interface StepKey {
  action: string
  name: string
  phase: string
}

export interface StopAnalyzer extends AnalyzerBase {
  stopwords: StopWords
  stopwords_path: string
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

export interface StopIlmRequest extends RequestBase {
}

export interface StopIlmResponse extends AcknowledgedResponseBase {
}

export interface StopRollupJobRequest extends RequestBase {
  id: Id
  timeout?: Time
  wait_for_completion?: boolean
}

export interface StopRollupJobResponse extends ResponseBase {
  stopped: boolean
}

export interface StopSnapshotLifecycleManagementRequest extends RequestBase {
}

export interface StopSnapshotLifecycleManagementResponse extends AcknowledgedResponseBase {
}

export interface StopTokenFilter extends TokenFilterBase {
  ignore_case?: boolean
  remove_trailing?: boolean
  stopwords: StopWords
  stopwords_path?: string
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

export interface StopWatcherRequest extends RequestBase {
}

export interface StopWatcherResponse extends AcknowledgedResponseBase {
}

export type StopWords = string | Array<string>

export type StoreCopy = 'NONE' | 'AVAILABLE' | 'CORRUPT' | 'IO_ERROR' | 'STALE' | 'UNKNOWN'

export interface StoreStats {
  size?: string
  size_in_bytes: double
  reserved_in_bytes: double
}

export interface StoredScript {
  lang: string
  source: string
}

export type StringDistance = 'internal' | 'damerau_levenshtein' | 'levenshtein' | 'jaro_winkler' | 'ngram'

export interface StringFielddata {
  format: StringFielddataFormat
}

export type StringFielddataFormat = 'paged_bytes' | 'disabled'

export interface StringStatsAggregate extends AggregateBase {
  count: long
  min_length: integer
  max_length: integer
  avg_length: double
  entropy: double
  distribution?: Record<string, double>
}

export interface StringStatsAggregation extends MetricAggregationBase {
  show_distribution?: boolean
}

export interface StupidBackoffSmoothingModel {
  discount: double
}

export interface Suggest<T = unknown> {
  length: integer
  offset: integer
  options: Array<SuggestOption<T>>
  text: string
}

export interface SuggestContainer {
  completion?: CompletionSuggester
  phrase?: PhraseSuggester
  prefix?: string
  regex?: string
  term?: TermSuggester
  text?: string
}

export interface SuggestContext {
  name: string
  path: Field
  type: string
}

export interface SuggestContextQuery {
  boost?: double
  context: Context
  neighbours?: Array<Distance> | Array<integer>
  precision?: Distance | integer
  prefix?: boolean
}

export interface SuggestFuzziness {
  fuzziness: Fuzziness
  min_length: integer
  prefix_length: integer
  transpositions: boolean
  unicode_aware: boolean
}

export type SuggestMode = 'missing' | 'popular' | 'always'

export type SuggestOption<TDocument> = CompletionSuggestOption<TDocument> | PhraseSuggestOption | TermSuggestOption

export type SuggestSort = 'score' | 'frequency'

export interface SuggesterBase {
  field: Field
  analyzer?: string
  size?: integer
}

export type SuggestionName = string

export interface SumAggregation extends FormatMetricAggregationBase {
}

export interface SumBucketAggregation extends PipelineAggregationBase {
}

export type SumFunction = 'Sum' | 'HighSum' | 'LowSum'

export interface SyncedFlushRequest extends RequestBase {
  index?: Indices
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
}

export interface SyncedFlushResponse extends DictionaryResponseBase<IndexName, ShardStatistics> {
  _shards: ShardStatistics
}

export type SynonymFormat = 'solr' | 'wordnet'

export interface SynonymGraphTokenFilter extends TokenFilterBase {
  expand: boolean
  format: SynonymFormat
  lenient: boolean
  synonyms: Array<string>
  synonyms_path: string
  tokenizer: string
  updateable: boolean
}

export interface SynonymTokenFilter extends TokenFilterBase {
  expand: boolean
  format: SynonymFormat
  lenient: boolean
  synonyms: Array<string>
  synonyms_path: string
  tokenizer: string
  updateable: boolean
}

export interface TDigest {
  compression?: integer
}

export interface TDigestPercentilesAggregate extends AggregateBase {
  values: Record<string, double>
}

export interface TTestAggregation extends Aggregation {
  a?: TestPopulation
  b?: TestPopulation
  type?: TTestType
}

export type TTestType = 'paired' | 'homoscedastic' | 'heteroscedastic'

export interface TaskExecutingNode {
  attributes: Record<string, string>
  host: string
  ip: string
  name: string
  roles: Array<string>
  tasks: Record<TaskId, TaskState>
  transport_address: string
}

export type TaskId = string

export interface TaskInfo {
  action: string
  cancellable: boolean
  children?: Array<TaskInfo>
  description: string
  headers: Record<string, string>
  id: long
  node: string
  running_time_in_nanos: long
  start_time_in_millis: long
  status: TaskStatus
  type: string
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
  parent_task_id?: TaskId
  running_time_in_nanos: long
  start_time_in_millis: long
  status: TaskStatus
  type: string
}

export interface TaskStatus {
  batches: long
  canceled: string
  created: long
  deleted: long
  noops: long
  failures?: Array<string>
  requests_per_second: float
  retries: TaskRetries
  throttled?: Time
  throttled_millis: long
  throttled_until?: Time
  throttled_until_millis: long
  timed_out?: boolean
  took?: long
  total: long
  updated: long
  version_conflicts: long
}

export interface TemplateMapping {
  aliases: Record<IndexName, Alias>
  index_patterns: Array<string>
  mappings: TypeMapping
  order: integer
  settings: Record<string, any>
  version: integer
}

export interface TermQuery extends QueryBase {
  value?: string | float | boolean
}

export interface TermSuggestOption {
  text: string
  freq: long
  score: double
}

export interface TermSuggester extends SuggesterBase {
  lowercase_terms?: boolean
  max_edits?: integer
  max_inspections?: integer
  max_term_freq?: float
  min_doc_freq?: float
  min_word_length?: integer
  prefix_length?: integer
  shard_size?: integer
  sort?: SuggestSort
  string_distance?: StringDistance
  suggest_mode?: SuggestMode
  text?: string
}

export interface TermUserPrivileges {
  apps: boolean
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

export type TermVectorOption = 'no' | 'yes' | 'with_offsets' | 'with_positions' | 'with_positions_offsets' | 'with_positions_offsets_payloads'

export interface TermVectorTerm {
  doc_freq: integer
  score: double
  term_freq: integer
  tokens: Array<Token>
  ttf: integer
}

export interface TermVectorsRequest<TDocument = unknown> extends RequestBase {
  index: IndexName
  id?: Id
  type?: Type
  fields?: Fields
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

export interface TermsAggregate<TKey = unknown> extends MultiBucketAggregate<TKey> {
  doc_count_error_upper_bound: long
  sum_other_doc_count: long
}

export interface TermsAggregation extends BucketAggregationBase {
  collect_mode?: TermsAggregationCollectMode
  exclude?: string | Array<string>
  execution_hint?: TermsAggregationExecutionHint
  field?: Field
  include?: string | Array<string> | TermsInclude
  min_doc_count?: integer
  missing?: Missing
  missing_bucket?: boolean
  value_type?: string
  order?: TermsAggregationOrder
  script?: Script
  shard_size?: integer
  show_term_doc_count_error?: boolean
  size?: integer
}

export type TermsAggregationCollectMode = 'depth_first' | 'breadth_first'

export type TermsAggregationExecutionHint = 'map' | 'global_ordinals' | 'global_ordinals_hash' | 'global_ordinals_low_cardinality'

export type TermsAggregationOrder = SortOrder | Record<string, SortOrder> | Array<Record<string, SortOrder>>

export interface TermsInclude {
  num_partitions: long
  partition: long
}

export interface TermsQuery extends QueryBase {
  terms?: Array<string>
  index?: IndexName
  id?: Id
  path?: string
  routing?: Routing
}

export interface TermsRollupGrouping {
  fields: Fields
}

export interface TermsSetQuery extends QueryBase {
  minimum_should_match_field?: Field
  minimum_should_match_script?: Script
  terms?: Array<string>
}

export interface TestPopulation {
  field: Field
  script?: Script
  filter: QueryContainer
}

export interface TextIndexPrefixes {
  max_chars: integer
  min_chars: integer
}

export interface TextProperty extends CorePropertyBase {
  analyzer: string
  boost: double
  eager_global_ordinals: boolean
  fielddata: boolean
  fielddata_frequency_filter: FielddataFrequencyFilter
  index: boolean
  index_options: IndexOptions
  index_phrases: boolean
  index_prefixes: TextIndexPrefixes
  norms: boolean
  position_increment_gap: integer
  search_analyzer: string
  search_quote_analyzer: string
  term_vector: TermVectorOption
}

export type TextQueryType = 'best_fields' | 'most_fields' | 'cross_fields' | 'phrase' | 'phrase_prefix' | 'bool_prefix'

export type TextToAnalyze = string | Array<string>

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

export type ThreadType = 'cpu' | 'wait' | 'block'

export interface ThreeDimensionalPoint {
  lat: double
  lon: double
  z?: double
}

export interface ThrottleState {
  reason: string
  timestamp: DateString
}

export type Time = string | integer

export type TimeFunction = 'TimeOfDay' | 'TimeOfWeek'

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

export type TimeSpan = string

export type TimeUnit = 'nanos' | 'micros' | 'ms' | 's' | 'm' | 'h' | 'd'

export type Timestamp = string

export interface TimingStats {
  average_bucket_processing_time_ms: double
  bucket_count: long
  exponential_average_bucket_processing_time_ms: double
  exponential_average_bucket_processing_time_per_hour_ms: double
  job_id: string
  maximum_bucket_processing_time_ms: double
  minimum_bucket_processing_time_ms: double
}

export interface Token {
  end_offset: integer
  payload: string
  position: integer
  start_offset: integer
}

export type TokenChar = 'letter' | 'digit' | 'whitespace' | 'punctuation' | 'symbol' | 'custom'

export interface TokenCountProperty extends DocValuesPropertyBase {
  analyzer: string
  boost: double
  index: boolean
  null_value: double
}

export interface TokenDetail {
  name: string
  tokens: Array<ExplainAnalyzeToken>
}

export type TokenFilter = AsciiFoldingTokenFilter | CommonGramsTokenFilter | ConditionTokenFilter | DelimitedPayloadTokenFilter | EdgeNGramTokenFilter | ElisionTokenFilter | FingerprintTokenFilter | HunspellTokenFilter | HyphenationDecompounderTokenFilter | KeepTypesTokenFilter | KeepWordsTokenFilter | KeywordMarkerTokenFilter | KStemTokenFilter | LengthTokenFilter | LimitTokenCountTokenFilter | LowercaseTokenFilter | MultiplexerTokenFilter | NGramTokenFilter | NoriPartOfSpeechTokenFilter | PatternCaptureTokenFilter | PatternReplaceTokenFilter | PorterStemTokenFilter | PredicateTokenFilter | RemoveDuplicatesTokenFilter | ReverseTokenFilter | ShingleTokenFilter | SnowballTokenFilter | StemmerOverrideTokenFilter | StemmerTokenFilter | StopTokenFilter | SynonymGraphTokenFilter | SynonymTokenFilter | TrimTokenFilter | TruncateTokenFilter | UniqueTokenFilter | UppercaseTokenFilter | WordDelimiterGraphTokenFilter | WordDelimiterTokenFilter

export interface TokenFilterBase {
  type: string
  version?: string
}

export type TokenType = 'None' | 'Word' | 'LParen' | 'RParen' | 'Comma'

export type Tokenizer = CharGroupTokenizer | EdgeNGramTokenizer | KeywordTokenizer | LetterTokenizer | LowercaseTokenizer | NGramTokenizer | NoriTokenizer | PathHierarchyTokenizer | StandardTokenizer | UaxEmailUrlTokenizer | WhitespaceTokenizer

export interface TokenizerBase {
  type: string
  version?: string
}

export interface TopHit {
  count: long
  value: any
}

export interface TopHitsAggregate extends AggregateBase {
  hits: HitsMetadata<Record<string, any>>
}

export interface TopHitsAggregation extends MetricAggregationBase {
  docvalue_fields?: Fields
  explain?: boolean
  from?: integer
  highlight?: Highlight
  script_fields?: Record<string, ScriptField>
  size?: integer
  sort?: Sort
  _source?: boolean | SourceFilter | Fields
  stored_fields?: Fields
  track_scores?: boolean
  version?: boolean
  seq_no_primary_term?: boolean
}

export interface TopMetrics {
  sort: Array<long | double | string>
  metrics: Record<string, long | double | string>
}

export interface TopMetricsAggregate extends AggregateBase {
  top: Array<TopMetrics>
}

export interface TopMetricsAggregation extends MetricAggregationBase {
  metrics?: Array<TopMetricsValue>
  size?: integer
  sort?: Sort
}

export interface TopMetricsValue {
  field: Field
}

export interface TotalFileSystemStats {
  available: string
  available_in_bytes: long
  free: string
  free_in_bytes: long
  total: string
  total_in_bytes: long
}

export interface TotalHits {
  relation: TotalHitsRelation
  value: long
}

export type TotalHitsRelation = 'eq' | 'gte'

export interface Transform {
}

export interface TransformCheckpointStats {
  checkpoint: long
  checkpoint_progress: TransformProgress
  timestamp: DateString
  timestamp_millis: long
  time_upper_bound: DateString
  time_upper_bound_millis: long
}

export interface TransformCheckpointingInfo {
  changes_last_detected_at: long
  changes_last_detected_at_date_time: DateString
  last: TransformCheckpointStats
  next: TransformCheckpointStats
  operations_behind: long
}

export interface TransformContainer {
  chain: ChainTransform
  script: ScriptTransform
  search: SearchTransform
}

export interface TransformDestination {
  index: IndexName
  pipeline?: string
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

export interface TransformPivot {
  aggregations: Record<string, AggregationContainer>
  group_by: Record<string, SingleGroupSource>
  max_page_search_size: integer
}

export interface TransformProgress {
  docs_indexed: long
  docs_processed: long
  docs_remaining: long
  percent_complete: double
  total_docs: long
}

export interface TransformSource {
  index: Indices
  query: QueryContainer
}

export type TransformState = 'STARTED' | 'INDEXING' | 'ABORTING' | 'STOPPING' | 'STOPPED' | 'FAILED'

export interface TransformStats {
  checkpointing: TransformCheckpointingInfo
  id: string
  node: NodeAttributes
  reason: string
  state: string
  stats: TransformIndexerStats
}

export interface TransformSync {
}

export interface TransformSyncContainer {
  time: TransformTimeSync
}

export interface TransformTimeSync {
  delay: Time
  field: Field
}

export type TransformType = 'batch' | 'continuous'

export interface TransientMetadata {
  enabled: boolean
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

export type TranslogDurability = 'request' | 'async'

export interface TranslogStats {
  earliest_last_modified_age: long
  operations: long
  size?: string
  size_in_bytes: long
  uncommitted_operations: integer
  uncommitted_size?: string
  uncommitted_size_in_bytes: long
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

export interface TriggerContainer {
  schedule: ScheduleContainer
}

export interface TriggerEvent {
}

export interface TriggerEventContainer {
  schedule: ScheduleTriggerEvent
}

export interface TriggerEventResult {
  manual: TriggerEventContainer
  triggered_time: DateString
  type: string
}

export interface TrimProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  target_field: Field
}

export interface TrimTokenFilter extends TokenFilterBase {
}

export interface TruncateTokenFilter extends TokenFilterBase {
  length: integer
}

export interface TwoDimensionalPoint {
  lat: double
  lon: double
}

export type Type = string

export interface TypeExistsRequest extends RequestBase {
  index: Indices
  type: Types
  allow_no_indices?: boolean
  expand_wildcards?: ExpandWildcards
  ignore_unavailable?: boolean
  local?: boolean
}

export type TypeExistsResponse = boolean

export interface TypeFieldMappings {
  mappings: Record<Field, FieldMapping>
}

export interface TypeMapping {
  all_field?: AllField
  date_detection?: boolean
  dynamic?: boolean | DynamicMapping
  dynamic_date_formats?: Array<string>
  dynamic_templates?: Record<string, DynamicTemplate> | Array<Record<string, DynamicTemplate>>
  _field_names?: FieldNamesField
  index_field?: IndexField
  _meta?: Record<string, any>
  numeric_detection?: boolean
  properties: Record<PropertyName, PropertyBase>
  _routing?: RoutingField
  _size?: SizeField
  _source?: SourceField
}

export type TypeName = string

export type TypeNames = string | Array<string>

export interface TypeQuery extends QueryBase {
  value: string
}

export type Types = Type | Array<Type>

export interface UaxEmailUrlTokenizer extends TokenizerBase {
  max_token_length: integer
}

export interface UnassignedInformation {
  at: DateString
  last_allocation_status: string
  reason: UnassignedInformationReason
  details?: string
  failed_allocation_attempts?: integer
}

export type UnassignedInformationReason = 'INDEX_CREATED' | 'CLUSTER_RECOVERED' | 'INDEX_REOPENED' | 'DANGLING_INDEX_IMPORTED' | 'NEW_INDEX_RESTORED' | 'EXISTING_INDEX_RESTORED' | 'REPLICA_ADDED' | 'ALLOCATION_FAILED' | 'NODE_LEFT' | 'REROUTE_CANCELLED' | 'REINITIALIZED' | 'REALLOCATED_REPLICA' | 'PRIMARY_FAILED' | 'FORCED_EMPTY_PRIMARY' | 'MANUAL_ALLOCATION'

export interface UnfollowIndexRequest extends RequestBase {
  index: IndexName
}

export interface UnfollowIndexResponse extends AcknowledgedResponseBase {
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

export interface UniqueTokenFilter extends TokenFilterBase {
  only_on_same_position: boolean
}

export interface UpdateByQueryRequest extends RequestBase {
  index: Indices
  type?: Types
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
  source_excludes?: Fields
  source_includes?: Fields
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
    conflicts?: Conflicts
  }
}

export interface UpdateByQueryResponse extends ResponseBase {
  batches?: long
  failures?: Array<BulkIndexByScrollFailure>
  noops?: long
  deleted?: long
  requests_per_second?: float
  retries?: Retries
  task?: TaskId
  timed_out?: boolean
  took?: long
  total?: long
  updated?: long
  version_conflicts?: long
  throttled_millis?: ulong
  throttled_until_millis?: ulong
}

export interface UpdateByQueryRethrottleRequest extends RequestBase {
  task_id: Id
  requests_per_second?: long
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
    groups?: Array<string>
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

export interface UpdateRequest<TDocument = unknown, TPartialDocument = unknown> extends RequestBase {
  id: Id
  index: IndexName
  type?: Type
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
  _source_excludes?: Fields
  _source_includes?: Fields
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
  create_time_date_time: DateString
  description: string
  dest: TransformDestination
  frequency: Time
  id: Id
  pivot: TransformPivot
  source: TransformSource
  sync: TransformSyncContainer
  version: string
}

export interface UppercaseProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  target_field: Field
}

export interface UppercaseTokenFilter extends TokenFilterBase {
}

export type Uri = string

export type UrlConfig = BaseUrlConfig | KibanaUrlConfig

export interface UrlDecodeProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  target_field: Field
}

export interface UrlParameter {
}

export interface UserAgentProcessor extends ProcessorBase {
  field: Field
  ignore_missing: boolean
  options: Array<UserAgentProperty>
  regex_file: string
  target_field: Field
}

export type UserAgentProperty = 'NAME' | 'MAJOR' | 'MINOR' | 'PATCH' | 'OS' | 'OS_NAME' | 'OS_MAJOR' | 'OS_MINOR' | 'DEVICE' | 'BUILD'

export interface UserIndicesPrivileges {
  field_security?: FieldSecuritySettings
  names: Array<string>
  privileges: Array<string>
  query?: QueryUserPrivileges
  allow_restricted_indices: boolean
}

export interface UserRealm {
  name: string
  type: string
}

export type Uuid = string

export interface ValidateDetectorRequest extends RequestBase {
  body: Detector
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

export interface ValidateQueryRequest extends RequestBase {
  index?: Indices
  type?: Types
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

export interface ValueAggregate extends AggregateBase {
  value: double
  value_as_string?: string
}

export interface ValueCountAggregation extends FormattableMetricAggregation {
}

export type ValueType = 'string' | 'long' | 'double' | 'number' | 'date' | 'date_nanos' | 'ip' | 'numeric' | 'geo_point' | 'boolean'

export interface VariableWidthHistogramAggregation {
  field?: Field
  buckets?: integer
  shard_size?: integer
  initial_buffer?: integer
}

export interface VectorUsage extends XPackUsage {
  dense_vector_dims_avg_count: integer
  dense_vector_fields_count: integer
  sparse_vector_fields_count: integer
}

export interface VerifyRepositoryRequest extends RequestBase {
  repository: Name
  master_timeout?: Time
  timeout?: Time
}

export interface VerifyRepositoryResponse extends ResponseBase {
  nodes: Record<string, CompactNodeInfo>
}

export type VersionType = 'internal' | 'external' | 'external_gte' | 'force'

export type VisitorScope = 'Unknown' | 'Query' | 'Filter' | 'Must' | 'MustNot' | 'Should' | 'PositiveQuery' | 'NegativeQuery' | 'Span'

export type WaitForActiveShardOptions = 'all'

export type WaitForActiveShards = byte | WaitForActiveShardOptions

export type WaitForEvents = 'immediate' | 'urgent' | 'high' | 'normal' | 'low' | 'languid'

export type WaitForStatus = 'green' | 'yellow' | 'red'

export interface WarmerStats {
  current: long
  total: long
  total_time?: string
  total_time_in_millis: long
}

export interface Watch {
  actions: Record<IndexName, Action>
  condition: ConditionContainer
  input: InputContainer
  metadata?: Record<string, any>
  status?: WatchStatus
  throttle_period?: string
  transform?: TransformContainer
  trigger: TriggerContainer
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
  watch_id: Id
}

export interface WatchRecordQueuedStats {
  execution_time: DateString
}

export interface WatchRecordStats extends WatchRecordQueuedStats {
  execution_phase: ExecutionPhase
  execution_time: DateString
  triggered_time: DateString
  executed_actions?: Array<string>
  watch_id: Id
  watch_record_id: Id
}

export interface WatchStatus {
  actions: Record<IndexName, ActionStatus>
  last_checked?: DateString
  last_met_condition?: DateString
  state: ActivationState
  version: integer
  execution_state?: string
}

export interface WatcherNodeStats {
  current_watches: Array<WatchRecordStats>
  execution_thread_pool: ExecutionThreadPool
  queued_watches: Array<WatchRecordQueuedStats>
  watch_count: long
  watcher_state: WatcherState
  node_id: Id
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
  _nodes: NodeStatistics
}

export interface WebhookActionResult {
  request: HttpInputRequestResult
  response?: HttpInputResponseResult
}

export interface WeightScoreFunction extends ScoreFunctionBase {
}

export interface WeightedAverageAggregation extends Aggregation {
  format?: string
  value?: WeightedAverageValue
  value_type?: ValueType
  weight?: WeightedAverageValue
}

export interface WeightedAverageValue {
  field?: Field
  missing?: double
  script?: Script
}

export interface WhitespaceAnalyzer extends AnalyzerBase {
}

export interface WhitespaceTokenizer extends TokenizerBase {
  max_token_length: integer
}

export interface WildcardQuery extends QueryBase {
  rewrite?: MultiTermQueryRewrite
  value: string
}

export interface WordDelimiterGraphTokenFilter extends TokenFilterBase {
  adjust_offsets: boolean
  catenate_all: boolean
  catenate_numbers: boolean
  catenate_words: boolean
  generate_number_parts: boolean
  generate_word_parts: boolean
  preserve_original: boolean
  protected_words: Array<string>
  protected_words_path: string
  split_on_case_change: boolean
  split_on_numerics: boolean
  stem_english_possessive: boolean
  type_table: Array<string>
  type_table_path: string
}

export interface WordDelimiterTokenFilter extends TokenFilterBase {
  catenate_all: boolean
  catenate_numbers: boolean
  catenate_words: boolean
  generate_number_parts: boolean
  generate_word_parts: boolean
  preserve_original: boolean
  protected_words: Array<string>
  protected_words_path: string
  split_on_case_change: boolean
  split_on_numerics: boolean
  stem_english_possessive: boolean
  type_table: Array<string>
  type_table_path: string
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

export interface XPackBuildInformation {
  date: DateString
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

export interface XPackRole {
  cluster: Array<string>
  indices: Array<IndicesPrivileges>
  metadata: Record<string, any>
  run_as: Array<string>
  transient_metadata: TransientMetadata
}

export interface XPackRoleMapping {
  enabled: boolean
  metadata: Record<string, any>
  roles: Array<string>
  rules: RoleMappingRuleBase
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

export interface XPackUser {
  email?: string
  full_name?: string
  metadata: Record<string, any>
  roles: Array<string>
  username: string
  enabled: boolean
}

export type ZeroTermsQuery = 'all' | 'none'

export type byte = number

export type double = number

export type float = number

export type integer = number

export type long = number

export type short = number

export type uint = number

export type ulong = number

