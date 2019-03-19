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

export interface Generic {
  method?: string;
  ignore?: number | number[];
  filter_path?: string | string[];
  pretty?: boolean;
  human?: boolean;
  error_trace?: boolean;
  source?: string;
}

export interface Bulk extends Generic {
  index?: string;
  type?: string;
  wait_for_active_shards?: string;
  refresh?: 'true' | 'false' | 'wait_for';
  routing?: string;
  timeout?: string;
  fields?: string | string[];
  _source?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  pipeline?: string;
  body: any;
}

export interface CatAliases extends Generic {
  name?: string | string[];
  format?: string;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
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
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

export interface CatFielddata extends Generic {
  fields?: string | string[];
  format?: string;
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

export interface CatHealth extends Generic {
  format?: string;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
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
  bytes?: 'b' | 'k' | 'm' | 'g';
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  health?: 'green' | 'yellow' | 'red';
  help?: boolean;
  pri?: boolean;
  s?: string | string[];
  v?: boolean;
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
  format?: string;
  full_id?: boolean;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

export interface CatPendingTasks extends Generic {
  format?: string;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
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
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
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
  v?: boolean;
}

export interface CatSnapshots extends Generic {
  repository: string | string[];
  format?: string;
  ignore_unavailable?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

export interface CatTasks extends Generic {
  format?: string;
  node_id?: string | string[];
  actions?: string | string[];
  detailed?: boolean;
  parent_node?: string;
  parent_task?: number;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
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

export interface ClearScroll extends Generic {
  scroll_id?: string | string[];
  body?: any;
}

export interface ClusterAllocationExplain extends Generic {
  include_yes_decisions?: boolean;
  include_disk_info?: boolean;
  body?: any;
}

export interface ClusterGetSettings extends Generic {
  flat_settings?: boolean;
  master_timeout?: string;
  timeout?: string;
  include_defaults?: boolean;
}

export interface ClusterHealth extends Generic {
  index?: string | string[];
  level?: 'cluster' | 'indices' | 'shards';
  local?: boolean;
  master_timeout?: string;
  timeout?: string;
  wait_for_active_shards?: string;
  wait_for_nodes?: string;
  wait_for_events?: 'immediate' | 'urgent' | 'high' | 'normal' | 'low' | 'languid';
  wait_for_no_relocating_shards?: boolean;
  wait_for_status?: 'green' | 'yellow' | 'red';
}

export interface ClusterPendingTasks extends Generic {
  local?: boolean;
  master_timeout?: string;
}

export interface ClusterPutSettings extends Generic {
  flat_settings?: boolean;
  master_timeout?: string;
  timeout?: string;
  body?: any;
}

export interface ClusterRemoteInfo extends Generic {
}

export interface ClusterReroute extends Generic {
  dry_run?: boolean;
  explain?: boolean;
  retry_failed?: boolean;
  metric?: string | string[];
  master_timeout?: string;
  timeout?: string;
  body?: any;
}

export interface ClusterState extends Generic {
  index?: string | string[];
  metric?: string | string[];
  local?: boolean;
  master_timeout?: string;
  flat_settings?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
}

export interface ClusterStats extends Generic {
  node_id?: string | string[];
  flat_settings?: boolean;
  timeout?: string;
}

export interface Count extends Generic {
  index?: string | string[];
  type?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
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
  body?: any;
}

export interface CountPercolate extends Generic {
  index: string;
  type: string;
  id?: string;
  routing?: string | string[];
  preference?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  percolate_index?: string;
  percolate_type?: string;
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
  body?: any;
}

export interface Create extends Generic {
  id: string;
  index: string;
  type: string;
  wait_for_active_shards?: string;
  parent?: string;
  refresh?: 'true' | 'false' | 'wait_for';
  routing?: string;
  timeout?: string;
  timestamp?: string;
  ttl?: string;
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
  pipeline?: string;
  body: any;
}

export interface Delete extends Generic {
  id: string;
  index: string;
  type: string;
  wait_for_active_shards?: string;
  parent?: string;
  refresh?: 'true' | 'false' | 'wait_for';
  routing?: string;
  timeout?: string;
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
}

export interface DeleteByQuery extends Generic {
  index: string | string[];
  type?: string | string[];
  analyzer?: string;
  analyze_wildcard?: boolean;
  default_operator?: 'AND' | 'OR';
  df?: string;
  from?: number;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  conflicts?: 'abort' | 'proceed';
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  lenient?: boolean;
  preference?: string;
  q?: string;
  routing?: string | string[];
  scroll?: string;
  search_type?: 'query_then_fetch' | 'dfs_query_then_fetch';
  search_timeout?: string;
  size?: number;
  sort?: string | string[];
  _source?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
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
  slices?: number;
  body: any;
}

export interface DeleteScript extends Generic {
  id: string;
  lang: string;
  timeout?: string;
  master_timeout?: string;
}

export interface DeleteTemplate extends Generic {
  id: string;
}

export interface Exists extends Generic {
  id: string;
  index: string;
  type: string;
  stored_fields?: string | string[];
  parent?: string;
  preference?: string;
  realtime?: boolean;
  refresh?: boolean;
  routing?: string;
  _source?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
}

export interface ExistsSource extends Generic {
  id: string;
  index: string;
  type: string;
  parent?: string;
  preference?: string;
  realtime?: boolean;
  refresh?: boolean;
  routing?: string;
  _source?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
}

export interface Explain extends Generic {
  id: string;
  index: string;
  type: string;
  analyze_wildcard?: boolean;
  analyzer?: string;
  default_operator?: 'AND' | 'OR';
  df?: string;
  stored_fields?: string | string[];
  lenient?: boolean;
  parent?: string;
  preference?: string;
  q?: string;
  routing?: string;
  _source?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  body?: any;
}

export interface FieldCaps extends Generic {
  index?: string | string[];
  fields?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  body?: any;
}

export interface FieldStats extends Generic {
  index?: string | string[];
  fields?: string | string[];
  level?: 'indices' | 'cluster';
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  body?: any;
}

export interface Get extends Generic {
  id: string;
  index: string;
  type: string;
  stored_fields?: string | string[];
  parent?: string;
  preference?: string;
  realtime?: boolean;
  refresh?: boolean;
  routing?: string;
  _source?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
}

export interface GetScript extends Generic {
  id: string;
  lang: string;
}

export interface GetSource extends Generic {
  id: string;
  index: string;
  type: string;
  parent?: string;
  preference?: string;
  realtime?: boolean;
  refresh?: boolean;
  routing?: string;
  _source?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
}

export interface GetTemplate extends Generic {
  id: string;
}

export interface Index extends Generic {
  id?: string;
  index: string;
  type: string;
  wait_for_active_shards?: string;
  op_type?: 'index' | 'create';
  parent?: string;
  refresh?: 'true' | 'false' | 'wait_for';
  routing?: string;
  timeout?: string;
  timestamp?: string;
  ttl?: string;
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
  pipeline?: string;
  body: any;
}

export interface IndicesAnalyze extends Generic {
  index?: string;
  analyzer?: string;
  char_filter?: string | string[];
  field?: string;
  filter?: string | string[];
  prefer_local?: boolean;
  text?: string | string[];
  tokenizer?: string;
  explain?: boolean;
  attributes?: string | string[];
  format?: 'detailed' | 'text';
  body?: any;
}

export interface IndicesClearCache extends Generic {
  index?: string | string[];
  field_data?: boolean;
  fielddata?: boolean;
  fields?: string | string[];
  query?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  recycler?: boolean;
  request_cache?: boolean;
  request?: boolean;
}

export interface IndicesClose extends Generic {
  index: string | string[];
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
}

export interface IndicesCreate extends Generic {
  index: string;
  wait_for_active_shards?: string;
  timeout?: string;
  master_timeout?: string;
  update_all_types?: boolean;
  body?: any;
}

export interface IndicesDelete extends Generic {
  index: string | string[];
  timeout?: string;
  master_timeout?: string;
}

export interface IndicesDeleteAlias extends Generic {
  index: string | string[];
  name: string | string[];
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
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  flat_settings?: boolean;
  include_defaults?: boolean;
}

export interface IndicesExistsAlias extends Generic {
  index?: string | string[];
  name?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
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
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  local?: boolean;
}

export interface IndicesFlush extends Generic {
  index?: string | string[];
  force?: boolean;
  wait_if_ongoing?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
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
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  max_num_segments?: number;
  only_expunge_deletes?: boolean;
  operation_threading?: undefined;
  wait_for_merge?: boolean;
}

export interface IndicesGet extends Generic {
  index: string | string[];
  feature?: string | string[];
  local?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  flat_settings?: boolean;
  include_defaults?: boolean;
}

export interface IndicesGetAlias extends Generic {
  index?: string | string[];
  name?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  local?: boolean;
}

export interface IndicesGetFieldMapping extends Generic {
  index?: string | string[];
  type?: string | string[];
  fields: string | string[];
  include_defaults?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  local?: boolean;
}

export interface IndicesGetMapping extends Generic {
  index?: string | string[];
  type?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  local?: boolean;
}

export interface IndicesGetSettings extends Generic {
  index?: string | string[];
  name?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  flat_settings?: boolean;
  local?: boolean;
  include_defaults?: boolean;
}

export interface IndicesGetTemplate extends Generic {
  name?: string | string[];
  flat_settings?: boolean;
  master_timeout?: string;
  local?: boolean;
}

export interface IndicesGetUpgrade extends Generic {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
}

export interface IndicesOpen extends Generic {
  index: string | string[];
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
}

export interface IndicesPutAlias extends Generic {
  index: string | string[];
  name: string;
  timeout?: string;
  master_timeout?: string;
  body?: any;
}

export interface IndicesPutMapping extends Generic {
  index?: string | string[];
  type: string;
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  update_all_types?: boolean;
  body: any;
}

export interface IndicesPutSettings extends Generic {
  index?: string | string[];
  master_timeout?: string;
  preserve_existing?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  flat_settings?: boolean;
  body: any;
}

export interface IndicesPutTemplate extends Generic {
  name: string;
  order?: number;
  create?: boolean;
  timeout?: string;
  master_timeout?: string;
  flat_settings?: boolean;
  body: any;
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
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
}

export interface IndicesRollover extends Generic {
  alias: string;
  new_index?: string;
  timeout?: string;
  dry_run?: boolean;
  master_timeout?: string;
  wait_for_active_shards?: string;
  body?: any;
}

export interface IndicesSegments extends Generic {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  operation_threading?: undefined;
  verbose?: boolean;
}

export interface IndicesShardStores extends Generic {
  index?: string | string[];
  status?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  operation_threading?: undefined;
}

export interface IndicesShrink extends Generic {
  index: string;
  target: string;
  timeout?: string;
  master_timeout?: string;
  wait_for_active_shards?: string;
  body?: any;
}

export interface IndicesStats extends Generic {
  index?: string | string[];
  metric?: string | string[];
  completion_fields?: string | string[];
  fielddata_fields?: string | string[];
  fields?: string | string[];
  groups?: string | string[];
  level?: 'cluster' | 'indices' | 'shards';
  types?: string | string[];
  include_segment_file_sizes?: boolean;
}

export interface IndicesUpdateAliases extends Generic {
  timeout?: string;
  master_timeout?: string;
  body: any;
}

export interface IndicesUpgrade extends Generic {
  index?: string | string[];
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  ignore_unavailable?: boolean;
  wait_for_completion?: boolean;
  only_ancient_segments?: boolean;
}

export interface IndicesValidateQuery extends Generic {
  index?: string | string[];
  type?: string | string[];
  explain?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  operation_threading?: undefined;
  q?: string;
  analyzer?: string;
  analyze_wildcard?: boolean;
  default_operator?: 'AND' | 'OR';
  df?: string;
  lenient?: boolean;
  rewrite?: boolean;
  all_shards?: boolean;
  body?: any;
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

export interface IngestPutPipeline extends Generic {
  id: string;
  master_timeout?: string;
  timeout?: string;
  body: any;
}

export interface IngestSimulate extends Generic {
  id?: string;
  verbose?: boolean;
  body: any;
}

export interface Mget extends Generic {
  index?: string;
  type?: string;
  stored_fields?: string | string[];
  preference?: string;
  realtime?: boolean;
  refresh?: boolean;
  routing?: string;
  _source?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  body: any;
}

export interface Mpercolate extends Generic {
  index?: string;
  type?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  body: any;
}

export interface Msearch extends Generic {
  index?: string | string[];
  type?: string | string[];
  search_type?: 'query_then_fetch' | 'query_and_fetch' | 'dfs_query_then_fetch' | 'dfs_query_and_fetch';
  max_concurrent_searches?: number;
  typed_keys?: boolean;
  pre_filter_shard_size?: number;
  body: any;
}

export interface MsearchTemplate extends Generic {
  index?: string | string[];
  type?: string | string[];
  search_type?: 'query_then_fetch' | 'query_and_fetch' | 'dfs_query_then_fetch' | 'dfs_query_and_fetch';
  typed_keys?: boolean;
  max_concurrent_searches?: number;
  body: any;
}

export interface Mtermvectors extends Generic {
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
  parent?: string;
  realtime?: boolean;
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
  body?: any;
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

export interface NodesStats extends Generic {
  metric?: string | string[];
  index_metric?: string | string[];
  node_id?: string | string[];
  completion_fields?: string | string[];
  fielddata_fields?: string | string[];
  fields?: string | string[];
  groups?: boolean;
  level?: 'indices' | 'node' | 'shards';
  types?: string | string[];
  timeout?: string;
  include_segment_file_sizes?: boolean;
}

export interface Percolate extends Generic {
  index: string;
  type: string;
  id?: string;
  routing?: string | string[];
  preference?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  percolate_index?: string;
  percolate_type?: string;
  percolate_routing?: string;
  percolate_preference?: string;
  percolate_format?: 'ids';
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
  body?: any;
}

export interface Ping extends Generic {
}

export interface PutScript extends Generic {
  id: string;
  lang: string;
  timeout?: string;
  master_timeout?: string;
  body: any;
}

export interface PutTemplate extends Generic {
  id: string;
  body: any;
}

export interface Reindex extends Generic {
  refresh?: boolean;
  timeout?: string;
  wait_for_active_shards?: string;
  wait_for_completion?: boolean;
  requests_per_second?: number;
  slices?: number;
  body: any;
}

export interface ReindexRethrottle extends Generic {
  task_id?: string;
  requests_per_second: number;
}

export interface RenderSearchTemplate extends Generic {
  id?: string;
  body?: any;
}

export interface Scroll extends Generic {
  scroll_id?: string;
  scroll?: string;
  body?: any;
}

export interface Search extends Generic {
  index?: string | string[];
  type?: string | string[];
  analyzer?: string;
  analyze_wildcard?: boolean;
  default_operator?: 'AND' | 'OR';
  df?: string;
  explain?: boolean;
  stored_fields?: string | string[];
  docvalue_fields?: string | string[];
  fielddata_fields?: string | string[];
  from?: number;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  lenient?: boolean;
  preference?: string;
  q?: string;
  routing?: string | string[];
  scroll?: string;
  search_type?: 'query_then_fetch' | 'dfs_query_then_fetch';
  size?: number;
  sort?: string | string[];
  _source?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  terminate_after?: number;
  stats?: string | string[];
  suggest_field?: string;
  suggest_mode?: 'missing' | 'popular' | 'always';
  suggest_size?: number;
  suggest_text?: string;
  timeout?: string;
  track_scores?: boolean;
  typed_keys?: boolean;
  version?: boolean;
  request_cache?: boolean;
  batched_reduce_size?: number;
  max_concurrent_shard_requests?: number;
  pre_filter_shard_size?: number;
  body?: any;
}

export interface SearchShards extends Generic {
  index?: string | string[];
  type?: string | string[];
  preference?: string;
  routing?: string;
  local?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
}

export interface SearchTemplate extends Generic {
  index?: string | string[];
  type?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  preference?: string;
  routing?: string | string[];
  scroll?: string;
  search_type?: 'query_then_fetch' | 'query_and_fetch' | 'dfs_query_then_fetch' | 'dfs_query_and_fetch';
  explain?: boolean;
  profile?: boolean;
  typed_keys?: boolean;
  body?: any;
}

export interface SnapshotCreate extends Generic {
  repository: string;
  snapshot: string;
  master_timeout?: string;
  wait_for_completion?: boolean;
  body?: any;
}

export interface SnapshotCreateRepository extends Generic {
  repository: string;
  master_timeout?: string;
  timeout?: string;
  verify?: boolean;
  body: any;
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

export interface SnapshotRestore extends Generic {
  repository: string;
  snapshot: string;
  master_timeout?: string;
  wait_for_completion?: boolean;
  body?: any;
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

export interface Suggest extends Generic {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  preference?: string;
  routing?: string;
  body: any;
}

export interface TasksCancel extends Generic {
  task_id?: string;
  nodes?: string | string[];
  actions?: string | string[];
  parent_node?: string;
  parent_task_id?: string;
}

export interface TasksGet extends Generic {
  task_id?: string;
  wait_for_completion?: boolean;
}

export interface TasksList extends Generic {
  nodes?: string | string[];
  actions?: string | string[];
  detailed?: boolean;
  parent_node?: string;
  parent_task_id?: string;
  wait_for_completion?: boolean;
  group_by?: 'nodes' | 'parents';
}

export interface Termvectors extends Generic {
  index: string;
  type: string;
  id?: string;
  term_statistics?: boolean;
  field_statistics?: boolean;
  fields?: string | string[];
  offsets?: boolean;
  positions?: boolean;
  payloads?: boolean;
  preference?: string;
  routing?: string;
  parent?: string;
  realtime?: boolean;
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
  body?: any;
}

export interface Update extends Generic {
  id: string;
  index: string;
  type: string;
  wait_for_active_shards?: string;
  fields?: string | string[];
  _source?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  lang?: string;
  parent?: string;
  refresh?: 'true' | 'false' | 'wait_for';
  retry_on_conflict?: number;
  routing?: string;
  timeout?: string;
  timestamp?: string;
  ttl?: string;
  version?: number;
  version_type?: 'internal' | 'force';
  body?: any;
}

export interface UpdateByQuery extends Generic {
  index: string | string[];
  type?: string | string[];
  analyzer?: string;
  analyze_wildcard?: boolean;
  default_operator?: 'AND' | 'OR';
  df?: string;
  from?: number;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  conflicts?: 'abort' | 'proceed';
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  lenient?: boolean;
  pipeline?: string;
  preference?: string;
  q?: string;
  routing?: string | string[];
  scroll?: string;
  search_type?: 'query_then_fetch' | 'dfs_query_then_fetch';
  search_timeout?: string;
  size?: number;
  sort?: string | string[];
  _source?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
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
  slices?: number;
  body?: any;
}
