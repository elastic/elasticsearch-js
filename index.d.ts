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
  TransportRequestPromise,
  RequestBody,
  RequestNDBody
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
    delete<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.AsyncSearchDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AsyncSearchDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AsyncSearchDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.AsyncSearchGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AsyncSearchGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AsyncSearchGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.AsyncSearchSubmit<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.AsyncSearchSubmit<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.AsyncSearchSubmit<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  asyncSearch: {
    delete<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.AsyncSearchDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AsyncSearchDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AsyncSearchDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.AsyncSearchGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AsyncSearchGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AsyncSearchGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.AsyncSearchSubmit<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.AsyncSearchSubmit<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.AsyncSearchSubmit<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  autoscaling: {
    delete_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.AutoscalingDeleteAutoscalingPolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingDeleteAutoscalingPolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingDeleteAutoscalingPolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.AutoscalingDeleteAutoscalingPolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingDeleteAutoscalingPolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingDeleteAutoscalingPolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_decision<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.AutoscalingGetAutoscalingDecision, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_autoscaling_decision<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_decision<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_decision<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingDecision<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.AutoscalingGetAutoscalingDecision, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAutoscalingDecision<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingDecision<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingDecision<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.AutoscalingGetAutoscalingPolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingGetAutoscalingPolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingGetAutoscalingPolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.AutoscalingGetAutoscalingPolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingGetAutoscalingPolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingGetAutoscalingPolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_autoscaling_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.AutoscalingPutAutoscalingPolicy<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_autoscaling_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_autoscaling_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingPutAutoscalingPolicy<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_autoscaling_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingPutAutoscalingPolicy<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoscalingPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.AutoscalingPutAutoscalingPolicy<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putAutoscalingPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoscalingPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingPutAutoscalingPolicy<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoscalingPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.AutoscalingPutAutoscalingPolicy<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params?: RequestParams.Bulk<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: RequestParams.Bulk<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: RequestParams.Bulk<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  cat: {
    aliases<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatAliases, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    aliases<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    aliases<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatAliases, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    aliases<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatAliases, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatAllocation, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    allocation<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatAllocation, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatAllocation, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    count<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatCount, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    count<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    count<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatCount, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    count<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatCount, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    fielddata<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatFielddata, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    fielddata<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    fielddata<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatFielddata, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    fielddata<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatFielddata, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatHealth, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    health<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatHealth, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatHealth, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    help<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatHelp, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    help<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    help<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatHelp, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    help<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatHelp, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    indices<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatIndices, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    indices<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    indices<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatIndices, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    indices<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatIndices, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    master<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatMaster, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    master<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    master<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMaster, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    master<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMaster, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatMlDataFrameAnalytics, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ml_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatMlDataFrameAnalytics, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_datafeeds<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatMlDatafeeds, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ml_datafeeds<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_datafeeds<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlDatafeeds, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_datafeeds<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlDatafeeds, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatMlDatafeeds, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlDatafeeds<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlDatafeeds, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlDatafeeds, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_jobs<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatMlJobs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ml_jobs<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_jobs<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_jobs<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlJobs<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatMlJobs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlJobs<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlJobs<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlJobs<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_trained_models<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatMlTrainedModels, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ml_trained_models<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_trained_models<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlTrainedModels, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_trained_models<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlTrainedModels, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatMlTrainedModels, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlTrainedModels<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlTrainedModels, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatMlTrainedModels, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodeattrs<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatNodeattrs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    nodeattrs<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodeattrs<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatNodeattrs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodeattrs<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatNodeattrs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodes<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatNodes, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    nodes<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodes<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatNodes, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodes<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatNodes, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatPendingTasks, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatPendingTasks, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatPendingTasks, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatPendingTasks, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatPendingTasks, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatPendingTasks, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    plugins<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatPlugins, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    plugins<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    plugins<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatPlugins, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    plugins<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatPlugins, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatRecovery, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    recovery<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatRecovery, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatRecovery, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositories<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatRepositories, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    repositories<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositories<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatRepositories, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositories<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatRepositories, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatSegments, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    segments<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatSegments, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatSegments, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shards<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatShards, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    shards<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shards<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatShards, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shards<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatShards, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    snapshots<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatSnapshots, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    snapshots<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    snapshots<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatSnapshots, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    snapshots<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatSnapshots, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    tasks<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatTasks, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    tasks<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    tasks<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatTasks, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    tasks<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatTasks, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    templates<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatTemplates, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    templates<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    templates<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatTemplates, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    templates<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatTemplates, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    thread_pool<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatThreadPool, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    thread_pool<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    thread_pool<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatThreadPool, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    thread_pool<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatThreadPool, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    threadPool<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatThreadPool, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    threadPool<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    threadPool<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatThreadPool, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    threadPool<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatThreadPool, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    transforms<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CatTransforms, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    transforms<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    transforms<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatTransforms, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    transforms<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CatTransforms, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ccr: {
    delete_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrDeleteAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrDeleteAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrFollow<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.CcrFollow<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.CcrFollow<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_info<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrFollowInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    follow_info<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_info<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrFollowInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_info<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrFollowInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followInfo<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrFollowInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    followInfo<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followInfo<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrFollowInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followInfo<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrFollowInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrFollowStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    follow_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrFollowStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrFollowStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followStats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrFollowStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    followStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrFollowStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrFollowStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forget_follower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrForgetFollower<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    forget_follower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forget_follower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.CcrForgetFollower<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forget_follower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.CcrForgetFollower<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forgetFollower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrForgetFollower<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    forgetFollower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forgetFollower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.CcrForgetFollower<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forgetFollower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.CcrForgetFollower<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrGetAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrGetAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrGetAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrGetAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrGetAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrGetAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrPauseAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pause_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrPauseAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrPauseAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrPauseAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pauseAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrPauseAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrPauseAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_follow<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrPauseFollow, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pause_follow<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_follow<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrPauseFollow, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_follow<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrPauseFollow, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseFollow<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrPauseFollow, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pauseFollow<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseFollow<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrPauseFollow, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseFollow<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrPauseFollow, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_auto_follow_pattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_auto_follow_pattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_auto_follow_pattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_auto_follow_pattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putAutoFollowPattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrResumeAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resume_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrResumeAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrResumeAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrResumeAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resumeAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrResumeAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrResumeAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrResumeFollow<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resume_follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.CcrResumeFollow<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.CcrResumeFollow<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeFollow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrResumeFollow<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resumeFollow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeFollow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.CcrResumeFollow<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeFollow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.CcrResumeFollow<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfollow<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.CcrUnfollow, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    unfollow<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfollow<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrUnfollow, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfollow<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.CcrUnfollow, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  clear_scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.ClearScroll<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  clear_scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clear_scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClearScroll<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clear_scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClearScroll<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clearScroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.ClearScroll<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  clearScroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clearScroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClearScroll<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clearScroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClearScroll<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  cluster: {
    allocation_explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterAllocationExplain<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    allocation_explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation_explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterAllocationExplain<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation_explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterAllocationExplain<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocationExplain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterAllocationExplain<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    allocationExplain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocationExplain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterAllocationExplain<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocationExplain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterAllocationExplain<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_component_template<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterDeleteComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_component_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_component_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_component_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterDeleteComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_voting_config_exclusions<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterDeleteVotingConfigExclusions, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_voting_config_exclusions<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_voting_config_exclusions<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterDeleteVotingConfigExclusions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_voting_config_exclusions<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterDeleteVotingConfigExclusions, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteVotingConfigExclusions<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterDeleteVotingConfigExclusions, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteVotingConfigExclusions<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteVotingConfigExclusions<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterDeleteVotingConfigExclusions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteVotingConfigExclusions<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterDeleteVotingConfigExclusions, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_component_template<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterExistsComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists_component_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_component_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterExistsComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_component_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterExistsComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterExistsComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterExistsComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterExistsComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_component_template<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterGetComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_component_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_component_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterGetComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_component_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterGetComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterGetComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterGetComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterGetComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterGetSettings, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_settings<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterGetSettings, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterGetSettings, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterGetSettings, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getSettings<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterGetSettings, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterGetSettings, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterHealth, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    health<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterHealth, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterHealth, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterPendingTasks, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPendingTasks, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPendingTasks, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterPendingTasks, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPendingTasks, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPendingTasks, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_voting_config_exclusions<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterPostVotingConfigExclusions, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post_voting_config_exclusions<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_voting_config_exclusions<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPostVotingConfigExclusions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_voting_config_exclusions<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPostVotingConfigExclusions, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postVotingConfigExclusions<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterPostVotingConfigExclusions, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postVotingConfigExclusions<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postVotingConfigExclusions<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPostVotingConfigExclusions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postVotingConfigExclusions<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPostVotingConfigExclusions, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_component_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterPutComponentTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_component_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_component_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPutComponentTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_component_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPutComponentTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putComponentTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterPutComponentTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putComponentTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putComponentTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPutComponentTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putComponentTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPutComponentTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterPutSettings<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPutSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPutSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterPutSettings<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPutSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterPutSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remote_info<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterRemoteInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    remote_info<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remote_info<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterRemoteInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remote_info<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterRemoteInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remoteInfo<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterRemoteInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    remoteInfo<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remoteInfo<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterRemoteInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remoteInfo<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterRemoteInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reroute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterReroute<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reroute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reroute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterReroute<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reroute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterReroute<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    state<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterState, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    state<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    state<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterState, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    state<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterState, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  count<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.Count<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  count<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  count<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Count<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  count<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Count<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.Create<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Create<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Create<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.Delete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  delete<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.Delete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.Delete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.DeleteByQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  delete_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.DeleteByQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.DeleteByQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.DeleteByQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  deleteByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.DeleteByQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.DeleteByQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.DeleteByQueryRethrottle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  delete_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.DeleteByQueryRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.DeleteByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.DeleteByQueryRethrottle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  deleteByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.DeleteByQueryRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.DeleteByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_script<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.DeleteScript, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  delete_script<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_script<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.DeleteScript, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_script<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.DeleteScript, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteScript<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.DeleteScript, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  deleteScript<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteScript<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.DeleteScript, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteScript<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.DeleteScript, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  enrich: {
    delete_policy<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.EnrichDeletePolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_policy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_policy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichDeletePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_policy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichDeletePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePolicy<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.EnrichDeletePolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deletePolicy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePolicy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichDeletePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePolicy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichDeletePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_policy<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.EnrichExecutePolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    execute_policy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_policy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichExecutePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_policy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichExecutePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executePolicy<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.EnrichExecutePolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executePolicy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executePolicy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichExecutePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executePolicy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichExecutePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_policy<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.EnrichGetPolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_policy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_policy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichGetPolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_policy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichGetPolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPolicy<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.EnrichGetPolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getPolicy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPolicy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichGetPolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPolicy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichGetPolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.EnrichPutPolicy<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichPutPolicy<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichPutPolicy<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.EnrichPutPolicy<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichPutPolicy<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichPutPolicy<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.EnrichStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.EnrichStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  eql: {
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.EqlSearch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.EqlSearch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.EqlSearch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  exists<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.Exists, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  exists<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.Exists, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.Exists, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists_source<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ExistsSource, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  exists_source<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists_source<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ExistsSource, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists_source<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ExistsSource, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  existsSource<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ExistsSource, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  existsSource<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  existsSource<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ExistsSource, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  existsSource<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ExistsSource, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.Explain<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Explain<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Explain<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  field_caps<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.FieldCaps, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  field_caps<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  field_caps<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.FieldCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  field_caps<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.FieldCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  fieldCaps<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.FieldCaps, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  fieldCaps<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  fieldCaps<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.FieldCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  fieldCaps<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.FieldCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.Get, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.Get, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.Get, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.GetScript, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get_script<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetScript, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetScript, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScript<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.GetScript, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getScript<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScript<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetScript, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScript<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetScript, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_context<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.GetScriptContext, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get_script_context<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_context<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetScriptContext, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_context<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetScriptContext, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptContext<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.GetScriptContext, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getScriptContext<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptContext<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetScriptContext, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptContext<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetScriptContext, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_languages<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.GetScriptLanguages, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get_script_languages<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_languages<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetScriptLanguages, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_languages<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetScriptLanguages, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptLanguages<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.GetScriptLanguages, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getScriptLanguages<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptLanguages<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetScriptLanguages, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptLanguages<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetScriptLanguages, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_source<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.GetSource, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get_source<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_source<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetSource, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_source<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetSource, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getSource<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.GetSource, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getSource<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getSource<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetSource, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getSource<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.GetSource, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  graph: {
    explore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.GraphExplore<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.GraphExplore<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.GraphExplore<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ilm: {
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmDeleteLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmDeleteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmDeleteLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmDeleteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmExplainLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explain_lifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmExplainLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmExplainLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainLifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmExplainLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explainLifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmExplainLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmExplainLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmGetLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmGetLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmGetLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmGetLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmGetStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_status<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmGetStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmGetStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmGetStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getStatus<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmGetStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmGetStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    move_to_step<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmMoveToStep<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    move_to_step<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    move_to_step<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IlmMoveToStep<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    move_to_step<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IlmMoveToStep<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    moveToStep<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmMoveToStep<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    moveToStep<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    moveToStep<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IlmMoveToStep<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    moveToStep<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IlmMoveToStep<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmPutLifecycle<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IlmPutLifecycle<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IlmPutLifecycle<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmPutLifecycle<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IlmPutLifecycle<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IlmPutLifecycle<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remove_policy<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmRemovePolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    remove_policy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remove_policy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmRemovePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remove_policy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmRemovePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    removePolicy<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmRemovePolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    removePolicy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    removePolicy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmRemovePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    removePolicy<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmRemovePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    retry<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmRetry, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    retry<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    retry<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmRetry, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    retry<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmRetry, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmStart, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmStart, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmStart, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IlmStop, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmStop, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IlmStop, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  index<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.Index<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  index<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  index<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Index<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  index<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Index<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  indices: {
    analyze<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesAnalyze<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    analyze<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    analyze<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesAnalyze<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    analyze<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesAnalyze<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesClearCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesClearCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesClearCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesClearCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCache<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesClearCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesClearCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesClone<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesClone<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesClone<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesClose, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    close<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesClose, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesClose, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesCreate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesCreate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesCreate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_data_stream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesCreateDataStream<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create_data_stream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_data_stream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesCreateDataStream<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_data_stream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesCreateDataStream<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createDataStream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesCreateDataStream<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    createDataStream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createDataStream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesCreateDataStream<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createDataStream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesCreateDataStream<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_alias<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesDeleteAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_alias<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_alias<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_alias<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAlias<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesDeleteAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteAlias<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAlias<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAlias<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_stream<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesDeleteDataStream, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_data_stream<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_stream<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteDataStream, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_stream<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteDataStream, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataStream<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesDeleteDataStream, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteDataStream<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataStream<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteDataStream, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataStream<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteDataStream, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_index_template<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesDeleteIndexTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_index_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_index_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteIndexTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_index_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteIndexTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesDeleteIndexTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteIndexTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteIndexTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_template<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesDeleteTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesDeleteTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesDeleteTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesExists, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExists, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExists, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_alias<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesExistsAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists_alias<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_alias<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_alias<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsAlias<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesExistsAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsAlias<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsAlias<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsAlias<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_index_template<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesExistsIndexTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists_index_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_index_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsIndexTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_index_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsIndexTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesExistsIndexTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsIndexTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsIndexTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_template<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesExistsTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesExistsTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_type<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesExistsType, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists_type<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_type<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsType, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_type<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsType, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsType<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesExistsType, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsType<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsType<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsType, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsType<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesExistsType, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesFlush, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flush<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesFlush, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesFlush, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_synced<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesFlushSynced, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flush_synced<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_synced<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesFlushSynced, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_synced<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesFlushSynced, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushSynced<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesFlushSynced, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flushSynced<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushSynced<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesFlushSynced, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushSynced<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesFlushSynced, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forcemerge<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesForcemerge, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    forcemerge<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forcemerge<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesForcemerge, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forcemerge<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesForcemerge, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    freeze<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesFreeze, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    freeze<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    freeze<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesFreeze, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    freeze<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesFreeze, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_alias<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_alias<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_alias<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_alias<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAlias<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAlias<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAlias<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAlias<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_streams<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetDataStreams, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_data_streams<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_streams<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetDataStreams, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_streams<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetDataStreams, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataStreams<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetDataStreams, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDataStreams<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataStreams<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetDataStreams, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataStreams<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetDataStreams, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_field_mapping<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetFieldMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_field_mapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_field_mapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetFieldMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_field_mapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetFieldMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFieldMapping<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetFieldMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getFieldMapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFieldMapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetFieldMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFieldMapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetFieldMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_index_template<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetIndexTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_index_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_index_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetIndexTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_index_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetIndexTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetIndexTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetIndexTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetIndexTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_mapping<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_mapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_mapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_mapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getMapping<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getMapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getMapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getMapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetSettings, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_settings<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetSettings, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetSettings, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetSettings, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getSettings<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetSettings, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetSettings, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_template<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_upgrade<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetUpgrade, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_upgrade<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_upgrade<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetUpgrade, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_upgrade<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetUpgrade, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUpgrade<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesGetUpgrade, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getUpgrade<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUpgrade<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetUpgrade, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUpgrade<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesGetUpgrade, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesOpen, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    open<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesOpen, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesOpen, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_alias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesPutAlias<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_alias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_alias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutAlias<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_alias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutAlias<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAlias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesPutAlias<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putAlias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAlias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutAlias<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAlias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutAlias<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesPutIndexTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutIndexTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutIndexTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesPutIndexTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutIndexTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutIndexTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesPutMapping<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutMapping<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutMapping<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesPutMapping<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutMapping<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutMapping<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesPutSettings<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesPutSettings<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesPutTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesPutTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesPutTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesRecovery, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    recovery<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesRecovery, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesRecovery, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    refresh<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesRefresh, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    refresh<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    refresh<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesRefresh, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    refresh<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesRefresh, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_search_analyzers<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesReloadSearchAnalyzers, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reload_search_analyzers<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_search_analyzers<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_search_analyzers<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesReloadSearchAnalyzers, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reloadSearchAnalyzers<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollover<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesRollover<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    rollover<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollover<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesRollover<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollover<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesRollover<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesSegments, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    segments<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesSegments, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesSegments, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shard_stores<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesShardStores, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    shard_stores<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shard_stores<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesShardStores, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shard_stores<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesShardStores, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shardStores<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesShardStores, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    shardStores<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shardStores<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesShardStores, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shardStores<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesShardStores, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shrink<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesShrink<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    shrink<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shrink<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesShrink<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shrink<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesShrink<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesSimulateIndexTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    simulate_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesSimulateIndexTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesSimulateIndexTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulateIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesSimulateIndexTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    simulateIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulateIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesSimulateIndexTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulateIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesSimulateIndexTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    split<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesSplit<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    split<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    split<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesSplit<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    split<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesSplit<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfreeze<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesUnfreeze, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    unfreeze<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfreeze<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesUnfreeze, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfreeze<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesUnfreeze, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_aliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesUpdateAliases<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_aliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_aliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesUpdateAliases<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_aliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesUpdateAliases<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateAliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesUpdateAliases<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateAliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateAliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesUpdateAliases<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateAliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesUpdateAliases<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesUpgrade, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    upgrade<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesUpgrade, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesUpgrade, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesValidateQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validate_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesValidateQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesValidateQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IndicesValidateQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validateQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesValidateQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IndicesValidateQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  info<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.Info, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  info<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  info<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.Info, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  info<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.Info, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  ingest: {
    delete_pipeline<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IngestDeletePipeline, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_pipeline<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_pipeline<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IngestDeletePipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_pipeline<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IngestDeletePipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePipeline<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IngestDeletePipeline, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deletePipeline<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePipeline<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IngestDeletePipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePipeline<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IngestDeletePipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_pipeline<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IngestGetPipeline, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_pipeline<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_pipeline<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IngestGetPipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_pipeline<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IngestGetPipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPipeline<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IngestGetPipeline, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getPipeline<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPipeline<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IngestGetPipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPipeline<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IngestGetPipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processor_grok<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IngestProcessorGrok, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    processor_grok<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processor_grok<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IngestProcessorGrok, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processor_grok<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IngestProcessorGrok, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processorGrok<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.IngestProcessorGrok, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    processorGrok<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processorGrok<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IngestProcessorGrok, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processorGrok<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.IngestProcessorGrok, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IngestPutPipeline<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IngestPutPipeline<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IngestPutPipeline<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IngestPutPipeline<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IngestPutPipeline<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IngestPutPipeline<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.IngestSimulate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    simulate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IngestSimulate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.IngestSimulate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  license: {
    delete<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.LicenseDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicenseDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicenseDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.LicenseGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicenseGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicenseGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_basic_status<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.LicenseGetBasicStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_basic_status<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_basic_status<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicenseGetBasicStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_basic_status<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicenseGetBasicStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBasicStatus<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.LicenseGetBasicStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getBasicStatus<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBasicStatus<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicenseGetBasicStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBasicStatus<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicenseGetBasicStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trial_status<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.LicenseGetTrialStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_trial_status<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trial_status<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicenseGetTrialStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trial_status<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicenseGetTrialStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrialStatus<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.LicenseGetTrialStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTrialStatus<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrialStatus<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicenseGetTrialStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrialStatus<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicenseGetTrialStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.LicensePost<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.LicensePost<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.LicensePost<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_basic<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.LicensePostStartBasic, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post_start_basic<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_basic<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicensePostStartBasic, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_basic<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicensePostStartBasic, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartBasic<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.LicensePostStartBasic, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postStartBasic<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartBasic<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicensePostStartBasic, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartBasic<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicensePostStartBasic, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_trial<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.LicensePostStartTrial, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post_start_trial<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_trial<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicensePostStartTrial, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_trial<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicensePostStartTrial, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartTrial<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.LicensePostStartTrial, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postStartTrial<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartTrial<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicensePostStartTrial, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartTrial<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.LicensePostStartTrial, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  mget<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.Mget<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  mget<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mget<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Mget<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mget<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Mget<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  migration: {
    deprecations<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MigrationDeprecations, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deprecations<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deprecations<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MigrationDeprecations, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deprecations<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MigrationDeprecations, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ml: {
    close_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlCloseJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    close_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlCloseJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlCloseJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    closeJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlCloseJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    closeJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    closeJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlCloseJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    closeJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlCloseJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteCalendar, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_calendar<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteCalendar, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteCalendar, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendar<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteCalendar, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteCalendar<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendar<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteCalendar, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendar<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteCalendar, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_event<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteCalendarEvent, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_calendar_event<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_event<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteCalendarEvent, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_event<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteCalendarEvent, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteCalendarEvent, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteCalendarEvent<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteCalendarEvent, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteCalendarEvent, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_job<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteCalendarJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_calendar_job<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_job<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteCalendarJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_job<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteCalendarJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteCalendarJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteCalendarJob<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteCalendarJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteCalendarJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteDataFrameAnalytics, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteDataFrameAnalytics, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_datafeed<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteDatafeed, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_datafeed<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_datafeed<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteDatafeed, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_datafeed<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteDatafeed, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteDatafeed, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteDatafeed<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteDatafeed, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteDatafeed, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_expired_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteExpiredData<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_expired_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_expired_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteExpiredData<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_expired_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteExpiredData<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteExpiredData<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteExpiredData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteExpiredData<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteExpiredData<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_filter<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteFilter, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_filter<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_filter<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteFilter, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_filter<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteFilter, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteFilter<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteFilter, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteFilter<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteFilter<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteFilter, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteFilter<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteFilter, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_forecast<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteForecast, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_forecast<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_forecast<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteForecast, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_forecast<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteForecast, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteForecast<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteForecast, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteForecast<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteForecast<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteForecast, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteForecast<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteForecast, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_job<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_model_snapshot<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteModelSnapshot, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_model_snapshot<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_model_snapshot<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteModelSnapshot, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_model_snapshot<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteModelSnapshot, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteModelSnapshot, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteModelSnapshot<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteModelSnapshot, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteModelSnapshot, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_trained_model<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteTrainedModel, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_trained_model<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_trained_model<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteTrainedModel, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_trained_model<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteTrainedModel, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlDeleteTrainedModel, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteTrainedModel<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteTrainedModel, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlDeleteTrainedModel, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimate_model_memory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlEstimateModelMemory<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    estimate_model_memory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimate_model_memory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlEstimateModelMemory<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimate_model_memory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlEstimateModelMemory<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlEstimateModelMemory<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    estimateModelMemory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlEstimateModelMemory<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlEstimateModelMemory<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluate_data_frame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlEvaluateDataFrame<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    evaluate_data_frame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluate_data_frame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlEvaluateDataFrame<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluate_data_frame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlEvaluateDataFrame<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlEvaluateDataFrame<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    evaluateDataFrame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlEvaluateDataFrame<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlEvaluateDataFrame<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explain_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explainDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_file_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params?: RequestParams.MlFindFileStructure<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    find_file_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_file_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: RequestParams.MlFindFileStructure<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_file_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: RequestParams.MlFindFileStructure<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findFileStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params?: RequestParams.MlFindFileStructure<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    findFileStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findFileStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: RequestParams.MlFindFileStructure<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findFileStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: RequestParams.MlFindFileStructure<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlFlushJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flush_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlFlushJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlFlushJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlFlushJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flushJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlFlushJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlFlushJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forecast<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlForecast, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    forecast<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forecast<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlForecast, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forecast<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlForecast, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetBuckets<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetBuckets<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetBuckets<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetBuckets<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetBuckets<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetBuckets<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendar_events<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetCalendarEvents, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_calendar_events<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendar_events<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetCalendarEvents, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendar_events<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetCalendarEvents, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetCalendarEvents, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getCalendarEvents<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetCalendarEvents, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetCalendarEvents, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetCalendars<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_calendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetCalendars<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetCalendars<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetCalendars<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getCalendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetCalendars<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetCalendars<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_categories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetCategories<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_categories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_categories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetCategories<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_categories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetCategories<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCategories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetCategories<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getCategories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCategories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetCategories<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCategories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetCategories<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetDataFrameAnalytics, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetDataFrameAnalytics, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics_stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetDataFrameAnalyticsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_data_frame_analytics_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetDataFrameAnalyticsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDataFrameAnalyticsStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeed_stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetDatafeedStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_datafeed_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeed_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDatafeedStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeed_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDatafeedStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetDatafeedStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDatafeedStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDatafeedStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDatafeedStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeeds<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetDatafeeds, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_datafeeds<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeeds<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDatafeeds, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeeds<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDatafeeds, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeeds<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetDatafeeds, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDatafeeds<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeeds<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDatafeeds, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeeds<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetDatafeeds, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_filters<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetFilters, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_filters<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_filters<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetFilters, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_filters<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetFilters, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFilters<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetFilters, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getFilters<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFilters<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetFilters, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFilters<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetFilters, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_influencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetInfluencers<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_influencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_influencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetInfluencers<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_influencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetInfluencers<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getInfluencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetInfluencers<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getInfluencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getInfluencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetInfluencers<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getInfluencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetInfluencers<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_job_stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetJobStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_job_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_job_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetJobStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_job_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetJobStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobStats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetJobStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getJobStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetJobStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetJobStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetJobs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetJobs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getJobs<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_model_snapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetModelSnapshots<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_model_snapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_model_snapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetModelSnapshots<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_model_snapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetModelSnapshots<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getModelSnapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetModelSnapshots<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getModelSnapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getModelSnapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetModelSnapshots<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getModelSnapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetModelSnapshots<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_overall_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetOverallBuckets<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_overall_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_overall_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetOverallBuckets<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_overall_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetOverallBuckets<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetOverallBuckets<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getOverallBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetOverallBuckets<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetOverallBuckets<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_records<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetRecords<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_records<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_records<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetRecords<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_records<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetRecords<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRecords<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetRecords<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRecords<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRecords<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetRecords<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRecords<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetRecords<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetTrainedModels, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_trained_models<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetTrainedModels, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetTrainedModels, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModels<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetTrainedModels, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTrainedModels<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModels<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetTrainedModels, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModels<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetTrainedModels, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models_stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetTrainedModelsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_trained_models_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetTrainedModelsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetTrainedModelsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModelsStats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlGetTrainedModelsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTrainedModelsStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModelsStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetTrainedModelsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModelsStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlGetTrainedModelsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    info<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open_job<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlOpenJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    open_job<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open_job<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlOpenJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open_job<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlOpenJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    openJob<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlOpenJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    openJob<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    openJob<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlOpenJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    openJob<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlOpenJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_calendar_events<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPostCalendarEvents<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post_calendar_events<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_calendar_events<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPostCalendarEvents<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_calendar_events<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPostCalendarEvents<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPostCalendarEvents<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postCalendarEvents<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPostCalendarEvents<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPostCalendarEvents<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPostData<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPostData<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPostData<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPostData<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPostData<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPostData<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_datafeed<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPreviewDatafeed, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    preview_datafeed<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_datafeed<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlPreviewDatafeed, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_datafeed<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlPreviewDatafeed, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewDatafeed<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPreviewDatafeed, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    previewDatafeed<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewDatafeed<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlPreviewDatafeed, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewDatafeed<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlPreviewDatafeed, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPutCalendar<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_calendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutCalendar<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutCalendar<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPutCalendar<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putCalendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutCalendar<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutCalendar<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar_job<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPutCalendarJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_calendar_job<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar_job<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutCalendarJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar_job<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutCalendarJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendarJob<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPutCalendarJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putCalendarJob<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendarJob<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutCalendarJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendarJob<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutCalendarJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPutDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPutDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPutFilter<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutFilter<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutFilter<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPutFilter<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutFilter<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutFilter<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPutJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPutJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_trained_model<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPutTrainedModel<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_trained_model<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_trained_model<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutTrainedModel<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_trained_model<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutTrainedModel<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTrainedModel<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlPutTrainedModel<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTrainedModel<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTrainedModel<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutTrainedModel<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTrainedModel<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlPutTrainedModel<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revert_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlRevertModelSnapshot<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    revert_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revert_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlRevertModelSnapshot<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revert_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlRevertModelSnapshot<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revertModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlRevertModelSnapshot<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    revertModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revertModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlRevertModelSnapshot<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revertModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlRevertModelSnapshot<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    set_upgrade_mode<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlSetUpgradeMode, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    set_upgrade_mode<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    set_upgrade_mode<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlSetUpgradeMode, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    set_upgrade_mode<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlSetUpgradeMode, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlSetUpgradeMode, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    setUpgradeMode<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlSetUpgradeMode, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlSetUpgradeMode, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlStartDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlStartDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlStartDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlStartDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlStartDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlStartDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_datafeed<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlStopDatafeed, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop_datafeed<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_datafeed<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlStopDatafeed, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_datafeed<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlStopDatafeed, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDatafeed<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.MlStopDatafeed, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopDatafeed<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDatafeed<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlStopDatafeed, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDatafeed<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.MlStopDatafeed, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlUpdateDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlUpdateDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlUpdateFilter<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateFilter<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateFilter<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlUpdateFilter<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateFilter<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateFilter<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlUpdateJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlUpdateJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlUpdateModelSnapshot<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateModelSnapshot<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateModelSnapshot<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlUpdateModelSnapshot<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateModelSnapshot<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlUpdateModelSnapshot<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlValidate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlValidate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlValidate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_detector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlValidateDetector<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validate_detector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_detector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlValidateDetector<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_detector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlValidateDetector<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateDetector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.MlValidateDetector<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validateDetector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateDetector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlValidateDetector<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateDetector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.MlValidateDetector<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  monitoring: {
    bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params?: RequestParams.MonitoringBulk<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: RequestParams.MonitoringBulk<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: RequestParams.MonitoringBulk<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params?: RequestParams.Msearch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: RequestParams.Msearch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: RequestParams.Msearch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch_template<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params?: RequestParams.MsearchTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  msearch_template<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch_template<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: RequestParams.MsearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch_template<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: RequestParams.MsearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params?: RequestParams.MsearchTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  msearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: RequestParams.MsearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: RequestParams.MsearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mtermvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.Mtermvectors<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  mtermvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mtermvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Mtermvectors<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mtermvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Mtermvectors<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  nodes: {
    hot_threads<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.NodesHotThreads, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    hot_threads<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hot_threads<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.NodesHotThreads, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hot_threads<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.NodesHotThreads, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hotThreads<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.NodesHotThreads, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    hotThreads<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hotThreads<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.NodesHotThreads, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hotThreads<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.NodesHotThreads, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.NodesInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    info<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.NodesInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.NodesInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_secure_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.NodesReloadSecureSettings<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reload_secure_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_secure_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.NodesReloadSecureSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_secure_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.NodesReloadSecureSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.NodesReloadSecureSettings<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reloadSecureSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.NodesReloadSecureSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.NodesReloadSecureSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.NodesStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.NodesStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.NodesStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.NodesUsage, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    usage<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.NodesUsage, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.NodesUsage, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ping<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.Ping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  ping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  ping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.Ping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  ping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.Ping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  put_script<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.PutScript<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  put_script<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  put_script<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.PutScript<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  put_script<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.PutScript<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  putScript<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.PutScript<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  putScript<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  putScript<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.PutScript<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  putScript<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.PutScript<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rank_eval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.RankEval<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  rank_eval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rank_eval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RankEval<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rank_eval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RankEval<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rankEval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.RankEval<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  rankEval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rankEval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RankEval<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rankEval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RankEval<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.Reindex<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  reindex<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Reindex<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Reindex<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ReindexRethrottle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  reindex_rethrottle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ReindexRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ReindexRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindexRethrottle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ReindexRethrottle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  reindexRethrottle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindexRethrottle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ReindexRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindexRethrottle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ReindexRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  render_search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.RenderSearchTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  render_search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  render_search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RenderSearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  render_search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RenderSearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  renderSearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.RenderSearchTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  renderSearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  renderSearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RenderSearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  renderSearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RenderSearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rollup: {
    delete_job<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupDeleteJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_job<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupDeleteJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupDeleteJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupDeleteJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupDeleteJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupDeleteJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupGetJobs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupGetJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupGetJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupGetJobs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getJobs<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupGetJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupGetJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_caps<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupGetRollupCaps, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_rollup_caps<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_caps<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupGetRollupCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_caps<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupGetRollupCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupCaps<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupGetRollupCaps, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRollupCaps<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupCaps<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupGetRollupCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupCaps<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupGetRollupCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_index_caps<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupGetRollupIndexCaps, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_rollup_index_caps<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_index_caps<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupGetRollupIndexCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_index_caps<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupGetRollupIndexCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupGetRollupIndexCaps, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRollupIndexCaps<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupGetRollupIndexCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupGetRollupIndexCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupPutJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RollupPutJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RollupPutJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupPutJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RollupPutJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RollupPutJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollup_search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupRollupSearch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    rollup_search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollup_search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RollupRollupSearch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollup_search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RollupRollupSearch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollupSearch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupRollupSearch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    rollupSearch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollupSearch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RollupRollupSearch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollupSearch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.RollupRollupSearch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_job<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupStartJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start_job<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_job<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupStartJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_job<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupStartJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startJob<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupStartJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startJob<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startJob<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupStartJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startJob<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupStartJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_job<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupStopJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop_job<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_job<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupStopJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_job<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupStopJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopJob<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.RollupStopJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopJob<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopJob<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupStopJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopJob<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.RollupStopJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  scripts_painless_execute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.ScriptsPainlessExecute<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  scripts_painless_execute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scripts_painless_execute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ScriptsPainlessExecute<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scripts_painless_execute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ScriptsPainlessExecute<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.ScriptsPainlessExecute<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  scriptsPainlessExecute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ScriptsPainlessExecute<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.ScriptsPainlessExecute<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.Scroll<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Scroll<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Scroll<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.Search<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Search<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Search<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_shards<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchShards, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  search_shards<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_shards<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchShards, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_shards<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchShards, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchShards<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchShards, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  searchShards<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchShards<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchShards, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchShards<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchShards, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  searchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchable_snapshots: {
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchableSnapshotsClearCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsClearCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsClearCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchableSnapshotsClearCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCache<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsClearCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsClearCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchableSnapshotsMount<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsMount<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsMount<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repository_stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchableSnapshotsRepositoryStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    repository_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repository_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsRepositoryStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repository_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsRepositoryStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositoryStats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchableSnapshotsRepositoryStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    repositoryStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositoryStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsRepositoryStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositoryStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsRepositoryStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchableSnapshotsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  searchableSnapshots: {
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchableSnapshotsClearCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsClearCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsClearCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchableSnapshotsClearCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCache<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsClearCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsClearCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchableSnapshotsMount<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsMount<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsMount<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repository_stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchableSnapshotsRepositoryStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    repository_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repository_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsRepositoryStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repository_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsRepositoryStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositoryStats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchableSnapshotsRepositoryStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    repositoryStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositoryStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsRepositoryStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositoryStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsRepositoryStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchableSnapshotsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  security: {
    authenticate<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityAuthenticate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    authenticate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    authenticate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityAuthenticate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    authenticate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityAuthenticate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    change_password<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityChangePassword<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    change_password<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    change_password<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityChangePassword<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    change_password<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityChangePassword<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    changePassword<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityChangePassword<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    changePassword<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    changePassword<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityChangePassword<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    changePassword<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityChangePassword<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_realms<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityClearCachedRealms, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cached_realms<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_realms<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityClearCachedRealms, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_realms<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityClearCachedRealms, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityClearCachedRealms, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCachedRealms<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityClearCachedRealms, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityClearCachedRealms, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_roles<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityClearCachedRoles, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cached_roles<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_roles<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityClearCachedRoles, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_roles<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityClearCachedRoles, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityClearCachedRoles, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCachedRoles<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityClearCachedRoles, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityClearCachedRoles, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityCreateApiKey<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityCreateApiKey<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityCreateApiKey<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityCreateApiKey<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    createApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityCreateApiKey<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityCreateApiKey<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_privileges<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityDeletePrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_privileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_privileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeletePrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_privileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeletePrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePrivileges<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityDeletePrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deletePrivileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePrivileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeletePrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePrivileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeletePrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityDeleteRole, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_role<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeleteRole, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeleteRole, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRole<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityDeleteRole, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteRole<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRole<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeleteRole, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRole<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeleteRole, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role_mapping<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityDeleteRoleMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_role_mapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role_mapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeleteRoleMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role_mapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeleteRoleMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityDeleteRoleMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteRoleMapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeleteRoleMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeleteRoleMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_user<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityDeleteUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_user<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_user<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeleteUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_user<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeleteUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteUser<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityDeleteUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteUser<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteUser<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeleteUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteUser<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDeleteUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disable_user<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityDisableUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    disable_user<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disable_user<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDisableUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disable_user<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDisableUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disableUser<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityDisableUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    disableUser<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disableUser<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDisableUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disableUser<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityDisableUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enable_user<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityEnableUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    enable_user<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enable_user<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityEnableUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enable_user<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityEnableUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enableUser<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityEnableUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    enableUser<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enableUser<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityEnableUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enableUser<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityEnableUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_api_key<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetApiKey, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_api_key<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_api_key<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetApiKey, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_api_key<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetApiKey, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getApiKey<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetApiKey, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getApiKey<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getApiKey<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetApiKey, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getApiKey<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetApiKey, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_builtin_privileges<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetBuiltinPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_builtin_privileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_builtin_privileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_builtin_privileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetBuiltinPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getBuiltinPrivileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_privileges<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_privileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_privileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_privileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPrivileges<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getPrivileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPrivileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPrivileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetRole, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_role<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetRole, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetRole, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRole<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetRole, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRole<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRole<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetRole, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRole<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetRole, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role_mapping<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetRoleMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_role_mapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role_mapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetRoleMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role_mapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetRoleMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRoleMapping<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetRoleMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRoleMapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRoleMapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetRoleMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRoleMapping<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetRoleMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetToken<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetToken<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetToken<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetToken<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetToken<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetToken<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_user<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUser<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getUser<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUser<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUser<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user_privileges<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetUserPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_user_privileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user_privileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetUserPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user_privileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetUserPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityGetUserPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getUserPrivileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetUserPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityGetUserPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    has_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityHasPrivileges<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    has_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    has_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityHasPrivileges<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    has_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityHasPrivileges<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hasPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityHasPrivileges<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    hasPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hasPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityHasPrivileges<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hasPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityHasPrivileges<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityInvalidateApiKey<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    invalidate_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityInvalidateApiKey<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityInvalidateApiKey<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityInvalidateApiKey<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    invalidateApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityInvalidateApiKey<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityInvalidateApiKey<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityInvalidateToken<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    invalidate_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityInvalidateToken<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityInvalidateToken<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityInvalidateToken<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    invalidateToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityInvalidateToken<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityInvalidateToken<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityPutPrivileges<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutPrivileges<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutPrivileges<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityPutPrivileges<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutPrivileges<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutPrivileges<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityPutRole<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_role<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutRole<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutRole<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRole<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityPutRole<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putRole<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRole<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutRole<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRole<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutRole<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityPutRoleMapping<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_role_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutRoleMapping<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutRoleMapping<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRoleMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityPutRoleMapping<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putRoleMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRoleMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutRoleMapping<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRoleMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutRoleMapping<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_user<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityPutUser<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_user<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_user<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutUser<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_user<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutUser<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putUser<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SecurityPutUser<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putUser<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putUser<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutUser<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putUser<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SecurityPutUser<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  slm: {
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmDeleteLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmDeleteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmDeleteLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmDeleteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmExecuteLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    execute_lifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmExecuteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmExecuteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeLifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmExecuteLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executeLifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmExecuteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmExecuteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_retention<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmExecuteRetention, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    execute_retention<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_retention<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmExecuteRetention, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_retention<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmExecuteRetention, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeRetention<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmExecuteRetention, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executeRetention<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeRetention<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmExecuteRetention, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeRetention<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmExecuteRetention, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmGetLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmGetLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmGetLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmGetLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmGetStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmGetStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmGetStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmGetStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmGetStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmGetStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmGetStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_status<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmGetStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmGetStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmGetStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getStatus<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmGetStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmGetStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmPutLifecycle<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SlmPutLifecycle<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SlmPutLifecycle<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmPutLifecycle<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SlmPutLifecycle<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SlmPutLifecycle<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmStart, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmStart, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmStart, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SlmStop, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmStop, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SlmStop, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  snapshot: {
    cleanup_repository<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SnapshotCleanupRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    cleanup_repository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanup_repository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotCleanupRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanup_repository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotCleanupRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanupRepository<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SnapshotCleanupRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    cleanupRepository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanupRepository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotCleanupRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanupRepository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotCleanupRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SnapshotCreate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotCreate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotCreate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_repository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SnapshotCreateRepository<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create_repository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_repository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotCreateRepository<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_repository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotCreateRepository<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createRepository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SnapshotCreateRepository<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    createRepository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createRepository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotCreateRepository<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createRepository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotCreateRepository<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SnapshotDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_repository<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SnapshotDeleteRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_repository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_repository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotDeleteRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_repository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotDeleteRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRepository<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SnapshotDeleteRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteRepository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRepository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotDeleteRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRepository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotDeleteRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SnapshotGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_repository<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SnapshotGetRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_repository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_repository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotGetRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_repository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotGetRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRepository<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SnapshotGetRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRepository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRepository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotGetRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRepository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotGetRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    restore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SnapshotRestore<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    restore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    restore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotRestore<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    restore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotRestore<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SnapshotStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    status<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verify_repository<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SnapshotVerifyRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    verify_repository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verify_repository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotVerifyRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verify_repository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotVerifyRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verifyRepository<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SnapshotVerifyRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    verifyRepository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verifyRepository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotVerifyRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verifyRepository<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SnapshotVerifyRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  sql: {
    clear_cursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SqlClearCursor<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SqlClearCursor<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SqlClearCursor<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SqlClearCursor<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SqlClearCursor<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SqlClearCursor<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SqlQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SqlQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SqlQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    translate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.SqlTranslate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    translate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    translate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SqlTranslate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    translate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.SqlTranslate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ssl: {
    certificates<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SslCertificates, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    certificates<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    certificates<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SslCertificates, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    certificates<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SslCertificates, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  tasks: {
    cancel<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.TasksCancel, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    cancel<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cancel<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TasksCancel, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cancel<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TasksCancel, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.TasksGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TasksGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TasksGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.TasksList, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    list<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TasksList, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TasksList, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  termvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.Termvectors<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  termvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  termvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Termvectors<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  termvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Termvectors<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  transform: {
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformDeleteTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformDeleteTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformDeleteTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformDeleteTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformDeleteTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformDeleteTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformGetTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformGetTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformGetTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformGetTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformGetTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformGetTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformGetTransformStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformGetTransformStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformGetTransformStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformGetTransformStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformGetTransformStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformGetTransformStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformPreviewTransform<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.TransformPreviewTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.TransformPreviewTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformPreviewTransform<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.TransformPreviewTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.TransformPreviewTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformPutTransform<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.TransformPutTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.TransformPutTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformPutTransform<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.TransformPutTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.TransformPutTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformStartTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformStartTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformStartTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformStartTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformStartTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformStartTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformStopTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformStopTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformStopTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformStopTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformStopTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.TransformStopTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformUpdateTransform<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.TransformUpdateTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.TransformUpdateTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.TransformUpdateTransform<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.TransformUpdateTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.TransformUpdateTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  update<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.Update<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  update<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Update<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.Update<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.UpdateByQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  update_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.UpdateByQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.UpdateByQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.UpdateByQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  updateByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.UpdateByQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.UpdateByQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.UpdateByQueryRethrottle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  update_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.UpdateByQueryRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.UpdateByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.UpdateByQueryRethrottle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  updateByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.UpdateByQueryRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.UpdateByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  watcher: {
    ack_watch<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherAckWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ack_watch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ack_watch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherAckWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ack_watch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherAckWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ackWatch<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherAckWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ackWatch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ackWatch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherAckWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ackWatch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherAckWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activate_watch<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherActivateWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    activate_watch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activate_watch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherActivateWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activate_watch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherActivateWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activateWatch<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherActivateWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    activateWatch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activateWatch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherActivateWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activateWatch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherActivateWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivate_watch<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherDeactivateWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deactivate_watch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivate_watch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherDeactivateWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivate_watch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherDeactivateWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivateWatch<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherDeactivateWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deactivateWatch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivateWatch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherDeactivateWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivateWatch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherDeactivateWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_watch<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherDeleteWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_watch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_watch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherDeleteWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_watch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherDeleteWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteWatch<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherDeleteWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteWatch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteWatch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherDeleteWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteWatch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherDeleteWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherExecuteWatch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    execute_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherExecuteWatch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherExecuteWatch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherExecuteWatch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executeWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherExecuteWatch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherExecuteWatch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_watch<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherGetWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_watch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_watch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherGetWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_watch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherGetWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getWatch<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherGetWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getWatch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getWatch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherGetWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getWatch<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherGetWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherPutWatch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherPutWatch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherPutWatch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherPutWatch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherPutWatch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherPutWatch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherStart, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherStart, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherStart, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.WatcherStop, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherStop, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.WatcherStop, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  xpack: {
    info<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.XpackInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    info<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.XpackInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.XpackInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.XpackUsage, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    usage<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.XpackUsage, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.XpackUsage, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
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
