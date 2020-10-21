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

import {
  ClientOptions,
  ConnectionPool,
  Serializer,
  Transport,
  errors,
  RequestEvent,
  ResurrectEvent,
  ApiError
} from '../index'
import Helpers from '../lib/Helpers'
import {
  ApiResponse,
  RequestBody,
  RequestNDBody,
  TransportRequestParams,
  TransportRequestOptions,
  TransportRequestPromise,
  Context
} from '../lib/Transport'
import * as RequestParams from './requestParams'

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
// /Extend API

interface KibanaClient {
  connectionPool: ConnectionPool
  transport: Transport
  serializer: Serializer
  extend(method: string, fn: extendsCallback): void
  extend(method: string, opts: { force: boolean }, fn: extendsCallback): void;
  helpers: Helpers
  child(opts?: ClientOptions): KibanaClient
  close(): Promise<void>;
  emit(event: string | symbol, ...args: any[]): boolean;
  on(event: 'request', listener: (err: ApiError, meta: RequestEvent) => void): this;
  on(event: 'response', listener: (err: ApiError, meta: RequestEvent) => void): this;
  on(event: 'sniff', listener: (err: ApiError, meta: RequestEvent) => void): this;
  on(event: 'resurrect', listener: (err: null, meta: ResurrectEvent) => void): this;
  once(event: 'request', listener: (err: ApiError, meta: RequestEvent) => void): this;
  once(event: 'response', listener: (err: ApiError, meta: RequestEvent) => void): this;
  once(event: 'sniff', listener: (err: ApiError, meta: RequestEvent) => void): this;
  once(event: 'resurrect', listener: (err: null, meta: ResurrectEvent) => void): this;
  off(event: string | symbol, listener: (...args: any[]) => void): this;
  /* GENERATED */
  asyncSearch: {
    delete<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AsyncSearchDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AsyncSearchGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.AsyncSearchSubmit<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  autoscaling: {
    deleteAutoscalingPolicy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AutoscalingDeleteAutoscalingPolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAutoscalingDecision<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AutoscalingGetAutoscalingDecision, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAutoscalingPolicy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AutoscalingGetAutoscalingPolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putAutoscalingPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.AutoscalingPutAutoscalingPolicy<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.Bulk<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  cat: {
    aliases<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatAliases, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    allocation<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatAllocation, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    count<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatCount, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    fielddata<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatFielddata, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    health<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatHealth, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    help<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatHelp, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    indices<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatIndices, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    master<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatMaster, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlDataFrameAnalytics<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatMlDataFrameAnalytics, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlDatafeeds<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatMlDatafeeds, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlJobs<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatMlJobs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlTrainedModels<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatMlTrainedModels, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    nodeattrs<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatNodeattrs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    nodes<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatNodes, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pendingTasks<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatPendingTasks, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    plugins<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatPlugins, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    recovery<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatRecovery, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    repositories<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatRepositories, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    segments<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatSegments, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    shards<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatShards, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    snapshots<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatSnapshots, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    tasks<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatTasks, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    templates<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatTemplates, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    threadPool<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatThreadPool, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    transforms<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatTransforms, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  ccr: {
    deleteAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrDeleteAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.CcrFollow<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    followInfo<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrFollowInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    followStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrFollowStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    forgetFollower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.CcrForgetFollower<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrGetAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pauseAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrPauseAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pauseFollow<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrPauseFollow, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putAutoFollowPattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resumeAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrResumeAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resumeFollow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.CcrResumeFollow<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    unfollow<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrUnfollow, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  clearScroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClearScroll<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  closePointInTime<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClosePointInTime<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  cluster: {
    allocationExplain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterAllocationExplain<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteComponentTemplate<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterDeleteComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteVotingConfigExclusions<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterDeleteVotingConfigExclusions, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsComponentTemplate<TResponse = boolean, TContext = Context>(params?: RequestParams.ClusterExistsComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getComponentTemplate<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterGetComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getSettings<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterGetSettings, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    health<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterHealth, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pendingTasks<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterPendingTasks, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postVotingConfigExclusions<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterPostVotingConfigExclusions, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putComponentTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterPutComponentTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterPutSettings<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    remoteInfo<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterRemoteInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reroute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterReroute<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    state<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterState, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  count<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Count<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Create<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  danglingIndices: {
    deleteDanglingIndex<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DanglingIndicesDeleteDanglingIndex, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    importDanglingIndex<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DanglingIndicesImportDanglingIndex, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    listDanglingIndices<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DanglingIndicesListDanglingIndices, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  delete<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.Delete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  deleteByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.DeleteByQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  deleteByQueryRethrottle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DeleteByQueryRethrottle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  deleteScript<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DeleteScript, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  enrich: {
    deletePolicy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EnrichDeletePolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executePolicy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EnrichExecutePolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getPolicy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EnrichGetPolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.EnrichPutPolicy<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EnrichStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  eql: {
    delete<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EqlDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EqlGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.EqlSearch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  exists<TResponse = boolean, TContext = Context>(params?: RequestParams.Exists, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  existsSource<TResponse = boolean, TContext = Context>(params?: RequestParams.ExistsSource, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Explain<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  fieldCaps<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.FieldCaps<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.Get, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getScript<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetScript, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getScriptContext<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetScriptContext, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getScriptLanguages<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetScriptLanguages, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getSource<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetSource, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  graph: {
    explore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.GraphExplore<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  ilm: {
    deleteLifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmDeleteLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explainLifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmExplainLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getLifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmGetLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getStatus<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmGetStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    moveToStep<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IlmMoveToStep<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IlmPutLifecycle<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    removePolicy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmRemovePolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    retry<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmRetry, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmStart, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmStop, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  index<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Index<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  indices: {
    addBlock<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesAddBlock, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    analyze<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesAnalyze<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCache<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesClearCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesClone<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    close<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesClose, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesCreate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    createDataStream<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesCreateDataStream, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    dataStreamsStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDataStreamsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteAlias<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDeleteAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteDataStream<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDeleteDataStream, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteIndexTemplate<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDeleteIndexTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteTemplate<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDeleteTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists<TResponse = boolean, TContext = Context>(params?: RequestParams.IndicesExists, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsAlias<TResponse = boolean, TContext = Context>(params?: RequestParams.IndicesExistsAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsIndexTemplate<TResponse = boolean, TContext = Context>(params?: RequestParams.IndicesExistsIndexTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsTemplate<TResponse = boolean, TContext = Context>(params?: RequestParams.IndicesExistsTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsType<TResponse = boolean, TContext = Context>(params?: RequestParams.IndicesExistsType, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flush<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesFlush, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flushSynced<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesFlushSynced, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    forcemerge<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesForcemerge, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    freeze<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesFreeze, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAlias<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDataStream<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetDataStream, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getFieldMapping<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetFieldMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getIndexTemplate<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetIndexTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getMapping<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getSettings<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetSettings, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTemplate<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getUpgrade<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetUpgrade, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    open<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesOpen, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putAlias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPutAlias<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPutIndexTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPutMapping<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPutSettings<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPutTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    recovery<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesRecovery, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    refresh<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesRefresh, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reloadSearchAnalyzers<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesReloadSearchAnalyzers, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resolveIndex<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesResolveIndex, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    rollover<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesRollover<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    segments<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesSegments, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    shardStores<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesShardStores, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    shrink<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesShrink<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    simulateIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesSimulateIndexTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    simulateTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesSimulateTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    split<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesSplit<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    unfreeze<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesUnfreeze, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateAliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesUpdateAliases<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    upgrade<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesUpgrade, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validateQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesValidateQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  info<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.Info, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  ingest: {
    deletePipeline<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IngestDeletePipeline, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getPipeline<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IngestGetPipeline, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    processorGrok<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IngestProcessorGrok, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IngestPutPipeline<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    simulate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IngestSimulate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  license: {
    delete<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicenseDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicenseGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getBasicStatus<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicenseGetBasicStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTrialStatus<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicenseGetTrialStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.LicensePost<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postStartBasic<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicensePostStartBasic, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postStartTrial<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicensePostStartTrial, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  mget<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Mget<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  migration: {
    deprecations<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MigrationDeprecations, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  ml: {
    closeJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlCloseJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteCalendar<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteCalendar, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteCalendarEvent<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteCalendarEvent, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteCalendarJob<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteCalendarJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteDataFrameAnalytics<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteDataFrameAnalytics, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteDatafeed<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteDatafeed, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteExpiredData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteExpiredData<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteFilter<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteFilter, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteForecast<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteForecast, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteJob<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteModelSnapshot<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteModelSnapshot, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteTrainedModel<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteTrainedModel, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    estimateModelMemory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlEstimateModelMemory<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    evaluateDataFrame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlEvaluateDataFrame<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explainDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    findFileStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.MlFindFileStructure<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flushJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlFlushJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    forecast<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlForecast, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetBuckets<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getCalendarEvents<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetCalendarEvents, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getCalendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetCalendars<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getCategories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetCategories<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDataFrameAnalytics<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetDataFrameAnalytics, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDataFrameAnalyticsStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetDataFrameAnalyticsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDatafeedStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetDatafeedStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDatafeeds<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetDatafeeds, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getFilters<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetFilters, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getInfluencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetInfluencers<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getJobStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetJobStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getJobs<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetJobs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getModelSnapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetModelSnapshots<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getOverallBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetOverallBuckets<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRecords<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetRecords<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTrainedModels<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetTrainedModels, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTrainedModelsStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetTrainedModelsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    info<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    openJob<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlOpenJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postCalendarEvents<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPostCalendarEvents<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPostData<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    previewDatafeed<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlPreviewDatafeed, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putCalendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutCalendar<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putCalendarJob<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutCalendarJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutFilter<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTrainedModel<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutTrainedModel<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    revertModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlRevertModelSnapshot<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    setUpgradeMode<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlSetUpgradeMode, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlStartDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlStopDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpdateDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpdateDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpdateFilter<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpdateJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpdateModelSnapshot<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlValidate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validateDetector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlValidateDetector<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  monitoring: {
    bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.MonitoringBulk<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.Msearch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  msearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.MsearchTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  mtermvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Mtermvectors<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  nodes: {
    hotThreads<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.NodesHotThreads, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    info<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.NodesInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reloadSecureSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.NodesReloadSecureSettings<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.NodesStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    usage<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.NodesUsage, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  openPointInTime<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.OpenPointInTime, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  ping<TResponse = boolean, TContext = Context>(params?: RequestParams.Ping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  putScript<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.PutScript<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  rankEval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.RankEval<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  reindex<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Reindex<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  reindexRethrottle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ReindexRethrottle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  renderSearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.RenderSearchTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  rollup: {
    deleteJob<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupDeleteJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getJobs<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupGetJobs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRollupCaps<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupGetRollupCaps, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRollupIndexCaps<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupGetRollupIndexCaps, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.RollupPutJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    rollupSearch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.RollupRollupSearch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startJob<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupStartJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopJob<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupStopJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  scriptsPainlessExecute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ScriptsPainlessExecute<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Scroll<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Search<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  searchShards<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchShards, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  searchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SearchTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  searchableSnapshots: {
    clearCache<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsClearCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsMount<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    repositoryStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsRepositoryStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  security: {
    authenticate<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityAuthenticate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    changePassword<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityChangePassword<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearApiKeyCache<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityClearApiKeyCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCachedPrivileges<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityClearCachedPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCachedRealms<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityClearCachedRealms, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCachedRoles<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityClearCachedRoles, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    createApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityCreateApiKey<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deletePrivileges<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDeletePrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteRole<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDeleteRole, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteRoleMapping<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDeleteRoleMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteUser<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDeleteUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    disableUser<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDisableUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    enableUser<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityEnableUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getApiKey<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetApiKey, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getBuiltinPrivileges<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetBuiltinPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getPrivileges<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRole<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetRole, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRoleMapping<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetRoleMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetToken<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getUser<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getUserPrivileges<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetUserPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    grantApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGrantApiKey<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    hasPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityHasPrivileges<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    invalidateApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityInvalidateApiKey<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    invalidateToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityInvalidateToken<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityPutPrivileges<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putRole<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityPutRole<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putRoleMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityPutRoleMapping<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putUser<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityPutUser<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  slm: {
    deleteLifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmDeleteLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executeLifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmExecuteLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executeRetention<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmExecuteRetention, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getLifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmGetLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmGetStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getStatus<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmGetStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SlmPutLifecycle<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmStart, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmStop, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  snapshot: {
    cleanupRepository<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotCleanupRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotClone<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotCreate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    createRepository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotCreateRepository<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteRepository<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotDeleteRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRepository<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotGetRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    restore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotRestore<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    status<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    verifyRepository<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotVerifyRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  sql: {
    clearCursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SqlClearCursor<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SqlQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    translate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SqlTranslate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  ssl: {
    certificates<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SslCertificates, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  tasks: {
    cancel<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TasksCancel, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TasksGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    list<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TasksList, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  termvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Termvectors<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  transform: {
    deleteTransform<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformDeleteTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTransform<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformGetTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTransformStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformGetTransformStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.TransformPreviewTransform<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.TransformPutTransform<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startTransform<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformStartTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopTransform<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformStopTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.TransformUpdateTransform<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  update<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Update<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  updateByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.UpdateByQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  updateByQueryRethrottle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.UpdateByQueryRethrottle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  watcher: {
    ackWatch<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherAckWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    activateWatch<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherActivateWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deactivateWatch<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherDeactivateWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteWatch<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherDeleteWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executeWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherExecuteWatch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getWatch<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherGetWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherPutWatch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherStart, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherStop, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  xpack: {
    info<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.XpackInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    usage<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.XpackUsage, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  /* /GENERATED */
}

export { KibanaClient }
