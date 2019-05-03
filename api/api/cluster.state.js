/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildClusterState (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [cluster.state](http://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-state.html) request
   *
   * @param {list} index - A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices
   * @param {list} metric - Limit the information returned to the specified metrics
   * @param {boolean} local - Return local information, do not retrieve the state from master node (default: false)
   * @param {time} master_timeout - Specify timeout for connection to master
   * @param {boolean} flat_settings - Return settings in flat format (default: false)
   * @param {number} wait_for_metadata_version - Wait for the metadata version to be equal or greater than the specified metadata version
   * @param {time} wait_for_timeout - The maximum time to wait for wait_for_metadata_version before timing out
   * @param {boolean} ignore_unavailable - Whether specified concrete indices should be ignored when unavailable (missing or closed)
   * @param {boolean} allow_no_indices - Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
   * @param {enum} expand_wildcards - Whether to expand wildcard expression to concrete indices that are open, closed or both.
   */

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

    // check required parameters
    if (params.body != null) {
      const err = new ConfigurationError('This API does not require a body')
      return handleError(err, callback)
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
    var { method, body, index, metric, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'GET'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((metric) != null && (index) != null) {
      path = '/' + '_cluster' + '/' + 'state' + '/' + encodeURIComponent(metric) + '/' + encodeURIComponent(index)
    } else if ((metric) != null) {
      path = '/' + '_cluster' + '/' + 'state' + '/' + encodeURIComponent(metric)
    } else {
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
