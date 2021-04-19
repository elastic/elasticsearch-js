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
  constructor(opts: ClientOptions);
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
    deleteAutoscalingPolicy<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    deleteAutoscalingPolicy<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deleteAutoscalingPolicy<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deleteAutoscalingPolicy<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getAutoscalingCapacity<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getAutoscalingCapacity<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getAutoscalingCapacity<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getAutoscalingCapacity<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getAutoscalingPolicy<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getAutoscalingPolicy<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getAutoscalingPolicy<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getAutoscalingPolicy<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putAutoscalingPolicy<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putAutoscalingPolicy<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putAutoscalingPolicy<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putAutoscalingPolicy<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  }
  bulk<TSource = unknown, TContext = unknown>(params: T.BulkRequest<TSource>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.BulkResponse, TContext>>
  bulk<TSource = unknown, TContext = unknown>(params: T.BulkRequest<TSource>, callback: callbackFn<T.BulkResponse, TContext>): TransportRequestCallback
  bulk<TSource = unknown, TContext = unknown>(params: T.BulkRequest<TSource>, options: TransportRequestOptions, callback: callbackFn<T.BulkResponse, TContext>): TransportRequestCallback
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
    mlDataFrameAnalytics<TContext = unknown>(params?: T.CatDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatDataFrameAnalyticsResponse, TContext>>
    mlDataFrameAnalytics<TContext = unknown>(callback: callbackFn<T.CatDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TContext = unknown>(params: T.CatDataFrameAnalyticsRequest, callback: callbackFn<T.CatDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TContext = unknown>(params: T.CatDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<T.CatDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TContext = unknown>(params?: T.CatDatafeedsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatDatafeedsResponse, TContext>>
    mlDatafeeds<TContext = unknown>(callback: callbackFn<T.CatDatafeedsResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TContext = unknown>(params: T.CatDatafeedsRequest, callback: callbackFn<T.CatDatafeedsResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TContext = unknown>(params: T.CatDatafeedsRequest, options: TransportRequestOptions, callback: callbackFn<T.CatDatafeedsResponse, TContext>): TransportRequestCallback
    mlJobs<TContext = unknown>(params?: T.CatJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatJobsResponse, TContext>>
    mlJobs<TContext = unknown>(callback: callbackFn<T.CatJobsResponse, TContext>): TransportRequestCallback
    mlJobs<TContext = unknown>(params: T.CatJobsRequest, callback: callbackFn<T.CatJobsResponse, TContext>): TransportRequestCallback
    mlJobs<TContext = unknown>(params: T.CatJobsRequest, options: TransportRequestOptions, callback: callbackFn<T.CatJobsResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TContext = unknown>(params?: T.CatTrainedModelsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatTrainedModelsResponse, TContext>>
    mlTrainedModels<TContext = unknown>(callback: callbackFn<T.CatTrainedModelsResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TContext = unknown>(params: T.CatTrainedModelsRequest, callback: callbackFn<T.CatTrainedModelsResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TContext = unknown>(params: T.CatTrainedModelsRequest, options: TransportRequestOptions, callback: callbackFn<T.CatTrainedModelsResponse, TContext>): TransportRequestCallback
    nodeattrs<TContext = unknown>(params?: T.CatNodeAttributesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CatNodeAttributesResponse, TContext>>
    nodeattrs<TContext = unknown>(callback: callbackFn<T.CatNodeAttributesResponse, TContext>): TransportRequestCallback
    nodeattrs<TContext = unknown>(params: T.CatNodeAttributesRequest, callback: callbackFn<T.CatNodeAttributesResponse, TContext>): TransportRequestCallback
    nodeattrs<TContext = unknown>(params: T.CatNodeAttributesRequest, options: TransportRequestOptions, callback: callbackFn<T.CatNodeAttributesResponse, TContext>): TransportRequestCallback
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
    deleteAutoFollowPattern<TContext = unknown>(params: T.DeleteAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteAutoFollowPatternResponse, TContext>>
    deleteAutoFollowPattern<TContext = unknown>(params: T.DeleteAutoFollowPatternRequest, callback: callbackFn<T.DeleteAutoFollowPatternResponse, TContext>): TransportRequestCallback
    deleteAutoFollowPattern<TContext = unknown>(params: T.DeleteAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteAutoFollowPatternResponse, TContext>): TransportRequestCallback
    follow<TContext = unknown>(params: T.CreateFollowIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CreateFollowIndexResponse, TContext>>
    follow<TContext = unknown>(params: T.CreateFollowIndexRequest, callback: callbackFn<T.CreateFollowIndexResponse, TContext>): TransportRequestCallback
    follow<TContext = unknown>(params: T.CreateFollowIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.CreateFollowIndexResponse, TContext>): TransportRequestCallback
    followInfo<TContext = unknown>(params: T.FollowInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FollowInfoResponse, TContext>>
    followInfo<TContext = unknown>(params: T.FollowInfoRequest, callback: callbackFn<T.FollowInfoResponse, TContext>): TransportRequestCallback
    followInfo<TContext = unknown>(params: T.FollowInfoRequest, options: TransportRequestOptions, callback: callbackFn<T.FollowInfoResponse, TContext>): TransportRequestCallback
    followStats<TContext = unknown>(params: T.FollowIndexStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FollowIndexStatsResponse, TContext>>
    followStats<TContext = unknown>(params: T.FollowIndexStatsRequest, callback: callbackFn<T.FollowIndexStatsResponse, TContext>): TransportRequestCallback
    followStats<TContext = unknown>(params: T.FollowIndexStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.FollowIndexStatsResponse, TContext>): TransportRequestCallback
    forgetFollower<TContext = unknown>(params: T.ForgetFollowerIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ForgetFollowerIndexResponse, TContext>>
    forgetFollower<TContext = unknown>(params: T.ForgetFollowerIndexRequest, callback: callbackFn<T.ForgetFollowerIndexResponse, TContext>): TransportRequestCallback
    forgetFollower<TContext = unknown>(params: T.ForgetFollowerIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.ForgetFollowerIndexResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TContext = unknown>(params?: T.GetAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetAutoFollowPatternResponse, TContext>>
    getAutoFollowPattern<TContext = unknown>(callback: callbackFn<T.GetAutoFollowPatternResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TContext = unknown>(params: T.GetAutoFollowPatternRequest, callback: callbackFn<T.GetAutoFollowPatternResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TContext = unknown>(params: T.GetAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<T.GetAutoFollowPatternResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TContext = unknown>(params: T.PauseAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PauseAutoFollowPatternResponse, TContext>>
    pauseAutoFollowPattern<TContext = unknown>(params: T.PauseAutoFollowPatternRequest, callback: callbackFn<T.PauseAutoFollowPatternResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TContext = unknown>(params: T.PauseAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<T.PauseAutoFollowPatternResponse, TContext>): TransportRequestCallback
    pauseFollow<TContext = unknown>(params: T.PauseFollowIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PauseFollowIndexResponse, TContext>>
    pauseFollow<TContext = unknown>(params: T.PauseFollowIndexRequest, callback: callbackFn<T.PauseFollowIndexResponse, TContext>): TransportRequestCallback
    pauseFollow<TContext = unknown>(params: T.PauseFollowIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.PauseFollowIndexResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TContext = unknown>(params: T.PutAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutAutoFollowPatternResponse, TContext>>
    putAutoFollowPattern<TContext = unknown>(params: T.PutAutoFollowPatternRequest, callback: callbackFn<T.PutAutoFollowPatternResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TContext = unknown>(params: T.PutAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<T.PutAutoFollowPatternResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TContext = unknown>(params: T.ResumeAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ResumeAutoFollowPatternResponse, TContext>>
    resumeAutoFollowPattern<TContext = unknown>(params: T.ResumeAutoFollowPatternRequest, callback: callbackFn<T.ResumeAutoFollowPatternResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TContext = unknown>(params: T.ResumeAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<T.ResumeAutoFollowPatternResponse, TContext>): TransportRequestCallback
    resumeFollow<TContext = unknown>(params: T.ResumeFollowIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ResumeFollowIndexResponse, TContext>>
    resumeFollow<TContext = unknown>(params: T.ResumeFollowIndexRequest, callback: callbackFn<T.ResumeFollowIndexResponse, TContext>): TransportRequestCallback
    resumeFollow<TContext = unknown>(params: T.ResumeFollowIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.ResumeFollowIndexResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params?: T.CcrStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CcrStatsResponse, TContext>>
    stats<TContext = unknown>(callback: callbackFn<T.CcrStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.CcrStatsRequest, callback: callbackFn<T.CcrStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.CcrStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.CcrStatsResponse, TContext>): TransportRequestCallback
    unfollow<TContext = unknown>(params: T.UnfollowIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UnfollowIndexResponse, TContext>>
    unfollow<TContext = unknown>(params: T.UnfollowIndexRequest, callback: callbackFn<T.UnfollowIndexResponse, TContext>): TransportRequestCallback
    unfollow<TContext = unknown>(params: T.UnfollowIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.UnfollowIndexResponse, TContext>): TransportRequestCallback
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
    deleteVotingConfigExclusions<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    deleteVotingConfigExclusions<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deleteVotingConfigExclusions<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deleteVotingConfigExclusions<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    existsComponentTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    existsComponentTemplate<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    existsComponentTemplate<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    existsComponentTemplate<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getComponentTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getComponentTemplate<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getComponentTemplate<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getComponentTemplate<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
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
    postVotingConfigExclusions<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    postVotingConfigExclusions<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    postVotingConfigExclusions<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    postVotingConfigExclusions<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putComponentTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putComponentTemplate<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putComponentTemplate<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putComponentTemplate<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putSettings<TContext = unknown>(params?: T.ClusterPutSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClusterPutSettingsResponse, TContext>>
    putSettings<TContext = unknown>(callback: callbackFn<T.ClusterPutSettingsResponse, TContext>): TransportRequestCallback
    putSettings<TContext = unknown>(params: T.ClusterPutSettingsRequest, callback: callbackFn<T.ClusterPutSettingsResponse, TContext>): TransportRequestCallback
    putSettings<TContext = unknown>(params: T.ClusterPutSettingsRequest, options: TransportRequestOptions, callback: callbackFn<T.ClusterPutSettingsResponse, TContext>): TransportRequestCallback
    remoteInfo<TContext = unknown>(params?: T.RemoteInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RemoteInfoResponse, TContext>>
    remoteInfo<TContext = unknown>(callback: callbackFn<T.RemoteInfoResponse, TContext>): TransportRequestCallback
    remoteInfo<TContext = unknown>(params: T.RemoteInfoRequest, callback: callbackFn<T.RemoteInfoResponse, TContext>): TransportRequestCallback
    remoteInfo<TContext = unknown>(params: T.RemoteInfoRequest, options: TransportRequestOptions, callback: callbackFn<T.RemoteInfoResponse, TContext>): TransportRequestCallback
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
    deleteDanglingIndex<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    deleteDanglingIndex<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deleteDanglingIndex<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deleteDanglingIndex<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    importDanglingIndex<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    importDanglingIndex<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    importDanglingIndex<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    importDanglingIndex<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    listDanglingIndices<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    listDanglingIndices<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    listDanglingIndices<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    listDanglingIndices<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
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
    deletePolicy<TContext = unknown>(params: T.DeleteEnrichPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteEnrichPolicyResponse, TContext>>
    deletePolicy<TContext = unknown>(params: T.DeleteEnrichPolicyRequest, callback: callbackFn<T.DeleteEnrichPolicyResponse, TContext>): TransportRequestCallback
    deletePolicy<TContext = unknown>(params: T.DeleteEnrichPolicyRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteEnrichPolicyResponse, TContext>): TransportRequestCallback
    executePolicy<TContext = unknown>(params: T.ExecuteEnrichPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExecuteEnrichPolicyResponse, TContext>>
    executePolicy<TContext = unknown>(params: T.ExecuteEnrichPolicyRequest, callback: callbackFn<T.ExecuteEnrichPolicyResponse, TContext>): TransportRequestCallback
    executePolicy<TContext = unknown>(params: T.ExecuteEnrichPolicyRequest, options: TransportRequestOptions, callback: callbackFn<T.ExecuteEnrichPolicyResponse, TContext>): TransportRequestCallback
    getPolicy<TContext = unknown>(params?: T.GetEnrichPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetEnrichPolicyResponse, TContext>>
    getPolicy<TContext = unknown>(callback: callbackFn<T.GetEnrichPolicyResponse, TContext>): TransportRequestCallback
    getPolicy<TContext = unknown>(params: T.GetEnrichPolicyRequest, callback: callbackFn<T.GetEnrichPolicyResponse, TContext>): TransportRequestCallback
    getPolicy<TContext = unknown>(params: T.GetEnrichPolicyRequest, options: TransportRequestOptions, callback: callbackFn<T.GetEnrichPolicyResponse, TContext>): TransportRequestCallback
    putPolicy<TContext = unknown>(params: T.PutEnrichPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutEnrichPolicyResponse, TContext>>
    putPolicy<TContext = unknown>(params: T.PutEnrichPolicyRequest, callback: callbackFn<T.PutEnrichPolicyResponse, TContext>): TransportRequestCallback
    putPolicy<TContext = unknown>(params: T.PutEnrichPolicyRequest, options: TransportRequestOptions, callback: callbackFn<T.PutEnrichPolicyResponse, TContext>): TransportRequestCallback
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
  exists<TContext = unknown>(params: T.DocumentExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DocumentExistsResponse, TContext>>
  exists<TContext = unknown>(params: T.DocumentExistsRequest, callback: callbackFn<T.DocumentExistsResponse, TContext>): TransportRequestCallback
  exists<TContext = unknown>(params: T.DocumentExistsRequest, options: TransportRequestOptions, callback: callbackFn<T.DocumentExistsResponse, TContext>): TransportRequestCallback
  existsSource<TContext = unknown>(params: T.SourceExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SourceExistsResponse, TContext>>
  existsSource<TContext = unknown>(params: T.SourceExistsRequest, callback: callbackFn<T.SourceExistsResponse, TContext>): TransportRequestCallback
  existsSource<TContext = unknown>(params: T.SourceExistsRequest, options: TransportRequestOptions, callback: callbackFn<T.SourceExistsResponse, TContext>): TransportRequestCallback
  explain<TDocument = unknown, TContext = unknown>(params: T.ExplainRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExplainResponse<TDocument>, TContext>>
  explain<TDocument = unknown, TContext = unknown>(params: T.ExplainRequest, callback: callbackFn<T.ExplainResponse<TDocument>, TContext>): TransportRequestCallback
  explain<TDocument = unknown, TContext = unknown>(params: T.ExplainRequest, options: TransportRequestOptions, callback: callbackFn<T.ExplainResponse<TDocument>, TContext>): TransportRequestCallback
  features: {
    getFeatures<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getFeatures<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getFeatures<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getFeatures<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    resetFeatures<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    resetFeatures<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    resetFeatures<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    resetFeatures<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  }
  fieldCaps<TContext = unknown>(params?: T.FieldCapabilitiesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FieldCapabilitiesResponse, TContext>>
  fieldCaps<TContext = unknown>(callback: callbackFn<T.FieldCapabilitiesResponse, TContext>): TransportRequestCallback
  fieldCaps<TContext = unknown>(params: T.FieldCapabilitiesRequest, callback: callbackFn<T.FieldCapabilitiesResponse, TContext>): TransportRequestCallback
  fieldCaps<TContext = unknown>(params: T.FieldCapabilitiesRequest, options: TransportRequestOptions, callback: callbackFn<T.FieldCapabilitiesResponse, TContext>): TransportRequestCallback
  get<TDocument = unknown, TContext = unknown>(params: T.GetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetResponse<TDocument>, TContext>>
  get<TDocument = unknown, TContext = unknown>(params: T.GetRequest, callback: callbackFn<T.GetResponse<TDocument>, TContext>): TransportRequestCallback
  get<TDocument = unknown, TContext = unknown>(params: T.GetRequest, options: TransportRequestOptions, callback: callbackFn<T.GetResponse<TDocument>, TContext>): TransportRequestCallback
  getScript<TContext = unknown>(params: T.GetScriptRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetScriptResponse, TContext>>
  getScript<TContext = unknown>(params: T.GetScriptRequest, callback: callbackFn<T.GetScriptResponse, TContext>): TransportRequestCallback
  getScript<TContext = unknown>(params: T.GetScriptRequest, options: TransportRequestOptions, callback: callbackFn<T.GetScriptResponse, TContext>): TransportRequestCallback
  getScriptContext<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  getScriptContext<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
  getScriptContext<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  getScriptContext<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  getScriptLanguages<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  getScriptLanguages<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
  getScriptLanguages<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  getScriptLanguages<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  getSource<TDocument = unknown, TContext = unknown>(params: T.SourceRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SourceResponse<TDocument>, TContext>>
  getSource<TDocument = unknown, TContext = unknown>(params: T.SourceRequest, callback: callbackFn<T.SourceResponse<TDocument>, TContext>): TransportRequestCallback
  getSource<TDocument = unknown, TContext = unknown>(params: T.SourceRequest, options: TransportRequestOptions, callback: callbackFn<T.SourceResponse<TDocument>, TContext>): TransportRequestCallback
  graph: {
    explore<TContext = unknown>(params: T.GraphExploreRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GraphExploreResponse, TContext>>
    explore<TContext = unknown>(params: T.GraphExploreRequest, callback: callbackFn<T.GraphExploreResponse, TContext>): TransportRequestCallback
    explore<TContext = unknown>(params: T.GraphExploreRequest, options: TransportRequestOptions, callback: callbackFn<T.GraphExploreResponse, TContext>): TransportRequestCallback
  }
  ilm: {
    deleteLifecycle<TContext = unknown>(params: T.DeleteLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteLifecycleResponse, TContext>>
    deleteLifecycle<TContext = unknown>(params: T.DeleteLifecycleRequest, callback: callbackFn<T.DeleteLifecycleResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TContext = unknown>(params: T.DeleteLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteLifecycleResponse, TContext>): TransportRequestCallback
    explainLifecycle<TContext = unknown>(params: T.ExplainLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExplainLifecycleResponse, TContext>>
    explainLifecycle<TContext = unknown>(params: T.ExplainLifecycleRequest, callback: callbackFn<T.ExplainLifecycleResponse, TContext>): TransportRequestCallback
    explainLifecycle<TContext = unknown>(params: T.ExplainLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.ExplainLifecycleResponse, TContext>): TransportRequestCallback
    getLifecycle<TContext = unknown>(params?: T.GetLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetLifecycleResponse, TContext>>
    getLifecycle<TContext = unknown>(callback: callbackFn<T.GetLifecycleResponse, TContext>): TransportRequestCallback
    getLifecycle<TContext = unknown>(params: T.GetLifecycleRequest, callback: callbackFn<T.GetLifecycleResponse, TContext>): TransportRequestCallback
    getLifecycle<TContext = unknown>(params: T.GetLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.GetLifecycleResponse, TContext>): TransportRequestCallback
    getStatus<TContext = unknown>(params?: T.GetIlmStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetIlmStatusResponse, TContext>>
    getStatus<TContext = unknown>(callback: callbackFn<T.GetIlmStatusResponse, TContext>): TransportRequestCallback
    getStatus<TContext = unknown>(params: T.GetIlmStatusRequest, callback: callbackFn<T.GetIlmStatusResponse, TContext>): TransportRequestCallback
    getStatus<TContext = unknown>(params: T.GetIlmStatusRequest, options: TransportRequestOptions, callback: callbackFn<T.GetIlmStatusResponse, TContext>): TransportRequestCallback
    moveToStep<TContext = unknown>(params: T.MoveToStepRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MoveToStepResponse, TContext>>
    moveToStep<TContext = unknown>(params: T.MoveToStepRequest, callback: callbackFn<T.MoveToStepResponse, TContext>): TransportRequestCallback
    moveToStep<TContext = unknown>(params: T.MoveToStepRequest, options: TransportRequestOptions, callback: callbackFn<T.MoveToStepResponse, TContext>): TransportRequestCallback
    putLifecycle<TContext = unknown>(params?: T.PutLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutLifecycleResponse, TContext>>
    putLifecycle<TContext = unknown>(callback: callbackFn<T.PutLifecycleResponse, TContext>): TransportRequestCallback
    putLifecycle<TContext = unknown>(params: T.PutLifecycleRequest, callback: callbackFn<T.PutLifecycleResponse, TContext>): TransportRequestCallback
    putLifecycle<TContext = unknown>(params: T.PutLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.PutLifecycleResponse, TContext>): TransportRequestCallback
    removePolicy<TContext = unknown>(params: T.RemovePolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RemovePolicyResponse, TContext>>
    removePolicy<TContext = unknown>(params: T.RemovePolicyRequest, callback: callbackFn<T.RemovePolicyResponse, TContext>): TransportRequestCallback
    removePolicy<TContext = unknown>(params: T.RemovePolicyRequest, options: TransportRequestOptions, callback: callbackFn<T.RemovePolicyResponse, TContext>): TransportRequestCallback
    retry<TContext = unknown>(params: T.RetryIlmRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RetryIlmResponse, TContext>>
    retry<TContext = unknown>(params: T.RetryIlmRequest, callback: callbackFn<T.RetryIlmResponse, TContext>): TransportRequestCallback
    retry<TContext = unknown>(params: T.RetryIlmRequest, options: TransportRequestOptions, callback: callbackFn<T.RetryIlmResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params?: T.StartIlmRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartIlmResponse, TContext>>
    start<TContext = unknown>(callback: callbackFn<T.StartIlmResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params: T.StartIlmRequest, callback: callbackFn<T.StartIlmResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params: T.StartIlmRequest, options: TransportRequestOptions, callback: callbackFn<T.StartIlmResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params?: T.StopIlmRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StopIlmResponse, TContext>>
    stop<TContext = unknown>(callback: callbackFn<T.StopIlmResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params: T.StopIlmRequest, callback: callbackFn<T.StopIlmResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params: T.StopIlmRequest, options: TransportRequestOptions, callback: callbackFn<T.StopIlmResponse, TContext>): TransportRequestCallback
  }
  index<TDocument = unknown, TContext = unknown>(params: T.IndexRequest<TDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndexResponse, TContext>>
  index<TDocument = unknown, TContext = unknown>(params: T.IndexRequest<TDocument>, callback: callbackFn<T.IndexResponse, TContext>): TransportRequestCallback
  index<TDocument = unknown, TContext = unknown>(params: T.IndexRequest<TDocument>, options: TransportRequestOptions, callback: callbackFn<T.IndexResponse, TContext>): TransportRequestCallback
  indices: {
    addBlock<TContext = unknown>(params: T.IndexAddBlockRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndexAddBlockResponse, TContext>>
    addBlock<TContext = unknown>(params: T.IndexAddBlockRequest, callback: callbackFn<T.IndexAddBlockResponse, TContext>): TransportRequestCallback
    addBlock<TContext = unknown>(params: T.IndexAddBlockRequest, options: TransportRequestOptions, callback: callbackFn<T.IndexAddBlockResponse, TContext>): TransportRequestCallback
    analyze<TContext = unknown>(params?: T.AnalyzeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AnalyzeResponse, TContext>>
    analyze<TContext = unknown>(callback: callbackFn<T.AnalyzeResponse, TContext>): TransportRequestCallback
    analyze<TContext = unknown>(params: T.AnalyzeRequest, callback: callbackFn<T.AnalyzeResponse, TContext>): TransportRequestCallback
    analyze<TContext = unknown>(params: T.AnalyzeRequest, options: TransportRequestOptions, callback: callbackFn<T.AnalyzeResponse, TContext>): TransportRequestCallback
    clearCache<TContext = unknown>(params?: T.ClearCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClearCacheResponse, TContext>>
    clearCache<TContext = unknown>(callback: callbackFn<T.ClearCacheResponse, TContext>): TransportRequestCallback
    clearCache<TContext = unknown>(params: T.ClearCacheRequest, callback: callbackFn<T.ClearCacheResponse, TContext>): TransportRequestCallback
    clearCache<TContext = unknown>(params: T.ClearCacheRequest, options: TransportRequestOptions, callback: callbackFn<T.ClearCacheResponse, TContext>): TransportRequestCallback
    clone<TContext = unknown>(params: T.CloneIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CloneIndexResponse, TContext>>
    clone<TContext = unknown>(params: T.CloneIndexRequest, callback: callbackFn<T.CloneIndexResponse, TContext>): TransportRequestCallback
    clone<TContext = unknown>(params: T.CloneIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.CloneIndexResponse, TContext>): TransportRequestCallback
    close<TContext = unknown>(params: T.CloseIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CloseIndexResponse, TContext>>
    close<TContext = unknown>(params: T.CloseIndexRequest, callback: callbackFn<T.CloseIndexResponse, TContext>): TransportRequestCallback
    close<TContext = unknown>(params: T.CloseIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.CloseIndexResponse, TContext>): TransportRequestCallback
    create<TContext = unknown>(params: T.CreateIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CreateIndexResponse, TContext>>
    create<TContext = unknown>(params: T.CreateIndexRequest, callback: callbackFn<T.CreateIndexResponse, TContext>): TransportRequestCallback
    create<TContext = unknown>(params: T.CreateIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.CreateIndexResponse, TContext>): TransportRequestCallback
    createDataStream<TContext = unknown>(params: T.IndicesCreateDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesCreateDataStreamResponse, TContext>>
    createDataStream<TContext = unknown>(params: T.IndicesCreateDataStreamRequest, callback: callbackFn<T.IndicesCreateDataStreamResponse, TContext>): TransportRequestCallback
    createDataStream<TContext = unknown>(params: T.IndicesCreateDataStreamRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesCreateDataStreamResponse, TContext>): TransportRequestCallback
    dataStreamsStats<TContext = unknown>(params?: T.IndicesDataStreamsStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDataStreamsStatsResponse, TContext>>
    dataStreamsStats<TContext = unknown>(callback: callbackFn<T.IndicesDataStreamsStatsResponse, TContext>): TransportRequestCallback
    dataStreamsStats<TContext = unknown>(params: T.IndicesDataStreamsStatsRequest, callback: callbackFn<T.IndicesDataStreamsStatsResponse, TContext>): TransportRequestCallback
    dataStreamsStats<TContext = unknown>(params: T.IndicesDataStreamsStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesDataStreamsStatsResponse, TContext>): TransportRequestCallback
    delete<TContext = unknown>(params: T.DeleteIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteIndexResponse, TContext>>
    delete<TContext = unknown>(params: T.DeleteIndexRequest, callback: callbackFn<T.DeleteIndexResponse, TContext>): TransportRequestCallback
    delete<TContext = unknown>(params: T.DeleteIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteIndexResponse, TContext>): TransportRequestCallback
    deleteAlias<TContext = unknown>(params: T.DeleteAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteAliasResponse, TContext>>
    deleteAlias<TContext = unknown>(params: T.DeleteAliasRequest, callback: callbackFn<T.DeleteAliasResponse, TContext>): TransportRequestCallback
    deleteAlias<TContext = unknown>(params: T.DeleteAliasRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteAliasResponse, TContext>): TransportRequestCallback
    deleteDataStream<TContext = unknown>(params: T.IndicesDeleteDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesDeleteDataStreamResponse, TContext>>
    deleteDataStream<TContext = unknown>(params: T.IndicesDeleteDataStreamRequest, callback: callbackFn<T.IndicesDeleteDataStreamResponse, TContext>): TransportRequestCallback
    deleteDataStream<TContext = unknown>(params: T.IndicesDeleteDataStreamRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesDeleteDataStreamResponse, TContext>): TransportRequestCallback
    deleteIndexTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    deleteIndexTemplate<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deleteIndexTemplate<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deleteIndexTemplate<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deleteTemplate<TContext = unknown>(params: T.DeleteIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteIndexTemplateResponse, TContext>>
    deleteTemplate<TContext = unknown>(params: T.DeleteIndexTemplateRequest, callback: callbackFn<T.DeleteIndexTemplateResponse, TContext>): TransportRequestCallback
    deleteTemplate<TContext = unknown>(params: T.DeleteIndexTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteIndexTemplateResponse, TContext>): TransportRequestCallback
    exists<TContext = unknown>(params: T.IndexExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndexExistsResponse, TContext>>
    exists<TContext = unknown>(params: T.IndexExistsRequest, callback: callbackFn<T.IndexExistsResponse, TContext>): TransportRequestCallback
    exists<TContext = unknown>(params: T.IndexExistsRequest, options: TransportRequestOptions, callback: callbackFn<T.IndexExistsResponse, TContext>): TransportRequestCallback
    existsAlias<TContext = unknown>(params: T.AliasExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AliasExistsResponse, TContext>>
    existsAlias<TContext = unknown>(params: T.AliasExistsRequest, callback: callbackFn<T.AliasExistsResponse, TContext>): TransportRequestCallback
    existsAlias<TContext = unknown>(params: T.AliasExistsRequest, options: TransportRequestOptions, callback: callbackFn<T.AliasExistsResponse, TContext>): TransportRequestCallback
    existsIndexTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    existsIndexTemplate<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    existsIndexTemplate<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    existsIndexTemplate<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    existsTemplate<TContext = unknown>(params: T.IndexTemplateExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndexTemplateExistsResponse, TContext>>
    existsTemplate<TContext = unknown>(params: T.IndexTemplateExistsRequest, callback: callbackFn<T.IndexTemplateExistsResponse, TContext>): TransportRequestCallback
    existsTemplate<TContext = unknown>(params: T.IndexTemplateExistsRequest, options: TransportRequestOptions, callback: callbackFn<T.IndexTemplateExistsResponse, TContext>): TransportRequestCallback
    existsType<TContext = unknown>(params: T.TypeExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TypeExistsResponse, TContext>>
    existsType<TContext = unknown>(params: T.TypeExistsRequest, callback: callbackFn<T.TypeExistsResponse, TContext>): TransportRequestCallback
    existsType<TContext = unknown>(params: T.TypeExistsRequest, options: TransportRequestOptions, callback: callbackFn<T.TypeExistsResponse, TContext>): TransportRequestCallback
    flush<TContext = unknown>(params?: T.FlushRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FlushResponse, TContext>>
    flush<TContext = unknown>(callback: callbackFn<T.FlushResponse, TContext>): TransportRequestCallback
    flush<TContext = unknown>(params: T.FlushRequest, callback: callbackFn<T.FlushResponse, TContext>): TransportRequestCallback
    flush<TContext = unknown>(params: T.FlushRequest, options: TransportRequestOptions, callback: callbackFn<T.FlushResponse, TContext>): TransportRequestCallback
    flushSynced<TContext = unknown>(params?: T.SyncedFlushRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SyncedFlushResponse, TContext>>
    flushSynced<TContext = unknown>(callback: callbackFn<T.SyncedFlushResponse, TContext>): TransportRequestCallback
    flushSynced<TContext = unknown>(params: T.SyncedFlushRequest, callback: callbackFn<T.SyncedFlushResponse, TContext>): TransportRequestCallback
    flushSynced<TContext = unknown>(params: T.SyncedFlushRequest, options: TransportRequestOptions, callback: callbackFn<T.SyncedFlushResponse, TContext>): TransportRequestCallback
    forcemerge<TContext = unknown>(params?: T.ForceMergeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ForceMergeResponse, TContext>>
    forcemerge<TContext = unknown>(callback: callbackFn<T.ForceMergeResponse, TContext>): TransportRequestCallback
    forcemerge<TContext = unknown>(params: T.ForceMergeRequest, callback: callbackFn<T.ForceMergeResponse, TContext>): TransportRequestCallback
    forcemerge<TContext = unknown>(params: T.ForceMergeRequest, options: TransportRequestOptions, callback: callbackFn<T.ForceMergeResponse, TContext>): TransportRequestCallback
    freeze<TContext = unknown>(params: T.FreezeIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FreezeIndexResponse, TContext>>
    freeze<TContext = unknown>(params: T.FreezeIndexRequest, callback: callbackFn<T.FreezeIndexResponse, TContext>): TransportRequestCallback
    freeze<TContext = unknown>(params: T.FreezeIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.FreezeIndexResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.GetIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetIndexResponse, TContext>>
    get<TContext = unknown>(params: T.GetIndexRequest, callback: callbackFn<T.GetIndexResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.GetIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.GetIndexResponse, TContext>): TransportRequestCallback
    getAlias<TContext = unknown>(params?: T.GetAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetAliasResponse, TContext>>
    getAlias<TContext = unknown>(callback: callbackFn<T.GetAliasResponse, TContext>): TransportRequestCallback
    getAlias<TContext = unknown>(params: T.GetAliasRequest, callback: callbackFn<T.GetAliasResponse, TContext>): TransportRequestCallback
    getAlias<TContext = unknown>(params: T.GetAliasRequest, options: TransportRequestOptions, callback: callbackFn<T.GetAliasResponse, TContext>): TransportRequestCallback
    getDataStream<TContext = unknown>(params?: T.IndicesGetDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesGetDataStreamResponse, TContext>>
    getDataStream<TContext = unknown>(callback: callbackFn<T.IndicesGetDataStreamResponse, TContext>): TransportRequestCallback
    getDataStream<TContext = unknown>(params: T.IndicesGetDataStreamRequest, callback: callbackFn<T.IndicesGetDataStreamResponse, TContext>): TransportRequestCallback
    getDataStream<TContext = unknown>(params: T.IndicesGetDataStreamRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesGetDataStreamResponse, TContext>): TransportRequestCallback
    getFieldMapping<TContext = unknown>(params: T.GetFieldMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetFieldMappingResponse, TContext>>
    getFieldMapping<TContext = unknown>(params: T.GetFieldMappingRequest, callback: callbackFn<T.GetFieldMappingResponse, TContext>): TransportRequestCallback
    getFieldMapping<TContext = unknown>(params: T.GetFieldMappingRequest, options: TransportRequestOptions, callback: callbackFn<T.GetFieldMappingResponse, TContext>): TransportRequestCallback
    getIndexTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getIndexTemplate<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getIndexTemplate<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getIndexTemplate<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getMapping<TContext = unknown>(params?: T.GetMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetMappingResponse, TContext>>
    getMapping<TContext = unknown>(callback: callbackFn<T.GetMappingResponse, TContext>): TransportRequestCallback
    getMapping<TContext = unknown>(params: T.GetMappingRequest, callback: callbackFn<T.GetMappingResponse, TContext>): TransportRequestCallback
    getMapping<TContext = unknown>(params: T.GetMappingRequest, options: TransportRequestOptions, callback: callbackFn<T.GetMappingResponse, TContext>): TransportRequestCallback
    getSettings<TContext = unknown>(params?: T.GetIndexSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetIndexSettingsResponse, TContext>>
    getSettings<TContext = unknown>(callback: callbackFn<T.GetIndexSettingsResponse, TContext>): TransportRequestCallback
    getSettings<TContext = unknown>(params: T.GetIndexSettingsRequest, callback: callbackFn<T.GetIndexSettingsResponse, TContext>): TransportRequestCallback
    getSettings<TContext = unknown>(params: T.GetIndexSettingsRequest, options: TransportRequestOptions, callback: callbackFn<T.GetIndexSettingsResponse, TContext>): TransportRequestCallback
    getTemplate<TContext = unknown>(params?: T.GetIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetIndexTemplateResponse, TContext>>
    getTemplate<TContext = unknown>(callback: callbackFn<T.GetIndexTemplateResponse, TContext>): TransportRequestCallback
    getTemplate<TContext = unknown>(params: T.GetIndexTemplateRequest, callback: callbackFn<T.GetIndexTemplateResponse, TContext>): TransportRequestCallback
    getTemplate<TContext = unknown>(params: T.GetIndexTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.GetIndexTemplateResponse, TContext>): TransportRequestCallback
    getUpgrade<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getUpgrade<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getUpgrade<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getUpgrade<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    migrateToDataStream<TContext = unknown>(params: T.IndicesMigrateToDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesMigrateToDataStreamResponse, TContext>>
    migrateToDataStream<TContext = unknown>(params: T.IndicesMigrateToDataStreamRequest, callback: callbackFn<T.IndicesMigrateToDataStreamResponse, TContext>): TransportRequestCallback
    migrateToDataStream<TContext = unknown>(params: T.IndicesMigrateToDataStreamRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesMigrateToDataStreamResponse, TContext>): TransportRequestCallback
    open<TContext = unknown>(params: T.OpenIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.OpenIndexResponse, TContext>>
    open<TContext = unknown>(params: T.OpenIndexRequest, callback: callbackFn<T.OpenIndexResponse, TContext>): TransportRequestCallback
    open<TContext = unknown>(params: T.OpenIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.OpenIndexResponse, TContext>): TransportRequestCallback
    promoteDataStream<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    promoteDataStream<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    promoteDataStream<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    promoteDataStream<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putAlias<TContext = unknown>(params: T.PutAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutAliasResponse, TContext>>
    putAlias<TContext = unknown>(params: T.PutAliasRequest, callback: callbackFn<T.PutAliasResponse, TContext>): TransportRequestCallback
    putAlias<TContext = unknown>(params: T.PutAliasRequest, options: TransportRequestOptions, callback: callbackFn<T.PutAliasResponse, TContext>): TransportRequestCallback
    putIndexTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putIndexTemplate<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putIndexTemplate<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putIndexTemplate<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putMapping<TContext = unknown>(params?: T.PutMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutMappingResponse, TContext>>
    putMapping<TContext = unknown>(callback: callbackFn<T.PutMappingResponse, TContext>): TransportRequestCallback
    putMapping<TContext = unknown>(params: T.PutMappingRequest, callback: callbackFn<T.PutMappingResponse, TContext>): TransportRequestCallback
    putMapping<TContext = unknown>(params: T.PutMappingRequest, options: TransportRequestOptions, callback: callbackFn<T.PutMappingResponse, TContext>): TransportRequestCallback
    putSettings<TContext = unknown>(params?: T.UpdateIndexSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateIndexSettingsResponse, TContext>>
    putSettings<TContext = unknown>(callback: callbackFn<T.UpdateIndexSettingsResponse, TContext>): TransportRequestCallback
    putSettings<TContext = unknown>(params: T.UpdateIndexSettingsRequest, callback: callbackFn<T.UpdateIndexSettingsResponse, TContext>): TransportRequestCallback
    putSettings<TContext = unknown>(params: T.UpdateIndexSettingsRequest, options: TransportRequestOptions, callback: callbackFn<T.UpdateIndexSettingsResponse, TContext>): TransportRequestCallback
    putTemplate<TContext = unknown>(params: T.PutIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutIndexTemplateResponse, TContext>>
    putTemplate<TContext = unknown>(params: T.PutIndexTemplateRequest, callback: callbackFn<T.PutIndexTemplateResponse, TContext>): TransportRequestCallback
    putTemplate<TContext = unknown>(params: T.PutIndexTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.PutIndexTemplateResponse, TContext>): TransportRequestCallback
    recovery<TContext = unknown>(params?: T.RecoveryStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RecoveryStatusResponse, TContext>>
    recovery<TContext = unknown>(callback: callbackFn<T.RecoveryStatusResponse, TContext>): TransportRequestCallback
    recovery<TContext = unknown>(params: T.RecoveryStatusRequest, callback: callbackFn<T.RecoveryStatusResponse, TContext>): TransportRequestCallback
    recovery<TContext = unknown>(params: T.RecoveryStatusRequest, options: TransportRequestOptions, callback: callbackFn<T.RecoveryStatusResponse, TContext>): TransportRequestCallback
    refresh<TContext = unknown>(params?: T.RefreshRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RefreshResponse, TContext>>
    refresh<TContext = unknown>(callback: callbackFn<T.RefreshResponse, TContext>): TransportRequestCallback
    refresh<TContext = unknown>(params: T.RefreshRequest, callback: callbackFn<T.RefreshResponse, TContext>): TransportRequestCallback
    refresh<TContext = unknown>(params: T.RefreshRequest, options: TransportRequestOptions, callback: callbackFn<T.RefreshResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TContext = unknown>(params: T.ReloadSearchAnalyzersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ReloadSearchAnalyzersResponse, TContext>>
    reloadSearchAnalyzers<TContext = unknown>(params: T.ReloadSearchAnalyzersRequest, callback: callbackFn<T.ReloadSearchAnalyzersResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TContext = unknown>(params: T.ReloadSearchAnalyzersRequest, options: TransportRequestOptions, callback: callbackFn<T.ReloadSearchAnalyzersResponse, TContext>): TransportRequestCallback
    resolveIndex<TContext = unknown>(params: T.ResolveIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ResolveIndexResponse, TContext>>
    resolveIndex<TContext = unknown>(params: T.ResolveIndexRequest, callback: callbackFn<T.ResolveIndexResponse, TContext>): TransportRequestCallback
    resolveIndex<TContext = unknown>(params: T.ResolveIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.ResolveIndexResponse, TContext>): TransportRequestCallback
    rollover<TContext = unknown>(params: T.RolloverIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RolloverIndexResponse, TContext>>
    rollover<TContext = unknown>(params: T.RolloverIndexRequest, callback: callbackFn<T.RolloverIndexResponse, TContext>): TransportRequestCallback
    rollover<TContext = unknown>(params: T.RolloverIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.RolloverIndexResponse, TContext>): TransportRequestCallback
    segments<TContext = unknown>(params?: T.SegmentsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SegmentsResponse, TContext>>
    segments<TContext = unknown>(callback: callbackFn<T.SegmentsResponse, TContext>): TransportRequestCallback
    segments<TContext = unknown>(params: T.SegmentsRequest, callback: callbackFn<T.SegmentsResponse, TContext>): TransportRequestCallback
    segments<TContext = unknown>(params: T.SegmentsRequest, options: TransportRequestOptions, callback: callbackFn<T.SegmentsResponse, TContext>): TransportRequestCallback
    shardStores<TContext = unknown>(params?: T.IndicesShardStoresRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesShardStoresResponse, TContext>>
    shardStores<TContext = unknown>(callback: callbackFn<T.IndicesShardStoresResponse, TContext>): TransportRequestCallback
    shardStores<TContext = unknown>(params: T.IndicesShardStoresRequest, callback: callbackFn<T.IndicesShardStoresResponse, TContext>): TransportRequestCallback
    shardStores<TContext = unknown>(params: T.IndicesShardStoresRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesShardStoresResponse, TContext>): TransportRequestCallback
    shrink<TContext = unknown>(params: T.ShrinkIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ShrinkIndexResponse, TContext>>
    shrink<TContext = unknown>(params: T.ShrinkIndexRequest, callback: callbackFn<T.ShrinkIndexResponse, TContext>): TransportRequestCallback
    shrink<TContext = unknown>(params: T.ShrinkIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.ShrinkIndexResponse, TContext>): TransportRequestCallback
    simulateIndexTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    simulateIndexTemplate<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    simulateIndexTemplate<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    simulateIndexTemplate<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    simulateTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    simulateTemplate<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    simulateTemplate<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    simulateTemplate<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    split<TContext = unknown>(params: T.SplitIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SplitIndexResponse, TContext>>
    split<TContext = unknown>(params: T.SplitIndexRequest, callback: callbackFn<T.SplitIndexResponse, TContext>): TransportRequestCallback
    split<TContext = unknown>(params: T.SplitIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.SplitIndexResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params?: T.IndicesStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.IndicesStatsResponse, TContext>>
    stats<TContext = unknown>(callback: callbackFn<T.IndicesStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.IndicesStatsRequest, callback: callbackFn<T.IndicesStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.IndicesStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.IndicesStatsResponse, TContext>): TransportRequestCallback
    unfreeze<TContext = unknown>(params: T.UnfreezeIndexRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UnfreezeIndexResponse, TContext>>
    unfreeze<TContext = unknown>(params: T.UnfreezeIndexRequest, callback: callbackFn<T.UnfreezeIndexResponse, TContext>): TransportRequestCallback
    unfreeze<TContext = unknown>(params: T.UnfreezeIndexRequest, options: TransportRequestOptions, callback: callbackFn<T.UnfreezeIndexResponse, TContext>): TransportRequestCallback
    updateAliases<TContext = unknown>(params?: T.BulkAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.BulkAliasResponse, TContext>>
    updateAliases<TContext = unknown>(callback: callbackFn<T.BulkAliasResponse, TContext>): TransportRequestCallback
    updateAliases<TContext = unknown>(params: T.BulkAliasRequest, callback: callbackFn<T.BulkAliasResponse, TContext>): TransportRequestCallback
    updateAliases<TContext = unknown>(params: T.BulkAliasRequest, options: TransportRequestOptions, callback: callbackFn<T.BulkAliasResponse, TContext>): TransportRequestCallback
    upgrade<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    upgrade<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    upgrade<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    upgrade<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    validateQuery<TContext = unknown>(params?: T.ValidateQueryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ValidateQueryResponse, TContext>>
    validateQuery<TContext = unknown>(callback: callbackFn<T.ValidateQueryResponse, TContext>): TransportRequestCallback
    validateQuery<TContext = unknown>(params: T.ValidateQueryRequest, callback: callbackFn<T.ValidateQueryResponse, TContext>): TransportRequestCallback
    validateQuery<TContext = unknown>(params: T.ValidateQueryRequest, options: TransportRequestOptions, callback: callbackFn<T.ValidateQueryResponse, TContext>): TransportRequestCallback
  }
  info<TContext = unknown>(params?: T.RootNodeInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RootNodeInfoResponse, TContext>>
  info<TContext = unknown>(callback: callbackFn<T.RootNodeInfoResponse, TContext>): TransportRequestCallback
  info<TContext = unknown>(params: T.RootNodeInfoRequest, callback: callbackFn<T.RootNodeInfoResponse, TContext>): TransportRequestCallback
  info<TContext = unknown>(params: T.RootNodeInfoRequest, options: TransportRequestOptions, callback: callbackFn<T.RootNodeInfoResponse, TContext>): TransportRequestCallback
  ingest: {
    deletePipeline<TContext = unknown>(params: T.DeletePipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeletePipelineResponse, TContext>>
    deletePipeline<TContext = unknown>(params: T.DeletePipelineRequest, callback: callbackFn<T.DeletePipelineResponse, TContext>): TransportRequestCallback
    deletePipeline<TContext = unknown>(params: T.DeletePipelineRequest, options: TransportRequestOptions, callback: callbackFn<T.DeletePipelineResponse, TContext>): TransportRequestCallback
    geoIpStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    geoIpStats<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    geoIpStats<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    geoIpStats<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getPipeline<TContext = unknown>(params?: T.GetPipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetPipelineResponse, TContext>>
    getPipeline<TContext = unknown>(callback: callbackFn<T.GetPipelineResponse, TContext>): TransportRequestCallback
    getPipeline<TContext = unknown>(params: T.GetPipelineRequest, callback: callbackFn<T.GetPipelineResponse, TContext>): TransportRequestCallback
    getPipeline<TContext = unknown>(params: T.GetPipelineRequest, options: TransportRequestOptions, callback: callbackFn<T.GetPipelineResponse, TContext>): TransportRequestCallback
    processorGrok<TContext = unknown>(params?: T.GrokProcessorPatternsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GrokProcessorPatternsResponse, TContext>>
    processorGrok<TContext = unknown>(callback: callbackFn<T.GrokProcessorPatternsResponse, TContext>): TransportRequestCallback
    processorGrok<TContext = unknown>(params: T.GrokProcessorPatternsRequest, callback: callbackFn<T.GrokProcessorPatternsResponse, TContext>): TransportRequestCallback
    processorGrok<TContext = unknown>(params: T.GrokProcessorPatternsRequest, options: TransportRequestOptions, callback: callbackFn<T.GrokProcessorPatternsResponse, TContext>): TransportRequestCallback
    putPipeline<TContext = unknown>(params: T.PutPipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutPipelineResponse, TContext>>
    putPipeline<TContext = unknown>(params: T.PutPipelineRequest, callback: callbackFn<T.PutPipelineResponse, TContext>): TransportRequestCallback
    putPipeline<TContext = unknown>(params: T.PutPipelineRequest, options: TransportRequestOptions, callback: callbackFn<T.PutPipelineResponse, TContext>): TransportRequestCallback
    simulate<TContext = unknown>(params?: T.SimulatePipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SimulatePipelineResponse, TContext>>
    simulate<TContext = unknown>(callback: callbackFn<T.SimulatePipelineResponse, TContext>): TransportRequestCallback
    simulate<TContext = unknown>(params: T.SimulatePipelineRequest, callback: callbackFn<T.SimulatePipelineResponse, TContext>): TransportRequestCallback
    simulate<TContext = unknown>(params: T.SimulatePipelineRequest, options: TransportRequestOptions, callback: callbackFn<T.SimulatePipelineResponse, TContext>): TransportRequestCallback
  }
  license: {
    delete<TContext = unknown>(params?: T.DeleteLicenseRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteLicenseResponse, TContext>>
    delete<TContext = unknown>(callback: callbackFn<T.DeleteLicenseResponse, TContext>): TransportRequestCallback
    delete<TContext = unknown>(params: T.DeleteLicenseRequest, callback: callbackFn<T.DeleteLicenseResponse, TContext>): TransportRequestCallback
    delete<TContext = unknown>(params: T.DeleteLicenseRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteLicenseResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params?: T.GetLicenseRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetLicenseResponse, TContext>>
    get<TContext = unknown>(callback: callbackFn<T.GetLicenseResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.GetLicenseRequest, callback: callbackFn<T.GetLicenseResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.GetLicenseRequest, options: TransportRequestOptions, callback: callbackFn<T.GetLicenseResponse, TContext>): TransportRequestCallback
    getBasicStatus<TContext = unknown>(params?: T.GetBasicLicenseStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetBasicLicenseStatusResponse, TContext>>
    getBasicStatus<TContext = unknown>(callback: callbackFn<T.GetBasicLicenseStatusResponse, TContext>): TransportRequestCallback
    getBasicStatus<TContext = unknown>(params: T.GetBasicLicenseStatusRequest, callback: callbackFn<T.GetBasicLicenseStatusResponse, TContext>): TransportRequestCallback
    getBasicStatus<TContext = unknown>(params: T.GetBasicLicenseStatusRequest, options: TransportRequestOptions, callback: callbackFn<T.GetBasicLicenseStatusResponse, TContext>): TransportRequestCallback
    getTrialStatus<TContext = unknown>(params?: T.GetTrialLicenseStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetTrialLicenseStatusResponse, TContext>>
    getTrialStatus<TContext = unknown>(callback: callbackFn<T.GetTrialLicenseStatusResponse, TContext>): TransportRequestCallback
    getTrialStatus<TContext = unknown>(params: T.GetTrialLicenseStatusRequest, callback: callbackFn<T.GetTrialLicenseStatusResponse, TContext>): TransportRequestCallback
    getTrialStatus<TContext = unknown>(params: T.GetTrialLicenseStatusRequest, options: TransportRequestOptions, callback: callbackFn<T.GetTrialLicenseStatusResponse, TContext>): TransportRequestCallback
    post<TContext = unknown>(params?: T.PostLicenseRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PostLicenseResponse, TContext>>
    post<TContext = unknown>(callback: callbackFn<T.PostLicenseResponse, TContext>): TransportRequestCallback
    post<TContext = unknown>(params: T.PostLicenseRequest, callback: callbackFn<T.PostLicenseResponse, TContext>): TransportRequestCallback
    post<TContext = unknown>(params: T.PostLicenseRequest, options: TransportRequestOptions, callback: callbackFn<T.PostLicenseResponse, TContext>): TransportRequestCallback
    postStartBasic<TContext = unknown>(params?: T.StartBasicLicenseRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartBasicLicenseResponse, TContext>>
    postStartBasic<TContext = unknown>(callback: callbackFn<T.StartBasicLicenseResponse, TContext>): TransportRequestCallback
    postStartBasic<TContext = unknown>(params: T.StartBasicLicenseRequest, callback: callbackFn<T.StartBasicLicenseResponse, TContext>): TransportRequestCallback
    postStartBasic<TContext = unknown>(params: T.StartBasicLicenseRequest, options: TransportRequestOptions, callback: callbackFn<T.StartBasicLicenseResponse, TContext>): TransportRequestCallback
    postStartTrial<TContext = unknown>(params?: T.StartTrialLicenseRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartTrialLicenseResponse, TContext>>
    postStartTrial<TContext = unknown>(callback: callbackFn<T.StartTrialLicenseResponse, TContext>): TransportRequestCallback
    postStartTrial<TContext = unknown>(params: T.StartTrialLicenseRequest, callback: callbackFn<T.StartTrialLicenseResponse, TContext>): TransportRequestCallback
    postStartTrial<TContext = unknown>(params: T.StartTrialLicenseRequest, options: TransportRequestOptions, callback: callbackFn<T.StartTrialLicenseResponse, TContext>): TransportRequestCallback
  }
  logstash: {
    deletePipeline<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    deletePipeline<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deletePipeline<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deletePipeline<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getPipeline<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getPipeline<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getPipeline<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getPipeline<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putPipeline<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putPipeline<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putPipeline<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putPipeline<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  }
  mget<TDocument = unknown, TContext = unknown>(params?: T.MultiGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MultiGetResponse<TDocument>, TContext>>
  mget<TDocument = unknown, TContext = unknown>(callback: callbackFn<T.MultiGetResponse<TDocument>, TContext>): TransportRequestCallback
  mget<TDocument = unknown, TContext = unknown>(params: T.MultiGetRequest, callback: callbackFn<T.MultiGetResponse<TDocument>, TContext>): TransportRequestCallback
  mget<TDocument = unknown, TContext = unknown>(params: T.MultiGetRequest, options: TransportRequestOptions, callback: callbackFn<T.MultiGetResponse<TDocument>, TContext>): TransportRequestCallback
  migration: {
    deprecations<TContext = unknown>(params?: T.DeprecationInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeprecationInfoResponse, TContext>>
    deprecations<TContext = unknown>(callback: callbackFn<T.DeprecationInfoResponse, TContext>): TransportRequestCallback
    deprecations<TContext = unknown>(params: T.DeprecationInfoRequest, callback: callbackFn<T.DeprecationInfoResponse, TContext>): TransportRequestCallback
    deprecations<TContext = unknown>(params: T.DeprecationInfoRequest, options: TransportRequestOptions, callback: callbackFn<T.DeprecationInfoResponse, TContext>): TransportRequestCallback
  }
  ml: {
    closeJob<TContext = unknown>(params: T.CloseJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CloseJobResponse, TContext>>
    closeJob<TContext = unknown>(params: T.CloseJobRequest, callback: callbackFn<T.CloseJobResponse, TContext>): TransportRequestCallback
    closeJob<TContext = unknown>(params: T.CloseJobRequest, options: TransportRequestOptions, callback: callbackFn<T.CloseJobResponse, TContext>): TransportRequestCallback
    deleteCalendar<TContext = unknown>(params: T.DeleteCalendarRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteCalendarResponse, TContext>>
    deleteCalendar<TContext = unknown>(params: T.DeleteCalendarRequest, callback: callbackFn<T.DeleteCalendarResponse, TContext>): TransportRequestCallback
    deleteCalendar<TContext = unknown>(params: T.DeleteCalendarRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteCalendarResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TContext = unknown>(params: T.DeleteCalendarEventRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteCalendarEventResponse, TContext>>
    deleteCalendarEvent<TContext = unknown>(params: T.DeleteCalendarEventRequest, callback: callbackFn<T.DeleteCalendarEventResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TContext = unknown>(params: T.DeleteCalendarEventRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteCalendarEventResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TContext = unknown>(params: T.DeleteCalendarJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteCalendarJobResponse, TContext>>
    deleteCalendarJob<TContext = unknown>(params: T.DeleteCalendarJobRequest, callback: callbackFn<T.DeleteCalendarJobResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TContext = unknown>(params: T.DeleteCalendarJobRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteCalendarJobResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TContext = unknown>(params: T.DeleteDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteDataFrameAnalyticsResponse, TContext>>
    deleteDataFrameAnalytics<TContext = unknown>(params: T.DeleteDataFrameAnalyticsRequest, callback: callbackFn<T.DeleteDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TContext = unknown>(params: T.DeleteDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteDataFrameAnalyticsResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TContext = unknown>(params: T.DeleteDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteDatafeedResponse, TContext>>
    deleteDatafeed<TContext = unknown>(params: T.DeleteDatafeedRequest, callback: callbackFn<T.DeleteDatafeedResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TContext = unknown>(params: T.DeleteDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteDatafeedResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TContext = unknown>(params?: T.DeleteExpiredDataRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteExpiredDataResponse, TContext>>
    deleteExpiredData<TContext = unknown>(callback: callbackFn<T.DeleteExpiredDataResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TContext = unknown>(params: T.DeleteExpiredDataRequest, callback: callbackFn<T.DeleteExpiredDataResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TContext = unknown>(params: T.DeleteExpiredDataRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteExpiredDataResponse, TContext>): TransportRequestCallback
    deleteFilter<TContext = unknown>(params: T.DeleteFilterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteFilterResponse, TContext>>
    deleteFilter<TContext = unknown>(params: T.DeleteFilterRequest, callback: callbackFn<T.DeleteFilterResponse, TContext>): TransportRequestCallback
    deleteFilter<TContext = unknown>(params: T.DeleteFilterRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteFilterResponse, TContext>): TransportRequestCallback
    deleteForecast<TContext = unknown>(params: T.DeleteForecastRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteForecastResponse, TContext>>
    deleteForecast<TContext = unknown>(params: T.DeleteForecastRequest, callback: callbackFn<T.DeleteForecastResponse, TContext>): TransportRequestCallback
    deleteForecast<TContext = unknown>(params: T.DeleteForecastRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteForecastResponse, TContext>): TransportRequestCallback
    deleteJob<TContext = unknown>(params: T.DeleteJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteJobResponse, TContext>>
    deleteJob<TContext = unknown>(params: T.DeleteJobRequest, callback: callbackFn<T.DeleteJobResponse, TContext>): TransportRequestCallback
    deleteJob<TContext = unknown>(params: T.DeleteJobRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteJobResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TContext = unknown>(params: T.DeleteModelSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteModelSnapshotResponse, TContext>>
    deleteModelSnapshot<TContext = unknown>(params: T.DeleteModelSnapshotRequest, callback: callbackFn<T.DeleteModelSnapshotResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TContext = unknown>(params: T.DeleteModelSnapshotRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteModelSnapshotResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TContext = unknown>(params: T.DeleteTrainedModelRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteTrainedModelResponse, TContext>>
    deleteTrainedModel<TContext = unknown>(params: T.DeleteTrainedModelRequest, callback: callbackFn<T.DeleteTrainedModelResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TContext = unknown>(params: T.DeleteTrainedModelRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteTrainedModelResponse, TContext>): TransportRequestCallback
    deleteTrainedModelAlias<TContext = unknown>(params: T.DeleteTrainedModelAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteTrainedModelAliasResponse, TContext>>
    deleteTrainedModelAlias<TContext = unknown>(params: T.DeleteTrainedModelAliasRequest, callback: callbackFn<T.DeleteTrainedModelAliasResponse, TContext>): TransportRequestCallback
    deleteTrainedModelAlias<TContext = unknown>(params: T.DeleteTrainedModelAliasRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteTrainedModelAliasResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TContext = unknown>(params?: T.EstimateModelMemoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EstimateModelMemoryResponse, TContext>>
    estimateModelMemory<TContext = unknown>(callback: callbackFn<T.EstimateModelMemoryResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TContext = unknown>(params: T.EstimateModelMemoryRequest, callback: callbackFn<T.EstimateModelMemoryResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TContext = unknown>(params: T.EstimateModelMemoryRequest, options: TransportRequestOptions, callback: callbackFn<T.EstimateModelMemoryResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    evaluateDataFrame<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    evaluateDataFrame<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    evaluateDataFrame<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    explainDataFrameAnalytics<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    findFileStructure<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    findFileStructure<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    findFileStructure<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    findFileStructure<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    flushJob<TContext = unknown>(params: T.FlushJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FlushJobResponse, TContext>>
    flushJob<TContext = unknown>(params: T.FlushJobRequest, callback: callbackFn<T.FlushJobResponse, TContext>): TransportRequestCallback
    flushJob<TContext = unknown>(params: T.FlushJobRequest, options: TransportRequestOptions, callback: callbackFn<T.FlushJobResponse, TContext>): TransportRequestCallback
    forecast<TContext = unknown>(params: T.ForecastJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ForecastJobResponse, TContext>>
    forecast<TContext = unknown>(params: T.ForecastJobRequest, callback: callbackFn<T.ForecastJobResponse, TContext>): TransportRequestCallback
    forecast<TContext = unknown>(params: T.ForecastJobRequest, options: TransportRequestOptions, callback: callbackFn<T.ForecastJobResponse, TContext>): TransportRequestCallback
    getBuckets<TContext = unknown>(params: T.GetBucketsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetBucketsResponse, TContext>>
    getBuckets<TContext = unknown>(params: T.GetBucketsRequest, callback: callbackFn<T.GetBucketsResponse, TContext>): TransportRequestCallback
    getBuckets<TContext = unknown>(params: T.GetBucketsRequest, options: TransportRequestOptions, callback: callbackFn<T.GetBucketsResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TContext = unknown>(params: T.GetCalendarEventsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetCalendarEventsResponse, TContext>>
    getCalendarEvents<TContext = unknown>(params: T.GetCalendarEventsRequest, callback: callbackFn<T.GetCalendarEventsResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TContext = unknown>(params: T.GetCalendarEventsRequest, options: TransportRequestOptions, callback: callbackFn<T.GetCalendarEventsResponse, TContext>): TransportRequestCallback
    getCalendars<TContext = unknown>(params?: T.GetCalendarsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetCalendarsResponse, TContext>>
    getCalendars<TContext = unknown>(callback: callbackFn<T.GetCalendarsResponse, TContext>): TransportRequestCallback
    getCalendars<TContext = unknown>(params: T.GetCalendarsRequest, callback: callbackFn<T.GetCalendarsResponse, TContext>): TransportRequestCallback
    getCalendars<TContext = unknown>(params: T.GetCalendarsRequest, options: TransportRequestOptions, callback: callbackFn<T.GetCalendarsResponse, TContext>): TransportRequestCallback
    getCategories<TContext = unknown>(params: T.GetCategoriesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetCategoriesResponse, TContext>>
    getCategories<TContext = unknown>(params: T.GetCategoriesRequest, callback: callbackFn<T.GetCategoriesResponse, TContext>): TransportRequestCallback
    getCategories<TContext = unknown>(params: T.GetCategoriesRequest, options: TransportRequestOptions, callback: callbackFn<T.GetCategoriesResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getDataFrameAnalytics<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getDataFrameAnalyticsStats<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getDatafeedStats<TContext = unknown>(params?: T.GetDatafeedStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetDatafeedStatsResponse, TContext>>
    getDatafeedStats<TContext = unknown>(callback: callbackFn<T.GetDatafeedStatsResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TContext = unknown>(params: T.GetDatafeedStatsRequest, callback: callbackFn<T.GetDatafeedStatsResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TContext = unknown>(params: T.GetDatafeedStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.GetDatafeedStatsResponse, TContext>): TransportRequestCallback
    getDatafeeds<TContext = unknown>(params?: T.GetDatafeedsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetDatafeedsResponse, TContext>>
    getDatafeeds<TContext = unknown>(callback: callbackFn<T.GetDatafeedsResponse, TContext>): TransportRequestCallback
    getDatafeeds<TContext = unknown>(params: T.GetDatafeedsRequest, callback: callbackFn<T.GetDatafeedsResponse, TContext>): TransportRequestCallback
    getDatafeeds<TContext = unknown>(params: T.GetDatafeedsRequest, options: TransportRequestOptions, callback: callbackFn<T.GetDatafeedsResponse, TContext>): TransportRequestCallback
    getFilters<TContext = unknown>(params?: T.GetFiltersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetFiltersResponse, TContext>>
    getFilters<TContext = unknown>(callback: callbackFn<T.GetFiltersResponse, TContext>): TransportRequestCallback
    getFilters<TContext = unknown>(params: T.GetFiltersRequest, callback: callbackFn<T.GetFiltersResponse, TContext>): TransportRequestCallback
    getFilters<TContext = unknown>(params: T.GetFiltersRequest, options: TransportRequestOptions, callback: callbackFn<T.GetFiltersResponse, TContext>): TransportRequestCallback
    getInfluencers<TContext = unknown>(params: T.GetInfluencersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetInfluencersResponse, TContext>>
    getInfluencers<TContext = unknown>(params: T.GetInfluencersRequest, callback: callbackFn<T.GetInfluencersResponse, TContext>): TransportRequestCallback
    getInfluencers<TContext = unknown>(params: T.GetInfluencersRequest, options: TransportRequestOptions, callback: callbackFn<T.GetInfluencersResponse, TContext>): TransportRequestCallback
    getJobStats<TContext = unknown>(params?: T.GetJobStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetJobStatsResponse, TContext>>
    getJobStats<TContext = unknown>(callback: callbackFn<T.GetJobStatsResponse, TContext>): TransportRequestCallback
    getJobStats<TContext = unknown>(params: T.GetJobStatsRequest, callback: callbackFn<T.GetJobStatsResponse, TContext>): TransportRequestCallback
    getJobStats<TContext = unknown>(params: T.GetJobStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.GetJobStatsResponse, TContext>): TransportRequestCallback
    getJobs<TContext = unknown>(params?: T.GetJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetJobsResponse, TContext>>
    getJobs<TContext = unknown>(callback: callbackFn<T.GetJobsResponse, TContext>): TransportRequestCallback
    getJobs<TContext = unknown>(params: T.GetJobsRequest, callback: callbackFn<T.GetJobsResponse, TContext>): TransportRequestCallback
    getJobs<TContext = unknown>(params: T.GetJobsRequest, options: TransportRequestOptions, callback: callbackFn<T.GetJobsResponse, TContext>): TransportRequestCallback
    getModelSnapshots<TContext = unknown>(params: T.GetModelSnapshotsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetModelSnapshotsResponse, TContext>>
    getModelSnapshots<TContext = unknown>(params: T.GetModelSnapshotsRequest, callback: callbackFn<T.GetModelSnapshotsResponse, TContext>): TransportRequestCallback
    getModelSnapshots<TContext = unknown>(params: T.GetModelSnapshotsRequest, options: TransportRequestOptions, callback: callbackFn<T.GetModelSnapshotsResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TContext = unknown>(params: T.GetOverallBucketsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetOverallBucketsResponse, TContext>>
    getOverallBuckets<TContext = unknown>(params: T.GetOverallBucketsRequest, callback: callbackFn<T.GetOverallBucketsResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TContext = unknown>(params: T.GetOverallBucketsRequest, options: TransportRequestOptions, callback: callbackFn<T.GetOverallBucketsResponse, TContext>): TransportRequestCallback
    getRecords<TContext = unknown>(params: T.GetAnomalyRecordsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetAnomalyRecordsResponse, TContext>>
    getRecords<TContext = unknown>(params: T.GetAnomalyRecordsRequest, callback: callbackFn<T.GetAnomalyRecordsResponse, TContext>): TransportRequestCallback
    getRecords<TContext = unknown>(params: T.GetAnomalyRecordsRequest, options: TransportRequestOptions, callback: callbackFn<T.GetAnomalyRecordsResponse, TContext>): TransportRequestCallback
    getTrainedModels<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getTrainedModels<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getTrainedModels<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getTrainedModels<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getTrainedModelsStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getTrainedModelsStats<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getTrainedModelsStats<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getTrainedModelsStats<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    info<TContext = unknown>(params?: T.MachineLearningInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MachineLearningInfoResponse, TContext>>
    info<TContext = unknown>(callback: callbackFn<T.MachineLearningInfoResponse, TContext>): TransportRequestCallback
    info<TContext = unknown>(params: T.MachineLearningInfoRequest, callback: callbackFn<T.MachineLearningInfoResponse, TContext>): TransportRequestCallback
    info<TContext = unknown>(params: T.MachineLearningInfoRequest, options: TransportRequestOptions, callback: callbackFn<T.MachineLearningInfoResponse, TContext>): TransportRequestCallback
    openJob<TContext = unknown>(params: T.OpenJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.OpenJobResponse, TContext>>
    openJob<TContext = unknown>(params: T.OpenJobRequest, callback: callbackFn<T.OpenJobResponse, TContext>): TransportRequestCallback
    openJob<TContext = unknown>(params: T.OpenJobRequest, options: TransportRequestOptions, callback: callbackFn<T.OpenJobResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TContext = unknown>(params: T.PostCalendarEventsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PostCalendarEventsResponse, TContext>>
    postCalendarEvents<TContext = unknown>(params: T.PostCalendarEventsRequest, callback: callbackFn<T.PostCalendarEventsResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TContext = unknown>(params: T.PostCalendarEventsRequest, options: TransportRequestOptions, callback: callbackFn<T.PostCalendarEventsResponse, TContext>): TransportRequestCallback
    postData<TContext = unknown>(params: T.PostJobDataRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PostJobDataResponse, TContext>>
    postData<TContext = unknown>(params: T.PostJobDataRequest, callback: callbackFn<T.PostJobDataResponse, TContext>): TransportRequestCallback
    postData<TContext = unknown>(params: T.PostJobDataRequest, options: TransportRequestOptions, callback: callbackFn<T.PostJobDataResponse, TContext>): TransportRequestCallback
    previewDataFrameAnalytics<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    previewDataFrameAnalytics<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    previewDataFrameAnalytics<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    previewDataFrameAnalytics<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    previewDatafeed<TDocument = unknown, TContext = unknown>(params: T.PreviewDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PreviewDatafeedResponse<TDocument>, TContext>>
    previewDatafeed<TDocument = unknown, TContext = unknown>(params: T.PreviewDatafeedRequest, callback: callbackFn<T.PreviewDatafeedResponse<TDocument>, TContext>): TransportRequestCallback
    previewDatafeed<TDocument = unknown, TContext = unknown>(params: T.PreviewDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<T.PreviewDatafeedResponse<TDocument>, TContext>): TransportRequestCallback
    putCalendar<TContext = unknown>(params: T.PutCalendarRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutCalendarResponse, TContext>>
    putCalendar<TContext = unknown>(params: T.PutCalendarRequest, callback: callbackFn<T.PutCalendarResponse, TContext>): TransportRequestCallback
    putCalendar<TContext = unknown>(params: T.PutCalendarRequest, options: TransportRequestOptions, callback: callbackFn<T.PutCalendarResponse, TContext>): TransportRequestCallback
    putCalendarJob<TContext = unknown>(params: T.PutCalendarJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutCalendarJobResponse, TContext>>
    putCalendarJob<TContext = unknown>(params: T.PutCalendarJobRequest, callback: callbackFn<T.PutCalendarJobResponse, TContext>): TransportRequestCallback
    putCalendarJob<TContext = unknown>(params: T.PutCalendarJobRequest, options: TransportRequestOptions, callback: callbackFn<T.PutCalendarJobResponse, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putDataFrameAnalytics<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putDatafeed<TContext = unknown>(params: T.PutDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutDatafeedResponse, TContext>>
    putDatafeed<TContext = unknown>(params: T.PutDatafeedRequest, callback: callbackFn<T.PutDatafeedResponse, TContext>): TransportRequestCallback
    putDatafeed<TContext = unknown>(params: T.PutDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<T.PutDatafeedResponse, TContext>): TransportRequestCallback
    putFilter<TContext = unknown>(params: T.PutFilterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutFilterResponse, TContext>>
    putFilter<TContext = unknown>(params: T.PutFilterRequest, callback: callbackFn<T.PutFilterResponse, TContext>): TransportRequestCallback
    putFilter<TContext = unknown>(params: T.PutFilterRequest, options: TransportRequestOptions, callback: callbackFn<T.PutFilterResponse, TContext>): TransportRequestCallback
    putJob<TContext = unknown>(params: T.PutJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutJobResponse, TContext>>
    putJob<TContext = unknown>(params: T.PutJobRequest, callback: callbackFn<T.PutJobResponse, TContext>): TransportRequestCallback
    putJob<TContext = unknown>(params: T.PutJobRequest, options: TransportRequestOptions, callback: callbackFn<T.PutJobResponse, TContext>): TransportRequestCallback
    putTrainedModel<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putTrainedModel<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putTrainedModel<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putTrainedModel<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putTrainedModelAlias<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putTrainedModelAlias<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putTrainedModelAlias<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putTrainedModelAlias<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    revertModelSnapshot<TContext = unknown>(params: T.RevertModelSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RevertModelSnapshotResponse, TContext>>
    revertModelSnapshot<TContext = unknown>(params: T.RevertModelSnapshotRequest, callback: callbackFn<T.RevertModelSnapshotResponse, TContext>): TransportRequestCallback
    revertModelSnapshot<TContext = unknown>(params: T.RevertModelSnapshotRequest, options: TransportRequestOptions, callback: callbackFn<T.RevertModelSnapshotResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TContext = unknown>(params?: T.SetUpgradeModeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SetUpgradeModeResponse, TContext>>
    setUpgradeMode<TContext = unknown>(callback: callbackFn<T.SetUpgradeModeResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TContext = unknown>(params: T.SetUpgradeModeRequest, callback: callbackFn<T.SetUpgradeModeResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TContext = unknown>(params: T.SetUpgradeModeRequest, options: TransportRequestOptions, callback: callbackFn<T.SetUpgradeModeResponse, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    startDataFrameAnalytics<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    startDatafeed<TContext = unknown>(params: T.StartDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartDatafeedResponse, TContext>>
    startDatafeed<TContext = unknown>(params: T.StartDatafeedRequest, callback: callbackFn<T.StartDatafeedResponse, TContext>): TransportRequestCallback
    startDatafeed<TContext = unknown>(params: T.StartDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<T.StartDatafeedResponse, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    stopDataFrameAnalytics<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    stopDatafeed<TContext = unknown>(params: T.StopDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StopDatafeedResponse, TContext>>
    stopDatafeed<TContext = unknown>(params: T.StopDatafeedRequest, callback: callbackFn<T.StopDatafeedResponse, TContext>): TransportRequestCallback
    stopDatafeed<TContext = unknown>(params: T.StopDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<T.StopDatafeedResponse, TContext>): TransportRequestCallback
    updateDataFrameAnalytics<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    updateDataFrameAnalytics<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    updateDataFrameAnalytics<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    updateDataFrameAnalytics<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    updateDatafeed<TContext = unknown>(params: T.UpdateDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateDatafeedResponse, TContext>>
    updateDatafeed<TContext = unknown>(params: T.UpdateDatafeedRequest, callback: callbackFn<T.UpdateDatafeedResponse, TContext>): TransportRequestCallback
    updateDatafeed<TContext = unknown>(params: T.UpdateDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<T.UpdateDatafeedResponse, TContext>): TransportRequestCallback
    updateFilter<TContext = unknown>(params: T.UpdateFilterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateFilterResponse, TContext>>
    updateFilter<TContext = unknown>(params: T.UpdateFilterRequest, callback: callbackFn<T.UpdateFilterResponse, TContext>): TransportRequestCallback
    updateFilter<TContext = unknown>(params: T.UpdateFilterRequest, options: TransportRequestOptions, callback: callbackFn<T.UpdateFilterResponse, TContext>): TransportRequestCallback
    updateJob<TContext = unknown>(params: T.UpdateJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateJobResponse, TContext>>
    updateJob<TContext = unknown>(params: T.UpdateJobRequest, callback: callbackFn<T.UpdateJobResponse, TContext>): TransportRequestCallback
    updateJob<TContext = unknown>(params: T.UpdateJobRequest, options: TransportRequestOptions, callback: callbackFn<T.UpdateJobResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TContext = unknown>(params: T.UpdateModelSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateModelSnapshotResponse, TContext>>
    updateModelSnapshot<TContext = unknown>(params: T.UpdateModelSnapshotRequest, callback: callbackFn<T.UpdateModelSnapshotResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TContext = unknown>(params: T.UpdateModelSnapshotRequest, options: TransportRequestOptions, callback: callbackFn<T.UpdateModelSnapshotResponse, TContext>): TransportRequestCallback
    upgradeJobSnapshot<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    upgradeJobSnapshot<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    upgradeJobSnapshot<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    upgradeJobSnapshot<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    validate<TContext = unknown>(params?: T.ValidateJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ValidateJobResponse, TContext>>
    validate<TContext = unknown>(callback: callbackFn<T.ValidateJobResponse, TContext>): TransportRequestCallback
    validate<TContext = unknown>(params: T.ValidateJobRequest, callback: callbackFn<T.ValidateJobResponse, TContext>): TransportRequestCallback
    validate<TContext = unknown>(params: T.ValidateJobRequest, options: TransportRequestOptions, callback: callbackFn<T.ValidateJobResponse, TContext>): TransportRequestCallback
    validateDetector<TContext = unknown>(params?: T.ValidateDetectorRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ValidateDetectorResponse, TContext>>
    validateDetector<TContext = unknown>(callback: callbackFn<T.ValidateDetectorResponse, TContext>): TransportRequestCallback
    validateDetector<TContext = unknown>(params: T.ValidateDetectorRequest, callback: callbackFn<T.ValidateDetectorResponse, TContext>): TransportRequestCallback
    validateDetector<TContext = unknown>(params: T.ValidateDetectorRequest, options: TransportRequestOptions, callback: callbackFn<T.ValidateDetectorResponse, TContext>): TransportRequestCallback
  }
  monitoring: {
    bulk<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    bulk<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    bulk<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    bulk<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  }
  msearch<TDocument = unknown, TContext = unknown>(params?: T.MultiSearchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MultiSearchResponse<TDocument>, TContext>>
  msearch<TDocument = unknown, TContext = unknown>(callback: callbackFn<T.MultiSearchResponse<TDocument>, TContext>): TransportRequestCallback
  msearch<TDocument = unknown, TContext = unknown>(params: T.MultiSearchRequest, callback: callbackFn<T.MultiSearchResponse<TDocument>, TContext>): TransportRequestCallback
  msearch<TDocument = unknown, TContext = unknown>(params: T.MultiSearchRequest, options: TransportRequestOptions, callback: callbackFn<T.MultiSearchResponse<TDocument>, TContext>): TransportRequestCallback
  msearchTemplate<TContext = unknown>(params?: T.MultiSearchTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MultiSearchTemplateResponse, TContext>>
  msearchTemplate<TContext = unknown>(callback: callbackFn<T.MultiSearchTemplateResponse, TContext>): TransportRequestCallback
  msearchTemplate<TContext = unknown>(params: T.MultiSearchTemplateRequest, callback: callbackFn<T.MultiSearchTemplateResponse, TContext>): TransportRequestCallback
  msearchTemplate<TContext = unknown>(params: T.MultiSearchTemplateRequest, options: TransportRequestOptions, callback: callbackFn<T.MultiSearchTemplateResponse, TContext>): TransportRequestCallback
  mtermvectors<TContext = unknown>(params?: T.MultiTermVectorsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.MultiTermVectorsResponse, TContext>>
  mtermvectors<TContext = unknown>(callback: callbackFn<T.MultiTermVectorsResponse, TContext>): TransportRequestCallback
  mtermvectors<TContext = unknown>(params: T.MultiTermVectorsRequest, callback: callbackFn<T.MultiTermVectorsResponse, TContext>): TransportRequestCallback
  mtermvectors<TContext = unknown>(params: T.MultiTermVectorsRequest, options: TransportRequestOptions, callback: callbackFn<T.MultiTermVectorsResponse, TContext>): TransportRequestCallback
  nodes: {
    hotThreads<TContext = unknown>(params?: T.NodesHotThreadsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesHotThreadsResponse, TContext>>
    hotThreads<TContext = unknown>(callback: callbackFn<T.NodesHotThreadsResponse, TContext>): TransportRequestCallback
    hotThreads<TContext = unknown>(params: T.NodesHotThreadsRequest, callback: callbackFn<T.NodesHotThreadsResponse, TContext>): TransportRequestCallback
    hotThreads<TContext = unknown>(params: T.NodesHotThreadsRequest, options: TransportRequestOptions, callback: callbackFn<T.NodesHotThreadsResponse, TContext>): TransportRequestCallback
    info<TContext = unknown>(params?: T.NodesInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.NodesInfoResponse, TContext>>
    info<TContext = unknown>(callback: callbackFn<T.NodesInfoResponse, TContext>): TransportRequestCallback
    info<TContext = unknown>(params: T.NodesInfoRequest, callback: callbackFn<T.NodesInfoResponse, TContext>): TransportRequestCallback
    info<TContext = unknown>(params: T.NodesInfoRequest, options: TransportRequestOptions, callback: callbackFn<T.NodesInfoResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TContext = unknown>(params?: T.ReloadSecureSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ReloadSecureSettingsResponse, TContext>>
    reloadSecureSettings<TContext = unknown>(callback: callbackFn<T.ReloadSecureSettingsResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TContext = unknown>(params: T.ReloadSecureSettingsRequest, callback: callbackFn<T.ReloadSecureSettingsResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TContext = unknown>(params: T.ReloadSecureSettingsRequest, options: TransportRequestOptions, callback: callbackFn<T.ReloadSecureSettingsResponse, TContext>): TransportRequestCallback
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
  rankEval<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  rankEval<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
  rankEval<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  rankEval<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
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
    deleteJob<TContext = unknown>(params: T.DeleteRollupJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteRollupJobResponse, TContext>>
    deleteJob<TContext = unknown>(params: T.DeleteRollupJobRequest, callback: callbackFn<T.DeleteRollupJobResponse, TContext>): TransportRequestCallback
    deleteJob<TContext = unknown>(params: T.DeleteRollupJobRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteRollupJobResponse, TContext>): TransportRequestCallback
    getJobs<TContext = unknown>(params?: T.GetRollupJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetRollupJobResponse, TContext>>
    getJobs<TContext = unknown>(callback: callbackFn<T.GetRollupJobResponse, TContext>): TransportRequestCallback
    getJobs<TContext = unknown>(params: T.GetRollupJobRequest, callback: callbackFn<T.GetRollupJobResponse, TContext>): TransportRequestCallback
    getJobs<TContext = unknown>(params: T.GetRollupJobRequest, options: TransportRequestOptions, callback: callbackFn<T.GetRollupJobResponse, TContext>): TransportRequestCallback
    getRollupCaps<TContext = unknown>(params?: T.GetRollupCapabilitiesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetRollupCapabilitiesResponse, TContext>>
    getRollupCaps<TContext = unknown>(callback: callbackFn<T.GetRollupCapabilitiesResponse, TContext>): TransportRequestCallback
    getRollupCaps<TContext = unknown>(params: T.GetRollupCapabilitiesRequest, callback: callbackFn<T.GetRollupCapabilitiesResponse, TContext>): TransportRequestCallback
    getRollupCaps<TContext = unknown>(params: T.GetRollupCapabilitiesRequest, options: TransportRequestOptions, callback: callbackFn<T.GetRollupCapabilitiesResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TContext = unknown>(params: T.GetRollupIndexCapabilitiesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetRollupIndexCapabilitiesResponse, TContext>>
    getRollupIndexCaps<TContext = unknown>(params: T.GetRollupIndexCapabilitiesRequest, callback: callbackFn<T.GetRollupIndexCapabilitiesResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TContext = unknown>(params: T.GetRollupIndexCapabilitiesRequest, options: TransportRequestOptions, callback: callbackFn<T.GetRollupIndexCapabilitiesResponse, TContext>): TransportRequestCallback
    putJob<TContext = unknown>(params: T.CreateRollupJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CreateRollupJobResponse, TContext>>
    putJob<TContext = unknown>(params: T.CreateRollupJobRequest, callback: callbackFn<T.CreateRollupJobResponse, TContext>): TransportRequestCallback
    putJob<TContext = unknown>(params: T.CreateRollupJobRequest, options: TransportRequestOptions, callback: callbackFn<T.CreateRollupJobResponse, TContext>): TransportRequestCallback
    rollup<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    rollup<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    rollup<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    rollup<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    rollupSearch<TDocument = unknown, TContext = unknown>(params: T.RollupSearchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RollupSearchResponse<TDocument>, TContext>>
    rollupSearch<TDocument = unknown, TContext = unknown>(params: T.RollupSearchRequest, callback: callbackFn<T.RollupSearchResponse<TDocument>, TContext>): TransportRequestCallback
    rollupSearch<TDocument = unknown, TContext = unknown>(params: T.RollupSearchRequest, options: TransportRequestOptions, callback: callbackFn<T.RollupSearchResponse<TDocument>, TContext>): TransportRequestCallback
    startJob<TContext = unknown>(params: T.StartRollupJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartRollupJobResponse, TContext>>
    startJob<TContext = unknown>(params: T.StartRollupJobRequest, callback: callbackFn<T.StartRollupJobResponse, TContext>): TransportRequestCallback
    startJob<TContext = unknown>(params: T.StartRollupJobRequest, options: TransportRequestOptions, callback: callbackFn<T.StartRollupJobResponse, TContext>): TransportRequestCallback
    stopJob<TContext = unknown>(params: T.StopRollupJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StopRollupJobResponse, TContext>>
    stopJob<TContext = unknown>(params: T.StopRollupJobRequest, callback: callbackFn<T.StopRollupJobResponse, TContext>): TransportRequestCallback
    stopJob<TContext = unknown>(params: T.StopRollupJobRequest, options: TransportRequestOptions, callback: callbackFn<T.StopRollupJobResponse, TContext>): TransportRequestCallback
  }
  scriptsPainlessExecute<TResult = unknown, TContext = unknown>(params?: T.ExecutePainlessScriptRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExecutePainlessScriptResponse<TResult>, TContext>>
  scriptsPainlessExecute<TResult = unknown, TContext = unknown>(callback: callbackFn<T.ExecutePainlessScriptResponse<TResult>, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TResult = unknown, TContext = unknown>(params: T.ExecutePainlessScriptRequest, callback: callbackFn<T.ExecutePainlessScriptResponse<TResult>, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TResult = unknown, TContext = unknown>(params: T.ExecutePainlessScriptRequest, options: TransportRequestOptions, callback: callbackFn<T.ExecutePainlessScriptResponse<TResult>, TContext>): TransportRequestCallback
  scroll<TDocument = unknown, TContext = unknown>(params?: T.ScrollRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ScrollResponse<TDocument>, TContext>>
  scroll<TDocument = unknown, TContext = unknown>(callback: callbackFn<T.ScrollResponse<TDocument>, TContext>): TransportRequestCallback
  scroll<TDocument = unknown, TContext = unknown>(params: T.ScrollRequest, callback: callbackFn<T.ScrollResponse<TDocument>, TContext>): TransportRequestCallback
  scroll<TDocument = unknown, TContext = unknown>(params: T.ScrollRequest, options: TransportRequestOptions, callback: callbackFn<T.ScrollResponse<TDocument>, TContext>): TransportRequestCallback
  search<TDocument = unknown, TContext = unknown>(params?: T.SearchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchResponse<TDocument>, TContext>>
  search<TDocument = unknown, TContext = unknown>(callback: callbackFn<T.SearchResponse<TDocument>, TContext>): TransportRequestCallback
  search<TDocument = unknown, TContext = unknown>(params: T.SearchRequest, callback: callbackFn<T.SearchResponse<TDocument>, TContext>): TransportRequestCallback
  search<TDocument = unknown, TContext = unknown>(params: T.SearchRequest, options: TransportRequestOptions, callback: callbackFn<T.SearchResponse<TDocument>, TContext>): TransportRequestCallback
  searchShards<TContext = unknown>(params?: T.SearchShardsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchShardsResponse, TContext>>
  searchShards<TContext = unknown>(callback: callbackFn<T.SearchShardsResponse, TContext>): TransportRequestCallback
  searchShards<TContext = unknown>(params: T.SearchShardsRequest, callback: callbackFn<T.SearchShardsResponse, TContext>): TransportRequestCallback
  searchShards<TContext = unknown>(params: T.SearchShardsRequest, options: TransportRequestOptions, callback: callbackFn<T.SearchShardsResponse, TContext>): TransportRequestCallback
  searchTemplate<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
  searchTemplate<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
  searchTemplate<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  searchTemplate<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  searchableSnapshots: {
    clearCache<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    clearCache<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    clearCache<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    clearCache<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    mount<TContext = unknown>(params: T.SearchableSnapshotsMountRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SearchableSnapshotsMountResponse, TContext>>
    mount<TContext = unknown>(params: T.SearchableSnapshotsMountRequest, callback: callbackFn<T.SearchableSnapshotsMountResponse, TContext>): TransportRequestCallback
    mount<TContext = unknown>(params: T.SearchableSnapshotsMountRequest, options: TransportRequestOptions, callback: callbackFn<T.SearchableSnapshotsMountResponse, TContext>): TransportRequestCallback
    repositoryStats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    repositoryStats<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    repositoryStats<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    repositoryStats<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    stats<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  }
  security: {
    authenticate<TContext = unknown>(params?: T.AuthenticateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AuthenticateResponse, TContext>>
    authenticate<TContext = unknown>(callback: callbackFn<T.AuthenticateResponse, TContext>): TransportRequestCallback
    authenticate<TContext = unknown>(params: T.AuthenticateRequest, callback: callbackFn<T.AuthenticateResponse, TContext>): TransportRequestCallback
    authenticate<TContext = unknown>(params: T.AuthenticateRequest, options: TransportRequestOptions, callback: callbackFn<T.AuthenticateResponse, TContext>): TransportRequestCallback
    changePassword<TContext = unknown>(params?: T.ChangePasswordRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ChangePasswordResponse, TContext>>
    changePassword<TContext = unknown>(callback: callbackFn<T.ChangePasswordResponse, TContext>): TransportRequestCallback
    changePassword<TContext = unknown>(params: T.ChangePasswordRequest, callback: callbackFn<T.ChangePasswordResponse, TContext>): TransportRequestCallback
    changePassword<TContext = unknown>(params: T.ChangePasswordRequest, options: TransportRequestOptions, callback: callbackFn<T.ChangePasswordResponse, TContext>): TransportRequestCallback
    clearApiKeyCache<TContext = unknown>(params?: T.ClearApiKeyCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClearApiKeyCacheResponse, TContext>>
    clearApiKeyCache<TContext = unknown>(callback: callbackFn<T.ClearApiKeyCacheResponse, TContext>): TransportRequestCallback
    clearApiKeyCache<TContext = unknown>(params: T.ClearApiKeyCacheRequest, callback: callbackFn<T.ClearApiKeyCacheResponse, TContext>): TransportRequestCallback
    clearApiKeyCache<TContext = unknown>(params: T.ClearApiKeyCacheRequest, options: TransportRequestOptions, callback: callbackFn<T.ClearApiKeyCacheResponse, TContext>): TransportRequestCallback
    clearCachedPrivileges<TContext = unknown>(params: T.ClearCachedPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClearCachedPrivilegesResponse, TContext>>
    clearCachedPrivileges<TContext = unknown>(params: T.ClearCachedPrivilegesRequest, callback: callbackFn<T.ClearCachedPrivilegesResponse, TContext>): TransportRequestCallback
    clearCachedPrivileges<TContext = unknown>(params: T.ClearCachedPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<T.ClearCachedPrivilegesResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TContext = unknown>(params: T.ClearCachedRealmsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClearCachedRealmsResponse, TContext>>
    clearCachedRealms<TContext = unknown>(params: T.ClearCachedRealmsRequest, callback: callbackFn<T.ClearCachedRealmsResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TContext = unknown>(params: T.ClearCachedRealmsRequest, options: TransportRequestOptions, callback: callbackFn<T.ClearCachedRealmsResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TContext = unknown>(params: T.ClearCachedRolesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClearCachedRolesResponse, TContext>>
    clearCachedRoles<TContext = unknown>(params: T.ClearCachedRolesRequest, callback: callbackFn<T.ClearCachedRolesResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TContext = unknown>(params: T.ClearCachedRolesRequest, options: TransportRequestOptions, callback: callbackFn<T.ClearCachedRolesResponse, TContext>): TransportRequestCallback
    createApiKey<TContext = unknown>(params?: T.CreateApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CreateApiKeyResponse, TContext>>
    createApiKey<TContext = unknown>(callback: callbackFn<T.CreateApiKeyResponse, TContext>): TransportRequestCallback
    createApiKey<TContext = unknown>(params: T.CreateApiKeyRequest, callback: callbackFn<T.CreateApiKeyResponse, TContext>): TransportRequestCallback
    createApiKey<TContext = unknown>(params: T.CreateApiKeyRequest, options: TransportRequestOptions, callback: callbackFn<T.CreateApiKeyResponse, TContext>): TransportRequestCallback
    deletePrivileges<TContext = unknown>(params: T.DeletePrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeletePrivilegesResponse, TContext>>
    deletePrivileges<TContext = unknown>(params: T.DeletePrivilegesRequest, callback: callbackFn<T.DeletePrivilegesResponse, TContext>): TransportRequestCallback
    deletePrivileges<TContext = unknown>(params: T.DeletePrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<T.DeletePrivilegesResponse, TContext>): TransportRequestCallback
    deleteRole<TContext = unknown>(params: T.DeleteRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteRoleResponse, TContext>>
    deleteRole<TContext = unknown>(params: T.DeleteRoleRequest, callback: callbackFn<T.DeleteRoleResponse, TContext>): TransportRequestCallback
    deleteRole<TContext = unknown>(params: T.DeleteRoleRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteRoleResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TContext = unknown>(params: T.DeleteRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteRoleMappingResponse, TContext>>
    deleteRoleMapping<TContext = unknown>(params: T.DeleteRoleMappingRequest, callback: callbackFn<T.DeleteRoleMappingResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TContext = unknown>(params: T.DeleteRoleMappingRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteRoleMappingResponse, TContext>): TransportRequestCallback
    deleteUser<TContext = unknown>(params: T.DeleteUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteUserResponse, TContext>>
    deleteUser<TContext = unknown>(params: T.DeleteUserRequest, callback: callbackFn<T.DeleteUserResponse, TContext>): TransportRequestCallback
    deleteUser<TContext = unknown>(params: T.DeleteUserRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteUserResponse, TContext>): TransportRequestCallback
    disableUser<TContext = unknown>(params: T.DisableUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DisableUserResponse, TContext>>
    disableUser<TContext = unknown>(params: T.DisableUserRequest, callback: callbackFn<T.DisableUserResponse, TContext>): TransportRequestCallback
    disableUser<TContext = unknown>(params: T.DisableUserRequest, options: TransportRequestOptions, callback: callbackFn<T.DisableUserResponse, TContext>): TransportRequestCallback
    enableUser<TContext = unknown>(params: T.EnableUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.EnableUserResponse, TContext>>
    enableUser<TContext = unknown>(params: T.EnableUserRequest, callback: callbackFn<T.EnableUserResponse, TContext>): TransportRequestCallback
    enableUser<TContext = unknown>(params: T.EnableUserRequest, options: TransportRequestOptions, callback: callbackFn<T.EnableUserResponse, TContext>): TransportRequestCallback
    getApiKey<TContext = unknown>(params?: T.GetApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetApiKeyResponse, TContext>>
    getApiKey<TContext = unknown>(callback: callbackFn<T.GetApiKeyResponse, TContext>): TransportRequestCallback
    getApiKey<TContext = unknown>(params: T.GetApiKeyRequest, callback: callbackFn<T.GetApiKeyResponse, TContext>): TransportRequestCallback
    getApiKey<TContext = unknown>(params: T.GetApiKeyRequest, options: TransportRequestOptions, callback: callbackFn<T.GetApiKeyResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TContext = unknown>(params?: T.GetBuiltinPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetBuiltinPrivilegesResponse, TContext>>
    getBuiltinPrivileges<TContext = unknown>(callback: callbackFn<T.GetBuiltinPrivilegesResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TContext = unknown>(params: T.GetBuiltinPrivilegesRequest, callback: callbackFn<T.GetBuiltinPrivilegesResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TContext = unknown>(params: T.GetBuiltinPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<T.GetBuiltinPrivilegesResponse, TContext>): TransportRequestCallback
    getPrivileges<TContext = unknown>(params?: T.GetPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetPrivilegesResponse, TContext>>
    getPrivileges<TContext = unknown>(callback: callbackFn<T.GetPrivilegesResponse, TContext>): TransportRequestCallback
    getPrivileges<TContext = unknown>(params: T.GetPrivilegesRequest, callback: callbackFn<T.GetPrivilegesResponse, TContext>): TransportRequestCallback
    getPrivileges<TContext = unknown>(params: T.GetPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<T.GetPrivilegesResponse, TContext>): TransportRequestCallback
    getRole<TContext = unknown>(params?: T.GetRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetRoleResponse, TContext>>
    getRole<TContext = unknown>(callback: callbackFn<T.GetRoleResponse, TContext>): TransportRequestCallback
    getRole<TContext = unknown>(params: T.GetRoleRequest, callback: callbackFn<T.GetRoleResponse, TContext>): TransportRequestCallback
    getRole<TContext = unknown>(params: T.GetRoleRequest, options: TransportRequestOptions, callback: callbackFn<T.GetRoleResponse, TContext>): TransportRequestCallback
    getRoleMapping<TContext = unknown>(params?: T.GetRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetRoleMappingResponse, TContext>>
    getRoleMapping<TContext = unknown>(callback: callbackFn<T.GetRoleMappingResponse, TContext>): TransportRequestCallback
    getRoleMapping<TContext = unknown>(params: T.GetRoleMappingRequest, callback: callbackFn<T.GetRoleMappingResponse, TContext>): TransportRequestCallback
    getRoleMapping<TContext = unknown>(params: T.GetRoleMappingRequest, options: TransportRequestOptions, callback: callbackFn<T.GetRoleMappingResponse, TContext>): TransportRequestCallback
    getToken<TContext = unknown>(params?: T.GetUserAccessTokenRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetUserAccessTokenResponse, TContext>>
    getToken<TContext = unknown>(callback: callbackFn<T.GetUserAccessTokenResponse, TContext>): TransportRequestCallback
    getToken<TContext = unknown>(params: T.GetUserAccessTokenRequest, callback: callbackFn<T.GetUserAccessTokenResponse, TContext>): TransportRequestCallback
    getToken<TContext = unknown>(params: T.GetUserAccessTokenRequest, options: TransportRequestOptions, callback: callbackFn<T.GetUserAccessTokenResponse, TContext>): TransportRequestCallback
    getUser<TContext = unknown>(params?: T.GetUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetUserResponse, TContext>>
    getUser<TContext = unknown>(callback: callbackFn<T.GetUserResponse, TContext>): TransportRequestCallback
    getUser<TContext = unknown>(params: T.GetUserRequest, callback: callbackFn<T.GetUserResponse, TContext>): TransportRequestCallback
    getUser<TContext = unknown>(params: T.GetUserRequest, options: TransportRequestOptions, callback: callbackFn<T.GetUserResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TContext = unknown>(params?: T.GetUserPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetUserPrivilegesResponse, TContext>>
    getUserPrivileges<TContext = unknown>(callback: callbackFn<T.GetUserPrivilegesResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TContext = unknown>(params: T.GetUserPrivilegesRequest, callback: callbackFn<T.GetUserPrivilegesResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TContext = unknown>(params: T.GetUserPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<T.GetUserPrivilegesResponse, TContext>): TransportRequestCallback
    grantApiKey<TContext = unknown>(params?: T.GrantApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GrantApiKeyResponse, TContext>>
    grantApiKey<TContext = unknown>(callback: callbackFn<T.GrantApiKeyResponse, TContext>): TransportRequestCallback
    grantApiKey<TContext = unknown>(params: T.GrantApiKeyRequest, callback: callbackFn<T.GrantApiKeyResponse, TContext>): TransportRequestCallback
    grantApiKey<TContext = unknown>(params: T.GrantApiKeyRequest, options: TransportRequestOptions, callback: callbackFn<T.GrantApiKeyResponse, TContext>): TransportRequestCallback
    hasPrivileges<TContext = unknown>(params?: T.HasPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.HasPrivilegesResponse, TContext>>
    hasPrivileges<TContext = unknown>(callback: callbackFn<T.HasPrivilegesResponse, TContext>): TransportRequestCallback
    hasPrivileges<TContext = unknown>(params: T.HasPrivilegesRequest, callback: callbackFn<T.HasPrivilegesResponse, TContext>): TransportRequestCallback
    hasPrivileges<TContext = unknown>(params: T.HasPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<T.HasPrivilegesResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TContext = unknown>(params?: T.InvalidateApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.InvalidateApiKeyResponse, TContext>>
    invalidateApiKey<TContext = unknown>(callback: callbackFn<T.InvalidateApiKeyResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TContext = unknown>(params: T.InvalidateApiKeyRequest, callback: callbackFn<T.InvalidateApiKeyResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TContext = unknown>(params: T.InvalidateApiKeyRequest, options: TransportRequestOptions, callback: callbackFn<T.InvalidateApiKeyResponse, TContext>): TransportRequestCallback
    invalidateToken<TContext = unknown>(params?: T.InvalidateUserAccessTokenRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.InvalidateUserAccessTokenResponse, TContext>>
    invalidateToken<TContext = unknown>(callback: callbackFn<T.InvalidateUserAccessTokenResponse, TContext>): TransportRequestCallback
    invalidateToken<TContext = unknown>(params: T.InvalidateUserAccessTokenRequest, callback: callbackFn<T.InvalidateUserAccessTokenResponse, TContext>): TransportRequestCallback
    invalidateToken<TContext = unknown>(params: T.InvalidateUserAccessTokenRequest, options: TransportRequestOptions, callback: callbackFn<T.InvalidateUserAccessTokenResponse, TContext>): TransportRequestCallback
    putPrivileges<TContext = unknown>(params?: T.PutPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutPrivilegesResponse, TContext>>
    putPrivileges<TContext = unknown>(callback: callbackFn<T.PutPrivilegesResponse, TContext>): TransportRequestCallback
    putPrivileges<TContext = unknown>(params: T.PutPrivilegesRequest, callback: callbackFn<T.PutPrivilegesResponse, TContext>): TransportRequestCallback
    putPrivileges<TContext = unknown>(params: T.PutPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<T.PutPrivilegesResponse, TContext>): TransportRequestCallback
    putRole<TContext = unknown>(params: T.PutRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutRoleResponse, TContext>>
    putRole<TContext = unknown>(params: T.PutRoleRequest, callback: callbackFn<T.PutRoleResponse, TContext>): TransportRequestCallback
    putRole<TContext = unknown>(params: T.PutRoleRequest, options: TransportRequestOptions, callback: callbackFn<T.PutRoleResponse, TContext>): TransportRequestCallback
    putRoleMapping<TContext = unknown>(params: T.PutRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutRoleMappingResponse, TContext>>
    putRoleMapping<TContext = unknown>(params: T.PutRoleMappingRequest, callback: callbackFn<T.PutRoleMappingResponse, TContext>): TransportRequestCallback
    putRoleMapping<TContext = unknown>(params: T.PutRoleMappingRequest, options: TransportRequestOptions, callback: callbackFn<T.PutRoleMappingResponse, TContext>): TransportRequestCallback
    putUser<TContext = unknown>(params: T.PutUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutUserResponse, TContext>>
    putUser<TContext = unknown>(params: T.PutUserRequest, callback: callbackFn<T.PutUserResponse, TContext>): TransportRequestCallback
    putUser<TContext = unknown>(params: T.PutUserRequest, options: TransportRequestOptions, callback: callbackFn<T.PutUserResponse, TContext>): TransportRequestCallback
  }
  shutdown: {
    deleteNode<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    deleteNode<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deleteNode<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    deleteNode<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getNode<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    getNode<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getNode<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    getNode<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putNode<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    putNode<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putNode<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    putNode<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
  }
  slm: {
    deleteLifecycle<TContext = unknown>(params: T.DeleteSnapshotLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteSnapshotLifecycleResponse, TContext>>
    deleteLifecycle<TContext = unknown>(params: T.DeleteSnapshotLifecycleRequest, callback: callbackFn<T.DeleteSnapshotLifecycleResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TContext = unknown>(params: T.DeleteSnapshotLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteSnapshotLifecycleResponse, TContext>): TransportRequestCallback
    executeLifecycle<TContext = unknown>(params: T.ExecuteSnapshotLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExecuteSnapshotLifecycleResponse, TContext>>
    executeLifecycle<TContext = unknown>(params: T.ExecuteSnapshotLifecycleRequest, callback: callbackFn<T.ExecuteSnapshotLifecycleResponse, TContext>): TransportRequestCallback
    executeLifecycle<TContext = unknown>(params: T.ExecuteSnapshotLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.ExecuteSnapshotLifecycleResponse, TContext>): TransportRequestCallback
    executeRetention<TContext = unknown>(params?: T.ExecuteRetentionRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExecuteRetentionResponse, TContext>>
    executeRetention<TContext = unknown>(callback: callbackFn<T.ExecuteRetentionResponse, TContext>): TransportRequestCallback
    executeRetention<TContext = unknown>(params: T.ExecuteRetentionRequest, callback: callbackFn<T.ExecuteRetentionResponse, TContext>): TransportRequestCallback
    executeRetention<TContext = unknown>(params: T.ExecuteRetentionRequest, options: TransportRequestOptions, callback: callbackFn<T.ExecuteRetentionResponse, TContext>): TransportRequestCallback
    getLifecycle<TContext = unknown>(params?: T.GetSnapshotLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetSnapshotLifecycleResponse, TContext>>
    getLifecycle<TContext = unknown>(callback: callbackFn<T.GetSnapshotLifecycleResponse, TContext>): TransportRequestCallback
    getLifecycle<TContext = unknown>(params: T.GetSnapshotLifecycleRequest, callback: callbackFn<T.GetSnapshotLifecycleResponse, TContext>): TransportRequestCallback
    getLifecycle<TContext = unknown>(params: T.GetSnapshotLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.GetSnapshotLifecycleResponse, TContext>): TransportRequestCallback
    getStats<TContext = unknown>(params?: T.GetSnapshotLifecycleStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetSnapshotLifecycleStatsResponse, TContext>>
    getStats<TContext = unknown>(callback: callbackFn<T.GetSnapshotLifecycleStatsResponse, TContext>): TransportRequestCallback
    getStats<TContext = unknown>(params: T.GetSnapshotLifecycleStatsRequest, callback: callbackFn<T.GetSnapshotLifecycleStatsResponse, TContext>): TransportRequestCallback
    getStats<TContext = unknown>(params: T.GetSnapshotLifecycleStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.GetSnapshotLifecycleStatsResponse, TContext>): TransportRequestCallback
    getStatus<TContext = unknown>(params?: T.GetSnapshotLifecycleManagementStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetSnapshotLifecycleManagementStatusResponse, TContext>>
    getStatus<TContext = unknown>(callback: callbackFn<T.GetSnapshotLifecycleManagementStatusResponse, TContext>): TransportRequestCallback
    getStatus<TContext = unknown>(params: T.GetSnapshotLifecycleManagementStatusRequest, callback: callbackFn<T.GetSnapshotLifecycleManagementStatusResponse, TContext>): TransportRequestCallback
    getStatus<TContext = unknown>(params: T.GetSnapshotLifecycleManagementStatusRequest, options: TransportRequestOptions, callback: callbackFn<T.GetSnapshotLifecycleManagementStatusResponse, TContext>): TransportRequestCallback
    putLifecycle<TContext = unknown>(params: T.PutSnapshotLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutSnapshotLifecycleResponse, TContext>>
    putLifecycle<TContext = unknown>(params: T.PutSnapshotLifecycleRequest, callback: callbackFn<T.PutSnapshotLifecycleResponse, TContext>): TransportRequestCallback
    putLifecycle<TContext = unknown>(params: T.PutSnapshotLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<T.PutSnapshotLifecycleResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params?: T.StartSnapshotLifecycleManagementRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartSnapshotLifecycleManagementResponse, TContext>>
    start<TContext = unknown>(callback: callbackFn<T.StartSnapshotLifecycleManagementResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params: T.StartSnapshotLifecycleManagementRequest, callback: callbackFn<T.StartSnapshotLifecycleManagementResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params: T.StartSnapshotLifecycleManagementRequest, options: TransportRequestOptions, callback: callbackFn<T.StartSnapshotLifecycleManagementResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params?: T.StopSnapshotLifecycleManagementRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StopSnapshotLifecycleManagementResponse, TContext>>
    stop<TContext = unknown>(callback: callbackFn<T.StopSnapshotLifecycleManagementResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params: T.StopSnapshotLifecycleManagementRequest, callback: callbackFn<T.StopSnapshotLifecycleManagementResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params: T.StopSnapshotLifecycleManagementRequest, options: TransportRequestOptions, callback: callbackFn<T.StopSnapshotLifecycleManagementResponse, TContext>): TransportRequestCallback
  }
  snapshot: {
    cleanupRepository<TContext = unknown>(params: T.CleanupRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CleanupRepositoryResponse, TContext>>
    cleanupRepository<TContext = unknown>(params: T.CleanupRepositoryRequest, callback: callbackFn<T.CleanupRepositoryResponse, TContext>): TransportRequestCallback
    cleanupRepository<TContext = unknown>(params: T.CleanupRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<T.CleanupRepositoryResponse, TContext>): TransportRequestCallback
    clone<TContext = unknown>(params: T.CloneSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CloneSnapshotResponse, TContext>>
    clone<TContext = unknown>(params: T.CloneSnapshotRequest, callback: callbackFn<T.CloneSnapshotResponse, TContext>): TransportRequestCallback
    clone<TContext = unknown>(params: T.CloneSnapshotRequest, options: TransportRequestOptions, callback: callbackFn<T.CloneSnapshotResponse, TContext>): TransportRequestCallback
    create<TContext = unknown>(params: T.SnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotResponse, TContext>>
    create<TContext = unknown>(params: T.SnapshotRequest, callback: callbackFn<T.SnapshotResponse, TContext>): TransportRequestCallback
    create<TContext = unknown>(params: T.SnapshotRequest, options: TransportRequestOptions, callback: callbackFn<T.SnapshotResponse, TContext>): TransportRequestCallback
    createRepository<TContext = unknown>(params: T.CreateRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CreateRepositoryResponse, TContext>>
    createRepository<TContext = unknown>(params: T.CreateRepositoryRequest, callback: callbackFn<T.CreateRepositoryResponse, TContext>): TransportRequestCallback
    createRepository<TContext = unknown>(params: T.CreateRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<T.CreateRepositoryResponse, TContext>): TransportRequestCallback
    delete<TContext = unknown>(params: T.DeleteSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteSnapshotResponse, TContext>>
    delete<TContext = unknown>(params: T.DeleteSnapshotRequest, callback: callbackFn<T.DeleteSnapshotResponse, TContext>): TransportRequestCallback
    delete<TContext = unknown>(params: T.DeleteSnapshotRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteSnapshotResponse, TContext>): TransportRequestCallback
    deleteRepository<TContext = unknown>(params: T.DeleteRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteRepositoryResponse, TContext>>
    deleteRepository<TContext = unknown>(params: T.DeleteRepositoryRequest, callback: callbackFn<T.DeleteRepositoryResponse, TContext>): TransportRequestCallback
    deleteRepository<TContext = unknown>(params: T.DeleteRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteRepositoryResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.GetSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetSnapshotResponse, TContext>>
    get<TContext = unknown>(params: T.GetSnapshotRequest, callback: callbackFn<T.GetSnapshotResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.GetSnapshotRequest, options: TransportRequestOptions, callback: callbackFn<T.GetSnapshotResponse, TContext>): TransportRequestCallback
    getRepository<TContext = unknown>(params?: T.GetRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetRepositoryResponse, TContext>>
    getRepository<TContext = unknown>(callback: callbackFn<T.GetRepositoryResponse, TContext>): TransportRequestCallback
    getRepository<TContext = unknown>(params: T.GetRepositoryRequest, callback: callbackFn<T.GetRepositoryResponse, TContext>): TransportRequestCallback
    getRepository<TContext = unknown>(params: T.GetRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<T.GetRepositoryResponse, TContext>): TransportRequestCallback
    restore<TContext = unknown>(params: T.RestoreRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.RestoreResponse, TContext>>
    restore<TContext = unknown>(params: T.RestoreRequest, callback: callbackFn<T.RestoreResponse, TContext>): TransportRequestCallback
    restore<TContext = unknown>(params: T.RestoreRequest, options: TransportRequestOptions, callback: callbackFn<T.RestoreResponse, TContext>): TransportRequestCallback
    status<TContext = unknown>(params?: T.SnapshotStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.SnapshotStatusResponse, TContext>>
    status<TContext = unknown>(callback: callbackFn<T.SnapshotStatusResponse, TContext>): TransportRequestCallback
    status<TContext = unknown>(params: T.SnapshotStatusRequest, callback: callbackFn<T.SnapshotStatusResponse, TContext>): TransportRequestCallback
    status<TContext = unknown>(params: T.SnapshotStatusRequest, options: TransportRequestOptions, callback: callbackFn<T.SnapshotStatusResponse, TContext>): TransportRequestCallback
    verifyRepository<TContext = unknown>(params: T.VerifyRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.VerifyRepositoryResponse, TContext>>
    verifyRepository<TContext = unknown>(params: T.VerifyRepositoryRequest, callback: callbackFn<T.VerifyRepositoryResponse, TContext>): TransportRequestCallback
    verifyRepository<TContext = unknown>(params: T.VerifyRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<T.VerifyRepositoryResponse, TContext>): TransportRequestCallback
  }
  sql: {
    clearCursor<TContext = unknown>(params?: T.ClearSqlCursorRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ClearSqlCursorResponse, TContext>>
    clearCursor<TContext = unknown>(callback: callbackFn<T.ClearSqlCursorResponse, TContext>): TransportRequestCallback
    clearCursor<TContext = unknown>(params: T.ClearSqlCursorRequest, callback: callbackFn<T.ClearSqlCursorResponse, TContext>): TransportRequestCallback
    clearCursor<TContext = unknown>(params: T.ClearSqlCursorRequest, options: TransportRequestOptions, callback: callbackFn<T.ClearSqlCursorResponse, TContext>): TransportRequestCallback
    query<TContext = unknown>(params?: T.QuerySqlRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.QuerySqlResponse, TContext>>
    query<TContext = unknown>(callback: callbackFn<T.QuerySqlResponse, TContext>): TransportRequestCallback
    query<TContext = unknown>(params: T.QuerySqlRequest, callback: callbackFn<T.QuerySqlResponse, TContext>): TransportRequestCallback
    query<TContext = unknown>(params: T.QuerySqlRequest, options: TransportRequestOptions, callback: callbackFn<T.QuerySqlResponse, TContext>): TransportRequestCallback
    translate<TContext = unknown>(params?: T.TranslateSqlRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TranslateSqlResponse, TContext>>
    translate<TContext = unknown>(callback: callbackFn<T.TranslateSqlResponse, TContext>): TransportRequestCallback
    translate<TContext = unknown>(params: T.TranslateSqlRequest, callback: callbackFn<T.TranslateSqlResponse, TContext>): TransportRequestCallback
    translate<TContext = unknown>(params: T.TranslateSqlRequest, options: TransportRequestOptions, callback: callbackFn<T.TranslateSqlResponse, TContext>): TransportRequestCallback
  }
  ssl: {
    certificates<TContext = unknown>(params?: T.GetCertificatesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetCertificatesResponse, TContext>>
    certificates<TContext = unknown>(callback: callbackFn<T.GetCertificatesResponse, TContext>): TransportRequestCallback
    certificates<TContext = unknown>(params: T.GetCertificatesRequest, callback: callbackFn<T.GetCertificatesResponse, TContext>): TransportRequestCallback
    certificates<TContext = unknown>(params: T.GetCertificatesRequest, options: TransportRequestOptions, callback: callbackFn<T.GetCertificatesResponse, TContext>): TransportRequestCallback
  }
  tasks: {
    cancel<TContext = unknown>(params?: T.CancelTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.CancelTasksResponse, TContext>>
    cancel<TContext = unknown>(callback: callbackFn<T.CancelTasksResponse, TContext>): TransportRequestCallback
    cancel<TContext = unknown>(params: T.CancelTasksRequest, callback: callbackFn<T.CancelTasksResponse, TContext>): TransportRequestCallback
    cancel<TContext = unknown>(params: T.CancelTasksRequest, options: TransportRequestOptions, callback: callbackFn<T.CancelTasksResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.GetTaskRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetTaskResponse, TContext>>
    get<TContext = unknown>(params: T.GetTaskRequest, callback: callbackFn<T.GetTaskResponse, TContext>): TransportRequestCallback
    get<TContext = unknown>(params: T.GetTaskRequest, options: TransportRequestOptions, callback: callbackFn<T.GetTaskResponse, TContext>): TransportRequestCallback
    list<TContext = unknown>(params?: T.ListTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ListTasksResponse, TContext>>
    list<TContext = unknown>(callback: callbackFn<T.ListTasksResponse, TContext>): TransportRequestCallback
    list<TContext = unknown>(params: T.ListTasksRequest, callback: callbackFn<T.ListTasksResponse, TContext>): TransportRequestCallback
    list<TContext = unknown>(params: T.ListTasksRequest, options: TransportRequestOptions, callback: callbackFn<T.ListTasksResponse, TContext>): TransportRequestCallback
  }
  termvectors<TDocument = unknown, TContext = unknown>(params: T.TermVectorsRequest<TDocument>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.TermVectorsResponse, TContext>>
  termvectors<TDocument = unknown, TContext = unknown>(params: T.TermVectorsRequest<TDocument>, callback: callbackFn<T.TermVectorsResponse, TContext>): TransportRequestCallback
  termvectors<TDocument = unknown, TContext = unknown>(params: T.TermVectorsRequest<TDocument>, options: TransportRequestOptions, callback: callbackFn<T.TermVectorsResponse, TContext>): TransportRequestCallback
  textStructure: {
    findStructure<TBody = unknown, TContext = unknown>(params: T.FindStructureRequest<TBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.FindStructureResponse, TContext>>
    findStructure<TBody = unknown, TContext = unknown>(params: T.FindStructureRequest<TBody>, callback: callbackFn<T.FindStructureResponse, TContext>): TransportRequestCallback
    findStructure<TBody = unknown, TContext = unknown>(params: T.FindStructureRequest<TBody>, options: TransportRequestOptions, callback: callbackFn<T.FindStructureResponse, TContext>): TransportRequestCallback
  }
  transform: {
    deleteTransform<TContext = unknown>(params: T.DeleteTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteTransformResponse, TContext>>
    deleteTransform<TContext = unknown>(params: T.DeleteTransformRequest, callback: callbackFn<T.DeleteTransformResponse, TContext>): TransportRequestCallback
    deleteTransform<TContext = unknown>(params: T.DeleteTransformRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteTransformResponse, TContext>): TransportRequestCallback
    getTransform<TContext = unknown>(params?: T.GetTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetTransformResponse, TContext>>
    getTransform<TContext = unknown>(callback: callbackFn<T.GetTransformResponse, TContext>): TransportRequestCallback
    getTransform<TContext = unknown>(params: T.GetTransformRequest, callback: callbackFn<T.GetTransformResponse, TContext>): TransportRequestCallback
    getTransform<TContext = unknown>(params: T.GetTransformRequest, options: TransportRequestOptions, callback: callbackFn<T.GetTransformResponse, TContext>): TransportRequestCallback
    getTransformStats<TContext = unknown>(params: T.GetTransformStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetTransformStatsResponse, TContext>>
    getTransformStats<TContext = unknown>(params: T.GetTransformStatsRequest, callback: callbackFn<T.GetTransformStatsResponse, TContext>): TransportRequestCallback
    getTransformStats<TContext = unknown>(params: T.GetTransformStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.GetTransformStatsResponse, TContext>): TransportRequestCallback
    previewTransform<TTransform = unknown, TContext = unknown>(params?: T.PreviewTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PreviewTransformResponse<TTransform>, TContext>>
    previewTransform<TTransform = unknown, TContext = unknown>(callback: callbackFn<T.PreviewTransformResponse<TTransform>, TContext>): TransportRequestCallback
    previewTransform<TTransform = unknown, TContext = unknown>(params: T.PreviewTransformRequest, callback: callbackFn<T.PreviewTransformResponse<TTransform>, TContext>): TransportRequestCallback
    previewTransform<TTransform = unknown, TContext = unknown>(params: T.PreviewTransformRequest, options: TransportRequestOptions, callback: callbackFn<T.PreviewTransformResponse<TTransform>, TContext>): TransportRequestCallback
    putTransform<TContext = unknown>(params: T.PutTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutTransformResponse, TContext>>
    putTransform<TContext = unknown>(params: T.PutTransformRequest, callback: callbackFn<T.PutTransformResponse, TContext>): TransportRequestCallback
    putTransform<TContext = unknown>(params: T.PutTransformRequest, options: TransportRequestOptions, callback: callbackFn<T.PutTransformResponse, TContext>): TransportRequestCallback
    startTransform<TContext = unknown>(params: T.StartTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartTransformResponse, TContext>>
    startTransform<TContext = unknown>(params: T.StartTransformRequest, callback: callbackFn<T.StartTransformResponse, TContext>): TransportRequestCallback
    startTransform<TContext = unknown>(params: T.StartTransformRequest, options: TransportRequestOptions, callback: callbackFn<T.StartTransformResponse, TContext>): TransportRequestCallback
    stopTransform<TContext = unknown>(params: T.StopTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StopTransformResponse, TContext>>
    stopTransform<TContext = unknown>(params: T.StopTransformRequest, callback: callbackFn<T.StopTransformResponse, TContext>): TransportRequestCallback
    stopTransform<TContext = unknown>(params: T.StopTransformRequest, options: TransportRequestOptions, callback: callbackFn<T.StopTransformResponse, TContext>): TransportRequestCallback
    updateTransform<TContext = unknown>(params: T.UpdateTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.UpdateTransformResponse, TContext>>
    updateTransform<TContext = unknown>(params: T.UpdateTransformRequest, callback: callbackFn<T.UpdateTransformResponse, TContext>): TransportRequestCallback
    updateTransform<TContext = unknown>(params: T.UpdateTransformRequest, options: TransportRequestOptions, callback: callbackFn<T.UpdateTransformResponse, TContext>): TransportRequestCallback
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
    ackWatch<TContext = unknown>(params: T.AcknowledgeWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.AcknowledgeWatchResponse, TContext>>
    ackWatch<TContext = unknown>(params: T.AcknowledgeWatchRequest, callback: callbackFn<T.AcknowledgeWatchResponse, TContext>): TransportRequestCallback
    ackWatch<TContext = unknown>(params: T.AcknowledgeWatchRequest, options: TransportRequestOptions, callback: callbackFn<T.AcknowledgeWatchResponse, TContext>): TransportRequestCallback
    activateWatch<TContext = unknown>(params: T.ActivateWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ActivateWatchResponse, TContext>>
    activateWatch<TContext = unknown>(params: T.ActivateWatchRequest, callback: callbackFn<T.ActivateWatchResponse, TContext>): TransportRequestCallback
    activateWatch<TContext = unknown>(params: T.ActivateWatchRequest, options: TransportRequestOptions, callback: callbackFn<T.ActivateWatchResponse, TContext>): TransportRequestCallback
    deactivateWatch<TContext = unknown>(params: T.DeactivateWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeactivateWatchResponse, TContext>>
    deactivateWatch<TContext = unknown>(params: T.DeactivateWatchRequest, callback: callbackFn<T.DeactivateWatchResponse, TContext>): TransportRequestCallback
    deactivateWatch<TContext = unknown>(params: T.DeactivateWatchRequest, options: TransportRequestOptions, callback: callbackFn<T.DeactivateWatchResponse, TContext>): TransportRequestCallback
    deleteWatch<TContext = unknown>(params: T.DeleteWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.DeleteWatchResponse, TContext>>
    deleteWatch<TContext = unknown>(params: T.DeleteWatchRequest, callback: callbackFn<T.DeleteWatchResponse, TContext>): TransportRequestCallback
    deleteWatch<TContext = unknown>(params: T.DeleteWatchRequest, options: TransportRequestOptions, callback: callbackFn<T.DeleteWatchResponse, TContext>): TransportRequestCallback
    executeWatch<TContext = unknown>(params?: T.ExecuteWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.ExecuteWatchResponse, TContext>>
    executeWatch<TContext = unknown>(callback: callbackFn<T.ExecuteWatchResponse, TContext>): TransportRequestCallback
    executeWatch<TContext = unknown>(params: T.ExecuteWatchRequest, callback: callbackFn<T.ExecuteWatchResponse, TContext>): TransportRequestCallback
    executeWatch<TContext = unknown>(params: T.ExecuteWatchRequest, options: TransportRequestOptions, callback: callbackFn<T.ExecuteWatchResponse, TContext>): TransportRequestCallback
    getWatch<TContext = unknown>(params: T.GetWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.GetWatchResponse, TContext>>
    getWatch<TContext = unknown>(params: T.GetWatchRequest, callback: callbackFn<T.GetWatchResponse, TContext>): TransportRequestCallback
    getWatch<TContext = unknown>(params: T.GetWatchRequest, options: TransportRequestOptions, callback: callbackFn<T.GetWatchResponse, TContext>): TransportRequestCallback
    putWatch<TContext = unknown>(params: T.PutWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.PutWatchResponse, TContext>>
    putWatch<TContext = unknown>(params: T.PutWatchRequest, callback: callbackFn<T.PutWatchResponse, TContext>): TransportRequestCallback
    putWatch<TContext = unknown>(params: T.PutWatchRequest, options: TransportRequestOptions, callback: callbackFn<T.PutWatchResponse, TContext>): TransportRequestCallback
    queryWatches<TContext = unknown>(params?: TODO, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TODO, TContext>>
    queryWatches<TContext = unknown>(callback: callbackFn<TODO, TContext>): TransportRequestCallback
    queryWatches<TContext = unknown>(params: TODO, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    queryWatches<TContext = unknown>(params: TODO, options: TransportRequestOptions, callback: callbackFn<TODO, TContext>): TransportRequestCallback
    start<TContext = unknown>(params?: T.StartWatcherRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StartWatcherResponse, TContext>>
    start<TContext = unknown>(callback: callbackFn<T.StartWatcherResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params: T.StartWatcherRequest, callback: callbackFn<T.StartWatcherResponse, TContext>): TransportRequestCallback
    start<TContext = unknown>(params: T.StartWatcherRequest, options: TransportRequestOptions, callback: callbackFn<T.StartWatcherResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params?: T.WatcherStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.WatcherStatsResponse, TContext>>
    stats<TContext = unknown>(callback: callbackFn<T.WatcherStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.WatcherStatsRequest, callback: callbackFn<T.WatcherStatsResponse, TContext>): TransportRequestCallback
    stats<TContext = unknown>(params: T.WatcherStatsRequest, options: TransportRequestOptions, callback: callbackFn<T.WatcherStatsResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params?: T.StopWatcherRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.StopWatcherResponse, TContext>>
    stop<TContext = unknown>(callback: callbackFn<T.StopWatcherResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params: T.StopWatcherRequest, callback: callbackFn<T.StopWatcherResponse, TContext>): TransportRequestCallback
    stop<TContext = unknown>(params: T.StopWatcherRequest, options: TransportRequestOptions, callback: callbackFn<T.StopWatcherResponse, TContext>): TransportRequestCallback
  }
  xpack: {
    info<TContext = unknown>(params?: T.XPackInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.XPackInfoResponse, TContext>>
    info<TContext = unknown>(callback: callbackFn<T.XPackInfoResponse, TContext>): TransportRequestCallback
    info<TContext = unknown>(params: T.XPackInfoRequest, callback: callbackFn<T.XPackInfoResponse, TContext>): TransportRequestCallback
    info<TContext = unknown>(params: T.XPackInfoRequest, options: TransportRequestOptions, callback: callbackFn<T.XPackInfoResponse, TContext>): TransportRequestCallback
    usage<TContext = unknown>(params?: T.XPackUsageRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<T.XPackUsageResponse, TContext>>
    usage<TContext = unknown>(callback: callbackFn<T.XPackUsageResponse, TContext>): TransportRequestCallback
    usage<TContext = unknown>(params: T.XPackUsageRequest, callback: callbackFn<T.XPackUsageResponse, TContext>): TransportRequestCallback
    usage<TContext = unknown>(params: T.XPackUsageRequest, options: TransportRequestOptions, callback: callbackFn<T.XPackUsageResponse, TContext>): TransportRequestCallback
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
};
