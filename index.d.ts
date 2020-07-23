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
    create_api_key: ApiMethod<RequestParams.SecurityCreateApiKey>
    createApiKey: ApiMethod<RequestParams.SecurityCreateApiKey>
    get_api_key: ApiMethod<RequestParams.SecurityGetApiKey>
    getApiKey: ApiMethod<RequestParams.SecurityGetApiKey>
    invalidate_api_key: ApiMethod<RequestParams.SecurityInvalidateApiKey>
    invalidateApiKey: ApiMethod<RequestParams.SecurityInvalidateApiKey>
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
    ml: {
        close_job: ApiMethod<RequestParams.XpackMlCloseJob>
        closeJob: ApiMethod<RequestParams.XpackMlCloseJob>
        delete_calendar: ApiMethod<RequestParams.XpackMlDeleteCalendar>
        deleteCalendar: ApiMethod<RequestParams.XpackMlDeleteCalendar>
        delete_calendar_event: ApiMethod<RequestParams.XpackMlDeleteCalendarEvent>
        deleteCalendarEvent: ApiMethod<RequestParams.XpackMlDeleteCalendarEvent>
        delete_calendar_job: ApiMethod<RequestParams.XpackMlDeleteCalendarJob>
        deleteCalendarJob: ApiMethod<RequestParams.XpackMlDeleteCalendarJob>
        delete_datafeed: ApiMethod<RequestParams.XpackMlDeleteDatafeed>
        deleteDatafeed: ApiMethod<RequestParams.XpackMlDeleteDatafeed>
        delete_expired_data: ApiMethod<RequestParams.XpackMlDeleteExpiredData>
        deleteExpiredData: ApiMethod<RequestParams.XpackMlDeleteExpiredData>
        delete_filter: ApiMethod<RequestParams.XpackMlDeleteFilter>
        deleteFilter: ApiMethod<RequestParams.XpackMlDeleteFilter>
        delete_forecast: ApiMethod<RequestParams.XpackMlDeleteForecast>
        deleteForecast: ApiMethod<RequestParams.XpackMlDeleteForecast>
        delete_job: ApiMethod<RequestParams.XpackMlDeleteJob>
        deleteJob: ApiMethod<RequestParams.XpackMlDeleteJob>
        delete_model_snapshot: ApiMethod<RequestParams.XpackMlDeleteModelSnapshot>
        deleteModelSnapshot: ApiMethod<RequestParams.XpackMlDeleteModelSnapshot>
        find_file_structure: ApiMethod<RequestParams.XpackMlFindFileStructure>
        findFileStructure: ApiMethod<RequestParams.XpackMlFindFileStructure>
        flush_job: ApiMethod<RequestParams.XpackMlFlushJob>
        flushJob: ApiMethod<RequestParams.XpackMlFlushJob>
        forecast: ApiMethod<RequestParams.XpackMlForecast>
        get_buckets: ApiMethod<RequestParams.XpackMlGetBuckets>
        getBuckets: ApiMethod<RequestParams.XpackMlGetBuckets>
        get_calendar_events: ApiMethod<RequestParams.XpackMlGetCalendarEvents>
        getCalendarEvents: ApiMethod<RequestParams.XpackMlGetCalendarEvents>
        get_calendars: ApiMethod<RequestParams.XpackMlGetCalendars>
        getCalendars: ApiMethod<RequestParams.XpackMlGetCalendars>
        get_categories: ApiMethod<RequestParams.XpackMlGetCategories>
        getCategories: ApiMethod<RequestParams.XpackMlGetCategories>
        get_datafeed_stats: ApiMethod<RequestParams.XpackMlGetDatafeedStats>
        getDatafeedStats: ApiMethod<RequestParams.XpackMlGetDatafeedStats>
        get_datafeeds: ApiMethod<RequestParams.XpackMlGetDatafeeds>
        getDatafeeds: ApiMethod<RequestParams.XpackMlGetDatafeeds>
        get_filters: ApiMethod<RequestParams.XpackMlGetFilters>
        getFilters: ApiMethod<RequestParams.XpackMlGetFilters>
        get_influencers: ApiMethod<RequestParams.XpackMlGetInfluencers>
        getInfluencers: ApiMethod<RequestParams.XpackMlGetInfluencers>
        get_job_stats: ApiMethod<RequestParams.XpackMlGetJobStats>
        getJobStats: ApiMethod<RequestParams.XpackMlGetJobStats>
        get_jobs: ApiMethod<RequestParams.XpackMlGetJobs>
        getJobs: ApiMethod<RequestParams.XpackMlGetJobs>
        get_model_snapshots: ApiMethod<RequestParams.XpackMlGetModelSnapshots>
        getModelSnapshots: ApiMethod<RequestParams.XpackMlGetModelSnapshots>
        get_overall_buckets: ApiMethod<RequestParams.XpackMlGetOverallBuckets>
        getOverallBuckets: ApiMethod<RequestParams.XpackMlGetOverallBuckets>
        get_records: ApiMethod<RequestParams.XpackMlGetRecords>
        getRecords: ApiMethod<RequestParams.XpackMlGetRecords>
        info: ApiMethod<RequestParams.XpackMlInfo>
        open_job: ApiMethod<RequestParams.XpackMlOpenJob>
        openJob: ApiMethod<RequestParams.XpackMlOpenJob>
        post_calendar_events: ApiMethod<RequestParams.XpackMlPostCalendarEvents>
        postCalendarEvents: ApiMethod<RequestParams.XpackMlPostCalendarEvents>
        post_data: ApiMethod<RequestParams.XpackMlPostData>
        postData: ApiMethod<RequestParams.XpackMlPostData>
        preview_datafeed: ApiMethod<RequestParams.XpackMlPreviewDatafeed>
        previewDatafeed: ApiMethod<RequestParams.XpackMlPreviewDatafeed>
        put_calendar: ApiMethod<RequestParams.XpackMlPutCalendar>
        putCalendar: ApiMethod<RequestParams.XpackMlPutCalendar>
        put_calendar_job: ApiMethod<RequestParams.XpackMlPutCalendarJob>
        putCalendarJob: ApiMethod<RequestParams.XpackMlPutCalendarJob>
        put_datafeed: ApiMethod<RequestParams.XpackMlPutDatafeed>
        putDatafeed: ApiMethod<RequestParams.XpackMlPutDatafeed>
        put_filter: ApiMethod<RequestParams.XpackMlPutFilter>
        putFilter: ApiMethod<RequestParams.XpackMlPutFilter>
        put_job: ApiMethod<RequestParams.XpackMlPutJob>
        putJob: ApiMethod<RequestParams.XpackMlPutJob>
        revert_model_snapshot: ApiMethod<RequestParams.XpackMlRevertModelSnapshot>
        revertModelSnapshot: ApiMethod<RequestParams.XpackMlRevertModelSnapshot>
        set_upgrade_mode: ApiMethod<RequestParams.XpackMlSetUpgradeMode>
        setUpgradeMode: ApiMethod<RequestParams.XpackMlSetUpgradeMode>
        start_datafeed: ApiMethod<RequestParams.XpackMlStartDatafeed>
        startDatafeed: ApiMethod<RequestParams.XpackMlStartDatafeed>
        stop_datafeed: ApiMethod<RequestParams.XpackMlStopDatafeed>
        stopDatafeed: ApiMethod<RequestParams.XpackMlStopDatafeed>
        update_datafeed: ApiMethod<RequestParams.XpackMlUpdateDatafeed>
        updateDatafeed: ApiMethod<RequestParams.XpackMlUpdateDatafeed>
        update_filter: ApiMethod<RequestParams.XpackMlUpdateFilter>
        updateFilter: ApiMethod<RequestParams.XpackMlUpdateFilter>
        update_job: ApiMethod<RequestParams.XpackMlUpdateJob>
        updateJob: ApiMethod<RequestParams.XpackMlUpdateJob>
        update_model_snapshot: ApiMethod<RequestParams.XpackMlUpdateModelSnapshot>
        updateModelSnapshot: ApiMethod<RequestParams.XpackMlUpdateModelSnapshot>
        validate: ApiMethod<RequestParams.XpackMlValidate>
        validate_detector: ApiMethod<RequestParams.XpackMlValidateDetector>
        validateDetector: ApiMethod<RequestParams.XpackMlValidateDetector>
    }
    monitoring: {
        bulk: ApiMethod<RequestParams.XpackMonitoringBulk>
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
    security: {
        authenticate: ApiMethod<RequestParams.XpackSecurityAuthenticate>
        change_password: ApiMethod<RequestParams.XpackSecurityChangePassword>
        changePassword: ApiMethod<RequestParams.XpackSecurityChangePassword>
        clear_cached_realms: ApiMethod<RequestParams.XpackSecurityClearCachedRealms>
        clearCachedRealms: ApiMethod<RequestParams.XpackSecurityClearCachedRealms>
        clear_cached_roles: ApiMethod<RequestParams.XpackSecurityClearCachedRoles>
        clearCachedRoles: ApiMethod<RequestParams.XpackSecurityClearCachedRoles>
        delete_privileges: ApiMethod<RequestParams.XpackSecurityDeletePrivileges>
        deletePrivileges: ApiMethod<RequestParams.XpackSecurityDeletePrivileges>
        delete_role: ApiMethod<RequestParams.XpackSecurityDeleteRole>
        deleteRole: ApiMethod<RequestParams.XpackSecurityDeleteRole>
        delete_role_mapping: ApiMethod<RequestParams.XpackSecurityDeleteRoleMapping>
        deleteRoleMapping: ApiMethod<RequestParams.XpackSecurityDeleteRoleMapping>
        delete_user: ApiMethod<RequestParams.XpackSecurityDeleteUser>
        deleteUser: ApiMethod<RequestParams.XpackSecurityDeleteUser>
        disable_user: ApiMethod<RequestParams.XpackSecurityDisableUser>
        disableUser: ApiMethod<RequestParams.XpackSecurityDisableUser>
        enable_user: ApiMethod<RequestParams.XpackSecurityEnableUser>
        enableUser: ApiMethod<RequestParams.XpackSecurityEnableUser>
        get_privileges: ApiMethod<RequestParams.XpackSecurityGetPrivileges>
        getPrivileges: ApiMethod<RequestParams.XpackSecurityGetPrivileges>
        get_role: ApiMethod<RequestParams.XpackSecurityGetRole>
        getRole: ApiMethod<RequestParams.XpackSecurityGetRole>
        get_role_mapping: ApiMethod<RequestParams.XpackSecurityGetRoleMapping>
        getRoleMapping: ApiMethod<RequestParams.XpackSecurityGetRoleMapping>
        get_token: ApiMethod<RequestParams.XpackSecurityGetToken>
        getToken: ApiMethod<RequestParams.XpackSecurityGetToken>
        get_user: ApiMethod<RequestParams.XpackSecurityGetUser>
        getUser: ApiMethod<RequestParams.XpackSecurityGetUser>
        get_user_privileges: ApiMethod<RequestParams.XpackSecurityGetUserPrivileges>
        getUserPrivileges: ApiMethod<RequestParams.XpackSecurityGetUserPrivileges>
        has_privileges: ApiMethod<RequestParams.XpackSecurityHasPrivileges>
        hasPrivileges: ApiMethod<RequestParams.XpackSecurityHasPrivileges>
        invalidate_token: ApiMethod<RequestParams.XpackSecurityInvalidateToken>
        invalidateToken: ApiMethod<RequestParams.XpackSecurityInvalidateToken>
        put_privileges: ApiMethod<RequestParams.XpackSecurityPutPrivileges>
        putPrivileges: ApiMethod<RequestParams.XpackSecurityPutPrivileges>
        put_role: ApiMethod<RequestParams.XpackSecurityPutRole>
        putRole: ApiMethod<RequestParams.XpackSecurityPutRole>
        put_role_mapping: ApiMethod<RequestParams.XpackSecurityPutRoleMapping>
        putRoleMapping: ApiMethod<RequestParams.XpackSecurityPutRoleMapping>
        put_user: ApiMethod<RequestParams.XpackSecurityPutUser>
        putUser: ApiMethod<RequestParams.XpackSecurityPutUser>
    }
    sql: {
        clear_cursor: ApiMethod<RequestParams.XpackSqlClearCursor>
        clearCursor: ApiMethod<RequestParams.XpackSqlClearCursor>
        query: ApiMethod<RequestParams.XpackSqlQuery>
        translate: ApiMethod<RequestParams.XpackSqlTranslate>
    }
    ssl: {
        certificates: ApiMethod<RequestParams.XpackSslCertificates>
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
        restart: ApiMethod<RequestParams.XpackWatcherRestart>
        start: ApiMethod<RequestParams.XpackWatcherStart>
        stats: ApiMethod<RequestParams.XpackWatcherStats>
        stop: ApiMethod<RequestParams.XpackWatcherStop>
    }
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
