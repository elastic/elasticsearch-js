// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildIndicesGetFieldMapping (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'include_type_name',
    'include_defaults',
    'ignore_unavailable',
    'allow_no_indices',
    'expand_wildcards',
    'local',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    includeTypeName: 'include_type_name',
    includeDefaults: 'include_defaults',
    ignoreUnavailable: 'ignore_unavailable',
    allowNoIndices: 'allow_no_indices',
    expandWildcards: 'expand_wildcards',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  /**
   * Perform a indices.get_field_mapping request
   * Returns mapping for one or more fields.
   * https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-get-field-mapping.html
   */
  return function indicesGetFieldMapping (params, options, callback) {
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
    if (params['fields'] == null) {
      const err = new ConfigurationError('Missing required parameter: fields')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, fields, index, type, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null && (fields) != null) {
      if (method == null) method = 'GET'
      path = '/' + encodeURIComponent(index) + '/' + '_mapping' + '/' + encodeURIComponent(type) + '/' + 'field' + '/' + encodeURIComponent(fields)
    } else if ((index) != null && (fields) != null) {
      if (method == null) method = 'GET'
      path = '/' + encodeURIComponent(index) + '/' + '_mapping' + '/' + 'field' + '/' + encodeURIComponent(fields)
    } else if ((type) != null && (fields) != null) {
      if (method == null) method = 'GET'
      path = '/' + '_mapping' + '/' + encodeURIComponent(type) + '/' + 'field' + '/' + encodeURIComponent(fields)
    } else {
      if (method == null) method = 'GET'
      path = '/' + '_mapping' + '/' + 'field' + '/' + encodeURIComponent(fields)
    }

    // build request object
    const request = {
      method,
      path,
      body: null,
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildIndicesGetFieldMapping
