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
import * as Req from './api/RequestTypes';
import * as Res from './api/ResponseTypes';
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
    delete<TResponse = Record<string, any>, TContext = unknown>(params?: Req.AsyncSearchDeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: Req.AsyncSearchDeleteRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: Req.AsyncSearchDeleteRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params?: Req.AsyncSearchGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: Req.AsyncSearchGetRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: Req.AsyncSearchGetRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.AsyncSearchSubmitRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.AsyncSearchSubmitRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.AsyncSearchSubmitRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  asyncSearch: {
    delete<TResponse = Record<string, any>, TContext = unknown>(params?: Req.AsyncSearchDeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: Req.AsyncSearchDeleteRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: Req.AsyncSearchDeleteRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params?: Req.AsyncSearchGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: Req.AsyncSearchGetRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: Req.AsyncSearchGetRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.AsyncSearchSubmitRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.AsyncSearchSubmitRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    submit<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.AsyncSearchSubmitRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  autoscaling: {
    delete_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(params?: Req.AutoscalingDeleteAutoscalingPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(params: Req.AutoscalingDeleteAutoscalingPolicyRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(params: Req.AutoscalingDeleteAutoscalingPolicyRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(params?: Req.AutoscalingDeleteAutoscalingPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(params: Req.AutoscalingDeleteAutoscalingPolicyRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(params: Req.AutoscalingDeleteAutoscalingPolicyRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_decision<TResponse = Record<string, any>, TContext = unknown>(params?: Req.AutoscalingGetAutoscalingDecisionRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_autoscaling_decision<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_decision<TResponse = Record<string, any>, TContext = unknown>(params: Req.AutoscalingGetAutoscalingDecisionRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_decision<TResponse = Record<string, any>, TContext = unknown>(params: Req.AutoscalingGetAutoscalingDecisionRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingDecision<TResponse = Record<string, any>, TContext = unknown>(params?: Req.AutoscalingGetAutoscalingDecisionRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAutoscalingDecision<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingDecision<TResponse = Record<string, any>, TContext = unknown>(params: Req.AutoscalingGetAutoscalingDecisionRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingDecision<TResponse = Record<string, any>, TContext = unknown>(params: Req.AutoscalingGetAutoscalingDecisionRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(params?: Req.AutoscalingGetAutoscalingPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(params: Req.AutoscalingGetAutoscalingPolicyRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_autoscaling_policy<TResponse = Record<string, any>, TContext = unknown>(params: Req.AutoscalingGetAutoscalingPolicyRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(params?: Req.AutoscalingGetAutoscalingPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(params: Req.AutoscalingGetAutoscalingPolicyRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoscalingPolicy<TResponse = Record<string, any>, TContext = unknown>(params: Req.AutoscalingGetAutoscalingPolicyRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_autoscaling_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.AutoscalingPutAutoscalingPolicyRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_autoscaling_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_autoscaling_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.AutoscalingPutAutoscalingPolicyRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_autoscaling_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.AutoscalingPutAutoscalingPolicyRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoscalingPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.AutoscalingPutAutoscalingPolicyRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putAutoscalingPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoscalingPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.AutoscalingPutAutoscalingPolicyRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoscalingPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.AutoscalingPutAutoscalingPolicyRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  bulk<TResponse = Res.BulkResponse, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params?: Req.BulkRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  bulk<TResponse = Res.BulkResponse, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  bulk<TResponse = Res.BulkResponse, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: Req.BulkRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  bulk<TResponse = Res.BulkResponse, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: Req.BulkRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  cat: {
    aliases<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatAliasesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    aliases<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    aliases<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatAliasesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    aliases<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatAliasesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatAllocationRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    allocation<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatAllocationRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatAllocationRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    count<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatCountRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    count<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    count<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatCountRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    count<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatCountRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    fielddata<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatFielddataRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    fielddata<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    fielddata<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatFielddataRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    fielddata<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatFielddataRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatHealthRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    health<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatHealthRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatHealthRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    help<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatHelpRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    help<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    help<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatHelpRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    help<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatHelpRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    indices<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatIndicesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    indices<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    indices<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatIndicesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    indices<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatIndicesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    master<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatMasterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    master<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    master<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMasterRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    master<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMasterRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatMlDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ml_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlDataFrameAnalyticsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatMlDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlDataFrameAnalyticsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_datafeeds<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatMlDatafeedsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ml_datafeeds<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_datafeeds<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlDatafeedsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_datafeeds<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlDatafeedsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatMlDatafeedsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlDatafeeds<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlDatafeedsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlDatafeeds<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlDatafeedsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_jobs<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatMlJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ml_jobs<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_jobs<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlJobsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_jobs<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlJobsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlJobs<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatMlJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlJobs<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlJobs<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlJobsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlJobs<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlJobsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_trained_models<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatMlTrainedModelsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ml_trained_models<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_trained_models<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlTrainedModelsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ml_trained_models<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlTrainedModelsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatMlTrainedModelsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mlTrainedModels<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlTrainedModelsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mlTrainedModels<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatMlTrainedModelsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodeattrs<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatNodeattrsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    nodeattrs<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodeattrs<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatNodeattrsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodeattrs<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatNodeattrsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodes<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatNodesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    nodes<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodes<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatNodesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    nodes<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatNodesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatPendingTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatPendingTasksRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatPendingTasksRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatPendingTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatPendingTasksRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatPendingTasksRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    plugins<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatPluginsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    plugins<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    plugins<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatPluginsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    plugins<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatPluginsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatRecoveryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    recovery<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatRecoveryRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatRecoveryRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositories<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatRepositoriesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    repositories<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositories<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatRepositoriesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    repositories<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatRepositoriesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatSegmentsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    segments<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatSegmentsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatSegmentsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shards<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatShardsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    shards<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shards<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatShardsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shards<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatShardsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    snapshots<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatSnapshotsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    snapshots<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    snapshots<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatSnapshotsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    snapshots<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatSnapshotsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    tasks<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    tasks<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    tasks<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatTasksRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    tasks<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatTasksRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    templates<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatTemplatesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    templates<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    templates<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatTemplatesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    templates<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatTemplatesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    thread_pool<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatThreadPoolRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    thread_pool<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    thread_pool<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatThreadPoolRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    thread_pool<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatThreadPoolRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    threadPool<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatThreadPoolRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    threadPool<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    threadPool<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatThreadPoolRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    threadPool<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatThreadPoolRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    transforms<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CatTransformsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    transforms<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    transforms<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatTransformsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    transforms<TResponse = Record<string, any>, TContext = unknown>(params: Req.CatTransformsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ccr: {
    delete_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrDeleteAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrDeleteAutoFollowPatternRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrDeleteAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrDeleteAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrDeleteAutoFollowPatternRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrDeleteAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.CcrFollowRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CcrFollowRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CcrFollowRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_info<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrFollowInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    follow_info<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_info<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrFollowInfoRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_info<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrFollowInfoRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followInfo<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrFollowInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    followInfo<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followInfo<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrFollowInfoRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followInfo<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrFollowInfoRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrFollowStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    follow_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrFollowStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    follow_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrFollowStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followStats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrFollowStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    followStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrFollowStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    followStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrFollowStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forget_follower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.CcrForgetFollowerRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    forget_follower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forget_follower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CcrForgetFollowerRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forget_follower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CcrForgetFollowerRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forgetFollower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.CcrForgetFollowerRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    forgetFollower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forgetFollower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CcrForgetFollowerRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forgetFollower<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CcrForgetFollowerRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrGetAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrGetAutoFollowPatternRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrGetAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrGetAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrGetAutoFollowPatternRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrGetAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrPauseAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pause_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrPauseAutoFollowPatternRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrPauseAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrPauseAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pauseAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrPauseAutoFollowPatternRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrPauseAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_follow<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrPauseFollowRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pause_follow<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_follow<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrPauseFollowRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pause_follow<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrPauseFollowRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseFollow<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrPauseFollowRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pauseFollow<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseFollow<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrPauseFollowRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pauseFollow<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrPauseFollowRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_auto_follow_pattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.CcrPutAutoFollowPatternRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_auto_follow_pattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_auto_follow_pattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CcrPutAutoFollowPatternRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_auto_follow_pattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CcrPutAutoFollowPatternRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.CcrPutAutoFollowPatternRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putAutoFollowPattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CcrPutAutoFollowPatternRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAutoFollowPattern<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CcrPutAutoFollowPatternRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrResumeAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resume_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrResumeAutoFollowPatternRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_auto_follow_pattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrResumeAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrResumeAutoFollowPatternRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resumeAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrResumeAutoFollowPatternRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeAutoFollowPattern<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrResumeAutoFollowPatternRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.CcrResumeFollowRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resume_follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CcrResumeFollowRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resume_follow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CcrResumeFollowRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeFollow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.CcrResumeFollowRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    resumeFollow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeFollow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CcrResumeFollowRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    resumeFollow<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CcrResumeFollowRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfollow<TResponse = Record<string, any>, TContext = unknown>(params?: Req.CcrUnfollowRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    unfollow<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfollow<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrUnfollowRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfollow<TResponse = Record<string, any>, TContext = unknown>(params: Req.CcrUnfollowRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  clear_scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.ClearScrollRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  clear_scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clear_scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClearScrollRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clear_scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClearScrollRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clearScroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.ClearScrollRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  clearScroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clearScroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClearScrollRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  clearScroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClearScrollRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  cluster: {
    allocation_explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.ClusterAllocationExplainRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    allocation_explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation_explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClusterAllocationExplainRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocation_explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClusterAllocationExplainRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocationExplain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.ClusterAllocationExplainRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    allocationExplain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocationExplain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClusterAllocationExplainRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    allocationExplain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClusterAllocationExplainRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_component_template<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ClusterDeleteComponentTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_component_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_component_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterDeleteComponentTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_component_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterDeleteComponentTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ClusterDeleteComponentTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
<<<<<<< HEAD
    deleteComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterDeleteComponentTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterDeleteComponentTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_component_template<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ClusterExistsComponentTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists_component_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_component_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterExistsComponentTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_component_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterExistsComponentTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ClusterExistsComponentTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterExistsComponentTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterExistsComponentTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_component_template<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ClusterGetComponentTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
=======
    deleteComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterDeleteComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_component_template<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterExistsComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists_component_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_component_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterExistsComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_component_template<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterExistsComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterExistsComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterExistsComponentTemplate, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.ClusterExistsComponentTemplate, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_component_template<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.ClusterGetComponentTemplate, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
>>>>>>> master
    get_component_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_component_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterGetComponentTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_component_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterGetComponentTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ClusterGetComponentTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterGetComponentTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getComponentTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterGetComponentTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ClusterGetSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_settings<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterGetSettingsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterGetSettingsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ClusterGetSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getSettings<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterGetSettingsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterGetSettingsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ClusterHealthRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    health<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterHealthRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    health<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterHealthRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ClusterPendingTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterPendingTasksRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pending_tasks<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterPendingTasksRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ClusterPendingTasksRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterPendingTasksRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    pendingTasks<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterPendingTasksRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_component_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.ClusterPutComponentTemplateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_component_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_component_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClusterPutComponentTemplateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_component_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClusterPutComponentTemplateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putComponentTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.ClusterPutComponentTemplateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putComponentTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putComponentTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClusterPutComponentTemplateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putComponentTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClusterPutComponentTemplateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.ClusterPutSettingsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClusterPutSettingsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClusterPutSettingsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.ClusterPutSettingsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClusterPutSettingsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClusterPutSettingsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remote_info<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ClusterRemoteInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    remote_info<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remote_info<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterRemoteInfoRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remote_info<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterRemoteInfoRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remoteInfo<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ClusterRemoteInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    remoteInfo<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remoteInfo<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterRemoteInfoRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remoteInfo<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterRemoteInfoRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reroute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.ClusterRerouteRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reroute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reroute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClusterRerouteRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reroute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ClusterRerouteRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    state<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ClusterStateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    state<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    state<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterStateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    state<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterStateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ClusterStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.ClusterStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  count<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.CountRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  count<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  count<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CountRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  count<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CountRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  create<TResponse = Res.CreateResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.CreateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  create<TResponse = Res.CreateResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  create<TResponse = Res.CreateResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CreateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  create<TResponse = Res.CreateResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.CreateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  data_frame_transform_deprecated: {
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedDeleteTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedDeleteTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedDeleteTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedDeleteTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedDeleteTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedDeleteTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedGetTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedGetTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedGetTransformStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedGetTransformStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedPreviewTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPreviewTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPreviewTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedPreviewTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPreviewTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPreviewTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedPutTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPutTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPutTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedPutTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPutTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPutTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedStartTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStartTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStartTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedStartTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStartTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStartTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedStopTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStopTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStopTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedStopTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStopTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStopTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedUpdateTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedUpdateTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedUpdateTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedUpdateTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedUpdateTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedUpdateTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  dataFrameTransformDeprecated: {
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedDeleteTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedDeleteTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedDeleteTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedDeleteTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedDeleteTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedDeleteTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedGetTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedGetTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedGetTransformStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedGetTransformStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedGetTransformStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedPreviewTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPreviewTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPreviewTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedPreviewTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPreviewTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPreviewTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedPutTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPutTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPutTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedPutTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPutTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedPutTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedStartTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStartTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStartTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedStartTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStartTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStartTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedStopTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStopTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStopTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedStopTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStopTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedStopTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedUpdateTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedUpdateTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedUpdateTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.DataFrameTransformDeprecatedUpdateTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedUpdateTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DataFrameTransformDeprecatedUpdateTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  delete<TResponse = Res.DeleteResponse, TContext = unknown>(params?: Req.DeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  delete<TResponse = Res.DeleteResponse, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete<TResponse = Res.DeleteResponse, TContext = unknown>(params: Req.DeleteRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete<TResponse = Res.DeleteResponse, TContext = unknown>(params: Req.DeleteRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.DeleteByQueryRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  delete_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DeleteByQueryRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DeleteByQueryRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.DeleteByQueryRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  deleteByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DeleteByQueryRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.DeleteByQueryRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DeleteByQueryRethrottleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  delete_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params: Req.DeleteByQueryRethrottleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params: Req.DeleteByQueryRethrottleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DeleteByQueryRethrottleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  deleteByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(params: Req.DeleteByQueryRethrottleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(params: Req.DeleteByQueryRethrottleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_script<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DeleteScriptRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  delete_script<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_script<TResponse = Record<string, any>, TContext = unknown>(params: Req.DeleteScriptRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  delete_script<TResponse = Record<string, any>, TContext = unknown>(params: Req.DeleteScriptRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteScript<TResponse = Record<string, any>, TContext = unknown>(params?: Req.DeleteScriptRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  deleteScript<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteScript<TResponse = Record<string, any>, TContext = unknown>(params: Req.DeleteScriptRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  deleteScript<TResponse = Record<string, any>, TContext = unknown>(params: Req.DeleteScriptRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  enrich: {
    delete_policy<TResponse = Record<string, any>, TContext = unknown>(params?: Req.EnrichDeletePolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_policy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_policy<TResponse = Record<string, any>, TContext = unknown>(params: Req.EnrichDeletePolicyRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_policy<TResponse = Record<string, any>, TContext = unknown>(params: Req.EnrichDeletePolicyRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePolicy<TResponse = Record<string, any>, TContext = unknown>(params?: Req.EnrichDeletePolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deletePolicy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePolicy<TResponse = Record<string, any>, TContext = unknown>(params: Req.EnrichDeletePolicyRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePolicy<TResponse = Record<string, any>, TContext = unknown>(params: Req.EnrichDeletePolicyRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_policy<TResponse = Record<string, any>, TContext = unknown>(params?: Req.EnrichExecutePolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    execute_policy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_policy<TResponse = Record<string, any>, TContext = unknown>(params: Req.EnrichExecutePolicyRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_policy<TResponse = Record<string, any>, TContext = unknown>(params: Req.EnrichExecutePolicyRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executePolicy<TResponse = Record<string, any>, TContext = unknown>(params?: Req.EnrichExecutePolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executePolicy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executePolicy<TResponse = Record<string, any>, TContext = unknown>(params: Req.EnrichExecutePolicyRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executePolicy<TResponse = Record<string, any>, TContext = unknown>(params: Req.EnrichExecutePolicyRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_policy<TResponse = Record<string, any>, TContext = unknown>(params?: Req.EnrichGetPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_policy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_policy<TResponse = Record<string, any>, TContext = unknown>(params: Req.EnrichGetPolicyRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_policy<TResponse = Record<string, any>, TContext = unknown>(params: Req.EnrichGetPolicyRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPolicy<TResponse = Record<string, any>, TContext = unknown>(params?: Req.EnrichGetPolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getPolicy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPolicy<TResponse = Record<string, any>, TContext = unknown>(params: Req.EnrichGetPolicyRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPolicy<TResponse = Record<string, any>, TContext = unknown>(params: Req.EnrichGetPolicyRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.EnrichPutPolicyRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.EnrichPutPolicyRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_policy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.EnrichPutPolicyRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.EnrichPutPolicyRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.EnrichPutPolicyRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPolicy<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.EnrichPutPolicyRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.EnrichStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.EnrichStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.EnrichStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  eql: {
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.EqlSearchRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.EqlSearchRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.EqlSearchRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  exists<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  exists<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists<TResponse = Record<string, any>, TContext = unknown>(params: Req.ExistsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists<TResponse = Record<string, any>, TContext = unknown>(params: Req.ExistsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists_source<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ExistsSourceRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  exists_source<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists_source<TResponse = Record<string, any>, TContext = unknown>(params: Req.ExistsSourceRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  exists_source<TResponse = Record<string, any>, TContext = unknown>(params: Req.ExistsSourceRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  existsSource<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ExistsSourceRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  existsSource<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  existsSource<TResponse = Record<string, any>, TContext = unknown>(params: Req.ExistsSourceRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  existsSource<TResponse = Record<string, any>, TContext = unknown>(params: Req.ExistsSourceRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.ExplainRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ExplainRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  explain<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ExplainRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  field_caps<TResponse = Record<string, any>, TContext = unknown>(params?: Req.FieldCapsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  field_caps<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  field_caps<TResponse = Record<string, any>, TContext = unknown>(params: Req.FieldCapsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  field_caps<TResponse = Record<string, any>, TContext = unknown>(params: Req.FieldCapsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  fieldCaps<TResponse = Record<string, any>, TContext = unknown>(params?: Req.FieldCapsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  fieldCaps<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  fieldCaps<TResponse = Record<string, any>, TContext = unknown>(params: Req.FieldCapsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  fieldCaps<TResponse = Record<string, any>, TContext = unknown>(params: Req.FieldCapsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get<TResponse = Res.GetResponse, TContext = unknown>(params?: Req.GetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get<TResponse = Res.GetResponse, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get<TResponse = Res.GetResponse, TContext = unknown>(params: Req.GetRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get<TResponse = Res.GetResponse, TContext = unknown>(params: Req.GetRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script<TResponse = Record<string, any>, TContext = unknown>(params?: Req.GetScriptRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get_script<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetScriptRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetScriptRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScript<TResponse = Record<string, any>, TContext = unknown>(params?: Req.GetScriptRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getScript<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScript<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetScriptRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScript<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetScriptRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_context<TResponse = Record<string, any>, TContext = unknown>(params?: Req.GetScriptContextRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get_script_context<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_context<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetScriptContextRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_context<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetScriptContextRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptContext<TResponse = Record<string, any>, TContext = unknown>(params?: Req.GetScriptContextRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getScriptContext<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptContext<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetScriptContextRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptContext<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetScriptContextRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_languages<TResponse = Record<string, any>, TContext = unknown>(params?: Req.GetScriptLanguagesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get_script_languages<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_languages<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetScriptLanguagesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_script_languages<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetScriptLanguagesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptLanguages<TResponse = Record<string, any>, TContext = unknown>(params?: Req.GetScriptLanguagesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getScriptLanguages<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptLanguages<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetScriptLanguagesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getScriptLanguages<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetScriptLanguagesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_source<TResponse = Record<string, any>, TContext = unknown>(params?: Req.GetSourceRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  get_source<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_source<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetSourceRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  get_source<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetSourceRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getSource<TResponse = Record<string, any>, TContext = unknown>(params?: Req.GetSourceRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  getSource<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getSource<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetSourceRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  getSource<TResponse = Record<string, any>, TContext = unknown>(params: Req.GetSourceRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  graph: {
    explore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.GraphExploreRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.GraphExploreRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.GraphExploreRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ilm: {
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IlmDeleteLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmDeleteLifecycleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmDeleteLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IlmDeleteLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmDeleteLifecycleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmDeleteLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IlmExplainLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explain_lifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmExplainLifecycleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmExplainLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainLifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IlmExplainLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explainLifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmExplainLifecycleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmExplainLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IlmGetLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmGetLifecycleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmGetLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IlmGetLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmGetLifecycleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmGetLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IlmGetStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_status<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmGetStatusRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmGetStatusRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IlmGetStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getStatus<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmGetStatusRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmGetStatusRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    move_to_step<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IlmMoveToStepRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    move_to_step<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    move_to_step<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IlmMoveToStepRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    move_to_step<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IlmMoveToStepRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    moveToStep<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IlmMoveToStepRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    moveToStep<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    moveToStep<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IlmMoveToStepRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    moveToStep<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IlmMoveToStepRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IlmPutLifecycleRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IlmPutLifecycleRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IlmPutLifecycleRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IlmPutLifecycleRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IlmPutLifecycleRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IlmPutLifecycleRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remove_policy<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IlmRemovePolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    remove_policy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remove_policy<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmRemovePolicyRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    remove_policy<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmRemovePolicyRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    removePolicy<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IlmRemovePolicyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    removePolicy<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    removePolicy<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmRemovePolicyRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    removePolicy<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmRemovePolicyRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    retry<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IlmRetryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    retry<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    retry<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmRetryRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    retry<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmRetryRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IlmStartRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmStartRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmStartRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IlmStopRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmStopRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params: Req.IlmStopRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  index<TResponse = Res.IndexResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndexRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  index<TResponse = Res.IndexResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  index<TResponse = Res.IndexResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndexRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  index<TResponse = Res.IndexResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndexRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  indices: {
    analyze<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesAnalyzeRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    analyze<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    analyze<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesAnalyzeRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    analyze<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesAnalyzeRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesClearCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesClearCacheRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesClearCacheRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesClearCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCache<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesClearCacheRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesClearCacheRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesCloneRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesCloneRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clone<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesCloneRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesCloseRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    close<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesCloseRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesCloseRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesCreateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesCreateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesCreateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_data_stream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesCreateDataStreamRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create_data_stream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_data_stream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesCreateDataStreamRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_data_stream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesCreateDataStreamRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createDataStream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesCreateDataStreamRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    createDataStream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createDataStream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesCreateDataStreamRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createDataStream<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesCreateDataStreamRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesDeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_alias<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesDeleteAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_alias<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_alias<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteAliasRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_alias<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteAliasRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAlias<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesDeleteAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteAlias<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAlias<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteAliasRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteAlias<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteAliasRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_stream<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesDeleteDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_data_stream<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_stream<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteDataStreamRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_stream<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteDataStreamRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataStream<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesDeleteDataStreamRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteDataStream<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataStream<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteDataStreamRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataStream<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteDataStreamRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_index_template<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesDeleteIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_index_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_index_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteIndexTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_index_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteIndexTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesDeleteIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteIndexTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteIndexTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_template<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesDeleteTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesDeleteTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesDeleteTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesExistsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesExistsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesExistsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_alias<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesExistsAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists_alias<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_alias<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesExistsAliasRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_alias<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesExistsAliasRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsAlias<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesExistsAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsAlias<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsAlias<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesExistsAliasRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsAlias<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesExistsAliasRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_template<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesExistsTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesExistsTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesExistsTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesExistsTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesExistsTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesExistsTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_type<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesExistsTypeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    exists_type<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_type<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesExistsTypeRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    exists_type<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesExistsTypeRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsType<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesExistsTypeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    existsType<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsType<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesExistsTypeRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    existsType<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesExistsTypeRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesFlushRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flush<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesFlushRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesFlushRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forcemerge<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesForcemergeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    forcemerge<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forcemerge<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesForcemergeRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forcemerge<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesForcemergeRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    freeze<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesFreezeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    freeze<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    freeze<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesFreezeRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    freeze<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesFreezeRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_alias<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_alias<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_alias<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetAliasRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_alias<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetAliasRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAlias<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetAliasRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getAlias<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAlias<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetAliasRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getAlias<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetAliasRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_streams<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetDataStreamsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_data_streams<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_streams<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetDataStreamsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_streams<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetDataStreamsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataStreams<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetDataStreamsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDataStreams<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataStreams<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetDataStreamsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataStreams<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetDataStreamsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_field_mapping<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetFieldMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_field_mapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_field_mapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetFieldMappingRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_field_mapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetFieldMappingRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFieldMapping<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetFieldMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getFieldMapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFieldMapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetFieldMappingRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFieldMapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetFieldMappingRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_index_template<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_index_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_index_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetIndexTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_index_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetIndexTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetIndexTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetIndexTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getIndexTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetIndexTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_mapping<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_mapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_mapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetMappingRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_mapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetMappingRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getMapping<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getMapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getMapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetMappingRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getMapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetMappingRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_settings<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetSettingsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_settings<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetSettingsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getSettings<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetSettingsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getSettings<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetSettingsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_template<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_template<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_template<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTemplate<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetTemplateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTemplate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetTemplateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTemplate<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetTemplateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_upgrade<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetUpgradeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_upgrade<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_upgrade<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetUpgradeRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_upgrade<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetUpgradeRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUpgrade<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesGetUpgradeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getUpgrade<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUpgrade<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetUpgradeRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUpgrade<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesGetUpgradeRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesOpenRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    open<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesOpenRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesOpenRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_alias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesPutAliasRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_alias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_alias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutAliasRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_alias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutAliasRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAlias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesPutAliasRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putAlias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAlias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutAliasRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putAlias<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutAliasRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesPutIndexTemplateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutIndexTemplateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_index_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutIndexTemplateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesPutIndexTemplateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutIndexTemplateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putIndexTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutIndexTemplateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesPutMappingRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutMappingRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutMappingRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesPutMappingRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutMappingRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutMappingRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesPutSettingsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutSettingsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_settings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutSettingsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesPutSettingsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutSettingsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putSettings<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutSettingsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesPutTemplateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutTemplateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutTemplateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesPutTemplateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutTemplateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesPutTemplateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesRecoveryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    recovery<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesRecoveryRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    recovery<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesRecoveryRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    refresh<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesRefreshRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    refresh<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    refresh<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesRefreshRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    refresh<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesRefreshRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_search_analyzers<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesReloadSearchAnalyzersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reload_search_analyzers<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_search_analyzers<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesReloadSearchAnalyzersRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_search_analyzers<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesReloadSearchAnalyzersRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesReloadSearchAnalyzersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reloadSearchAnalyzers<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesReloadSearchAnalyzersRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSearchAnalyzers<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesReloadSearchAnalyzersRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollover<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesRolloverRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    rollover<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollover<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesRolloverRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollover<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesRolloverRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesSegmentsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    segments<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesSegmentsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    segments<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesSegmentsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shard_stores<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesShardStoresRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    shard_stores<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shard_stores<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesShardStoresRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shard_stores<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesShardStoresRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shardStores<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesShardStoresRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    shardStores<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shardStores<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesShardStoresRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shardStores<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesShardStoresRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shrink<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesShrinkRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    shrink<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shrink<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesShrinkRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    shrink<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesShrinkRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    split<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesSplitRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    split<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    split<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesSplitRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    split<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesSplitRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfreeze<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesUnfreezeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    unfreeze<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfreeze<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesUnfreezeRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    unfreeze<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesUnfreezeRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_aliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesUpdateAliasesRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_aliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_aliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesUpdateAliasesRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_aliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesUpdateAliasesRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateAliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesUpdateAliasesRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateAliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateAliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesUpdateAliasesRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateAliases<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesUpdateAliasesRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IndicesUpgradeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    upgrade<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesUpgradeRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    upgrade<TResponse = Record<string, any>, TContext = unknown>(params: Req.IndicesUpgradeRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesValidateQueryRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validate_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesValidateQueryRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesValidateQueryRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IndicesValidateQueryRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validateQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesValidateQueryRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IndicesValidateQueryRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  info<TResponse = Record<string, any>, TContext = unknown>(params?: Req.InfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  info<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  info<TResponse = Record<string, any>, TContext = unknown>(params: Req.InfoRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  info<TResponse = Record<string, any>, TContext = unknown>(params: Req.InfoRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  ingest: {
    delete_pipeline<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IngestDeletePipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_pipeline<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_pipeline<TResponse = Record<string, any>, TContext = unknown>(params: Req.IngestDeletePipelineRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_pipeline<TResponse = Record<string, any>, TContext = unknown>(params: Req.IngestDeletePipelineRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePipeline<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IngestDeletePipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deletePipeline<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePipeline<TResponse = Record<string, any>, TContext = unknown>(params: Req.IngestDeletePipelineRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePipeline<TResponse = Record<string, any>, TContext = unknown>(params: Req.IngestDeletePipelineRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_pipeline<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IngestGetPipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_pipeline<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_pipeline<TResponse = Record<string, any>, TContext = unknown>(params: Req.IngestGetPipelineRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_pipeline<TResponse = Record<string, any>, TContext = unknown>(params: Req.IngestGetPipelineRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPipeline<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IngestGetPipelineRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getPipeline<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPipeline<TResponse = Record<string, any>, TContext = unknown>(params: Req.IngestGetPipelineRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPipeline<TResponse = Record<string, any>, TContext = unknown>(params: Req.IngestGetPipelineRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processor_grok<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IngestProcessorGrokRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    processor_grok<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processor_grok<TResponse = Record<string, any>, TContext = unknown>(params: Req.IngestProcessorGrokRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processor_grok<TResponse = Record<string, any>, TContext = unknown>(params: Req.IngestProcessorGrokRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processorGrok<TResponse = Record<string, any>, TContext = unknown>(params?: Req.IngestProcessorGrokRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    processorGrok<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processorGrok<TResponse = Record<string, any>, TContext = unknown>(params: Req.IngestProcessorGrokRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    processorGrok<TResponse = Record<string, any>, TContext = unknown>(params: Req.IngestProcessorGrokRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IngestPutPipelineRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IngestPutPipelineRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_pipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IngestPutPipelineRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IngestPutPipelineRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IngestPutPipelineRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPipeline<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IngestPutPipelineRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.IngestSimulateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    simulate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IngestSimulateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    simulate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.IngestSimulateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  license: {
    delete<TResponse = Record<string, any>, TContext = unknown>(params?: Req.LicenseDeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicenseDeleteRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicenseDeleteRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params?: Req.LicenseGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicenseGetRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicenseGetRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_basic_status<TResponse = Record<string, any>, TContext = unknown>(params?: Req.LicenseGetBasicStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_basic_status<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_basic_status<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicenseGetBasicStatusRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_basic_status<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicenseGetBasicStatusRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBasicStatus<TResponse = Record<string, any>, TContext = unknown>(params?: Req.LicenseGetBasicStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getBasicStatus<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBasicStatus<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicenseGetBasicStatusRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBasicStatus<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicenseGetBasicStatusRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trial_status<TResponse = Record<string, any>, TContext = unknown>(params?: Req.LicenseGetTrialStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_trial_status<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trial_status<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicenseGetTrialStatusRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trial_status<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicenseGetTrialStatusRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrialStatus<TResponse = Record<string, any>, TContext = unknown>(params?: Req.LicenseGetTrialStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTrialStatus<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrialStatus<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicenseGetTrialStatusRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrialStatus<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicenseGetTrialStatusRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.LicensePostRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.LicensePostRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.LicensePostRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_basic<TResponse = Record<string, any>, TContext = unknown>(params?: Req.LicensePostStartBasicRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post_start_basic<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_basic<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicensePostStartBasicRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_basic<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicensePostStartBasicRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartBasic<TResponse = Record<string, any>, TContext = unknown>(params?: Req.LicensePostStartBasicRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postStartBasic<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartBasic<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicensePostStartBasicRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartBasic<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicensePostStartBasicRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_trial<TResponse = Record<string, any>, TContext = unknown>(params?: Req.LicensePostStartTrialRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post_start_trial<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_trial<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicensePostStartTrialRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_start_trial<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicensePostStartTrialRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartTrial<TResponse = Record<string, any>, TContext = unknown>(params?: Req.LicensePostStartTrialRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postStartTrial<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartTrial<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicensePostStartTrialRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postStartTrial<TResponse = Record<string, any>, TContext = unknown>(params: Req.LicensePostStartTrialRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  mget<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MgetRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  mget<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mget<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MgetRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mget<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MgetRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  migration: {
    deprecations<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MigrationDeprecationsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deprecations<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deprecations<TResponse = Record<string, any>, TContext = unknown>(params: Req.MigrationDeprecationsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deprecations<TResponse = Record<string, any>, TContext = unknown>(params: Req.MigrationDeprecationsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ml: {
    close_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlCloseJobRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    close_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlCloseJobRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    close_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlCloseJobRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    closeJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlCloseJobRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    closeJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    closeJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlCloseJobRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    closeJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlCloseJobRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteCalendarRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_calendar<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteCalendarRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteCalendarRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendar<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteCalendarRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteCalendar<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendar<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteCalendarRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendar<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteCalendarRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_event<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteCalendarEventRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_calendar_event<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_event<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteCalendarEventRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_event<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteCalendarEventRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteCalendarEventRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteCalendarEvent<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteCalendarEventRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarEvent<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteCalendarEventRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_job<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteCalendarJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_calendar_job<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_job<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteCalendarJobRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_calendar_job<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteCalendarJobRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteCalendarJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteCalendarJob<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteCalendarJobRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteCalendarJob<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteCalendarJobRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteDataFrameAnalyticsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteDataFrameAnalyticsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_datafeed<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_datafeed<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_datafeed<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteDatafeedRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_datafeed<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteDatafeed<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteDatafeedRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteDatafeed<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_expired_data<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteExpiredDataRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_expired_data<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_expired_data<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteExpiredDataRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_expired_data<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteExpiredDataRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteExpiredDataRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteExpiredData<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteExpiredDataRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteExpiredData<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteExpiredDataRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_filter<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteFilterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_filter<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_filter<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteFilterRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_filter<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteFilterRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteFilter<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteFilterRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteFilter<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteFilter<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteFilterRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteFilter<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteFilterRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_forecast<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteForecastRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_forecast<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_forecast<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteForecastRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_forecast<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteForecastRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteForecast<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteForecastRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteForecast<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteForecast<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteForecastRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteForecast<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteForecastRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_job<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteJobRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteJobRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteJobRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteJobRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_model_snapshot<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteModelSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_model_snapshot<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_model_snapshot<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteModelSnapshotRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_model_snapshot<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteModelSnapshotRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteModelSnapshotRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteModelSnapshot<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteModelSnapshotRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteModelSnapshot<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteModelSnapshotRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_trained_model<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteTrainedModelRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_trained_model<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_trained_model<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteTrainedModelRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_trained_model<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteTrainedModelRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlDeleteTrainedModelRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteTrainedModel<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteTrainedModelRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTrainedModel<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlDeleteTrainedModelRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimate_model_memory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlEstimateModelMemoryRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    estimate_model_memory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimate_model_memory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlEstimateModelMemoryRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimate_model_memory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlEstimateModelMemoryRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlEstimateModelMemoryRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    estimateModelMemory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlEstimateModelMemoryRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    estimateModelMemory<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlEstimateModelMemoryRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluate_data_frame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlEvaluateDataFrameRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    evaluate_data_frame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluate_data_frame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlEvaluateDataFrameRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluate_data_frame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlEvaluateDataFrameRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlEvaluateDataFrameRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    evaluateDataFrame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlEvaluateDataFrameRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    evaluateDataFrame<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlEvaluateDataFrameRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlExplainDataFrameAnalyticsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explain_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlExplainDataFrameAnalyticsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explain_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlExplainDataFrameAnalyticsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlExplainDataFrameAnalyticsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    explainDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlExplainDataFrameAnalyticsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    explainDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlExplainDataFrameAnalyticsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_file_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params?: Req.MlFindFileStructureRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    find_file_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_file_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: Req.MlFindFileStructureRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    find_file_structure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: Req.MlFindFileStructureRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findFileStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params?: Req.MlFindFileStructureRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    findFileStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findFileStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: Req.MlFindFileStructureRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    findFileStructure<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: Req.MlFindFileStructureRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlFlushJobRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flush_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlFlushJobRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flush_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlFlushJobRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlFlushJobRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    flushJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlFlushJobRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    flushJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlFlushJobRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forecast<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlForecastRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    forecast<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forecast<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlForecastRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    forecast<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlForecastRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlGetBucketsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetBucketsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetBucketsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlGetBucketsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetBucketsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetBucketsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendar_events<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetCalendarEventsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_calendar_events<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendar_events<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetCalendarEventsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendar_events<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetCalendarEventsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetCalendarEventsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getCalendarEvents<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetCalendarEventsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendarEvents<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetCalendarEventsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlGetCalendarsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_calendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetCalendarsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_calendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetCalendarsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlGetCalendarsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getCalendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetCalendarsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCalendars<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetCalendarsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_categories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlGetCategoriesRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_categories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_categories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetCategoriesRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_categories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetCategoriesRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCategories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlGetCategoriesRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getCategories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCategories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetCategoriesRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getCategories<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetCategoriesRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDataFrameAnalyticsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetDataFrameAnalyticsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDataFrameAnalyticsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalytics<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDataFrameAnalyticsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics_stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetDataFrameAnalyticsStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_data_frame_analytics_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDataFrameAnalyticsStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_data_frame_analytics_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDataFrameAnalyticsStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetDataFrameAnalyticsStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDataFrameAnalyticsStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDataFrameAnalyticsStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDataFrameAnalyticsStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDataFrameAnalyticsStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeed_stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetDatafeedStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_datafeed_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeed_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDatafeedStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeed_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDatafeedStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetDatafeedStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDatafeedStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDatafeedStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeedStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDatafeedStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeeds<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetDatafeedsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_datafeeds<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeeds<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDatafeedsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_datafeeds<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDatafeedsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeeds<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetDatafeedsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getDatafeeds<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeeds<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDatafeedsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getDatafeeds<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetDatafeedsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_filters<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetFiltersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_filters<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_filters<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetFiltersRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_filters<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetFiltersRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFilters<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetFiltersRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getFilters<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFilters<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetFiltersRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getFilters<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetFiltersRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_influencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlGetInfluencersRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_influencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_influencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetInfluencersRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_influencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetInfluencersRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getInfluencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlGetInfluencersRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getInfluencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getInfluencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetInfluencersRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getInfluencers<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetInfluencersRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_job_stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetJobStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_job_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_job_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetJobStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_job_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetJobStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobStats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetJobStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getJobStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetJobStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetJobStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetJobsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetJobsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getJobs<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetJobsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetJobsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_model_snapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlGetModelSnapshotsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_model_snapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_model_snapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetModelSnapshotsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_model_snapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetModelSnapshotsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getModelSnapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlGetModelSnapshotsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getModelSnapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getModelSnapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetModelSnapshotsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getModelSnapshots<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetModelSnapshotsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_overall_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlGetOverallBucketsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_overall_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_overall_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetOverallBucketsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_overall_buckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetOverallBucketsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlGetOverallBucketsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getOverallBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetOverallBucketsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getOverallBuckets<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetOverallBucketsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_records<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlGetRecordsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_records<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_records<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetRecordsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_records<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetRecordsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRecords<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlGetRecordsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRecords<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRecords<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetRecordsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRecords<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlGetRecordsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetTrainedModelsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_trained_models<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetTrainedModelsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetTrainedModelsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModels<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetTrainedModelsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTrainedModels<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModels<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetTrainedModelsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModels<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetTrainedModelsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models_stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetTrainedModelsStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_trained_models_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetTrainedModelsStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_trained_models_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetTrainedModelsStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModelsStats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlGetTrainedModelsStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTrainedModelsStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModelsStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetTrainedModelsStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTrainedModelsStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlGetTrainedModelsStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    info<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlInfoRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlInfoRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open_job<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlOpenJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    open_job<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open_job<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlOpenJobRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    open_job<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlOpenJobRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    openJob<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlOpenJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    openJob<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    openJob<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlOpenJobRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    openJob<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlOpenJobRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_calendar_events<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPostCalendarEventsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post_calendar_events<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_calendar_events<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPostCalendarEventsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_calendar_events<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPostCalendarEventsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPostCalendarEventsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postCalendarEvents<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPostCalendarEventsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postCalendarEvents<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPostCalendarEventsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPostDataRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    post_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPostDataRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    post_data<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPostDataRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPostDataRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    postData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPostDataRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    postData<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPostDataRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_datafeed<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlPreviewDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    preview_datafeed<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_datafeed<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlPreviewDatafeedRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_datafeed<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlPreviewDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewDatafeed<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlPreviewDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    previewDatafeed<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewDatafeed<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlPreviewDatafeedRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewDatafeed<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlPreviewDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPutCalendarRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_calendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutCalendarRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutCalendarRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPutCalendarRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putCalendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutCalendarRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendar<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutCalendarRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar_job<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlPutCalendarJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_calendar_job<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar_job<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlPutCalendarJobRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_calendar_job<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlPutCalendarJobRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendarJob<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlPutCalendarJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putCalendarJob<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendarJob<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlPutCalendarJobRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putCalendarJob<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlPutCalendarJobRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPutDataFrameAnalyticsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutDataFrameAnalyticsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutDataFrameAnalyticsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPutDataFrameAnalyticsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutDataFrameAnalyticsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutDataFrameAnalyticsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPutDatafeedRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutDatafeedRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutDatafeedRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPutDatafeedRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutDatafeedRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutDatafeedRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPutFilterRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutFilterRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutFilterRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPutFilterRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutFilterRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutFilterRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPutJobRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutJobRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutJobRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPutJobRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutJobRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutJobRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_trained_model<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPutTrainedModelRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_trained_model<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_trained_model<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutTrainedModelRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_trained_model<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutTrainedModelRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTrainedModel<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlPutTrainedModelRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTrainedModel<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTrainedModel<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutTrainedModelRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTrainedModel<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlPutTrainedModelRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revert_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlRevertModelSnapshotRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    revert_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revert_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlRevertModelSnapshotRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revert_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlRevertModelSnapshotRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revertModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlRevertModelSnapshotRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    revertModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revertModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlRevertModelSnapshotRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    revertModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlRevertModelSnapshotRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    set_upgrade_mode<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlSetUpgradeModeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    set_upgrade_mode<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    set_upgrade_mode<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlSetUpgradeModeRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    set_upgrade_mode<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlSetUpgradeModeRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlSetUpgradeModeRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    setUpgradeMode<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlSetUpgradeModeRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    setUpgradeMode<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlSetUpgradeModeRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlStartDataFrameAnalyticsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlStartDataFrameAnalyticsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlStartDataFrameAnalyticsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlStartDataFrameAnalyticsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlStartDataFrameAnalyticsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlStartDataFrameAnalyticsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlStartDatafeedRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlStartDatafeedRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlStartDatafeedRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlStartDatafeedRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlStartDatafeedRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlStartDatafeedRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlStopDataFrameAnalyticsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlStopDataFrameAnalyticsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_data_frame_analytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlStopDataFrameAnalyticsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlStopDataFrameAnalyticsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlStopDataFrameAnalyticsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDataFrameAnalytics<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlStopDataFrameAnalyticsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_datafeed<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlStopDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop_datafeed<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_datafeed<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlStopDatafeedRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_datafeed<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlStopDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDatafeed<TResponse = Record<string, any>, TContext = unknown>(params?: Req.MlStopDatafeedRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopDatafeed<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDatafeed<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlStopDatafeedRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopDatafeed<TResponse = Record<string, any>, TContext = unknown>(params: Req.MlStopDatafeedRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlUpdateDatafeedRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateDatafeedRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_datafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateDatafeedRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlUpdateDatafeedRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateDatafeedRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateDatafeed<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateDatafeedRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlUpdateFilterRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateFilterRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_filter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateFilterRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlUpdateFilterRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateFilterRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateFilter<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateFilterRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlUpdateJobRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateJobRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateJobRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlUpdateJobRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateJobRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateJobRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlUpdateModelSnapshotRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateModelSnapshotRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_model_snapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateModelSnapshotRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlUpdateModelSnapshotRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateModelSnapshotRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateModelSnapshot<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlUpdateModelSnapshotRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlValidateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlValidateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlValidateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_detector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlValidateDetectorRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validate_detector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_detector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlValidateDetectorRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validate_detector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlValidateDetectorRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateDetector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MlValidateDetectorRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    validateDetector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateDetector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlValidateDetectorRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    validateDetector<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MlValidateDetectorRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  monitoring: {
    bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params?: Req.MonitoringBulkRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: Req.MonitoringBulkRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    bulk<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: Req.MonitoringBulkRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params?: Req.MsearchRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: Req.MsearchRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: Req.MsearchRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch_template<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params?: Req.MsearchTemplateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  msearch_template<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch_template<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: Req.MsearchTemplateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearch_template<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: Req.MsearchTemplateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params?: Req.MsearchTemplateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  msearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: Req.MsearchTemplateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  msearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestNDBody = Record<string, any>[], TContext = unknown>(params: Req.MsearchTemplateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mtermvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.MtermvectorsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  mtermvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mtermvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MtermvectorsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  mtermvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.MtermvectorsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  nodes: {
    hot_threads<TResponse = Record<string, any>, TContext = unknown>(params?: Req.NodesHotThreadsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    hot_threads<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hot_threads<TResponse = Record<string, any>, TContext = unknown>(params: Req.NodesHotThreadsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hot_threads<TResponse = Record<string, any>, TContext = unknown>(params: Req.NodesHotThreadsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hotThreads<TResponse = Record<string, any>, TContext = unknown>(params?: Req.NodesHotThreadsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    hotThreads<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hotThreads<TResponse = Record<string, any>, TContext = unknown>(params: Req.NodesHotThreadsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hotThreads<TResponse = Record<string, any>, TContext = unknown>(params: Req.NodesHotThreadsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params?: Req.NodesInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    info<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params: Req.NodesInfoRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params: Req.NodesInfoRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_secure_settings<TResponse = Record<string, any>, TContext = unknown>(params?: Req.NodesReloadSecureSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reload_secure_settings<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_secure_settings<TResponse = Record<string, any>, TContext = unknown>(params: Req.NodesReloadSecureSettingsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reload_secure_settings<TResponse = Record<string, any>, TContext = unknown>(params: Req.NodesReloadSecureSettingsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TResponse = Record<string, any>, TContext = unknown>(params?: Req.NodesReloadSecureSettingsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    reloadSecureSettings<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TResponse = Record<string, any>, TContext = unknown>(params: Req.NodesReloadSecureSettingsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    reloadSecureSettings<TResponse = Record<string, any>, TContext = unknown>(params: Req.NodesReloadSecureSettingsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.NodesStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.NodesStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.NodesStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = unknown>(params?: Req.NodesUsageRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    usage<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = unknown>(params: Req.NodesUsageRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = unknown>(params: Req.NodesUsageRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ping<TResponse = Record<string, any>, TContext = unknown>(params?: Req.PingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  ping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  ping<TResponse = Record<string, any>, TContext = unknown>(params: Req.PingRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  ping<TResponse = Record<string, any>, TContext = unknown>(params: Req.PingRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  put_script<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.PutScriptRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  put_script<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  put_script<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.PutScriptRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  put_script<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.PutScriptRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  putScript<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.PutScriptRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  putScript<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  putScript<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.PutScriptRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  putScript<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.PutScriptRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rank_eval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.RankEvalRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  rank_eval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rank_eval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RankEvalRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rank_eval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RankEvalRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rankEval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.RankEvalRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  rankEval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rankEval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RankEvalRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rankEval<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RankEvalRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.ReindexRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  reindex<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ReindexRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ReindexRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ReindexRethrottleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  reindex_rethrottle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params: Req.ReindexRethrottleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindex_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params: Req.ReindexRethrottleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindexRethrottle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.ReindexRethrottleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  reindexRethrottle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindexRethrottle<TResponse = Record<string, any>, TContext = unknown>(params: Req.ReindexRethrottleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  reindexRethrottle<TResponse = Record<string, any>, TContext = unknown>(params: Req.ReindexRethrottleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  render_search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.RenderSearchTemplateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  render_search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  render_search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RenderSearchTemplateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  render_search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RenderSearchTemplateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  renderSearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.RenderSearchTemplateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  renderSearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  renderSearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RenderSearchTemplateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  renderSearchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RenderSearchTemplateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  rollup: {
    delete_job<TResponse = Record<string, any>, TContext = unknown>(params?: Req.RollupDeleteJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_job<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupDeleteJobRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_job<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupDeleteJobRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(params?: Req.RollupDeleteJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupDeleteJobRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteJob<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupDeleteJobRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(params?: Req.RollupGetJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupGetJobsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_jobs<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupGetJobsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = unknown>(params?: Req.RollupGetJobsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getJobs<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupGetJobsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getJobs<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupGetJobsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_caps<TResponse = Record<string, any>, TContext = unknown>(params?: Req.RollupGetRollupCapsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_rollup_caps<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_caps<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupGetRollupCapsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_caps<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupGetRollupCapsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupCaps<TResponse = Record<string, any>, TContext = unknown>(params?: Req.RollupGetRollupCapsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRollupCaps<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupCaps<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupGetRollupCapsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupCaps<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupGetRollupCapsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_index_caps<TResponse = Record<string, any>, TContext = unknown>(params?: Req.RollupGetRollupIndexCapsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_rollup_index_caps<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_index_caps<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupGetRollupIndexCapsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_rollup_index_caps<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupGetRollupIndexCapsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TResponse = Record<string, any>, TContext = unknown>(params?: Req.RollupGetRollupIndexCapsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRollupIndexCaps<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupGetRollupIndexCapsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRollupIndexCaps<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupGetRollupIndexCapsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.RollupPutJobRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RollupPutJobRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_job<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RollupPutJobRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.RollupPutJobRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RollupPutJobRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putJob<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RollupPutJobRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollup_search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.RollupRollupSearchRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    rollup_search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollup_search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RollupRollupSearchRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollup_search<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RollupRollupSearchRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollupSearch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.RollupRollupSearchRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    rollupSearch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollupSearch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RollupRollupSearchRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    rollupSearch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.RollupRollupSearchRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_job<TResponse = Record<string, any>, TContext = unknown>(params?: Req.RollupStartJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start_job<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_job<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupStartJobRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_job<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupStartJobRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startJob<TResponse = Record<string, any>, TContext = unknown>(params?: Req.RollupStartJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startJob<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startJob<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupStartJobRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startJob<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupStartJobRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_job<TResponse = Record<string, any>, TContext = unknown>(params?: Req.RollupStopJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop_job<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_job<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupStopJobRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_job<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupStopJobRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopJob<TResponse = Record<string, any>, TContext = unknown>(params?: Req.RollupStopJobRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopJob<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopJob<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupStopJobRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopJob<TResponse = Record<string, any>, TContext = unknown>(params: Req.RollupStopJobRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  scripts_painless_execute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.ScriptsPainlessExecuteRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  scripts_painless_execute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scripts_painless_execute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ScriptsPainlessExecuteRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scripts_painless_execute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ScriptsPainlessExecuteRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.ScriptsPainlessExecuteRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  scriptsPainlessExecute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ScriptsPainlessExecuteRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scriptsPainlessExecute<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ScriptsPainlessExecuteRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.ScrollRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ScrollRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  scroll<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.ScrollRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search<TResponse = Res.SearchResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SearchRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  search<TResponse = Res.SearchResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search<TResponse = Res.SearchResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SearchRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search<TResponse = Res.SearchResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SearchRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_shards<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SearchShardsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  search_shards<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_shards<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchShardsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_shards<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchShardsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchShards<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SearchShardsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  searchShards<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchShards<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchShardsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchShards<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchShardsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SearchTemplateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SearchTemplateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  search_template<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SearchTemplateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SearchTemplateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  searchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
<<<<<<< HEAD
  searchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SearchTemplateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchTemplate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SearchTemplateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  searchable_snapshots: {
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SearchableSnapshotsClearCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsClearCacheRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsClearCacheRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SearchableSnapshotsClearCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCache<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsClearCacheRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsClearCacheRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SearchableSnapshotsMountRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsMountRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsMountRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SearchableSnapshotsStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  searchableSnapshots: {
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SearchableSnapshotsClearCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsClearCacheRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cache<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsClearCacheRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SearchableSnapshotsClearCacheRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCache<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsClearCacheRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCache<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsClearCacheRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SearchableSnapshotsMountRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsMountRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    mount<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsMountRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SearchableSnapshotsStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.SearchableSnapshotsStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
=======
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
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: RequestParams.SearchableSnapshotsStats, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsStats, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: RequestParams.SearchableSnapshotsStats, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
>>>>>>> master
  }
  security: {
    authenticate<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityAuthenticateRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    authenticate<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    authenticate<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityAuthenticateRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    authenticate<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityAuthenticateRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    change_password<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityChangePasswordRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    change_password<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    change_password<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityChangePasswordRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    change_password<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityChangePasswordRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    changePassword<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityChangePasswordRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    changePassword<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    changePassword<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityChangePasswordRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    changePassword<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityChangePasswordRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_realms<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityClearCachedRealmsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cached_realms<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_realms<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityClearCachedRealmsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_realms<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityClearCachedRealmsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityClearCachedRealmsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCachedRealms<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityClearCachedRealmsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRealms<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityClearCachedRealmsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_roles<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityClearCachedRolesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cached_roles<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_roles<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityClearCachedRolesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cached_roles<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityClearCachedRolesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityClearCachedRolesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCachedRoles<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityClearCachedRolesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCachedRoles<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityClearCachedRolesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityCreateApiKeyRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityCreateApiKeyRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityCreateApiKeyRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityCreateApiKeyRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    createApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityCreateApiKeyRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityCreateApiKeyRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_privileges<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityDeletePrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_privileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_privileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeletePrivilegesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_privileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeletePrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePrivileges<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityDeletePrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deletePrivileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePrivileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeletePrivilegesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deletePrivileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeletePrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityDeleteRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_role<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeleteRoleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeleteRoleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRole<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityDeleteRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteRole<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRole<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeleteRoleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRole<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeleteRoleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role_mapping<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityDeleteRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_role_mapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role_mapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeleteRoleMappingRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_role_mapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeleteRoleMappingRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityDeleteRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteRoleMapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeleteRoleMappingRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRoleMapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeleteRoleMappingRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_user<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityDeleteUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_user<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_user<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeleteUserRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_user<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeleteUserRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteUser<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityDeleteUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteUser<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteUser<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeleteUserRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteUser<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDeleteUserRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disable_user<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityDisableUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    disable_user<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disable_user<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDisableUserRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disable_user<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDisableUserRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disableUser<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityDisableUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    disableUser<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disableUser<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDisableUserRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    disableUser<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityDisableUserRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enable_user<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityEnableUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    enable_user<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enable_user<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityEnableUserRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enable_user<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityEnableUserRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enableUser<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityEnableUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    enableUser<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enableUser<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityEnableUserRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    enableUser<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityEnableUserRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_api_key<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_api_key<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_api_key<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetApiKeyRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_api_key<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetApiKeyRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getApiKey<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetApiKeyRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getApiKey<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getApiKey<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetApiKeyRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getApiKey<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetApiKeyRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_builtin_privileges<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetBuiltinPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_builtin_privileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_builtin_privileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetBuiltinPrivilegesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_builtin_privileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetBuiltinPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetBuiltinPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getBuiltinPrivileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetBuiltinPrivilegesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getBuiltinPrivileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetBuiltinPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_privileges<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_privileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_privileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetPrivilegesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_privileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPrivileges<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getPrivileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPrivileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetPrivilegesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getPrivileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_role<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetRoleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetRoleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRole<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetRoleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRole<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRole<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetRoleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRole<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetRoleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role_mapping<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_role_mapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role_mapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetRoleMappingRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_role_mapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetRoleMappingRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRoleMapping<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetRoleMappingRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRoleMapping<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRoleMapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetRoleMappingRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRoleMapping<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetRoleMappingRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetTokenRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityGetTokenRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityGetTokenRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetTokenRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityGetTokenRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityGetTokenRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_user<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetUserRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetUserRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUser<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetUserRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getUser<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUser<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetUserRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUser<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetUserRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user_privileges<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetUserPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_user_privileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user_privileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetUserPrivilegesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_user_privileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetUserPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SecurityGetUserPrivilegesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getUserPrivileges<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetUserPrivilegesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getUserPrivileges<TResponse = Record<string, any>, TContext = unknown>(params: Req.SecurityGetUserPrivilegesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    has_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityHasPrivilegesRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    has_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    has_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityHasPrivilegesRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    has_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityHasPrivilegesRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hasPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityHasPrivilegesRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    hasPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hasPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityHasPrivilegesRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    hasPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityHasPrivilegesRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityInvalidateApiKeyRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    invalidate_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityInvalidateApiKeyRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_api_key<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityInvalidateApiKeyRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityInvalidateApiKeyRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    invalidateApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityInvalidateApiKeyRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateApiKey<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityInvalidateApiKeyRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityInvalidateTokenRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    invalidate_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityInvalidateTokenRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidate_token<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityInvalidateTokenRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityInvalidateTokenRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    invalidateToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityInvalidateTokenRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    invalidateToken<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityInvalidateTokenRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityPutPrivilegesRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutPrivilegesRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_privileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutPrivilegesRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityPutPrivilegesRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutPrivilegesRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putPrivileges<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutPrivilegesRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityPutRoleRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_role<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutRoleRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutRoleRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRole<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityPutRoleRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putRole<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRole<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutRoleRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRole<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutRoleRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityPutRoleMappingRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_role_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutRoleMappingRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_role_mapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutRoleMappingRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRoleMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityPutRoleMappingRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putRoleMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRoleMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutRoleMappingRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putRoleMapping<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutRoleMappingRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_user<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityPutUserRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_user<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_user<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutUserRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_user<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutUserRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putUser<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SecurityPutUserRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putUser<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putUser<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutUserRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putUser<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SecurityPutUserRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  slm: {
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SlmDeleteLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmDeleteLifecycleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmDeleteLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SlmDeleteLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmDeleteLifecycleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmDeleteLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SlmExecuteLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    execute_lifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmExecuteLifecycleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmExecuteLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeLifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SlmExecuteLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executeLifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmExecuteLifecycleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmExecuteLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_retention<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SlmExecuteRetentionRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    execute_retention<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_retention<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmExecuteRetentionRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_retention<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmExecuteRetentionRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeRetention<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SlmExecuteRetentionRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executeRetention<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeRetention<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmExecuteRetentionRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeRetention<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmExecuteRetentionRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SlmGetLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmGetLifecycleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_lifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmGetLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SlmGetLifecycleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmGetLifecycleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getLifecycle<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmGetLifecycleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SlmGetStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmGetStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmGetStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SlmGetStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmGetStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmGetStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SlmGetStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_status<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmGetStatusRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_status<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmGetStatusRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SlmGetStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getStatus<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmGetStatusRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getStatus<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmGetStatusRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SlmPutLifecycleRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SlmPutLifecycleRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_lifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SlmPutLifecycleRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SlmPutLifecycleRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SlmPutLifecycleRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putLifecycle<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SlmPutLifecycleRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SlmStartRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmStartRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmStartRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SlmStopRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmStopRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params: Req.SlmStopRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  snapshot: {
    cleanup_repository<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SnapshotCleanupRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    cleanup_repository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanup_repository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotCleanupRepositoryRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanup_repository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotCleanupRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanupRepository<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SnapshotCleanupRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    cleanupRepository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanupRepository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotCleanupRepositoryRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cleanupRepository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotCleanupRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SnapshotCreateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SnapshotCreateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SnapshotCreateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_repository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SnapshotCreateRepositoryRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    create_repository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_repository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SnapshotCreateRepositoryRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    create_repository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SnapshotCreateRepositoryRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createRepository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SnapshotCreateRepositoryRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    createRepository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createRepository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SnapshotCreateRepositoryRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    createRepository<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SnapshotCreateRepositoryRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SnapshotDeleteRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotDeleteRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotDeleteRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_repository<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SnapshotDeleteRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_repository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_repository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotDeleteRepositoryRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_repository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotDeleteRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRepository<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SnapshotDeleteRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteRepository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRepository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotDeleteRepositoryRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteRepository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotDeleteRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SnapshotGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotGetRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotGetRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_repository<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SnapshotGetRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_repository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_repository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotGetRepositoryRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_repository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotGetRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRepository<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SnapshotGetRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getRepository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRepository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotGetRepositoryRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getRepository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotGetRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    restore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SnapshotRestoreRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    restore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    restore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SnapshotRestoreRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    restore<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SnapshotRestoreRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SnapshotStatusRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    status<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotStatusRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    status<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotStatusRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verify_repository<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SnapshotVerifyRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    verify_repository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verify_repository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotVerifyRepositoryRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verify_repository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotVerifyRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verifyRepository<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SnapshotVerifyRepositoryRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    verifyRepository<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verifyRepository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotVerifyRepositoryRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    verifyRepository<TResponse = Record<string, any>, TContext = unknown>(params: Req.SnapshotVerifyRepositoryRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  sql: {
    clear_cursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SqlClearCursorRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clear_cursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SqlClearCursorRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clear_cursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SqlClearCursorRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SqlClearCursorRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    clearCursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SqlClearCursorRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    clearCursor<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SqlClearCursorRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SqlQueryRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SqlQueryRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SqlQueryRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    translate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.SqlTranslateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    translate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    translate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SqlTranslateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    translate<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.SqlTranslateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  ssl: {
    certificates<TResponse = Record<string, any>, TContext = unknown>(params?: Req.SslCertificatesRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    certificates<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    certificates<TResponse = Record<string, any>, TContext = unknown>(params: Req.SslCertificatesRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    certificates<TResponse = Record<string, any>, TContext = unknown>(params: Req.SslCertificatesRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  tasks: {
    cancel<TResponse = Record<string, any>, TContext = unknown>(params?: Req.TasksCancelRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    cancel<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cancel<TResponse = Record<string, any>, TContext = unknown>(params: Req.TasksCancelRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    cancel<TResponse = Record<string, any>, TContext = unknown>(params: Req.TasksCancelRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params?: Req.TasksGetRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: Req.TasksGetRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get<TResponse = Record<string, any>, TContext = unknown>(params: Req.TasksGetRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list<TResponse = Record<string, any>, TContext = unknown>(params?: Req.TasksListRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    list<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list<TResponse = Record<string, any>, TContext = unknown>(params: Req.TasksListRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    list<TResponse = Record<string, any>, TContext = unknown>(params: Req.TasksListRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  termvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.TermvectorsRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  termvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  termvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.TermvectorsRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  termvectors<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.TermvectorsRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  transform: {
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.TransformDeleteTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformDeleteTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformDeleteTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.TransformDeleteTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformDeleteTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformDeleteTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.TransformGetTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformGetTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformGetTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.TransformGetTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformGetTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformGetTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.TransformGetTransformStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformGetTransformStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_transform_stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformGetTransformStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.TransformGetTransformStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformGetTransformStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getTransformStats<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformGetTransformStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.TransformPreviewTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.TransformPreviewTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    preview_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.TransformPreviewTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.TransformPreviewTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.TransformPreviewTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    previewTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.TransformPreviewTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.TransformPutTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.TransformPutTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.TransformPutTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.TransformPutTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.TransformPutTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.TransformPutTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.TransformStartTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformStartTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformStartTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.TransformStartTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    startTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformStartTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    startTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformStartTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.TransformStopTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformStopTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop_transform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformStopTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(params?: Req.TransformStopTransformRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformStopTransformRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stopTransform<TResponse = Record<string, any>, TContext = unknown>(params: Req.TransformStopTransformRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.TransformUpdateTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.TransformUpdateTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    update_transform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.TransformUpdateTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.TransformUpdateTransformRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.TransformUpdateTransformRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    updateTransform<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.TransformUpdateTransformRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  update<TResponse = Res.UpdateResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.UpdateRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  update<TResponse = Res.UpdateResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update<TResponse = Res.UpdateResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.UpdateRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update<TResponse = Res.UpdateResponse, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.UpdateRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.UpdateByQueryRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  update_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.UpdateByQueryRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.UpdateByQueryRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.UpdateByQueryRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  updateByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.UpdateByQueryRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQuery<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.UpdateByQueryRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.UpdateByQueryRethrottleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  update_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params: Req.UpdateByQueryRethrottleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  update_by_query_rethrottle<TResponse = Record<string, any>, TContext = unknown>(params: Req.UpdateByQueryRethrottleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(params?: Req.UpdateByQueryRethrottleRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
  updateByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(params: Req.UpdateByQueryRethrottleRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  updateByQueryRethrottle<TResponse = Record<string, any>, TContext = unknown>(params: Req.UpdateByQueryRethrottleRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  watcher: {
    ack_watch<TResponse = Record<string, any>, TContext = unknown>(params?: Req.WatcherAckWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ack_watch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ack_watch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherAckWatchRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ack_watch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherAckWatchRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ackWatch<TResponse = Record<string, any>, TContext = unknown>(params?: Req.WatcherAckWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    ackWatch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ackWatch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherAckWatchRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    ackWatch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherAckWatchRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activate_watch<TResponse = Record<string, any>, TContext = unknown>(params?: Req.WatcherActivateWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    activate_watch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activate_watch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherActivateWatchRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activate_watch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherActivateWatchRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activateWatch<TResponse = Record<string, any>, TContext = unknown>(params?: Req.WatcherActivateWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    activateWatch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activateWatch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherActivateWatchRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    activateWatch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherActivateWatchRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivate_watch<TResponse = Record<string, any>, TContext = unknown>(params?: Req.WatcherDeactivateWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deactivate_watch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivate_watch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherDeactivateWatchRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivate_watch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherDeactivateWatchRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivateWatch<TResponse = Record<string, any>, TContext = unknown>(params?: Req.WatcherDeactivateWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deactivateWatch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivateWatch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherDeactivateWatchRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deactivateWatch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherDeactivateWatchRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_watch<TResponse = Record<string, any>, TContext = unknown>(params?: Req.WatcherDeleteWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    delete_watch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_watch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherDeleteWatchRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    delete_watch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherDeleteWatchRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteWatch<TResponse = Record<string, any>, TContext = unknown>(params?: Req.WatcherDeleteWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    deleteWatch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteWatch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherDeleteWatchRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    deleteWatch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherDeleteWatchRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.WatcherExecuteWatchRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    execute_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.WatcherExecuteWatchRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    execute_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.WatcherExecuteWatchRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.WatcherExecuteWatchRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    executeWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.WatcherExecuteWatchRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    executeWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.WatcherExecuteWatchRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_watch<TResponse = Record<string, any>, TContext = unknown>(params?: Req.WatcherGetWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    get_watch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_watch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherGetWatchRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    get_watch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherGetWatchRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getWatch<TResponse = Record<string, any>, TContext = unknown>(params?: Req.WatcherGetWatchRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    getWatch<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getWatch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherGetWatchRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    getWatch<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherGetWatchRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.WatcherPutWatchRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    put_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.WatcherPutWatchRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    put_watch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.WatcherPutWatchRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params?: Req.WatcherPutWatchRequest<TRequestBody>, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    putWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.WatcherPutWatchRequest<TRequestBody>, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    putWatch<TResponse = Record<string, any>, TRequestBody extends RequestBody = Record<string, any>, TContext = unknown>(params: Req.WatcherPutWatchRequest<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params?: Req.WatcherStartRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    start<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherStartRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    start<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherStartRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params?: Req.WatcherStatsRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stats<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherStatsRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stats<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherStatsRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params?: Req.WatcherStopRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    stop<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherStopRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    stop<TResponse = Record<string, any>, TContext = unknown>(params: Req.WatcherStopRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
  }
  xpack: {
    info<TResponse = Record<string, any>, TContext = unknown>(params?: Req.XpackInfoRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    info<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params: Req.XpackInfoRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    info<TResponse = Record<string, any>, TContext = unknown>(params: Req.XpackInfoRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = unknown>(params?: Req.XpackUsageRequest, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse<TResponse, TContext>>
    usage<TResponse = Record<string, any>, TContext = unknown>(callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = unknown>(params: Req.XpackUsageRequest, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
    usage<TResponse = Record<string, any>, TContext = unknown>(params: Req.XpackUsageRequest, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>): TransportRequestCallback
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

export * from './api/RequestTypes'
export * from './api/ResponseTypes'
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
