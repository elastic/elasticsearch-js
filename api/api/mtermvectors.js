// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
const acceptedQuerystring = ['ids', 'term_statistics', 'field_statistics', 'fields', 'offsets', 'positions', 'payloads', 'preference', 'routing', 'realtime', 'version', 'version_type', 'pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { termStatistics: 'term_statistics', fieldStatistics: 'field_statistics', versionType: 'version_type', errorTrace: 'error_trace', filterPath: 'filter_path' }

function mtermvectorsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((index) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + encodeURIComponent(index) + '/' + '_mtermvectors'
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_mtermvectors'
  }

<<<<<<< HEAD
  /**
   * Perform a mtermvectors request
   * Returns multiple termvectors in one request.
   * https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-multi-termvectors.html
   */
  return function mtermvectors (params, options, callback) {
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
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_mtermvectors'
    } else if ((index) != null) {
      if (method == null) method = body == null ? 'GET' : 'POST'
      path = '/' + encodeURIComponent(index) + '/' + '_mtermvectors'
    } else {
      if (method == null) method = body == null ? 'GET' : 'POST'
      path = '/' + '_mtermvectors'
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

module.exports = mtermvectorsApi
