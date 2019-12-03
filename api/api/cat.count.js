// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildCatCount (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'format',
    'h',
    'help',
    's',
    'v',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  /**
   * Perform a cat.count request
   * Provides quick access to the document count of the entire cluster, or individual indices.
   * https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-count.html
   */
  return function catCount (params, options, callback) {
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
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
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
      if (method == null) method = 'GET'
      path = '/' + '_cat' + '/' + 'count' + '/' + encodeURIComponent(index)
    } else {
      if (method == null) method = 'GET'
      path = '/' + '_cat' + '/' + 'count'
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

module.exports = buildCatCount
