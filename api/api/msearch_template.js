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

function buildMsearchTemplate (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError } = opts
  /**
   * Perform a [msearch_template](http://www.elastic.co/guide/en/elasticsearch/reference/current/search-multi-search.html) request
   *
   * @param {list} index - A comma-separated list of index names to use as default
   * @param {list} type - A comma-separated list of document types to use as default
   * @param {enum} search_type - Search operation type
   * @param {boolean} typed_keys - Specify whether aggregation and suggester names should be prefixed by their respective types in the response
   * @param {number} max_concurrent_searches - Controls the maximum number of concurrent searches the multi search api will execute
   * @param {boolean} rest_total_hits_as_int - Indicates whether hits.total should be rendered as an integer or an object in the rest search response
   * @param {boolean} ccs_minimize_roundtrips - Indicates whether network round-trips should be minimized as part of cross-cluster search requests execution
   * @param {object} body - The request definitions (metadata-search request definition pairs), separated by newlines
   */

  const acceptedQuerystring = [
    'search_type',
    'typed_keys',
    'max_concurrent_searches',
    'rest_total_hits_as_int',
    'ccs_minimize_roundtrips',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    searchType: 'search_type',
    typedKeys: 'typed_keys',
    maxConcurrentSearches: 'max_concurrent_searches',
    restTotalHitsAsInt: 'rest_total_hits_as_int',
    ccsMinimizeRoundtrips: 'ccs_minimize_roundtrips',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function msearchTemplate (params, options, callback) {
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
    if (params['body'] == null) {
      const err = new ConfigurationError('Missing required parameter: body')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = null
    var { method, body, index, type } = params
    var querystring = semicopy(params, ['method', 'body', 'index', 'type'])

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    if ((index) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_msearch' + '/' + 'template'
    } else {
      path = '/' + '_msearch' + '/' + 'template'
    }

    // build request object
    const request = {
      method,
      path,
      bulkBody: body,
      querystring
    }

    const requestOptions = {
      ignore,
      requestTimeout: options.requestTimeout || null,
      maxRetries: options.maxRetries || null,
      asStream: options.asStream || false,
      headers: options.headers || null,
      querystring: options.querystring || null,
      compression: options.compression || false,
      warnings
    }

    return makeRequest(request, requestOptions, callback)

    function semicopy (obj, exclude) {
      var target = {}
      var keys = Object.keys(obj)
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i]
        if (exclude.indexOf(key) === -1) {
          target[snakeCase[key] || key] = obj[key]
          if (acceptedQuerystring.indexOf(snakeCase[key] || key) === -1) {
            warnings = warnings || []
            warnings.push('Client - Unknown parameter: "' + key + '", sending it as query parameter')
          }
        }
      }
      return target
    }
  }
}

module.exports = buildMsearchTemplate
