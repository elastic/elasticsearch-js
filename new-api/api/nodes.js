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
const acceptedQuerystring = ['interval', 'snapshots', 'threads', 'ignore_idle_threads', 'type', 'timeout', 'pretty', 'human', 'error_trace', 'source', 'filter_path', 'flat_settings', 'completion_fields', 'fielddata_fields', 'fields', 'groups', 'level', 'types', 'include_segment_file_sizes']

const snakeCase = { ignoreIdleThreads: 'ignore_idle_threads', errorTrace: 'error_trace', filterPath: 'filter_path', flatSettings: 'flat_settings', completionFields: 'completion_fields', fielddataFields: 'fielddata_fields', includeSegmentFileSizes: 'include_segment_file_sizes' }

function handleError (err, callback) {
  if (callback) {
    process.nextTick(callback, err, { body: null, statusCode: null, headers: null, warnings: null })
    return { then: noop, catch: noop, abort: noop }
  }
  return Promise.reject(err)
}

function snakeCaseKeys (acceptedQuerystring, snakeCase, querystring, warnings) {
  var target = {}
  var keys = Object.keys(querystring)
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i]
    target[snakeCase[key] || key] = querystring[key]
    if (acceptedQuerystring.indexOf(snakeCase[key] || key) === -1) {
      warnings.push('Client - Unknown parameter: "' + key + '", sending it as query parameter')
    }
  }
  return target
}

function noop () {}

function Nodes (transport) {
  this.transport = transport
}

Nodes.prototype.hotThreads = function nodesHotThreadsApi (params, options, callback) {
  options = options || {}
  if (typeof options === 'function') {
    callback = options
    options = {}
  }
  if (typeof params === 'function' || params == null) {
    callback = params
    params = {}
    options = {}
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, nodeId, node_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((node_id || nodeId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'hot_threads'
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

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Nodes.prototype.info = function nodesInfoApi (params, options, callback) {
  options = options || {}
  if (typeof options === 'function') {
    callback = options
    options = {}
  }
  if (typeof params === 'function' || params == null) {
    callback = params
    params = {}
    options = {}
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, nodeId, node_id, metric, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

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

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Nodes.prototype.reloadSecureSettings = function nodesReloadSecureSettingsApi (params, options, callback) {
  options = options || {}
  if (typeof options === 'function') {
    callback = options
    options = {}
  }
  if (typeof params === 'function' || params == null) {
    callback = params
    params = {}
    options = {}
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, nodeId, node_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

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

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Nodes.prototype.stats = function nodesStatsApi (params, options, callback) {
  options = options || {}
  if (typeof options === 'function') {
    callback = options
    options = {}
  }
  if (typeof params === 'function' || params == null) {
    callback = params
    params = {}
    options = {}
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, nodeId, node_id, metric, indexMetric, index_metric, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

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

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Nodes.prototype.usage = function nodesUsageApi (params, options, callback) {
  options = options || {}
  if (typeof options === 'function') {
    callback = options
    options = {}
  }
  if (typeof params === 'function' || params == null) {
    callback = params
    params = {}
    options = {}
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, nodeId, node_id, metric, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

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

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

module.exports = Nodes
