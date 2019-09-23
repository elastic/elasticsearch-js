// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildIndicesForcemerge (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'flush',
    'ignore_unavailable',
    'allow_no_indices',
    'expand_wildcards',
    'max_num_segments',
    'only_expunge_deletes',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    ignoreUnavailable: 'ignore_unavailable',
    allowNoIndices: 'allow_no_indices',
    expandWildcards: 'expand_wildcards',
    maxNumSegments: 'max_num_segments',
    onlyExpungeDeletes: 'only_expunge_deletes',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  /**
   * Perform a indices.forcemerge request
   * Performs the force merge operation on one or more indices.
   * https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-forcemerge.html
   */
  return function indicesForcemerge (params, options, callback) {
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
      if (method == null) method = 'POST'
      path = '/' + encodeURIComponent(index) + '/' + '_forcemerge'
    } else {
      if (method == null) method = 'POST'
      path = '/' + '_forcemerge'
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

module.exports = buildIndicesForcemerge
