// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { ApiResponse } from './Transport'

export declare class ElasticsearchClientError extends Error {
  name: string;
  message: string;
}

export declare class TimeoutError<TResponse = Record<string, any>, TContext = unknown> extends ElasticsearchClientError {
  name: string;
  message: string;
  meta: ApiResponse<TResponse, TContext>;
  constructor(message: string, meta: ApiResponse);
}

export declare class ConnectionError<TResponse = Record<string, any>, TContext = unknown> extends ElasticsearchClientError {
  name: string;
  message: string;
  meta: ApiResponse<TResponse, TContext>;
  constructor(message: string, meta: ApiResponse);
}

export declare class NoLivingConnectionsError<TResponse = Record<string, any>, TContext = unknown> extends ElasticsearchClientError {
  name: string;
  message: string;
  meta: ApiResponse<TResponse, TContext>;
  constructor(message: string, meta: ApiResponse);
}

export declare class SerializationError extends ElasticsearchClientError {
  name: string;
  message: string;
  data: any;
  constructor(message: string, data: any);
}

export declare class DeserializationError extends ElasticsearchClientError {
  name: string;
  message: string;
  data: string;
  constructor(message: string, data: string);
}

export declare class ConfigurationError extends ElasticsearchClientError {
  name: string;
  message: string;
  constructor(message: string);
}

export declare class ResponseError<TResponse = Record<string, any>, TContext = unknown> extends ElasticsearchClientError {
  name: string;
  message: string;
  meta: ApiResponse<TResponse, TContext>;
  body: TResponse;
  statusCode: number;
  headers: Record<string, any>;
  constructor(meta: ApiResponse);
}

export declare class RequestAbortedError<TResponse = Record<string, any>, TContext = unknown> extends ElasticsearchClientError {
  name: string;
  message: string;
  meta: ApiResponse<TResponse, TContext>;
  constructor(message: string, meta: ApiResponse);
}