// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildBulk (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'wait_for_active_shards',
    'refresh',
    'routing',
    'timeout',
    'type',
    '_source',
    '_source_excludes',
    '_source_exclude',
    '_source_includes',
    '_source_include',
    'pipeline',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    waitForActiveShards: 'wait_for_active_shards',
    _sourceExcludes: '_source_excludes',
    _sourceExclude: '_source_exclude',
    _sourceIncludes: '_source_includes',
    _sourceInclude: '_source_include',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  /**
   * Perform a bulk request
   * Allows to perform multiple index/update/delete operations in a single request.
   * https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-bulk.html
   */
  return function bulk (params, options, callback) {
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

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null) {
      if (method == null) method = 'POST'
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_bulk'
    } else if ((index) != null) {
      if (method == null) method = 'POST'
      path = '/' + encodeURIComponent(index) + '/' + '_bulk'
    } else {
      if (method == null) method = 'POST'
      path = '/' + '_bulk'
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

module.exports = buildBulk
