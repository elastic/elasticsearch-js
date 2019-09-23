// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildClusterState (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'local',
    'master_timeout',
    'flat_settings',
    'wait_for_metadata_version',
    'wait_for_timeout',
    'ignore_unavailable',
    'allow_no_indices',
    'expand_wildcards',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    masterTimeout: 'master_timeout',
    flatSettings: 'flat_settings',
    waitForMetadataVersion: 'wait_for_metadata_version',
    waitForTimeout: 'wait_for_timeout',
    ignoreUnavailable: 'ignore_unavailable',
    allowNoIndices: 'allow_no_indices',
    expandWildcards: 'expand_wildcards',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  /**
   * Perform a cluster.state request
   * Returns a comprehensive information about the state of the cluster.
   * https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-state.html
   */
  return function clusterState (params, options, callback) {
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
    if (params['index'] != null && (params['metric'] == null)) {
      const err = new ConfigurationError('Missing required parameter of the url: metric')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, metric, index, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((metric) != null && (index) != null) {
      if (method == null) method = 'GET'
      path = '/' + '_cluster' + '/' + 'state' + '/' + encodeURIComponent(metric) + '/' + encodeURIComponent(index)
    } else if ((metric) != null) {
      if (method == null) method = 'GET'
      path = '/' + '_cluster' + '/' + 'state' + '/' + encodeURIComponent(metric)
    } else {
      if (method == null) method = 'GET'
      path = '/' + '_cluster' + '/' + 'state'
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

module.exports = buildClusterState
