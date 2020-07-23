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

function buildClusterHealth (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [cluster.health](http://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-health.html) request
   *
   * @param {list} index - Limit the information returned to a specific index
   * @param {enum} level - Specify the level of detail for returned information
   * @param {boolean} local - Return local information, do not retrieve the state from master node (default: false)
   * @param {time} master_timeout - Explicit operation timeout for connection to master node
   * @param {time} timeout - Explicit operation timeout
   * @param {string} wait_for_active_shards - Wait until the specified number of shards is active
   * @param {string} wait_for_nodes - Wait until the specified number of nodes is available
   * @param {enum} wait_for_events - Wait until all currently queued events with the given priority are processed
   * @param {boolean} wait_for_no_relocating_shards - Whether to wait until there are no relocating shards in the cluster
   * @param {boolean} wait_for_no_initializing_shards - Whether to wait until there are no initializing shards in the cluster
   * @param {enum} wait_for_status - Wait until cluster is in a specific state
   */

  const acceptedQuerystring = [
    'level',
    'local',
    'master_timeout',
    'timeout',
    'wait_for_active_shards',
    'wait_for_nodes',
    'wait_for_events',
    'wait_for_no_relocating_shards',
    'wait_for_no_initializing_shards',
    'wait_for_status',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    masterTimeout: 'master_timeout',
    waitForActiveShards: 'wait_for_active_shards',
    waitForNodes: 'wait_for_nodes',
    waitForEvents: 'wait_for_events',
    waitForNoRelocatingShards: 'wait_for_no_relocating_shards',
    waitForNoInitializingShards: 'wait_for_no_initializing_shards',
    waitForStatus: 'wait_for_status',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function clusterHealth (params, options, callback) {
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
      path = '/' + '_cluster' + '/' + 'health' + '/' + encodeURIComponent(index)
    } else {
      path = '/' + '_cluster' + '/' + 'health'
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

module.exports = buildClusterHealth
