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
  RequestNDBody,
  Context
} from './lib/Transport';
import { URL } from 'url';
import Connection, { AgentOptions, agentFn } from './lib/Connection';
import {
  ConnectionPool,
  BaseConnectionPool,
  CloudConnectionPool,
  ResurrectEvent,
  BasicAuth,
  ApiKeyAuth,
  BearerAuth
} from './lib/pool';
import Serializer from './lib/Serializer';
import Helpers from './lib/Helpers';
import * as errors from './lib/errors';
import * as estypes from './api/types'
import * as RequestParams from './api/requestParams'

declare type callbackFn<TResponse, TContext> = (err: ApiError, result: ApiResponse<TResponse, TContext>) => void;

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
  agent?: AgentOptions | agentFn | false;
  nodeFilter?: nodeFilterFn;
  nodeSelector?: nodeSelectorFn | string;
  headers?: Record<string, any>;
  opaqueIdPrefix?: string;
  generateRequestId?: generateRequestIdFn;
  name?: string | symbol;
  auth?: BasicAuth | ApiKeyAuth | BearerAuth;
  context?: Context;
  proxy?: string | URL;
  enableMetaHeader?: boolean;
  cloud?: {
    id: string;
    // TODO: remove username and password here in 8
    username?: string;
    password?: string;
  };
  disablePrototypePoisoningProtection?: boolean | 'proto' | 'constructor';
  caFingerprint?: string;
  maxResponseSize?: number;
  maxCompressedResponseSize?: number;
}

