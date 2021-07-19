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

'use strict'

class ElasticsearchClientError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ElasticsearchClientError'
  }
}

class TimeoutError extends ElasticsearchClientError {
  constructor (message, meta) {
    super(message)
    Error.captureStackTrace(this, TimeoutError)
    this.name = 'TimeoutError'
    this.message = message || 'Timeout Error'
    this.meta = meta
  }
}

class ConnectionError extends ElasticsearchClientError {
  constructor (message, meta) {
    super(message)
    Error.captureStackTrace(this, ConnectionError)
    this.name = 'ConnectionError'
    this.message = message || 'Connection Error'
    this.meta = meta
  }
}

class NoLivingConnectionsError extends ElasticsearchClientError {
  constructor (message, meta) {
    super(message)
    Error.captureStackTrace(this, NoLivingConnectionsError)
    this.name = 'NoLivingConnectionsError'
    this.message = message || 'Given the configuration, the ConnectionPool was not able to find a usable Connection for this request.'
    this.meta = meta
  }
}

class SerializationError extends ElasticsearchClientError {
  constructor (message, data) {
    super(message, data)
    Error.captureStackTrace(this, SerializationError)
    this.name = 'SerializationError'
    this.message = message || 'Serialization Error'
    this.data = data
  }
}

class DeserializationError extends ElasticsearchClientError {
  constructor (message, data) {
    super(message, data)
    Error.captureStackTrace(this, DeserializationError)
    this.name = 'DeserializationError'
    this.message = message || 'Deserialization Error'
    this.data = data
  }
}

class ConfigurationError extends ElasticsearchClientError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, ConfigurationError)
    this.name = 'ConfigurationError'
    this.message = message || 'Configuration Error'
  }
}

class ResponseError extends ElasticsearchClientError {
  constructor (meta) {
    super('Response Error')
    Error.captureStackTrace(this, ResponseError)
    this.name = 'ResponseError'
    if (meta.body && meta.body.error && meta.body.error.type) {
      if (Array.isArray(meta.body.error.root_cause)) {
        this.message = meta.body.error.type + ': '
        this.message += meta.body.error.root_cause.map(entry => `[${entry.type}] Reason: ${entry.reason}`).join('; ')
      } else {
        this.message = meta.body.error.type
      }
    } else {
      this.message = 'Response Error'
    }
    this.meta = meta
  }

  get body () {
    return this.meta.body
  }

  get statusCode () {
    if (this.meta.body && typeof this.meta.body.status === 'number') {
      return this.meta.body.status
    }
    return this.meta.statusCode
  }

  get headers () {
    return this.meta.headers
  }

  toString () {
    return JSON.stringify(this.meta.body)
  }
}

class RequestAbortedError extends ElasticsearchClientError {
  constructor (message, meta) {
    super(message)
    Error.captureStackTrace(this, RequestAbortedError)
    this.name = 'RequestAbortedError'
    this.message = message || 'Request aborted'
    this.meta = meta
  }
}

class ProductNotSupportedError extends ElasticsearchClientError {
  constructor (meta) {
    super('Product Not Supported Error')
    Error.captureStackTrace(this, ProductNotSupportedError)
    this.name = 'ProductNotSupportedError'
    this.message = 'The client noticed that the server is not Elasticsearch and we do not support this unknown product.'
    this.meta = meta
  }
}

module.exports = {
  ElasticsearchClientError,
  TimeoutError,
  ConnectionError,
  NoLivingConnectionsError,
  SerializationError,
  DeserializationError,
  ConfigurationError,
  ResponseError,
  RequestAbortedError,
  ProductNotSupportedError
}
