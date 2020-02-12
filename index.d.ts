// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

/// <reference types="node" />

import { EventEmitter } from 'events';
import { ConnectionOptions as TlsConnectionOptions } from 'tls';
import Transport, {
  ApiResponse,
  RequestEvent,
  TransportRequestParams,
  TransportRequestOptions,
  nodeFilterFn,
  nodeSelectorFn,
  generateRequestIdFn,
  TransportRequestCallback
} from './lib/Transport';
import { URL } from 'url';
import Connection, { AgentOptions, agentFn } from './lib/Connection';
import { ConnectionPool, ResurrectEvent, BasicAuth, ApiKeyAuth } from './lib/pool';
import Serializer from './lib/Serializer';
import * as RequestParams from './api/requestParams';
import * as errors from './lib/errors';

declare type anyObject = {
  [key: string]: any;
};

declare type callbackFn<T> = (err: Error | null, result: ApiResponse<T>) => void;

interface ApiMethod<TParams, TBody = any> {
  // Promise API
  (): Promise<ApiResponse<TBody>>;
  (params: TParams): Promise<ApiResponse<TBody>>;
  (params: TParams, options: TransportRequestOptions): Promise<ApiResponse<TBody>>;
  // Callback API
  (callback: callbackFn<TBody>): TransportRequestCallback;
  (params: TParams, callback: callbackFn<TBody>): TransportRequestCallback;
  (params: TParams, options: TransportRequestOptions, callback: callbackFn<TBody>): TransportRequestCallback;
}

// Extend API
interface ClientExtendsCallbackOptions {
  ConfigurationError: errors.ConfigurationError,
  makeRequest(params: TransportRequestParams, options?: TransportRequestOptions): Promise<void> | void;
  result: {
    body: null,
    statusCode: null,
    headers: null,
    warnings: null
  }
}
declare type extendsCallback = (options: ClientExtendsCallbackOptions) => any;
interface ClientExtends {
  (method: string, fn: extendsCallback): void;
  (method: string, opts: { force: boolean }, fn: extendsCallback): void;
}
// /Extend API

interface NodeOptions {
  url: URL;
  id?: string;
  agent?: AgentOptions;
  ssl?: TlsConnectionOptions;
  headers?: anyObject;
  roles?: {
    master: boolean;
    data: boolean;
    ingest: boolean;
    ml: boolean;
  }
}

interface ClientOptions {
  node?: string | string[] | NodeOptions | NodeOptions[];
  nodes?: string | string[];
  Connection?: typeof Connection;
  ConnectionPool?: typeof ConnectionPool;
  Transport?: typeof Transport;
  Serializer?: typeof Serializer;
  maxRetries?: number;
  requestTimeout?: number;
  pingTimeout?: number;
  sniffInterval?: number | boolean;
  sniffOnStart?: boolean;
  sniffEndpoint?: string;
  sniffOnConnectionFault?: boolean;
  resurrectStrategy?: 'ping' | 'optimistic' | 'none';
  suggestCompression?: boolean;
  compression?: 'gzip';
  ssl?: TlsConnectionOptions;
  agent?: AgentOptions | agentFn;
  nodeFilter?: nodeFilterFn;
  nodeSelector?: nodeSelectorFn | string;
  headers?: anyObject;
  opaqueIdPrefix?: string;
  generateRequestId?: generateRequestIdFn;
  name?: string;
  auth?: BasicAuth | ApiKeyAuth;
  cloud?: {
    id: string;
    // TODO: remove username and password here in 8
    username?: string;
    password?: string;
  }
}

