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
const acceptedQuerystring = ['pretty', 'human', 'error_trace', 'source', 'filter_path', 'debug', 'active', 'version', 'if_seq_no', 'if_primary_term', 'metric', 'emit_stacktraces']
const snakeCase = { errorTrace: 'error_trace', filterPath: 'filter_path', ifSeqNo: 'if_seq_no', ifPrimaryTerm: 'if_primary_term', emitStacktraces: 'emit_stacktraces' }

function WatcherApi (transport, ConfigurationError) {
  this.transport = transport
  this[kConfigurationError] = ConfigurationError
}

WatcherApi.prototype.ackWatch = function watcherAckWatchApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.watch_id == null && params.watchId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: watch_id or watchId')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.action_id != null || params.actionId != null) && ((params.watch_id == null && params.watchId == null))) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: watch_id')
    return handleError(err, callback)
  }

  let { method, body, watchId, watch_id, actionId, action_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((watch_id || watchId) != null && (action_id || actionId) != null) {
    if (method == null) method = 'PUT'
    path = '/' + '_watcher' + '/' + 'watch' + '/' + encodeURIComponent(watch_id || watchId) + '/' + '_ack' + '/' + encodeURIComponent(action_id || actionId)
  } else {
    if (method == null) method = 'PUT'
    path = '/' + '_watcher' + '/' + 'watch' + '/' + encodeURIComponent(watch_id || watchId) + '/' + '_ack'
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

WatcherApi.prototype.activateWatch = function watcherActivateWatchApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.watch_id == null && params.watchId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: watch_id or watchId')
    return handleError(err, callback)
  }

  let { method, body, watchId, watch_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_watcher' + '/' + 'watch' + '/' + encodeURIComponent(watch_id || watchId) + '/' + '_activate'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

WatcherApi.prototype.deactivateWatch = function watcherDeactivateWatchApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.watch_id == null && params.watchId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: watch_id or watchId')
    return handleError(err, callback)
  }

  let { method, body, watchId, watch_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_watcher' + '/' + 'watch' + '/' + encodeURIComponent(watch_id || watchId) + '/' + '_deactivate'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

WatcherApi.prototype.deleteWatch = function watcherDeleteWatchApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.id == null) {
    const err = new this[kConfigurationError]('Missing required parameter: id')
    return handleError(err, callback)
  }

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_watcher' + '/' + 'watch' + '/' + encodeURIComponent(id)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

WatcherApi.prototype.executeWatch = function watcherExecuteWatchApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((id) != null) {
    if (method == null) method = 'PUT'
    path = '/' + '_watcher' + '/' + 'watch' + '/' + encodeURIComponent(id) + '/' + '_execute'
  } else {
    if (method == null) method = 'PUT'
    path = '/' + '_watcher' + '/' + 'watch' + '/' + '_execute'
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

WatcherApi.prototype.getWatch = function watcherGetWatchApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.id == null) {
    const err = new this[kConfigurationError]('Missing required parameter: id')
    return handleError(err, callback)
  }

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'GET'
  path = '/' + '_watcher' + '/' + 'watch' + '/' + encodeURIComponent(id)

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

WatcherApi.prototype.putWatch = function watcherPutWatchApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.id == null) {
    const err = new this[kConfigurationError]('Missing required parameter: id')
    return handleError(err, callback)
  }

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_watcher' + '/' + 'watch' + '/' + encodeURIComponent(id)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

WatcherApi.prototype.queryWatches = function watcherQueryWatchesApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = body == null ? 'GET' : 'POST'
  path = '/' + '_watcher' + '/' + '_query' + '/' + 'watches'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

WatcherApi.prototype.start = function watcherStartApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_watcher' + '/' + '_start'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

WatcherApi.prototype.stats = function watcherStatsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, metric, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((metric) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_watcher' + '/' + 'stats' + '/' + encodeURIComponent(metric)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_watcher' + '/' + 'stats'
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

WatcherApi.prototype.stop = function watcherStopApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_watcher' + '/' + '_stop'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

Object.defineProperties(WatcherApi.prototype, {
  ack_watch: { get () { return this.ackWatch } },
  activate_watch: { get () { return this.activateWatch } },
  deactivate_watch: { get () { return this.deactivateWatch } },
  delete_watch: { get () { return this.deleteWatch } },
  execute_watch: { get () { return this.executeWatch } },
  get_watch: { get () { return this.getWatch } },
  put_watch: { get () { return this.putWatch } },
  query_watches: { get () { return this.queryWatches } }
})

module.exports = WatcherApi
