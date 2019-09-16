// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildIndicesPutMapping (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'include_type_name',
    'timeout',
    'master_timeout',
    'ignore_unavailable',
    'allow_no_indices',
    'expand_wildcards',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    includeTypeName: 'include_type_name',
    masterTimeout: 'master_timeout',
    ignoreUnavailable: 'ignore_unavailable',
    allowNoIndices: 'allow_no_indices',
    expandWildcards: 'expand_wildcards',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  /**
   * Perform a indices.put_mapping request
   * Updates the index mappings.
   * https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-put-mapping.html
   */
  return function indicesPutMapping (params, options, callback) {
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
    var { method, body, index, type, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null) {
      if (method == null) method = 'PUT'
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_mapping'
    } else if ((index) != null && (type) != null) {
      if (method == null) method = 'PUT'
      path = '/' + encodeURIComponent(index) + '/' + '_mapping' + '/' + encodeURIComponent(type)
    } else if ((index) != null && (type) != null) {
      if (method == null) method = 'PUT'
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_mappings'
    } else if ((index) != null && (type) != null) {
      if (method == null) method = 'PUT'
      path = '/' + encodeURIComponent(index) + '/' + '_mappings' + '/' + encodeURIComponent(type)
    } else if ((index) != null) {
      if (method == null) method = 'PUT'
      path = '/' + encodeURIComponent(index) + '/' + '_mapping'
    } else if ((type) != null) {
      if (method == null) method = 'PUT'
      path = '/' + '_mappings' + '/' + encodeURIComponent(type)
    } else if ((index) != null) {
      if (method == null) method = 'PUT'
      path = '/' + encodeURIComponent(index) + '/' + '_mappings'
    } else {
      if (method == null) method = 'PUT'
      path = '/' + '_mapping' + '/' + encodeURIComponent(type)
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

module.exports = buildIndicesPutMapping
