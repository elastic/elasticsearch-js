/// <reference types="node" />

import { EventEmitter } from 'events';
import { SecureContextOptions } from 'tls';
import Transport, { ApiResponse, EventMeta, SniffMeta, RequestOptions } from './lib/Transport';
import Connection, { AgentOptions } from './lib/Connection';
import ConnectionPool, { nodeSelectorFn, nodeFilterFn, ResurrectMeta } from './lib/ConnectionPool';
import Serializer from './lib/Serializer';

declare type anyObject = {
  [key: string]: any;
};
declare type callbackFn = (err: Error | null, result: ApiResponse) => void;

interface ApiMethod {
  (callback?: callbackFn): any;
  (params: anyObject, callback?: callbackFn): any;
  (params: anyObject, options: RequestOptions, callback?: callbackFn): any;
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
  resurrectStrategy?: string;
  randomizeHost?: boolean;
  suggestCompression?: boolean;
  ssl?: SecureContextOptions;
  agent?: AgentOptions;
  nodeFilter?: nodeFilterFn;
  nodeSelector?: nodeSelectorFn | string;
}

declare class Client extends EventEmitter {
  connectionPool: ConnectionPool;
  transport: Transport;
  serializer: Serializer
  bulk: ApiMethod
  cat: {
    aliases: ApiMethod
    allocation: ApiMethod
    count: ApiMethod
    fielddata: ApiMethod
    health: ApiMethod
    help: ApiMethod
    indices: ApiMethod
    master: ApiMethod
    nodeattrs: ApiMethod
    nodes: ApiMethod
    pending_tasks: ApiMethod
    pendingTasks: ApiMethod
    plugins: ApiMethod
    recovery: ApiMethod
    repositories: ApiMethod
    segments: ApiMethod
    shards: ApiMethod
    snapshots: ApiMethod
    tasks: ApiMethod
    templates: ApiMethod
    thread_pool: ApiMethod
    threadPool: ApiMethod
  }
  ccr: {
    delete_auto_follow_pattern: ApiMethod
    deleteAutoFollowPattern: ApiMethod
    follow: ApiMethod
    follow_stats: ApiMethod
    followStats: ApiMethod
    get_auto_follow_pattern: ApiMethod
    getAutoFollowPattern: ApiMethod
    pause_follow: ApiMethod
    pauseFollow: ApiMethod
    put_auto_follow_pattern: ApiMethod
    putAutoFollowPattern: ApiMethod
    resume_follow: ApiMethod
    resumeFollow: ApiMethod
    stats: ApiMethod
    unfollow: ApiMethod
  }
  clear_scroll: ApiMethod
  clearScroll: ApiMethod
  cluster: {
    allocation_explain: ApiMethod
    allocationExplain: ApiMethod
    get_settings: ApiMethod
    getSettings: ApiMethod
    health: ApiMethod
    pending_tasks: ApiMethod
    pendingTasks: ApiMethod
    put_settings: ApiMethod
    putSettings: ApiMethod
    remote_info: ApiMethod
    remoteInfo: ApiMethod
    reroute: ApiMethod
    state: ApiMethod
    stats: ApiMethod
  }
  count: ApiMethod
  create: ApiMethod
  delete: ApiMethod
  delete_by_query: ApiMethod
  deleteByQuery: ApiMethod
  delete_by_query_rethrottle: ApiMethod
  deleteByQueryRethrottle: ApiMethod
  delete_script: ApiMethod
  deleteScript: ApiMethod
  exists: ApiMethod
  exists_source: ApiMethod
  existsSource: ApiMethod
  explain: ApiMethod
  field_caps: ApiMethod
  fieldCaps: ApiMethod
  get: ApiMethod
  get_script: ApiMethod
  getScript: ApiMethod
  get_source: ApiMethod
  getSource: ApiMethod
  index: ApiMethod
  indices: {
    analyze: ApiMethod
    clear_cache: ApiMethod
    clearCache: ApiMethod
    close: ApiMethod
    create: ApiMethod
    delete: ApiMethod
    delete_alias: ApiMethod
    deleteAlias: ApiMethod
    delete_template: ApiMethod
    deleteTemplate: ApiMethod
    exists: ApiMethod
    exists_alias: ApiMethod
    existsAlias: ApiMethod
    exists_template: ApiMethod
    existsTemplate: ApiMethod
    exists_type: ApiMethod
    existsType: ApiMethod
    flush: ApiMethod
    flush_synced: ApiMethod
    flushSynced: ApiMethod
    forcemerge: ApiMethod
    get: ApiMethod
    get_alias: ApiMethod
    getAlias: ApiMethod
    get_field_mapping: ApiMethod
    getFieldMapping: ApiMethod
    get_mapping: ApiMethod
    getMapping: ApiMethod
    get_settings: ApiMethod
    getSettings: ApiMethod
    get_template: ApiMethod
    getTemplate: ApiMethod
    get_upgrade: ApiMethod
    getUpgrade: ApiMethod
    open: ApiMethod
    put_alias: ApiMethod
    putAlias: ApiMethod
    put_mapping: ApiMethod
    putMapping: ApiMethod
    put_settings: ApiMethod
    putSettings: ApiMethod
    put_template: ApiMethod
    putTemplate: ApiMethod
    recovery: ApiMethod
    refresh: ApiMethod
    rollover: ApiMethod
    segments: ApiMethod
    shard_stores: ApiMethod
    shardStores: ApiMethod
    shrink: ApiMethod
    split: ApiMethod
    stats: ApiMethod
    update_aliases: ApiMethod
    updateAliases: ApiMethod
    upgrade: ApiMethod
    validate_query: ApiMethod
    validateQuery: ApiMethod
  }
  info: ApiMethod
  ingest: {
    delete_pipeline: ApiMethod
    deletePipeline: ApiMethod
    get_pipeline: ApiMethod
    getPipeline: ApiMethod
    processor_grok: ApiMethod
    processorGrok: ApiMethod
    put_pipeline: ApiMethod
    putPipeline: ApiMethod
    simulate: ApiMethod
  }
  mget: ApiMethod
  msearch: ApiMethod
  msearch_template: ApiMethod
  msearchTemplate: ApiMethod
  mtermvectors: ApiMethod
  nodes: {
    hot_threads: ApiMethod
    hotThreads: ApiMethod
    info: ApiMethod
    reload_secure_settings: ApiMethod
    reloadSecureSettings: ApiMethod
    stats: ApiMethod
    usage: ApiMethod
  }
  ping: ApiMethod
  put_script: ApiMethod
  putScript: ApiMethod
  rank_eval: ApiMethod
  rankEval: ApiMethod
  reindex: ApiMethod
  reindex_rethrottle: ApiMethod
  reindexRethrottle: ApiMethod
  render_search_template: ApiMethod
  renderSearchTemplate: ApiMethod
  scripts_painless_execute: ApiMethod
  scriptsPainlessExecute: ApiMethod
  scroll: ApiMethod
  search: ApiMethod
  search_shards: ApiMethod
  searchShards: ApiMethod
  search_template: ApiMethod
  searchTemplate: ApiMethod
  snapshot: {
    create: ApiMethod
    create_repository: ApiMethod
    createRepository: ApiMethod
    delete: ApiMethod
    delete_repository: ApiMethod
    deleteRepository: ApiMethod
    get: ApiMethod
    get_repository: ApiMethod
    getRepository: ApiMethod
    restore: ApiMethod
    status: ApiMethod
    verify_repository: ApiMethod
    verifyRepository: ApiMethod
  }
  tasks: {
    cancel: ApiMethod
    get: ApiMethod
    list: ApiMethod
  }
  termvectors: ApiMethod
  update: ApiMethod
  update_by_query: ApiMethod
  updateByQuery: ApiMethod
  update_by_query_rethrottle: ApiMethod
  updateByQueryRethrottle: ApiMethod
  xpack: {
    graph: {
      explore: ApiMethod
    }
    info: ApiMethod
    license: {
      delete: ApiMethod
      get: ApiMethod
      get_basic_status: ApiMethod
      getBasicStatus: ApiMethod
      get_trial_status: ApiMethod
      getTrialStatus: ApiMethod
      post: ApiMethod
      post_start_basic: ApiMethod
      postStartBasic: ApiMethod
      post_start_trial: ApiMethod
      postStartTrial: ApiMethod
    }
    migration: {
      deprecations: ApiMethod
      get_assistance: ApiMethod
      getAssistance: ApiMethod
      upgrade: ApiMethod
    }
    ml: {
      close_job: ApiMethod
      closeJob: ApiMethod
      delete_calendar: ApiMethod
      deleteCalendar: ApiMethod
      delete_calendar_event: ApiMethod
      deleteCalendarEvent: ApiMethod
      delete_calendar_job: ApiMethod
      deleteCalendarJob: ApiMethod
      delete_datafeed: ApiMethod
      deleteDatafeed: ApiMethod
      delete_expired_data: ApiMethod
      deleteExpiredData: ApiMethod
      delete_filter: ApiMethod
      deleteFilter: ApiMethod
      delete_forecast: ApiMethod
      deleteForecast: ApiMethod
      delete_job: ApiMethod
      deleteJob: ApiMethod
      delete_model_snapshot: ApiMethod
      deleteModelSnapshot: ApiMethod
      find_file_structure: ApiMethod
      findFileStructure: ApiMethod
      flush_job: ApiMethod
      flushJob: ApiMethod
      forecast: ApiMethod
      get_buckets: ApiMethod
      getBuckets: ApiMethod
      get_calendar_events: ApiMethod
      getCalendarEvents: ApiMethod
      get_calendars: ApiMethod
      getCalendars: ApiMethod
      get_categories: ApiMethod
      getCategories: ApiMethod
      get_datafeed_stats: ApiMethod
      getDatafeedStats: ApiMethod
      get_datafeeds: ApiMethod
      getDatafeeds: ApiMethod
      get_filters: ApiMethod
      getFilters: ApiMethod
      get_influencers: ApiMethod
      getInfluencers: ApiMethod
      get_job_stats: ApiMethod
      getJobStats: ApiMethod
      get_jobs: ApiMethod
      getJobs: ApiMethod
      get_model_snapshots: ApiMethod
      getModelSnapshots: ApiMethod
      get_overall_buckets: ApiMethod
      getOverallBuckets: ApiMethod
      get_records: ApiMethod
      getRecords: ApiMethod
      info: ApiMethod
      open_job: ApiMethod
      openJob: ApiMethod
      post_calendar_events: ApiMethod
      postCalendarEvents: ApiMethod
      post_data: ApiMethod
      postData: ApiMethod
      preview_datafeed: ApiMethod
      previewDatafeed: ApiMethod
      put_calendar: ApiMethod
      putCalendar: ApiMethod
      put_calendar_job: ApiMethod
      putCalendarJob: ApiMethod
      put_datafeed: ApiMethod
      putDatafeed: ApiMethod
      put_filter: ApiMethod
      putFilter: ApiMethod
      put_job: ApiMethod
      putJob: ApiMethod
      revert_model_snapshot: ApiMethod
      revertModelSnapshot: ApiMethod
      start_datafeed: ApiMethod
      startDatafeed: ApiMethod
      stop_datafeed: ApiMethod
      stopDatafeed: ApiMethod
      update_datafeed: ApiMethod
      updateDatafeed: ApiMethod
      update_filter: ApiMethod
      updateFilter: ApiMethod
      update_job: ApiMethod
      updateJob: ApiMethod
      update_model_snapshot: ApiMethod
      updateModelSnapshot: ApiMethod
      validate: ApiMethod
      validate_detector: ApiMethod
      validateDetector: ApiMethod
    }
    monitoring: {
      bulk: ApiMethod
    }
    rollup: {
      delete_job: ApiMethod
      deleteJob: ApiMethod
      get_jobs: ApiMethod
      getJobs: ApiMethod
      get_rollup_caps: ApiMethod
      getRollupCaps: ApiMethod
      get_rollup_index_caps: ApiMethod
      getRollupIndexCaps: ApiMethod
      put_job: ApiMethod
      putJob: ApiMethod
      rollup_search: ApiMethod
      rollupSearch: ApiMethod
      start_job: ApiMethod
      startJob: ApiMethod
      stop_job: ApiMethod
      stopJob: ApiMethod
    }
    security: {
      authenticate: ApiMethod
      change_password: ApiMethod
      changePassword: ApiMethod
      clear_cached_realms: ApiMethod
      clearCachedRealms: ApiMethod
      clear_cached_roles: ApiMethod
      clearCachedRoles: ApiMethod
      delete_privileges: ApiMethod
      deletePrivileges: ApiMethod
      delete_role: ApiMethod
      deleteRole: ApiMethod
      delete_role_mapping: ApiMethod
      deleteRoleMapping: ApiMethod
      delete_user: ApiMethod
      deleteUser: ApiMethod
      disable_user: ApiMethod
      disableUser: ApiMethod
      enable_user: ApiMethod
      enableUser: ApiMethod
      get_privileges: ApiMethod
      getPrivileges: ApiMethod
      get_role: ApiMethod
      getRole: ApiMethod
      get_role_mapping: ApiMethod
      getRoleMapping: ApiMethod
      get_token: ApiMethod
      getToken: ApiMethod
      get_user: ApiMethod
      getUser: ApiMethod
      get_user_privileges: ApiMethod
      getUserPrivileges: ApiMethod
      has_privileges: ApiMethod
      hasPrivileges: ApiMethod
      invalidate_token: ApiMethod
      invalidateToken: ApiMethod
      put_privileges: ApiMethod
      putPrivileges: ApiMethod
      put_role: ApiMethod
      putRole: ApiMethod
      put_role_mapping: ApiMethod
      putRoleMapping: ApiMethod
      put_user: ApiMethod
      putUser: ApiMethod
    }
    sql: {
      clear_cursor: ApiMethod
      clearCursor: ApiMethod
      query: ApiMethod
      translate: ApiMethod
    }
    ssl: {
      certificates: ApiMethod
    }
    usage: ApiMethod
    watcher: {
      ack_watch: ApiMethod
      ackWatch: ApiMethod
      activate_watch: ApiMethod
      activateWatch: ApiMethod
      deactivate_watch: ApiMethod
      deactivateWatch: ApiMethod
      delete_watch: ApiMethod
      deleteWatch: ApiMethod
      execute_watch: ApiMethod
      executeWatch: ApiMethod
      get_watch: ApiMethod
      getWatch: ApiMethod
      put_watch: ApiMethod
      putWatch: ApiMethod
      restart: ApiMethod
      start: ApiMethod
      stats: ApiMethod
      stop: ApiMethod
    }
  }
  constructor(opts?: ClientOptions);
  close(callback?: Function): Promise<void> | void;
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
  ResurrectMeta
};
