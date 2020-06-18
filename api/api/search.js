// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildSearch (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'analyzer',
    'analyze_wildcard',
    'ccs_minimize_roundtrips',
    'default_operator',
    'df',
    'explain',
    'stored_fields',
    'docvalue_fields',
    'from',
    'ignore_unavailable',
    'ignore_throttled',
    'allow_no_indices',
    'expand_wildcards',
    'lenient',
    'preference',
    'q',
    'routing',
    'scroll',
    'search_type',
    'size',
    'sort',
    '_source',
    '_source_excludes',
    '_source_exclude',
    '_source_includes',
    '_source_include',
    'terminate_after',
    'stats',
    'suggest_field',
    'suggest_mode',
    'suggest_size',
    'suggest_text',
    'timeout',
    'track_scores',
    'track_total_hits',
    'allow_partial_search_results',
    'typed_keys',
    'version',
    'seq_no_primary_term',
    'request_cache',
    'batched_reduce_size',
    'max_concurrent_shard_requests',
    'pre_filter_shard_size',
    'rest_total_hits_as_int',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    analyzeWildcard: 'analyze_wildcard',
    ccsMinimizeRoundtrips: 'ccs_minimize_roundtrips',
    defaultOperator: 'default_operator',
    storedFields: 'stored_fields',
    docvalueFields: 'docvalue_fields',
    ignoreUnavailable: 'ignore_unavailable',
    ignoreThrottled: 'ignore_throttled',
    allowNoIndices: 'allow_no_indices',
    expandWildcards: 'expand_wildcards',
    searchType: 'search_type',
    _sourceExcludes: '_source_excludes',
    _sourceExclude: '_source_exclude',
    _sourceIncludes: '_source_includes',
    _sourceInclude: '_source_include',
    terminateAfter: 'terminate_after',
    suggestField: 'suggest_field',
    suggestMode: 'suggest_mode',
    suggestSize: 'suggest_size',
    suggestText: 'suggest_text',
    trackScores: 'track_scores',
    trackTotalHits: 'track_total_hits',
    allowPartialSearchResults: 'allow_partial_search_results',
    typedKeys: 'typed_keys',
    seqNoPrimaryTerm: 'seq_no_primary_term',
    requestCache: 'request_cache',
    batchedReduceSize: 'batched_reduce_size',
    maxConcurrentShardRequests: 'max_concurrent_shard_requests',
    preFilterShardSize: 'pre_filter_shard_size',
    restTotalHitsAsInt: 'rest_total_hits_as_int',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  /**
   * Perform a search request
   * Returns results matching a query.
   * https://www.elastic.co/guide/en/elasticsearch/reference/master/search-search.html
   */
  return function search (params, options, callback) {
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
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_search'
    } else if ((index) != null) {
      if (method == null) method = body == null ? 'GET' : 'POST'
      path = '/' + encodeURIComponent(index) + '/' + '_search'
    } else {
      if (method == null) method = body == null ? 'GET' : 'POST'
      path = '/' + '_search'
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

module.exports = buildSearch
