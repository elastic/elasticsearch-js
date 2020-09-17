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
const acceptedQuerystring = ['pretty', 'human', 'error_trace', 'source', 'filter_path', 'wait_for_completion_timeout', 'keep_alive', 'typed_keys', 'keep_on_completion', 'batched_reduce_size', 'request_cache', 'analyzer', 'analyze_wildcard', 'default_operator', 'df', 'explain', 'stored_fields', 'docvalue_fields', 'from', 'ignore_unavailable', 'ignore_throttled', 'allow_no_indices', 'expand_wildcards', 'lenient', 'preference', 'q', 'routing', 'search_type', 'size', 'sort', '_source', '_source_excludes', '_source_exclude', '_source_includes', '_source_include', 'terminate_after', 'stats', 'suggest_field', 'suggest_mode', 'suggest_size', 'suggest_text', 'timeout', 'track_scores', 'track_total_hits', 'allow_partial_search_results', 'version', 'seq_no_primary_term', 'max_concurrent_shard_requests']

const snakeCase = { errorTrace: 'error_trace', filterPath: 'filter_path', waitForCompletionTimeout: 'wait_for_completion_timeout', keepAlive: 'keep_alive', typedKeys: 'typed_keys', keepOnCompletion: 'keep_on_completion', batchedReduceSize: 'batched_reduce_size', requestCache: 'request_cache', analyzeWildcard: 'analyze_wildcard', defaultOperator: 'default_operator', storedFields: 'stored_fields', docvalueFields: 'docvalue_fields', ignoreUnavailable: 'ignore_unavailable', ignoreThrottled: 'ignore_throttled', allowNoIndices: 'allow_no_indices', expandWildcards: 'expand_wildcards', searchType: 'search_type', _sourceExcludes: '_source_excludes', _sourceExclude: '_source_exclude', _sourceIncludes: '_source_includes', _sourceInclude: '_source_include', terminateAfter: 'terminate_after', suggestField: 'suggest_field', suggestMode: 'suggest_mode', suggestSize: 'suggest_size', suggestText: 'suggest_text', trackScores: 'track_scores', trackTotalHits: 'track_total_hits', allowPartialSearchResults: 'allow_partial_search_results', seqNoPrimaryTerm: 'seq_no_primary_term', maxConcurrentShardRequests: 'max_concurrent_shard_requests' }

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

function AsyncSearch (transport) {
  this.transport = transport
}

AsyncSearch.prototype.delete = function asyncSearchDeleteApi (params, options, callback) {
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

  // check required parameters
  if (params['id'] == null) {
    const err = new Error('Missing required parameter: id')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'DELETE'
  path = '/' + '_async_search' + '/' + encodeURIComponent(id)

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

AsyncSearch.prototype.get = function asyncSearchGetApi (params, options, callback) {
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

  // check required parameters
  if (params['id'] == null) {
    const err = new Error('Missing required parameter: id')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'GET'
  path = '/' + '_async_search' + '/' + encodeURIComponent(id)

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

AsyncSearch.prototype.submit = function asyncSearchSubmitApi (params, options, callback) {
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
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null) {
    if (method == null) method = 'POST'
    path = '/' + encodeURIComponent(index) + '/' + '_async_search'
  } else {
    if (method == null) method = 'POST'
    path = '/' + '_async_search'
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

module.exports = AsyncSearch
