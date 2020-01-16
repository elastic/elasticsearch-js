// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { ConnectionPool, CloudConnectionPool } from './pool';
import Connection from './Connection';
import Serializer from './Serializer';

export interface nodeSelectorFn {
  (connections: Connection[]): Connection;
}

export interface nodeFilterFn {
  (connection: Connection): boolean;
}

export interface generateRequestIdFn {
  (params: TransportRequestParams, options: TransportRequestOptions): any;
}

declare type noopFn = (...args: any[]) => void;
declare type emitFn = (event: string | symbol, ...args: any[]) => boolean;

interface TransportOptions {
  emit: emitFn & noopFn;
  connectionPool: ConnectionPool | CloudConnectionPool;
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
  generateRequestId?: generateRequestIdFn;
  name: string;
  opaqueIdPrefix?: string;
}

export interface RequestEvent<T = any, C = any> {
  body: T;
  statusCode: number | null;
  headers: anyObject | null;
  warnings: string[] | null;
  meta: {
    context: C;
    name: string;
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
export interface ApiResponse<T = any, C = any> extends RequestEvent<T, C> {}

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
  ignore?: number[];
  requestTimeout?: number | string;
  maxRetries?: number;
  asStream?: boolean;
  headers?: anyObject;
  querystring?: anyObject;
  compression?: string;
  id?: any;
  context?: any;
  warnings?: [string];
  opaqueId?: string;
}

export interface TransportRequestCallback {
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
  emit: emitFn & noopFn;
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
  request(params: TransportRequestParams, options?: TransportRequestOptions): Promise<ApiResponse>;
  request(params: TransportRequestParams, options?: TransportRequestOptions, callback?: (err: Error | null, result: ApiResponse) => void): TransportRequestCallback;
  getConnection(opts: TransportGetConnectionOptions): Connection | null;
  sniff(opts?: TransportSniffOptions, callback?: (...args: any[]) => void): void;
}

export {};
