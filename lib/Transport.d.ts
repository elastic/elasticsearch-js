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

import ConnectionPool from './ConnectionPool';
import Connection from './Connection';
import Serializer from './Serializer';

export interface nodeSelectorFn {
  (connections: Connection[]): Connection;
}

export interface nodeFilterFn {
  (connection: Connection): boolean;
}

declare type noopFn = (...args: any[]) => void;
declare type emitFn = (event: string | symbol, ...args: any[]) => boolean;

interface TransportOptions {
  emit: emitFn & noopFn;
  connectionPool: ConnectionPool;
  serializer: Serializer;
  maxRetries: number;
  requestTimeout: number | string;
  suggestCompression: boolean;
  compression?: 'gzip';
  sniffInterval: number;
  sniffOnConnectionFault: boolean;
  sniffEndpoint: string;
  sniffOnStart: boolean;
  nodeFilter?: nodeFilterFn;
  nodeSelector?: string | nodeSelectorFn;
  headers?: anyObject;
}

export interface RequestEvent<T = any> {
  body: any;
  statusCode: number | null;
  headers: anyObject | null;
  warnings: string[] | null;
  meta: {
    request: {
      params: TransportRequestParams;
      options: TransportRequestOptions;
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
export interface ApiResponse<T = any> extends RequestEvent<T> {}

declare type anyObject = {
  [key: string]: any;
};

export interface TransportRequestParams {
  method: string;
  path: string;
  body?: anyObject;
  bulkBody?: anyObject;
  querystring?: anyObject;
}

export interface TransportRequestOptions {
  ignore?: [number];
  requestTimeout?: number | string;
  maxRetries?: number;
  asStream?: boolean;
  headers?: anyObject;
  querystring?: anyObject;
  compression?: string;
  warnings?: [string];
}

export interface TransportRequestCallback {
  abort: () => void;
}

export default class Transport {
  static sniffReasons: {
    SNIFF_ON_START: string;
    SNIFF_INTERVAL: string;
    SNIFF_ON_CONNECTION_FAULT: string;
    DEFAULT: string;
  };
  emit: emitFn & noopFn;
  connectionPool: ConnectionPool;
  serializer: Serializer;
  maxRetries: number;
  requestTimeout: number;
  suggestCompression: boolean;
  compression: 'gzip' | false;
  sniffInterval: number;
  sniffOnConnectionFault: boolean;
  sniffEndpoint: string;
  _sniffEnabled: boolean;
  _nextSniff: number;
  _isSniffing: boolean;
  constructor(opts: TransportOptions);
  request(params: TransportRequestParams, options?: TransportRequestOptions): Promise<ApiResponse>;
  request(params: TransportRequestParams, options?: TransportRequestOptions, callback?: (err: Error | null, result: ApiResponse) => void): TransportRequestCallback;
  getConnection(): Connection | null;
  sniff(callback?: (...args: any[]) => void): void;
}

export {};
