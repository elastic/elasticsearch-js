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

function buildMsearch (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [msearch](http://www.elastic.co/guide/en/elasticsearch/reference/master/search-multi-search.html) request
   *
   * @param {list} index - A comma-separated list of index names to use as default
   * @param {list} type - A comma-separated list of document types to use as default
   * @param {enum} search_type - Search operation type
   * @param {number} max_concurrent_searches - Controls the maximum number of concurrent searches the multi search api will execute
   * @param {boolean} typed_keys - Specify whether aggregation and suggester names should be prefixed by their respective types in the response
   * @param {number} pre_filter_shard_size - A threshold that enforces a pre-filter roundtrip to prefilter search shards based on query rewriting if the number of shards the search request expands to exceeds the threshold. This filter roundtrip can limit the number of shards significantly if for instance a shard can not match any documents based on it's rewrite method ie. if date filters are mandatory to match but the shard bounds and the query are disjoint.
   * @param {number} max_concurrent_shard_requests - The number of concurrent shard requests each sub search executes concurrently. This value should be used to limit the impact of the search on the cluster in order to limit the number of concurrent shard requests
   * @param {boolean} rest_total_hits_as_int - This parameter is ignored in this version. It is used in the next major version to control whether the rest response should render the total.hits as an object or a number
   * @param {object} body - The request definitions (metadata-search request definition pairs), separated by newlines
   */

  const acceptedQuerystring = [
    'search_type',
    'max_concurrent_searches',
    'typed_keys',
    'pre_filter_shard_size',
    'max_concurrent_shard_requests',
    'rest_total_hits_as_int',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    searchType: 'search_type',
    maxConcurrentSearches: 'max_concurrent_searches',
    typedKeys: 'typed_keys',
    preFilterShardSize: 'pre_filter_shard_size',
    maxConcurrentShardRequests: 'max_concurrent_shard_requests',
    restTotalHitsAsInt: 'rest_total_hits_as_int',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function msearch (params, options, callback) {
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

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null) {
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_msearch'
    } else if ((index) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_msearch'
    } else {
      path = '/' + '_msearch'
    }

    // build request object
    const request = {
      method,
      path,
      bulkBody: body,
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildMsearch
