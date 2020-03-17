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
  TransportRequestCallback
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

declare type callbackFn<T, C> = (err: ApiError, result: ApiResponse<T, C>) => void;

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

declare class Client<T = any, B = any, C = any> extends EventEmitter {
  constructor(opts?: ClientOptions);
  connectionPool: ConnectionPool;
  transport: Transport;
  serializer: Serializer;
  extend: ClientExtends;
  child(opts?: ClientOptions): Client<T, B, C>;
  close(callback?: Function): Promise<void> | void;
  /* GENERATED */
  async_search: {
    delete<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete<B = any, C = any> (params: RequestParams.AsyncSearchDelete): Promise<ApiResponse<B, C>>
    delete<B = any, C = any> (params: RequestParams.AsyncSearchDelete, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete<B = any, C = any> (params: RequestParams.AsyncSearchDelete, callback: callbackFn<B, C>): TransportRequestCallback
    delete<B = any, C = any> (params: RequestParams.AsyncSearchDelete, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (params: RequestParams.AsyncSearchGet): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (params: RequestParams.AsyncSearchGet, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (params: RequestParams.AsyncSearchGet, callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (params: RequestParams.AsyncSearchGet, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    submit<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    submit<T = any, B = any, C = any> (params: RequestParams.AsyncSearchSubmit<T>): Promise<ApiResponse<B, C>>
    submit<T = any, B = any, C = any> (params: RequestParams.AsyncSearchSubmit<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    submit<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    submit<T = any, B = any, C = any> (params: RequestParams.AsyncSearchSubmit<T>, callback: callbackFn<B, C>): TransportRequestCallback
    submit<T = any, B = any, C = any> (params: RequestParams.AsyncSearchSubmit<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  asyncSearch: {
    delete<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete<B = any, C = any> (params: RequestParams.AsyncSearchDelete): Promise<ApiResponse<B, C>>
    delete<B = any, C = any> (params: RequestParams.AsyncSearchDelete, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete<B = any, C = any> (params: RequestParams.AsyncSearchDelete, callback: callbackFn<B, C>): TransportRequestCallback
    delete<B = any, C = any> (params: RequestParams.AsyncSearchDelete, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (params: RequestParams.AsyncSearchGet): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (params: RequestParams.AsyncSearchGet, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (params: RequestParams.AsyncSearchGet, callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (params: RequestParams.AsyncSearchGet, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    submit<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    submit<T = any, B = any, C = any> (params: RequestParams.AsyncSearchSubmit<T>): Promise<ApiResponse<B, C>>
    submit<T = any, B = any, C = any> (params: RequestParams.AsyncSearchSubmit<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    submit<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    submit<T = any, B = any, C = any> (params: RequestParams.AsyncSearchSubmit<T>, callback: callbackFn<B, C>): TransportRequestCallback
    submit<T = any, B = any, C = any> (params: RequestParams.AsyncSearchSubmit<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  autoscaling: {
    get_autoscaling_decision<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_autoscaling_decision<B = any, C = any> (params: RequestParams.AutoscalingGetAutoscalingDecision): Promise<ApiResponse<B, C>>
    get_autoscaling_decision<B = any, C = any> (params: RequestParams.AutoscalingGetAutoscalingDecision, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_autoscaling_decision<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_autoscaling_decision<B = any, C = any> (params: RequestParams.AutoscalingGetAutoscalingDecision, callback: callbackFn<B, C>): TransportRequestCallback
    get_autoscaling_decision<B = any, C = any> (params: RequestParams.AutoscalingGetAutoscalingDecision, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getAutoscalingDecision<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getAutoscalingDecision<B = any, C = any> (params: RequestParams.AutoscalingGetAutoscalingDecision): Promise<ApiResponse<B, C>>
    getAutoscalingDecision<B = any, C = any> (params: RequestParams.AutoscalingGetAutoscalingDecision, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getAutoscalingDecision<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getAutoscalingDecision<B = any, C = any> (params: RequestParams.AutoscalingGetAutoscalingDecision, callback: callbackFn<B, C>): TransportRequestCallback
    getAutoscalingDecision<B = any, C = any> (params: RequestParams.AutoscalingGetAutoscalingDecision, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  bulk<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  bulk<T = any, B = any, C = any> (params: RequestParams.Bulk<T>): Promise<ApiResponse<B, C>>
  bulk<T = any, B = any, C = any> (params: RequestParams.Bulk<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  bulk<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  bulk<T = any, B = any, C = any> (params: RequestParams.Bulk<T>, callback: callbackFn<B, C>): TransportRequestCallback
  bulk<T = any, B = any, C = any> (params: RequestParams.Bulk<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  cat: {
    aliases<B = any, C = any> (): Promise<ApiResponse<B, C>>
    aliases<B = any, C = any> (params: RequestParams.CatAliases): Promise<ApiResponse<B, C>>
    aliases<B = any, C = any> (params: RequestParams.CatAliases, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    aliases<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    aliases<B = any, C = any> (params: RequestParams.CatAliases, callback: callbackFn<B, C>): TransportRequestCallback
    aliases<B = any, C = any> (params: RequestParams.CatAliases, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    allocation<B = any, C = any> (): Promise<ApiResponse<B, C>>
    allocation<B = any, C = any> (params: RequestParams.CatAllocation): Promise<ApiResponse<B, C>>
    allocation<B = any, C = any> (params: RequestParams.CatAllocation, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    allocation<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    allocation<B = any, C = any> (params: RequestParams.CatAllocation, callback: callbackFn<B, C>): TransportRequestCallback
    allocation<B = any, C = any> (params: RequestParams.CatAllocation, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    count<B = any, C = any> (): Promise<ApiResponse<B, C>>
    count<B = any, C = any> (params: RequestParams.CatCount): Promise<ApiResponse<B, C>>
    count<B = any, C = any> (params: RequestParams.CatCount, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    count<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    count<B = any, C = any> (params: RequestParams.CatCount, callback: callbackFn<B, C>): TransportRequestCallback
    count<B = any, C = any> (params: RequestParams.CatCount, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    fielddata<B = any, C = any> (): Promise<ApiResponse<B, C>>
    fielddata<B = any, C = any> (params: RequestParams.CatFielddata): Promise<ApiResponse<B, C>>
    fielddata<B = any, C = any> (params: RequestParams.CatFielddata, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    fielddata<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    fielddata<B = any, C = any> (params: RequestParams.CatFielddata, callback: callbackFn<B, C>): TransportRequestCallback
    fielddata<B = any, C = any> (params: RequestParams.CatFielddata, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    health<B = any, C = any> (): Promise<ApiResponse<B, C>>
    health<B = any, C = any> (params: RequestParams.CatHealth): Promise<ApiResponse<B, C>>
    health<B = any, C = any> (params: RequestParams.CatHealth, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    health<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    health<B = any, C = any> (params: RequestParams.CatHealth, callback: callbackFn<B, C>): TransportRequestCallback
    health<B = any, C = any> (params: RequestParams.CatHealth, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    help<B = any, C = any> (): Promise<ApiResponse<B, C>>
    help<B = any, C = any> (params: RequestParams.CatHelp): Promise<ApiResponse<B, C>>
    help<B = any, C = any> (params: RequestParams.CatHelp, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    help<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    help<B = any, C = any> (params: RequestParams.CatHelp, callback: callbackFn<B, C>): TransportRequestCallback
    help<B = any, C = any> (params: RequestParams.CatHelp, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    indices<B = any, C = any> (): Promise<ApiResponse<B, C>>
    indices<B = any, C = any> (params: RequestParams.CatIndices): Promise<ApiResponse<B, C>>
    indices<B = any, C = any> (params: RequestParams.CatIndices, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    indices<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    indices<B = any, C = any> (params: RequestParams.CatIndices, callback: callbackFn<B, C>): TransportRequestCallback
    indices<B = any, C = any> (params: RequestParams.CatIndices, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    master<B = any, C = any> (): Promise<ApiResponse<B, C>>
    master<B = any, C = any> (params: RequestParams.CatMaster): Promise<ApiResponse<B, C>>
    master<B = any, C = any> (params: RequestParams.CatMaster, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    master<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    master<B = any, C = any> (params: RequestParams.CatMaster, callback: callbackFn<B, C>): TransportRequestCallback
    master<B = any, C = any> (params: RequestParams.CatMaster, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    ml_data_frame_analytics<B = any, C = any> (): Promise<ApiResponse<B, C>>
    ml_data_frame_analytics<B = any, C = any> (params: RequestParams.CatMlDataFrameAnalytics): Promise<ApiResponse<B, C>>
    ml_data_frame_analytics<B = any, C = any> (params: RequestParams.CatMlDataFrameAnalytics, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    ml_data_frame_analytics<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    ml_data_frame_analytics<B = any, C = any> (params: RequestParams.CatMlDataFrameAnalytics, callback: callbackFn<B, C>): TransportRequestCallback
    ml_data_frame_analytics<B = any, C = any> (params: RequestParams.CatMlDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    mlDataFrameAnalytics<B = any, C = any> (): Promise<ApiResponse<B, C>>
    mlDataFrameAnalytics<B = any, C = any> (params: RequestParams.CatMlDataFrameAnalytics): Promise<ApiResponse<B, C>>
    mlDataFrameAnalytics<B = any, C = any> (params: RequestParams.CatMlDataFrameAnalytics, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    mlDataFrameAnalytics<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    mlDataFrameAnalytics<B = any, C = any> (params: RequestParams.CatMlDataFrameAnalytics, callback: callbackFn<B, C>): TransportRequestCallback
    mlDataFrameAnalytics<B = any, C = any> (params: RequestParams.CatMlDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    ml_datafeeds<B = any, C = any> (): Promise<ApiResponse<B, C>>
    ml_datafeeds<B = any, C = any> (params: RequestParams.CatMlDatafeeds): Promise<ApiResponse<B, C>>
    ml_datafeeds<B = any, C = any> (params: RequestParams.CatMlDatafeeds, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    ml_datafeeds<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    ml_datafeeds<B = any, C = any> (params: RequestParams.CatMlDatafeeds, callback: callbackFn<B, C>): TransportRequestCallback
    ml_datafeeds<B = any, C = any> (params: RequestParams.CatMlDatafeeds, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    mlDatafeeds<B = any, C = any> (): Promise<ApiResponse<B, C>>
    mlDatafeeds<B = any, C = any> (params: RequestParams.CatMlDatafeeds): Promise<ApiResponse<B, C>>
    mlDatafeeds<B = any, C = any> (params: RequestParams.CatMlDatafeeds, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    mlDatafeeds<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    mlDatafeeds<B = any, C = any> (params: RequestParams.CatMlDatafeeds, callback: callbackFn<B, C>): TransportRequestCallback
    mlDatafeeds<B = any, C = any> (params: RequestParams.CatMlDatafeeds, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    ml_jobs<B = any, C = any> (): Promise<ApiResponse<B, C>>
    ml_jobs<B = any, C = any> (params: RequestParams.CatMlJobs): Promise<ApiResponse<B, C>>
    ml_jobs<B = any, C = any> (params: RequestParams.CatMlJobs, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    ml_jobs<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    ml_jobs<B = any, C = any> (params: RequestParams.CatMlJobs, callback: callbackFn<B, C>): TransportRequestCallback
    ml_jobs<B = any, C = any> (params: RequestParams.CatMlJobs, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    mlJobs<B = any, C = any> (): Promise<ApiResponse<B, C>>
    mlJobs<B = any, C = any> (params: RequestParams.CatMlJobs): Promise<ApiResponse<B, C>>
    mlJobs<B = any, C = any> (params: RequestParams.CatMlJobs, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    mlJobs<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    mlJobs<B = any, C = any> (params: RequestParams.CatMlJobs, callback: callbackFn<B, C>): TransportRequestCallback
    mlJobs<B = any, C = any> (params: RequestParams.CatMlJobs, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    ml_trained_models<B = any, C = any> (): Promise<ApiResponse<B, C>>
    ml_trained_models<B = any, C = any> (params: RequestParams.CatMlTrainedModels): Promise<ApiResponse<B, C>>
    ml_trained_models<B = any, C = any> (params: RequestParams.CatMlTrainedModels, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    ml_trained_models<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    ml_trained_models<B = any, C = any> (params: RequestParams.CatMlTrainedModels, callback: callbackFn<B, C>): TransportRequestCallback
    ml_trained_models<B = any, C = any> (params: RequestParams.CatMlTrainedModels, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    mlTrainedModels<B = any, C = any> (): Promise<ApiResponse<B, C>>
    mlTrainedModels<B = any, C = any> (params: RequestParams.CatMlTrainedModels): Promise<ApiResponse<B, C>>
    mlTrainedModels<B = any, C = any> (params: RequestParams.CatMlTrainedModels, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    mlTrainedModels<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    mlTrainedModels<B = any, C = any> (params: RequestParams.CatMlTrainedModels, callback: callbackFn<B, C>): TransportRequestCallback
    mlTrainedModels<B = any, C = any> (params: RequestParams.CatMlTrainedModels, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    nodeattrs<B = any, C = any> (): Promise<ApiResponse<B, C>>
    nodeattrs<B = any, C = any> (params: RequestParams.CatNodeattrs): Promise<ApiResponse<B, C>>
    nodeattrs<B = any, C = any> (params: RequestParams.CatNodeattrs, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    nodeattrs<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    nodeattrs<B = any, C = any> (params: RequestParams.CatNodeattrs, callback: callbackFn<B, C>): TransportRequestCallback
    nodeattrs<B = any, C = any> (params: RequestParams.CatNodeattrs, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    nodes<B = any, C = any> (): Promise<ApiResponse<B, C>>
    nodes<B = any, C = any> (params: RequestParams.CatNodes): Promise<ApiResponse<B, C>>
    nodes<B = any, C = any> (params: RequestParams.CatNodes, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    nodes<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    nodes<B = any, C = any> (params: RequestParams.CatNodes, callback: callbackFn<B, C>): TransportRequestCallback
    nodes<B = any, C = any> (params: RequestParams.CatNodes, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    pending_tasks<B = any, C = any> (): Promise<ApiResponse<B, C>>
    pending_tasks<B = any, C = any> (params: RequestParams.CatPendingTasks): Promise<ApiResponse<B, C>>
    pending_tasks<B = any, C = any> (params: RequestParams.CatPendingTasks, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    pending_tasks<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    pending_tasks<B = any, C = any> (params: RequestParams.CatPendingTasks, callback: callbackFn<B, C>): TransportRequestCallback
    pending_tasks<B = any, C = any> (params: RequestParams.CatPendingTasks, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    pendingTasks<B = any, C = any> (): Promise<ApiResponse<B, C>>
    pendingTasks<B = any, C = any> (params: RequestParams.CatPendingTasks): Promise<ApiResponse<B, C>>
    pendingTasks<B = any, C = any> (params: RequestParams.CatPendingTasks, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    pendingTasks<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    pendingTasks<B = any, C = any> (params: RequestParams.CatPendingTasks, callback: callbackFn<B, C>): TransportRequestCallback
    pendingTasks<B = any, C = any> (params: RequestParams.CatPendingTasks, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    plugins<B = any, C = any> (): Promise<ApiResponse<B, C>>
    plugins<B = any, C = any> (params: RequestParams.CatPlugins): Promise<ApiResponse<B, C>>
    plugins<B = any, C = any> (params: RequestParams.CatPlugins, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    plugins<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    plugins<B = any, C = any> (params: RequestParams.CatPlugins, callback: callbackFn<B, C>): TransportRequestCallback
    plugins<B = any, C = any> (params: RequestParams.CatPlugins, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    recovery<B = any, C = any> (): Promise<ApiResponse<B, C>>
    recovery<B = any, C = any> (params: RequestParams.CatRecovery): Promise<ApiResponse<B, C>>
    recovery<B = any, C = any> (params: RequestParams.CatRecovery, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    recovery<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    recovery<B = any, C = any> (params: RequestParams.CatRecovery, callback: callbackFn<B, C>): TransportRequestCallback
    recovery<B = any, C = any> (params: RequestParams.CatRecovery, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    repositories<B = any, C = any> (): Promise<ApiResponse<B, C>>
    repositories<B = any, C = any> (params: RequestParams.CatRepositories): Promise<ApiResponse<B, C>>
    repositories<B = any, C = any> (params: RequestParams.CatRepositories, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    repositories<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    repositories<B = any, C = any> (params: RequestParams.CatRepositories, callback: callbackFn<B, C>): TransportRequestCallback
    repositories<B = any, C = any> (params: RequestParams.CatRepositories, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    segments<B = any, C = any> (): Promise<ApiResponse<B, C>>
    segments<B = any, C = any> (params: RequestParams.CatSegments): Promise<ApiResponse<B, C>>
    segments<B = any, C = any> (params: RequestParams.CatSegments, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    segments<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    segments<B = any, C = any> (params: RequestParams.CatSegments, callback: callbackFn<B, C>): TransportRequestCallback
    segments<B = any, C = any> (params: RequestParams.CatSegments, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    shards<B = any, C = any> (): Promise<ApiResponse<B, C>>
    shards<B = any, C = any> (params: RequestParams.CatShards): Promise<ApiResponse<B, C>>
    shards<B = any, C = any> (params: RequestParams.CatShards, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    shards<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    shards<B = any, C = any> (params: RequestParams.CatShards, callback: callbackFn<B, C>): TransportRequestCallback
    shards<B = any, C = any> (params: RequestParams.CatShards, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    snapshots<B = any, C = any> (): Promise<ApiResponse<B, C>>
    snapshots<B = any, C = any> (params: RequestParams.CatSnapshots): Promise<ApiResponse<B, C>>
    snapshots<B = any, C = any> (params: RequestParams.CatSnapshots, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    snapshots<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    snapshots<B = any, C = any> (params: RequestParams.CatSnapshots, callback: callbackFn<B, C>): TransportRequestCallback
    snapshots<B = any, C = any> (params: RequestParams.CatSnapshots, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    tasks<B = any, C = any> (): Promise<ApiResponse<B, C>>
    tasks<B = any, C = any> (params: RequestParams.CatTasks): Promise<ApiResponse<B, C>>
    tasks<B = any, C = any> (params: RequestParams.CatTasks, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    tasks<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    tasks<B = any, C = any> (params: RequestParams.CatTasks, callback: callbackFn<B, C>): TransportRequestCallback
    tasks<B = any, C = any> (params: RequestParams.CatTasks, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    templates<B = any, C = any> (): Promise<ApiResponse<B, C>>
    templates<B = any, C = any> (params: RequestParams.CatTemplates): Promise<ApiResponse<B, C>>
    templates<B = any, C = any> (params: RequestParams.CatTemplates, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    templates<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    templates<B = any, C = any> (params: RequestParams.CatTemplates, callback: callbackFn<B, C>): TransportRequestCallback
    templates<B = any, C = any> (params: RequestParams.CatTemplates, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    thread_pool<B = any, C = any> (): Promise<ApiResponse<B, C>>
    thread_pool<B = any, C = any> (params: RequestParams.CatThreadPool): Promise<ApiResponse<B, C>>
    thread_pool<B = any, C = any> (params: RequestParams.CatThreadPool, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    thread_pool<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    thread_pool<B = any, C = any> (params: RequestParams.CatThreadPool, callback: callbackFn<B, C>): TransportRequestCallback
    thread_pool<B = any, C = any> (params: RequestParams.CatThreadPool, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    threadPool<B = any, C = any> (): Promise<ApiResponse<B, C>>
    threadPool<B = any, C = any> (params: RequestParams.CatThreadPool): Promise<ApiResponse<B, C>>
    threadPool<B = any, C = any> (params: RequestParams.CatThreadPool, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    threadPool<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    threadPool<B = any, C = any> (params: RequestParams.CatThreadPool, callback: callbackFn<B, C>): TransportRequestCallback
    threadPool<B = any, C = any> (params: RequestParams.CatThreadPool, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  ccr: {
    delete_auto_follow_pattern<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrDeleteAutoFollowPattern): Promise<ApiResponse<B, C>>
    delete_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrDeleteAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_auto_follow_pattern<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrDeleteAutoFollowPattern, callback: callbackFn<B, C>): TransportRequestCallback
    delete_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrDeleteAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteAutoFollowPattern<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrDeleteAutoFollowPattern): Promise<ApiResponse<B, C>>
    deleteAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrDeleteAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteAutoFollowPattern<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrDeleteAutoFollowPattern, callback: callbackFn<B, C>): TransportRequestCallback
    deleteAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrDeleteAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    follow<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    follow<T = any, B = any, C = any> (params: RequestParams.CcrFollow<T>): Promise<ApiResponse<B, C>>
    follow<T = any, B = any, C = any> (params: RequestParams.CcrFollow<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    follow<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    follow<T = any, B = any, C = any> (params: RequestParams.CcrFollow<T>, callback: callbackFn<B, C>): TransportRequestCallback
    follow<T = any, B = any, C = any> (params: RequestParams.CcrFollow<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    follow_info<B = any, C = any> (): Promise<ApiResponse<B, C>>
    follow_info<B = any, C = any> (params: RequestParams.CcrFollowInfo): Promise<ApiResponse<B, C>>
    follow_info<B = any, C = any> (params: RequestParams.CcrFollowInfo, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    follow_info<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    follow_info<B = any, C = any> (params: RequestParams.CcrFollowInfo, callback: callbackFn<B, C>): TransportRequestCallback
    follow_info<B = any, C = any> (params: RequestParams.CcrFollowInfo, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    followInfo<B = any, C = any> (): Promise<ApiResponse<B, C>>
    followInfo<B = any, C = any> (params: RequestParams.CcrFollowInfo): Promise<ApiResponse<B, C>>
    followInfo<B = any, C = any> (params: RequestParams.CcrFollowInfo, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    followInfo<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    followInfo<B = any, C = any> (params: RequestParams.CcrFollowInfo, callback: callbackFn<B, C>): TransportRequestCallback
    followInfo<B = any, C = any> (params: RequestParams.CcrFollowInfo, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    follow_stats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    follow_stats<B = any, C = any> (params: RequestParams.CcrFollowStats): Promise<ApiResponse<B, C>>
    follow_stats<B = any, C = any> (params: RequestParams.CcrFollowStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    follow_stats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    follow_stats<B = any, C = any> (params: RequestParams.CcrFollowStats, callback: callbackFn<B, C>): TransportRequestCallback
    follow_stats<B = any, C = any> (params: RequestParams.CcrFollowStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    followStats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    followStats<B = any, C = any> (params: RequestParams.CcrFollowStats): Promise<ApiResponse<B, C>>
    followStats<B = any, C = any> (params: RequestParams.CcrFollowStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    followStats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    followStats<B = any, C = any> (params: RequestParams.CcrFollowStats, callback: callbackFn<B, C>): TransportRequestCallback
    followStats<B = any, C = any> (params: RequestParams.CcrFollowStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    forget_follower<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    forget_follower<T = any, B = any, C = any> (params: RequestParams.CcrForgetFollower<T>): Promise<ApiResponse<B, C>>
    forget_follower<T = any, B = any, C = any> (params: RequestParams.CcrForgetFollower<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    forget_follower<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    forget_follower<T = any, B = any, C = any> (params: RequestParams.CcrForgetFollower<T>, callback: callbackFn<B, C>): TransportRequestCallback
    forget_follower<T = any, B = any, C = any> (params: RequestParams.CcrForgetFollower<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    forgetFollower<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    forgetFollower<T = any, B = any, C = any> (params: RequestParams.CcrForgetFollower<T>): Promise<ApiResponse<B, C>>
    forgetFollower<T = any, B = any, C = any> (params: RequestParams.CcrForgetFollower<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    forgetFollower<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    forgetFollower<T = any, B = any, C = any> (params: RequestParams.CcrForgetFollower<T>, callback: callbackFn<B, C>): TransportRequestCallback
    forgetFollower<T = any, B = any, C = any> (params: RequestParams.CcrForgetFollower<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_auto_follow_pattern<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrGetAutoFollowPattern): Promise<ApiResponse<B, C>>
    get_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrGetAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_auto_follow_pattern<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrGetAutoFollowPattern, callback: callbackFn<B, C>): TransportRequestCallback
    get_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrGetAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getAutoFollowPattern<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrGetAutoFollowPattern): Promise<ApiResponse<B, C>>
    getAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrGetAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getAutoFollowPattern<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrGetAutoFollowPattern, callback: callbackFn<B, C>): TransportRequestCallback
    getAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrGetAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    pause_auto_follow_pattern<B = any, C = any> (): Promise<ApiResponse<B, C>>
    pause_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrPauseAutoFollowPattern): Promise<ApiResponse<B, C>>
    pause_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrPauseAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    pause_auto_follow_pattern<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    pause_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrPauseAutoFollowPattern, callback: callbackFn<B, C>): TransportRequestCallback
    pause_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrPauseAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    pauseAutoFollowPattern<B = any, C = any> (): Promise<ApiResponse<B, C>>
    pauseAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrPauseAutoFollowPattern): Promise<ApiResponse<B, C>>
    pauseAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrPauseAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    pauseAutoFollowPattern<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    pauseAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrPauseAutoFollowPattern, callback: callbackFn<B, C>): TransportRequestCallback
    pauseAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrPauseAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    pause_follow<B = any, C = any> (): Promise<ApiResponse<B, C>>
    pause_follow<B = any, C = any> (params: RequestParams.CcrPauseFollow): Promise<ApiResponse<B, C>>
    pause_follow<B = any, C = any> (params: RequestParams.CcrPauseFollow, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    pause_follow<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    pause_follow<B = any, C = any> (params: RequestParams.CcrPauseFollow, callback: callbackFn<B, C>): TransportRequestCallback
    pause_follow<B = any, C = any> (params: RequestParams.CcrPauseFollow, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    pauseFollow<B = any, C = any> (): Promise<ApiResponse<B, C>>
    pauseFollow<B = any, C = any> (params: RequestParams.CcrPauseFollow): Promise<ApiResponse<B, C>>
    pauseFollow<B = any, C = any> (params: RequestParams.CcrPauseFollow, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    pauseFollow<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    pauseFollow<B = any, C = any> (params: RequestParams.CcrPauseFollow, callback: callbackFn<B, C>): TransportRequestCallback
    pauseFollow<B = any, C = any> (params: RequestParams.CcrPauseFollow, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_auto_follow_pattern<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_auto_follow_pattern<T = any, B = any, C = any> (params: RequestParams.CcrPutAutoFollowPattern<T>): Promise<ApiResponse<B, C>>
    put_auto_follow_pattern<T = any, B = any, C = any> (params: RequestParams.CcrPutAutoFollowPattern<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_auto_follow_pattern<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_auto_follow_pattern<T = any, B = any, C = any> (params: RequestParams.CcrPutAutoFollowPattern<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_auto_follow_pattern<T = any, B = any, C = any> (params: RequestParams.CcrPutAutoFollowPattern<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putAutoFollowPattern<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putAutoFollowPattern<T = any, B = any, C = any> (params: RequestParams.CcrPutAutoFollowPattern<T>): Promise<ApiResponse<B, C>>
    putAutoFollowPattern<T = any, B = any, C = any> (params: RequestParams.CcrPutAutoFollowPattern<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putAutoFollowPattern<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putAutoFollowPattern<T = any, B = any, C = any> (params: RequestParams.CcrPutAutoFollowPattern<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putAutoFollowPattern<T = any, B = any, C = any> (params: RequestParams.CcrPutAutoFollowPattern<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    resume_auto_follow_pattern<B = any, C = any> (): Promise<ApiResponse<B, C>>
    resume_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrResumeAutoFollowPattern): Promise<ApiResponse<B, C>>
    resume_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrResumeAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    resume_auto_follow_pattern<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    resume_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrResumeAutoFollowPattern, callback: callbackFn<B, C>): TransportRequestCallback
    resume_auto_follow_pattern<B = any, C = any> (params: RequestParams.CcrResumeAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    resumeAutoFollowPattern<B = any, C = any> (): Promise<ApiResponse<B, C>>
    resumeAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrResumeAutoFollowPattern): Promise<ApiResponse<B, C>>
    resumeAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrResumeAutoFollowPattern, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    resumeAutoFollowPattern<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    resumeAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrResumeAutoFollowPattern, callback: callbackFn<B, C>): TransportRequestCallback
    resumeAutoFollowPattern<B = any, C = any> (params: RequestParams.CcrResumeAutoFollowPattern, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    resume_follow<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    resume_follow<T = any, B = any, C = any> (params: RequestParams.CcrResumeFollow<T>): Promise<ApiResponse<B, C>>
    resume_follow<T = any, B = any, C = any> (params: RequestParams.CcrResumeFollow<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    resume_follow<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    resume_follow<T = any, B = any, C = any> (params: RequestParams.CcrResumeFollow<T>, callback: callbackFn<B, C>): TransportRequestCallback
    resume_follow<T = any, B = any, C = any> (params: RequestParams.CcrResumeFollow<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    resumeFollow<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    resumeFollow<T = any, B = any, C = any> (params: RequestParams.CcrResumeFollow<T>): Promise<ApiResponse<B, C>>
    resumeFollow<T = any, B = any, C = any> (params: RequestParams.CcrResumeFollow<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    resumeFollow<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    resumeFollow<T = any, B = any, C = any> (params: RequestParams.CcrResumeFollow<T>, callback: callbackFn<B, C>): TransportRequestCallback
    resumeFollow<T = any, B = any, C = any> (params: RequestParams.CcrResumeFollow<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (params: RequestParams.CcrStats): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (params: RequestParams.CcrStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (params: RequestParams.CcrStats, callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (params: RequestParams.CcrStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    unfollow<B = any, C = any> (): Promise<ApiResponse<B, C>>
    unfollow<B = any, C = any> (params: RequestParams.CcrUnfollow): Promise<ApiResponse<B, C>>
    unfollow<B = any, C = any> (params: RequestParams.CcrUnfollow, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    unfollow<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    unfollow<B = any, C = any> (params: RequestParams.CcrUnfollow, callback: callbackFn<B, C>): TransportRequestCallback
    unfollow<B = any, C = any> (params: RequestParams.CcrUnfollow, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  clear_scroll<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  clear_scroll<T = any, B = any, C = any> (params: RequestParams.ClearScroll<T>): Promise<ApiResponse<B, C>>
  clear_scroll<T = any, B = any, C = any> (params: RequestParams.ClearScroll<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  clear_scroll<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  clear_scroll<T = any, B = any, C = any> (params: RequestParams.ClearScroll<T>, callback: callbackFn<B, C>): TransportRequestCallback
  clear_scroll<T = any, B = any, C = any> (params: RequestParams.ClearScroll<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  clearScroll<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  clearScroll<T = any, B = any, C = any> (params: RequestParams.ClearScroll<T>): Promise<ApiResponse<B, C>>
  clearScroll<T = any, B = any, C = any> (params: RequestParams.ClearScroll<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  clearScroll<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  clearScroll<T = any, B = any, C = any> (params: RequestParams.ClearScroll<T>, callback: callbackFn<B, C>): TransportRequestCallback
  clearScroll<T = any, B = any, C = any> (params: RequestParams.ClearScroll<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  cluster: {
    allocation_explain<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    allocation_explain<T = any, B = any, C = any> (params: RequestParams.ClusterAllocationExplain<T>): Promise<ApiResponse<B, C>>
    allocation_explain<T = any, B = any, C = any> (params: RequestParams.ClusterAllocationExplain<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    allocation_explain<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    allocation_explain<T = any, B = any, C = any> (params: RequestParams.ClusterAllocationExplain<T>, callback: callbackFn<B, C>): TransportRequestCallback
    allocation_explain<T = any, B = any, C = any> (params: RequestParams.ClusterAllocationExplain<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    allocationExplain<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    allocationExplain<T = any, B = any, C = any> (params: RequestParams.ClusterAllocationExplain<T>): Promise<ApiResponse<B, C>>
    allocationExplain<T = any, B = any, C = any> (params: RequestParams.ClusterAllocationExplain<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    allocationExplain<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    allocationExplain<T = any, B = any, C = any> (params: RequestParams.ClusterAllocationExplain<T>, callback: callbackFn<B, C>): TransportRequestCallback
    allocationExplain<T = any, B = any, C = any> (params: RequestParams.ClusterAllocationExplain<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_settings<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_settings<B = any, C = any> (params: RequestParams.ClusterGetSettings): Promise<ApiResponse<B, C>>
    get_settings<B = any, C = any> (params: RequestParams.ClusterGetSettings, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_settings<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_settings<B = any, C = any> (params: RequestParams.ClusterGetSettings, callback: callbackFn<B, C>): TransportRequestCallback
    get_settings<B = any, C = any> (params: RequestParams.ClusterGetSettings, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getSettings<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getSettings<B = any, C = any> (params: RequestParams.ClusterGetSettings): Promise<ApiResponse<B, C>>
    getSettings<B = any, C = any> (params: RequestParams.ClusterGetSettings, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getSettings<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getSettings<B = any, C = any> (params: RequestParams.ClusterGetSettings, callback: callbackFn<B, C>): TransportRequestCallback
    getSettings<B = any, C = any> (params: RequestParams.ClusterGetSettings, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    health<B = any, C = any> (): Promise<ApiResponse<B, C>>
    health<B = any, C = any> (params: RequestParams.ClusterHealth): Promise<ApiResponse<B, C>>
    health<B = any, C = any> (params: RequestParams.ClusterHealth, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    health<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    health<B = any, C = any> (params: RequestParams.ClusterHealth, callback: callbackFn<B, C>): TransportRequestCallback
    health<B = any, C = any> (params: RequestParams.ClusterHealth, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    pending_tasks<B = any, C = any> (): Promise<ApiResponse<B, C>>
    pending_tasks<B = any, C = any> (params: RequestParams.ClusterPendingTasks): Promise<ApiResponse<B, C>>
    pending_tasks<B = any, C = any> (params: RequestParams.ClusterPendingTasks, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    pending_tasks<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    pending_tasks<B = any, C = any> (params: RequestParams.ClusterPendingTasks, callback: callbackFn<B, C>): TransportRequestCallback
    pending_tasks<B = any, C = any> (params: RequestParams.ClusterPendingTasks, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    pendingTasks<B = any, C = any> (): Promise<ApiResponse<B, C>>
    pendingTasks<B = any, C = any> (params: RequestParams.ClusterPendingTasks): Promise<ApiResponse<B, C>>
    pendingTasks<B = any, C = any> (params: RequestParams.ClusterPendingTasks, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    pendingTasks<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    pendingTasks<B = any, C = any> (params: RequestParams.ClusterPendingTasks, callback: callbackFn<B, C>): TransportRequestCallback
    pendingTasks<B = any, C = any> (params: RequestParams.ClusterPendingTasks, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_settings<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_settings<T = any, B = any, C = any> (params: RequestParams.ClusterPutSettings<T>): Promise<ApiResponse<B, C>>
    put_settings<T = any, B = any, C = any> (params: RequestParams.ClusterPutSettings<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_settings<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_settings<T = any, B = any, C = any> (params: RequestParams.ClusterPutSettings<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_settings<T = any, B = any, C = any> (params: RequestParams.ClusterPutSettings<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putSettings<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putSettings<T = any, B = any, C = any> (params: RequestParams.ClusterPutSettings<T>): Promise<ApiResponse<B, C>>
    putSettings<T = any, B = any, C = any> (params: RequestParams.ClusterPutSettings<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putSettings<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putSettings<T = any, B = any, C = any> (params: RequestParams.ClusterPutSettings<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putSettings<T = any, B = any, C = any> (params: RequestParams.ClusterPutSettings<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    remote_info<B = any, C = any> (): Promise<ApiResponse<B, C>>
    remote_info<B = any, C = any> (params: RequestParams.ClusterRemoteInfo): Promise<ApiResponse<B, C>>
    remote_info<B = any, C = any> (params: RequestParams.ClusterRemoteInfo, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    remote_info<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    remote_info<B = any, C = any> (params: RequestParams.ClusterRemoteInfo, callback: callbackFn<B, C>): TransportRequestCallback
    remote_info<B = any, C = any> (params: RequestParams.ClusterRemoteInfo, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    remoteInfo<B = any, C = any> (): Promise<ApiResponse<B, C>>
    remoteInfo<B = any, C = any> (params: RequestParams.ClusterRemoteInfo): Promise<ApiResponse<B, C>>
    remoteInfo<B = any, C = any> (params: RequestParams.ClusterRemoteInfo, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    remoteInfo<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    remoteInfo<B = any, C = any> (params: RequestParams.ClusterRemoteInfo, callback: callbackFn<B, C>): TransportRequestCallback
    remoteInfo<B = any, C = any> (params: RequestParams.ClusterRemoteInfo, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    reroute<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    reroute<T = any, B = any, C = any> (params: RequestParams.ClusterReroute<T>): Promise<ApiResponse<B, C>>
    reroute<T = any, B = any, C = any> (params: RequestParams.ClusterReroute<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    reroute<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    reroute<T = any, B = any, C = any> (params: RequestParams.ClusterReroute<T>, callback: callbackFn<B, C>): TransportRequestCallback
    reroute<T = any, B = any, C = any> (params: RequestParams.ClusterReroute<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    state<B = any, C = any> (): Promise<ApiResponse<B, C>>
    state<B = any, C = any> (params: RequestParams.ClusterState): Promise<ApiResponse<B, C>>
    state<B = any, C = any> (params: RequestParams.ClusterState, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    state<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    state<B = any, C = any> (params: RequestParams.ClusterState, callback: callbackFn<B, C>): TransportRequestCallback
    state<B = any, C = any> (params: RequestParams.ClusterState, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (params: RequestParams.ClusterStats): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (params: RequestParams.ClusterStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (params: RequestParams.ClusterStats, callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (params: RequestParams.ClusterStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  count<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  count<T = any, B = any, C = any> (params: RequestParams.Count<T>): Promise<ApiResponse<B, C>>
  count<T = any, B = any, C = any> (params: RequestParams.Count<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  count<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  count<T = any, B = any, C = any> (params: RequestParams.Count<T>, callback: callbackFn<B, C>): TransportRequestCallback
  count<T = any, B = any, C = any> (params: RequestParams.Count<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  create<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  create<T = any, B = any, C = any> (params: RequestParams.Create<T>): Promise<ApiResponse<B, C>>
  create<T = any, B = any, C = any> (params: RequestParams.Create<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  create<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  create<T = any, B = any, C = any> (params: RequestParams.Create<T>, callback: callbackFn<B, C>): TransportRequestCallback
  create<T = any, B = any, C = any> (params: RequestParams.Create<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  data_frame_transform_deprecated: {
    delete_transform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform): Promise<ApiResponse<B, C>>
    delete_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_transform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, callback: callbackFn<B, C>): TransportRequestCallback
    delete_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteTransform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform): Promise<ApiResponse<B, C>>
    deleteTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteTransform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, callback: callbackFn<B, C>): TransportRequestCallback
    deleteTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_transform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform): Promise<ApiResponse<B, C>>
    get_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_transform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform, callback: callbackFn<B, C>): TransportRequestCallback
    get_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getTransform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform): Promise<ApiResponse<B, C>>
    getTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getTransform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform, callback: callbackFn<B, C>): TransportRequestCallback
    getTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_transform_stats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_transform_stats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats): Promise<ApiResponse<B, C>>
    get_transform_stats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_transform_stats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_transform_stats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, callback: callbackFn<B, C>): TransportRequestCallback
    get_transform_stats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getTransformStats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getTransformStats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats): Promise<ApiResponse<B, C>>
    getTransformStats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getTransformStats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getTransformStats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, callback: callbackFn<B, C>): TransportRequestCallback
    getTransformStats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    preview_transform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    preview_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>): Promise<ApiResponse<B, C>>
    preview_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    preview_transform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    preview_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    preview_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    previewTransform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    previewTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>): Promise<ApiResponse<B, C>>
    previewTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    previewTransform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    previewTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    previewTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_transform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>): Promise<ApiResponse<B, C>>
    put_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_transform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putTransform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>): Promise<ApiResponse<B, C>>
    putTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putTransform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    start_transform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    start_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform): Promise<ApiResponse<B, C>>
    start_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    start_transform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    start_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform, callback: callbackFn<B, C>): TransportRequestCallback
    start_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    startTransform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    startTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform): Promise<ApiResponse<B, C>>
    startTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    startTransform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    startTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform, callback: callbackFn<B, C>): TransportRequestCallback
    startTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stop_transform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stop_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform): Promise<ApiResponse<B, C>>
    stop_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stop_transform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stop_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform, callback: callbackFn<B, C>): TransportRequestCallback
    stop_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stopTransform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stopTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform): Promise<ApiResponse<B, C>>
    stopTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stopTransform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stopTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform, callback: callbackFn<B, C>): TransportRequestCallback
    stopTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    update_transform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    update_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>): Promise<ApiResponse<B, C>>
    update_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    update_transform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    update_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    update_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    updateTransform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    updateTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>): Promise<ApiResponse<B, C>>
    updateTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    updateTransform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    updateTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    updateTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  dataFrameTransformDeprecated: {
    delete_transform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform): Promise<ApiResponse<B, C>>
    delete_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_transform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, callback: callbackFn<B, C>): TransportRequestCallback
    delete_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteTransform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform): Promise<ApiResponse<B, C>>
    deleteTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteTransform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, callback: callbackFn<B, C>): TransportRequestCallback
    deleteTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedDeleteTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_transform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform): Promise<ApiResponse<B, C>>
    get_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_transform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform, callback: callbackFn<B, C>): TransportRequestCallback
    get_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getTransform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform): Promise<ApiResponse<B, C>>
    getTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getTransform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform, callback: callbackFn<B, C>): TransportRequestCallback
    getTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_transform_stats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_transform_stats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats): Promise<ApiResponse<B, C>>
    get_transform_stats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_transform_stats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_transform_stats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, callback: callbackFn<B, C>): TransportRequestCallback
    get_transform_stats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getTransformStats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getTransformStats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats): Promise<ApiResponse<B, C>>
    getTransformStats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getTransformStats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getTransformStats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, callback: callbackFn<B, C>): TransportRequestCallback
    getTransformStats<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedGetTransformStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    preview_transform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    preview_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>): Promise<ApiResponse<B, C>>
    preview_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    preview_transform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    preview_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    preview_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    previewTransform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    previewTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>): Promise<ApiResponse<B, C>>
    previewTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    previewTransform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    previewTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    previewTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPreviewTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_transform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>): Promise<ApiResponse<B, C>>
    put_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_transform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putTransform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>): Promise<ApiResponse<B, C>>
    putTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putTransform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedPutTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    start_transform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    start_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform): Promise<ApiResponse<B, C>>
    start_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    start_transform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    start_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform, callback: callbackFn<B, C>): TransportRequestCallback
    start_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    startTransform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    startTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform): Promise<ApiResponse<B, C>>
    startTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    startTransform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    startTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform, callback: callbackFn<B, C>): TransportRequestCallback
    startTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStartTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stop_transform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stop_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform): Promise<ApiResponse<B, C>>
    stop_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stop_transform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stop_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform, callback: callbackFn<B, C>): TransportRequestCallback
    stop_transform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stopTransform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stopTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform): Promise<ApiResponse<B, C>>
    stopTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stopTransform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stopTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform, callback: callbackFn<B, C>): TransportRequestCallback
    stopTransform<B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedStopTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    update_transform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    update_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>): Promise<ApiResponse<B, C>>
    update_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    update_transform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    update_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    update_transform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    updateTransform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    updateTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>): Promise<ApiResponse<B, C>>
    updateTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    updateTransform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    updateTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    updateTransform<T = any, B = any, C = any> (params: RequestParams.DataFrameTransformDeprecatedUpdateTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  delete<B = any, C = any> (): Promise<ApiResponse<B, C>>
  delete<B = any, C = any> (params: RequestParams.Delete): Promise<ApiResponse<B, C>>
  delete<B = any, C = any> (params: RequestParams.Delete, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  delete<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  delete<B = any, C = any> (params: RequestParams.Delete, callback: callbackFn<B, C>): TransportRequestCallback
  delete<B = any, C = any> (params: RequestParams.Delete, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  delete_by_query<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  delete_by_query<T = any, B = any, C = any> (params: RequestParams.DeleteByQuery<T>): Promise<ApiResponse<B, C>>
  delete_by_query<T = any, B = any, C = any> (params: RequestParams.DeleteByQuery<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  delete_by_query<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  delete_by_query<T = any, B = any, C = any> (params: RequestParams.DeleteByQuery<T>, callback: callbackFn<B, C>): TransportRequestCallback
  delete_by_query<T = any, B = any, C = any> (params: RequestParams.DeleteByQuery<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  deleteByQuery<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  deleteByQuery<T = any, B = any, C = any> (params: RequestParams.DeleteByQuery<T>): Promise<ApiResponse<B, C>>
  deleteByQuery<T = any, B = any, C = any> (params: RequestParams.DeleteByQuery<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  deleteByQuery<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  deleteByQuery<T = any, B = any, C = any> (params: RequestParams.DeleteByQuery<T>, callback: callbackFn<B, C>): TransportRequestCallback
  deleteByQuery<T = any, B = any, C = any> (params: RequestParams.DeleteByQuery<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  delete_by_query_rethrottle<B = any, C = any> (): Promise<ApiResponse<B, C>>
  delete_by_query_rethrottle<B = any, C = any> (params: RequestParams.DeleteByQueryRethrottle): Promise<ApiResponse<B, C>>
  delete_by_query_rethrottle<B = any, C = any> (params: RequestParams.DeleteByQueryRethrottle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  delete_by_query_rethrottle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  delete_by_query_rethrottle<B = any, C = any> (params: RequestParams.DeleteByQueryRethrottle, callback: callbackFn<B, C>): TransportRequestCallback
  delete_by_query_rethrottle<B = any, C = any> (params: RequestParams.DeleteByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  deleteByQueryRethrottle<B = any, C = any> (): Promise<ApiResponse<B, C>>
  deleteByQueryRethrottle<B = any, C = any> (params: RequestParams.DeleteByQueryRethrottle): Promise<ApiResponse<B, C>>
  deleteByQueryRethrottle<B = any, C = any> (params: RequestParams.DeleteByQueryRethrottle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  deleteByQueryRethrottle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  deleteByQueryRethrottle<B = any, C = any> (params: RequestParams.DeleteByQueryRethrottle, callback: callbackFn<B, C>): TransportRequestCallback
  deleteByQueryRethrottle<B = any, C = any> (params: RequestParams.DeleteByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  delete_script<B = any, C = any> (): Promise<ApiResponse<B, C>>
  delete_script<B = any, C = any> (params: RequestParams.DeleteScript): Promise<ApiResponse<B, C>>
  delete_script<B = any, C = any> (params: RequestParams.DeleteScript, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  delete_script<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  delete_script<B = any, C = any> (params: RequestParams.DeleteScript, callback: callbackFn<B, C>): TransportRequestCallback
  delete_script<B = any, C = any> (params: RequestParams.DeleteScript, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  deleteScript<B = any, C = any> (): Promise<ApiResponse<B, C>>
  deleteScript<B = any, C = any> (params: RequestParams.DeleteScript): Promise<ApiResponse<B, C>>
  deleteScript<B = any, C = any> (params: RequestParams.DeleteScript, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  deleteScript<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  deleteScript<B = any, C = any> (params: RequestParams.DeleteScript, callback: callbackFn<B, C>): TransportRequestCallback
  deleteScript<B = any, C = any> (params: RequestParams.DeleteScript, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  enrich: {
    delete_policy<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_policy<B = any, C = any> (params: RequestParams.EnrichDeletePolicy): Promise<ApiResponse<B, C>>
    delete_policy<B = any, C = any> (params: RequestParams.EnrichDeletePolicy, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_policy<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_policy<B = any, C = any> (params: RequestParams.EnrichDeletePolicy, callback: callbackFn<B, C>): TransportRequestCallback
    delete_policy<B = any, C = any> (params: RequestParams.EnrichDeletePolicy, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deletePolicy<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deletePolicy<B = any, C = any> (params: RequestParams.EnrichDeletePolicy): Promise<ApiResponse<B, C>>
    deletePolicy<B = any, C = any> (params: RequestParams.EnrichDeletePolicy, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deletePolicy<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deletePolicy<B = any, C = any> (params: RequestParams.EnrichDeletePolicy, callback: callbackFn<B, C>): TransportRequestCallback
    deletePolicy<B = any, C = any> (params: RequestParams.EnrichDeletePolicy, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    execute_policy<B = any, C = any> (): Promise<ApiResponse<B, C>>
    execute_policy<B = any, C = any> (params: RequestParams.EnrichExecutePolicy): Promise<ApiResponse<B, C>>
    execute_policy<B = any, C = any> (params: RequestParams.EnrichExecutePolicy, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    execute_policy<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    execute_policy<B = any, C = any> (params: RequestParams.EnrichExecutePolicy, callback: callbackFn<B, C>): TransportRequestCallback
    execute_policy<B = any, C = any> (params: RequestParams.EnrichExecutePolicy, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    executePolicy<B = any, C = any> (): Promise<ApiResponse<B, C>>
    executePolicy<B = any, C = any> (params: RequestParams.EnrichExecutePolicy): Promise<ApiResponse<B, C>>
    executePolicy<B = any, C = any> (params: RequestParams.EnrichExecutePolicy, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    executePolicy<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    executePolicy<B = any, C = any> (params: RequestParams.EnrichExecutePolicy, callback: callbackFn<B, C>): TransportRequestCallback
    executePolicy<B = any, C = any> (params: RequestParams.EnrichExecutePolicy, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_policy<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_policy<B = any, C = any> (params: RequestParams.EnrichGetPolicy): Promise<ApiResponse<B, C>>
    get_policy<B = any, C = any> (params: RequestParams.EnrichGetPolicy, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_policy<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_policy<B = any, C = any> (params: RequestParams.EnrichGetPolicy, callback: callbackFn<B, C>): TransportRequestCallback
    get_policy<B = any, C = any> (params: RequestParams.EnrichGetPolicy, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getPolicy<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getPolicy<B = any, C = any> (params: RequestParams.EnrichGetPolicy): Promise<ApiResponse<B, C>>
    getPolicy<B = any, C = any> (params: RequestParams.EnrichGetPolicy, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getPolicy<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getPolicy<B = any, C = any> (params: RequestParams.EnrichGetPolicy, callback: callbackFn<B, C>): TransportRequestCallback
    getPolicy<B = any, C = any> (params: RequestParams.EnrichGetPolicy, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_policy<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_policy<T = any, B = any, C = any> (params: RequestParams.EnrichPutPolicy<T>): Promise<ApiResponse<B, C>>
    put_policy<T = any, B = any, C = any> (params: RequestParams.EnrichPutPolicy<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_policy<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_policy<T = any, B = any, C = any> (params: RequestParams.EnrichPutPolicy<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_policy<T = any, B = any, C = any> (params: RequestParams.EnrichPutPolicy<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putPolicy<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putPolicy<T = any, B = any, C = any> (params: RequestParams.EnrichPutPolicy<T>): Promise<ApiResponse<B, C>>
    putPolicy<T = any, B = any, C = any> (params: RequestParams.EnrichPutPolicy<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putPolicy<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putPolicy<T = any, B = any, C = any> (params: RequestParams.EnrichPutPolicy<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putPolicy<T = any, B = any, C = any> (params: RequestParams.EnrichPutPolicy<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (params: RequestParams.EnrichStats): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (params: RequestParams.EnrichStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (params: RequestParams.EnrichStats, callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (params: RequestParams.EnrichStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  eql: {
    search<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    search<T = any, B = any, C = any> (params: RequestParams.EqlSearch<T>): Promise<ApiResponse<B, C>>
    search<T = any, B = any, C = any> (params: RequestParams.EqlSearch<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    search<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    search<T = any, B = any, C = any> (params: RequestParams.EqlSearch<T>, callback: callbackFn<B, C>): TransportRequestCallback
    search<T = any, B = any, C = any> (params: RequestParams.EqlSearch<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  exists<B = any, C = any> (): Promise<ApiResponse<B, C>>
  exists<B = any, C = any> (params: RequestParams.Exists): Promise<ApiResponse<B, C>>
  exists<B = any, C = any> (params: RequestParams.Exists, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  exists<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  exists<B = any, C = any> (params: RequestParams.Exists, callback: callbackFn<B, C>): TransportRequestCallback
  exists<B = any, C = any> (params: RequestParams.Exists, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  exists_source<B = any, C = any> (): Promise<ApiResponse<B, C>>
  exists_source<B = any, C = any> (params: RequestParams.ExistsSource): Promise<ApiResponse<B, C>>
  exists_source<B = any, C = any> (params: RequestParams.ExistsSource, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  exists_source<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  exists_source<B = any, C = any> (params: RequestParams.ExistsSource, callback: callbackFn<B, C>): TransportRequestCallback
  exists_source<B = any, C = any> (params: RequestParams.ExistsSource, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  existsSource<B = any, C = any> (): Promise<ApiResponse<B, C>>
  existsSource<B = any, C = any> (params: RequestParams.ExistsSource): Promise<ApiResponse<B, C>>
  existsSource<B = any, C = any> (params: RequestParams.ExistsSource, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  existsSource<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  existsSource<B = any, C = any> (params: RequestParams.ExistsSource, callback: callbackFn<B, C>): TransportRequestCallback
  existsSource<B = any, C = any> (params: RequestParams.ExistsSource, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  explain<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  explain<T = any, B = any, C = any> (params: RequestParams.Explain<T>): Promise<ApiResponse<B, C>>
  explain<T = any, B = any, C = any> (params: RequestParams.Explain<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  explain<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  explain<T = any, B = any, C = any> (params: RequestParams.Explain<T>, callback: callbackFn<B, C>): TransportRequestCallback
  explain<T = any, B = any, C = any> (params: RequestParams.Explain<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  field_caps<B = any, C = any> (): Promise<ApiResponse<B, C>>
  field_caps<B = any, C = any> (params: RequestParams.FieldCaps): Promise<ApiResponse<B, C>>
  field_caps<B = any, C = any> (params: RequestParams.FieldCaps, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  field_caps<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  field_caps<B = any, C = any> (params: RequestParams.FieldCaps, callback: callbackFn<B, C>): TransportRequestCallback
  field_caps<B = any, C = any> (params: RequestParams.FieldCaps, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  fieldCaps<B = any, C = any> (): Promise<ApiResponse<B, C>>
  fieldCaps<B = any, C = any> (params: RequestParams.FieldCaps): Promise<ApiResponse<B, C>>
  fieldCaps<B = any, C = any> (params: RequestParams.FieldCaps, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  fieldCaps<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  fieldCaps<B = any, C = any> (params: RequestParams.FieldCaps, callback: callbackFn<B, C>): TransportRequestCallback
  fieldCaps<B = any, C = any> (params: RequestParams.FieldCaps, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  get<B = any, C = any> (): Promise<ApiResponse<B, C>>
  get<B = any, C = any> (params: RequestParams.Get): Promise<ApiResponse<B, C>>
  get<B = any, C = any> (params: RequestParams.Get, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  get<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  get<B = any, C = any> (params: RequestParams.Get, callback: callbackFn<B, C>): TransportRequestCallback
  get<B = any, C = any> (params: RequestParams.Get, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  get_script<B = any, C = any> (): Promise<ApiResponse<B, C>>
  get_script<B = any, C = any> (params: RequestParams.GetScript): Promise<ApiResponse<B, C>>
  get_script<B = any, C = any> (params: RequestParams.GetScript, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  get_script<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  get_script<B = any, C = any> (params: RequestParams.GetScript, callback: callbackFn<B, C>): TransportRequestCallback
  get_script<B = any, C = any> (params: RequestParams.GetScript, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  getScript<B = any, C = any> (): Promise<ApiResponse<B, C>>
  getScript<B = any, C = any> (params: RequestParams.GetScript): Promise<ApiResponse<B, C>>
  getScript<B = any, C = any> (params: RequestParams.GetScript, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  getScript<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  getScript<B = any, C = any> (params: RequestParams.GetScript, callback: callbackFn<B, C>): TransportRequestCallback
  getScript<B = any, C = any> (params: RequestParams.GetScript, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  get_script_context<B = any, C = any> (): Promise<ApiResponse<B, C>>
  get_script_context<B = any, C = any> (params: RequestParams.GetScriptContext): Promise<ApiResponse<B, C>>
  get_script_context<B = any, C = any> (params: RequestParams.GetScriptContext, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  get_script_context<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  get_script_context<B = any, C = any> (params: RequestParams.GetScriptContext, callback: callbackFn<B, C>): TransportRequestCallback
  get_script_context<B = any, C = any> (params: RequestParams.GetScriptContext, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  getScriptContext<B = any, C = any> (): Promise<ApiResponse<B, C>>
  getScriptContext<B = any, C = any> (params: RequestParams.GetScriptContext): Promise<ApiResponse<B, C>>
  getScriptContext<B = any, C = any> (params: RequestParams.GetScriptContext, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  getScriptContext<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  getScriptContext<B = any, C = any> (params: RequestParams.GetScriptContext, callback: callbackFn<B, C>): TransportRequestCallback
  getScriptContext<B = any, C = any> (params: RequestParams.GetScriptContext, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  get_script_languages<B = any, C = any> (): Promise<ApiResponse<B, C>>
  get_script_languages<B = any, C = any> (params: RequestParams.GetScriptLanguages): Promise<ApiResponse<B, C>>
  get_script_languages<B = any, C = any> (params: RequestParams.GetScriptLanguages, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  get_script_languages<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  get_script_languages<B = any, C = any> (params: RequestParams.GetScriptLanguages, callback: callbackFn<B, C>): TransportRequestCallback
  get_script_languages<B = any, C = any> (params: RequestParams.GetScriptLanguages, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  getScriptLanguages<B = any, C = any> (): Promise<ApiResponse<B, C>>
  getScriptLanguages<B = any, C = any> (params: RequestParams.GetScriptLanguages): Promise<ApiResponse<B, C>>
  getScriptLanguages<B = any, C = any> (params: RequestParams.GetScriptLanguages, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  getScriptLanguages<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  getScriptLanguages<B = any, C = any> (params: RequestParams.GetScriptLanguages, callback: callbackFn<B, C>): TransportRequestCallback
  getScriptLanguages<B = any, C = any> (params: RequestParams.GetScriptLanguages, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  get_source<B = any, C = any> (): Promise<ApiResponse<B, C>>
  get_source<B = any, C = any> (params: RequestParams.GetSource): Promise<ApiResponse<B, C>>
  get_source<B = any, C = any> (params: RequestParams.GetSource, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  get_source<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  get_source<B = any, C = any> (params: RequestParams.GetSource, callback: callbackFn<B, C>): TransportRequestCallback
  get_source<B = any, C = any> (params: RequestParams.GetSource, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  getSource<B = any, C = any> (): Promise<ApiResponse<B, C>>
  getSource<B = any, C = any> (params: RequestParams.GetSource): Promise<ApiResponse<B, C>>
  getSource<B = any, C = any> (params: RequestParams.GetSource, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  getSource<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  getSource<B = any, C = any> (params: RequestParams.GetSource, callback: callbackFn<B, C>): TransportRequestCallback
  getSource<B = any, C = any> (params: RequestParams.GetSource, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  graph: {
    explore<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    explore<T = any, B = any, C = any> (params: RequestParams.GraphExplore<T>): Promise<ApiResponse<B, C>>
    explore<T = any, B = any, C = any> (params: RequestParams.GraphExplore<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    explore<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    explore<T = any, B = any, C = any> (params: RequestParams.GraphExplore<T>, callback: callbackFn<B, C>): TransportRequestCallback
    explore<T = any, B = any, C = any> (params: RequestParams.GraphExplore<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  ilm: {
    delete_lifecycle<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_lifecycle<B = any, C = any> (params: RequestParams.IlmDeleteLifecycle): Promise<ApiResponse<B, C>>
    delete_lifecycle<B = any, C = any> (params: RequestParams.IlmDeleteLifecycle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_lifecycle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_lifecycle<B = any, C = any> (params: RequestParams.IlmDeleteLifecycle, callback: callbackFn<B, C>): TransportRequestCallback
    delete_lifecycle<B = any, C = any> (params: RequestParams.IlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteLifecycle<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteLifecycle<B = any, C = any> (params: RequestParams.IlmDeleteLifecycle): Promise<ApiResponse<B, C>>
    deleteLifecycle<B = any, C = any> (params: RequestParams.IlmDeleteLifecycle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteLifecycle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteLifecycle<B = any, C = any> (params: RequestParams.IlmDeleteLifecycle, callback: callbackFn<B, C>): TransportRequestCallback
    deleteLifecycle<B = any, C = any> (params: RequestParams.IlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    explain_lifecycle<B = any, C = any> (): Promise<ApiResponse<B, C>>
    explain_lifecycle<B = any, C = any> (params: RequestParams.IlmExplainLifecycle): Promise<ApiResponse<B, C>>
    explain_lifecycle<B = any, C = any> (params: RequestParams.IlmExplainLifecycle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    explain_lifecycle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    explain_lifecycle<B = any, C = any> (params: RequestParams.IlmExplainLifecycle, callback: callbackFn<B, C>): TransportRequestCallback
    explain_lifecycle<B = any, C = any> (params: RequestParams.IlmExplainLifecycle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    explainLifecycle<B = any, C = any> (): Promise<ApiResponse<B, C>>
    explainLifecycle<B = any, C = any> (params: RequestParams.IlmExplainLifecycle): Promise<ApiResponse<B, C>>
    explainLifecycle<B = any, C = any> (params: RequestParams.IlmExplainLifecycle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    explainLifecycle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    explainLifecycle<B = any, C = any> (params: RequestParams.IlmExplainLifecycle, callback: callbackFn<B, C>): TransportRequestCallback
    explainLifecycle<B = any, C = any> (params: RequestParams.IlmExplainLifecycle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_lifecycle<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_lifecycle<B = any, C = any> (params: RequestParams.IlmGetLifecycle): Promise<ApiResponse<B, C>>
    get_lifecycle<B = any, C = any> (params: RequestParams.IlmGetLifecycle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_lifecycle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_lifecycle<B = any, C = any> (params: RequestParams.IlmGetLifecycle, callback: callbackFn<B, C>): TransportRequestCallback
    get_lifecycle<B = any, C = any> (params: RequestParams.IlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getLifecycle<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getLifecycle<B = any, C = any> (params: RequestParams.IlmGetLifecycle): Promise<ApiResponse<B, C>>
    getLifecycle<B = any, C = any> (params: RequestParams.IlmGetLifecycle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getLifecycle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getLifecycle<B = any, C = any> (params: RequestParams.IlmGetLifecycle, callback: callbackFn<B, C>): TransportRequestCallback
    getLifecycle<B = any, C = any> (params: RequestParams.IlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_status<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_status<B = any, C = any> (params: RequestParams.IlmGetStatus): Promise<ApiResponse<B, C>>
    get_status<B = any, C = any> (params: RequestParams.IlmGetStatus, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_status<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_status<B = any, C = any> (params: RequestParams.IlmGetStatus, callback: callbackFn<B, C>): TransportRequestCallback
    get_status<B = any, C = any> (params: RequestParams.IlmGetStatus, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getStatus<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getStatus<B = any, C = any> (params: RequestParams.IlmGetStatus): Promise<ApiResponse<B, C>>
    getStatus<B = any, C = any> (params: RequestParams.IlmGetStatus, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getStatus<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getStatus<B = any, C = any> (params: RequestParams.IlmGetStatus, callback: callbackFn<B, C>): TransportRequestCallback
    getStatus<B = any, C = any> (params: RequestParams.IlmGetStatus, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    move_to_step<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    move_to_step<T = any, B = any, C = any> (params: RequestParams.IlmMoveToStep<T>): Promise<ApiResponse<B, C>>
    move_to_step<T = any, B = any, C = any> (params: RequestParams.IlmMoveToStep<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    move_to_step<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    move_to_step<T = any, B = any, C = any> (params: RequestParams.IlmMoveToStep<T>, callback: callbackFn<B, C>): TransportRequestCallback
    move_to_step<T = any, B = any, C = any> (params: RequestParams.IlmMoveToStep<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    moveToStep<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    moveToStep<T = any, B = any, C = any> (params: RequestParams.IlmMoveToStep<T>): Promise<ApiResponse<B, C>>
    moveToStep<T = any, B = any, C = any> (params: RequestParams.IlmMoveToStep<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    moveToStep<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    moveToStep<T = any, B = any, C = any> (params: RequestParams.IlmMoveToStep<T>, callback: callbackFn<B, C>): TransportRequestCallback
    moveToStep<T = any, B = any, C = any> (params: RequestParams.IlmMoveToStep<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_lifecycle<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_lifecycle<T = any, B = any, C = any> (params: RequestParams.IlmPutLifecycle<T>): Promise<ApiResponse<B, C>>
    put_lifecycle<T = any, B = any, C = any> (params: RequestParams.IlmPutLifecycle<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_lifecycle<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_lifecycle<T = any, B = any, C = any> (params: RequestParams.IlmPutLifecycle<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_lifecycle<T = any, B = any, C = any> (params: RequestParams.IlmPutLifecycle<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putLifecycle<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putLifecycle<T = any, B = any, C = any> (params: RequestParams.IlmPutLifecycle<T>): Promise<ApiResponse<B, C>>
    putLifecycle<T = any, B = any, C = any> (params: RequestParams.IlmPutLifecycle<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putLifecycle<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putLifecycle<T = any, B = any, C = any> (params: RequestParams.IlmPutLifecycle<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putLifecycle<T = any, B = any, C = any> (params: RequestParams.IlmPutLifecycle<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    remove_policy<B = any, C = any> (): Promise<ApiResponse<B, C>>
    remove_policy<B = any, C = any> (params: RequestParams.IlmRemovePolicy): Promise<ApiResponse<B, C>>
    remove_policy<B = any, C = any> (params: RequestParams.IlmRemovePolicy, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    remove_policy<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    remove_policy<B = any, C = any> (params: RequestParams.IlmRemovePolicy, callback: callbackFn<B, C>): TransportRequestCallback
    remove_policy<B = any, C = any> (params: RequestParams.IlmRemovePolicy, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    removePolicy<B = any, C = any> (): Promise<ApiResponse<B, C>>
    removePolicy<B = any, C = any> (params: RequestParams.IlmRemovePolicy): Promise<ApiResponse<B, C>>
    removePolicy<B = any, C = any> (params: RequestParams.IlmRemovePolicy, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    removePolicy<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    removePolicy<B = any, C = any> (params: RequestParams.IlmRemovePolicy, callback: callbackFn<B, C>): TransportRequestCallback
    removePolicy<B = any, C = any> (params: RequestParams.IlmRemovePolicy, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    retry<B = any, C = any> (): Promise<ApiResponse<B, C>>
    retry<B = any, C = any> (params: RequestParams.IlmRetry): Promise<ApiResponse<B, C>>
    retry<B = any, C = any> (params: RequestParams.IlmRetry, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    retry<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    retry<B = any, C = any> (params: RequestParams.IlmRetry, callback: callbackFn<B, C>): TransportRequestCallback
    retry<B = any, C = any> (params: RequestParams.IlmRetry, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    start<B = any, C = any> (): Promise<ApiResponse<B, C>>
    start<B = any, C = any> (params: RequestParams.IlmStart): Promise<ApiResponse<B, C>>
    start<B = any, C = any> (params: RequestParams.IlmStart, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    start<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    start<B = any, C = any> (params: RequestParams.IlmStart, callback: callbackFn<B, C>): TransportRequestCallback
    start<B = any, C = any> (params: RequestParams.IlmStart, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stop<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stop<B = any, C = any> (params: RequestParams.IlmStop): Promise<ApiResponse<B, C>>
    stop<B = any, C = any> (params: RequestParams.IlmStop, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stop<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stop<B = any, C = any> (params: RequestParams.IlmStop, callback: callbackFn<B, C>): TransportRequestCallback
    stop<B = any, C = any> (params: RequestParams.IlmStop, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  index<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  index<T = any, B = any, C = any> (params: RequestParams.Index<T>): Promise<ApiResponse<B, C>>
  index<T = any, B = any, C = any> (params: RequestParams.Index<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  index<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  index<T = any, B = any, C = any> (params: RequestParams.Index<T>, callback: callbackFn<B, C>): TransportRequestCallback
  index<T = any, B = any, C = any> (params: RequestParams.Index<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  indices: {
    analyze<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    analyze<T = any, B = any, C = any> (params: RequestParams.IndicesAnalyze<T>): Promise<ApiResponse<B, C>>
    analyze<T = any, B = any, C = any> (params: RequestParams.IndicesAnalyze<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    analyze<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    analyze<T = any, B = any, C = any> (params: RequestParams.IndicesAnalyze<T>, callback: callbackFn<B, C>): TransportRequestCallback
    analyze<T = any, B = any, C = any> (params: RequestParams.IndicesAnalyze<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    clear_cache<B = any, C = any> (): Promise<ApiResponse<B, C>>
    clear_cache<B = any, C = any> (params: RequestParams.IndicesClearCache): Promise<ApiResponse<B, C>>
    clear_cache<B = any, C = any> (params: RequestParams.IndicesClearCache, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    clear_cache<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    clear_cache<B = any, C = any> (params: RequestParams.IndicesClearCache, callback: callbackFn<B, C>): TransportRequestCallback
    clear_cache<B = any, C = any> (params: RequestParams.IndicesClearCache, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    clearCache<B = any, C = any> (): Promise<ApiResponse<B, C>>
    clearCache<B = any, C = any> (params: RequestParams.IndicesClearCache): Promise<ApiResponse<B, C>>
    clearCache<B = any, C = any> (params: RequestParams.IndicesClearCache, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    clearCache<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    clearCache<B = any, C = any> (params: RequestParams.IndicesClearCache, callback: callbackFn<B, C>): TransportRequestCallback
    clearCache<B = any, C = any> (params: RequestParams.IndicesClearCache, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    clone<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    clone<T = any, B = any, C = any> (params: RequestParams.IndicesClone<T>): Promise<ApiResponse<B, C>>
    clone<T = any, B = any, C = any> (params: RequestParams.IndicesClone<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    clone<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    clone<T = any, B = any, C = any> (params: RequestParams.IndicesClone<T>, callback: callbackFn<B, C>): TransportRequestCallback
    clone<T = any, B = any, C = any> (params: RequestParams.IndicesClone<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    close<B = any, C = any> (): Promise<ApiResponse<B, C>>
    close<B = any, C = any> (params: RequestParams.IndicesClose): Promise<ApiResponse<B, C>>
    close<B = any, C = any> (params: RequestParams.IndicesClose, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    close<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    close<B = any, C = any> (params: RequestParams.IndicesClose, callback: callbackFn<B, C>): TransportRequestCallback
    close<B = any, C = any> (params: RequestParams.IndicesClose, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    create<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    create<T = any, B = any, C = any> (params: RequestParams.IndicesCreate<T>): Promise<ApiResponse<B, C>>
    create<T = any, B = any, C = any> (params: RequestParams.IndicesCreate<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    create<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    create<T = any, B = any, C = any> (params: RequestParams.IndicesCreate<T>, callback: callbackFn<B, C>): TransportRequestCallback
    create<T = any, B = any, C = any> (params: RequestParams.IndicesCreate<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete<B = any, C = any> (params: RequestParams.IndicesDelete): Promise<ApiResponse<B, C>>
    delete<B = any, C = any> (params: RequestParams.IndicesDelete, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete<B = any, C = any> (params: RequestParams.IndicesDelete, callback: callbackFn<B, C>): TransportRequestCallback
    delete<B = any, C = any> (params: RequestParams.IndicesDelete, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_alias<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_alias<B = any, C = any> (params: RequestParams.IndicesDeleteAlias): Promise<ApiResponse<B, C>>
    delete_alias<B = any, C = any> (params: RequestParams.IndicesDeleteAlias, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_alias<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_alias<B = any, C = any> (params: RequestParams.IndicesDeleteAlias, callback: callbackFn<B, C>): TransportRequestCallback
    delete_alias<B = any, C = any> (params: RequestParams.IndicesDeleteAlias, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteAlias<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteAlias<B = any, C = any> (params: RequestParams.IndicesDeleteAlias): Promise<ApiResponse<B, C>>
    deleteAlias<B = any, C = any> (params: RequestParams.IndicesDeleteAlias, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteAlias<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteAlias<B = any, C = any> (params: RequestParams.IndicesDeleteAlias, callback: callbackFn<B, C>): TransportRequestCallback
    deleteAlias<B = any, C = any> (params: RequestParams.IndicesDeleteAlias, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_template<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_template<B = any, C = any> (params: RequestParams.IndicesDeleteTemplate): Promise<ApiResponse<B, C>>
    delete_template<B = any, C = any> (params: RequestParams.IndicesDeleteTemplate, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_template<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_template<B = any, C = any> (params: RequestParams.IndicesDeleteTemplate, callback: callbackFn<B, C>): TransportRequestCallback
    delete_template<B = any, C = any> (params: RequestParams.IndicesDeleteTemplate, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteTemplate<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteTemplate<B = any, C = any> (params: RequestParams.IndicesDeleteTemplate): Promise<ApiResponse<B, C>>
    deleteTemplate<B = any, C = any> (params: RequestParams.IndicesDeleteTemplate, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteTemplate<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteTemplate<B = any, C = any> (params: RequestParams.IndicesDeleteTemplate, callback: callbackFn<B, C>): TransportRequestCallback
    deleteTemplate<B = any, C = any> (params: RequestParams.IndicesDeleteTemplate, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    exists<B = any, C = any> (): Promise<ApiResponse<B, C>>
    exists<B = any, C = any> (params: RequestParams.IndicesExists): Promise<ApiResponse<B, C>>
    exists<B = any, C = any> (params: RequestParams.IndicesExists, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    exists<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    exists<B = any, C = any> (params: RequestParams.IndicesExists, callback: callbackFn<B, C>): TransportRequestCallback
    exists<B = any, C = any> (params: RequestParams.IndicesExists, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    exists_alias<B = any, C = any> (): Promise<ApiResponse<B, C>>
    exists_alias<B = any, C = any> (params: RequestParams.IndicesExistsAlias): Promise<ApiResponse<B, C>>
    exists_alias<B = any, C = any> (params: RequestParams.IndicesExistsAlias, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    exists_alias<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    exists_alias<B = any, C = any> (params: RequestParams.IndicesExistsAlias, callback: callbackFn<B, C>): TransportRequestCallback
    exists_alias<B = any, C = any> (params: RequestParams.IndicesExistsAlias, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    existsAlias<B = any, C = any> (): Promise<ApiResponse<B, C>>
    existsAlias<B = any, C = any> (params: RequestParams.IndicesExistsAlias): Promise<ApiResponse<B, C>>
    existsAlias<B = any, C = any> (params: RequestParams.IndicesExistsAlias, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    existsAlias<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    existsAlias<B = any, C = any> (params: RequestParams.IndicesExistsAlias, callback: callbackFn<B, C>): TransportRequestCallback
    existsAlias<B = any, C = any> (params: RequestParams.IndicesExistsAlias, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    exists_template<B = any, C = any> (): Promise<ApiResponse<B, C>>
    exists_template<B = any, C = any> (params: RequestParams.IndicesExistsTemplate): Promise<ApiResponse<B, C>>
    exists_template<B = any, C = any> (params: RequestParams.IndicesExistsTemplate, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    exists_template<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    exists_template<B = any, C = any> (params: RequestParams.IndicesExistsTemplate, callback: callbackFn<B, C>): TransportRequestCallback
    exists_template<B = any, C = any> (params: RequestParams.IndicesExistsTemplate, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    existsTemplate<B = any, C = any> (): Promise<ApiResponse<B, C>>
    existsTemplate<B = any, C = any> (params: RequestParams.IndicesExistsTemplate): Promise<ApiResponse<B, C>>
    existsTemplate<B = any, C = any> (params: RequestParams.IndicesExistsTemplate, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    existsTemplate<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    existsTemplate<B = any, C = any> (params: RequestParams.IndicesExistsTemplate, callback: callbackFn<B, C>): TransportRequestCallback
    existsTemplate<B = any, C = any> (params: RequestParams.IndicesExistsTemplate, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    exists_type<B = any, C = any> (): Promise<ApiResponse<B, C>>
    exists_type<B = any, C = any> (params: RequestParams.IndicesExistsType): Promise<ApiResponse<B, C>>
    exists_type<B = any, C = any> (params: RequestParams.IndicesExistsType, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    exists_type<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    exists_type<B = any, C = any> (params: RequestParams.IndicesExistsType, callback: callbackFn<B, C>): TransportRequestCallback
    exists_type<B = any, C = any> (params: RequestParams.IndicesExistsType, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    existsType<B = any, C = any> (): Promise<ApiResponse<B, C>>
    existsType<B = any, C = any> (params: RequestParams.IndicesExistsType): Promise<ApiResponse<B, C>>
    existsType<B = any, C = any> (params: RequestParams.IndicesExistsType, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    existsType<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    existsType<B = any, C = any> (params: RequestParams.IndicesExistsType, callback: callbackFn<B, C>): TransportRequestCallback
    existsType<B = any, C = any> (params: RequestParams.IndicesExistsType, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    flush<B = any, C = any> (): Promise<ApiResponse<B, C>>
    flush<B = any, C = any> (params: RequestParams.IndicesFlush): Promise<ApiResponse<B, C>>
    flush<B = any, C = any> (params: RequestParams.IndicesFlush, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    flush<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    flush<B = any, C = any> (params: RequestParams.IndicesFlush, callback: callbackFn<B, C>): TransportRequestCallback
    flush<B = any, C = any> (params: RequestParams.IndicesFlush, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    forcemerge<B = any, C = any> (): Promise<ApiResponse<B, C>>
    forcemerge<B = any, C = any> (params: RequestParams.IndicesForcemerge): Promise<ApiResponse<B, C>>
    forcemerge<B = any, C = any> (params: RequestParams.IndicesForcemerge, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    forcemerge<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    forcemerge<B = any, C = any> (params: RequestParams.IndicesForcemerge, callback: callbackFn<B, C>): TransportRequestCallback
    forcemerge<B = any, C = any> (params: RequestParams.IndicesForcemerge, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    freeze<B = any, C = any> (): Promise<ApiResponse<B, C>>
    freeze<B = any, C = any> (params: RequestParams.IndicesFreeze): Promise<ApiResponse<B, C>>
    freeze<B = any, C = any> (params: RequestParams.IndicesFreeze, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    freeze<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    freeze<B = any, C = any> (params: RequestParams.IndicesFreeze, callback: callbackFn<B, C>): TransportRequestCallback
    freeze<B = any, C = any> (params: RequestParams.IndicesFreeze, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (params: RequestParams.IndicesGet): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (params: RequestParams.IndicesGet, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (params: RequestParams.IndicesGet, callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (params: RequestParams.IndicesGet, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_alias<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_alias<B = any, C = any> (params: RequestParams.IndicesGetAlias): Promise<ApiResponse<B, C>>
    get_alias<B = any, C = any> (params: RequestParams.IndicesGetAlias, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_alias<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_alias<B = any, C = any> (params: RequestParams.IndicesGetAlias, callback: callbackFn<B, C>): TransportRequestCallback
    get_alias<B = any, C = any> (params: RequestParams.IndicesGetAlias, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getAlias<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getAlias<B = any, C = any> (params: RequestParams.IndicesGetAlias): Promise<ApiResponse<B, C>>
    getAlias<B = any, C = any> (params: RequestParams.IndicesGetAlias, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getAlias<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getAlias<B = any, C = any> (params: RequestParams.IndicesGetAlias, callback: callbackFn<B, C>): TransportRequestCallback
    getAlias<B = any, C = any> (params: RequestParams.IndicesGetAlias, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_field_mapping<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_field_mapping<B = any, C = any> (params: RequestParams.IndicesGetFieldMapping): Promise<ApiResponse<B, C>>
    get_field_mapping<B = any, C = any> (params: RequestParams.IndicesGetFieldMapping, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_field_mapping<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_field_mapping<B = any, C = any> (params: RequestParams.IndicesGetFieldMapping, callback: callbackFn<B, C>): TransportRequestCallback
    get_field_mapping<B = any, C = any> (params: RequestParams.IndicesGetFieldMapping, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getFieldMapping<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getFieldMapping<B = any, C = any> (params: RequestParams.IndicesGetFieldMapping): Promise<ApiResponse<B, C>>
    getFieldMapping<B = any, C = any> (params: RequestParams.IndicesGetFieldMapping, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getFieldMapping<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getFieldMapping<B = any, C = any> (params: RequestParams.IndicesGetFieldMapping, callback: callbackFn<B, C>): TransportRequestCallback
    getFieldMapping<B = any, C = any> (params: RequestParams.IndicesGetFieldMapping, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_mapping<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_mapping<B = any, C = any> (params: RequestParams.IndicesGetMapping): Promise<ApiResponse<B, C>>
    get_mapping<B = any, C = any> (params: RequestParams.IndicesGetMapping, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_mapping<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_mapping<B = any, C = any> (params: RequestParams.IndicesGetMapping, callback: callbackFn<B, C>): TransportRequestCallback
    get_mapping<B = any, C = any> (params: RequestParams.IndicesGetMapping, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getMapping<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getMapping<B = any, C = any> (params: RequestParams.IndicesGetMapping): Promise<ApiResponse<B, C>>
    getMapping<B = any, C = any> (params: RequestParams.IndicesGetMapping, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getMapping<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getMapping<B = any, C = any> (params: RequestParams.IndicesGetMapping, callback: callbackFn<B, C>): TransportRequestCallback
    getMapping<B = any, C = any> (params: RequestParams.IndicesGetMapping, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_settings<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_settings<B = any, C = any> (params: RequestParams.IndicesGetSettings): Promise<ApiResponse<B, C>>
    get_settings<B = any, C = any> (params: RequestParams.IndicesGetSettings, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_settings<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_settings<B = any, C = any> (params: RequestParams.IndicesGetSettings, callback: callbackFn<B, C>): TransportRequestCallback
    get_settings<B = any, C = any> (params: RequestParams.IndicesGetSettings, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getSettings<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getSettings<B = any, C = any> (params: RequestParams.IndicesGetSettings): Promise<ApiResponse<B, C>>
    getSettings<B = any, C = any> (params: RequestParams.IndicesGetSettings, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getSettings<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getSettings<B = any, C = any> (params: RequestParams.IndicesGetSettings, callback: callbackFn<B, C>): TransportRequestCallback
    getSettings<B = any, C = any> (params: RequestParams.IndicesGetSettings, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_template<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_template<B = any, C = any> (params: RequestParams.IndicesGetTemplate): Promise<ApiResponse<B, C>>
    get_template<B = any, C = any> (params: RequestParams.IndicesGetTemplate, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_template<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_template<B = any, C = any> (params: RequestParams.IndicesGetTemplate, callback: callbackFn<B, C>): TransportRequestCallback
    get_template<B = any, C = any> (params: RequestParams.IndicesGetTemplate, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getTemplate<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getTemplate<B = any, C = any> (params: RequestParams.IndicesGetTemplate): Promise<ApiResponse<B, C>>
    getTemplate<B = any, C = any> (params: RequestParams.IndicesGetTemplate, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getTemplate<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getTemplate<B = any, C = any> (params: RequestParams.IndicesGetTemplate, callback: callbackFn<B, C>): TransportRequestCallback
    getTemplate<B = any, C = any> (params: RequestParams.IndicesGetTemplate, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_upgrade<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_upgrade<B = any, C = any> (params: RequestParams.IndicesGetUpgrade): Promise<ApiResponse<B, C>>
    get_upgrade<B = any, C = any> (params: RequestParams.IndicesGetUpgrade, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_upgrade<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_upgrade<B = any, C = any> (params: RequestParams.IndicesGetUpgrade, callback: callbackFn<B, C>): TransportRequestCallback
    get_upgrade<B = any, C = any> (params: RequestParams.IndicesGetUpgrade, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getUpgrade<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getUpgrade<B = any, C = any> (params: RequestParams.IndicesGetUpgrade): Promise<ApiResponse<B, C>>
    getUpgrade<B = any, C = any> (params: RequestParams.IndicesGetUpgrade, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getUpgrade<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getUpgrade<B = any, C = any> (params: RequestParams.IndicesGetUpgrade, callback: callbackFn<B, C>): TransportRequestCallback
    getUpgrade<B = any, C = any> (params: RequestParams.IndicesGetUpgrade, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    open<B = any, C = any> (): Promise<ApiResponse<B, C>>
    open<B = any, C = any> (params: RequestParams.IndicesOpen): Promise<ApiResponse<B, C>>
    open<B = any, C = any> (params: RequestParams.IndicesOpen, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    open<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    open<B = any, C = any> (params: RequestParams.IndicesOpen, callback: callbackFn<B, C>): TransportRequestCallback
    open<B = any, C = any> (params: RequestParams.IndicesOpen, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_alias<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_alias<T = any, B = any, C = any> (params: RequestParams.IndicesPutAlias<T>): Promise<ApiResponse<B, C>>
    put_alias<T = any, B = any, C = any> (params: RequestParams.IndicesPutAlias<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_alias<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_alias<T = any, B = any, C = any> (params: RequestParams.IndicesPutAlias<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_alias<T = any, B = any, C = any> (params: RequestParams.IndicesPutAlias<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putAlias<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putAlias<T = any, B = any, C = any> (params: RequestParams.IndicesPutAlias<T>): Promise<ApiResponse<B, C>>
    putAlias<T = any, B = any, C = any> (params: RequestParams.IndicesPutAlias<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putAlias<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putAlias<T = any, B = any, C = any> (params: RequestParams.IndicesPutAlias<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putAlias<T = any, B = any, C = any> (params: RequestParams.IndicesPutAlias<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_mapping<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_mapping<T = any, B = any, C = any> (params: RequestParams.IndicesPutMapping<T>): Promise<ApiResponse<B, C>>
    put_mapping<T = any, B = any, C = any> (params: RequestParams.IndicesPutMapping<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_mapping<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_mapping<T = any, B = any, C = any> (params: RequestParams.IndicesPutMapping<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_mapping<T = any, B = any, C = any> (params: RequestParams.IndicesPutMapping<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putMapping<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putMapping<T = any, B = any, C = any> (params: RequestParams.IndicesPutMapping<T>): Promise<ApiResponse<B, C>>
    putMapping<T = any, B = any, C = any> (params: RequestParams.IndicesPutMapping<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putMapping<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putMapping<T = any, B = any, C = any> (params: RequestParams.IndicesPutMapping<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putMapping<T = any, B = any, C = any> (params: RequestParams.IndicesPutMapping<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_settings<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_settings<T = any, B = any, C = any> (params: RequestParams.IndicesPutSettings<T>): Promise<ApiResponse<B, C>>
    put_settings<T = any, B = any, C = any> (params: RequestParams.IndicesPutSettings<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_settings<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_settings<T = any, B = any, C = any> (params: RequestParams.IndicesPutSettings<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_settings<T = any, B = any, C = any> (params: RequestParams.IndicesPutSettings<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putSettings<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putSettings<T = any, B = any, C = any> (params: RequestParams.IndicesPutSettings<T>): Promise<ApiResponse<B, C>>
    putSettings<T = any, B = any, C = any> (params: RequestParams.IndicesPutSettings<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putSettings<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putSettings<T = any, B = any, C = any> (params: RequestParams.IndicesPutSettings<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putSettings<T = any, B = any, C = any> (params: RequestParams.IndicesPutSettings<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_template<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_template<T = any, B = any, C = any> (params: RequestParams.IndicesPutTemplate<T>): Promise<ApiResponse<B, C>>
    put_template<T = any, B = any, C = any> (params: RequestParams.IndicesPutTemplate<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_template<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_template<T = any, B = any, C = any> (params: RequestParams.IndicesPutTemplate<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_template<T = any, B = any, C = any> (params: RequestParams.IndicesPutTemplate<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putTemplate<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putTemplate<T = any, B = any, C = any> (params: RequestParams.IndicesPutTemplate<T>): Promise<ApiResponse<B, C>>
    putTemplate<T = any, B = any, C = any> (params: RequestParams.IndicesPutTemplate<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putTemplate<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putTemplate<T = any, B = any, C = any> (params: RequestParams.IndicesPutTemplate<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putTemplate<T = any, B = any, C = any> (params: RequestParams.IndicesPutTemplate<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    recovery<B = any, C = any> (): Promise<ApiResponse<B, C>>
    recovery<B = any, C = any> (params: RequestParams.IndicesRecovery): Promise<ApiResponse<B, C>>
    recovery<B = any, C = any> (params: RequestParams.IndicesRecovery, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    recovery<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    recovery<B = any, C = any> (params: RequestParams.IndicesRecovery, callback: callbackFn<B, C>): TransportRequestCallback
    recovery<B = any, C = any> (params: RequestParams.IndicesRecovery, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    refresh<B = any, C = any> (): Promise<ApiResponse<B, C>>
    refresh<B = any, C = any> (params: RequestParams.IndicesRefresh): Promise<ApiResponse<B, C>>
    refresh<B = any, C = any> (params: RequestParams.IndicesRefresh, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    refresh<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    refresh<B = any, C = any> (params: RequestParams.IndicesRefresh, callback: callbackFn<B, C>): TransportRequestCallback
    refresh<B = any, C = any> (params: RequestParams.IndicesRefresh, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    reload_search_analyzers<B = any, C = any> (): Promise<ApiResponse<B, C>>
    reload_search_analyzers<B = any, C = any> (params: RequestParams.IndicesReloadSearchAnalyzers): Promise<ApiResponse<B, C>>
    reload_search_analyzers<B = any, C = any> (params: RequestParams.IndicesReloadSearchAnalyzers, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    reload_search_analyzers<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    reload_search_analyzers<B = any, C = any> (params: RequestParams.IndicesReloadSearchAnalyzers, callback: callbackFn<B, C>): TransportRequestCallback
    reload_search_analyzers<B = any, C = any> (params: RequestParams.IndicesReloadSearchAnalyzers, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    reloadSearchAnalyzers<B = any, C = any> (): Promise<ApiResponse<B, C>>
    reloadSearchAnalyzers<B = any, C = any> (params: RequestParams.IndicesReloadSearchAnalyzers): Promise<ApiResponse<B, C>>
    reloadSearchAnalyzers<B = any, C = any> (params: RequestParams.IndicesReloadSearchAnalyzers, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    reloadSearchAnalyzers<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    reloadSearchAnalyzers<B = any, C = any> (params: RequestParams.IndicesReloadSearchAnalyzers, callback: callbackFn<B, C>): TransportRequestCallback
    reloadSearchAnalyzers<B = any, C = any> (params: RequestParams.IndicesReloadSearchAnalyzers, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    rollover<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    rollover<T = any, B = any, C = any> (params: RequestParams.IndicesRollover<T>): Promise<ApiResponse<B, C>>
    rollover<T = any, B = any, C = any> (params: RequestParams.IndicesRollover<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    rollover<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    rollover<T = any, B = any, C = any> (params: RequestParams.IndicesRollover<T>, callback: callbackFn<B, C>): TransportRequestCallback
    rollover<T = any, B = any, C = any> (params: RequestParams.IndicesRollover<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    segments<B = any, C = any> (): Promise<ApiResponse<B, C>>
    segments<B = any, C = any> (params: RequestParams.IndicesSegments): Promise<ApiResponse<B, C>>
    segments<B = any, C = any> (params: RequestParams.IndicesSegments, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    segments<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    segments<B = any, C = any> (params: RequestParams.IndicesSegments, callback: callbackFn<B, C>): TransportRequestCallback
    segments<B = any, C = any> (params: RequestParams.IndicesSegments, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    shard_stores<B = any, C = any> (): Promise<ApiResponse<B, C>>
    shard_stores<B = any, C = any> (params: RequestParams.IndicesShardStores): Promise<ApiResponse<B, C>>
    shard_stores<B = any, C = any> (params: RequestParams.IndicesShardStores, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    shard_stores<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    shard_stores<B = any, C = any> (params: RequestParams.IndicesShardStores, callback: callbackFn<B, C>): TransportRequestCallback
    shard_stores<B = any, C = any> (params: RequestParams.IndicesShardStores, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    shardStores<B = any, C = any> (): Promise<ApiResponse<B, C>>
    shardStores<B = any, C = any> (params: RequestParams.IndicesShardStores): Promise<ApiResponse<B, C>>
    shardStores<B = any, C = any> (params: RequestParams.IndicesShardStores, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    shardStores<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    shardStores<B = any, C = any> (params: RequestParams.IndicesShardStores, callback: callbackFn<B, C>): TransportRequestCallback
    shardStores<B = any, C = any> (params: RequestParams.IndicesShardStores, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    shrink<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    shrink<T = any, B = any, C = any> (params: RequestParams.IndicesShrink<T>): Promise<ApiResponse<B, C>>
    shrink<T = any, B = any, C = any> (params: RequestParams.IndicesShrink<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    shrink<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    shrink<T = any, B = any, C = any> (params: RequestParams.IndicesShrink<T>, callback: callbackFn<B, C>): TransportRequestCallback
    shrink<T = any, B = any, C = any> (params: RequestParams.IndicesShrink<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    split<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    split<T = any, B = any, C = any> (params: RequestParams.IndicesSplit<T>): Promise<ApiResponse<B, C>>
    split<T = any, B = any, C = any> (params: RequestParams.IndicesSplit<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    split<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    split<T = any, B = any, C = any> (params: RequestParams.IndicesSplit<T>, callback: callbackFn<B, C>): TransportRequestCallback
    split<T = any, B = any, C = any> (params: RequestParams.IndicesSplit<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (params: RequestParams.IndicesStats): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (params: RequestParams.IndicesStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (params: RequestParams.IndicesStats, callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (params: RequestParams.IndicesStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    unfreeze<B = any, C = any> (): Promise<ApiResponse<B, C>>
    unfreeze<B = any, C = any> (params: RequestParams.IndicesUnfreeze): Promise<ApiResponse<B, C>>
    unfreeze<B = any, C = any> (params: RequestParams.IndicesUnfreeze, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    unfreeze<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    unfreeze<B = any, C = any> (params: RequestParams.IndicesUnfreeze, callback: callbackFn<B, C>): TransportRequestCallback
    unfreeze<B = any, C = any> (params: RequestParams.IndicesUnfreeze, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    update_aliases<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    update_aliases<T = any, B = any, C = any> (params: RequestParams.IndicesUpdateAliases<T>): Promise<ApiResponse<B, C>>
    update_aliases<T = any, B = any, C = any> (params: RequestParams.IndicesUpdateAliases<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    update_aliases<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    update_aliases<T = any, B = any, C = any> (params: RequestParams.IndicesUpdateAliases<T>, callback: callbackFn<B, C>): TransportRequestCallback
    update_aliases<T = any, B = any, C = any> (params: RequestParams.IndicesUpdateAliases<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    updateAliases<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    updateAliases<T = any, B = any, C = any> (params: RequestParams.IndicesUpdateAliases<T>): Promise<ApiResponse<B, C>>
    updateAliases<T = any, B = any, C = any> (params: RequestParams.IndicesUpdateAliases<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    updateAliases<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    updateAliases<T = any, B = any, C = any> (params: RequestParams.IndicesUpdateAliases<T>, callback: callbackFn<B, C>): TransportRequestCallback
    updateAliases<T = any, B = any, C = any> (params: RequestParams.IndicesUpdateAliases<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    upgrade<B = any, C = any> (): Promise<ApiResponse<B, C>>
    upgrade<B = any, C = any> (params: RequestParams.IndicesUpgrade): Promise<ApiResponse<B, C>>
    upgrade<B = any, C = any> (params: RequestParams.IndicesUpgrade, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    upgrade<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    upgrade<B = any, C = any> (params: RequestParams.IndicesUpgrade, callback: callbackFn<B, C>): TransportRequestCallback
    upgrade<B = any, C = any> (params: RequestParams.IndicesUpgrade, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    validate_query<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    validate_query<T = any, B = any, C = any> (params: RequestParams.IndicesValidateQuery<T>): Promise<ApiResponse<B, C>>
    validate_query<T = any, B = any, C = any> (params: RequestParams.IndicesValidateQuery<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    validate_query<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    validate_query<T = any, B = any, C = any> (params: RequestParams.IndicesValidateQuery<T>, callback: callbackFn<B, C>): TransportRequestCallback
    validate_query<T = any, B = any, C = any> (params: RequestParams.IndicesValidateQuery<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    validateQuery<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    validateQuery<T = any, B = any, C = any> (params: RequestParams.IndicesValidateQuery<T>): Promise<ApiResponse<B, C>>
    validateQuery<T = any, B = any, C = any> (params: RequestParams.IndicesValidateQuery<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    validateQuery<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    validateQuery<T = any, B = any, C = any> (params: RequestParams.IndicesValidateQuery<T>, callback: callbackFn<B, C>): TransportRequestCallback
    validateQuery<T = any, B = any, C = any> (params: RequestParams.IndicesValidateQuery<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  info<B = any, C = any> (): Promise<ApiResponse<B, C>>
  info<B = any, C = any> (params: RequestParams.Info): Promise<ApiResponse<B, C>>
  info<B = any, C = any> (params: RequestParams.Info, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  info<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  info<B = any, C = any> (params: RequestParams.Info, callback: callbackFn<B, C>): TransportRequestCallback
  info<B = any, C = any> (params: RequestParams.Info, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  ingest: {
    delete_pipeline<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_pipeline<B = any, C = any> (params: RequestParams.IngestDeletePipeline): Promise<ApiResponse<B, C>>
    delete_pipeline<B = any, C = any> (params: RequestParams.IngestDeletePipeline, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_pipeline<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_pipeline<B = any, C = any> (params: RequestParams.IngestDeletePipeline, callback: callbackFn<B, C>): TransportRequestCallback
    delete_pipeline<B = any, C = any> (params: RequestParams.IngestDeletePipeline, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deletePipeline<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deletePipeline<B = any, C = any> (params: RequestParams.IngestDeletePipeline): Promise<ApiResponse<B, C>>
    deletePipeline<B = any, C = any> (params: RequestParams.IngestDeletePipeline, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deletePipeline<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deletePipeline<B = any, C = any> (params: RequestParams.IngestDeletePipeline, callback: callbackFn<B, C>): TransportRequestCallback
    deletePipeline<B = any, C = any> (params: RequestParams.IngestDeletePipeline, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_pipeline<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_pipeline<B = any, C = any> (params: RequestParams.IngestGetPipeline): Promise<ApiResponse<B, C>>
    get_pipeline<B = any, C = any> (params: RequestParams.IngestGetPipeline, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_pipeline<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_pipeline<B = any, C = any> (params: RequestParams.IngestGetPipeline, callback: callbackFn<B, C>): TransportRequestCallback
    get_pipeline<B = any, C = any> (params: RequestParams.IngestGetPipeline, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getPipeline<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getPipeline<B = any, C = any> (params: RequestParams.IngestGetPipeline): Promise<ApiResponse<B, C>>
    getPipeline<B = any, C = any> (params: RequestParams.IngestGetPipeline, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getPipeline<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getPipeline<B = any, C = any> (params: RequestParams.IngestGetPipeline, callback: callbackFn<B, C>): TransportRequestCallback
    getPipeline<B = any, C = any> (params: RequestParams.IngestGetPipeline, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    processor_grok<B = any, C = any> (): Promise<ApiResponse<B, C>>
    processor_grok<B = any, C = any> (params: RequestParams.IngestProcessorGrok): Promise<ApiResponse<B, C>>
    processor_grok<B = any, C = any> (params: RequestParams.IngestProcessorGrok, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    processor_grok<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    processor_grok<B = any, C = any> (params: RequestParams.IngestProcessorGrok, callback: callbackFn<B, C>): TransportRequestCallback
    processor_grok<B = any, C = any> (params: RequestParams.IngestProcessorGrok, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    processorGrok<B = any, C = any> (): Promise<ApiResponse<B, C>>
    processorGrok<B = any, C = any> (params: RequestParams.IngestProcessorGrok): Promise<ApiResponse<B, C>>
    processorGrok<B = any, C = any> (params: RequestParams.IngestProcessorGrok, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    processorGrok<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    processorGrok<B = any, C = any> (params: RequestParams.IngestProcessorGrok, callback: callbackFn<B, C>): TransportRequestCallback
    processorGrok<B = any, C = any> (params: RequestParams.IngestProcessorGrok, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_pipeline<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_pipeline<T = any, B = any, C = any> (params: RequestParams.IngestPutPipeline<T>): Promise<ApiResponse<B, C>>
    put_pipeline<T = any, B = any, C = any> (params: RequestParams.IngestPutPipeline<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_pipeline<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_pipeline<T = any, B = any, C = any> (params: RequestParams.IngestPutPipeline<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_pipeline<T = any, B = any, C = any> (params: RequestParams.IngestPutPipeline<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putPipeline<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putPipeline<T = any, B = any, C = any> (params: RequestParams.IngestPutPipeline<T>): Promise<ApiResponse<B, C>>
    putPipeline<T = any, B = any, C = any> (params: RequestParams.IngestPutPipeline<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putPipeline<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putPipeline<T = any, B = any, C = any> (params: RequestParams.IngestPutPipeline<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putPipeline<T = any, B = any, C = any> (params: RequestParams.IngestPutPipeline<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    simulate<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    simulate<T = any, B = any, C = any> (params: RequestParams.IngestSimulate<T>): Promise<ApiResponse<B, C>>
    simulate<T = any, B = any, C = any> (params: RequestParams.IngestSimulate<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    simulate<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    simulate<T = any, B = any, C = any> (params: RequestParams.IngestSimulate<T>, callback: callbackFn<B, C>): TransportRequestCallback
    simulate<T = any, B = any, C = any> (params: RequestParams.IngestSimulate<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  license: {
    delete<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete<B = any, C = any> (params: RequestParams.LicenseDelete): Promise<ApiResponse<B, C>>
    delete<B = any, C = any> (params: RequestParams.LicenseDelete, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete<B = any, C = any> (params: RequestParams.LicenseDelete, callback: callbackFn<B, C>): TransportRequestCallback
    delete<B = any, C = any> (params: RequestParams.LicenseDelete, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (params: RequestParams.LicenseGet): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (params: RequestParams.LicenseGet, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (params: RequestParams.LicenseGet, callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (params: RequestParams.LicenseGet, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_basic_status<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_basic_status<B = any, C = any> (params: RequestParams.LicenseGetBasicStatus): Promise<ApiResponse<B, C>>
    get_basic_status<B = any, C = any> (params: RequestParams.LicenseGetBasicStatus, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_basic_status<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_basic_status<B = any, C = any> (params: RequestParams.LicenseGetBasicStatus, callback: callbackFn<B, C>): TransportRequestCallback
    get_basic_status<B = any, C = any> (params: RequestParams.LicenseGetBasicStatus, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getBasicStatus<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getBasicStatus<B = any, C = any> (params: RequestParams.LicenseGetBasicStatus): Promise<ApiResponse<B, C>>
    getBasicStatus<B = any, C = any> (params: RequestParams.LicenseGetBasicStatus, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getBasicStatus<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getBasicStatus<B = any, C = any> (params: RequestParams.LicenseGetBasicStatus, callback: callbackFn<B, C>): TransportRequestCallback
    getBasicStatus<B = any, C = any> (params: RequestParams.LicenseGetBasicStatus, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_trial_status<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_trial_status<B = any, C = any> (params: RequestParams.LicenseGetTrialStatus): Promise<ApiResponse<B, C>>
    get_trial_status<B = any, C = any> (params: RequestParams.LicenseGetTrialStatus, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_trial_status<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_trial_status<B = any, C = any> (params: RequestParams.LicenseGetTrialStatus, callback: callbackFn<B, C>): TransportRequestCallback
    get_trial_status<B = any, C = any> (params: RequestParams.LicenseGetTrialStatus, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getTrialStatus<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getTrialStatus<B = any, C = any> (params: RequestParams.LicenseGetTrialStatus): Promise<ApiResponse<B, C>>
    getTrialStatus<B = any, C = any> (params: RequestParams.LicenseGetTrialStatus, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getTrialStatus<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getTrialStatus<B = any, C = any> (params: RequestParams.LicenseGetTrialStatus, callback: callbackFn<B, C>): TransportRequestCallback
    getTrialStatus<B = any, C = any> (params: RequestParams.LicenseGetTrialStatus, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    post<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    post<T = any, B = any, C = any> (params: RequestParams.LicensePost<T>): Promise<ApiResponse<B, C>>
    post<T = any, B = any, C = any> (params: RequestParams.LicensePost<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    post<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    post<T = any, B = any, C = any> (params: RequestParams.LicensePost<T>, callback: callbackFn<B, C>): TransportRequestCallback
    post<T = any, B = any, C = any> (params: RequestParams.LicensePost<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    post_start_basic<B = any, C = any> (): Promise<ApiResponse<B, C>>
    post_start_basic<B = any, C = any> (params: RequestParams.LicensePostStartBasic): Promise<ApiResponse<B, C>>
    post_start_basic<B = any, C = any> (params: RequestParams.LicensePostStartBasic, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    post_start_basic<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    post_start_basic<B = any, C = any> (params: RequestParams.LicensePostStartBasic, callback: callbackFn<B, C>): TransportRequestCallback
    post_start_basic<B = any, C = any> (params: RequestParams.LicensePostStartBasic, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    postStartBasic<B = any, C = any> (): Promise<ApiResponse<B, C>>
    postStartBasic<B = any, C = any> (params: RequestParams.LicensePostStartBasic): Promise<ApiResponse<B, C>>
    postStartBasic<B = any, C = any> (params: RequestParams.LicensePostStartBasic, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    postStartBasic<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    postStartBasic<B = any, C = any> (params: RequestParams.LicensePostStartBasic, callback: callbackFn<B, C>): TransportRequestCallback
    postStartBasic<B = any, C = any> (params: RequestParams.LicensePostStartBasic, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    post_start_trial<B = any, C = any> (): Promise<ApiResponse<B, C>>
    post_start_trial<B = any, C = any> (params: RequestParams.LicensePostStartTrial): Promise<ApiResponse<B, C>>
    post_start_trial<B = any, C = any> (params: RequestParams.LicensePostStartTrial, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    post_start_trial<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    post_start_trial<B = any, C = any> (params: RequestParams.LicensePostStartTrial, callback: callbackFn<B, C>): TransportRequestCallback
    post_start_trial<B = any, C = any> (params: RequestParams.LicensePostStartTrial, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    postStartTrial<B = any, C = any> (): Promise<ApiResponse<B, C>>
    postStartTrial<B = any, C = any> (params: RequestParams.LicensePostStartTrial): Promise<ApiResponse<B, C>>
    postStartTrial<B = any, C = any> (params: RequestParams.LicensePostStartTrial, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    postStartTrial<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    postStartTrial<B = any, C = any> (params: RequestParams.LicensePostStartTrial, callback: callbackFn<B, C>): TransportRequestCallback
    postStartTrial<B = any, C = any> (params: RequestParams.LicensePostStartTrial, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  mget<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  mget<T = any, B = any, C = any> (params: RequestParams.Mget<T>): Promise<ApiResponse<B, C>>
  mget<T = any, B = any, C = any> (params: RequestParams.Mget<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  mget<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  mget<T = any, B = any, C = any> (params: RequestParams.Mget<T>, callback: callbackFn<B, C>): TransportRequestCallback
  mget<T = any, B = any, C = any> (params: RequestParams.Mget<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  migration: {
    deprecations<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deprecations<B = any, C = any> (params: RequestParams.MigrationDeprecations): Promise<ApiResponse<B, C>>
    deprecations<B = any, C = any> (params: RequestParams.MigrationDeprecations, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deprecations<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deprecations<B = any, C = any> (params: RequestParams.MigrationDeprecations, callback: callbackFn<B, C>): TransportRequestCallback
    deprecations<B = any, C = any> (params: RequestParams.MigrationDeprecations, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  ml: {
    close_job<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    close_job<T = any, B = any, C = any> (params: RequestParams.MlCloseJob<T>): Promise<ApiResponse<B, C>>
    close_job<T = any, B = any, C = any> (params: RequestParams.MlCloseJob<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    close_job<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    close_job<T = any, B = any, C = any> (params: RequestParams.MlCloseJob<T>, callback: callbackFn<B, C>): TransportRequestCallback
    close_job<T = any, B = any, C = any> (params: RequestParams.MlCloseJob<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    closeJob<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    closeJob<T = any, B = any, C = any> (params: RequestParams.MlCloseJob<T>): Promise<ApiResponse<B, C>>
    closeJob<T = any, B = any, C = any> (params: RequestParams.MlCloseJob<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    closeJob<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    closeJob<T = any, B = any, C = any> (params: RequestParams.MlCloseJob<T>, callback: callbackFn<B, C>): TransportRequestCallback
    closeJob<T = any, B = any, C = any> (params: RequestParams.MlCloseJob<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_calendar<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_calendar<B = any, C = any> (params: RequestParams.MlDeleteCalendar): Promise<ApiResponse<B, C>>
    delete_calendar<B = any, C = any> (params: RequestParams.MlDeleteCalendar, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_calendar<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_calendar<B = any, C = any> (params: RequestParams.MlDeleteCalendar, callback: callbackFn<B, C>): TransportRequestCallback
    delete_calendar<B = any, C = any> (params: RequestParams.MlDeleteCalendar, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteCalendar<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteCalendar<B = any, C = any> (params: RequestParams.MlDeleteCalendar): Promise<ApiResponse<B, C>>
    deleteCalendar<B = any, C = any> (params: RequestParams.MlDeleteCalendar, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteCalendar<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteCalendar<B = any, C = any> (params: RequestParams.MlDeleteCalendar, callback: callbackFn<B, C>): TransportRequestCallback
    deleteCalendar<B = any, C = any> (params: RequestParams.MlDeleteCalendar, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_calendar_event<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_calendar_event<B = any, C = any> (params: RequestParams.MlDeleteCalendarEvent): Promise<ApiResponse<B, C>>
    delete_calendar_event<B = any, C = any> (params: RequestParams.MlDeleteCalendarEvent, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_calendar_event<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_calendar_event<B = any, C = any> (params: RequestParams.MlDeleteCalendarEvent, callback: callbackFn<B, C>): TransportRequestCallback
    delete_calendar_event<B = any, C = any> (params: RequestParams.MlDeleteCalendarEvent, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteCalendarEvent<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteCalendarEvent<B = any, C = any> (params: RequestParams.MlDeleteCalendarEvent): Promise<ApiResponse<B, C>>
    deleteCalendarEvent<B = any, C = any> (params: RequestParams.MlDeleteCalendarEvent, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteCalendarEvent<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteCalendarEvent<B = any, C = any> (params: RequestParams.MlDeleteCalendarEvent, callback: callbackFn<B, C>): TransportRequestCallback
    deleteCalendarEvent<B = any, C = any> (params: RequestParams.MlDeleteCalendarEvent, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_calendar_job<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_calendar_job<B = any, C = any> (params: RequestParams.MlDeleteCalendarJob): Promise<ApiResponse<B, C>>
    delete_calendar_job<B = any, C = any> (params: RequestParams.MlDeleteCalendarJob, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_calendar_job<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_calendar_job<B = any, C = any> (params: RequestParams.MlDeleteCalendarJob, callback: callbackFn<B, C>): TransportRequestCallback
    delete_calendar_job<B = any, C = any> (params: RequestParams.MlDeleteCalendarJob, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteCalendarJob<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteCalendarJob<B = any, C = any> (params: RequestParams.MlDeleteCalendarJob): Promise<ApiResponse<B, C>>
    deleteCalendarJob<B = any, C = any> (params: RequestParams.MlDeleteCalendarJob, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteCalendarJob<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteCalendarJob<B = any, C = any> (params: RequestParams.MlDeleteCalendarJob, callback: callbackFn<B, C>): TransportRequestCallback
    deleteCalendarJob<B = any, C = any> (params: RequestParams.MlDeleteCalendarJob, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_data_frame_analytics<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_data_frame_analytics<B = any, C = any> (params: RequestParams.MlDeleteDataFrameAnalytics): Promise<ApiResponse<B, C>>
    delete_data_frame_analytics<B = any, C = any> (params: RequestParams.MlDeleteDataFrameAnalytics, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_data_frame_analytics<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_data_frame_analytics<B = any, C = any> (params: RequestParams.MlDeleteDataFrameAnalytics, callback: callbackFn<B, C>): TransportRequestCallback
    delete_data_frame_analytics<B = any, C = any> (params: RequestParams.MlDeleteDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteDataFrameAnalytics<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteDataFrameAnalytics<B = any, C = any> (params: RequestParams.MlDeleteDataFrameAnalytics): Promise<ApiResponse<B, C>>
    deleteDataFrameAnalytics<B = any, C = any> (params: RequestParams.MlDeleteDataFrameAnalytics, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteDataFrameAnalytics<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteDataFrameAnalytics<B = any, C = any> (params: RequestParams.MlDeleteDataFrameAnalytics, callback: callbackFn<B, C>): TransportRequestCallback
    deleteDataFrameAnalytics<B = any, C = any> (params: RequestParams.MlDeleteDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_datafeed<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_datafeed<B = any, C = any> (params: RequestParams.MlDeleteDatafeed): Promise<ApiResponse<B, C>>
    delete_datafeed<B = any, C = any> (params: RequestParams.MlDeleteDatafeed, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_datafeed<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_datafeed<B = any, C = any> (params: RequestParams.MlDeleteDatafeed, callback: callbackFn<B, C>): TransportRequestCallback
    delete_datafeed<B = any, C = any> (params: RequestParams.MlDeleteDatafeed, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteDatafeed<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteDatafeed<B = any, C = any> (params: RequestParams.MlDeleteDatafeed): Promise<ApiResponse<B, C>>
    deleteDatafeed<B = any, C = any> (params: RequestParams.MlDeleteDatafeed, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteDatafeed<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteDatafeed<B = any, C = any> (params: RequestParams.MlDeleteDatafeed, callback: callbackFn<B, C>): TransportRequestCallback
    deleteDatafeed<B = any, C = any> (params: RequestParams.MlDeleteDatafeed, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_expired_data<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_expired_data<B = any, C = any> (params: RequestParams.MlDeleteExpiredData): Promise<ApiResponse<B, C>>
    delete_expired_data<B = any, C = any> (params: RequestParams.MlDeleteExpiredData, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_expired_data<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_expired_data<B = any, C = any> (params: RequestParams.MlDeleteExpiredData, callback: callbackFn<B, C>): TransportRequestCallback
    delete_expired_data<B = any, C = any> (params: RequestParams.MlDeleteExpiredData, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteExpiredData<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteExpiredData<B = any, C = any> (params: RequestParams.MlDeleteExpiredData): Promise<ApiResponse<B, C>>
    deleteExpiredData<B = any, C = any> (params: RequestParams.MlDeleteExpiredData, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteExpiredData<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteExpiredData<B = any, C = any> (params: RequestParams.MlDeleteExpiredData, callback: callbackFn<B, C>): TransportRequestCallback
    deleteExpiredData<B = any, C = any> (params: RequestParams.MlDeleteExpiredData, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_filter<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_filter<B = any, C = any> (params: RequestParams.MlDeleteFilter): Promise<ApiResponse<B, C>>
    delete_filter<B = any, C = any> (params: RequestParams.MlDeleteFilter, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_filter<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_filter<B = any, C = any> (params: RequestParams.MlDeleteFilter, callback: callbackFn<B, C>): TransportRequestCallback
    delete_filter<B = any, C = any> (params: RequestParams.MlDeleteFilter, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteFilter<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteFilter<B = any, C = any> (params: RequestParams.MlDeleteFilter): Promise<ApiResponse<B, C>>
    deleteFilter<B = any, C = any> (params: RequestParams.MlDeleteFilter, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteFilter<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteFilter<B = any, C = any> (params: RequestParams.MlDeleteFilter, callback: callbackFn<B, C>): TransportRequestCallback
    deleteFilter<B = any, C = any> (params: RequestParams.MlDeleteFilter, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_forecast<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_forecast<B = any, C = any> (params: RequestParams.MlDeleteForecast): Promise<ApiResponse<B, C>>
    delete_forecast<B = any, C = any> (params: RequestParams.MlDeleteForecast, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_forecast<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_forecast<B = any, C = any> (params: RequestParams.MlDeleteForecast, callback: callbackFn<B, C>): TransportRequestCallback
    delete_forecast<B = any, C = any> (params: RequestParams.MlDeleteForecast, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteForecast<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteForecast<B = any, C = any> (params: RequestParams.MlDeleteForecast): Promise<ApiResponse<B, C>>
    deleteForecast<B = any, C = any> (params: RequestParams.MlDeleteForecast, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteForecast<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteForecast<B = any, C = any> (params: RequestParams.MlDeleteForecast, callback: callbackFn<B, C>): TransportRequestCallback
    deleteForecast<B = any, C = any> (params: RequestParams.MlDeleteForecast, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_job<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_job<B = any, C = any> (params: RequestParams.MlDeleteJob): Promise<ApiResponse<B, C>>
    delete_job<B = any, C = any> (params: RequestParams.MlDeleteJob, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_job<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_job<B = any, C = any> (params: RequestParams.MlDeleteJob, callback: callbackFn<B, C>): TransportRequestCallback
    delete_job<B = any, C = any> (params: RequestParams.MlDeleteJob, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteJob<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteJob<B = any, C = any> (params: RequestParams.MlDeleteJob): Promise<ApiResponse<B, C>>
    deleteJob<B = any, C = any> (params: RequestParams.MlDeleteJob, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteJob<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteJob<B = any, C = any> (params: RequestParams.MlDeleteJob, callback: callbackFn<B, C>): TransportRequestCallback
    deleteJob<B = any, C = any> (params: RequestParams.MlDeleteJob, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_model_snapshot<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_model_snapshot<B = any, C = any> (params: RequestParams.MlDeleteModelSnapshot): Promise<ApiResponse<B, C>>
    delete_model_snapshot<B = any, C = any> (params: RequestParams.MlDeleteModelSnapshot, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_model_snapshot<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_model_snapshot<B = any, C = any> (params: RequestParams.MlDeleteModelSnapshot, callback: callbackFn<B, C>): TransportRequestCallback
    delete_model_snapshot<B = any, C = any> (params: RequestParams.MlDeleteModelSnapshot, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteModelSnapshot<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteModelSnapshot<B = any, C = any> (params: RequestParams.MlDeleteModelSnapshot): Promise<ApiResponse<B, C>>
    deleteModelSnapshot<B = any, C = any> (params: RequestParams.MlDeleteModelSnapshot, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteModelSnapshot<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteModelSnapshot<B = any, C = any> (params: RequestParams.MlDeleteModelSnapshot, callback: callbackFn<B, C>): TransportRequestCallback
    deleteModelSnapshot<B = any, C = any> (params: RequestParams.MlDeleteModelSnapshot, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_trained_model<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_trained_model<B = any, C = any> (params: RequestParams.MlDeleteTrainedModel): Promise<ApiResponse<B, C>>
    delete_trained_model<B = any, C = any> (params: RequestParams.MlDeleteTrainedModel, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_trained_model<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_trained_model<B = any, C = any> (params: RequestParams.MlDeleteTrainedModel, callback: callbackFn<B, C>): TransportRequestCallback
    delete_trained_model<B = any, C = any> (params: RequestParams.MlDeleteTrainedModel, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteTrainedModel<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteTrainedModel<B = any, C = any> (params: RequestParams.MlDeleteTrainedModel): Promise<ApiResponse<B, C>>
    deleteTrainedModel<B = any, C = any> (params: RequestParams.MlDeleteTrainedModel, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteTrainedModel<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteTrainedModel<B = any, C = any> (params: RequestParams.MlDeleteTrainedModel, callback: callbackFn<B, C>): TransportRequestCallback
    deleteTrainedModel<B = any, C = any> (params: RequestParams.MlDeleteTrainedModel, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    estimate_model_memory<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    estimate_model_memory<T = any, B = any, C = any> (params: RequestParams.MlEstimateModelMemory<T>): Promise<ApiResponse<B, C>>
    estimate_model_memory<T = any, B = any, C = any> (params: RequestParams.MlEstimateModelMemory<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    estimate_model_memory<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    estimate_model_memory<T = any, B = any, C = any> (params: RequestParams.MlEstimateModelMemory<T>, callback: callbackFn<B, C>): TransportRequestCallback
    estimate_model_memory<T = any, B = any, C = any> (params: RequestParams.MlEstimateModelMemory<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    estimateModelMemory<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    estimateModelMemory<T = any, B = any, C = any> (params: RequestParams.MlEstimateModelMemory<T>): Promise<ApiResponse<B, C>>
    estimateModelMemory<T = any, B = any, C = any> (params: RequestParams.MlEstimateModelMemory<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    estimateModelMemory<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    estimateModelMemory<T = any, B = any, C = any> (params: RequestParams.MlEstimateModelMemory<T>, callback: callbackFn<B, C>): TransportRequestCallback
    estimateModelMemory<T = any, B = any, C = any> (params: RequestParams.MlEstimateModelMemory<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    evaluate_data_frame<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    evaluate_data_frame<T = any, B = any, C = any> (params: RequestParams.MlEvaluateDataFrame<T>): Promise<ApiResponse<B, C>>
    evaluate_data_frame<T = any, B = any, C = any> (params: RequestParams.MlEvaluateDataFrame<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    evaluate_data_frame<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    evaluate_data_frame<T = any, B = any, C = any> (params: RequestParams.MlEvaluateDataFrame<T>, callback: callbackFn<B, C>): TransportRequestCallback
    evaluate_data_frame<T = any, B = any, C = any> (params: RequestParams.MlEvaluateDataFrame<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    evaluateDataFrame<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    evaluateDataFrame<T = any, B = any, C = any> (params: RequestParams.MlEvaluateDataFrame<T>): Promise<ApiResponse<B, C>>
    evaluateDataFrame<T = any, B = any, C = any> (params: RequestParams.MlEvaluateDataFrame<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    evaluateDataFrame<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    evaluateDataFrame<T = any, B = any, C = any> (params: RequestParams.MlEvaluateDataFrame<T>, callback: callbackFn<B, C>): TransportRequestCallback
    evaluateDataFrame<T = any, B = any, C = any> (params: RequestParams.MlEvaluateDataFrame<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    explain_data_frame_analytics<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    explain_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlExplainDataFrameAnalytics<T>): Promise<ApiResponse<B, C>>
    explain_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlExplainDataFrameAnalytics<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    explain_data_frame_analytics<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    explain_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlExplainDataFrameAnalytics<T>, callback: callbackFn<B, C>): TransportRequestCallback
    explain_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlExplainDataFrameAnalytics<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    explainDataFrameAnalytics<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    explainDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlExplainDataFrameAnalytics<T>): Promise<ApiResponse<B, C>>
    explainDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlExplainDataFrameAnalytics<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    explainDataFrameAnalytics<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    explainDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlExplainDataFrameAnalytics<T>, callback: callbackFn<B, C>): TransportRequestCallback
    explainDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlExplainDataFrameAnalytics<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    find_file_structure<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    find_file_structure<T = any, B = any, C = any> (params: RequestParams.MlFindFileStructure<T>): Promise<ApiResponse<B, C>>
    find_file_structure<T = any, B = any, C = any> (params: RequestParams.MlFindFileStructure<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    find_file_structure<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    find_file_structure<T = any, B = any, C = any> (params: RequestParams.MlFindFileStructure<T>, callback: callbackFn<B, C>): TransportRequestCallback
    find_file_structure<T = any, B = any, C = any> (params: RequestParams.MlFindFileStructure<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    findFileStructure<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    findFileStructure<T = any, B = any, C = any> (params: RequestParams.MlFindFileStructure<T>): Promise<ApiResponse<B, C>>
    findFileStructure<T = any, B = any, C = any> (params: RequestParams.MlFindFileStructure<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    findFileStructure<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    findFileStructure<T = any, B = any, C = any> (params: RequestParams.MlFindFileStructure<T>, callback: callbackFn<B, C>): TransportRequestCallback
    findFileStructure<T = any, B = any, C = any> (params: RequestParams.MlFindFileStructure<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    flush_job<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    flush_job<T = any, B = any, C = any> (params: RequestParams.MlFlushJob<T>): Promise<ApiResponse<B, C>>
    flush_job<T = any, B = any, C = any> (params: RequestParams.MlFlushJob<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    flush_job<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    flush_job<T = any, B = any, C = any> (params: RequestParams.MlFlushJob<T>, callback: callbackFn<B, C>): TransportRequestCallback
    flush_job<T = any, B = any, C = any> (params: RequestParams.MlFlushJob<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    flushJob<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    flushJob<T = any, B = any, C = any> (params: RequestParams.MlFlushJob<T>): Promise<ApiResponse<B, C>>
    flushJob<T = any, B = any, C = any> (params: RequestParams.MlFlushJob<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    flushJob<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    flushJob<T = any, B = any, C = any> (params: RequestParams.MlFlushJob<T>, callback: callbackFn<B, C>): TransportRequestCallback
    flushJob<T = any, B = any, C = any> (params: RequestParams.MlFlushJob<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    forecast<B = any, C = any> (): Promise<ApiResponse<B, C>>
    forecast<B = any, C = any> (params: RequestParams.MlForecast): Promise<ApiResponse<B, C>>
    forecast<B = any, C = any> (params: RequestParams.MlForecast, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    forecast<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    forecast<B = any, C = any> (params: RequestParams.MlForecast, callback: callbackFn<B, C>): TransportRequestCallback
    forecast<B = any, C = any> (params: RequestParams.MlForecast, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_buckets<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_buckets<T = any, B = any, C = any> (params: RequestParams.MlGetBuckets<T>): Promise<ApiResponse<B, C>>
    get_buckets<T = any, B = any, C = any> (params: RequestParams.MlGetBuckets<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_buckets<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_buckets<T = any, B = any, C = any> (params: RequestParams.MlGetBuckets<T>, callback: callbackFn<B, C>): TransportRequestCallback
    get_buckets<T = any, B = any, C = any> (params: RequestParams.MlGetBuckets<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getBuckets<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    getBuckets<T = any, B = any, C = any> (params: RequestParams.MlGetBuckets<T>): Promise<ApiResponse<B, C>>
    getBuckets<T = any, B = any, C = any> (params: RequestParams.MlGetBuckets<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getBuckets<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getBuckets<T = any, B = any, C = any> (params: RequestParams.MlGetBuckets<T>, callback: callbackFn<B, C>): TransportRequestCallback
    getBuckets<T = any, B = any, C = any> (params: RequestParams.MlGetBuckets<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_calendar_events<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_calendar_events<B = any, C = any> (params: RequestParams.MlGetCalendarEvents): Promise<ApiResponse<B, C>>
    get_calendar_events<B = any, C = any> (params: RequestParams.MlGetCalendarEvents, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_calendar_events<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_calendar_events<B = any, C = any> (params: RequestParams.MlGetCalendarEvents, callback: callbackFn<B, C>): TransportRequestCallback
    get_calendar_events<B = any, C = any> (params: RequestParams.MlGetCalendarEvents, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getCalendarEvents<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getCalendarEvents<B = any, C = any> (params: RequestParams.MlGetCalendarEvents): Promise<ApiResponse<B, C>>
    getCalendarEvents<B = any, C = any> (params: RequestParams.MlGetCalendarEvents, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getCalendarEvents<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getCalendarEvents<B = any, C = any> (params: RequestParams.MlGetCalendarEvents, callback: callbackFn<B, C>): TransportRequestCallback
    getCalendarEvents<B = any, C = any> (params: RequestParams.MlGetCalendarEvents, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_calendars<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_calendars<T = any, B = any, C = any> (params: RequestParams.MlGetCalendars<T>): Promise<ApiResponse<B, C>>
    get_calendars<T = any, B = any, C = any> (params: RequestParams.MlGetCalendars<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_calendars<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_calendars<T = any, B = any, C = any> (params: RequestParams.MlGetCalendars<T>, callback: callbackFn<B, C>): TransportRequestCallback
    get_calendars<T = any, B = any, C = any> (params: RequestParams.MlGetCalendars<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getCalendars<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    getCalendars<T = any, B = any, C = any> (params: RequestParams.MlGetCalendars<T>): Promise<ApiResponse<B, C>>
    getCalendars<T = any, B = any, C = any> (params: RequestParams.MlGetCalendars<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getCalendars<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getCalendars<T = any, B = any, C = any> (params: RequestParams.MlGetCalendars<T>, callback: callbackFn<B, C>): TransportRequestCallback
    getCalendars<T = any, B = any, C = any> (params: RequestParams.MlGetCalendars<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_categories<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_categories<T = any, B = any, C = any> (params: RequestParams.MlGetCategories<T>): Promise<ApiResponse<B, C>>
    get_categories<T = any, B = any, C = any> (params: RequestParams.MlGetCategories<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_categories<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_categories<T = any, B = any, C = any> (params: RequestParams.MlGetCategories<T>, callback: callbackFn<B, C>): TransportRequestCallback
    get_categories<T = any, B = any, C = any> (params: RequestParams.MlGetCategories<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getCategories<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    getCategories<T = any, B = any, C = any> (params: RequestParams.MlGetCategories<T>): Promise<ApiResponse<B, C>>
    getCategories<T = any, B = any, C = any> (params: RequestParams.MlGetCategories<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getCategories<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getCategories<T = any, B = any, C = any> (params: RequestParams.MlGetCategories<T>, callback: callbackFn<B, C>): TransportRequestCallback
    getCategories<T = any, B = any, C = any> (params: RequestParams.MlGetCategories<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_data_frame_analytics<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_data_frame_analytics<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalytics): Promise<ApiResponse<B, C>>
    get_data_frame_analytics<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalytics, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_data_frame_analytics<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_data_frame_analytics<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalytics, callback: callbackFn<B, C>): TransportRequestCallback
    get_data_frame_analytics<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getDataFrameAnalytics<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getDataFrameAnalytics<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalytics): Promise<ApiResponse<B, C>>
    getDataFrameAnalytics<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalytics, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getDataFrameAnalytics<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getDataFrameAnalytics<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalytics, callback: callbackFn<B, C>): TransportRequestCallback
    getDataFrameAnalytics<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalytics, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_data_frame_analytics_stats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_data_frame_analytics_stats<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalyticsStats): Promise<ApiResponse<B, C>>
    get_data_frame_analytics_stats<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalyticsStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_data_frame_analytics_stats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_data_frame_analytics_stats<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalyticsStats, callback: callbackFn<B, C>): TransportRequestCallback
    get_data_frame_analytics_stats<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalyticsStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getDataFrameAnalyticsStats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getDataFrameAnalyticsStats<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalyticsStats): Promise<ApiResponse<B, C>>
    getDataFrameAnalyticsStats<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalyticsStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getDataFrameAnalyticsStats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getDataFrameAnalyticsStats<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalyticsStats, callback: callbackFn<B, C>): TransportRequestCallback
    getDataFrameAnalyticsStats<B = any, C = any> (params: RequestParams.MlGetDataFrameAnalyticsStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_datafeed_stats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_datafeed_stats<B = any, C = any> (params: RequestParams.MlGetDatafeedStats): Promise<ApiResponse<B, C>>
    get_datafeed_stats<B = any, C = any> (params: RequestParams.MlGetDatafeedStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_datafeed_stats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_datafeed_stats<B = any, C = any> (params: RequestParams.MlGetDatafeedStats, callback: callbackFn<B, C>): TransportRequestCallback
    get_datafeed_stats<B = any, C = any> (params: RequestParams.MlGetDatafeedStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getDatafeedStats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getDatafeedStats<B = any, C = any> (params: RequestParams.MlGetDatafeedStats): Promise<ApiResponse<B, C>>
    getDatafeedStats<B = any, C = any> (params: RequestParams.MlGetDatafeedStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getDatafeedStats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getDatafeedStats<B = any, C = any> (params: RequestParams.MlGetDatafeedStats, callback: callbackFn<B, C>): TransportRequestCallback
    getDatafeedStats<B = any, C = any> (params: RequestParams.MlGetDatafeedStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_datafeeds<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_datafeeds<B = any, C = any> (params: RequestParams.MlGetDatafeeds): Promise<ApiResponse<B, C>>
    get_datafeeds<B = any, C = any> (params: RequestParams.MlGetDatafeeds, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_datafeeds<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_datafeeds<B = any, C = any> (params: RequestParams.MlGetDatafeeds, callback: callbackFn<B, C>): TransportRequestCallback
    get_datafeeds<B = any, C = any> (params: RequestParams.MlGetDatafeeds, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getDatafeeds<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getDatafeeds<B = any, C = any> (params: RequestParams.MlGetDatafeeds): Promise<ApiResponse<B, C>>
    getDatafeeds<B = any, C = any> (params: RequestParams.MlGetDatafeeds, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getDatafeeds<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getDatafeeds<B = any, C = any> (params: RequestParams.MlGetDatafeeds, callback: callbackFn<B, C>): TransportRequestCallback
    getDatafeeds<B = any, C = any> (params: RequestParams.MlGetDatafeeds, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_filters<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_filters<B = any, C = any> (params: RequestParams.MlGetFilters): Promise<ApiResponse<B, C>>
    get_filters<B = any, C = any> (params: RequestParams.MlGetFilters, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_filters<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_filters<B = any, C = any> (params: RequestParams.MlGetFilters, callback: callbackFn<B, C>): TransportRequestCallback
    get_filters<B = any, C = any> (params: RequestParams.MlGetFilters, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getFilters<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getFilters<B = any, C = any> (params: RequestParams.MlGetFilters): Promise<ApiResponse<B, C>>
    getFilters<B = any, C = any> (params: RequestParams.MlGetFilters, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getFilters<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getFilters<B = any, C = any> (params: RequestParams.MlGetFilters, callback: callbackFn<B, C>): TransportRequestCallback
    getFilters<B = any, C = any> (params: RequestParams.MlGetFilters, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_influencers<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_influencers<T = any, B = any, C = any> (params: RequestParams.MlGetInfluencers<T>): Promise<ApiResponse<B, C>>
    get_influencers<T = any, B = any, C = any> (params: RequestParams.MlGetInfluencers<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_influencers<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_influencers<T = any, B = any, C = any> (params: RequestParams.MlGetInfluencers<T>, callback: callbackFn<B, C>): TransportRequestCallback
    get_influencers<T = any, B = any, C = any> (params: RequestParams.MlGetInfluencers<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getInfluencers<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    getInfluencers<T = any, B = any, C = any> (params: RequestParams.MlGetInfluencers<T>): Promise<ApiResponse<B, C>>
    getInfluencers<T = any, B = any, C = any> (params: RequestParams.MlGetInfluencers<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getInfluencers<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getInfluencers<T = any, B = any, C = any> (params: RequestParams.MlGetInfluencers<T>, callback: callbackFn<B, C>): TransportRequestCallback
    getInfluencers<T = any, B = any, C = any> (params: RequestParams.MlGetInfluencers<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_job_stats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_job_stats<B = any, C = any> (params: RequestParams.MlGetJobStats): Promise<ApiResponse<B, C>>
    get_job_stats<B = any, C = any> (params: RequestParams.MlGetJobStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_job_stats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_job_stats<B = any, C = any> (params: RequestParams.MlGetJobStats, callback: callbackFn<B, C>): TransportRequestCallback
    get_job_stats<B = any, C = any> (params: RequestParams.MlGetJobStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getJobStats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getJobStats<B = any, C = any> (params: RequestParams.MlGetJobStats): Promise<ApiResponse<B, C>>
    getJobStats<B = any, C = any> (params: RequestParams.MlGetJobStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getJobStats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getJobStats<B = any, C = any> (params: RequestParams.MlGetJobStats, callback: callbackFn<B, C>): TransportRequestCallback
    getJobStats<B = any, C = any> (params: RequestParams.MlGetJobStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_jobs<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_jobs<B = any, C = any> (params: RequestParams.MlGetJobs): Promise<ApiResponse<B, C>>
    get_jobs<B = any, C = any> (params: RequestParams.MlGetJobs, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_jobs<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_jobs<B = any, C = any> (params: RequestParams.MlGetJobs, callback: callbackFn<B, C>): TransportRequestCallback
    get_jobs<B = any, C = any> (params: RequestParams.MlGetJobs, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getJobs<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getJobs<B = any, C = any> (params: RequestParams.MlGetJobs): Promise<ApiResponse<B, C>>
    getJobs<B = any, C = any> (params: RequestParams.MlGetJobs, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getJobs<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getJobs<B = any, C = any> (params: RequestParams.MlGetJobs, callback: callbackFn<B, C>): TransportRequestCallback
    getJobs<B = any, C = any> (params: RequestParams.MlGetJobs, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_model_snapshots<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_model_snapshots<T = any, B = any, C = any> (params: RequestParams.MlGetModelSnapshots<T>): Promise<ApiResponse<B, C>>
    get_model_snapshots<T = any, B = any, C = any> (params: RequestParams.MlGetModelSnapshots<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_model_snapshots<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_model_snapshots<T = any, B = any, C = any> (params: RequestParams.MlGetModelSnapshots<T>, callback: callbackFn<B, C>): TransportRequestCallback
    get_model_snapshots<T = any, B = any, C = any> (params: RequestParams.MlGetModelSnapshots<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getModelSnapshots<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    getModelSnapshots<T = any, B = any, C = any> (params: RequestParams.MlGetModelSnapshots<T>): Promise<ApiResponse<B, C>>
    getModelSnapshots<T = any, B = any, C = any> (params: RequestParams.MlGetModelSnapshots<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getModelSnapshots<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getModelSnapshots<T = any, B = any, C = any> (params: RequestParams.MlGetModelSnapshots<T>, callback: callbackFn<B, C>): TransportRequestCallback
    getModelSnapshots<T = any, B = any, C = any> (params: RequestParams.MlGetModelSnapshots<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_overall_buckets<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_overall_buckets<T = any, B = any, C = any> (params: RequestParams.MlGetOverallBuckets<T>): Promise<ApiResponse<B, C>>
    get_overall_buckets<T = any, B = any, C = any> (params: RequestParams.MlGetOverallBuckets<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_overall_buckets<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_overall_buckets<T = any, B = any, C = any> (params: RequestParams.MlGetOverallBuckets<T>, callback: callbackFn<B, C>): TransportRequestCallback
    get_overall_buckets<T = any, B = any, C = any> (params: RequestParams.MlGetOverallBuckets<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getOverallBuckets<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    getOverallBuckets<T = any, B = any, C = any> (params: RequestParams.MlGetOverallBuckets<T>): Promise<ApiResponse<B, C>>
    getOverallBuckets<T = any, B = any, C = any> (params: RequestParams.MlGetOverallBuckets<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getOverallBuckets<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getOverallBuckets<T = any, B = any, C = any> (params: RequestParams.MlGetOverallBuckets<T>, callback: callbackFn<B, C>): TransportRequestCallback
    getOverallBuckets<T = any, B = any, C = any> (params: RequestParams.MlGetOverallBuckets<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_records<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_records<T = any, B = any, C = any> (params: RequestParams.MlGetRecords<T>): Promise<ApiResponse<B, C>>
    get_records<T = any, B = any, C = any> (params: RequestParams.MlGetRecords<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_records<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_records<T = any, B = any, C = any> (params: RequestParams.MlGetRecords<T>, callback: callbackFn<B, C>): TransportRequestCallback
    get_records<T = any, B = any, C = any> (params: RequestParams.MlGetRecords<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getRecords<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    getRecords<T = any, B = any, C = any> (params: RequestParams.MlGetRecords<T>): Promise<ApiResponse<B, C>>
    getRecords<T = any, B = any, C = any> (params: RequestParams.MlGetRecords<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getRecords<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getRecords<T = any, B = any, C = any> (params: RequestParams.MlGetRecords<T>, callback: callbackFn<B, C>): TransportRequestCallback
    getRecords<T = any, B = any, C = any> (params: RequestParams.MlGetRecords<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_trained_models<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_trained_models<B = any, C = any> (params: RequestParams.MlGetTrainedModels): Promise<ApiResponse<B, C>>
    get_trained_models<B = any, C = any> (params: RequestParams.MlGetTrainedModels, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_trained_models<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_trained_models<B = any, C = any> (params: RequestParams.MlGetTrainedModels, callback: callbackFn<B, C>): TransportRequestCallback
    get_trained_models<B = any, C = any> (params: RequestParams.MlGetTrainedModels, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getTrainedModels<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getTrainedModels<B = any, C = any> (params: RequestParams.MlGetTrainedModels): Promise<ApiResponse<B, C>>
    getTrainedModels<B = any, C = any> (params: RequestParams.MlGetTrainedModels, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getTrainedModels<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getTrainedModels<B = any, C = any> (params: RequestParams.MlGetTrainedModels, callback: callbackFn<B, C>): TransportRequestCallback
    getTrainedModels<B = any, C = any> (params: RequestParams.MlGetTrainedModels, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_trained_models_stats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_trained_models_stats<B = any, C = any> (params: RequestParams.MlGetTrainedModelsStats): Promise<ApiResponse<B, C>>
    get_trained_models_stats<B = any, C = any> (params: RequestParams.MlGetTrainedModelsStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_trained_models_stats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_trained_models_stats<B = any, C = any> (params: RequestParams.MlGetTrainedModelsStats, callback: callbackFn<B, C>): TransportRequestCallback
    get_trained_models_stats<B = any, C = any> (params: RequestParams.MlGetTrainedModelsStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getTrainedModelsStats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getTrainedModelsStats<B = any, C = any> (params: RequestParams.MlGetTrainedModelsStats): Promise<ApiResponse<B, C>>
    getTrainedModelsStats<B = any, C = any> (params: RequestParams.MlGetTrainedModelsStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getTrainedModelsStats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getTrainedModelsStats<B = any, C = any> (params: RequestParams.MlGetTrainedModelsStats, callback: callbackFn<B, C>): TransportRequestCallback
    getTrainedModelsStats<B = any, C = any> (params: RequestParams.MlGetTrainedModelsStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    info<B = any, C = any> (): Promise<ApiResponse<B, C>>
    info<B = any, C = any> (params: RequestParams.MlInfo): Promise<ApiResponse<B, C>>
    info<B = any, C = any> (params: RequestParams.MlInfo, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    info<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    info<B = any, C = any> (params: RequestParams.MlInfo, callback: callbackFn<B, C>): TransportRequestCallback
    info<B = any, C = any> (params: RequestParams.MlInfo, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    open_job<B = any, C = any> (): Promise<ApiResponse<B, C>>
    open_job<B = any, C = any> (params: RequestParams.MlOpenJob): Promise<ApiResponse<B, C>>
    open_job<B = any, C = any> (params: RequestParams.MlOpenJob, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    open_job<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    open_job<B = any, C = any> (params: RequestParams.MlOpenJob, callback: callbackFn<B, C>): TransportRequestCallback
    open_job<B = any, C = any> (params: RequestParams.MlOpenJob, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    openJob<B = any, C = any> (): Promise<ApiResponse<B, C>>
    openJob<B = any, C = any> (params: RequestParams.MlOpenJob): Promise<ApiResponse<B, C>>
    openJob<B = any, C = any> (params: RequestParams.MlOpenJob, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    openJob<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    openJob<B = any, C = any> (params: RequestParams.MlOpenJob, callback: callbackFn<B, C>): TransportRequestCallback
    openJob<B = any, C = any> (params: RequestParams.MlOpenJob, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    post_calendar_events<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    post_calendar_events<T = any, B = any, C = any> (params: RequestParams.MlPostCalendarEvents<T>): Promise<ApiResponse<B, C>>
    post_calendar_events<T = any, B = any, C = any> (params: RequestParams.MlPostCalendarEvents<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    post_calendar_events<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    post_calendar_events<T = any, B = any, C = any> (params: RequestParams.MlPostCalendarEvents<T>, callback: callbackFn<B, C>): TransportRequestCallback
    post_calendar_events<T = any, B = any, C = any> (params: RequestParams.MlPostCalendarEvents<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    postCalendarEvents<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    postCalendarEvents<T = any, B = any, C = any> (params: RequestParams.MlPostCalendarEvents<T>): Promise<ApiResponse<B, C>>
    postCalendarEvents<T = any, B = any, C = any> (params: RequestParams.MlPostCalendarEvents<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    postCalendarEvents<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    postCalendarEvents<T = any, B = any, C = any> (params: RequestParams.MlPostCalendarEvents<T>, callback: callbackFn<B, C>): TransportRequestCallback
    postCalendarEvents<T = any, B = any, C = any> (params: RequestParams.MlPostCalendarEvents<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    post_data<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    post_data<T = any, B = any, C = any> (params: RequestParams.MlPostData<T>): Promise<ApiResponse<B, C>>
    post_data<T = any, B = any, C = any> (params: RequestParams.MlPostData<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    post_data<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    post_data<T = any, B = any, C = any> (params: RequestParams.MlPostData<T>, callback: callbackFn<B, C>): TransportRequestCallback
    post_data<T = any, B = any, C = any> (params: RequestParams.MlPostData<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    postData<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    postData<T = any, B = any, C = any> (params: RequestParams.MlPostData<T>): Promise<ApiResponse<B, C>>
    postData<T = any, B = any, C = any> (params: RequestParams.MlPostData<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    postData<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    postData<T = any, B = any, C = any> (params: RequestParams.MlPostData<T>, callback: callbackFn<B, C>): TransportRequestCallback
    postData<T = any, B = any, C = any> (params: RequestParams.MlPostData<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    preview_datafeed<B = any, C = any> (): Promise<ApiResponse<B, C>>
    preview_datafeed<B = any, C = any> (params: RequestParams.MlPreviewDatafeed): Promise<ApiResponse<B, C>>
    preview_datafeed<B = any, C = any> (params: RequestParams.MlPreviewDatafeed, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    preview_datafeed<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    preview_datafeed<B = any, C = any> (params: RequestParams.MlPreviewDatafeed, callback: callbackFn<B, C>): TransportRequestCallback
    preview_datafeed<B = any, C = any> (params: RequestParams.MlPreviewDatafeed, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    previewDatafeed<B = any, C = any> (): Promise<ApiResponse<B, C>>
    previewDatafeed<B = any, C = any> (params: RequestParams.MlPreviewDatafeed): Promise<ApiResponse<B, C>>
    previewDatafeed<B = any, C = any> (params: RequestParams.MlPreviewDatafeed, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    previewDatafeed<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    previewDatafeed<B = any, C = any> (params: RequestParams.MlPreviewDatafeed, callback: callbackFn<B, C>): TransportRequestCallback
    previewDatafeed<B = any, C = any> (params: RequestParams.MlPreviewDatafeed, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_calendar<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_calendar<T = any, B = any, C = any> (params: RequestParams.MlPutCalendar<T>): Promise<ApiResponse<B, C>>
    put_calendar<T = any, B = any, C = any> (params: RequestParams.MlPutCalendar<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_calendar<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_calendar<T = any, B = any, C = any> (params: RequestParams.MlPutCalendar<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_calendar<T = any, B = any, C = any> (params: RequestParams.MlPutCalendar<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putCalendar<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putCalendar<T = any, B = any, C = any> (params: RequestParams.MlPutCalendar<T>): Promise<ApiResponse<B, C>>
    putCalendar<T = any, B = any, C = any> (params: RequestParams.MlPutCalendar<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putCalendar<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putCalendar<T = any, B = any, C = any> (params: RequestParams.MlPutCalendar<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putCalendar<T = any, B = any, C = any> (params: RequestParams.MlPutCalendar<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_calendar_job<B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_calendar_job<B = any, C = any> (params: RequestParams.MlPutCalendarJob): Promise<ApiResponse<B, C>>
    put_calendar_job<B = any, C = any> (params: RequestParams.MlPutCalendarJob, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_calendar_job<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_calendar_job<B = any, C = any> (params: RequestParams.MlPutCalendarJob, callback: callbackFn<B, C>): TransportRequestCallback
    put_calendar_job<B = any, C = any> (params: RequestParams.MlPutCalendarJob, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putCalendarJob<B = any, C = any> (): Promise<ApiResponse<B, C>>
    putCalendarJob<B = any, C = any> (params: RequestParams.MlPutCalendarJob): Promise<ApiResponse<B, C>>
    putCalendarJob<B = any, C = any> (params: RequestParams.MlPutCalendarJob, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putCalendarJob<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putCalendarJob<B = any, C = any> (params: RequestParams.MlPutCalendarJob, callback: callbackFn<B, C>): TransportRequestCallback
    putCalendarJob<B = any, C = any> (params: RequestParams.MlPutCalendarJob, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_data_frame_analytics<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlPutDataFrameAnalytics<T>): Promise<ApiResponse<B, C>>
    put_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlPutDataFrameAnalytics<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_data_frame_analytics<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlPutDataFrameAnalytics<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlPutDataFrameAnalytics<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putDataFrameAnalytics<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlPutDataFrameAnalytics<T>): Promise<ApiResponse<B, C>>
    putDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlPutDataFrameAnalytics<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putDataFrameAnalytics<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlPutDataFrameAnalytics<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlPutDataFrameAnalytics<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_datafeed<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_datafeed<T = any, B = any, C = any> (params: RequestParams.MlPutDatafeed<T>): Promise<ApiResponse<B, C>>
    put_datafeed<T = any, B = any, C = any> (params: RequestParams.MlPutDatafeed<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_datafeed<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_datafeed<T = any, B = any, C = any> (params: RequestParams.MlPutDatafeed<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_datafeed<T = any, B = any, C = any> (params: RequestParams.MlPutDatafeed<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putDatafeed<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putDatafeed<T = any, B = any, C = any> (params: RequestParams.MlPutDatafeed<T>): Promise<ApiResponse<B, C>>
    putDatafeed<T = any, B = any, C = any> (params: RequestParams.MlPutDatafeed<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putDatafeed<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putDatafeed<T = any, B = any, C = any> (params: RequestParams.MlPutDatafeed<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putDatafeed<T = any, B = any, C = any> (params: RequestParams.MlPutDatafeed<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_filter<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_filter<T = any, B = any, C = any> (params: RequestParams.MlPutFilter<T>): Promise<ApiResponse<B, C>>
    put_filter<T = any, B = any, C = any> (params: RequestParams.MlPutFilter<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_filter<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_filter<T = any, B = any, C = any> (params: RequestParams.MlPutFilter<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_filter<T = any, B = any, C = any> (params: RequestParams.MlPutFilter<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putFilter<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putFilter<T = any, B = any, C = any> (params: RequestParams.MlPutFilter<T>): Promise<ApiResponse<B, C>>
    putFilter<T = any, B = any, C = any> (params: RequestParams.MlPutFilter<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putFilter<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putFilter<T = any, B = any, C = any> (params: RequestParams.MlPutFilter<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putFilter<T = any, B = any, C = any> (params: RequestParams.MlPutFilter<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_job<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_job<T = any, B = any, C = any> (params: RequestParams.MlPutJob<T>): Promise<ApiResponse<B, C>>
    put_job<T = any, B = any, C = any> (params: RequestParams.MlPutJob<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_job<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_job<T = any, B = any, C = any> (params: RequestParams.MlPutJob<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_job<T = any, B = any, C = any> (params: RequestParams.MlPutJob<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putJob<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putJob<T = any, B = any, C = any> (params: RequestParams.MlPutJob<T>): Promise<ApiResponse<B, C>>
    putJob<T = any, B = any, C = any> (params: RequestParams.MlPutJob<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putJob<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putJob<T = any, B = any, C = any> (params: RequestParams.MlPutJob<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putJob<T = any, B = any, C = any> (params: RequestParams.MlPutJob<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_trained_model<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_trained_model<T = any, B = any, C = any> (params: RequestParams.MlPutTrainedModel<T>): Promise<ApiResponse<B, C>>
    put_trained_model<T = any, B = any, C = any> (params: RequestParams.MlPutTrainedModel<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_trained_model<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_trained_model<T = any, B = any, C = any> (params: RequestParams.MlPutTrainedModel<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_trained_model<T = any, B = any, C = any> (params: RequestParams.MlPutTrainedModel<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putTrainedModel<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putTrainedModel<T = any, B = any, C = any> (params: RequestParams.MlPutTrainedModel<T>): Promise<ApiResponse<B, C>>
    putTrainedModel<T = any, B = any, C = any> (params: RequestParams.MlPutTrainedModel<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putTrainedModel<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putTrainedModel<T = any, B = any, C = any> (params: RequestParams.MlPutTrainedModel<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putTrainedModel<T = any, B = any, C = any> (params: RequestParams.MlPutTrainedModel<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    revert_model_snapshot<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    revert_model_snapshot<T = any, B = any, C = any> (params: RequestParams.MlRevertModelSnapshot<T>): Promise<ApiResponse<B, C>>
    revert_model_snapshot<T = any, B = any, C = any> (params: RequestParams.MlRevertModelSnapshot<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    revert_model_snapshot<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    revert_model_snapshot<T = any, B = any, C = any> (params: RequestParams.MlRevertModelSnapshot<T>, callback: callbackFn<B, C>): TransportRequestCallback
    revert_model_snapshot<T = any, B = any, C = any> (params: RequestParams.MlRevertModelSnapshot<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    revertModelSnapshot<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    revertModelSnapshot<T = any, B = any, C = any> (params: RequestParams.MlRevertModelSnapshot<T>): Promise<ApiResponse<B, C>>
    revertModelSnapshot<T = any, B = any, C = any> (params: RequestParams.MlRevertModelSnapshot<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    revertModelSnapshot<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    revertModelSnapshot<T = any, B = any, C = any> (params: RequestParams.MlRevertModelSnapshot<T>, callback: callbackFn<B, C>): TransportRequestCallback
    revertModelSnapshot<T = any, B = any, C = any> (params: RequestParams.MlRevertModelSnapshot<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    set_upgrade_mode<B = any, C = any> (): Promise<ApiResponse<B, C>>
    set_upgrade_mode<B = any, C = any> (params: RequestParams.MlSetUpgradeMode): Promise<ApiResponse<B, C>>
    set_upgrade_mode<B = any, C = any> (params: RequestParams.MlSetUpgradeMode, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    set_upgrade_mode<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    set_upgrade_mode<B = any, C = any> (params: RequestParams.MlSetUpgradeMode, callback: callbackFn<B, C>): TransportRequestCallback
    set_upgrade_mode<B = any, C = any> (params: RequestParams.MlSetUpgradeMode, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    setUpgradeMode<B = any, C = any> (): Promise<ApiResponse<B, C>>
    setUpgradeMode<B = any, C = any> (params: RequestParams.MlSetUpgradeMode): Promise<ApiResponse<B, C>>
    setUpgradeMode<B = any, C = any> (params: RequestParams.MlSetUpgradeMode, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    setUpgradeMode<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    setUpgradeMode<B = any, C = any> (params: RequestParams.MlSetUpgradeMode, callback: callbackFn<B, C>): TransportRequestCallback
    setUpgradeMode<B = any, C = any> (params: RequestParams.MlSetUpgradeMode, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    start_data_frame_analytics<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    start_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlStartDataFrameAnalytics<T>): Promise<ApiResponse<B, C>>
    start_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlStartDataFrameAnalytics<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    start_data_frame_analytics<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    start_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlStartDataFrameAnalytics<T>, callback: callbackFn<B, C>): TransportRequestCallback
    start_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlStartDataFrameAnalytics<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    startDataFrameAnalytics<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    startDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlStartDataFrameAnalytics<T>): Promise<ApiResponse<B, C>>
    startDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlStartDataFrameAnalytics<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    startDataFrameAnalytics<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    startDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlStartDataFrameAnalytics<T>, callback: callbackFn<B, C>): TransportRequestCallback
    startDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlStartDataFrameAnalytics<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    start_datafeed<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    start_datafeed<T = any, B = any, C = any> (params: RequestParams.MlStartDatafeed<T>): Promise<ApiResponse<B, C>>
    start_datafeed<T = any, B = any, C = any> (params: RequestParams.MlStartDatafeed<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    start_datafeed<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    start_datafeed<T = any, B = any, C = any> (params: RequestParams.MlStartDatafeed<T>, callback: callbackFn<B, C>): TransportRequestCallback
    start_datafeed<T = any, B = any, C = any> (params: RequestParams.MlStartDatafeed<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    startDatafeed<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    startDatafeed<T = any, B = any, C = any> (params: RequestParams.MlStartDatafeed<T>): Promise<ApiResponse<B, C>>
    startDatafeed<T = any, B = any, C = any> (params: RequestParams.MlStartDatafeed<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    startDatafeed<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    startDatafeed<T = any, B = any, C = any> (params: RequestParams.MlStartDatafeed<T>, callback: callbackFn<B, C>): TransportRequestCallback
    startDatafeed<T = any, B = any, C = any> (params: RequestParams.MlStartDatafeed<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stop_data_frame_analytics<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    stop_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlStopDataFrameAnalytics<T>): Promise<ApiResponse<B, C>>
    stop_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlStopDataFrameAnalytics<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stop_data_frame_analytics<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stop_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlStopDataFrameAnalytics<T>, callback: callbackFn<B, C>): TransportRequestCallback
    stop_data_frame_analytics<T = any, B = any, C = any> (params: RequestParams.MlStopDataFrameAnalytics<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stopDataFrameAnalytics<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    stopDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlStopDataFrameAnalytics<T>): Promise<ApiResponse<B, C>>
    stopDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlStopDataFrameAnalytics<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stopDataFrameAnalytics<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stopDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlStopDataFrameAnalytics<T>, callback: callbackFn<B, C>): TransportRequestCallback
    stopDataFrameAnalytics<T = any, B = any, C = any> (params: RequestParams.MlStopDataFrameAnalytics<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stop_datafeed<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stop_datafeed<B = any, C = any> (params: RequestParams.MlStopDatafeed): Promise<ApiResponse<B, C>>
    stop_datafeed<B = any, C = any> (params: RequestParams.MlStopDatafeed, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stop_datafeed<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stop_datafeed<B = any, C = any> (params: RequestParams.MlStopDatafeed, callback: callbackFn<B, C>): TransportRequestCallback
    stop_datafeed<B = any, C = any> (params: RequestParams.MlStopDatafeed, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stopDatafeed<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stopDatafeed<B = any, C = any> (params: RequestParams.MlStopDatafeed): Promise<ApiResponse<B, C>>
    stopDatafeed<B = any, C = any> (params: RequestParams.MlStopDatafeed, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stopDatafeed<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stopDatafeed<B = any, C = any> (params: RequestParams.MlStopDatafeed, callback: callbackFn<B, C>): TransportRequestCallback
    stopDatafeed<B = any, C = any> (params: RequestParams.MlStopDatafeed, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    update_datafeed<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    update_datafeed<T = any, B = any, C = any> (params: RequestParams.MlUpdateDatafeed<T>): Promise<ApiResponse<B, C>>
    update_datafeed<T = any, B = any, C = any> (params: RequestParams.MlUpdateDatafeed<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    update_datafeed<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    update_datafeed<T = any, B = any, C = any> (params: RequestParams.MlUpdateDatafeed<T>, callback: callbackFn<B, C>): TransportRequestCallback
    update_datafeed<T = any, B = any, C = any> (params: RequestParams.MlUpdateDatafeed<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    updateDatafeed<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    updateDatafeed<T = any, B = any, C = any> (params: RequestParams.MlUpdateDatafeed<T>): Promise<ApiResponse<B, C>>
    updateDatafeed<T = any, B = any, C = any> (params: RequestParams.MlUpdateDatafeed<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    updateDatafeed<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    updateDatafeed<T = any, B = any, C = any> (params: RequestParams.MlUpdateDatafeed<T>, callback: callbackFn<B, C>): TransportRequestCallback
    updateDatafeed<T = any, B = any, C = any> (params: RequestParams.MlUpdateDatafeed<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    update_filter<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    update_filter<T = any, B = any, C = any> (params: RequestParams.MlUpdateFilter<T>): Promise<ApiResponse<B, C>>
    update_filter<T = any, B = any, C = any> (params: RequestParams.MlUpdateFilter<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    update_filter<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    update_filter<T = any, B = any, C = any> (params: RequestParams.MlUpdateFilter<T>, callback: callbackFn<B, C>): TransportRequestCallback
    update_filter<T = any, B = any, C = any> (params: RequestParams.MlUpdateFilter<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    updateFilter<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    updateFilter<T = any, B = any, C = any> (params: RequestParams.MlUpdateFilter<T>): Promise<ApiResponse<B, C>>
    updateFilter<T = any, B = any, C = any> (params: RequestParams.MlUpdateFilter<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    updateFilter<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    updateFilter<T = any, B = any, C = any> (params: RequestParams.MlUpdateFilter<T>, callback: callbackFn<B, C>): TransportRequestCallback
    updateFilter<T = any, B = any, C = any> (params: RequestParams.MlUpdateFilter<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    update_job<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    update_job<T = any, B = any, C = any> (params: RequestParams.MlUpdateJob<T>): Promise<ApiResponse<B, C>>
    update_job<T = any, B = any, C = any> (params: RequestParams.MlUpdateJob<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    update_job<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    update_job<T = any, B = any, C = any> (params: RequestParams.MlUpdateJob<T>, callback: callbackFn<B, C>): TransportRequestCallback
    update_job<T = any, B = any, C = any> (params: RequestParams.MlUpdateJob<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    updateJob<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    updateJob<T = any, B = any, C = any> (params: RequestParams.MlUpdateJob<T>): Promise<ApiResponse<B, C>>
    updateJob<T = any, B = any, C = any> (params: RequestParams.MlUpdateJob<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    updateJob<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    updateJob<T = any, B = any, C = any> (params: RequestParams.MlUpdateJob<T>, callback: callbackFn<B, C>): TransportRequestCallback
    updateJob<T = any, B = any, C = any> (params: RequestParams.MlUpdateJob<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    update_model_snapshot<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    update_model_snapshot<T = any, B = any, C = any> (params: RequestParams.MlUpdateModelSnapshot<T>): Promise<ApiResponse<B, C>>
    update_model_snapshot<T = any, B = any, C = any> (params: RequestParams.MlUpdateModelSnapshot<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    update_model_snapshot<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    update_model_snapshot<T = any, B = any, C = any> (params: RequestParams.MlUpdateModelSnapshot<T>, callback: callbackFn<B, C>): TransportRequestCallback
    update_model_snapshot<T = any, B = any, C = any> (params: RequestParams.MlUpdateModelSnapshot<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    updateModelSnapshot<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    updateModelSnapshot<T = any, B = any, C = any> (params: RequestParams.MlUpdateModelSnapshot<T>): Promise<ApiResponse<B, C>>
    updateModelSnapshot<T = any, B = any, C = any> (params: RequestParams.MlUpdateModelSnapshot<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    updateModelSnapshot<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    updateModelSnapshot<T = any, B = any, C = any> (params: RequestParams.MlUpdateModelSnapshot<T>, callback: callbackFn<B, C>): TransportRequestCallback
    updateModelSnapshot<T = any, B = any, C = any> (params: RequestParams.MlUpdateModelSnapshot<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    validate<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    validate<T = any, B = any, C = any> (params: RequestParams.MlValidate<T>): Promise<ApiResponse<B, C>>
    validate<T = any, B = any, C = any> (params: RequestParams.MlValidate<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    validate<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    validate<T = any, B = any, C = any> (params: RequestParams.MlValidate<T>, callback: callbackFn<B, C>): TransportRequestCallback
    validate<T = any, B = any, C = any> (params: RequestParams.MlValidate<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    validate_detector<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    validate_detector<T = any, B = any, C = any> (params: RequestParams.MlValidateDetector<T>): Promise<ApiResponse<B, C>>
    validate_detector<T = any, B = any, C = any> (params: RequestParams.MlValidateDetector<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    validate_detector<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    validate_detector<T = any, B = any, C = any> (params: RequestParams.MlValidateDetector<T>, callback: callbackFn<B, C>): TransportRequestCallback
    validate_detector<T = any, B = any, C = any> (params: RequestParams.MlValidateDetector<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    validateDetector<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    validateDetector<T = any, B = any, C = any> (params: RequestParams.MlValidateDetector<T>): Promise<ApiResponse<B, C>>
    validateDetector<T = any, B = any, C = any> (params: RequestParams.MlValidateDetector<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    validateDetector<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    validateDetector<T = any, B = any, C = any> (params: RequestParams.MlValidateDetector<T>, callback: callbackFn<B, C>): TransportRequestCallback
    validateDetector<T = any, B = any, C = any> (params: RequestParams.MlValidateDetector<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  monitoring: {
    bulk<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    bulk<T = any, B = any, C = any> (params: RequestParams.MonitoringBulk<T>): Promise<ApiResponse<B, C>>
    bulk<T = any, B = any, C = any> (params: RequestParams.MonitoringBulk<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    bulk<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    bulk<T = any, B = any, C = any> (params: RequestParams.MonitoringBulk<T>, callback: callbackFn<B, C>): TransportRequestCallback
    bulk<T = any, B = any, C = any> (params: RequestParams.MonitoringBulk<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  msearch<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  msearch<T = any, B = any, C = any> (params: RequestParams.Msearch<T>): Promise<ApiResponse<B, C>>
  msearch<T = any, B = any, C = any> (params: RequestParams.Msearch<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  msearch<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  msearch<T = any, B = any, C = any> (params: RequestParams.Msearch<T>, callback: callbackFn<B, C>): TransportRequestCallback
  msearch<T = any, B = any, C = any> (params: RequestParams.Msearch<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  msearch_template<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  msearch_template<T = any, B = any, C = any> (params: RequestParams.MsearchTemplate<T>): Promise<ApiResponse<B, C>>
  msearch_template<T = any, B = any, C = any> (params: RequestParams.MsearchTemplate<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  msearch_template<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  msearch_template<T = any, B = any, C = any> (params: RequestParams.MsearchTemplate<T>, callback: callbackFn<B, C>): TransportRequestCallback
  msearch_template<T = any, B = any, C = any> (params: RequestParams.MsearchTemplate<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  msearchTemplate<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  msearchTemplate<T = any, B = any, C = any> (params: RequestParams.MsearchTemplate<T>): Promise<ApiResponse<B, C>>
  msearchTemplate<T = any, B = any, C = any> (params: RequestParams.MsearchTemplate<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  msearchTemplate<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  msearchTemplate<T = any, B = any, C = any> (params: RequestParams.MsearchTemplate<T>, callback: callbackFn<B, C>): TransportRequestCallback
  msearchTemplate<T = any, B = any, C = any> (params: RequestParams.MsearchTemplate<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  mtermvectors<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  mtermvectors<T = any, B = any, C = any> (params: RequestParams.Mtermvectors<T>): Promise<ApiResponse<B, C>>
  mtermvectors<T = any, B = any, C = any> (params: RequestParams.Mtermvectors<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  mtermvectors<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  mtermvectors<T = any, B = any, C = any> (params: RequestParams.Mtermvectors<T>, callback: callbackFn<B, C>): TransportRequestCallback
  mtermvectors<T = any, B = any, C = any> (params: RequestParams.Mtermvectors<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  nodes: {
    hot_threads<B = any, C = any> (): Promise<ApiResponse<B, C>>
    hot_threads<B = any, C = any> (params: RequestParams.NodesHotThreads): Promise<ApiResponse<B, C>>
    hot_threads<B = any, C = any> (params: RequestParams.NodesHotThreads, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    hot_threads<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    hot_threads<B = any, C = any> (params: RequestParams.NodesHotThreads, callback: callbackFn<B, C>): TransportRequestCallback
    hot_threads<B = any, C = any> (params: RequestParams.NodesHotThreads, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    hotThreads<B = any, C = any> (): Promise<ApiResponse<B, C>>
    hotThreads<B = any, C = any> (params: RequestParams.NodesHotThreads): Promise<ApiResponse<B, C>>
    hotThreads<B = any, C = any> (params: RequestParams.NodesHotThreads, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    hotThreads<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    hotThreads<B = any, C = any> (params: RequestParams.NodesHotThreads, callback: callbackFn<B, C>): TransportRequestCallback
    hotThreads<B = any, C = any> (params: RequestParams.NodesHotThreads, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    info<B = any, C = any> (): Promise<ApiResponse<B, C>>
    info<B = any, C = any> (params: RequestParams.NodesInfo): Promise<ApiResponse<B, C>>
    info<B = any, C = any> (params: RequestParams.NodesInfo, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    info<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    info<B = any, C = any> (params: RequestParams.NodesInfo, callback: callbackFn<B, C>): TransportRequestCallback
    info<B = any, C = any> (params: RequestParams.NodesInfo, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    reload_secure_settings<B = any, C = any> (): Promise<ApiResponse<B, C>>
    reload_secure_settings<B = any, C = any> (params: RequestParams.NodesReloadSecureSettings): Promise<ApiResponse<B, C>>
    reload_secure_settings<B = any, C = any> (params: RequestParams.NodesReloadSecureSettings, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    reload_secure_settings<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    reload_secure_settings<B = any, C = any> (params: RequestParams.NodesReloadSecureSettings, callback: callbackFn<B, C>): TransportRequestCallback
    reload_secure_settings<B = any, C = any> (params: RequestParams.NodesReloadSecureSettings, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    reloadSecureSettings<B = any, C = any> (): Promise<ApiResponse<B, C>>
    reloadSecureSettings<B = any, C = any> (params: RequestParams.NodesReloadSecureSettings): Promise<ApiResponse<B, C>>
    reloadSecureSettings<B = any, C = any> (params: RequestParams.NodesReloadSecureSettings, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    reloadSecureSettings<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    reloadSecureSettings<B = any, C = any> (params: RequestParams.NodesReloadSecureSettings, callback: callbackFn<B, C>): TransportRequestCallback
    reloadSecureSettings<B = any, C = any> (params: RequestParams.NodesReloadSecureSettings, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (params: RequestParams.NodesStats): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (params: RequestParams.NodesStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (params: RequestParams.NodesStats, callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (params: RequestParams.NodesStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    usage<B = any, C = any> (): Promise<ApiResponse<B, C>>
    usage<B = any, C = any> (params: RequestParams.NodesUsage): Promise<ApiResponse<B, C>>
    usage<B = any, C = any> (params: RequestParams.NodesUsage, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    usage<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    usage<B = any, C = any> (params: RequestParams.NodesUsage, callback: callbackFn<B, C>): TransportRequestCallback
    usage<B = any, C = any> (params: RequestParams.NodesUsage, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  ping<B = any, C = any> (): Promise<ApiResponse<B, C>>
  ping<B = any, C = any> (params: RequestParams.Ping): Promise<ApiResponse<B, C>>
  ping<B = any, C = any> (params: RequestParams.Ping, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  ping<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  ping<B = any, C = any> (params: RequestParams.Ping, callback: callbackFn<B, C>): TransportRequestCallback
  ping<B = any, C = any> (params: RequestParams.Ping, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  put_script<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  put_script<T = any, B = any, C = any> (params: RequestParams.PutScript<T>): Promise<ApiResponse<B, C>>
  put_script<T = any, B = any, C = any> (params: RequestParams.PutScript<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  put_script<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  put_script<T = any, B = any, C = any> (params: RequestParams.PutScript<T>, callback: callbackFn<B, C>): TransportRequestCallback
  put_script<T = any, B = any, C = any> (params: RequestParams.PutScript<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  putScript<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  putScript<T = any, B = any, C = any> (params: RequestParams.PutScript<T>): Promise<ApiResponse<B, C>>
  putScript<T = any, B = any, C = any> (params: RequestParams.PutScript<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  putScript<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  putScript<T = any, B = any, C = any> (params: RequestParams.PutScript<T>, callback: callbackFn<B, C>): TransportRequestCallback
  putScript<T = any, B = any, C = any> (params: RequestParams.PutScript<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  rank_eval<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  rank_eval<T = any, B = any, C = any> (params: RequestParams.RankEval<T>): Promise<ApiResponse<B, C>>
  rank_eval<T = any, B = any, C = any> (params: RequestParams.RankEval<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  rank_eval<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  rank_eval<T = any, B = any, C = any> (params: RequestParams.RankEval<T>, callback: callbackFn<B, C>): TransportRequestCallback
  rank_eval<T = any, B = any, C = any> (params: RequestParams.RankEval<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  rankEval<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  rankEval<T = any, B = any, C = any> (params: RequestParams.RankEval<T>): Promise<ApiResponse<B, C>>
  rankEval<T = any, B = any, C = any> (params: RequestParams.RankEval<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  rankEval<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  rankEval<T = any, B = any, C = any> (params: RequestParams.RankEval<T>, callback: callbackFn<B, C>): TransportRequestCallback
  rankEval<T = any, B = any, C = any> (params: RequestParams.RankEval<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  reindex<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  reindex<T = any, B = any, C = any> (params: RequestParams.Reindex<T>): Promise<ApiResponse<B, C>>
  reindex<T = any, B = any, C = any> (params: RequestParams.Reindex<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  reindex<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  reindex<T = any, B = any, C = any> (params: RequestParams.Reindex<T>, callback: callbackFn<B, C>): TransportRequestCallback
  reindex<T = any, B = any, C = any> (params: RequestParams.Reindex<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  reindex_rethrottle<B = any, C = any> (): Promise<ApiResponse<B, C>>
  reindex_rethrottle<B = any, C = any> (params: RequestParams.ReindexRethrottle): Promise<ApiResponse<B, C>>
  reindex_rethrottle<B = any, C = any> (params: RequestParams.ReindexRethrottle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  reindex_rethrottle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  reindex_rethrottle<B = any, C = any> (params: RequestParams.ReindexRethrottle, callback: callbackFn<B, C>): TransportRequestCallback
  reindex_rethrottle<B = any, C = any> (params: RequestParams.ReindexRethrottle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  reindexRethrottle<B = any, C = any> (): Promise<ApiResponse<B, C>>
  reindexRethrottle<B = any, C = any> (params: RequestParams.ReindexRethrottle): Promise<ApiResponse<B, C>>
  reindexRethrottle<B = any, C = any> (params: RequestParams.ReindexRethrottle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  reindexRethrottle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  reindexRethrottle<B = any, C = any> (params: RequestParams.ReindexRethrottle, callback: callbackFn<B, C>): TransportRequestCallback
  reindexRethrottle<B = any, C = any> (params: RequestParams.ReindexRethrottle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  render_search_template<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  render_search_template<T = any, B = any, C = any> (params: RequestParams.RenderSearchTemplate<T>): Promise<ApiResponse<B, C>>
  render_search_template<T = any, B = any, C = any> (params: RequestParams.RenderSearchTemplate<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  render_search_template<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  render_search_template<T = any, B = any, C = any> (params: RequestParams.RenderSearchTemplate<T>, callback: callbackFn<B, C>): TransportRequestCallback
  render_search_template<T = any, B = any, C = any> (params: RequestParams.RenderSearchTemplate<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  renderSearchTemplate<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  renderSearchTemplate<T = any, B = any, C = any> (params: RequestParams.RenderSearchTemplate<T>): Promise<ApiResponse<B, C>>
  renderSearchTemplate<T = any, B = any, C = any> (params: RequestParams.RenderSearchTemplate<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  renderSearchTemplate<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  renderSearchTemplate<T = any, B = any, C = any> (params: RequestParams.RenderSearchTemplate<T>, callback: callbackFn<B, C>): TransportRequestCallback
  renderSearchTemplate<T = any, B = any, C = any> (params: RequestParams.RenderSearchTemplate<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  rollup: {
    delete_job<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_job<B = any, C = any> (params: RequestParams.RollupDeleteJob): Promise<ApiResponse<B, C>>
    delete_job<B = any, C = any> (params: RequestParams.RollupDeleteJob, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_job<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_job<B = any, C = any> (params: RequestParams.RollupDeleteJob, callback: callbackFn<B, C>): TransportRequestCallback
    delete_job<B = any, C = any> (params: RequestParams.RollupDeleteJob, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteJob<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteJob<B = any, C = any> (params: RequestParams.RollupDeleteJob): Promise<ApiResponse<B, C>>
    deleteJob<B = any, C = any> (params: RequestParams.RollupDeleteJob, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteJob<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteJob<B = any, C = any> (params: RequestParams.RollupDeleteJob, callback: callbackFn<B, C>): TransportRequestCallback
    deleteJob<B = any, C = any> (params: RequestParams.RollupDeleteJob, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_jobs<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_jobs<B = any, C = any> (params: RequestParams.RollupGetJobs): Promise<ApiResponse<B, C>>
    get_jobs<B = any, C = any> (params: RequestParams.RollupGetJobs, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_jobs<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_jobs<B = any, C = any> (params: RequestParams.RollupGetJobs, callback: callbackFn<B, C>): TransportRequestCallback
    get_jobs<B = any, C = any> (params: RequestParams.RollupGetJobs, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getJobs<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getJobs<B = any, C = any> (params: RequestParams.RollupGetJobs): Promise<ApiResponse<B, C>>
    getJobs<B = any, C = any> (params: RequestParams.RollupGetJobs, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getJobs<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getJobs<B = any, C = any> (params: RequestParams.RollupGetJobs, callback: callbackFn<B, C>): TransportRequestCallback
    getJobs<B = any, C = any> (params: RequestParams.RollupGetJobs, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_rollup_caps<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_rollup_caps<B = any, C = any> (params: RequestParams.RollupGetRollupCaps): Promise<ApiResponse<B, C>>
    get_rollup_caps<B = any, C = any> (params: RequestParams.RollupGetRollupCaps, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_rollup_caps<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_rollup_caps<B = any, C = any> (params: RequestParams.RollupGetRollupCaps, callback: callbackFn<B, C>): TransportRequestCallback
    get_rollup_caps<B = any, C = any> (params: RequestParams.RollupGetRollupCaps, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getRollupCaps<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getRollupCaps<B = any, C = any> (params: RequestParams.RollupGetRollupCaps): Promise<ApiResponse<B, C>>
    getRollupCaps<B = any, C = any> (params: RequestParams.RollupGetRollupCaps, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getRollupCaps<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getRollupCaps<B = any, C = any> (params: RequestParams.RollupGetRollupCaps, callback: callbackFn<B, C>): TransportRequestCallback
    getRollupCaps<B = any, C = any> (params: RequestParams.RollupGetRollupCaps, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_rollup_index_caps<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_rollup_index_caps<B = any, C = any> (params: RequestParams.RollupGetRollupIndexCaps): Promise<ApiResponse<B, C>>
    get_rollup_index_caps<B = any, C = any> (params: RequestParams.RollupGetRollupIndexCaps, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_rollup_index_caps<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_rollup_index_caps<B = any, C = any> (params: RequestParams.RollupGetRollupIndexCaps, callback: callbackFn<B, C>): TransportRequestCallback
    get_rollup_index_caps<B = any, C = any> (params: RequestParams.RollupGetRollupIndexCaps, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getRollupIndexCaps<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getRollupIndexCaps<B = any, C = any> (params: RequestParams.RollupGetRollupIndexCaps): Promise<ApiResponse<B, C>>
    getRollupIndexCaps<B = any, C = any> (params: RequestParams.RollupGetRollupIndexCaps, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getRollupIndexCaps<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getRollupIndexCaps<B = any, C = any> (params: RequestParams.RollupGetRollupIndexCaps, callback: callbackFn<B, C>): TransportRequestCallback
    getRollupIndexCaps<B = any, C = any> (params: RequestParams.RollupGetRollupIndexCaps, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_job<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_job<T = any, B = any, C = any> (params: RequestParams.RollupPutJob<T>): Promise<ApiResponse<B, C>>
    put_job<T = any, B = any, C = any> (params: RequestParams.RollupPutJob<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_job<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_job<T = any, B = any, C = any> (params: RequestParams.RollupPutJob<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_job<T = any, B = any, C = any> (params: RequestParams.RollupPutJob<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putJob<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putJob<T = any, B = any, C = any> (params: RequestParams.RollupPutJob<T>): Promise<ApiResponse<B, C>>
    putJob<T = any, B = any, C = any> (params: RequestParams.RollupPutJob<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putJob<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putJob<T = any, B = any, C = any> (params: RequestParams.RollupPutJob<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putJob<T = any, B = any, C = any> (params: RequestParams.RollupPutJob<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    rollup_search<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    rollup_search<T = any, B = any, C = any> (params: RequestParams.RollupRollupSearch<T>): Promise<ApiResponse<B, C>>
    rollup_search<T = any, B = any, C = any> (params: RequestParams.RollupRollupSearch<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    rollup_search<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    rollup_search<T = any, B = any, C = any> (params: RequestParams.RollupRollupSearch<T>, callback: callbackFn<B, C>): TransportRequestCallback
    rollup_search<T = any, B = any, C = any> (params: RequestParams.RollupRollupSearch<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    rollupSearch<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    rollupSearch<T = any, B = any, C = any> (params: RequestParams.RollupRollupSearch<T>): Promise<ApiResponse<B, C>>
    rollupSearch<T = any, B = any, C = any> (params: RequestParams.RollupRollupSearch<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    rollupSearch<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    rollupSearch<T = any, B = any, C = any> (params: RequestParams.RollupRollupSearch<T>, callback: callbackFn<B, C>): TransportRequestCallback
    rollupSearch<T = any, B = any, C = any> (params: RequestParams.RollupRollupSearch<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    start_job<B = any, C = any> (): Promise<ApiResponse<B, C>>
    start_job<B = any, C = any> (params: RequestParams.RollupStartJob): Promise<ApiResponse<B, C>>
    start_job<B = any, C = any> (params: RequestParams.RollupStartJob, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    start_job<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    start_job<B = any, C = any> (params: RequestParams.RollupStartJob, callback: callbackFn<B, C>): TransportRequestCallback
    start_job<B = any, C = any> (params: RequestParams.RollupStartJob, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    startJob<B = any, C = any> (): Promise<ApiResponse<B, C>>
    startJob<B = any, C = any> (params: RequestParams.RollupStartJob): Promise<ApiResponse<B, C>>
    startJob<B = any, C = any> (params: RequestParams.RollupStartJob, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    startJob<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    startJob<B = any, C = any> (params: RequestParams.RollupStartJob, callback: callbackFn<B, C>): TransportRequestCallback
    startJob<B = any, C = any> (params: RequestParams.RollupStartJob, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stop_job<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stop_job<B = any, C = any> (params: RequestParams.RollupStopJob): Promise<ApiResponse<B, C>>
    stop_job<B = any, C = any> (params: RequestParams.RollupStopJob, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stop_job<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stop_job<B = any, C = any> (params: RequestParams.RollupStopJob, callback: callbackFn<B, C>): TransportRequestCallback
    stop_job<B = any, C = any> (params: RequestParams.RollupStopJob, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stopJob<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stopJob<B = any, C = any> (params: RequestParams.RollupStopJob): Promise<ApiResponse<B, C>>
    stopJob<B = any, C = any> (params: RequestParams.RollupStopJob, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stopJob<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stopJob<B = any, C = any> (params: RequestParams.RollupStopJob, callback: callbackFn<B, C>): TransportRequestCallback
    stopJob<B = any, C = any> (params: RequestParams.RollupStopJob, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  scripts_painless_execute<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  scripts_painless_execute<T = any, B = any, C = any> (params: RequestParams.ScriptsPainlessExecute<T>): Promise<ApiResponse<B, C>>
  scripts_painless_execute<T = any, B = any, C = any> (params: RequestParams.ScriptsPainlessExecute<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  scripts_painless_execute<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  scripts_painless_execute<T = any, B = any, C = any> (params: RequestParams.ScriptsPainlessExecute<T>, callback: callbackFn<B, C>): TransportRequestCallback
  scripts_painless_execute<T = any, B = any, C = any> (params: RequestParams.ScriptsPainlessExecute<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  scriptsPainlessExecute<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  scriptsPainlessExecute<T = any, B = any, C = any> (params: RequestParams.ScriptsPainlessExecute<T>): Promise<ApiResponse<B, C>>
  scriptsPainlessExecute<T = any, B = any, C = any> (params: RequestParams.ScriptsPainlessExecute<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  scriptsPainlessExecute<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  scriptsPainlessExecute<T = any, B = any, C = any> (params: RequestParams.ScriptsPainlessExecute<T>, callback: callbackFn<B, C>): TransportRequestCallback
  scriptsPainlessExecute<T = any, B = any, C = any> (params: RequestParams.ScriptsPainlessExecute<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  scroll<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  scroll<T = any, B = any, C = any> (params: RequestParams.Scroll<T>): Promise<ApiResponse<B, C>>
  scroll<T = any, B = any, C = any> (params: RequestParams.Scroll<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  scroll<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  scroll<T = any, B = any, C = any> (params: RequestParams.Scroll<T>, callback: callbackFn<B, C>): TransportRequestCallback
  scroll<T = any, B = any, C = any> (params: RequestParams.Scroll<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  search<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  search<T = any, B = any, C = any> (params: RequestParams.Search<T>): Promise<ApiResponse<B, C>>
  search<T = any, B = any, C = any> (params: RequestParams.Search<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  search<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  search<T = any, B = any, C = any> (params: RequestParams.Search<T>, callback: callbackFn<B, C>): TransportRequestCallback
  search<T = any, B = any, C = any> (params: RequestParams.Search<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  search_shards<B = any, C = any> (): Promise<ApiResponse<B, C>>
  search_shards<B = any, C = any> (params: RequestParams.SearchShards): Promise<ApiResponse<B, C>>
  search_shards<B = any, C = any> (params: RequestParams.SearchShards, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  search_shards<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  search_shards<B = any, C = any> (params: RequestParams.SearchShards, callback: callbackFn<B, C>): TransportRequestCallback
  search_shards<B = any, C = any> (params: RequestParams.SearchShards, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  searchShards<B = any, C = any> (): Promise<ApiResponse<B, C>>
  searchShards<B = any, C = any> (params: RequestParams.SearchShards): Promise<ApiResponse<B, C>>
  searchShards<B = any, C = any> (params: RequestParams.SearchShards, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  searchShards<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  searchShards<B = any, C = any> (params: RequestParams.SearchShards, callback: callbackFn<B, C>): TransportRequestCallback
  searchShards<B = any, C = any> (params: RequestParams.SearchShards, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  search_template<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  search_template<T = any, B = any, C = any> (params: RequestParams.SearchTemplate<T>): Promise<ApiResponse<B, C>>
  search_template<T = any, B = any, C = any> (params: RequestParams.SearchTemplate<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  search_template<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  search_template<T = any, B = any, C = any> (params: RequestParams.SearchTemplate<T>, callback: callbackFn<B, C>): TransportRequestCallback
  search_template<T = any, B = any, C = any> (params: RequestParams.SearchTemplate<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  searchTemplate<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  searchTemplate<T = any, B = any, C = any> (params: RequestParams.SearchTemplate<T>): Promise<ApiResponse<B, C>>
  searchTemplate<T = any, B = any, C = any> (params: RequestParams.SearchTemplate<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  searchTemplate<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  searchTemplate<T = any, B = any, C = any> (params: RequestParams.SearchTemplate<T>, callback: callbackFn<B, C>): TransportRequestCallback
  searchTemplate<T = any, B = any, C = any> (params: RequestParams.SearchTemplate<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  security: {
    authenticate<B = any, C = any> (): Promise<ApiResponse<B, C>>
    authenticate<B = any, C = any> (params: RequestParams.SecurityAuthenticate): Promise<ApiResponse<B, C>>
    authenticate<B = any, C = any> (params: RequestParams.SecurityAuthenticate, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    authenticate<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    authenticate<B = any, C = any> (params: RequestParams.SecurityAuthenticate, callback: callbackFn<B, C>): TransportRequestCallback
    authenticate<B = any, C = any> (params: RequestParams.SecurityAuthenticate, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    change_password<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    change_password<T = any, B = any, C = any> (params: RequestParams.SecurityChangePassword<T>): Promise<ApiResponse<B, C>>
    change_password<T = any, B = any, C = any> (params: RequestParams.SecurityChangePassword<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    change_password<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    change_password<T = any, B = any, C = any> (params: RequestParams.SecurityChangePassword<T>, callback: callbackFn<B, C>): TransportRequestCallback
    change_password<T = any, B = any, C = any> (params: RequestParams.SecurityChangePassword<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    changePassword<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    changePassword<T = any, B = any, C = any> (params: RequestParams.SecurityChangePassword<T>): Promise<ApiResponse<B, C>>
    changePassword<T = any, B = any, C = any> (params: RequestParams.SecurityChangePassword<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    changePassword<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    changePassword<T = any, B = any, C = any> (params: RequestParams.SecurityChangePassword<T>, callback: callbackFn<B, C>): TransportRequestCallback
    changePassword<T = any, B = any, C = any> (params: RequestParams.SecurityChangePassword<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    clear_cached_realms<B = any, C = any> (): Promise<ApiResponse<B, C>>
    clear_cached_realms<B = any, C = any> (params: RequestParams.SecurityClearCachedRealms): Promise<ApiResponse<B, C>>
    clear_cached_realms<B = any, C = any> (params: RequestParams.SecurityClearCachedRealms, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    clear_cached_realms<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    clear_cached_realms<B = any, C = any> (params: RequestParams.SecurityClearCachedRealms, callback: callbackFn<B, C>): TransportRequestCallback
    clear_cached_realms<B = any, C = any> (params: RequestParams.SecurityClearCachedRealms, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    clearCachedRealms<B = any, C = any> (): Promise<ApiResponse<B, C>>
    clearCachedRealms<B = any, C = any> (params: RequestParams.SecurityClearCachedRealms): Promise<ApiResponse<B, C>>
    clearCachedRealms<B = any, C = any> (params: RequestParams.SecurityClearCachedRealms, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    clearCachedRealms<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    clearCachedRealms<B = any, C = any> (params: RequestParams.SecurityClearCachedRealms, callback: callbackFn<B, C>): TransportRequestCallback
    clearCachedRealms<B = any, C = any> (params: RequestParams.SecurityClearCachedRealms, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    clear_cached_roles<B = any, C = any> (): Promise<ApiResponse<B, C>>
    clear_cached_roles<B = any, C = any> (params: RequestParams.SecurityClearCachedRoles): Promise<ApiResponse<B, C>>
    clear_cached_roles<B = any, C = any> (params: RequestParams.SecurityClearCachedRoles, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    clear_cached_roles<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    clear_cached_roles<B = any, C = any> (params: RequestParams.SecurityClearCachedRoles, callback: callbackFn<B, C>): TransportRequestCallback
    clear_cached_roles<B = any, C = any> (params: RequestParams.SecurityClearCachedRoles, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    clearCachedRoles<B = any, C = any> (): Promise<ApiResponse<B, C>>
    clearCachedRoles<B = any, C = any> (params: RequestParams.SecurityClearCachedRoles): Promise<ApiResponse<B, C>>
    clearCachedRoles<B = any, C = any> (params: RequestParams.SecurityClearCachedRoles, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    clearCachedRoles<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    clearCachedRoles<B = any, C = any> (params: RequestParams.SecurityClearCachedRoles, callback: callbackFn<B, C>): TransportRequestCallback
    clearCachedRoles<B = any, C = any> (params: RequestParams.SecurityClearCachedRoles, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    create_api_key<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    create_api_key<T = any, B = any, C = any> (params: RequestParams.SecurityCreateApiKey<T>): Promise<ApiResponse<B, C>>
    create_api_key<T = any, B = any, C = any> (params: RequestParams.SecurityCreateApiKey<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    create_api_key<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    create_api_key<T = any, B = any, C = any> (params: RequestParams.SecurityCreateApiKey<T>, callback: callbackFn<B, C>): TransportRequestCallback
    create_api_key<T = any, B = any, C = any> (params: RequestParams.SecurityCreateApiKey<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    createApiKey<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    createApiKey<T = any, B = any, C = any> (params: RequestParams.SecurityCreateApiKey<T>): Promise<ApiResponse<B, C>>
    createApiKey<T = any, B = any, C = any> (params: RequestParams.SecurityCreateApiKey<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    createApiKey<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    createApiKey<T = any, B = any, C = any> (params: RequestParams.SecurityCreateApiKey<T>, callback: callbackFn<B, C>): TransportRequestCallback
    createApiKey<T = any, B = any, C = any> (params: RequestParams.SecurityCreateApiKey<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_privileges<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_privileges<B = any, C = any> (params: RequestParams.SecurityDeletePrivileges): Promise<ApiResponse<B, C>>
    delete_privileges<B = any, C = any> (params: RequestParams.SecurityDeletePrivileges, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_privileges<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_privileges<B = any, C = any> (params: RequestParams.SecurityDeletePrivileges, callback: callbackFn<B, C>): TransportRequestCallback
    delete_privileges<B = any, C = any> (params: RequestParams.SecurityDeletePrivileges, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deletePrivileges<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deletePrivileges<B = any, C = any> (params: RequestParams.SecurityDeletePrivileges): Promise<ApiResponse<B, C>>
    deletePrivileges<B = any, C = any> (params: RequestParams.SecurityDeletePrivileges, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deletePrivileges<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deletePrivileges<B = any, C = any> (params: RequestParams.SecurityDeletePrivileges, callback: callbackFn<B, C>): TransportRequestCallback
    deletePrivileges<B = any, C = any> (params: RequestParams.SecurityDeletePrivileges, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_role<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_role<B = any, C = any> (params: RequestParams.SecurityDeleteRole): Promise<ApiResponse<B, C>>
    delete_role<B = any, C = any> (params: RequestParams.SecurityDeleteRole, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_role<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_role<B = any, C = any> (params: RequestParams.SecurityDeleteRole, callback: callbackFn<B, C>): TransportRequestCallback
    delete_role<B = any, C = any> (params: RequestParams.SecurityDeleteRole, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteRole<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteRole<B = any, C = any> (params: RequestParams.SecurityDeleteRole): Promise<ApiResponse<B, C>>
    deleteRole<B = any, C = any> (params: RequestParams.SecurityDeleteRole, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteRole<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteRole<B = any, C = any> (params: RequestParams.SecurityDeleteRole, callback: callbackFn<B, C>): TransportRequestCallback
    deleteRole<B = any, C = any> (params: RequestParams.SecurityDeleteRole, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_role_mapping<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_role_mapping<B = any, C = any> (params: RequestParams.SecurityDeleteRoleMapping): Promise<ApiResponse<B, C>>
    delete_role_mapping<B = any, C = any> (params: RequestParams.SecurityDeleteRoleMapping, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_role_mapping<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_role_mapping<B = any, C = any> (params: RequestParams.SecurityDeleteRoleMapping, callback: callbackFn<B, C>): TransportRequestCallback
    delete_role_mapping<B = any, C = any> (params: RequestParams.SecurityDeleteRoleMapping, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteRoleMapping<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteRoleMapping<B = any, C = any> (params: RequestParams.SecurityDeleteRoleMapping): Promise<ApiResponse<B, C>>
    deleteRoleMapping<B = any, C = any> (params: RequestParams.SecurityDeleteRoleMapping, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteRoleMapping<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteRoleMapping<B = any, C = any> (params: RequestParams.SecurityDeleteRoleMapping, callback: callbackFn<B, C>): TransportRequestCallback
    deleteRoleMapping<B = any, C = any> (params: RequestParams.SecurityDeleteRoleMapping, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_user<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_user<B = any, C = any> (params: RequestParams.SecurityDeleteUser): Promise<ApiResponse<B, C>>
    delete_user<B = any, C = any> (params: RequestParams.SecurityDeleteUser, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_user<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_user<B = any, C = any> (params: RequestParams.SecurityDeleteUser, callback: callbackFn<B, C>): TransportRequestCallback
    delete_user<B = any, C = any> (params: RequestParams.SecurityDeleteUser, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteUser<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteUser<B = any, C = any> (params: RequestParams.SecurityDeleteUser): Promise<ApiResponse<B, C>>
    deleteUser<B = any, C = any> (params: RequestParams.SecurityDeleteUser, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteUser<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteUser<B = any, C = any> (params: RequestParams.SecurityDeleteUser, callback: callbackFn<B, C>): TransportRequestCallback
    deleteUser<B = any, C = any> (params: RequestParams.SecurityDeleteUser, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    disable_user<B = any, C = any> (): Promise<ApiResponse<B, C>>
    disable_user<B = any, C = any> (params: RequestParams.SecurityDisableUser): Promise<ApiResponse<B, C>>
    disable_user<B = any, C = any> (params: RequestParams.SecurityDisableUser, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    disable_user<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    disable_user<B = any, C = any> (params: RequestParams.SecurityDisableUser, callback: callbackFn<B, C>): TransportRequestCallback
    disable_user<B = any, C = any> (params: RequestParams.SecurityDisableUser, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    disableUser<B = any, C = any> (): Promise<ApiResponse<B, C>>
    disableUser<B = any, C = any> (params: RequestParams.SecurityDisableUser): Promise<ApiResponse<B, C>>
    disableUser<B = any, C = any> (params: RequestParams.SecurityDisableUser, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    disableUser<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    disableUser<B = any, C = any> (params: RequestParams.SecurityDisableUser, callback: callbackFn<B, C>): TransportRequestCallback
    disableUser<B = any, C = any> (params: RequestParams.SecurityDisableUser, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    enable_user<B = any, C = any> (): Promise<ApiResponse<B, C>>
    enable_user<B = any, C = any> (params: RequestParams.SecurityEnableUser): Promise<ApiResponse<B, C>>
    enable_user<B = any, C = any> (params: RequestParams.SecurityEnableUser, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    enable_user<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    enable_user<B = any, C = any> (params: RequestParams.SecurityEnableUser, callback: callbackFn<B, C>): TransportRequestCallback
    enable_user<B = any, C = any> (params: RequestParams.SecurityEnableUser, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    enableUser<B = any, C = any> (): Promise<ApiResponse<B, C>>
    enableUser<B = any, C = any> (params: RequestParams.SecurityEnableUser): Promise<ApiResponse<B, C>>
    enableUser<B = any, C = any> (params: RequestParams.SecurityEnableUser, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    enableUser<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    enableUser<B = any, C = any> (params: RequestParams.SecurityEnableUser, callback: callbackFn<B, C>): TransportRequestCallback
    enableUser<B = any, C = any> (params: RequestParams.SecurityEnableUser, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_api_key<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_api_key<B = any, C = any> (params: RequestParams.SecurityGetApiKey): Promise<ApiResponse<B, C>>
    get_api_key<B = any, C = any> (params: RequestParams.SecurityGetApiKey, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_api_key<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_api_key<B = any, C = any> (params: RequestParams.SecurityGetApiKey, callback: callbackFn<B, C>): TransportRequestCallback
    get_api_key<B = any, C = any> (params: RequestParams.SecurityGetApiKey, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getApiKey<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getApiKey<B = any, C = any> (params: RequestParams.SecurityGetApiKey): Promise<ApiResponse<B, C>>
    getApiKey<B = any, C = any> (params: RequestParams.SecurityGetApiKey, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getApiKey<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getApiKey<B = any, C = any> (params: RequestParams.SecurityGetApiKey, callback: callbackFn<B, C>): TransportRequestCallback
    getApiKey<B = any, C = any> (params: RequestParams.SecurityGetApiKey, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_builtin_privileges<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_builtin_privileges<B = any, C = any> (params: RequestParams.SecurityGetBuiltinPrivileges): Promise<ApiResponse<B, C>>
    get_builtin_privileges<B = any, C = any> (params: RequestParams.SecurityGetBuiltinPrivileges, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_builtin_privileges<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_builtin_privileges<B = any, C = any> (params: RequestParams.SecurityGetBuiltinPrivileges, callback: callbackFn<B, C>): TransportRequestCallback
    get_builtin_privileges<B = any, C = any> (params: RequestParams.SecurityGetBuiltinPrivileges, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getBuiltinPrivileges<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getBuiltinPrivileges<B = any, C = any> (params: RequestParams.SecurityGetBuiltinPrivileges): Promise<ApiResponse<B, C>>
    getBuiltinPrivileges<B = any, C = any> (params: RequestParams.SecurityGetBuiltinPrivileges, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getBuiltinPrivileges<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getBuiltinPrivileges<B = any, C = any> (params: RequestParams.SecurityGetBuiltinPrivileges, callback: callbackFn<B, C>): TransportRequestCallback
    getBuiltinPrivileges<B = any, C = any> (params: RequestParams.SecurityGetBuiltinPrivileges, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_privileges<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_privileges<B = any, C = any> (params: RequestParams.SecurityGetPrivileges): Promise<ApiResponse<B, C>>
    get_privileges<B = any, C = any> (params: RequestParams.SecurityGetPrivileges, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_privileges<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_privileges<B = any, C = any> (params: RequestParams.SecurityGetPrivileges, callback: callbackFn<B, C>): TransportRequestCallback
    get_privileges<B = any, C = any> (params: RequestParams.SecurityGetPrivileges, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getPrivileges<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getPrivileges<B = any, C = any> (params: RequestParams.SecurityGetPrivileges): Promise<ApiResponse<B, C>>
    getPrivileges<B = any, C = any> (params: RequestParams.SecurityGetPrivileges, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getPrivileges<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getPrivileges<B = any, C = any> (params: RequestParams.SecurityGetPrivileges, callback: callbackFn<B, C>): TransportRequestCallback
    getPrivileges<B = any, C = any> (params: RequestParams.SecurityGetPrivileges, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_role<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_role<B = any, C = any> (params: RequestParams.SecurityGetRole): Promise<ApiResponse<B, C>>
    get_role<B = any, C = any> (params: RequestParams.SecurityGetRole, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_role<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_role<B = any, C = any> (params: RequestParams.SecurityGetRole, callback: callbackFn<B, C>): TransportRequestCallback
    get_role<B = any, C = any> (params: RequestParams.SecurityGetRole, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getRole<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getRole<B = any, C = any> (params: RequestParams.SecurityGetRole): Promise<ApiResponse<B, C>>
    getRole<B = any, C = any> (params: RequestParams.SecurityGetRole, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getRole<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getRole<B = any, C = any> (params: RequestParams.SecurityGetRole, callback: callbackFn<B, C>): TransportRequestCallback
    getRole<B = any, C = any> (params: RequestParams.SecurityGetRole, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_role_mapping<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_role_mapping<B = any, C = any> (params: RequestParams.SecurityGetRoleMapping): Promise<ApiResponse<B, C>>
    get_role_mapping<B = any, C = any> (params: RequestParams.SecurityGetRoleMapping, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_role_mapping<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_role_mapping<B = any, C = any> (params: RequestParams.SecurityGetRoleMapping, callback: callbackFn<B, C>): TransportRequestCallback
    get_role_mapping<B = any, C = any> (params: RequestParams.SecurityGetRoleMapping, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getRoleMapping<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getRoleMapping<B = any, C = any> (params: RequestParams.SecurityGetRoleMapping): Promise<ApiResponse<B, C>>
    getRoleMapping<B = any, C = any> (params: RequestParams.SecurityGetRoleMapping, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getRoleMapping<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getRoleMapping<B = any, C = any> (params: RequestParams.SecurityGetRoleMapping, callback: callbackFn<B, C>): TransportRequestCallback
    getRoleMapping<B = any, C = any> (params: RequestParams.SecurityGetRoleMapping, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_token<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_token<T = any, B = any, C = any> (params: RequestParams.SecurityGetToken<T>): Promise<ApiResponse<B, C>>
    get_token<T = any, B = any, C = any> (params: RequestParams.SecurityGetToken<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_token<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_token<T = any, B = any, C = any> (params: RequestParams.SecurityGetToken<T>, callback: callbackFn<B, C>): TransportRequestCallback
    get_token<T = any, B = any, C = any> (params: RequestParams.SecurityGetToken<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getToken<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    getToken<T = any, B = any, C = any> (params: RequestParams.SecurityGetToken<T>): Promise<ApiResponse<B, C>>
    getToken<T = any, B = any, C = any> (params: RequestParams.SecurityGetToken<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getToken<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getToken<T = any, B = any, C = any> (params: RequestParams.SecurityGetToken<T>, callback: callbackFn<B, C>): TransportRequestCallback
    getToken<T = any, B = any, C = any> (params: RequestParams.SecurityGetToken<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_user<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_user<B = any, C = any> (params: RequestParams.SecurityGetUser): Promise<ApiResponse<B, C>>
    get_user<B = any, C = any> (params: RequestParams.SecurityGetUser, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_user<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_user<B = any, C = any> (params: RequestParams.SecurityGetUser, callback: callbackFn<B, C>): TransportRequestCallback
    get_user<B = any, C = any> (params: RequestParams.SecurityGetUser, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getUser<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getUser<B = any, C = any> (params: RequestParams.SecurityGetUser): Promise<ApiResponse<B, C>>
    getUser<B = any, C = any> (params: RequestParams.SecurityGetUser, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getUser<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getUser<B = any, C = any> (params: RequestParams.SecurityGetUser, callback: callbackFn<B, C>): TransportRequestCallback
    getUser<B = any, C = any> (params: RequestParams.SecurityGetUser, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_user_privileges<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_user_privileges<B = any, C = any> (params: RequestParams.SecurityGetUserPrivileges): Promise<ApiResponse<B, C>>
    get_user_privileges<B = any, C = any> (params: RequestParams.SecurityGetUserPrivileges, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_user_privileges<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_user_privileges<B = any, C = any> (params: RequestParams.SecurityGetUserPrivileges, callback: callbackFn<B, C>): TransportRequestCallback
    get_user_privileges<B = any, C = any> (params: RequestParams.SecurityGetUserPrivileges, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getUserPrivileges<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getUserPrivileges<B = any, C = any> (params: RequestParams.SecurityGetUserPrivileges): Promise<ApiResponse<B, C>>
    getUserPrivileges<B = any, C = any> (params: RequestParams.SecurityGetUserPrivileges, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getUserPrivileges<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getUserPrivileges<B = any, C = any> (params: RequestParams.SecurityGetUserPrivileges, callback: callbackFn<B, C>): TransportRequestCallback
    getUserPrivileges<B = any, C = any> (params: RequestParams.SecurityGetUserPrivileges, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    has_privileges<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    has_privileges<T = any, B = any, C = any> (params: RequestParams.SecurityHasPrivileges<T>): Promise<ApiResponse<B, C>>
    has_privileges<T = any, B = any, C = any> (params: RequestParams.SecurityHasPrivileges<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    has_privileges<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    has_privileges<T = any, B = any, C = any> (params: RequestParams.SecurityHasPrivileges<T>, callback: callbackFn<B, C>): TransportRequestCallback
    has_privileges<T = any, B = any, C = any> (params: RequestParams.SecurityHasPrivileges<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    hasPrivileges<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    hasPrivileges<T = any, B = any, C = any> (params: RequestParams.SecurityHasPrivileges<T>): Promise<ApiResponse<B, C>>
    hasPrivileges<T = any, B = any, C = any> (params: RequestParams.SecurityHasPrivileges<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    hasPrivileges<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    hasPrivileges<T = any, B = any, C = any> (params: RequestParams.SecurityHasPrivileges<T>, callback: callbackFn<B, C>): TransportRequestCallback
    hasPrivileges<T = any, B = any, C = any> (params: RequestParams.SecurityHasPrivileges<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    invalidate_api_key<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    invalidate_api_key<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateApiKey<T>): Promise<ApiResponse<B, C>>
    invalidate_api_key<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateApiKey<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    invalidate_api_key<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    invalidate_api_key<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateApiKey<T>, callback: callbackFn<B, C>): TransportRequestCallback
    invalidate_api_key<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateApiKey<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    invalidateApiKey<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    invalidateApiKey<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateApiKey<T>): Promise<ApiResponse<B, C>>
    invalidateApiKey<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateApiKey<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    invalidateApiKey<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    invalidateApiKey<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateApiKey<T>, callback: callbackFn<B, C>): TransportRequestCallback
    invalidateApiKey<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateApiKey<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    invalidate_token<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    invalidate_token<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateToken<T>): Promise<ApiResponse<B, C>>
    invalidate_token<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateToken<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    invalidate_token<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    invalidate_token<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateToken<T>, callback: callbackFn<B, C>): TransportRequestCallback
    invalidate_token<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateToken<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    invalidateToken<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    invalidateToken<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateToken<T>): Promise<ApiResponse<B, C>>
    invalidateToken<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateToken<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    invalidateToken<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    invalidateToken<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateToken<T>, callback: callbackFn<B, C>): TransportRequestCallback
    invalidateToken<T = any, B = any, C = any> (params: RequestParams.SecurityInvalidateToken<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_privileges<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_privileges<T = any, B = any, C = any> (params: RequestParams.SecurityPutPrivileges<T>): Promise<ApiResponse<B, C>>
    put_privileges<T = any, B = any, C = any> (params: RequestParams.SecurityPutPrivileges<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_privileges<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_privileges<T = any, B = any, C = any> (params: RequestParams.SecurityPutPrivileges<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_privileges<T = any, B = any, C = any> (params: RequestParams.SecurityPutPrivileges<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putPrivileges<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putPrivileges<T = any, B = any, C = any> (params: RequestParams.SecurityPutPrivileges<T>): Promise<ApiResponse<B, C>>
    putPrivileges<T = any, B = any, C = any> (params: RequestParams.SecurityPutPrivileges<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putPrivileges<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putPrivileges<T = any, B = any, C = any> (params: RequestParams.SecurityPutPrivileges<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putPrivileges<T = any, B = any, C = any> (params: RequestParams.SecurityPutPrivileges<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_role<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_role<T = any, B = any, C = any> (params: RequestParams.SecurityPutRole<T>): Promise<ApiResponse<B, C>>
    put_role<T = any, B = any, C = any> (params: RequestParams.SecurityPutRole<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_role<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_role<T = any, B = any, C = any> (params: RequestParams.SecurityPutRole<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_role<T = any, B = any, C = any> (params: RequestParams.SecurityPutRole<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putRole<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putRole<T = any, B = any, C = any> (params: RequestParams.SecurityPutRole<T>): Promise<ApiResponse<B, C>>
    putRole<T = any, B = any, C = any> (params: RequestParams.SecurityPutRole<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putRole<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putRole<T = any, B = any, C = any> (params: RequestParams.SecurityPutRole<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putRole<T = any, B = any, C = any> (params: RequestParams.SecurityPutRole<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_role_mapping<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_role_mapping<T = any, B = any, C = any> (params: RequestParams.SecurityPutRoleMapping<T>): Promise<ApiResponse<B, C>>
    put_role_mapping<T = any, B = any, C = any> (params: RequestParams.SecurityPutRoleMapping<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_role_mapping<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_role_mapping<T = any, B = any, C = any> (params: RequestParams.SecurityPutRoleMapping<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_role_mapping<T = any, B = any, C = any> (params: RequestParams.SecurityPutRoleMapping<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putRoleMapping<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putRoleMapping<T = any, B = any, C = any> (params: RequestParams.SecurityPutRoleMapping<T>): Promise<ApiResponse<B, C>>
    putRoleMapping<T = any, B = any, C = any> (params: RequestParams.SecurityPutRoleMapping<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putRoleMapping<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putRoleMapping<T = any, B = any, C = any> (params: RequestParams.SecurityPutRoleMapping<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putRoleMapping<T = any, B = any, C = any> (params: RequestParams.SecurityPutRoleMapping<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_user<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_user<T = any, B = any, C = any> (params: RequestParams.SecurityPutUser<T>): Promise<ApiResponse<B, C>>
    put_user<T = any, B = any, C = any> (params: RequestParams.SecurityPutUser<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_user<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_user<T = any, B = any, C = any> (params: RequestParams.SecurityPutUser<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_user<T = any, B = any, C = any> (params: RequestParams.SecurityPutUser<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putUser<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putUser<T = any, B = any, C = any> (params: RequestParams.SecurityPutUser<T>): Promise<ApiResponse<B, C>>
    putUser<T = any, B = any, C = any> (params: RequestParams.SecurityPutUser<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putUser<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putUser<T = any, B = any, C = any> (params: RequestParams.SecurityPutUser<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putUser<T = any, B = any, C = any> (params: RequestParams.SecurityPutUser<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  slm: {
    delete_lifecycle<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_lifecycle<B = any, C = any> (params: RequestParams.SlmDeleteLifecycle): Promise<ApiResponse<B, C>>
    delete_lifecycle<B = any, C = any> (params: RequestParams.SlmDeleteLifecycle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_lifecycle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_lifecycle<B = any, C = any> (params: RequestParams.SlmDeleteLifecycle, callback: callbackFn<B, C>): TransportRequestCallback
    delete_lifecycle<B = any, C = any> (params: RequestParams.SlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteLifecycle<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteLifecycle<B = any, C = any> (params: RequestParams.SlmDeleteLifecycle): Promise<ApiResponse<B, C>>
    deleteLifecycle<B = any, C = any> (params: RequestParams.SlmDeleteLifecycle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteLifecycle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteLifecycle<B = any, C = any> (params: RequestParams.SlmDeleteLifecycle, callback: callbackFn<B, C>): TransportRequestCallback
    deleteLifecycle<B = any, C = any> (params: RequestParams.SlmDeleteLifecycle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    execute_lifecycle<B = any, C = any> (): Promise<ApiResponse<B, C>>
    execute_lifecycle<B = any, C = any> (params: RequestParams.SlmExecuteLifecycle): Promise<ApiResponse<B, C>>
    execute_lifecycle<B = any, C = any> (params: RequestParams.SlmExecuteLifecycle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    execute_lifecycle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    execute_lifecycle<B = any, C = any> (params: RequestParams.SlmExecuteLifecycle, callback: callbackFn<B, C>): TransportRequestCallback
    execute_lifecycle<B = any, C = any> (params: RequestParams.SlmExecuteLifecycle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    executeLifecycle<B = any, C = any> (): Promise<ApiResponse<B, C>>
    executeLifecycle<B = any, C = any> (params: RequestParams.SlmExecuteLifecycle): Promise<ApiResponse<B, C>>
    executeLifecycle<B = any, C = any> (params: RequestParams.SlmExecuteLifecycle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    executeLifecycle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    executeLifecycle<B = any, C = any> (params: RequestParams.SlmExecuteLifecycle, callback: callbackFn<B, C>): TransportRequestCallback
    executeLifecycle<B = any, C = any> (params: RequestParams.SlmExecuteLifecycle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    execute_retention<B = any, C = any> (): Promise<ApiResponse<B, C>>
    execute_retention<B = any, C = any> (params: RequestParams.SlmExecuteRetention): Promise<ApiResponse<B, C>>
    execute_retention<B = any, C = any> (params: RequestParams.SlmExecuteRetention, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    execute_retention<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    execute_retention<B = any, C = any> (params: RequestParams.SlmExecuteRetention, callback: callbackFn<B, C>): TransportRequestCallback
    execute_retention<B = any, C = any> (params: RequestParams.SlmExecuteRetention, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    executeRetention<B = any, C = any> (): Promise<ApiResponse<B, C>>
    executeRetention<B = any, C = any> (params: RequestParams.SlmExecuteRetention): Promise<ApiResponse<B, C>>
    executeRetention<B = any, C = any> (params: RequestParams.SlmExecuteRetention, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    executeRetention<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    executeRetention<B = any, C = any> (params: RequestParams.SlmExecuteRetention, callback: callbackFn<B, C>): TransportRequestCallback
    executeRetention<B = any, C = any> (params: RequestParams.SlmExecuteRetention, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_lifecycle<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_lifecycle<B = any, C = any> (params: RequestParams.SlmGetLifecycle): Promise<ApiResponse<B, C>>
    get_lifecycle<B = any, C = any> (params: RequestParams.SlmGetLifecycle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_lifecycle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_lifecycle<B = any, C = any> (params: RequestParams.SlmGetLifecycle, callback: callbackFn<B, C>): TransportRequestCallback
    get_lifecycle<B = any, C = any> (params: RequestParams.SlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getLifecycle<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getLifecycle<B = any, C = any> (params: RequestParams.SlmGetLifecycle): Promise<ApiResponse<B, C>>
    getLifecycle<B = any, C = any> (params: RequestParams.SlmGetLifecycle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getLifecycle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getLifecycle<B = any, C = any> (params: RequestParams.SlmGetLifecycle, callback: callbackFn<B, C>): TransportRequestCallback
    getLifecycle<B = any, C = any> (params: RequestParams.SlmGetLifecycle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_stats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_stats<B = any, C = any> (params: RequestParams.SlmGetStats): Promise<ApiResponse<B, C>>
    get_stats<B = any, C = any> (params: RequestParams.SlmGetStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_stats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_stats<B = any, C = any> (params: RequestParams.SlmGetStats, callback: callbackFn<B, C>): TransportRequestCallback
    get_stats<B = any, C = any> (params: RequestParams.SlmGetStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getStats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getStats<B = any, C = any> (params: RequestParams.SlmGetStats): Promise<ApiResponse<B, C>>
    getStats<B = any, C = any> (params: RequestParams.SlmGetStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getStats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getStats<B = any, C = any> (params: RequestParams.SlmGetStats, callback: callbackFn<B, C>): TransportRequestCallback
    getStats<B = any, C = any> (params: RequestParams.SlmGetStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_status<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_status<B = any, C = any> (params: RequestParams.SlmGetStatus): Promise<ApiResponse<B, C>>
    get_status<B = any, C = any> (params: RequestParams.SlmGetStatus, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_status<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_status<B = any, C = any> (params: RequestParams.SlmGetStatus, callback: callbackFn<B, C>): TransportRequestCallback
    get_status<B = any, C = any> (params: RequestParams.SlmGetStatus, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getStatus<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getStatus<B = any, C = any> (params: RequestParams.SlmGetStatus): Promise<ApiResponse<B, C>>
    getStatus<B = any, C = any> (params: RequestParams.SlmGetStatus, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getStatus<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getStatus<B = any, C = any> (params: RequestParams.SlmGetStatus, callback: callbackFn<B, C>): TransportRequestCallback
    getStatus<B = any, C = any> (params: RequestParams.SlmGetStatus, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_lifecycle<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_lifecycle<T = any, B = any, C = any> (params: RequestParams.SlmPutLifecycle<T>): Promise<ApiResponse<B, C>>
    put_lifecycle<T = any, B = any, C = any> (params: RequestParams.SlmPutLifecycle<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_lifecycle<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_lifecycle<T = any, B = any, C = any> (params: RequestParams.SlmPutLifecycle<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_lifecycle<T = any, B = any, C = any> (params: RequestParams.SlmPutLifecycle<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putLifecycle<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putLifecycle<T = any, B = any, C = any> (params: RequestParams.SlmPutLifecycle<T>): Promise<ApiResponse<B, C>>
    putLifecycle<T = any, B = any, C = any> (params: RequestParams.SlmPutLifecycle<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putLifecycle<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putLifecycle<T = any, B = any, C = any> (params: RequestParams.SlmPutLifecycle<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putLifecycle<T = any, B = any, C = any> (params: RequestParams.SlmPutLifecycle<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    start<B = any, C = any> (): Promise<ApiResponse<B, C>>
    start<B = any, C = any> (params: RequestParams.SlmStart): Promise<ApiResponse<B, C>>
    start<B = any, C = any> (params: RequestParams.SlmStart, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    start<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    start<B = any, C = any> (params: RequestParams.SlmStart, callback: callbackFn<B, C>): TransportRequestCallback
    start<B = any, C = any> (params: RequestParams.SlmStart, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stop<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stop<B = any, C = any> (params: RequestParams.SlmStop): Promise<ApiResponse<B, C>>
    stop<B = any, C = any> (params: RequestParams.SlmStop, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stop<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stop<B = any, C = any> (params: RequestParams.SlmStop, callback: callbackFn<B, C>): TransportRequestCallback
    stop<B = any, C = any> (params: RequestParams.SlmStop, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  snapshot: {
    cleanup_repository<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    cleanup_repository<T = any, B = any, C = any> (params: RequestParams.SnapshotCleanupRepository<T>): Promise<ApiResponse<B, C>>
    cleanup_repository<T = any, B = any, C = any> (params: RequestParams.SnapshotCleanupRepository<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    cleanup_repository<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    cleanup_repository<T = any, B = any, C = any> (params: RequestParams.SnapshotCleanupRepository<T>, callback: callbackFn<B, C>): TransportRequestCallback
    cleanup_repository<T = any, B = any, C = any> (params: RequestParams.SnapshotCleanupRepository<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    cleanupRepository<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    cleanupRepository<T = any, B = any, C = any> (params: RequestParams.SnapshotCleanupRepository<T>): Promise<ApiResponse<B, C>>
    cleanupRepository<T = any, B = any, C = any> (params: RequestParams.SnapshotCleanupRepository<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    cleanupRepository<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    cleanupRepository<T = any, B = any, C = any> (params: RequestParams.SnapshotCleanupRepository<T>, callback: callbackFn<B, C>): TransportRequestCallback
    cleanupRepository<T = any, B = any, C = any> (params: RequestParams.SnapshotCleanupRepository<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    create<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    create<T = any, B = any, C = any> (params: RequestParams.SnapshotCreate<T>): Promise<ApiResponse<B, C>>
    create<T = any, B = any, C = any> (params: RequestParams.SnapshotCreate<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    create<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    create<T = any, B = any, C = any> (params: RequestParams.SnapshotCreate<T>, callback: callbackFn<B, C>): TransportRequestCallback
    create<T = any, B = any, C = any> (params: RequestParams.SnapshotCreate<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    create_repository<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    create_repository<T = any, B = any, C = any> (params: RequestParams.SnapshotCreateRepository<T>): Promise<ApiResponse<B, C>>
    create_repository<T = any, B = any, C = any> (params: RequestParams.SnapshotCreateRepository<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    create_repository<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    create_repository<T = any, B = any, C = any> (params: RequestParams.SnapshotCreateRepository<T>, callback: callbackFn<B, C>): TransportRequestCallback
    create_repository<T = any, B = any, C = any> (params: RequestParams.SnapshotCreateRepository<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    createRepository<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    createRepository<T = any, B = any, C = any> (params: RequestParams.SnapshotCreateRepository<T>): Promise<ApiResponse<B, C>>
    createRepository<T = any, B = any, C = any> (params: RequestParams.SnapshotCreateRepository<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    createRepository<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    createRepository<T = any, B = any, C = any> (params: RequestParams.SnapshotCreateRepository<T>, callback: callbackFn<B, C>): TransportRequestCallback
    createRepository<T = any, B = any, C = any> (params: RequestParams.SnapshotCreateRepository<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete<B = any, C = any> (params: RequestParams.SnapshotDelete): Promise<ApiResponse<B, C>>
    delete<B = any, C = any> (params: RequestParams.SnapshotDelete, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete<B = any, C = any> (params: RequestParams.SnapshotDelete, callback: callbackFn<B, C>): TransportRequestCallback
    delete<B = any, C = any> (params: RequestParams.SnapshotDelete, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_repository<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_repository<B = any, C = any> (params: RequestParams.SnapshotDeleteRepository): Promise<ApiResponse<B, C>>
    delete_repository<B = any, C = any> (params: RequestParams.SnapshotDeleteRepository, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_repository<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_repository<B = any, C = any> (params: RequestParams.SnapshotDeleteRepository, callback: callbackFn<B, C>): TransportRequestCallback
    delete_repository<B = any, C = any> (params: RequestParams.SnapshotDeleteRepository, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteRepository<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteRepository<B = any, C = any> (params: RequestParams.SnapshotDeleteRepository): Promise<ApiResponse<B, C>>
    deleteRepository<B = any, C = any> (params: RequestParams.SnapshotDeleteRepository, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteRepository<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteRepository<B = any, C = any> (params: RequestParams.SnapshotDeleteRepository, callback: callbackFn<B, C>): TransportRequestCallback
    deleteRepository<B = any, C = any> (params: RequestParams.SnapshotDeleteRepository, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (params: RequestParams.SnapshotGet): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (params: RequestParams.SnapshotGet, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (params: RequestParams.SnapshotGet, callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (params: RequestParams.SnapshotGet, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_repository<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_repository<B = any, C = any> (params: RequestParams.SnapshotGetRepository): Promise<ApiResponse<B, C>>
    get_repository<B = any, C = any> (params: RequestParams.SnapshotGetRepository, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_repository<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_repository<B = any, C = any> (params: RequestParams.SnapshotGetRepository, callback: callbackFn<B, C>): TransportRequestCallback
    get_repository<B = any, C = any> (params: RequestParams.SnapshotGetRepository, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getRepository<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getRepository<B = any, C = any> (params: RequestParams.SnapshotGetRepository): Promise<ApiResponse<B, C>>
    getRepository<B = any, C = any> (params: RequestParams.SnapshotGetRepository, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getRepository<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getRepository<B = any, C = any> (params: RequestParams.SnapshotGetRepository, callback: callbackFn<B, C>): TransportRequestCallback
    getRepository<B = any, C = any> (params: RequestParams.SnapshotGetRepository, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    restore<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    restore<T = any, B = any, C = any> (params: RequestParams.SnapshotRestore<T>): Promise<ApiResponse<B, C>>
    restore<T = any, B = any, C = any> (params: RequestParams.SnapshotRestore<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    restore<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    restore<T = any, B = any, C = any> (params: RequestParams.SnapshotRestore<T>, callback: callbackFn<B, C>): TransportRequestCallback
    restore<T = any, B = any, C = any> (params: RequestParams.SnapshotRestore<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    status<B = any, C = any> (): Promise<ApiResponse<B, C>>
    status<B = any, C = any> (params: RequestParams.SnapshotStatus): Promise<ApiResponse<B, C>>
    status<B = any, C = any> (params: RequestParams.SnapshotStatus, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    status<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    status<B = any, C = any> (params: RequestParams.SnapshotStatus, callback: callbackFn<B, C>): TransportRequestCallback
    status<B = any, C = any> (params: RequestParams.SnapshotStatus, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    verify_repository<B = any, C = any> (): Promise<ApiResponse<B, C>>
    verify_repository<B = any, C = any> (params: RequestParams.SnapshotVerifyRepository): Promise<ApiResponse<B, C>>
    verify_repository<B = any, C = any> (params: RequestParams.SnapshotVerifyRepository, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    verify_repository<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    verify_repository<B = any, C = any> (params: RequestParams.SnapshotVerifyRepository, callback: callbackFn<B, C>): TransportRequestCallback
    verify_repository<B = any, C = any> (params: RequestParams.SnapshotVerifyRepository, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    verifyRepository<B = any, C = any> (): Promise<ApiResponse<B, C>>
    verifyRepository<B = any, C = any> (params: RequestParams.SnapshotVerifyRepository): Promise<ApiResponse<B, C>>
    verifyRepository<B = any, C = any> (params: RequestParams.SnapshotVerifyRepository, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    verifyRepository<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    verifyRepository<B = any, C = any> (params: RequestParams.SnapshotVerifyRepository, callback: callbackFn<B, C>): TransportRequestCallback
    verifyRepository<B = any, C = any> (params: RequestParams.SnapshotVerifyRepository, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  sql: {
    clear_cursor<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    clear_cursor<T = any, B = any, C = any> (params: RequestParams.SqlClearCursor<T>): Promise<ApiResponse<B, C>>
    clear_cursor<T = any, B = any, C = any> (params: RequestParams.SqlClearCursor<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    clear_cursor<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    clear_cursor<T = any, B = any, C = any> (params: RequestParams.SqlClearCursor<T>, callback: callbackFn<B, C>): TransportRequestCallback
    clear_cursor<T = any, B = any, C = any> (params: RequestParams.SqlClearCursor<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    clearCursor<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    clearCursor<T = any, B = any, C = any> (params: RequestParams.SqlClearCursor<T>): Promise<ApiResponse<B, C>>
    clearCursor<T = any, B = any, C = any> (params: RequestParams.SqlClearCursor<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    clearCursor<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    clearCursor<T = any, B = any, C = any> (params: RequestParams.SqlClearCursor<T>, callback: callbackFn<B, C>): TransportRequestCallback
    clearCursor<T = any, B = any, C = any> (params: RequestParams.SqlClearCursor<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    query<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    query<T = any, B = any, C = any> (params: RequestParams.SqlQuery<T>): Promise<ApiResponse<B, C>>
    query<T = any, B = any, C = any> (params: RequestParams.SqlQuery<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    query<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    query<T = any, B = any, C = any> (params: RequestParams.SqlQuery<T>, callback: callbackFn<B, C>): TransportRequestCallback
    query<T = any, B = any, C = any> (params: RequestParams.SqlQuery<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    translate<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    translate<T = any, B = any, C = any> (params: RequestParams.SqlTranslate<T>): Promise<ApiResponse<B, C>>
    translate<T = any, B = any, C = any> (params: RequestParams.SqlTranslate<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    translate<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    translate<T = any, B = any, C = any> (params: RequestParams.SqlTranslate<T>, callback: callbackFn<B, C>): TransportRequestCallback
    translate<T = any, B = any, C = any> (params: RequestParams.SqlTranslate<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  ssl: {
    certificates<B = any, C = any> (): Promise<ApiResponse<B, C>>
    certificates<B = any, C = any> (params: RequestParams.SslCertificates): Promise<ApiResponse<B, C>>
    certificates<B = any, C = any> (params: RequestParams.SslCertificates, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    certificates<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    certificates<B = any, C = any> (params: RequestParams.SslCertificates, callback: callbackFn<B, C>): TransportRequestCallback
    certificates<B = any, C = any> (params: RequestParams.SslCertificates, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  tasks: {
    cancel<B = any, C = any> (): Promise<ApiResponse<B, C>>
    cancel<B = any, C = any> (params: RequestParams.TasksCancel): Promise<ApiResponse<B, C>>
    cancel<B = any, C = any> (params: RequestParams.TasksCancel, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    cancel<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    cancel<B = any, C = any> (params: RequestParams.TasksCancel, callback: callbackFn<B, C>): TransportRequestCallback
    cancel<B = any, C = any> (params: RequestParams.TasksCancel, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (params: RequestParams.TasksGet): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (params: RequestParams.TasksGet, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (params: RequestParams.TasksGet, callback: callbackFn<B, C>): TransportRequestCallback
    get<B = any, C = any> (params: RequestParams.TasksGet, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    list<B = any, C = any> (): Promise<ApiResponse<B, C>>
    list<B = any, C = any> (params: RequestParams.TasksList): Promise<ApiResponse<B, C>>
    list<B = any, C = any> (params: RequestParams.TasksList, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    list<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    list<B = any, C = any> (params: RequestParams.TasksList, callback: callbackFn<B, C>): TransportRequestCallback
    list<B = any, C = any> (params: RequestParams.TasksList, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  termvectors<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  termvectors<T = any, B = any, C = any> (params: RequestParams.Termvectors<T>): Promise<ApiResponse<B, C>>
  termvectors<T = any, B = any, C = any> (params: RequestParams.Termvectors<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  termvectors<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  termvectors<T = any, B = any, C = any> (params: RequestParams.Termvectors<T>, callback: callbackFn<B, C>): TransportRequestCallback
  termvectors<T = any, B = any, C = any> (params: RequestParams.Termvectors<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  transform: {
    delete_transform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_transform<B = any, C = any> (params: RequestParams.TransformDeleteTransform): Promise<ApiResponse<B, C>>
    delete_transform<B = any, C = any> (params: RequestParams.TransformDeleteTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_transform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_transform<B = any, C = any> (params: RequestParams.TransformDeleteTransform, callback: callbackFn<B, C>): TransportRequestCallback
    delete_transform<B = any, C = any> (params: RequestParams.TransformDeleteTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteTransform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteTransform<B = any, C = any> (params: RequestParams.TransformDeleteTransform): Promise<ApiResponse<B, C>>
    deleteTransform<B = any, C = any> (params: RequestParams.TransformDeleteTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteTransform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteTransform<B = any, C = any> (params: RequestParams.TransformDeleteTransform, callback: callbackFn<B, C>): TransportRequestCallback
    deleteTransform<B = any, C = any> (params: RequestParams.TransformDeleteTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_transform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_transform<B = any, C = any> (params: RequestParams.TransformGetTransform): Promise<ApiResponse<B, C>>
    get_transform<B = any, C = any> (params: RequestParams.TransformGetTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_transform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_transform<B = any, C = any> (params: RequestParams.TransformGetTransform, callback: callbackFn<B, C>): TransportRequestCallback
    get_transform<B = any, C = any> (params: RequestParams.TransformGetTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getTransform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getTransform<B = any, C = any> (params: RequestParams.TransformGetTransform): Promise<ApiResponse<B, C>>
    getTransform<B = any, C = any> (params: RequestParams.TransformGetTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getTransform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getTransform<B = any, C = any> (params: RequestParams.TransformGetTransform, callback: callbackFn<B, C>): TransportRequestCallback
    getTransform<B = any, C = any> (params: RequestParams.TransformGetTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_transform_stats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_transform_stats<B = any, C = any> (params: RequestParams.TransformGetTransformStats): Promise<ApiResponse<B, C>>
    get_transform_stats<B = any, C = any> (params: RequestParams.TransformGetTransformStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_transform_stats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_transform_stats<B = any, C = any> (params: RequestParams.TransformGetTransformStats, callback: callbackFn<B, C>): TransportRequestCallback
    get_transform_stats<B = any, C = any> (params: RequestParams.TransformGetTransformStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getTransformStats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getTransformStats<B = any, C = any> (params: RequestParams.TransformGetTransformStats): Promise<ApiResponse<B, C>>
    getTransformStats<B = any, C = any> (params: RequestParams.TransformGetTransformStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getTransformStats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getTransformStats<B = any, C = any> (params: RequestParams.TransformGetTransformStats, callback: callbackFn<B, C>): TransportRequestCallback
    getTransformStats<B = any, C = any> (params: RequestParams.TransformGetTransformStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    preview_transform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    preview_transform<T = any, B = any, C = any> (params: RequestParams.TransformPreviewTransform<T>): Promise<ApiResponse<B, C>>
    preview_transform<T = any, B = any, C = any> (params: RequestParams.TransformPreviewTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    preview_transform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    preview_transform<T = any, B = any, C = any> (params: RequestParams.TransformPreviewTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    preview_transform<T = any, B = any, C = any> (params: RequestParams.TransformPreviewTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    previewTransform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    previewTransform<T = any, B = any, C = any> (params: RequestParams.TransformPreviewTransform<T>): Promise<ApiResponse<B, C>>
    previewTransform<T = any, B = any, C = any> (params: RequestParams.TransformPreviewTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    previewTransform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    previewTransform<T = any, B = any, C = any> (params: RequestParams.TransformPreviewTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    previewTransform<T = any, B = any, C = any> (params: RequestParams.TransformPreviewTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_transform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_transform<T = any, B = any, C = any> (params: RequestParams.TransformPutTransform<T>): Promise<ApiResponse<B, C>>
    put_transform<T = any, B = any, C = any> (params: RequestParams.TransformPutTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_transform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_transform<T = any, B = any, C = any> (params: RequestParams.TransformPutTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_transform<T = any, B = any, C = any> (params: RequestParams.TransformPutTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putTransform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putTransform<T = any, B = any, C = any> (params: RequestParams.TransformPutTransform<T>): Promise<ApiResponse<B, C>>
    putTransform<T = any, B = any, C = any> (params: RequestParams.TransformPutTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putTransform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putTransform<T = any, B = any, C = any> (params: RequestParams.TransformPutTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putTransform<T = any, B = any, C = any> (params: RequestParams.TransformPutTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    start_transform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    start_transform<B = any, C = any> (params: RequestParams.TransformStartTransform): Promise<ApiResponse<B, C>>
    start_transform<B = any, C = any> (params: RequestParams.TransformStartTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    start_transform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    start_transform<B = any, C = any> (params: RequestParams.TransformStartTransform, callback: callbackFn<B, C>): TransportRequestCallback
    start_transform<B = any, C = any> (params: RequestParams.TransformStartTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    startTransform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    startTransform<B = any, C = any> (params: RequestParams.TransformStartTransform): Promise<ApiResponse<B, C>>
    startTransform<B = any, C = any> (params: RequestParams.TransformStartTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    startTransform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    startTransform<B = any, C = any> (params: RequestParams.TransformStartTransform, callback: callbackFn<B, C>): TransportRequestCallback
    startTransform<B = any, C = any> (params: RequestParams.TransformStartTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stop_transform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stop_transform<B = any, C = any> (params: RequestParams.TransformStopTransform): Promise<ApiResponse<B, C>>
    stop_transform<B = any, C = any> (params: RequestParams.TransformStopTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stop_transform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stop_transform<B = any, C = any> (params: RequestParams.TransformStopTransform, callback: callbackFn<B, C>): TransportRequestCallback
    stop_transform<B = any, C = any> (params: RequestParams.TransformStopTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stopTransform<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stopTransform<B = any, C = any> (params: RequestParams.TransformStopTransform): Promise<ApiResponse<B, C>>
    stopTransform<B = any, C = any> (params: RequestParams.TransformStopTransform, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stopTransform<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stopTransform<B = any, C = any> (params: RequestParams.TransformStopTransform, callback: callbackFn<B, C>): TransportRequestCallback
    stopTransform<B = any, C = any> (params: RequestParams.TransformStopTransform, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    update_transform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    update_transform<T = any, B = any, C = any> (params: RequestParams.TransformUpdateTransform<T>): Promise<ApiResponse<B, C>>
    update_transform<T = any, B = any, C = any> (params: RequestParams.TransformUpdateTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    update_transform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    update_transform<T = any, B = any, C = any> (params: RequestParams.TransformUpdateTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    update_transform<T = any, B = any, C = any> (params: RequestParams.TransformUpdateTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    updateTransform<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    updateTransform<T = any, B = any, C = any> (params: RequestParams.TransformUpdateTransform<T>): Promise<ApiResponse<B, C>>
    updateTransform<T = any, B = any, C = any> (params: RequestParams.TransformUpdateTransform<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    updateTransform<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    updateTransform<T = any, B = any, C = any> (params: RequestParams.TransformUpdateTransform<T>, callback: callbackFn<B, C>): TransportRequestCallback
    updateTransform<T = any, B = any, C = any> (params: RequestParams.TransformUpdateTransform<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  update<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  update<T = any, B = any, C = any> (params: RequestParams.Update<T>): Promise<ApiResponse<B, C>>
  update<T = any, B = any, C = any> (params: RequestParams.Update<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  update<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  update<T = any, B = any, C = any> (params: RequestParams.Update<T>, callback: callbackFn<B, C>): TransportRequestCallback
  update<T = any, B = any, C = any> (params: RequestParams.Update<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  update_by_query<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  update_by_query<T = any, B = any, C = any> (params: RequestParams.UpdateByQuery<T>): Promise<ApiResponse<B, C>>
  update_by_query<T = any, B = any, C = any> (params: RequestParams.UpdateByQuery<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  update_by_query<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  update_by_query<T = any, B = any, C = any> (params: RequestParams.UpdateByQuery<T>, callback: callbackFn<B, C>): TransportRequestCallback
  update_by_query<T = any, B = any, C = any> (params: RequestParams.UpdateByQuery<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  updateByQuery<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
  updateByQuery<T = any, B = any, C = any> (params: RequestParams.UpdateByQuery<T>): Promise<ApiResponse<B, C>>
  updateByQuery<T = any, B = any, C = any> (params: RequestParams.UpdateByQuery<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  updateByQuery<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  updateByQuery<T = any, B = any, C = any> (params: RequestParams.UpdateByQuery<T>, callback: callbackFn<B, C>): TransportRequestCallback
  updateByQuery<T = any, B = any, C = any> (params: RequestParams.UpdateByQuery<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  update_by_query_rethrottle<B = any, C = any> (): Promise<ApiResponse<B, C>>
  update_by_query_rethrottle<B = any, C = any> (params: RequestParams.UpdateByQueryRethrottle): Promise<ApiResponse<B, C>>
  update_by_query_rethrottle<B = any, C = any> (params: RequestParams.UpdateByQueryRethrottle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  update_by_query_rethrottle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  update_by_query_rethrottle<B = any, C = any> (params: RequestParams.UpdateByQueryRethrottle, callback: callbackFn<B, C>): TransportRequestCallback
  update_by_query_rethrottle<B = any, C = any> (params: RequestParams.UpdateByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  updateByQueryRethrottle<B = any, C = any> (): Promise<ApiResponse<B, C>>
  updateByQueryRethrottle<B = any, C = any> (params: RequestParams.UpdateByQueryRethrottle): Promise<ApiResponse<B, C>>
  updateByQueryRethrottle<B = any, C = any> (params: RequestParams.UpdateByQueryRethrottle, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
  updateByQueryRethrottle<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
  updateByQueryRethrottle<B = any, C = any> (params: RequestParams.UpdateByQueryRethrottle, callback: callbackFn<B, C>): TransportRequestCallback
  updateByQueryRethrottle<B = any, C = any> (params: RequestParams.UpdateByQueryRethrottle, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  watcher: {
    ack_watch<B = any, C = any> (): Promise<ApiResponse<B, C>>
    ack_watch<B = any, C = any> (params: RequestParams.WatcherAckWatch): Promise<ApiResponse<B, C>>
    ack_watch<B = any, C = any> (params: RequestParams.WatcherAckWatch, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    ack_watch<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    ack_watch<B = any, C = any> (params: RequestParams.WatcherAckWatch, callback: callbackFn<B, C>): TransportRequestCallback
    ack_watch<B = any, C = any> (params: RequestParams.WatcherAckWatch, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    ackWatch<B = any, C = any> (): Promise<ApiResponse<B, C>>
    ackWatch<B = any, C = any> (params: RequestParams.WatcherAckWatch): Promise<ApiResponse<B, C>>
    ackWatch<B = any, C = any> (params: RequestParams.WatcherAckWatch, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    ackWatch<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    ackWatch<B = any, C = any> (params: RequestParams.WatcherAckWatch, callback: callbackFn<B, C>): TransportRequestCallback
    ackWatch<B = any, C = any> (params: RequestParams.WatcherAckWatch, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    activate_watch<B = any, C = any> (): Promise<ApiResponse<B, C>>
    activate_watch<B = any, C = any> (params: RequestParams.WatcherActivateWatch): Promise<ApiResponse<B, C>>
    activate_watch<B = any, C = any> (params: RequestParams.WatcherActivateWatch, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    activate_watch<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    activate_watch<B = any, C = any> (params: RequestParams.WatcherActivateWatch, callback: callbackFn<B, C>): TransportRequestCallback
    activate_watch<B = any, C = any> (params: RequestParams.WatcherActivateWatch, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    activateWatch<B = any, C = any> (): Promise<ApiResponse<B, C>>
    activateWatch<B = any, C = any> (params: RequestParams.WatcherActivateWatch): Promise<ApiResponse<B, C>>
    activateWatch<B = any, C = any> (params: RequestParams.WatcherActivateWatch, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    activateWatch<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    activateWatch<B = any, C = any> (params: RequestParams.WatcherActivateWatch, callback: callbackFn<B, C>): TransportRequestCallback
    activateWatch<B = any, C = any> (params: RequestParams.WatcherActivateWatch, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deactivate_watch<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deactivate_watch<B = any, C = any> (params: RequestParams.WatcherDeactivateWatch): Promise<ApiResponse<B, C>>
    deactivate_watch<B = any, C = any> (params: RequestParams.WatcherDeactivateWatch, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deactivate_watch<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deactivate_watch<B = any, C = any> (params: RequestParams.WatcherDeactivateWatch, callback: callbackFn<B, C>): TransportRequestCallback
    deactivate_watch<B = any, C = any> (params: RequestParams.WatcherDeactivateWatch, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deactivateWatch<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deactivateWatch<B = any, C = any> (params: RequestParams.WatcherDeactivateWatch): Promise<ApiResponse<B, C>>
    deactivateWatch<B = any, C = any> (params: RequestParams.WatcherDeactivateWatch, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deactivateWatch<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deactivateWatch<B = any, C = any> (params: RequestParams.WatcherDeactivateWatch, callback: callbackFn<B, C>): TransportRequestCallback
    deactivateWatch<B = any, C = any> (params: RequestParams.WatcherDeactivateWatch, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    delete_watch<B = any, C = any> (): Promise<ApiResponse<B, C>>
    delete_watch<B = any, C = any> (params: RequestParams.WatcherDeleteWatch): Promise<ApiResponse<B, C>>
    delete_watch<B = any, C = any> (params: RequestParams.WatcherDeleteWatch, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    delete_watch<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    delete_watch<B = any, C = any> (params: RequestParams.WatcherDeleteWatch, callback: callbackFn<B, C>): TransportRequestCallback
    delete_watch<B = any, C = any> (params: RequestParams.WatcherDeleteWatch, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    deleteWatch<B = any, C = any> (): Promise<ApiResponse<B, C>>
    deleteWatch<B = any, C = any> (params: RequestParams.WatcherDeleteWatch): Promise<ApiResponse<B, C>>
    deleteWatch<B = any, C = any> (params: RequestParams.WatcherDeleteWatch, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    deleteWatch<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    deleteWatch<B = any, C = any> (params: RequestParams.WatcherDeleteWatch, callback: callbackFn<B, C>): TransportRequestCallback
    deleteWatch<B = any, C = any> (params: RequestParams.WatcherDeleteWatch, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    execute_watch<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    execute_watch<T = any, B = any, C = any> (params: RequestParams.WatcherExecuteWatch<T>): Promise<ApiResponse<B, C>>
    execute_watch<T = any, B = any, C = any> (params: RequestParams.WatcherExecuteWatch<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    execute_watch<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    execute_watch<T = any, B = any, C = any> (params: RequestParams.WatcherExecuteWatch<T>, callback: callbackFn<B, C>): TransportRequestCallback
    execute_watch<T = any, B = any, C = any> (params: RequestParams.WatcherExecuteWatch<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    executeWatch<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    executeWatch<T = any, B = any, C = any> (params: RequestParams.WatcherExecuteWatch<T>): Promise<ApiResponse<B, C>>
    executeWatch<T = any, B = any, C = any> (params: RequestParams.WatcherExecuteWatch<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    executeWatch<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    executeWatch<T = any, B = any, C = any> (params: RequestParams.WatcherExecuteWatch<T>, callback: callbackFn<B, C>): TransportRequestCallback
    executeWatch<T = any, B = any, C = any> (params: RequestParams.WatcherExecuteWatch<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    get_watch<B = any, C = any> (): Promise<ApiResponse<B, C>>
    get_watch<B = any, C = any> (params: RequestParams.WatcherGetWatch): Promise<ApiResponse<B, C>>
    get_watch<B = any, C = any> (params: RequestParams.WatcherGetWatch, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    get_watch<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    get_watch<B = any, C = any> (params: RequestParams.WatcherGetWatch, callback: callbackFn<B, C>): TransportRequestCallback
    get_watch<B = any, C = any> (params: RequestParams.WatcherGetWatch, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    getWatch<B = any, C = any> (): Promise<ApiResponse<B, C>>
    getWatch<B = any, C = any> (params: RequestParams.WatcherGetWatch): Promise<ApiResponse<B, C>>
    getWatch<B = any, C = any> (params: RequestParams.WatcherGetWatch, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    getWatch<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    getWatch<B = any, C = any> (params: RequestParams.WatcherGetWatch, callback: callbackFn<B, C>): TransportRequestCallback
    getWatch<B = any, C = any> (params: RequestParams.WatcherGetWatch, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    put_watch<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    put_watch<T = any, B = any, C = any> (params: RequestParams.WatcherPutWatch<T>): Promise<ApiResponse<B, C>>
    put_watch<T = any, B = any, C = any> (params: RequestParams.WatcherPutWatch<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    put_watch<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    put_watch<T = any, B = any, C = any> (params: RequestParams.WatcherPutWatch<T>, callback: callbackFn<B, C>): TransportRequestCallback
    put_watch<T = any, B = any, C = any> (params: RequestParams.WatcherPutWatch<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    putWatch<T = any, B = any, C = any> (): Promise<ApiResponse<B, C>>
    putWatch<T = any, B = any, C = any> (params: RequestParams.WatcherPutWatch<T>): Promise<ApiResponse<B, C>>
    putWatch<T = any, B = any, C = any> (params: RequestParams.WatcherPutWatch<T>, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    putWatch<T = any, B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    putWatch<T = any, B = any, C = any> (params: RequestParams.WatcherPutWatch<T>, callback: callbackFn<B, C>): TransportRequestCallback
    putWatch<T = any, B = any, C = any> (params: RequestParams.WatcherPutWatch<T>, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    start<B = any, C = any> (): Promise<ApiResponse<B, C>>
    start<B = any, C = any> (params: RequestParams.WatcherStart): Promise<ApiResponse<B, C>>
    start<B = any, C = any> (params: RequestParams.WatcherStart, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    start<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    start<B = any, C = any> (params: RequestParams.WatcherStart, callback: callbackFn<B, C>): TransportRequestCallback
    start<B = any, C = any> (params: RequestParams.WatcherStart, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (params: RequestParams.WatcherStats): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (params: RequestParams.WatcherStats, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stats<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (params: RequestParams.WatcherStats, callback: callbackFn<B, C>): TransportRequestCallback
    stats<B = any, C = any> (params: RequestParams.WatcherStats, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    stop<B = any, C = any> (): Promise<ApiResponse<B, C>>
    stop<B = any, C = any> (params: RequestParams.WatcherStop): Promise<ApiResponse<B, C>>
    stop<B = any, C = any> (params: RequestParams.WatcherStop, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    stop<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    stop<B = any, C = any> (params: RequestParams.WatcherStop, callback: callbackFn<B, C>): TransportRequestCallback
    stop<B = any, C = any> (params: RequestParams.WatcherStop, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
  }
  xpack: {
    info<B = any, C = any> (): Promise<ApiResponse<B, C>>
    info<B = any, C = any> (params: RequestParams.XpackInfo): Promise<ApiResponse<B, C>>
    info<B = any, C = any> (params: RequestParams.XpackInfo, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    info<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    info<B = any, C = any> (params: RequestParams.XpackInfo, callback: callbackFn<B, C>): TransportRequestCallback
    info<B = any, C = any> (params: RequestParams.XpackInfo, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
    usage<B = any, C = any> (): Promise<ApiResponse<B, C>>
    usage<B = any, C = any> (params: RequestParams.XpackUsage): Promise<ApiResponse<B, C>>
    usage<B = any, C = any> (params: RequestParams.XpackUsage, options: TransportRequestOptions): Promise<ApiResponse<B, C>>
    usage<B = any, C = any> (callback: callbackFn<B, C>): TransportRequestCallback
    usage<B = any, C = any> (params: RequestParams.XpackUsage, callback: callbackFn<B, C>): TransportRequestCallback
    usage<B = any, C = any> (params: RequestParams.XpackUsage, options: TransportRequestOptions, callback: callbackFn<B, C>): TransportRequestCallback
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
