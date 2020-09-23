// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
const acceptedQuerystring = ['analyzer', 'analyze_wildcard', 'default_operator', 'df', 'from', 'ignore_unavailable', 'allow_no_indices', 'conflicts', 'expand_wildcards', 'lenient', 'pipeline', 'preference', 'q', 'routing', 'scroll', 'search_type', 'search_timeout', 'max_docs', 'sort', '_source', '_source_excludes', '_source_exclude', '_source_includes', '_source_include', 'terminate_after', 'stats', 'version', 'version_type', 'request_cache', 'refresh', 'timeout', 'wait_for_active_shards', 'scroll_size', 'wait_for_completion', 'requests_per_second', 'slices', 'pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { analyzeWildcard: 'analyze_wildcard', defaultOperator: 'default_operator', ignoreUnavailable: 'ignore_unavailable', allowNoIndices: 'allow_no_indices', expandWildcards: 'expand_wildcards', searchType: 'search_type', searchTimeout: 'search_timeout', maxDocs: 'max_docs', _sourceExcludes: '_source_excludes', _sourceExclude: '_source_exclude', _sourceIncludes: '_source_includes', _sourceInclude: '_source_include', terminateAfter: 'terminate_after', versionType: 'version_type', requestCache: 'request_cache', waitForActiveShards: 'wait_for_active_shards', scrollSize: 'scroll_size', waitForCompletion: 'wait_for_completion', requestsPerSecond: 'requests_per_second', errorTrace: 'error_trace', filterPath: 'filter_path' }

<<<<<<< HEAD
  const acceptedQuerystring = [
    'analyzer',
    'analyze_wildcard',
    'default_operator',
    'df',
    'from',
    'ignore_unavailable',
    'allow_no_indices',
    'conflicts',
    'expand_wildcards',
    'lenient',
    'pipeline',
    'preference',
    'q',
    'routing',
    'scroll',
    'search_type',
    'search_timeout',
    'size',
    'max_docs',
    'sort',
    '_source',
    '_source_excludes',
    '_source_exclude',
    '_source_includes',
    '_source_include',
    'terminate_after',
    'stats',
    'version',
    'version_type',
    'request_cache',
    'refresh',
    'timeout',
    'wait_for_active_shards',
    'scroll_size',
    'wait_for_completion',
    'requests_per_second',
    'slices',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    analyzeWildcard: 'analyze_wildcard',
    defaultOperator: 'default_operator',
    ignoreUnavailable: 'ignore_unavailable',
    allowNoIndices: 'allow_no_indices',
    expandWildcards: 'expand_wildcards',
    searchType: 'search_type',
    searchTimeout: 'search_timeout',
    maxDocs: 'max_docs',
    _sourceExcludes: '_source_excludes',
    _sourceExclude: '_source_exclude',
    _sourceIncludes: '_source_includes',
    _sourceInclude: '_source_include',
    terminateAfter: 'terminate_after',
    versionType: 'version_type',
    requestCache: 'request_cache',
    waitForActiveShards: 'wait_for_active_shards',
    scrollSize: 'scroll_size',
    waitForCompletion: 'wait_for_completion',
    requestsPerSecond: 'requests_per_second',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
=======
function updateByQueryApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['index'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: index')
    return handleError(err, callback)
>>>>>>> a064f0f3... Improve child performances (#1314)
  }

  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + encodeURIComponent(index) + '/' + '_update_by_query'

<<<<<<< HEAD
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
      if (method == null) method = 'POST'
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_update_by_query'
    } else {
      if (method == null) method = 'POST'
      path = '/' + encodeURIComponent(index) + '/' + '_update_by_query'
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
=======
  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
>>>>>>> a064f0f3... Improve child performances (#1314)
  }

  return this.transport.request(request, options, callback)
}

module.exports = updateByQueryApi
