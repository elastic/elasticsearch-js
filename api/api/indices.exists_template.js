// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildIndicesExistsTemplate (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
<<<<<<< HEAD
  /**
   * Perform a [indices.exists_template](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-templates.html) request
   *
   * @param {list} name - The comma separated names of the index templates
   * @param {boolean} flat_settings - Return settings in flat format (default: false)
   * @param {time} master_timeout - Explicit operation timeout for connection to master node
   * @param {boolean} local - Return local information, do not retrieve the state from master node (default: false)
   */
=======
>>>>>>> 69247496... Update code generation (#969)

  const acceptedQuerystring = [
    'flat_settings',
    'master_timeout',
    'local',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    flatSettings: 'flat_settings',
    masterTimeout: 'master_timeout',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  /**
   * Perform a indices.exists_template request
   * Returns information about whether a particular index template exists.
   * https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-templates.html
   */
  return function indicesExistsTemplate (params, options, callback) {
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
    if (params['name'] == null) {
      const err = new ConfigurationError('Missing required parameter: name')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, name, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if (method == null) method = 'HEAD'
    path = '/' + '_template' + '/' + encodeURIComponent(name)

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

module.exports = buildIndicesExistsTemplate
