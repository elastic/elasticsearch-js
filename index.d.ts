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
import ConnectionPool, { ResurrectEvent } from './lib/ConnectionPool';
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
  generateRequestId?: generateRequestIdFn;
  name?: string;
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
  count_percolate: ApiMethod<RequestParams.CountPercolate>
  countPercolate: ApiMethod<RequestParams.CountPercolate>
  create: ApiMethod<RequestParams.Create>
  delete: ApiMethod<RequestParams.Delete>
  delete_by_query: ApiMethod<RequestParams.DeleteByQuery>
  deleteByQuery: ApiMethod<RequestParams.DeleteByQuery>
  delete_script: ApiMethod<RequestParams.DeleteScript>
  deleteScript: ApiMethod<RequestParams.DeleteScript>
  delete_template: ApiMethod<RequestParams.DeleteTemplate>
  deleteTemplate: ApiMethod<RequestParams.DeleteTemplate>
  exists: ApiMethod<RequestParams.Exists>
  exists_source: ApiMethod<RequestParams.ExistsSource>
  existsSource: ApiMethod<RequestParams.ExistsSource>
  explain: ApiMethod<RequestParams.Explain>
  field_caps: ApiMethod<RequestParams.FieldCaps>
  fieldCaps: ApiMethod<RequestParams.FieldCaps>
  field_stats: ApiMethod<RequestParams.FieldStats>
  fieldStats: ApiMethod<RequestParams.FieldStats>
  get: ApiMethod<RequestParams.Get>
  get_script: ApiMethod<RequestParams.GetScript>
  getScript: ApiMethod<RequestParams.GetScript>
  get_source: ApiMethod<RequestParams.GetSource>
  getSource: ApiMethod<RequestParams.GetSource>
  get_template: ApiMethod<RequestParams.GetTemplate>
  getTemplate: ApiMethod<RequestParams.GetTemplate>
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
    stats: ApiMethod<RequestParams.IndicesStats>
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
  mpercolate: ApiMethod<RequestParams.Mpercolate>
  msearch: ApiMethod<RequestParams.Msearch>
  msearch_template: ApiMethod<RequestParams.MsearchTemplate>
  msearchTemplate: ApiMethod<RequestParams.MsearchTemplate>
  mtermvectors: ApiMethod<RequestParams.Mtermvectors>
  nodes: {
    hot_threads: ApiMethod<RequestParams.NodesHotThreads>
    hotThreads: ApiMethod<RequestParams.NodesHotThreads>
    info: ApiMethod<RequestParams.NodesInfo>
    stats: ApiMethod<RequestParams.NodesStats>
  }
  percolate: ApiMethod<RequestParams.Percolate>
  ping: ApiMethod<RequestParams.Ping>
  put_script: ApiMethod<RequestParams.PutScript>
  putScript: ApiMethod<RequestParams.PutScript>
  put_template: ApiMethod<RequestParams.PutTemplate>
  putTemplate: ApiMethod<RequestParams.PutTemplate>
  reindex: ApiMethod<RequestParams.Reindex>
  reindex_rethrottle: ApiMethod<RequestParams.ReindexRethrottle>
  reindexRethrottle: ApiMethod<RequestParams.ReindexRethrottle>
  render_search_template: ApiMethod<RequestParams.RenderSearchTemplate>
  renderSearchTemplate: ApiMethod<RequestParams.RenderSearchTemplate>
  scroll: ApiMethod<RequestParams.Scroll>
  search: ApiMethod<RequestParams.Search>
  search_shards: ApiMethod<RequestParams.SearchShards>
  searchShards: ApiMethod<RequestParams.SearchShards>
  search_template: ApiMethod<RequestParams.SearchTemplate>
  searchTemplate: ApiMethod<RequestParams.SearchTemplate>
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
  suggest: ApiMethod<RequestParams.Suggest>
  tasks: {
    cancel: ApiMethod<RequestParams.TasksCancel>
    get: ApiMethod<RequestParams.TasksGet>
    list: ApiMethod<RequestParams.TasksList>
  }
  termvectors: ApiMethod<RequestParams.Termvectors>
  update: ApiMethod<RequestParams.Update>
  update_by_query: ApiMethod<RequestParams.UpdateByQuery>
  updateByQuery: ApiMethod<RequestParams.UpdateByQuery>
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
