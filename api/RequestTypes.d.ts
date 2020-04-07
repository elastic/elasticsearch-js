// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { RequestBody, RequestNDBody } from '../lib/Transport'

interface GenericRequest {
  method?: string;
  ignore?: number | number[];
  filter_path?: string | string[];
  pretty?: boolean;
  human?: boolean;
  error_trace?: boolean;
  source?: string;
}

interface BulkRequest<T = RequestNDBody> extends GenericRequest {
  index?: string;
  type?: string;
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  wait_for_active_shards?: string;
  refresh?: 'true' | 'false' | 'wait_for';
  routing?: string;
  timeout?: string;
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  pipeline?: string;
  body: T;
}

interface CatAliasesRequest extends GenericRequest {
  name?: string | string[];
  format?: string;
  local?: boolean;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

interface CatAllocationRequest extends GenericRequest {
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

interface CatCountRequest extends GenericRequest {
  index?: string | string[];
  format?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

interface CatFielddataRequest extends GenericRequest {
  fields?: string | string[];
  format?: string;
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

interface CatHealthRequest extends GenericRequest {
  format?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  ts?: boolean;
  v?: boolean;
}

interface CatHelpRequest extends GenericRequest {
  help?: boolean;
  s?: string | string[];
}

interface CatIndicesRequest extends GenericRequest {
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

interface CatMasterRequest extends GenericRequest {
  format?: string;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

interface CatNodeattrsRequest extends GenericRequest {
  format?: string;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

interface CatNodesRequest extends GenericRequest {
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  format?: string;
  full_id?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
}

interface CatPendingTasksRequest extends GenericRequest {
  format?: string;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
}

interface CatPluginsRequest extends GenericRequest {
  format?: string;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

interface CatRecoveryRequest extends GenericRequest {
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

interface CatRepositoriesRequest extends GenericRequest {
  format?: string;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

interface CatSegmentsRequest extends GenericRequest {
  index?: string | string[];
  format?: string;
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

interface CatShardsRequest extends GenericRequest {
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

interface CatSnapshotsRequest extends GenericRequest {
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

interface CatTasksRequest extends GenericRequest {
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

interface CatTemplatesRequest extends GenericRequest {
  name?: string;
  format?: string;
  local?: boolean;
  master_timeout?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  v?: boolean;
}

interface CatThreadPoolRequest extends GenericRequest {
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

interface ClearScrollRequest<T = RequestBody> extends GenericRequest {
  scroll_id?: string | string[];
  body?: T;
}

interface ClusterAllocationExplainRequest<T = RequestBody> extends GenericRequest {
  include_yes_decisions?: boolean;
  include_disk_info?: boolean;
  body?: T;
}

interface ClusterDeleteComponentTemplateRequest extends GenericRequest {
  name: string;
  timeout?: string;
  master_timeout?: string;
}

interface ClusterExistsComponentTemplateRequest extends GenericRequest {
  name: string;
  master_timeout?: string;
  local?: boolean;
}

interface ClusterGetComponentTemplateRequest extends GenericRequest {
  name?: string | string[];
  master_timeout?: string;
  local?: boolean;
}

interface ClusterGetSettingsRequest extends GenericRequest {
  flat_settings?: boolean;
  master_timeout?: string;
  timeout?: string;
  include_defaults?: boolean;
}

interface ClusterHealthRequest extends GenericRequest {
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

interface ClusterPendingTasksRequest extends GenericRequest {
  local?: boolean;
  master_timeout?: string;
}

interface ClusterPutComponentTemplateRequest<T = RequestBody> extends GenericRequest {
  name: string;
  create?: boolean;
  timeout?: string;
  master_timeout?: string;
  body: T;
}

interface ClusterPutSettingsRequest<T = RequestBody> extends GenericRequest {
  flat_settings?: boolean;
  master_timeout?: string;
  timeout?: string;
  body: T;
}

interface ClusterRemoteInfoRequest extends GenericRequest {
}

interface ClusterRerouteRequest<T = RequestBody> extends GenericRequest {
  dry_run?: boolean;
  explain?: boolean;
  retry_failed?: boolean;
  metric?: string | string[];
  master_timeout?: string;
  timeout?: string;
  body?: T;
}

interface ClusterStateRequest extends GenericRequest {
  index?: string | string[];
  metric?: string | string[];
  local?: boolean;
  master_timeout?: string;
  flat_settings?: boolean;
  wait_for_metadata_version?: number;
  wait_for_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

interface ClusterStatsRequest extends GenericRequest {
  node_id?: string | string[];
  flat_settings?: boolean;
  timeout?: string;
}

interface CountRequest<T = RequestBody> extends GenericRequest {
  index?: string | string[];
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

interface CreateRequest<T = RequestBody> extends GenericRequest {
  id: string;
  index: string;
  type?: string;
  wait_for_active_shards?: string;
  refresh?: 'true' | 'false' | 'wait_for';
  routing?: string;
  timeout?: string;
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte';
  pipeline?: string;
  body: T;
}

interface DeleteRequest extends GenericRequest {
  id: string;
  index: string;
  type?: string;
  wait_for_active_shards?: string;
  refresh?: 'true' | 'false' | 'wait_for';
  routing?: string;
  timeout?: string;
  if_seq_no?: number;
  if_primary_term?: number;
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte';
}

interface DeleteByQueryRequest<T = RequestBody> extends GenericRequest {
  index: string | string[];
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

interface DeleteByQueryRethrottleRequest extends GenericRequest {
  task_id: string;
  requests_per_second: number;
}

interface DeleteScriptRequest extends GenericRequest {
  id: string;
  timeout?: string;
  master_timeout?: string;
}

interface ExistsRequest extends GenericRequest {
  id: string;
  index: string;
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
  version_type?: 'internal' | 'external' | 'external_gte';
}

interface ExistsSourceRequest extends GenericRequest {
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
  version_type?: 'internal' | 'external' | 'external_gte';
}

interface ExplainRequest<T = RequestBody> extends GenericRequest {
  id: string;
  index: string;
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

interface FieldCapsRequest extends GenericRequest {
  index?: string | string[];
  fields?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  include_unmapped?: boolean;
}

interface GetRequest extends GenericRequest {
  id: string;
  index: string;
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
  version_type?: 'internal' | 'external' | 'external_gte';
}

interface GetScriptRequest extends GenericRequest {
  id: string;
  master_timeout?: string;
}

interface GetScriptContextRequest extends GenericRequest {
}

interface GetScriptLanguagesRequest extends GenericRequest {
}

interface GetSourceRequest extends GenericRequest {
  id: string;
  index: string;
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
  version_type?: 'internal' | 'external' | 'external_gte';
}

interface IndexRequest<T = RequestBody> extends GenericRequest {
  id?: string;
  index: string;
  wait_for_active_shards?: string;
  op_type?: 'index' | 'create';
  refresh?: 'true' | 'false' | 'wait_for';
  routing?: string;
  timeout?: string;
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte';
  if_seq_no?: number;
  if_primary_term?: number;
  pipeline?: string;
  body: T;
}

interface IndicesAnalyzeRequest<T = RequestBody> extends GenericRequest {
  index?: string;
  body?: T;
}

interface IndicesClearCacheRequest extends GenericRequest {
  index?: string | string[];
  fielddata?: boolean;
  fields?: string | string[];
  query?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  request?: boolean;
}

interface IndicesCloneRequest<T = RequestBody> extends GenericRequest {
  index: string;
  target: string;
  timeout?: string;
  master_timeout?: string;
  wait_for_active_shards?: string;
  body?: T;
}

interface IndicesCloseRequest extends GenericRequest {
  index: string | string[];
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  wait_for_active_shards?: string;
}

interface IndicesCreateRequest<T = RequestBody> extends GenericRequest {
  index: string;
  wait_for_active_shards?: string;
  timeout?: string;
  master_timeout?: string;
  body?: T;
}

interface IndicesCreateDataStreamRequest<T = RequestBody> extends GenericRequest {
  name: string;
  body: T;
}

interface IndicesDeleteRequest extends GenericRequest {
  index: string | string[];
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

interface IndicesDeleteAliasRequest extends GenericRequest {
  index: string | string[];
  name: string | string[];
  timeout?: string;
  master_timeout?: string;
}

interface IndicesDeleteDataStreamRequest extends GenericRequest {
  name: string;
}

interface IndicesDeleteIndexTemplateRequest extends GenericRequest {
  name: string;
  timeout?: string;
  master_timeout?: string;
}

interface IndicesDeleteTemplateRequest extends GenericRequest {
  name: string;
  timeout?: string;
  master_timeout?: string;
}

interface IndicesExistsRequest extends GenericRequest {
  index: string | string[];
  local?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  flat_settings?: boolean;
  include_defaults?: boolean;
}

interface IndicesExistsAliasRequest extends GenericRequest {
  name: string | string[];
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  local?: boolean;
}

interface IndicesExistsTemplateRequest extends GenericRequest {
  name: string | string[];
  flat_settings?: boolean;
  master_timeout?: string;
  local?: boolean;
}

interface IndicesExistsTypeRequest extends GenericRequest {
  index: string | string[];
  type: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  local?: boolean;
}

interface IndicesFlushRequest extends GenericRequest {
  index?: string | string[];
  force?: boolean;
  wait_if_ongoing?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

interface IndicesForcemergeRequest extends GenericRequest {
  index?: string | string[];
  flush?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  max_num_segments?: number;
  only_expunge_deletes?: boolean;
}

interface IndicesGetRequest extends GenericRequest {
  index: string | string[];
  local?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  flat_settings?: boolean;
  include_defaults?: boolean;
  master_timeout?: string;
}

interface IndicesGetAliasRequest extends GenericRequest {
  name?: string | string[];
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  local?: boolean;
}

interface IndicesGetDataStreamsRequest extends GenericRequest {
  name?: string;
}

interface IndicesGetFieldMappingRequest extends GenericRequest {
  fields: string | string[];
  index?: string | string[];
  include_defaults?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  local?: boolean;
}

interface IndicesGetIndexTemplateRequest extends GenericRequest {
  name?: string | string[];
  flat_settings?: boolean;
  master_timeout?: string;
  local?: boolean;
}

interface IndicesGetMappingRequest extends GenericRequest {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  master_timeout?: string;
  local?: boolean;
}

interface IndicesGetSettingsRequest extends GenericRequest {
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

interface IndicesGetTemplateRequest extends GenericRequest {
  name?: string | string[];
  flat_settings?: boolean;
  master_timeout?: string;
  local?: boolean;
}

interface IndicesGetUpgradeRequest extends GenericRequest {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

interface IndicesOpenRequest extends GenericRequest {
  index: string | string[];
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  wait_for_active_shards?: string;
}

interface IndicesPutAliasRequest<T = RequestBody> extends GenericRequest {
  index: string | string[];
  name: string;
  timeout?: string;
  master_timeout?: string;
  body?: T;
}

interface IndicesPutIndexTemplateRequest<T = RequestBody> extends GenericRequest {
  name: string;
  order?: number;
  create?: boolean;
  master_timeout?: string;
  body: T;
}

interface IndicesPutMappingRequest<T = RequestBody> extends GenericRequest {
  index: string | string[];
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  body: T;
}

interface IndicesPutSettingsRequest<T = RequestBody> extends GenericRequest {
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

interface IndicesPutTemplateRequest<T = RequestBody> extends GenericRequest {
  name: string;
  order?: number;
  create?: boolean;
  master_timeout?: string;
  body: T;
}

interface IndicesRecoveryRequest extends GenericRequest {
  index?: string | string[];
  detailed?: boolean;
  active_only?: boolean;
}

interface IndicesRefreshRequest extends GenericRequest {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

interface IndicesRolloverRequest<T = RequestBody> extends GenericRequest {
  alias: string;
  new_index?: string;
  timeout?: string;
  dry_run?: boolean;
  master_timeout?: string;
  wait_for_active_shards?: string;
  body?: T;
}

interface IndicesSegmentsRequest extends GenericRequest {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  verbose?: boolean;
}

interface IndicesShardStoresRequest extends GenericRequest {
  index?: string | string[];
  status?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

interface IndicesShrinkRequest<T = RequestBody> extends GenericRequest {
  index: string;
  target: string;
  timeout?: string;
  master_timeout?: string;
  wait_for_active_shards?: string;
  body?: T;
}

interface IndicesSplitRequest<T = RequestBody> extends GenericRequest {
  index: string;
  target: string;
  timeout?: string;
  master_timeout?: string;
  wait_for_active_shards?: string;
  body?: T;
}

interface IndicesStatsRequest extends GenericRequest {
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

interface IndicesUpdateAliasesRequest<T = RequestBody> extends GenericRequest {
  timeout?: string;
  master_timeout?: string;
  body: T;
}

interface IndicesUpgradeRequest extends GenericRequest {
  index?: string | string[];
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  ignore_unavailable?: boolean;
  wait_for_completion?: boolean;
  only_ancient_segments?: boolean;
}

interface IndicesValidateQueryRequest<T = RequestBody> extends GenericRequest {
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

interface InfoRequest extends GenericRequest {
}

interface IngestDeletePipelineRequest extends GenericRequest {
  id: string;
  master_timeout?: string;
  timeout?: string;
}

interface IngestGetPipelineRequest extends GenericRequest {
  id?: string;
  master_timeout?: string;
}

interface IngestProcessorGrokRequest extends GenericRequest {
}

interface IngestPutPipelineRequest<T = RequestBody> extends GenericRequest {
  id: string;
  master_timeout?: string;
  timeout?: string;
  body: T;
}

interface IngestSimulateRequest<T = RequestBody> extends GenericRequest {
  id?: string;
  verbose?: boolean;
  body: T;
}

interface MgetRequest<T = RequestBody> extends GenericRequest {
  index?: string;
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

interface MsearchRequest<T = RequestNDBody> extends GenericRequest {
  index?: string | string[];
  search_type?: 'query_then_fetch' | 'query_and_fetch' | 'dfs_query_then_fetch' | 'dfs_query_and_fetch';
  max_concurrent_searches?: number;
  typed_keys?: boolean;
  pre_filter_shard_size?: number;
  max_concurrent_shard_requests?: number;
  rest_total_hits_as_int?: boolean;
  ccs_minimize_roundtrips?: boolean;
  body: T;
}

interface MsearchTemplateRequest<T = RequestNDBody> extends GenericRequest {
  index?: string | string[];
  search_type?: 'query_then_fetch' | 'query_and_fetch' | 'dfs_query_then_fetch' | 'dfs_query_and_fetch';
  typed_keys?: boolean;
  max_concurrent_searches?: number;
  rest_total_hits_as_int?: boolean;
  ccs_minimize_roundtrips?: boolean;
  body: T;
}

interface MtermvectorsRequest<T = RequestBody> extends GenericRequest {
  index?: string;
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
  version_type?: 'internal' | 'external' | 'external_gte';
  body?: T;
}

interface NodesHotThreadsRequest extends GenericRequest {
  node_id?: string | string[];
  interval?: string;
  snapshots?: number;
  threads?: number;
  ignore_idle_threads?: boolean;
  type?: 'cpu' | 'wait' | 'block';
  timeout?: string;
}

interface NodesInfoRequest extends GenericRequest {
  node_id?: string | string[];
  metric?: string | string[];
  flat_settings?: boolean;
  timeout?: string;
}

interface NodesReloadSecureSettingsRequest extends GenericRequest {
  node_id?: string | string[];
  timeout?: string;
}

interface NodesStatsRequest extends GenericRequest {
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

interface NodesUsageRequest extends GenericRequest {
  node_id?: string | string[];
  metric?: string | string[];
  timeout?: string;
}

interface PingRequest extends GenericRequest {
}

interface PutScriptRequest<T = RequestBody> extends GenericRequest {
  id: string;
  context?: string;
  timeout?: string;
  master_timeout?: string;
  body: T;
}

interface RankEvalRequest<T = RequestBody> extends GenericRequest {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  search_type?: 'query_then_fetch' | 'dfs_query_then_fetch';
  body: T;
}

interface ReindexRequest<T = RequestBody> extends GenericRequest {
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

interface ReindexRethrottleRequest extends GenericRequest {
  task_id: string;
  requests_per_second: number;
}

interface RenderSearchTemplateRequest<T = RequestBody> extends GenericRequest {
  id?: string;
  body?: T;
}

interface ScriptsPainlessExecuteRequest<T = RequestBody> extends GenericRequest {
  body?: T;
}

interface ScrollRequest<T = RequestBody> extends GenericRequest {
  scroll_id?: string;
  scroll?: string;
  rest_total_hits_as_int?: boolean;
  body?: T;
}

interface SearchRequest<T = RequestBody> extends GenericRequest {
  index?: string | string[];
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

interface SearchShardsRequest extends GenericRequest {
  index?: string | string[];
  preference?: string;
  routing?: string;
  local?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

interface SearchTemplateRequest<T = RequestBody> extends GenericRequest {
  index?: string | string[];
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

interface SnapshotCleanupRepositoryRequest extends GenericRequest {
  repository: string;
  master_timeout?: string;
  timeout?: string;
}

interface SnapshotCreateRequest<T = RequestBody> extends GenericRequest {
  repository: string;
  snapshot: string;
  master_timeout?: string;
  wait_for_completion?: boolean;
  body?: T;
}

interface SnapshotCreateRepositoryRequest<T = RequestBody> extends GenericRequest {
  repository: string;
  master_timeout?: string;
  timeout?: string;
  verify?: boolean;
  body: T;
}

interface SnapshotDeleteRequest extends GenericRequest {
  repository: string;
  snapshot: string;
  master_timeout?: string;
}

interface SnapshotDeleteRepositoryRequest extends GenericRequest {
  repository: string | string[];
  master_timeout?: string;
  timeout?: string;
}

interface SnapshotGetRequest extends GenericRequest {
  repository: string;
  snapshot: string | string[];
  master_timeout?: string;
  ignore_unavailable?: boolean;
  verbose?: boolean;
}

interface SnapshotGetRepositoryRequest extends GenericRequest {
  repository?: string | string[];
  master_timeout?: string;
  local?: boolean;
}

interface SnapshotRestoreRequest<T = RequestBody> extends GenericRequest {
  repository: string;
  snapshot: string;
  master_timeout?: string;
  wait_for_completion?: boolean;
  body?: T;
}

interface SnapshotStatusRequest extends GenericRequest {
  repository?: string;
  snapshot?: string | string[];
  master_timeout?: string;
  ignore_unavailable?: boolean;
}

interface SnapshotVerifyRepositoryRequest extends GenericRequest {
  repository: string;
  master_timeout?: string;
  timeout?: string;
}

interface TasksCancelRequest extends GenericRequest {
  task_id?: string;
  nodes?: string | string[];
  actions?: string | string[];
  parent_task_id?: string;
  wait_for_completion?: boolean;
}

interface TasksGetRequest extends GenericRequest {
  task_id: string;
  wait_for_completion?: boolean;
  timeout?: string;
}

interface TasksListRequest extends GenericRequest {
  nodes?: string | string[];
  actions?: string | string[];
  detailed?: boolean;
  parent_task_id?: string;
  wait_for_completion?: boolean;
  group_by?: 'nodes' | 'parents' | 'none';
  timeout?: string;
}

interface TermvectorsRequest<T = RequestBody> extends GenericRequest {
  index: string;
  id?: string;
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
  version_type?: 'internal' | 'external' | 'external_gte';
  body?: T;
}

interface UpdateRequest<T = RequestBody> extends GenericRequest {
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
  refresh?: 'true' | 'false' | 'wait_for';
  retry_on_conflict?: number;
  routing?: string;
  timeout?: string;
  if_seq_no?: number;
  if_primary_term?: number;
  body: T;
}

interface UpdateByQueryRequest<T = RequestBody> extends GenericRequest {
  index: string | string[];
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

interface UpdateByQueryRethrottleRequest extends GenericRequest {
  task_id: string;
  requests_per_second: number;
}

interface AsyncSearchDeleteRequest extends GenericRequest {
  id: string;
}

interface AsyncSearchGetRequest extends GenericRequest {
  id: string;
  wait_for_completion_timeout?: string;
  keep_alive?: string;
  typed_keys?: boolean;
}

interface AsyncSearchSubmitRequest<T = RequestBody> extends GenericRequest {
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

interface AutoscalingDeleteAutoscalingPolicyRequest extends GenericRequest {
  name: string;
}

interface AutoscalingGetAutoscalingDecisionRequest extends GenericRequest {
}

interface AutoscalingGetAutoscalingPolicyRequest extends GenericRequest {
  name: string;
}

interface AutoscalingPutAutoscalingPolicyRequest<T = RequestBody> extends GenericRequest {
  name: string;
  body: T;
}

interface CatMlDataFrameAnalyticsRequest extends GenericRequest {
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

interface CatMlDatafeedsRequest extends GenericRequest {
  datafeed_id?: string;
  allow_no_datafeeds?: boolean;
  format?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
}

interface CatMlJobsRequest extends GenericRequest {
  job_id?: string;
  allow_no_jobs?: boolean;
  bytes?: 'b' | 'k' | 'kb' | 'm' | 'mb' | 'g' | 'gb' | 't' | 'tb' | 'p' | 'pb';
  format?: string;
  h?: string | string[];
  help?: boolean;
  s?: string | string[];
  time?: 'd' | 'h' | 'm' | 's' | 'ms' | 'micros' | 'nanos';
  v?: boolean;
}

interface CatMlTrainedModelsRequest extends GenericRequest {
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

interface CatTransformsRequest extends GenericRequest {
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

interface CcrDeleteAutoFollowPatternRequest extends GenericRequest {
  name: string;
}

interface CcrFollowRequest<T = RequestBody> extends GenericRequest {
  index: string;
  wait_for_active_shards?: string;
  body: T;
}

interface CcrFollowInfoRequest extends GenericRequest {
  index: string | string[];
}

interface CcrFollowStatsRequest extends GenericRequest {
  index: string | string[];
}

interface CcrForgetFollowerRequest<T = RequestBody> extends GenericRequest {
  index: string;
  body: T;
}

interface CcrGetAutoFollowPatternRequest extends GenericRequest {
  name?: string;
}

interface CcrPauseAutoFollowPatternRequest extends GenericRequest {
  name: string;
}

interface CcrPauseFollowRequest extends GenericRequest {
  index: string;
}

interface CcrPutAutoFollowPatternRequest<T = RequestBody> extends GenericRequest {
  name: string;
  body: T;
}

interface CcrResumeAutoFollowPatternRequest extends GenericRequest {
  name: string;
}

interface CcrResumeFollowRequest<T = RequestBody> extends GenericRequest {
  index: string;
  body?: T;
}

interface CcrStatsRequest extends GenericRequest {
}

interface CcrUnfollowRequest extends GenericRequest {
  index: string;
}

interface DataFrameTransformDeprecatedDeleteTransformRequest extends GenericRequest {
  transform_id: string;
  force?: boolean;
}

interface DataFrameTransformDeprecatedGetTransformRequest extends GenericRequest {
  transform_id?: string;
  from?: number;
  size?: number;
  allow_no_match?: boolean;
}

interface DataFrameTransformDeprecatedGetTransformStatsRequest extends GenericRequest {
  transform_id: string;
  from?: number;
  size?: number;
  allow_no_match?: boolean;
}

interface DataFrameTransformDeprecatedPreviewTransformRequest<T = RequestBody> extends GenericRequest {
  body: T;
}

interface DataFrameTransformDeprecatedPutTransformRequest<T = RequestBody> extends GenericRequest {
  transform_id: string;
  defer_validation?: boolean;
  body: T;
}

interface DataFrameTransformDeprecatedStartTransformRequest extends GenericRequest {
  transform_id: string;
  timeout?: string;
}

interface DataFrameTransformDeprecatedStopTransformRequest extends GenericRequest {
  transform_id: string;
  wait_for_completion?: boolean;
  timeout?: string;
  allow_no_match?: boolean;
}

interface DataFrameTransformDeprecatedUpdateTransformRequest<T = RequestBody> extends GenericRequest {
  transform_id: string;
  defer_validation?: boolean;
  body: T;
}

interface EnrichDeletePolicyRequest extends GenericRequest {
  name: string;
}

interface EnrichExecutePolicyRequest extends GenericRequest {
  name: string;
  wait_for_completion?: boolean;
}

interface EnrichGetPolicyRequest extends GenericRequest {
  name?: string | string[];
}

interface EnrichPutPolicyRequest<T = RequestBody> extends GenericRequest {
  name: string;
  body: T;
}

interface EnrichStatsRequest extends GenericRequest {
}

interface EqlSearchRequest<T = RequestBody> extends GenericRequest {
  index: string;
  body: T;
}

interface GraphExploreRequest<T = RequestBody> extends GenericRequest {
  index: string | string[];
  routing?: string;
  timeout?: string;
  body?: T;
}

interface IlmDeleteLifecycleRequest extends GenericRequest {
  policy: string;
}

interface IlmExplainLifecycleRequest extends GenericRequest {
  index: string;
  only_managed?: boolean;
  only_errors?: boolean;
}

interface IlmGetLifecycleRequest extends GenericRequest {
  policy?: string;
}

interface IlmGetStatusRequest extends GenericRequest {
}

interface IlmMoveToStepRequest<T = RequestBody> extends GenericRequest {
  index: string;
  body?: T;
}

interface IlmPutLifecycleRequest<T = RequestBody> extends GenericRequest {
  policy: string;
  body?: T;
}

interface IlmRemovePolicyRequest extends GenericRequest {
  index: string;
}

interface IlmRetryRequest extends GenericRequest {
  index: string;
}

interface IlmStartRequest extends GenericRequest {
}

interface IlmStopRequest extends GenericRequest {
}

interface IndicesFreezeRequest extends GenericRequest {
  index: string;
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  wait_for_active_shards?: string;
}

interface IndicesReloadSearchAnalyzersRequest extends GenericRequest {
  index: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
}

interface IndicesUnfreezeRequest extends GenericRequest {
  index: string;
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  wait_for_active_shards?: string;
}

interface LicenseDeleteRequest extends GenericRequest {
}

interface LicenseGetRequest extends GenericRequest {
  local?: boolean;
  accept_enterprise?: boolean;
}

interface LicenseGetBasicStatusRequest extends GenericRequest {
}

interface LicenseGetTrialStatusRequest extends GenericRequest {
}

interface LicensePostRequest<T = RequestBody> extends GenericRequest {
  acknowledge?: boolean;
  body?: T;
}

interface LicensePostStartBasicRequest extends GenericRequest {
  acknowledge?: boolean;
}

interface LicensePostStartTrialRequest extends GenericRequest {
  type?: string;
  acknowledge?: boolean;
}

interface MigrationDeprecationsRequest extends GenericRequest {
  index?: string;
}

interface MlCloseJobRequest<T = RequestBody> extends GenericRequest {
  job_id: string;
  allow_no_jobs?: boolean;
  force?: boolean;
  timeout?: string;
  body?: T;
}

interface MlDeleteCalendarRequest extends GenericRequest {
  calendar_id: string;
}

interface MlDeleteCalendarEventRequest extends GenericRequest {
  calendar_id: string;
  event_id: string;
}

interface MlDeleteCalendarJobRequest extends GenericRequest {
  calendar_id: string;
  job_id: string;
}

interface MlDeleteDataFrameAnalyticsRequest extends GenericRequest {
  id: string;
  force?: boolean;
}

interface MlDeleteDatafeedRequest extends GenericRequest {
  datafeed_id: string;
  force?: boolean;
}

interface MlDeleteExpiredDataRequest extends GenericRequest {
}

interface MlDeleteFilterRequest extends GenericRequest {
  filter_id: string;
}

interface MlDeleteForecastRequest extends GenericRequest {
  job_id: string;
  forecast_id?: string;
  allow_no_forecasts?: boolean;
  timeout?: string;
}

interface MlDeleteJobRequest extends GenericRequest {
  job_id: string;
  force?: boolean;
  wait_for_completion?: boolean;
}

interface MlDeleteModelSnapshotRequest extends GenericRequest {
  job_id: string;
  snapshot_id: string;
}

interface MlDeleteTrainedModelRequest extends GenericRequest {
  model_id: string;
}

interface MlEstimateModelMemoryRequest<T = RequestBody> extends GenericRequest {
  body: T;
}

interface MlEvaluateDataFrameRequest<T = RequestBody> extends GenericRequest {
  body: T;
}

interface MlExplainDataFrameAnalyticsRequest<T = RequestBody> extends GenericRequest {
  id?: string;
  body?: T;
}

interface MlFindFileStructureRequest<T = RequestNDBody> extends GenericRequest {
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

interface MlFlushJobRequest<T = RequestBody> extends GenericRequest {
  job_id: string;
  calc_interim?: boolean;
  start?: string;
  end?: string;
  advance_time?: string;
  skip_time?: string;
  body?: T;
}

interface MlForecastRequest extends GenericRequest {
  job_id: string;
  duration?: string;
  expires_in?: string;
}

interface MlGetBucketsRequest<T = RequestBody> extends GenericRequest {
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

interface MlGetCalendarEventsRequest extends GenericRequest {
  calendar_id: string;
  job_id?: string;
  start?: string;
  end?: string;
  from?: number;
  size?: number;
}

interface MlGetCalendarsRequest<T = RequestBody> extends GenericRequest {
  calendar_id?: string;
  from?: number;
  size?: number;
  body?: T;
}

interface MlGetCategoriesRequest<T = RequestBody> extends GenericRequest {
  job_id: string;
  category_id?: number;
  from?: number;
  size?: number;
  body?: T;
}

interface MlGetDataFrameAnalyticsRequest extends GenericRequest {
  id?: string;
  allow_no_match?: boolean;
  from?: number;
  size?: number;
}

interface MlGetDataFrameAnalyticsStatsRequest extends GenericRequest {
  id?: string;
  allow_no_match?: boolean;
  from?: number;
  size?: number;
}

interface MlGetDatafeedStatsRequest extends GenericRequest {
  datafeed_id?: string;
  allow_no_datafeeds?: boolean;
}

interface MlGetDatafeedsRequest extends GenericRequest {
  datafeed_id?: string;
  allow_no_datafeeds?: boolean;
}

interface MlGetFiltersRequest extends GenericRequest {
  filter_id?: string;
  from?: number;
  size?: number;
}

interface MlGetInfluencersRequest<T = RequestBody> extends GenericRequest {
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

interface MlGetJobStatsRequest extends GenericRequest {
  job_id?: string;
  allow_no_jobs?: boolean;
}

interface MlGetJobsRequest extends GenericRequest {
  job_id?: string;
  allow_no_jobs?: boolean;
}

interface MlGetModelSnapshotsRequest<T = RequestBody> extends GenericRequest {
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

interface MlGetOverallBucketsRequest<T = RequestBody> extends GenericRequest {
  job_id: string;
  top_n?: number;
  bucket_span?: string;
  overall_score?: number;
  exclude_interim?: boolean;
  start?: string;
  end?: string;
  allow_no_jobs?: boolean;
  body?: T;
}

interface MlGetRecordsRequest<T = RequestBody> extends GenericRequest {
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

interface MlGetTrainedModelsRequest extends GenericRequest {
  model_id?: string;
  allow_no_match?: boolean;
  include_model_definition?: boolean;
  decompress_definition?: boolean;
  from?: number;
  size?: number;
  tags?: string | string[];
}

interface MlGetTrainedModelsStatsRequest extends GenericRequest {
  model_id?: string;
  allow_no_match?: boolean;
  from?: number;
  size?: number;
}

interface MlInfoRequest extends GenericRequest {
}

interface MlOpenJobRequest extends GenericRequest {
  job_id: string;
}

interface MlPostCalendarEventsRequest<T = RequestBody> extends GenericRequest {
  calendar_id: string;
  body: T;
}

interface MlPostDataRequest<T = RequestBody> extends GenericRequest {
  job_id: string;
  reset_start?: string;
  reset_end?: string;
  body: T;
}

interface MlPreviewDatafeedRequest extends GenericRequest {
  datafeed_id: string;
}

interface MlPutCalendarRequest<T = RequestBody> extends GenericRequest {
  calendar_id: string;
  body?: T;
}

interface MlPutCalendarJobRequest extends GenericRequest {
  calendar_id: string;
  job_id: string;
}

interface MlPutDataFrameAnalyticsRequest<T = RequestBody> extends GenericRequest {
  id: string;
  body: T;
}

interface MlPutDatafeedRequest<T = RequestBody> extends GenericRequest {
  datafeed_id: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  ignore_throttled?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  body: T;
}

interface MlPutFilterRequest<T = RequestBody> extends GenericRequest {
  filter_id: string;
  body: T;
}

interface MlPutJobRequest<T = RequestBody> extends GenericRequest {
  job_id: string;
  body: T;
}

interface MlPutTrainedModelRequest<T = RequestBody> extends GenericRequest {
  model_id: string;
  body: T;
}

interface MlRevertModelSnapshotRequest<T = RequestBody> extends GenericRequest {
  job_id: string;
  snapshot_id: string;
  delete_intervening_results?: boolean;
  body?: T;
}

interface MlSetUpgradeModeRequest extends GenericRequest {
  enabled?: boolean;
  timeout?: string;
}

interface MlStartDataFrameAnalyticsRequest<T = RequestBody> extends GenericRequest {
  id: string;
  timeout?: string;
  body?: T;
}

interface MlStartDatafeedRequest<T = RequestBody> extends GenericRequest {
  datafeed_id: string;
  start?: string;
  end?: string;
  timeout?: string;
  body?: T;
}

interface MlStopDataFrameAnalyticsRequest<T = RequestBody> extends GenericRequest {
  id: string;
  allow_no_match?: boolean;
  force?: boolean;
  timeout?: string;
  body?: T;
}

interface MlStopDatafeedRequest extends GenericRequest {
  datafeed_id: string;
  allow_no_datafeeds?: boolean;
  force?: boolean;
  timeout?: string;
}

interface MlUpdateDatafeedRequest<T = RequestBody> extends GenericRequest {
  datafeed_id: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  ignore_throttled?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'hidden' | 'none' | 'all';
  body: T;
}

interface MlUpdateFilterRequest<T = RequestBody> extends GenericRequest {
  filter_id: string;
  body: T;
}

interface MlUpdateJobRequest<T = RequestBody> extends GenericRequest {
  job_id: string;
  body: T;
}

interface MlUpdateModelSnapshotRequest<T = RequestBody> extends GenericRequest {
  job_id: string;
  snapshot_id: string;
  body: T;
}

interface MlValidateRequest<T = RequestBody> extends GenericRequest {
  body: T;
}

interface MlValidateDetectorRequest<T = RequestBody> extends GenericRequest {
  body: T;
}

interface MonitoringBulkRequest<T = RequestNDBody> extends GenericRequest {
  type?: string;
  system_id?: string;
  system_api_version?: string;
  interval?: string;
  body: T;
}

interface RollupDeleteJobRequest extends GenericRequest {
  id: string;
}

interface RollupGetJobsRequest extends GenericRequest {
  id?: string;
}

interface RollupGetRollupCapsRequest extends GenericRequest {
  id?: string;
}

interface RollupGetRollupIndexCapsRequest extends GenericRequest {
  index: string;
}

interface RollupPutJobRequest<T = RequestBody> extends GenericRequest {
  id: string;
  body: T;
}

interface RollupRollupSearchRequest<T = RequestBody> extends GenericRequest {
  index: string | string[];
  type?: string;
  typed_keys?: boolean;
  rest_total_hits_as_int?: boolean;
  body: T;
}

interface RollupStartJobRequest extends GenericRequest {
  id: string;
}

interface RollupStopJobRequest extends GenericRequest {
  id: string;
  wait_for_completion?: boolean;
  timeout?: string;
}

interface SearchableSnapshotsClearCacheRequest extends GenericRequest {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
}

interface SearchableSnapshotsMountRequest<T = RequestBody> extends GenericRequest {
  repository: string;
  snapshot: string;
  master_timeout?: string;
  wait_for_completion?: boolean;
  body: T;
}

interface SearchableSnapshotsStatsRequest extends GenericRequest {
  index?: string | string[];
}

interface SecurityAuthenticateRequest extends GenericRequest {
}

interface SecurityChangePasswordRequest<T = RequestBody> extends GenericRequest {
  username?: string;
  refresh?: 'true' | 'false' | 'wait_for';
  body: T;
}

interface SecurityClearCachedRealmsRequest extends GenericRequest {
  realms: string | string[];
  usernames?: string | string[];
}

interface SecurityClearCachedRolesRequest extends GenericRequest {
  name: string | string[];
}

interface SecurityCreateApiKeyRequest<T = RequestBody> extends GenericRequest {
  refresh?: 'true' | 'false' | 'wait_for';
  body: T;
}

interface SecurityDeletePrivilegesRequest extends GenericRequest {
  application: string;
  name: string;
  refresh?: 'true' | 'false' | 'wait_for';
}

interface SecurityDeleteRoleRequest extends GenericRequest {
  name: string;
  refresh?: 'true' | 'false' | 'wait_for';
}

interface SecurityDeleteRoleMappingRequest extends GenericRequest {
  name: string;
  refresh?: 'true' | 'false' | 'wait_for';
}

interface SecurityDeleteUserRequest extends GenericRequest {
  username: string;
  refresh?: 'true' | 'false' | 'wait_for';
}

interface SecurityDisableUserRequest extends GenericRequest {
  username: string;
  refresh?: 'true' | 'false' | 'wait_for';
}

interface SecurityEnableUserRequest extends GenericRequest {
  username: string;
  refresh?: 'true' | 'false' | 'wait_for';
}

interface SecurityGetApiKeyRequest extends GenericRequest {
  id?: string;
  name?: string;
  username?: string;
  realm_name?: string;
  owner?: boolean;
}

interface SecurityGetBuiltinPrivilegesRequest extends GenericRequest {
}

interface SecurityGetPrivilegesRequest extends GenericRequest {
  application?: string;
  name?: string;
}

interface SecurityGetRoleRequest extends GenericRequest {
  name?: string;
}

interface SecurityGetRoleMappingRequest extends GenericRequest {
  name?: string;
}

interface SecurityGetTokenRequest<T = RequestBody> extends GenericRequest {
  body: T;
}

interface SecurityGetUserRequest extends GenericRequest {
  username?: string | string[];
}

interface SecurityGetUserPrivilegesRequest extends GenericRequest {
}

interface SecurityHasPrivilegesRequest<T = RequestBody> extends GenericRequest {
  user?: string;
  body: T;
}

interface SecurityInvalidateApiKeyRequest<T = RequestBody> extends GenericRequest {
  body: T;
}

interface SecurityInvalidateTokenRequest<T = RequestBody> extends GenericRequest {
  body: T;
}

interface SecurityPutPrivilegesRequest<T = RequestBody> extends GenericRequest {
  refresh?: 'true' | 'false' | 'wait_for';
  body: T;
}

interface SecurityPutRoleRequest<T = RequestBody> extends GenericRequest {
  name: string;
  refresh?: 'true' | 'false' | 'wait_for';
  body: T;
}

interface SecurityPutRoleMappingRequest<T = RequestBody> extends GenericRequest {
  name: string;
  refresh?: 'true' | 'false' | 'wait_for';
  body: T;
}

interface SecurityPutUserRequest<T = RequestBody> extends GenericRequest {
  username: string;
  refresh?: 'true' | 'false' | 'wait_for';
  body: T;
}

interface SlmDeleteLifecycleRequest extends GenericRequest {
  policy_id: string;
}

interface SlmExecuteLifecycleRequest extends GenericRequest {
  policy_id: string;
}

interface SlmExecuteRetentionRequest extends GenericRequest {
}

interface SlmGetLifecycleRequest extends GenericRequest {
  policy_id?: string | string[];
}

interface SlmGetStatsRequest extends GenericRequest {
}

interface SlmGetStatusRequest extends GenericRequest {
}

interface SlmPutLifecycleRequest<T = RequestBody> extends GenericRequest {
  policy_id: string;
  body?: T;
}

interface SlmStartRequest extends GenericRequest {
}

interface SlmStopRequest extends GenericRequest {
}

interface SqlClearCursorRequest<T = RequestBody> extends GenericRequest {
  body: T;
}

interface SqlQueryRequest<T = RequestBody> extends GenericRequest {
  format?: string;
  body: T;
}

interface SqlTranslateRequest<T = RequestBody> extends GenericRequest {
  body: T;
}

interface SslCertificatesRequest extends GenericRequest {
}

interface TransformDeleteTransformRequest extends GenericRequest {
  transform_id: string;
  force?: boolean;
}

interface TransformGetTransformRequest extends GenericRequest {
  transform_id?: string;
  from?: number;
  size?: number;
  allow_no_match?: boolean;
}

interface TransformGetTransformStatsRequest extends GenericRequest {
  transform_id: string;
  from?: number;
  size?: number;
  allow_no_match?: boolean;
}

interface TransformPreviewTransformRequest<T = RequestBody> extends GenericRequest {
  body: T;
}

interface TransformPutTransformRequest<T = RequestBody> extends GenericRequest {
  transform_id: string;
  defer_validation?: boolean;
  body: T;
}

interface TransformStartTransformRequest extends GenericRequest {
  transform_id: string;
  timeout?: string;
}

interface TransformStopTransformRequest extends GenericRequest {
  transform_id: string;
  force?: boolean;
  wait_for_completion?: boolean;
  timeout?: string;
  allow_no_match?: boolean;
  wait_for_checkpoint?: boolean;
}

interface TransformUpdateTransformRequest<T = RequestBody> extends GenericRequest {
  transform_id: string;
  defer_validation?: boolean;
  body: T;
}

interface WatcherAckWatchRequest extends GenericRequest {
  watch_id: string;
  action_id?: string | string[];
}

interface WatcherActivateWatchRequest extends GenericRequest {
  watch_id: string;
}

interface WatcherDeactivateWatchRequest extends GenericRequest {
  watch_id: string;
}

interface WatcherDeleteWatchRequest extends GenericRequest {
  id: string;
}

interface WatcherExecuteWatchRequest<T = RequestBody> extends GenericRequest {
  id?: string;
  debug?: boolean;
  body?: T;
}

interface WatcherGetWatchRequest extends GenericRequest {
  id: string;
}

interface WatcherPutWatchRequest<T = RequestBody> extends GenericRequest {
  id: string;
  active?: boolean;
  version?: number;
  if_seq_no?: number;
  if_primary_term?: number;
  body?: T;
}

interface WatcherStartRequest extends GenericRequest {
}

interface WatcherStatsRequest extends GenericRequest {
  metric?: string | string[];
  emit_stacktraces?: boolean;
}

interface WatcherStopRequest extends GenericRequest {
}

interface XpackInfoRequest extends GenericRequest {
  categories?: string | string[];
}

interface XpackUsageRequest extends GenericRequest {
  master_timeout?: string;
}

export {
  BulkRequest, CatAliasesRequest, CatAllocationRequest, CatCountRequest,
  CatFielddataRequest, CatHealthRequest, CatHelpRequest, CatIndicesRequest,
  CatMasterRequest, CatNodeattrsRequest, CatNodesRequest, CatPendingTasksRequest,
  CatPluginsRequest, CatRecoveryRequest, CatRepositoriesRequest, CatSegmentsRequest,
  CatShardsRequest, CatSnapshotsRequest, CatTasksRequest, CatTemplatesRequest,
  CatThreadPoolRequest, ClearScrollRequest, ClusterAllocationExplainRequest, ClusterDeleteComponentTemplateRequest,
  ClusterExistsComponentTemplateRequest, ClusterGetComponentTemplateRequest, ClusterGetSettingsRequest, ClusterHealthRequest,
  ClusterPendingTasksRequest, ClusterPutComponentTemplateRequest, ClusterPutSettingsRequest, ClusterRemoteInfoRequest,
  ClusterRerouteRequest, ClusterStateRequest, ClusterStatsRequest, CountRequest,
  CreateRequest, DeleteRequest, DeleteByQueryRequest, DeleteByQueryRethrottleRequest,
  DeleteScriptRequest, ExistsRequest, ExistsSourceRequest, ExplainRequest,
  FieldCapsRequest, GetRequest, GetScriptRequest, GetScriptContextRequest,
  GetScriptLanguagesRequest, GetSourceRequest, IndexRequest, IndicesAnalyzeRequest,
  IndicesClearCacheRequest, IndicesCloneRequest, IndicesCloseRequest, IndicesCreateRequest,
  IndicesCreateDataStreamRequest, IndicesDeleteRequest, IndicesDeleteAliasRequest, IndicesDeleteDataStreamRequest,
  IndicesDeleteIndexTemplateRequest, IndicesDeleteTemplateRequest, IndicesExistsRequest, IndicesExistsAliasRequest,
  IndicesExistsTemplateRequest, IndicesExistsTypeRequest, IndicesFlushRequest, IndicesForcemergeRequest,
  IndicesGetRequest, IndicesGetAliasRequest, IndicesGetDataStreamsRequest, IndicesGetFieldMappingRequest,
  IndicesGetIndexTemplateRequest, IndicesGetMappingRequest, IndicesGetSettingsRequest, IndicesGetTemplateRequest,
  IndicesGetUpgradeRequest, IndicesOpenRequest, IndicesPutAliasRequest, IndicesPutIndexTemplateRequest,
  IndicesPutMappingRequest, IndicesPutSettingsRequest, IndicesPutTemplateRequest, IndicesRecoveryRequest,
  IndicesRefreshRequest, IndicesRolloverRequest, IndicesSegmentsRequest, IndicesShardStoresRequest,
  IndicesShrinkRequest, IndicesSplitRequest, IndicesStatsRequest, IndicesUpdateAliasesRequest,
  IndicesUpgradeRequest, IndicesValidateQueryRequest, InfoRequest, IngestDeletePipelineRequest,
  IngestGetPipelineRequest, IngestProcessorGrokRequest, IngestPutPipelineRequest, IngestSimulateRequest,
  MgetRequest, MsearchRequest, MsearchTemplateRequest, MtermvectorsRequest,
  NodesHotThreadsRequest, NodesInfoRequest, NodesReloadSecureSettingsRequest, NodesStatsRequest,
  NodesUsageRequest, PingRequest, PutScriptRequest, RankEvalRequest,
  ReindexRequest, ReindexRethrottleRequest, RenderSearchTemplateRequest, ScriptsPainlessExecuteRequest,
  ScrollRequest, SearchRequest, SearchShardsRequest, SearchTemplateRequest,
  SnapshotCleanupRepositoryRequest, SnapshotCreateRequest, SnapshotCreateRepositoryRequest, SnapshotDeleteRequest,
  SnapshotDeleteRepositoryRequest, SnapshotGetRequest, SnapshotGetRepositoryRequest, SnapshotRestoreRequest,
  SnapshotStatusRequest, SnapshotVerifyRepositoryRequest, TasksCancelRequest, TasksGetRequest,
  TasksListRequest, TermvectorsRequest, UpdateRequest, UpdateByQueryRequest,
  UpdateByQueryRethrottleRequest, AsyncSearchDeleteRequest, AsyncSearchGetRequest, AsyncSearchSubmitRequest,
  AutoscalingDeleteAutoscalingPolicyRequest, AutoscalingGetAutoscalingDecisionRequest, AutoscalingGetAutoscalingPolicyRequest, AutoscalingPutAutoscalingPolicyRequest,
  CatMlDataFrameAnalyticsRequest, CatMlDatafeedsRequest, CatMlJobsRequest, CatMlTrainedModelsRequest,
  CatTransformsRequest, CcrDeleteAutoFollowPatternRequest, CcrFollowRequest, CcrFollowInfoRequest,
  CcrFollowStatsRequest, CcrForgetFollowerRequest, CcrGetAutoFollowPatternRequest, CcrPauseAutoFollowPatternRequest,
  CcrPauseFollowRequest, CcrPutAutoFollowPatternRequest, CcrResumeAutoFollowPatternRequest, CcrResumeFollowRequest,
  CcrStatsRequest, CcrUnfollowRequest, DataFrameTransformDeprecatedDeleteTransformRequest, DataFrameTransformDeprecatedGetTransformRequest,
  DataFrameTransformDeprecatedGetTransformStatsRequest, DataFrameTransformDeprecatedPreviewTransformRequest, DataFrameTransformDeprecatedPutTransformRequest, DataFrameTransformDeprecatedStartTransformRequest,
  DataFrameTransformDeprecatedStopTransformRequest, DataFrameTransformDeprecatedUpdateTransformRequest, EnrichDeletePolicyRequest, EnrichExecutePolicyRequest,
  EnrichGetPolicyRequest, EnrichPutPolicyRequest, EnrichStatsRequest, EqlSearchRequest,
  GraphExploreRequest, IlmDeleteLifecycleRequest, IlmExplainLifecycleRequest, IlmGetLifecycleRequest,
  IlmGetStatusRequest, IlmMoveToStepRequest, IlmPutLifecycleRequest, IlmRemovePolicyRequest,
  IlmRetryRequest, IlmStartRequest, IlmStopRequest, IndicesFreezeRequest,
  IndicesReloadSearchAnalyzersRequest, IndicesUnfreezeRequest, LicenseDeleteRequest, LicenseGetRequest,
  LicenseGetBasicStatusRequest, LicenseGetTrialStatusRequest, LicensePostRequest, LicensePostStartBasicRequest,
  LicensePostStartTrialRequest, MigrationDeprecationsRequest, MlCloseJobRequest, MlDeleteCalendarRequest,
  MlDeleteCalendarEventRequest, MlDeleteCalendarJobRequest, MlDeleteDataFrameAnalyticsRequest, MlDeleteDatafeedRequest,
  MlDeleteExpiredDataRequest, MlDeleteFilterRequest, MlDeleteForecastRequest, MlDeleteJobRequest,
  MlDeleteModelSnapshotRequest, MlDeleteTrainedModelRequest, MlEstimateModelMemoryRequest, MlEvaluateDataFrameRequest,
  MlExplainDataFrameAnalyticsRequest, MlFindFileStructureRequest, MlFlushJobRequest, MlForecastRequest,
  MlGetBucketsRequest, MlGetCalendarEventsRequest, MlGetCalendarsRequest, MlGetCategoriesRequest,
  MlGetDataFrameAnalyticsRequest, MlGetDataFrameAnalyticsStatsRequest, MlGetDatafeedStatsRequest, MlGetDatafeedsRequest,
  MlGetFiltersRequest, MlGetInfluencersRequest, MlGetJobStatsRequest, MlGetJobsRequest,
  MlGetModelSnapshotsRequest, MlGetOverallBucketsRequest, MlGetRecordsRequest, MlGetTrainedModelsRequest,
  MlGetTrainedModelsStatsRequest, MlInfoRequest, MlOpenJobRequest, MlPostCalendarEventsRequest,
  MlPostDataRequest, MlPreviewDatafeedRequest, MlPutCalendarRequest, MlPutCalendarJobRequest,
  MlPutDataFrameAnalyticsRequest, MlPutDatafeedRequest, MlPutFilterRequest, MlPutJobRequest,
  MlPutTrainedModelRequest, MlRevertModelSnapshotRequest, MlSetUpgradeModeRequest, MlStartDataFrameAnalyticsRequest,
  MlStartDatafeedRequest, MlStopDataFrameAnalyticsRequest, MlStopDatafeedRequest, MlUpdateDatafeedRequest,
  MlUpdateFilterRequest, MlUpdateJobRequest, MlUpdateModelSnapshotRequest, MlValidateRequest,
  MlValidateDetectorRequest, MonitoringBulkRequest, RollupDeleteJobRequest, RollupGetJobsRequest,
  RollupGetRollupCapsRequest, RollupGetRollupIndexCapsRequest, RollupPutJobRequest, RollupRollupSearchRequest,
  RollupStartJobRequest, RollupStopJobRequest, SearchableSnapshotsClearCacheRequest, SearchableSnapshotsMountRequest,
  SearchableSnapshotsStatsRequest, SecurityAuthenticateRequest, SecurityChangePasswordRequest, SecurityClearCachedRealmsRequest,
  SecurityClearCachedRolesRequest, SecurityCreateApiKeyRequest, SecurityDeletePrivilegesRequest, SecurityDeleteRoleRequest,
  SecurityDeleteRoleMappingRequest, SecurityDeleteUserRequest, SecurityDisableUserRequest, SecurityEnableUserRequest,
  SecurityGetApiKeyRequest, SecurityGetBuiltinPrivilegesRequest, SecurityGetPrivilegesRequest, SecurityGetRoleRequest,
  SecurityGetRoleMappingRequest, SecurityGetTokenRequest, SecurityGetUserRequest, SecurityGetUserPrivilegesRequest,
  SecurityHasPrivilegesRequest, SecurityInvalidateApiKeyRequest, SecurityInvalidateTokenRequest, SecurityPutPrivilegesRequest,
  SecurityPutRoleRequest, SecurityPutRoleMappingRequest, SecurityPutUserRequest, SlmDeleteLifecycleRequest,
  SlmExecuteLifecycleRequest, SlmExecuteRetentionRequest, SlmGetLifecycleRequest, SlmGetStatsRequest,
  SlmGetStatusRequest, SlmPutLifecycleRequest, SlmStartRequest, SlmStopRequest,
  SqlClearCursorRequest, SqlQueryRequest, SqlTranslateRequest, SslCertificatesRequest,
  TransformDeleteTransformRequest, TransformGetTransformRequest, TransformGetTransformStatsRequest, TransformPreviewTransformRequest,
  TransformPutTransformRequest, TransformStartTransformRequest, TransformStopTransformRequest, TransformUpdateTransformRequest,
  WatcherAckWatchRequest, WatcherActivateWatchRequest, WatcherDeactivateWatchRequest, WatcherDeleteWatchRequest,
  WatcherExecuteWatchRequest, WatcherGetWatchRequest, WatcherPutWatchRequest, WatcherStartRequest,
  WatcherStatsRequest, WatcherStopRequest, XpackInfoRequest, XpackUsageRequest
}