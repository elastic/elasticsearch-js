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

import { Readable as ReadableStream } from 'stream';
import { ConnectionPool, CloudConnectionPool } from './pool';
import Connection from './Connection';
import Serializer from './Serializer';
import * as errors from './errors';

export type ApiError = errors.ConfigurationError | errors.ConnectionError |
                       errors.DeserializationError | errors.SerializationError |
                       errors.NoLivingConnectionsError | errors.ResponseError |
                       errors.TimeoutError | errors.RequestAbortedError

export type Context = Record<string, unknown> | null

export interface nodeSelectorFn {
  (connections: Connection[]): Connection;
}

export interface nodeFilterFn {
  (connection: Connection): boolean;
}

export interface generateRequestIdFn {
  (params: TransportRequestParams, options: TransportRequestOptions): any;
}

interface TransportOptions {
  emit: (event: string | symbol, ...args: any[]) => boolean;
  connectionPool: ConnectionPool | CloudConnectionPool;
  serializer: Serializer;
  maxRetries: number;
  requestTimeout: number | string;
  suggestCompression?: boolean;
  compression?: 'gzip';
  sniffInterval?: number;
  sniffOnConnectionFault?: boolean;
  sniffEndpoint: string;
  sniffOnStart?: boolean;
  nodeFilter?: nodeFilterFn;
  nodeSelector?: string | nodeSelectorFn;
  headers?: Record<string, any>;
  generateRequestId?: generateRequestIdFn;
  name?: string;
  opaqueIdPrefix?: string;
}

export interface RequestEvent<TResponse = Record<string, any>, TContext = Context> {
  body: TResponse;
  statusCode: number | null;
  headers: Record<string, any> | null;
  warnings: string[] | null;
  meta: {
    context: TContext;
    name: string | symbol;
    request: {
      params: TransportRequestParams;
      options: TransportRequestOptions;
      id: any;
    };
    connection: Connection;
    attempts: number;
    aborted: boolean;
    sniff?: {
      hosts: any[];
      reason: string;
    };
  };
}

// ApiResponse and RequestEvent are the same thing
// we are doing this for have more clear names
export interface ApiResponse<TResponse = Record<string, any>, TContext = Context> extends RequestEvent<TResponse, TContext> {}

export type RequestBody<T = Record<string, any>>  = T | string | Buffer | ReadableStream
export type RequestNDBody<T = Record<string, any>[]>  = T | string | string[] | Buffer | ReadableStream

export interface TransportRequestParams {
  method: string;
  path: string;
  body?: RequestBody;
  bulkBody?: RequestNDBody;
  querystring?: Record<string, any> | string;
}

export interface TransportRequestOptions {
  ignore?: number[];
  requestTimeout?: number | string;
  maxRetries?: number;
  asStream?: boolean;
  headers?: Record<string, any>;
  querystring?: Record<string, any>;
  compression?: 'gzip';
  id?: any;
  context?: Context;
  warnings?: string[];
  opaqueId?: string;
}

export interface TransportRequestCallback {
  abort: () => void;
}

export interface TransportRequestPromise<T> extends Promise<T> {
  abort: () => void;
}

export interface TransportGetConnectionOptions {
  requestId: string;
}

export interface TransportSniffOptions {
  reason: string;
  requestId?: string;
}

export default class Transport {
  static sniffReasons: {
    SNIFF_ON_START: string;
    SNIFF_INTERVAL: string;
    SNIFF_ON_CONNECTION_FAULT: string;
    DEFAULT: string;
  };
  emit: (event: string | symbol, ...args: any[]) => boolean;
  connectionPool: ConnectionPool | CloudConnectionPool;
  serializer: Serializer;
  maxRetries: number;
  requestTimeout: number;
  suggestCompression: boolean;
  compression: 'gzip' | false;
  sniffInterval: number;
  sniffOnConnectionFault: boolean;
  opaqueIdPrefix: string | null;
  sniffEndpoint: string;
  _sniffEnabled: boolean;
  _nextSniff: number;
  _isSniffing: boolean;
  constructor(opts: TransportOptions);
  request(params: TransportRequestParams, options?: TransportRequestOptions): TransportRequestPromise<ApiResponse>;
  request(params: TransportRequestParams, options?: TransportRequestOptions, callback?: (err: ApiError, result: ApiResponse) => void): TransportRequestCallback;
  getConnection(opts: TransportGetConnectionOptions): Connection | null;
  sniff(opts?: TransportSniffOptions, callback?: (...args: any[]) => void): void;
}
