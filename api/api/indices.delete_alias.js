// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildIndicesDeleteAlias (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [indices.delete_alias](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-aliases.html) request
   *
   * @param {list} index - A comma-separated list of index names (supports wildcards); use `_all` for all indices
   * @param {list} name - A comma-separated list of aliases to delete (supports wildcards); use `_all` to delete all aliases for the specified indices.
   * @param {time} timeout - Explicit timestamp for the document
   * @param {time} master_timeout - Specify timeout for connection to master
   */

  const acceptedQuerystring = [
    'timeout',
    'master_timeout',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    masterTimeout: 'master_timeout',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function indicesDeleteAlias (params, options, callback) {
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
    if (params['name'] == null) {
      const err = new ConfigurationError('Missing required parameter: name')
      return handleError(err, callback)
    }
    if (params.body != null) {
      const err = new ConfigurationError('This API does not require a body')
      return handleError(err, callback)
    }

    // check required url components
    if (params['name'] != null && (params['index'] == null)) {
      const err = new ConfigurationError('Missing required parameter of the url: index')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, index, name, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'DELETE'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (name) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_alias' + '/' + encodeURIComponent(name)
    } else {
      path = '/' + encodeURIComponent(index) + '/' + '_aliases' + '/' + encodeURIComponent(name)
    }

    // build request object
    const request = {
      method,
      path,
      body: '',
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildIndicesDeleteAlias
