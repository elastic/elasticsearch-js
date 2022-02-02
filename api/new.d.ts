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
  BaseConnectionPool,
  CloudConnectionPool,
  Connection,
  Serializer,
  Transport,
  errors,
  RequestEvent,
  ResurrectEvent,
  ApiError,
  NodeOptions,
  events
} from '../index'
import Helpers from '../lib/Helpers'
import {
  ApiResponse,
  TransportRequestCallback,
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

declare type callbackFn<TResponse, TContext> = (err: ApiError, result: ApiResponse<TResponse, TContext>) => void;
declare class Client {
  constructor(opts: ClientOptions)
  connectionPool: ConnectionPool
  transport: Transport
  serializer: Serializer
  extend(method: string, fn: extendsCallback): void
  extend(method: string, opts: { force: boolean }, fn: extendsCallback): void;
  helpers: Helpers
  child(opts?: ClientOptions): Client
  close(callback: Function): void;
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
    delete<TContext = unknown>(params: T.AsyncSearchDeleteRequest, callback: callbackFn<T.AsyncSearchDeleteResponse, TContext>): TransportRequestCallback
    delete<TContext = unknown>(params: T.AsyncSearchDeleteRequest, options: TransportRequestOptions, callback: callbackFn<T.AsyncSearchDeleteResponse, TContext>): TransportRequestCallback
    get<TDocument = unknown, TContext = unknown>(params: T.AsyncSearchGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AsyncSearchGetResponse<TDocument>, TContext>>
    get<TDocument = unknown, TContext = unknown>(params: T.AsyncSearchGetRequest, callback: callbackFn<T.AsyncSearchGetResponse<TDocument>, TContext>): TransportRequestCallback
    get<TDocument = unknown, TContext = unknown>(params: T.AsyncSearchGetRequest, options: TransportRequestOptions, callback: callbackFn<T.AsyncSearchGetResponse<TDocument>, TContext>): TransportRequestCallback
    status<TDocument = unknown, TContext = unknown>(params: T.AsyncSearchStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AsyncSearchStatusResponse<TDocument>, TContext>>
    status<TDocument = unknown, TContext = unknown>(params: T.AsyncSearchStatusRequest, callback: callbackFn<T.AsyncSearchStatusResponse<TDocument>, TContext>): TransportRequestCallback
    status<TDocument = unknown, TContext = unknown>(params: T.AsyncSearchStatusRequest, options: TransportRequestOptions, callback: callbackFn<T.AsyncSearchStatusResponse<TDocument>, TContext>): TransportRequestCallback
    submit<TDocument = unknown, TContext = unknown>(params?: T.AsyncSearchSubmitRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AsyncSearchSubmitResponse<TDocument>, TContext>>
    submit<TDocument = unknown, TContext = unknown>(callback: callbackFn<T.AsyncSearchSubmitResponse<TDocument>, TContext>): TransportRequestCallback
    submit<TDocument = unknown, TContext = unknown>(params: T.AsyncSearchSubmitRequest, callback: callbackFn<T.AsyncSearchSubmitResponse<TDocument>, TContext>): TransportRequestCallback
    submit<TDocument = unknown, TContext = unknown>(params: T.AsyncSearchSubmitRequest, options: TransportRequestOptions, callback: callbackFn<T.AsyncSearchSubmitResponse<TDocument>, TContext>): TransportRequestCallback
  }
  autoscaling: {
    deleteAutoscalingPolicy<TContext = unknown>(params: T.AutoscalingDeleteAutoscalingPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AutoscalingDeleteAutoscalingPolicyResponse, TContext>>
    deleteAutoscalingPolicy<TContext = unknown>(params: T.AutoscalingDeleteAutoscalingPolicyRequest, callback: callbackFn<T.AutoscalingDeleteAutoscalingPolicyResponse, TContext>): TransportRequestCallback
    deleteAutoscalingPolicy<TContext = unknown>(params: T.AutoscalingDeleteAutoscalingPolicyRequest, options: TransportRequestOptions, callback: callbackFn<T.AutoscalingDeleteAutoscalingPolicyResponse, TContext>): TransportRequestCallback
    getAutoscalingCapacity<TContext = unknown>(params?: T.AutoscalingGetAutoscalingCapacityRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AutoscalingGetAutoscalingCapacityResponse, TContext>>
    getAutoscalingCapacity<TContext = unknown>(callback: callbackFn<T.AutoscalingGetAutoscalingCapacityResponse, TContext>): TransportRequestCallback
    getAutoscalingCapacity<TContext = unknown>(params: T.AutoscalingGetAutoscalingCapacityRequest, callback: callbackFn<T.AutoscalingGetAutoscalingCapacityResponse, TContext>): TransportRequestCallback
    getAutoscalingCapacity<TContext = unknown>(params: T.AutoscalingGetAutoscalingCapacityRequest, options: TransportRequestOptions, callback: callbackFn<T.AutoscalingGetAutoscalingCapacityResponse, TContext>): TransportRequestCallback
    getAutoscalingPolicy<TContext = unknown>(params: T.AutoscalingGetAutoscalingPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AutoscalingGetAutoscalingPolicyResponse, TContext>>
    getAutoscalingPolicy<TContext = unknown>(params: T.AutoscalingGetAutoscalingPolicyRequest, callback: callbackFn<T.AutoscalingGetAutoscalingPolicyResponse, TContext>): TransportRequestCallback
    getAutoscalingPolicy<TContext = unknown>(params: T.AutoscalingGetAutoscalingPolicyRequest, options: TransportRequestOptions, callback: callbackFn<T.AutoscalingGetAutoscalingPolicyResponse, TContext>): TransportRequestCallback
    putAutoscalingPolicy<TContext = unknown>(params: T.AutoscalingPutAutoscalingPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AutoscalingPutAutoscalingPolicyResponse, TContext>>
    putAutoscalingPolicy<TContext = unknown>(params: T.AutoscalingPutAutoscalingPolicyRequest, callback: callbackFn<T.AutoscalingPutAutoscalingPolicyResponse, TContext>): TransportRequestCallback
    putAutoscalingPolicy<TContext = unknown>(params: T.AutoscalingPutAutoscalingPolicyRequest, options: TransportRequestOptions, callback: callbackFn<T.AutoscalingPutAutoscalingPolicyResponse, TContext>): TransportRequestCallback
  }
  bulk<TDocument = unknown, TPartialDocument = unknown, TContext = unknown>(params: T.BulkRequest<TDocument, TPartialDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.BulkResponse, TContext>>
  bulk<TDocument = unknown, TPartialDocument = unknown, TContext = unknown>(params: T.BulkRequest<TDocument, TPartialDocument>, callback: callbackFn<T.BulkResponse, TContext>): TransportRequestCallback
  bulk<TDocument = unknown, TPartialDocument = unknown, TContext = unknown>(params: T.BulkRequest<TDocument, TPartialDocument>, options: TransportRequestOptions, callback: callbackFn<T.BulkResponse, TContext>): TransportRequestCallback
  cat: {
    aliases<TContext = unknown>(params?: T.CatAliasesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatAliasesResponse, TContext>>
    aliases<TContext = unknown>(callback: callbackFn<T.CatAliasesResponse, TContext>): TransportRequestCallback
    aliases<TContext = unknown>(params: T.CatAliasesRequest, callback: callbackFn<T.CatAliasesResponse, TContext>): TransportRequestCallback
    aliases<TContext = unknown>(params: T.CatAliasesRequest, options: TransportRequestOptions, callback: callbackFn<T.CatAliasesResponse, TContext>): TransportRequestCallback
    allocation<TContext = unknown>(params?: T.CatAllocationRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatAllocationResponse, TContext>>
    allocation<TContext = unknown>(callback: callbackFn<T.CatAllocationResponse, TContext>): TransportRequestCallback
    allocation<TContext = unknown>(params: T.CatAllocationRequest, callback: callbackFn<T.CatAllocationResponse, TContext>): TransportRequestCallback
    allocation<TContext = unknown>(params: T.CatAllocationRequest, options: TransportRequestOptions, callback: callbackFn<T.CatAllocationResponse, TContext>): TransportRequestCallback
    count<TContext = unknown>(params?: T.CatCountRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatCountResponse, TContext>>
    count<TContext = unknown>(callback: callbackFn<T.CatCountResponse, TContext>): TransportRequestCallback
    count<TContext = unknown>(params: T.CatCountRequest, callback: callbackFn<T.CatCountResponse, TContext>): TransportRequestCallback
    count<TContext = unknown>(params: T.CatCountRequest, options: TransportRequestOptions, callback: callbackFn<T.CatCountResponse, TContext>): TransportRequestCallback
    fielddata<TContext = unknown>(params?: T.CatFielddataRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatFielddataResponse, TContext>>
    fielddata<TContext = unknown>(callback: callbackFn<T.CatFielddataResponse, TContext>): TransportRequestCallback
    fielddata<TContext = unknown>(params: T.CatFielddataRequest, callback: callbackFn<T.CatFielddataResponse, TContext>): TransportRequestCallback
    fielddata<TContext = unknown>(params: T.CatFielddataRequest, options: TransportRequestOptions, callback: callbackFn<T.CatFielddataResponse, TContext>): TransportRequestCallback
    health<TContext = unknown>(params?: T.CatHealthRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatHealthResponse, TContext>>
    health<TContext = unknown>(callback: callbackFn<T.CatHealthResponse, TContext>): TransportRequestCallback
    health<TContext = unknown>(params: T.CatHealthRequest, callback: callbackFn<T.CatHealthResponse, TContext>): TransportRequestCallback
    health<TContext = unknown>(params: T.CatHealthRequest, options: TransportRequestOptions, callback: callbackFn<T.CatHealthResponse, TContext>): TransportRequestCallback
    help<TContext = unknown>(params?: T.CatHelpRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatHelpResponse, TContext>>
    help<TContext = unknown>(callback: callbackFn<T.CatHelpResponse, TContext>): TransportRequestCallback
    help<TContext = unknown>(params: T.CatHelpRequest, callback: callbackFn<T.CatHelpResponse, TContext>): TransportRequestCallback
    help<TContext = unknown>(params: T.CatHelpRequest, options: TransportRequestOptions, callback: callbackFn<T.CatHelpResponse, TContext>): TransportRequestCallback
    indices<TContext = unknown>(params?: T.CatIndicesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatIndicesResponse, TContext>>
    indices<TContext = unknown>(callback: callbackFn<T.CatIndicesResponse, TContext>): TransportRequestCallback
    indices<TContext = unknown>(params: T.CatIndicesRequest, callback: callbackFn<T.CatIndicesResponse, TContext>): TransportRequestCallback
    indices<TContext = unknown>(params: T.CatIndicesRequest, options: TransportRequestOptions, callback: callbackFn<T.CatIndicesResponse, TContext>): TransportRequestCallback
    master<TContext = unknown>(params?: T.CatMasterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatMasterResponse, TContext>>
    master<TContext = unknown>(callback: callbackFn<T.CatMasterResponse, TContext>): TransportRequestCallback
    master<TContext = unknown>(params: T.CatMasterRequest, callback: callbackFn<T.CatMasterResponse, TContext>): TransportRequestCallback
    master<TContext = unknown>(params: T.CatMasterRequest, options: TransportRequestOptions, callback: callbackFn<T.CatMasterResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TContext = unknown>(params?: T.CatMlDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatMlDataFrameAnalyticsResponse, TContext>>
    mlDataFrameAnalytics<TContext = unknown>(callback: callbackFn<T.CatMlDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TContext = unknown>(params: T.CatMlDataFrameAnalyticsRequest, callback: callbackFn<T.CatMlDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TContext = unknown>(params: T.CatMlDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<T.CatMlDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TContext = unknown>(params?: T.CatMlDatafeedsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatMlDatafeedsResponse, TContext>>
    mlDatafeeds<TContext = unknown>(callback: callbackFn<T.CatMlDatafeedsResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TContext = unknown>(params: T.CatMlDatafeedsRequest, callback: callbackFn<T.CatMlDatafeedsResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TContext = unknown>(params: T.CatMlDatafeedsRequest, options: TransportRequestOptions, callback: callbackFn<T.CatMlDatafeedsResponse, TContext>): TransportRequestCallback
    mlJobs<TContext = unknown>(params?: T.CatMlJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatMlJobsResponse, TContext>>
    mlJobs<TContext = unknown>(callback: callbackFn<T.CatMlJobsResponse, TContext>): TransportRequestCallback
    mlJobs<TContext = unknown>(params: T.CatMlJobsRequest, callback: callbackFn<T.CatMlJobsResponse, TContext>): TransportRequestCallback
    mlJobs<TContext = unknown>(params: T.CatMlJobsRequest, options: TransportRequestOptions, callback: callbackFn<T.CatMlJobsResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TContext = unknown>(params?: T.CatMlTrainedModelsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatMlTrainedModelsResponse, TContext>>
    mlTrainedModels<TContext = unknown>(callback: callbackFn<T.CatMlTrainedModelsResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TContext = unknown>(params: T.CatMlTrainedModelsRequest, callback: callbackFn<T.CatMlTrainedModelsResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TContext = unknown>(params: T.CatMlTrainedModelsRequest, options: TransportRequestOptions, callback: callbackFn<T.CatMlTrainedModelsResponse, TContext>): TransportRequestCallback
    nodeattrs<TContext = unknown>(params?: T.CatNodeattrsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatNodeattrsResponse, TContext>>
    nodeattrs<TContext = unknown>(callback: callbackFn<T.CatNodeattrsResponse, TContext>): TransportRequestCallback
    nodeattrs<TContext = unknown>(params: T.CatNodeattrsRequest, callback: callbackFn<T.CatNodeattrsResponse, TContext>): TransportRequestCallback
    nodeattrs<TContext = unknown>(params: T.CatNodeattrsRequest, options: TransportRequestOptions, callback: callbackFn<T.CatNodeattrsResponse, TContext>): TransportRequestCallback
    nodes<TContext = unknown>(params?: T.CatNodesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatNodesResponse, TContext>>
    nodes<TContext = unknown>(callback: callbackFn<T.CatNodesResponse, TContext>): TransportRequestCallback
    nodes<TContext = unknown>(params: T.CatNodesRequest, callback: callbackFn<T.CatNodesResponse, TContext>): TransportRequestCallback
    nodes<TContext = unknown>(params: T.CatNodesRequest, options: TransportRequestOptions, callback: callbackFn<T.CatNodesResponse, TContext>): TransportRequestCallback
    pendingTasks<TContext = unknown>(params?: T.CatPendingTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatPendingTasksResponse, TContext>>
    pendingTasks<TContext = unknown>(callback: callbackFn<T.CatPendingTasksResponse, TContext>): TransportRequestCallback
    pendingTasks<TContext = unknown>(params: T.CatPendingTasksRequest, callback: callbackFn<T.CatPendingTasksResponse, TContext>): TransportRequestCallback
    pendingTasks<TContext = unknown>(params: T.CatPendingTasksRequest, options: TransportRequestOptions, callback: callbackFn<T.CatPendingTasksResponse, TContext>): TransportRequestCallback
    plugins<TContext = unknown>(params?: T.CatPluginsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatPluginsResponse, TContext>>
    plugins<TContext = unknown>(callback: callbackFn<T.CatPluginsResponse, TContext>): TransportRequestCallback
    plugins<TContext = unknown>(params: T.CatPluginsRequest, callback: callbackFn<T.CatPluginsResponse, TContext>): TransportRequestCallback
    plugins<TContext = unknown>(params: T.CatPluginsRequest, options: TransportRequestOptions, callback: callbackFn<T.CatPluginsResponse, TContext>): TransportRequestCallback
    recovery<TContext = unknown>(params?: T.CatRecoveryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatRecoveryResponse, TContext>>
    recovery<TContext = unknown>(callback: callbackFn<T.CatRecoveryResponse, TContext>): TransportRequestCallback
    recovery<TContext = unknown>(params: T.CatRecoveryRequest, callback: callbackFn<T.CatRecoveryResponse, TContext>): TransportRequestCallback
    recovery<TContext = unknown>(params: T.CatRecoveryRequest, options: TransportRequestOptions, callback: callbackFn<T.CatRecoveryResponse, TContext>): TransportRequestCallback
    repositories<TContext = unknown>(params?: T.CatRepositoriesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatRepositoriesResponse, TContext>>
    repositories<TContext = unknown>(callback: callbackFn<T.CatRepositoriesResponse, TContext>): TransportRequestCallback
    repositories<TContext = unknown>(params: T.CatRepositoriesRequest, callback: callbackFn<T.CatRepositoriesResponse, TContext>): TransportRequestCallback
    repositories<TContext = unknown>(params: T.CatRepositoriesRequest, options: TransportRequestOptions, callback: callbackFn<T.CatRepositoriesResponse, TContext>): TransportRequestCallback
    segments<TContext = unknown>(params?: T.CatSegmentsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatSegmentsResponse, TContext>>
    segments<TContext = unknown>(callback: callbackFn<T.CatSegmentsResponse, TContext>): TransportRequestCallback
    segments<TContext = unknown>(params: T.CatSegmentsRequest, callback: callbackFn<T.CatSegmentsResponse, TContext>): TransportRequestCallback
    segments<TContext = unknown>(params: T.CatSegmentsRequest, options: TransportRequestOptions, callback: callbackFn<T.CatSegmentsResponse, TContext>): TransportRequestCallback
    shards<TContext = unknown>(params?: T.CatShardsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatShardsResponse, TContext>>
    shards<TContext = unknown>(callback: callbackFn<T.CatShardsResponse, TContext>): TransportRequestCallback
    shards<TContext = unknown>(params: T.CatShardsRequest, callback: callbackFn<T.CatShardsResponse, TContext>): TransportRequestCallback
    shards<TContext = unknown>(params: T.CatShardsRequest, options: TransportRequestOptions, callback: callbackFn<T.CatShardsResponse, TContext>): TransportRequestCallback
    snapshots<TContext = unknown>(params?: T.CatSnapshotsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatSnapshotsResponse, TContext>>
    snapshots<TContext = unknown>(callback: callbackFn<T.CatSnapshotsResponse, TContext>): TransportRequestCallback
    snapshots<TContext = unknown>(params: T.CatSnapshotsRequest, callback: callbackFn<T.CatSnapshotsResponse, TContext>): TransportRequestCallback
    snapshots<TContext = unknown>(params: T.CatSnapshotsRequest, options: TransportRequestOptions, callback: callbackFn<T.CatSnapshotsResponse, TContext>): TransportRequestCallback
    tasks<TContext = unknown>(params?: T.CatTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatTasksResponse, TContext>>
    tasks<TContext = unknown>(callback: callbackFn<T.CatTasksResponse, TContext>): TransportRequestCallback
    tasks<TContext = unknown>(params: T.CatTasksRequest, callback: callbackFn<T.CatTasksResponse, TContext>): TransportRequestCallback
    tasks<TContext = unknown>(params: T.CatTasksRequest, options: TransportRequestOptions, callback: callbackFn<T.CatTasksResponse, TContext>): TransportRequestCallback
    templates<TContext = unknown>(params?: T.CatTemplatesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatTemplatesResponse, TContext>>
    templates<TContext = unknown>(callback: callbackFn<T.CatTemplatesResponse, TContext>): TransportRequestCallback
    templates<TContext = unknown>(params: T.CatTemplatesRequest, callback: callbackFn<T.CatTemplatesResponse, TContext>): TransportRequestCallback
    templates<TContext = unknown>(params: T.CatTemplatesRequest, options: TransportRequestOptions, callback: callbackFn<T.CatTemplatesResponse, TContext>): TransportRequestCallback
    threadPool<TContext = unknown>(params?: T.CatThreadPoolRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatThreadPoolResponse, TContext>>
    threadPool<TContext = unknown>(callback: callbackFn<T.CatThreadPoolResponse, TContext>): TransportRequestCallback
    threadPool<TContext = unknown>(params: T.CatThreadPoolRequest, callback: callbackFn<T.CatThreadPoolResponse, TContext>): TransportRequestCallback
    threadPool<TContext = unknown>(params: T.CatThreadPoolRequest, options: TransportRequestOptions, callback: callbackFn<T.CatThreadPoolResponse, TContext>): TransportRequestCallback
    transforms<TContext = unknown>(params?: T.CatTransformsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatTransformsResponse, TContext>>
    transforms<TContext = unknown>(callback: callbackFn<T.CatTransformsResponse, TContext>): TransportRequestCallback
    transforms<TContext = unknown>(params: T.CatTransformsRequest, callback: callbackFn<T.CatTransformsResponse, TContext>): TransportRequestCallback
    transforms<TContext = unknown>(params: T.CatTransformsRequest, options: TransportRequestOptions, callback: callbackFn<T.CatTransformsResponse, TContext>): TransportRequestCallback
  }
  ccr: {
    deleteAutoFollowPattern<TContext = unknown>(params: T.CcrDeleteAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrDeleteAutoFollowPatternResponse, TContext>>
    deleteAutoFollowPattern<TContext = unknown>(params: T.CcrDeleteAutoFollowPatternRequest, callback: callbackFn<T.CcrDeleteAutoFollowPatternResponse, TContext>): TransportRequestCallback
    deleteAutoFollowPattern<TContext = unknown>(params: T.CcrDeleteAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<T.CcrDeleteAutoFollowPatternResponse, TContext>): TransportRequestCallback
    follow<TContext = unknown>(params: T.CcrFollowRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrFollowResponse, TContext>>
    follow<TContext = unknown>(params: T.CcrFollowRequest, callback: callbackFn<T.CcrFollowResponse, TContext>): TransportRequestCallback
    follow<TContext = unknown>(params: T.CcrFollowRequest, options: TransportRequestOptions, callback: callbackFn<T.CcrFollowResponse, TContext>): TransportRequestCallback
    followInfo<TContext = unknown>(params: T.CcrFollowInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrFollowInfoResponse, TContext>>
    followInfo<TContext = unknown>(params: T.CcrFollowInfoRequest, callback: callbackFn<T.CcrFollowInfoResponse, TContext>): TransportRequestCallback
    followInfo<TContext = unknown>(params: T.CcrFollowInfoRequest, options: TransportRequestOptions, callback: callbackFn<T.CcrFollowInfoResponse, TContext>): TransportRequestCallback
    followStats<TContext = unknown>(params: T.CcrFollowStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrFollowStatsResponse, TContext>>
    followStats<TContext = unknown>(params: T.CcrFollowStatsRequest, callback: callbackFn<T.CcrFollowStatsResponse, TContext>): TransportRequestCallback
    followStats<TContext = unknown>(params: T.CcrFollowStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.CcrFollowStatsResponse, TContext>): TransportRequestCallback
    forgetFollower<TContext = unknown>(params: T.CcrForgetFollowerRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrForgetFollowerResponse, TContext>>
    forgetFollower<TContext = unknown>(params: T.CcrForgetFollowerRequest, callback: callbackFn<T.CcrForgetFollowerResponse, TContext>): TransportRequestCallback
    forgetFollower<TContext = unknown>(params: T.CcrForgetFollowerRequest, options: TransportRequestOptions, callback: callbackFn<T.CcrForgetFollowerResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TContext = unknown>(params?: T.CcrGetAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrGetAutoFollowPatternResponse, TContext>>
    getAutoFollowPattern<TContext = unknown>(callback: callbackFn<T.CcrGetAutoFollowPatternResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TContext = unknown>(params: T.CcrGetAutoFollowPatternRequest, callback: callbackFn<T.CcrGetAutoFollowPatternResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TContext = unknown>(params: T.CcrGetAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<T.CcrGetAutoFollowPatternResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TContext = unknown>(params: T.CcrPauseAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrPauseAutoFollowPatternResponse, TContext>>
    pauseAutoFollowPattern<TContext = unknown>(params: T.CcrPauseAutoFollowPatternRequest, callback: callbackFn<T.CcrPauseAutoFollowPatternResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TContext = unknown>(params: T.CcrPauseAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<T.CcrPauseAutoFollowPatternResponse, TContext>): TransportRequestCallback
    pauseFollow<TContext = unknown>(params: T.CcrPauseFollowRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrPauseFollowResponse, TContext>>
    pauseFollow<TContext = unknown>(params: T.CcrPauseFollowRequest, callback: callbackFn<T.CcrPauseFollowResponse, TContext>): TransportRequestCallback
    pauseFollow<TContext = unknown>(params: T.CcrPauseFollowRequest, options: TransportRequestOptions, callback: callbackFn<T.CcrPauseFollowResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TContext = unknown>(params: T.CcrPutAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrPutAutoFollowPatternResponse, TContext>>
    putAutoFollowPattern<TContext = unknown>(params: T.CcrPutAutoFollowPatternRequest, callback: callbackFn<T.CcrPutAutoFollowPatternResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TContext = unknown>(params: T.CcrPutAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<T.CcrPutAutoFollowPatternResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TContext = unknown>(params: T.CcrResumeAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrResumeAutoFollowPatternResponse, TContext>>
    resumeAutoFollowPattern<TContext = unknown>(params: T.CcrResumeAutoFollowPatternRequest, callback: callbackFn<T.CcrResumeAutoFollowPatternResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TContext = unknown>(params: T.CcrResumeAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<T.CcrResumeAutoFollowPatternResponse, TContext>): TransportRequestCallback
    resumeFollow<TContext = unknown>(params: T.CcrResumeFollowRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrResumeFollowResponse, TContext>>
    resumeFollow<TContext = unknown>(params: T.CcrResumeFollowRequest, callback: callbackFn<T.CcrResumeFollowResponse, TContext>): TransportRequestCallback
    resumeFollow<TContext = unknown>(params: T.CcrResumeFollowRequest, options: TransportRequestOptions, callback: callbackFn<T.CcrResumeFollowResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params?: T.CcrStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrStatsResponse, TContext>>
    stats<TContext = unknown>(callback: callbackFn<T.CcrStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.CcrStatsRequest, callback: callbackFn<T.CcrStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.CcrStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.CcrStatsResponse, TContext>): TransportRequestCallback
    unfollow<TContext = unknown>(params: T.CcrUnfollowRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrUnfollowResponse, TContext>>
    unfollow<TContext = unknown>(params: T.CcrUnfollowRequest, callback: callbackFn<T.CcrUnfollowResponse, TContext>): TransportRequestCallback
    unfollow<TContext = unknown>(params: T.CcrUnfollowRequest, options: TransportRequestOptions, callback: callbackFn<T.CcrUnfollowResponse, TContext>): TransportRequestCallback
  }
  clearScroll<TContext = unknown>(params?: T.ClearScrollRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClearScrollResponse, TContext>>
  clearScroll<TContext = unknown>(callback: callbackFn<T.ClearScrollResponse, TContext>): TransportRequestCallback
  clearScroll<TContext = unknown>(params: T.ClearScrollRequest, callback: callbackFn<T.ClearScrollResponse, TContext>): TransportRequestCallback
  clearScroll<TContext = unknown>(params: T.ClearScrollRequest, options: TransportRequestOptions, callback: callbackFn<T.ClearScrollResponse, TContext>): TransportRequestCallback
  closePointInTime<TContext = unknown>(params?: T.ClosePointInTimeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClosePointInTimeResponse, TContext>>
  closePointInTime<TContext = unknown>(callback: callbackFn<T.ClosePointInTimeResponse, TContext>): TransportRequestCallback
  closePointInTime<TContext = unknown>(params: T.ClosePointInTimeRequest, callback: callbackFn<T.ClosePointInTimeResponse, TContext>): TransportRequestCallback
  closePointInTime<TContext = unknown>(params: T.ClosePointInTimeRequest, options: TransportRequestOptions, callback: callbackFn<T.ClosePointInTimeResponse, TContext>): TransportRequestCallback
  cluster: {
    allocationExplain<TContext = unknown>(params?: T.ClusterAllocationExplainRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterAllocationExplainResponse, TContext>>
    allocationExplain<TContext = unknown>(callback: callbackFn<T.ClusterAllocationExplainResponse, TContext>): TransportRequestCallback
    allocationExplain<TContext = unknown>(params: T.ClusterAllocationExplainRequest, callback: callbackFn<T.ClusterAllocationExplainResponse, TContext>): TransportRequestCallback
    allocationExplain<TContext = unknown>(params: T.ClusterAllocationExplainRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterAllocationExplainResponse, TContext>): TransportRequestCallback
    deleteComponentTemplate<TContext = unknown>(params: T.ClusterDeleteComponentTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterDeleteComponentTemplateResponse, TContext>>
    deleteComponentTemplate<TContext = unknown>(params: T.ClusterDeleteComponentTemplateRequest, callback: callbackFn<T.ClusterDeleteComponentTemplateResponse, TContext>): TransportRequestCallback
    deleteComponentTemplate<TContext = unknown>(params: T.ClusterDeleteComponentTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterDeleteComponentTemplateResponse, TContext>): TransportRequestCallback
    deleteVotingConfigExclusions<TContext = unknown>(params?: T.ClusterDeleteVotingConfigExclusionsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterDeleteVotingConfigExclusionsResponse, TContext>>
    deleteVotingConfigExclusions<TContext = unknown>(callback: callbackFn<T.ClusterDeleteVotingConfigExclusionsResponse, TContext>): TransportRequestCallback
    deleteVotingConfigExclusions<TContext = unknown>(params: T.ClusterDeleteVotingConfigExclusionsRequest, callback: callbackFn<T.ClusterDeleteVotingConfigExclusionsResponse, TContext>): TransportRequestCallback
    deleteVotingConfigExclusions<TContext = unknown>(params: T.ClusterDeleteVotingConfigExclusionsRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterDeleteVotingConfigExclusionsResponse, TContext>): TransportRequestCallback
    existsComponentTemplate<TContext = unknown>(params: T.ClusterExistsComponentTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterExistsComponentTemplateResponse, TContext>>
    existsComponentTemplate<TContext = unknown>(params: T.ClusterExistsComponentTemplateRequest, callback: callbackFn<T.ClusterExistsComponentTemplateResponse, TContext>): TransportRequestCallback
    existsComponentTemplate<TContext = unknown>(params: T.ClusterExistsComponentTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterExistsComponentTemplateResponse, TContext>): TransportRequestCallback
    getComponentTemplate<TContext = unknown>(params?: T.ClusterGetComponentTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterGetComponentTemplateResponse, TContext>>
    getComponentTemplate<TContext = unknown>(callback: callbackFn<T.ClusterGetComponentTemplateResponse, TContext>): TransportRequestCallback
    getComponentTemplate<TContext = unknown>(params: T.ClusterGetComponentTemplateRequest, callback: callbackFn<T.ClusterGetComponentTemplateResponse, TContext>): TransportRequestCallback
    getComponentTemplate<TContext = unknown>(params: T.ClusterGetComponentTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterGetComponentTemplateResponse, TContext>): TransportRequestCallback
    getSettings<TContext = unknown>(params?: T.ClusterGetSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterGetSettingsResponse, TContext>>
    getSettings<TContext = unknown>(callback: callbackFn<T.ClusterGetSettingsResponse, TContext>): TransportRequestCallback
    getSettings<TContext = unknown>(params: T.ClusterGetSettingsRequest, callback: callbackFn<T.ClusterGetSettingsResponse, TContext>): TransportRequestCallback
    getSettings<TContext = unknown>(params: T.ClusterGetSettingsRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterGetSettingsResponse, TContext>): TransportRequestCallback
    health<TContext = unknown>(params?: T.ClusterHealthRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterHealthResponse, TContext>>
    health<TContext = unknown>(callback: callbackFn<T.ClusterHealthResponse, TContext>): TransportRequestCallback
    health<TContext = unknown>(params: T.ClusterHealthRequest, callback: callbackFn<T.ClusterHealthResponse, TContext>): TransportRequestCallback
    health<TContext = unknown>(params: T.ClusterHealthRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterHealthResponse, TContext>): TransportRequestCallback
    pendingTasks<TContext = unknown>(params?: T.ClusterPendingTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterPendingTasksResponse, TContext>>
    pendingTasks<TContext = unknown>(callback: callbackFn<T.ClusterPendingTasksResponse, TContext>): TransportRequestCallback
    pendingTasks<TContext = unknown>(params: T.ClusterPendingTasksRequest, callback: callbackFn<T.ClusterPendingTasksResponse, TContext>): TransportRequestCallback
    pendingTasks<TContext = unknown>(params: T.ClusterPendingTasksRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterPendingTasksResponse, TContext>): TransportRequestCallback
    postVotingConfigExclusions<TContext = unknown>(params?: T.ClusterPostVotingConfigExclusionsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterPostVotingConfigExclusionsResponse, TContext>>
    postVotingConfigExclusions<TContext = unknown>(callback: callbackFn<T.ClusterPostVotingConfigExclusionsResponse, TContext>): TransportRequestCallback
    postVotingConfigExclusions<TContext = unknown>(params: T.ClusterPostVotingConfigExclusionsRequest, callback: callbackFn<T.ClusterPostVotingConfigExclusionsResponse, TContext>): TransportRequestCallback
    postVotingConfigExclusions<TContext = unknown>(params: T.ClusterPostVotingConfigExclusionsRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterPostVotingConfigExclusionsResponse, TContext>): TransportRequestCallback
    putComponentTemplate<TContext = unknown>(params: T.ClusterPutComponentTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterPutComponentTemplateResponse, TContext>>
    putComponentTemplate<TContext = unknown>(params: T.ClusterPutComponentTemplateRequest, callback: callbackFn<T.ClusterPutComponentTemplateResponse, TContext>): TransportRequestCallback
    putComponentTemplate<TContext = unknown>(params: T.ClusterPutComponentTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterPutComponentTemplateResponse, TContext>): TransportRequestCallback
    putSettings<TContext = unknown>(params?: T.ClusterPutSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterPutSettingsResponse, TContext>>
    putSettings<TContext = unknown>(callback: callbackFn<T.ClusterPutSettingsResponse, TContext>): TransportRequestCallback
    putSettings<TContext = unknown>(params: T.ClusterPutSettingsRequest, callback: callbackFn<T.ClusterPutSettingsResponse, TContext>): TransportRequestCallback
    putSettings<TContext = unknown>(params: T.ClusterPutSettingsRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterPutSettingsResponse, TContext>): TransportRequestCallback
    remoteInfo<TContext = unknown>(params?: T.ClusterRemoteInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterRemoteInfoResponse, TContext>>
    remoteInfo<TContext = unknown>(callback: callbackFn<T.ClusterRemoteInfoResponse, TContext>): TransportRequestCallback
    remoteInfo<TContext = unknown>(params: T.ClusterRemoteInfoRequest, callback: callbackFn<T.ClusterRemoteInfoResponse, TContext>): TransportRequestCallback
    remoteInfo<TContext = unknown>(params: T.ClusterRemoteInfoRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterRemoteInfoResponse, TContext>): TransportRequestCallback
    reroute<TContext = unknown>(params?: T.ClusterRerouteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterRerouteResponse, TContext>>
    reroute<TContext = unknown>(callback: callbackFn<T.ClusterRerouteResponse, TContext>): TransportRequestCallback
    reroute<TContext = unknown>(params: T.ClusterRerouteRequest, callback: callbackFn<T.ClusterRerouteResponse, TContext>): TransportRequestCallback
    reroute<TContext = unknown>(params: T.ClusterRerouteRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterRerouteResponse, TContext>): TransportRequestCallback
    state<TContext = unknown>(params?: T.ClusterStateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterStateResponse, TContext>>
    state<TContext = unknown>(callback: callbackFn<T.ClusterStateResponse, TContext>): TransportRequestCallback
    state<TContext = unknown>(params: T.ClusterStateRequest, callback: callbackFn<T.ClusterStateResponse, TContext>): TransportRequestCallback
    state<TContext = unknown>(params: T.ClusterStateRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterStateResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params?: T.ClusterStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterStatsResponse, TContext>>
    stats<TContext = unknown>(callback: callbackFn<T.ClusterStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.ClusterStatsRequest, callback: callbackFn<T.ClusterStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.ClusterStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterStatsResponse, TContext>): TransportRequestCallback
  }
  count<TContext = unknown>(params?: T.CountRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CountResponse, TContext>>
  count<TContext = unknown>(callback: callbackFn<T.CountResponse, TContext>): TransportRequestCallback
  count<TContext = unknown>(params: T.CountRequest, callback: callbackFn<T.CountResponse, TContext>): TransportRequestCallback
  count<TContext = unknown>(params: T.CountRequest, options: TransportRequestOptions, callback: callbackFn<T.CountResponse, TContext>): TransportRequestCallback
  create<TDocument = unknown, TContext = unknown>(params: T.CreateRequest<TDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CreateResponse, TContext>>
  create<TDocument = unknown, TContext = unknown>(params: T.CreateRequest<TDocument>, callback: callbackFn<T.CreateResponse, TContext>): TransportRequestCallback
  create<TDocument = unknown, TContext = unknown>(params: T.CreateRequest<TDocument>, options: TransportRequestOptions, callback: callbackFn<T.CreateResponse, TContext>): TransportRequestCallback
  danglingIndices: {
    deleteDanglingIndex<TContext = unknown>(params: T.DanglingIndicesDeleteDanglingIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DanglingIndicesDeleteDanglingIndexResponse, TContext>>
    deleteDanglingIndex<TContext = unknown>(params: T.DanglingIndicesDeleteDanglingIndexRequest, callback: callbackFn<T.DanglingIndicesDeleteDanglingIndexResponse, TContext>): TransportRequestCallback
    deleteDanglingIndex<TContext = unknown>(params: T.DanglingIndicesDeleteDanglingIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.DanglingIndicesDeleteDanglingIndexResponse, TContext>): TransportRequestCallback
    importDanglingIndex<TContext = unknown>(params: T.DanglingIndicesImportDanglingIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DanglingIndicesImportDanglingIndexResponse, TContext>>
    importDanglingIndex<TContext = unknown>(params: T.DanglingIndicesImportDanglingIndexRequest, callback: callbackFn<T.DanglingIndicesImportDanglingIndexResponse, TContext>): TransportRequestCallback
    importDanglingIndex<TContext = unknown>(params: T.DanglingIndicesImportDanglingIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.DanglingIndicesImportDanglingIndexResponse, TContext>): TransportRequestCallback
    listDanglingIndices<TContext = unknown>(params?: T.DanglingIndicesListDanglingIndicesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DanglingIndicesListDanglingIndicesResponse, TContext>>
    listDanglingIndices<TContext = unknown>(callback: callbackFn<T.DanglingIndicesListDanglingIndicesResponse, TContext>): TransportRequestCallback
    listDanglingIndices<TContext = unknown>(params: T.DanglingIndicesListDanglingIndicesRequest, callback: callbackFn<T.DanglingIndicesListDanglingIndicesResponse, TContext>): TransportRequestCallback
    listDanglingIndices<TContext = unknown>(params: T.DanglingIndicesListDanglingIndicesRequest, options: TransportRequestOptions, callback: callbackFn<T.DanglingIndicesListDanglingIndicesResponse, TContext>): TransportRequestCallback
  }
  dataFrameTransformDeprecated: {
    deleteTransform<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    deleteTransform<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deleteTransform<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deleteTransform<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getTransform<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getTransform<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getTransform<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getTransform<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getTransformStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getTransformStats<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getTransformStats<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getTransformStats<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    previewTransform<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    previewTransform<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    previewTransform<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    previewTransform<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putTransform<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putTransform<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putTransform<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putTransform<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    startTransform<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    startTransform<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    startTransform<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    startTransform<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    stopTransform<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    stopTransform<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    stopTransform<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    stopTransform<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    updateTransform<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    updateTransform<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    updateTransform<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    updateTransform<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  }
  delete<TContext = unknown>(params: T.DeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteResponse, TContext>>
  delete<TContext = unknown>(params: T.DeleteRequest, callback: callbackFn<T.DeleteResponse, TContext>): TransportRequestCallback
  delete<TContext = unknown>(params: T.DeleteRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteResponse, TContext>): TransportRequestCallback
  deleteByQuery<TContext = unknown>(params: T.DeleteByQueryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteByQueryResponse, TContext>>
  deleteByQuery<TContext = unknown>(params: T.DeleteByQueryRequest, callback: callbackFn<T.DeleteByQueryResponse, TContext>): TransportRequestCallback
  deleteByQuery<TContext = unknown>(params: T.DeleteByQueryRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteByQueryResponse, TContext>): TransportRequestCallback
  deleteByQueryRethrottle<TContext = unknown>(params: T.DeleteByQueryRethrottleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteByQueryRethrottleResponse, TContext>>
  deleteByQueryRethrottle<TContext = unknown>(params: T.DeleteByQueryRethrottleRequest, callback: callbackFn<T.DeleteByQueryRethrottleResponse, TContext>): TransportRequestCallback
  deleteByQueryRethrottle<TContext = unknown>(params: T.DeleteByQueryRethrottleRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteByQueryRethrottleResponse, TContext>): TransportRequestCallback
  deleteScript<TContext = unknown>(params: T.DeleteScriptRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteScriptResponse, TContext>>
  deleteScript<TContext = unknown>(params: T.DeleteScriptRequest, callback: callbackFn<T.DeleteScriptResponse, TContext>): TransportRequestCallback
  deleteScript<TContext = unknown>(params: T.DeleteScriptRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteScriptResponse, TContext>): TransportRequestCallback
  enrich: {
    deletePolicy<TContext = unknown>(params: T.EnrichDeletePolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EnrichDeletePolicyResponse, TContext>>
    deletePolicy<TContext = unknown>(params: T.EnrichDeletePolicyRequest, callback: callbackFn<T.EnrichDeletePolicyResponse, TContext>): TransportRequestCallback
    deletePolicy<TContext = unknown>(params: T.EnrichDeletePolicyRequest, options: TransportRequestOptions, callback: callbackFn<T.EnrichDeletePolicyResponse, TContext>): TransportRequestCallback
    executePolicy<TContext = unknown>(params: T.EnrichExecutePolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EnrichExecutePolicyResponse, TContext>>
    executePolicy<TContext = unknown>(params: T.EnrichExecutePolicyRequest, callback: callbackFn<T.EnrichExecutePolicyResponse, TContext>): TransportRequestCallback
    executePolicy<TContext = unknown>(params: T.EnrichExecutePolicyRequest, options: TransportRequestOptions, callback: callbackFn<T.EnrichExecutePolicyResponse, TContext>): TransportRequestCallback
    getPolicy<TContext = unknown>(params?: T.EnrichGetPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EnrichGetPolicyResponse, TContext>>
    getPolicy<TContext = unknown>(callback: callbackFn<T.EnrichGetPolicyResponse, TContext>): TransportRequestCallback
    getPolicy<TContext = unknown>(params: T.EnrichGetPolicyRequest, callback: callbackFn<T.EnrichGetPolicyResponse, TContext>): TransportRequestCallback
    getPolicy<TContext = unknown>(params: T.EnrichGetPolicyRequest, options: TransportRequestOptions, callback: callbackFn<T.EnrichGetPolicyResponse, TContext>): TransportRequestCallback
    putPolicy<TContext = unknown>(params: T.EnrichPutPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EnrichPutPolicyResponse, TContext>>
    putPolicy<TContext = unknown>(params: T.EnrichPutPolicyRequest, callback: callbackFn<T.EnrichPutPolicyResponse, TContext>): TransportRequestCallback
    putPolicy<TContext = unknown>(params: T.EnrichPutPolicyRequest, options: TransportRequestOptions, callback: callbackFn<T.EnrichPutPolicyResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params?: T.EnrichStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EnrichStatsResponse, TContext>>
    stats<TContext = unknown>(callback: callbackFn<T.EnrichStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.EnrichStatsRequest, callback: callbackFn<T.EnrichStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.EnrichStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.EnrichStatsResponse, TContext>): TransportRequestCallback
  }
  eql: {
    delete<TContext = unknown>(params: T.EqlDeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EqlDeleteResponse, TContext>>
    delete<TContext = unknown>(params: T.EqlDeleteRequest, callback: callbackFn<T.EqlDeleteResponse, TContext>): TransportRequestCallback
    delete<TContext = unknown>(params: T.EqlDeleteRequest, options: TransportRequestOptions, callback: callbackFn<T.EqlDeleteResponse, TContext>): TransportRequestCallback
    get<TEvent = unknown, TContext = unknown>(params: T.EqlGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EqlGetResponse<TEvent>, TContext>>
    get<TEvent = unknown, TContext = unknown>(params: T.EqlGetRequest, callback: callbackFn<T.EqlGetResponse<TEvent>, TContext>): TransportRequestCallback
    get<TEvent = unknown, TContext = unknown>(params: T.EqlGetRequest, options: TransportRequestOptions, callback: callbackFn<T.EqlGetResponse<TEvent>, TContext>): TransportRequestCallback
    getStatus<TContext = unknown>(params: T.EqlGetStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EqlGetStatusResponse, TContext>>
    getStatus<TContext = unknown>(params: T.EqlGetStatusRequest, callback: callbackFn<T.EqlGetStatusResponse, TContext>): TransportRequestCallback
    getStatus<TContext = unknown>(params: T.EqlGetStatusRequest, options: TransportRequestOptions, callback: callbackFn<T.EqlGetStatusResponse, TContext>): TransportRequestCallback
    search<TEvent = unknown, TContext = unknown>(params: T.EqlSearchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EqlSearchResponse<TEvent>, TContext>>
    search<TEvent = unknown, TContext = unknown>(params: T.EqlSearchRequest, callback: callbackFn<T.EqlSearchResponse<TEvent>, TContext>): TransportRequestCallback
    search<TEvent = unknown, TContext = unknown>(params: T.EqlSearchRequest, options: TransportRequestOptions, callback: callbackFn<T.EqlSearchResponse<TEvent>, TContext>): TransportRequestCallback
  }
  exists<TContext = unknown>(params: T.ExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExistsResponse, TContext>>
  exists<TContext = unknown>(params: T.ExistsRequest, callback: callbackFn<T.ExistsResponse, TContext>): TransportRequestCallback
  exists<TContext = unknown>(params: T.ExistsRequest, options: TransportRequestOptions, callback: callbackFn<T.ExistsResponse, TContext>): TransportRequestCallback
  existsSource<TContext = unknown>(params: T.ExistsSourceRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExistsSourceResponse, TContext>>
  existsSource<TContext = unknown>(params: T.ExistsSourceRequest, callback: callbackFn<T.ExistsSourceResponse, TContext>): TransportRequestCallback
  existsSource<TContext = unknown>(params: T.ExistsSourceRequest, options: TransportRequestOptions, callback: callbackFn<T.ExistsSourceResponse, TContext>): TransportRequestCallback
  explain<TDocument = unknown, TContext = unknown>(params: T.ExplainRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExplainResponse<TDocument>, TContext>>
  explain<TDocument = unknown, TContext = unknown>(params: T.ExplainRequest, callback: callbackFn<T.ExplainResponse<TDocument>, TContext>): TransportRequestCallback
  explain<TDocument = unknown, TContext = unknown>(params: T.ExplainRequest, options: TransportRequestOptions, callback: callbackFn<T.ExplainResponse<TDocument>, TContext>): TransportRequestCallback
  features: {
    getFeatures<TContext = unknown>(params?: T.FeaturesGetFeaturesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FeaturesGetFeaturesResponse, TContext>>
    getFeatures<TContext = unknown>(callback: callbackFn<T.FeaturesGetFeaturesResponse, TContext>): TransportRequestCallback
    getFeatures<TContext = unknown>(params: T.FeaturesGetFeaturesRequest, callback: callbackFn<T.FeaturesGetFeaturesResponse, TContext>): TransportRequestCallback
    getFeatures<TContext = unknown>(params: T.FeaturesGetFeaturesRequest, options: TransportRequestOptions, callback: callbackFn<T.FeaturesGetFeaturesResponse, TContext>): TransportRequestCallback
    resetFeatures<TContext = unknown>(params?: T.FeaturesResetFeaturesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FeaturesResetFeaturesResponse, TContext>>
    resetFeatures<TContext = unknown>(callback: callbackFn<T.FeaturesResetFeaturesResponse, TContext>): TransportRequestCallback
    resetFeatures<TContext = unknown>(params: T.FeaturesResetFeaturesRequest, callback: callbackFn<T.FeaturesResetFeaturesResponse, TContext>): TransportRequestCallback
    resetFeatures<TContext = unknown>(params: T.FeaturesResetFeaturesRequest, options: TransportRequestOptions, callback: callbackFn<T.FeaturesResetFeaturesResponse, TContext>): TransportRequestCallback
  }
  fieldCaps<TContext = unknown>(params?: T.FieldCapsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FieldCapsResponse, TContext>>
  fieldCaps<TContext = unknown>(callback: callbackFn<T.FieldCapsResponse, TContext>): TransportRequestCallback
  fieldCaps<TContext = unknown>(params: T.FieldCapsRequest, callback: callbackFn<T.FieldCapsResponse, TContext>): TransportRequestCallback
  fieldCaps<TContext = unknown>(params: T.FieldCapsRequest, options: TransportRequestOptions, callback: callbackFn<T.FieldCapsResponse, TContext>): TransportRequestCallback
  fleet: {
    globalCheckpoints<TContext = unknown>(params: T.FleetGlobalCheckpointsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FleetGlobalCheckpointsResponse, TContext>>
    globalCheckpoints<TContext = unknown>(params: T.FleetGlobalCheckpointsRequest, callback: callbackFn<T.FleetGlobalCheckpointsResponse, TContext>): TransportRequestCallback
    globalCheckpoints<TContext = unknown>(params: T.FleetGlobalCheckpointsRequest, options: TransportRequestOptions, callback: callbackFn<T.FleetGlobalCheckpointsResponse, TContext>): TransportRequestCallback
    msearch<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    msearch<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    msearch<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    msearch<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    search<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    search<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    search<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    search<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  }
  get<TDocument = unknown, TContext = unknown>(params: T.GetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetResponse<TDocument>, TContext>>
  get<TDocument = unknown, TContext = unknown>(params: T.GetRequest, callback: callbackFn<T.GetResponse<TDocument>, TContext>): TransportRequestCallback
  get<TDocument = unknown, TContext = unknown>(params: T.GetRequest, options: TransportRequestOptions, callback: callbackFn<T.GetResponse<TDocument>, TContext>): TransportRequestCallback
  getScript<TContext = unknown>(params: T.GetScriptRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetScriptResponse, TContext>>
  getScript<TContext = unknown>(params: T.GetScriptRequest, callback: callbackFn<T.GetScriptResponse, TContext>): TransportRequestCallback
  getScript<TContext = unknown>(params: T.GetScriptRequest, options: TransportRequestOptions, callback: callbackFn<T.GetScriptResponse, TContext>): TransportRequestCallback
  getScriptContext<TContext = unknown>(params?: T.GetScriptContextRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetScriptContextResponse, TContext>>
  getScriptContext<TContext = unknown>(callback: callbackFn<T.GetScriptContextResponse, TContext>): TransportRequestCallback
  getScriptContext<TContext = unknown>(params: T.GetScriptContextRequest, callback: callbackFn<T.GetScriptContextResponse, TContext>): TransportRequestCallback
  getScriptContext<TContext = unknown>(params: T.GetScriptContextRequest, options: TransportRequestOptions, callback: callbackFn<T.GetScriptContextResponse, TContext>): TransportRequestCallback
  getScriptLanguages<TContext = unknown>(params?: T.GetScriptLanguagesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetScriptLanguagesResponse, TContext>>
  getScriptLanguages<TContext = unknown>(callback: callbackFn<T.GetScriptLanguagesResponse, TContext>): TransportRequestCallback
  getScriptLanguages<TContext = unknown>(params: T.GetScriptLanguagesRequest, callback: callbackFn<T.GetScriptLanguagesResponse, TContext>): TransportRequestCallback
  getScriptLanguages<TContext = unknown>(params: T.GetScriptLanguagesRequest, options: TransportRequestOptions, callback: callbackFn<T.GetScriptLanguagesResponse, TContext>): TransportRequestCallback
  getSource<TDocument = unknown, TContext = unknown>(params: T.GetSourceRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetSourceResponse<TDocument>, TContext>>
  getSource<TDocument = unknown, TContext = unknown>(params: T.GetSourceRequest, callback: callbackFn<T.GetSourceResponse<TDocument>, TContext>): TransportRequestCallback
  getSource<TDocument = unknown, TContext = unknown>(params: T.GetSourceRequest, options: TransportRequestOptions, callback: callbackFn<T.GetSourceResponse<TDocument>, TContext>): TransportRequestCallback
  graph: {
    explore<TContext = unknown>(params: T.GraphExploreRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GraphExploreResponse, TContext>>
    explore<TContext = unknown>(params: T.GraphExploreRequest, callback: callbackFn<T.GraphExploreResponse, TContext>): TransportRequestCallback
    explore<TContext = unknown>(params: T.GraphExploreRequest, options: TransportRequestOptions, callback: callbackFn<T.GraphExploreResponse, TContext>): TransportRequestCallback
  }
  ilm: {
    deleteLifecycle<TContext = unknown>(params: T.IlmDeleteLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmDeleteLifecycleResponse, TContext>>
    deleteLifecycle<TContext = unknown>(params: T.IlmDeleteLifecycleRequest, callback: callbackFn<T.IlmDeleteLifecycleResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TContext = unknown>(params: T.IlmDeleteLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.IlmDeleteLifecycleResponse, TContext>): TransportRequestCallback
    explainLifecycle<TContext = unknown>(params: T.IlmExplainLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmExplainLifecycleResponse, TContext>>
    explainLifecycle<TContext = unknown>(params: T.IlmExplainLifecycleRequest, callback: callbackFn<T.IlmExplainLifecycleResponse, TContext>): TransportRequestCallback
    explainLifecycle<TContext = unknown>(params: T.IlmExplainLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.IlmExplainLifecycleResponse, TContext>): TransportRequestCallback
    getLifecycle<TContext = unknown>(params?: T.IlmGetLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmGetLifecycleResponse, TContext>>
    getLifecycle<TContext = unknown>(callback: callbackFn<T.IlmGetLifecycleResponse, TContext>): TransportRequestCallback
    getLifecycle<TContext = unknown>(params: T.IlmGetLifecycleRequest, callback: callbackFn<T.IlmGetLifecycleResponse, TContext>): TransportRequestCallback
    getLifecycle<TContext = unknown>(params: T.IlmGetLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.IlmGetLifecycleResponse, TContext>): TransportRequestCallback
    getStatus<TContext = unknown>(params?: T.IlmGetStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmGetStatusResponse, TContext>>
    getStatus<TContext = unknown>(callback: callbackFn<T.IlmGetStatusResponse, TContext>): TransportRequestCallback
    getStatus<TContext = unknown>(params: T.IlmGetStatusRequest, callback: callbackFn<T.IlmGetStatusResponse, TContext>): TransportRequestCallback
    getStatus<TContext = unknown>(params: T.IlmGetStatusRequest, options: TransportRequestOptions, callback: callbackFn<T.IlmGetStatusResponse, TContext>): TransportRequestCallback
    migrateToDataTiers<TContext = unknown>(params?: T.IlmMigrateToDataTiersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmMigrateToDataTiersResponse, TContext>>
    migrateToDataTiers<TContext = unknown>(callback: callbackFn<T.IlmMigrateToDataTiersResponse, TContext>): TransportRequestCallback
    migrateToDataTiers<TContext = unknown>(params: T.IlmMigrateToDataTiersRequest, callback: callbackFn<T.IlmMigrateToDataTiersResponse, TContext>): TransportRequestCallback
    migrateToDataTiers<TContext = unknown>(params: T.IlmMigrateToDataTiersRequest, options: TransportRequestOptions, callback: callbackFn<T.IlmMigrateToDataTiersResponse, TContext>): TransportRequestCallback
    moveToStep<TContext = unknown>(params: T.IlmMoveToStepRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmMoveToStepResponse, TContext>>
    moveToStep<TContext = unknown>(params: T.IlmMoveToStepRequest, callback: callbackFn<T.IlmMoveToStepResponse, TContext>): TransportRequestCallback
    moveToStep<TContext = unknown>(params: T.IlmMoveToStepRequest, options: TransportRequestOptions, callback: callbackFn<T.IlmMoveToStepResponse, TContext>): TransportRequestCallback
    putLifecycle<TContext = unknown>(params: T.IlmPutLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmPutLifecycleResponse, TContext>>
    putLifecycle<TContext = unknown>(params: T.IlmPutLifecycleRequest, callback: callbackFn<T.IlmPutLifecycleResponse, TContext>): TransportRequestCallback
    putLifecycle<TContext = unknown>(params: T.IlmPutLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.IlmPutLifecycleResponse, TContext>): TransportRequestCallback
    removePolicy<TContext = unknown>(params: T.IlmRemovePolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmRemovePolicyResponse, TContext>>
    removePolicy<TContext = unknown>(params: T.IlmRemovePolicyRequest, callback: callbackFn<T.IlmRemovePolicyResponse, TContext>): TransportRequestCallback
    removePolicy<TContext = unknown>(params: T.IlmRemovePolicyRequest, options: TransportRequestOptions, callback: callbackFn<T.IlmRemovePolicyResponse, TContext>): TransportRequestCallback
    retry<TContext = unknown>(params: T.IlmRetryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmRetryResponse, TContext>>
    retry<TContext = unknown>(params: T.IlmRetryRequest, callback: callbackFn<T.IlmRetryResponse, TContext>): TransportRequestCallback
    retry<TContext = unknown>(params: T.IlmRetryRequest, options: TransportRequestOptions, callback: callbackFn<T.IlmRetryResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params?: T.IlmStartRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmStartResponse, TContext>>
    start<TContext = unknown>(callback: callbackFn<T.IlmStartResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params: T.IlmStartRequest, callback: callbackFn<T.IlmStartResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params: T.IlmStartRequest, options: TransportRequestOptions, callback: callbackFn<T.IlmStartResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params?: T.IlmStopRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IlmStopResponse, TContext>>
    stop<TContext = unknown>(callback: callbackFn<T.IlmStopResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params: T.IlmStopRequest, callback: callbackFn<T.IlmStopResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params: T.IlmStopRequest, options: TransportRequestOptions, callback: callbackFn<T.IlmStopResponse, TContext>): TransportRequestCallback
  }
  index<TDocument = unknown, TContext = unknown>(params: T.IndexRequest<TDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndexResponse, TContext>>
  index<TDocument = unknown, TContext = unknown>(params: T.IndexRequest<TDocument>, callback: callbackFn<T.IndexResponse, TContext>): TransportRequestCallback
  index<TDocument = unknown, TContext = unknown>(params: T.IndexRequest<TDocument>, options: TransportRequestOptions, callback: callbackFn<T.IndexResponse, TContext>): TransportRequestCallback
  indices: {
    addBlock<TContext = unknown>(params: T.IndicesAddBlockRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesAddBlockResponse, TContext>>
    addBlock<TContext = unknown>(params: T.IndicesAddBlockRequest, callback: callbackFn<T.IndicesAddBlockResponse, TContext>): TransportRequestCallback
    addBlock<TContext = unknown>(params: T.IndicesAddBlockRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesAddBlockResponse, TContext>): TransportRequestCallback
    analyze<TContext = unknown>(params?: T.IndicesAnalyzeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesAnalyzeResponse, TContext>>
    analyze<TContext = unknown>(callback: callbackFn<T.IndicesAnalyzeResponse, TContext>): TransportRequestCallback
    analyze<TContext = unknown>(params: T.IndicesAnalyzeRequest, callback: callbackFn<T.IndicesAnalyzeResponse, TContext>): TransportRequestCallback
    analyze<TContext = unknown>(params: T.IndicesAnalyzeRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesAnalyzeResponse, TContext>): TransportRequestCallback
    clearCache<TContext = unknown>(params?: T.IndicesClearCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesClearCacheResponse, TContext>>
    clearCache<TContext = unknown>(callback: callbackFn<T.IndicesClearCacheResponse, TContext>): TransportRequestCallback
    clearCache<TContext = unknown>(params: T.IndicesClearCacheRequest, callback: callbackFn<T.IndicesClearCacheResponse, TContext>): TransportRequestCallback
    clearCache<TContext = unknown>(params: T.IndicesClearCacheRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesClearCacheResponse, TContext>): TransportRequestCallback
    clone<TContext = unknown>(params: T.IndicesCloneRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesCloneResponse, TContext>>
    clone<TContext = unknown>(params: T.IndicesCloneRequest, callback: callbackFn<T.IndicesCloneResponse, TContext>): TransportRequestCallback
    clone<TContext = unknown>(params: T.IndicesCloneRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesCloneResponse, TContext>): TransportRequestCallback
    close<TContext = unknown>(params: T.IndicesCloseRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesCloseResponse, TContext>>
    close<TContext = unknown>(params: T.IndicesCloseRequest, callback: callbackFn<T.IndicesCloseResponse, TContext>): TransportRequestCallback
    close<TContext = unknown>(params: T.IndicesCloseRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesCloseResponse, TContext>): TransportRequestCallback
    create<TContext = unknown>(params: T.IndicesCreateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesCreateResponse, TContext>>
    create<TContext = unknown>(params: T.IndicesCreateRequest, callback: callbackFn<T.IndicesCreateResponse, TContext>): TransportRequestCallback
    create<TContext = unknown>(params: T.IndicesCreateRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesCreateResponse, TContext>): TransportRequestCallback
    createDataStream<TContext = unknown>(params: T.IndicesCreateDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesCreateDataStreamResponse, TContext>>
    createDataStream<TContext = unknown>(params: T.IndicesCreateDataStreamRequest, callback: callbackFn<T.IndicesCreateDataStreamResponse, TContext>): TransportRequestCallback
    createDataStream<TContext = unknown>(params: T.IndicesCreateDataStreamRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesCreateDataStreamResponse, TContext>): TransportRequestCallback
    dataStreamsStats<TContext = unknown>(params?: T.IndicesDataStreamsStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDataStreamsStatsResponse, TContext>>
    dataStreamsStats<TContext = unknown>(callback: callbackFn<T.IndicesDataStreamsStatsResponse, TContext>): TransportRequestCallback
    dataStreamsStats<TContext = unknown>(params: T.IndicesDataStreamsStatsRequest, callback: callbackFn<T.IndicesDataStreamsStatsResponse, TContext>): TransportRequestCallback
    dataStreamsStats<TContext = unknown>(params: T.IndicesDataStreamsStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesDataStreamsStatsResponse, TContext>): TransportRequestCallback
    delete<TContext = unknown>(params: T.IndicesDeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDeleteResponse, TContext>>
    delete<TContext = unknown>(params: T.IndicesDeleteRequest, callback: callbackFn<T.IndicesDeleteResponse, TContext>): TransportRequestCallback
    delete<TContext = unknown>(params: T.IndicesDeleteRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesDeleteResponse, TContext>): TransportRequestCallback
    deleteAlias<TContext = unknown>(params: T.IndicesDeleteAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDeleteAliasResponse, TContext>>
    deleteAlias<TContext = unknown>(params: T.IndicesDeleteAliasRequest, callback: callbackFn<T.IndicesDeleteAliasResponse, TContext>): TransportRequestCallback
    deleteAlias<TContext = unknown>(params: T.IndicesDeleteAliasRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesDeleteAliasResponse, TContext>): TransportRequestCallback
    deleteDataStream<TContext = unknown>(params: T.IndicesDeleteDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDeleteDataStreamResponse, TContext>>
    deleteDataStream<TContext = unknown>(params: T.IndicesDeleteDataStreamRequest, callback: callbackFn<T.IndicesDeleteDataStreamResponse, TContext>): TransportRequestCallback
    deleteDataStream<TContext = unknown>(params: T.IndicesDeleteDataStreamRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesDeleteDataStreamResponse, TContext>): TransportRequestCallback
    deleteIndexTemplate<TContext = unknown>(params: T.IndicesDeleteIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDeleteIndexTemplateResponse, TContext>>
    deleteIndexTemplate<TContext = unknown>(params: T.IndicesDeleteIndexTemplateRequest, callback: callbackFn<T.IndicesDeleteIndexTemplateResponse, TContext>): TransportRequestCallback
    deleteIndexTemplate<TContext = unknown>(params: T.IndicesDeleteIndexTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesDeleteIndexTemplateResponse, TContext>): TransportRequestCallback
    deleteTemplate<TContext = unknown>(params: T.IndicesDeleteTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDeleteTemplateResponse, TContext>>
    deleteTemplate<TContext = unknown>(params: T.IndicesDeleteTemplateRequest, callback: callbackFn<T.IndicesDeleteTemplateResponse, TContext>): TransportRequestCallback
    deleteTemplate<TContext = unknown>(params: T.IndicesDeleteTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesDeleteTemplateResponse, TContext>): TransportRequestCallback
    diskUsage<TContext = unknown>(params: T.IndicesDiskUsageRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDiskUsageResponse, TContext>>
    diskUsage<TContext = unknown>(params: T.IndicesDiskUsageRequest, callback: callbackFn<T.IndicesDiskUsageResponse, TContext>): TransportRequestCallback
    diskUsage<TContext = unknown>(params: T.IndicesDiskUsageRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesDiskUsageResponse, TContext>): TransportRequestCallback
    exists<TContext = unknown>(params: T.IndicesExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesExistsResponse, TContext>>
    exists<TContext = unknown>(params: T.IndicesExistsRequest, callback: callbackFn<T.IndicesExistsResponse, TContext>): TransportRequestCallback
    exists<TContext = unknown>(params: T.IndicesExistsRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesExistsResponse, TContext>): TransportRequestCallback
    existsAlias<TContext = unknown>(params: T.IndicesExistsAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesExistsAliasResponse, TContext>>
    existsAlias<TContext = unknown>(params: T.IndicesExistsAliasRequest, callback: callbackFn<T.IndicesExistsAliasResponse, TContext>): TransportRequestCallback
    existsAlias<TContext = unknown>(params: T.IndicesExistsAliasRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesExistsAliasResponse, TContext>): TransportRequestCallback
    existsIndexTemplate<TContext = unknown>(params: T.IndicesExistsIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesExistsIndexTemplateResponse, TContext>>
    existsIndexTemplate<TContext = unknown>(params: T.IndicesExistsIndexTemplateRequest, callback: callbackFn<T.IndicesExistsIndexTemplateResponse, TContext>): TransportRequestCallback
    existsIndexTemplate<TContext = unknown>(params: T.IndicesExistsIndexTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesExistsIndexTemplateResponse, TContext>): TransportRequestCallback
    existsTemplate<TContext = unknown>(params: T.IndicesExistsTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesExistsTemplateResponse, TContext>>
    existsTemplate<TContext = unknown>(params: T.IndicesExistsTemplateRequest, callback: callbackFn<T.IndicesExistsTemplateResponse, TContext>): TransportRequestCallback
    existsTemplate<TContext = unknown>(params: T.IndicesExistsTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesExistsTemplateResponse, TContext>): TransportRequestCallback
    existsType<TContext = unknown>(params: T.IndicesExistsTypeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesExistsTypeResponse, TContext>>
    existsType<TContext = unknown>(params: T.IndicesExistsTypeRequest, callback: callbackFn<T.IndicesExistsTypeResponse, TContext>): TransportRequestCallback
    existsType<TContext = unknown>(params: T.IndicesExistsTypeRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesExistsTypeResponse, TContext>): TransportRequestCallback
    fieldUsageStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    fieldUsageStats<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    fieldUsageStats<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    fieldUsageStats<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    flush<TContext = unknown>(params?: T.IndicesFlushRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesFlushResponse, TContext>>
    flush<TContext = unknown>(callback: callbackFn<T.IndicesFlushResponse, TContext>): TransportRequestCallback
    flush<TContext = unknown>(params: T.IndicesFlushRequest, callback: callbackFn<T.IndicesFlushResponse, TContext>): TransportRequestCallback
    flush<TContext = unknown>(params: T.IndicesFlushRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesFlushResponse, TContext>): TransportRequestCallback
    flushSynced<TContext = unknown>(params?: T.IndicesFlushSyncedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesFlushSyncedResponse, TContext>>
    flushSynced<TContext = unknown>(callback: callbackFn<T.IndicesFlushSyncedResponse, TContext>): TransportRequestCallback
    flushSynced<TContext = unknown>(params: T.IndicesFlushSyncedRequest, callback: callbackFn<T.IndicesFlushSyncedResponse, TContext>): TransportRequestCallback
    flushSynced<TContext = unknown>(params: T.IndicesFlushSyncedRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesFlushSyncedResponse, TContext>): TransportRequestCallback
    forcemerge<TContext = unknown>(params?: T.IndicesForcemergeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesForcemergeResponse, TContext>>
    forcemerge<TContext = unknown>(callback: callbackFn<T.IndicesForcemergeResponse, TContext>): TransportRequestCallback
    forcemerge<TContext = unknown>(params: T.IndicesForcemergeRequest, callback: callbackFn<T.IndicesForcemergeResponse, TContext>): TransportRequestCallback
    forcemerge<TContext = unknown>(params: T.IndicesForcemergeRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesForcemergeResponse, TContext>): TransportRequestCallback
    freeze<TContext = unknown>(params: T.IndicesFreezeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesFreezeResponse, TContext>>
    freeze<TContext = unknown>(params: T.IndicesFreezeRequest, callback: callbackFn<T.IndicesFreezeResponse, TContext>): TransportRequestCallback
    freeze<TContext = unknown>(params: T.IndicesFreezeRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesFreezeResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.IndicesGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetResponse, TContext>>
    get<TContext = unknown>(params: T.IndicesGetRequest, callback: callbackFn<T.IndicesGetResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.IndicesGetRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesGetResponse, TContext>): TransportRequestCallback
    getAlias<TContext = unknown>(params?: T.IndicesGetAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetAliasResponse, TContext>>
    getAlias<TContext = unknown>(callback: callbackFn<T.IndicesGetAliasResponse, TContext>): TransportRequestCallback
    getAlias<TContext = unknown>(params: T.IndicesGetAliasRequest, callback: callbackFn<T.IndicesGetAliasResponse, TContext>): TransportRequestCallback
    getAlias<TContext = unknown>(params: T.IndicesGetAliasRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesGetAliasResponse, TContext>): TransportRequestCallback
    getDataStream<TContext = unknown>(params?: T.IndicesGetDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetDataStreamResponse, TContext>>
    getDataStream<TContext = unknown>(callback: callbackFn<T.IndicesGetDataStreamResponse, TContext>): TransportRequestCallback
    getDataStream<TContext = unknown>(params: T.IndicesGetDataStreamRequest, callback: callbackFn<T.IndicesGetDataStreamResponse, TContext>): TransportRequestCallback
    getDataStream<TContext = unknown>(params: T.IndicesGetDataStreamRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesGetDataStreamResponse, TContext>): TransportRequestCallback
    getFieldMapping<TContext = unknown>(params: T.IndicesGetFieldMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetFieldMappingResponse, TContext>>
    getFieldMapping<TContext = unknown>(params: T.IndicesGetFieldMappingRequest, callback: callbackFn<T.IndicesGetFieldMappingResponse, TContext>): TransportRequestCallback
    getFieldMapping<TContext = unknown>(params: T.IndicesGetFieldMappingRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesGetFieldMappingResponse, TContext>): TransportRequestCallback
    getIndexTemplate<TContext = unknown>(params?: T.IndicesGetIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetIndexTemplateResponse, TContext>>
    getIndexTemplate<TContext = unknown>(callback: callbackFn<T.IndicesGetIndexTemplateResponse, TContext>): TransportRequestCallback
    getIndexTemplate<TContext = unknown>(params: T.IndicesGetIndexTemplateRequest, callback: callbackFn<T.IndicesGetIndexTemplateResponse, TContext>): TransportRequestCallback
    getIndexTemplate<TContext = unknown>(params: T.IndicesGetIndexTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesGetIndexTemplateResponse, TContext>): TransportRequestCallback
    getMapping<TContext = unknown>(params?: T.IndicesGetMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetMappingResponse, TContext>>
    getMapping<TContext = unknown>(callback: callbackFn<T.IndicesGetMappingResponse, TContext>): TransportRequestCallback
    getMapping<TContext = unknown>(params: T.IndicesGetMappingRequest, callback: callbackFn<T.IndicesGetMappingResponse, TContext>): TransportRequestCallback
    getMapping<TContext = unknown>(params: T.IndicesGetMappingRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesGetMappingResponse, TContext>): TransportRequestCallback
    getSettings<TContext = unknown>(params?: T.IndicesGetSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetSettingsResponse, TContext>>
    getSettings<TContext = unknown>(callback: callbackFn<T.IndicesGetSettingsResponse, TContext>): TransportRequestCallback
    getSettings<TContext = unknown>(params: T.IndicesGetSettingsRequest, callback: callbackFn<T.IndicesGetSettingsResponse, TContext>): TransportRequestCallback
    getSettings<TContext = unknown>(params: T.IndicesGetSettingsRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesGetSettingsResponse, TContext>): TransportRequestCallback
    getTemplate<TContext = unknown>(params?: T.IndicesGetTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetTemplateResponse, TContext>>
    getTemplate<TContext = unknown>(callback: callbackFn<T.IndicesGetTemplateResponse, TContext>): TransportRequestCallback
    getTemplate<TContext = unknown>(params: T.IndicesGetTemplateRequest, callback: callbackFn<T.IndicesGetTemplateResponse, TContext>): TransportRequestCallback
    getTemplate<TContext = unknown>(params: T.IndicesGetTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesGetTemplateResponse, TContext>): TransportRequestCallback
    getUpgrade<TContext = unknown>(params?: T.IndicesGetUpgradeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetUpgradeResponse, TContext>>
    getUpgrade<TContext = unknown>(callback: callbackFn<T.IndicesGetUpgradeResponse, TContext>): TransportRequestCallback
    getUpgrade<TContext = unknown>(params: T.IndicesGetUpgradeRequest, callback: callbackFn<T.IndicesGetUpgradeResponse, TContext>): TransportRequestCallback
    getUpgrade<TContext = unknown>(params: T.IndicesGetUpgradeRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesGetUpgradeResponse, TContext>): TransportRequestCallback
    migrateToDataStream<TContext = unknown>(params: T.IndicesMigrateToDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesMigrateToDataStreamResponse, TContext>>
    migrateToDataStream<TContext = unknown>(params: T.IndicesMigrateToDataStreamRequest, callback: callbackFn<T.IndicesMigrateToDataStreamResponse, TContext>): TransportRequestCallback
    migrateToDataStream<TContext = unknown>(params: T.IndicesMigrateToDataStreamRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesMigrateToDataStreamResponse, TContext>): TransportRequestCallback
    modifyDataStream<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    modifyDataStream<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    modifyDataStream<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    modifyDataStream<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    open<TContext = unknown>(params: T.IndicesOpenRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesOpenResponse, TContext>>
    open<TContext = unknown>(params: T.IndicesOpenRequest, callback: callbackFn<T.IndicesOpenResponse, TContext>): TransportRequestCallback
    open<TContext = unknown>(params: T.IndicesOpenRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesOpenResponse, TContext>): TransportRequestCallback
    promoteDataStream<TContext = unknown>(params: T.IndicesPromoteDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesPromoteDataStreamResponse, TContext>>
    promoteDataStream<TContext = unknown>(params: T.IndicesPromoteDataStreamRequest, callback: callbackFn<T.IndicesPromoteDataStreamResponse, TContext>): TransportRequestCallback
    promoteDataStream<TContext = unknown>(params: T.IndicesPromoteDataStreamRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesPromoteDataStreamResponse, TContext>): TransportRequestCallback
    putAlias<TContext = unknown>(params: T.IndicesPutAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesPutAliasResponse, TContext>>
    putAlias<TContext = unknown>(params: T.IndicesPutAliasRequest, callback: callbackFn<T.IndicesPutAliasResponse, TContext>): TransportRequestCallback
    putAlias<TContext = unknown>(params: T.IndicesPutAliasRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesPutAliasResponse, TContext>): TransportRequestCallback
    putIndexTemplate<TContext = unknown>(params: T.IndicesPutIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesPutIndexTemplateResponse, TContext>>
    putIndexTemplate<TContext = unknown>(params: T.IndicesPutIndexTemplateRequest, callback: callbackFn<T.IndicesPutIndexTemplateResponse, TContext>): TransportRequestCallback
    putIndexTemplate<TContext = unknown>(params: T.IndicesPutIndexTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesPutIndexTemplateResponse, TContext>): TransportRequestCallback
    putMapping<TContext = unknown>(params: T.IndicesPutMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesPutMappingResponse, TContext>>
    putMapping<TContext = unknown>(params: T.IndicesPutMappingRequest, callback: callbackFn<T.IndicesPutMappingResponse, TContext>): TransportRequestCallback
    putMapping<TContext = unknown>(params: T.IndicesPutMappingRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesPutMappingResponse, TContext>): TransportRequestCallback
    putSettings<TContext = unknown>(params?: T.IndicesPutSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesPutSettingsResponse, TContext>>
    putSettings<TContext = unknown>(callback: callbackFn<T.IndicesPutSettingsResponse, TContext>): TransportRequestCallback
    putSettings<TContext = unknown>(params: T.IndicesPutSettingsRequest, callback: callbackFn<T.IndicesPutSettingsResponse, TContext>): TransportRequestCallback
    putSettings<TContext = unknown>(params: T.IndicesPutSettingsRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesPutSettingsResponse, TContext>): TransportRequestCallback
    putTemplate<TContext = unknown>(params: T.IndicesPutTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesPutTemplateResponse, TContext>>
    putTemplate<TContext = unknown>(params: T.IndicesPutTemplateRequest, callback: callbackFn<T.IndicesPutTemplateResponse, TContext>): TransportRequestCallback
    putTemplate<TContext = unknown>(params: T.IndicesPutTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesPutTemplateResponse, TContext>): TransportRequestCallback
    recovery<TContext = unknown>(params?: T.IndicesRecoveryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesRecoveryResponse, TContext>>
    recovery<TContext = unknown>(callback: callbackFn<T.IndicesRecoveryResponse, TContext>): TransportRequestCallback
    recovery<TContext = unknown>(params: T.IndicesRecoveryRequest, callback: callbackFn<T.IndicesRecoveryResponse, TContext>): TransportRequestCallback
    recovery<TContext = unknown>(params: T.IndicesRecoveryRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesRecoveryResponse, TContext>): TransportRequestCallback
    refresh<TContext = unknown>(params?: T.IndicesRefreshRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesRefreshResponse, TContext>>
    refresh<TContext = unknown>(callback: callbackFn<T.IndicesRefreshResponse, TContext>): TransportRequestCallback
    refresh<TContext = unknown>(params: T.IndicesRefreshRequest, callback: callbackFn<T.IndicesRefreshResponse, TContext>): TransportRequestCallback
    refresh<TContext = unknown>(params: T.IndicesRefreshRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesRefreshResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TContext = unknown>(params: T.IndicesReloadSearchAnalyzersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesReloadSearchAnalyzersResponse, TContext>>
    reloadSearchAnalyzers<TContext = unknown>(params: T.IndicesReloadSearchAnalyzersRequest, callback: callbackFn<T.IndicesReloadSearchAnalyzersResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TContext = unknown>(params: T.IndicesReloadSearchAnalyzersRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesReloadSearchAnalyzersResponse, TContext>): TransportRequestCallback
    resolveIndex<TContext = unknown>(params: T.IndicesResolveIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesResolveIndexResponse, TContext>>
    resolveIndex<TContext = unknown>(params: T.IndicesResolveIndexRequest, callback: callbackFn<T.IndicesResolveIndexResponse, TContext>): TransportRequestCallback
    resolveIndex<TContext = unknown>(params: T.IndicesResolveIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesResolveIndexResponse, TContext>): TransportRequestCallback
    rollover<TContext = unknown>(params: T.IndicesRolloverRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesRolloverResponse, TContext>>
    rollover<TContext = unknown>(params: T.IndicesRolloverRequest, callback: callbackFn<T.IndicesRolloverResponse, TContext>): TransportRequestCallback
    rollover<TContext = unknown>(params: T.IndicesRolloverRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesRolloverResponse, TContext>): TransportRequestCallback
    segments<TContext = unknown>(params?: T.IndicesSegmentsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesSegmentsResponse, TContext>>
    segments<TContext = unknown>(callback: callbackFn<T.IndicesSegmentsResponse, TContext>): TransportRequestCallback
    segments<TContext = unknown>(params: T.IndicesSegmentsRequest, callback: callbackFn<T.IndicesSegmentsResponse, TContext>): TransportRequestCallback
    segments<TContext = unknown>(params: T.IndicesSegmentsRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesSegmentsResponse, TContext>): TransportRequestCallback
    shardStores<TContext = unknown>(params?: T.IndicesShardStoresRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesShardStoresResponse, TContext>>
    shardStores<TContext = unknown>(callback: callbackFn<T.IndicesShardStoresResponse, TContext>): TransportRequestCallback
    shardStores<TContext = unknown>(params: T.IndicesShardStoresRequest, callback: callbackFn<T.IndicesShardStoresResponse, TContext>): TransportRequestCallback
    shardStores<TContext = unknown>(params: T.IndicesShardStoresRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesShardStoresResponse, TContext>): TransportRequestCallback
    shrink<TContext = unknown>(params: T.IndicesShrinkRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesShrinkResponse, TContext>>
    shrink<TContext = unknown>(params: T.IndicesShrinkRequest, callback: callbackFn<T.IndicesShrinkResponse, TContext>): TransportRequestCallback
    shrink<TContext = unknown>(params: T.IndicesShrinkRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesShrinkResponse, TContext>): TransportRequestCallback
    simulateIndexTemplate<TContext = unknown>(params: T.IndicesSimulateIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesSimulateIndexTemplateResponse, TContext>>
    simulateIndexTemplate<TContext = unknown>(params: T.IndicesSimulateIndexTemplateRequest, callback: callbackFn<T.IndicesSimulateIndexTemplateResponse, TContext>): TransportRequestCallback
    simulateIndexTemplate<TContext = unknown>(params: T.IndicesSimulateIndexTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesSimulateIndexTemplateResponse, TContext>): TransportRequestCallback
    simulateTemplate<TContext = unknown>(params?: T.IndicesSimulateTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesSimulateTemplateResponse, TContext>>
    simulateTemplate<TContext = unknown>(callback: callbackFn<T.IndicesSimulateTemplateResponse, TContext>): TransportRequestCallback
    simulateTemplate<TContext = unknown>(params: T.IndicesSimulateTemplateRequest, callback: callbackFn<T.IndicesSimulateTemplateResponse, TContext>): TransportRequestCallback
    simulateTemplate<TContext = unknown>(params: T.IndicesSimulateTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesSimulateTemplateResponse, TContext>): TransportRequestCallback
    split<TContext = unknown>(params: T.IndicesSplitRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesSplitResponse, TContext>>
    split<TContext = unknown>(params: T.IndicesSplitRequest, callback: callbackFn<T.IndicesSplitResponse, TContext>): TransportRequestCallback
    split<TContext = unknown>(params: T.IndicesSplitRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesSplitResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params?: T.IndicesStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesStatsResponse, TContext>>
    stats<TContext = unknown>(callback: callbackFn<T.IndicesStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.IndicesStatsRequest, callback: callbackFn<T.IndicesStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.IndicesStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesStatsResponse, TContext>): TransportRequestCallback
    unfreeze<TContext = unknown>(params: T.IndicesUnfreezeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesUnfreezeResponse, TContext>>
    unfreeze<TContext = unknown>(params: T.IndicesUnfreezeRequest, callback: callbackFn<T.IndicesUnfreezeResponse, TContext>): TransportRequestCallback
    unfreeze<TContext = unknown>(params: T.IndicesUnfreezeRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesUnfreezeResponse, TContext>): TransportRequestCallback
    updateAliases<TContext = unknown>(params?: T.IndicesUpdateAliasesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesUpdateAliasesResponse, TContext>>
    updateAliases<TContext = unknown>(callback: callbackFn<T.IndicesUpdateAliasesResponse, TContext>): TransportRequestCallback
    updateAliases<TContext = unknown>(params: T.IndicesUpdateAliasesRequest, callback: callbackFn<T.IndicesUpdateAliasesResponse, TContext>): TransportRequestCallback
    updateAliases<TContext = unknown>(params: T.IndicesUpdateAliasesRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesUpdateAliasesResponse, TContext>): TransportRequestCallback
    upgrade<TContext = unknown>(params?: T.IndicesUpgradeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesUpgradeResponse, TContext>>
    upgrade<TContext = unknown>(callback: callbackFn<T.IndicesUpgradeResponse, TContext>): TransportRequestCallback
    upgrade<TContext = unknown>(params: T.IndicesUpgradeRequest, callback: callbackFn<T.IndicesUpgradeResponse, TContext>): TransportRequestCallback
    upgrade<TContext = unknown>(params: T.IndicesUpgradeRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesUpgradeResponse, TContext>): TransportRequestCallback
    validateQuery<TContext = unknown>(params?: T.IndicesValidateQueryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesValidateQueryResponse, TContext>>
    validateQuery<TContext = unknown>(callback: callbackFn<T.IndicesValidateQueryResponse, TContext>): TransportRequestCallback
    validateQuery<TContext = unknown>(params: T.IndicesValidateQueryRequest, callback: callbackFn<T.IndicesValidateQueryResponse, TContext>): TransportRequestCallback
    validateQuery<TContext = unknown>(params: T.IndicesValidateQueryRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesValidateQueryResponse, TContext>): TransportRequestCallback
  }
  info<TContext = unknown>(params?: T.InfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.InfoResponse, TContext>>
  info<TContext = unknown>(callback: callbackFn<T.InfoResponse, TContext>): TransportRequestCallback
  info<TContext = unknown>(params: T.InfoRequest, callback: callbackFn<T.InfoResponse, TContext>): TransportRequestCallback
  info<TContext = unknown>(params: T.InfoRequest, options: TransportRequestOptions, callback: callbackFn<T.InfoResponse, TContext>): TransportRequestCallback
  ingest: {
    deletePipeline<TContext = unknown>(params: T.IngestDeletePipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IngestDeletePipelineResponse, TContext>>
    deletePipeline<TContext = unknown>(params: T.IngestDeletePipelineRequest, callback: callbackFn<T.IngestDeletePipelineResponse, TContext>): TransportRequestCallback
    deletePipeline<TContext = unknown>(params: T.IngestDeletePipelineRequest, options: TransportRequestOptions, callback: callbackFn<T.IngestDeletePipelineResponse, TContext>): TransportRequestCallback
    geoIpStats<TContext = unknown>(params?: T.IngestGeoIpStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IngestGeoIpStatsResponse, TContext>>
    geoIpStats<TContext = unknown>(callback: callbackFn<T.IngestGeoIpStatsResponse, TContext>): TransportRequestCallback
    geoIpStats<TContext = unknown>(params: T.IngestGeoIpStatsRequest, callback: callbackFn<T.IngestGeoIpStatsResponse, TContext>): TransportRequestCallback
    geoIpStats<TContext = unknown>(params: T.IngestGeoIpStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.IngestGeoIpStatsResponse, TContext>): TransportRequestCallback
    getPipeline<TContext = unknown>(params?: T.IngestGetPipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IngestGetPipelineResponse, TContext>>
    getPipeline<TContext = unknown>(callback: callbackFn<T.IngestGetPipelineResponse, TContext>): TransportRequestCallback
    getPipeline<TContext = unknown>(params: T.IngestGetPipelineRequest, callback: callbackFn<T.IngestGetPipelineResponse, TContext>): TransportRequestCallback
    getPipeline<TContext = unknown>(params: T.IngestGetPipelineRequest, options: TransportRequestOptions, callback: callbackFn<T.IngestGetPipelineResponse, TContext>): TransportRequestCallback
    processorGrok<TContext = unknown>(params?: T.IngestProcessorGrokRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IngestProcessorGrokResponse, TContext>>
    processorGrok<TContext = unknown>(callback: callbackFn<T.IngestProcessorGrokResponse, TContext>): TransportRequestCallback
    processorGrok<TContext = unknown>(params: T.IngestProcessorGrokRequest, callback: callbackFn<T.IngestProcessorGrokResponse, TContext>): TransportRequestCallback
    processorGrok<TContext = unknown>(params: T.IngestProcessorGrokRequest, options: TransportRequestOptions, callback: callbackFn<T.IngestProcessorGrokResponse, TContext>): TransportRequestCallback
    putPipeline<TContext = unknown>(params: T.IngestPutPipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IngestPutPipelineResponse, TContext>>
    putPipeline<TContext = unknown>(params: T.IngestPutPipelineRequest, callback: callbackFn<T.IngestPutPipelineResponse, TContext>): TransportRequestCallback
    putPipeline<TContext = unknown>(params: T.IngestPutPipelineRequest, options: TransportRequestOptions, callback: callbackFn<T.IngestPutPipelineResponse, TContext>): TransportRequestCallback
    simulate<TContext = unknown>(params?: T.IngestSimulateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IngestSimulateResponse, TContext>>
    simulate<TContext = unknown>(callback: callbackFn<T.IngestSimulateResponse, TContext>): TransportRequestCallback
    simulate<TContext = unknown>(params: T.IngestSimulateRequest, callback: callbackFn<T.IngestSimulateResponse, TContext>): TransportRequestCallback
    simulate<TContext = unknown>(params: T.IngestSimulateRequest, options: TransportRequestOptions, callback: callbackFn<T.IngestSimulateResponse, TContext>): TransportRequestCallback
  }
  license: {
    delete<TContext = unknown>(params?: T.LicenseDeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LicenseDeleteResponse, TContext>>
    delete<TContext = unknown>(callback: callbackFn<T.LicenseDeleteResponse, TContext>): TransportRequestCallback
    delete<TContext = unknown>(params: T.LicenseDeleteRequest, callback: callbackFn<T.LicenseDeleteResponse, TContext>): TransportRequestCallback
    delete<TContext = unknown>(params: T.LicenseDeleteRequest, options: TransportRequestOptions, callback: callbackFn<T.LicenseDeleteResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params?: T.LicenseGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LicenseGetResponse, TContext>>
    get<TContext = unknown>(callback: callbackFn<T.LicenseGetResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.LicenseGetRequest, callback: callbackFn<T.LicenseGetResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.LicenseGetRequest, options: TransportRequestOptions, callback: callbackFn<T.LicenseGetResponse, TContext>): TransportRequestCallback
    getBasicStatus<TContext = unknown>(params?: T.LicenseGetBasicStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LicenseGetBasicStatusResponse, TContext>>
    getBasicStatus<TContext = unknown>(callback: callbackFn<T.LicenseGetBasicStatusResponse, TContext>): TransportRequestCallback
    getBasicStatus<TContext = unknown>(params: T.LicenseGetBasicStatusRequest, callback: callbackFn<T.LicenseGetBasicStatusResponse, TContext>): TransportRequestCallback
    getBasicStatus<TContext = unknown>(params: T.LicenseGetBasicStatusRequest, options: TransportRequestOptions, callback: callbackFn<T.LicenseGetBasicStatusResponse, TContext>): TransportRequestCallback
    getTrialStatus<TContext = unknown>(params?: T.LicenseGetTrialStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LicenseGetTrialStatusResponse, TContext>>
    getTrialStatus<TContext = unknown>(callback: callbackFn<T.LicenseGetTrialStatusResponse, TContext>): TransportRequestCallback
    getTrialStatus<TContext = unknown>(params: T.LicenseGetTrialStatusRequest, callback: callbackFn<T.LicenseGetTrialStatusResponse, TContext>): TransportRequestCallback
    getTrialStatus<TContext = unknown>(params: T.LicenseGetTrialStatusRequest, options: TransportRequestOptions, callback: callbackFn<T.LicenseGetTrialStatusResponse, TContext>): TransportRequestCallback
    post<TContext = unknown>(params?: T.LicensePostRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LicensePostResponse, TContext>>
    post<TContext = unknown>(callback: callbackFn<T.LicensePostResponse, TContext>): TransportRequestCallback
    post<TContext = unknown>(params: T.LicensePostRequest, callback: callbackFn<T.LicensePostResponse, TContext>): TransportRequestCallback
    post<TContext = unknown>(params: T.LicensePostRequest, options: TransportRequestOptions, callback: callbackFn<T.LicensePostResponse, TContext>): TransportRequestCallback
    postStartBasic<TContext = unknown>(params?: T.LicensePostStartBasicRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LicensePostStartBasicResponse, TContext>>
    postStartBasic<TContext = unknown>(callback: callbackFn<T.LicensePostStartBasicResponse, TContext>): TransportRequestCallback
    postStartBasic<TContext = unknown>(params: T.LicensePostStartBasicRequest, callback: callbackFn<T.LicensePostStartBasicResponse, TContext>): TransportRequestCallback
    postStartBasic<TContext = unknown>(params: T.LicensePostStartBasicRequest, options: TransportRequestOptions, callback: callbackFn<T.LicensePostStartBasicResponse, TContext>): TransportRequestCallback
    postStartTrial<TContext = unknown>(params?: T.LicensePostStartTrialRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LicensePostStartTrialResponse, TContext>>
    postStartTrial<TContext = unknown>(callback: callbackFn<T.LicensePostStartTrialResponse, TContext>): TransportRequestCallback
    postStartTrial<TContext = unknown>(params: T.LicensePostStartTrialRequest, callback: callbackFn<T.LicensePostStartTrialResponse, TContext>): TransportRequestCallback
    postStartTrial<TContext = unknown>(params: T.LicensePostStartTrialRequest, options: TransportRequestOptions, callback: callbackFn<T.LicensePostStartTrialResponse, TContext>): TransportRequestCallback
  }
  logstash: {
    deletePipeline<TContext = unknown>(params: T.LogstashDeletePipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LogstashDeletePipelineResponse, TContext>>
    deletePipeline<TContext = unknown>(params: T.LogstashDeletePipelineRequest, callback: callbackFn<T.LogstashDeletePipelineResponse, TContext>): TransportRequestCallback
    deletePipeline<TContext = unknown>(params: T.LogstashDeletePipelineRequest, options: TransportRequestOptions, callback: callbackFn<T.LogstashDeletePipelineResponse, TContext>): TransportRequestCallback
    getPipeline<TContext = unknown>(params: T.LogstashGetPipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LogstashGetPipelineResponse, TContext>>
    getPipeline<TContext = unknown>(params: T.LogstashGetPipelineRequest, callback: callbackFn<T.LogstashGetPipelineResponse, TContext>): TransportRequestCallback
    getPipeline<TContext = unknown>(params: T.LogstashGetPipelineRequest, options: TransportRequestOptions, callback: callbackFn<T.LogstashGetPipelineResponse, TContext>): TransportRequestCallback
    putPipeline<TContext = unknown>(params: T.LogstashPutPipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.LogstashPutPipelineResponse, TContext>>
    putPipeline<TContext = unknown>(params: T.LogstashPutPipelineRequest, callback: callbackFn<T.LogstashPutPipelineResponse, TContext>): TransportRequestCallback
    putPipeline<TContext = unknown>(params: T.LogstashPutPipelineRequest, options: TransportRequestOptions, callback: callbackFn<T.LogstashPutPipelineResponse, TContext>): TransportRequestCallback
  }
  mget<TDocument = unknown, TContext = unknown>(params?: T.MgetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MgetResponse<TDocument>, TContext>>
  mget<TDocument = unknown, TContext = unknown>(callback: callbackFn<T.MgetResponse<TDocument>, TContext>): TransportRequestCallback
  mget<TDocument = unknown, TContext = unknown>(params: T.MgetRequest, callback: callbackFn<T.MgetResponse<TDocument>, TContext>): TransportRequestCallback
  mget<TDocument = unknown, TContext = unknown>(params: T.MgetRequest, options: TransportRequestOptions, callback: callbackFn<T.MgetResponse<TDocument>, TContext>): TransportRequestCallback
  migration: {
    deprecations<TContext = unknown>(params?: T.MigrationDeprecationsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MigrationDeprecationsResponse, TContext>>
    deprecations<TContext = unknown>(callback: callbackFn<T.MigrationDeprecationsResponse, TContext>): TransportRequestCallback
    deprecations<TContext = unknown>(params: T.MigrationDeprecationsRequest, callback: callbackFn<T.MigrationDeprecationsResponse, TContext>): TransportRequestCallback
    deprecations<TContext = unknown>(params: T.MigrationDeprecationsRequest, options: TransportRequestOptions, callback: callbackFn<T.MigrationDeprecationsResponse, TContext>): TransportRequestCallback
    getFeatureUpgradeStatus<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getFeatureUpgradeStatus<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getFeatureUpgradeStatus<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getFeatureUpgradeStatus<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    postFeatureUpgrade<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    postFeatureUpgrade<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    postFeatureUpgrade<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    postFeatureUpgrade<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  }
  ml: {
    closeJob<TContext = unknown>(params: T.MlCloseJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlCloseJobResponse, TContext>>
    closeJob<TContext = unknown>(params: T.MlCloseJobRequest, callback: callbackFn<T.MlCloseJobResponse, TContext>): TransportRequestCallback
    closeJob<TContext = unknown>(params: T.MlCloseJobRequest, options: TransportRequestOptions, callback: callbackFn<T.MlCloseJobResponse, TContext>): TransportRequestCallback
    deleteCalendar<TContext = unknown>(params: T.MlDeleteCalendarRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteCalendarResponse, TContext>>
    deleteCalendar<TContext = unknown>(params: T.MlDeleteCalendarRequest, callback: callbackFn<T.MlDeleteCalendarResponse, TContext>): TransportRequestCallback
    deleteCalendar<TContext = unknown>(params: T.MlDeleteCalendarRequest, options: TransportRequestOptions, callback: callbackFn<T.MlDeleteCalendarResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TContext = unknown>(params: T.MlDeleteCalendarEventRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteCalendarEventResponse, TContext>>
    deleteCalendarEvent<TContext = unknown>(params: T.MlDeleteCalendarEventRequest, callback: callbackFn<T.MlDeleteCalendarEventResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TContext = unknown>(params: T.MlDeleteCalendarEventRequest, options: TransportRequestOptions, callback: callbackFn<T.MlDeleteCalendarEventResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TContext = unknown>(params: T.MlDeleteCalendarJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteCalendarJobResponse, TContext>>
    deleteCalendarJob<TContext = unknown>(params: T.MlDeleteCalendarJobRequest, callback: callbackFn<T.MlDeleteCalendarJobResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TContext = unknown>(params: T.MlDeleteCalendarJobRequest, options: TransportRequestOptions, callback: callbackFn<T.MlDeleteCalendarJobResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TContext = unknown>(params: T.MlDeleteDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteDataFrameAnalyticsResponse, TContext>>
    deleteDataFrameAnalytics<TContext = unknown>(params: T.MlDeleteDataFrameAnalyticsRequest, callback: callbackFn<T.MlDeleteDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TContext = unknown>(params: T.MlDeleteDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlDeleteDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TContext = unknown>(params: T.MlDeleteDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteDatafeedResponse, TContext>>
    deleteDatafeed<TContext = unknown>(params: T.MlDeleteDatafeedRequest, callback: callbackFn<T.MlDeleteDatafeedResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TContext = unknown>(params: T.MlDeleteDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<T.MlDeleteDatafeedResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TContext = unknown>(params?: T.MlDeleteExpiredDataRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteExpiredDataResponse, TContext>>
    deleteExpiredData<TContext = unknown>(callback: callbackFn<T.MlDeleteExpiredDataResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TContext = unknown>(params: T.MlDeleteExpiredDataRequest, callback: callbackFn<T.MlDeleteExpiredDataResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TContext = unknown>(params: T.MlDeleteExpiredDataRequest, options: TransportRequestOptions, callback: callbackFn<T.MlDeleteExpiredDataResponse, TContext>): TransportRequestCallback
    deleteFilter<TContext = unknown>(params: T.MlDeleteFilterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteFilterResponse, TContext>>
    deleteFilter<TContext = unknown>(params: T.MlDeleteFilterRequest, callback: callbackFn<T.MlDeleteFilterResponse, TContext>): TransportRequestCallback
    deleteFilter<TContext = unknown>(params: T.MlDeleteFilterRequest, options: TransportRequestOptions, callback: callbackFn<T.MlDeleteFilterResponse, TContext>): TransportRequestCallback
    deleteForecast<TContext = unknown>(params: T.MlDeleteForecastRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteForecastResponse, TContext>>
    deleteForecast<TContext = unknown>(params: T.MlDeleteForecastRequest, callback: callbackFn<T.MlDeleteForecastResponse, TContext>): TransportRequestCallback
    deleteForecast<TContext = unknown>(params: T.MlDeleteForecastRequest, options: TransportRequestOptions, callback: callbackFn<T.MlDeleteForecastResponse, TContext>): TransportRequestCallback
    deleteJob<TContext = unknown>(params: T.MlDeleteJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteJobResponse, TContext>>
    deleteJob<TContext = unknown>(params: T.MlDeleteJobRequest, callback: callbackFn<T.MlDeleteJobResponse, TContext>): TransportRequestCallback
    deleteJob<TContext = unknown>(params: T.MlDeleteJobRequest, options: TransportRequestOptions, callback: callbackFn<T.MlDeleteJobResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TContext = unknown>(params: T.MlDeleteModelSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteModelSnapshotResponse, TContext>>
    deleteModelSnapshot<TContext = unknown>(params: T.MlDeleteModelSnapshotRequest, callback: callbackFn<T.MlDeleteModelSnapshotResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TContext = unknown>(params: T.MlDeleteModelSnapshotRequest, options: TransportRequestOptions, callback: callbackFn<T.MlDeleteModelSnapshotResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TContext = unknown>(params: T.MlDeleteTrainedModelRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteTrainedModelResponse, TContext>>
    deleteTrainedModel<TContext = unknown>(params: T.MlDeleteTrainedModelRequest, callback: callbackFn<T.MlDeleteTrainedModelResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TContext = unknown>(params: T.MlDeleteTrainedModelRequest, options: TransportRequestOptions, callback: callbackFn<T.MlDeleteTrainedModelResponse, TContext>): TransportRequestCallback
    deleteTrainedModelAlias<TContext = unknown>(params: T.MlDeleteTrainedModelAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlDeleteTrainedModelAliasResponse, TContext>>
    deleteTrainedModelAlias<TContext = unknown>(params: T.MlDeleteTrainedModelAliasRequest, callback: callbackFn<T.MlDeleteTrainedModelAliasResponse, TContext>): TransportRequestCallback
    deleteTrainedModelAlias<TContext = unknown>(params: T.MlDeleteTrainedModelAliasRequest, options: TransportRequestOptions, callback: callbackFn<T.MlDeleteTrainedModelAliasResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TContext = unknown>(params?: T.MlEstimateModelMemoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlEstimateModelMemoryResponse, TContext>>
    estimateModelMemory<TContext = unknown>(callback: callbackFn<T.MlEstimateModelMemoryResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TContext = unknown>(params: T.MlEstimateModelMemoryRequest, callback: callbackFn<T.MlEstimateModelMemoryResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TContext = unknown>(params: T.MlEstimateModelMemoryRequest, options: TransportRequestOptions, callback: callbackFn<T.MlEstimateModelMemoryResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TContext = unknown>(params?: T.MlEvaluateDataFrameRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlEvaluateDataFrameResponse, TContext>>
    evaluateDataFrame<TContext = unknown>(callback: callbackFn<T.MlEvaluateDataFrameResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TContext = unknown>(params: T.MlEvaluateDataFrameRequest, callback: callbackFn<T.MlEvaluateDataFrameResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TContext = unknown>(params: T.MlEvaluateDataFrameRequest, options: TransportRequestOptions, callback: callbackFn<T.MlEvaluateDataFrameResponse, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TContext = unknown>(params?: T.MlExplainDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlExplainDataFrameAnalyticsResponse, TContext>>
    explainDataFrameAnalytics<TContext = unknown>(callback: callbackFn<T.MlExplainDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TContext = unknown>(params: T.MlExplainDataFrameAnalyticsRequest, callback: callbackFn<T.MlExplainDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TContext = unknown>(params: T.MlExplainDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlExplainDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    findFileStructure<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    findFileStructure<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    findFileStructure<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    findFileStructure<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    flushJob<TContext = unknown>(params: T.MlFlushJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlFlushJobResponse, TContext>>
    flushJob<TContext = unknown>(params: T.MlFlushJobRequest, callback: callbackFn<T.MlFlushJobResponse, TContext>): TransportRequestCallback
    flushJob<TContext = unknown>(params: T.MlFlushJobRequest, options: TransportRequestOptions, callback: callbackFn<T.MlFlushJobResponse, TContext>): TransportRequestCallback
    forecast<TContext = unknown>(params: T.MlForecastRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlForecastResponse, TContext>>
    forecast<TContext = unknown>(params: T.MlForecastRequest, callback: callbackFn<T.MlForecastResponse, TContext>): TransportRequestCallback
    forecast<TContext = unknown>(params: T.MlForecastRequest, options: TransportRequestOptions, callback: callbackFn<T.MlForecastResponse, TContext>): TransportRequestCallback
    getBuckets<TContext = unknown>(params: T.MlGetBucketsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetBucketsResponse, TContext>>
    getBuckets<TContext = unknown>(params: T.MlGetBucketsRequest, callback: callbackFn<T.MlGetBucketsResponse, TContext>): TransportRequestCallback
    getBuckets<TContext = unknown>(params: T.MlGetBucketsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetBucketsResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TContext = unknown>(params: T.MlGetCalendarEventsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetCalendarEventsResponse, TContext>>
    getCalendarEvents<TContext = unknown>(params: T.MlGetCalendarEventsRequest, callback: callbackFn<T.MlGetCalendarEventsResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TContext = unknown>(params: T.MlGetCalendarEventsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetCalendarEventsResponse, TContext>): TransportRequestCallback
    getCalendars<TContext = unknown>(params?: T.MlGetCalendarsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetCalendarsResponse, TContext>>
    getCalendars<TContext = unknown>(callback: callbackFn<T.MlGetCalendarsResponse, TContext>): TransportRequestCallback
    getCalendars<TContext = unknown>(params: T.MlGetCalendarsRequest, callback: callbackFn<T.MlGetCalendarsResponse, TContext>): TransportRequestCallback
    getCalendars<TContext = unknown>(params: T.MlGetCalendarsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetCalendarsResponse, TContext>): TransportRequestCallback
    getCategories<TContext = unknown>(params: T.MlGetCategoriesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetCategoriesResponse, TContext>>
    getCategories<TContext = unknown>(params: T.MlGetCategoriesRequest, callback: callbackFn<T.MlGetCategoriesResponse, TContext>): TransportRequestCallback
    getCategories<TContext = unknown>(params: T.MlGetCategoriesRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetCategoriesResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TContext = unknown>(params?: T.MlGetDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetDataFrameAnalyticsResponse, TContext>>
    getDataFrameAnalytics<TContext = unknown>(callback: callbackFn<T.MlGetDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TContext = unknown>(params: T.MlGetDataFrameAnalyticsRequest, callback: callbackFn<T.MlGetDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TContext = unknown>(params: T.MlGetDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TContext = unknown>(params?: T.MlGetDataFrameAnalyticsStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetDataFrameAnalyticsStatsResponse, TContext>>
    getDataFrameAnalyticsStats<TContext = unknown>(callback: callbackFn<T.MlGetDataFrameAnalyticsStatsResponse, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TContext = unknown>(params: T.MlGetDataFrameAnalyticsStatsRequest, callback: callbackFn<T.MlGetDataFrameAnalyticsStatsResponse, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TContext = unknown>(params: T.MlGetDataFrameAnalyticsStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetDataFrameAnalyticsStatsResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TContext = unknown>(params?: T.MlGetDatafeedStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetDatafeedStatsResponse, TContext>>
    getDatafeedStats<TContext = unknown>(callback: callbackFn<T.MlGetDatafeedStatsResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TContext = unknown>(params: T.MlGetDatafeedStatsRequest, callback: callbackFn<T.MlGetDatafeedStatsResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TContext = unknown>(params: T.MlGetDatafeedStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetDatafeedStatsResponse, TContext>): TransportRequestCallback
    getDatafeeds<TContext = unknown>(params?: T.MlGetDatafeedsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetDatafeedsResponse, TContext>>
    getDatafeeds<TContext = unknown>(callback: callbackFn<T.MlGetDatafeedsResponse, TContext>): TransportRequestCallback
    getDatafeeds<TContext = unknown>(params: T.MlGetDatafeedsRequest, callback: callbackFn<T.MlGetDatafeedsResponse, TContext>): TransportRequestCallback
    getDatafeeds<TContext = unknown>(params: T.MlGetDatafeedsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetDatafeedsResponse, TContext>): TransportRequestCallback
    getFilters<TContext = unknown>(params?: T.MlGetFiltersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetFiltersResponse, TContext>>
    getFilters<TContext = unknown>(callback: callbackFn<T.MlGetFiltersResponse, TContext>): TransportRequestCallback
    getFilters<TContext = unknown>(params: T.MlGetFiltersRequest, callback: callbackFn<T.MlGetFiltersResponse, TContext>): TransportRequestCallback
    getFilters<TContext = unknown>(params: T.MlGetFiltersRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetFiltersResponse, TContext>): TransportRequestCallback
    getInfluencers<TContext = unknown>(params: T.MlGetInfluencersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetInfluencersResponse, TContext>>
    getInfluencers<TContext = unknown>(params: T.MlGetInfluencersRequest, callback: callbackFn<T.MlGetInfluencersResponse, TContext>): TransportRequestCallback
    getInfluencers<TContext = unknown>(params: T.MlGetInfluencersRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetInfluencersResponse, TContext>): TransportRequestCallback
    getJobStats<TContext = unknown>(params?: T.MlGetJobStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetJobStatsResponse, TContext>>
    getJobStats<TContext = unknown>(callback: callbackFn<T.MlGetJobStatsResponse, TContext>): TransportRequestCallback
    getJobStats<TContext = unknown>(params: T.MlGetJobStatsRequest, callback: callbackFn<T.MlGetJobStatsResponse, TContext>): TransportRequestCallback
    getJobStats<TContext = unknown>(params: T.MlGetJobStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetJobStatsResponse, TContext>): TransportRequestCallback
    getJobs<TContext = unknown>(params?: T.MlGetJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetJobsResponse, TContext>>
    getJobs<TContext = unknown>(callback: callbackFn<T.MlGetJobsResponse, TContext>): TransportRequestCallback
    getJobs<TContext = unknown>(params: T.MlGetJobsRequest, callback: callbackFn<T.MlGetJobsResponse, TContext>): TransportRequestCallback
    getJobs<TContext = unknown>(params: T.MlGetJobsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetJobsResponse, TContext>): TransportRequestCallback
    getModelSnapshotUpgradeStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getModelSnapshotUpgradeStats<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getModelSnapshotUpgradeStats<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getModelSnapshotUpgradeStats<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getModelSnapshots<TContext = unknown>(params: T.MlGetModelSnapshotsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetModelSnapshotsResponse, TContext>>
    getModelSnapshots<TContext = unknown>(params: T.MlGetModelSnapshotsRequest, callback: callbackFn<T.MlGetModelSnapshotsResponse, TContext>): TransportRequestCallback
    getModelSnapshots<TContext = unknown>(params: T.MlGetModelSnapshotsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetModelSnapshotsResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TContext = unknown>(params: T.MlGetOverallBucketsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetOverallBucketsResponse, TContext>>
    getOverallBuckets<TContext = unknown>(params: T.MlGetOverallBucketsRequest, callback: callbackFn<T.MlGetOverallBucketsResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TContext = unknown>(params: T.MlGetOverallBucketsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetOverallBucketsResponse, TContext>): TransportRequestCallback
    getRecords<TContext = unknown>(params: T.MlGetRecordsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetRecordsResponse, TContext>>
    getRecords<TContext = unknown>(params: T.MlGetRecordsRequest, callback: callbackFn<T.MlGetRecordsResponse, TContext>): TransportRequestCallback
    getRecords<TContext = unknown>(params: T.MlGetRecordsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetRecordsResponse, TContext>): TransportRequestCallback
    getTrainedModels<TContext = unknown>(params?: T.MlGetTrainedModelsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetTrainedModelsResponse, TContext>>
    getTrainedModels<TContext = unknown>(callback: callbackFn<T.MlGetTrainedModelsResponse, TContext>): TransportRequestCallback
    getTrainedModels<TContext = unknown>(params: T.MlGetTrainedModelsRequest, callback: callbackFn<T.MlGetTrainedModelsResponse, TContext>): TransportRequestCallback
    getTrainedModels<TContext = unknown>(params: T.MlGetTrainedModelsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetTrainedModelsResponse, TContext>): TransportRequestCallback
    getTrainedModelsStats<TContext = unknown>(params?: T.MlGetTrainedModelsStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlGetTrainedModelsStatsResponse, TContext>>
    getTrainedModelsStats<TContext = unknown>(callback: callbackFn<T.MlGetTrainedModelsStatsResponse, TContext>): TransportRequestCallback
    getTrainedModelsStats<TContext = unknown>(params: T.MlGetTrainedModelsStatsRequest, callback: callbackFn<T.MlGetTrainedModelsStatsResponse, TContext>): TransportRequestCallback
    getTrainedModelsStats<TContext = unknown>(params: T.MlGetTrainedModelsStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlGetTrainedModelsStatsResponse, TContext>): TransportRequestCallback
    info<TContext = unknown>(params?: T.MlInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlInfoResponse, TContext>>
    info<TContext = unknown>(callback: callbackFn<T.MlInfoResponse, TContext>): TransportRequestCallback
    info<TContext = unknown>(params: T.MlInfoRequest, callback: callbackFn<T.MlInfoResponse, TContext>): TransportRequestCallback
    info<TContext = unknown>(params: T.MlInfoRequest, options: TransportRequestOptions, callback: callbackFn<T.MlInfoResponse, TContext>): TransportRequestCallback
    openJob<TContext = unknown>(params: T.MlOpenJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlOpenJobResponse, TContext>>
    openJob<TContext = unknown>(params: T.MlOpenJobRequest, callback: callbackFn<T.MlOpenJobResponse, TContext>): TransportRequestCallback
    openJob<TContext = unknown>(params: T.MlOpenJobRequest, options: TransportRequestOptions, callback: callbackFn<T.MlOpenJobResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TContext = unknown>(params: T.MlPostCalendarEventsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPostCalendarEventsResponse, TContext>>
    postCalendarEvents<TContext = unknown>(params: T.MlPostCalendarEventsRequest, callback: callbackFn<T.MlPostCalendarEventsResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TContext = unknown>(params: T.MlPostCalendarEventsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlPostCalendarEventsResponse, TContext>): TransportRequestCallback
    postData<TData = unknown, TContext = unknown>(params: T.MlPostDataRequest<TData>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPostDataResponse, TContext>>
    postData<TData = unknown, TContext = unknown>(params: T.MlPostDataRequest<TData>, callback: callbackFn<T.MlPostDataResponse, TContext>): TransportRequestCallback
    postData<TData = unknown, TContext = unknown>(params: T.MlPostDataRequest<TData>, options: TransportRequestOptions, callback: callbackFn<T.MlPostDataResponse, TContext>): TransportRequestCallback
    previewDataFrameAnalytics<TContext = unknown>(params?: T.MlPreviewDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPreviewDataFrameAnalyticsResponse, TContext>>
    previewDataFrameAnalytics<TContext = unknown>(callback: callbackFn<T.MlPreviewDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    previewDataFrameAnalytics<TContext = unknown>(params: T.MlPreviewDataFrameAnalyticsRequest, callback: callbackFn<T.MlPreviewDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    previewDataFrameAnalytics<TContext = unknown>(params: T.MlPreviewDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlPreviewDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    previewDatafeed<TDocument = unknown, TContext = unknown>(params?: T.MlPreviewDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPreviewDatafeedResponse<TDocument>, TContext>>
    previewDatafeed<TDocument = unknown, TContext = unknown>(callback: callbackFn<T.MlPreviewDatafeedResponse<TDocument>, TContext>): TransportRequestCallback
    previewDatafeed<TDocument = unknown, TContext = unknown>(params: T.MlPreviewDatafeedRequest, callback: callbackFn<T.MlPreviewDatafeedResponse<TDocument>, TContext>): TransportRequestCallback
    previewDatafeed<TDocument = unknown, TContext = unknown>(params: T.MlPreviewDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<T.MlPreviewDatafeedResponse<TDocument>, TContext>): TransportRequestCallback
    putCalendar<TContext = unknown>(params: T.MlPutCalendarRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutCalendarResponse, TContext>>
    putCalendar<TContext = unknown>(params: T.MlPutCalendarRequest, callback: callbackFn<T.MlPutCalendarResponse, TContext>): TransportRequestCallback
    putCalendar<TContext = unknown>(params: T.MlPutCalendarRequest, options: TransportRequestOptions, callback: callbackFn<T.MlPutCalendarResponse, TContext>): TransportRequestCallback
    putCalendarJob<TContext = unknown>(params: T.MlPutCalendarJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutCalendarJobResponse, TContext>>
    putCalendarJob<TContext = unknown>(params: T.MlPutCalendarJobRequest, callback: callbackFn<T.MlPutCalendarJobResponse, TContext>): TransportRequestCallback
    putCalendarJob<TContext = unknown>(params: T.MlPutCalendarJobRequest, options: TransportRequestOptions, callback: callbackFn<T.MlPutCalendarJobResponse, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TContext = unknown>(params: T.MlPutDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutDataFrameAnalyticsResponse, TContext>>
    putDataFrameAnalytics<TContext = unknown>(params: T.MlPutDataFrameAnalyticsRequest, callback: callbackFn<T.MlPutDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TContext = unknown>(params: T.MlPutDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlPutDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    putDatafeed<TContext = unknown>(params: T.MlPutDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutDatafeedResponse, TContext>>
    putDatafeed<TContext = unknown>(params: T.MlPutDatafeedRequest, callback: callbackFn<T.MlPutDatafeedResponse, TContext>): TransportRequestCallback
    putDatafeed<TContext = unknown>(params: T.MlPutDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<T.MlPutDatafeedResponse, TContext>): TransportRequestCallback
    putFilter<TContext = unknown>(params: T.MlPutFilterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutFilterResponse, TContext>>
    putFilter<TContext = unknown>(params: T.MlPutFilterRequest, callback: callbackFn<T.MlPutFilterResponse, TContext>): TransportRequestCallback
    putFilter<TContext = unknown>(params: T.MlPutFilterRequest, options: TransportRequestOptions, callback: callbackFn<T.MlPutFilterResponse, TContext>): TransportRequestCallback
    putJob<TContext = unknown>(params: T.MlPutJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutJobResponse, TContext>>
    putJob<TContext = unknown>(params: T.MlPutJobRequest, callback: callbackFn<T.MlPutJobResponse, TContext>): TransportRequestCallback
    putJob<TContext = unknown>(params: T.MlPutJobRequest, options: TransportRequestOptions, callback: callbackFn<T.MlPutJobResponse, TContext>): TransportRequestCallback
    putTrainedModel<TContext = unknown>(params: T.MlPutTrainedModelRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutTrainedModelResponse, TContext>>
    putTrainedModel<TContext = unknown>(params: T.MlPutTrainedModelRequest, callback: callbackFn<T.MlPutTrainedModelResponse, TContext>): TransportRequestCallback
    putTrainedModel<TContext = unknown>(params: T.MlPutTrainedModelRequest, options: TransportRequestOptions, callback: callbackFn<T.MlPutTrainedModelResponse, TContext>): TransportRequestCallback
    putTrainedModelAlias<TContext = unknown>(params: T.MlPutTrainedModelAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlPutTrainedModelAliasResponse, TContext>>
    putTrainedModelAlias<TContext = unknown>(params: T.MlPutTrainedModelAliasRequest, callback: callbackFn<T.MlPutTrainedModelAliasResponse, TContext>): TransportRequestCallback
    putTrainedModelAlias<TContext = unknown>(params: T.MlPutTrainedModelAliasRequest, options: TransportRequestOptions, callback: callbackFn<T.MlPutTrainedModelAliasResponse, TContext>): TransportRequestCallback
    resetJob<TContext = unknown>(params: T.MlResetJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlResetJobResponse, TContext>>
    resetJob<TContext = unknown>(params: T.MlResetJobRequest, callback: callbackFn<T.MlResetJobResponse, TContext>): TransportRequestCallback
    resetJob<TContext = unknown>(params: T.MlResetJobRequest, options: TransportRequestOptions, callback: callbackFn<T.MlResetJobResponse, TContext>): TransportRequestCallback
    revertModelSnapshot<TContext = unknown>(params: T.MlRevertModelSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlRevertModelSnapshotResponse, TContext>>
    revertModelSnapshot<TContext = unknown>(params: T.MlRevertModelSnapshotRequest, callback: callbackFn<T.MlRevertModelSnapshotResponse, TContext>): TransportRequestCallback
    revertModelSnapshot<TContext = unknown>(params: T.MlRevertModelSnapshotRequest, options: TransportRequestOptions, callback: callbackFn<T.MlRevertModelSnapshotResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TContext = unknown>(params?: T.MlSetUpgradeModeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlSetUpgradeModeResponse, TContext>>
    setUpgradeMode<TContext = unknown>(callback: callbackFn<T.MlSetUpgradeModeResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TContext = unknown>(params: T.MlSetUpgradeModeRequest, callback: callbackFn<T.MlSetUpgradeModeResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TContext = unknown>(params: T.MlSetUpgradeModeRequest, options: TransportRequestOptions, callback: callbackFn<T.MlSetUpgradeModeResponse, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TContext = unknown>(params: T.MlStartDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlStartDataFrameAnalyticsResponse, TContext>>
    startDataFrameAnalytics<TContext = unknown>(params: T.MlStartDataFrameAnalyticsRequest, callback: callbackFn<T.MlStartDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TContext = unknown>(params: T.MlStartDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlStartDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    startDatafeed<TContext = unknown>(params: T.MlStartDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlStartDatafeedResponse, TContext>>
    startDatafeed<TContext = unknown>(params: T.MlStartDatafeedRequest, callback: callbackFn<T.MlStartDatafeedResponse, TContext>): TransportRequestCallback
    startDatafeed<TContext = unknown>(params: T.MlStartDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<T.MlStartDatafeedResponse, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TContext = unknown>(params: T.MlStopDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlStopDataFrameAnalyticsResponse, TContext>>
    stopDataFrameAnalytics<TContext = unknown>(params: T.MlStopDataFrameAnalyticsRequest, callback: callbackFn<T.MlStopDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TContext = unknown>(params: T.MlStopDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlStopDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    stopDatafeed<TContext = unknown>(params: T.MlStopDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlStopDatafeedResponse, TContext>>
    stopDatafeed<TContext = unknown>(params: T.MlStopDatafeedRequest, callback: callbackFn<T.MlStopDatafeedResponse, TContext>): TransportRequestCallback
    stopDatafeed<TContext = unknown>(params: T.MlStopDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<T.MlStopDatafeedResponse, TContext>): TransportRequestCallback
    updateDataFrameAnalytics<TContext = unknown>(params: T.MlUpdateDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlUpdateDataFrameAnalyticsResponse, TContext>>
    updateDataFrameAnalytics<TContext = unknown>(params: T.MlUpdateDataFrameAnalyticsRequest, callback: callbackFn<T.MlUpdateDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    updateDataFrameAnalytics<TContext = unknown>(params: T.MlUpdateDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<T.MlUpdateDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    updateDatafeed<TContext = unknown>(params: T.MlUpdateDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlUpdateDatafeedResponse, TContext>>
    updateDatafeed<TContext = unknown>(params: T.MlUpdateDatafeedRequest, callback: callbackFn<T.MlUpdateDatafeedResponse, TContext>): TransportRequestCallback
    updateDatafeed<TContext = unknown>(params: T.MlUpdateDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<T.MlUpdateDatafeedResponse, TContext>): TransportRequestCallback
    updateFilter<TContext = unknown>(params: T.MlUpdateFilterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlUpdateFilterResponse, TContext>>
    updateFilter<TContext = unknown>(params: T.MlUpdateFilterRequest, callback: callbackFn<T.MlUpdateFilterResponse, TContext>): TransportRequestCallback
    updateFilter<TContext = unknown>(params: T.MlUpdateFilterRequest, options: TransportRequestOptions, callback: callbackFn<T.MlUpdateFilterResponse, TContext>): TransportRequestCallback
    updateJob<TContext = unknown>(params: T.MlUpdateJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlUpdateJobResponse, TContext>>
    updateJob<TContext = unknown>(params: T.MlUpdateJobRequest, callback: callbackFn<T.MlUpdateJobResponse, TContext>): TransportRequestCallback
    updateJob<TContext = unknown>(params: T.MlUpdateJobRequest, options: TransportRequestOptions, callback: callbackFn<T.MlUpdateJobResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TContext = unknown>(params: T.MlUpdateModelSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlUpdateModelSnapshotResponse, TContext>>
    updateModelSnapshot<TContext = unknown>(params: T.MlUpdateModelSnapshotRequest, callback: callbackFn<T.MlUpdateModelSnapshotResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TContext = unknown>(params: T.MlUpdateModelSnapshotRequest, options: TransportRequestOptions, callback: callbackFn<T.MlUpdateModelSnapshotResponse, TContext>): TransportRequestCallback
    upgradeJobSnapshot<TContext = unknown>(params: T.MlUpgradeJobSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlUpgradeJobSnapshotResponse, TContext>>
    upgradeJobSnapshot<TContext = unknown>(params: T.MlUpgradeJobSnapshotRequest, callback: callbackFn<T.MlUpgradeJobSnapshotResponse, TContext>): TransportRequestCallback
    upgradeJobSnapshot<TContext = unknown>(params: T.MlUpgradeJobSnapshotRequest, options: TransportRequestOptions, callback: callbackFn<T.MlUpgradeJobSnapshotResponse, TContext>): TransportRequestCallback
    validate<TContext = unknown>(params?: T.MlValidateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlValidateResponse, TContext>>
    validate<TContext = unknown>(callback: callbackFn<T.MlValidateResponse, TContext>): TransportRequestCallback
    validate<TContext = unknown>(params: T.MlValidateRequest, callback: callbackFn<T.MlValidateResponse, TContext>): TransportRequestCallback
    validate<TContext = unknown>(params: T.MlValidateRequest, options: TransportRequestOptions, callback: callbackFn<T.MlValidateResponse, TContext>): TransportRequestCallback
    validateDetector<TContext = unknown>(params?: T.MlValidateDetectorRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MlValidateDetectorResponse, TContext>>
    validateDetector<TContext = unknown>(callback: callbackFn<T.MlValidateDetectorResponse, TContext>): TransportRequestCallback
    validateDetector<TContext = unknown>(params: T.MlValidateDetectorRequest, callback: callbackFn<T.MlValidateDetectorResponse, TContext>): TransportRequestCallback
    validateDetector<TContext = unknown>(params: T.MlValidateDetectorRequest, options: TransportRequestOptions, callback: callbackFn<T.MlValidateDetectorResponse, TContext>): TransportRequestCallback
  }
  monitoring: {
    bulk<TDocument = unknown, TPartialDocument = unknown, TContext = unknown>(params: T.MonitoringBulkRequest<TDocument, TPartialDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MonitoringBulkResponse, TContext>>
    bulk<TDocument = unknown, TPartialDocument = unknown, TContext = unknown>(params: T.MonitoringBulkRequest<TDocument, TPartialDocument>, callback: callbackFn<T.MonitoringBulkResponse, TContext>): TransportRequestCallback
    bulk<TDocument = unknown, TPartialDocument = unknown, TContext = unknown>(params: T.MonitoringBulkRequest<TDocument, TPartialDocument>, options: TransportRequestOptions, callback: callbackFn<T.MonitoringBulkResponse, TContext>): TransportRequestCallback
  }
  msearch<TDocument = unknown, TContext = unknown>(params?: T.MsearchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MsearchResponse<TDocument>, TContext>>
  msearch<TDocument = unknown, TContext = unknown>(callback: callbackFn<T.MsearchResponse<TDocument>, TContext>): TransportRequestCallback
  msearch<TDocument = unknown, TContext = unknown>(params: T.MsearchRequest, callback: callbackFn<T.MsearchResponse<TDocument>, TContext>): TransportRequestCallback
  msearch<TDocument = unknown, TContext = unknown>(params: T.MsearchRequest, options: TransportRequestOptions, callback: callbackFn<T.MsearchResponse<TDocument>, TContext>): TransportRequestCallback
  msearchTemplate<TDocument = unknown, TContext = unknown>(params?: T.MsearchTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MsearchTemplateResponse<TDocument>, TContext>>
  msearchTemplate<TDocument = unknown, TContext = unknown>(callback: callbackFn<T.MsearchTemplateResponse<TDocument>, TContext>): TransportRequestCallback
  msearchTemplate<TDocument = unknown, TContext = unknown>(params: T.MsearchTemplateRequest, callback: callbackFn<T.MsearchTemplateResponse<TDocument>, TContext>): TransportRequestCallback
  msearchTemplate<TDocument = unknown, TContext = unknown>(params: T.MsearchTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.MsearchTemplateResponse<TDocument>, TContext>): TransportRequestCallback
  mtermvectors<TContext = unknown>(params?: T.MtermvectorsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MtermvectorsResponse, TContext>>
  mtermvectors<TContext = unknown>(callback: callbackFn<T.MtermvectorsResponse, TContext>): TransportRequestCallback
  mtermvectors<TContext = unknown>(params: T.MtermvectorsRequest, callback: callbackFn<T.MtermvectorsResponse, TContext>): TransportRequestCallback
  mtermvectors<TContext = unknown>(params: T.MtermvectorsRequest, options: TransportRequestOptions, callback: callbackFn<T.MtermvectorsResponse, TContext>): TransportRequestCallback
  nodes: {
    clearRepositoriesMeteringArchive<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    clearRepositoriesMeteringArchive<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    clearRepositoriesMeteringArchive<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    clearRepositoriesMeteringArchive<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getRepositoriesMeteringInfo<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getRepositoriesMeteringInfo<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getRepositoriesMeteringInfo<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getRepositoriesMeteringInfo<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    hotThreads<TContext = unknown>(params?: T.NodesHotThreadsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesHotThreadsResponse, TContext>>
    hotThreads<TContext = unknown>(callback: callbackFn<T.NodesHotThreadsResponse, TContext>): TransportRequestCallback
    hotThreads<TContext = unknown>(params: T.NodesHotThreadsRequest, callback: callbackFn<T.NodesHotThreadsResponse, TContext>): TransportRequestCallback
    hotThreads<TContext = unknown>(params: T.NodesHotThreadsRequest, options: TransportRequestOptions, callback: callbackFn<T.NodesHotThreadsResponse, TContext>): TransportRequestCallback
    info<TContext = unknown>(params?: T.NodesInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesInfoResponse, TContext>>
    info<TContext = unknown>(callback: callbackFn<T.NodesInfoResponse, TContext>): TransportRequestCallback
    info<TContext = unknown>(params: T.NodesInfoRequest, callback: callbackFn<T.NodesInfoResponse, TContext>): TransportRequestCallback
    info<TContext = unknown>(params: T.NodesInfoRequest, options: TransportRequestOptions, callback: callbackFn<T.NodesInfoResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TContext = unknown>(params?: T.NodesReloadSecureSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesReloadSecureSettingsResponse, TContext>>
    reloadSecureSettings<TContext = unknown>(callback: callbackFn<T.NodesReloadSecureSettingsResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TContext = unknown>(params: T.NodesReloadSecureSettingsRequest, callback: callbackFn<T.NodesReloadSecureSettingsResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TContext = unknown>(params: T.NodesReloadSecureSettingsRequest, options: TransportRequestOptions, callback: callbackFn<T.NodesReloadSecureSettingsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params?: T.NodesStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesStatsResponse, TContext>>
    stats<TContext = unknown>(callback: callbackFn<T.NodesStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.NodesStatsRequest, callback: callbackFn<T.NodesStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.NodesStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.NodesStatsResponse, TContext>): TransportRequestCallback
    usage<TContext = unknown>(params?: T.NodesUsageRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesUsageResponse, TContext>>
    usage<TContext = unknown>(callback: callbackFn<T.NodesUsageResponse, TContext>): TransportRequestCallback
    usage<TContext = unknown>(params: T.NodesUsageRequest, callback: callbackFn<T.NodesUsageResponse, TContext>): TransportRequestCallback
    usage<TContext = unknown>(params: T.NodesUsageRequest, options: TransportRequestOptions, callback: callbackFn<T.NodesUsageResponse, TContext>): TransportRequestCallback
  }
  openPointInTime<TContext = unknown>(params: T.OpenPointInTimeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.OpenPointInTimeResponse, TContext>>
  openPointInTime<TContext = unknown>(params: T.OpenPointInTimeRequest, callback: callbackFn<T.OpenPointInTimeResponse, TContext>): TransportRequestCallback
  openPointInTime<TContext = unknown>(params: T.OpenPointInTimeRequest, options: TransportRequestOptions, callback: callbackFn<T.OpenPointInTimeResponse, TContext>): TransportRequestCallback
  ping<TContext = unknown>(params?: T.PingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PingResponse, TContext>>
  ping<TContext = unknown>(callback: callbackFn<T.PingResponse, TContext>): TransportRequestCallback
  ping<TContext = unknown>(params: T.PingRequest, callback: callbackFn<T.PingResponse, TContext>): TransportRequestCallback
  ping<TContext = unknown>(params: T.PingRequest, options: TransportRequestOptions, callback: callbackFn<T.PingResponse, TContext>): TransportRequestCallback
  putScript<TContext = unknown>(params: T.PutScriptRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutScriptResponse, TContext>>
  putScript<TContext = unknown>(params: T.PutScriptRequest, callback: callbackFn<T.PutScriptResponse, TContext>): TransportRequestCallback
  putScript<TContext = unknown>(params: T.PutScriptRequest, options: TransportRequestOptions, callback: callbackFn<T.PutScriptResponse, TContext>): TransportRequestCallback
  rankEval<TContext = unknown>(params: T.RankEvalRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RankEvalResponse, TContext>>
  rankEval<TContext = unknown>(params: T.RankEvalRequest, callback: callbackFn<T.RankEvalResponse, TContext>): TransportRequestCallback
  rankEval<TContext = unknown>(params: T.RankEvalRequest, options: TransportRequestOptions, callback: callbackFn<T.RankEvalResponse, TContext>): TransportRequestCallback
  reindex<TContext = unknown>(params?: T.ReindexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ReindexResponse, TContext>>
  reindex<TContext = unknown>(callback: callbackFn<T.ReindexResponse, TContext>): TransportRequestCallback
  reindex<TContext = unknown>(params: T.ReindexRequest, callback: callbackFn<T.ReindexResponse, TContext>): TransportRequestCallback
  reindex<TContext = unknown>(params: T.ReindexRequest, options: TransportRequestOptions, callback: callbackFn<T.ReindexResponse, TContext>): TransportRequestCallback
  reindexRethrottle<TContext = unknown>(params: T.ReindexRethrottleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ReindexRethrottleResponse, TContext>>
  reindexRethrottle<TContext = unknown>(params: T.ReindexRethrottleRequest, callback: callbackFn<T.ReindexRethrottleResponse, TContext>): TransportRequestCallback
  reindexRethrottle<TContext = unknown>(params: T.ReindexRethrottleRequest, options: TransportRequestOptions, callback: callbackFn<T.ReindexRethrottleResponse, TContext>): TransportRequestCallback
  renderSearchTemplate<TContext = unknown>(params?: T.RenderSearchTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RenderSearchTemplateResponse, TContext>>
  renderSearchTemplate<TContext = unknown>(callback: callbackFn<T.RenderSearchTemplateResponse, TContext>): TransportRequestCallback
  renderSearchTemplate<TContext = unknown>(params: T.RenderSearchTemplateRequest, callback: callbackFn<T.RenderSearchTemplateResponse, TContext>): TransportRequestCallback
  renderSearchTemplate<TContext = unknown>(params: T.RenderSearchTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.RenderSearchTemplateResponse, TContext>): TransportRequestCallback
  rollup: {
    deleteJob<TContext = unknown>(params: T.RollupDeleteJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupDeleteJobResponse, TContext>>
    deleteJob<TContext = unknown>(params: T.RollupDeleteJobRequest, callback: callbackFn<T.RollupDeleteJobResponse, TContext>): TransportRequestCallback
    deleteJob<TContext = unknown>(params: T.RollupDeleteJobRequest, options: TransportRequestOptions, callback: callbackFn<T.RollupDeleteJobResponse, TContext>): TransportRequestCallback
    getJobs<TContext = unknown>(params?: T.RollupGetJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupGetJobsResponse, TContext>>
    getJobs<TContext = unknown>(callback: callbackFn<T.RollupGetJobsResponse, TContext>): TransportRequestCallback
    getJobs<TContext = unknown>(params: T.RollupGetJobsRequest, callback: callbackFn<T.RollupGetJobsResponse, TContext>): TransportRequestCallback
    getJobs<TContext = unknown>(params: T.RollupGetJobsRequest, options: TransportRequestOptions, callback: callbackFn<T.RollupGetJobsResponse, TContext>): TransportRequestCallback
    getRollupCaps<TContext = unknown>(params?: T.RollupGetRollupCapsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupGetRollupCapsResponse, TContext>>
    getRollupCaps<TContext = unknown>(callback: callbackFn<T.RollupGetRollupCapsResponse, TContext>): TransportRequestCallback
    getRollupCaps<TContext = unknown>(params: T.RollupGetRollupCapsRequest, callback: callbackFn<T.RollupGetRollupCapsResponse, TContext>): TransportRequestCallback
    getRollupCaps<TContext = unknown>(params: T.RollupGetRollupCapsRequest, options: TransportRequestOptions, callback: callbackFn<T.RollupGetRollupCapsResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TContext = unknown>(params: T.RollupGetRollupIndexCapsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupGetRollupIndexCapsResponse, TContext>>
    getRollupIndexCaps<TContext = unknown>(params: T.RollupGetRollupIndexCapsRequest, callback: callbackFn<T.RollupGetRollupIndexCapsResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TContext = unknown>(params: T.RollupGetRollupIndexCapsRequest, options: TransportRequestOptions, callback: callbackFn<T.RollupGetRollupIndexCapsResponse, TContext>): TransportRequestCallback
    putJob<TContext = unknown>(params: T.RollupPutJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupPutJobResponse, TContext>>
    putJob<TContext = unknown>(params: T.RollupPutJobRequest, callback: callbackFn<T.RollupPutJobResponse, TContext>): TransportRequestCallback
    putJob<TContext = unknown>(params: T.RollupPutJobRequest, options: TransportRequestOptions, callback: callbackFn<T.RollupPutJobResponse, TContext>): TransportRequestCallback
    rollup<TContext = unknown>(params: T.RollupRollupRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupRollupResponse, TContext>>
    rollup<TContext = unknown>(params: T.RollupRollupRequest, callback: callbackFn<T.RollupRollupResponse, TContext>): TransportRequestCallback
    rollup<TContext = unknown>(params: T.RollupRollupRequest, options: TransportRequestOptions, callback: callbackFn<T.RollupRollupResponse, TContext>): TransportRequestCallback
    rollupSearch<TDocument = unknown, TContext = unknown>(params: T.RollupRollupSearchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupRollupSearchResponse<TDocument>, TContext>>
    rollupSearch<TDocument = unknown, TContext = unknown>(params: T.RollupRollupSearchRequest, callback: callbackFn<T.RollupRollupSearchResponse<TDocument>, TContext>): TransportRequestCallback
    rollupSearch<TDocument = unknown, TContext = unknown>(params: T.RollupRollupSearchRequest, options: TransportRequestOptions, callback: callbackFn<T.RollupRollupSearchResponse<TDocument>, TContext>): TransportRequestCallback
    startJob<TContext = unknown>(params: T.RollupStartJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupStartJobResponse, TContext>>
    startJob<TContext = unknown>(params: T.RollupStartJobRequest, callback: callbackFn<T.RollupStartJobResponse, TContext>): TransportRequestCallback
    startJob<TContext = unknown>(params: T.RollupStartJobRequest, options: TransportRequestOptions, callback: callbackFn<T.RollupStartJobResponse, TContext>): TransportRequestCallback
    stopJob<TContext = unknown>(params: T.RollupStopJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupStopJobResponse, TContext>>
    stopJob<TContext = unknown>(params: T.RollupStopJobRequest, callback: callbackFn<T.RollupStopJobResponse, TContext>): TransportRequestCallback
    stopJob<TContext = unknown>(params: T.RollupStopJobRequest, options: TransportRequestOptions, callback: callbackFn<T.RollupStopJobResponse, TContext>): TransportRequestCallback
  }
  scriptsPainlessExecute<TResult = unknown, TContext = unknown>(params?: T.ScriptsPainlessExecuteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ScriptsPainlessExecuteResponse<TResult>, TContext>>
  scriptsPainlessExecute<TResult = unknown, TContext = unknown>(callback: callbackFn<T.ScriptsPainlessExecuteResponse<TResult>, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TResult = unknown, TContext = unknown>(params: T.ScriptsPainlessExecuteRequest, callback: callbackFn<T.ScriptsPainlessExecuteResponse<TResult>, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TResult = unknown, TContext = unknown>(params: T.ScriptsPainlessExecuteRequest, options: TransportRequestOptions, callback: callbackFn<T.ScriptsPainlessExecuteResponse<TResult>, TContext>): TransportRequestCallback
  scroll<TDocument = unknown, TContext = unknown>(params?: T.ScrollRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ScrollResponse<TDocument>, TContext>>
  scroll<TDocument = unknown, TContext = unknown>(callback: callbackFn<T.ScrollResponse<TDocument>, TContext>): TransportRequestCallback
  scroll<TDocument = unknown, TContext = unknown>(params: T.ScrollRequest, callback: callbackFn<T.ScrollResponse<TDocument>, TContext>): TransportRequestCallback
  scroll<TDocument = unknown, TContext = unknown>(params: T.ScrollRequest, options: TransportRequestOptions, callback: callbackFn<T.ScrollResponse<TDocument>, TContext>): TransportRequestCallback
  search<TDocument = unknown, TContext = unknown>(params?: T.SearchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchResponse<TDocument>, TContext>>
  search<TDocument = unknown, TContext = unknown>(callback: callbackFn<T.SearchResponse<TDocument>, TContext>): TransportRequestCallback
  search<TDocument = unknown, TContext = unknown>(params: T.SearchRequest, callback: callbackFn<T.SearchResponse<TDocument>, TContext>): TransportRequestCallback
  search<TDocument = unknown, TContext = unknown>(params: T.SearchRequest, options: TransportRequestOptions, callback: callbackFn<T.SearchResponse<TDocument>, TContext>): TransportRequestCallback
  searchMvt<TContext = unknown>(params: T.SearchMvtRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchMvtResponse, TContext>>
  searchMvt<TContext = unknown>(params: T.SearchMvtRequest, callback: callbackFn<T.SearchMvtResponse, TContext>): TransportRequestCallback
  searchMvt<TContext = unknown>(params: T.SearchMvtRequest, options: TransportRequestOptions, callback: callbackFn<T.SearchMvtResponse, TContext>): TransportRequestCallback
  searchShards<TContext = unknown>(params?: T.SearchShardsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchShardsResponse, TContext>>
  searchShards<TContext = unknown>(callback: callbackFn<T.SearchShardsResponse, TContext>): TransportRequestCallback
  searchShards<TContext = unknown>(params: T.SearchShardsRequest, callback: callbackFn<T.SearchShardsResponse, TContext>): TransportRequestCallback
  searchShards<TContext = unknown>(params: T.SearchShardsRequest, options: TransportRequestOptions, callback: callbackFn<T.SearchShardsResponse, TContext>): TransportRequestCallback
  searchTemplate<TDocument = unknown, TContext = unknown>(params?: T.SearchTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchTemplateResponse<TDocument>, TContext>>
  searchTemplate<TDocument = unknown, TContext = unknown>(callback: callbackFn<T.SearchTemplateResponse<TDocument>, TContext>): TransportRequestCallback
  searchTemplate<TDocument = unknown, TContext = unknown>(params: T.SearchTemplateRequest, callback: callbackFn<T.SearchTemplateResponse<TDocument>, TContext>): TransportRequestCallback
  searchTemplate<TDocument = unknown, TContext = unknown>(params: T.SearchTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.SearchTemplateResponse<TDocument>, TContext>): TransportRequestCallback
  searchableSnapshots: {
    cacheStats<TContext = unknown>(params?: T.SearchableSnapshotsCacheStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchableSnapshotsCacheStatsResponse, TContext>>
    cacheStats<TContext = unknown>(callback: callbackFn<T.SearchableSnapshotsCacheStatsResponse, TContext>): TransportRequestCallback
    cacheStats<TContext = unknown>(params: T.SearchableSnapshotsCacheStatsRequest, callback: callbackFn<T.SearchableSnapshotsCacheStatsResponse, TContext>): TransportRequestCallback
    cacheStats<TContext = unknown>(params: T.SearchableSnapshotsCacheStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.SearchableSnapshotsCacheStatsResponse, TContext>): TransportRequestCallback
    clearCache<TContext = unknown>(params?: T.SearchableSnapshotsClearCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchableSnapshotsClearCacheResponse, TContext>>
    clearCache<TContext = unknown>(callback: callbackFn<T.SearchableSnapshotsClearCacheResponse, TContext>): TransportRequestCallback
    clearCache<TContext = unknown>(params: T.SearchableSnapshotsClearCacheRequest, callback: callbackFn<T.SearchableSnapshotsClearCacheResponse, TContext>): TransportRequestCallback
    clearCache<TContext = unknown>(params: T.SearchableSnapshotsClearCacheRequest, options: TransportRequestOptions, callback: callbackFn<T.SearchableSnapshotsClearCacheResponse, TContext>): TransportRequestCallback
    mount<TContext = unknown>(params: T.SearchableSnapshotsMountRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchableSnapshotsMountResponse, TContext>>
    mount<TContext = unknown>(params: T.SearchableSnapshotsMountRequest, callback: callbackFn<T.SearchableSnapshotsMountResponse, TContext>): TransportRequestCallback
    mount<TContext = unknown>(params: T.SearchableSnapshotsMountRequest, options: TransportRequestOptions, callback: callbackFn<T.SearchableSnapshotsMountResponse, TContext>): TransportRequestCallback
    repositoryStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    repositoryStats<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    repositoryStats<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    repositoryStats<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params?: T.SearchableSnapshotsStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchableSnapshotsStatsResponse, TContext>>
    stats<TContext = unknown>(callback: callbackFn<T.SearchableSnapshotsStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.SearchableSnapshotsStatsRequest, callback: callbackFn<T.SearchableSnapshotsStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.SearchableSnapshotsStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.SearchableSnapshotsStatsResponse, TContext>): TransportRequestCallback
  }
  security: {
    authenticate<TContext = unknown>(params?: T.SecurityAuthenticateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityAuthenticateResponse, TContext>>
    authenticate<TContext = unknown>(callback: callbackFn<T.SecurityAuthenticateResponse, TContext>): TransportRequestCallback
    authenticate<TContext = unknown>(params: T.SecurityAuthenticateRequest, callback: callbackFn<T.SecurityAuthenticateResponse, TContext>): TransportRequestCallback
    authenticate<TContext = unknown>(params: T.SecurityAuthenticateRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityAuthenticateResponse, TContext>): TransportRequestCallback
    changePassword<TContext = unknown>(params?: T.SecurityChangePasswordRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityChangePasswordResponse, TContext>>
    changePassword<TContext = unknown>(callback: callbackFn<T.SecurityChangePasswordResponse, TContext>): TransportRequestCallback
    changePassword<TContext = unknown>(params: T.SecurityChangePasswordRequest, callback: callbackFn<T.SecurityChangePasswordResponse, TContext>): TransportRequestCallback
    changePassword<TContext = unknown>(params: T.SecurityChangePasswordRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityChangePasswordResponse, TContext>): TransportRequestCallback
    clearApiKeyCache<TContext = unknown>(params: T.SecurityClearApiKeyCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityClearApiKeyCacheResponse, TContext>>
    clearApiKeyCache<TContext = unknown>(params: T.SecurityClearApiKeyCacheRequest, callback: callbackFn<T.SecurityClearApiKeyCacheResponse, TContext>): TransportRequestCallback
    clearApiKeyCache<TContext = unknown>(params: T.SecurityClearApiKeyCacheRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityClearApiKeyCacheResponse, TContext>): TransportRequestCallback
    clearCachedPrivileges<TContext = unknown>(params: T.SecurityClearCachedPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityClearCachedPrivilegesResponse, TContext>>
    clearCachedPrivileges<TContext = unknown>(params: T.SecurityClearCachedPrivilegesRequest, callback: callbackFn<T.SecurityClearCachedPrivilegesResponse, TContext>): TransportRequestCallback
    clearCachedPrivileges<TContext = unknown>(params: T.SecurityClearCachedPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityClearCachedPrivilegesResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TContext = unknown>(params: T.SecurityClearCachedRealmsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityClearCachedRealmsResponse, TContext>>
    clearCachedRealms<TContext = unknown>(params: T.SecurityClearCachedRealmsRequest, callback: callbackFn<T.SecurityClearCachedRealmsResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TContext = unknown>(params: T.SecurityClearCachedRealmsRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityClearCachedRealmsResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TContext = unknown>(params: T.SecurityClearCachedRolesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityClearCachedRolesResponse, TContext>>
    clearCachedRoles<TContext = unknown>(params: T.SecurityClearCachedRolesRequest, callback: callbackFn<T.SecurityClearCachedRolesResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TContext = unknown>(params: T.SecurityClearCachedRolesRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityClearCachedRolesResponse, TContext>): TransportRequestCallback
    clearCachedServiceTokens<TContext = unknown>(params: T.SecurityClearCachedServiceTokensRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityClearCachedServiceTokensResponse, TContext>>
    clearCachedServiceTokens<TContext = unknown>(params: T.SecurityClearCachedServiceTokensRequest, callback: callbackFn<T.SecurityClearCachedServiceTokensResponse, TContext>): TransportRequestCallback
    clearCachedServiceTokens<TContext = unknown>(params: T.SecurityClearCachedServiceTokensRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityClearCachedServiceTokensResponse, TContext>): TransportRequestCallback
    createApiKey<TContext = unknown>(params?: T.SecurityCreateApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityCreateApiKeyResponse, TContext>>
    createApiKey<TContext = unknown>(callback: callbackFn<T.SecurityCreateApiKeyResponse, TContext>): TransportRequestCallback
    createApiKey<TContext = unknown>(params: T.SecurityCreateApiKeyRequest, callback: callbackFn<T.SecurityCreateApiKeyResponse, TContext>): TransportRequestCallback
    createApiKey<TContext = unknown>(params: T.SecurityCreateApiKeyRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityCreateApiKeyResponse, TContext>): TransportRequestCallback
    createServiceToken<TContext = unknown>(params: T.SecurityCreateServiceTokenRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityCreateServiceTokenResponse, TContext>>
    createServiceToken<TContext = unknown>(params: T.SecurityCreateServiceTokenRequest, callback: callbackFn<T.SecurityCreateServiceTokenResponse, TContext>): TransportRequestCallback
    createServiceToken<TContext = unknown>(params: T.SecurityCreateServiceTokenRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityCreateServiceTokenResponse, TContext>): TransportRequestCallback
    deletePrivileges<TContext = unknown>(params: T.SecurityDeletePrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityDeletePrivilegesResponse, TContext>>
    deletePrivileges<TContext = unknown>(params: T.SecurityDeletePrivilegesRequest, callback: callbackFn<T.SecurityDeletePrivilegesResponse, TContext>): TransportRequestCallback
    deletePrivileges<TContext = unknown>(params: T.SecurityDeletePrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityDeletePrivilegesResponse, TContext>): TransportRequestCallback
    deleteRole<TContext = unknown>(params: T.SecurityDeleteRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityDeleteRoleResponse, TContext>>
    deleteRole<TContext = unknown>(params: T.SecurityDeleteRoleRequest, callback: callbackFn<T.SecurityDeleteRoleResponse, TContext>): TransportRequestCallback
    deleteRole<TContext = unknown>(params: T.SecurityDeleteRoleRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityDeleteRoleResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TContext = unknown>(params: T.SecurityDeleteRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityDeleteRoleMappingResponse, TContext>>
    deleteRoleMapping<TContext = unknown>(params: T.SecurityDeleteRoleMappingRequest, callback: callbackFn<T.SecurityDeleteRoleMappingResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TContext = unknown>(params: T.SecurityDeleteRoleMappingRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityDeleteRoleMappingResponse, TContext>): TransportRequestCallback
    deleteServiceToken<TContext = unknown>(params: T.SecurityDeleteServiceTokenRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityDeleteServiceTokenResponse, TContext>>
    deleteServiceToken<TContext = unknown>(params: T.SecurityDeleteServiceTokenRequest, callback: callbackFn<T.SecurityDeleteServiceTokenResponse, TContext>): TransportRequestCallback
    deleteServiceToken<TContext = unknown>(params: T.SecurityDeleteServiceTokenRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityDeleteServiceTokenResponse, TContext>): TransportRequestCallback
    deleteUser<TContext = unknown>(params: T.SecurityDeleteUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityDeleteUserResponse, TContext>>
    deleteUser<TContext = unknown>(params: T.SecurityDeleteUserRequest, callback: callbackFn<T.SecurityDeleteUserResponse, TContext>): TransportRequestCallback
    deleteUser<TContext = unknown>(params: T.SecurityDeleteUserRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityDeleteUserResponse, TContext>): TransportRequestCallback
    disableUser<TContext = unknown>(params: T.SecurityDisableUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityDisableUserResponse, TContext>>
    disableUser<TContext = unknown>(params: T.SecurityDisableUserRequest, callback: callbackFn<T.SecurityDisableUserResponse, TContext>): TransportRequestCallback
    disableUser<TContext = unknown>(params: T.SecurityDisableUserRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityDisableUserResponse, TContext>): TransportRequestCallback
    enableUser<TContext = unknown>(params: T.SecurityEnableUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityEnableUserResponse, TContext>>
    enableUser<TContext = unknown>(params: T.SecurityEnableUserRequest, callback: callbackFn<T.SecurityEnableUserResponse, TContext>): TransportRequestCallback
    enableUser<TContext = unknown>(params: T.SecurityEnableUserRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityEnableUserResponse, TContext>): TransportRequestCallback
    getApiKey<TContext = unknown>(params?: T.SecurityGetApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetApiKeyResponse, TContext>>
    getApiKey<TContext = unknown>(callback: callbackFn<T.SecurityGetApiKeyResponse, TContext>): TransportRequestCallback
    getApiKey<TContext = unknown>(params: T.SecurityGetApiKeyRequest, callback: callbackFn<T.SecurityGetApiKeyResponse, TContext>): TransportRequestCallback
    getApiKey<TContext = unknown>(params: T.SecurityGetApiKeyRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityGetApiKeyResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TContext = unknown>(params?: T.SecurityGetBuiltinPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetBuiltinPrivilegesResponse, TContext>>
    getBuiltinPrivileges<TContext = unknown>(callback: callbackFn<T.SecurityGetBuiltinPrivilegesResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TContext = unknown>(params: T.SecurityGetBuiltinPrivilegesRequest, callback: callbackFn<T.SecurityGetBuiltinPrivilegesResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TContext = unknown>(params: T.SecurityGetBuiltinPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityGetBuiltinPrivilegesResponse, TContext>): TransportRequestCallback
    getPrivileges<TContext = unknown>(params?: T.SecurityGetPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetPrivilegesResponse, TContext>>
    getPrivileges<TContext = unknown>(callback: callbackFn<T.SecurityGetPrivilegesResponse, TContext>): TransportRequestCallback
    getPrivileges<TContext = unknown>(params: T.SecurityGetPrivilegesRequest, callback: callbackFn<T.SecurityGetPrivilegesResponse, TContext>): TransportRequestCallback
    getPrivileges<TContext = unknown>(params: T.SecurityGetPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityGetPrivilegesResponse, TContext>): TransportRequestCallback
    getRole<TContext = unknown>(params?: T.SecurityGetRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetRoleResponse, TContext>>
    getRole<TContext = unknown>(callback: callbackFn<T.SecurityGetRoleResponse, TContext>): TransportRequestCallback
    getRole<TContext = unknown>(params: T.SecurityGetRoleRequest, callback: callbackFn<T.SecurityGetRoleResponse, TContext>): TransportRequestCallback
    getRole<TContext = unknown>(params: T.SecurityGetRoleRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityGetRoleResponse, TContext>): TransportRequestCallback
    getRoleMapping<TContext = unknown>(params?: T.SecurityGetRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetRoleMappingResponse, TContext>>
    getRoleMapping<TContext = unknown>(callback: callbackFn<T.SecurityGetRoleMappingResponse, TContext>): TransportRequestCallback
    getRoleMapping<TContext = unknown>(params: T.SecurityGetRoleMappingRequest, callback: callbackFn<T.SecurityGetRoleMappingResponse, TContext>): TransportRequestCallback
    getRoleMapping<TContext = unknown>(params: T.SecurityGetRoleMappingRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityGetRoleMappingResponse, TContext>): TransportRequestCallback
    getServiceAccounts<TContext = unknown>(params?: T.SecurityGetServiceAccountsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetServiceAccountsResponse, TContext>>
    getServiceAccounts<TContext = unknown>(callback: callbackFn<T.SecurityGetServiceAccountsResponse, TContext>): TransportRequestCallback
    getServiceAccounts<TContext = unknown>(params: T.SecurityGetServiceAccountsRequest, callback: callbackFn<T.SecurityGetServiceAccountsResponse, TContext>): TransportRequestCallback
    getServiceAccounts<TContext = unknown>(params: T.SecurityGetServiceAccountsRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityGetServiceAccountsResponse, TContext>): TransportRequestCallback
    getServiceCredentials<TContext = unknown>(params: T.SecurityGetServiceCredentialsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetServiceCredentialsResponse, TContext>>
    getServiceCredentials<TContext = unknown>(params: T.SecurityGetServiceCredentialsRequest, callback: callbackFn<T.SecurityGetServiceCredentialsResponse, TContext>): TransportRequestCallback
    getServiceCredentials<TContext = unknown>(params: T.SecurityGetServiceCredentialsRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityGetServiceCredentialsResponse, TContext>): TransportRequestCallback
    getToken<TContext = unknown>(params?: T.SecurityGetTokenRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetTokenResponse, TContext>>
    getToken<TContext = unknown>(callback: callbackFn<T.SecurityGetTokenResponse, TContext>): TransportRequestCallback
    getToken<TContext = unknown>(params: T.SecurityGetTokenRequest, callback: callbackFn<T.SecurityGetTokenResponse, TContext>): TransportRequestCallback
    getToken<TContext = unknown>(params: T.SecurityGetTokenRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityGetTokenResponse, TContext>): TransportRequestCallback
    getUser<TContext = unknown>(params?: T.SecurityGetUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetUserResponse, TContext>>
    getUser<TContext = unknown>(callback: callbackFn<T.SecurityGetUserResponse, TContext>): TransportRequestCallback
    getUser<TContext = unknown>(params: T.SecurityGetUserRequest, callback: callbackFn<T.SecurityGetUserResponse, TContext>): TransportRequestCallback
    getUser<TContext = unknown>(params: T.SecurityGetUserRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityGetUserResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TContext = unknown>(params?: T.SecurityGetUserPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGetUserPrivilegesResponse, TContext>>
    getUserPrivileges<TContext = unknown>(callback: callbackFn<T.SecurityGetUserPrivilegesResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TContext = unknown>(params: T.SecurityGetUserPrivilegesRequest, callback: callbackFn<T.SecurityGetUserPrivilegesResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TContext = unknown>(params: T.SecurityGetUserPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityGetUserPrivilegesResponse, TContext>): TransportRequestCallback
    grantApiKey<TContext = unknown>(params?: T.SecurityGrantApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityGrantApiKeyResponse, TContext>>
    grantApiKey<TContext = unknown>(callback: callbackFn<T.SecurityGrantApiKeyResponse, TContext>): TransportRequestCallback
    grantApiKey<TContext = unknown>(params: T.SecurityGrantApiKeyRequest, callback: callbackFn<T.SecurityGrantApiKeyResponse, TContext>): TransportRequestCallback
    grantApiKey<TContext = unknown>(params: T.SecurityGrantApiKeyRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityGrantApiKeyResponse, TContext>): TransportRequestCallback
    hasPrivileges<TContext = unknown>(params?: T.SecurityHasPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityHasPrivilegesResponse, TContext>>
    hasPrivileges<TContext = unknown>(callback: callbackFn<T.SecurityHasPrivilegesResponse, TContext>): TransportRequestCallback
    hasPrivileges<TContext = unknown>(params: T.SecurityHasPrivilegesRequest, callback: callbackFn<T.SecurityHasPrivilegesResponse, TContext>): TransportRequestCallback
    hasPrivileges<TContext = unknown>(params: T.SecurityHasPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityHasPrivilegesResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TContext = unknown>(params?: T.SecurityInvalidateApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityInvalidateApiKeyResponse, TContext>>
    invalidateApiKey<TContext = unknown>(callback: callbackFn<T.SecurityInvalidateApiKeyResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TContext = unknown>(params: T.SecurityInvalidateApiKeyRequest, callback: callbackFn<T.SecurityInvalidateApiKeyResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TContext = unknown>(params: T.SecurityInvalidateApiKeyRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityInvalidateApiKeyResponse, TContext>): TransportRequestCallback
    invalidateToken<TContext = unknown>(params?: T.SecurityInvalidateTokenRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityInvalidateTokenResponse, TContext>>
    invalidateToken<TContext = unknown>(callback: callbackFn<T.SecurityInvalidateTokenResponse, TContext>): TransportRequestCallback
    invalidateToken<TContext = unknown>(params: T.SecurityInvalidateTokenRequest, callback: callbackFn<T.SecurityInvalidateTokenResponse, TContext>): TransportRequestCallback
    invalidateToken<TContext = unknown>(params: T.SecurityInvalidateTokenRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityInvalidateTokenResponse, TContext>): TransportRequestCallback
    putPrivileges<TContext = unknown>(params?: T.SecurityPutPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityPutPrivilegesResponse, TContext>>
    putPrivileges<TContext = unknown>(callback: callbackFn<T.SecurityPutPrivilegesResponse, TContext>): TransportRequestCallback
    putPrivileges<TContext = unknown>(params: T.SecurityPutPrivilegesRequest, callback: callbackFn<T.SecurityPutPrivilegesResponse, TContext>): TransportRequestCallback
    putPrivileges<TContext = unknown>(params: T.SecurityPutPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityPutPrivilegesResponse, TContext>): TransportRequestCallback
    putRole<TContext = unknown>(params: T.SecurityPutRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityPutRoleResponse, TContext>>
    putRole<TContext = unknown>(params: T.SecurityPutRoleRequest, callback: callbackFn<T.SecurityPutRoleResponse, TContext>): TransportRequestCallback
    putRole<TContext = unknown>(params: T.SecurityPutRoleRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityPutRoleResponse, TContext>): TransportRequestCallback
    putRoleMapping<TContext = unknown>(params: T.SecurityPutRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityPutRoleMappingResponse, TContext>>
    putRoleMapping<TContext = unknown>(params: T.SecurityPutRoleMappingRequest, callback: callbackFn<T.SecurityPutRoleMappingResponse, TContext>): TransportRequestCallback
    putRoleMapping<TContext = unknown>(params: T.SecurityPutRoleMappingRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityPutRoleMappingResponse, TContext>): TransportRequestCallback
    putUser<TContext = unknown>(params: T.SecurityPutUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SecurityPutUserResponse, TContext>>
    putUser<TContext = unknown>(params: T.SecurityPutUserRequest, callback: callbackFn<T.SecurityPutUserResponse, TContext>): TransportRequestCallback
    putUser<TContext = unknown>(params: T.SecurityPutUserRequest, options: TransportRequestOptions, callback: callbackFn<T.SecurityPutUserResponse, TContext>): TransportRequestCallback
    queryApiKeys<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    queryApiKeys<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    queryApiKeys<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    queryApiKeys<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlAuthenticate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    samlAuthenticate<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlAuthenticate<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlAuthenticate<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlCompleteLogout<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    samlCompleteLogout<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlCompleteLogout<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlCompleteLogout<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlInvalidate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    samlInvalidate<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlInvalidate<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlInvalidate<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlLogout<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    samlLogout<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlLogout<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlLogout<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlPrepareAuthentication<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    samlPrepareAuthentication<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlPrepareAuthentication<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlPrepareAuthentication<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlServiceProviderMetadata<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    samlServiceProviderMetadata<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlServiceProviderMetadata<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    samlServiceProviderMetadata<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  }
  shutdown: {
    deleteNode<TContext = unknown>(params: T.ShutdownDeleteNodeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ShutdownDeleteNodeResponse, TContext>>
    deleteNode<TContext = unknown>(params: T.ShutdownDeleteNodeRequest, callback: callbackFn<T.ShutdownDeleteNodeResponse, TContext>): TransportRequestCallback
    deleteNode<TContext = unknown>(params: T.ShutdownDeleteNodeRequest, options: TransportRequestOptions, callback: callbackFn<T.ShutdownDeleteNodeResponse, TContext>): TransportRequestCallback
    getNode<TContext = unknown>(params?: T.ShutdownGetNodeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ShutdownGetNodeResponse, TContext>>
    getNode<TContext = unknown>(callback: callbackFn<T.ShutdownGetNodeResponse, TContext>): TransportRequestCallback
    getNode<TContext = unknown>(params: T.ShutdownGetNodeRequest, callback: callbackFn<T.ShutdownGetNodeResponse, TContext>): TransportRequestCallback
    getNode<TContext = unknown>(params: T.ShutdownGetNodeRequest, options: TransportRequestOptions, callback: callbackFn<T.ShutdownGetNodeResponse, TContext>): TransportRequestCallback
    putNode<TContext = unknown>(params: T.ShutdownPutNodeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ShutdownPutNodeResponse, TContext>>
    putNode<TContext = unknown>(params: T.ShutdownPutNodeRequest, callback: callbackFn<T.ShutdownPutNodeResponse, TContext>): TransportRequestCallback
    putNode<TContext = unknown>(params: T.ShutdownPutNodeRequest, options: TransportRequestOptions, callback: callbackFn<T.ShutdownPutNodeResponse, TContext>): TransportRequestCallback
  }
  slm: {
    deleteLifecycle<TContext = unknown>(params: T.SlmDeleteLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmDeleteLifecycleResponse, TContext>>
    deleteLifecycle<TContext = unknown>(params: T.SlmDeleteLifecycleRequest, callback: callbackFn<T.SlmDeleteLifecycleResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TContext = unknown>(params: T.SlmDeleteLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.SlmDeleteLifecycleResponse, TContext>): TransportRequestCallback
    executeLifecycle<TContext = unknown>(params: T.SlmExecuteLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmExecuteLifecycleResponse, TContext>>
    executeLifecycle<TContext = unknown>(params: T.SlmExecuteLifecycleRequest, callback: callbackFn<T.SlmExecuteLifecycleResponse, TContext>): TransportRequestCallback
    executeLifecycle<TContext = unknown>(params: T.SlmExecuteLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.SlmExecuteLifecycleResponse, TContext>): TransportRequestCallback
    executeRetention<TContext = unknown>(params?: T.SlmExecuteRetentionRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmExecuteRetentionResponse, TContext>>
    executeRetention<TContext = unknown>(callback: callbackFn<T.SlmExecuteRetentionResponse, TContext>): TransportRequestCallback
    executeRetention<TContext = unknown>(params: T.SlmExecuteRetentionRequest, callback: callbackFn<T.SlmExecuteRetentionResponse, TContext>): TransportRequestCallback
    executeRetention<TContext = unknown>(params: T.SlmExecuteRetentionRequest, options: TransportRequestOptions, callback: callbackFn<T.SlmExecuteRetentionResponse, TContext>): TransportRequestCallback
    getLifecycle<TContext = unknown>(params?: T.SlmGetLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmGetLifecycleResponse, TContext>>
    getLifecycle<TContext = unknown>(callback: callbackFn<T.SlmGetLifecycleResponse, TContext>): TransportRequestCallback
    getLifecycle<TContext = unknown>(params: T.SlmGetLifecycleRequest, callback: callbackFn<T.SlmGetLifecycleResponse, TContext>): TransportRequestCallback
    getLifecycle<TContext = unknown>(params: T.SlmGetLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.SlmGetLifecycleResponse, TContext>): TransportRequestCallback
    getStats<TContext = unknown>(params?: T.SlmGetStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmGetStatsResponse, TContext>>
    getStats<TContext = unknown>(callback: callbackFn<T.SlmGetStatsResponse, TContext>): TransportRequestCallback
    getStats<TContext = unknown>(params: T.SlmGetStatsRequest, callback: callbackFn<T.SlmGetStatsResponse, TContext>): TransportRequestCallback
    getStats<TContext = unknown>(params: T.SlmGetStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.SlmGetStatsResponse, TContext>): TransportRequestCallback
    getStatus<TContext = unknown>(params?: T.SlmGetStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmGetStatusResponse, TContext>>
    getStatus<TContext = unknown>(callback: callbackFn<T.SlmGetStatusResponse, TContext>): TransportRequestCallback
    getStatus<TContext = unknown>(params: T.SlmGetStatusRequest, callback: callbackFn<T.SlmGetStatusResponse, TContext>): TransportRequestCallback
    getStatus<TContext = unknown>(params: T.SlmGetStatusRequest, options: TransportRequestOptions, callback: callbackFn<T.SlmGetStatusResponse, TContext>): TransportRequestCallback
    putLifecycle<TContext = unknown>(params: T.SlmPutLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmPutLifecycleResponse, TContext>>
    putLifecycle<TContext = unknown>(params: T.SlmPutLifecycleRequest, callback: callbackFn<T.SlmPutLifecycleResponse, TContext>): TransportRequestCallback
    putLifecycle<TContext = unknown>(params: T.SlmPutLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.SlmPutLifecycleResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params?: T.SlmStartRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmStartResponse, TContext>>
    start<TContext = unknown>(callback: callbackFn<T.SlmStartResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params: T.SlmStartRequest, callback: callbackFn<T.SlmStartResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params: T.SlmStartRequest, options: TransportRequestOptions, callback: callbackFn<T.SlmStartResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params?: T.SlmStopRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SlmStopResponse, TContext>>
    stop<TContext = unknown>(callback: callbackFn<T.SlmStopResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params: T.SlmStopRequest, callback: callbackFn<T.SlmStopResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params: T.SlmStopRequest, options: TransportRequestOptions, callback: callbackFn<T.SlmStopResponse, TContext>): TransportRequestCallback
  }
  snapshot: {
    cleanupRepository<TContext = unknown>(params: T.SnapshotCleanupRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotCleanupRepositoryResponse, TContext>>
    cleanupRepository<TContext = unknown>(params: T.SnapshotCleanupRepositoryRequest, callback: callbackFn<T.SnapshotCleanupRepositoryResponse, TContext>): TransportRequestCallback
    cleanupRepository<TContext = unknown>(params: T.SnapshotCleanupRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<T.SnapshotCleanupRepositoryResponse, TContext>): TransportRequestCallback
    clone<TContext = unknown>(params: T.SnapshotCloneRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotCloneResponse, TContext>>
    clone<TContext = unknown>(params: T.SnapshotCloneRequest, callback: callbackFn<T.SnapshotCloneResponse, TContext>): TransportRequestCallback
    clone<TContext = unknown>(params: T.SnapshotCloneRequest, options: TransportRequestOptions, callback: callbackFn<T.SnapshotCloneResponse, TContext>): TransportRequestCallback
    create<TContext = unknown>(params: T.SnapshotCreateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotCreateResponse, TContext>>
    create<TContext = unknown>(params: T.SnapshotCreateRequest, callback: callbackFn<T.SnapshotCreateResponse, TContext>): TransportRequestCallback
    create<TContext = unknown>(params: T.SnapshotCreateRequest, options: TransportRequestOptions, callback: callbackFn<T.SnapshotCreateResponse, TContext>): TransportRequestCallback
    createRepository<TContext = unknown>(params: T.SnapshotCreateRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotCreateRepositoryResponse, TContext>>
    createRepository<TContext = unknown>(params: T.SnapshotCreateRepositoryRequest, callback: callbackFn<T.SnapshotCreateRepositoryResponse, TContext>): TransportRequestCallback
    createRepository<TContext = unknown>(params: T.SnapshotCreateRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<T.SnapshotCreateRepositoryResponse, TContext>): TransportRequestCallback
    delete<TContext = unknown>(params: T.SnapshotDeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotDeleteResponse, TContext>>
    delete<TContext = unknown>(params: T.SnapshotDeleteRequest, callback: callbackFn<T.SnapshotDeleteResponse, TContext>): TransportRequestCallback
    delete<TContext = unknown>(params: T.SnapshotDeleteRequest, options: TransportRequestOptions, callback: callbackFn<T.SnapshotDeleteResponse, TContext>): TransportRequestCallback
    deleteRepository<TContext = unknown>(params: T.SnapshotDeleteRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotDeleteRepositoryResponse, TContext>>
    deleteRepository<TContext = unknown>(params: T.SnapshotDeleteRepositoryRequest, callback: callbackFn<T.SnapshotDeleteRepositoryResponse, TContext>): TransportRequestCallback
    deleteRepository<TContext = unknown>(params: T.SnapshotDeleteRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<T.SnapshotDeleteRepositoryResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.SnapshotGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotGetResponse, TContext>>
    get<TContext = unknown>(params: T.SnapshotGetRequest, callback: callbackFn<T.SnapshotGetResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.SnapshotGetRequest, options: TransportRequestOptions, callback: callbackFn<T.SnapshotGetResponse, TContext>): TransportRequestCallback
    getRepository<TContext = unknown>(params?: T.SnapshotGetRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotGetRepositoryResponse, TContext>>
    getRepository<TContext = unknown>(callback: callbackFn<T.SnapshotGetRepositoryResponse, TContext>): TransportRequestCallback
    getRepository<TContext = unknown>(params: T.SnapshotGetRepositoryRequest, callback: callbackFn<T.SnapshotGetRepositoryResponse, TContext>): TransportRequestCallback
    getRepository<TContext = unknown>(params: T.SnapshotGetRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<T.SnapshotGetRepositoryResponse, TContext>): TransportRequestCallback
    repositoryAnalyze<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    repositoryAnalyze<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    repositoryAnalyze<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    repositoryAnalyze<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    restore<TContext = unknown>(params: T.SnapshotRestoreRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotRestoreResponse, TContext>>
    restore<TContext = unknown>(params: T.SnapshotRestoreRequest, callback: callbackFn<T.SnapshotRestoreResponse, TContext>): TransportRequestCallback
    restore<TContext = unknown>(params: T.SnapshotRestoreRequest, options: TransportRequestOptions, callback: callbackFn<T.SnapshotRestoreResponse, TContext>): TransportRequestCallback
    status<TContext = unknown>(params?: T.SnapshotStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotStatusResponse, TContext>>
    status<TContext = unknown>(callback: callbackFn<T.SnapshotStatusResponse, TContext>): TransportRequestCallback
    status<TContext = unknown>(params: T.SnapshotStatusRequest, callback: callbackFn<T.SnapshotStatusResponse, TContext>): TransportRequestCallback
    status<TContext = unknown>(params: T.SnapshotStatusRequest, options: TransportRequestOptions, callback: callbackFn<T.SnapshotStatusResponse, TContext>): TransportRequestCallback
    verifyRepository<TContext = unknown>(params: T.SnapshotVerifyRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotVerifyRepositoryResponse, TContext>>
    verifyRepository<TContext = unknown>(params: T.SnapshotVerifyRepositoryRequest, callback: callbackFn<T.SnapshotVerifyRepositoryResponse, TContext>): TransportRequestCallback
    verifyRepository<TContext = unknown>(params: T.SnapshotVerifyRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<T.SnapshotVerifyRepositoryResponse, TContext>): TransportRequestCallback
  }
  sql: {
    clearCursor<TContext = unknown>(params?: T.SqlClearCursorRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SqlClearCursorResponse, TContext>>
    clearCursor<TContext = unknown>(callback: callbackFn<T.SqlClearCursorResponse, TContext>): TransportRequestCallback
    clearCursor<TContext = unknown>(params: T.SqlClearCursorRequest, callback: callbackFn<T.SqlClearCursorResponse, TContext>): TransportRequestCallback
    clearCursor<TContext = unknown>(params: T.SqlClearCursorRequest, options: TransportRequestOptions, callback: callbackFn<T.SqlClearCursorResponse, TContext>): TransportRequestCallback
    deleteAsync<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    deleteAsync<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deleteAsync<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deleteAsync<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getAsync<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getAsync<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getAsync<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getAsync<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getAsyncStatus<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getAsyncStatus<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getAsyncStatus<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getAsyncStatus<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    query<TContext = unknown>(params?: T.SqlQueryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SqlQueryResponse, TContext>>
    query<TContext = unknown>(callback: callbackFn<T.SqlQueryResponse, TContext>): TransportRequestCallback
    query<TContext = unknown>(params: T.SqlQueryRequest, callback: callbackFn<T.SqlQueryResponse, TContext>): TransportRequestCallback
    query<TContext = unknown>(params: T.SqlQueryRequest, options: TransportRequestOptions, callback: callbackFn<T.SqlQueryResponse, TContext>): TransportRequestCallback
    translate<TContext = unknown>(params?: T.SqlTranslateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SqlTranslateResponse, TContext>>
    translate<TContext = unknown>(callback: callbackFn<T.SqlTranslateResponse, TContext>): TransportRequestCallback
    translate<TContext = unknown>(params: T.SqlTranslateRequest, callback: callbackFn<T.SqlTranslateResponse, TContext>): TransportRequestCallback
    translate<TContext = unknown>(params: T.SqlTranslateRequest, options: TransportRequestOptions, callback: callbackFn<T.SqlTranslateResponse, TContext>): TransportRequestCallback
  }
  ssl: {
    certificates<TContext = unknown>(params?: T.SslCertificatesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SslCertificatesResponse, TContext>>
    certificates<TContext = unknown>(callback: callbackFn<T.SslCertificatesResponse, TContext>): TransportRequestCallback
    certificates<TContext = unknown>(params: T.SslCertificatesRequest, callback: callbackFn<T.SslCertificatesResponse, TContext>): TransportRequestCallback
    certificates<TContext = unknown>(params: T.SslCertificatesRequest, options: TransportRequestOptions, callback: callbackFn<T.SslCertificatesResponse, TContext>): TransportRequestCallback
  }
  tasks: {
    cancel<TContext = unknown>(params?: T.TasksCancelRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TasksCancelResponse, TContext>>
    cancel<TContext = unknown>(callback: callbackFn<T.TasksCancelResponse, TContext>): TransportRequestCallback
    cancel<TContext = unknown>(params: T.TasksCancelRequest, callback: callbackFn<T.TasksCancelResponse, TContext>): TransportRequestCallback
    cancel<TContext = unknown>(params: T.TasksCancelRequest, options: TransportRequestOptions, callback: callbackFn<T.TasksCancelResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.TasksGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TasksGetResponse, TContext>>
    get<TContext = unknown>(params: T.TasksGetRequest, callback: callbackFn<T.TasksGetResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.TasksGetRequest, options: TransportRequestOptions, callback: callbackFn<T.TasksGetResponse, TContext>): TransportRequestCallback
    list<TContext = unknown>(params?: T.TasksListRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TasksListResponse, TContext>>
    list<TContext = unknown>(callback: callbackFn<T.TasksListResponse, TContext>): TransportRequestCallback
    list<TContext = unknown>(params: T.TasksListRequest, callback: callbackFn<T.TasksListResponse, TContext>): TransportRequestCallback
    list<TContext = unknown>(params: T.TasksListRequest, options: TransportRequestOptions, callback: callbackFn<T.TasksListResponse, TContext>): TransportRequestCallback
  }
  termsEnum<TContext = unknown>(params: T.TermsEnumRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TermsEnumResponse, TContext>>
  termsEnum<TContext = unknown>(params: T.TermsEnumRequest, callback: callbackFn<T.TermsEnumResponse, TContext>): TransportRequestCallback
  termsEnum<TContext = unknown>(params: T.TermsEnumRequest, options: TransportRequestOptions, callback: callbackFn<T.TermsEnumResponse, TContext>): TransportRequestCallback
  termvectors<TDocument = unknown, TContext = unknown>(params: T.TermvectorsRequest<TDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TermvectorsResponse, TContext>>
  termvectors<TDocument = unknown, TContext = unknown>(params: T.TermvectorsRequest<TDocument>, callback: callbackFn<T.TermvectorsResponse, TContext>): TransportRequestCallback
  termvectors<TDocument = unknown, TContext = unknown>(params: T.TermvectorsRequest<TDocument>, options: TransportRequestOptions, callback: callbackFn<T.TermvectorsResponse, TContext>): TransportRequestCallback
  textStructure: {
    findStructure<TJsonDocument = unknown, TContext = unknown>(params: T.TextStructureFindStructureRequest<TJsonDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TextStructureFindStructureResponse, TContext>>
    findStructure<TJsonDocument = unknown, TContext = unknown>(params: T.TextStructureFindStructureRequest<TJsonDocument>, callback: callbackFn<T.TextStructureFindStructureResponse, TContext>): TransportRequestCallback
    findStructure<TJsonDocument = unknown, TContext = unknown>(params: T.TextStructureFindStructureRequest<TJsonDocument>, options: TransportRequestOptions, callback: callbackFn<T.TextStructureFindStructureResponse, TContext>): TransportRequestCallback
  }
  transform: {
    deleteTransform<TContext = unknown>(params: T.TransformDeleteTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformDeleteTransformResponse, TContext>>
    deleteTransform<TContext = unknown>(params: T.TransformDeleteTransformRequest, callback: callbackFn<T.TransformDeleteTransformResponse, TContext>): TransportRequestCallback
    deleteTransform<TContext = unknown>(params: T.TransformDeleteTransformRequest, options: TransportRequestOptions, callback: callbackFn<T.TransformDeleteTransformResponse, TContext>): TransportRequestCallback
    getTransform<TContext = unknown>(params?: T.TransformGetTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformGetTransformResponse, TContext>>
    getTransform<TContext = unknown>(callback: callbackFn<T.TransformGetTransformResponse, TContext>): TransportRequestCallback
    getTransform<TContext = unknown>(params: T.TransformGetTransformRequest, callback: callbackFn<T.TransformGetTransformResponse, TContext>): TransportRequestCallback
    getTransform<TContext = unknown>(params: T.TransformGetTransformRequest, options: TransportRequestOptions, callback: callbackFn<T.TransformGetTransformResponse, TContext>): TransportRequestCallback
    getTransformStats<TContext = unknown>(params: T.TransformGetTransformStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformGetTransformStatsResponse, TContext>>
    getTransformStats<TContext = unknown>(params: T.TransformGetTransformStatsRequest, callback: callbackFn<T.TransformGetTransformStatsResponse, TContext>): TransportRequestCallback
    getTransformStats<TContext = unknown>(params: T.TransformGetTransformStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.TransformGetTransformStatsResponse, TContext>): TransportRequestCallback
    previewTransform<TTransform = unknown, TContext = unknown>(params?: T.TransformPreviewTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformPreviewTransformResponse<TTransform>, TContext>>
    previewTransform<TTransform = unknown, TContext = unknown>(callback: callbackFn<T.TransformPreviewTransformResponse<TTransform>, TContext>): TransportRequestCallback
    previewTransform<TTransform = unknown, TContext = unknown>(params: T.TransformPreviewTransformRequest, callback: callbackFn<T.TransformPreviewTransformResponse<TTransform>, TContext>): TransportRequestCallback
    previewTransform<TTransform = unknown, TContext = unknown>(params: T.TransformPreviewTransformRequest, options: TransportRequestOptions, callback: callbackFn<T.TransformPreviewTransformResponse<TTransform>, TContext>): TransportRequestCallback
    putTransform<TContext = unknown>(params: T.TransformPutTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformPutTransformResponse, TContext>>
    putTransform<TContext = unknown>(params: T.TransformPutTransformRequest, callback: callbackFn<T.TransformPutTransformResponse, TContext>): TransportRequestCallback
    putTransform<TContext = unknown>(params: T.TransformPutTransformRequest, options: TransportRequestOptions, callback: callbackFn<T.TransformPutTransformResponse, TContext>): TransportRequestCallback
    startTransform<TContext = unknown>(params: T.TransformStartTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformStartTransformResponse, TContext>>
    startTransform<TContext = unknown>(params: T.TransformStartTransformRequest, callback: callbackFn<T.TransformStartTransformResponse, TContext>): TransportRequestCallback
    startTransform<TContext = unknown>(params: T.TransformStartTransformRequest, options: TransportRequestOptions, callback: callbackFn<T.TransformStartTransformResponse, TContext>): TransportRequestCallback
    stopTransform<TContext = unknown>(params: T.TransformStopTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformStopTransformResponse, TContext>>
    stopTransform<TContext = unknown>(params: T.TransformStopTransformRequest, callback: callbackFn<T.TransformStopTransformResponse, TContext>): TransportRequestCallback
    stopTransform<TContext = unknown>(params: T.TransformStopTransformRequest, options: TransportRequestOptions, callback: callbackFn<T.TransformStopTransformResponse, TContext>): TransportRequestCallback
    updateTransform<TContext = unknown>(params: T.TransformUpdateTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformUpdateTransformResponse, TContext>>
    updateTransform<TContext = unknown>(params: T.TransformUpdateTransformRequest, callback: callbackFn<T.TransformUpdateTransformResponse, TContext>): TransportRequestCallback
    updateTransform<TContext = unknown>(params: T.TransformUpdateTransformRequest, options: TransportRequestOptions, callback: callbackFn<T.TransformUpdateTransformResponse, TContext>): TransportRequestCallback
    upgradeTransforms<TContext = unknown>(params?: T.TransformUpgradeTransformsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TransformUpgradeTransformsResponse, TContext>>
    upgradeTransforms<TContext = unknown>(callback: callbackFn<T.TransformUpgradeTransformsResponse, TContext>): TransportRequestCallback
    upgradeTransforms<TContext = unknown>(params: T.TransformUpgradeTransformsRequest, callback: callbackFn<T.TransformUpgradeTransformsResponse, TContext>): TransportRequestCallback
    upgradeTransforms<TContext = unknown>(params: T.TransformUpgradeTransformsRequest, options: TransportRequestOptions, callback: callbackFn<T.TransformUpgradeTransformsResponse, TContext>): TransportRequestCallback
  }
  update<TDocumentR = unknown, TDocument = unknown, TPartialDocument = unknown, TContext = unknown>(params: T.UpdateRequest<TDocument, TPartialDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateResponse<TDocumentR>, TContext>>
  update<TDocumentR = unknown, TDocument = unknown, TPartialDocument = unknown, TContext = unknown>(params: T.UpdateRequest<TDocument, TPartialDocument>, callback: callbackFn<T.UpdateResponse<TDocumentR>, TContext>): TransportRequestCallback
  update<TDocumentR = unknown, TDocument = unknown, TPartialDocument = unknown, TContext = unknown>(params: T.UpdateRequest<TDocument, TPartialDocument>, options: TransportRequestOptions, callback: callbackFn<T.UpdateResponse<TDocumentR>, TContext>): TransportRequestCallback
  updateByQuery<TContext = unknown>(params: T.UpdateByQueryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateByQueryResponse, TContext>>
  updateByQuery<TContext = unknown>(params: T.UpdateByQueryRequest, callback: callbackFn<T.UpdateByQueryResponse, TContext>): TransportRequestCallback
  updateByQuery<TContext = unknown>(params: T.UpdateByQueryRequest, options: TransportRequestOptions, callback: callbackFn<T.UpdateByQueryResponse, TContext>): TransportRequestCallback
  updateByQueryRethrottle<TContext = unknown>(params: T.UpdateByQueryRethrottleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateByQueryRethrottleResponse, TContext>>
  updateByQueryRethrottle<TContext = unknown>(params: T.UpdateByQueryRethrottleRequest, callback: callbackFn<T.UpdateByQueryRethrottleResponse, TContext>): TransportRequestCallback
  updateByQueryRethrottle<TContext = unknown>(params: T.UpdateByQueryRethrottleRequest, options: TransportRequestOptions, callback: callbackFn<T.UpdateByQueryRethrottleResponse, TContext>): TransportRequestCallback
  watcher: {
    ackWatch<TContext = unknown>(params: T.WatcherAckWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherAckWatchResponse, TContext>>
    ackWatch<TContext = unknown>(params: T.WatcherAckWatchRequest, callback: callbackFn<T.WatcherAckWatchResponse, TContext>): TransportRequestCallback
    ackWatch<TContext = unknown>(params: T.WatcherAckWatchRequest, options: TransportRequestOptions, callback: callbackFn<T.WatcherAckWatchResponse, TContext>): TransportRequestCallback
    activateWatch<TContext = unknown>(params: T.WatcherActivateWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherActivateWatchResponse, TContext>>
    activateWatch<TContext = unknown>(params: T.WatcherActivateWatchRequest, callback: callbackFn<T.WatcherActivateWatchResponse, TContext>): TransportRequestCallback
    activateWatch<TContext = unknown>(params: T.WatcherActivateWatchRequest, options: TransportRequestOptions, callback: callbackFn<T.WatcherActivateWatchResponse, TContext>): TransportRequestCallback
    deactivateWatch<TContext = unknown>(params: T.WatcherDeactivateWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherDeactivateWatchResponse, TContext>>
    deactivateWatch<TContext = unknown>(params: T.WatcherDeactivateWatchRequest, callback: callbackFn<T.WatcherDeactivateWatchResponse, TContext>): TransportRequestCallback
    deactivateWatch<TContext = unknown>(params: T.WatcherDeactivateWatchRequest, options: TransportRequestOptions, callback: callbackFn<T.WatcherDeactivateWatchResponse, TContext>): TransportRequestCallback
    deleteWatch<TContext = unknown>(params: T.WatcherDeleteWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherDeleteWatchResponse, TContext>>
    deleteWatch<TContext = unknown>(params: T.WatcherDeleteWatchRequest, callback: callbackFn<T.WatcherDeleteWatchResponse, TContext>): TransportRequestCallback
    deleteWatch<TContext = unknown>(params: T.WatcherDeleteWatchRequest, options: TransportRequestOptions, callback: callbackFn<T.WatcherDeleteWatchResponse, TContext>): TransportRequestCallback
    executeWatch<TContext = unknown>(params?: T.WatcherExecuteWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherExecuteWatchResponse, TContext>>
    executeWatch<TContext = unknown>(callback: callbackFn<T.WatcherExecuteWatchResponse, TContext>): TransportRequestCallback
    executeWatch<TContext = unknown>(params: T.WatcherExecuteWatchRequest, callback: callbackFn<T.WatcherExecuteWatchResponse, TContext>): TransportRequestCallback
    executeWatch<TContext = unknown>(params: T.WatcherExecuteWatchRequest, options: TransportRequestOptions, callback: callbackFn<T.WatcherExecuteWatchResponse, TContext>): TransportRequestCallback
    getWatch<TContext = unknown>(params: T.WatcherGetWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherGetWatchResponse, TContext>>
    getWatch<TContext = unknown>(params: T.WatcherGetWatchRequest, callback: callbackFn<T.WatcherGetWatchResponse, TContext>): TransportRequestCallback
    getWatch<TContext = unknown>(params: T.WatcherGetWatchRequest, options: TransportRequestOptions, callback: callbackFn<T.WatcherGetWatchResponse, TContext>): TransportRequestCallback
    putWatch<TContext = unknown>(params: T.WatcherPutWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherPutWatchResponse, TContext>>
    putWatch<TContext = unknown>(params: T.WatcherPutWatchRequest, callback: callbackFn<T.WatcherPutWatchResponse, TContext>): TransportRequestCallback
    putWatch<TContext = unknown>(params: T.WatcherPutWatchRequest, options: TransportRequestOptions, callback: callbackFn<T.WatcherPutWatchResponse, TContext>): TransportRequestCallback
    queryWatches<TContext = unknown>(params?: T.WatcherQueryWatchesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherQueryWatchesResponse, TContext>>
    queryWatches<TContext = unknown>(callback: callbackFn<T.WatcherQueryWatchesResponse, TContext>): TransportRequestCallback
    queryWatches<TContext = unknown>(params: T.WatcherQueryWatchesRequest, callback: callbackFn<T.WatcherQueryWatchesResponse, TContext>): TransportRequestCallback
    queryWatches<TContext = unknown>(params: T.WatcherQueryWatchesRequest, options: TransportRequestOptions, callback: callbackFn<T.WatcherQueryWatchesResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params?: T.WatcherStartRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherStartResponse, TContext>>
    start<TContext = unknown>(callback: callbackFn<T.WatcherStartResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params: T.WatcherStartRequest, callback: callbackFn<T.WatcherStartResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params: T.WatcherStartRequest, options: TransportRequestOptions, callback: callbackFn<T.WatcherStartResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params?: T.WatcherStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherStatsResponse, TContext>>
    stats<TContext = unknown>(callback: callbackFn<T.WatcherStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.WatcherStatsRequest, callback: callbackFn<T.WatcherStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.WatcherStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.WatcherStatsResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params?: T.WatcherStopRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherStopResponse, TContext>>
    stop<TContext = unknown>(callback: callbackFn<T.WatcherStopResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params: T.WatcherStopRequest, callback: callbackFn<T.WatcherStopResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params: T.WatcherStopRequest, options: TransportRequestOptions, callback: callbackFn<T.WatcherStopResponse, TContext>): TransportRequestCallback
  }
  xpack: {
    info<TContext = unknown>(params?: T.XpackInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.XpackInfoResponse, TContext>>
    info<TContext = unknown>(callback: callbackFn<T.XpackInfoResponse, TContext>): TransportRequestCallback
    info<TContext = unknown>(params: T.XpackInfoRequest, callback: callbackFn<T.XpackInfoResponse, TContext>): TransportRequestCallback
    info<TContext = unknown>(params: T.XpackInfoRequest, options: TransportRequestOptions, callback: callbackFn<T.XpackInfoResponse, TContext>): TransportRequestCallback
    usage<TContext = unknown>(params?: T.XpackUsageRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.XpackUsageResponse, TContext>>
    usage<TContext = unknown>(callback: callbackFn<T.XpackUsageResponse, TContext>): TransportRequestCallback
    usage<TContext = unknown>(params: T.XpackUsageRequest, callback: callbackFn<T.XpackUsageResponse, TContext>): TransportRequestCallback
    usage<TContext = unknown>(params: T.XpackUsageRequest, options: TransportRequestOptions, callback: callbackFn<T.XpackUsageResponse, TContext>): TransportRequestCallback
  }
}

export * as estypes from './types'
export {
  Client,
  Transport,
  ConnectionPool,
  BaseConnectionPool,
  CloudConnectionPool,
  Connection,
  Serializer,
  events,
  errors,
  ApiError,
  ApiResponse,
  RequestEvent,
  ResurrectEvent,
  ClientOptions,
  NodeOptions,
  ClientExtendsCallbackOptions
}