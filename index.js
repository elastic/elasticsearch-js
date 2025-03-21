/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const {
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
} = require('@elastic/transport')

const { default: Client } = require('./lib/client')
const { default: SniffingTransport } = require('./lib/sniffingTransport')

module.exports = {
  Client,
  SniffingTransport,
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
}
