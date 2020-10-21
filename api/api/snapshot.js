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

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
const acceptedQuerystring = ['master_timeout', 'timeout', 'pretty', 'human', 'error_trace', 'source', 'filter_path', 'wait_for_completion', 'verify', 'ignore_unavailable', 'verbose', 'local']
const snakeCase = { masterTimeout: 'master_timeout', errorTrace: 'error_trace', filterPath: 'filter_path', waitForCompletion: 'wait_for_completion', ignoreUnavailable: 'ignore_unavailable' }

function SnapshotApi (transport, ConfigurationError) {
  this.transport = transport
  this[kConfigurationError] = ConfigurationError
}

SnapshotApi.prototype.cleanupRepository = function snapshotCleanupRepositoryApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['repository'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: repository')
    return handleError(err, callback)
  }

  var { method, body, repository, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_snapshot' + '/' + encodeURIComponent(repository) + '/' + '_cleanup'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SnapshotApi.prototype.clone = function snapshotCloneApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['repository'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: repository')
    return handleError(err, callback)
  }
  if (params['snapshot'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: snapshot')
    return handleError(err, callback)
  }
  if (params['target_snapshot'] == null && params['targetSnapshot'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: target_snapshot or targetSnapshot')
    return handleError(err, callback)
  }
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  // check required url components
  if ((params['target_snapshot'] != null || params['targetSnapshot'] != null) && (params['snapshot'] == null || params['repository'] == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: snapshot, repository')
    return handleError(err, callback)
  } else if (params['snapshot'] != null && (params['repository'] == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: repository')
    return handleError(err, callback)
  }

  var { method, body, repository, snapshot, targetSnapshot, target_snapshot, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_snapshot' + '/' + encodeURIComponent(repository) + '/' + encodeURIComponent(snapshot) + '/' + '_clone' + '/' + encodeURIComponent(target_snapshot || targetSnapshot)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SnapshotApi.prototype.create = function snapshotCreateApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['repository'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: repository')
    return handleError(err, callback)
  }
  if (params['snapshot'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: snapshot')
    return handleError(err, callback)
  }

  // check required url components
  if (params['snapshot'] != null && (params['repository'] == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: repository')
    return handleError(err, callback)
  }

  var { method, body, repository, snapshot, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_snapshot' + '/' + encodeURIComponent(repository) + '/' + encodeURIComponent(snapshot)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SnapshotApi.prototype.createRepository = function snapshotCreateRepositoryApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['repository'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: repository')
    return handleError(err, callback)
  }
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  var { method, body, repository, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_snapshot' + '/' + encodeURIComponent(repository)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SnapshotApi.prototype.delete = function snapshotDeleteApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['repository'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: repository')
    return handleError(err, callback)
  }
  if (params['snapshot'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: snapshot')
    return handleError(err, callback)
  }

  // check required url components
  if (params['snapshot'] != null && (params['repository'] == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: repository')
    return handleError(err, callback)
  }

  var { method, body, repository, snapshot, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_snapshot' + '/' + encodeURIComponent(repository) + '/' + encodeURIComponent(snapshot)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SnapshotApi.prototype.deleteRepository = function snapshotDeleteRepositoryApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['repository'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: repository')
    return handleError(err, callback)
  }

  var { method, body, repository, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_snapshot' + '/' + encodeURIComponent(repository)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SnapshotApi.prototype.get = function snapshotGetApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['repository'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: repository')
    return handleError(err, callback)
  }
  if (params['snapshot'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: snapshot')
    return handleError(err, callback)
  }

  // check required url components
  if (params['snapshot'] != null && (params['repository'] == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: repository')
    return handleError(err, callback)
  }

  var { method, body, repository, snapshot, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'GET'
  path = '/' + '_snapshot' + '/' + encodeURIComponent(repository) + '/' + encodeURIComponent(snapshot)

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

SnapshotApi.prototype.getRepository = function snapshotGetRepositoryApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, repository, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((repository) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_snapshot' + '/' + encodeURIComponent(repository)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_snapshot'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

SnapshotApi.prototype.restore = function snapshotRestoreApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['repository'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: repository')
    return handleError(err, callback)
  }
  if (params['snapshot'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: snapshot')
    return handleError(err, callback)
  }

  // check required url components
  if (params['snapshot'] != null && (params['repository'] == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: repository')
    return handleError(err, callback)
  }

  var { method, body, repository, snapshot, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_snapshot' + '/' + encodeURIComponent(repository) + '/' + encodeURIComponent(snapshot) + '/' + '_restore'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SnapshotApi.prototype.status = function snapshotStatusApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required url components
  if (params['snapshot'] != null && (params['repository'] == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: repository')
    return handleError(err, callback)
  }

  var { method, body, repository, snapshot, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((repository) != null && (snapshot) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_snapshot' + '/' + encodeURIComponent(repository) + '/' + encodeURIComponent(snapshot) + '/' + '_status'
  } else if ((repository) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_snapshot' + '/' + encodeURIComponent(repository) + '/' + '_status'
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_snapshot' + '/' + '_status'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

SnapshotApi.prototype.verifyRepository = function snapshotVerifyRepositoryApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['repository'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: repository')
    return handleError(err, callback)
  }

  var { method, body, repository, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_snapshot' + '/' + encodeURIComponent(repository) + '/' + '_verify'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

Object.defineProperties(SnapshotApi.prototype, {
  cleanup_repository: { get () { return this.cleanupRepository } },
  create_repository: { get () { return this.createRepository } },
  delete_repository: { get () { return this.deleteRepository } },
  get_repository: { get () { return this.getRepository } },
  verify_repository: { get () { return this.verifyRepository } }
})

module.exports = SnapshotApi
