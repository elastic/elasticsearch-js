/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import Client from './client'
import SniffingTransport from './sniffingTransport'

export {
  Client,
  SniffingTransport
}

// Re-export everything from @elastic/transport
export {
  Diagnostic,
  Transport,
  WeightedConnectionPool,
  ClusterConnectionPool,
  BaseConnectionPool,
  CloudConnectionPool,
  BaseConnection,
  HttpConnection,
  UndiciConnection,
  Serializer,
  errors,
  events
} from '@elastic/transport'

// Export types from @elastic/transport
export type {
  Connection,
  ConnectionOptions,
  ConnectionRequestParams,
  ConnectionRequestOptions,
  ConnectionRequestOptionsAsStream,
  ConnectionRequestResponse,
  ConnectionRequestResponseAsStream,
  ConnectionPoolOptions,
  GetConnectionOptions,
  TransportOptions,
  TransportRequestMetadata,
  TransportRequestParams,
  TransportRequestOptions,
  TransportRequestOptionsWithMeta,
  TransportRequestOptionsWithOutMeta,
  SniffOptions,
  RequestBody,
  RequestNDBody,
  DiagnosticResult,
  TransportResult,
  HttpAgentOptions,
  UndiciAgentOptions,
  ApiKeyAuth,
  BearerAuth
} from '@elastic/transport'

export * as estypes from './api/types'
