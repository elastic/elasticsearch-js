// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildIndicesRollover (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'include_type_name',
    'timeout',
    'dry_run',
    'master_timeout',
    'wait_for_active_shards',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    includeTypeName: 'include_type_name',
    dryRun: 'dry_run',
    masterTimeout: 'master_timeout',
    waitForActiveShards: 'wait_for_active_shards',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  /**
   * Perform a indices.rollover request
   * Updates an alias to point to a new index when the existing index
is considered to be too large or too old.
   * https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-rollover-index.html
   */
  return function indicesRollover (params, options, callback) {
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
    if (params['alias'] == null) {
      const err = new ConfigurationError('Missing required parameter: alias')
      return handleError(err, callback)
    }

    // check required url components
    if ((params['new_index'] != null || params['newIndex'] != null) && (params['alias'] == null)) {
      const err = new ConfigurationError('Missing required parameter of the url: alias')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, alias, newIndex, new_index, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((alias) != null && (new_index || newIndex) != null) {
      if (method == null) method = 'POST'
      path = '/' + encodeURIComponent(alias) + '/' + '_rollover' + '/' + encodeURIComponent(new_index || newIndex)
    } else {
      if (method == null) method = 'POST'
      path = '/' + encodeURIComponent(alias) + '/' + '_rollover'
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

module.exports = buildIndicesRollover
