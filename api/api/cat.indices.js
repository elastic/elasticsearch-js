// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildCatIndices (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [cat.indices](http://www.elastic.co/guide/en/elasticsearch/reference/master/cat-indices.html) request
   *
   * @param {list} index - A comma-separated list of index names to limit the returned information
   * @param {string} format - a short version of the Accept header, e.g. json, yaml
   * @param {enum} bytes - The unit in which to display byte values
   * @param {boolean} local - Return local information, do not retrieve the state from master node (default: false)
   * @param {time} master_timeout - Explicit operation timeout for connection to master node
   * @param {list} h - Comma-separated list of column names to display
   * @param {enum} health - A health status ("green", "yellow", or "red" to filter only indices matching the specified health status
   * @param {boolean} help - Return help information
   * @param {boolean} pri - Set to true to return stats only for primary shards
   * @param {list} s - Comma-separated list of column names or column aliases to sort by
   * @param {boolean} v - Verbose mode. Display column headers
   * @param {boolean} include_unloaded_segments - If set to true segment stats will include stats for segments that are not currently loaded into memory
   */

  const acceptedQuerystring = [
    'format',
    'bytes',
    'local',
    'master_timeout',
    'h',
    'health',
    'help',
    'pri',
    's',
    'v',
    'include_unloaded_segments',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    masterTimeout: 'master_timeout',
    includeUnloadedSegments: 'include_unloaded_segments',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function catIndices (params, options, callback) {
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
    if (params.body != null) {
      const err = new ConfigurationError('This API does not require a body')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, index, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'GET'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null) {
      path = '/' + '_cat' + '/' + 'indices' + '/' + encodeURIComponent(index)
    } else {
      path = '/' + '_cat' + '/' + 'indices'
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

module.exports = buildCatIndices
