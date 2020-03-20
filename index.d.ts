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
  BodyType,
  NDBodyType
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
  child(opts?: ClientOptions): Client;
  close(callback?: Function): Promise<void> | void;
  /* GENERATED */
  async_search: {
    delete<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchDelete): Promise<ApiResponse<Response, Context>>
    delete<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchDelete, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchDelete, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchDelete, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchGet): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchGet, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchGet, callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchGet, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    submit<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    submit<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchSubmit<RequestBody>): Promise<ApiResponse<Response, Context>>
    submit<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchSubmit<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    submit<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    submit<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchSubmit<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    submit<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchSubmit<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  asyncSearch: {
    delete<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchDelete): Promise<ApiResponse<Response, Context>>
    delete<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchDelete, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchDelete, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchDelete, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchGet): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchGet, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchGet, callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchGet, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    submit<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    submit<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchSubmit<RequestBody>): Promise<ApiResponse<Response, Context>>
    submit<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchSubmit<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    submit<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    submit<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchSubmit<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    submit<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.AsyncSearchSubmit<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  autoscaling: {
    get_autoscaling_decision<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_autoscaling_decision<Response = BodyType, Context = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision): Promise<ApiResponse<Response, Context>>
    get_autoscaling_decision<Response = BodyType, Context = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_autoscaling_decision<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_autoscaling_decision<Response = BodyType, Context = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_autoscaling_decision<Response = BodyType, Context = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getAutoscalingDecision<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getAutoscalingDecision<Response = BodyType, Context = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision): Promise<ApiResponse<Response, Context>>
    getAutoscalingDecision<Response = BodyType, Context = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getAutoscalingDecision<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getAutoscalingDecision<Response = BodyType, Context = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision, callback: callbackFn<Response, Context>): TransportRequestCallback
    getAutoscalingDecision<Response = BodyType, Context = unknown>(params: RequestParams.AutoscalingGetAutoscalingDecision, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  bulk<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  bulk<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.Bulk<RequestBody>): Promise<ApiResponse<Response, Context>>
  bulk<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.Bulk<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  bulk<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  bulk<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.Bulk<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  bulk<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.Bulk<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  cat: {
    aliases<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    aliases<Response = BodyType, Context = unknown>(params: RequestParams.CatAliases): Promise<ApiResponse<Response, Context>>
    aliases<Response = BodyType, Context = unknown>(params: RequestParams.CatAliases, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    aliases<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    aliases<Response = BodyType, Context = unknown>(params: RequestParams.CatAliases, callback: callbackFn<Response, Context>): TransportRequestCallback
    aliases<Response = BodyType, Context = unknown>(params: RequestParams.CatAliases, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    allocation<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    allocation<Response = BodyType, Context = unknown>(params: RequestParams.CatAllocation): Promise<ApiResponse<Response, Context>>
    allocation<Response = BodyType, Context = unknown>(params: RequestParams.CatAllocation, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    allocation<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    allocation<Response = BodyType, Context = unknown>(params: RequestParams.CatAllocation, callback: callbackFn<Response, Context>): TransportRequestCallback
    allocation<Response = BodyType, Context = unknown>(params: RequestParams.CatAllocation, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    count<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    count<Response = BodyType, Context = unknown>(params: RequestParams.CatCount): Promise<ApiResponse<Response, Context>>
    count<Response = BodyType, Context = unknown>(params: RequestParams.CatCount, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    count<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    count<Response = BodyType, Context = unknown>(params: RequestParams.CatCount, callback: callbackFn<Response, Context>): TransportRequestCallback
    count<Response = BodyType, Context = unknown>(params: RequestParams.CatCount, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    fielddata<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    fielddata<Response = BodyType, Context = unknown>(params: RequestParams.CatFielddata): Promise<ApiResponse<Response, Context>>
    fielddata<Response = BodyType, Context = unknown>(params: RequestParams.CatFielddata, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    fielddata<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    fielddata<Response = BodyType, Context = unknown>(params: RequestParams.CatFielddata, callback: callbackFn<Response, Context>): TransportRequestCallback
    fielddata<Response = BodyType, Context = unknown>(params: RequestParams.CatFielddata, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    health<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    health<Response = BodyType, Context = unknown>(params: RequestParams.CatHealth): Promise<ApiResponse<Response, Context>>
    health<Response = BodyType, Context = unknown>(params: RequestParams.CatHealth, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    health<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    health<Response = BodyType, Context = unknown>(params: RequestParams.CatHealth, callback: callbackFn<Response, Context>): TransportRequestCallback
    health<Response = BodyType, Context = unknown>(params: RequestParams.CatHealth, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    help<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    help<Response = BodyType, Context = unknown>(params: RequestParams.CatHelp): Promise<ApiResponse<Response, Context>>
    help<Response = BodyType, Context = unknown>(params: RequestParams.CatHelp, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    help<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    help<Response = BodyType, Context = unknown>(params: RequestParams.CatHelp, callback: callbackFn<Response, Context>): TransportRequestCallback
    help<Response = BodyType, Context = unknown>(params: RequestParams.CatHelp, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    indices<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    indices<Response = BodyType, Context = unknown>(params: RequestParams.CatIndices): Promise<ApiResponse<Response, Context>>
    indices<Response = BodyType, Context = unknown>(params: RequestParams.CatIndices, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    indices<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    indices<Response = BodyType, Context = unknown>(params: RequestParams.CatIndices, callback: callbackFn<Response, Context>): TransportRequestCallback
    indices<Response = BodyType, Context = unknown>(params: RequestParams.CatIndices, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    master<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    master<Response = BodyType, Context = unknown>(params: RequestParams.CatMaster): Promise<ApiResponse<Response, Context>>
    master<Response = BodyType, Context = unknown>(params: RequestParams.CatMaster, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    master<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    master<Response = BodyType, Context = unknown>(params: RequestParams.CatMaster, callback: callbackFn<Response, Context>): TransportRequestCallback
    master<Response = BodyType, Context = unknown>(params: RequestParams.CatMaster, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    ml_data_frame_analytics<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    ml_data_frame_analytics<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDataFrameAnalytics): Promise<ApiResponse<Response, Context>>
    ml_data_frame_analytics<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDataFrameAnalytics, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    ml_data_frame_analytics<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    ml_data_frame_analytics<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDataFrameAnalytics, callback: callbackFn<Response, Context>): TransportRequestCallback
    ml_data_frame_analytics<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    mlDataFrameAnalytics<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    mlDataFrameAnalytics<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDataFrameAnalytics): Promise<ApiResponse<Response, Context>>
    mlDataFrameAnalytics<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDataFrameAnalytics, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    mlDataFrameAnalytics<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    mlDataFrameAnalytics<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDataFrameAnalytics, callback: callbackFn<Response, Context>): TransportRequestCallback
    mlDataFrameAnalytics<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    ml_datafeeds<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    ml_datafeeds<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDatafeeds): Promise<ApiResponse<Response, Context>>
    ml_datafeeds<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDatafeeds, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    ml_datafeeds<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    ml_datafeeds<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDatafeeds, callback: callbackFn<Response, Context>): TransportRequestCallback
    ml_datafeeds<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDatafeeds, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    mlDatafeeds<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    mlDatafeeds<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDatafeeds): Promise<ApiResponse<Response, Context>>
    mlDatafeeds<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDatafeeds, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    mlDatafeeds<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    mlDatafeeds<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDatafeeds, callback: callbackFn<Response, Context>): TransportRequestCallback
    mlDatafeeds<Response = BodyType, Context = unknown>(params: RequestParams.CatMlDatafeeds, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    ml_jobs<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    ml_jobs<Response = BodyType, Context = unknown>(params: RequestParams.CatMlJobs): Promise<ApiResponse<Response, Context>>
    ml_jobs<Response = BodyType, Context = unknown>(params: RequestParams.CatMlJobs, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    ml_jobs<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    ml_jobs<Response = BodyType, Context = unknown>(params: RequestParams.CatMlJobs, callback: callbackFn<Response, Context>): TransportRequestCallback
    ml_jobs<Response = BodyType, Context = unknown>(params: RequestParams.CatMlJobs, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    mlJobs<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    mlJobs<Response = BodyType, Context = unknown>(params: RequestParams.CatMlJobs): Promise<ApiResponse<Response, Context>>
    mlJobs<Response = BodyType, Context = unknown>(params: RequestParams.CatMlJobs, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    mlJobs<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    mlJobs<Response = BodyType, Context = unknown>(params: RequestParams.CatMlJobs, callback: callbackFn<Response, Context>): TransportRequestCallback
    mlJobs<Response = BodyType, Context = unknown>(params: RequestParams.CatMlJobs, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    ml_trained_models<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    ml_trained_models<Response = BodyType, Context = unknown>(params: RequestParams.CatMlTrainedModels): Promise<ApiResponse<Response, Context>>
    ml_trained_models<Response = BodyType, Context = unknown>(params: RequestParams.CatMlTrainedModels, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    ml_trained_models<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    ml_trained_models<Response = BodyType, Context = unknown>(params: RequestParams.CatMlTrainedModels, callback: callbackFn<Response, Context>): TransportRequestCallback
    ml_trained_models<Response = BodyType, Context = unknown>(params: RequestParams.CatMlTrainedModels, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    mlTrainedModels<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    mlTrainedModels<Response = BodyType, Context = unknown>(params: RequestParams.CatMlTrainedModels): Promise<ApiResponse<Response, Context>>
    mlTrainedModels<Response = BodyType, Context = unknown>(params: RequestParams.CatMlTrainedModels, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    mlTrainedModels<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    mlTrainedModels<Response = BodyType, Context = unknown>(params: RequestParams.CatMlTrainedModels, callback: callbackFn<Response, Context>): TransportRequestCallback
    mlTrainedModels<Response = BodyType, Context = unknown>(params: RequestParams.CatMlTrainedModels, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    nodeattrs<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    nodeattrs<Response = BodyType, Context = unknown>(params: RequestParams.CatNodeattrs): Promise<ApiResponse<Response, Context>>
    nodeattrs<Response = BodyType, Context = unknown>(params: RequestParams.CatNodeattrs, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    nodeattrs<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    nodeattrs<Response = BodyType, Context = unknown>(params: RequestParams.CatNodeattrs, callback: callbackFn<Response, Context>): TransportRequestCallback
    nodeattrs<Response = BodyType, Context = unknown>(params: RequestParams.CatNodeattrs, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    nodes<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    nodes<Response = BodyType, Context = unknown>(params: RequestParams.CatNodes): Promise<ApiResponse<Response, Context>>
    nodes<Response = BodyType, Context = unknown>(params: RequestParams.CatNodes, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    nodes<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    nodes<Response = BodyType, Context = unknown>(params: RequestParams.CatNodes, callback: callbackFn<Response, Context>): TransportRequestCallback
    nodes<Response = BodyType, Context = unknown>(params: RequestParams.CatNodes, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    pending_tasks<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    pending_tasks<Response = BodyType, Context = unknown>(params: RequestParams.CatPendingTasks): Promise<ApiResponse<Response, Context>>
    pending_tasks<Response = BodyType, Context = unknown>(params: RequestParams.CatPendingTasks, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    pending_tasks<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    pending_tasks<Response = BodyType, Context = unknown>(params: RequestParams.CatPendingTasks, callback: callbackFn<Response, Context>): TransportRequestCallback
    pending_tasks<Response = BodyType, Context = unknown>(params: RequestParams.CatPendingTasks, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    pendingTasks<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    pendingTasks<Response = BodyType, Context = unknown>(params: RequestParams.CatPendingTasks): Promise<ApiResponse<Response, Context>>
    pendingTasks<Response = BodyType, Context = unknown>(params: RequestParams.CatPendingTasks, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    pendingTasks<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    pendingTasks<Response = BodyType, Context = unknown>(params: RequestParams.CatPendingTasks, callback: callbackFn<Response, Context>): TransportRequestCallback
    pendingTasks<Response = BodyType, Context = unknown>(params: RequestParams.CatPendingTasks, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    plugins<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    plugins<Response = BodyType, Context = unknown>(params: RequestParams.CatPlugins): Promise<ApiResponse<Response, Context>>
    plugins<Response = BodyType, Context = unknown>(params: RequestParams.CatPlugins, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    plugins<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    plugins<Response = BodyType, Context = unknown>(params: RequestParams.CatPlugins, callback: callbackFn<Response, Context>): TransportRequestCallback
    plugins<Response = BodyType, Context = unknown>(params: RequestParams.CatPlugins, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    recovery<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    recovery<Response = BodyType, Context = unknown>(params: RequestParams.CatRecovery): Promise<ApiResponse<Response, Context>>
    recovery<Response = BodyType, Context = unknown>(params: RequestParams.CatRecovery, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    recovery<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    recovery<Response = BodyType, Context = unknown>(params: RequestParams.CatRecovery, callback: callbackFn<Response, Context>): TransportRequestCallback
    recovery<Response = BodyType, Context = unknown>(params: RequestParams.CatRecovery, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    repositories<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    repositories<Response = BodyType, Context = unknown>(params: RequestParams.CatRepositories): Promise<ApiResponse<Response, Context>>
    repositories<Response = BodyType, Context = unknown>(params: RequestParams.CatRepositories, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    repositories<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    repositories<Response = BodyType, Context = unknown>(params: RequestParams.CatRepositories, callback: callbackFn<Response, Context>): TransportRequestCallback
    repositories<Response = BodyType, Context = unknown>(params: RequestParams.CatRepositories, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    segments<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    segments<Response = BodyType, Context = unknown>(params: RequestParams.CatSegments): Promise<ApiResponse<Response, Context>>
    segments<Response = BodyType, Context = unknown>(params: RequestParams.CatSegments, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    segments<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    segments<Response = BodyType, Context = unknown>(params: RequestParams.CatSegments, callback: callbackFn<Response, Context>): TransportRequestCallback
    segments<Response = BodyType, Context = unknown>(params: RequestParams.CatSegments, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    shards<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    shards<Response = BodyType, Context = unknown>(params: RequestParams.CatShards): Promise<ApiResponse<Response, Context>>
    shards<Response = BodyType, Context = unknown>(params: RequestParams.CatShards, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    shards<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    shards<Response = BodyType, Context = unknown>(params: RequestParams.CatShards, callback: callbackFn<Response, Context>): TransportRequestCallback
    shards<Response = BodyType, Context = unknown>(params: RequestParams.CatShards, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    snapshots<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    snapshots<Response = BodyType, Context = unknown>(params: RequestParams.CatSnapshots): Promise<ApiResponse<Response, Context>>
    snapshots<Response = BodyType, Context = unknown>(params: RequestParams.CatSnapshots, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    snapshots<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    snapshots<Response = BodyType, Context = unknown>(params: RequestParams.CatSnapshots, callback: callbackFn<Response, Context>): TransportRequestCallback
    snapshots<Response = BodyType, Context = unknown>(params: RequestParams.CatSnapshots, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    tasks<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    tasks<Response = BodyType, Context = unknown>(params: RequestParams.CatTasks): Promise<ApiResponse<Response, Context>>
    tasks<Response = BodyType, Context = unknown>(params: RequestParams.CatTasks, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    tasks<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    tasks<Response = BodyType, Context = unknown>(params: RequestParams.CatTasks, callback: callbackFn<Response, Context>): TransportRequestCallback
    tasks<Response = BodyType, Context = unknown>(params: RequestParams.CatTasks, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    templates<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    templates<Response = BodyType, Context = unknown>(params: RequestParams.CatTemplates): Promise<ApiResponse<Response, Context>>
    templates<Response = BodyType, Context = unknown>(params: RequestParams.CatTemplates, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    templates<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    templates<Response = BodyType, Context = unknown>(params: RequestParams.CatTemplates, callback: callbackFn<Response, Context>): TransportRequestCallback
    templates<Response = BodyType, Context = unknown>(params: RequestParams.CatTemplates, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    thread_pool<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    thread_pool<Response = BodyType, Context = unknown>(params: RequestParams.CatThreadPool): Promise<ApiResponse<Response, Context>>
    thread_pool<Response = BodyType, Context = unknown>(params: RequestParams.CatThreadPool, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    thread_pool<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    thread_pool<Response = BodyType, Context = unknown>(params: RequestParams.CatThreadPool, callback: callbackFn<Response, Context>): TransportRequestCallback
    thread_pool<Response = BodyType, Context = unknown>(params: RequestParams.CatThreadPool, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    threadPool<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    threadPool<Response = BodyType, Context = unknown>(params: RequestParams.CatThreadPool): Promise<ApiResponse<Response, Context>>
    threadPool<Response = BodyType, Context = unknown>(params: RequestParams.CatThreadPool, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    threadPool<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    threadPool<Response = BodyType, Context = unknown>(params: RequestParams.CatThreadPool, callback: callbackFn<Response, Context>): TransportRequestCallback
    threadPool<Response = BodyType, Context = unknown>(params: RequestParams.CatThreadPool, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  ccr: {
    delete_auto_follow_pattern<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern): Promise<ApiResponse<Response, Context>>
    delete_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_auto_follow_pattern<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteAutoFollowPattern<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern): Promise<ApiResponse<Response, Context>>
    deleteAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteAutoFollowPattern<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrDeleteAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    follow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    follow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrFollow<RequestBody>): Promise<ApiResponse<Response, Context>>
    follow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrFollow<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    follow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    follow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrFollow<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    follow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrFollow<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    follow_info<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    follow_info<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowInfo): Promise<ApiResponse<Response, Context>>
    follow_info<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowInfo, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    follow_info<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    follow_info<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowInfo, callback: callbackFn<Response, Context>): TransportRequestCallback
    follow_info<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowInfo, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    followInfo<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    followInfo<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowInfo): Promise<ApiResponse<Response, Context>>
    followInfo<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowInfo, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    followInfo<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    followInfo<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowInfo, callback: callbackFn<Response, Context>): TransportRequestCallback
    followInfo<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowInfo, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    follow_stats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    follow_stats<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowStats): Promise<ApiResponse<Response, Context>>
    follow_stats<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    follow_stats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    follow_stats<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    follow_stats<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    followStats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    followStats<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowStats): Promise<ApiResponse<Response, Context>>
    followStats<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    followStats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    followStats<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    followStats<Response = BodyType, Context = unknown>(params: RequestParams.CcrFollowStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    forget_follower<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    forget_follower<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrForgetFollower<RequestBody>): Promise<ApiResponse<Response, Context>>
    forget_follower<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrForgetFollower<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    forget_follower<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    forget_follower<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrForgetFollower<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    forget_follower<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrForgetFollower<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    forgetFollower<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    forgetFollower<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrForgetFollower<RequestBody>): Promise<ApiResponse<Response, Context>>
    forgetFollower<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrForgetFollower<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    forgetFollower<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    forgetFollower<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrForgetFollower<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    forgetFollower<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrForgetFollower<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_auto_follow_pattern<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrGetAutoFollowPattern): Promise<ApiResponse<Response, Context>>
    get_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrGetAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_auto_follow_pattern<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrGetAutoFollowPattern, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrGetAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getAutoFollowPattern<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrGetAutoFollowPattern): Promise<ApiResponse<Response, Context>>
    getAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrGetAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getAutoFollowPattern<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrGetAutoFollowPattern, callback: callbackFn<Response, Context>): TransportRequestCallback
    getAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrGetAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    pause_auto_follow_pattern<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    pause_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseAutoFollowPattern): Promise<ApiResponse<Response, Context>>
    pause_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    pause_auto_follow_pattern<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    pause_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseAutoFollowPattern, callback: callbackFn<Response, Context>): TransportRequestCallback
    pause_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    pauseAutoFollowPattern<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    pauseAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseAutoFollowPattern): Promise<ApiResponse<Response, Context>>
    pauseAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    pauseAutoFollowPattern<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    pauseAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseAutoFollowPattern, callback: callbackFn<Response, Context>): TransportRequestCallback
    pauseAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    pause_follow<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    pause_follow<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseFollow): Promise<ApiResponse<Response, Context>>
    pause_follow<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseFollow, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    pause_follow<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    pause_follow<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseFollow, callback: callbackFn<Response, Context>): TransportRequestCallback
    pause_follow<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseFollow, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    pauseFollow<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    pauseFollow<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseFollow): Promise<ApiResponse<Response, Context>>
    pauseFollow<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseFollow, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    pauseFollow<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    pauseFollow<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseFollow, callback: callbackFn<Response, Context>): TransportRequestCallback
    pauseFollow<Response = BodyType, Context = unknown>(params: RequestParams.CcrPauseFollow, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_auto_follow_pattern<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_auto_follow_pattern<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrPutAutoFollowPattern<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_auto_follow_pattern<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrPutAutoFollowPattern<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_auto_follow_pattern<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_auto_follow_pattern<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrPutAutoFollowPattern<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_auto_follow_pattern<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrPutAutoFollowPattern<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putAutoFollowPattern<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putAutoFollowPattern<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrPutAutoFollowPattern<RequestBody>): Promise<ApiResponse<Response, Context>>
    putAutoFollowPattern<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrPutAutoFollowPattern<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putAutoFollowPattern<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putAutoFollowPattern<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrPutAutoFollowPattern<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putAutoFollowPattern<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrPutAutoFollowPattern<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    resume_auto_follow_pattern<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    resume_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeAutoFollowPattern): Promise<ApiResponse<Response, Context>>
    resume_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    resume_auto_follow_pattern<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    resume_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeAutoFollowPattern, callback: callbackFn<Response, Context>): TransportRequestCallback
    resume_auto_follow_pattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    resumeAutoFollowPattern<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    resumeAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeAutoFollowPattern): Promise<ApiResponse<Response, Context>>
    resumeAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    resumeAutoFollowPattern<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    resumeAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeAutoFollowPattern, callback: callbackFn<Response, Context>): TransportRequestCallback
    resumeAutoFollowPattern<Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    resume_follow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    resume_follow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeFollow<RequestBody>): Promise<ApiResponse<Response, Context>>
    resume_follow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeFollow<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    resume_follow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    resume_follow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeFollow<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    resume_follow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeFollow<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    resumeFollow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    resumeFollow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeFollow<RequestBody>): Promise<ApiResponse<Response, Context>>
    resumeFollow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeFollow<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    resumeFollow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    resumeFollow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeFollow<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    resumeFollow<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.CcrResumeFollow<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(params: RequestParams.CcrStats): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(params: RequestParams.CcrStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(params: RequestParams.CcrStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(params: RequestParams.CcrStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    unfollow<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    unfollow<Response = BodyType, Context = unknown>(params: RequestParams.CcrUnfollow): Promise<ApiResponse<Response, Context>>
    unfollow<Response = BodyType, Context = unknown>(params: RequestParams.CcrUnfollow, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    unfollow<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    unfollow<Response = BodyType, Context = unknown>(params: RequestParams.CcrUnfollow, callback: callbackFn<Response, Context>): TransportRequestCallback
    unfollow<Response = BodyType, Context = unknown>(params: RequestParams.CcrUnfollow, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  clear_scroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  clear_scroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClearScroll<RequestBody>): Promise<ApiResponse<Response, Context>>
  clear_scroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClearScroll<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  clear_scroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  clear_scroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClearScroll<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  clear_scroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClearScroll<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  clearScroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  clearScroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClearScroll<RequestBody>): Promise<ApiResponse<Response, Context>>
  clearScroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClearScroll<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  clearScroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  clearScroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClearScroll<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  clearScroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClearScroll<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  cluster: {
    allocation_explain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    allocation_explain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterAllocationExplain<RequestBody>): Promise<ApiResponse<Response, Context>>
    allocation_explain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterAllocationExplain<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    allocation_explain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    allocation_explain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterAllocationExplain<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    allocation_explain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterAllocationExplain<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    allocationExplain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    allocationExplain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterAllocationExplain<RequestBody>): Promise<ApiResponse<Response, Context>>
    allocationExplain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterAllocationExplain<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    allocationExplain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    allocationExplain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterAllocationExplain<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    allocationExplain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterAllocationExplain<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_component_template<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_component_template<Response = BodyType, Context = unknown>(params: RequestParams.ClusterDeleteComponentTemplate): Promise<ApiResponse<Response, Context>>
    delete_component_template<Response = BodyType, Context = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_component_template<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_component_template<Response = BodyType, Context = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_component_template<Response = BodyType, Context = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteComponentTemplate<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteComponentTemplate<Response = BodyType, Context = unknown>(params: RequestParams.ClusterDeleteComponentTemplate): Promise<ApiResponse<Response, Context>>
    deleteComponentTemplate<Response = BodyType, Context = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteComponentTemplate<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteComponentTemplate<Response = BodyType, Context = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteComponentTemplate<Response = BodyType, Context = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_component_template<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_component_template<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetComponentTemplate): Promise<ApiResponse<Response, Context>>
    get_component_template<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetComponentTemplate, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_component_template<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_component_template<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetComponentTemplate, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_component_template<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetComponentTemplate, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getComponentTemplate<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getComponentTemplate<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetComponentTemplate): Promise<ApiResponse<Response, Context>>
    getComponentTemplate<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetComponentTemplate, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getComponentTemplate<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getComponentTemplate<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetComponentTemplate, callback: callbackFn<Response, Context>): TransportRequestCallback
    getComponentTemplate<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetComponentTemplate, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_settings<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_settings<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetSettings): Promise<ApiResponse<Response, Context>>
    get_settings<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetSettings, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_settings<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_settings<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetSettings, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_settings<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetSettings, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getSettings<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getSettings<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetSettings): Promise<ApiResponse<Response, Context>>
    getSettings<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetSettings, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getSettings<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getSettings<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetSettings, callback: callbackFn<Response, Context>): TransportRequestCallback
    getSettings<Response = BodyType, Context = unknown>(params: RequestParams.ClusterGetSettings, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    health<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    health<Response = BodyType, Context = unknown>(params: RequestParams.ClusterHealth): Promise<ApiResponse<Response, Context>>
    health<Response = BodyType, Context = unknown>(params: RequestParams.ClusterHealth, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    health<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    health<Response = BodyType, Context = unknown>(params: RequestParams.ClusterHealth, callback: callbackFn<Response, Context>): TransportRequestCallback
    health<Response = BodyType, Context = unknown>(params: RequestParams.ClusterHealth, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    pending_tasks<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    pending_tasks<Response = BodyType, Context = unknown>(params: RequestParams.ClusterPendingTasks): Promise<ApiResponse<Response, Context>>
    pending_tasks<Response = BodyType, Context = unknown>(params: RequestParams.ClusterPendingTasks, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    pending_tasks<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    pending_tasks<Response = BodyType, Context = unknown>(params: RequestParams.ClusterPendingTasks, callback: callbackFn<Response, Context>): TransportRequestCallback
    pending_tasks<Response = BodyType, Context = unknown>(params: RequestParams.ClusterPendingTasks, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    pendingTasks<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    pendingTasks<Response = BodyType, Context = unknown>(params: RequestParams.ClusterPendingTasks): Promise<ApiResponse<Response, Context>>
    pendingTasks<Response = BodyType, Context = unknown>(params: RequestParams.ClusterPendingTasks, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    pendingTasks<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    pendingTasks<Response = BodyType, Context = unknown>(params: RequestParams.ClusterPendingTasks, callback: callbackFn<Response, Context>): TransportRequestCallback
    pendingTasks<Response = BodyType, Context = unknown>(params: RequestParams.ClusterPendingTasks, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_component_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_component_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutComponentTemplate<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_component_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutComponentTemplate<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_component_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_component_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutComponentTemplate<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_component_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutComponentTemplate<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putComponentTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putComponentTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutComponentTemplate<RequestBody>): Promise<ApiResponse<Response, Context>>
    putComponentTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutComponentTemplate<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putComponentTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putComponentTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutComponentTemplate<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putComponentTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutComponentTemplate<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_settings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_settings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutSettings<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_settings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutSettings<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_settings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_settings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutSettings<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_settings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutSettings<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putSettings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putSettings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutSettings<RequestBody>): Promise<ApiResponse<Response, Context>>
    putSettings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutSettings<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putSettings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putSettings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutSettings<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putSettings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterPutSettings<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    remote_info<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    remote_info<Response = BodyType, Context = unknown>(params: RequestParams.ClusterRemoteInfo): Promise<ApiResponse<Response, Context>>
    remote_info<Response = BodyType, Context = unknown>(params: RequestParams.ClusterRemoteInfo, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    remote_info<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    remote_info<Response = BodyType, Context = unknown>(params: RequestParams.ClusterRemoteInfo, callback: callbackFn<Response, Context>): TransportRequestCallback
    remote_info<Response = BodyType, Context = unknown>(params: RequestParams.ClusterRemoteInfo, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    remoteInfo<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    remoteInfo<Response = BodyType, Context = unknown>(params: RequestParams.ClusterRemoteInfo): Promise<ApiResponse<Response, Context>>
    remoteInfo<Response = BodyType, Context = unknown>(params: RequestParams.ClusterRemoteInfo, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    remoteInfo<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    remoteInfo<Response = BodyType, Context = unknown>(params: RequestParams.ClusterRemoteInfo, callback: callbackFn<Response, Context>): TransportRequestCallback
    remoteInfo<Response = BodyType, Context = unknown>(params: RequestParams.ClusterRemoteInfo, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    reroute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    reroute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterReroute<RequestBody>): Promise<ApiResponse<Response, Context>>
    reroute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterReroute<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    reroute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    reroute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterReroute<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    reroute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ClusterReroute<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    state<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    state<Response = BodyType, Context = unknown>(params: RequestParams.ClusterState): Promise<ApiResponse<Response, Context>>
    state<Response = BodyType, Context = unknown>(params: RequestParams.ClusterState, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    state<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    state<Response = BodyType, Context = unknown>(params: RequestParams.ClusterState, callback: callbackFn<Response, Context>): TransportRequestCallback
    state<Response = BodyType, Context = unknown>(params: RequestParams.ClusterState, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(params: RequestParams.ClusterStats): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(params: RequestParams.ClusterStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(params: RequestParams.ClusterStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(params: RequestParams.ClusterStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  count<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  count<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Count<RequestBody>): Promise<ApiResponse<Response, Context>>
  count<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Count<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  count<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  count<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Count<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  count<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Count<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Create<RequestBody>): Promise<ApiResponse<Response, Context>>
  create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Create<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Create<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Create<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  data_frame_transform_deprecated: {
    delete_transform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform): Promise<ApiResponse<Response, Context>>
    delete_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_transform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteTransform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform): Promise<ApiResponse<Response, Context>>
    deleteTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteTransform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform): Promise<ApiResponse<Response, Context>>
    get_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_transform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform): Promise<ApiResponse<Response, Context>>
    getTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getTransform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform_stats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_transform_stats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats): Promise<ApiResponse<Response, Context>>
    get_transform_stats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_transform_stats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform_stats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform_stats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransformStats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getTransformStats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats): Promise<ApiResponse<Response, Context>>
    getTransformStats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getTransformStats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransformStats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransformStats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    start_transform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    start_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform): Promise<ApiResponse<Response, Context>>
    start_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    start_transform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    start_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    start_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    startTransform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    startTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform): Promise<ApiResponse<Response, Context>>
    startTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    startTransform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    startTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    startTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_transform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stop_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform): Promise<ApiResponse<Response, Context>>
    stop_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stop_transform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stopTransform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stopTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform): Promise<ApiResponse<Response, Context>>
    stopTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stopTransform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stopTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    stopTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  dataFrameTransformDeprecated: {
    delete_transform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform): Promise<ApiResponse<Response, Context>>
    delete_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_transform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteTransform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform): Promise<ApiResponse<Response, Context>>
    deleteTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteTransform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform): Promise<ApiResponse<Response, Context>>
    get_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_transform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform): Promise<ApiResponse<Response, Context>>
    getTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getTransform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform_stats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_transform_stats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats): Promise<ApiResponse<Response, Context>>
    get_transform_stats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_transform_stats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform_stats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform_stats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransformStats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getTransformStats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats): Promise<ApiResponse<Response, Context>>
    getTransformStats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getTransformStats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransformStats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransformStats<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedPutTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    start_transform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    start_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform): Promise<ApiResponse<Response, Context>>
    start_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    start_transform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    start_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    start_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    startTransform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    startTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform): Promise<ApiResponse<Response, Context>>
    startTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    startTransform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    startTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    startTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_transform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stop_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform): Promise<ApiResponse<Response, Context>>
    stop_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stop_transform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_transform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stopTransform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stopTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform): Promise<ApiResponse<Response, Context>>
    stopTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stopTransform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stopTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    stopTransform<Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  delete<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  delete<Response = BodyType, Context = unknown>(params: RequestParams.Delete): Promise<ApiResponse<Response, Context>>
  delete<Response = BodyType, Context = unknown>(params: RequestParams.Delete, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  delete<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  delete<Response = BodyType, Context = unknown>(params: RequestParams.Delete, callback: callbackFn<Response, Context>): TransportRequestCallback
  delete<Response = BodyType, Context = unknown>(params: RequestParams.Delete, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  delete_by_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  delete_by_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQuery<RequestBody>): Promise<ApiResponse<Response, Context>>
  delete_by_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQuery<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  delete_by_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  delete_by_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQuery<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  delete_by_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQuery<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  deleteByQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  deleteByQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQuery<RequestBody>): Promise<ApiResponse<Response, Context>>
  deleteByQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQuery<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  deleteByQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  deleteByQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQuery<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  deleteByQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQuery<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  delete_by_query_rethrottle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  delete_by_query_rethrottle<Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQueryRethrottle): Promise<ApiResponse<Response, Context>>
  delete_by_query_rethrottle<Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQueryRethrottle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  delete_by_query_rethrottle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  delete_by_query_rethrottle<Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQueryRethrottle, callback: callbackFn<Response, Context>): TransportRequestCallback
  delete_by_query_rethrottle<Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  deleteByQueryRethrottle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  deleteByQueryRethrottle<Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQueryRethrottle): Promise<ApiResponse<Response, Context>>
  deleteByQueryRethrottle<Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQueryRethrottle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  deleteByQueryRethrottle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  deleteByQueryRethrottle<Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQueryRethrottle, callback: callbackFn<Response, Context>): TransportRequestCallback
  deleteByQueryRethrottle<Response = BodyType, Context = unknown>(params: RequestParams.DeleteByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  delete_script<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  delete_script<Response = BodyType, Context = unknown>(params: RequestParams.DeleteScript): Promise<ApiResponse<Response, Context>>
  delete_script<Response = BodyType, Context = unknown>(params: RequestParams.DeleteScript, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  delete_script<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  delete_script<Response = BodyType, Context = unknown>(params: RequestParams.DeleteScript, callback: callbackFn<Response, Context>): TransportRequestCallback
  delete_script<Response = BodyType, Context = unknown>(params: RequestParams.DeleteScript, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  deleteScript<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  deleteScript<Response = BodyType, Context = unknown>(params: RequestParams.DeleteScript): Promise<ApiResponse<Response, Context>>
  deleteScript<Response = BodyType, Context = unknown>(params: RequestParams.DeleteScript, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  deleteScript<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  deleteScript<Response = BodyType, Context = unknown>(params: RequestParams.DeleteScript, callback: callbackFn<Response, Context>): TransportRequestCallback
  deleteScript<Response = BodyType, Context = unknown>(params: RequestParams.DeleteScript, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  enrich: {
    delete_policy<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_policy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichDeletePolicy): Promise<ApiResponse<Response, Context>>
    delete_policy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichDeletePolicy, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_policy<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_policy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichDeletePolicy, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_policy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichDeletePolicy, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deletePolicy<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deletePolicy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichDeletePolicy): Promise<ApiResponse<Response, Context>>
    deletePolicy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichDeletePolicy, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deletePolicy<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deletePolicy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichDeletePolicy, callback: callbackFn<Response, Context>): TransportRequestCallback
    deletePolicy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichDeletePolicy, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    execute_policy<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    execute_policy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichExecutePolicy): Promise<ApiResponse<Response, Context>>
    execute_policy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichExecutePolicy, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    execute_policy<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    execute_policy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichExecutePolicy, callback: callbackFn<Response, Context>): TransportRequestCallback
    execute_policy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichExecutePolicy, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    executePolicy<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    executePolicy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichExecutePolicy): Promise<ApiResponse<Response, Context>>
    executePolicy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichExecutePolicy, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    executePolicy<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    executePolicy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichExecutePolicy, callback: callbackFn<Response, Context>): TransportRequestCallback
    executePolicy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichExecutePolicy, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_policy<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_policy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichGetPolicy): Promise<ApiResponse<Response, Context>>
    get_policy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichGetPolicy, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_policy<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_policy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichGetPolicy, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_policy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichGetPolicy, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getPolicy<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getPolicy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichGetPolicy): Promise<ApiResponse<Response, Context>>
    getPolicy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichGetPolicy, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getPolicy<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getPolicy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichGetPolicy, callback: callbackFn<Response, Context>): TransportRequestCallback
    getPolicy<Response = BodyType, Context = unknown>(params: RequestParams.EnrichGetPolicy, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_policy<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_policy<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.EnrichPutPolicy<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_policy<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.EnrichPutPolicy<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_policy<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_policy<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.EnrichPutPolicy<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_policy<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.EnrichPutPolicy<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putPolicy<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putPolicy<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.EnrichPutPolicy<RequestBody>): Promise<ApiResponse<Response, Context>>
    putPolicy<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.EnrichPutPolicy<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putPolicy<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putPolicy<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.EnrichPutPolicy<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putPolicy<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.EnrichPutPolicy<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(params: RequestParams.EnrichStats): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(params: RequestParams.EnrichStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(params: RequestParams.EnrichStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(params: RequestParams.EnrichStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  eql: {
    search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.EqlSearch<RequestBody>): Promise<ApiResponse<Response, Context>>
    search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.EqlSearch<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.EqlSearch<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.EqlSearch<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  exists<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  exists<Response = BodyType, Context = unknown>(params: RequestParams.Exists): Promise<ApiResponse<Response, Context>>
  exists<Response = BodyType, Context = unknown>(params: RequestParams.Exists, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  exists<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  exists<Response = BodyType, Context = unknown>(params: RequestParams.Exists, callback: callbackFn<Response, Context>): TransportRequestCallback
  exists<Response = BodyType, Context = unknown>(params: RequestParams.Exists, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  exists_source<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  exists_source<Response = BodyType, Context = unknown>(params: RequestParams.ExistsSource): Promise<ApiResponse<Response, Context>>
  exists_source<Response = BodyType, Context = unknown>(params: RequestParams.ExistsSource, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  exists_source<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  exists_source<Response = BodyType, Context = unknown>(params: RequestParams.ExistsSource, callback: callbackFn<Response, Context>): TransportRequestCallback
  exists_source<Response = BodyType, Context = unknown>(params: RequestParams.ExistsSource, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  existsSource<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  existsSource<Response = BodyType, Context = unknown>(params: RequestParams.ExistsSource): Promise<ApiResponse<Response, Context>>
  existsSource<Response = BodyType, Context = unknown>(params: RequestParams.ExistsSource, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  existsSource<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  existsSource<Response = BodyType, Context = unknown>(params: RequestParams.ExistsSource, callback: callbackFn<Response, Context>): TransportRequestCallback
  existsSource<Response = BodyType, Context = unknown>(params: RequestParams.ExistsSource, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  explain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  explain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Explain<RequestBody>): Promise<ApiResponse<Response, Context>>
  explain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Explain<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  explain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  explain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Explain<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  explain<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Explain<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  field_caps<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  field_caps<Response = BodyType, Context = unknown>(params: RequestParams.FieldCaps): Promise<ApiResponse<Response, Context>>
  field_caps<Response = BodyType, Context = unknown>(params: RequestParams.FieldCaps, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  field_caps<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  field_caps<Response = BodyType, Context = unknown>(params: RequestParams.FieldCaps, callback: callbackFn<Response, Context>): TransportRequestCallback
  field_caps<Response = BodyType, Context = unknown>(params: RequestParams.FieldCaps, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  fieldCaps<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  fieldCaps<Response = BodyType, Context = unknown>(params: RequestParams.FieldCaps): Promise<ApiResponse<Response, Context>>
  fieldCaps<Response = BodyType, Context = unknown>(params: RequestParams.FieldCaps, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  fieldCaps<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  fieldCaps<Response = BodyType, Context = unknown>(params: RequestParams.FieldCaps, callback: callbackFn<Response, Context>): TransportRequestCallback
  fieldCaps<Response = BodyType, Context = unknown>(params: RequestParams.FieldCaps, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  get<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  get<Response = BodyType, Context = unknown>(params: RequestParams.Get): Promise<ApiResponse<Response, Context>>
  get<Response = BodyType, Context = unknown>(params: RequestParams.Get, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  get<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  get<Response = BodyType, Context = unknown>(params: RequestParams.Get, callback: callbackFn<Response, Context>): TransportRequestCallback
  get<Response = BodyType, Context = unknown>(params: RequestParams.Get, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  get_script<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  get_script<Response = BodyType, Context = unknown>(params: RequestParams.GetScript): Promise<ApiResponse<Response, Context>>
  get_script<Response = BodyType, Context = unknown>(params: RequestParams.GetScript, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  get_script<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  get_script<Response = BodyType, Context = unknown>(params: RequestParams.GetScript, callback: callbackFn<Response, Context>): TransportRequestCallback
  get_script<Response = BodyType, Context = unknown>(params: RequestParams.GetScript, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  getScript<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  getScript<Response = BodyType, Context = unknown>(params: RequestParams.GetScript): Promise<ApiResponse<Response, Context>>
  getScript<Response = BodyType, Context = unknown>(params: RequestParams.GetScript, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  getScript<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  getScript<Response = BodyType, Context = unknown>(params: RequestParams.GetScript, callback: callbackFn<Response, Context>): TransportRequestCallback
  getScript<Response = BodyType, Context = unknown>(params: RequestParams.GetScript, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  get_script_context<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  get_script_context<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptContext): Promise<ApiResponse<Response, Context>>
  get_script_context<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptContext, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  get_script_context<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  get_script_context<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptContext, callback: callbackFn<Response, Context>): TransportRequestCallback
  get_script_context<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptContext, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  getScriptContext<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  getScriptContext<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptContext): Promise<ApiResponse<Response, Context>>
  getScriptContext<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptContext, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  getScriptContext<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  getScriptContext<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptContext, callback: callbackFn<Response, Context>): TransportRequestCallback
  getScriptContext<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptContext, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  get_script_languages<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  get_script_languages<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptLanguages): Promise<ApiResponse<Response, Context>>
  get_script_languages<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptLanguages, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  get_script_languages<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  get_script_languages<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptLanguages, callback: callbackFn<Response, Context>): TransportRequestCallback
  get_script_languages<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptLanguages, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  getScriptLanguages<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  getScriptLanguages<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptLanguages): Promise<ApiResponse<Response, Context>>
  getScriptLanguages<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptLanguages, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  getScriptLanguages<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  getScriptLanguages<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptLanguages, callback: callbackFn<Response, Context>): TransportRequestCallback
  getScriptLanguages<Response = BodyType, Context = unknown>(params: RequestParams.GetScriptLanguages, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  get_source<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  get_source<Response = BodyType, Context = unknown>(params: RequestParams.GetSource): Promise<ApiResponse<Response, Context>>
  get_source<Response = BodyType, Context = unknown>(params: RequestParams.GetSource, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  get_source<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  get_source<Response = BodyType, Context = unknown>(params: RequestParams.GetSource, callback: callbackFn<Response, Context>): TransportRequestCallback
  get_source<Response = BodyType, Context = unknown>(params: RequestParams.GetSource, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  getSource<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  getSource<Response = BodyType, Context = unknown>(params: RequestParams.GetSource): Promise<ApiResponse<Response, Context>>
  getSource<Response = BodyType, Context = unknown>(params: RequestParams.GetSource, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  getSource<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  getSource<Response = BodyType, Context = unknown>(params: RequestParams.GetSource, callback: callbackFn<Response, Context>): TransportRequestCallback
  getSource<Response = BodyType, Context = unknown>(params: RequestParams.GetSource, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  graph: {
    explore<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    explore<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.GraphExplore<RequestBody>): Promise<ApiResponse<Response, Context>>
    explore<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.GraphExplore<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    explore<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    explore<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.GraphExplore<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    explore<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.GraphExplore<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  ilm: {
    delete_lifecycle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmDeleteLifecycle): Promise<ApiResponse<Response, Context>>
    delete_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmDeleteLifecycle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_lifecycle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmDeleteLifecycle, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteLifecycle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmDeleteLifecycle): Promise<ApiResponse<Response, Context>>
    deleteLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmDeleteLifecycle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteLifecycle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmDeleteLifecycle, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    explain_lifecycle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    explain_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmExplainLifecycle): Promise<ApiResponse<Response, Context>>
    explain_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmExplainLifecycle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    explain_lifecycle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    explain_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmExplainLifecycle, callback: callbackFn<Response, Context>): TransportRequestCallback
    explain_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmExplainLifecycle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    explainLifecycle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    explainLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmExplainLifecycle): Promise<ApiResponse<Response, Context>>
    explainLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmExplainLifecycle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    explainLifecycle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    explainLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmExplainLifecycle, callback: callbackFn<Response, Context>): TransportRequestCallback
    explainLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmExplainLifecycle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_lifecycle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetLifecycle): Promise<ApiResponse<Response, Context>>
    get_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetLifecycle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_lifecycle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetLifecycle, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getLifecycle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetLifecycle): Promise<ApiResponse<Response, Context>>
    getLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetLifecycle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getLifecycle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetLifecycle, callback: callbackFn<Response, Context>): TransportRequestCallback
    getLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_status<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_status<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetStatus): Promise<ApiResponse<Response, Context>>
    get_status<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetStatus, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_status<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_status<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetStatus, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_status<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetStatus, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getStatus<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getStatus<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetStatus): Promise<ApiResponse<Response, Context>>
    getStatus<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetStatus, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getStatus<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getStatus<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetStatus, callback: callbackFn<Response, Context>): TransportRequestCallback
    getStatus<Response = BodyType, Context = unknown>(params: RequestParams.IlmGetStatus, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    move_to_step<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    move_to_step<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmMoveToStep<RequestBody>): Promise<ApiResponse<Response, Context>>
    move_to_step<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmMoveToStep<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    move_to_step<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    move_to_step<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmMoveToStep<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    move_to_step<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmMoveToStep<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    moveToStep<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    moveToStep<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmMoveToStep<RequestBody>): Promise<ApiResponse<Response, Context>>
    moveToStep<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmMoveToStep<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    moveToStep<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    moveToStep<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmMoveToStep<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    moveToStep<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmMoveToStep<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_lifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_lifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmPutLifecycle<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_lifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmPutLifecycle<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_lifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_lifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmPutLifecycle<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_lifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmPutLifecycle<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putLifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putLifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmPutLifecycle<RequestBody>): Promise<ApiResponse<Response, Context>>
    putLifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmPutLifecycle<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putLifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putLifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmPutLifecycle<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putLifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IlmPutLifecycle<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    remove_policy<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    remove_policy<Response = BodyType, Context = unknown>(params: RequestParams.IlmRemovePolicy): Promise<ApiResponse<Response, Context>>
    remove_policy<Response = BodyType, Context = unknown>(params: RequestParams.IlmRemovePolicy, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    remove_policy<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    remove_policy<Response = BodyType, Context = unknown>(params: RequestParams.IlmRemovePolicy, callback: callbackFn<Response, Context>): TransportRequestCallback
    remove_policy<Response = BodyType, Context = unknown>(params: RequestParams.IlmRemovePolicy, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    removePolicy<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    removePolicy<Response = BodyType, Context = unknown>(params: RequestParams.IlmRemovePolicy): Promise<ApiResponse<Response, Context>>
    removePolicy<Response = BodyType, Context = unknown>(params: RequestParams.IlmRemovePolicy, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    removePolicy<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    removePolicy<Response = BodyType, Context = unknown>(params: RequestParams.IlmRemovePolicy, callback: callbackFn<Response, Context>): TransportRequestCallback
    removePolicy<Response = BodyType, Context = unknown>(params: RequestParams.IlmRemovePolicy, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    retry<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    retry<Response = BodyType, Context = unknown>(params: RequestParams.IlmRetry): Promise<ApiResponse<Response, Context>>
    retry<Response = BodyType, Context = unknown>(params: RequestParams.IlmRetry, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    retry<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    retry<Response = BodyType, Context = unknown>(params: RequestParams.IlmRetry, callback: callbackFn<Response, Context>): TransportRequestCallback
    retry<Response = BodyType, Context = unknown>(params: RequestParams.IlmRetry, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    start<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    start<Response = BodyType, Context = unknown>(params: RequestParams.IlmStart): Promise<ApiResponse<Response, Context>>
    start<Response = BodyType, Context = unknown>(params: RequestParams.IlmStart, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    start<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    start<Response = BodyType, Context = unknown>(params: RequestParams.IlmStart, callback: callbackFn<Response, Context>): TransportRequestCallback
    start<Response = BodyType, Context = unknown>(params: RequestParams.IlmStart, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stop<Response = BodyType, Context = unknown>(params: RequestParams.IlmStop): Promise<ApiResponse<Response, Context>>
    stop<Response = BodyType, Context = unknown>(params: RequestParams.IlmStop, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stop<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stop<Response = BodyType, Context = unknown>(params: RequestParams.IlmStop, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop<Response = BodyType, Context = unknown>(params: RequestParams.IlmStop, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  index<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  index<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Index<RequestBody>): Promise<ApiResponse<Response, Context>>
  index<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Index<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  index<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  index<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Index<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  index<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Index<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  indices: {
    analyze<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    analyze<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesAnalyze<RequestBody>): Promise<ApiResponse<Response, Context>>
    analyze<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesAnalyze<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    analyze<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    analyze<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesAnalyze<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    analyze<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesAnalyze<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    clear_cache<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    clear_cache<Response = BodyType, Context = unknown>(params: RequestParams.IndicesClearCache): Promise<ApiResponse<Response, Context>>
    clear_cache<Response = BodyType, Context = unknown>(params: RequestParams.IndicesClearCache, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    clear_cache<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    clear_cache<Response = BodyType, Context = unknown>(params: RequestParams.IndicesClearCache, callback: callbackFn<Response, Context>): TransportRequestCallback
    clear_cache<Response = BodyType, Context = unknown>(params: RequestParams.IndicesClearCache, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    clearCache<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    clearCache<Response = BodyType, Context = unknown>(params: RequestParams.IndicesClearCache): Promise<ApiResponse<Response, Context>>
    clearCache<Response = BodyType, Context = unknown>(params: RequestParams.IndicesClearCache, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    clearCache<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    clearCache<Response = BodyType, Context = unknown>(params: RequestParams.IndicesClearCache, callback: callbackFn<Response, Context>): TransportRequestCallback
    clearCache<Response = BodyType, Context = unknown>(params: RequestParams.IndicesClearCache, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    clone<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    clone<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesClone<RequestBody>): Promise<ApiResponse<Response, Context>>
    clone<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesClone<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    clone<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    clone<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesClone<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    clone<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesClone<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    close<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    close<Response = BodyType, Context = unknown>(params: RequestParams.IndicesClose): Promise<ApiResponse<Response, Context>>
    close<Response = BodyType, Context = unknown>(params: RequestParams.IndicesClose, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    close<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    close<Response = BodyType, Context = unknown>(params: RequestParams.IndicesClose, callback: callbackFn<Response, Context>): TransportRequestCallback
    close<Response = BodyType, Context = unknown>(params: RequestParams.IndicesClose, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesCreate<RequestBody>): Promise<ApiResponse<Response, Context>>
    create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesCreate<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesCreate<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesCreate<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    create_data_stream<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    create_data_stream<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesCreateDataStream<RequestBody>): Promise<ApiResponse<Response, Context>>
    create_data_stream<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesCreateDataStream<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    create_data_stream<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    create_data_stream<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesCreateDataStream<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    create_data_stream<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesCreateDataStream<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    createDataStream<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    createDataStream<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesCreateDataStream<RequestBody>): Promise<ApiResponse<Response, Context>>
    createDataStream<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesCreateDataStream<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    createDataStream<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    createDataStream<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesCreateDataStream<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    createDataStream<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesCreateDataStream<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDelete): Promise<ApiResponse<Response, Context>>
    delete<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDelete, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDelete, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDelete, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_alias<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_alias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteAlias): Promise<ApiResponse<Response, Context>>
    delete_alias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteAlias, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_alias<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_alias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteAlias, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_alias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteAlias, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteAlias<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteAlias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteAlias): Promise<ApiResponse<Response, Context>>
    deleteAlias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteAlias, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteAlias<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteAlias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteAlias, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteAlias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteAlias, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_data_stream<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_data_stream<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteDataStream): Promise<ApiResponse<Response, Context>>
    delete_data_stream<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteDataStream, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_data_stream<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_data_stream<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteDataStream, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_data_stream<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteDataStream, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteDataStream<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteDataStream<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteDataStream): Promise<ApiResponse<Response, Context>>
    deleteDataStream<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteDataStream, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteDataStream<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteDataStream<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteDataStream, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteDataStream<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteDataStream, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_template<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_template<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteTemplate): Promise<ApiResponse<Response, Context>>
    delete_template<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteTemplate, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_template<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_template<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteTemplate, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_template<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteTemplate, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteTemplate<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteTemplate<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteTemplate): Promise<ApiResponse<Response, Context>>
    deleteTemplate<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteTemplate, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteTemplate<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteTemplate<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteTemplate, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteTemplate<Response = BodyType, Context = unknown>(params: RequestParams.IndicesDeleteTemplate, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    exists<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    exists<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExists): Promise<ApiResponse<Response, Context>>
    exists<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExists, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    exists<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    exists<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExists, callback: callbackFn<Response, Context>): TransportRequestCallback
    exists<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExists, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    exists_alias<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    exists_alias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsAlias): Promise<ApiResponse<Response, Context>>
    exists_alias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsAlias, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    exists_alias<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    exists_alias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsAlias, callback: callbackFn<Response, Context>): TransportRequestCallback
    exists_alias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsAlias, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    existsAlias<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    existsAlias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsAlias): Promise<ApiResponse<Response, Context>>
    existsAlias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsAlias, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    existsAlias<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    existsAlias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsAlias, callback: callbackFn<Response, Context>): TransportRequestCallback
    existsAlias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsAlias, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    exists_template<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    exists_template<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsTemplate): Promise<ApiResponse<Response, Context>>
    exists_template<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsTemplate, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    exists_template<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    exists_template<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsTemplate, callback: callbackFn<Response, Context>): TransportRequestCallback
    exists_template<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsTemplate, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    existsTemplate<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    existsTemplate<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsTemplate): Promise<ApiResponse<Response, Context>>
    existsTemplate<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsTemplate, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    existsTemplate<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    existsTemplate<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsTemplate, callback: callbackFn<Response, Context>): TransportRequestCallback
    existsTemplate<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsTemplate, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    exists_type<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    exists_type<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsType): Promise<ApiResponse<Response, Context>>
    exists_type<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsType, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    exists_type<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    exists_type<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsType, callback: callbackFn<Response, Context>): TransportRequestCallback
    exists_type<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsType, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    existsType<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    existsType<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsType): Promise<ApiResponse<Response, Context>>
    existsType<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsType, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    existsType<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    existsType<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsType, callback: callbackFn<Response, Context>): TransportRequestCallback
    existsType<Response = BodyType, Context = unknown>(params: RequestParams.IndicesExistsType, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    flush<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    flush<Response = BodyType, Context = unknown>(params: RequestParams.IndicesFlush): Promise<ApiResponse<Response, Context>>
    flush<Response = BodyType, Context = unknown>(params: RequestParams.IndicesFlush, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    flush<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    flush<Response = BodyType, Context = unknown>(params: RequestParams.IndicesFlush, callback: callbackFn<Response, Context>): TransportRequestCallback
    flush<Response = BodyType, Context = unknown>(params: RequestParams.IndicesFlush, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    forcemerge<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    forcemerge<Response = BodyType, Context = unknown>(params: RequestParams.IndicesForcemerge): Promise<ApiResponse<Response, Context>>
    forcemerge<Response = BodyType, Context = unknown>(params: RequestParams.IndicesForcemerge, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    forcemerge<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    forcemerge<Response = BodyType, Context = unknown>(params: RequestParams.IndicesForcemerge, callback: callbackFn<Response, Context>): TransportRequestCallback
    forcemerge<Response = BodyType, Context = unknown>(params: RequestParams.IndicesForcemerge, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    freeze<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    freeze<Response = BodyType, Context = unknown>(params: RequestParams.IndicesFreeze): Promise<ApiResponse<Response, Context>>
    freeze<Response = BodyType, Context = unknown>(params: RequestParams.IndicesFreeze, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    freeze<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    freeze<Response = BodyType, Context = unknown>(params: RequestParams.IndicesFreeze, callback: callbackFn<Response, Context>): TransportRequestCallback
    freeze<Response = BodyType, Context = unknown>(params: RequestParams.IndicesFreeze, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGet): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGet, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGet, callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGet, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_alias<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_alias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetAlias): Promise<ApiResponse<Response, Context>>
    get_alias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetAlias, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_alias<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_alias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetAlias, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_alias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetAlias, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getAlias<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getAlias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetAlias): Promise<ApiResponse<Response, Context>>
    getAlias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetAlias, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getAlias<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getAlias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetAlias, callback: callbackFn<Response, Context>): TransportRequestCallback
    getAlias<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetAlias, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_data_streams<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_data_streams<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetDataStreams): Promise<ApiResponse<Response, Context>>
    get_data_streams<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetDataStreams, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_data_streams<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_data_streams<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetDataStreams, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_data_streams<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetDataStreams, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getDataStreams<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getDataStreams<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetDataStreams): Promise<ApiResponse<Response, Context>>
    getDataStreams<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetDataStreams, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getDataStreams<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getDataStreams<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetDataStreams, callback: callbackFn<Response, Context>): TransportRequestCallback
    getDataStreams<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetDataStreams, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_field_mapping<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_field_mapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetFieldMapping): Promise<ApiResponse<Response, Context>>
    get_field_mapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetFieldMapping, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_field_mapping<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_field_mapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetFieldMapping, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_field_mapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetFieldMapping, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getFieldMapping<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getFieldMapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetFieldMapping): Promise<ApiResponse<Response, Context>>
    getFieldMapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetFieldMapping, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getFieldMapping<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getFieldMapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetFieldMapping, callback: callbackFn<Response, Context>): TransportRequestCallback
    getFieldMapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetFieldMapping, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_mapping<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_mapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetMapping): Promise<ApiResponse<Response, Context>>
    get_mapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetMapping, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_mapping<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_mapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetMapping, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_mapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetMapping, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getMapping<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getMapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetMapping): Promise<ApiResponse<Response, Context>>
    getMapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetMapping, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getMapping<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getMapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetMapping, callback: callbackFn<Response, Context>): TransportRequestCallback
    getMapping<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetMapping, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_settings<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_settings<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetSettings): Promise<ApiResponse<Response, Context>>
    get_settings<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetSettings, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_settings<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_settings<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetSettings, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_settings<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetSettings, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getSettings<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getSettings<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetSettings): Promise<ApiResponse<Response, Context>>
    getSettings<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetSettings, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getSettings<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getSettings<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetSettings, callback: callbackFn<Response, Context>): TransportRequestCallback
    getSettings<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetSettings, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_template<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_template<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetTemplate): Promise<ApiResponse<Response, Context>>
    get_template<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetTemplate, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_template<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_template<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetTemplate, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_template<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetTemplate, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTemplate<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getTemplate<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetTemplate): Promise<ApiResponse<Response, Context>>
    getTemplate<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetTemplate, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getTemplate<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getTemplate<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetTemplate, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTemplate<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetTemplate, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_upgrade<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_upgrade<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetUpgrade): Promise<ApiResponse<Response, Context>>
    get_upgrade<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetUpgrade, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_upgrade<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_upgrade<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetUpgrade, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_upgrade<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetUpgrade, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getUpgrade<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getUpgrade<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetUpgrade): Promise<ApiResponse<Response, Context>>
    getUpgrade<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetUpgrade, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getUpgrade<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getUpgrade<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetUpgrade, callback: callbackFn<Response, Context>): TransportRequestCallback
    getUpgrade<Response = BodyType, Context = unknown>(params: RequestParams.IndicesGetUpgrade, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    open<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    open<Response = BodyType, Context = unknown>(params: RequestParams.IndicesOpen): Promise<ApiResponse<Response, Context>>
    open<Response = BodyType, Context = unknown>(params: RequestParams.IndicesOpen, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    open<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    open<Response = BodyType, Context = unknown>(params: RequestParams.IndicesOpen, callback: callbackFn<Response, Context>): TransportRequestCallback
    open<Response = BodyType, Context = unknown>(params: RequestParams.IndicesOpen, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_alias<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_alias<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutAlias<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_alias<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutAlias<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_alias<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_alias<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutAlias<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_alias<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutAlias<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putAlias<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putAlias<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutAlias<RequestBody>): Promise<ApiResponse<Response, Context>>
    putAlias<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutAlias<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putAlias<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putAlias<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutAlias<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putAlias<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutAlias<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_mapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_mapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutMapping<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_mapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutMapping<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_mapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_mapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutMapping<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_mapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutMapping<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putMapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putMapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutMapping<RequestBody>): Promise<ApiResponse<Response, Context>>
    putMapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutMapping<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putMapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putMapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutMapping<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putMapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutMapping<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_settings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_settings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutSettings<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_settings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutSettings<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_settings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_settings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutSettings<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_settings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutSettings<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putSettings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putSettings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutSettings<RequestBody>): Promise<ApiResponse<Response, Context>>
    putSettings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutSettings<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putSettings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putSettings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutSettings<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putSettings<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutSettings<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutTemplate<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutTemplate<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutTemplate<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutTemplate<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutTemplate<RequestBody>): Promise<ApiResponse<Response, Context>>
    putTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutTemplate<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutTemplate<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesPutTemplate<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    recovery<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    recovery<Response = BodyType, Context = unknown>(params: RequestParams.IndicesRecovery): Promise<ApiResponse<Response, Context>>
    recovery<Response = BodyType, Context = unknown>(params: RequestParams.IndicesRecovery, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    recovery<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    recovery<Response = BodyType, Context = unknown>(params: RequestParams.IndicesRecovery, callback: callbackFn<Response, Context>): TransportRequestCallback
    recovery<Response = BodyType, Context = unknown>(params: RequestParams.IndicesRecovery, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    refresh<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    refresh<Response = BodyType, Context = unknown>(params: RequestParams.IndicesRefresh): Promise<ApiResponse<Response, Context>>
    refresh<Response = BodyType, Context = unknown>(params: RequestParams.IndicesRefresh, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    refresh<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    refresh<Response = BodyType, Context = unknown>(params: RequestParams.IndicesRefresh, callback: callbackFn<Response, Context>): TransportRequestCallback
    refresh<Response = BodyType, Context = unknown>(params: RequestParams.IndicesRefresh, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    reload_search_analyzers<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    reload_search_analyzers<Response = BodyType, Context = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers): Promise<ApiResponse<Response, Context>>
    reload_search_analyzers<Response = BodyType, Context = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    reload_search_analyzers<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    reload_search_analyzers<Response = BodyType, Context = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers, callback: callbackFn<Response, Context>): TransportRequestCallback
    reload_search_analyzers<Response = BodyType, Context = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    reloadSearchAnalyzers<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    reloadSearchAnalyzers<Response = BodyType, Context = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers): Promise<ApiResponse<Response, Context>>
    reloadSearchAnalyzers<Response = BodyType, Context = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    reloadSearchAnalyzers<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    reloadSearchAnalyzers<Response = BodyType, Context = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers, callback: callbackFn<Response, Context>): TransportRequestCallback
    reloadSearchAnalyzers<Response = BodyType, Context = unknown>(params: RequestParams.IndicesReloadSearchAnalyzers, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    rollover<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    rollover<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesRollover<RequestBody>): Promise<ApiResponse<Response, Context>>
    rollover<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesRollover<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    rollover<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    rollover<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesRollover<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    rollover<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesRollover<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    segments<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    segments<Response = BodyType, Context = unknown>(params: RequestParams.IndicesSegments): Promise<ApiResponse<Response, Context>>
    segments<Response = BodyType, Context = unknown>(params: RequestParams.IndicesSegments, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    segments<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    segments<Response = BodyType, Context = unknown>(params: RequestParams.IndicesSegments, callback: callbackFn<Response, Context>): TransportRequestCallback
    segments<Response = BodyType, Context = unknown>(params: RequestParams.IndicesSegments, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    shard_stores<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    shard_stores<Response = BodyType, Context = unknown>(params: RequestParams.IndicesShardStores): Promise<ApiResponse<Response, Context>>
    shard_stores<Response = BodyType, Context = unknown>(params: RequestParams.IndicesShardStores, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    shard_stores<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    shard_stores<Response = BodyType, Context = unknown>(params: RequestParams.IndicesShardStores, callback: callbackFn<Response, Context>): TransportRequestCallback
    shard_stores<Response = BodyType, Context = unknown>(params: RequestParams.IndicesShardStores, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    shardStores<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    shardStores<Response = BodyType, Context = unknown>(params: RequestParams.IndicesShardStores): Promise<ApiResponse<Response, Context>>
    shardStores<Response = BodyType, Context = unknown>(params: RequestParams.IndicesShardStores, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    shardStores<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    shardStores<Response = BodyType, Context = unknown>(params: RequestParams.IndicesShardStores, callback: callbackFn<Response, Context>): TransportRequestCallback
    shardStores<Response = BodyType, Context = unknown>(params: RequestParams.IndicesShardStores, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    shrink<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    shrink<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesShrink<RequestBody>): Promise<ApiResponse<Response, Context>>
    shrink<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesShrink<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    shrink<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    shrink<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesShrink<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    shrink<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesShrink<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    split<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    split<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesSplit<RequestBody>): Promise<ApiResponse<Response, Context>>
    split<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesSplit<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    split<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    split<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesSplit<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    split<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesSplit<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(params: RequestParams.IndicesStats): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(params: RequestParams.IndicesStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(params: RequestParams.IndicesStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(params: RequestParams.IndicesStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    unfreeze<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    unfreeze<Response = BodyType, Context = unknown>(params: RequestParams.IndicesUnfreeze): Promise<ApiResponse<Response, Context>>
    unfreeze<Response = BodyType, Context = unknown>(params: RequestParams.IndicesUnfreeze, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    unfreeze<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    unfreeze<Response = BodyType, Context = unknown>(params: RequestParams.IndicesUnfreeze, callback: callbackFn<Response, Context>): TransportRequestCallback
    unfreeze<Response = BodyType, Context = unknown>(params: RequestParams.IndicesUnfreeze, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_aliases<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    update_aliases<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesUpdateAliases<RequestBody>): Promise<ApiResponse<Response, Context>>
    update_aliases<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesUpdateAliases<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    update_aliases<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    update_aliases<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesUpdateAliases<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_aliases<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesUpdateAliases<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateAliases<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    updateAliases<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesUpdateAliases<RequestBody>): Promise<ApiResponse<Response, Context>>
    updateAliases<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesUpdateAliases<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    updateAliases<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    updateAliases<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesUpdateAliases<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateAliases<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesUpdateAliases<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    upgrade<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    upgrade<Response = BodyType, Context = unknown>(params: RequestParams.IndicesUpgrade): Promise<ApiResponse<Response, Context>>
    upgrade<Response = BodyType, Context = unknown>(params: RequestParams.IndicesUpgrade, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    upgrade<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    upgrade<Response = BodyType, Context = unknown>(params: RequestParams.IndicesUpgrade, callback: callbackFn<Response, Context>): TransportRequestCallback
    upgrade<Response = BodyType, Context = unknown>(params: RequestParams.IndicesUpgrade, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    validate_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    validate_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesValidateQuery<RequestBody>): Promise<ApiResponse<Response, Context>>
    validate_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesValidateQuery<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    validate_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    validate_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesValidateQuery<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    validate_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesValidateQuery<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    validateQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    validateQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesValidateQuery<RequestBody>): Promise<ApiResponse<Response, Context>>
    validateQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesValidateQuery<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    validateQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    validateQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesValidateQuery<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    validateQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IndicesValidateQuery<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  info<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  info<Response = BodyType, Context = unknown>(params: RequestParams.Info): Promise<ApiResponse<Response, Context>>
  info<Response = BodyType, Context = unknown>(params: RequestParams.Info, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  info<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  info<Response = BodyType, Context = unknown>(params: RequestParams.Info, callback: callbackFn<Response, Context>): TransportRequestCallback
  info<Response = BodyType, Context = unknown>(params: RequestParams.Info, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  ingest: {
    delete_pipeline<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_pipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestDeletePipeline): Promise<ApiResponse<Response, Context>>
    delete_pipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestDeletePipeline, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_pipeline<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_pipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestDeletePipeline, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_pipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestDeletePipeline, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deletePipeline<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deletePipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestDeletePipeline): Promise<ApiResponse<Response, Context>>
    deletePipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestDeletePipeline, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deletePipeline<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deletePipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestDeletePipeline, callback: callbackFn<Response, Context>): TransportRequestCallback
    deletePipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestDeletePipeline, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_pipeline<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_pipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestGetPipeline): Promise<ApiResponse<Response, Context>>
    get_pipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestGetPipeline, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_pipeline<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_pipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestGetPipeline, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_pipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestGetPipeline, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getPipeline<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getPipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestGetPipeline): Promise<ApiResponse<Response, Context>>
    getPipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestGetPipeline, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getPipeline<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getPipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestGetPipeline, callback: callbackFn<Response, Context>): TransportRequestCallback
    getPipeline<Response = BodyType, Context = unknown>(params: RequestParams.IngestGetPipeline, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    processor_grok<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    processor_grok<Response = BodyType, Context = unknown>(params: RequestParams.IngestProcessorGrok): Promise<ApiResponse<Response, Context>>
    processor_grok<Response = BodyType, Context = unknown>(params: RequestParams.IngestProcessorGrok, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    processor_grok<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    processor_grok<Response = BodyType, Context = unknown>(params: RequestParams.IngestProcessorGrok, callback: callbackFn<Response, Context>): TransportRequestCallback
    processor_grok<Response = BodyType, Context = unknown>(params: RequestParams.IngestProcessorGrok, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    processorGrok<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    processorGrok<Response = BodyType, Context = unknown>(params: RequestParams.IngestProcessorGrok): Promise<ApiResponse<Response, Context>>
    processorGrok<Response = BodyType, Context = unknown>(params: RequestParams.IngestProcessorGrok, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    processorGrok<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    processorGrok<Response = BodyType, Context = unknown>(params: RequestParams.IngestProcessorGrok, callback: callbackFn<Response, Context>): TransportRequestCallback
    processorGrok<Response = BodyType, Context = unknown>(params: RequestParams.IngestProcessorGrok, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_pipeline<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_pipeline<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IngestPutPipeline<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_pipeline<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IngestPutPipeline<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_pipeline<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_pipeline<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IngestPutPipeline<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_pipeline<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IngestPutPipeline<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putPipeline<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putPipeline<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IngestPutPipeline<RequestBody>): Promise<ApiResponse<Response, Context>>
    putPipeline<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IngestPutPipeline<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putPipeline<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putPipeline<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IngestPutPipeline<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putPipeline<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IngestPutPipeline<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    simulate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    simulate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IngestSimulate<RequestBody>): Promise<ApiResponse<Response, Context>>
    simulate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IngestSimulate<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    simulate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    simulate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IngestSimulate<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    simulate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.IngestSimulate<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  license: {
    delete<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete<Response = BodyType, Context = unknown>(params: RequestParams.LicenseDelete): Promise<ApiResponse<Response, Context>>
    delete<Response = BodyType, Context = unknown>(params: RequestParams.LicenseDelete, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete<Response = BodyType, Context = unknown>(params: RequestParams.LicenseDelete, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete<Response = BodyType, Context = unknown>(params: RequestParams.LicenseDelete, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGet): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGet, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGet, callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGet, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_basic_status<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_basic_status<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetBasicStatus): Promise<ApiResponse<Response, Context>>
    get_basic_status<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetBasicStatus, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_basic_status<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_basic_status<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetBasicStatus, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_basic_status<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetBasicStatus, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getBasicStatus<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getBasicStatus<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetBasicStatus): Promise<ApiResponse<Response, Context>>
    getBasicStatus<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetBasicStatus, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getBasicStatus<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getBasicStatus<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetBasicStatus, callback: callbackFn<Response, Context>): TransportRequestCallback
    getBasicStatus<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetBasicStatus, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_trial_status<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_trial_status<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetTrialStatus): Promise<ApiResponse<Response, Context>>
    get_trial_status<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetTrialStatus, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_trial_status<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_trial_status<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetTrialStatus, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_trial_status<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetTrialStatus, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTrialStatus<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getTrialStatus<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetTrialStatus): Promise<ApiResponse<Response, Context>>
    getTrialStatus<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetTrialStatus, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getTrialStatus<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getTrialStatus<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetTrialStatus, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTrialStatus<Response = BodyType, Context = unknown>(params: RequestParams.LicenseGetTrialStatus, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    post<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    post<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.LicensePost<RequestBody>): Promise<ApiResponse<Response, Context>>
    post<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.LicensePost<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    post<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    post<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.LicensePost<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    post<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.LicensePost<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    post_start_basic<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    post_start_basic<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartBasic): Promise<ApiResponse<Response, Context>>
    post_start_basic<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartBasic, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    post_start_basic<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    post_start_basic<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartBasic, callback: callbackFn<Response, Context>): TransportRequestCallback
    post_start_basic<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartBasic, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    postStartBasic<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    postStartBasic<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartBasic): Promise<ApiResponse<Response, Context>>
    postStartBasic<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartBasic, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    postStartBasic<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    postStartBasic<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartBasic, callback: callbackFn<Response, Context>): TransportRequestCallback
    postStartBasic<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartBasic, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    post_start_trial<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    post_start_trial<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartTrial): Promise<ApiResponse<Response, Context>>
    post_start_trial<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartTrial, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    post_start_trial<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    post_start_trial<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartTrial, callback: callbackFn<Response, Context>): TransportRequestCallback
    post_start_trial<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartTrial, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    postStartTrial<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    postStartTrial<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartTrial): Promise<ApiResponse<Response, Context>>
    postStartTrial<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartTrial, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    postStartTrial<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    postStartTrial<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartTrial, callback: callbackFn<Response, Context>): TransportRequestCallback
    postStartTrial<Response = BodyType, Context = unknown>(params: RequestParams.LicensePostStartTrial, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  mget<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  mget<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Mget<RequestBody>): Promise<ApiResponse<Response, Context>>
  mget<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Mget<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  mget<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  mget<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Mget<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  mget<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Mget<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  migration: {
    deprecations<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deprecations<Response = BodyType, Context = unknown>(params: RequestParams.MigrationDeprecations): Promise<ApiResponse<Response, Context>>
    deprecations<Response = BodyType, Context = unknown>(params: RequestParams.MigrationDeprecations, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deprecations<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deprecations<Response = BodyType, Context = unknown>(params: RequestParams.MigrationDeprecations, callback: callbackFn<Response, Context>): TransportRequestCallback
    deprecations<Response = BodyType, Context = unknown>(params: RequestParams.MigrationDeprecations, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  ml: {
    close_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    close_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlCloseJob<RequestBody>): Promise<ApiResponse<Response, Context>>
    close_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlCloseJob<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    close_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    close_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlCloseJob<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    close_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlCloseJob<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    closeJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    closeJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlCloseJob<RequestBody>): Promise<ApiResponse<Response, Context>>
    closeJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlCloseJob<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    closeJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    closeJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlCloseJob<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    closeJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlCloseJob<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_calendar<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_calendar<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendar): Promise<ApiResponse<Response, Context>>
    delete_calendar<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendar, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_calendar<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_calendar<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendar, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_calendar<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendar, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteCalendar<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteCalendar<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendar): Promise<ApiResponse<Response, Context>>
    deleteCalendar<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendar, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteCalendar<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteCalendar<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendar, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteCalendar<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendar, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_calendar_event<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_calendar_event<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarEvent): Promise<ApiResponse<Response, Context>>
    delete_calendar_event<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarEvent, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_calendar_event<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_calendar_event<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarEvent, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_calendar_event<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarEvent, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteCalendarEvent<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteCalendarEvent<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarEvent): Promise<ApiResponse<Response, Context>>
    deleteCalendarEvent<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarEvent, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteCalendarEvent<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteCalendarEvent<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarEvent, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteCalendarEvent<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarEvent, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_calendar_job<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_calendar_job<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarJob): Promise<ApiResponse<Response, Context>>
    delete_calendar_job<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarJob, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_calendar_job<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_calendar_job<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarJob, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_calendar_job<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarJob, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteCalendarJob<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteCalendarJob<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarJob): Promise<ApiResponse<Response, Context>>
    deleteCalendarJob<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarJob, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteCalendarJob<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteCalendarJob<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarJob, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteCalendarJob<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteCalendarJob, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_data_frame_analytics<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_data_frame_analytics<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics): Promise<ApiResponse<Response, Context>>
    delete_data_frame_analytics<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_data_frame_analytics<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_data_frame_analytics<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_data_frame_analytics<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteDataFrameAnalytics<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteDataFrameAnalytics<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics): Promise<ApiResponse<Response, Context>>
    deleteDataFrameAnalytics<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteDataFrameAnalytics<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteDataFrameAnalytics<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteDataFrameAnalytics<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_datafeed<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_datafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDatafeed): Promise<ApiResponse<Response, Context>>
    delete_datafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDatafeed, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_datafeed<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_datafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDatafeed, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_datafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDatafeed, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteDatafeed<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteDatafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDatafeed): Promise<ApiResponse<Response, Context>>
    deleteDatafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDatafeed, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteDatafeed<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteDatafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDatafeed, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteDatafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteDatafeed, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_expired_data<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_expired_data<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteExpiredData): Promise<ApiResponse<Response, Context>>
    delete_expired_data<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteExpiredData, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_expired_data<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_expired_data<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteExpiredData, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_expired_data<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteExpiredData, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteExpiredData<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteExpiredData<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteExpiredData): Promise<ApiResponse<Response, Context>>
    deleteExpiredData<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteExpiredData, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteExpiredData<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteExpiredData<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteExpiredData, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteExpiredData<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteExpiredData, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_filter<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_filter<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteFilter): Promise<ApiResponse<Response, Context>>
    delete_filter<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteFilter, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_filter<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_filter<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteFilter, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_filter<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteFilter, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteFilter<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteFilter<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteFilter): Promise<ApiResponse<Response, Context>>
    deleteFilter<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteFilter, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteFilter<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteFilter<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteFilter, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteFilter<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteFilter, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_forecast<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_forecast<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteForecast): Promise<ApiResponse<Response, Context>>
    delete_forecast<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteForecast, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_forecast<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_forecast<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteForecast, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_forecast<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteForecast, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteForecast<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteForecast<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteForecast): Promise<ApiResponse<Response, Context>>
    deleteForecast<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteForecast, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteForecast<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteForecast<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteForecast, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteForecast<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteForecast, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_job<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_job<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteJob): Promise<ApiResponse<Response, Context>>
    delete_job<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteJob, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_job<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_job<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteJob, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_job<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteJob, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteJob<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteJob<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteJob): Promise<ApiResponse<Response, Context>>
    deleteJob<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteJob, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteJob<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteJob<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteJob, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteJob<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteJob, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_model_snapshot<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_model_snapshot<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteModelSnapshot): Promise<ApiResponse<Response, Context>>
    delete_model_snapshot<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteModelSnapshot, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_model_snapshot<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_model_snapshot<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteModelSnapshot, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_model_snapshot<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteModelSnapshot, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteModelSnapshot<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteModelSnapshot<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteModelSnapshot): Promise<ApiResponse<Response, Context>>
    deleteModelSnapshot<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteModelSnapshot, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteModelSnapshot<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteModelSnapshot<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteModelSnapshot, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteModelSnapshot<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteModelSnapshot, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_trained_model<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_trained_model<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteTrainedModel): Promise<ApiResponse<Response, Context>>
    delete_trained_model<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteTrainedModel, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_trained_model<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_trained_model<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteTrainedModel, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_trained_model<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteTrainedModel, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteTrainedModel<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteTrainedModel<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteTrainedModel): Promise<ApiResponse<Response, Context>>
    deleteTrainedModel<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteTrainedModel, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteTrainedModel<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteTrainedModel<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteTrainedModel, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteTrainedModel<Response = BodyType, Context = unknown>(params: RequestParams.MlDeleteTrainedModel, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    estimate_model_memory<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    estimate_model_memory<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEstimateModelMemory<RequestBody>): Promise<ApiResponse<Response, Context>>
    estimate_model_memory<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEstimateModelMemory<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    estimate_model_memory<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    estimate_model_memory<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEstimateModelMemory<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    estimate_model_memory<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEstimateModelMemory<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    estimateModelMemory<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    estimateModelMemory<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEstimateModelMemory<RequestBody>): Promise<ApiResponse<Response, Context>>
    estimateModelMemory<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEstimateModelMemory<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    estimateModelMemory<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    estimateModelMemory<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEstimateModelMemory<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    estimateModelMemory<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEstimateModelMemory<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    evaluate_data_frame<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    evaluate_data_frame<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEvaluateDataFrame<RequestBody>): Promise<ApiResponse<Response, Context>>
    evaluate_data_frame<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEvaluateDataFrame<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    evaluate_data_frame<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    evaluate_data_frame<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEvaluateDataFrame<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    evaluate_data_frame<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEvaluateDataFrame<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    evaluateDataFrame<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    evaluateDataFrame<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEvaluateDataFrame<RequestBody>): Promise<ApiResponse<Response, Context>>
    evaluateDataFrame<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEvaluateDataFrame<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    evaluateDataFrame<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    evaluateDataFrame<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEvaluateDataFrame<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    evaluateDataFrame<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlEvaluateDataFrame<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    explain_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    explain_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<RequestBody>): Promise<ApiResponse<Response, Context>>
    explain_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    explain_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    explain_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    explain_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    explainDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    explainDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<RequestBody>): Promise<ApiResponse<Response, Context>>
    explainDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    explainDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    explainDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    explainDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlExplainDataFrameAnalytics<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    find_file_structure<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    find_file_structure<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFindFileStructure<RequestBody>): Promise<ApiResponse<Response, Context>>
    find_file_structure<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFindFileStructure<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    find_file_structure<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    find_file_structure<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFindFileStructure<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    find_file_structure<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFindFileStructure<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    findFileStructure<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    findFileStructure<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFindFileStructure<RequestBody>): Promise<ApiResponse<Response, Context>>
    findFileStructure<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFindFileStructure<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    findFileStructure<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    findFileStructure<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFindFileStructure<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    findFileStructure<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFindFileStructure<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    flush_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    flush_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFlushJob<RequestBody>): Promise<ApiResponse<Response, Context>>
    flush_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFlushJob<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    flush_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    flush_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFlushJob<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    flush_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFlushJob<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    flushJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    flushJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFlushJob<RequestBody>): Promise<ApiResponse<Response, Context>>
    flushJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFlushJob<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    flushJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    flushJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFlushJob<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    flushJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlFlushJob<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    forecast<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    forecast<Response = BodyType, Context = unknown>(params: RequestParams.MlForecast): Promise<ApiResponse<Response, Context>>
    forecast<Response = BodyType, Context = unknown>(params: RequestParams.MlForecast, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    forecast<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    forecast<Response = BodyType, Context = unknown>(params: RequestParams.MlForecast, callback: callbackFn<Response, Context>): TransportRequestCallback
    forecast<Response = BodyType, Context = unknown>(params: RequestParams.MlForecast, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_buckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_buckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetBuckets<RequestBody>): Promise<ApiResponse<Response, Context>>
    get_buckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetBuckets<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_buckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_buckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetBuckets<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_buckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetBuckets<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getBuckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getBuckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetBuckets<RequestBody>): Promise<ApiResponse<Response, Context>>
    getBuckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetBuckets<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getBuckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getBuckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetBuckets<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    getBuckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetBuckets<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_calendar_events<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_calendar_events<Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendarEvents): Promise<ApiResponse<Response, Context>>
    get_calendar_events<Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendarEvents, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_calendar_events<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_calendar_events<Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendarEvents, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_calendar_events<Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendarEvents, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getCalendarEvents<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getCalendarEvents<Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendarEvents): Promise<ApiResponse<Response, Context>>
    getCalendarEvents<Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendarEvents, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getCalendarEvents<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getCalendarEvents<Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendarEvents, callback: callbackFn<Response, Context>): TransportRequestCallback
    getCalendarEvents<Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendarEvents, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_calendars<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_calendars<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendars<RequestBody>): Promise<ApiResponse<Response, Context>>
    get_calendars<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendars<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_calendars<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_calendars<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendars<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_calendars<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendars<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getCalendars<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getCalendars<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendars<RequestBody>): Promise<ApiResponse<Response, Context>>
    getCalendars<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendars<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getCalendars<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getCalendars<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendars<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    getCalendars<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCalendars<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_categories<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_categories<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCategories<RequestBody>): Promise<ApiResponse<Response, Context>>
    get_categories<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCategories<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_categories<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_categories<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCategories<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_categories<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCategories<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getCategories<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getCategories<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCategories<RequestBody>): Promise<ApiResponse<Response, Context>>
    getCategories<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCategories<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getCategories<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getCategories<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCategories<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    getCategories<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetCategories<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_data_frame_analytics<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_data_frame_analytics<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalytics): Promise<ApiResponse<Response, Context>>
    get_data_frame_analytics<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalytics, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_data_frame_analytics<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_data_frame_analytics<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalytics, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_data_frame_analytics<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getDataFrameAnalytics<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getDataFrameAnalytics<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalytics): Promise<ApiResponse<Response, Context>>
    getDataFrameAnalytics<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalytics, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getDataFrameAnalytics<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getDataFrameAnalytics<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalytics, callback: callbackFn<Response, Context>): TransportRequestCallback
    getDataFrameAnalytics<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_data_frame_analytics_stats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_data_frame_analytics_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats): Promise<ApiResponse<Response, Context>>
    get_data_frame_analytics_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_data_frame_analytics_stats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_data_frame_analytics_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_data_frame_analytics_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getDataFrameAnalyticsStats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getDataFrameAnalyticsStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats): Promise<ApiResponse<Response, Context>>
    getDataFrameAnalyticsStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getDataFrameAnalyticsStats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getDataFrameAnalyticsStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    getDataFrameAnalyticsStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDataFrameAnalyticsStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_datafeed_stats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_datafeed_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeedStats): Promise<ApiResponse<Response, Context>>
    get_datafeed_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeedStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_datafeed_stats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_datafeed_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeedStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_datafeed_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeedStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getDatafeedStats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getDatafeedStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeedStats): Promise<ApiResponse<Response, Context>>
    getDatafeedStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeedStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getDatafeedStats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getDatafeedStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeedStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    getDatafeedStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeedStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_datafeeds<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_datafeeds<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeeds): Promise<ApiResponse<Response, Context>>
    get_datafeeds<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeeds, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_datafeeds<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_datafeeds<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeeds, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_datafeeds<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeeds, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getDatafeeds<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getDatafeeds<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeeds): Promise<ApiResponse<Response, Context>>
    getDatafeeds<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeeds, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getDatafeeds<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getDatafeeds<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeeds, callback: callbackFn<Response, Context>): TransportRequestCallback
    getDatafeeds<Response = BodyType, Context = unknown>(params: RequestParams.MlGetDatafeeds, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_filters<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_filters<Response = BodyType, Context = unknown>(params: RequestParams.MlGetFilters): Promise<ApiResponse<Response, Context>>
    get_filters<Response = BodyType, Context = unknown>(params: RequestParams.MlGetFilters, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_filters<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_filters<Response = BodyType, Context = unknown>(params: RequestParams.MlGetFilters, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_filters<Response = BodyType, Context = unknown>(params: RequestParams.MlGetFilters, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getFilters<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getFilters<Response = BodyType, Context = unknown>(params: RequestParams.MlGetFilters): Promise<ApiResponse<Response, Context>>
    getFilters<Response = BodyType, Context = unknown>(params: RequestParams.MlGetFilters, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getFilters<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getFilters<Response = BodyType, Context = unknown>(params: RequestParams.MlGetFilters, callback: callbackFn<Response, Context>): TransportRequestCallback
    getFilters<Response = BodyType, Context = unknown>(params: RequestParams.MlGetFilters, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_influencers<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_influencers<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetInfluencers<RequestBody>): Promise<ApiResponse<Response, Context>>
    get_influencers<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetInfluencers<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_influencers<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_influencers<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetInfluencers<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_influencers<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetInfluencers<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getInfluencers<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getInfluencers<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetInfluencers<RequestBody>): Promise<ApiResponse<Response, Context>>
    getInfluencers<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetInfluencers<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getInfluencers<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getInfluencers<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetInfluencers<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    getInfluencers<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetInfluencers<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_job_stats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_job_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobStats): Promise<ApiResponse<Response, Context>>
    get_job_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_job_stats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_job_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_job_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getJobStats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getJobStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobStats): Promise<ApiResponse<Response, Context>>
    getJobStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getJobStats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getJobStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    getJobStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_jobs<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_jobs<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobs): Promise<ApiResponse<Response, Context>>
    get_jobs<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobs, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_jobs<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_jobs<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobs, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_jobs<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobs, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getJobs<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getJobs<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobs): Promise<ApiResponse<Response, Context>>
    getJobs<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobs, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getJobs<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getJobs<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobs, callback: callbackFn<Response, Context>): TransportRequestCallback
    getJobs<Response = BodyType, Context = unknown>(params: RequestParams.MlGetJobs, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_model_snapshots<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_model_snapshots<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetModelSnapshots<RequestBody>): Promise<ApiResponse<Response, Context>>
    get_model_snapshots<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetModelSnapshots<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_model_snapshots<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_model_snapshots<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetModelSnapshots<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_model_snapshots<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetModelSnapshots<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getModelSnapshots<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getModelSnapshots<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetModelSnapshots<RequestBody>): Promise<ApiResponse<Response, Context>>
    getModelSnapshots<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetModelSnapshots<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getModelSnapshots<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getModelSnapshots<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetModelSnapshots<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    getModelSnapshots<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetModelSnapshots<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_overall_buckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_overall_buckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetOverallBuckets<RequestBody>): Promise<ApiResponse<Response, Context>>
    get_overall_buckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetOverallBuckets<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_overall_buckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_overall_buckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetOverallBuckets<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_overall_buckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetOverallBuckets<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getOverallBuckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getOverallBuckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetOverallBuckets<RequestBody>): Promise<ApiResponse<Response, Context>>
    getOverallBuckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetOverallBuckets<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getOverallBuckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getOverallBuckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetOverallBuckets<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    getOverallBuckets<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetOverallBuckets<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_records<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_records<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetRecords<RequestBody>): Promise<ApiResponse<Response, Context>>
    get_records<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetRecords<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_records<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_records<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetRecords<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_records<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetRecords<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getRecords<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getRecords<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetRecords<RequestBody>): Promise<ApiResponse<Response, Context>>
    getRecords<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetRecords<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getRecords<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getRecords<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetRecords<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    getRecords<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlGetRecords<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_trained_models<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_trained_models<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModels): Promise<ApiResponse<Response, Context>>
    get_trained_models<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModels, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_trained_models<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_trained_models<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModels, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_trained_models<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModels, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTrainedModels<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getTrainedModels<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModels): Promise<ApiResponse<Response, Context>>
    getTrainedModels<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModels, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getTrainedModels<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getTrainedModels<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModels, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTrainedModels<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModels, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_trained_models_stats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_trained_models_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModelsStats): Promise<ApiResponse<Response, Context>>
    get_trained_models_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModelsStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_trained_models_stats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_trained_models_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModelsStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_trained_models_stats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModelsStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTrainedModelsStats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getTrainedModelsStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModelsStats): Promise<ApiResponse<Response, Context>>
    getTrainedModelsStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModelsStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getTrainedModelsStats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getTrainedModelsStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModelsStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTrainedModelsStats<Response = BodyType, Context = unknown>(params: RequestParams.MlGetTrainedModelsStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    info<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    info<Response = BodyType, Context = unknown>(params: RequestParams.MlInfo): Promise<ApiResponse<Response, Context>>
    info<Response = BodyType, Context = unknown>(params: RequestParams.MlInfo, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    info<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    info<Response = BodyType, Context = unknown>(params: RequestParams.MlInfo, callback: callbackFn<Response, Context>): TransportRequestCallback
    info<Response = BodyType, Context = unknown>(params: RequestParams.MlInfo, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    open_job<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    open_job<Response = BodyType, Context = unknown>(params: RequestParams.MlOpenJob): Promise<ApiResponse<Response, Context>>
    open_job<Response = BodyType, Context = unknown>(params: RequestParams.MlOpenJob, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    open_job<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    open_job<Response = BodyType, Context = unknown>(params: RequestParams.MlOpenJob, callback: callbackFn<Response, Context>): TransportRequestCallback
    open_job<Response = BodyType, Context = unknown>(params: RequestParams.MlOpenJob, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    openJob<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    openJob<Response = BodyType, Context = unknown>(params: RequestParams.MlOpenJob): Promise<ApiResponse<Response, Context>>
    openJob<Response = BodyType, Context = unknown>(params: RequestParams.MlOpenJob, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    openJob<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    openJob<Response = BodyType, Context = unknown>(params: RequestParams.MlOpenJob, callback: callbackFn<Response, Context>): TransportRequestCallback
    openJob<Response = BodyType, Context = unknown>(params: RequestParams.MlOpenJob, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    post_calendar_events<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    post_calendar_events<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostCalendarEvents<RequestBody>): Promise<ApiResponse<Response, Context>>
    post_calendar_events<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostCalendarEvents<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    post_calendar_events<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    post_calendar_events<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostCalendarEvents<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    post_calendar_events<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostCalendarEvents<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    postCalendarEvents<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    postCalendarEvents<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostCalendarEvents<RequestBody>): Promise<ApiResponse<Response, Context>>
    postCalendarEvents<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostCalendarEvents<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    postCalendarEvents<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    postCalendarEvents<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostCalendarEvents<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    postCalendarEvents<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostCalendarEvents<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    post_data<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    post_data<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostData<RequestBody>): Promise<ApiResponse<Response, Context>>
    post_data<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostData<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    post_data<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    post_data<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostData<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    post_data<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostData<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    postData<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    postData<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostData<RequestBody>): Promise<ApiResponse<Response, Context>>
    postData<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostData<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    postData<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    postData<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostData<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    postData<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPostData<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    preview_datafeed<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    preview_datafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlPreviewDatafeed): Promise<ApiResponse<Response, Context>>
    preview_datafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlPreviewDatafeed, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    preview_datafeed<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    preview_datafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlPreviewDatafeed, callback: callbackFn<Response, Context>): TransportRequestCallback
    preview_datafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlPreviewDatafeed, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    previewDatafeed<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    previewDatafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlPreviewDatafeed): Promise<ApiResponse<Response, Context>>
    previewDatafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlPreviewDatafeed, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    previewDatafeed<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    previewDatafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlPreviewDatafeed, callback: callbackFn<Response, Context>): TransportRequestCallback
    previewDatafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlPreviewDatafeed, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_calendar<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_calendar<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendar<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_calendar<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendar<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_calendar<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_calendar<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendar<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_calendar<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendar<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putCalendar<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putCalendar<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendar<RequestBody>): Promise<ApiResponse<Response, Context>>
    putCalendar<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendar<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putCalendar<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putCalendar<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendar<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putCalendar<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendar<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_calendar_job<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_calendar_job<Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendarJob): Promise<ApiResponse<Response, Context>>
    put_calendar_job<Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendarJob, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_calendar_job<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_calendar_job<Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendarJob, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_calendar_job<Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendarJob, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putCalendarJob<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putCalendarJob<Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendarJob): Promise<ApiResponse<Response, Context>>
    putCalendarJob<Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendarJob, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putCalendarJob<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putCalendarJob<Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendarJob, callback: callbackFn<Response, Context>): TransportRequestCallback
    putCalendarJob<Response = BodyType, Context = unknown>(params: RequestParams.MlPutCalendarJob, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDataFrameAnalytics<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDataFrameAnalytics<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDataFrameAnalytics<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDataFrameAnalytics<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDataFrameAnalytics<RequestBody>): Promise<ApiResponse<Response, Context>>
    putDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDataFrameAnalytics<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDataFrameAnalytics<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDataFrameAnalytics<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDatafeed<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDatafeed<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDatafeed<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDatafeed<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDatafeed<RequestBody>): Promise<ApiResponse<Response, Context>>
    putDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDatafeed<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDatafeed<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutDatafeed<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_filter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_filter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutFilter<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_filter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutFilter<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_filter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_filter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutFilter<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_filter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutFilter<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putFilter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putFilter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutFilter<RequestBody>): Promise<ApiResponse<Response, Context>>
    putFilter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutFilter<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putFilter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putFilter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutFilter<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putFilter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutFilter<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutJob<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutJob<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutJob<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutJob<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutJob<RequestBody>): Promise<ApiResponse<Response, Context>>
    putJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutJob<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutJob<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutJob<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_trained_model<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_trained_model<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutTrainedModel<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_trained_model<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutTrainedModel<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_trained_model<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_trained_model<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutTrainedModel<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_trained_model<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutTrainedModel<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putTrainedModel<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putTrainedModel<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutTrainedModel<RequestBody>): Promise<ApiResponse<Response, Context>>
    putTrainedModel<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutTrainedModel<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putTrainedModel<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putTrainedModel<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutTrainedModel<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putTrainedModel<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlPutTrainedModel<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    revert_model_snapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    revert_model_snapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlRevertModelSnapshot<RequestBody>): Promise<ApiResponse<Response, Context>>
    revert_model_snapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlRevertModelSnapshot<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    revert_model_snapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    revert_model_snapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlRevertModelSnapshot<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    revert_model_snapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlRevertModelSnapshot<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    revertModelSnapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    revertModelSnapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlRevertModelSnapshot<RequestBody>): Promise<ApiResponse<Response, Context>>
    revertModelSnapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlRevertModelSnapshot<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    revertModelSnapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    revertModelSnapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlRevertModelSnapshot<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    revertModelSnapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlRevertModelSnapshot<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    set_upgrade_mode<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    set_upgrade_mode<Response = BodyType, Context = unknown>(params: RequestParams.MlSetUpgradeMode): Promise<ApiResponse<Response, Context>>
    set_upgrade_mode<Response = BodyType, Context = unknown>(params: RequestParams.MlSetUpgradeMode, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    set_upgrade_mode<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    set_upgrade_mode<Response = BodyType, Context = unknown>(params: RequestParams.MlSetUpgradeMode, callback: callbackFn<Response, Context>): TransportRequestCallback
    set_upgrade_mode<Response = BodyType, Context = unknown>(params: RequestParams.MlSetUpgradeMode, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    setUpgradeMode<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    setUpgradeMode<Response = BodyType, Context = unknown>(params: RequestParams.MlSetUpgradeMode): Promise<ApiResponse<Response, Context>>
    setUpgradeMode<Response = BodyType, Context = unknown>(params: RequestParams.MlSetUpgradeMode, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    setUpgradeMode<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    setUpgradeMode<Response = BodyType, Context = unknown>(params: RequestParams.MlSetUpgradeMode, callback: callbackFn<Response, Context>): TransportRequestCallback
    setUpgradeMode<Response = BodyType, Context = unknown>(params: RequestParams.MlSetUpgradeMode, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    start_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    start_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDataFrameAnalytics<RequestBody>): Promise<ApiResponse<Response, Context>>
    start_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDataFrameAnalytics<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    start_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    start_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDataFrameAnalytics<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    start_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDataFrameAnalytics<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    startDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    startDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDataFrameAnalytics<RequestBody>): Promise<ApiResponse<Response, Context>>
    startDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDataFrameAnalytics<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    startDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    startDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDataFrameAnalytics<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    startDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDataFrameAnalytics<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    start_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    start_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDatafeed<RequestBody>): Promise<ApiResponse<Response, Context>>
    start_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDatafeed<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    start_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    start_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDatafeed<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    start_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDatafeed<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    startDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    startDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDatafeed<RequestBody>): Promise<ApiResponse<Response, Context>>
    startDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDatafeed<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    startDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    startDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDatafeed<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    startDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStartDatafeed<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stop_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStopDataFrameAnalytics<RequestBody>): Promise<ApiResponse<Response, Context>>
    stop_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStopDataFrameAnalytics<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stop_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStopDataFrameAnalytics<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_data_frame_analytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStopDataFrameAnalytics<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stopDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stopDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStopDataFrameAnalytics<RequestBody>): Promise<ApiResponse<Response, Context>>
    stopDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStopDataFrameAnalytics<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stopDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stopDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStopDataFrameAnalytics<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    stopDataFrameAnalytics<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlStopDataFrameAnalytics<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_datafeed<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stop_datafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlStopDatafeed): Promise<ApiResponse<Response, Context>>
    stop_datafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlStopDatafeed, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stop_datafeed<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_datafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlStopDatafeed, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_datafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlStopDatafeed, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stopDatafeed<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stopDatafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlStopDatafeed): Promise<ApiResponse<Response, Context>>
    stopDatafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlStopDatafeed, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stopDatafeed<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stopDatafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlStopDatafeed, callback: callbackFn<Response, Context>): TransportRequestCallback
    stopDatafeed<Response = BodyType, Context = unknown>(params: RequestParams.MlStopDatafeed, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    update_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateDatafeed<RequestBody>): Promise<ApiResponse<Response, Context>>
    update_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateDatafeed<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    update_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    update_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateDatafeed<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_datafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateDatafeed<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    updateDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateDatafeed<RequestBody>): Promise<ApiResponse<Response, Context>>
    updateDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateDatafeed<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    updateDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    updateDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateDatafeed<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateDatafeed<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateDatafeed<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_filter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    update_filter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateFilter<RequestBody>): Promise<ApiResponse<Response, Context>>
    update_filter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateFilter<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    update_filter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    update_filter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateFilter<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_filter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateFilter<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateFilter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    updateFilter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateFilter<RequestBody>): Promise<ApiResponse<Response, Context>>
    updateFilter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateFilter<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    updateFilter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    updateFilter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateFilter<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateFilter<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateFilter<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    update_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateJob<RequestBody>): Promise<ApiResponse<Response, Context>>
    update_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateJob<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    update_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    update_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateJob<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateJob<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    updateJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateJob<RequestBody>): Promise<ApiResponse<Response, Context>>
    updateJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateJob<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    updateJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    updateJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateJob<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateJob<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_model_snapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    update_model_snapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateModelSnapshot<RequestBody>): Promise<ApiResponse<Response, Context>>
    update_model_snapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateModelSnapshot<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    update_model_snapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    update_model_snapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateModelSnapshot<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_model_snapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateModelSnapshot<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateModelSnapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    updateModelSnapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateModelSnapshot<RequestBody>): Promise<ApiResponse<Response, Context>>
    updateModelSnapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateModelSnapshot<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    updateModelSnapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    updateModelSnapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateModelSnapshot<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateModelSnapshot<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlUpdateModelSnapshot<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    validate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    validate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlValidate<RequestBody>): Promise<ApiResponse<Response, Context>>
    validate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlValidate<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    validate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    validate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlValidate<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    validate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlValidate<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    validate_detector<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    validate_detector<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlValidateDetector<RequestBody>): Promise<ApiResponse<Response, Context>>
    validate_detector<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlValidateDetector<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    validate_detector<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    validate_detector<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlValidateDetector<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    validate_detector<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlValidateDetector<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    validateDetector<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    validateDetector<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlValidateDetector<RequestBody>): Promise<ApiResponse<Response, Context>>
    validateDetector<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlValidateDetector<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    validateDetector<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    validateDetector<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlValidateDetector<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    validateDetector<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.MlValidateDetector<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  monitoring: {
    bulk<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    bulk<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MonitoringBulk<RequestBody>): Promise<ApiResponse<Response, Context>>
    bulk<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MonitoringBulk<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    bulk<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    bulk<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MonitoringBulk<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    bulk<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MonitoringBulk<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  msearch<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  msearch<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.Msearch<RequestBody>): Promise<ApiResponse<Response, Context>>
  msearch<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.Msearch<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  msearch<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  msearch<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.Msearch<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  msearch<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.Msearch<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  msearch_template<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  msearch_template<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MsearchTemplate<RequestBody>): Promise<ApiResponse<Response, Context>>
  msearch_template<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MsearchTemplate<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  msearch_template<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  msearch_template<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MsearchTemplate<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  msearch_template<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MsearchTemplate<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  msearchTemplate<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  msearchTemplate<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MsearchTemplate<RequestBody>): Promise<ApiResponse<Response, Context>>
  msearchTemplate<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MsearchTemplate<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  msearchTemplate<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  msearchTemplate<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MsearchTemplate<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  msearchTemplate<RequestBody extends NDBodyType, Response = BodyType, Context = unknown>(params: RequestParams.MsearchTemplate<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  mtermvectors<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  mtermvectors<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Mtermvectors<RequestBody>): Promise<ApiResponse<Response, Context>>
  mtermvectors<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Mtermvectors<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  mtermvectors<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  mtermvectors<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Mtermvectors<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  mtermvectors<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Mtermvectors<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  nodes: {
    hot_threads<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    hot_threads<Response = BodyType, Context = unknown>(params: RequestParams.NodesHotThreads): Promise<ApiResponse<Response, Context>>
    hot_threads<Response = BodyType, Context = unknown>(params: RequestParams.NodesHotThreads, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    hot_threads<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    hot_threads<Response = BodyType, Context = unknown>(params: RequestParams.NodesHotThreads, callback: callbackFn<Response, Context>): TransportRequestCallback
    hot_threads<Response = BodyType, Context = unknown>(params: RequestParams.NodesHotThreads, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    hotThreads<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    hotThreads<Response = BodyType, Context = unknown>(params: RequestParams.NodesHotThreads): Promise<ApiResponse<Response, Context>>
    hotThreads<Response = BodyType, Context = unknown>(params: RequestParams.NodesHotThreads, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    hotThreads<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    hotThreads<Response = BodyType, Context = unknown>(params: RequestParams.NodesHotThreads, callback: callbackFn<Response, Context>): TransportRequestCallback
    hotThreads<Response = BodyType, Context = unknown>(params: RequestParams.NodesHotThreads, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    info<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    info<Response = BodyType, Context = unknown>(params: RequestParams.NodesInfo): Promise<ApiResponse<Response, Context>>
    info<Response = BodyType, Context = unknown>(params: RequestParams.NodesInfo, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    info<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    info<Response = BodyType, Context = unknown>(params: RequestParams.NodesInfo, callback: callbackFn<Response, Context>): TransportRequestCallback
    info<Response = BodyType, Context = unknown>(params: RequestParams.NodesInfo, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    reload_secure_settings<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    reload_secure_settings<Response = BodyType, Context = unknown>(params: RequestParams.NodesReloadSecureSettings): Promise<ApiResponse<Response, Context>>
    reload_secure_settings<Response = BodyType, Context = unknown>(params: RequestParams.NodesReloadSecureSettings, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    reload_secure_settings<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    reload_secure_settings<Response = BodyType, Context = unknown>(params: RequestParams.NodesReloadSecureSettings, callback: callbackFn<Response, Context>): TransportRequestCallback
    reload_secure_settings<Response = BodyType, Context = unknown>(params: RequestParams.NodesReloadSecureSettings, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    reloadSecureSettings<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    reloadSecureSettings<Response = BodyType, Context = unknown>(params: RequestParams.NodesReloadSecureSettings): Promise<ApiResponse<Response, Context>>
    reloadSecureSettings<Response = BodyType, Context = unknown>(params: RequestParams.NodesReloadSecureSettings, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    reloadSecureSettings<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    reloadSecureSettings<Response = BodyType, Context = unknown>(params: RequestParams.NodesReloadSecureSettings, callback: callbackFn<Response, Context>): TransportRequestCallback
    reloadSecureSettings<Response = BodyType, Context = unknown>(params: RequestParams.NodesReloadSecureSettings, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(params: RequestParams.NodesStats): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(params: RequestParams.NodesStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(params: RequestParams.NodesStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(params: RequestParams.NodesStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    usage<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    usage<Response = BodyType, Context = unknown>(params: RequestParams.NodesUsage): Promise<ApiResponse<Response, Context>>
    usage<Response = BodyType, Context = unknown>(params: RequestParams.NodesUsage, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    usage<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    usage<Response = BodyType, Context = unknown>(params: RequestParams.NodesUsage, callback: callbackFn<Response, Context>): TransportRequestCallback
    usage<Response = BodyType, Context = unknown>(params: RequestParams.NodesUsage, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  ping<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  ping<Response = BodyType, Context = unknown>(params: RequestParams.Ping): Promise<ApiResponse<Response, Context>>
  ping<Response = BodyType, Context = unknown>(params: RequestParams.Ping, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  ping<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  ping<Response = BodyType, Context = unknown>(params: RequestParams.Ping, callback: callbackFn<Response, Context>): TransportRequestCallback
  ping<Response = BodyType, Context = unknown>(params: RequestParams.Ping, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  put_script<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  put_script<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.PutScript<RequestBody>): Promise<ApiResponse<Response, Context>>
  put_script<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.PutScript<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  put_script<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  put_script<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.PutScript<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  put_script<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.PutScript<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  putScript<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  putScript<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.PutScript<RequestBody>): Promise<ApiResponse<Response, Context>>
  putScript<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.PutScript<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  putScript<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  putScript<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.PutScript<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  putScript<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.PutScript<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  rank_eval<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  rank_eval<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RankEval<RequestBody>): Promise<ApiResponse<Response, Context>>
  rank_eval<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RankEval<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  rank_eval<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  rank_eval<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RankEval<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  rank_eval<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RankEval<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  rankEval<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  rankEval<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RankEval<RequestBody>): Promise<ApiResponse<Response, Context>>
  rankEval<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RankEval<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  rankEval<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  rankEval<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RankEval<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  rankEval<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RankEval<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  reindex<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  reindex<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Reindex<RequestBody>): Promise<ApiResponse<Response, Context>>
  reindex<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Reindex<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  reindex<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  reindex<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Reindex<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  reindex<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Reindex<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  reindex_rethrottle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  reindex_rethrottle<Response = BodyType, Context = unknown>(params: RequestParams.ReindexRethrottle): Promise<ApiResponse<Response, Context>>
  reindex_rethrottle<Response = BodyType, Context = unknown>(params: RequestParams.ReindexRethrottle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  reindex_rethrottle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  reindex_rethrottle<Response = BodyType, Context = unknown>(params: RequestParams.ReindexRethrottle, callback: callbackFn<Response, Context>): TransportRequestCallback
  reindex_rethrottle<Response = BodyType, Context = unknown>(params: RequestParams.ReindexRethrottle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  reindexRethrottle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  reindexRethrottle<Response = BodyType, Context = unknown>(params: RequestParams.ReindexRethrottle): Promise<ApiResponse<Response, Context>>
  reindexRethrottle<Response = BodyType, Context = unknown>(params: RequestParams.ReindexRethrottle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  reindexRethrottle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  reindexRethrottle<Response = BodyType, Context = unknown>(params: RequestParams.ReindexRethrottle, callback: callbackFn<Response, Context>): TransportRequestCallback
  reindexRethrottle<Response = BodyType, Context = unknown>(params: RequestParams.ReindexRethrottle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  render_search_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  render_search_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RenderSearchTemplate<RequestBody>): Promise<ApiResponse<Response, Context>>
  render_search_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RenderSearchTemplate<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  render_search_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  render_search_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RenderSearchTemplate<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  render_search_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RenderSearchTemplate<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  renderSearchTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  renderSearchTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RenderSearchTemplate<RequestBody>): Promise<ApiResponse<Response, Context>>
  renderSearchTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RenderSearchTemplate<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  renderSearchTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  renderSearchTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RenderSearchTemplate<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  renderSearchTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RenderSearchTemplate<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  rollup: {
    delete_job<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_job<Response = BodyType, Context = unknown>(params: RequestParams.RollupDeleteJob): Promise<ApiResponse<Response, Context>>
    delete_job<Response = BodyType, Context = unknown>(params: RequestParams.RollupDeleteJob, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_job<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_job<Response = BodyType, Context = unknown>(params: RequestParams.RollupDeleteJob, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_job<Response = BodyType, Context = unknown>(params: RequestParams.RollupDeleteJob, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteJob<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteJob<Response = BodyType, Context = unknown>(params: RequestParams.RollupDeleteJob): Promise<ApiResponse<Response, Context>>
    deleteJob<Response = BodyType, Context = unknown>(params: RequestParams.RollupDeleteJob, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteJob<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteJob<Response = BodyType, Context = unknown>(params: RequestParams.RollupDeleteJob, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteJob<Response = BodyType, Context = unknown>(params: RequestParams.RollupDeleteJob, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_jobs<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_jobs<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetJobs): Promise<ApiResponse<Response, Context>>
    get_jobs<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetJobs, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_jobs<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_jobs<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetJobs, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_jobs<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetJobs, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getJobs<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getJobs<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetJobs): Promise<ApiResponse<Response, Context>>
    getJobs<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetJobs, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getJobs<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getJobs<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetJobs, callback: callbackFn<Response, Context>): TransportRequestCallback
    getJobs<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetJobs, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_rollup_caps<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_rollup_caps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupCaps): Promise<ApiResponse<Response, Context>>
    get_rollup_caps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupCaps, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_rollup_caps<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_rollup_caps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupCaps, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_rollup_caps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupCaps, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getRollupCaps<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getRollupCaps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupCaps): Promise<ApiResponse<Response, Context>>
    getRollupCaps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupCaps, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getRollupCaps<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getRollupCaps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupCaps, callback: callbackFn<Response, Context>): TransportRequestCallback
    getRollupCaps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupCaps, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_rollup_index_caps<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_rollup_index_caps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupIndexCaps): Promise<ApiResponse<Response, Context>>
    get_rollup_index_caps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupIndexCaps, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_rollup_index_caps<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_rollup_index_caps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupIndexCaps, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_rollup_index_caps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupIndexCaps, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getRollupIndexCaps<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getRollupIndexCaps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupIndexCaps): Promise<ApiResponse<Response, Context>>
    getRollupIndexCaps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupIndexCaps, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getRollupIndexCaps<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getRollupIndexCaps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupIndexCaps, callback: callbackFn<Response, Context>): TransportRequestCallback
    getRollupIndexCaps<Response = BodyType, Context = unknown>(params: RequestParams.RollupGetRollupIndexCaps, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupPutJob<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupPutJob<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupPutJob<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_job<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupPutJob<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupPutJob<RequestBody>): Promise<ApiResponse<Response, Context>>
    putJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupPutJob<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupPutJob<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putJob<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupPutJob<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    rollup_search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    rollup_search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupRollupSearch<RequestBody>): Promise<ApiResponse<Response, Context>>
    rollup_search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupRollupSearch<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    rollup_search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    rollup_search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupRollupSearch<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    rollup_search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupRollupSearch<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    rollupSearch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    rollupSearch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupRollupSearch<RequestBody>): Promise<ApiResponse<Response, Context>>
    rollupSearch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupRollupSearch<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    rollupSearch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    rollupSearch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupRollupSearch<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    rollupSearch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.RollupRollupSearch<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    start_job<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    start_job<Response = BodyType, Context = unknown>(params: RequestParams.RollupStartJob): Promise<ApiResponse<Response, Context>>
    start_job<Response = BodyType, Context = unknown>(params: RequestParams.RollupStartJob, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    start_job<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    start_job<Response = BodyType, Context = unknown>(params: RequestParams.RollupStartJob, callback: callbackFn<Response, Context>): TransportRequestCallback
    start_job<Response = BodyType, Context = unknown>(params: RequestParams.RollupStartJob, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    startJob<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    startJob<Response = BodyType, Context = unknown>(params: RequestParams.RollupStartJob): Promise<ApiResponse<Response, Context>>
    startJob<Response = BodyType, Context = unknown>(params: RequestParams.RollupStartJob, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    startJob<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    startJob<Response = BodyType, Context = unknown>(params: RequestParams.RollupStartJob, callback: callbackFn<Response, Context>): TransportRequestCallback
    startJob<Response = BodyType, Context = unknown>(params: RequestParams.RollupStartJob, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_job<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stop_job<Response = BodyType, Context = unknown>(params: RequestParams.RollupStopJob): Promise<ApiResponse<Response, Context>>
    stop_job<Response = BodyType, Context = unknown>(params: RequestParams.RollupStopJob, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stop_job<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_job<Response = BodyType, Context = unknown>(params: RequestParams.RollupStopJob, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_job<Response = BodyType, Context = unknown>(params: RequestParams.RollupStopJob, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stopJob<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stopJob<Response = BodyType, Context = unknown>(params: RequestParams.RollupStopJob): Promise<ApiResponse<Response, Context>>
    stopJob<Response = BodyType, Context = unknown>(params: RequestParams.RollupStopJob, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stopJob<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stopJob<Response = BodyType, Context = unknown>(params: RequestParams.RollupStopJob, callback: callbackFn<Response, Context>): TransportRequestCallback
    stopJob<Response = BodyType, Context = unknown>(params: RequestParams.RollupStopJob, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  scripts_painless_execute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  scripts_painless_execute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ScriptsPainlessExecute<RequestBody>): Promise<ApiResponse<Response, Context>>
  scripts_painless_execute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ScriptsPainlessExecute<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  scripts_painless_execute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  scripts_painless_execute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ScriptsPainlessExecute<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  scripts_painless_execute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ScriptsPainlessExecute<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  scriptsPainlessExecute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  scriptsPainlessExecute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ScriptsPainlessExecute<RequestBody>): Promise<ApiResponse<Response, Context>>
  scriptsPainlessExecute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ScriptsPainlessExecute<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  scriptsPainlessExecute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  scriptsPainlessExecute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ScriptsPainlessExecute<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  scriptsPainlessExecute<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.ScriptsPainlessExecute<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  scroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  scroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Scroll<RequestBody>): Promise<ApiResponse<Response, Context>>
  scroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Scroll<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  scroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  scroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Scroll<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  scroll<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Scroll<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Search<RequestBody>): Promise<ApiResponse<Response, Context>>
  search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Search<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Search<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  search<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Search<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  search_shards<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  search_shards<Response = BodyType, Context = unknown>(params: RequestParams.SearchShards): Promise<ApiResponse<Response, Context>>
  search_shards<Response = BodyType, Context = unknown>(params: RequestParams.SearchShards, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  search_shards<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  search_shards<Response = BodyType, Context = unknown>(params: RequestParams.SearchShards, callback: callbackFn<Response, Context>): TransportRequestCallback
  search_shards<Response = BodyType, Context = unknown>(params: RequestParams.SearchShards, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  searchShards<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  searchShards<Response = BodyType, Context = unknown>(params: RequestParams.SearchShards): Promise<ApiResponse<Response, Context>>
  searchShards<Response = BodyType, Context = unknown>(params: RequestParams.SearchShards, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  searchShards<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  searchShards<Response = BodyType, Context = unknown>(params: RequestParams.SearchShards, callback: callbackFn<Response, Context>): TransportRequestCallback
  searchShards<Response = BodyType, Context = unknown>(params: RequestParams.SearchShards, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  search_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  search_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SearchTemplate<RequestBody>): Promise<ApiResponse<Response, Context>>
  search_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SearchTemplate<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  search_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  search_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SearchTemplate<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  search_template<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SearchTemplate<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  searchTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  searchTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SearchTemplate<RequestBody>): Promise<ApiResponse<Response, Context>>
  searchTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SearchTemplate<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  searchTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  searchTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SearchTemplate<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  searchTemplate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SearchTemplate<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  security: {
    authenticate<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    authenticate<Response = BodyType, Context = unknown>(params: RequestParams.SecurityAuthenticate): Promise<ApiResponse<Response, Context>>
    authenticate<Response = BodyType, Context = unknown>(params: RequestParams.SecurityAuthenticate, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    authenticate<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    authenticate<Response = BodyType, Context = unknown>(params: RequestParams.SecurityAuthenticate, callback: callbackFn<Response, Context>): TransportRequestCallback
    authenticate<Response = BodyType, Context = unknown>(params: RequestParams.SecurityAuthenticate, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    change_password<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    change_password<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityChangePassword<RequestBody>): Promise<ApiResponse<Response, Context>>
    change_password<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityChangePassword<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    change_password<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    change_password<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityChangePassword<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    change_password<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityChangePassword<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    changePassword<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    changePassword<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityChangePassword<RequestBody>): Promise<ApiResponse<Response, Context>>
    changePassword<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityChangePassword<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    changePassword<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    changePassword<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityChangePassword<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    changePassword<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityChangePassword<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    clear_cached_realms<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    clear_cached_realms<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRealms): Promise<ApiResponse<Response, Context>>
    clear_cached_realms<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRealms, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    clear_cached_realms<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    clear_cached_realms<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRealms, callback: callbackFn<Response, Context>): TransportRequestCallback
    clear_cached_realms<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRealms, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    clearCachedRealms<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    clearCachedRealms<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRealms): Promise<ApiResponse<Response, Context>>
    clearCachedRealms<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRealms, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    clearCachedRealms<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    clearCachedRealms<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRealms, callback: callbackFn<Response, Context>): TransportRequestCallback
    clearCachedRealms<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRealms, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    clear_cached_roles<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    clear_cached_roles<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRoles): Promise<ApiResponse<Response, Context>>
    clear_cached_roles<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRoles, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    clear_cached_roles<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    clear_cached_roles<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRoles, callback: callbackFn<Response, Context>): TransportRequestCallback
    clear_cached_roles<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRoles, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    clearCachedRoles<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    clearCachedRoles<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRoles): Promise<ApiResponse<Response, Context>>
    clearCachedRoles<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRoles, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    clearCachedRoles<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    clearCachedRoles<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRoles, callback: callbackFn<Response, Context>): TransportRequestCallback
    clearCachedRoles<Response = BodyType, Context = unknown>(params: RequestParams.SecurityClearCachedRoles, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    create_api_key<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    create_api_key<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityCreateApiKey<RequestBody>): Promise<ApiResponse<Response, Context>>
    create_api_key<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityCreateApiKey<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    create_api_key<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    create_api_key<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityCreateApiKey<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    create_api_key<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityCreateApiKey<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    createApiKey<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    createApiKey<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityCreateApiKey<RequestBody>): Promise<ApiResponse<Response, Context>>
    createApiKey<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityCreateApiKey<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    createApiKey<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    createApiKey<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityCreateApiKey<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    createApiKey<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityCreateApiKey<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_privileges<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeletePrivileges): Promise<ApiResponse<Response, Context>>
    delete_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeletePrivileges, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_privileges<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeletePrivileges, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeletePrivileges, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deletePrivileges<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deletePrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeletePrivileges): Promise<ApiResponse<Response, Context>>
    deletePrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeletePrivileges, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deletePrivileges<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deletePrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeletePrivileges, callback: callbackFn<Response, Context>): TransportRequestCallback
    deletePrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeletePrivileges, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_role<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_role<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRole): Promise<ApiResponse<Response, Context>>
    delete_role<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRole, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_role<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_role<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRole, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_role<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRole, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteRole<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteRole<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRole): Promise<ApiResponse<Response, Context>>
    deleteRole<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRole, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteRole<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteRole<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRole, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteRole<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRole, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_role_mapping<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_role_mapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRoleMapping): Promise<ApiResponse<Response, Context>>
    delete_role_mapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRoleMapping, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_role_mapping<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_role_mapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRoleMapping, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_role_mapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRoleMapping, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteRoleMapping<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteRoleMapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRoleMapping): Promise<ApiResponse<Response, Context>>
    deleteRoleMapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRoleMapping, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteRoleMapping<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteRoleMapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRoleMapping, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteRoleMapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteRoleMapping, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_user<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteUser): Promise<ApiResponse<Response, Context>>
    delete_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteUser, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_user<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteUser, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteUser, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteUser<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteUser): Promise<ApiResponse<Response, Context>>
    deleteUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteUser, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteUser<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteUser, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDeleteUser, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    disable_user<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    disable_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDisableUser): Promise<ApiResponse<Response, Context>>
    disable_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDisableUser, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    disable_user<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    disable_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDisableUser, callback: callbackFn<Response, Context>): TransportRequestCallback
    disable_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDisableUser, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    disableUser<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    disableUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDisableUser): Promise<ApiResponse<Response, Context>>
    disableUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDisableUser, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    disableUser<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    disableUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDisableUser, callback: callbackFn<Response, Context>): TransportRequestCallback
    disableUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityDisableUser, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    enable_user<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    enable_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityEnableUser): Promise<ApiResponse<Response, Context>>
    enable_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityEnableUser, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    enable_user<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    enable_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityEnableUser, callback: callbackFn<Response, Context>): TransportRequestCallback
    enable_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityEnableUser, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    enableUser<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    enableUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityEnableUser): Promise<ApiResponse<Response, Context>>
    enableUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityEnableUser, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    enableUser<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    enableUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityEnableUser, callback: callbackFn<Response, Context>): TransportRequestCallback
    enableUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityEnableUser, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_api_key<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_api_key<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetApiKey): Promise<ApiResponse<Response, Context>>
    get_api_key<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetApiKey, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_api_key<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_api_key<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetApiKey, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_api_key<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetApiKey, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getApiKey<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getApiKey<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetApiKey): Promise<ApiResponse<Response, Context>>
    getApiKey<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetApiKey, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getApiKey<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getApiKey<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetApiKey, callback: callbackFn<Response, Context>): TransportRequestCallback
    getApiKey<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetApiKey, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_builtin_privileges<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_builtin_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges): Promise<ApiResponse<Response, Context>>
    get_builtin_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_builtin_privileges<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_builtin_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_builtin_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getBuiltinPrivileges<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getBuiltinPrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges): Promise<ApiResponse<Response, Context>>
    getBuiltinPrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getBuiltinPrivileges<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getBuiltinPrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges, callback: callbackFn<Response, Context>): TransportRequestCallback
    getBuiltinPrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetBuiltinPrivileges, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_privileges<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetPrivileges): Promise<ApiResponse<Response, Context>>
    get_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetPrivileges, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_privileges<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetPrivileges, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetPrivileges, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getPrivileges<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getPrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetPrivileges): Promise<ApiResponse<Response, Context>>
    getPrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetPrivileges, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getPrivileges<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getPrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetPrivileges, callback: callbackFn<Response, Context>): TransportRequestCallback
    getPrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetPrivileges, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_role<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_role<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRole): Promise<ApiResponse<Response, Context>>
    get_role<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRole, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_role<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_role<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRole, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_role<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRole, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getRole<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getRole<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRole): Promise<ApiResponse<Response, Context>>
    getRole<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRole, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getRole<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getRole<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRole, callback: callbackFn<Response, Context>): TransportRequestCallback
    getRole<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRole, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_role_mapping<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_role_mapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRoleMapping): Promise<ApiResponse<Response, Context>>
    get_role_mapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRoleMapping, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_role_mapping<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_role_mapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRoleMapping, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_role_mapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRoleMapping, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getRoleMapping<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getRoleMapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRoleMapping): Promise<ApiResponse<Response, Context>>
    getRoleMapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRoleMapping, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getRoleMapping<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getRoleMapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRoleMapping, callback: callbackFn<Response, Context>): TransportRequestCallback
    getRoleMapping<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetRoleMapping, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_token<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_token<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetToken<RequestBody>): Promise<ApiResponse<Response, Context>>
    get_token<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetToken<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_token<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_token<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetToken<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_token<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetToken<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getToken<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getToken<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetToken<RequestBody>): Promise<ApiResponse<Response, Context>>
    getToken<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetToken<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getToken<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getToken<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetToken<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    getToken<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetToken<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_user<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUser): Promise<ApiResponse<Response, Context>>
    get_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUser, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_user<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUser, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_user<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUser, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getUser<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUser): Promise<ApiResponse<Response, Context>>
    getUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUser, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getUser<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUser, callback: callbackFn<Response, Context>): TransportRequestCallback
    getUser<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUser, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_user_privileges<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_user_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUserPrivileges): Promise<ApiResponse<Response, Context>>
    get_user_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUserPrivileges, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_user_privileges<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_user_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUserPrivileges, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_user_privileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUserPrivileges, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getUserPrivileges<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getUserPrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUserPrivileges): Promise<ApiResponse<Response, Context>>
    getUserPrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUserPrivileges, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getUserPrivileges<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getUserPrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUserPrivileges, callback: callbackFn<Response, Context>): TransportRequestCallback
    getUserPrivileges<Response = BodyType, Context = unknown>(params: RequestParams.SecurityGetUserPrivileges, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    has_privileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    has_privileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityHasPrivileges<RequestBody>): Promise<ApiResponse<Response, Context>>
    has_privileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityHasPrivileges<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    has_privileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    has_privileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityHasPrivileges<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    has_privileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityHasPrivileges<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    hasPrivileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    hasPrivileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityHasPrivileges<RequestBody>): Promise<ApiResponse<Response, Context>>
    hasPrivileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityHasPrivileges<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    hasPrivileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    hasPrivileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityHasPrivileges<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    hasPrivileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityHasPrivileges<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    invalidate_api_key<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    invalidate_api_key<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateApiKey<RequestBody>): Promise<ApiResponse<Response, Context>>
    invalidate_api_key<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateApiKey<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    invalidate_api_key<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    invalidate_api_key<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateApiKey<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    invalidate_api_key<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateApiKey<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    invalidateApiKey<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    invalidateApiKey<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateApiKey<RequestBody>): Promise<ApiResponse<Response, Context>>
    invalidateApiKey<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateApiKey<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    invalidateApiKey<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    invalidateApiKey<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateApiKey<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    invalidateApiKey<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateApiKey<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    invalidate_token<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    invalidate_token<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateToken<RequestBody>): Promise<ApiResponse<Response, Context>>
    invalidate_token<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateToken<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    invalidate_token<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    invalidate_token<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateToken<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    invalidate_token<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateToken<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    invalidateToken<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    invalidateToken<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateToken<RequestBody>): Promise<ApiResponse<Response, Context>>
    invalidateToken<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateToken<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    invalidateToken<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    invalidateToken<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateToken<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    invalidateToken<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityInvalidateToken<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_privileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_privileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutPrivileges<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_privileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutPrivileges<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_privileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_privileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutPrivileges<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_privileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutPrivileges<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putPrivileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putPrivileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutPrivileges<RequestBody>): Promise<ApiResponse<Response, Context>>
    putPrivileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutPrivileges<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putPrivileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putPrivileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutPrivileges<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putPrivileges<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutPrivileges<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_role<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_role<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRole<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_role<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRole<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_role<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_role<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRole<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_role<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRole<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putRole<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putRole<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRole<RequestBody>): Promise<ApiResponse<Response, Context>>
    putRole<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRole<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putRole<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putRole<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRole<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putRole<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRole<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_role_mapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_role_mapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRoleMapping<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_role_mapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRoleMapping<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_role_mapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_role_mapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRoleMapping<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_role_mapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRoleMapping<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putRoleMapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putRoleMapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRoleMapping<RequestBody>): Promise<ApiResponse<Response, Context>>
    putRoleMapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRoleMapping<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putRoleMapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putRoleMapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRoleMapping<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putRoleMapping<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutRoleMapping<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_user<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_user<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutUser<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_user<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutUser<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_user<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_user<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutUser<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_user<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutUser<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putUser<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putUser<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutUser<RequestBody>): Promise<ApiResponse<Response, Context>>
    putUser<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutUser<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putUser<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putUser<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutUser<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putUser<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SecurityPutUser<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  slm: {
    delete_lifecycle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmDeleteLifecycle): Promise<ApiResponse<Response, Context>>
    delete_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmDeleteLifecycle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_lifecycle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmDeleteLifecycle, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteLifecycle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmDeleteLifecycle): Promise<ApiResponse<Response, Context>>
    deleteLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmDeleteLifecycle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteLifecycle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmDeleteLifecycle, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    execute_lifecycle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    execute_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteLifecycle): Promise<ApiResponse<Response, Context>>
    execute_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteLifecycle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    execute_lifecycle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    execute_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteLifecycle, callback: callbackFn<Response, Context>): TransportRequestCallback
    execute_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteLifecycle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    executeLifecycle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    executeLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteLifecycle): Promise<ApiResponse<Response, Context>>
    executeLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteLifecycle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    executeLifecycle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    executeLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteLifecycle, callback: callbackFn<Response, Context>): TransportRequestCallback
    executeLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteLifecycle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    execute_retention<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    execute_retention<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteRetention): Promise<ApiResponse<Response, Context>>
    execute_retention<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteRetention, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    execute_retention<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    execute_retention<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteRetention, callback: callbackFn<Response, Context>): TransportRequestCallback
    execute_retention<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteRetention, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    executeRetention<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    executeRetention<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteRetention): Promise<ApiResponse<Response, Context>>
    executeRetention<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteRetention, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    executeRetention<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    executeRetention<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteRetention, callback: callbackFn<Response, Context>): TransportRequestCallback
    executeRetention<Response = BodyType, Context = unknown>(params: RequestParams.SlmExecuteRetention, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_lifecycle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetLifecycle): Promise<ApiResponse<Response, Context>>
    get_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetLifecycle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_lifecycle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetLifecycle, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_lifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getLifecycle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetLifecycle): Promise<ApiResponse<Response, Context>>
    getLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetLifecycle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getLifecycle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetLifecycle, callback: callbackFn<Response, Context>): TransportRequestCallback
    getLifecycle<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_stats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_stats<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStats): Promise<ApiResponse<Response, Context>>
    get_stats<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_stats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_stats<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_stats<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getStats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getStats<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStats): Promise<ApiResponse<Response, Context>>
    getStats<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getStats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getStats<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    getStats<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_status<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_status<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStatus): Promise<ApiResponse<Response, Context>>
    get_status<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStatus, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_status<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_status<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStatus, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_status<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStatus, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getStatus<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getStatus<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStatus): Promise<ApiResponse<Response, Context>>
    getStatus<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStatus, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getStatus<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getStatus<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStatus, callback: callbackFn<Response, Context>): TransportRequestCallback
    getStatus<Response = BodyType, Context = unknown>(params: RequestParams.SlmGetStatus, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_lifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_lifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SlmPutLifecycle<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_lifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SlmPutLifecycle<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_lifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_lifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SlmPutLifecycle<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_lifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SlmPutLifecycle<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putLifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putLifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SlmPutLifecycle<RequestBody>): Promise<ApiResponse<Response, Context>>
    putLifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SlmPutLifecycle<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putLifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putLifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SlmPutLifecycle<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putLifecycle<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SlmPutLifecycle<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    start<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    start<Response = BodyType, Context = unknown>(params: RequestParams.SlmStart): Promise<ApiResponse<Response, Context>>
    start<Response = BodyType, Context = unknown>(params: RequestParams.SlmStart, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    start<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    start<Response = BodyType, Context = unknown>(params: RequestParams.SlmStart, callback: callbackFn<Response, Context>): TransportRequestCallback
    start<Response = BodyType, Context = unknown>(params: RequestParams.SlmStart, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stop<Response = BodyType, Context = unknown>(params: RequestParams.SlmStop): Promise<ApiResponse<Response, Context>>
    stop<Response = BodyType, Context = unknown>(params: RequestParams.SlmStop, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stop<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stop<Response = BodyType, Context = unknown>(params: RequestParams.SlmStop, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop<Response = BodyType, Context = unknown>(params: RequestParams.SlmStop, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  snapshot: {
    cleanup_repository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    cleanup_repository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCleanupRepository<RequestBody>): Promise<ApiResponse<Response, Context>>
    cleanup_repository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCleanupRepository<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    cleanup_repository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    cleanup_repository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCleanupRepository<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    cleanup_repository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCleanupRepository<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    cleanupRepository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    cleanupRepository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCleanupRepository<RequestBody>): Promise<ApiResponse<Response, Context>>
    cleanupRepository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCleanupRepository<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    cleanupRepository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    cleanupRepository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCleanupRepository<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    cleanupRepository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCleanupRepository<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCreate<RequestBody>): Promise<ApiResponse<Response, Context>>
    create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCreate<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCreate<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    create<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCreate<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    create_repository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    create_repository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCreateRepository<RequestBody>): Promise<ApiResponse<Response, Context>>
    create_repository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCreateRepository<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    create_repository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    create_repository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCreateRepository<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    create_repository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCreateRepository<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    createRepository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    createRepository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCreateRepository<RequestBody>): Promise<ApiResponse<Response, Context>>
    createRepository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCreateRepository<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    createRepository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    createRepository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCreateRepository<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    createRepository<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotCreateRepository<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotDelete): Promise<ApiResponse<Response, Context>>
    delete<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotDelete, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotDelete, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotDelete, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_repository<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_repository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotDeleteRepository): Promise<ApiResponse<Response, Context>>
    delete_repository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotDeleteRepository, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_repository<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_repository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotDeleteRepository, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_repository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotDeleteRepository, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteRepository<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteRepository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotDeleteRepository): Promise<ApiResponse<Response, Context>>
    deleteRepository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotDeleteRepository, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteRepository<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteRepository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotDeleteRepository, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteRepository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotDeleteRepository, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotGet): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotGet, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotGet, callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotGet, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_repository<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_repository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotGetRepository): Promise<ApiResponse<Response, Context>>
    get_repository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotGetRepository, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_repository<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_repository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotGetRepository, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_repository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotGetRepository, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getRepository<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getRepository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotGetRepository): Promise<ApiResponse<Response, Context>>
    getRepository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotGetRepository, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getRepository<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getRepository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotGetRepository, callback: callbackFn<Response, Context>): TransportRequestCallback
    getRepository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotGetRepository, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    restore<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    restore<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotRestore<RequestBody>): Promise<ApiResponse<Response, Context>>
    restore<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotRestore<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    restore<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    restore<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotRestore<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    restore<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SnapshotRestore<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    status<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    status<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotStatus): Promise<ApiResponse<Response, Context>>
    status<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotStatus, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    status<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    status<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotStatus, callback: callbackFn<Response, Context>): TransportRequestCallback
    status<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotStatus, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    verify_repository<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    verify_repository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotVerifyRepository): Promise<ApiResponse<Response, Context>>
    verify_repository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotVerifyRepository, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    verify_repository<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    verify_repository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotVerifyRepository, callback: callbackFn<Response, Context>): TransportRequestCallback
    verify_repository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotVerifyRepository, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    verifyRepository<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    verifyRepository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotVerifyRepository): Promise<ApiResponse<Response, Context>>
    verifyRepository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotVerifyRepository, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    verifyRepository<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    verifyRepository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotVerifyRepository, callback: callbackFn<Response, Context>): TransportRequestCallback
    verifyRepository<Response = BodyType, Context = unknown>(params: RequestParams.SnapshotVerifyRepository, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  sql: {
    clear_cursor<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    clear_cursor<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlClearCursor<RequestBody>): Promise<ApiResponse<Response, Context>>
    clear_cursor<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlClearCursor<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    clear_cursor<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    clear_cursor<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlClearCursor<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    clear_cursor<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlClearCursor<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    clearCursor<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    clearCursor<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlClearCursor<RequestBody>): Promise<ApiResponse<Response, Context>>
    clearCursor<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlClearCursor<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    clearCursor<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    clearCursor<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlClearCursor<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    clearCursor<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlClearCursor<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlQuery<RequestBody>): Promise<ApiResponse<Response, Context>>
    query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlQuery<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlQuery<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlQuery<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    translate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    translate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlTranslate<RequestBody>): Promise<ApiResponse<Response, Context>>
    translate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlTranslate<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    translate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    translate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlTranslate<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    translate<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.SqlTranslate<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  ssl: {
    certificates<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    certificates<Response = BodyType, Context = unknown>(params: RequestParams.SslCertificates): Promise<ApiResponse<Response, Context>>
    certificates<Response = BodyType, Context = unknown>(params: RequestParams.SslCertificates, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    certificates<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    certificates<Response = BodyType, Context = unknown>(params: RequestParams.SslCertificates, callback: callbackFn<Response, Context>): TransportRequestCallback
    certificates<Response = BodyType, Context = unknown>(params: RequestParams.SslCertificates, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  tasks: {
    cancel<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    cancel<Response = BodyType, Context = unknown>(params: RequestParams.TasksCancel): Promise<ApiResponse<Response, Context>>
    cancel<Response = BodyType, Context = unknown>(params: RequestParams.TasksCancel, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    cancel<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    cancel<Response = BodyType, Context = unknown>(params: RequestParams.TasksCancel, callback: callbackFn<Response, Context>): TransportRequestCallback
    cancel<Response = BodyType, Context = unknown>(params: RequestParams.TasksCancel, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(params: RequestParams.TasksGet): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(params: RequestParams.TasksGet, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(params: RequestParams.TasksGet, callback: callbackFn<Response, Context>): TransportRequestCallback
    get<Response = BodyType, Context = unknown>(params: RequestParams.TasksGet, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    list<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    list<Response = BodyType, Context = unknown>(params: RequestParams.TasksList): Promise<ApiResponse<Response, Context>>
    list<Response = BodyType, Context = unknown>(params: RequestParams.TasksList, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    list<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    list<Response = BodyType, Context = unknown>(params: RequestParams.TasksList, callback: callbackFn<Response, Context>): TransportRequestCallback
    list<Response = BodyType, Context = unknown>(params: RequestParams.TasksList, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  termvectors<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  termvectors<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Termvectors<RequestBody>): Promise<ApiResponse<Response, Context>>
  termvectors<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Termvectors<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  termvectors<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  termvectors<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Termvectors<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  termvectors<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Termvectors<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  transform: {
    cat_transform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    cat_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformCatTransform): Promise<ApiResponse<Response, Context>>
    cat_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformCatTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    cat_transform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    cat_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformCatTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    cat_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformCatTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    catTransform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    catTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformCatTransform): Promise<ApiResponse<Response, Context>>
    catTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformCatTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    catTransform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    catTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformCatTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    catTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformCatTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_transform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformDeleteTransform): Promise<ApiResponse<Response, Context>>
    delete_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformDeleteTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_transform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformDeleteTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformDeleteTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteTransform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformDeleteTransform): Promise<ApiResponse<Response, Context>>
    deleteTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformDeleteTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteTransform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformDeleteTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformDeleteTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransform): Promise<ApiResponse<Response, Context>>
    get_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_transform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransform): Promise<ApiResponse<Response, Context>>
    getTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getTransform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform_stats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_transform_stats<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransformStats): Promise<ApiResponse<Response, Context>>
    get_transform_stats<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransformStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_transform_stats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform_stats<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransformStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_transform_stats<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransformStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransformStats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getTransformStats<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransformStats): Promise<ApiResponse<Response, Context>>
    getTransformStats<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransformStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getTransformStats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransformStats<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransformStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    getTransformStats<Response = BodyType, Context = unknown>(params: RequestParams.TransformGetTransformStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPreviewTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPreviewTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPreviewTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    preview_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPreviewTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPreviewTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPreviewTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPreviewTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    previewTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPreviewTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPutTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPutTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPutTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPutTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPutTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPutTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPutTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformPutTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    start_transform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    start_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStartTransform): Promise<ApiResponse<Response, Context>>
    start_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStartTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    start_transform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    start_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStartTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    start_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStartTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    startTransform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    startTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStartTransform): Promise<ApiResponse<Response, Context>>
    startTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStartTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    startTransform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    startTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStartTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    startTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStartTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_transform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stop_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStopTransform): Promise<ApiResponse<Response, Context>>
    stop_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStopTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stop_transform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStopTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop_transform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStopTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stopTransform<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stopTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStopTransform): Promise<ApiResponse<Response, Context>>
    stopTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStopTransform, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stopTransform<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stopTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStopTransform, callback: callbackFn<Response, Context>): TransportRequestCallback
    stopTransform<Response = BodyType, Context = unknown>(params: RequestParams.TransformStopTransform, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformUpdateTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformUpdateTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformUpdateTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    update_transform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformUpdateTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformUpdateTransform<RequestBody>): Promise<ApiResponse<Response, Context>>
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformUpdateTransform<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformUpdateTransform<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    updateTransform<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.TransformUpdateTransform<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  update<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  update<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Update<RequestBody>): Promise<ApiResponse<Response, Context>>
  update<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Update<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  update<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  update<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Update<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  update<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.Update<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  update_by_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  update_by_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQuery<RequestBody>): Promise<ApiResponse<Response, Context>>
  update_by_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQuery<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  update_by_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  update_by_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQuery<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  update_by_query<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQuery<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  updateByQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  updateByQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQuery<RequestBody>): Promise<ApiResponse<Response, Context>>
  updateByQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQuery<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  updateByQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  updateByQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQuery<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
  updateByQuery<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQuery<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  update_by_query_rethrottle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  update_by_query_rethrottle<Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQueryRethrottle): Promise<ApiResponse<Response, Context>>
  update_by_query_rethrottle<Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQueryRethrottle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  update_by_query_rethrottle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  update_by_query_rethrottle<Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQueryRethrottle, callback: callbackFn<Response, Context>): TransportRequestCallback
  update_by_query_rethrottle<Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  updateByQueryRethrottle<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
  updateByQueryRethrottle<Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQueryRethrottle): Promise<ApiResponse<Response, Context>>
  updateByQueryRethrottle<Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQueryRethrottle, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
  updateByQueryRethrottle<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
  updateByQueryRethrottle<Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQueryRethrottle, callback: callbackFn<Response, Context>): TransportRequestCallback
  updateByQueryRethrottle<Response = BodyType, Context = unknown>(params: RequestParams.UpdateByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  watcher: {
    ack_watch<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    ack_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherAckWatch): Promise<ApiResponse<Response, Context>>
    ack_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherAckWatch, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    ack_watch<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    ack_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherAckWatch, callback: callbackFn<Response, Context>): TransportRequestCallback
    ack_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherAckWatch, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    ackWatch<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    ackWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherAckWatch): Promise<ApiResponse<Response, Context>>
    ackWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherAckWatch, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    ackWatch<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    ackWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherAckWatch, callback: callbackFn<Response, Context>): TransportRequestCallback
    ackWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherAckWatch, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    activate_watch<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    activate_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherActivateWatch): Promise<ApiResponse<Response, Context>>
    activate_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherActivateWatch, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    activate_watch<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    activate_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherActivateWatch, callback: callbackFn<Response, Context>): TransportRequestCallback
    activate_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherActivateWatch, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    activateWatch<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    activateWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherActivateWatch): Promise<ApiResponse<Response, Context>>
    activateWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherActivateWatch, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    activateWatch<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    activateWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherActivateWatch, callback: callbackFn<Response, Context>): TransportRequestCallback
    activateWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherActivateWatch, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deactivate_watch<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deactivate_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeactivateWatch): Promise<ApiResponse<Response, Context>>
    deactivate_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeactivateWatch, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deactivate_watch<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deactivate_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeactivateWatch, callback: callbackFn<Response, Context>): TransportRequestCallback
    deactivate_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeactivateWatch, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deactivateWatch<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deactivateWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeactivateWatch): Promise<ApiResponse<Response, Context>>
    deactivateWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeactivateWatch, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deactivateWatch<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deactivateWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeactivateWatch, callback: callbackFn<Response, Context>): TransportRequestCallback
    deactivateWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeactivateWatch, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_watch<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    delete_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeleteWatch): Promise<ApiResponse<Response, Context>>
    delete_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeleteWatch, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    delete_watch<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeleteWatch, callback: callbackFn<Response, Context>): TransportRequestCallback
    delete_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeleteWatch, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteWatch<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    deleteWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeleteWatch): Promise<ApiResponse<Response, Context>>
    deleteWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeleteWatch, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    deleteWatch<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeleteWatch, callback: callbackFn<Response, Context>): TransportRequestCallback
    deleteWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherDeleteWatch, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    execute_watch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    execute_watch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherExecuteWatch<RequestBody>): Promise<ApiResponse<Response, Context>>
    execute_watch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherExecuteWatch<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    execute_watch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    execute_watch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherExecuteWatch<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    execute_watch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherExecuteWatch<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    executeWatch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    executeWatch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherExecuteWatch<RequestBody>): Promise<ApiResponse<Response, Context>>
    executeWatch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherExecuteWatch<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    executeWatch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    executeWatch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherExecuteWatch<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    executeWatch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherExecuteWatch<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_watch<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    get_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherGetWatch): Promise<ApiResponse<Response, Context>>
    get_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherGetWatch, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    get_watch<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    get_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherGetWatch, callback: callbackFn<Response, Context>): TransportRequestCallback
    get_watch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherGetWatch, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    getWatch<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    getWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherGetWatch): Promise<ApiResponse<Response, Context>>
    getWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherGetWatch, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    getWatch<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    getWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherGetWatch, callback: callbackFn<Response, Context>): TransportRequestCallback
    getWatch<Response = BodyType, Context = unknown>(params: RequestParams.WatcherGetWatch, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_watch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    put_watch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherPutWatch<RequestBody>): Promise<ApiResponse<Response, Context>>
    put_watch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherPutWatch<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    put_watch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    put_watch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherPutWatch<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    put_watch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherPutWatch<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    putWatch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    putWatch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherPutWatch<RequestBody>): Promise<ApiResponse<Response, Context>>
    putWatch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherPutWatch<RequestBody>, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    putWatch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    putWatch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherPutWatch<RequestBody>, callback: callbackFn<Response, Context>): TransportRequestCallback
    putWatch<RequestBody extends BodyType, Response = BodyType, Context = unknown>(params: RequestParams.WatcherPutWatch<RequestBody>, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    start<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    start<Response = BodyType, Context = unknown>(params: RequestParams.WatcherStart): Promise<ApiResponse<Response, Context>>
    start<Response = BodyType, Context = unknown>(params: RequestParams.WatcherStart, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    start<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    start<Response = BodyType, Context = unknown>(params: RequestParams.WatcherStart, callback: callbackFn<Response, Context>): TransportRequestCallback
    start<Response = BodyType, Context = unknown>(params: RequestParams.WatcherStart, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(params: RequestParams.WatcherStats): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(params: RequestParams.WatcherStats, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stats<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(params: RequestParams.WatcherStats, callback: callbackFn<Response, Context>): TransportRequestCallback
    stats<Response = BodyType, Context = unknown>(params: RequestParams.WatcherStats, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    stop<Response = BodyType, Context = unknown>(params: RequestParams.WatcherStop): Promise<ApiResponse<Response, Context>>
    stop<Response = BodyType, Context = unknown>(params: RequestParams.WatcherStop, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    stop<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    stop<Response = BodyType, Context = unknown>(params: RequestParams.WatcherStop, callback: callbackFn<Response, Context>): TransportRequestCallback
    stop<Response = BodyType, Context = unknown>(params: RequestParams.WatcherStop, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
  }
  xpack: {
    info<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    info<Response = BodyType, Context = unknown>(params: RequestParams.XpackInfo): Promise<ApiResponse<Response, Context>>
    info<Response = BodyType, Context = unknown>(params: RequestParams.XpackInfo, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    info<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    info<Response = BodyType, Context = unknown>(params: RequestParams.XpackInfo, callback: callbackFn<Response, Context>): TransportRequestCallback
    info<Response = BodyType, Context = unknown>(params: RequestParams.XpackInfo, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
    usage<Response = BodyType, Context = unknown>(): Promise<ApiResponse<Response, Context>>
    usage<Response = BodyType, Context = unknown>(params: RequestParams.XpackUsage): Promise<ApiResponse<Response, Context>>
    usage<Response = BodyType, Context = unknown>(params: RequestParams.XpackUsage, options: TransportRequestOptions): Promise<ApiResponse<Response, Context>>
    usage<Response = BodyType, Context = unknown>(callback: callbackFn<Response, Context>): TransportRequestCallback
    usage<Response = BodyType, Context = unknown>(params: RequestParams.XpackUsage, callback: callbackFn<Response, Context>): TransportRequestCallback
    usage<Response = BodyType, Context = unknown>(params: RequestParams.XpackUsage, options: TransportRequestOptions, callback: callbackFn<Response, Context>): TransportRequestCallback
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
