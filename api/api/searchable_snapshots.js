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
const acceptedQuerystring = ['pretty', 'human', 'error_trace', 'source', 'filter_path', 'ignore_unavailable', 'allow_no_indices', 'expand_wildcards', 'index', 'master_timeout', 'wait_for_completion', 'storage', 'level']
const snakeCase = { errorTrace: 'error_trace', filterPath: 'filter_path', ignoreUnavailable: 'ignore_unavailable', allowNoIndices: 'allow_no_indices', expandWildcards: 'expand_wildcards', masterTimeout: 'master_timeout', waitForCompletion: 'wait_for_completion' }

function SearchableSnapshotsApi (transport, ConfigurationError) {
  this.transport = transport
  this[kConfigurationError] = ConfigurationError
}

SearchableSnapshotsApi.prototype.cacheStats = function searchableSnapshotsCacheStatsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, nodeId, node_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((node_id || nodeId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_searchable_snapshots' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'cache' + '/' + 'stats'
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_searchable_snapshots' + '/' + 'cache' + '/' + 'stats'
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

SearchableSnapshotsApi.prototype.clearCache = function searchableSnapshotsClearCacheApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((index) != null) {
    if (method == null) method = 'POST'
    path = '/' + encodeURIComponent(index) + '/' + '_searchable_snapshots' + '/' + 'cache' + '/' + 'clear'
  } else {
    if (method == null) method = 'POST'
    path = '/' + '_searchable_snapshots' + '/' + 'cache' + '/' + 'clear'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SearchableSnapshotsApi.prototype.mount = function searchableSnapshotsMountApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.repository == null) {
    const err = new this[kConfigurationError]('Missing required parameter: repository')
    return handleError(err, callback)
  }
  if (params.snapshot == null) {
    const err = new this[kConfigurationError]('Missing required parameter: snapshot')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  // check required url components
  if (params.snapshot != null && (params.repository == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: repository')
    return handleError(err, callback)
  }

  let { method, body, repository, snapshot, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_snapshot' + '/' + encodeURIComponent(repository) + '/' + encodeURIComponent(snapshot) + '/' + '_mount'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SearchableSnapshotsApi.prototype.stats = function searchableSnapshotsStatsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((index) != null) {
    if (method == null) method = 'GET'
    path = '/' + encodeURIComponent(index) + '/' + '_searchable_snapshots' + '/' + 'stats'
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_searchable_snapshots' + '/' + 'stats'
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

Object.defineProperties(SearchableSnapshotsApi.prototype, {
  cache_stats: { get () { return this.cacheStats } },
  clear_cache: { get () { return this.clearCache } }
})

module.exports = SearchableSnapshotsApi
