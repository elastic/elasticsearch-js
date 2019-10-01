// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildIndex (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'wait_for_active_shards',
    'op_type',
    'refresh',
    'routing',
    'timeout',
    'version',
    'version_type',
    'if_seq_no',
    'if_primary_term',
    'pipeline',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    waitForActiveShards: 'wait_for_active_shards',
    opType: 'op_type',
    versionType: 'version_type',
    ifSeqNo: 'if_seq_no',
    ifPrimaryTerm: 'if_primary_term',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  /**
   * Perform a index request
   * Creates or updates a document in an index.
   * https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-index_.html
   */
  return function _index (params, options, callback) {
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
    if (params['body'] == null) {
      const err = new ConfigurationError('Missing required parameter: body')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, id, index, type, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null && (id) != null) {
      if (method == null) method = 'PUT'
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + encodeURIComponent(id)
    } else if ((index) != null && (id) != null) {
      if (method == null) method = 'PUT'
      path = '/' + encodeURIComponent(index) + '/' + '_doc' + '/' + encodeURIComponent(id)
    } else if ((index) != null && (type) != null) {
      if (method == null) method = 'POST'
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type)
    } else {
      if (method == null) method = 'POST'
      path = '/' + encodeURIComponent(index) + '/' + '_doc'
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

module.exports = buildIndex
