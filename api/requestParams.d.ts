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

import { RequestBody, RequestNDBody } from '../lib/Transport'

export interface Generic {
  method?: string;
  filter_path?: string | string[];
  pretty?: boolean;
  human?: boolean;
  error_trace?: boolean;
  source?: string;
}

export interface AsyncSearchDelete extends Generic {
  id: string;
}

export interface AsyncSearchGet extends Generic {
  id: string;
  wait_for_completion_timeout?: string;
  keep_alive?: string;
  typed_keys?: boolean;
}

export interface AsyncSearchSubmit<T = RequestBody> extends Generic {
  index?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  wait_for_completion_timeout?: string;
  keep_on_completion?: boolean;
  keep_alive?: string;
  batched_reduce_size?: number;
  request_cache?: boolean;
  analyzer?: string;
  analyze_wildcard?: boolean;
  default_operator?: 'AND' | 'OR';
  df?: string;
  explain?: boolean;
  stored_fields?: string | string[];
  docvalue_fields?: string | string[];
  from?: number;
  ignore_unavailable?: boolean;
  ignore_throttled?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  lenient?: boolean;
  preference?: string;
  q?: string;
  routing?: string | string[];
  search_type?: 'query_then_fetch' | 'dfs_query_then_fetch';
  size?: number;
  sort?: string | string[];
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  terminate_after?: number;
  stats?: string | string[];
  suggest_field?: string;
  suggest_mode?: 'missing' | 'popular' | 'always';
  suggest_size?: number;
  suggest_text?: string;
  timeout?: string;
  track_scores?: boolean;
  track_total_hits?: boolean;
  allow_partial_search_results?: boolean;
  typed_keys?: boolean;
  version?: boolean;
  seq_no_primary_term?: boolean;
  max_concurrent_shard_requests?: number;
  body?: T;
}

export interface AutoscalingDeleteAutoscalingPolicy extends Generic {
  name: string;
}

export interface AutoscalingGetAutoscalingDecision extends Generic {
}

export interface AutoscalingGetAutoscalingPolicy extends Generic {
  name: string;
}

export interface AutoscalingPutAutoscalingPolicy<T = RequestBody> extends Generic {
  name: string;
  body: T;
}

export interface Bulk<T = RequestNDBody> extends Generic {
  index?: string;
  type?: string;
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  wait_for_active_shards?: string;
  refresh?: 'wait_for' | boolean;
  routing?: string;
  timeout?: string;
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  pipeline?: string;
  require_alias?: boolean;
  body: T;
}

export interface CatAliases extends Generic {
  name?: string | string[];
  format?: string;
  local?: boolean;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

export interface CatAllocation extends Generic {
  node_id?: string | string[];
  format?: string;
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

export interface CatCount extends Generic {
  index?: string | string[];
  format?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

export interface CatFielddata extends Generic {
  fields?: string | string[];
  format?: string;
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

export interface CatHealth extends Generic {
  format?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  ts?: boolean;
  v?: boolean;
}

export interface CatHelp extends Generic {
  help?: boolean;
  s?: string | string[];
}

export interface CatIndices extends Generic {
  index?: string | string[];
  format?: string;
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  health?: 'green' | 'yellow' | 'red';
  help?: boolean;
  pri?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
  include_unloaded_segments?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

export interface CatMaster extends Generic {
  format?: string;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

export interface CatMlDataFrameAnalytics extends Generic {
  id?: string;
  allow_no_match?: boolean;
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  format?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
}

export interface CatMlDatafeeds extends Generic {
  datafeed_id?: string;
  allow_no_match?: boolean;
  allow_no_datafeeds?: boolean;
  format?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
}

export interface CatMlJobs extends Generic {
  job_id?: string;
  allow_no_match?: boolean;
  allow_no_jobs?: boolean;
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  format?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
}

export interface CatMlTrainedModels extends Generic {
  model_id?: string;
  allow_no_match?: boolean;
  from?: number;
  size?: number;
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  format?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
}

export interface CatNodeattrs extends Generic {
  format?: string;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

export interface CatNodes extends Generic {
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  format?: string;
  full_id?: boolean;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
}

export interface CatPendingTasks extends Generic {
  format?: string;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
}

export interface CatPlugins extends Generic {
  format?: string;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

export interface CatRecovery extends Generic {
  index?: string | string[];
  format?: string;
  active_only?: boolean;
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  detailed?: boolean;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
}

export interface CatRepositories extends Generic {
  format?: string;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

export interface CatSegments extends Generic {
  index?: string | string[];
  format?: string;
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

export interface CatShards extends Generic {
  index?: string | string[];
  format?: string;
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
}

export interface CatSnapshots extends Generic {
  repository?: string | string[];
  format?: string;
  ignore_unavailable?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
}

export interface CatTasks extends Generic {
  format?: string;
  node_id?: string | string[];
  actions?: string | string[];
  detailed?: boolean;
  parent_task?: number;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
}

export interface CatTemplates extends Generic {
  name?: string;
  format?: string;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

export interface CatThreadPool extends Generic {
  thread_pool_patterns?: string | string[];
  format?: string;
  size?: '' | 'k' | 'm' | 'g' | 't' | 'p';
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

export interface CatTransforms extends Generic {
  transform_id?: string;
  from?: number;
  size?: number;
  allow_no_match?: boolean;
  format?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
}

export interface CcrDeleteAutoFollowPattern extends Generic {
  name: string;
}

export interface CcrFollow<T = RequestBody> extends Generic {
  index: string;
  wait_for_active_shards?: string;
  body: T;
}

export interface CcrFollowInfo extends Generic {
  index: string | string[];
}

export interface CcrFollowStats extends Generic {
  index: string | string[];
}

export interface CcrForgetFollower<T = RequestBody> extends Generic {
  index: string;
  body: T;
}

export interface CcrGetAutoFollowPattern extends Generic {
  name?: string;
}

export interface CcrPauseAutoFollowPattern extends Generic {
  name: string;
}

export interface CcrPauseFollow extends Generic {
  index: string;
}

export interface CcrPutAutoFollowPattern<T = RequestBody> extends Generic {
  name: string;
  body: T;
}

export interface CcrResumeAutoFollowPattern extends Generic {
  name: string;
}

export interface CcrResumeFollow<T = RequestBody> extends Generic {
  index: string;
  body?: T;
}

export interface CcrStats extends Generic {
}

export interface CcrUnfollow extends Generic {
  index: string;
}

export interface ClearScroll<T = RequestBody> extends Generic {
  scroll_id?: string | string[];
  body?: T;
}

export interface ClosePointInTime<T = RequestBody> extends Generic {
  body?: T;
}

export interface ClusterAllocationExplain<T = RequestBody> extends Generic {
  include_yes_decisions?: boolean;
  include_disk_info?: boolean;
  body?: T;
}

export interface ClusterDeleteComponentTemplate extends Generic {
  name: string;
  timeout?: string;
  master_timeout?: string;
}

export interface ClusterDeleteVotingConfigExclusions extends Generic {
  wait_for_removal?: boolean;
}

export interface ClusterExistsComponentTemplate extends Generic {
  name: string;
  master_timeout?: string;
  local?: boolean;
}

export interface ClusterGetComponentTemplate extends Generic {
  name?: string | string[];
  master_timeout?: string;
  local?: boolean;
}

export interface ClusterGetSettings extends Generic {
  flat_settings?: boolean;
  master_timeout?: string;
  timeout?: string;
  include_defaults?: boolean;
}

export interface ClusterHealth extends Generic {
  index?: string | string[];
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  level?: 'cluster' | 'indices' | 'shards';
  local?: boolean;
  master_timeout?: string;
  timeout?: string;
  wait_for_active_shards?: string;
  wait_for_nodes?: string;
  wait_for_events?: 'immediate' | 'urgent' | 'high' | 'normal' | 'low' | 'languid';
  wait_for_no_relocating_shards?: boolean;
  wait_for_no_initializing_shards?: boolean;
  wait_for_status?: 'green' | 'yellow' | 'red';
}

export interface ClusterPendingTasks extends Generic {
  local?: boolean;
  master_timeout?: string;
}

export interface ClusterPostVotingConfigExclusions extends Generic {
  node_ids?: string;
  node_names?: string;
  timeout?: string;
}

export interface ClusterPutComponentTemplate<T = RequestBody> extends Generic {
  name: string;
  create?: boolean;
  timeout?: string;
  master_timeout?: string;
  body: T;
}

export interface ClusterPutSettings<T = RequestBody> extends Generic {
  flat_settings?: boolean;
  master_timeout?: string;
  timeout?: string;
  body: T;
}

export interface ClusterRemoteInfo extends Generic {
}

export interface ClusterReroute<T = RequestBody> extends Generic {
  dry_run?: boolean;
  explain?: boolean;
  retry_failed?: boolean;
  metric?: string | string[];
  master_timeout?: string;
  timeout?: string;
  body?: T;
}

export interface ClusterState extends Generic {
  metric?: string | string[];
  index?: string | string[];
  local?: boolean;
  master_timeout?: string;
  flat_settings?: boolean;
  wait_for_metadata_version?: number;
  wait_for_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

export interface ClusterStats extends Generic {
  node_id?: string | string[];
  flat_settings?: boolean;
  timeout?: string;
}

export interface Count<T = RequestBody> extends Generic {
  index?: string | string[];
  type?: string | string[];
  ignore_unavailable?: boolean;
  ignore_throttled?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  min_score?: number;
  preference?: string;
  routing?: string | string[];
  q?: string;
  analyzer?: string;
  analyze_wildcard?: boolean;
  default_operator?: 'AND' | 'OR';
  df?: string;
  lenient?: boolean;
  terminate_after?: number;
  body?: T;
}

export interface Create<T = RequestBody> extends Generic {
  id: string;
  index: string;
  type?: string;
  wait_for_active_shards?: string;
  refresh?: 'wait_for' | boolean;
  routing?: string;
  timeout?: string;
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte';
  pipeline?: string;
  body: T;
}

export interface DanglingIndicesDeleteDanglingIndex extends Generic {
  index_uuid: string;
  accept_data_loss?: boolean;
  timeout?: string;
  master_timeout?: string;
}

export interface DanglingIndicesImportDanglingIndex extends Generic {
  index_uuid: string;
  accept_data_loss?: boolean;
  timeout?: string;
  master_timeout?: string;
}

export interface DanglingIndicesListDanglingIndices extends Generic {
}

export interface Delete extends Generic {
  id: string;
  index: string;
  type?: string;
  wait_for_active_shards?: string;
  refresh?: 'wait_for' | boolean;
  routing?: string;
  timeout?: string;
  if_seq_no?: number;
  if_primary_term?: number;
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
}

export interface DeleteByQuery<T = RequestBody> extends Generic {
  index: string | string[];
  type?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  analyzer?: string;
  analyze_wildcard?: boolean;
  default_operator?: 'AND' | 'OR';
  df?: string;
  from?: number;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  conflicts?: 'abort' | 'proceed';
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  lenient?: boolean;
  preference?: string;
  q?: string;
  routing?: string | string[];
  scroll?: string;
  search_type?: 'query_then_fetch' | 'dfs_query_then_fetch';
  search_timeout?: string;
  size?: number;
  max_docs?: number;
  sort?: string | string[];
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  terminate_after?: number;
  stats?: string | string[];
  version?: boolean;
  request_cache?: boolean;
  refresh?: boolean;
  timeout?: string;
  wait_for_active_shards?: string;
  scroll_size?: number;
  wait_for_completion?: boolean;
  requests_per_second?: number;
  slices?: number|string;
  body: T;
}

export interface DeleteByQueryRethrottle extends Generic {
  task_id: string;
  requests_per_second: number;
}

export interface DeleteScript extends Generic {
  id: string;
  timeout?: string;
  master_timeout?: string;
}

export interface EnrichDeletePolicy extends Generic {
  name: string;
}

export interface EnrichExecutePolicy extends Generic {
  name: string;
  wait_for_completion?: boolean;
}

export interface EnrichGetPolicy extends Generic {
  name?: string | string[];
}

export interface EnrichPutPolicy<T = RequestBody> extends Generic {
  name: string;
  body: T;
}

export interface EnrichStats extends Generic {
}

export interface EqlDelete extends Generic {
  id: string;
}

export interface EqlGet extends Generic {
  id: string;
  wait_for_completion_timeout?: string;
  keep_alive?: string;
}

export interface EqlSearch<T = RequestBody> extends Generic {
  index: string;
  wait_for_completion_timeout?: string;
  keep_on_completion?: boolean;
  keep_alive?: string;
  body: T;
}

export interface Exists extends Generic {
  id: string;
  index: string;
  type?: string;
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  stored_fields?: string | string[];
  preference?: string;
  realtime?: boolean;
  refresh?: boolean;
  routing?: string;
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
}

export interface ExistsSource extends Generic {
  id: string;
  index: string;
  type?: string;
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  preference?: string;
  realtime?: boolean;
  refresh?: boolean;
  routing?: string;
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
}

export interface Explain<T = RequestBody> extends Generic {
  id: string;
  index: string;
  type?: string;
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  analyze_wildcard?: boolean;
  analyzer?: string;
  default_operator?: 'AND' | 'OR';
  df?: string;
  stored_fields?: string | string[];
  lenient?: boolean;
  preference?: string;
  q?: string;
  routing?: string;
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  body?: T;
}

export interface FieldCaps<T = RequestBody> extends Generic {
  index?: string | string[];
  fields?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  include_unmapped?: boolean;
  body?: T;
}

export interface Get extends Generic {
  id: string;
  index: string;
  type?: string;
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  stored_fields?: string | string[];
  preference?: string;
  realtime?: boolean;
  refresh?: boolean;
  routing?: string;
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
}

export interface GetScript extends Generic {
  id: string;
  master_timeout?: string;
}

export interface GetScriptContext extends Generic {
}

export interface GetScriptLanguages extends Generic {
}

export interface GetSource extends Generic {
  id: string;
  index: string;
  type?: string;
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  preference?: string;
  realtime?: boolean;
  refresh?: boolean;
  routing?: string;
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
}

export interface GraphExplore<T = RequestBody> extends Generic {
  index: string | string[];
  type?: string | string[];
  routing?: string;
  timeout?: string;
  body?: T;
}

export interface IlmDeleteLifecycle extends Generic {
  policy: string;
}

export interface IlmExplainLifecycle extends Generic {
  index: string;
  only_managed?: boolean;
  only_errors?: boolean;
}

export interface IlmGetLifecycle extends Generic {
  policy?: string;
}

export interface IlmGetStatus extends Generic {
}

export interface IlmMoveToStep<T = RequestBody> extends Generic {
  index: string;
  body?: T;
}

export interface IlmPutLifecycle<T = RequestBody> extends Generic {
  policy: string;
  body?: T;
}

export interface IlmRemovePolicy extends Generic {
  index: string;
}

export interface IlmRetry extends Generic {
  index: string;
}

export interface IlmStart extends Generic {
}

export interface IlmStop extends Generic {
}

export interface Index<T = RequestBody> extends Generic {
  id?: string;
  index: string;
  type?: string;
  wait_for_active_shards?: string;
  op_type?: 'index' | 'create';
  refresh?: 'wait_for' | boolean;
  routing?: string;
  timeout?: string;
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte';
  if_seq_no?: number;
  if_primary_term?: number;
  pipeline?: string;
  require_alias?: boolean;
  body: T;
}

export interface IndicesAddBlock extends Generic {
  index: string | string[];
  block: string;
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

export interface IndicesAnalyze<T = RequestBody> extends Generic {
  index?: string;
  body?: T;
}

export interface IndicesClearCache extends Generic {
  index?: string | string[];
  fielddata?: boolean;
  fields?: string | string[];
  query?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  request?: boolean;
}

export interface IndicesClone<T = RequestBody> extends Generic {
  index: string;
  target: string;
  timeout?: string;
  master_timeout?: string;
  wait_for_active_shards?: string;
  body?: T;
}

export interface IndicesClose extends Generic {
  index: string | string[];
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  wait_for_active_shards?: string;
}

export interface IndicesCreate<T = RequestBody> extends Generic {
  index: string;
  include_type_name?: boolean;
  wait_for_active_shards?: string;
  timeout?: string;
  master_timeout?: string;
  body?: T;
}

export interface IndicesCreateDataStream extends Generic {
  name: string;
}

export interface IndicesDataStreamsStats extends Generic {
  name?: string | string[];
}

export interface IndicesDelete extends Generic {
  index: string | string[];
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

export interface IndicesDeleteAlias extends Generic {
  index: string | string[];
  name: string | string[];
  timeout?: string;
  master_timeout?: string;
}

export interface IndicesDeleteDataStream extends Generic {
  name: string | string[];
}

export interface IndicesDeleteIndexTemplate extends Generic {
  name: string;
  timeout?: string;
  master_timeout?: string;
}

export interface IndicesDeleteTemplate extends Generic {
  name: string;
  timeout?: string;
  master_timeout?: string;
}

export interface IndicesExists extends Generic {
  index: string | string[];
  local?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  flat_settings?: boolean;
  include_defaults?: boolean;
}

export interface IndicesExistsAlias extends Generic {
  name: string | string[];
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  local?: boolean;
}

export interface IndicesExistsIndexTemplate extends Generic {
  name: string;
  flat_settings?: boolean;
  master_timeout?: string;
  local?: boolean;
}

export interface IndicesExistsTemplate extends Generic {
  name: string | string[];
  flat_settings?: boolean;
  master_timeout?: string;
  local?: boolean;
}

export interface IndicesExistsType extends Generic {
  index: string | string[];
  type: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  local?: boolean;
}

export interface IndicesFlush extends Generic {
  index?: string | string[];
  force?: boolean;
  wait_if_ongoing?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

export interface IndicesFlushSynced extends Generic {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
}

export interface IndicesForcemerge extends Generic {
  index?: string | string[];
  flush?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  max_num_segments?: number;
  only_expunge_deletes?: boolean;
}

export interface IndicesFreeze extends Generic {
  index: string;
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  wait_for_active_shards?: string;
}

export interface IndicesGet extends Generic {
  index: string | string[];
  include_type_name?: boolean;
  local?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  flat_settings?: boolean;
  include_defaults?: boolean;
  master_timeout?: string;
}

export interface IndicesGetAlias extends Generic {
  name?: string | string[];
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  local?: boolean;
}

export interface IndicesGetDataStream extends Generic {
  name?: string | string[];
}

export interface IndicesGetFieldMapping extends Generic {
  fields: string | string[];
  index?: string | string[];
  type?: string | string[];
  include_type_name?: boolean;
  include_defaults?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  local?: boolean;
}

export interface IndicesGetIndexTemplate extends Generic {
  name?: string | string[];
  flat_settings?: boolean;
  master_timeout?: string;
  local?: boolean;
}

export interface IndicesGetMapping extends Generic {
  index?: string | string[];
  type?: string | string[];
  include_type_name?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  master_timeout?: string;
  local?: boolean;
}

export interface IndicesGetSettings extends Generic {
  index?: string | string[];
  name?: string | string[];
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  flat_settings?: boolean;
  local?: boolean;
  include_defaults?: boolean;
}

export interface IndicesGetTemplate extends Generic {
  name?: string | string[];
  include_type_name?: boolean;
  flat_settings?: boolean;
  master_timeout?: string;
  local?: boolean;
}

export interface IndicesGetUpgrade extends Generic {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

export interface IndicesOpen extends Generic {
  index: string | string[];
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  wait_for_active_shards?: string;
}

export interface IndicesPutAlias<T = RequestBody> extends Generic {
  index: string | string[];
  name: string;
  timeout?: string;
  master_timeout?: string;
  body?: T;
}

export interface IndicesPutIndexTemplate<T = RequestBody> extends Generic {
  name: string;
  create?: boolean;
  cause?: string;
  master_timeout?: string;
  body: T;
}

export interface IndicesPutMapping<T = RequestBody> extends Generic {
  index?: string | string[];
  type?: string;
  include_type_name?: boolean;
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  write_index_only?: boolean;
  body: T;
}

export interface IndicesPutSettings<T = RequestBody> extends Generic {
  index?: string | string[];
  master_timeout?: string;
  timeout?: string;
  preserve_existing?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  flat_settings?: boolean;
  body: T;
}

export interface IndicesPutTemplate<T = RequestBody> extends Generic {
  name: string;
  include_type_name?: boolean;
  order?: number;
  create?: boolean;
  master_timeout?: string;
  body: T;
}

export interface IndicesRecovery extends Generic {
  index?: string | string[];
  detailed?: boolean;
  active_only?: boolean;
}

export interface IndicesRefresh extends Generic {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

export interface IndicesReloadSearchAnalyzers extends Generic {
  index: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

export interface IndicesResolveIndex extends Generic {
  name: string | string[];
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

export interface IndicesRollover<T = RequestBody> extends Generic {
  alias: string;
  new_index?: string;
  include_type_name?: boolean;
  timeout?: string;
  dry_run?: boolean;
  master_timeout?: string;
  wait_for_active_shards?: string;
  body?: T;
}

export interface IndicesSegments extends Generic {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  verbose?: boolean;
}

export interface IndicesShardStores extends Generic {
  index?: string | string[];
  status?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

export interface IndicesShrink<T = RequestBody> extends Generic {
  index: string;
  target: string;
  copy_settings?: boolean;
  timeout?: string;
  master_timeout?: string;
  wait_for_active_shards?: string;
  body?: T;
}

export interface IndicesSimulateIndexTemplate<T = RequestBody> extends Generic {
  name: string;
  create?: boolean;
  cause?: string;
  master_timeout?: string;
  body?: T;
}

export interface IndicesSimulateTemplate<T = RequestBody> extends Generic {
  name?: string;
  create?: boolean;
  cause?: string;
  master_timeout?: string;
  body?: T;
}

export interface IndicesSplit<T = RequestBody> extends Generic {
  index: string;
  target: string;
  copy_settings?: boolean;
  timeout?: string;
  master_timeout?: string;
  wait_for_active_shards?: string;
  body?: T;
}

export interface IndicesStats extends Generic {
  metric?: string | string[];
  index?: string | string[];
  completion_fields?: string | string[];
  fielddata_fields?: string | string[];
  fields?: string | string[];
  groups?: string | string[];
  level?: 'cluster' | 'indices' | 'shards';
  types?: string | string[];
  include_segment_file_sizes?: boolean;
  include_unloaded_segments?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  forbid_closed_indices?: boolean;
}

export interface IndicesUnfreeze extends Generic {
  index: string;
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  wait_for_active_shards?: string;
}

export interface IndicesUpdateAliases<T = RequestBody> extends Generic {
  timeout?: string;
  master_timeout?: string;
  body: T;
}

export interface IndicesUpgrade extends Generic {
  index?: string | string[];
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  ignore_unavailable?: boolean;
  wait_for_completion?: boolean;
  only_ancient_segments?: boolean;
}

export interface IndicesValidateQuery<T = RequestBody> extends Generic {
  index?: string | string[];
  type?: string | string[];
  explain?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  q?: string;
  analyzer?: string;
  analyze_wildcard?: boolean;
  default_operator?: 'AND' | 'OR';
  df?: string;
  lenient?: boolean;
  rewrite?: boolean;
  all_shards?: boolean;
  body?: T;
}

export interface Info extends Generic {
}

export interface IngestDeletePipeline extends Generic {
  id: string;
  master_timeout?: string;
  timeout?: string;
}

export interface IngestGetPipeline extends Generic {
  id?: string;
  master_timeout?: string;
}

export interface IngestProcessorGrok extends Generic {
}

export interface IngestPutPipeline<T = RequestBody> extends Generic {
  id: string;
  master_timeout?: string;
  timeout?: string;
  body: T;
}

export interface IngestSimulate<T = RequestBody> extends Generic {
  id?: string;
  verbose?: boolean;
  body: T;
}

export interface LicenseDelete extends Generic {
}

export interface LicenseGet extends Generic {
  local?: boolean;
  accept_enterprise?: boolean;
}

export interface LicenseGetBasicStatus extends Generic {
}

export interface LicenseGetTrialStatus extends Generic {
}

export interface LicensePost<T = RequestBody> extends Generic {
  acknowledge?: boolean;
  body?: T;
}

export interface LicensePostStartBasic extends Generic {
  acknowledge?: boolean;
}

export interface LicensePostStartTrial extends Generic {
  type?: string;
  acknowledge?: boolean;
}

export interface Mget<T = RequestBody> extends Generic {
  index?: string;
  type?: string;
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  stored_fields?: string | string[];
  preference?: string;
  realtime?: boolean;
  refresh?: boolean;
  routing?: string;
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  body: T;
}

export interface MigrationDeprecations extends Generic {
  index?: string;
}

export interface MlCloseJob<T = RequestBody> extends Generic {
  job_id: string;
  allow_no_match?: boolean;
  allow_no_jobs?: boolean;
  force?: boolean;
  timeout?: string;
  body?: T;
}

export interface MlDeleteCalendar extends Generic {
  calendar_id: string;
}

export interface MlDeleteCalendarEvent extends Generic {
  calendar_id: string;
  event_id: string;
}

export interface MlDeleteCalendarJob extends Generic {
  calendar_id: string;
  job_id: string;
}

export interface MlDeleteDataFrameAnalytics extends Generic {
  id: string;
  force?: boolean;
  timeout?: string;
}

export interface MlDeleteDatafeed extends Generic {
  datafeed_id: string;
  force?: boolean;
}

export interface MlDeleteExpiredData<T = RequestBody> extends Generic {
  job_id?: string;
  requests_per_second?: number;
  timeout?: string;
  body?: T;
}

export interface MlDeleteFilter extends Generic {
  filter_id: string;
}

export interface MlDeleteForecast extends Generic {
  job_id: string;
  forecast_id?: string;
  allow_no_forecasts?: boolean;
  timeout?: string;
}

export interface MlDeleteJob extends Generic {
  job_id: string;
  force?: boolean;
  wait_for_completion?: boolean;
}

export interface MlDeleteModelSnapshot extends Generic {
  job_id: string;
  snapshot_id: string;
}

export interface MlDeleteTrainedModel extends Generic {
  model_id: string;
}

export interface MlEstimateModelMemory<T = RequestBody> extends Generic {
  body: T;
}

export interface MlEvaluateDataFrame<T = RequestBody> extends Generic {
  body: T;
}

export interface MlExplainDataFrameAnalytics<T = RequestBody> extends Generic {
  id?: string;
  body?: T;
}

export interface MlFindFileStructure<T = RequestNDBody> extends Generic {
  lines_to_sample?: number;
  line_merge_size_limit?: number;
  timeout?: string;
  charset?: string;
  format?: 'ndjson' | 'xml' | 'delimited' | 'semi_structured_text';
  has_header_row?: boolean;
  column_names?: string | string[];
  delimiter?: string;
  quote?: string;
  should_trim_fields?: boolean;
  grok_pattern?: string;
  timestamp_field?: string;
  timestamp_format?: string;
  explain?: boolean;
  body: T;
}

export interface MlFlushJob<T = RequestBody> extends Generic {
  job_id: string;
  calc_interim?: boolean;
  start?: string;
  end?: string;
  advance_time?: string;
  skip_time?: string;
  body?: T;
}

export interface MlForecast extends Generic {
  job_id: string;
  duration?: string;
  expires_in?: string;
  max_model_memory?: string;
}

export interface MlGetBuckets<T = RequestBody> extends Generic {
  job_id: string;
  timestamp?: string;
  expand?: boolean;
  exclude_interim?: boolean;
  from?: number;
  size?: number;
  start?: string;
  end?: string;
  anomaly_score?: number;
  sort?: string;
  desc?: boolean;
  body?: T;
}

export interface MlGetCalendarEvents extends Generic {
  calendar_id: string;
  job_id?: string;
  start?: string;
  end?: string;
  from?: number;
  size?: number;
}

export interface MlGetCalendars<T = RequestBody> extends Generic {
  calendar_id?: string;
  from?: number;
  size?: number;
  body?: T;
}

export interface MlGetCategories<T = RequestBody> extends Generic {
  job_id: string;
  category_id?: number;
  from?: number;
  size?: number;
  partition_field_value?: string;
  body?: T;
}

export interface MlGetDataFrameAnalytics extends Generic {
  id?: string;
  allow_no_match?: boolean;
  from?: number;
  size?: number;
}

export interface MlGetDataFrameAnalyticsStats extends Generic {
  id?: string;
  allow_no_match?: boolean;
  from?: number;
  size?: number;
  verbose?: boolean;
}

export interface MlGetDatafeedStats extends Generic {
  datafeed_id?: string;
  allow_no_match?: boolean;
  allow_no_datafeeds?: boolean;
}

export interface MlGetDatafeeds extends Generic {
  datafeed_id?: string;
  allow_no_match?: boolean;
  allow_no_datafeeds?: boolean;
}

export interface MlGetFilters extends Generic {
  filter_id?: string;
  from?: number;
  size?: number;
}

export interface MlGetInfluencers<T = RequestBody> extends Generic {
  job_id: string;
  exclude_interim?: boolean;
  from?: number;
  size?: number;
  start?: string;
  end?: string;
  influencer_score?: number;
  sort?: string;
  desc?: boolean;
  body?: T;
}

export interface MlGetJobStats extends Generic {
  job_id?: string;
  allow_no_match?: boolean;
  allow_no_jobs?: boolean;
}

export interface MlGetJobs extends Generic {
  job_id?: string;
  allow_no_match?: boolean;
  allow_no_jobs?: boolean;
}

export interface MlGetModelSnapshots<T = RequestBody> extends Generic {
  job_id: string;
  snapshot_id?: string;
  from?: number;
  size?: number;
  start?: string;
  end?: string;
  sort?: string;
  desc?: boolean;
  body?: T;
}

export interface MlGetOverallBuckets<T = RequestBody> extends Generic {
  job_id: string;
  top_n?: number;
  bucket_span?: string;
  overall_score?: number;
  exclude_interim?: boolean;
  start?: string;
  end?: string;
  allow_no_match?: boolean;
  allow_no_jobs?: boolean;
  body?: T;
}

export interface MlGetRecords<T = RequestBody> extends Generic {
  job_id: string;
  exclude_interim?: boolean;
  from?: number;
  size?: number;
  start?: string;
  end?: string;
  record_score?: number;
  sort?: string;
  desc?: boolean;
  body?: T;
}

export interface MlGetTrainedModels extends Generic {
  model_id?: string;
  allow_no_match?: boolean;
  include?: string;
  include_model_definition?: boolean;
  decompress_definition?: boolean;
  from?: number;
  size?: number;
  tags?: string | string[];
  for_export?: boolean;
}

export interface MlGetTrainedModelsStats extends Generic {
  model_id?: string;
  allow_no_match?: boolean;
  from?: number;
  size?: number;
}

export interface MlInfo extends Generic {
}

export interface MlOpenJob extends Generic {
  job_id: string;
}

export interface MlPostCalendarEvents<T = RequestBody> extends Generic {
  calendar_id: string;
  body: T;
}

export interface MlPostData<T = RequestBody> extends Generic {
  job_id: string;
  reset_start?: string;
  reset_end?: string;
  body: T;
}

export interface MlPreviewDatafeed extends Generic {
  datafeed_id: string;
}

export interface MlPutCalendar<T = RequestBody> extends Generic {
  calendar_id: string;
  body?: T;
}

export interface MlPutCalendarJob extends Generic {
  calendar_id: string;
  job_id: string;
}

export interface MlPutDataFrameAnalytics<T = RequestBody> extends Generic {
  id: string;
  body: T;
}

export interface MlPutDatafeed<T = RequestBody> extends Generic {
  datafeed_id: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  ignore_throttled?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  body: T;
}

export interface MlPutFilter<T = RequestBody> extends Generic {
  filter_id: string;
  body: T;
}

export interface MlPutJob<T = RequestBody> extends Generic {
  job_id: string;
  body: T;
}

export interface MlPutTrainedModel<T = RequestBody> extends Generic {
  model_id: string;
  body: T;
}

export interface MlRevertModelSnapshot<T = RequestBody> extends Generic {
  job_id: string;
  snapshot_id: string;
  delete_intervening_results?: boolean;
  body?: T;
}

export interface MlSetUpgradeMode extends Generic {
  enabled?: boolean;
  timeout?: string;
}

export interface MlStartDataFrameAnalytics<T = RequestBody> extends Generic {
  id: string;
  timeout?: string;
  body?: T;
}

export interface MlStartDatafeed<T = RequestBody> extends Generic {
  datafeed_id: string;
  start?: string;
  end?: string;
  timeout?: string;
  body?: T;
}

export interface MlStopDataFrameAnalytics<T = RequestBody> extends Generic {
  id: string;
  allow_no_match?: boolean;
  force?: boolean;
  timeout?: string;
  body?: T;
}

export interface MlStopDatafeed<T = RequestBody> extends Generic {
  datafeed_id: string;
  allow_no_match?: boolean;
  allow_no_datafeeds?: boolean;
  force?: boolean;
  timeout?: string;
  body?: T;
}

export interface MlUpdateDataFrameAnalytics<T = RequestBody> extends Generic {
  id: string;
  body: T;
}

export interface MlUpdateDatafeed<T = RequestBody> extends Generic {
  datafeed_id: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  ignore_throttled?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  body: T;
}

export interface MlUpdateFilter<T = RequestBody> extends Generic {
  filter_id: string;
  body: T;
}

export interface MlUpdateJob<T = RequestBody> extends Generic {
  job_id: string;
  body: T;
}

export interface MlUpdateModelSnapshot<T = RequestBody> extends Generic {
  job_id: string;
  snapshot_id: string;
  body: T;
}

export interface MlValidate<T = RequestBody> extends Generic {
  body: T;
}

export interface MlValidateDetector<T = RequestBody> extends Generic {
  body: T;
}

export interface MonitoringBulk<T = RequestNDBody> extends Generic {
  type?: string;
  system_id?: string;
  system_api_version?: string;
  interval?: string;
  body: T;
}

export interface Msearch<T = RequestNDBody> extends Generic {
  index?: string | string[];
  type?: string | string[];
  search_type?: 'query_then_fetch' | 'query_and_fetch' | 'dfs_query_then_fetch' | 'dfs_query_and_fetch';
  max_concurrent_searches?: number;
  typed_keys?: boolean;
  pre_filter_shard_size?: number;
  max_concurrent_shard_requests?: number;
  rest_total_hits_as_int?: boolean;
  ccs_minimize_roundtrips?: boolean;
  body: T;
}

export interface MsearchTemplate<T = RequestNDBody> extends Generic {
  index?: string | string[];
  type?: string | string[];
  search_type?: 'query_then_fetch' | 'query_and_fetch' | 'dfs_query_then_fetch' | 'dfs_query_and_fetch';
  typed_keys?: boolean;
  max_concurrent_searches?: number;
  rest_total_hits_as_int?: boolean;
  ccs_minimize_roundtrips?: boolean;
  body: T;
}

export interface Mtermvectors<T = RequestBody> extends Generic {
  index?: string;
  type?: string;
  ids?: string | string[];
  term_statistics?: boolean;
  field_statistics?: boolean;
  fields?: string | string[];
  offsets?: boolean;
  positions?: boolean;
  payloads?: boolean;
  preference?: string;
  routing?: string;
  realtime?: boolean;
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
  body?: T;
}

export interface NodesHotThreads extends Generic {
  node_id?: string | string[];
  interval?: string;
  snapshots?: number;
  threads?: number;
  ignore_idle_threads?: boolean;
  type?: 'cpu' | 'wait' | 'block';
  timeout?: string;
}

export interface NodesInfo extends Generic {
  node_id?: string | string[];
  metric?: string | string[];
  flat_settings?: boolean;
  timeout?: string;
}

export interface NodesReloadSecureSettings<T = RequestBody> extends Generic {
  node_id?: string | string[];
  timeout?: string;
  body?: T;
}

export interface NodesStats extends Generic {
  node_id?: string | string[];
  metric?: string | string[];
  index_metric?: string | string[];
  completion_fields?: string | string[];
  fielddata_fields?: string | string[];
  fields?: string | string[];
  groups?: boolean;
  level?: 'indices' | 'node' | 'shards';
  types?: string | string[];
  timeout?: string;
  include_segment_file_sizes?: boolean;
}

export interface NodesUsage extends Generic {
  node_id?: string | string[];
  metric?: string | string[];
  timeout?: string;
}

export interface OpenPointInTime extends Generic {
  index?: string | string[];
  preference?: string;
  routing?: string;
  ignore_unavailable?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  keep_alive?: string;
}

export interface Ping extends Generic {
}

export interface PutScript<T = RequestBody> extends Generic {
  id: string;
  context?: string;
  timeout?: string;
  master_timeout?: string;
  body: T;
}

export interface RankEval<T = RequestBody> extends Generic {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  search_type?: 'query_then_fetch' | 'dfs_query_then_fetch';
  body: T;
}

export interface Reindex<T = RequestBody> extends Generic {
  refresh?: boolean;
  timeout?: string;
  wait_for_active_shards?: string;
  wait_for_completion?: boolean;
  requests_per_second?: number;
  scroll?: string;
  slices?: number|string;
  max_docs?: number;
  body: T;
}

export interface ReindexRethrottle extends Generic {
  task_id: string;
  requests_per_second: number;
}

export interface RenderSearchTemplate<T = RequestBody> extends Generic {
  id?: string;
  body?: T;
}

export interface RollupDeleteJob extends Generic {
  id: string;
}

export interface RollupGetJobs extends Generic {
  id?: string;
}

export interface RollupGetRollupCaps extends Generic {
  id?: string;
}

export interface RollupGetRollupIndexCaps extends Generic {
  index: string;
}

export interface RollupPutJob<T = RequestBody> extends Generic {
  id: string;
  body: T;
}

export interface RollupRollupSearch<T = RequestBody> extends Generic {
  index: string | string[];
  type?: string;
  typed_keys?: boolean;
  rest_total_hits_as_int?: boolean;
  body: T;
}

export interface RollupStartJob extends Generic {
  id: string;
}

export interface RollupStopJob extends Generic {
  id: string;
  wait_for_completion?: boolean;
  timeout?: string;
}

export interface ScriptsPainlessExecute<T = RequestBody> extends Generic {
  body?: T;
}

export interface Scroll<T = RequestBody> extends Generic {
  scroll_id?: string;
  scroll?: string;
  rest_total_hits_as_int?: boolean;
  body?: T;
}

export interface Search<T = RequestBody> extends Generic {
  index?: string | string[];
  type?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  analyzer?: string;
  analyze_wildcard?: boolean;
  ccs_minimize_roundtrips?: boolean;
  default_operator?: 'AND' | 'OR';
  df?: string;
  explain?: boolean;
  stored_fields?: string | string[];
  docvalue_fields?: string | string[];
  from?: number;
  ignore_unavailable?: boolean;
  ignore_throttled?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  lenient?: boolean;
  preference?: string;
  q?: string;
  routing?: string | string[];
  scroll?: string;
  search_type?: 'query_then_fetch' | 'dfs_query_then_fetch';
  size?: number;
  sort?: string | string[];
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  terminate_after?: number;
  stats?: string | string[];
  suggest_field?: string;
  suggest_mode?: 'missing' | 'popular' | 'always';
  suggest_size?: number;
  suggest_text?: string;
  timeout?: string;
  track_scores?: boolean;
  track_total_hits?: boolean;
  allow_partial_search_results?: boolean;
  typed_keys?: boolean;
  version?: boolean;
  seq_no_primary_term?: boolean;
  request_cache?: boolean;
  batched_reduce_size?: number;
  max_concurrent_shard_requests?: number;
  pre_filter_shard_size?: number;
  rest_total_hits_as_int?: boolean;
  body?: T;
}

export interface SearchShards extends Generic {
  index?: string | string[];
  preference?: string;
  routing?: string;
  local?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

export interface SearchTemplate<T = RequestBody> extends Generic {
  index?: string | string[];
  type?: string | string[];
  ignore_unavailable?: boolean;
  ignore_throttled?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  preference?: string;
  routing?: string | string[];
  scroll?: string;
  search_type?: 'query_then_fetch' | 'query_and_fetch' | 'dfs_query_then_fetch' | 'dfs_query_and_fetch';
  explain?: boolean;
  profile?: boolean;
  typed_keys?: boolean;
  rest_total_hits_as_int?: boolean;
  ccs_minimize_roundtrips?: boolean;
  body: T;
}

export interface SearchableSnapshotsClearCache extends Generic {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
}

export interface SearchableSnapshotsMount<T = RequestBody> extends Generic {
  repository: string;
  snapshot: string;
  master_timeout?: string;
  wait_for_completion?: boolean;
  body: T;
}

export interface SearchableSnapshotsRepositoryStats extends Generic {
  repository: string;
}

export interface SearchableSnapshotsStats extends Generic {
  index?: string | string[];
}

export interface SecurityAuthenticate extends Generic {
}

export interface SecurityChangePassword<T = RequestBody> extends Generic {
  username?: string;
  refresh?: 'wait_for' | boolean;
  body: T;
}

export interface SecurityClearApiKeyCache extends Generic {
  ids: string | string[];
}

export interface SecurityClearCachedPrivileges extends Generic {
  application: string | string[];
}

export interface SecurityClearCachedRealms extends Generic {
  realms: string | string[];
  usernames?: string | string[];
}

export interface SecurityClearCachedRoles extends Generic {
  name: string | string[];
}

export interface SecurityCreateApiKey<T = RequestBody> extends Generic {
  refresh?: 'wait_for' | boolean;
  body: T;
}

export interface SecurityDeletePrivileges extends Generic {
  application: string;
  name: string;
  refresh?: 'wait_for' | boolean;
}

export interface SecurityDeleteRole extends Generic {
  name: string;
  refresh?: 'wait_for' | boolean;
}

export interface SecurityDeleteRoleMapping extends Generic {
  name: string;
  refresh?: 'wait_for' | boolean;
}

export interface SecurityDeleteUser extends Generic {
  username: string;
  refresh?: 'wait_for' | boolean;
}

export interface SecurityDisableUser extends Generic {
  username: string;
  refresh?: 'wait_for' | boolean;
}

export interface SecurityEnableUser extends Generic {
  username: string;
  refresh?: 'wait_for' | boolean;
}

export interface SecurityGetApiKey extends Generic {
  id?: string;
  name?: string;
  username?: string;
  realm_name?: string;
  owner?: boolean;
}

export interface SecurityGetBuiltinPrivileges extends Generic {
}

export interface SecurityGetPrivileges extends Generic {
  application?: string;
  name?: string;
}

export interface SecurityGetRole extends Generic {
  name?: string | string[];
}

export interface SecurityGetRoleMapping extends Generic {
  name?: string | string[];
}

export interface SecurityGetToken<T = RequestBody> extends Generic {
  body: T;
}

export interface SecurityGetUser extends Generic {
  username?: string | string[];
}

export interface SecurityGetUserPrivileges extends Generic {
}

export interface SecurityGrantApiKey<T = RequestBody> extends Generic {
  refresh?: 'wait_for' | boolean;
  body: T;
}

export interface SecurityHasPrivileges<T = RequestBody> extends Generic {
  user?: string;
  body: T;
}

export interface SecurityInvalidateApiKey<T = RequestBody> extends Generic {
  body: T;
}

export interface SecurityInvalidateToken<T = RequestBody> extends Generic {
  body: T;
}

export interface SecurityPutPrivileges<T = RequestBody> extends Generic {
  refresh?: 'wait_for' | boolean;
  body: T;
}

export interface SecurityPutRole<T = RequestBody> extends Generic {
  name: string;
  refresh?: 'wait_for' | boolean;
  body: T;
}

export interface SecurityPutRoleMapping<T = RequestBody> extends Generic {
  name: string;
  refresh?: 'wait_for' | boolean;
  body: T;
}

export interface SecurityPutUser<T = RequestBody> extends Generic {
  username: string;
  refresh?: 'wait_for' | boolean;
  body: T;
}

export interface SlmDeleteLifecycle extends Generic {
  policy_id: string;
}

export interface SlmExecuteLifecycle extends Generic {
  policy_id: string;
}

export interface SlmExecuteRetention extends Generic {
}

export interface SlmGetLifecycle extends Generic {
  policy_id?: string | string[];
}

export interface SlmGetStats extends Generic {
}

export interface SlmGetStatus extends Generic {
}

export interface SlmPutLifecycle<T = RequestBody> extends Generic {
  policy_id: string;
  body?: T;
}

export interface SlmStart extends Generic {
}

export interface SlmStop extends Generic {
}

export interface SnapshotCleanupRepository extends Generic {
  repository: string;
  master_timeout?: string;
  timeout?: string;
}

export interface SnapshotClone<T = RequestBody> extends Generic {
  repository: string;
  snapshot: string;
  target_snapshot: string;
  master_timeout?: string;
  body: T;
}

export interface SnapshotCreate<T = RequestBody> extends Generic {
  repository: string;
  snapshot: string;
  master_timeout?: string;
  wait_for_completion?: boolean;
  body?: T;
}

export interface SnapshotCreateRepository<T = RequestBody> extends Generic {
  repository: string;
  master_timeout?: string;
  timeout?: string;
  verify?: boolean;
  body: T;
}

export interface SnapshotDelete extends Generic {
  repository: string;
  snapshot: string;
  master_timeout?: string;
}

export interface SnapshotDeleteRepository extends Generic {
  repository: string | string[];
  master_timeout?: string;
  timeout?: string;
}

export interface SnapshotGet extends Generic {
  repository: string;
  snapshot: string | string[];
  master_timeout?: string;
  ignore_unavailable?: boolean;
  verbose?: boolean;
}

export interface SnapshotGetRepository extends Generic {
  repository?: string | string[];
  master_timeout?: string;
  local?: boolean;
}

export interface SnapshotRestore<T = RequestBody> extends Generic {
  repository: string;
  snapshot: string;
  master_timeout?: string;
  wait_for_completion?: boolean;
  body?: T;
}

export interface SnapshotStatus extends Generic {
  repository?: string;
  snapshot?: string | string[];
  master_timeout?: string;
  ignore_unavailable?: boolean;
}

export interface SnapshotVerifyRepository extends Generic {
  repository: string;
  master_timeout?: string;
  timeout?: string;
}

export interface SqlClearCursor<T = RequestBody> extends Generic {
  body: T;
}

export interface SqlQuery<T = RequestBody> extends Generic {
  format?: string;
  body: T;
}

export interface SqlTranslate<T = RequestBody> extends Generic {
  body: T;
}

export interface SslCertificates extends Generic {
}

export interface TasksCancel extends Generic {
  task_id?: string;
  nodes?: string | string[];
  actions?: string | string[];
  parent_task_id?: string;
  wait_for_completion?: boolean;
}

export interface TasksGet extends Generic {
  task_id: string;
  wait_for_completion?: boolean;
  timeout?: string;
}

export interface TasksList extends Generic {
  nodes?: string | string[];
  actions?: string | string[];
  detailed?: boolean;
  parent_task_id?: string;
  wait_for_completion?: boolean;
  group_by?: 'nodes' | 'parents' | 'none';
  timeout?: string;
}

export interface Termvectors<T = RequestBody> extends Generic {
  index: string;
  id?: string;
  type?: string;
  term_statistics?: boolean;
  field_statistics?: boolean;
  fields?: string | string[];
  offsets?: boolean;
  positions?: boolean;
  payloads?: boolean;
  preference?: string;
  routing?: string;
  realtime?: boolean;
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
  body?: T;
}

export interface TransformDeleteTransform extends Generic {
  transform_id: string;
  force?: boolean;
}

export interface TransformGetTransform extends Generic {
  transform_id?: string;
  from?: number;
  size?: number;
  allow_no_match?: boolean;
}

export interface TransformGetTransformStats extends Generic {
  transform_id: string;
  from?: number;
  size?: number;
  allow_no_match?: boolean;
}

export interface TransformPreviewTransform<T = RequestBody> extends Generic {
  body: T;
}

export interface TransformPutTransform<T = RequestBody> extends Generic {
  transform_id: string;
  defer_validation?: boolean;
  body: T;
}

export interface TransformStartTransform extends Generic {
  transform_id: string;
  timeout?: string;
}

export interface TransformStopTransform extends Generic {
  transform_id: string;
  force?: boolean;
  wait_for_completion?: boolean;
  timeout?: string;
  allow_no_match?: boolean;
  wait_for_checkpoint?: boolean;
}

export interface TransformUpdateTransform<T = RequestBody> extends Generic {
  transform_id: string;
  defer_validation?: boolean;
  body: T;
}

export interface Update<T = RequestBody> extends Generic {
  id: string;
  index: string;
  type?: string;
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  wait_for_active_shards?: string;
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  lang?: string;
  refresh?: 'wait_for' | boolean;
  retry_on_conflict?: number;
  routing?: string;
  timeout?: string;
  if_seq_no?: number;
  if_primary_term?: number;
  require_alias?: boolean;
  body: T;
}

export interface UpdateByQuery<T = RequestBody> extends Generic {
  index: string | string[];
  type?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  analyzer?: string;
  analyze_wildcard?: boolean;
  default_operator?: 'AND' | 'OR';
  df?: string;
  from?: number;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  conflicts?: 'abort' | 'proceed';
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  lenient?: boolean;
  pipeline?: string;
  preference?: string;
  q?: string;
  routing?: string | string[];
  scroll?: string;
  search_type?: 'query_then_fetch' | 'dfs_query_then_fetch';
  search_timeout?: string;
  size?: number;
  max_docs?: number;
  sort?: string | string[];
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  terminate_after?: number;
  stats?: string | string[];
  version?: boolean;
  version_type?: boolean;
  request_cache?: boolean;
  refresh?: boolean;
  timeout?: string;
  wait_for_active_shards?: string;
  scroll_size?: number;
  wait_for_completion?: boolean;
  requests_per_second?: number;
  slices?: number|string;
  body?: T;
}

export interface UpdateByQueryRethrottle extends Generic {
  task_id: string;
  requests_per_second: number;
}

export interface WatcherAckWatch extends Generic {
  watch_id: string;
  action_id?: string | string[];
}

export interface WatcherActivateWatch extends Generic {
  watch_id: string;
}

export interface WatcherDeactivateWatch extends Generic {
  watch_id: string;
}

export interface WatcherDeleteWatch extends Generic {
  id: string;
}

export interface WatcherExecuteWatch<T = RequestBody> extends Generic {
  id?: string;
  debug?: boolean;
  body?: T;
}

export interface WatcherGetWatch extends Generic {
  id: string;
}

export interface WatcherPutWatch<T = RequestBody> extends Generic {
  id: string;
  active?: boolean;
  version?: number;
  if_seq_no?: number;
  if_primary_term?: number;
  body?: T;
}

export interface WatcherStart extends Generic {
}

export interface WatcherStats extends Generic {
  metric?: string | string[];
  emit_stacktraces?: boolean;
}

export interface WatcherStop extends Generic {
}

export interface XpackInfo extends Generic {
  categories?: string | string[];
  accept_enterprise?: boolean;
}

export interface XpackUsage extends Generic {
  master_timeout?: string;
}
