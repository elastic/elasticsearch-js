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
    deleteAutoscalingPolicy<TContext = unknown>(params: T.AutoscalingDeleteAutoscalingPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AutoscalingDeleteAutoscalingPolicyResponse, TContext>>
    getAutoscalingCapacity<TContext = unknown>(params?: T.AutoscalingGetAutoscalingCapacityRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AutoscalingGetAutoscalingCapacityResponse, TContext>>
    getAutoscalingPolicy<TContext = unknown>(params: T.AutoscalingGetAutoscalingPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AutoscalingGetAutoscalingPolicyResponse, TContext>>
    putAutoscalingPolicy<TContext = unknown>(params: T.AutoscalingPutAutoscalingPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AutoscalingPutAutoscalingPolicyResponse, TContext>>
  }
  bulk<TDocument = unknown, TPartialDocument = unknown, TContext = unknown>(params: T.BulkRequest<TDocument, TPartialDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.BulkResponse, TContext>>
  cat: {
    aliases<TContext = unknown>(params?: T.CatAliasesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatAliasesResponse, TContext>>
    allocation<TContext = unknown>(params?: T.CatAllocationRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatAllocationResponse, TContext>>
    count<TContext = unknown>(params?: T.CatCountRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatCountResponse, TContext>>
    fielddata<TContext = unknown>(params?: T.CatFielddataRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatFielddataResponse, TContext>>
    health<TContext = unknown>(params?: T.CatHealthRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatHealthResponse, TContext>>
    help<TContext = unknown>(params?: T.CatHelpRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatHelpResponse, TContext>>
    indices<TContext = unknown>(params?: T.CatIndicesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatIndicesResponse, TContext>>
    master<TContext = unknown>(params?: T.CatMasterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatMasterResponse, TContext>>
    mlDataFrameAnalytics<TContext = unknown>(params?: T.CatMlDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatMlDataFrameAnalyticsResponse, TContext>>
    mlDatafeeds<TContext = unknown>(params?: T.CatMlDatafeedsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatMlDatafeedsResponse, TContext>>
    mlJobs<TContext = unknown>(params?: T.CatMlJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatMlJobsResponse, TContext>>
    mlTrainedModels<TContext = unknown>(params?: T.CatMlTrainedModelsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatMlTrainedModelsResponse, TContext>>
    nodeattrs<TContext = unknown>(params?: T.CatNodeattrsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatNodeattrsResponse, TContext>>
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
    deleteAutoFollowPattern<TContext = unknown>(params: T.CcrDeleteAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrDeleteAutoFollowPatternResponse, TContext>>
    follow<TContext = unknown>(params: T.CcrFollowRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrFollowResponse, TContext>>
    followInfo<TContext = unknown>(params: T.CcrFollowInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrFollowInfoResponse, TContext>>
    followStats<TContext = unknown>(params: T.CcrFollowStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrFollowStatsResponse, TContext>>
    forgetFollower<TContext = unknown>(params: T.CcrForgetFollowerRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrForgetFollowerResponse, TContext>>
    getAutoFollowPattern<TContext = unknown>(params?: T.CcrGetAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrGetAutoFollowPatternResponse, TContext>>
    pauseAutoFollowPattern<TContext = unknown>(params: T.CcrPauseAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrPauseAutoFollowPatternResponse, TContext>>
    pauseFollow<TContext = unknown>(params: T.CcrPauseFollowRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrPauseFollowResponse, TContext>>
    putAutoFollowPattern<TContext = unknown>(params: T.CcrPutAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrPutAutoFollowPatternResponse, TContext>>
    resumeAutoFollowPattern<TContext = unknown>(params: T.CcrResumeAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrResumeAutoFollowPatternResponse, TContext>>
    resumeFollow<TContext = unknown>(params: T.CcrResumeFollowRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrResumeFollowResponse, TContext>>
    stats<TContext = unknown>(params?: T.CcrStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrStatsResponse, TContext>>
    unfollow<TContext = unknown>(params: T.CcrUnfollowRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrUnfollowResponse, TContext>>
  }
  clearScroll<TContext = unknown>(params?: T.ClearScrollRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClearScrollResponse, TContext>>
  closePointInTime<TContext = unknown>(params?: T.ClosePointInTimeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClosePointInTimeResponse, TContext>>
  cluster: {
    allocationExplain<TContext = unknown>(params?: T.ClusterAllocationExplainRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterAllocationExplainResponse, TContext>>
    deleteComponentTemplate<TContext = unknown>(params: T.ClusterDeleteComponentTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterDeleteComponentTemplateResponse, TContext>>
    deleteVotingConfigExclusions<TContext = unknown>(params?: T.ClusterDeleteVotingConfigExclusionsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterDeleteVotingConfigExclusionsResponse, TContext>>
    existsComponentTemplate<TContext = unknown>(params: T.ClusterExistsComponentTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterExistsComponentTemplateResponse, TContext>>
    getComponentTemplate<TContext = unknown>(params?: T.ClusterGetComponentTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterGetComponentTemplateResponse, TContext>>
    getSettings<TContext = unknown>(params?: T.ClusterGetSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterGetSettingsResponse, TContext>>
    health<TContext = unknown>(params?: T.ClusterHealthRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterHealthResponse, TContext>>
    pendingTasks<TContext = unknown>(params?: T.ClusterPendingTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterPendingTasksResponse, TContext>>
    postVotingConfigExclusions<TContext = unknown>(params?: T.ClusterPostVotingConfigExclusionsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterPostVotingConfigExclusionsResponse, TContext>>
    putComponentTemplate<TContext = unknown>(params: T.ClusterPutComponentTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterPutComponentTemplateResponse, TContext>>
    putSettings<TContext = unknown>(params?: T.ClusterPutSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterPutSettingsResponse, TContext>>
    remoteInfo<TContext = unknown>(params?: T.ClusterRemoteInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterRemoteInfoResponse, TContext>>
    reroute<TContext = unknown>(params?: T.ClusterRerouteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterRerouteResponse, TContext>>
    state<TContext = unknown>(params?: T.ClusterStateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterStateResponse, TContext>>
    stats<TContext = unknown>(params?: T.ClusterStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterStatsResponse, TContext>>
  }
  count<TContext = unknown>(params?: T.CountRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CountResponse, TContext>>
  create<TDocument = unknown, TContext = unknown>(params: T.CreateRequest<TDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CreateResponse, TContext>>
  danglingIndices: {
    deleteDanglingIndex<TContext = unknown>(params: T.DanglingIndicesDeleteDanglingIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DanglingIndicesDeleteDanglingIndexResponse, TContext>>
    importDanglingIndex<TContext = unknown>(params: T.DanglingIndicesImportDanglingIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DanglingIndicesImportDanglingIndexResponse, TContext>>
    listDanglingIndices<TContext = unknown>(params?: T.DanglingIndicesListDanglingIndicesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DanglingIndicesListDanglingIndicesResponse, TContext>>
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
    deletePolicy<TContext = unknown>(params: T.EnrichDeletePolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EnrichDeletePolicyResponse, TContext>>
    executePolicy<TContext = unknown>(params: T.EnrichExecutePolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EnrichExecutePolicyResponse, TContext>>
    getPolicy<TContext = unknown>(params?: T.EnrichGetPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EnrichGetPolicyResponse, TContext>>
    putPolicy<TContext = unknown>(params: T.EnrichPutPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EnrichPutPolicyResponse, TContext>>
    stats<TContext = unknown>(params?: T.EnrichStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EnrichStatsResponse, TContext>>
  }
  eql: {
    delete<TContext = unknown>(params: T.EqlDeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EqlDeleteResponse, TContext>>
    get<TEvent = unknown, TContext = unknown>(params: T.EqlGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EqlGetResponse<TEvent>, TContext>>
    getStatus<TContext = unknown>(params: T.EqlGetStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EqlGetStatusResponse, TContext>>
    search<TEvent = unknown, TContext = unknown>(params: T.EqlSearchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EqlSearchResponse<TEvent>, TContext>>
  }
  exists<TContext = unknown>(params: T.ExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExistsResponse, TContext>>
  existsSource<TContext = unknown>(params: T.ExistsSourceRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExistsSourceResponse, TContext>>
  explain<TDocument = unknown, TContext = unknown>(params: T.ExplainRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExplainResponse<TDocument>, TContext>>
  features: {
    getFeatures<TContext = unknown>(params?: T.FeaturesGetFeaturesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FeaturesGetFeaturesResponse, TContext>>
    resetFeatures<TContext = unknown>(params?: T.FeaturesResetFeaturesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FeaturesResetFeaturesResponse, TContext>>
  }
  fieldCaps<TContext = unknown>(params?: T.FieldCapsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FieldCapsResponse, TContext>>
  fleet: {
    globalCheckpoints<TContext = unknown>(params: T.FleetGlobalCheckpointsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FleetGlobalCheckpointsResponse, TContext>>
    msearch<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    search<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  }
  get<TDocument = unknown, TContext = unknown>(params: T.GetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetResponse<TDocument>, TContext>>
  getScript<TContext = unknown>(params: T.GetScriptRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetScriptResponse, TContext>>
  getScriptContext<TContext = unknown>(params?: T.GetScriptContextRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetScriptContextResponse, TContext>>
  getScriptLanguages<TContext = unknown>(params?: T.GetScriptLanguagesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetScriptLanguagesResponse, TContext>>
  getSource<TDocument = unknown, TContext = unknown>(params: T.GetSourceRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetSourceResponse<TDocument>, TContext>>
  graph: {
    explore<TContext = unknown>(params: T.GraphExploreRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GraphExploreResponse, TContext>>
  }
  ilm: {
    deleteLifecycle<TContext = unknown>(params: T.IlmDeleteLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmDeleteLifecycleResponse, TContext>>
    explainLifecycle<TContext = unknown>(params: T.IlmExplainLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmExplainLifecycleResponse, TContext>>
    getLifecycle<TContext = unknown>(params?: T.IlmGetLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmGetLifecycleResponse, TContext>>
    getStatus<TContext = unknown>(params?: T.IlmGetStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmGetStatusResponse, TContext>>
    migrateToDataTiers<TContext = unknown>(params?: T.IlmMigrateToDataTiersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmMigrateToDataTiersResponse, TContext>>
    moveToStep<TContext = unknown>(params: T.IlmMoveToStepRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmMoveToStepResponse, TContext>>
    putLifecycle<TContext = unknown>(params: T.IlmPutLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmPutLifecycleResponse, TContext>>
    removePolicy<TContext = unknown>(params: T.IlmRemovePolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmRemovePolicyResponse, TContext>>
    retry<TContext = unknown>(params: T.IlmRetryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmRetryResponse, TContext>>
    start<TContext = unknown>(params?: T.IlmStartRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmStartResponse, TContext>>
    stop<TContext = unknown>(params?: T.IlmStopRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmStopResponse, TContext>>
  }
  index<TDocument = unknown, TContext = unknown>(params: T.IndexRequest<TDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndexResponse, TContext>>
  indices: {
    addBlock<TContext = unknown>(params: T.IndicesAddBlockRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesAddBlockResponse, TContext>>
    analyze<TContext = unknown>(params?: T.IndicesAnalyzeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesAnalyzeResponse, TContext>>
    clearCache<TContext = unknown>(params?: T.IndicesClearCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesClearCacheResponse, TContext>>
    clone<TContext = unknown>(params: T.IndicesCloneRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesCloneResponse, TContext>>
    close<TContext = unknown>(params: T.IndicesCloseRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesCloseResponse, TContext>>
    create<TContext = unknown>(params: T.IndicesCreateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesCreateResponse, TContext>>
    createDataStream<TContext = unknown>(params: T.IndicesCreateDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesCreateDataStreamResponse, TContext>>
    dataStreamsStats<TContext = unknown>(params?: T.IndicesDataStreamsStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDataStreamsStatsResponse, TContext>>
    delete<TContext = unknown>(params: T.IndicesDeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDeleteResponse, TContext>>
    deleteAlias<TContext = unknown>(params: T.IndicesDeleteAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDeleteAliasResponse, TContext>>
    deleteDataStream<TContext = unknown>(params: T.IndicesDeleteDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDeleteDataStreamResponse, TContext>>
    deleteIndexTemplate<TContext = unknown>(params: T.IndicesDeleteIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDeleteIndexTemplateResponse, TContext>>
    deleteTemplate<TContext = unknown>(params: T.IndicesDeleteTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDeleteTemplateResponse, TContext>>
    diskUsage<TContext = unknown>(params: T.IndicesDiskUsageRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDiskUsageResponse, TContext>>
    exists<TContext = unknown>(params: T.IndicesExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesExistsResponse, TContext>>
    existsAlias<TContext = unknown>(params: T.IndicesExistsAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesExistsAliasResponse, TContext>>
    existsIndexTemplate<TContext = unknown>(params: T.IndicesExistsIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesExistsIndexTemplateResponse, TContext>>
    existsTemplate<TContext = unknown>(params: T.IndicesExistsTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesExistsTemplateResponse, TContext>>
    existsType<TContext = unknown>(params: T.IndicesExistsTypeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesExistsTypeResponse, TContext>>
    fieldUsageStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    flush<TContext = unknown>(params?: T.IndicesFlushRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesFlushResponse, TContext>>
    flushSynced<TContext = unknown>(params?: T.IndicesFlushSyncedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesFlushSyncedResponse, TContext>>
    forcemerge<TContext = unknown>(params?: T.IndicesForcemergeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesForcemergeResponse, TContext>>
    freeze<TContext = unknown>(params: T.IndicesFreezeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesFreezeResponse, TContext>>
    get<TContext = unknown>(params: T.IndicesGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetResponse, TContext>>
    getAlias<TContext = unknown>(params?: T.IndicesGetAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetAliasResponse, TContext>>
    getDataStream<TContext = unknown>(params?: T.IndicesGetDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetDataStreamResponse, TContext>>
    getFieldMapping<TContext = unknown>(params: T.IndicesGetFieldMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetFieldMappingResponse, TContext>>
    getIndexTemplate<TContext = unknown>(params?: T.IndicesGetIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetIndexTemplateResponse, TContext>>
    getMapping<TContext = unknown>(params?: T.IndicesGetMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetMappingResponse, TContext>>
    getSettings<TContext = unknown>(params?: T.IndicesGetSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetSettingsResponse, TContext>>
    getTemplate<TContext = unknown>(params?: T.IndicesGetTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetTemplateResponse, TContext>>
    getUpgrade<TContext = unknown>(params?: T.IndicesGetUpgradeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetUpgradeResponse, TContext>>
    migrateToDataStream<TContext = unknown>(params: T.IndicesMigrateToDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesMigrateToDataStreamResponse, TContext>>
    modifyDataStream<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    open<TContext = unknown>(params: T.IndicesOpenRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesOpenResponse, TContext>>
    promoteDataStream<TContext = unknown>(params: T.IndicesPromoteDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesPromoteDataStreamResponse, TContext>>
    putAlias<TContext = unknown>(params: T.IndicesPutAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesPutAliasResponse, TContext>>
    putIndexTemplate<TContext = unknown>(params: T.IndicesPutIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesPutIndexTemplateResponse, TContext>>
    putMapping<TContext = unknown>(params: T.IndicesPutMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesPutMappingResponse, TContext>>
    putSettings<TContext = unknown>(params?: T.IndicesPutSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesPutSettingsResponse, TContext>>
    putTemplate<TContext = unknown>(params: T.IndicesPutTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesPutTemplateResponse, TContext>>
    recovery<TContext = unknown>(params?: T.IndicesRecoveryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesRecoveryResponse, TContext>>
    refresh<TContext = unknown>(params?: T.IndicesRefreshRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesRefreshResponse, TContext>>
    reloadSearchAnalyzers<TContext = unknown>(params: T.IndicesReloadSearchAnalyzersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesReloadSearchAnalyzersResponse, TContext>>
    resolveIndex<TContext = unknown>(params: T.IndicesResolveIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesResolveIndexResponse, TContext>>
    rollover<TContext = unknown>(params: T.IndicesRolloverRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesRolloverResponse, TContext>>
    segments<TContext = unknown>(params?: T.IndicesSegmentsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesSegmentsResponse, TContext>>
    shardStores<TContext = unknown>(params?: T.IndicesShardStoresRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesShardStoresResponse, TContext>>
    shrink<TContext = unknown>(params: T.IndicesShrinkRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesShrinkResponse, TContext>>
    simulateIndexTemplate<TContext = unknown>(params: T.IndicesSimulateIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesSimulateIndexTemplateResponse, TContext>>
    simulateTemplate<TContext = unknown>(params?: T.IndicesSimulateTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesSimulateTemplateResponse, TContext>>
    split<TContext = unknown>(params: T.IndicesSplitRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesSplitResponse, TContext>>
    stats<TContext = unknown>(params?: T.IndicesStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesStatsResponse, TContext>>
    unfreeze<TContext = unknown>(params: T.IndicesUnfreezeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesUnfreezeResponse, TContext>>
    updateAliases<TContext = unknown>(params?: T.IndicesUpdateAliasesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesUpdateAliasesResponse, TContext>>
    upgrade<TContext = unknown>(params?: T.IndicesUpgradeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesUpgradeResponse, TContext>>
    validateQuery<TContext = unknown>(params?: T.IndicesValidateQueryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesValidateQueryResponse, TContext>>
  }
  info<TContext = unknown>(params?: T.InfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.InfoResponse, TContext>>
  ingest: {
    deletePipeline<TContext = unknown>(params: T.IngestDeletePipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IngestDeletePipelineResponse, TContext>>
    geoIpStats<TContext = unknown>(params?: T.IngestGeoIpStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IngestGeoIpStatsResponse, TContext>>
    getPipeline<TContext = unknown>(params?: T.IngestGetPipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IngestGetPipelineResponse, TContext>>
    processorGrok<TContext = unknown>(params?: T.IngestProcessorGrokRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IngestProcessorGrokResponse, TContext>>
    putPipeline<TContext = unknown>(params: T.IngestPutPipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IngestPutPipelineResponse, TContext>>
    simulate<TContext = unknown>(params?: T.IngestSimulateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IngestSimulateResponse, TContext>>
  }
  license: {
    delete<TContext = unknown>(params?: T.LicenseDeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LicenseDeleteResponse, TContext>>
    get<TContext = unknown>(params?: T.LicenseGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LicenseGetResponse, TContext>>
    getBasicStatus<TContext = unknown>(params?: T.LicenseGetBasicStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LicenseGetBasicStatusResponse, TContext>>
    getTrialStatus<TContext = unknown>(params?: T.LicenseGetTrialStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LicenseGetTrialStatusResponse, TContext>>
    post<TContext = unknown>(params?: T.LicensePostRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LicensePostResponse, TContext>>
    postStartBasic<TContext = unknown>(params?: T.LicensePostStartBasicRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LicensePostStartBasicResponse, TContext>>
    postStartTrial<TContext = unknown>(params?: T.LicensePostStartTrialRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LicensePostStartTrialResponse, TContext>>
  }
  logstash: {
    deletePipeline<TContext = unknown>(params: T.LogstashDeletePipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LogstashDeletePipelineResponse, TContext>>
    getPipeline<TContext = unknown>(params: T.LogstashGetPipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LogstashGetPipelineResponse, TContext>>
    putPipeline<TContext = unknown>(params: T.LogstashPutPipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LogstashPutPipelineResponse, TContext>>
  }
  mget<TDocument = unknown, TContext = unknown>(params?: T.MgetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MgetResponse<TDocument>, TContext>>
  migration: {
    deprecations<TContext = unknown>(params?: T.MigrationDeprecationsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MigrationDeprecationsResponse, TContext>>
    getFeatureUpgradeStatus<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    postFeatureUpgrade<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  }
  ml: {
    closeJob<TContext = unknown>(params: T.MlCloseJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlCloseJobResponse, TContext>>
    deleteCalendar<TContext = unknown>(params: T.MlDeleteCalendarRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteCalendarResponse, TContext>>
    deleteCalendarEvent<TContext = unknown>(params: T.MlDeleteCalendarEventRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteCalendarEventResponse, TContext>>
    deleteCalendarJob<TContext = unknown>(params: T.MlDeleteCalendarJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteCalendarJobResponse, TContext>>
    deleteDataFrameAnalytics<TContext = unknown>(params: T.MlDeleteDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteDataFrameAnalyticsResponse, TContext>>
    deleteDatafeed<TContext = unknown>(params: T.MlDeleteDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteDatafeedResponse, TContext>>
    deleteExpiredData<TContext = unknown>(params?: T.MlDeleteExpiredDataRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteExpiredDataResponse, TContext>>
    deleteFilter<TContext = unknown>(params: T.MlDeleteFilterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteFilterResponse, TContext>>
    deleteForecast<TContext = unknown>(params: T.MlDeleteForecastRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteForecastResponse, TContext>>
    deleteJob<TContext = unknown>(params: T.MlDeleteJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteJobResponse, TContext>>
    deleteModelSnapshot<TContext = unknown>(params: T.MlDeleteModelSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteModelSnapshotResponse, TContext>>
    deleteTrainedModel<TContext = unknown>(params: T.MlDeleteTrainedModelRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteTrainedModelResponse, TContext>>
    deleteTrainedModelAlias<TContext = unknown>(params: T.MlDeleteTrainedModelAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteTrainedModelAliasResponse, TContext>>
    estimateModelMemory<TContext = unknown>(params?: T.MlEstimateModelMemoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlEstimateModelMemoryResponse, TContext>>
    evaluateDataFrame<TContext = unknown>(params?: T.MlEvaluateDataFrameRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlEvaluateDataFrameResponse, TContext>>
    explainDataFrameAnalytics<TContext = unknown>(params?: T.MlExplainDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlExplainDataFrameAnalyticsResponse, TContext>>
    findFileStructure<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    flushJob<TContext = unknown>(params: T.MlFlushJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlFlushJobResponse, TContext>>
    forecast<TContext = unknown>(params: T.MlForecastRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlForecastResponse, TContext>>
    getBuckets<TContext = unknown>(params: T.MlGetBucketsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetBucketsResponse, TContext>>
    getCalendarEvents<TContext = unknown>(params: T.MlGetCalendarEventsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetCalendarEventsResponse, TContext>>
    getCalendars<TContext = unknown>(params?: T.MlGetCalendarsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetCalendarsResponse, TContext>>
    getCategories<TContext = unknown>(params: T.MlGetCategoriesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetCategoriesResponse, TContext>>
    getDataFrameAnalytics<TContext = unknown>(params?: T.MlGetDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetDataFrameAnalyticsResponse, TContext>>
    getDataFrameAnalyticsStats<TContext = unknown>(params?: T.MlGetDataFrameAnalyticsStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetDataFrameAnalyticsStatsResponse, TContext>>
    getDatafeedStats<TContext = unknown>(params?: T.MlGetDatafeedStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetDatafeedStatsResponse, TContext>>
    getDatafeeds<TContext = unknown>(params?: T.MlGetDatafeedsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetDatafeedsResponse, TContext>>
    getFilters<TContext = unknown>(params?: T.MlGetFiltersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetFiltersResponse, TContext>>
    getInfluencers<TContext = unknown>(params: T.MlGetInfluencersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetInfluencersResponse, TContext>>
    getJobStats<TContext = unknown>(params?: T.MlGetJobStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetJobStatsResponse, TContext>>
    getJobs<TContext = unknown>(params?: T.MlGetJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetJobsResponse, TContext>>
    getModelSnapshotUpgradeStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getModelSnapshots<TContext = unknown>(params: T.MlGetModelSnapshotsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetModelSnapshotsResponse, TContext>>
    getOverallBuckets<TContext = unknown>(params: T.MlGetOverallBucketsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetOverallBucketsResponse, TContext>>
    getRecords<TContext = unknown>(params: T.MlGetRecordsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetRecordsResponse, TContext>>
    getTrainedModels<TContext = unknown>(params?: T.MlGetTrainedModelsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetTrainedModelsResponse, TContext>>
    getTrainedModelsStats<TContext = unknown>(params?: T.MlGetTrainedModelsStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetTrainedModelsStatsResponse, TContext>>
    info<TContext = unknown>(params?: T.MlInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlInfoResponse, TContext>>
    openJob<TContext = unknown>(params: T.MlOpenJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlOpenJobResponse, TContext>>
    postCalendarEvents<TContext = unknown>(params: T.MlPostCalendarEventsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPostCalendarEventsResponse, TContext>>
    postData<TData = unknown, TContext = unknown>(params: T.MlPostDataRequest<TData>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPostDataResponse, TContext>>
    previewDataFrameAnalytics<TContext = unknown>(params?: T.MlPreviewDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPreviewDataFrameAnalyticsResponse, TContext>>
    previewDatafeed<TDocument = unknown, TContext = unknown>(params?: T.MlPreviewDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPreviewDatafeedResponse<TDocument>, TContext>>
    putCalendar<TContext = unknown>(params: T.MlPutCalendarRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutCalendarResponse, TContext>>
    putCalendarJob<TContext = unknown>(params: T.MlPutCalendarJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutCalendarJobResponse, TContext>>
    putDataFrameAnalytics<TContext = unknown>(params: T.MlPutDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutDataFrameAnalyticsResponse, TContext>>
    putDatafeed<TContext = unknown>(params: T.MlPutDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutDatafeedResponse, TContext>>
    putFilter<TContext = unknown>(params: T.MlPutFilterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutFilterResponse, TContext>>
    putJob<TContext = unknown>(params: T.MlPutJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutJobResponse, TContext>>
    putTrainedModel<TContext = unknown>(params: T.MlPutTrainedModelRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutTrainedModelResponse, TContext>>
    putTrainedModelAlias<TContext = unknown>(params: T.MlPutTrainedModelAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutTrainedModelAliasResponse, TContext>>
    resetJob<TContext = unknown>(params: T.MlResetJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlResetJobResponse, TContext>>
    revertModelSnapshot<TContext = unknown>(params: T.MlRevertModelSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlRevertModelSnapshotResponse, TContext>>
    setUpgradeMode<TContext = unknown>(params?: T.MlSetUpgradeModeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlSetUpgradeModeResponse, TContext>>
    startDataFrameAnalytics<TContext = unknown>(params: T.MlStartDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlStartDataFrameAnalyticsResponse, TContext>>
    startDatafeed<TContext = unknown>(params: T.MlStartDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlStartDatafeedResponse, TContext>>
    stopDataFrameAnalytics<TContext = unknown>(params: T.MlStopDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlStopDataFrameAnalyticsResponse, TContext>>
    stopDatafeed<TContext = unknown>(params: T.MlStopDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlStopDatafeedResponse, TContext>>
    updateDataFrameAnalytics<TContext = unknown>(params: T.MlUpdateDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlUpdateDataFrameAnalyticsResponse, TContext>>
    updateDatafeed<TContext = unknown>(params: T.MlUpdateDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlUpdateDatafeedResponse, TContext>>
    updateFilter<TContext = unknown>(params: T.MlUpdateFilterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlUpdateFilterResponse, TContext>>
    updateJob<TContext = unknown>(params: T.MlUpdateJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlUpdateJobResponse, TContext>>
    updateModelSnapshot<TContext = unknown>(params: T.MlUpdateModelSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlUpdateModelSnapshotResponse, TContext>>
    upgradeJobSnapshot<TContext = unknown>(params: T.MlUpgradeJobSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlUpgradeJobSnapshotResponse, TContext>>
    validate<TContext = unknown>(params?: T.MlValidateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlValidateResponse, TContext>>
    validateDetector<TContext = unknown>(params?: T.MlValidateDetectorRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlValidateDetectorResponse, TContext>>
  }
  monitoring: {
    bulk<TDocument = unknown, TPartialDocument = unknown, TContext = unknown>(params: T.MonitoringBulkRequest<TDocument, TPartialDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MonitoringBulkResponse, TContext>>
  }
  msearch<TDocument = unknown, TContext = unknown>(params?: T.MsearchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MsearchResponse<TDocument>, TContext>>
  msearchTemplate<TDocument = unknown, TContext = unknown>(params?: T.MsearchTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MsearchTemplateResponse<TDocument>, TContext>>
  mtermvectors<TContext = unknown>(params?: T.MtermvectorsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MtermvectorsResponse, TContext>>
  nodes: {
    clearRepositoriesMeteringArchive<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getRepositoriesMeteringInfo<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    hotThreads<TContext = unknown>(params?: T.NodesHotThreadsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesHotThreadsResponse, TContext>>
    info<TContext = unknown>(params?: T.NodesInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesInfoResponse, TContext>>
    reloadSecureSettings<TContext = unknown>(params?: T.NodesReloadSecureSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesReloadSecureSettingsResponse, TContext>>
    stats<TContext = unknown>(params?: T.NodesStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesStatsResponse, TContext>>
    usage<TContext = unknown>(params?: T.NodesUsageRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesUsageResponse, TContext>>
  }
  openPointInTime<TContext = unknown>(params: T.OpenPointInTimeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.OpenPointInTimeResponse, TContext>>
  ping<TContext = unknown>(params?: T.PingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PingResponse, TContext>>
  putScript<TContext = unknown>(params: T.PutScriptRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutScriptResponse, TContext>>
  rankEval<TContext = unknown>(params: T.RankEvalRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RankEvalResponse, TContext>>
  reindex<TContext = unknown>(params?: T.ReindexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ReindexResponse, TContext>>
  reindexRethrottle<TContext = unknown>(params: T.ReindexRethrottleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ReindexRethrottleResponse, TContext>>
  renderSearchTemplate<TContext = unknown>(params?: T.RenderSearchTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RenderSearchTemplateResponse, TContext>>
  rollup: {
    deleteJob<TContext = unknown>(params: T.RollupDeleteJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupDeleteJobResponse, TContext>>
    getJobs<TContext = unknown>(params?: T.RollupGetJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupGetJobsResponse, TContext>>
    getRollupCaps<TContext = unknown>(params?: T.RollupGetRollupCapsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupGetRollupCapsResponse, TContext>>
    getRollupIndexCaps<TContext = unknown>(params: T.RollupGetRollupIndexCapsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupGetRollupIndexCapsResponse, TContext>>
    putJob<TContext = unknown>(params: T.RollupPutJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupPutJobResponse, TContext>>
    rollup<TContext = unknown>(params: T.RollupRollupRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupRollupResponse, TContext>>
    rollupSearch<TDocument = unknown, TContext = unknown>(params: T.RollupRollupSearchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupRollupSearchResponse<TDocument>, TContext>>
    startJob<TContext = unknown>(params: T.RollupStartJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupStartJobResponse, TContext>>
    stopJob<TContext = unknown>(params: T.RollupStopJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupStopJobResponse, TContext>>
  }
  scriptsPainlessExecute<TResult = unknown, TContext = unknown>(params?: T.ScriptsPainlessExecuteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ScriptsPainlessExecuteResponse<TResult>, TContext>>
  scroll<TDocument = unknown, TContext = unknown>(params?: T.ScrollRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ScrollResponse<TDocument>, TContext>>
  search<TDocument = unknown, TContext = unknown>(params?: T.SearchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchResponse<TDocument>, TContext>>
  searchMvt<TContext = unknown>(params: T.SearchMvtRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchMvtResponse, TContext>>
  searchShards<TContext = unknown>(params?: T.SearchShardsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchShardsResponse, TContext>>
  searchTemplate<TDocument = unknown, TContext = unknown>(params?: T.SearchTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchTemplateResponse<TDocument>, TContext>>
  searchableSnapshots: {
    cacheStats<TContext = unknown>(params?: T.SearchableSnapshotsCacheStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchableSnapshotsCacheStatsResponse, TContext>>
    clearCache<TContext = unknown>(params?: T.SearchableSnapshotsClearCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchableSnapshotsClearCacheResponse, TContext>>
    mount<TContext = unknown>(params: T.SearchableSnapshotsMountRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchableSnapshotsMountResponse, TContext>>
    repositoryStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    stats<TContext = unknown>(params?: T.SearchableSnapshotsStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchableSnapshotsStatsResponse, TContext>>
  }
  security: {
    authenticate<TContext = unknown>(params?: T.SecurityAuthenticateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityAuthenticateResponse, TContext>>
    changePassword<TContext = unknown>(params?: T.SecurityChangePasswordRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityChangePasswordResponse, TContext>>
    clearApiKeyCache<TContext = unknown>(params: T.SecurityClearApiKeyCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityClearApiKeyCacheResponse, TContext>>
    clearCachedPrivileges<TContext = unknown>(params: T.SecurityClearCachedPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityClearCachedPrivilegesResponse, TContext>>
    clearCachedRealms<TContext = unknown>(params: T.SecurityClearCachedRealmsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityClearCachedRealmsResponse, TContext>>
    clearCachedRoles<TContext = unknown>(params: T.SecurityClearCachedRolesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityClearCachedRolesResponse, TContext>>
    clearCachedServiceTokens<TContext = unknown>(params: T.SecurityClearCachedServiceTokensRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityClearCachedServiceTokensResponse, TContext>>
    createApiKey<TContext = unknown>(params?: T.SecurityCreateApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityCreateApiKeyResponse, TContext>>
    createServiceToken<TContext = unknown>(params: T.SecurityCreateServiceTokenRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityCreateServiceTokenResponse, TContext>>
    deletePrivileges<TContext = unknown>(params: T.SecurityDeletePrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityDeletePrivilegesResponse, TContext>>
    deleteRole<TContext = unknown>(params: T.SecurityDeleteRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityDeleteRoleResponse, TContext>>
    deleteRoleMapping<TContext = unknown>(params: T.SecurityDeleteRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityDeleteRoleMappingResponse, TContext>>
    deleteServiceToken<TContext = unknown>(params: T.SecurityDeleteServiceTokenRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityDeleteServiceTokenResponse, TContext>>
    deleteUser<TContext = unknown>(params: T.SecurityDeleteUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityDeleteUserResponse, TContext>>
    disableUser<TContext = unknown>(params: T.SecurityDisableUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityDisableUserResponse, TContext>>
    enableUser<TContext = unknown>(params: T.SecurityEnableUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityEnableUserResponse, TContext>>
    getApiKey<TContext = unknown>(params?: T.SecurityGetApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetApiKeyResponse, TContext>>
    getBuiltinPrivileges<TContext = unknown>(params?: T.SecurityGetBuiltinPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetBuiltinPrivilegesResponse, TContext>>
    getPrivileges<TContext = unknown>(params?: T.SecurityGetPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetPrivilegesResponse, TContext>>
    getRole<TContext = unknown>(params?: T.SecurityGetRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetRoleResponse, TContext>>
    getRoleMapping<TContext = unknown>(params?: T.SecurityGetRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetRoleMappingResponse, TContext>>
    getServiceAccounts<TContext = unknown>(params?: T.SecurityGetServiceAccountsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetServiceAccountsResponse, TContext>>
    getServiceCredentials<TContext = unknown>(params: T.SecurityGetServiceCredentialsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetServiceCredentialsResponse, TContext>>
    getToken<TContext = unknown>(params?: T.SecurityGetTokenRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetTokenResponse, TContext>>
    getUser<TContext = unknown>(params?: T.SecurityGetUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetUserResponse, TContext>>
    getUserPrivileges<TContext = unknown>(params?: T.SecurityGetUserPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetUserPrivilegesResponse, TContext>>
    grantApiKey<TContext = unknown>(params?: T.SecurityGrantApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGrantApiKeyResponse, TContext>>
    hasPrivileges<TContext = unknown>(params?: T.SecurityHasPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityHasPrivilegesResponse, TContext>>
    invalidateApiKey<TContext = unknown>(params?: T.SecurityInvalidateApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityInvalidateApiKeyResponse, TContext>>
    invalidateToken<TContext = unknown>(params?: T.SecurityInvalidateTokenRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityInvalidateTokenResponse, TContext>>
    putPrivileges<TContext = unknown>(params?: T.SecurityPutPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityPutPrivilegesResponse, TContext>>
    putRole<TContext = unknown>(params: T.SecurityPutRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityPutRoleResponse, TContext>>
    putRoleMapping<TContext = unknown>(params: T.SecurityPutRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityPutRoleMappingResponse, TContext>>
    putUser<TContext = unknown>(params: T.SecurityPutUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityPutUserResponse, TContext>>
    queryApiKeys<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    samlAuthenticate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    samlCompleteLogout<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    samlInvalidate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    samlLogout<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    samlPrepareAuthentication<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    samlServiceProviderMetadata<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  }
  shutdown: {
    deleteNode<TContext = unknown>(params: T.ShutdownDeleteNodeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ShutdownDeleteNodeResponse, TContext>>
    getNode<TContext = unknown>(params?: T.ShutdownGetNodeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ShutdownGetNodeResponse, TContext>>
    putNode<TContext = unknown>(params: T.ShutdownPutNodeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ShutdownPutNodeResponse, TContext>>
  }
  slm: {
    deleteLifecycle<TContext = unknown>(params: T.SlmDeleteLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmDeleteLifecycleResponse, TContext>>
    executeLifecycle<TContext = unknown>(params: T.SlmExecuteLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmExecuteLifecycleResponse, TContext>>
    executeRetention<TContext = unknown>(params?: T.SlmExecuteRetentionRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmExecuteRetentionResponse, TContext>>
    getLifecycle<TContext = unknown>(params?: T.SlmGetLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmGetLifecycleResponse, TContext>>
    getStats<TContext = unknown>(params?: T.SlmGetStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmGetStatsResponse, TContext>>
    getStatus<TContext = unknown>(params?: T.SlmGetStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmGetStatusResponse, TContext>>
    putLifecycle<TContext = unknown>(params: T.SlmPutLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmPutLifecycleResponse, TContext>>
    start<TContext = unknown>(params?: T.SlmStartRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmStartResponse, TContext>>
    stop<TContext = unknown>(params?: T.SlmStopRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmStopResponse, TContext>>
  }
  snapshot: {
    cleanupRepository<TContext = unknown>(params: T.SnapshotCleanupRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotCleanupRepositoryResponse, TContext>>
    clone<TContext = unknown>(params: T.SnapshotCloneRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotCloneResponse, TContext>>
    create<TContext = unknown>(params: T.SnapshotCreateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotCreateResponse, TContext>>
    createRepository<TContext = unknown>(params: T.SnapshotCreateRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotCreateRepositoryResponse, TContext>>
    delete<TContext = unknown>(params: T.SnapshotDeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotDeleteResponse, TContext>>
    deleteRepository<TContext = unknown>(params: T.SnapshotDeleteRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotDeleteRepositoryResponse, TContext>>
    get<TContext = unknown>(params: T.SnapshotGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotGetResponse, TContext>>
    getRepository<TContext = unknown>(params?: T.SnapshotGetRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotGetRepositoryResponse, TContext>>
    repositoryAnalyze<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    restore<TContext = unknown>(params: T.SnapshotRestoreRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotRestoreResponse, TContext>>
    status<TContext = unknown>(params?: T.SnapshotStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotStatusResponse, TContext>>
    verifyRepository<TContext = unknown>(params: T.SnapshotVerifyRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotVerifyRepositoryResponse, TContext>>
  }
  sql: {
    clearCursor<TContext = unknown>(params?: T.SqlClearCursorRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SqlClearCursorResponse, TContext>>
    deleteAsync<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getAsync<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getAsyncStatus<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    query<TContext = unknown>(params?: T.SqlQueryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SqlQueryResponse, TContext>>
    translate<TContext = unknown>(params?: T.SqlTranslateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SqlTranslateResponse, TContext>>
  }
  ssl: {
    certificates<TContext = unknown>(params?: T.SslCertificatesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SslCertificatesResponse, TContext>>
  }
  tasks: {
    cancel<TContext = unknown>(params?: T.TasksCancelRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TasksCancelResponse, TContext>>
    get<TContext = unknown>(params: T.TasksGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TasksGetResponse, TContext>>
    list<TContext = unknown>(params?: T.TasksListRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TasksListResponse, TContext>>
  }
  termsEnum<TContext = unknown>(params: T.TermsEnumRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TermsEnumResponse, TContext>>
  termvectors<TDocument = unknown, TContext = unknown>(params: T.TermvectorsRequest<TDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TermvectorsResponse, TContext>>
  textStructure: {
    findStructure<TJsonDocument = unknown, TContext = unknown>(params: T.TextStructureFindStructureRequest<TJsonDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TextStructureFindStructureResponse, TContext>>
  }
  transform: {
    deleteTransform<TContext = unknown>(params: T.TransformDeleteTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformDeleteTransformResponse, TContext>>
    getTransform<TContext = unknown>(params?: T.TransformGetTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformGetTransformResponse, TContext>>
    getTransformStats<TContext = unknown>(params: T.TransformGetTransformStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformGetTransformStatsResponse, TContext>>
    previewTransform<TTransform = unknown, TContext = unknown>(params?: T.TransformPreviewTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformPreviewTransformResponse<TTransform>, TContext>>
    putTransform<TContext = unknown>(params: T.TransformPutTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformPutTransformResponse, TContext>>
    startTransform<TContext = unknown>(params: T.TransformStartTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformStartTransformResponse, TContext>>
    stopTransform<TContext = unknown>(params: T.TransformStopTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformStopTransformResponse, TContext>>
    updateTransform<TContext = unknown>(params: T.TransformUpdateTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformUpdateTransformResponse, TContext>>
    upgradeTransforms<TContext = unknown>(params?: T.TransformUpgradeTransformsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformUpgradeTransformsResponse, TContext>>
  }
  update<TDocumentR = unknown, TDocument = unknown, TPartialDocument = unknown, TContext = unknown>(params: T.UpdateRequest<TDocument, TPartialDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateResponse<TDocumentR>, TContext>>
  updateByQuery<TContext = unknown>(params: T.UpdateByQueryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateByQueryResponse, TContext>>
  updateByQueryRethrottle<TContext = unknown>(params: T.UpdateByQueryRethrottleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateByQueryRethrottleResponse, TContext>>
  watcher: {
    ackWatch<TContext = unknown>(params: T.WatcherAckWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherAckWatchResponse, TContext>>
    activateWatch<TContext = unknown>(params: T.WatcherActivateWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherActivateWatchResponse, TContext>>
    deactivateWatch<TContext = unknown>(params: T.WatcherDeactivateWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherDeactivateWatchResponse, TContext>>
    deleteWatch<TContext = unknown>(params: T.WatcherDeleteWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherDeleteWatchResponse, TContext>>
    executeWatch<TContext = unknown>(params?: T.WatcherExecuteWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherExecuteWatchResponse, TContext>>
    getWatch<TContext = unknown>(params: T.WatcherGetWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherGetWatchResponse, TContext>>
    putWatch<TContext = unknown>(params: T.WatcherPutWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherPutWatchResponse, TContext>>
    queryWatches<TContext = unknown>(params?: T.WatcherQueryWatchesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherQueryWatchesResponse, TContext>>
    start<TContext = unknown>(params?: T.WatcherStartRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherStartResponse, TContext>>
    stats<TContext = unknown>(params?: T.WatcherStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherStatsResponse, TContext>>
    stop<TContext = unknown>(params?: T.WatcherStopRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherStopResponse, TContext>>
  }
  xpack: {
    info<TContext = unknown>(params?: T.XpackInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.XpackInfoResponse, TContext>>
    usage<TContext = unknown>(params?: T.XpackUsageRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.XpackUsageResponse, TContext>>
  }
}

export { KibanaClient }
