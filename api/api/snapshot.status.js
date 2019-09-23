// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildSnapshotStatus (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'master_timeout',
    'ignore_unavailable',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    masterTimeout: 'master_timeout',
    ignoreUnavailable: 'ignore_unavailable',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  /**
   * Perform a snapshot.status request
   * Returns information about the status of a snapshot.
   * https://www.elastic.co/guide/en/elasticsearch/reference/master/modules-snapshots.html
   */
  return function snapshotStatus (params, options, callback) {
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
    if (params['snapshot'] != null && (params['repository'] == null)) {
      const err = new ConfigurationError('Missing required parameter of the url: repository')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, repository, snapshot, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((repository) != null && (snapshot) != null) {
      if (method == null) method = 'GET'
      path = '/' + '_snapshot' + '/' + encodeURIComponent(repository) + '/' + encodeURIComponent(snapshot) + '/' + '_status'
    } else if ((repository) != null) {
      if (method == null) method = 'GET'
      path = '/' + '_snapshot' + '/' + encodeURIComponent(repository) + '/' + '_status'
    } else {
      if (method == null) method = 'GET'
      path = '/' + '_snapshot' + '/' + '_status'
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

module.exports = buildSnapshotStatus