declare class Client extends EventEmitter {
  constructor(opts?: ClientOptions);
  connectionPool: ConnectionPool;
  transport: Transport;
  serializer: Serializer;
  extend: ClientExtends;
  child(opts?: ClientOptions): Client;
  close(callback?: Function): Promise<void> | void;
  /* GENERATED */
  bulk: ApiMethod<RequestParams.Bulk>
  cat: {
    aliases: ApiMethod<RequestParams.CatAliases>
    allocation: ApiMethod<RequestParams.CatAllocation>
    count: ApiMethod<RequestParams.CatCount>
    fielddata: ApiMethod<RequestParams.CatFielddata>
    health: ApiMethod<RequestParams.CatHealth>
    help: ApiMethod<RequestParams.CatHelp>
    indices: ApiMethod<RequestParams.CatIndices>
    master: ApiMethod<RequestParams.CatMaster>
    nodeattrs: ApiMethod<RequestParams.CatNodeattrs>
    nodes: ApiMethod<RequestParams.CatNodes>
    pending_tasks: ApiMethod<RequestParams.CatPendingTasks>
    pendingTasks: ApiMethod<RequestParams.CatPendingTasks>
    plugins: ApiMethod<RequestParams.CatPlugins>
    recovery: ApiMethod<RequestParams.CatRecovery>
    repositories: ApiMethod<RequestParams.CatRepositories>
    segments: ApiMethod<RequestParams.CatSegments>
    shards: ApiMethod<RequestParams.CatShards>
    snapshots: ApiMethod<RequestParams.CatSnapshots>
    tasks: ApiMethod<RequestParams.CatTasks>
    templates: ApiMethod<RequestParams.CatTemplates>
    thread_pool: ApiMethod<RequestParams.CatThreadPool>
    threadPool: ApiMethod<RequestParams.CatThreadPool>
  }
  ccr: {
    delete_auto_follow_pattern: ApiMethod<RequestParams.CcrDeleteAutoFollowPattern>
    deleteAutoFollowPattern: ApiMethod<RequestParams.CcrDeleteAutoFollowPattern>
    follow: ApiMethod<RequestParams.CcrFollow>
    follow_info: ApiMethod<RequestParams.CcrFollowInfo>
    followInfo: ApiMethod<RequestParams.CcrFollowInfo>
    follow_stats: ApiMethod<RequestParams.CcrFollowStats>
    followStats: ApiMethod<RequestParams.CcrFollowStats>
    forget_follower: ApiMethod<RequestParams.CcrForgetFollower>
    forgetFollower: ApiMethod<RequestParams.CcrForgetFollower>
    get_auto_follow_pattern: ApiMethod<RequestParams.CcrGetAutoFollowPattern>
    getAutoFollowPattern: ApiMethod<RequestParams.CcrGetAutoFollowPattern>
    pause_auto_follow_pattern: ApiMethod<RequestParams.CcrPauseAutoFollowPattern>
    pauseAutoFollowPattern: ApiMethod<RequestParams.CcrPauseAutoFollowPattern>
    pause_follow: ApiMethod<RequestParams.CcrPauseFollow>
    pauseFollow: ApiMethod<RequestParams.CcrPauseFollow>
    put_auto_follow_pattern: ApiMethod<RequestParams.CcrPutAutoFollowPattern>
    putAutoFollowPattern: ApiMethod<RequestParams.CcrPutAutoFollowPattern>
    resume_auto_follow_pattern: ApiMethod<RequestParams.CcrResumeAutoFollowPattern>
    resumeAutoFollowPattern: ApiMethod<RequestParams.CcrResumeAutoFollowPattern>
    resume_follow: ApiMethod<RequestParams.CcrResumeFollow>
    resumeFollow: ApiMethod<RequestParams.CcrResumeFollow>
    stats: ApiMethod<RequestParams.CcrStats>
    unfollow: ApiMethod<RequestParams.CcrUnfollow>
  }
  clear_scroll: ApiMethod<RequestParams.ClearScroll>
  clearScroll: ApiMethod<RequestParams.ClearScroll>
  cluster: {
    allocation_explain: ApiMethod<RequestParams.ClusterAllocationExplain>
    allocationExplain: ApiMethod<RequestParams.ClusterAllocationExplain>
    get_settings: ApiMethod<RequestParams.ClusterGetSettings>
    getSettings: ApiMethod<RequestParams.ClusterGetSettings>
    health: ApiMethod<RequestParams.ClusterHealth>
    pending_tasks: ApiMethod<RequestParams.ClusterPendingTasks>
    pendingTasks: ApiMethod<RequestParams.ClusterPendingTasks>
    put_settings: ApiMethod<RequestParams.ClusterPutSettings>
    putSettings: ApiMethod<RequestParams.ClusterPutSettings>
    remote_info: ApiMethod<RequestParams.ClusterRemoteInfo>
    remoteInfo: ApiMethod<RequestParams.ClusterRemoteInfo>
    reroute: ApiMethod<RequestParams.ClusterReroute>
    state: ApiMethod<RequestParams.ClusterState>
    stats: ApiMethod<RequestParams.ClusterStats>
  }
  count: ApiMethod<RequestParams.Count>
  create: ApiMethod<RequestParams.Create>
  delete: ApiMethod<RequestParams.Delete>
  delete_by_query: ApiMethod<RequestParams.DeleteByQuery>
  deleteByQuery: ApiMethod<RequestParams.DeleteByQuery>
  delete_by_query_rethrottle: ApiMethod<RequestParams.DeleteByQueryRethrottle>
  deleteByQueryRethrottle: ApiMethod<RequestParams.DeleteByQueryRethrottle>
  delete_script: ApiMethod<RequestParams.DeleteScript>
  deleteScript: ApiMethod<RequestParams.DeleteScript>
  enrich: {
    delete_policy: ApiMethod<RequestParams.EnrichDeletePolicy>
    deletePolicy: ApiMethod<RequestParams.EnrichDeletePolicy>
    execute_policy: ApiMethod<RequestParams.EnrichExecutePolicy>
    executePolicy: ApiMethod<RequestParams.EnrichExecutePolicy>
    get_policy: ApiMethod<RequestParams.EnrichGetPolicy>
    getPolicy: ApiMethod<RequestParams.EnrichGetPolicy>
    put_policy: ApiMethod<RequestParams.EnrichPutPolicy>
    putPolicy: ApiMethod<RequestParams.EnrichPutPolicy>
    stats: ApiMethod<RequestParams.EnrichStats>
  }
  exists: ApiMethod<RequestParams.Exists>
  exists_source: ApiMethod<RequestParams.ExistsSource>
  existsSource: ApiMethod<RequestParams.ExistsSource>
  explain: ApiMethod<RequestParams.Explain>
  field_caps: ApiMethod<RequestParams.FieldCaps>
  fieldCaps: ApiMethod<RequestParams.FieldCaps>
  get: ApiMethod<RequestParams.Get>
  get_script: ApiMethod<RequestParams.GetScript>
  getScript: ApiMethod<RequestParams.GetScript>
  get_script_context: ApiMethod<RequestParams.GetScriptContext>
  getScriptContext: ApiMethod<RequestParams.GetScriptContext>
  get_script_languages: ApiMethod<RequestParams.GetScriptLanguages>
  getScriptLanguages: ApiMethod<RequestParams.GetScriptLanguages>
  get_source: ApiMethod<RequestParams.GetSource>
  getSource: ApiMethod<RequestParams.GetSource>
  graph: {
    explore: ApiMethod<RequestParams.GraphExplore>
  }
  ilm: {
    delete_lifecycle: ApiMethod<RequestParams.IlmDeleteLifecycle>
    deleteLifecycle: ApiMethod<RequestParams.IlmDeleteLifecycle>
    explain_lifecycle: ApiMethod<RequestParams.IlmExplainLifecycle>
    explainLifecycle: ApiMethod<RequestParams.IlmExplainLifecycle>
    get_lifecycle: ApiMethod<RequestParams.IlmGetLifecycle>
    getLifecycle: ApiMethod<RequestParams.IlmGetLifecycle>
    get_status: ApiMethod<RequestParams.IlmGetStatus>
    getStatus: ApiMethod<RequestParams.IlmGetStatus>
    move_to_step: ApiMethod<RequestParams.IlmMoveToStep>
    moveToStep: ApiMethod<RequestParams.IlmMoveToStep>
    put_lifecycle: ApiMethod<RequestParams.IlmPutLifecycle>
    putLifecycle: ApiMethod<RequestParams.IlmPutLifecycle>
    remove_policy: ApiMethod<RequestParams.IlmRemovePolicy>
    removePolicy: ApiMethod<RequestParams.IlmRemovePolicy>
    retry: ApiMethod<RequestParams.IlmRetry>
    start: ApiMethod<RequestParams.IlmStart>
    stop: ApiMethod<RequestParams.IlmStop>
  }
  index: ApiMethod<RequestParams.Index>
  indices: {
    analyze: ApiMethod<RequestParams.IndicesAnalyze>
    clear_cache: ApiMethod<RequestParams.IndicesClearCache>
    clearCache: ApiMethod<RequestParams.IndicesClearCache>
    clone: ApiMethod<RequestParams.IndicesClone>
    close: ApiMethod<RequestParams.IndicesClose>
    create: ApiMethod<RequestParams.IndicesCreate>
    delete: ApiMethod<RequestParams.IndicesDelete>
    delete_alias: ApiMethod<RequestParams.IndicesDeleteAlias>
    deleteAlias: ApiMethod<RequestParams.IndicesDeleteAlias>
    delete_template: ApiMethod<RequestParams.IndicesDeleteTemplate>
    deleteTemplate: ApiMethod<RequestParams.IndicesDeleteTemplate>
    exists: ApiMethod<RequestParams.IndicesExists>
    exists_alias: ApiMethod<RequestParams.IndicesExistsAlias>
    existsAlias: ApiMethod<RequestParams.IndicesExistsAlias>
    exists_template: ApiMethod<RequestParams.IndicesExistsTemplate>
    existsTemplate: ApiMethod<RequestParams.IndicesExistsTemplate>
    exists_type: ApiMethod<RequestParams.IndicesExistsType>
    existsType: ApiMethod<RequestParams.IndicesExistsType>
    flush: ApiMethod<RequestParams.IndicesFlush>
    flush_synced: ApiMethod<RequestParams.IndicesFlushSynced>
    flushSynced: ApiMethod<RequestParams.IndicesFlushSynced>
    forcemerge: ApiMethod<RequestParams.IndicesForcemerge>
    freeze: ApiMethod<RequestParams.IndicesFreeze>
    get: ApiMethod<RequestParams.IndicesGet>
    get_alias: ApiMethod<RequestParams.IndicesGetAlias>
    getAlias: ApiMethod<RequestParams.IndicesGetAlias>
    get_field_mapping: ApiMethod<RequestParams.IndicesGetFieldMapping>
    getFieldMapping: ApiMethod<RequestParams.IndicesGetFieldMapping>
    get_mapping: ApiMethod<RequestParams.IndicesGetMapping>
    getMapping: ApiMethod<RequestParams.IndicesGetMapping>
    get_settings: ApiMethod<RequestParams.IndicesGetSettings>
    getSettings: ApiMethod<RequestParams.IndicesGetSettings>
    get_template: ApiMethod<RequestParams.IndicesGetTemplate>
    getTemplate: ApiMethod<RequestParams.IndicesGetTemplate>
    get_upgrade: ApiMethod<RequestParams.IndicesGetUpgrade>
    getUpgrade: ApiMethod<RequestParams.IndicesGetUpgrade>
    open: ApiMethod<RequestParams.IndicesOpen>
    put_alias: ApiMethod<RequestParams.IndicesPutAlias>
    putAlias: ApiMethod<RequestParams.IndicesPutAlias>
    put_mapping: ApiMethod<RequestParams.IndicesPutMapping>
    putMapping: ApiMethod<RequestParams.IndicesPutMapping>
    put_settings: ApiMethod<RequestParams.IndicesPutSettings>
    putSettings: ApiMethod<RequestParams.IndicesPutSettings>
    put_template: ApiMethod<RequestParams.IndicesPutTemplate>
    putTemplate: ApiMethod<RequestParams.IndicesPutTemplate>
    recovery: ApiMethod<RequestParams.IndicesRecovery>
    refresh: ApiMethod<RequestParams.IndicesRefresh>
    reload_search_analyzers: ApiMethod<RequestParams.IndicesReloadSearchAnalyzers>
    reloadSearchAnalyzers: ApiMethod<RequestParams.IndicesReloadSearchAnalyzers>
    rollover: ApiMethod<RequestParams.IndicesRollover>
    segments: ApiMethod<RequestParams.IndicesSegments>
    shard_stores: ApiMethod<RequestParams.IndicesShardStores>
    shardStores: ApiMethod<RequestParams.IndicesShardStores>
    shrink: ApiMethod<RequestParams.IndicesShrink>
    split: ApiMethod<RequestParams.IndicesSplit>
    stats: ApiMethod<RequestParams.IndicesStats>
    unfreeze: ApiMethod<RequestParams.IndicesUnfreeze>
    update_aliases: ApiMethod<RequestParams.IndicesUpdateAliases>
    updateAliases: ApiMethod<RequestParams.IndicesUpdateAliases>
    upgrade: ApiMethod<RequestParams.IndicesUpgrade>
    validate_query: ApiMethod<RequestParams.IndicesValidateQuery>
    validateQuery: ApiMethod<RequestParams.IndicesValidateQuery>
  }
  info: ApiMethod<RequestParams.Info>
  ingest: {
    delete_pipeline: ApiMethod<RequestParams.IngestDeletePipeline>
    deletePipeline: ApiMethod<RequestParams.IngestDeletePipeline>
    get_pipeline: ApiMethod<RequestParams.IngestGetPipeline>
    getPipeline: ApiMethod<RequestParams.IngestGetPipeline>
    processor_grok: ApiMethod<RequestParams.IngestProcessorGrok>
    processorGrok: ApiMethod<RequestParams.IngestProcessorGrok>
    put_pipeline: ApiMethod<RequestParams.IngestPutPipeline>
    putPipeline: ApiMethod<RequestParams.IngestPutPipeline>
    simulate: ApiMethod<RequestParams.IngestSimulate>
  }
  license: {
    delete: ApiMethod<RequestParams.LicenseDelete>
    get: ApiMethod<RequestParams.LicenseGet>
    get_basic_status: ApiMethod<RequestParams.LicenseGetBasicStatus>
    getBasicStatus: ApiMethod<RequestParams.LicenseGetBasicStatus>
    get_trial_status: ApiMethod<RequestParams.LicenseGetTrialStatus>
    getTrialStatus: ApiMethod<RequestParams.LicenseGetTrialStatus>
    post: ApiMethod<RequestParams.LicensePost>
    post_start_basic: ApiMethod<RequestParams.LicensePostStartBasic>
    postStartBasic: ApiMethod<RequestParams.LicensePostStartBasic>
    post_start_trial: ApiMethod<RequestParams.LicensePostStartTrial>
    postStartTrial: ApiMethod<RequestParams.LicensePostStartTrial>
  }
  mget: ApiMethod<RequestParams.Mget>
  migration: {
    deprecations: ApiMethod<RequestParams.MigrationDeprecations>
  }
  ml: {
    close_job: ApiMethod<RequestParams.MlCloseJob>
    closeJob: ApiMethod<RequestParams.MlCloseJob>
    delete_calendar: ApiMethod<RequestParams.MlDeleteCalendar>
    deleteCalendar: ApiMethod<RequestParams.MlDeleteCalendar>
    delete_calendar_event: ApiMethod<RequestParams.MlDeleteCalendarEvent>
    deleteCalendarEvent: ApiMethod<RequestParams.MlDeleteCalendarEvent>
    delete_calendar_job: ApiMethod<RequestParams.MlDeleteCalendarJob>
    deleteCalendarJob: ApiMethod<RequestParams.MlDeleteCalendarJob>
    delete_data_frame_analytics: ApiMethod<RequestParams.MlDeleteDataFrameAnalytics>
    deleteDataFrameAnalytics: ApiMethod<RequestParams.MlDeleteDataFrameAnalytics>
    delete_datafeed: ApiMethod<RequestParams.MlDeleteDatafeed>
    deleteDatafeed: ApiMethod<RequestParams.MlDeleteDatafeed>
    delete_expired_data: ApiMethod<RequestParams.MlDeleteExpiredData>
    deleteExpiredData: ApiMethod<RequestParams.MlDeleteExpiredData>
    delete_filter: ApiMethod<RequestParams.MlDeleteFilter>
    deleteFilter: ApiMethod<RequestParams.MlDeleteFilter>
    delete_forecast: ApiMethod<RequestParams.MlDeleteForecast>
    deleteForecast: ApiMethod<RequestParams.MlDeleteForecast>
    delete_job: ApiMethod<RequestParams.MlDeleteJob>
    deleteJob: ApiMethod<RequestParams.MlDeleteJob>
    delete_model_snapshot: ApiMethod<RequestParams.MlDeleteModelSnapshot>
    deleteModelSnapshot: ApiMethod<RequestParams.MlDeleteModelSnapshot>
    delete_trained_model: ApiMethod<RequestParams.MlDeleteTrainedModel>
    deleteTrainedModel: ApiMethod<RequestParams.MlDeleteTrainedModel>
    evaluate_data_frame: ApiMethod<RequestParams.MlEvaluateDataFrame>
    evaluateDataFrame: ApiMethod<RequestParams.MlEvaluateDataFrame>
    explain_data_frame_analytics: ApiMethod<RequestParams.MlExplainDataFrameAnalytics>
    explainDataFrameAnalytics: ApiMethod<RequestParams.MlExplainDataFrameAnalytics>
    find_file_structure: ApiMethod<RequestParams.MlFindFileStructure>
    findFileStructure: ApiMethod<RequestParams.MlFindFileStructure>
    flush_job: ApiMethod<RequestParams.MlFlushJob>
    flushJob: ApiMethod<RequestParams.MlFlushJob>
    forecast: ApiMethod<RequestParams.MlForecast>
    get_buckets: ApiMethod<RequestParams.MlGetBuckets>
    getBuckets: ApiMethod<RequestParams.MlGetBuckets>
    get_calendar_events: ApiMethod<RequestParams.MlGetCalendarEvents>
    getCalendarEvents: ApiMethod<RequestParams.MlGetCalendarEvents>
    get_calendars: ApiMethod<RequestParams.MlGetCalendars>
    getCalendars: ApiMethod<RequestParams.MlGetCalendars>
    get_categories: ApiMethod<RequestParams.MlGetCategories>
    getCategories: ApiMethod<RequestParams.MlGetCategories>
    get_data_frame_analytics: ApiMethod<RequestParams.MlGetDataFrameAnalytics>
    getDataFrameAnalytics: ApiMethod<RequestParams.MlGetDataFrameAnalytics>
    get_data_frame_analytics_stats: ApiMethod<RequestParams.MlGetDataFrameAnalyticsStats>
    getDataFrameAnalyticsStats: ApiMethod<RequestParams.MlGetDataFrameAnalyticsStats>
    get_datafeed_stats: ApiMethod<RequestParams.MlGetDatafeedStats>
    getDatafeedStats: ApiMethod<RequestParams.MlGetDatafeedStats>
    get_datafeeds: ApiMethod<RequestParams.MlGetDatafeeds>
    getDatafeeds: ApiMethod<RequestParams.MlGetDatafeeds>
    get_filters: ApiMethod<RequestParams.MlGetFilters>
    getFilters: ApiMethod<RequestParams.MlGetFilters>
    get_influencers: ApiMethod<RequestParams.MlGetInfluencers>
    getInfluencers: ApiMethod<RequestParams.MlGetInfluencers>
    get_job_stats: ApiMethod<RequestParams.MlGetJobStats>
    getJobStats: ApiMethod<RequestParams.MlGetJobStats>
    get_jobs: ApiMethod<RequestParams.MlGetJobs>
    getJobs: ApiMethod<RequestParams.MlGetJobs>
    get_model_snapshots: ApiMethod<RequestParams.MlGetModelSnapshots>
    getModelSnapshots: ApiMethod<RequestParams.MlGetModelSnapshots>
    get_overall_buckets: ApiMethod<RequestParams.MlGetOverallBuckets>
    getOverallBuckets: ApiMethod<RequestParams.MlGetOverallBuckets>
    get_records: ApiMethod<RequestParams.MlGetRecords>
    getRecords: ApiMethod<RequestParams.MlGetRecords>
    get_trained_models: ApiMethod<RequestParams.MlGetTrainedModels>
    getTrainedModels: ApiMethod<RequestParams.MlGetTrainedModels>
    get_trained_models_stats: ApiMethod<RequestParams.MlGetTrainedModelsStats>
    getTrainedModelsStats: ApiMethod<RequestParams.MlGetTrainedModelsStats>
    info: ApiMethod<RequestParams.MlInfo>
    open_job: ApiMethod<RequestParams.MlOpenJob>
    openJob: ApiMethod<RequestParams.MlOpenJob>
    post_calendar_events: ApiMethod<RequestParams.MlPostCalendarEvents>
    postCalendarEvents: ApiMethod<RequestParams.MlPostCalendarEvents>
    post_data: ApiMethod<RequestParams.MlPostData>
    postData: ApiMethod<RequestParams.MlPostData>
    preview_datafeed: ApiMethod<RequestParams.MlPreviewDatafeed>
    previewDatafeed: ApiMethod<RequestParams.MlPreviewDatafeed>
    put_calendar: ApiMethod<RequestParams.MlPutCalendar>
    putCalendar: ApiMethod<RequestParams.MlPutCalendar>
    put_calendar_job: ApiMethod<RequestParams.MlPutCalendarJob>
    putCalendarJob: ApiMethod<RequestParams.MlPutCalendarJob>
    put_data_frame_analytics: ApiMethod<RequestParams.MlPutDataFrameAnalytics>
    putDataFrameAnalytics: ApiMethod<RequestParams.MlPutDataFrameAnalytics>
    put_datafeed: ApiMethod<RequestParams.MlPutDatafeed>
    putDatafeed: ApiMethod<RequestParams.MlPutDatafeed>
    put_filter: ApiMethod<RequestParams.MlPutFilter>
    putFilter: ApiMethod<RequestParams.MlPutFilter>
    put_job: ApiMethod<RequestParams.MlPutJob>
    putJob: ApiMethod<RequestParams.MlPutJob>
    put_trained_model: ApiMethod<RequestParams.MlPutTrainedModel>
    putTrainedModel: ApiMethod<RequestParams.MlPutTrainedModel>
    revert_model_snapshot: ApiMethod<RequestParams.MlRevertModelSnapshot>
    revertModelSnapshot: ApiMethod<RequestParams.MlRevertModelSnapshot>
    set_upgrade_mode: ApiMethod<RequestParams.MlSetUpgradeMode>
    setUpgradeMode: ApiMethod<RequestParams.MlSetUpgradeMode>
    start_data_frame_analytics: ApiMethod<RequestParams.MlStartDataFrameAnalytics>
    startDataFrameAnalytics: ApiMethod<RequestParams.MlStartDataFrameAnalytics>
    start_datafeed: ApiMethod<RequestParams.MlStartDatafeed>
    startDatafeed: ApiMethod<RequestParams.MlStartDatafeed>
    stop_data_frame_analytics: ApiMethod<RequestParams.MlStopDataFrameAnalytics>
    stopDataFrameAnalytics: ApiMethod<RequestParams.MlStopDataFrameAnalytics>
    stop_datafeed: ApiMethod<RequestParams.MlStopDatafeed>
    stopDatafeed: ApiMethod<RequestParams.MlStopDatafeed>
    update_datafeed: ApiMethod<RequestParams.MlUpdateDatafeed>
    updateDatafeed: ApiMethod<RequestParams.MlUpdateDatafeed>
    update_filter: ApiMethod<RequestParams.MlUpdateFilter>
    updateFilter: ApiMethod<RequestParams.MlUpdateFilter>
    update_job: ApiMethod<RequestParams.MlUpdateJob>
    updateJob: ApiMethod<RequestParams.MlUpdateJob>
    update_model_snapshot: ApiMethod<RequestParams.MlUpdateModelSnapshot>
    updateModelSnapshot: ApiMethod<RequestParams.MlUpdateModelSnapshot>
    validate: ApiMethod<RequestParams.MlValidate>
    validate_detector: ApiMethod<RequestParams.MlValidateDetector>
    validateDetector: ApiMethod<RequestParams.MlValidateDetector>
  }
  monitoring: {
    bulk: ApiMethod<RequestParams.MonitoringBulk>
  }
  msearch: ApiMethod<RequestParams.Msearch>
  msearch_template: ApiMethod<RequestParams.MsearchTemplate>
  msearchTemplate: ApiMethod<RequestParams.MsearchTemplate>
  mtermvectors: ApiMethod<RequestParams.Mtermvectors>
  nodes: {
    hot_threads: ApiMethod<RequestParams.NodesHotThreads>
    hotThreads: ApiMethod<RequestParams.NodesHotThreads>
    info: ApiMethod<RequestParams.NodesInfo>
    reload_secure_settings: ApiMethod<RequestParams.NodesReloadSecureSettings>
    reloadSecureSettings: ApiMethod<RequestParams.NodesReloadSecureSettings>
    stats: ApiMethod<RequestParams.NodesStats>
    usage: ApiMethod<RequestParams.NodesUsage>
  }
  ping: ApiMethod<RequestParams.Ping>
  put_script: ApiMethod<RequestParams.PutScript>
  putScript: ApiMethod<RequestParams.PutScript>
  rank_eval: ApiMethod<RequestParams.RankEval>
  rankEval: ApiMethod<RequestParams.RankEval>
  reindex: ApiMethod<RequestParams.Reindex>
  reindex_rethrottle: ApiMethod<RequestParams.ReindexRethrottle>
  reindexRethrottle: ApiMethod<RequestParams.ReindexRethrottle>
  render_search_template: ApiMethod<RequestParams.RenderSearchTemplate>
  renderSearchTemplate: ApiMethod<RequestParams.RenderSearchTemplate>
  rollup: {
    delete_job: ApiMethod<RequestParams.RollupDeleteJob>
    deleteJob: ApiMethod<RequestParams.RollupDeleteJob>
    get_jobs: ApiMethod<RequestParams.RollupGetJobs>
    getJobs: ApiMethod<RequestParams.RollupGetJobs>
    get_rollup_caps: ApiMethod<RequestParams.RollupGetRollupCaps>
    getRollupCaps: ApiMethod<RequestParams.RollupGetRollupCaps>
    get_rollup_index_caps: ApiMethod<RequestParams.RollupGetRollupIndexCaps>
    getRollupIndexCaps: ApiMethod<RequestParams.RollupGetRollupIndexCaps>
    put_job: ApiMethod<RequestParams.RollupPutJob>
    putJob: ApiMethod<RequestParams.RollupPutJob>
    rollup_search: ApiMethod<RequestParams.RollupRollupSearch>
    rollupSearch: ApiMethod<RequestParams.RollupRollupSearch>
    start_job: ApiMethod<RequestParams.RollupStartJob>
    startJob: ApiMethod<RequestParams.RollupStartJob>
    stop_job: ApiMethod<RequestParams.RollupStopJob>
    stopJob: ApiMethod<RequestParams.RollupStopJob>
  }
  scripts_painless_execute: ApiMethod<RequestParams.ScriptsPainlessExecute>
  scriptsPainlessExecute: ApiMethod<RequestParams.ScriptsPainlessExecute>
  scroll: ApiMethod<RequestParams.Scroll>
  search: ApiMethod<RequestParams.Search>
  search_shards: ApiMethod<RequestParams.SearchShards>
  searchShards: ApiMethod<RequestParams.SearchShards>
  search_template: ApiMethod<RequestParams.SearchTemplate>
  searchTemplate: ApiMethod<RequestParams.SearchTemplate>
  security: {
    authenticate: ApiMethod<RequestParams.SecurityAuthenticate>
    change_password: ApiMethod<RequestParams.SecurityChangePassword>
    changePassword: ApiMethod<RequestParams.SecurityChangePassword>
    clear_cached_realms: ApiMethod<RequestParams.SecurityClearCachedRealms>
    clearCachedRealms: ApiMethod<RequestParams.SecurityClearCachedRealms>
    clear_cached_roles: ApiMethod<RequestParams.SecurityClearCachedRoles>
    clearCachedRoles: ApiMethod<RequestParams.SecurityClearCachedRoles>
    create_api_key: ApiMethod<RequestParams.SecurityCreateApiKey>
    createApiKey: ApiMethod<RequestParams.SecurityCreateApiKey>
    delete_privileges: ApiMethod<RequestParams.SecurityDeletePrivileges>
    deletePrivileges: ApiMethod<RequestParams.SecurityDeletePrivileges>
    delete_role: ApiMethod<RequestParams.SecurityDeleteRole>
    deleteRole: ApiMethod<RequestParams.SecurityDeleteRole>
    delete_role_mapping: ApiMethod<RequestParams.SecurityDeleteRoleMapping>
    deleteRoleMapping: ApiMethod<RequestParams.SecurityDeleteRoleMapping>
    delete_user: ApiMethod<RequestParams.SecurityDeleteUser>
    deleteUser: ApiMethod<RequestParams.SecurityDeleteUser>
    disable_user: ApiMethod<RequestParams.SecurityDisableUser>
    disableUser: ApiMethod<RequestParams.SecurityDisableUser>
    enable_user: ApiMethod<RequestParams.SecurityEnableUser>
    enableUser: ApiMethod<RequestParams.SecurityEnableUser>
    get_api_key: ApiMethod<RequestParams.SecurityGetApiKey>
    getApiKey: ApiMethod<RequestParams.SecurityGetApiKey>
    get_builtin_privileges: ApiMethod<RequestParams.SecurityGetBuiltinPrivileges>
    getBuiltinPrivileges: ApiMethod<RequestParams.SecurityGetBuiltinPrivileges>
    get_privileges: ApiMethod<RequestParams.SecurityGetPrivileges>
    getPrivileges: ApiMethod<RequestParams.SecurityGetPrivileges>
    get_role: ApiMethod<RequestParams.SecurityGetRole>
    getRole: ApiMethod<RequestParams.SecurityGetRole>
    get_role_mapping: ApiMethod<RequestParams.SecurityGetRoleMapping>
    getRoleMapping: ApiMethod<RequestParams.SecurityGetRoleMapping>
    get_token: ApiMethod<RequestParams.SecurityGetToken>
    getToken: ApiMethod<RequestParams.SecurityGetToken>
    get_user: ApiMethod<RequestParams.SecurityGetUser>
    getUser: ApiMethod<RequestParams.SecurityGetUser>
    get_user_privileges: ApiMethod<RequestParams.SecurityGetUserPrivileges>
    getUserPrivileges: ApiMethod<RequestParams.SecurityGetUserPrivileges>
    has_privileges: ApiMethod<RequestParams.SecurityHasPrivileges>
    hasPrivileges: ApiMethod<RequestParams.SecurityHasPrivileges>
    invalidate_api_key: ApiMethod<RequestParams.SecurityInvalidateApiKey>
    invalidateApiKey: ApiMethod<RequestParams.SecurityInvalidateApiKey>
    invalidate_token: ApiMethod<RequestParams.SecurityInvalidateToken>
    invalidateToken: ApiMethod<RequestParams.SecurityInvalidateToken>
    put_privileges: ApiMethod<RequestParams.SecurityPutPrivileges>
    putPrivileges: ApiMethod<RequestParams.SecurityPutPrivileges>
    put_role: ApiMethod<RequestParams.SecurityPutRole>
    putRole: ApiMethod<RequestParams.SecurityPutRole>
    put_role_mapping: ApiMethod<RequestParams.SecurityPutRoleMapping>
    putRoleMapping: ApiMethod<RequestParams.SecurityPutRoleMapping>
    put_user: ApiMethod<RequestParams.SecurityPutUser>
    putUser: ApiMethod<RequestParams.SecurityPutUser>
  }
  slm: {
    delete_lifecycle: ApiMethod<RequestParams.SlmDeleteLifecycle>
    deleteLifecycle: ApiMethod<RequestParams.SlmDeleteLifecycle>
    execute_lifecycle: ApiMethod<RequestParams.SlmExecuteLifecycle>
    executeLifecycle: ApiMethod<RequestParams.SlmExecuteLifecycle>
    execute_retention: ApiMethod<RequestParams.SlmExecuteRetention>
    executeRetention: ApiMethod<RequestParams.SlmExecuteRetention>
    get_lifecycle: ApiMethod<RequestParams.SlmGetLifecycle>
    getLifecycle: ApiMethod<RequestParams.SlmGetLifecycle>
    get_stats: ApiMethod<RequestParams.SlmGetStats>
    getStats: ApiMethod<RequestParams.SlmGetStats>
    get_status: ApiMethod<RequestParams.SlmGetStatus>
    getStatus: ApiMethod<RequestParams.SlmGetStatus>
    put_lifecycle: ApiMethod<RequestParams.SlmPutLifecycle>
    putLifecycle: ApiMethod<RequestParams.SlmPutLifecycle>
    start: ApiMethod<RequestParams.SlmStart>
    stop: ApiMethod<RequestParams.SlmStop>
  }
  snapshot: {
    cleanup_repository: ApiMethod<RequestParams.SnapshotCleanupRepository>
    cleanupRepository: ApiMethod<RequestParams.SnapshotCleanupRepository>
    create: ApiMethod<RequestParams.SnapshotCreate>
    create_repository: ApiMethod<RequestParams.SnapshotCreateRepository>
    createRepository: ApiMethod<RequestParams.SnapshotCreateRepository>
    delete: ApiMethod<RequestParams.SnapshotDelete>
    delete_repository: ApiMethod<RequestParams.SnapshotDeleteRepository>
    deleteRepository: ApiMethod<RequestParams.SnapshotDeleteRepository>
    get: ApiMethod<RequestParams.SnapshotGet>
    get_repository: ApiMethod<RequestParams.SnapshotGetRepository>
    getRepository: ApiMethod<RequestParams.SnapshotGetRepository>
    restore: ApiMethod<RequestParams.SnapshotRestore>
    status: ApiMethod<RequestParams.SnapshotStatus>
    verify_repository: ApiMethod<RequestParams.SnapshotVerifyRepository>
    verifyRepository: ApiMethod<RequestParams.SnapshotVerifyRepository>
  }
  sql: {
    clear_cursor: ApiMethod<RequestParams.SqlClearCursor>
    clearCursor: ApiMethod<RequestParams.SqlClearCursor>
    query: ApiMethod<RequestParams.SqlQuery>
    translate: ApiMethod<RequestParams.SqlTranslate>
  }
  ssl: {
    certificates: ApiMethod<RequestParams.SslCertificates>
  }
  tasks: {
    cancel: ApiMethod<RequestParams.TasksCancel>
    get: ApiMethod<RequestParams.TasksGet>
    list: ApiMethod<RequestParams.TasksList>
  }
  termvectors: ApiMethod<RequestParams.Termvectors>
  transform: {
    delete_transform: ApiMethod<RequestParams.TransformDeleteTransform>
    deleteTransform: ApiMethod<RequestParams.TransformDeleteTransform>
    get_transform: ApiMethod<RequestParams.TransformGetTransform>
    getTransform: ApiMethod<RequestParams.TransformGetTransform>
    get_transform_stats: ApiMethod<RequestParams.TransformGetTransformStats>
    getTransformStats: ApiMethod<RequestParams.TransformGetTransformStats>
    preview_transform: ApiMethod<RequestParams.TransformPreviewTransform>
    previewTransform: ApiMethod<RequestParams.TransformPreviewTransform>
    put_transform: ApiMethod<RequestParams.TransformPutTransform>
    putTransform: ApiMethod<RequestParams.TransformPutTransform>
    start_transform: ApiMethod<RequestParams.TransformStartTransform>
    startTransform: ApiMethod<RequestParams.TransformStartTransform>
    stop_transform: ApiMethod<RequestParams.TransformStopTransform>
    stopTransform: ApiMethod<RequestParams.TransformStopTransform>
    update_transform: ApiMethod<RequestParams.TransformUpdateTransform>
    updateTransform: ApiMethod<RequestParams.TransformUpdateTransform>
  }
  update: ApiMethod<RequestParams.Update>
  update_by_query: ApiMethod<RequestParams.UpdateByQuery>
  updateByQuery: ApiMethod<RequestParams.UpdateByQuery>
  update_by_query_rethrottle: ApiMethod<RequestParams.UpdateByQueryRethrottle>
  updateByQueryRethrottle: ApiMethod<RequestParams.UpdateByQueryRethrottle>
  watcher: {
    ack_watch: ApiMethod<RequestParams.WatcherAckWatch>
    ackWatch: ApiMethod<RequestParams.WatcherAckWatch>
    activate_watch: ApiMethod<RequestParams.WatcherActivateWatch>
    activateWatch: ApiMethod<RequestParams.WatcherActivateWatch>
    deactivate_watch: ApiMethod<RequestParams.WatcherDeactivateWatch>
    deactivateWatch: ApiMethod<RequestParams.WatcherDeactivateWatch>
    delete_watch: ApiMethod<RequestParams.WatcherDeleteWatch>
    deleteWatch: ApiMethod<RequestParams.WatcherDeleteWatch>
    execute_watch: ApiMethod<RequestParams.WatcherExecuteWatch>
    executeWatch: ApiMethod<RequestParams.WatcherExecuteWatch>
    get_watch: ApiMethod<RequestParams.WatcherGetWatch>
    getWatch: ApiMethod<RequestParams.WatcherGetWatch>
    put_watch: ApiMethod<RequestParams.WatcherPutWatch>
    putWatch: ApiMethod<RequestParams.WatcherPutWatch>
    start: ApiMethod<RequestParams.WatcherStart>
    stats: ApiMethod<RequestParams.WatcherStats>
    stop: ApiMethod<RequestParams.WatcherStop>
  }
  xpack: {
    info: ApiMethod<RequestParams.XpackInfo>
    usage: ApiMethod<RequestParams.XpackUsage>
  }
  /* /GENERATED */
}

declare const events: {
  RESPONSE: string;
  REQUEST: string;
  SNIFF: string;
  RESURRECT: string;
};

export {
  Client,
  Transport,
  ConnectionPool,
  Connection,
  Serializer,
  events,
  errors,
  ApiResponse,
  RequestEvent,
  ResurrectEvent,
  RequestParams,
  ClientOptions,
  NodeOptions,
  ClientExtendsCallbackOptions
};
