// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildSnapshotRestore (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [snapshot.restore](http://www.elastic.co/guide/en/elasticsearch/reference/master/modules-snapshots.html) request
   *
   * @param {string} repository - A repository name
   * @param {string} snapshot - A snapshot name
   * @param {time} master_timeout - Explicit operation timeout for connection to master node
   * @param {boolean} wait_for_completion - Should this request wait until the operation has completed before returning
   * @param {object} body - Details of what to restore
   */

  const acceptedQuerystring = [
    'master_timeout',
    'wait_for_completion',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    masterTimeout: 'master_timeout',
    waitForCompletion: 'wait_for_completion',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function snapshotRestore (params, options, callback) {
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
    if (params['repository'] == null) {
      const err = new ConfigurationError('Missing required parameter: repository')
      return handleError(err, callback)
    }
    if (params['snapshot'] == null) {
      const err = new ConfigurationError('Missing required parameter: snapshot')
      return handleError(err, callback)
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

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    path = '/' + '_snapshot' + '/' + encodeURIComponent(repository) + '/' + encodeURIComponent(snapshot) + '/' + '_restore'

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

module.exports = buildSnapshotRestore
