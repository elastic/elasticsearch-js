// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildIndicesShrink (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [indices.shrink](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-shrink-index.html) request
   *
   * @param {string} index - The name of the source index to shrink
   * @param {string} target - The name of the target index to shrink into
   * @param {boolean} copy_settings - whether or not to copy settings from the source index (defaults to false)
   * @param {time} timeout - Explicit operation timeout
   * @param {time} master_timeout - Specify timeout for connection to master
   * @param {string} wait_for_active_shards - Set the number of active shards to wait for on the shrunken index before the operation returns.
   * @param {object} body - The configuration for the target index (`settings` and `aliases`)
   */

  const acceptedQuerystring = [
    'copy_settings',
    'timeout',
    'master_timeout',
    'wait_for_active_shards',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    copySettings: 'copy_settings',
    masterTimeout: 'master_timeout',
    waitForActiveShards: 'wait_for_active_shards',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function indicesShrink (params, options, callback) {
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
    if (params['index'] == null) {
      const err = new ConfigurationError('Missing required parameter: index')
      return handleError(err, callback)
    }
    if (params['target'] == null) {
      const err = new ConfigurationError('Missing required parameter: target')
      return handleError(err, callback)
    }

    // check required url components
    if (params['target'] != null && (params['index'] == null)) {
      const err = new ConfigurationError('Missing required parameter of the url: index')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, index, target, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'PUT'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    path = '/' + encodeURIComponent(index) + '/' + '_shrink' + '/' + encodeURIComponent(target)

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

module.exports = buildIndicesShrink
