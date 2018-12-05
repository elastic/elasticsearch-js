/// <reference types="node" />

import { EventEmitter } from 'events';
import { SecureContextOptions } from 'tls';
import Transport, { ApiResponse, EventMeta, SniffMeta } from './lib/Transport';
import Connection, { AgentOptions } from './lib/Connection';
import ConnectionPool, { nodeSelectorFn, nodeFilterFn } from './lib/ConnectionPool';
import Serializer from './lib/Serializer';

declare type anyObject = {
  [key: string]: any;
};
declare type callbackFn = (err: Error | null, result: ApiResponse) => void;
declare type apiMethod = (params?: anyObject | callbackFn, callback?: callbackFn) => any;

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
  bulk: apiMethod
  cat: {
    aliases: apiMethod
    allocation: apiMethod
    count: apiMethod
    fielddata: apiMethod
    health: apiMethod
    help: apiMethod
    indices: apiMethod
    master: apiMethod
    nodeattrs: apiMethod
    nodes: apiMethod
    pending_tasks: apiMethod
    pendingTasks: apiMethod
    plugins: apiMethod
    recovery: apiMethod
    repositories: apiMethod
    segments: apiMethod
    shards: apiMethod
    snapshots: apiMethod
    tasks: apiMethod
    templates: apiMethod
    thread_pool: apiMethod
    threadPool: apiMethod
  }
  ccr: {
    delete_auto_follow_pattern: apiMethod
    deleteAutoFollowPattern: apiMethod
    follow: apiMethod
    follow_stats: apiMethod
    followStats: apiMethod
    get_auto_follow_pattern: apiMethod
    getAutoFollowPattern: apiMethod
    pause_follow: apiMethod
    pauseFollow: apiMethod
    put_auto_follow_pattern: apiMethod
    putAutoFollowPattern: apiMethod
    resume_follow: apiMethod
    resumeFollow: apiMethod
    stats: apiMethod
    unfollow: apiMethod
  }
  clear_scroll: apiMethod
  clearScroll: apiMethod
  cluster: {
    allocation_explain: apiMethod
    allocationExplain: apiMethod
    get_settings: apiMethod
    getSettings: apiMethod
    health: apiMethod
    pending_tasks: apiMethod
    pendingTasks: apiMethod
    put_settings: apiMethod
    putSettings: apiMethod
    remote_info: apiMethod
    remoteInfo: apiMethod
    reroute: apiMethod
    state: apiMethod
    stats: apiMethod
  }
  count: apiMethod
  create: apiMethod
  delete: apiMethod
  delete_by_query: apiMethod
  deleteByQuery: apiMethod
  delete_by_query_rethrottle: apiMethod
  deleteByQueryRethrottle: apiMethod
  delete_script: apiMethod
  deleteScript: apiMethod
  exists: apiMethod
  exists_source: apiMethod
  existsSource: apiMethod
  explain: apiMethod
  field_caps: apiMethod
  fieldCaps: apiMethod
  get: apiMethod
  get_script: apiMethod
  getScript: apiMethod
  get_source: apiMethod
  getSource: apiMethod
  index: apiMethod
  indices: {
    analyze: apiMethod
    clear_cache: apiMethod
    clearCache: apiMethod
    close: apiMethod
    create: apiMethod
    delete: apiMethod
    delete_alias: apiMethod
    deleteAlias: apiMethod
    delete_template: apiMethod
    deleteTemplate: apiMethod
    exists: apiMethod
    exists_alias: apiMethod
    existsAlias: apiMethod
    exists_template: apiMethod
    existsTemplate: apiMethod
    exists_type: apiMethod
    existsType: apiMethod
    flush: apiMethod
    flush_synced: apiMethod
    flushSynced: apiMethod
    forcemerge: apiMethod
    get: apiMethod
    get_alias: apiMethod
    getAlias: apiMethod
    get_field_mapping: apiMethod
    getFieldMapping: apiMethod
    get_mapping: apiMethod
    getMapping: apiMethod
    get_settings: apiMethod
    getSettings: apiMethod
    get_template: apiMethod
    getTemplate: apiMethod
    get_upgrade: apiMethod
    getUpgrade: apiMethod
    open: apiMethod
    put_alias: apiMethod
    putAlias: apiMethod
    put_mapping: apiMethod
    putMapping: apiMethod
    put_settings: apiMethod
    putSettings: apiMethod
    put_template: apiMethod
    putTemplate: apiMethod
    recovery: apiMethod
    refresh: apiMethod
    rollover: apiMethod
    segments: apiMethod
    shard_stores: apiMethod
    shardStores: apiMethod
    shrink: apiMethod
    split: apiMethod
    stats: apiMethod
    update_aliases: apiMethod
    updateAliases: apiMethod
    upgrade: apiMethod
    validate_query: apiMethod
    validateQuery: apiMethod
  }
  info: apiMethod
  ingest: {
    delete_pipeline: apiMethod
    deletePipeline: apiMethod
    get_pipeline: apiMethod
    getPipeline: apiMethod
    processor_grok: apiMethod
    processorGrok: apiMethod
    put_pipeline: apiMethod
    putPipeline: apiMethod
    simulate: apiMethod
  }
  mget: apiMethod
  msearch: apiMethod
  msearch_template: apiMethod
  msearchTemplate: apiMethod
  mtermvectors: apiMethod
  nodes: {
    hot_threads: apiMethod
    hotThreads: apiMethod
    info: apiMethod
    reload_secure_settings: apiMethod
    reloadSecureSettings: apiMethod
    stats: apiMethod
    usage: apiMethod
  }
  ping: apiMethod
  put_script: apiMethod
  putScript: apiMethod
  rank_eval: apiMethod
  rankEval: apiMethod
  reindex: apiMethod
  reindex_rethrottle: apiMethod
  reindexRethrottle: apiMethod
  render_search_template: apiMethod
  renderSearchTemplate: apiMethod
  scripts_painless_execute: apiMethod
  scriptsPainlessExecute: apiMethod
  scroll: apiMethod
  search: apiMethod
  search_shards: apiMethod
  searchShards: apiMethod
  search_template: apiMethod
  searchTemplate: apiMethod
  snapshot: {
    create: apiMethod
    create_repository: apiMethod
    createRepository: apiMethod
    delete: apiMethod
    delete_repository: apiMethod
    deleteRepository: apiMethod
    get: apiMethod
    get_repository: apiMethod
    getRepository: apiMethod
    restore: apiMethod
    status: apiMethod
    verify_repository: apiMethod
    verifyRepository: apiMethod
  }
  tasks: {
    cancel: apiMethod
    get: apiMethod
    list: apiMethod
  }
  termvectors: apiMethod
  update: apiMethod
  update_by_query: apiMethod
  updateByQuery: apiMethod
  update_by_query_rethrottle: apiMethod
  updateByQueryRethrottle: apiMethod
  xpack: {
    graph: {
      explore: apiMethod
    }
    info: apiMethod
    license: {
      delete: apiMethod
      get: apiMethod
      get_basic_status: apiMethod
      getBasicStatus: apiMethod
      get_trial_status: apiMethod
      getTrialStatus: apiMethod
      post: apiMethod
      post_start_basic: apiMethod
      postStartBasic: apiMethod
      post_start_trial: apiMethod
      postStartTrial: apiMethod
    }
    migration: {
      deprecations: apiMethod
      get_assistance: apiMethod
      getAssistance: apiMethod
      upgrade: apiMethod
    }
    ml: {
      close_job: apiMethod
      closeJob: apiMethod
      delete_calendar: apiMethod
      deleteCalendar: apiMethod
      delete_calendar_event: apiMethod
      deleteCalendarEvent: apiMethod
      delete_calendar_job: apiMethod
      deleteCalendarJob: apiMethod
      delete_datafeed: apiMethod
      deleteDatafeed: apiMethod
      delete_expired_data: apiMethod
      deleteExpiredData: apiMethod
      delete_filter: apiMethod
      deleteFilter: apiMethod
      delete_forecast: apiMethod
      deleteForecast: apiMethod
      delete_job: apiMethod
      deleteJob: apiMethod
      delete_model_snapshot: apiMethod
      deleteModelSnapshot: apiMethod
      find_file_structure: apiMethod
      findFileStructure: apiMethod
      flush_job: apiMethod
      flushJob: apiMethod
      forecast: apiMethod
      get_buckets: apiMethod
      getBuckets: apiMethod
      get_calendar_events: apiMethod
      getCalendarEvents: apiMethod
      get_calendars: apiMethod
      getCalendars: apiMethod
      get_categories: apiMethod
      getCategories: apiMethod
      get_datafeed_stats: apiMethod
      getDatafeedStats: apiMethod
      get_datafeeds: apiMethod
      getDatafeeds: apiMethod
      get_filters: apiMethod
      getFilters: apiMethod
      get_influencers: apiMethod
      getInfluencers: apiMethod
      get_job_stats: apiMethod
      getJobStats: apiMethod
      get_jobs: apiMethod
      getJobs: apiMethod
      get_model_snapshots: apiMethod
      getModelSnapshots: apiMethod
      get_overall_buckets: apiMethod
      getOverallBuckets: apiMethod
      get_records: apiMethod
      getRecords: apiMethod
      info: apiMethod
      open_job: apiMethod
      openJob: apiMethod
      post_calendar_events: apiMethod
      postCalendarEvents: apiMethod
      post_data: apiMethod
      postData: apiMethod
      preview_datafeed: apiMethod
      previewDatafeed: apiMethod
      put_calendar: apiMethod
      putCalendar: apiMethod
      put_calendar_job: apiMethod
      putCalendarJob: apiMethod
      put_datafeed: apiMethod
      putDatafeed: apiMethod
      put_filter: apiMethod
      putFilter: apiMethod
      put_job: apiMethod
      putJob: apiMethod
      revert_model_snapshot: apiMethod
      revertModelSnapshot: apiMethod
      start_datafeed: apiMethod
      startDatafeed: apiMethod
      stop_datafeed: apiMethod
      stopDatafeed: apiMethod
      update_datafeed: apiMethod
      updateDatafeed: apiMethod
      update_filter: apiMethod
      updateFilter: apiMethod
      update_job: apiMethod
      updateJob: apiMethod
      update_model_snapshot: apiMethod
      updateModelSnapshot: apiMethod
      validate: apiMethod
      validate_detector: apiMethod
      validateDetector: apiMethod
    }
    monitoring: {
      bulk: apiMethod
    }
    rollup: {
      delete_job: apiMethod
      deleteJob: apiMethod
      get_jobs: apiMethod
      getJobs: apiMethod
      get_rollup_caps: apiMethod
      getRollupCaps: apiMethod
      get_rollup_index_caps: apiMethod
      getRollupIndexCaps: apiMethod
      put_job: apiMethod
      putJob: apiMethod
      rollup_search: apiMethod
      rollupSearch: apiMethod
      start_job: apiMethod
      startJob: apiMethod
      stop_job: apiMethod
      stopJob: apiMethod
    }
    security: {
      authenticate: apiMethod
      change_password: apiMethod
      changePassword: apiMethod
      clear_cached_realms: apiMethod
      clearCachedRealms: apiMethod
      clear_cached_roles: apiMethod
      clearCachedRoles: apiMethod
      delete_privileges: apiMethod
      deletePrivileges: apiMethod
      delete_role: apiMethod
      deleteRole: apiMethod
      delete_role_mapping: apiMethod
      deleteRoleMapping: apiMethod
      delete_user: apiMethod
      deleteUser: apiMethod
      disable_user: apiMethod
      disableUser: apiMethod
      enable_user: apiMethod
      enableUser: apiMethod
      get_privileges: apiMethod
      getPrivileges: apiMethod
      get_role: apiMethod
      getRole: apiMethod
      get_role_mapping: apiMethod
      getRoleMapping: apiMethod
      get_token: apiMethod
      getToken: apiMethod
      get_user: apiMethod
      getUser: apiMethod
      get_user_privileges: apiMethod
      getUserPrivileges: apiMethod
      has_privileges: apiMethod
      hasPrivileges: apiMethod
      invalidate_token: apiMethod
      invalidateToken: apiMethod
      put_privileges: apiMethod
      putPrivileges: apiMethod
      put_role: apiMethod
      putRole: apiMethod
      put_role_mapping: apiMethod
      putRoleMapping: apiMethod
      put_user: apiMethod
      putUser: apiMethod
    }
    sql: {
      clear_cursor: apiMethod
      clearCursor: apiMethod
      query: apiMethod
      translate: apiMethod
    }
    ssl: {
      certificates: apiMethod
    }
    usage: apiMethod
    watcher: {
      ack_watch: apiMethod
      ackWatch: apiMethod
      activate_watch: apiMethod
      activateWatch: apiMethod
      deactivate_watch: apiMethod
      deactivateWatch: apiMethod
      delete_watch: apiMethod
      deleteWatch: apiMethod
      execute_watch: apiMethod
      executeWatch: apiMethod
      get_watch: apiMethod
      getWatch: apiMethod
      put_watch: apiMethod
      putWatch: apiMethod
      restart: apiMethod
      start: apiMethod
      stats: apiMethod
      stop: apiMethod
    }
  }
  constructor(opts?: ClientOptions);
}

declare const events: {
  RESPONSE: string;
  REQUEST: string;
  SNIFF: string;
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
  SniffMeta
};
