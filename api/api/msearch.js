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
const acceptedQuerystring = ['search_type', 'max_concurrent_searches', 'typed_keys', 'pre_filter_shard_size', 'max_concurrent_shard_requests', 'rest_total_hits_as_int', 'ccs_minimize_roundtrips', 'pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { searchType: 'search_type', maxConcurrentSearches: 'max_concurrent_searches', typedKeys: 'typed_keys', preFilterShardSize: 'pre_filter_shard_size', maxConcurrentShardRequests: 'max_concurrent_shard_requests', restTotalHitsAsInt: 'rest_total_hits_as_int', ccsMinimizeRoundtrips: 'ccs_minimize_roundtrips', errorTrace: 'error_trace', filterPath: 'filter_path' }

function msearchApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

<<<<<<< HEAD
    // check required parameters
    if (params['body'] == null) {
      const err = new ConfigurationError('Missing required parameter: body')
      return handleError(err, callback)
    }

    // check required url components
    if (params['type'] != null && (params['index'] == null)) {
      const err = new ConfigurationError('Missing required parameter of the url: index')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, index, type, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null) {
      if (method == null) method = body == null ? 'GET' : 'POST'
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_msearch'
    } else if ((index) != null) {
      if (method == null) method = body == null ? 'GET' : 'POST'
      path = '/' + encodeURIComponent(index) + '/' + '_msearch'
    } else {
      if (method == null) method = body == null ? 'GET' : 'POST'
      path = '/' + '_msearch'
    }

    // build request object
    const request = {
      method,
      path,
      bulkBody: body,
      querystring
    }
=======
  var path = ''
  if ((index) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + encodeURIComponent(index) + '/' + '_msearch'
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_msearch'
  }
>>>>>>> a064f0f3... Improve child performances (#1314)

  // build request object
  const request = {
    method,
    path,
    bulkBody: body,
    querystring
  }

  return this.transport.request(request, options, callback)
}

module.exports = msearchApi
