// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

/// <reference types="node" />

import { ConnectionOptions as TlsConnectionOptions } from 'tls';
import Transport, {
  ApiError,
  ApiResponse,
  RequestEvent,
  TransportRequestParams,
  TransportRequestOptions,
  nodeFilterFn,
  nodeSelectorFn,
  generateRequestIdFn,
  TransportRequestCallback,
  RequestBody,
  RequestNDBody,
  ResponseBody
} from './lib/Transport';
import { URL } from 'url';
import Connection, { AgentOptions, agentFn } from './lib/Connection';
import {
  ConnectionPool,
  BaseConnectionPool,
  CloudConnectionPool,
  ResurrectEvent,
  BasicAuth,
  ApiKeyAuth
} from './lib/pool';
import Serializer from './lib/Serializer';
import Helpers from './lib/Helpers';
import * as RequestParams from './api/requestParams';
import * as errors from './lib/errors';

declare type callbackFn<Response, Context> = (err: ApiError, result: ApiResponse<Response, Context>) => void;

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
  headers?: Record<string, any>;
  roles?: {
    master: boolean;
    data: boolean;
    ingest: boolean;
    ml: boolean;
  }
}

interface ClientOptions {
  node?: string | string[] | NodeOptions | NodeOptions[];
  nodes?: string | string[] | NodeOptions | NodeOptions[];
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
  headers?: Record<string, any>;
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
  helpers: Helpers;
  child(opts?: ClientOptions): Client;
  close(callback?: Function): Promise<void> | void;
  /* GENERATED */
  async_search: {
    delete<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.AsyncSearchDelete, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AsyncSearchDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AsyncSearchDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.AsyncSearchGet, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AsyncSearchGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AsyncSearchGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.AsyncSearchSubmit<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    submit<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AsyncSearchSubmit<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AsyncSearchSubmit<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  asyncSearch: {
    delete<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.AsyncSearchDelete, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AsyncSearchDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AsyncSearchDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.AsyncSearchGet, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AsyncSearchGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AsyncSearchGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.AsyncSearchSubmit<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    submit<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AsyncSearchSubmit<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AsyncSearchSubmit<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  autoscaling: {
    get_autoscaling_decision<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.AutoscalingGetAutoscalingDecision, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_autoscaling_decision<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_decision<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_decision<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingDecision<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.AutoscalingGetAutoscalingDecision, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getAutoscalingDecision<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingDecision<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingDecision<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  bulk<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Bulk<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  bulk<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  bulk<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Bulk<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  bulk<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Bulk<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  cat: {
    aliases<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatAliases, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    aliases<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    aliases<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatAliases, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    aliases<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatAliases, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatAllocation, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    allocation<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatAllocation, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatAllocation, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    count<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatCount, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    count<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    count<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatCount, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    count<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatCount, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    fielddata<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatFielddata, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    fielddata<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    fielddata<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatFielddata, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    fielddata<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatFielddata, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatHealth, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    health<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatHealth, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatHealth, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    help<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatHelp, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    help<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    help<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatHelp, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    help<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatHelp, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    indices<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatIndices, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    indices<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    indices<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatIndices, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    indices<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatIndices, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    master<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatMaster, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    master<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    master<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMaster, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    master<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMaster, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_data_frame_analytics<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatMlDataFrameAnalytics, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    ml_data_frame_analytics<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_data_frame_analytics<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_data_frame_analytics<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatMlDataFrameAnalytics, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    mlDataFrameAnalytics<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_datafeeds<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatMlDatafeeds, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    ml_datafeeds<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_datafeeds<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlDatafeeds, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_datafeeds<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlDatafeeds, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatMlDatafeeds, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    mlDatafeeds<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlDatafeeds, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlDatafeeds, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_jobs<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatMlJobs, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    ml_jobs<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_jobs<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_jobs<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlJobs<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatMlJobs, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    mlJobs<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlJobs<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlJobs<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_trained_models<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatMlTrainedModels, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    ml_trained_models<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_trained_models<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlTrainedModels, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_trained_models<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlTrainedModels, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatMlTrainedModels, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    mlTrainedModels<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlTrainedModels, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatMlTrainedModels, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodeattrs<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatNodeattrs, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    nodeattrs<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodeattrs<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatNodeattrs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodeattrs<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatNodeattrs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodes<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatNodes, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    nodes<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodes<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatNodes, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodes<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatNodes, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatPendingTasks, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    pending_tasks<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatPendingTasks, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatPendingTasks, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatPendingTasks, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    pendingTasks<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatPendingTasks, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatPendingTasks, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    plugins<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatPlugins, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    plugins<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    plugins<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatPlugins, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    plugins<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatPlugins, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatRecovery, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    recovery<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatRecovery, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatRecovery, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositories<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatRepositories, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    repositories<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositories<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatRepositories, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositories<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatRepositories, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatSegments, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    segments<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatSegments, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatSegments, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shards<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatShards, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    shards<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shards<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatShards, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shards<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatShards, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    snapshots<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatSnapshots, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    snapshots<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    snapshots<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatSnapshots, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    snapshots<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatSnapshots, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    tasks<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatTasks, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    tasks<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    tasks<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatTasks, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    tasks<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatTasks, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    templates<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatTemplates, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    templates<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    templates<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatTemplates, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    templates<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatTemplates, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    thread_pool<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatThreadPool, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    thread_pool<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    thread_pool<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatThreadPool, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    thread_pool<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatThreadPool, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    threadPool<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatThreadPool, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    threadPool<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    threadPool<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatThreadPool, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    threadPool<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatThreadPool, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    transform<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CatTransform, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    transform<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    transform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    transform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CatTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ccr: {
    delete_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrDeleteAutoFollowPattern, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrDeleteAutoFollowPattern, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrFollow<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    follow<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrFollow<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrFollow<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_info<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrFollowInfo, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    follow_info<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_info<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrFollowInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_info<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrFollowInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followInfo<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrFollowInfo, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    followInfo<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followInfo<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrFollowInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followInfo<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrFollowInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_stats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrFollowStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    follow_stats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrFollowStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrFollowStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followStats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrFollowStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    followStats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followStats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrFollowStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followStats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrFollowStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forget_follower<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrForgetFollower<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    forget_follower<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forget_follower<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrForgetFollower<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forget_follower<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrForgetFollower<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forgetFollower<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrForgetFollower<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    forgetFollower<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forgetFollower<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrForgetFollower<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forgetFollower<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrForgetFollower<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrGetAutoFollowPattern, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrGetAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrGetAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrGetAutoFollowPattern, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrGetAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrGetAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrPauseAutoFollowPattern, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    pause_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrPauseAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrPauseAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrPauseAutoFollowPattern, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    pauseAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrPauseAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrPauseAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_follow<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrPauseFollow, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    pause_follow<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_follow<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrPauseFollow, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_follow<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrPauseFollow, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseFollow<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrPauseFollow, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    pauseFollow<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseFollow<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrPauseFollow, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseFollow<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrPauseFollow, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_auto_follow_pattern<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_auto_follow_pattern<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_auto_follow_pattern<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_auto_follow_pattern<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putAutoFollowPattern<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrResumeAutoFollowPattern, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    resume_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrResumeAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_auto_follow_pattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrResumeAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrResumeAutoFollowPattern, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    resumeAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrResumeAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrResumeAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_follow<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrResumeFollow<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    resume_follow<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_follow<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrResumeFollow<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_follow<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrResumeFollow<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeFollow<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrResumeFollow<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    resumeFollow<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeFollow<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrResumeFollow<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeFollow<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrResumeFollow<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfollow<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.CcrUnfollow, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    unfollow<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfollow<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrUnfollow, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfollow<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.CcrUnfollow, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  clear_scroll<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClearScroll<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  clear_scroll<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clear_scroll<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClearScroll<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clear_scroll<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClearScroll<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clearScroll<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClearScroll<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  clearScroll<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clearScroll<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClearScroll<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clearScroll<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClearScroll<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  cluster: {
    allocation_explain<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterAllocationExplain<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    allocation_explain<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation_explain<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterAllocationExplain<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation_explain<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterAllocationExplain<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocationExplain<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterAllocationExplain<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    allocationExplain<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocationExplain<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterAllocationExplain<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocationExplain<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterAllocationExplain<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_component_template<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterDeleteComponentTemplate, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_component_template<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_component_template<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_component_template<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteComponentTemplate<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterDeleteComponentTemplate, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteComponentTemplate<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteComponentTemplate<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteComponentTemplate<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_component_template<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterGetComponentTemplate, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_component_template<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_component_template<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterGetComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_component_template<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterGetComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getComponentTemplate<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterGetComponentTemplate, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getComponentTemplate<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getComponentTemplate<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterGetComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getComponentTemplate<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterGetComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterGetSettings, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_settings<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterGetSettings, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterGetSettings, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterGetSettings, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getSettings<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterGetSettings, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterGetSettings, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterHealth, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    health<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterHealth, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterHealth, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterPendingTasks, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    pending_tasks<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterPendingTasks, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterPendingTasks, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterPendingTasks, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    pendingTasks<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterPendingTasks, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterPendingTasks, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_component_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterPutComponentTemplate<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_component_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_component_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterPutComponentTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_component_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterPutComponentTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putComponentTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterPutComponentTemplate<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putComponentTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putComponentTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterPutComponentTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putComponentTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterPutComponentTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterPutSettings<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_settings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterPutSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterPutSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterPutSettings<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putSettings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterPutSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterPutSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remote_info<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterRemoteInfo, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    remote_info<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remote_info<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterRemoteInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remote_info<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterRemoteInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remoteInfo<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterRemoteInfo, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    remoteInfo<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remoteInfo<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterRemoteInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remoteInfo<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterRemoteInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reroute<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterReroute<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    reroute<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reroute<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterReroute<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reroute<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterReroute<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    state<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterState, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    state<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    state<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterState, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    state<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterState, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ClusterStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ClusterStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  count<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Count<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  count<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  count<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Count<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  count<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Count<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  create<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Create<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  create<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  create<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Create<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  create<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Create<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Delete, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  delete<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Delete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Delete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.DeleteByQuery<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  delete_by_query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.DeleteByQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.DeleteByQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQuery<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.DeleteByQuery<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  deleteByQuery<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQuery<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.DeleteByQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQuery<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.DeleteByQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query_rethrottle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.DeleteByQueryRethrottle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  delete_by_query_rethrottle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query_rethrottle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.DeleteByQueryRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query_rethrottle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.DeleteByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQueryRethrottle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.DeleteByQueryRethrottle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  deleteByQueryRethrottle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQueryRethrottle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.DeleteByQueryRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQueryRethrottle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.DeleteByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_script<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.DeleteScript, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  delete_script<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_script<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.DeleteScript, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_script<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.DeleteScript, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteScript<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.DeleteScript, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  deleteScript<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteScript<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.DeleteScript, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteScript<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.DeleteScript, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  enrich: {
    delete_policy<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.EnrichDeletePolicy, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_policy<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_policy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichDeletePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_policy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichDeletePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePolicy<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.EnrichDeletePolicy, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deletePolicy<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePolicy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichDeletePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePolicy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichDeletePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_policy<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.EnrichExecutePolicy, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    execute_policy<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_policy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichExecutePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_policy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichExecutePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executePolicy<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.EnrichExecutePolicy, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    executePolicy<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executePolicy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichExecutePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executePolicy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichExecutePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_policy<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.EnrichGetPolicy, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_policy<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_policy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichGetPolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_policy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichGetPolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPolicy<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.EnrichGetPolicy, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getPolicy<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPolicy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichGetPolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPolicy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichGetPolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_policy<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.EnrichPutPolicy<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_policy<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_policy<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichPutPolicy<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_policy<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichPutPolicy<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPolicy<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.EnrichPutPolicy<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putPolicy<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPolicy<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichPutPolicy<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPolicy<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichPutPolicy<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.EnrichStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EnrichStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  eql: {
    search<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.EqlSearch<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    search<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    search<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EqlSearch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    search<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.EqlSearch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  exists<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Exists, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  exists<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Exists, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Exists, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists_source<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ExistsSource, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  exists_source<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists_source<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ExistsSource, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists_source<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ExistsSource, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  existsSource<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ExistsSource, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  existsSource<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  existsSource<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ExistsSource, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  existsSource<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ExistsSource, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  explain<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Explain<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  explain<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  explain<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Explain<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  explain<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Explain<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  field_caps<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.FieldCaps, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  field_caps<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  field_caps<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.FieldCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  field_caps<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.FieldCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  fieldCaps<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.FieldCaps, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  fieldCaps<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  fieldCaps<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.FieldCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  fieldCaps<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.FieldCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Get, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  get<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Get, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Get, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.GetScript, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  get_script<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetScript, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetScript, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScript<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.GetScript, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  getScript<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScript<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetScript, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScript<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetScript, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_context<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.GetScriptContext, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  get_script_context<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_context<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetScriptContext, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_context<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetScriptContext, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptContext<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.GetScriptContext, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  getScriptContext<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptContext<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetScriptContext, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptContext<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetScriptContext, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_languages<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.GetScriptLanguages, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  get_script_languages<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_languages<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetScriptLanguages, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_languages<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetScriptLanguages, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptLanguages<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.GetScriptLanguages, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  getScriptLanguages<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptLanguages<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetScriptLanguages, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptLanguages<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetScriptLanguages, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_source<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.GetSource, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  get_source<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_source<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetSource, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_source<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetSource, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getSource<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.GetSource, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  getSource<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getSource<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetSource, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getSource<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GetSource, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  graph: {
    explore<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.GraphExplore<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    explore<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explore<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GraphExplore<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explore<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.GraphExplore<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ilm: {
    delete_lifecycle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmDeleteLifecycle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_lifecycle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmDeleteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmDeleteLifecycle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteLifecycle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmDeleteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_lifecycle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmExplainLifecycle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    explain_lifecycle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_lifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmExplainLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_lifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmExplainLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainLifecycle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmExplainLifecycle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    explainLifecycle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainLifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmExplainLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainLifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmExplainLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmGetLifecycle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_lifecycle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmGetLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmGetLifecycle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getLifecycle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmGetLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmGetStatus, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_status<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmGetStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmGetStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmGetStatus, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getStatus<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmGetStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmGetStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    move_to_step<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmMoveToStep<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    move_to_step<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    move_to_step<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmMoveToStep<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    move_to_step<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmMoveToStep<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    moveToStep<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmMoveToStep<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    moveToStep<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    moveToStep<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmMoveToStep<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    moveToStep<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmMoveToStep<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmPutLifecycle<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_lifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmPutLifecycle<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmPutLifecycle<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmPutLifecycle<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putLifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmPutLifecycle<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmPutLifecycle<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remove_policy<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmRemovePolicy, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    remove_policy<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remove_policy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmRemovePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remove_policy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmRemovePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    removePolicy<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmRemovePolicy, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    removePolicy<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    removePolicy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmRemovePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    removePolicy<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmRemovePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    retry<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmRetry, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    retry<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    retry<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmRetry, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    retry<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmRetry, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmStart, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    start<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmStart, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmStart, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IlmStop, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stop<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmStop, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IlmStop, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  index<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Index<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  index<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  index<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Index<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  index<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Index<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  indices: {
    analyze<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesAnalyze<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    analyze<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    analyze<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesAnalyze<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    analyze<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesAnalyze<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesClearCache, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    clear_cache<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesClearCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesClearCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesClearCache, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    clearCache<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesClearCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesClearCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clone<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesClone<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    clone<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clone<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesClone<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clone<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesClone<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesClose, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    close<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesClose, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesClose, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesCreate<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    create<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesCreate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesCreate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_data_stream<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesCreateDataStream<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    create_data_stream<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_data_stream<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesCreateDataStream<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_data_stream<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesCreateDataStream<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createDataStream<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesCreateDataStream<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    createDataStream<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createDataStream<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesCreateDataStream<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createDataStream<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesCreateDataStream<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesDelete, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_alias<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesDeleteAlias, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_alias<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_alias<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesDeleteAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_alias<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesDeleteAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAlias<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesDeleteAlias, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteAlias<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAlias<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesDeleteAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAlias<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesDeleteAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_stream<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesDeleteDataStream, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_data_stream<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_stream<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesDeleteDataStream, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_stream<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesDeleteDataStream, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataStream<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesDeleteDataStream, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteDataStream<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataStream<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesDeleteDataStream, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataStream<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesDeleteDataStream, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_template<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesDeleteTemplate, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_template<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_template<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesDeleteTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_template<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesDeleteTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTemplate<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesDeleteTemplate, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteTemplate<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTemplate<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesDeleteTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTemplate<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesDeleteTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesExists, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    exists<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesExists, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesExists, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_alias<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesExistsAlias, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    exists_alias<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_alias<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesExistsAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_alias<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesExistsAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsAlias<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesExistsAlias, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    existsAlias<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsAlias<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesExistsAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsAlias<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesExistsAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_template<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesExistsTemplate, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    exists_template<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_template<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesExistsTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_template<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesExistsTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsTemplate<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesExistsTemplate, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    existsTemplate<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsTemplate<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesExistsTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsTemplate<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesExistsTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_type<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesExistsType, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    exists_type<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_type<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesExistsType, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_type<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesExistsType, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsType<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesExistsType, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    existsType<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsType<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesExistsType, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsType<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesExistsType, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesFlush, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    flush<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesFlush, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesFlush, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_synced<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesFlushSynced, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    flush_synced<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_synced<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesFlushSynced, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_synced<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesFlushSynced, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushSynced<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesFlushSynced, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    flushSynced<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushSynced<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesFlushSynced, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushSynced<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesFlushSynced, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forcemerge<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesForcemerge, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    forcemerge<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forcemerge<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesForcemerge, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forcemerge<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesForcemerge, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    freeze<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesFreeze, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    freeze<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    freeze<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesFreeze, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    freeze<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesFreeze, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesGet, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_alias<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesGetAlias, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_alias<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_alias<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_alias<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAlias<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesGetAlias, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getAlias<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAlias<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAlias<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_streams<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesGetDataStreams, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_data_streams<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_streams<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetDataStreams, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_streams<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetDataStreams, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataStreams<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesGetDataStreams, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getDataStreams<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataStreams<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetDataStreams, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataStreams<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetDataStreams, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_field_mapping<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesGetFieldMapping, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_field_mapping<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_field_mapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetFieldMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_field_mapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetFieldMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFieldMapping<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesGetFieldMapping, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getFieldMapping<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFieldMapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetFieldMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFieldMapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetFieldMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_mapping<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesGetMapping, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_mapping<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_mapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_mapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getMapping<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesGetMapping, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getMapping<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getMapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getMapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesGetSettings, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_settings<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetSettings, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetSettings, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesGetSettings, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getSettings<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetSettings, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetSettings, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_template<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesGetTemplate, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_template<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_template<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_template<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTemplate<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesGetTemplate, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getTemplate<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTemplate<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTemplate<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_upgrade<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesGetUpgrade, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_upgrade<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_upgrade<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetUpgrade, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_upgrade<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetUpgrade, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUpgrade<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesGetUpgrade, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getUpgrade<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUpgrade<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetUpgrade, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUpgrade<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesGetUpgrade, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesOpen, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    open<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesOpen, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesOpen, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_alias<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesPutAlias<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_alias<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_alias<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutAlias<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_alias<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutAlias<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAlias<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesPutAlias<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putAlias<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAlias<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutAlias<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAlias<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutAlias<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_mapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesPutMapping<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_mapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_mapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutMapping<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_mapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutMapping<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putMapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesPutMapping<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putMapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putMapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutMapping<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putMapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutMapping<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesPutSettings<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_settings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesPutSettings<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putSettings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesPutTemplate<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesPutTemplate<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesPutTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesRecovery, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    recovery<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesRecovery, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesRecovery, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    refresh<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesRefresh, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    refresh<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    refresh<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesRefresh, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    refresh<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesRefresh, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_search_analyzers<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesReloadSearchAnalyzers, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    reload_search_analyzers<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_search_analyzers<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_search_analyzers<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesReloadSearchAnalyzers, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    reloadSearchAnalyzers<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollover<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesRollover<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    rollover<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollover<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesRollover<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollover<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesRollover<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesSegments, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    segments<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesSegments, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesSegments, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shard_stores<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesShardStores, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    shard_stores<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shard_stores<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesShardStores, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shard_stores<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesShardStores, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shardStores<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesShardStores, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    shardStores<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shardStores<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesShardStores, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shardStores<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesShardStores, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shrink<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesShrink<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    shrink<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shrink<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesShrink<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shrink<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesShrink<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    split<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesSplit<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    split<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    split<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesSplit<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    split<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesSplit<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfreeze<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesUnfreeze, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    unfreeze<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfreeze<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesUnfreeze, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfreeze<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesUnfreeze, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_aliases<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesUpdateAliases<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    update_aliases<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_aliases<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesUpdateAliases<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_aliases<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesUpdateAliases<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateAliases<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesUpdateAliases<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    updateAliases<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateAliases<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesUpdateAliases<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateAliases<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesUpdateAliases<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesUpgrade, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    upgrade<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesUpgrade, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesUpgrade, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesValidateQuery<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    validate_query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesValidateQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesValidateQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateQuery<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IndicesValidateQuery<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    validateQuery<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateQuery<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesValidateQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateQuery<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IndicesValidateQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  info<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Info, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  info<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  info<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Info, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  info<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Info, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  ingest: {
    delete_pipeline<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IngestDeletePipeline, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_pipeline<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_pipeline<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestDeletePipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_pipeline<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestDeletePipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePipeline<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IngestDeletePipeline, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deletePipeline<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePipeline<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestDeletePipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePipeline<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestDeletePipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_pipeline<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IngestGetPipeline, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_pipeline<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_pipeline<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestGetPipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_pipeline<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestGetPipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPipeline<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IngestGetPipeline, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getPipeline<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPipeline<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestGetPipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPipeline<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestGetPipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processor_grok<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IngestProcessorGrok, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    processor_grok<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processor_grok<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestProcessorGrok, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processor_grok<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestProcessorGrok, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processorGrok<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IngestProcessorGrok, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    processorGrok<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processorGrok<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestProcessorGrok, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processorGrok<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestProcessorGrok, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_pipeline<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IngestPutPipeline<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_pipeline<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_pipeline<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestPutPipeline<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_pipeline<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestPutPipeline<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPipeline<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IngestPutPipeline<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putPipeline<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPipeline<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestPutPipeline<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPipeline<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestPutPipeline<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.IngestSimulate<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    simulate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestSimulate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.IngestSimulate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  license: {
    delete<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.LicenseDelete, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicenseDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicenseDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.LicenseGet, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicenseGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicenseGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_basic_status<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.LicenseGetBasicStatus, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_basic_status<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_basic_status<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicenseGetBasicStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_basic_status<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicenseGetBasicStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBasicStatus<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.LicenseGetBasicStatus, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getBasicStatus<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBasicStatus<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicenseGetBasicStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBasicStatus<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicenseGetBasicStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trial_status<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.LicenseGetTrialStatus, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_trial_status<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trial_status<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicenseGetTrialStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trial_status<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicenseGetTrialStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrialStatus<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.LicenseGetTrialStatus, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getTrialStatus<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrialStatus<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicenseGetTrialStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrialStatus<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicenseGetTrialStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.LicensePost<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    post<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicensePost<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicensePost<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_basic<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.LicensePostStartBasic, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    post_start_basic<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_basic<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicensePostStartBasic, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_basic<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicensePostStartBasic, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartBasic<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.LicensePostStartBasic, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    postStartBasic<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartBasic<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicensePostStartBasic, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartBasic<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicensePostStartBasic, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_trial<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.LicensePostStartTrial, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    post_start_trial<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_trial<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicensePostStartTrial, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_trial<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicensePostStartTrial, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartTrial<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.LicensePostStartTrial, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    postStartTrial<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartTrial<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicensePostStartTrial, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartTrial<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.LicensePostStartTrial, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  mget<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Mget<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  mget<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mget<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Mget<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mget<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Mget<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  migration: {
    deprecations<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MigrationDeprecations, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deprecations<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deprecations<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MigrationDeprecations, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deprecations<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MigrationDeprecations, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ml: {
    close_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlCloseJob<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    close_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlCloseJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlCloseJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    closeJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlCloseJob<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    closeJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    closeJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlCloseJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    closeJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlCloseJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteCalendar, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_calendar<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteCalendar, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteCalendar, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendar<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteCalendar, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteCalendar<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendar<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteCalendar, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendar<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteCalendar, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_event<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteCalendarEvent, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_calendar_event<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_event<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteCalendarEvent, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_event<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteCalendarEvent, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteCalendarEvent, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteCalendarEvent<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteCalendarEvent, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteCalendarEvent, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_job<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteCalendarJob, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_calendar_job<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_job<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteCalendarJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_job<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteCalendarJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteCalendarJob, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteCalendarJob<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteCalendarJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteCalendarJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_frame_analytics<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteDataFrameAnalytics, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_data_frame_analytics<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_frame_analytics<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_frame_analytics<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteDataFrameAnalytics, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteDataFrameAnalytics<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_datafeed<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteDatafeed, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_datafeed<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_datafeed<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteDatafeed, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_datafeed<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteDatafeed, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteDatafeed, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteDatafeed<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteDatafeed, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteDatafeed, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_expired_data<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteExpiredData, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_expired_data<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_expired_data<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteExpiredData, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_expired_data<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteExpiredData, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteExpiredData, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteExpiredData<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteExpiredData, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteExpiredData, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_filter<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteFilter, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_filter<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_filter<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteFilter, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_filter<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteFilter, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteFilter<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteFilter, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteFilter<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteFilter<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteFilter, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteFilter<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteFilter, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_forecast<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteForecast, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_forecast<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_forecast<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteForecast, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_forecast<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteForecast, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteForecast<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteForecast, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteForecast<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteForecast<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteForecast, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteForecast<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteForecast, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteJob, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_job<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteJob, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteJob<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_model_snapshot<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteModelSnapshot, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_model_snapshot<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_model_snapshot<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteModelSnapshot, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_model_snapshot<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteModelSnapshot, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteModelSnapshot, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteModelSnapshot<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteModelSnapshot, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteModelSnapshot, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_trained_model<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteTrainedModel, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_trained_model<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_trained_model<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteTrainedModel, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_trained_model<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteTrainedModel, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlDeleteTrainedModel, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteTrainedModel<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteTrainedModel, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlDeleteTrainedModel, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimate_model_memory<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlEstimateModelMemory<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    estimate_model_memory<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimate_model_memory<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlEstimateModelMemory<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimate_model_memory<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlEstimateModelMemory<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlEstimateModelMemory<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    estimateModelMemory<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlEstimateModelMemory<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlEstimateModelMemory<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluate_data_frame<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlEvaluateDataFrame<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    evaluate_data_frame<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluate_data_frame<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlEvaluateDataFrame<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluate_data_frame<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlEvaluateDataFrame<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlEvaluateDataFrame<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    evaluateDataFrame<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlEvaluateDataFrame<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlEvaluateDataFrame<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    explain_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    explainDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_file_structure<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlFindFileStructure<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    find_file_structure<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_file_structure<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlFindFileStructure<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_file_structure<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlFindFileStructure<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findFileStructure<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlFindFileStructure<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    findFileStructure<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findFileStructure<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlFindFileStructure<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findFileStructure<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlFindFileStructure<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlFlushJob<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    flush_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlFlushJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlFlushJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlFlushJob<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    flushJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlFlushJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlFlushJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forecast<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlForecast, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    forecast<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forecast<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlForecast, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forecast<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlForecast, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_buckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetBuckets<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_buckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_buckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetBuckets<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_buckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetBuckets<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetBuckets<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getBuckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetBuckets<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetBuckets<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendar_events<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetCalendarEvents, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_calendar_events<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendar_events<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetCalendarEvents, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendar_events<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetCalendarEvents, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetCalendarEvents, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getCalendarEvents<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetCalendarEvents, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetCalendarEvents, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendars<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetCalendars<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_calendars<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendars<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetCalendars<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendars<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetCalendars<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendars<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetCalendars<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getCalendars<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendars<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetCalendars<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendars<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetCalendars<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_categories<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetCategories<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_categories<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_categories<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetCategories<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_categories<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetCategories<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCategories<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetCategories<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getCategories<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCategories<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetCategories<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCategories<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetCategories<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetDataFrameAnalytics, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_data_frame_analytics<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetDataFrameAnalytics, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getDataFrameAnalytics<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics_stats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetDataFrameAnalyticsStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_data_frame_analytics_stats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics_stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics_stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetDataFrameAnalyticsStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getDataFrameAnalyticsStats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeed_stats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetDatafeedStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_datafeed_stats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeed_stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDatafeedStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeed_stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDatafeedStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetDatafeedStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getDatafeedStats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDatafeedStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDatafeedStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeeds<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetDatafeeds, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_datafeeds<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeeds<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDatafeeds, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeeds<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDatafeeds, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeeds<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetDatafeeds, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getDatafeeds<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeeds<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDatafeeds, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeeds<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetDatafeeds, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_filters<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetFilters, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_filters<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_filters<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetFilters, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_filters<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetFilters, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFilters<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetFilters, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getFilters<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFilters<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetFilters, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFilters<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetFilters, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_influencers<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetInfluencers<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_influencers<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_influencers<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetInfluencers<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_influencers<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetInfluencers<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getInfluencers<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetInfluencers<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getInfluencers<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getInfluencers<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetInfluencers<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getInfluencers<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetInfluencers<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_job_stats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetJobStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_job_stats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_job_stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetJobStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_job_stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetJobStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobStats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetJobStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getJobStats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobStats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetJobStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobStats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetJobStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetJobs, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_jobs<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetJobs, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getJobs<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_model_snapshots<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetModelSnapshots<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_model_snapshots<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_model_snapshots<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetModelSnapshots<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_model_snapshots<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetModelSnapshots<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getModelSnapshots<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetModelSnapshots<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getModelSnapshots<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getModelSnapshots<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetModelSnapshots<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getModelSnapshots<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetModelSnapshots<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_overall_buckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetOverallBuckets<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_overall_buckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_overall_buckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetOverallBuckets<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_overall_buckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetOverallBuckets<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetOverallBuckets<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getOverallBuckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetOverallBuckets<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetOverallBuckets<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_records<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetRecords<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_records<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_records<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetRecords<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_records<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetRecords<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRecords<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetRecords<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getRecords<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRecords<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetRecords<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRecords<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetRecords<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetTrainedModels, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_trained_models<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetTrainedModels, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetTrainedModels, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModels<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetTrainedModels, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getTrainedModels<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModels<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetTrainedModels, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModels<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetTrainedModels, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models_stats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetTrainedModelsStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_trained_models_stats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models_stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetTrainedModelsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models_stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetTrainedModelsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModelsStats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlGetTrainedModelsStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getTrainedModelsStats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModelsStats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetTrainedModelsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModelsStats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlGetTrainedModelsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlInfo, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    info<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open_job<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlOpenJob, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    open_job<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open_job<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlOpenJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open_job<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlOpenJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    openJob<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlOpenJob, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    openJob<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    openJob<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlOpenJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    openJob<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlOpenJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_calendar_events<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPostCalendarEvents<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    post_calendar_events<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_calendar_events<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPostCalendarEvents<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_calendar_events<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPostCalendarEvents<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPostCalendarEvents<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    postCalendarEvents<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPostCalendarEvents<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPostCalendarEvents<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_data<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPostData<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    post_data<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_data<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPostData<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_data<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPostData<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postData<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPostData<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    postData<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postData<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPostData<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postData<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPostData<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_datafeed<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPreviewDatafeed, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    preview_datafeed<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_datafeed<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPreviewDatafeed, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_datafeed<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPreviewDatafeed, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewDatafeed<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPreviewDatafeed, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    previewDatafeed<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewDatafeed<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPreviewDatafeed, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewDatafeed<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPreviewDatafeed, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPutCalendar<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_calendar<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutCalendar<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutCalendar<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendar<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPutCalendar<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putCalendar<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendar<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutCalendar<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendar<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutCalendar<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar_job<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPutCalendarJob, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_calendar_job<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar_job<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutCalendarJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar_job<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutCalendarJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendarJob<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPutCalendarJob, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putCalendarJob<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendarJob<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutCalendarJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendarJob<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutCalendarJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_datafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPutDatafeed<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_datafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_datafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_datafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDatafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPutDatafeed<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putDatafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDatafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDatafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_filter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPutFilter<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_filter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_filter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutFilter<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_filter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutFilter<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putFilter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPutFilter<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putFilter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putFilter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutFilter<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putFilter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutFilter<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPutJob<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPutJob<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_trained_model<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPutTrainedModel<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_trained_model<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_trained_model<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutTrainedModel<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_trained_model<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutTrainedModel<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTrainedModel<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlPutTrainedModel<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putTrainedModel<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTrainedModel<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutTrainedModel<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTrainedModel<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlPutTrainedModel<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revert_model_snapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlRevertModelSnapshot<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    revert_model_snapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revert_model_snapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlRevertModelSnapshot<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revert_model_snapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlRevertModelSnapshot<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revertModelSnapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlRevertModelSnapshot<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    revertModelSnapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revertModelSnapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlRevertModelSnapshot<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revertModelSnapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlRevertModelSnapshot<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    set_upgrade_mode<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlSetUpgradeMode, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    set_upgrade_mode<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    set_upgrade_mode<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlSetUpgradeMode, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    set_upgrade_mode<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlSetUpgradeMode, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlSetUpgradeMode, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    setUpgradeMode<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlSetUpgradeMode, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlSetUpgradeMode, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    start_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    startDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_datafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlStartDatafeed<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    start_datafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_datafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStartDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_datafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStartDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDatafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlStartDatafeed<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    startDatafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDatafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStartDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDatafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStartDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stop_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_data_frame_analytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stopDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_datafeed<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlStopDatafeed, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stop_datafeed<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_datafeed<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStopDatafeed, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_datafeed<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStopDatafeed, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDatafeed<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlStopDatafeed, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stopDatafeed<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDatafeed<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStopDatafeed, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDatafeed<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlStopDatafeed, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_datafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlUpdateDatafeed<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    update_datafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_datafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_datafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateDatafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlUpdateDatafeed<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    updateDatafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateDatafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateDatafeed<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_filter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlUpdateFilter<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    update_filter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_filter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateFilter<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_filter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateFilter<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateFilter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlUpdateFilter<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    updateFilter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateFilter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateFilter<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateFilter<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateFilter<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlUpdateJob<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    update_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlUpdateJob<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    updateJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_model_snapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlUpdateModelSnapshot<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    update_model_snapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_model_snapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateModelSnapshot<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_model_snapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateModelSnapshot<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlUpdateModelSnapshot<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    updateModelSnapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateModelSnapshot<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlUpdateModelSnapshot<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlValidate<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    validate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlValidate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlValidate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_detector<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlValidateDetector<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    validate_detector<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_detector<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlValidateDetector<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_detector<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlValidateDetector<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateDetector<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MlValidateDetector<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    validateDetector<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateDetector<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlValidateDetector<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateDetector<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MlValidateDetector<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  monitoring: {
    bulk<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MonitoringBulk<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    bulk<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    bulk<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MonitoringBulk<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    bulk<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MonitoringBulk<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  msearch<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Msearch<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  msearch<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Msearch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Msearch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch_template<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MsearchTemplate<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  msearch_template<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch_template<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MsearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch_template<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MsearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearchTemplate<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.MsearchTemplate<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  msearchTemplate<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearchTemplate<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MsearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearchTemplate<TRequestBody extends RequestNDBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.MsearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mtermvectors<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Mtermvectors<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  mtermvectors<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mtermvectors<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Mtermvectors<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mtermvectors<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Mtermvectors<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  nodes: {
    hot_threads<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.NodesHotThreads, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    hot_threads<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hot_threads<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.NodesHotThreads, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hot_threads<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.NodesHotThreads, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hotThreads<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.NodesHotThreads, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    hotThreads<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hotThreads<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.NodesHotThreads, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hotThreads<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.NodesHotThreads, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.NodesInfo, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    info<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.NodesInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.NodesInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_secure_settings<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.NodesReloadSecureSettings, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    reload_secure_settings<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_secure_settings<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.NodesReloadSecureSettings, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_secure_settings<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.NodesReloadSecureSettings, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.NodesReloadSecureSettings, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    reloadSecureSettings<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.NodesReloadSecureSettings, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.NodesReloadSecureSettings, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.NodesStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.NodesStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.NodesStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.NodesUsage, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    usage<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.NodesUsage, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.NodesUsage, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ping<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Ping, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  ping<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  ping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Ping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  ping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Ping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  put_script<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.PutScript<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  put_script<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  put_script<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.PutScript<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  put_script<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.PutScript<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  putScript<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.PutScript<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  putScript<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  putScript<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.PutScript<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  putScript<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.PutScript<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rank_eval<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RankEval<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  rank_eval<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rank_eval<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RankEval<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rank_eval<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RankEval<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rankEval<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RankEval<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  rankEval<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rankEval<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RankEval<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rankEval<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RankEval<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Reindex<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  reindex<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Reindex<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Reindex<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex_rethrottle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ReindexRethrottle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  reindex_rethrottle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex_rethrottle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ReindexRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex_rethrottle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ReindexRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindexRethrottle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ReindexRethrottle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  reindexRethrottle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindexRethrottle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ReindexRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindexRethrottle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ReindexRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  render_search_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RenderSearchTemplate<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  render_search_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  render_search_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RenderSearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  render_search_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RenderSearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  renderSearchTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RenderSearchTemplate<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  renderSearchTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  renderSearchTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RenderSearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  renderSearchTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RenderSearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rollup: {
    delete_job<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupDeleteJob, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_job<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupDeleteJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupDeleteJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupDeleteJob, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteJob<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupDeleteJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupDeleteJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupGetJobs, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_jobs<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupGetJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupGetJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupGetJobs, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getJobs<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupGetJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupGetJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_caps<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupGetRollupCaps, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_rollup_caps<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_caps<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupGetRollupCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_caps<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupGetRollupCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupCaps<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupGetRollupCaps, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getRollupCaps<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupCaps<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupGetRollupCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupCaps<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupGetRollupCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_index_caps<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupGetRollupIndexCaps, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_rollup_index_caps<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_index_caps<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupGetRollupIndexCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_index_caps<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupGetRollupIndexCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupGetRollupIndexCaps, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getRollupIndexCaps<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupGetRollupIndexCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupGetRollupIndexCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupPutJob<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupPutJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupPutJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupPutJob<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupPutJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupPutJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollup_search<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupRollupSearch<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    rollup_search<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollup_search<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupRollupSearch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollup_search<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupRollupSearch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollupSearch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupRollupSearch<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    rollupSearch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollupSearch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupRollupSearch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollupSearch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupRollupSearch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_job<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupStartJob, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    start_job<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_job<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupStartJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_job<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupStartJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startJob<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupStartJob, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    startJob<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startJob<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupStartJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startJob<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupStartJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_job<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupStopJob, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stop_job<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_job<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupStopJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_job<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupStopJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopJob<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.RollupStopJob, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stopJob<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopJob<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupStopJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopJob<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.RollupStopJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  scripts_painless_execute<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ScriptsPainlessExecute<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  scripts_painless_execute<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scripts_painless_execute<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ScriptsPainlessExecute<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scripts_painless_execute<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ScriptsPainlessExecute<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.ScriptsPainlessExecute<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  scriptsPainlessExecute<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ScriptsPainlessExecute<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.ScriptsPainlessExecute<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scroll<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Scroll<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  scroll<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scroll<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Scroll<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scroll<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Scroll<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Search<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  search<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Search<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Search<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_shards<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SearchShards, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  search_shards<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_shards<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SearchShards, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_shards<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SearchShards, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchShards<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SearchShards, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  searchShards<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchShards<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SearchShards, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchShards<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SearchShards, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SearchTemplate<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  search_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_template<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SearchTemplate<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  searchTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchTemplate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  security: {
    authenticate<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityAuthenticate, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    authenticate<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    authenticate<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityAuthenticate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    authenticate<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityAuthenticate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    change_password<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityChangePassword<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    change_password<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    change_password<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityChangePassword<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    change_password<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityChangePassword<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    changePassword<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityChangePassword<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    changePassword<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    changePassword<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityChangePassword<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    changePassword<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityChangePassword<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_realms<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityClearCachedRealms, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    clear_cached_realms<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_realms<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityClearCachedRealms, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_realms<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityClearCachedRealms, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityClearCachedRealms, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    clearCachedRealms<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityClearCachedRealms, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityClearCachedRealms, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_roles<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityClearCachedRoles, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    clear_cached_roles<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_roles<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityClearCachedRoles, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_roles<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityClearCachedRoles, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityClearCachedRoles, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    clearCachedRoles<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityClearCachedRoles, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityClearCachedRoles, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_api_key<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityCreateApiKey<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    create_api_key<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_api_key<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityCreateApiKey<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_api_key<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityCreateApiKey<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createApiKey<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityCreateApiKey<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    createApiKey<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createApiKey<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityCreateApiKey<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createApiKey<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityCreateApiKey<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_privileges<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityDeletePrivileges, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_privileges<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_privileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeletePrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_privileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeletePrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePrivileges<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityDeletePrivileges, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deletePrivileges<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePrivileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeletePrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePrivileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeletePrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityDeleteRole, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_role<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeleteRole, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeleteRole, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRole<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityDeleteRole, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteRole<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRole<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeleteRole, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRole<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeleteRole, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role_mapping<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityDeleteRoleMapping, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_role_mapping<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role_mapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeleteRoleMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role_mapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeleteRoleMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityDeleteRoleMapping, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteRoleMapping<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeleteRoleMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeleteRoleMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_user<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityDeleteUser, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_user<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_user<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeleteUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_user<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeleteUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteUser<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityDeleteUser, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteUser<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteUser<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeleteUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteUser<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDeleteUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disable_user<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityDisableUser, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    disable_user<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disable_user<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDisableUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disable_user<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDisableUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disableUser<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityDisableUser, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    disableUser<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disableUser<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDisableUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disableUser<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityDisableUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enable_user<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityEnableUser, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    enable_user<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enable_user<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityEnableUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enable_user<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityEnableUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enableUser<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityEnableUser, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    enableUser<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enableUser<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityEnableUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enableUser<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityEnableUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_api_key<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetApiKey, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_api_key<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_api_key<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetApiKey, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_api_key<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetApiKey, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getApiKey<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetApiKey, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getApiKey<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getApiKey<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetApiKey, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getApiKey<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetApiKey, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_builtin_privileges<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetBuiltinPrivileges, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_builtin_privileges<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_builtin_privileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_builtin_privileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetBuiltinPrivileges, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getBuiltinPrivileges<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_privileges<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetPrivileges, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_privileges<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_privileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_privileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPrivileges<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetPrivileges, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getPrivileges<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPrivileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPrivileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetRole, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_role<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetRole, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetRole, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRole<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetRole, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getRole<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRole<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetRole, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRole<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetRole, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role_mapping<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetRoleMapping, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_role_mapping<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role_mapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetRoleMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role_mapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetRoleMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRoleMapping<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetRoleMapping, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getRoleMapping<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRoleMapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetRoleMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRoleMapping<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetRoleMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_token<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetToken<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_token<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_token<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetToken<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_token<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetToken<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getToken<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetToken<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getToken<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getToken<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetToken<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getToken<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetToken<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetUser, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_user<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUser<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetUser, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getUser<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUser<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUser<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user_privileges<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetUserPrivileges, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_user_privileges<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user_privileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetUserPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user_privileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetUserPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityGetUserPrivileges, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getUserPrivileges<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetUserPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityGetUserPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    has_privileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityHasPrivileges<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    has_privileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    has_privileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityHasPrivileges<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    has_privileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityHasPrivileges<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hasPrivileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityHasPrivileges<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    hasPrivileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hasPrivileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityHasPrivileges<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hasPrivileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityHasPrivileges<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_api_key<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityInvalidateApiKey<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    invalidate_api_key<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_api_key<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityInvalidateApiKey<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_api_key<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityInvalidateApiKey<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityInvalidateApiKey<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    invalidateApiKey<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityInvalidateApiKey<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityInvalidateApiKey<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_token<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityInvalidateToken<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    invalidate_token<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_token<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityInvalidateToken<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_token<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityInvalidateToken<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateToken<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityInvalidateToken<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    invalidateToken<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateToken<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityInvalidateToken<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateToken<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityInvalidateToken<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_privileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityPutPrivileges<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_privileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_privileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutPrivileges<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_privileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutPrivileges<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPrivileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityPutPrivileges<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putPrivileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPrivileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutPrivileges<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPrivileges<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutPrivileges<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityPutRole<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_role<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutRole<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutRole<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRole<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityPutRole<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putRole<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRole<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutRole<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRole<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutRole<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role_mapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityPutRoleMapping<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_role_mapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role_mapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutRoleMapping<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role_mapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutRoleMapping<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRoleMapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityPutRoleMapping<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putRoleMapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRoleMapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutRoleMapping<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRoleMapping<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutRoleMapping<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_user<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityPutUser<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_user<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_user<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutUser<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_user<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutUser<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putUser<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SecurityPutUser<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putUser<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putUser<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutUser<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putUser<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SecurityPutUser<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  slm: {
    delete_lifecycle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmDeleteLifecycle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_lifecycle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmDeleteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmDeleteLifecycle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteLifecycle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmDeleteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_lifecycle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmExecuteLifecycle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    execute_lifecycle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_lifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmExecuteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_lifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmExecuteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeLifecycle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmExecuteLifecycle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    executeLifecycle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeLifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmExecuteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeLifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmExecuteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_retention<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmExecuteRetention, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    execute_retention<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_retention<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmExecuteRetention, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_retention<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmExecuteRetention, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeRetention<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmExecuteRetention, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    executeRetention<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeRetention<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmExecuteRetention, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeRetention<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmExecuteRetention, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmGetLifecycle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_lifecycle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmGetLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmGetLifecycle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getLifecycle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmGetLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_stats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmGetStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_stats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmGetStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmGetStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmGetStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getStats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmGetStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmGetStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmGetStatus, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_status<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmGetStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmGetStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmGetStatus, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getStatus<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmGetStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmGetStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmPutLifecycle<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_lifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmPutLifecycle<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmPutLifecycle<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmPutLifecycle<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putLifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmPutLifecycle<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmPutLifecycle<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmStart, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    start<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmStart, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmStart, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SlmStop, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stop<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmStop, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SlmStop, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  snapshot: {
    cleanup_repository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SnapshotCleanupRepository<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    cleanup_repository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanup_repository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotCleanupRepository<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanup_repository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotCleanupRepository<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanupRepository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SnapshotCleanupRepository<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    cleanupRepository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanupRepository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotCleanupRepository<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanupRepository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotCleanupRepository<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SnapshotCreate<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    create<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotCreate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotCreate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_repository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SnapshotCreateRepository<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    create_repository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_repository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotCreateRepository<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_repository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotCreateRepository<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createRepository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SnapshotCreateRepository<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    createRepository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createRepository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotCreateRepository<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createRepository<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotCreateRepository<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SnapshotDelete, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_repository<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SnapshotDeleteRepository, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_repository<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_repository<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotDeleteRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_repository<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotDeleteRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRepository<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SnapshotDeleteRepository, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteRepository<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRepository<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotDeleteRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRepository<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotDeleteRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SnapshotGet, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_repository<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SnapshotGetRepository, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_repository<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_repository<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotGetRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_repository<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotGetRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRepository<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SnapshotGetRepository, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getRepository<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRepository<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotGetRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRepository<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotGetRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    restore<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SnapshotRestore<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    restore<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    restore<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotRestore<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    restore<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotRestore<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SnapshotStatus, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    status<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verify_repository<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SnapshotVerifyRepository, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    verify_repository<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verify_repository<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotVerifyRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verify_repository<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotVerifyRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verifyRepository<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SnapshotVerifyRepository, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    verifyRepository<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verifyRepository<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotVerifyRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verifyRepository<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SnapshotVerifyRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  sql: {
    clear_cursor<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SqlClearCursor<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    clear_cursor<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cursor<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SqlClearCursor<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cursor<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SqlClearCursor<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCursor<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SqlClearCursor<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    clearCursor<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCursor<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SqlClearCursor<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCursor<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SqlClearCursor<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SqlQuery<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SqlQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SqlQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    translate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SqlTranslate<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    translate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    translate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SqlTranslate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    translate<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SqlTranslate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ssl: {
    certificates<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.SslCertificates, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    certificates<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    certificates<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SslCertificates, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    certificates<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.SslCertificates, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  tasks: {
    cancel<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TasksCancel, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    cancel<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cancel<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TasksCancel, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cancel<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TasksCancel, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TasksGet, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TasksGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TasksGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TasksList, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    list<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TasksList, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TasksList, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  termvectors<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Termvectors<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  termvectors<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  termvectors<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Termvectors<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  termvectors<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Termvectors<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  transform: {
    delete_transform<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformDeleteTransform, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_transform<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_transform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformDeleteTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_transform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformDeleteTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformDeleteTransform, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteTransform<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformDeleteTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformDeleteTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformGetTransform, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_transform<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformGetTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformGetTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformGetTransform, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getTransform<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformGetTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformGetTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformGetTransformStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_transform_stats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformGetTransformStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformGetTransformStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformGetTransformStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getTransformStats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformGetTransformStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformGetTransformStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformPreviewTransform<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    preview_transform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformPreviewTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformPreviewTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformPreviewTransform<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    previewTransform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformPreviewTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformPreviewTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformPutTransform<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_transform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformPutTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformPutTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformPutTransform<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putTransform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformPutTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformPutTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformStartTransform, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    start_transform<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformStartTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformStartTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformStartTransform, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    startTransform<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformStartTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformStartTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformStopTransform, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stop_transform<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformStopTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformStopTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformStopTransform, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stopTransform<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformStopTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformStopTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformUpdateTransform<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    update_transform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformUpdateTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformUpdateTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.TransformUpdateTransform<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    updateTransform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformUpdateTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.TransformUpdateTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  update<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.Update<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  update<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Update<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.Update<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.UpdateByQuery<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  update_by_query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.UpdateByQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.UpdateByQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQuery<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.UpdateByQuery<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  updateByQuery<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQuery<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.UpdateByQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQuery<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.UpdateByQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query_rethrottle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.UpdateByQueryRethrottle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  update_by_query_rethrottle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query_rethrottle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.UpdateByQueryRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query_rethrottle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.UpdateByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQueryRethrottle<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.UpdateByQueryRethrottle, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
  updateByQueryRethrottle<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQueryRethrottle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.UpdateByQueryRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQueryRethrottle<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.UpdateByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  watcher: {
    ack_watch<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherAckWatch, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    ack_watch<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ack_watch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherAckWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ack_watch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherAckWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ackWatch<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherAckWatch, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    ackWatch<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ackWatch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherAckWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ackWatch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherAckWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activate_watch<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherActivateWatch, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    activate_watch<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activate_watch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherActivateWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activate_watch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherActivateWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activateWatch<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherActivateWatch, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    activateWatch<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activateWatch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherActivateWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activateWatch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherActivateWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivate_watch<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherDeactivateWatch, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deactivate_watch<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivate_watch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherDeactivateWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivate_watch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherDeactivateWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivateWatch<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherDeactivateWatch, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deactivateWatch<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivateWatch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherDeactivateWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivateWatch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherDeactivateWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_watch<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherDeleteWatch, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    delete_watch<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_watch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherDeleteWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_watch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherDeleteWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteWatch<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherDeleteWatch, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    deleteWatch<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteWatch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherDeleteWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteWatch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherDeleteWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_watch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherExecuteWatch<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    execute_watch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_watch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherExecuteWatch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_watch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherExecuteWatch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeWatch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherExecuteWatch<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    executeWatch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeWatch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherExecuteWatch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeWatch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherExecuteWatch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_watch<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherGetWatch, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    get_watch<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_watch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherGetWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_watch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherGetWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getWatch<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherGetWatch, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    getWatch<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getWatch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherGetWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getWatch<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherGetWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_watch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherPutWatch<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    put_watch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_watch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherPutWatch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_watch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherPutWatch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putWatch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherPutWatch<TRequestBody>, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    putWatch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putWatch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherPutWatch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putWatch<TRequestBody extends RequestBody, TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherPutWatch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherStart, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    start<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherStart, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherStart, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherStats, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stats<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.WatcherStop, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    stop<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherStop, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.WatcherStop, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  xpack: {
    info<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.XpackInfo, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    info<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.XpackInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.XpackInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = ResponseBody, TContext = unknown>(params?: RequestParams.XpackUsage, options?: TransportRequestOptions): Promise<ApiResponse<TResponse, TContext>>
    usage<TResponse = ResponseBody, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.XpackUsage, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = ResponseBody, TContext = unknown>(params: RequestParams.XpackUsage, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  /* /GENERATED */
}

// We must redeclare the EventEmitter class so we can provide
// better type definitions for our events, otherwise the default
// signature is `(event: string | symbol, listener: (...args: any[]) => void): this;`
declare class EventEmitter {
  addListener(event: string | symbol, listener: (...args: any[]) => void): this;
  on(event: 'request', listener: (err: ApiError, meta: RequestEvent) => void): this;
  on(event: 'response', listener: (err: ApiError, meta: RequestEvent) => void): this;
  on(event: 'sniff', listener: (err: ApiError, meta: RequestEvent) => void): this;
  on(event: 'resurrect', listener: (err: null, meta: ResurrectEvent) => void): this;
  once(event: 'request', listener: (err: ApiError, meta: RequestEvent) => void): this;
  once(event: 'response', listener: (err: ApiError, meta: RequestEvent) => void): this;
  once(event: 'sniff', listener: (err: ApiError, meta: RequestEvent) => void): this;
  once(event: 'resurrect', listener: (err: null, meta: ResurrectEvent) => void): this;
  removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
  off(event: string | symbol, listener: (...args: any[]) => void): this;
  removeAllListeners(event?: string | symbol): this;
  setMaxListeners(n: number): this;
  getMaxListeners(): number;
  listeners(event: string | symbol): Function[];
  rawListeners(event: string | symbol): Function[];
  emit(event: string | symbol, ...args: any[]): boolean;
  listenerCount(type: string | symbol): number;
  // Added in Node 6...
  prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
  prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
  eventNames(): Array<string | symbol>;
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
  RequestParams,
  ClientOptions,
  NodeOptions,
  ClientExtendsCallbackOptions
};