declare class Client {
  constructor(opts: ClientOptions);
  connectionPool: ConnectionPool;
  transport: Transport;
  serializer: Serializer;
  extend(method: string, fn: extendsCallback): void
  extend(method: string, opts: { force: boolean }, fn: extendsCallback): void;
  helpers: Helpers;
  child(opts?: ClientOptions): Client;
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
  /* GENERATED */
  async_search: {
    delete<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AsyncSearchDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AsyncSearchGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AsyncSearchStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    status<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.AsyncSearchSubmit<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchSubmit<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchSubmit<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  asyncSearch: {
    delete<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AsyncSearchDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AsyncSearchGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AsyncSearchStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    status<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.AsyncSearchSubmit<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchSubmit<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.AsyncSearchSubmit<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  autoscaling: {
    delete_autoscaling_policy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AutoscalingDeleteAutoscalingPolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_autoscaling_policy<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_autoscaling_policy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingDeleteAutoscalingPolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_autoscaling_policy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingDeleteAutoscalingPolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoscalingPolicy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AutoscalingDeleteAutoscalingPolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteAutoscalingPolicy<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoscalingPolicy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingDeleteAutoscalingPolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoscalingPolicy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingDeleteAutoscalingPolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_capacity<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AutoscalingGetAutoscalingCapacity, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_autoscaling_capacity<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_capacity<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingGetAutoscalingCapacity, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_capacity<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingGetAutoscalingCapacity, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingCapacity<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AutoscalingGetAutoscalingCapacity, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAutoscalingCapacity<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingCapacity<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingGetAutoscalingCapacity, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingCapacity<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingGetAutoscalingCapacity, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_policy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AutoscalingGetAutoscalingPolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_autoscaling_policy<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_policy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingGetAutoscalingPolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_policy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingGetAutoscalingPolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingPolicy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.AutoscalingGetAutoscalingPolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAutoscalingPolicy<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingPolicy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingGetAutoscalingPolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingPolicy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingGetAutoscalingPolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_autoscaling_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.AutoscalingPutAutoscalingPolicy<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_autoscaling_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_autoscaling_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingPutAutoscalingPolicy<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_autoscaling_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingPutAutoscalingPolicy<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoscalingPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.AutoscalingPutAutoscalingPolicy<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putAutoscalingPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoscalingPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingPutAutoscalingPolicy<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoscalingPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.AutoscalingPutAutoscalingPolicy<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.Bulk<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.Bulk<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.Bulk<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  cat: {
    aliases<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatAliases, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    aliases<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    aliases<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatAliases, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    aliases<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatAliases, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatAllocation, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    allocation<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatAllocation, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatAllocation, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    count<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatCount, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    count<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    count<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatCount, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    count<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatCount, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    fielddata<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatFielddata, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    fielddata<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    fielddata<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatFielddata, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    fielddata<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatFielddata, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatHealth, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    health<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatHealth, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatHealth, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    help<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatHelp, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    help<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    help<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatHelp, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    help<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatHelp, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    indices<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatIndices, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    indices<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    indices<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatIndices, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    indices<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatIndices, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    master<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatMaster, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    master<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    master<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMaster, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    master<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMaster, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_data_frame_analytics<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatMlDataFrameAnalytics, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ml_data_frame_analytics<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_data_frame_analytics<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_data_frame_analytics<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatMlDataFrameAnalytics, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlDataFrameAnalytics<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_datafeeds<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatMlDatafeeds, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ml_datafeeds<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_datafeeds<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlDatafeeds, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_datafeeds<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlDatafeeds, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatMlDatafeeds, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlDatafeeds<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlDatafeeds, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlDatafeeds, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_jobs<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatMlJobs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ml_jobs<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_jobs<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_jobs<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlJobs<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatMlJobs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlJobs<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlJobs<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlJobs<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_trained_models<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatMlTrainedModels, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ml_trained_models<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_trained_models<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlTrainedModels, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_trained_models<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlTrainedModels, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatMlTrainedModels, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlTrainedModels<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlTrainedModels, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatMlTrainedModels, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodeattrs<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatNodeattrs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    nodeattrs<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodeattrs<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatNodeattrs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodeattrs<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatNodeattrs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodes<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatNodes, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    nodes<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodes<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatNodes, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodes<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatNodes, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatPendingTasks, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pending_tasks<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatPendingTasks, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatPendingTasks, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatPendingTasks, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pendingTasks<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatPendingTasks, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatPendingTasks, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    plugins<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatPlugins, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    plugins<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    plugins<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatPlugins, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    plugins<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatPlugins, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatRecovery, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    recovery<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatRecovery, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatRecovery, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositories<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatRepositories, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    repositories<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositories<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatRepositories, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositories<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatRepositories, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatSegments, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    segments<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatSegments, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatSegments, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shards<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatShards, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    shards<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shards<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatShards, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shards<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatShards, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    snapshots<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatSnapshots, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    snapshots<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    snapshots<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatSnapshots, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    snapshots<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatSnapshots, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    tasks<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatTasks, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    tasks<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    tasks<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatTasks, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    tasks<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatTasks, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    templates<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatTemplates, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    templates<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    templates<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatTemplates, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    templates<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatTemplates, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    thread_pool<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatThreadPool, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    thread_pool<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    thread_pool<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatThreadPool, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    thread_pool<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatThreadPool, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    threadPool<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatThreadPool, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    threadPool<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    threadPool<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatThreadPool, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    threadPool<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatThreadPool, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    transforms<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CatTransforms, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    transforms<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    transforms<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatTransforms, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    transforms<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CatTransforms, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ccr: {
    delete_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrDeleteAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrDeleteAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrDeleteAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrDeleteAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrDeleteAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrDeleteAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.CcrFollow<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.CcrFollow<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.CcrFollow<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_info<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrFollowInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    follow_info<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_info<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrFollowInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_info<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrFollowInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followInfo<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrFollowInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    followInfo<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followInfo<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrFollowInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followInfo<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrFollowInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrFollowStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    follow_stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrFollowStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrFollowStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrFollowStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    followStats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrFollowStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrFollowStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forget_follower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.CcrForgetFollower<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    forget_follower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forget_follower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.CcrForgetFollower<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forget_follower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.CcrForgetFollower<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forgetFollower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.CcrForgetFollower<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    forgetFollower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forgetFollower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.CcrForgetFollower<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forgetFollower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.CcrForgetFollower<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrGetAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrGetAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrGetAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrGetAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrGetAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrGetAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrPauseAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pause_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrPauseAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrPauseAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrPauseAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pauseAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrPauseAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrPauseAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_follow<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrPauseFollow, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pause_follow<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_follow<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrPauseFollow, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_follow<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrPauseFollow, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseFollow<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrPauseFollow, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pauseFollow<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseFollow<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrPauseFollow, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseFollow<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrPauseFollow, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_auto_follow_pattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_auto_follow_pattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_auto_follow_pattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_auto_follow_pattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putAutoFollowPattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.CcrPutAutoFollowPattern<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrResumeAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resume_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrResumeAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_auto_follow_pattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrResumeAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrResumeAutoFollowPattern, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resumeAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrResumeAutoFollowPattern, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrResumeAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.CcrResumeFollow<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resume_follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.CcrResumeFollow<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.CcrResumeFollow<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeFollow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.CcrResumeFollow<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resumeFollow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeFollow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.CcrResumeFollow<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeFollow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.CcrResumeFollow<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfollow<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.CcrUnfollow, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    unfollow<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfollow<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrUnfollow, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfollow<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.CcrUnfollow, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  clear_scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClearScroll<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  clear_scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clear_scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClearScroll<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clear_scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClearScroll<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clearScroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClearScroll<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  clearScroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clearScroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClearScroll<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clearScroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClearScroll<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  close_point_in_time<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClosePointInTime<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  close_point_in_time<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  close_point_in_time<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClosePointInTime<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  close_point_in_time<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClosePointInTime<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  closePointInTime<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClosePointInTime<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  closePointInTime<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  closePointInTime<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClosePointInTime<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  closePointInTime<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClosePointInTime<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  cluster: {
    allocation_explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterAllocationExplain<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    allocation_explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation_explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClusterAllocationExplain<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation_explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClusterAllocationExplain<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocationExplain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterAllocationExplain<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    allocationExplain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocationExplain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClusterAllocationExplain<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocationExplain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClusterAllocationExplain<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_component_template<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterDeleteComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_component_template<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_component_template<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterDeleteComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_component_template<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterDeleteComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteComponentTemplate<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterDeleteComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteComponentTemplate<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteComponentTemplate<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterDeleteComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteComponentTemplate<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterDeleteComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_voting_config_exclusions<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterDeleteVotingConfigExclusions, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_voting_config_exclusions<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_voting_config_exclusions<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterDeleteVotingConfigExclusions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_voting_config_exclusions<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterDeleteVotingConfigExclusions, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteVotingConfigExclusions<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterDeleteVotingConfigExclusions, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteVotingConfigExclusions<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteVotingConfigExclusions<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterDeleteVotingConfigExclusions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteVotingConfigExclusions<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterDeleteVotingConfigExclusions, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_component_template<TResponse = boolean, TContext = Context>(params?: RequestParams.ClusterExistsComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists_component_template<TResponse = boolean, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_component_template<TResponse = boolean, TContext = Context>(params: RequestParams.ClusterExistsComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_component_template<TResponse = boolean, TContext = Context>(params: RequestParams.ClusterExistsComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsComponentTemplate<TResponse = boolean, TContext = Context>(params?: RequestParams.ClusterExistsComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsComponentTemplate<TResponse = boolean, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsComponentTemplate<TResponse = boolean, TContext = Context>(params: RequestParams.ClusterExistsComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsComponentTemplate<TResponse = boolean, TContext = Context>(params: RequestParams.ClusterExistsComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_component_template<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterGetComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_component_template<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_component_template<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterGetComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_component_template<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterGetComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getComponentTemplate<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterGetComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getComponentTemplate<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getComponentTemplate<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterGetComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getComponentTemplate<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterGetComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterGetSettings, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_settings<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterGetSettings, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterGetSettings, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterGetSettings, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getSettings<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterGetSettings, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterGetSettings, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterHealth, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    health<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterHealth, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterHealth, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterPendingTasks, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pending_tasks<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPendingTasks, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPendingTasks, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterPendingTasks, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pendingTasks<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPendingTasks, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPendingTasks, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_voting_config_exclusions<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterPostVotingConfigExclusions, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post_voting_config_exclusions<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_voting_config_exclusions<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPostVotingConfigExclusions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_voting_config_exclusions<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPostVotingConfigExclusions, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postVotingConfigExclusions<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterPostVotingConfigExclusions, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postVotingConfigExclusions<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postVotingConfigExclusions<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPostVotingConfigExclusions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postVotingConfigExclusions<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPostVotingConfigExclusions, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_component_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterPutComponentTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_component_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_component_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPutComponentTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_component_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPutComponentTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putComponentTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterPutComponentTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putComponentTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putComponentTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPutComponentTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putComponentTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPutComponentTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterPutSettings<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPutSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPutSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterPutSettings<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPutSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClusterPutSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remote_info<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterRemoteInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    remote_info<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remote_info<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterRemoteInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remote_info<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterRemoteInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remoteInfo<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterRemoteInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    remoteInfo<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remoteInfo<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterRemoteInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remoteInfo<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterRemoteInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reroute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterReroute<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reroute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reroute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClusterReroute<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reroute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ClusterReroute<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    state<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterState, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    state<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    state<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterState, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    state<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterState, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ClusterStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ClusterStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  count<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Count<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  count<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  count<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Count<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  count<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Count<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Create<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Create<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Create<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  dangling_indices: {
    delete_dangling_index<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DanglingIndicesDeleteDanglingIndex, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_dangling_index<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_dangling_index<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesDeleteDanglingIndex, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_dangling_index<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesDeleteDanglingIndex, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDanglingIndex<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DanglingIndicesDeleteDanglingIndex, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteDanglingIndex<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDanglingIndex<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesDeleteDanglingIndex, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDanglingIndex<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesDeleteDanglingIndex, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    import_dangling_index<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DanglingIndicesImportDanglingIndex, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    import_dangling_index<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    import_dangling_index<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesImportDanglingIndex, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    import_dangling_index<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesImportDanglingIndex, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    importDanglingIndex<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DanglingIndicesImportDanglingIndex, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    importDanglingIndex<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    importDanglingIndex<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesImportDanglingIndex, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    importDanglingIndex<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesImportDanglingIndex, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list_dangling_indices<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DanglingIndicesListDanglingIndices, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    list_dangling_indices<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list_dangling_indices<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesListDanglingIndices, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list_dangling_indices<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesListDanglingIndices, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    listDanglingIndices<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DanglingIndicesListDanglingIndices, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    listDanglingIndices<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    listDanglingIndices<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesListDanglingIndices, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    listDanglingIndices<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesListDanglingIndices, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  danglingIndices: {
    delete_dangling_index<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DanglingIndicesDeleteDanglingIndex, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_dangling_index<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_dangling_index<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesDeleteDanglingIndex, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_dangling_index<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesDeleteDanglingIndex, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDanglingIndex<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DanglingIndicesDeleteDanglingIndex, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteDanglingIndex<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDanglingIndex<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesDeleteDanglingIndex, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDanglingIndex<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesDeleteDanglingIndex, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    import_dangling_index<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DanglingIndicesImportDanglingIndex, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    import_dangling_index<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    import_dangling_index<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesImportDanglingIndex, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    import_dangling_index<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesImportDanglingIndex, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    importDanglingIndex<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DanglingIndicesImportDanglingIndex, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    importDanglingIndex<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    importDanglingIndex<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesImportDanglingIndex, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    importDanglingIndex<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesImportDanglingIndex, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list_dangling_indices<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DanglingIndicesListDanglingIndices, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    list_dangling_indices<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list_dangling_indices<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesListDanglingIndices, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list_dangling_indices<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesListDanglingIndices, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    listDanglingIndices<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DanglingIndicesListDanglingIndices, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    listDanglingIndices<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    listDanglingIndices<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesListDanglingIndices, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    listDanglingIndices<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DanglingIndicesListDanglingIndices, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  delete<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.Delete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  delete<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.Delete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.Delete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.DeleteByQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  delete_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.DeleteByQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.DeleteByQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.DeleteByQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  deleteByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.DeleteByQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.DeleteByQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query_rethrottle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DeleteByQueryRethrottle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  delete_by_query_rethrottle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query_rethrottle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DeleteByQueryRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query_rethrottle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DeleteByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQueryRethrottle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DeleteByQueryRethrottle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  deleteByQueryRethrottle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQueryRethrottle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DeleteByQueryRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQueryRethrottle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DeleteByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_script<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DeleteScript, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  delete_script<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_script<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DeleteScript, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_script<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DeleteScript, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteScript<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.DeleteScript, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  deleteScript<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteScript<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DeleteScript, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteScript<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.DeleteScript, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  enrich: {
    delete_policy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EnrichDeletePolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_policy<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_policy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EnrichDeletePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_policy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EnrichDeletePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePolicy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EnrichDeletePolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deletePolicy<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePolicy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EnrichDeletePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePolicy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EnrichDeletePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_policy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EnrichExecutePolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    execute_policy<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_policy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EnrichExecutePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_policy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EnrichExecutePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executePolicy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EnrichExecutePolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executePolicy<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executePolicy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EnrichExecutePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executePolicy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EnrichExecutePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_policy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EnrichGetPolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_policy<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_policy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EnrichGetPolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_policy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EnrichGetPolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPolicy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EnrichGetPolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getPolicy<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPolicy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EnrichGetPolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPolicy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EnrichGetPolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.EnrichPutPolicy<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.EnrichPutPolicy<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.EnrichPutPolicy<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.EnrichPutPolicy<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.EnrichPutPolicy<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.EnrichPutPolicy<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EnrichStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EnrichStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EnrichStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  eql: {
    delete<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EqlDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EqlDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EqlDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EqlGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EqlGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EqlGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EqlGetStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_status<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EqlGetStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EqlGetStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.EqlGetStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getStatus<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EqlGetStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.EqlGetStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.EqlSearch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.EqlSearch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.EqlSearch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  exists<TResponse = boolean, TContext = Context>(params?: RequestParams.Exists, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  exists<TResponse = boolean, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists<TResponse = boolean, TContext = Context>(params: RequestParams.Exists, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists<TResponse = boolean, TContext = Context>(params: RequestParams.Exists, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists_source<TResponse = boolean, TContext = Context>(params?: RequestParams.ExistsSource, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  exists_source<TResponse = boolean, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists_source<TResponse = boolean, TContext = Context>(params: RequestParams.ExistsSource, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists_source<TResponse = boolean, TContext = Context>(params: RequestParams.ExistsSource, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  existsSource<TResponse = boolean, TContext = Context>(params?: RequestParams.ExistsSource, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  existsSource<TResponse = boolean, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  existsSource<TResponse = boolean, TContext = Context>(params: RequestParams.ExistsSource, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  existsSource<TResponse = boolean, TContext = Context>(params: RequestParams.ExistsSource, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Explain<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Explain<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Explain<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  features: {
    get_features<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.FeaturesGetFeatures, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_features<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_features<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.FeaturesGetFeatures, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_features<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.FeaturesGetFeatures, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFeatures<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.FeaturesGetFeatures, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getFeatures<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFeatures<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.FeaturesGetFeatures, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFeatures<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.FeaturesGetFeatures, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reset_features<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.FeaturesResetFeatures, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reset_features<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reset_features<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.FeaturesResetFeatures, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reset_features<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.FeaturesResetFeatures, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resetFeatures<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.FeaturesResetFeatures, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resetFeatures<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resetFeatures<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.FeaturesResetFeatures, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resetFeatures<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.FeaturesResetFeatures, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  field_caps<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.FieldCaps<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  field_caps<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  field_caps<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.FieldCaps<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  field_caps<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.FieldCaps<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  fieldCaps<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.FieldCaps<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  fieldCaps<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  fieldCaps<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.FieldCaps<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  fieldCaps<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.FieldCaps<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  fleet: {
    global_checkpoints<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.FleetGlobalCheckpoints, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    global_checkpoints<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    global_checkpoints<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.FleetGlobalCheckpoints, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    global_checkpoints<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.FleetGlobalCheckpoints, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    globalCheckpoints<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.FleetGlobalCheckpoints, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    globalCheckpoints<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    globalCheckpoints<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.FleetGlobalCheckpoints, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    globalCheckpoints<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.FleetGlobalCheckpoints, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.FleetMsearch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.FleetMsearch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.FleetMsearch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.FleetSearch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.FleetSearch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.FleetSearch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.Get, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.Get, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.Get, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetScript, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get_script<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetScript, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetScript, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScript<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetScript, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getScript<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScript<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetScript, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScript<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetScript, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_context<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetScriptContext, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get_script_context<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_context<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetScriptContext, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_context<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetScriptContext, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptContext<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetScriptContext, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getScriptContext<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptContext<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetScriptContext, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptContext<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetScriptContext, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_languages<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetScriptLanguages, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get_script_languages<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_languages<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetScriptLanguages, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_languages<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetScriptLanguages, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptLanguages<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetScriptLanguages, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getScriptLanguages<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptLanguages<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetScriptLanguages, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptLanguages<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetScriptLanguages, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_source<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetSource, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get_source<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_source<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetSource, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_source<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetSource, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getSource<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.GetSource, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getSource<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getSource<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetSource, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getSource<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.GetSource, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  graph: {
    explore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.GraphExplore<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.GraphExplore<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.GraphExplore<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ilm: {
    delete_lifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmDeleteLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_lifecycle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmDeleteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmDeleteLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteLifecycle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmDeleteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_lifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmExplainLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explain_lifecycle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_lifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmExplainLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_lifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmExplainLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainLifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmExplainLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explainLifecycle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainLifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmExplainLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainLifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmExplainLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmGetLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_lifecycle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmGetLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmGetLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getLifecycle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmGetLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmGetStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_status<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmGetStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmGetStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmGetStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getStatus<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmGetStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmGetStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    migrate_to_data_tiers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IlmMigrateToDataTiers<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    migrate_to_data_tiers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    migrate_to_data_tiers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IlmMigrateToDataTiers<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    migrate_to_data_tiers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IlmMigrateToDataTiers<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    migrateToDataTiers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IlmMigrateToDataTiers<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    migrateToDataTiers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    migrateToDataTiers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IlmMigrateToDataTiers<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    migrateToDataTiers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IlmMigrateToDataTiers<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    move_to_step<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IlmMoveToStep<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    move_to_step<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    move_to_step<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IlmMoveToStep<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    move_to_step<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IlmMoveToStep<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    moveToStep<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IlmMoveToStep<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    moveToStep<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    moveToStep<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IlmMoveToStep<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    moveToStep<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IlmMoveToStep<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IlmPutLifecycle<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IlmPutLifecycle<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IlmPutLifecycle<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IlmPutLifecycle<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IlmPutLifecycle<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IlmPutLifecycle<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remove_policy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmRemovePolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    remove_policy<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remove_policy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmRemovePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remove_policy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmRemovePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    removePolicy<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmRemovePolicy, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    removePolicy<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    removePolicy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmRemovePolicy, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    removePolicy<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmRemovePolicy, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    retry<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmRetry, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    retry<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    retry<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmRetry, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    retry<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmRetry, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmStart, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmStart, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmStart, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IlmStop, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmStop, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IlmStop, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  index<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Index<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  index<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  index<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Index<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  index<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Index<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  indices: {
    add_block<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesAddBlock, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    add_block<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    add_block<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesAddBlock, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    add_block<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesAddBlock, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    addBlock<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesAddBlock, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    addBlock<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    addBlock<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesAddBlock, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    addBlock<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesAddBlock, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    analyze<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesAnalyze<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    analyze<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    analyze<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesAnalyze<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    analyze<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesAnalyze<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesClearCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cache<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesClearCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesClearCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesClearCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCache<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesClearCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesClearCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesClone<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesClone<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesClone<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesClose, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    close<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesClose, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesClose, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesCreate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesCreate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesCreate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_data_stream<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesCreateDataStream, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create_data_stream<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_data_stream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesCreateDataStream, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_data_stream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesCreateDataStream, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createDataStream<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesCreateDataStream, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    createDataStream<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createDataStream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesCreateDataStream, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createDataStream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesCreateDataStream, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    data_streams_stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDataStreamsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    data_streams_stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    data_streams_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDataStreamsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    data_streams_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDataStreamsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    dataStreamsStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDataStreamsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    dataStreamsStats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    dataStreamsStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDataStreamsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    dataStreamsStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDataStreamsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_alias<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDeleteAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_alias<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_alias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_alias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAlias<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDeleteAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteAlias<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAlias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAlias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_stream<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDeleteDataStream, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_data_stream<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_stream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteDataStream, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_stream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteDataStream, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataStream<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDeleteDataStream, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteDataStream<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataStream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteDataStream, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataStream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteDataStream, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_index_template<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDeleteIndexTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_index_template<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_index_template<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteIndexTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_index_template<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteIndexTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteIndexTemplate<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDeleteIndexTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteIndexTemplate<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteIndexTemplate<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteIndexTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteIndexTemplate<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteIndexTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_template<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDeleteTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_template<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_template<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_template<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTemplate<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDeleteTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteTemplate<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTemplate<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTemplate<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDeleteTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disk_usage<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDiskUsage, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    disk_usage<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disk_usage<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDiskUsage, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disk_usage<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDiskUsage, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    diskUsage<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesDiskUsage, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    diskUsage<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    diskUsage<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDiskUsage, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    diskUsage<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesDiskUsage, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists<TResponse = boolean, TContext = Context>(params?: RequestParams.IndicesExists, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists<TResponse = boolean, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExists, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExists, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_alias<TResponse = boolean, TContext = Context>(params?: RequestParams.IndicesExistsAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists_alias<TResponse = boolean, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_alias<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_alias<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsAlias<TResponse = boolean, TContext = Context>(params?: RequestParams.IndicesExistsAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsAlias<TResponse = boolean, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsAlias<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsAlias<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_index_template<TResponse = boolean, TContext = Context>(params?: RequestParams.IndicesExistsIndexTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists_index_template<TResponse = boolean, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_index_template<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsIndexTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_index_template<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsIndexTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsIndexTemplate<TResponse = boolean, TContext = Context>(params?: RequestParams.IndicesExistsIndexTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsIndexTemplate<TResponse = boolean, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsIndexTemplate<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsIndexTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsIndexTemplate<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsIndexTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_template<TResponse = boolean, TContext = Context>(params?: RequestParams.IndicesExistsTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists_template<TResponse = boolean, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_template<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_template<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsTemplate<TResponse = boolean, TContext = Context>(params?: RequestParams.IndicesExistsTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsTemplate<TResponse = boolean, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsTemplate<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsTemplate<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_type<TResponse = boolean, TContext = Context>(params?: RequestParams.IndicesExistsType, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists_type<TResponse = boolean, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_type<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsType, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_type<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsType, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsType<TResponse = boolean, TContext = Context>(params?: RequestParams.IndicesExistsType, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsType<TResponse = boolean, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsType<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsType, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsType<TResponse = boolean, TContext = Context>(params: RequestParams.IndicesExistsType, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    field_usage_stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesFieldUsageStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    field_usage_stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    field_usage_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesFieldUsageStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    field_usage_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesFieldUsageStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    fieldUsageStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesFieldUsageStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    fieldUsageStats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    fieldUsageStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesFieldUsageStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    fieldUsageStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesFieldUsageStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesFlush, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flush<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesFlush, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesFlush, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_synced<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesFlushSynced, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flush_synced<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_synced<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesFlushSynced, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_synced<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesFlushSynced, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushSynced<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesFlushSynced, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flushSynced<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushSynced<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesFlushSynced, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushSynced<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesFlushSynced, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forcemerge<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesForcemerge, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    forcemerge<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forcemerge<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesForcemerge, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forcemerge<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesForcemerge, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    freeze<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesFreeze, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    freeze<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    freeze<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesFreeze, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    freeze<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesFreeze, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_alias<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_alias<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_alias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_alias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAlias<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAlias<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAlias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAlias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_stream<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetDataStream, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_data_stream<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_stream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetDataStream, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_stream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetDataStream, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataStream<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetDataStream, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDataStream<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataStream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetDataStream, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataStream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetDataStream, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_field_mapping<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetFieldMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_field_mapping<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_field_mapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetFieldMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_field_mapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetFieldMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFieldMapping<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetFieldMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getFieldMapping<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFieldMapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetFieldMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFieldMapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetFieldMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_index_template<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetIndexTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_index_template<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_index_template<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetIndexTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_index_template<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetIndexTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getIndexTemplate<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetIndexTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getIndexTemplate<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getIndexTemplate<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetIndexTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getIndexTemplate<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetIndexTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_mapping<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_mapping<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_mapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_mapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getMapping<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getMapping<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getMapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getMapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetSettings, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_settings<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetSettings, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetSettings, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetSettings, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getSettings<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetSettings, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetSettings, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_template<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_template<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_template<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_template<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTemplate<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTemplate<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTemplate<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTemplate<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_upgrade<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetUpgrade, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_upgrade<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_upgrade<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetUpgrade, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_upgrade<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetUpgrade, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUpgrade<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesGetUpgrade, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getUpgrade<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUpgrade<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetUpgrade, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUpgrade<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesGetUpgrade, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    migrate_to_data_stream<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesMigrateToDataStream, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    migrate_to_data_stream<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    migrate_to_data_stream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesMigrateToDataStream, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    migrate_to_data_stream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesMigrateToDataStream, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    migrateToDataStream<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesMigrateToDataStream, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    migrateToDataStream<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    migrateToDataStream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesMigrateToDataStream, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    migrateToDataStream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesMigrateToDataStream, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    modify_data_stream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesModifyDataStream<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    modify_data_stream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    modify_data_stream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesModifyDataStream<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    modify_data_stream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesModifyDataStream<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    modifyDataStream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesModifyDataStream<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    modifyDataStream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    modifyDataStream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesModifyDataStream<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    modifyDataStream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesModifyDataStream<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesOpen, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    open<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesOpen, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesOpen, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    promote_data_stream<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPromoteDataStream, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    promote_data_stream<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    promote_data_stream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPromoteDataStream, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    promote_data_stream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPromoteDataStream, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    promoteDataStream<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPromoteDataStream, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    promoteDataStream<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    promoteDataStream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPromoteDataStream, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    promoteDataStream<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPromoteDataStream, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_alias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPutAlias<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_alias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_alias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutAlias<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_alias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutAlias<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAlias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPutAlias<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putAlias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAlias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutAlias<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAlias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutAlias<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPutIndexTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutIndexTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutIndexTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPutIndexTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutIndexTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutIndexTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPutMapping<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutMapping<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutMapping<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPutMapping<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutMapping<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutMapping<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPutSettings<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPutSettings<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPutTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesPutTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesPutTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesRecovery, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    recovery<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesRecovery, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesRecovery, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    refresh<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesRefresh, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    refresh<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    refresh<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesRefresh, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    refresh<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesRefresh, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_search_analyzers<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesReloadSearchAnalyzers, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reload_search_analyzers<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_search_analyzers<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesReloadSearchAnalyzers, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_search_analyzers<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesReloadSearchAnalyzers, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesReloadSearchAnalyzers, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reloadSearchAnalyzers<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesReloadSearchAnalyzers, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesReloadSearchAnalyzers, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resolve_index<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesResolveIndex, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resolve_index<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resolve_index<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesResolveIndex, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resolve_index<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesResolveIndex, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resolveIndex<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesResolveIndex, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resolveIndex<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resolveIndex<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesResolveIndex, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resolveIndex<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesResolveIndex, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollover<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesRollover<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    rollover<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollover<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesRollover<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollover<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesRollover<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesSegments, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    segments<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesSegments, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesSegments, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shard_stores<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesShardStores, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    shard_stores<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shard_stores<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesShardStores, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shard_stores<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesShardStores, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shardStores<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesShardStores, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    shardStores<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shardStores<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesShardStores, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shardStores<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesShardStores, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shrink<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesShrink<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    shrink<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shrink<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesShrink<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shrink<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesShrink<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesSimulateIndexTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    simulate_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesSimulateIndexTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesSimulateIndexTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulateIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesSimulateIndexTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    simulateIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulateIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesSimulateIndexTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulateIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesSimulateIndexTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesSimulateTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    simulate_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesSimulateTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesSimulateTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulateTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesSimulateTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    simulateTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulateTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesSimulateTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulateTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesSimulateTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    split<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesSplit<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    split<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    split<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesSplit<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    split<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesSplit<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfreeze<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesUnfreeze, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    unfreeze<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfreeze<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesUnfreeze, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfreeze<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesUnfreeze, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_aliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesUpdateAliases<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_aliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_aliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesUpdateAliases<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_aliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesUpdateAliases<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateAliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesUpdateAliases<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateAliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateAliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesUpdateAliases<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateAliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesUpdateAliases<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesUpgrade, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    upgrade<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesUpgrade, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IndicesUpgrade, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesValidateQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validate_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesValidateQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesValidateQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IndicesValidateQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validateQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesValidateQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IndicesValidateQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  info<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.Info, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  info<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  info<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.Info, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  info<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.Info, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  ingest: {
    delete_pipeline<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IngestDeletePipeline, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_pipeline<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_pipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestDeletePipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_pipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestDeletePipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePipeline<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IngestDeletePipeline, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deletePipeline<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestDeletePipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestDeletePipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    geo_ip_stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IngestGeoIpStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    geo_ip_stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    geo_ip_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestGeoIpStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    geo_ip_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestGeoIpStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    geoIpStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IngestGeoIpStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    geoIpStats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    geoIpStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestGeoIpStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    geoIpStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestGeoIpStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_pipeline<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IngestGetPipeline, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_pipeline<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_pipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestGetPipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_pipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestGetPipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPipeline<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IngestGetPipeline, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getPipeline<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestGetPipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestGetPipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processor_grok<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IngestProcessorGrok, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    processor_grok<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processor_grok<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestProcessorGrok, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processor_grok<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestProcessorGrok, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processorGrok<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.IngestProcessorGrok, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    processorGrok<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processorGrok<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestProcessorGrok, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processorGrok<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.IngestProcessorGrok, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IngestPutPipeline<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IngestPutPipeline<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IngestPutPipeline<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IngestPutPipeline<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IngestPutPipeline<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IngestPutPipeline<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.IngestSimulate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    simulate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IngestSimulate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.IngestSimulate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  license: {
    delete<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicenseDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicenseDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicenseDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicenseGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicenseGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicenseGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_basic_status<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicenseGetBasicStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_basic_status<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_basic_status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicenseGetBasicStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_basic_status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicenseGetBasicStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBasicStatus<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicenseGetBasicStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getBasicStatus<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBasicStatus<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicenseGetBasicStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBasicStatus<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicenseGetBasicStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trial_status<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicenseGetTrialStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_trial_status<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trial_status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicenseGetTrialStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trial_status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicenseGetTrialStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrialStatus<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicenseGetTrialStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTrialStatus<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrialStatus<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicenseGetTrialStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrialStatus<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicenseGetTrialStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.LicensePost<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.LicensePost<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.LicensePost<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_basic<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicensePostStartBasic, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post_start_basic<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_basic<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicensePostStartBasic, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_basic<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicensePostStartBasic, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartBasic<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicensePostStartBasic, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postStartBasic<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartBasic<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicensePostStartBasic, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartBasic<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicensePostStartBasic, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_trial<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicensePostStartTrial, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post_start_trial<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_trial<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicensePostStartTrial, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_trial<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicensePostStartTrial, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartTrial<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LicensePostStartTrial, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postStartTrial<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartTrial<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicensePostStartTrial, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartTrial<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LicensePostStartTrial, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  logstash: {
    delete_pipeline<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LogstashDeletePipeline, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_pipeline<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_pipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LogstashDeletePipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_pipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LogstashDeletePipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePipeline<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LogstashDeletePipeline, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deletePipeline<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LogstashDeletePipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LogstashDeletePipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_pipeline<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LogstashGetPipeline, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_pipeline<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_pipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LogstashGetPipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_pipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LogstashGetPipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPipeline<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.LogstashGetPipeline, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getPipeline<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LogstashGetPipeline, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPipeline<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.LogstashGetPipeline, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.LogstashPutPipeline<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.LogstashPutPipeline<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.LogstashPutPipeline<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.LogstashPutPipeline<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.LogstashPutPipeline<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.LogstashPutPipeline<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  mget<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Mget<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  mget<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mget<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Mget<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mget<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Mget<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  migration: {
    deprecations<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MigrationDeprecations, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deprecations<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deprecations<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MigrationDeprecations, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deprecations<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MigrationDeprecations, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_feature_upgrade_status<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MigrationGetFeatureUpgradeStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_feature_upgrade_status<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_feature_upgrade_status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MigrationGetFeatureUpgradeStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_feature_upgrade_status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MigrationGetFeatureUpgradeStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFeatureUpgradeStatus<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MigrationGetFeatureUpgradeStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getFeatureUpgradeStatus<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFeatureUpgradeStatus<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MigrationGetFeatureUpgradeStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFeatureUpgradeStatus<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MigrationGetFeatureUpgradeStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_feature_upgrade<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MigrationPostFeatureUpgrade, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post_feature_upgrade<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_feature_upgrade<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MigrationPostFeatureUpgrade, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_feature_upgrade<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MigrationPostFeatureUpgrade, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postFeatureUpgrade<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MigrationPostFeatureUpgrade, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postFeatureUpgrade<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postFeatureUpgrade<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MigrationPostFeatureUpgrade, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postFeatureUpgrade<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MigrationPostFeatureUpgrade, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ml: {
    close_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlCloseJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    close_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlCloseJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlCloseJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    closeJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlCloseJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    closeJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    closeJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlCloseJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    closeJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlCloseJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteCalendar, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_calendar<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteCalendar, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteCalendar, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendar<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteCalendar, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteCalendar<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendar<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteCalendar, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendar<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteCalendar, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_event<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteCalendarEvent, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_calendar_event<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_event<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteCalendarEvent, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_event<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteCalendarEvent, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteCalendarEvent, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteCalendarEvent<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteCalendarEvent, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteCalendarEvent, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_job<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteCalendarJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_calendar_job<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_job<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteCalendarJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_job<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteCalendarJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteCalendarJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteCalendarJob<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteCalendarJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteCalendarJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_frame_analytics<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteDataFrameAnalytics, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_data_frame_analytics<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_frame_analytics<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_frame_analytics<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteDataFrameAnalytics, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteDataFrameAnalytics<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_datafeed<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteDatafeed, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_datafeed<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_datafeed<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteDatafeed, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_datafeed<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteDatafeed, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteDatafeed, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteDatafeed<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteDatafeed, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteDatafeed, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_expired_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteExpiredData<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_expired_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_expired_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteExpiredData<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_expired_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteExpiredData<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteExpiredData<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteExpiredData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteExpiredData<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteExpiredData<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_filter<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteFilter, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_filter<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_filter<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteFilter, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_filter<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteFilter, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteFilter<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteFilter, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteFilter<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteFilter<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteFilter, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteFilter<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteFilter, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_forecast<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteForecast, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_forecast<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_forecast<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteForecast, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_forecast<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteForecast, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteForecast<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteForecast, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteForecast<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteForecast<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteForecast, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteForecast<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteForecast, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_job<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteJob<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_model_snapshot<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteModelSnapshot, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_model_snapshot<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_model_snapshot<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteModelSnapshot, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_model_snapshot<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteModelSnapshot, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteModelSnapshot, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteModelSnapshot<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteModelSnapshot, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteModelSnapshot, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_trained_model<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteTrainedModel, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_trained_model<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_trained_model<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteTrainedModel, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_trained_model<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteTrainedModel, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteTrainedModel, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteTrainedModel<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteTrainedModel, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteTrainedModel, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_trained_model_alias<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteTrainedModelAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_trained_model_alias<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_trained_model_alias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteTrainedModelAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_trained_model_alias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteTrainedModelAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTrainedModelAlias<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlDeleteTrainedModelAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteTrainedModelAlias<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTrainedModelAlias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteTrainedModelAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTrainedModelAlias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlDeleteTrainedModelAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimate_model_memory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlEstimateModelMemory<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    estimate_model_memory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimate_model_memory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlEstimateModelMemory<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimate_model_memory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlEstimateModelMemory<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlEstimateModelMemory<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    estimateModelMemory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlEstimateModelMemory<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlEstimateModelMemory<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluate_data_frame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlEvaluateDataFrame<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    evaluate_data_frame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluate_data_frame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlEvaluateDataFrame<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluate_data_frame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlEvaluateDataFrame<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlEvaluateDataFrame<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    evaluateDataFrame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlEvaluateDataFrame<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlEvaluateDataFrame<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explain_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explainDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlExplainDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_file_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.MlFindFileStructure<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    find_file_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_file_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.MlFindFileStructure<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_file_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.MlFindFileStructure<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findFileStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.MlFindFileStructure<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    findFileStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findFileStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.MlFindFileStructure<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findFileStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.MlFindFileStructure<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlFlushJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flush_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlFlushJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlFlushJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlFlushJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flushJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlFlushJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlFlushJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forecast<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlForecast<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    forecast<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forecast<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlForecast<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forecast<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlForecast<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetBuckets<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetBuckets<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetBuckets<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetBuckets<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetBuckets<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetBuckets<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendar_events<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetCalendarEvents, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_calendar_events<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendar_events<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetCalendarEvents, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendar_events<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetCalendarEvents, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetCalendarEvents, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getCalendarEvents<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetCalendarEvents, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetCalendarEvents, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetCalendars<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_calendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetCalendars<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetCalendars<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetCalendars<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getCalendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetCalendars<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetCalendars<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_categories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetCategories<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_categories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_categories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetCategories<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_categories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetCategories<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCategories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetCategories<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getCategories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCategories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetCategories<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCategories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetCategories<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetDataFrameAnalytics, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_data_frame_analytics<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetDataFrameAnalytics, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDataFrameAnalytics<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDataFrameAnalytics, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics_stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetDataFrameAnalyticsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_data_frame_analytics_stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDataFrameAnalyticsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDataFrameAnalyticsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetDataFrameAnalyticsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDataFrameAnalyticsStats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDataFrameAnalyticsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDataFrameAnalyticsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeed_stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetDatafeedStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_datafeed_stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeed_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDatafeedStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeed_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDatafeedStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetDatafeedStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDatafeedStats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDatafeedStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDatafeedStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeeds<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetDatafeeds, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_datafeeds<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeeds<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDatafeeds, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeeds<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDatafeeds, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeeds<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetDatafeeds, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDatafeeds<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeeds<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDatafeeds, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeeds<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetDatafeeds, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_filters<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetFilters, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_filters<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_filters<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetFilters, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_filters<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetFilters, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFilters<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetFilters, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getFilters<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFilters<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetFilters, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFilters<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetFilters, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_influencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetInfluencers<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_influencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_influencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetInfluencers<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_influencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetInfluencers<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getInfluencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetInfluencers<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getInfluencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getInfluencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetInfluencers<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getInfluencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetInfluencers<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_job_stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetJobStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_job_stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_job_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetJobStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_job_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetJobStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetJobStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getJobStats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetJobStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetJobStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetJobs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_jobs<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetJobs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getJobs<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_model_snapshot_upgrade_stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetModelSnapshotUpgradeStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_model_snapshot_upgrade_stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_model_snapshot_upgrade_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetModelSnapshotUpgradeStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_model_snapshot_upgrade_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetModelSnapshotUpgradeStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getModelSnapshotUpgradeStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetModelSnapshotUpgradeStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getModelSnapshotUpgradeStats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getModelSnapshotUpgradeStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetModelSnapshotUpgradeStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getModelSnapshotUpgradeStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetModelSnapshotUpgradeStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_model_snapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetModelSnapshots<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_model_snapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_model_snapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetModelSnapshots<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_model_snapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetModelSnapshots<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getModelSnapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetModelSnapshots<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getModelSnapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getModelSnapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetModelSnapshots<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getModelSnapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetModelSnapshots<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_overall_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetOverallBuckets<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_overall_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_overall_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetOverallBuckets<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_overall_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetOverallBuckets<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetOverallBuckets<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getOverallBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetOverallBuckets<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetOverallBuckets<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_records<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetRecords<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_records<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_records<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetRecords<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_records<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetRecords<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRecords<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetRecords<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRecords<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRecords<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetRecords<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRecords<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlGetRecords<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetTrainedModels, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_trained_models<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetTrainedModels, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetTrainedModels, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModels<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetTrainedModels, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTrainedModels<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModels<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetTrainedModels, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModels<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetTrainedModels, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models_stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetTrainedModelsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_trained_models_stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetTrainedModelsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetTrainedModelsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModelsStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlGetTrainedModelsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTrainedModelsStats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModelsStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetTrainedModelsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModelsStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlGetTrainedModelsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    info<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlOpenJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    open_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlOpenJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlOpenJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    openJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlOpenJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    openJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    openJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlOpenJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    openJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlOpenJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_calendar_events<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPostCalendarEvents<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post_calendar_events<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_calendar_events<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPostCalendarEvents<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_calendar_events<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPostCalendarEvents<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPostCalendarEvents<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postCalendarEvents<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPostCalendarEvents<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPostCalendarEvents<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_data<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.MlPostData<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post_data<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_data<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.MlPostData<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_data<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.MlPostData<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postData<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.MlPostData<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postData<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postData<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.MlPostData<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postData<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.MlPostData<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPreviewDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    preview_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPreviewDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPreviewDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPreviewDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    previewDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPreviewDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPreviewDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPreviewDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    preview_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPreviewDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPreviewDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPreviewDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    previewDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPreviewDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPreviewDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutCalendar<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_calendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutCalendar<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutCalendar<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutCalendar<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putCalendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutCalendar<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutCalendar<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar_job<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutCalendarJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_calendar_job<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar_job<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlPutCalendarJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar_job<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlPutCalendarJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendarJob<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutCalendarJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putCalendarJob<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendarJob<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlPutCalendarJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendarJob<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlPutCalendarJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutFilter<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutFilter<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutFilter<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutFilter<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutFilter<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutFilter<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_trained_model<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutTrainedModel<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_trained_model<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_trained_model<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutTrainedModel<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_trained_model<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutTrainedModel<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTrainedModel<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutTrainedModel<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTrainedModel<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTrainedModel<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutTrainedModel<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTrainedModel<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlPutTrainedModel<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_trained_model_alias<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutTrainedModelAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_trained_model_alias<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_trained_model_alias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlPutTrainedModelAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_trained_model_alias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlPutTrainedModelAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTrainedModelAlias<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlPutTrainedModelAlias, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTrainedModelAlias<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTrainedModelAlias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlPutTrainedModelAlias, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTrainedModelAlias<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlPutTrainedModelAlias, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reset_job<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlResetJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reset_job<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reset_job<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlResetJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reset_job<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlResetJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resetJob<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlResetJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resetJob<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resetJob<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlResetJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resetJob<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlResetJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revert_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlRevertModelSnapshot<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    revert_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revert_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlRevertModelSnapshot<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revert_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlRevertModelSnapshot<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revertModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlRevertModelSnapshot<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    revertModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revertModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlRevertModelSnapshot<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revertModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlRevertModelSnapshot<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    set_upgrade_mode<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlSetUpgradeMode, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    set_upgrade_mode<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    set_upgrade_mode<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlSetUpgradeMode, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    set_upgrade_mode<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlSetUpgradeMode, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlSetUpgradeMode, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    setUpgradeMode<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlSetUpgradeMode, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlSetUpgradeMode, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStartDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlStartDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStartDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStartDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlStartDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStartDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStartDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStopDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlStopDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStopDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStopDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlStopDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStopDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlStopDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpdateDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpdateDataFrameAnalytics<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateDataFrameAnalytics<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateDataFrameAnalytics<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpdateDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpdateDatafeed<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateDatafeed<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateDatafeed<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpdateFilter<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateFilter<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateFilter<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpdateFilter<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateFilter<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateFilter<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpdateJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpdateJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpdateModelSnapshot<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateModelSnapshot<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateModelSnapshot<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpdateModelSnapshot<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateModelSnapshot<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlUpdateModelSnapshot<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade_job_snapshot<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpgradeJobSnapshot, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    upgrade_job_snapshot<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade_job_snapshot<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlUpgradeJobSnapshot, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade_job_snapshot<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlUpgradeJobSnapshot, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgradeJobSnapshot<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.MlUpgradeJobSnapshot, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    upgradeJobSnapshot<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgradeJobSnapshot<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlUpgradeJobSnapshot, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgradeJobSnapshot<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.MlUpgradeJobSnapshot, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlValidate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlValidate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlValidate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_detector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlValidateDetector<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validate_detector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_detector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlValidateDetector<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_detector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlValidateDetector<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateDetector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.MlValidateDetector<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validateDetector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateDetector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlValidateDetector<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateDetector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.MlValidateDetector<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  monitoring: {
    bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.MonitoringBulk<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.MonitoringBulk<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.MonitoringBulk<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.Msearch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.Msearch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.Msearch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch_template<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.MsearchTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  msearch_template<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch_template<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.MsearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch_template<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.MsearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.MsearchTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  msearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.MsearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.MsearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mtermvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Mtermvectors<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  mtermvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mtermvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Mtermvectors<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mtermvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Mtermvectors<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  nodes: {
    clear_repositories_metering_archive<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.NodesClearRepositoriesMeteringArchive, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_repositories_metering_archive<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_repositories_metering_archive<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesClearRepositoriesMeteringArchive, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_repositories_metering_archive<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesClearRepositoriesMeteringArchive, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearRepositoriesMeteringArchive<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.NodesClearRepositoriesMeteringArchive, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearRepositoriesMeteringArchive<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearRepositoriesMeteringArchive<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesClearRepositoriesMeteringArchive, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearRepositoriesMeteringArchive<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesClearRepositoriesMeteringArchive, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_repositories_metering_info<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.NodesGetRepositoriesMeteringInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_repositories_metering_info<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_repositories_metering_info<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesGetRepositoriesMeteringInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_repositories_metering_info<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesGetRepositoriesMeteringInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRepositoriesMeteringInfo<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.NodesGetRepositoriesMeteringInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRepositoriesMeteringInfo<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRepositoriesMeteringInfo<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesGetRepositoriesMeteringInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRepositoriesMeteringInfo<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesGetRepositoriesMeteringInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hot_threads<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.NodesHotThreads, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    hot_threads<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hot_threads<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesHotThreads, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hot_threads<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesHotThreads, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hotThreads<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.NodesHotThreads, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    hotThreads<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hotThreads<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesHotThreads, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hotThreads<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesHotThreads, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.NodesInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    info<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_secure_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.NodesReloadSecureSettings<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reload_secure_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_secure_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.NodesReloadSecureSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_secure_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.NodesReloadSecureSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.NodesReloadSecureSettings<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reloadSecureSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.NodesReloadSecureSettings<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.NodesReloadSecureSettings<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.NodesStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.NodesUsage, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    usage<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesUsage, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.NodesUsage, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  open_point_in_time<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.OpenPointInTime, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  open_point_in_time<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  open_point_in_time<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.OpenPointInTime, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  open_point_in_time<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.OpenPointInTime, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  openPointInTime<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.OpenPointInTime, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  openPointInTime<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  openPointInTime<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.OpenPointInTime, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  openPointInTime<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.OpenPointInTime, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  ping<TResponse = boolean, TContext = Context>(params?: RequestParams.Ping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  ping<TResponse = boolean, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  ping<TResponse = boolean, TContext = Context>(params: RequestParams.Ping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  ping<TResponse = boolean, TContext = Context>(params: RequestParams.Ping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  put_script<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.PutScript<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  put_script<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  put_script<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.PutScript<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  put_script<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.PutScript<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  putScript<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.PutScript<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  putScript<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  putScript<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.PutScript<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  putScript<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.PutScript<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rank_eval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.RankEval<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  rank_eval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rank_eval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RankEval<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rank_eval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RankEval<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rankEval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.RankEval<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  rankEval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rankEval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RankEval<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rankEval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RankEval<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Reindex<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  reindex<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Reindex<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Reindex<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex_rethrottle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ReindexRethrottle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  reindex_rethrottle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex_rethrottle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ReindexRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex_rethrottle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ReindexRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindexRethrottle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ReindexRethrottle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  reindexRethrottle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindexRethrottle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ReindexRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindexRethrottle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ReindexRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  render_search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.RenderSearchTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  render_search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  render_search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RenderSearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  render_search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RenderSearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  renderSearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.RenderSearchTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  renderSearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  renderSearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RenderSearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  renderSearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RenderSearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rollup: {
    delete_job<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupDeleteJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_job<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupDeleteJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupDeleteJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupDeleteJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteJob<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupDeleteJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupDeleteJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupGetJobs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_jobs<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupGetJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupGetJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupGetJobs, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getJobs<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupGetJobs, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupGetJobs, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_caps<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupGetRollupCaps, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_rollup_caps<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_caps<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupGetRollupCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_caps<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupGetRollupCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupCaps<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupGetRollupCaps, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRollupCaps<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupCaps<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupGetRollupCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupCaps<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupGetRollupCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_index_caps<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupGetRollupIndexCaps, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_rollup_index_caps<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_index_caps<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupGetRollupIndexCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_index_caps<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupGetRollupIndexCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupGetRollupIndexCaps, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRollupIndexCaps<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupGetRollupIndexCaps, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupGetRollupIndexCaps, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.RollupPutJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RollupPutJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RollupPutJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.RollupPutJob<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RollupPutJob<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RollupPutJob<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollup<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.RollupRollup<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    rollup<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollup<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RollupRollup<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollup<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RollupRollup<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollup_search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.RollupRollupSearch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    rollup_search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollup_search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RollupRollupSearch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollup_search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RollupRollupSearch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollupSearch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.RollupRollupSearch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    rollupSearch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollupSearch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RollupRollupSearch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollupSearch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.RollupRollupSearch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_job<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupStartJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start_job<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_job<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupStartJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_job<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupStartJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startJob<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupStartJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startJob<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startJob<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupStartJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startJob<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupStartJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_job<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupStopJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop_job<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_job<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupStopJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_job<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupStopJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopJob<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.RollupStopJob, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopJob<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopJob<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupStopJob, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopJob<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.RollupStopJob, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  scripts_painless_execute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ScriptsPainlessExecute<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  scripts_painless_execute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scripts_painless_execute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ScriptsPainlessExecute<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scripts_painless_execute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ScriptsPainlessExecute<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ScriptsPainlessExecute<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  scriptsPainlessExecute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ScriptsPainlessExecute<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ScriptsPainlessExecute<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Scroll<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Scroll<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Scroll<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Search<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Search<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Search<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_mvt<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SearchMvt<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  search_mvt<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_mvt<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SearchMvt<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_mvt<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SearchMvt<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchMvt<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SearchMvt<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  searchMvt<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchMvt<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SearchMvt<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchMvt<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SearchMvt<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_shards<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchShards, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  search_shards<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_shards<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchShards, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_shards<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchShards, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchShards<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchShards, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  searchShards<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchShards<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchShards, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchShards<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchShards, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SearchTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SearchTemplate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  searchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SearchTemplate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SearchTemplate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchable_snapshots: {
    cache_stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsCacheStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    cache_stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cache_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsCacheStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cache_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsCacheStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cacheStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsCacheStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    cacheStats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cacheStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsCacheStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cacheStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsCacheStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsClearCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cache<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsClearCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsClearCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsClearCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCache<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsClearCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsClearCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsMount<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsMount<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsMount<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repository_stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsRepositoryStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    repository_stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repository_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsRepositoryStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repository_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsRepositoryStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositoryStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsRepositoryStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    repositoryStats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositoryStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsRepositoryStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositoryStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsRepositoryStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  searchableSnapshots: {
    cache_stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsCacheStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    cache_stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cache_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsCacheStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cache_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsCacheStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cacheStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsCacheStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    cacheStats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cacheStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsCacheStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cacheStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsCacheStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsClearCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cache<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsClearCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsClearCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsClearCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCache<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsClearCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsClearCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsMount<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsMount<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsMount<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repository_stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsRepositoryStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    repository_stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repository_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsRepositoryStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repository_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsRepositoryStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositoryStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsRepositoryStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    repositoryStats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositoryStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsRepositoryStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositoryStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsRepositoryStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SearchableSnapshotsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SearchableSnapshotsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  security: {
    authenticate<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityAuthenticate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    authenticate<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    authenticate<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityAuthenticate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    authenticate<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityAuthenticate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    change_password<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityChangePassword<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    change_password<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    change_password<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityChangePassword<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    change_password<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityChangePassword<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    changePassword<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityChangePassword<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    changePassword<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    changePassword<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityChangePassword<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    changePassword<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityChangePassword<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_api_key_cache<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityClearApiKeyCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_api_key_cache<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_api_key_cache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearApiKeyCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_api_key_cache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearApiKeyCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearApiKeyCache<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityClearApiKeyCache, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearApiKeyCache<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearApiKeyCache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearApiKeyCache, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearApiKeyCache<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearApiKeyCache, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_privileges<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityClearCachedPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cached_privileges<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_privileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_privileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedPrivileges<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityClearCachedPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCachedPrivileges<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedPrivileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedPrivileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_realms<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityClearCachedRealms, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cached_realms<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_realms<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedRealms, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_realms<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedRealms, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityClearCachedRealms, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCachedRealms<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedRealms, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedRealms, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_roles<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityClearCachedRoles, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cached_roles<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_roles<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedRoles, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_roles<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedRoles, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityClearCachedRoles, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCachedRoles<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedRoles, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedRoles, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_service_tokens<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityClearCachedServiceTokens, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cached_service_tokens<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_service_tokens<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedServiceTokens, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_service_tokens<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedServiceTokens, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedServiceTokens<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityClearCachedServiceTokens, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCachedServiceTokens<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedServiceTokens<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedServiceTokens, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedServiceTokens<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityClearCachedServiceTokens, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityCreateApiKey<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityCreateApiKey<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityCreateApiKey<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityCreateApiKey<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    createApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityCreateApiKey<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityCreateApiKey<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_service_token<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityCreateServiceToken, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create_service_token<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_service_token<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityCreateServiceToken, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_service_token<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityCreateServiceToken, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createServiceToken<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityCreateServiceToken, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    createServiceToken<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createServiceToken<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityCreateServiceToken, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createServiceToken<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityCreateServiceToken, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_privileges<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDeletePrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_privileges<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_privileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeletePrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_privileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeletePrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePrivileges<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDeletePrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deletePrivileges<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePrivileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeletePrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePrivileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeletePrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDeleteRole, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_role<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteRole, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteRole, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRole<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDeleteRole, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteRole<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRole<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteRole, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRole<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteRole, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role_mapping<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDeleteRoleMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_role_mapping<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role_mapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteRoleMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role_mapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteRoleMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDeleteRoleMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteRoleMapping<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteRoleMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteRoleMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_service_token<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDeleteServiceToken, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_service_token<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_service_token<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteServiceToken, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_service_token<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteServiceToken, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteServiceToken<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDeleteServiceToken, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteServiceToken<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteServiceToken<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteServiceToken, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteServiceToken<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteServiceToken, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_user<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDeleteUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_user<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_user<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_user<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteUser<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDeleteUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteUser<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteUser<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteUser<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDeleteUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disable_user<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDisableUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    disable_user<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disable_user<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDisableUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disable_user<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDisableUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disableUser<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityDisableUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    disableUser<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disableUser<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDisableUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disableUser<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityDisableUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enable_user<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityEnableUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    enable_user<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enable_user<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityEnableUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enable_user<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityEnableUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enableUser<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityEnableUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    enableUser<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enableUser<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityEnableUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enableUser<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityEnableUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_api_key<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetApiKey, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_api_key<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_api_key<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetApiKey, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_api_key<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetApiKey, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getApiKey<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetApiKey, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getApiKey<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getApiKey<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetApiKey, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getApiKey<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetApiKey, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_builtin_privileges<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetBuiltinPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_builtin_privileges<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_builtin_privileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetBuiltinPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_builtin_privileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetBuiltinPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetBuiltinPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getBuiltinPrivileges<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetBuiltinPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetBuiltinPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_privileges<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_privileges<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_privileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_privileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPrivileges<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getPrivileges<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPrivileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPrivileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetRole, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_role<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetRole, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetRole, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRole<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetRole, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRole<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRole<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetRole, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRole<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetRole, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role_mapping<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetRoleMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_role_mapping<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role_mapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetRoleMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role_mapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetRoleMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRoleMapping<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetRoleMapping, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRoleMapping<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRoleMapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetRoleMapping, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRoleMapping<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetRoleMapping, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_service_accounts<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetServiceAccounts, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_service_accounts<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_service_accounts<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetServiceAccounts, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_service_accounts<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetServiceAccounts, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getServiceAccounts<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetServiceAccounts, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getServiceAccounts<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getServiceAccounts<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetServiceAccounts, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getServiceAccounts<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetServiceAccounts, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_service_credentials<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetServiceCredentials, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_service_credentials<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_service_credentials<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetServiceCredentials, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_service_credentials<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetServiceCredentials, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getServiceCredentials<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetServiceCredentials, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getServiceCredentials<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getServiceCredentials<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetServiceCredentials, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getServiceCredentials<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetServiceCredentials, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetToken<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetToken<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetToken<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetToken<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetToken<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetToken<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_user<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUser<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetUser, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getUser<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUser<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetUser, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUser<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetUser, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user_privileges<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetUserPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_user_privileges<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user_privileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetUserPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user_privileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetUserPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGetUserPrivileges, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getUserPrivileges<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetUserPrivileges, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGetUserPrivileges, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    grant_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGrantApiKey<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    grant_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    grant_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGrantApiKey<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    grant_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGrantApiKey<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    grantApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityGrantApiKey<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    grantApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    grantApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGrantApiKey<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    grantApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityGrantApiKey<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    has_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityHasPrivileges<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    has_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    has_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityHasPrivileges<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    has_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityHasPrivileges<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hasPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityHasPrivileges<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    hasPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hasPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityHasPrivileges<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hasPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityHasPrivileges<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityInvalidateApiKey<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    invalidate_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityInvalidateApiKey<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityInvalidateApiKey<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityInvalidateApiKey<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    invalidateApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityInvalidateApiKey<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityInvalidateApiKey<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityInvalidateToken<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    invalidate_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityInvalidateToken<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityInvalidateToken<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityInvalidateToken<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    invalidateToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityInvalidateToken<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityInvalidateToken<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityPutPrivileges<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutPrivileges<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutPrivileges<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityPutPrivileges<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutPrivileges<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutPrivileges<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityPutRole<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_role<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutRole<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutRole<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRole<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityPutRole<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putRole<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRole<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutRole<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRole<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutRole<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityPutRoleMapping<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_role_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutRoleMapping<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutRoleMapping<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRoleMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityPutRoleMapping<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putRoleMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRoleMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutRoleMapping<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRoleMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutRoleMapping<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_user<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityPutUser<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_user<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_user<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutUser<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_user<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutUser<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putUser<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityPutUser<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putUser<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putUser<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutUser<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putUser<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityPutUser<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query_api_keys<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityQueryApiKeys<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    query_api_keys<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query_api_keys<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityQueryApiKeys<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query_api_keys<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityQueryApiKeys<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    queryApiKeys<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecurityQueryApiKeys<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    queryApiKeys<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    queryApiKeys<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityQueryApiKeys<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    queryApiKeys<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecurityQueryApiKeys<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_authenticate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecuritySamlAuthenticate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    saml_authenticate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_authenticate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlAuthenticate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_authenticate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlAuthenticate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlAuthenticate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecuritySamlAuthenticate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    samlAuthenticate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlAuthenticate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlAuthenticate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlAuthenticate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlAuthenticate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_complete_logout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecuritySamlCompleteLogout<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    saml_complete_logout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_complete_logout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlCompleteLogout<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_complete_logout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlCompleteLogout<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlCompleteLogout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecuritySamlCompleteLogout<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    samlCompleteLogout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlCompleteLogout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlCompleteLogout<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlCompleteLogout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlCompleteLogout<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_invalidate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecuritySamlInvalidate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    saml_invalidate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_invalidate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlInvalidate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_invalidate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlInvalidate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlInvalidate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecuritySamlInvalidate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    samlInvalidate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlInvalidate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlInvalidate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlInvalidate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlInvalidate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_logout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecuritySamlLogout<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    saml_logout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_logout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlLogout<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_logout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlLogout<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlLogout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecuritySamlLogout<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    samlLogout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlLogout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlLogout<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlLogout<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlLogout<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_prepare_authentication<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecuritySamlPrepareAuthentication<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    saml_prepare_authentication<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_prepare_authentication<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlPrepareAuthentication<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_prepare_authentication<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlPrepareAuthentication<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlPrepareAuthentication<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SecuritySamlPrepareAuthentication<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    samlPrepareAuthentication<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlPrepareAuthentication<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlPrepareAuthentication<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlPrepareAuthentication<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlPrepareAuthentication<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_service_provider_metadata<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecuritySamlServiceProviderMetadata, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    saml_service_provider_metadata<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_service_provider_metadata<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlServiceProviderMetadata, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    saml_service_provider_metadata<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlServiceProviderMetadata, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlServiceProviderMetadata<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SecuritySamlServiceProviderMetadata, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    samlServiceProviderMetadata<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlServiceProviderMetadata<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlServiceProviderMetadata, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    samlServiceProviderMetadata<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SecuritySamlServiceProviderMetadata, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  shutdown: {
    delete_node<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ShutdownDeleteNode, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_node<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_node<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ShutdownDeleteNode, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_node<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ShutdownDeleteNode, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteNode<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ShutdownDeleteNode, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteNode<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteNode<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ShutdownDeleteNode, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteNode<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ShutdownDeleteNode, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_node<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ShutdownGetNode, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_node<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_node<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ShutdownGetNode, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_node<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ShutdownGetNode, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getNode<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.ShutdownGetNode, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getNode<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getNode<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ShutdownGetNode, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getNode<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.ShutdownGetNode, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_node<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ShutdownPutNode<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_node<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_node<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ShutdownPutNode<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_node<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ShutdownPutNode<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putNode<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.ShutdownPutNode<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putNode<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putNode<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ShutdownPutNode<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putNode<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.ShutdownPutNode<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  slm: {
    delete_lifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmDeleteLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_lifecycle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmDeleteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmDeleteLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteLifecycle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmDeleteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_lifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmExecuteLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    execute_lifecycle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_lifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmExecuteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_lifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmExecuteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeLifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmExecuteLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executeLifecycle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeLifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmExecuteLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeLifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmExecuteLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_retention<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmExecuteRetention, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    execute_retention<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_retention<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmExecuteRetention, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_retention<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmExecuteRetention, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeRetention<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmExecuteRetention, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executeRetention<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeRetention<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmExecuteRetention, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeRetention<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmExecuteRetention, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmGetLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_lifecycle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmGetLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmGetLifecycle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getLifecycle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmGetLifecycle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmGetStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmGetStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmGetStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmGetStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getStats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmGetStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmGetStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmGetStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_status<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmGetStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmGetStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmGetStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getStatus<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmGetStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmGetStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SlmPutLifecycle<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SlmPutLifecycle<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SlmPutLifecycle<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SlmPutLifecycle<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SlmPutLifecycle<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SlmPutLifecycle<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmStart, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmStart, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmStart, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SlmStop, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmStop, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SlmStop, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  snapshot: {
    cleanup_repository<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotCleanupRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    cleanup_repository<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanup_repository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotCleanupRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanup_repository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotCleanupRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanupRepository<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotCleanupRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    cleanupRepository<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanupRepository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotCleanupRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanupRepository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotCleanupRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotClone<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotClone<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotClone<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotCreate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotCreate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotCreate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_repository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotCreateRepository<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create_repository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_repository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotCreateRepository<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_repository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotCreateRepository<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createRepository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotCreateRepository<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    createRepository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createRepository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotCreateRepository<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createRepository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotCreateRepository<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotDelete, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotDelete, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotDelete, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_repository<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotDeleteRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_repository<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_repository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotDeleteRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_repository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotDeleteRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRepository<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotDeleteRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteRepository<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRepository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotDeleteRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRepository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotDeleteRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_repository<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotGetRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_repository<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_repository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotGetRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_repository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotGetRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRepository<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotGetRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRepository<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRepository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotGetRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRepository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotGetRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repository_analyze<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotRepositoryAnalyze, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    repository_analyze<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repository_analyze<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotRepositoryAnalyze, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repository_analyze<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotRepositoryAnalyze, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositoryAnalyze<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotRepositoryAnalyze, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    repositoryAnalyze<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositoryAnalyze<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotRepositoryAnalyze, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositoryAnalyze<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotRepositoryAnalyze, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    restore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotRestore<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    restore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    restore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotRestore<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    restore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotRestore<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    status<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verify_repository<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotVerifyRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    verify_repository<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verify_repository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotVerifyRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verify_repository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotVerifyRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verifyRepository<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SnapshotVerifyRepository, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    verifyRepository<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verifyRepository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotVerifyRepository, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verifyRepository<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SnapshotVerifyRepository, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  sql: {
    clear_cursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SqlClearCursor<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SqlClearCursor<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SqlClearCursor<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SqlClearCursor<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SqlClearCursor<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SqlClearCursor<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_async<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SqlDeleteAsync, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_async<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_async<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SqlDeleteAsync, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_async<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SqlDeleteAsync, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAsync<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SqlDeleteAsync, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteAsync<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAsync<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SqlDeleteAsync, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAsync<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SqlDeleteAsync, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_async<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SqlGetAsync, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_async<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_async<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SqlGetAsync, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_async<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SqlGetAsync, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAsync<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SqlGetAsync, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAsync<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAsync<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SqlGetAsync, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAsync<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SqlGetAsync, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_async_status<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SqlGetAsyncStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_async_status<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_async_status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SqlGetAsyncStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_async_status<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SqlGetAsyncStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAsyncStatus<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SqlGetAsyncStatus, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAsyncStatus<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAsyncStatus<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SqlGetAsyncStatus, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAsyncStatus<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SqlGetAsyncStatus, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SqlQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SqlQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SqlQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    translate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.SqlTranslate<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    translate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    translate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SqlTranslate<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    translate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.SqlTranslate<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ssl: {
    certificates<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.SslCertificates, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    certificates<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    certificates<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SslCertificates, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    certificates<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.SslCertificates, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  tasks: {
    cancel<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TasksCancel, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    cancel<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cancel<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TasksCancel, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cancel<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TasksCancel, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TasksGet, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TasksGet, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TasksGet, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TasksList, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    list<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TasksList, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TasksList, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  terms_enum<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.TermsEnum<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  terms_enum<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  terms_enum<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TermsEnum<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  terms_enum<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TermsEnum<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  termsEnum<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.TermsEnum<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  termsEnum<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  termsEnum<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TermsEnum<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  termsEnum<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TermsEnum<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  termvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Termvectors<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  termvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  termvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Termvectors<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  termvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Termvectors<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  text_structure: {
    find_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.TextStructureFindStructure<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    find_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.TextStructureFindStructure<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.TextStructureFindStructure<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.TextStructureFindStructure<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    findStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.TextStructureFindStructure<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.TextStructureFindStructure<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  textStructure: {
    find_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.TextStructureFindStructure<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    find_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.TextStructureFindStructure<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.TextStructureFindStructure<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params?: RequestParams.TextStructureFindStructure<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    findStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.TextStructureFindStructure<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = Context>(params: RequestParams.TextStructureFindStructure<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  transform: {
    delete_transform<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformDeleteTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_transform<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_transform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformDeleteTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_transform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformDeleteTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformDeleteTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteTransform<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformDeleteTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformDeleteTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformGetTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_transform<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformGetTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformGetTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformGetTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTransform<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformGetTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformGetTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformGetTransformStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_transform_stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformGetTransformStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformGetTransformStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformGetTransformStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTransformStats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformGetTransformStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformGetTransformStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.TransformPreviewTransform<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TransformPreviewTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TransformPreviewTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.TransformPreviewTransform<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TransformPreviewTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TransformPreviewTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.TransformPutTransform<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TransformPutTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TransformPutTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.TransformPutTransform<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TransformPutTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TransformPutTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformStartTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start_transform<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformStartTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformStartTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformStartTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startTransform<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformStartTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformStartTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformStopTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop_transform<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformStopTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformStopTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformStopTransform, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopTransform<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformStopTransform, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformStopTransform, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.TransformUpdateTransform<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TransformUpdateTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TransformUpdateTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.TransformUpdateTransform<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TransformUpdateTransform<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.TransformUpdateTransform<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade_transforms<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformUpgradeTransforms, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    upgrade_transforms<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade_transforms<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformUpgradeTransforms, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade_transforms<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformUpgradeTransforms, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgradeTransforms<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.TransformUpgradeTransforms, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    upgradeTransforms<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgradeTransforms<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformUpgradeTransforms, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgradeTransforms<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.TransformUpgradeTransforms, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  update<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.Update<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  update<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Update<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.Update<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.UpdateByQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  update_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.UpdateByQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.UpdateByQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.UpdateByQuery<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  updateByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.UpdateByQuery<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.UpdateByQuery<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query_rethrottle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.UpdateByQueryRethrottle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  update_by_query_rethrottle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query_rethrottle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.UpdateByQueryRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query_rethrottle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.UpdateByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQueryRethrottle<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.UpdateByQueryRethrottle, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  updateByQueryRethrottle<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQueryRethrottle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.UpdateByQueryRethrottle, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQueryRethrottle<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.UpdateByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  watcher: {
    ack_watch<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherAckWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ack_watch<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ack_watch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherAckWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ack_watch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherAckWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ackWatch<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherAckWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ackWatch<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ackWatch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherAckWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ackWatch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherAckWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activate_watch<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherActivateWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    activate_watch<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activate_watch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherActivateWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activate_watch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherActivateWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activateWatch<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherActivateWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    activateWatch<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activateWatch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherActivateWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activateWatch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherActivateWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivate_watch<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherDeactivateWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deactivate_watch<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivate_watch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherDeactivateWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivate_watch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherDeactivateWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivateWatch<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherDeactivateWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deactivateWatch<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivateWatch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherDeactivateWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivateWatch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherDeactivateWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_watch<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherDeleteWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_watch<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_watch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherDeleteWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_watch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherDeleteWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteWatch<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherDeleteWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteWatch<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteWatch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherDeleteWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteWatch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherDeleteWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherExecuteWatch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    execute_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.WatcherExecuteWatch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.WatcherExecuteWatch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherExecuteWatch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executeWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.WatcherExecuteWatch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.WatcherExecuteWatch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_watch<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherGetWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_watch<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_watch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherGetWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_watch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherGetWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getWatch<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherGetWatch, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getWatch<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getWatch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherGetWatch, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getWatch<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherGetWatch, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherPutWatch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.WatcherPutWatch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.WatcherPutWatch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherPutWatch<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.WatcherPutWatch<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.WatcherPutWatch<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query_watches<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherQueryWatches<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    query_watches<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query_watches<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.WatcherQueryWatches<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query_watches<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.WatcherQueryWatches<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    queryWatches<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherQueryWatches<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    queryWatches<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    queryWatches<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.WatcherQueryWatches<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    queryWatches<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = Context>(params: RequestParams.WatcherQueryWatches<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherStart, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherStart, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherStart, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.WatcherStop, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherStop, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.WatcherStop, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  xpack: {
    info<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.XpackInfo, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    info<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.XpackInfo, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.XpackInfo, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = Context>(params?: RequestParams.XpackUsage, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    usage<TResponse = Record<string, any>, TContext = Context>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.XpackUsage, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = Context>(params: RequestParams.XpackUsage, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  /* /GENERATED */
}

declare const events: {
  SERIALIZATION: string;
  REQUEST: string;
  DESERIALIZATION: string;
  RESPONSE: string;
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
  estypes,
  RequestParams,
  ClientOptions,
  NodeOptions,
  ClientExtendsCallbackOptions
};
