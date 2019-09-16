// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildReindexRethrottle (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'requests_per_second',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    requestsPerSecond: 'requests_per_second',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  /**
   * Perform a reindex_rethrottle request
   * Changes the number of requests per second for a particular Reindex operation.
   * https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-reindex.html
   */
  return function reindexRethrottle (params, options, callback) {
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
    if (params['task_id'] == null && params['taskId'] == null) {
      const err = new ConfigurationError('Missing required parameter: task_id or taskId')
      return handleError(err, callback)
    }
    if (params['requests_per_second'] == null && params['requestsPerSecond'] == null) {
      const err = new ConfigurationError('Missing required parameter: requests_per_second or requestsPerSecond')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, taskId, task_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if (method == null) method = 'POST'
    path = '/' + '_reindex' + '/' + encodeURIComponent(task_id || taskId) + '/' + '_rethrottle'

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

module.exports = buildReindexRethrottle
