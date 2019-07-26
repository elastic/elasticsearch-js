// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildSearchTemplate (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [search_template](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html) request
   *
   * @param {list} index - A comma-separated list of index names to search; use `_all` or empty string to perform the operation on all indices
   * @param {boolean} ignore_unavailable - Whether specified concrete indices should be ignored when unavailable (missing or closed)
   * @param {boolean} ignore_throttled - Whether specified concrete, expanded or aliased indices should be ignored when throttled
   * @param {boolean} allow_no_indices - Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
   * @param {enum} expand_wildcards - Whether to expand wildcard expression to concrete indices that are open, closed or both.
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random)
   * @param {list} routing - A comma-separated list of specific routing values
   * @param {time} scroll - Specify how long a consistent view of the index should be maintained for scrolled search
   * @param {enum} search_type - Search operation type
   * @param {boolean} explain - Specify whether to return detailed information about score computation as part of a hit
   * @param {boolean} profile - Specify whether to profile the query execution
   * @param {boolean} typed_keys - Specify whether aggregation and suggester names should be prefixed by their respective types in the response
   * @param {boolean} rest_total_hits_as_int - Indicates whether hits.total should be rendered as an integer or an object in the rest search response
   * @param {boolean} ccs_minimize_roundtrips - Indicates whether network round-trips should be minimized as part of cross-cluster search requests execution
   * @param {object} body - The search definition template and its params
   */

  const acceptedQuerystring = [
    'ignore_unavailable',
    'ignore_throttled',
    'allow_no_indices',
    'expand_wildcards',
    'preference',
    'routing',
    'scroll',
    'search_type',
    'explain',
    'profile',
    'typed_keys',
    'rest_total_hits_as_int',
    'ccs_minimize_roundtrips',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    ignoreUnavailable: 'ignore_unavailable',
    ignoreThrottled: 'ignore_throttled',
    allowNoIndices: 'allow_no_indices',
    expandWildcards: 'expand_wildcards',
    searchType: 'search_type',
    typedKeys: 'typed_keys',
    restTotalHitsAsInt: 'rest_total_hits_as_int',
    ccsMinimizeRoundtrips: 'ccs_minimize_roundtrips',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function searchTemplate (params, options, callback) {
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

    var warnings = []
    var { method, body, index, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_search' + '/' + 'template'
    } else {
      path = '/' + '_search' + '/' + 'template'
    }

    // build request object
    const request = {
      method,
      path,
      body: body || '',
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildSearchTemplate
