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
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
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
  repository?: string | string[];
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
  wait_for_no_initializing_shards?: boolean;
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
  body: any;
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
  wait_for_metadata_version?: number;
  wait_for_timeout?: string;
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
  ignore_throttled?: boolean;
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

export interface Create extends Generic {
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
  pipeline?: string;
  body: any;
}

export interface Delete extends Generic {
  id: string;
  index: string;
  type?: string;
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
  slices?: number;
  body: any;
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

export interface Exists extends Generic {
  id: string;
  index: string;
  type?: string;
  stored_fields?: string | string[];
  parent?: string;
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
  type: string;
  parent?: string;
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

export interface Explain extends Generic {
  id: string;
  index: string;
  type?: string;
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
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  body?: any;
}

export interface FieldCaps extends Generic {
  index?: string | string[];
  fields?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
}

export interface Get extends Generic {
  id: string;
  index: string;
  type?: string;
  stored_fields?: string | string[];
  parent?: string;
  preference?: string;
  realtime?: boolean;
  refresh?: boolean;
  routing?: string;
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  _source_exclude?: string | string[];
  _source_include?: string | string[];
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
}

export interface GetScript extends Generic {
  id: string;
  master_timeout?: string;
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
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
}

export interface Index extends Generic {
  id?: string;
  index: string;
  type?: string;
  wait_for_active_shards?: string;
  op_type?: 'index' | 'create';
  parent?: string;
  refresh?: 'true' | 'false' | 'wait_for';
  routing?: string;
  timeout?: string;
  version?: number;
  version_type?: 'internal' | 'external' | 'external_gte' | 'force';
  pipeline?: string;
  body: any;
}

export interface IndicesAnalyze extends Generic {
  index?: string;
  body?: any;
}

export interface IndicesClearCache extends Generic {
  index?: string | string[];
  fielddata?: boolean;
  fields?: string | string[];
  query?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
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
  include_type_name?: string;
  wait_for_active_shards?: string;
  timeout?: string;
  master_timeout?: string;
  body?: any;
}

export interface IndicesDelete extends Generic {
  index: string | string[];
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
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
  name: string | string[];
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
}

export interface IndicesGet extends Generic {
  index: string | string[];
  local?: boolean;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  flat_settings?: boolean;
  include_defaults?: boolean;
  master_timeout?: string;
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
  include_type_name?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  master_timeout?: string;
  local?: boolean;
}

export interface IndicesGetSettings extends Generic {
  index?: string | string[];
  name?: string | string[];
  master_timeout?: string;
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
  wait_for_active_shards?: string;
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
  type?: string;
  include_type_name?: string;
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  body: any;
}

export interface IndicesPutSettings extends Generic {
  index?: string | string[];
  master_timeout?: string;
  timeout?: string;
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
  verbose?: boolean;
}

export interface IndicesShardStores extends Generic {
  index?: string | string[];
  status?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
}

export interface IndicesShrink extends Generic {
  index: string;
  target: string;
  copy_settings?: boolean;
  timeout?: string;
  master_timeout?: string;
  wait_for_active_shards?: string;
  body?: any;
}

export interface IndicesSplit extends Generic {
  index: string;
  target: string;
  copy_settings?: boolean;
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
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  body: any;
}

export interface Msearch extends Generic {
  index?: string | string[];
  type?: string | string[];
  search_type?: 'query_then_fetch' | 'query_and_fetch' | 'dfs_query_then_fetch' | 'dfs_query_and_fetch';
  max_concurrent_searches?: number;
  typed_keys?: boolean;
  pre_filter_shard_size?: number;
  max_concurrent_shard_requests?: number;
  rest_total_hits_as_int?: boolean;
  body: any;
}

export interface MsearchTemplate extends Generic {
  index?: string | string[];
  type?: string | string[];
  search_type?: 'query_then_fetch' | 'query_and_fetch' | 'dfs_query_then_fetch' | 'dfs_query_and_fetch';
  typed_keys?: boolean;
  max_concurrent_searches?: number;
  rest_total_hits_as_int?: boolean;
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

export interface NodesReloadSecureSettings extends Generic {
  node_id?: string | string[];
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

export interface NodesUsage extends Generic {
  metric?: string | string[];
  node_id?: string | string[];
  timeout?: string;
}

export interface Ping extends Generic {
}

export interface PutScript extends Generic {
  id: string;
  context?: string;
  timeout?: string;
  master_timeout?: string;
  body: any;
}

export interface RankEval extends Generic {
  index?: string | string[];
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
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
  task_id: string;
  requests_per_second: number;
}

export interface RenderSearchTemplate extends Generic {
  id?: string;
  body?: any;
}

export interface ScriptsPainlessExecute extends Generic {
  body?: any;
}

export interface Scroll extends Generic {
  scroll_id?: string;
  scroll?: string;
  rest_total_hits_as_int?: boolean;
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
  from?: number;
  ignore_unavailable?: boolean;
  ignore_throttled?: boolean;
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
  request_cache?: boolean;
  batched_reduce_size?: number;
  max_concurrent_shard_requests?: number;
  pre_filter_shard_size?: number;
  rest_total_hits_as_int?: boolean;
  body?: any;
}

export interface SearchShards extends Generic {
  index?: string | string[];
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
  ignore_throttled?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  preference?: string;
  routing?: string | string[];
  scroll?: string;
  search_type?: 'query_then_fetch' | 'query_and_fetch' | 'dfs_query_then_fetch' | 'dfs_query_and_fetch';
  explain?: boolean;
  profile?: boolean;
  typed_keys?: boolean;
  rest_total_hits_as_int?: boolean;
  body: any;
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

export interface TasksCancel extends Generic {
  task_id?: string;
  nodes?: string | string[];
  actions?: string | string[];
  parent_task_id?: string;
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

export interface Termvectors extends Generic {
  index: string;
  type?: string;
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
  type?: string;
  wait_for_active_shards?: string;
  _source?: string | string[];
  _source_excludes?: string | string[];
  _source_includes?: string | string[];
  lang?: string;
  parent?: string;
  refresh?: 'true' | 'false' | 'wait_for';
  retry_on_conflict?: number;
  routing?: string;
  timeout?: string;
  version?: number;
  version_type?: 'internal' | 'force';
  body: any;
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
  slices?: number;
  body?: any;
}

export interface UpdateByQueryRethrottle extends Generic {
  task_id: string;
  requests_per_second: number;
}

export interface CcrDeleteAutoFollowPattern extends Generic {
  name: string;
}

export interface CcrFollow extends Generic {
  index: string;
  body: any;
}

export interface CcrFollowStats extends Generic {
  index?: string | string[];
}

export interface CcrGetAutoFollowPattern extends Generic {
  name?: string;
}

export interface CcrPauseFollow extends Generic {
  index: string;
}

export interface CcrPutAutoFollowPattern extends Generic {
  name: string;
  body: any;
}

export interface CcrResumeFollow extends Generic {
  index: string;
  body: any;
}

export interface CcrStats extends Generic {
}

export interface CcrUnfollow extends Generic {
  index: string;
}

export interface IlmDeleteLifecycle extends Generic {
  policy?: string;
}

export interface IlmExplainLifecycle extends Generic {
  index?: string;
  human?: boolean;
}

export interface IlmGetLifecycle extends Generic {
  policy?: string;
}

export interface IlmGetStatus extends Generic {
}

export interface IlmMoveToStep extends Generic {
  index?: string;
  body?: any;
}

export interface IlmPutLifecycle extends Generic {
  policy?: string;
  body?: any;
}

export interface IlmRemovePolicy extends Generic {
  index?: string;
}

export interface IlmRetry extends Generic {
  index?: string;
}

export interface IlmStart extends Generic {
}

export interface IlmStop extends Generic {
}

export interface IndicesFreeze extends Generic {
  index: string;
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  wait_for_active_shards?: string;
}

export interface IndicesUnfreeze extends Generic {
  index: string;
  timeout?: string;
  master_timeout?: string;
  ignore_unavailable?: boolean;
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  wait_for_active_shards?: string;
}

export interface MlCloseJob extends Generic {
  job_id: string;
  allow_no_jobs?: boolean;
  force?: boolean;
  timeout?: string;
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

export interface MlDeleteDatafeed extends Generic {
  datafeed_id: string;
  force?: boolean;
}

export interface MlDeleteExpiredData extends Generic {
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

export interface MlFindFileStructure extends Generic {
  lines_to_sample?: number;
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
  body: any;
}

export interface MlFlushJob extends Generic {
  job_id: string;
  calc_interim?: boolean;
  start?: string;
  end?: string;
  advance_time?: string;
  skip_time?: string;
  body?: any;
}

export interface MlForecast extends Generic {
  job_id: string;
  duration?: string;
  expires_in?: string;
}

export interface MlGetBuckets extends Generic {
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
  body?: any;
}

export interface MlGetCalendarEvents extends Generic {
  calendar_id: string;
  job_id?: string;
  start?: string;
  end?: string;
  from?: number;
  size?: number;
}

export interface MlGetCalendars extends Generic {
  calendar_id?: string;
  from?: number;
  size?: number;
}

export interface MlGetCategories extends Generic {
  job_id: string;
  category_id?: number;
  from?: number;
  size?: number;
  body?: any;
}

export interface MlGetDatafeedStats extends Generic {
  datafeed_id?: string;
  allow_no_datafeeds?: boolean;
}

export interface MlGetDatafeeds extends Generic {
  datafeed_id?: string;
  allow_no_datafeeds?: boolean;
}

export interface MlGetFilters extends Generic {
  filter_id?: string;
  from?: number;
  size?: number;
}

export interface MlGetInfluencers extends Generic {
  job_id: string;
  exclude_interim?: boolean;
  from?: number;
  size?: number;
  start?: string;
  end?: string;
  influencer_score?: number;
  sort?: string;
  desc?: boolean;
  body?: any;
}

export interface MlGetJobStats extends Generic {
  job_id?: string;
  allow_no_jobs?: boolean;
}

export interface MlGetJobs extends Generic {
  job_id?: string;
  allow_no_jobs?: boolean;
}

export interface MlGetModelSnapshots extends Generic {
  job_id: string;
  snapshot_id?: string;
  from?: number;
  size?: number;
  start?: string;
  end?: string;
  sort?: string;
  desc?: boolean;
  body?: any;
}

export interface MlGetOverallBuckets extends Generic {
  job_id: string;
  top_n?: number;
  bucket_span?: string;
  overall_score?: number;
  exclude_interim?: boolean;
  start?: string;
  end?: string;
  allow_no_jobs?: boolean;
  body?: any;
}

export interface MlGetRecords extends Generic {
  job_id: string;
  exclude_interim?: boolean;
  from?: number;
  size?: number;
  start?: string;
  end?: string;
  record_score?: number;
  sort?: string;
  desc?: boolean;
  body?: any;
}

export interface MlInfo extends Generic {
}

export interface MlOpenJob extends Generic {
  job_id: string;
  ignore_downtime?: boolean;
  timeout?: string;
}

export interface MlPostCalendarEvents extends Generic {
  calendar_id: string;
  body: any;
}

export interface MlPostData extends Generic {
  job_id: string;
  reset_start?: string;
  reset_end?: string;
  body: any;
}

export interface MlPreviewDatafeed extends Generic {
  datafeed_id: string;
}

export interface MlPutCalendar extends Generic {
  calendar_id: string;
  body?: any;
}

export interface MlPutCalendarJob extends Generic {
  calendar_id: string;
  job_id: string;
}

export interface MlPutDatafeed extends Generic {
  datafeed_id: string;
  body: any;
}

export interface MlPutFilter extends Generic {
  filter_id: string;
  body: any;
}

export interface MlPutJob extends Generic {
  job_id: string;
  body: any;
}

export interface MlRevertModelSnapshot extends Generic {
  job_id: string;
  snapshot_id: string;
  delete_intervening_results?: boolean;
  body?: any;
}

export interface MlStartDatafeed extends Generic {
  datafeed_id: string;
  start?: string;
  end?: string;
  timeout?: string;
  body?: any;
}

export interface MlStopDatafeed extends Generic {
  datafeed_id: string;
  allow_no_datafeeds?: boolean;
  force?: boolean;
  timeout?: string;
}

export interface MlUpdateDatafeed extends Generic {
  datafeed_id: string;
  body: any;
}

export interface MlUpdateFilter extends Generic {
  filter_id: string;
  body: any;
}

export interface MlUpdateJob extends Generic {
  job_id: string;
  body: any;
}

export interface MlUpdateModelSnapshot extends Generic {
  job_id: string;
  snapshot_id: string;
  body: any;
}

export interface MlValidate extends Generic {
  body: any;
}

export interface MlValidateDetector extends Generic {
  body: any;
}

export interface MonitoringBulk extends Generic {
  type?: string;
  system_id?: string;
  system_api_version?: string;
  interval?: string;
  body: any;
}

export interface SecurityAuthenticate extends Generic {
}

export interface SecurityChangePassword extends Generic {
  username?: string;
  refresh?: 'true' | 'false' | 'wait_for';
  body: any;
}

export interface SecurityClearCachedRealms extends Generic {
  realms: string | string[];
  usernames?: string | string[];
}

export interface SecurityClearCachedRoles extends Generic {
  name: string | string[];
}

export interface SecurityDeletePrivileges extends Generic {
  application: string;
  name: string;
  refresh?: 'true' | 'false' | 'wait_for';
}

export interface SecurityDeleteRole extends Generic {
  name: string;
  refresh?: 'true' | 'false' | 'wait_for';
}

export interface SecurityDeleteRoleMapping extends Generic {
  name: string;
  refresh?: 'true' | 'false' | 'wait_for';
}

export interface SecurityDeleteUser extends Generic {
  username: string;
  refresh?: 'true' | 'false' | 'wait_for';
}

export interface SecurityDisableUser extends Generic {
  username?: string;
  refresh?: 'true' | 'false' | 'wait_for';
}

export interface SecurityEnableUser extends Generic {
  username?: string;
  refresh?: 'true' | 'false' | 'wait_for';
}

export interface SecurityGetPrivileges extends Generic {
  application?: string;
  name?: string;
}

export interface SecurityGetRole extends Generic {
  name?: string;
}

export interface SecurityGetRoleMapping extends Generic {
  name?: string;
}

export interface SecurityGetToken extends Generic {
  body: any;
}

export interface SecurityGetUser extends Generic {
  username?: string | string[];
}

export interface SecurityGetUserPrivileges extends Generic {
}

export interface SecurityHasPrivileges extends Generic {
  user?: string;
  body: any;
}

export interface SecurityInvalidateToken extends Generic {
  body: any;
}

export interface SecurityPutPrivileges extends Generic {
  refresh?: 'true' | 'false' | 'wait_for';
  body: any;
}

export interface SecurityPutRole extends Generic {
  name: string;
  refresh?: 'true' | 'false' | 'wait_for';
  body: any;
}

export interface SecurityPutRoleMapping extends Generic {
  name: string;
  refresh?: 'true' | 'false' | 'wait_for';
  body: any;
}

export interface SecurityPutUser extends Generic {
  username: string;
  refresh?: 'true' | 'false' | 'wait_for';
  body: any;
}

export interface SslCertificates extends Generic {
}

export interface XpackGraphExplore extends Generic {
  index?: string | string[];
  type?: string | string[];
  routing?: string;
  timeout?: string;
  body?: any;
}

export interface XpackInfo extends Generic {
  categories?: string | string[];
}

export interface XpackLicenseDelete extends Generic {
}

export interface XpackLicenseGet extends Generic {
  local?: boolean;
}

export interface XpackLicenseGetBasicStatus extends Generic {
}

export interface XpackLicenseGetTrialStatus extends Generic {
}

export interface XpackLicensePost extends Generic {
  acknowledge?: boolean;
  body?: any;
}

export interface XpackLicensePostStartBasic extends Generic {
  acknowledge?: boolean;
}

export interface XpackLicensePostStartTrial extends Generic {
  type?: string;
  acknowledge?: boolean;
}

export interface XpackMigrationDeprecations extends Generic {
  index?: string;
}

export interface XpackMigrationGetAssistance extends Generic {
  index?: string | string[];
  allow_no_indices?: boolean;
  expand_wildcards?: 'open' | 'closed' | 'none' | 'all';
  ignore_unavailable?: boolean;
}

export interface XpackMigrationUpgrade extends Generic {
  index: string;
  wait_for_completion?: boolean;
}

export interface XpackRollupDeleteJob extends Generic {
  id: string;
}

export interface XpackRollupGetJobs extends Generic {
  id?: string;
}

export interface XpackRollupGetRollupCaps extends Generic {
  id?: string;
}

export interface XpackRollupGetRollupIndexCaps extends Generic {
  index: string;
}

export interface XpackRollupPutJob extends Generic {
  id: string;
  body: any;
}

export interface XpackRollupRollupSearch extends Generic {
  index: string;
  type?: string;
  typed_keys?: boolean;
  rest_total_hits_as_int?: boolean;
  body: any;
}

export interface XpackRollupStartJob extends Generic {
  id: string;
}

export interface XpackRollupStopJob extends Generic {
  id: string;
  wait_for_completion?: boolean;
  timeout?: string;
}

export interface XpackSqlClearCursor extends Generic {
  body: any;
}

export interface XpackSqlQuery extends Generic {
  format?: string;
  body: any;
}

export interface XpackSqlTranslate extends Generic {
  body: any;
}

export interface XpackUsage extends Generic {
  master_timeout?: string;
}

export interface XpackWatcherAckWatch extends Generic {
  watch_id: string;
  action_id?: string | string[];
}

export interface XpackWatcherActivateWatch extends Generic {
  watch_id: string;
}

export interface XpackWatcherDeactivateWatch extends Generic {
  watch_id: string;
}

export interface XpackWatcherDeleteWatch extends Generic {
  id: string;
}

export interface XpackWatcherExecuteWatch extends Generic {
  id?: string;
  debug?: boolean;
  body?: any;
}

export interface XpackWatcherGetWatch extends Generic {
  id: string;
}

export interface XpackWatcherPutWatch extends Generic {
  id: string;
  active?: boolean;
  version?: number;
  body?: any;
}

export interface XpackWatcherStart extends Generic {
}

export interface XpackWatcherStats extends Generic {
  metric?: '_all' | 'queued_watches' | 'current_watches' | 'pending_watches';
  emit_stacktraces?: boolean;
}

export interface XpackWatcherStop extends Generic {
}
