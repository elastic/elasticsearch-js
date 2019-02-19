/// <reference types="node" />

import { EventEmitter } from 'events';
import { SecureContextOptions } from 'tls';
import Transport, { ApiResponse, EventMeta, SniffMeta, RequestOptions } from './lib/Transport';
import Connection, { AgentOptions } from './lib/Connection';
import ConnectionPool, { nodeSelectorFn, nodeFilterFn, ResurrectMeta } from './lib/ConnectionPool';
import Serializer from './lib/Serializer';
import * as RequestParams from './api/requestParams'

declare type anyObject = {
  [key: string]: any;
};
declare type callbackFn = (err: Error | null, result: ApiResponse) => void;

interface ApiMethod<T> {
  (callback?: callbackFn): any;
  (params: T, callback?: callbackFn): any;
  (params: T, options: RequestOptions, callback?: callbackFn): any;
}

interface ClientOptions {
  node?: string | string[];
  nodes?: string | string[];
  Connection?: typeof Connection;
  ConnectionPool?: typeof ConnectionPool;
  Transport?: typeof Transport;
  Serializer?: typeof Serializer;
  maxRetries?: number;
  requestTimeout?: number;
  pingTimeout?: number;
  sniffInterval?: number;
  sniffOnStart?: boolean;
  sniffEndpoint?: string;
  sniffOnConnectionFault?: boolean;
  resurrectStrategy?: 'ping' | 'optimistic' | 'none';
  suggestCompression?: boolean;
  compression?: 'gzip';
  ssl?: SecureContextOptions;
  agent?: AgentOptions;
  nodeFilter?: nodeFilterFn;
  nodeSelector?: nodeSelectorFn | string;
  cloud?: {
    id: string;
    username: string;
    password: string;
  }
}

declare class Client extends EventEmitter {
  constructor(opts?: ClientOptions);
  connectionPool: ConnectionPool;
  transport: Transport;
  serializer: Serializer
  // TODO: update fn declaration
  extends(method: string, fn: any): void;
  close(callback?: Function): Promise<void> | void;
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
    get_auto_follow_pattern: ApiMethod<RequestParams.CcrGetAutoFollowPattern>
    getAutoFollowPattern: ApiMethod<RequestParams.CcrGetAutoFollowPattern>
    pause_follow: ApiMethod<RequestParams.CcrPauseFollow>
    pauseFollow: ApiMethod<RequestParams.CcrPauseFollow>
    put_auto_follow_pattern: ApiMethod<RequestParams.CcrPutAutoFollowPattern>
    putAutoFollowPattern: ApiMethod<RequestParams.CcrPutAutoFollowPattern>
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
  exists: ApiMethod<RequestParams.Exists>
  exists_source: ApiMethod<RequestParams.ExistsSource>
  existsSource: ApiMethod<RequestParams.ExistsSource>
  explain: ApiMethod<RequestParams.Explain>
  field_caps: ApiMethod<RequestParams.FieldCaps>
  fieldCaps: ApiMethod<RequestParams.FieldCaps>
  get: ApiMethod<RequestParams.Get>
  get_script: ApiMethod<RequestParams.GetScript>
  getScript: ApiMethod<RequestParams.GetScript>
  get_source: ApiMethod<RequestParams.GetSource>
  getSource: ApiMethod<RequestParams.GetSource>
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
  mget: ApiMethod<RequestParams.Mget>
  ml: {
    close_job: ApiMethod<RequestParams.MlCloseJob>
    closeJob: ApiMethod<RequestParams.MlCloseJob>
    delete_calendar: ApiMethod<RequestParams.MlDeleteCalendar>
    deleteCalendar: ApiMethod<RequestParams.MlDeleteCalendar>
    delete_calendar_event: ApiMethod<RequestParams.MlDeleteCalendarEvent>
    deleteCalendarEvent: ApiMethod<RequestParams.MlDeleteCalendarEvent>
    delete_calendar_job: ApiMethod<RequestParams.MlDeleteCalendarJob>
    deleteCalendarJob: ApiMethod<RequestParams.MlDeleteCalendarJob>
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
    put_datafeed: ApiMethod<RequestParams.MlPutDatafeed>
    putDatafeed: ApiMethod<RequestParams.MlPutDatafeed>
    put_filter: ApiMethod<RequestParams.MlPutFilter>
    putFilter: ApiMethod<RequestParams.MlPutFilter>
    put_job: ApiMethod<RequestParams.MlPutJob>
    putJob: ApiMethod<RequestParams.MlPutJob>
    revert_model_snapshot: ApiMethod<RequestParams.MlRevertModelSnapshot>
    revertModelSnapshot: ApiMethod<RequestParams.MlRevertModelSnapshot>
    set_upgrade_mode: ApiMethod<RequestParams.MlSetUpgradeMode>
    setUpgradeMode: ApiMethod<RequestParams.MlSetUpgradeMode>
    start_datafeed: ApiMethod<RequestParams.MlStartDatafeed>
    startDatafeed: ApiMethod<RequestParams.MlStartDatafeed>
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
  snapshot: {
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
  ssl: {
    certificates: ApiMethod<RequestParams.SslCertificates>
  }
  tasks: {
    cancel: ApiMethod<RequestParams.TasksCancel>
    get: ApiMethod<RequestParams.TasksGet>
    list: ApiMethod<RequestParams.TasksList>
  }
  termvectors: ApiMethod<RequestParams.Termvectors>
  update: ApiMethod<RequestParams.Update>
  update_by_query: ApiMethod<RequestParams.UpdateByQuery>
  updateByQuery: ApiMethod<RequestParams.UpdateByQuery>
  update_by_query_rethrottle: ApiMethod<RequestParams.UpdateByQueryRethrottle>
  updateByQueryRethrottle: ApiMethod<RequestParams.UpdateByQueryRethrottle>
  xpack: {
    graph: {
      explore: ApiMethod<RequestParams.XpackGraphExplore>
    }
    info: ApiMethod<RequestParams.XpackInfo>
    license: {
      delete: ApiMethod<RequestParams.XpackLicenseDelete>
      get: ApiMethod<RequestParams.XpackLicenseGet>
      get_basic_status: ApiMethod<RequestParams.XpackLicenseGetBasicStatus>
      getBasicStatus: ApiMethod<RequestParams.XpackLicenseGetBasicStatus>
      get_trial_status: ApiMethod<RequestParams.XpackLicenseGetTrialStatus>
      getTrialStatus: ApiMethod<RequestParams.XpackLicenseGetTrialStatus>
      post: ApiMethod<RequestParams.XpackLicensePost>
      post_start_basic: ApiMethod<RequestParams.XpackLicensePostStartBasic>
      postStartBasic: ApiMethod<RequestParams.XpackLicensePostStartBasic>
      post_start_trial: ApiMethod<RequestParams.XpackLicensePostStartTrial>
      postStartTrial: ApiMethod<RequestParams.XpackLicensePostStartTrial>
    }
    migration: {
      deprecations: ApiMethod<RequestParams.XpackMigrationDeprecations>
      get_assistance: ApiMethod<RequestParams.XpackMigrationGetAssistance>
      getAssistance: ApiMethod<RequestParams.XpackMigrationGetAssistance>
      upgrade: ApiMethod<RequestParams.XpackMigrationUpgrade>
    }
    rollup: {
      delete_job: ApiMethod<RequestParams.XpackRollupDeleteJob>
      deleteJob: ApiMethod<RequestParams.XpackRollupDeleteJob>
      get_jobs: ApiMethod<RequestParams.XpackRollupGetJobs>
      getJobs: ApiMethod<RequestParams.XpackRollupGetJobs>
      get_rollup_caps: ApiMethod<RequestParams.XpackRollupGetRollupCaps>
      getRollupCaps: ApiMethod<RequestParams.XpackRollupGetRollupCaps>
      get_rollup_index_caps: ApiMethod<RequestParams.XpackRollupGetRollupIndexCaps>
      getRollupIndexCaps: ApiMethod<RequestParams.XpackRollupGetRollupIndexCaps>
      put_job: ApiMethod<RequestParams.XpackRollupPutJob>
      putJob: ApiMethod<RequestParams.XpackRollupPutJob>
      rollup_search: ApiMethod<RequestParams.XpackRollupRollupSearch>
      rollupSearch: ApiMethod<RequestParams.XpackRollupRollupSearch>
      start_job: ApiMethod<RequestParams.XpackRollupStartJob>
      startJob: ApiMethod<RequestParams.XpackRollupStartJob>
      stop_job: ApiMethod<RequestParams.XpackRollupStopJob>
      stopJob: ApiMethod<RequestParams.XpackRollupStopJob>
    }
    sql: {
      clear_cursor: ApiMethod<RequestParams.XpackSqlClearCursor>
      clearCursor: ApiMethod<RequestParams.XpackSqlClearCursor>
      query: ApiMethod<RequestParams.XpackSqlQuery>
      translate: ApiMethod<RequestParams.XpackSqlTranslate>
    }
    usage: ApiMethod<RequestParams.XpackUsage>
    watcher: {
      ack_watch: ApiMethod<RequestParams.XpackWatcherAckWatch>
      ackWatch: ApiMethod<RequestParams.XpackWatcherAckWatch>
      activate_watch: ApiMethod<RequestParams.XpackWatcherActivateWatch>
      activateWatch: ApiMethod<RequestParams.XpackWatcherActivateWatch>
      deactivate_watch: ApiMethod<RequestParams.XpackWatcherDeactivateWatch>
      deactivateWatch: ApiMethod<RequestParams.XpackWatcherDeactivateWatch>
      delete_watch: ApiMethod<RequestParams.XpackWatcherDeleteWatch>
      deleteWatch: ApiMethod<RequestParams.XpackWatcherDeleteWatch>
      execute_watch: ApiMethod<RequestParams.XpackWatcherExecuteWatch>
      executeWatch: ApiMethod<RequestParams.XpackWatcherExecuteWatch>
      get_watch: ApiMethod<RequestParams.XpackWatcherGetWatch>
      getWatch: ApiMethod<RequestParams.XpackWatcherGetWatch>
      put_watch: ApiMethod<RequestParams.XpackWatcherPutWatch>
      putWatch: ApiMethod<RequestParams.XpackWatcherPutWatch>
      start: ApiMethod<RequestParams.XpackWatcherStart>
      stats: ApiMethod<RequestParams.XpackWatcherStats>
      stop: ApiMethod<RequestParams.XpackWatcherStop>
    }
  }
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
  ApiResponse,
  EventMeta,
  SniffMeta,
  ResurrectMeta,
  RequestParams
};
