// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildCatTransforms (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'from',
    'size',
    'allow_no_match',
    'format',
    'h',
    'help',
    's',
    'time',
    'v'
  ]

  const snakeCase = {
    allowNoMatch: 'allow_no_match'

  }

  /**
   * Perform a cat.transforms request
   * Gets configuration and usage information about transforms.
   * https://www.elastic.co/guide/en/elasticsearch/reference/current/cat-transforms.html
   */
  return function catTransforms (params, options, callback) {
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
    var { method, body, transformId, transform_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((transform_id || transformId) != null) {
      if (method == null) method = 'GET'
      path = '/' + '_cat' + '/' + 'transforms' + '/' + encodeURIComponent(transform_id || transformId)
    } else {
      if (method == null) method = 'GET'
      path = '/' + '_cat' + '/' + 'transforms'
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

module.exports = buildCatTransforms
