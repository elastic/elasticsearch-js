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
  TransportRequestPromise,
  TransportRequestParams,
  TransportRequestOptions
} from '../lib/Transport'
import * as T from './types'

/**
  * We are still working on this type, it will arrive soon.
  * If it's critical for you, please open an issue.
  * https://github.com/elastic/elasticsearch-js
  */
type TODO = Record<string, any>

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
  asyncSearch: {
    delete<TContext = unknown>(params: T.AsyncSearchDeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AsyncSearchDeleteResponse, TContext>>
    get<TDocument = unknown, TContext = unknown>(params: T.AsyncSearchGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AsyncSearchGetResponse<TDocument>, TContext>>
    status<TDocument = unknown, TContext = unknown>(params: T.AsyncSearchStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AsyncSearchStatusResponse<TDocument>, TContext>>
    submit<TDocument = unknown, TContext = unknown>(params?: T.AsyncSearchSubmitRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AsyncSearchSubmitResponse<TDocument>, TContext>>
  }
  autoscaling: {
    deleteAutoscalingPolicy<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getAutoscalingCapacity<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getAutoscalingPolicy<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putAutoscalingPolicy<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  }
  bulk<TSource = unknown, TContext = unknown>(params: T.BulkRequest<TSource>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.BulkResponse, TContext>>
  cat: {
    aliases<TContext = unknown>(params?: T.CatAliasesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatAliasesResponse, TContext>>
    allocation<TContext = unknown>(params?: T.CatAllocationRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatAllocationResponse, TContext>>
    count<TContext = unknown>(params?: T.CatCountRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatCountResponse, TContext>>
    fielddata<TContext = unknown>(params?: T.CatFielddataRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatFielddataResponse, TContext>>
    health<TContext = unknown>(params?: T.CatHealthRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatHealthResponse, TContext>>
    help<TContext = unknown>(params?: T.CatHelpRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatHelpResponse, TContext>>
    indices<TContext = unknown>(params?: T.CatIndicesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatIndicesResponse, TContext>>
    master<TContext = unknown>(params?: T.CatMasterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatMasterResponse, TContext>>
    mlDataFrameAnalytics<TContext = unknown>(params?: T.CatDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatDataFrameAnalyticsResponse, TContext>>
    mlDatafeeds<TContext = unknown>(params?: T.CatDatafeedsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatDatafeedsResponse, TContext>>
    mlJobs<TContext = unknown>(params?: T.CatJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatJobsResponse, TContext>>
    mlTrainedModels<TContext = unknown>(params?: T.CatTrainedModelsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatTrainedModelsResponse, TContext>>
    nodeattrs<TContext = unknown>(params?: T.CatNodeAttributesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatNodeAttributesResponse, TContext>>
    nodes<TContext = unknown>(params?: T.CatNodesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatNodesResponse, TContext>>
    pendingTasks<TContext = unknown>(params?: T.CatPendingTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatPendingTasksResponse, TContext>>
    plugins<TContext = unknown>(params?: T.CatPluginsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatPluginsResponse, TContext>>
    recovery<TContext = unknown>(params?: T.CatRecoveryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatRecoveryResponse, TContext>>
    repositories<TContext = unknown>(params?: T.CatRepositoriesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatRepositoriesResponse, TContext>>
    segments<TContext = unknown>(params?: T.CatSegmentsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatSegmentsResponse, TContext>>
    shards<TContext = unknown>(params?: T.CatShardsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatShardsResponse, TContext>>
    snapshots<TContext = unknown>(params?: T.CatSnapshotsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatSnapshotsResponse, TContext>>
    tasks<TContext = unknown>(params?: T.CatTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatTasksResponse, TContext>>
    templates<TContext = unknown>(params?: T.CatTemplatesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatTemplatesResponse, TContext>>
    threadPool<TContext = unknown>(params?: T.CatThreadPoolRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatThreadPoolResponse, TContext>>
    transforms<TContext = unknown>(params?: T.CatTransformsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatTransformsResponse, TContext>>
  }
  ccr: {
    deleteAutoFollowPattern<TContext = unknown>(params: T.DeleteAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteAutoFollowPatternResponse, TContext>>
    follow<TContext = unknown>(params: T.CreateFollowIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CreateFollowIndexResponse, TContext>>
    followInfo<TContext = unknown>(params: T.FollowInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FollowInfoResponse, TContext>>
    followStats<TContext = unknown>(params: T.FollowIndexStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FollowIndexStatsResponse, TContext>>
    forgetFollower<TContext = unknown>(params: T.ForgetFollowerIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ForgetFollowerIndexResponse, TContext>>
    getAutoFollowPattern<TContext = unknown>(params?: T.GetAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetAutoFollowPatternResponse, TContext>>
    pauseAutoFollowPattern<TContext = unknown>(params: T.PauseAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PauseAutoFollowPatternResponse, TContext>>
    pauseFollow<TContext = unknown>(params: T.PauseFollowIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PauseFollowIndexResponse, TContext>>
    putAutoFollowPattern<TContext = unknown>(params: T.CreateAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CreateAutoFollowPatternResponse, TContext>>
    resumeAutoFollowPattern<TContext = unknown>(params: T.ResumeAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ResumeAutoFollowPatternResponse, TContext>>
    resumeFollow<TContext = unknown>(params: T.ResumeFollowIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ResumeFollowIndexResponse, TContext>>
    stats<TContext = unknown>(params?: T.CcrStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrStatsResponse, TContext>>
    unfollow<TContext = unknown>(params: T.UnfollowIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UnfollowIndexResponse, TContext>>
  }
  clearScroll<TContext = unknown>(params?: T.ClearScrollRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClearScrollResponse, TContext>>
  closePointInTime<TContext = unknown>(params?: T.ClosePointInTimeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClosePointInTimeResponse, TContext>>
  cluster: {
    allocationExplain<TContext = unknown>(params?: T.ClusterAllocationExplainRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterAllocationExplainResponse, TContext>>
    deleteComponentTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    deleteVotingConfigExclusions<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    existsComponentTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getComponentTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getSettings<TContext = unknown>(params?: T.ClusterGetSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterGetSettingsResponse, TContext>>
    health<TContext = unknown>(params?: T.ClusterHealthRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterHealthResponse, TContext>>
    pendingTasks<TContext = unknown>(params?: T.ClusterPendingTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterPendingTasksResponse, TContext>>
    postVotingConfigExclusions<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putComponentTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putSettings<TContext = unknown>(params?: T.ClusterPutSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterPutSettingsResponse, TContext>>
    remoteInfo<TContext = unknown>(params?: T.RemoteInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RemoteInfoResponse, TContext>>
    reroute<TContext = unknown>(params?: T.ClusterRerouteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterRerouteResponse, TContext>>
    state<TContext = unknown>(params?: T.ClusterStateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterStateResponse, TContext>>
    stats<TContext = unknown>(params?: T.ClusterStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterStatsResponse, TContext>>
  }
  count<TContext = unknown>(params?: T.CountRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CountResponse, TContext>>
  create<TDocument = unknown, TContext = unknown>(params: T.CreateRequest<TDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CreateResponse, TContext>>
  danglingIndices: {
    deleteDanglingIndex<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    importDanglingIndex<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    listDanglingIndices<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  }
  dataFrameTransformDeprecated: {
    deleteTransform<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getTransform<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getTransformStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    previewTransform<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putTransform<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    startTransform<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    stopTransform<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    updateTransform<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  }
  delete<TContext = unknown>(params: T.DeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteResponse, TContext>>
  deleteByQuery<TContext = unknown>(params: T.DeleteByQueryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteByQueryResponse, TContext>>
  deleteByQueryRethrottle<TContext = unknown>(params: T.DeleteByQueryRethrottleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteByQueryRethrottleResponse, TContext>>
  deleteScript<TContext = unknown>(params: T.DeleteScriptRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteScriptResponse, TContext>>
  enrich: {
    deletePolicy<TContext = unknown>(params: T.DeleteEnrichPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteEnrichPolicyResponse, TContext>>
    executePolicy<TContext = unknown>(params: T.ExecuteEnrichPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExecuteEnrichPolicyResponse, TContext>>
    getPolicy<TContext = unknown>(params?: T.GetEnrichPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetEnrichPolicyResponse, TContext>>
    putPolicy<TContext = unknown>(params: T.PutEnrichPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutEnrichPolicyResponse, TContext>>
    stats<TContext = unknown>(params?: T.EnrichStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EnrichStatsResponse, TContext>>
  }
  eql: {
<<<<<<< HEAD
    delete<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    get<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getStatus<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    search<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  }
  exists<TContext = unknown>(params: T.DocumentExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DocumentExistsResponse, TContext>>
  existsSource<TContext = unknown>(params: T.SourceExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SourceExistsResponse, TContext>>
  explain<TDocument = unknown, TContext = unknown>(params: T.ExplainRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExplainResponse<TDocument>, TContext>>
  features: {
    getFeatures<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  }
  fieldCaps<TContext = unknown>(params?: T.FieldCapabilitiesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FieldCapabilitiesResponse, TContext>>
  get<TDocument = unknown, TContext = unknown>(params: T.GetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetResponse<TDocument>, TContext>>
  getScript<TContext = unknown>(params: T.GetScriptRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetScriptResponse, TContext>>
  getScriptContext<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  getScriptLanguages<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  getSource<TDocument = unknown, TContext = unknown>(params: T.SourceRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SourceResponse<TDocument>, TContext>>
=======
    delete<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EqlDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EqlGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getStatus<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EqlGetStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.EqlSearch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  exists<TResponse = boolean, TContext = Context>(params?: RequestParams.Exists, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  existsSource<TResponse = boolean, TContext = Context>(params?: RequestParams.ExistsSource, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Explain<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  features: {
    getFeatures<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.FeaturesGetFeatures, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resetFeatures<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.FeaturesResetFeatures, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  }
  fieldCaps<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.FieldCaps<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.Get, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getScript<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetScript, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getScriptContext<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetScriptContext, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getScriptLanguages<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetScriptLanguages, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getSource<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetSource, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
>>>>>>> master
  graph: {
    explore<TContext = unknown>(params: T.GraphExploreRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GraphExploreResponse, TContext>>
  }
  ilm: {
    deleteLifecycle<TContext = unknown>(params: T.DeleteLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteLifecycleResponse, TContext>>
    explainLifecycle<TContext = unknown>(params: T.ExplainLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExplainLifecycleResponse, TContext>>
    getLifecycle<TContext = unknown>(params?: T.GetLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetLifecycleResponse, TContext>>
    getStatus<TContext = unknown>(params?: T.GetIlmStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetIlmStatusResponse, TContext>>
    moveToStep<TContext = unknown>(params: T.MoveToStepRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MoveToStepResponse, TContext>>
    putLifecycle<TContext = unknown>(params?: T.PutLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutLifecycleResponse, TContext>>
    removePolicy<TContext = unknown>(params: T.RemovePolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RemovePolicyResponse, TContext>>
    retry<TContext = unknown>(params: T.RetryIlmRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RetryIlmResponse, TContext>>
    start<TContext = unknown>(params?: T.StartIlmRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartIlmResponse, TContext>>
    stop<TContext = unknown>(params?: T.StopIlmRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StopIlmResponse, TContext>>
  }
  index<TDocument = unknown, TContext = unknown>(params: T.IndexRequest<TDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndexResponse, TContext>>
  indices: {
    addBlock<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    analyze<TContext = unknown>(params?: T.AnalyzeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AnalyzeResponse, TContext>>
    clearCache<TContext = unknown>(params?: T.ClearCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClearCacheResponse, TContext>>
    clone<TContext = unknown>(params: T.CloneIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CloneIndexResponse, TContext>>
    close<TContext = unknown>(params: T.CloseIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CloseIndexResponse, TContext>>
    create<TContext = unknown>(params: T.CreateIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CreateIndexResponse, TContext>>
    createDataStream<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    dataStreamsStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    delete<TContext = unknown>(params: T.DeleteIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteIndexResponse, TContext>>
    deleteAlias<TContext = unknown>(params: T.DeleteAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteAliasResponse, TContext>>
    deleteDataStream<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    deleteIndexTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    deleteTemplate<TContext = unknown>(params: T.DeleteIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteIndexTemplateResponse, TContext>>
    exists<TContext = unknown>(params: T.IndexExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndexExistsResponse, TContext>>
    existsAlias<TContext = unknown>(params: T.AliasExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AliasExistsResponse, TContext>>
    existsIndexTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    existsTemplate<TContext = unknown>(params: T.IndexTemplateExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndexTemplateExistsResponse, TContext>>
    existsType<TContext = unknown>(params: T.TypeExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TypeExistsResponse, TContext>>
    flush<TContext = unknown>(params?: T.FlushRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FlushResponse, TContext>>
    flushSynced<TContext = unknown>(params?: T.SyncedFlushRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SyncedFlushResponse, TContext>>
    forcemerge<TContext = unknown>(params?: T.ForceMergeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ForceMergeResponse, TContext>>
    freeze<TContext = unknown>(params: T.FreezeIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FreezeIndexResponse, TContext>>
    get<TContext = unknown>(params: T.GetIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetIndexResponse, TContext>>
    getAlias<TContext = unknown>(params?: T.GetAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetAliasResponse, TContext>>
    getDataStream<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getFieldMapping<TContext = unknown>(params: T.GetFieldMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetFieldMappingResponse, TContext>>
    getIndexTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getMapping<TContext = unknown>(params?: T.GetMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetMappingResponse, TContext>>
    getSettings<TContext = unknown>(params?: T.GetIndexSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetIndexSettingsResponse, TContext>>
    getTemplate<TContext = unknown>(params?: T.GetIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetIndexTemplateResponse, TContext>>
    getUpgrade<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    migrateToDataStream<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    open<TContext = unknown>(params: T.OpenIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.OpenIndexResponse, TContext>>
    promoteDataStream<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putAlias<TContext = unknown>(params: T.PutAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutAliasResponse, TContext>>
    putIndexTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putMapping<TContext = unknown>(params?: T.PutMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutMappingResponse, TContext>>
    putSettings<TContext = unknown>(params?: T.UpdateIndexSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateIndexSettingsResponse, TContext>>
    putTemplate<TContext = unknown>(params: T.PutIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutIndexTemplateResponse, TContext>>
    recovery<TContext = unknown>(params?: T.RecoveryStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RecoveryStatusResponse, TContext>>
    refresh<TContext = unknown>(params?: T.RefreshRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RefreshResponse, TContext>>
    reloadSearchAnalyzers<TContext = unknown>(params: T.ReloadSearchAnalyzersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ReloadSearchAnalyzersResponse, TContext>>
    resolveIndex<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    rollover<TContext = unknown>(params: T.RolloverIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RolloverIndexResponse, TContext>>
    segments<TContext = unknown>(params?: T.SegmentsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SegmentsResponse, TContext>>
    shardStores<TContext = unknown>(params?: T.IndicesShardStoresRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesShardStoresResponse, TContext>>
    shrink<TContext = unknown>(params: T.ShrinkIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ShrinkIndexResponse, TContext>>
    simulateIndexTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    simulateTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    split<TContext = unknown>(params: T.SplitIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SplitIndexResponse, TContext>>
    stats<TContext = unknown>(params?: T.IndicesStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesStatsResponse, TContext>>
    unfreeze<TContext = unknown>(params: T.UnfreezeIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UnfreezeIndexResponse, TContext>>
    updateAliases<TContext = unknown>(params?: T.BulkAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.BulkAliasResponse, TContext>>
    upgrade<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    validateQuery<TContext = unknown>(params?: T.ValidateQueryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ValidateQueryResponse, TContext>>
  }
  info<TContext = unknown>(params?: T.RootNodeInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RootNodeInfoResponse, TContext>>
  ingest: {
    deletePipeline<TContext = unknown>(params: T.DeletePipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeletePipelineResponse, TContext>>
    getPipeline<TContext = unknown>(params?: T.GetPipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetPipelineResponse, TContext>>
    processorGrok<TContext = unknown>(params?: T.GrokProcessorPatternsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GrokProcessorPatternsResponse, TContext>>
    putPipeline<TContext = unknown>(params: T.PutPipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutPipelineResponse, TContext>>
    simulate<TContext = unknown>(params?: T.SimulatePipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SimulatePipelineResponse, TContext>>
  }
  license: {
    delete<TContext = unknown>(params?: T.DeleteLicenseRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteLicenseResponse, TContext>>
    get<TContext = unknown>(params?: T.GetLicenseRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetLicenseResponse, TContext>>
    getBasicStatus<TContext = unknown>(params?: T.GetBasicLicenseStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetBasicLicenseStatusResponse, TContext>>
    getTrialStatus<TContext = unknown>(params?: T.GetTrialLicenseStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetTrialLicenseStatusResponse, TContext>>
    post<TContext = unknown>(params?: T.PostLicenseRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PostLicenseResponse, TContext>>
    postStartBasic<TContext = unknown>(params?: T.StartBasicLicenseRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartBasicLicenseResponse, TContext>>
    postStartTrial<TContext = unknown>(params?: T.StartTrialLicenseRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartTrialLicenseResponse, TContext>>
  }
  logstash: {
    deletePipeline<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getPipeline<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putPipeline<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  }
  mget<TDocument = unknown, TContext = unknown>(params?: T.MultiGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MultiGetResponse<TDocument>, TContext>>
  migration: {
    deprecations<TContext = unknown>(params?: T.DeprecationInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeprecationInfoResponse, TContext>>
  }
  ml: {
<<<<<<< HEAD
    closeJob<TContext = unknown>(params: T.CloseJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CloseJobResponse, TContext>>
    deleteCalendar<TContext = unknown>(params: T.DeleteCalendarRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteCalendarResponse, TContext>>
    deleteCalendarEvent<TContext = unknown>(params: T.DeleteCalendarEventRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteCalendarEventResponse, TContext>>
    deleteCalendarJob<TContext = unknown>(params: T.DeleteCalendarJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteCalendarJobResponse, TContext>>
    deleteDataFrameAnalytics<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    deleteDatafeed<TContext = unknown>(params: T.DeleteDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteDatafeedResponse, TContext>>
    deleteExpiredData<TContext = unknown>(params?: T.DeleteExpiredDataRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteExpiredDataResponse, TContext>>
    deleteFilter<TContext = unknown>(params: T.DeleteFilterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteFilterResponse, TContext>>
    deleteForecast<TContext = unknown>(params: T.DeleteForecastRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteForecastResponse, TContext>>
    deleteJob<TContext = unknown>(params: T.DeleteJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteJobResponse, TContext>>
    deleteModelSnapshot<TContext = unknown>(params: T.DeleteModelSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteModelSnapshotResponse, TContext>>
    deleteTrainedModel<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    deleteTrainedModelAlias<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    estimateModelMemory<TContext = unknown>(params?: T.EstimateModelMemoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EstimateModelMemoryResponse, TContext>>
    evaluateDataFrame<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    explainDataFrameAnalytics<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    flushJob<TContext = unknown>(params: T.FlushJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FlushJobResponse, TContext>>
    forecast<TContext = unknown>(params: T.ForecastJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ForecastJobResponse, TContext>>
    getBuckets<TContext = unknown>(params: T.GetBucketsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetBucketsResponse, TContext>>
    getCalendarEvents<TContext = unknown>(params: T.GetCalendarEventsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetCalendarEventsResponse, TContext>>
    getCalendars<TContext = unknown>(params?: T.GetCalendarsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetCalendarsResponse, TContext>>
    getCategories<TContext = unknown>(params: T.GetCategoriesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetCategoriesResponse, TContext>>
    getDataFrameAnalytics<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getDataFrameAnalyticsStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getDatafeedStats<TContext = unknown>(params?: T.GetDatafeedStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetDatafeedStatsResponse, TContext>>
    getDatafeeds<TContext = unknown>(params?: T.GetDatafeedsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetDatafeedsResponse, TContext>>
    getFilters<TContext = unknown>(params?: T.GetFiltersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetFiltersResponse, TContext>>
    getInfluencers<TContext = unknown>(params: T.GetInfluencersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetInfluencersResponse, TContext>>
    getJobStats<TContext = unknown>(params?: T.GetJobStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetJobStatsResponse, TContext>>
    getJobs<TContext = unknown>(params?: T.GetJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetJobsResponse, TContext>>
    getModelSnapshots<TContext = unknown>(params: T.GetModelSnapshotsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetModelSnapshotsResponse, TContext>>
    getOverallBuckets<TContext = unknown>(params: T.GetOverallBucketsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetOverallBucketsResponse, TContext>>
    getRecords<TContext = unknown>(params: T.GetAnomalyRecordsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetAnomalyRecordsResponse, TContext>>
    getTrainedModels<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getTrainedModelsStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    info<TContext = unknown>(params?: T.MachineLearningInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MachineLearningInfoResponse, TContext>>
    openJob<TContext = unknown>(params: T.OpenJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.OpenJobResponse, TContext>>
    postCalendarEvents<TContext = unknown>(params: T.PostCalendarEventsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PostCalendarEventsResponse, TContext>>
    postData<TContext = unknown>(params: T.PostJobDataRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PostJobDataResponse, TContext>>
    previewDataFrameAnalytics<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    previewDatafeed<TDocument = unknown, TContext = unknown>(params: T.PreviewDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PreviewDatafeedResponse<TDocument>, TContext>>
    putCalendar<TContext = unknown>(params: T.PutCalendarRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutCalendarResponse, TContext>>
    putCalendarJob<TContext = unknown>(params: T.PutCalendarJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutCalendarJobResponse, TContext>>
    putDataFrameAnalytics<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putDatafeed<TContext = unknown>(params: T.PutDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutDatafeedResponse, TContext>>
    putFilter<TContext = unknown>(params: T.PutFilterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutFilterResponse, TContext>>
    putJob<TContext = unknown>(params: T.PutJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutJobResponse, TContext>>
    putTrainedModel<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putTrainedModelAlias<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    revertModelSnapshot<TContext = unknown>(params: T.RevertModelSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RevertModelSnapshotResponse, TContext>>
    setUpgradeMode<TContext = unknown>(params?: T.SetUpgradeModeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SetUpgradeModeResponse, TContext>>
    startDataFrameAnalytics<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    startDatafeed<TContext = unknown>(params: T.StartDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartDatafeedResponse, TContext>>
    stopDataFrameAnalytics<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    stopDatafeed<TContext = unknown>(params: T.StopDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StopDatafeedResponse, TContext>>
    updateDataFrameAnalytics<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    updateDatafeed<TContext = unknown>(params: T.UpdateDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateDatafeedResponse, TContext>>
    updateFilter<TContext = unknown>(params: T.UpdateFilterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateFilterResponse, TContext>>
    updateJob<TContext = unknown>(params: T.UpdateJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateJobResponse, TContext>>
    updateModelSnapshot<TContext = unknown>(params: T.UpdateModelSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateModelSnapshotResponse, TContext>>
    upgradeJobSnapshot<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    validate<TContext = unknown>(params?: T.ValidateJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ValidateJobResponse, TContext>>
    validateDetector<TContext = unknown>(params?: T.ValidateDetectorRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ValidateDetectorResponse, TContext>>
=======
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
    deleteTrainedModelAlias<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteTrainedModelAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    estimateModelMemory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlEstimateModelMemory<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    evaluateDataFrame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlEvaluateDataFrame<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explainDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
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
    previewDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPreviewDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    previewDatafeed<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlPreviewDatafeed, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putCalendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutCalendar<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putCalendarJob<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutCalendarJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutFilter<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTrainedModel<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutTrainedModel<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTrainedModelAlias<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutTrainedModelAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
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
    upgradeJobSnapshot<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpgradeJobSnapshot, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlValidate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validateDetector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlValidateDetector<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
>>>>>>> master
  }
  monitoring: {
    bulk<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  }
  msearch<TContext = unknown>(params?: T.MultiSearchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MultiSearchResponse, TContext>>
  msearchTemplate<TContext = unknown>(params?: T.MultiSearchTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MultiSearchTemplateResponse, TContext>>
  mtermvectors<TContext = unknown>(params?: T.MultiTermVectorsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MultiTermVectorsResponse, TContext>>
  nodes: {
    hotThreads<TContext = unknown>(params?: T.NodesHotThreadsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesHotThreadsResponse, TContext>>
    info<TContext = unknown>(params?: T.NodesInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesInfoResponse, TContext>>
    reloadSecureSettings<TContext = unknown>(params?: T.ReloadSecureSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ReloadSecureSettingsResponse, TContext>>
    stats<TContext = unknown>(params?: T.NodesStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesStatsResponse, TContext>>
    usage<TContext = unknown>(params?: T.NodesUsageRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesUsageResponse, TContext>>
  }
  openPointInTime<TContext = unknown>(params: T.OpenPointInTimeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.OpenPointInTimeResponse, TContext>>
  ping<TContext = unknown>(params?: T.PingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PingResponse, TContext>>
  putScript<TContext = unknown>(params: T.PutScriptRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutScriptResponse, TContext>>
  rankEval<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  reindex<TContext = unknown>(params?: T.ReindexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ReindexResponse, TContext>>
  reindexRethrottle<TContext = unknown>(params: T.ReindexRethrottleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ReindexRethrottleResponse, TContext>>
  renderSearchTemplate<TContext = unknown>(params?: T.RenderSearchTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RenderSearchTemplateResponse, TContext>>
  rollup: {
    deleteJob<TContext = unknown>(params: T.DeleteRollupJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteRollupJobResponse, TContext>>
    getJobs<TContext = unknown>(params?: T.GetRollupJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetRollupJobResponse, TContext>>
    getRollupCaps<TContext = unknown>(params?: T.GetRollupCapabilitiesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetRollupCapabilitiesResponse, TContext>>
    getRollupIndexCaps<TContext = unknown>(params: T.GetRollupIndexCapabilitiesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetRollupIndexCapabilitiesResponse, TContext>>
    putJob<TContext = unknown>(params: T.CreateRollupJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CreateRollupJobResponse, TContext>>
    rollup<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    rollupSearch<TDocument = unknown, TContext = unknown>(params: T.RollupSearchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupSearchResponse<TDocument>, TContext>>
    startJob<TContext = unknown>(params: T.StartRollupJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartRollupJobResponse, TContext>>
    stopJob<TContext = unknown>(params: T.StopRollupJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StopRollupJobResponse, TContext>>
  }
  scriptsPainlessExecute<TResult = unknown, TContext = unknown>(params?: T.ExecutePainlessScriptRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExecutePainlessScriptResponse<TResult>, TContext>>
  scroll<TDocument = unknown, TContext = unknown>(params?: T.ScrollRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ScrollResponse<TDocument>, TContext>>
  search<TDocument = unknown, TContext = unknown>(params?: T.SearchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchResponse<TDocument>, TContext>>
  searchShards<TContext = unknown>(params?: T.SearchShardsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchShardsResponse, TContext>>
  searchTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  searchableSnapshots: {
    clearCache<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    mount<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    repositoryStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    stats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  }
  security: {
    authenticate<TContext = unknown>(params?: T.AuthenticateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AuthenticateResponse, TContext>>
    changePassword<TContext = unknown>(params?: T.ChangePasswordRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ChangePasswordResponse, TContext>>
    clearApiKeyCache<TContext = unknown>(params?: T.ClearApiKeyCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClearApiKeyCacheResponse, TContext>>
    clearCachedPrivileges<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    clearCachedRealms<TContext = unknown>(params: T.ClearCachedRealmsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClearCachedRealmsResponse, TContext>>
    clearCachedRoles<TContext = unknown>(params: T.ClearCachedRolesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClearCachedRolesResponse, TContext>>
    createApiKey<TContext = unknown>(params?: T.CreateApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CreateApiKeyResponse, TContext>>
    deletePrivileges<TContext = unknown>(params: T.DeletePrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeletePrivilegesResponse, TContext>>
    deleteRole<TContext = unknown>(params: T.DeleteRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteRoleResponse, TContext>>
    deleteRoleMapping<TContext = unknown>(params: T.DeleteRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteRoleMappingResponse, TContext>>
    deleteUser<TContext = unknown>(params: T.DeleteUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteUserResponse, TContext>>
    disableUser<TContext = unknown>(params: T.DisableUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DisableUserResponse, TContext>>
    enableUser<TContext = unknown>(params: T.EnableUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EnableUserResponse, TContext>>
    getApiKey<TContext = unknown>(params?: T.GetApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetApiKeyResponse, TContext>>
    getBuiltinPrivileges<TContext = unknown>(params?: T.GetBuiltinPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetBuiltinPrivilegesResponse, TContext>>
    getPrivileges<TContext = unknown>(params?: T.GetPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetPrivilegesResponse, TContext>>
    getRole<TContext = unknown>(params?: T.GetRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetRoleResponse, TContext>>
    getRoleMapping<TContext = unknown>(params?: T.GetRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetRoleMappingResponse, TContext>>
    getToken<TContext = unknown>(params?: T.GetUserAccessTokenRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetUserAccessTokenResponse, TContext>>
    getUser<TContext = unknown>(params?: T.GetUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetUserResponse, TContext>>
    getUserPrivileges<TContext = unknown>(params?: T.GetUserPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetUserPrivilegesResponse, TContext>>
    grantApiKey<TContext = unknown>(params?: T.GrantApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GrantApiKeyResponse, TContext>>
    hasPrivileges<TContext = unknown>(params?: T.HasPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.HasPrivilegesResponse, TContext>>
    invalidateApiKey<TContext = unknown>(params?: T.InvalidateApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.InvalidateApiKeyResponse, TContext>>
    invalidateToken<TContext = unknown>(params?: T.InvalidateUserAccessTokenRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.InvalidateUserAccessTokenResponse, TContext>>
    putPrivileges<TContext = unknown>(params?: T.PutPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutPrivilegesResponse, TContext>>
    putRole<TContext = unknown>(params: T.PutRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutRoleResponse, TContext>>
    putRoleMapping<TContext = unknown>(params: T.PutRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutRoleMappingResponse, TContext>>
    putUser<TContext = unknown>(params: T.PutUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutUserResponse, TContext>>
  }
  slm: {
    deleteLifecycle<TContext = unknown>(params: T.DeleteSnapshotLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteSnapshotLifecycleResponse, TContext>>
    executeLifecycle<TContext = unknown>(params: T.ExecuteSnapshotLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExecuteSnapshotLifecycleResponse, TContext>>
    executeRetention<TContext = unknown>(params?: T.ExecuteRetentionRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExecuteRetentionResponse, TContext>>
    getLifecycle<TContext = unknown>(params?: T.GetSnapshotLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetSnapshotLifecycleResponse, TContext>>
    getStats<TContext = unknown>(params?: T.GetSnapshotLifecycleStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetSnapshotLifecycleStatsResponse, TContext>>
    getStatus<TContext = unknown>(params?: T.GetSnapshotLifecycleManagementStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetSnapshotLifecycleManagementStatusResponse, TContext>>
    putLifecycle<TContext = unknown>(params: T.PutSnapshotLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutSnapshotLifecycleResponse, TContext>>
    start<TContext = unknown>(params?: T.StartSnapshotLifecycleManagementRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartSnapshotLifecycleManagementResponse, TContext>>
    stop<TContext = unknown>(params?: T.StopSnapshotLifecycleManagementRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StopSnapshotLifecycleManagementResponse, TContext>>
  }
  snapshot: {
<<<<<<< HEAD
    cleanupRepository<TContext = unknown>(params: T.CleanupRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CleanupRepositoryResponse, TContext>>
    clone<TContext = unknown>(params: T.CloneSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CloneSnapshotResponse, TContext>>
    create<TContext = unknown>(params: T.SnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotResponse, TContext>>
    createRepository<TContext = unknown>(params: T.CreateRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CreateRepositoryResponse, TContext>>
    delete<TContext = unknown>(params: T.DeleteSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteSnapshotResponse, TContext>>
    deleteRepository<TContext = unknown>(params: T.DeleteRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteRepositoryResponse, TContext>>
    get<TContext = unknown>(params: T.GetSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetSnapshotResponse, TContext>>
    getRepository<TContext = unknown>(params?: T.GetRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetRepositoryResponse, TContext>>
    restore<TContext = unknown>(params: T.RestoreRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RestoreResponse, TContext>>
    status<TContext = unknown>(params?: T.SnapshotStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotStatusResponse, TContext>>
    verifyRepository<TContext = unknown>(params: T.VerifyRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.VerifyRepositoryResponse, TContext>>
=======
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
>>>>>>> master
  }
  sql: {
    clearCursor<TContext = unknown>(params?: T.ClearSqlCursorRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClearSqlCursorResponse, TContext>>
    query<TContext = unknown>(params?: T.QuerySqlRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.QuerySqlResponse, TContext>>
    translate<TContext = unknown>(params?: T.TranslateSqlRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TranslateSqlResponse, TContext>>
  }
  ssl: {
    certificates<TContext = unknown>(params?: T.GetCertificatesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetCertificatesResponse, TContext>>
  }
  tasks: {
    cancel<TContext = unknown>(params?: T.CancelTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CancelTasksResponse, TContext>>
    get<TContext = unknown>(params: T.GetTaskRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetTaskResponse, TContext>>
    list<TContext = unknown>(params?: T.ListTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ListTasksResponse, TContext>>
  }
  termvectors<TDocument = unknown, TContext = unknown>(params: T.TermVectorsRequest<TDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TermVectorsResponse, TContext>>
  textStructure: {
    findStructure<TBody = unknown, TContext = unknown>(params: T.FindStructureRequest<TBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FindStructureResponse, TContext>>
  }
  transform: {
    deleteTransform<TContext = unknown>(params: T.DeleteTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteTransformResponse, TContext>>
    getTransform<TContext = unknown>(params?: T.GetTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetTransformResponse, TContext>>
    getTransformStats<TContext = unknown>(params: T.GetTransformStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetTransformStatsResponse, TContext>>
    previewTransform<TTransform = unknown, TContext = unknown>(params?: T.PreviewTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PreviewTransformResponse<TTransform>, TContext>>
    putTransform<TContext = unknown>(params: T.PutTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutTransformResponse, TContext>>
    startTransform<TContext = unknown>(params: T.StartTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartTransformResponse, TContext>>
    stopTransform<TContext = unknown>(params: T.StopTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StopTransformResponse, TContext>>
    updateTransform<TContext = unknown>(params: T.UpdateTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateTransformResponse, TContext>>
  }
  update<TDocumentR = unknown, TDocument = unknown, TPartialDocument = unknown, TContext = unknown>(params: T.UpdateRequest<TDocument, TPartialDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateResponse<TDocumentR>, TContext>>
  updateByQuery<TContext = unknown>(params: T.UpdateByQueryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateByQueryResponse, TContext>>
  updateByQueryRethrottle<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  watcher: {
    ackWatch<TContext = unknown>(params: T.AcknowledgeWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AcknowledgeWatchResponse, TContext>>
    activateWatch<TContext = unknown>(params: T.ActivateWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ActivateWatchResponse, TContext>>
    deactivateWatch<TContext = unknown>(params: T.DeactivateWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeactivateWatchResponse, TContext>>
    deleteWatch<TContext = unknown>(params: T.DeleteWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteWatchResponse, TContext>>
    executeWatch<TContext = unknown>(params?: T.ExecuteWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExecuteWatchResponse, TContext>>
    getWatch<TContext = unknown>(params: T.GetWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetWatchResponse, TContext>>
    putWatch<TContext = unknown>(params: T.PutWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutWatchResponse, TContext>>
    queryWatches<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    start<TContext = unknown>(params?: T.StartWatcherRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartWatcherResponse, TContext>>
    stats<TContext = unknown>(params?: T.WatcherStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherStatsResponse, TContext>>
    stop<TContext = unknown>(params?: T.StopWatcherRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StopWatcherResponse, TContext>>
  }
  xpack: {
    info<TContext = unknown>(params?: T.XPackInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.XPackInfoResponse, TContext>>
    usage<TContext = unknown>(params?: T.XPackUsageRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.XPackUsageResponse, TContext>>
  }
}

export { KibanaClient }
