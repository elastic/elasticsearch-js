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
const acceptedQuerystring = ['pretty', 'human', 'error_trace', 'source', 'filter_path', 'interval', 'snapshots', 'threads', 'ignore_idle_threads', 'type', 'sort', 'timeout', 'flat_settings', 'completion_fields', 'fielddata_fields', 'fields', 'groups', 'level', 'types', 'include_segment_file_sizes', 'include_unloaded_segments']
const snakeCase = { errorTrace: 'error_trace', filterPath: 'filter_path', ignoreIdleThreads: 'ignore_idle_threads', flatSettings: 'flat_settings', completionFields: 'completion_fields', fielddataFields: 'fielddata_fields', includeSegmentFileSizes: 'include_segment_file_sizes', includeUnloadedSegments: 'include_unloaded_segments' }

function NodesApi (transport, ConfigurationError) {
  this.transport = transport
  this[kConfigurationError] = ConfigurationError
}

NodesApi.prototype.clearRepositoriesMeteringArchive = function nodesClearRepositoriesMeteringArchiveApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.node_id == null && params.nodeId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: node_id or nodeId')
    return handleError(err, callback)
  }
  if (params.max_archive_version == null && params.maxArchiveVersion == null) {
    const err = new this[kConfigurationError]('Missing required parameter: max_archive_version or maxArchiveVersion')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.max_archive_version != null || params.maxArchiveVersion != null) && ((params.node_id == null && params.nodeId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: node_id')
    return handleError(err, callback)
  }

  let { method, body, nodeId, node_id, maxArchiveVersion, max_archive_version, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + '_repositories_metering' + '/' + encodeURIComponent(max_archive_version || maxArchiveVersion)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

NodesApi.prototype.getRepositoriesMeteringInfo = function nodesGetRepositoriesMeteringInfoApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.node_id == null && params.nodeId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: node_id or nodeId')
    return handleError(err, callback)
  }

  let { method, body, nodeId, node_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'GET'
  path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + '_repositories_metering'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

NodesApi.prototype.hotThreads = function nodesHotThreadsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, nodeId, node_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((node_id || nodeId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'hot_threads'
  } else if ((node_id || nodeId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_cluster' + '/' + 'nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'hotthreads'
  } else if ((node_id || nodeId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'hotthreads'
  } else if ((node_id || nodeId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_cluster' + '/' + 'nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'hot_threads'
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + 'hot_threads'
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

NodesApi.prototype.info = function nodesInfoApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, nodeId, node_id, metric, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((node_id || nodeId) != null && (metric) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + encodeURIComponent(metric)
  } else if ((node_id || nodeId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId)
  } else if ((metric) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + encodeURIComponent(metric)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_nodes'
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

NodesApi.prototype.reloadSecureSettings = function nodesReloadSecureSettingsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, nodeId, node_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((node_id || nodeId) != null) {
    if (method == null) method = 'POST'
    path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'reload_secure_settings'
  } else {
    if (method == null) method = 'POST'
    path = '/' + '_nodes' + '/' + 'reload_secure_settings'
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

NodesApi.prototype.stats = function nodesStatsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, nodeId, node_id, metric, indexMetric, index_metric, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((node_id || nodeId) != null && (metric) != null && (index_metric || indexMetric) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'stats' + '/' + encodeURIComponent(metric) + '/' + encodeURIComponent(index_metric || indexMetric)
  } else if ((node_id || nodeId) != null && (metric) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'stats' + '/' + encodeURIComponent(metric)
  } else if ((metric) != null && (index_metric || indexMetric) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + 'stats' + '/' + encodeURIComponent(metric) + '/' + encodeURIComponent(index_metric || indexMetric)
  } else if ((node_id || nodeId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'stats'
  } else if ((metric) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + 'stats' + '/' + encodeURIComponent(metric)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + 'stats'
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

NodesApi.prototype.usage = function nodesUsageApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, nodeId, node_id, metric, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((node_id || nodeId) != null && (metric) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'usage' + '/' + encodeURIComponent(metric)
  } else if ((node_id || nodeId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'usage'
  } else if ((metric) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + 'usage' + '/' + encodeURIComponent(metric)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + 'usage'
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

Object.defineProperties(NodesApi.prototype, {
  clear_repositories_metering_archive: { get () { return this.clearRepositoriesMeteringArchive } },
  get_repositories_metering_info: { get () { return this.getRepositoriesMeteringInfo } },
  hot_threads: { get () { return this.hotThreads } },
  reload_secure_settings: { get () { return this.reloadSecureSettings } }
})

module.exports = NodesApi
