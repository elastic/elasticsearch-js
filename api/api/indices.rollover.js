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

function buildIndicesRollover (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [indices.rollover](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-rollover-index.html) request
   *
   * @param {string} alias - The name of the alias to rollover
   * @param {string} new_index - The name of the rollover index
   * @param {boolean} include_type_name - Whether a type should be included in the body of the mappings.
   * @param {time} timeout - Explicit operation timeout
   * @param {boolean} dry_run - If set to true the rollover action will only be validated but not actually performed even if a condition matches. The default is false
   * @param {time} master_timeout - Specify timeout for connection to master
   * @param {string} wait_for_active_shards - Set the number of active shards to wait for on the newly created rollover index before the operation returns.
   * @param {object} body - The conditions that needs to be met for executing rollover
   */

  const acceptedQuerystring = [
    'include_type_name',
    'timeout',
    'dry_run',
    'master_timeout',
    'wait_for_active_shards',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    includeTypeName: 'include_type_name',
    dryRun: 'dry_run',
    masterTimeout: 'master_timeout',
    waitForActiveShards: 'wait_for_active_shards',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function indicesRollover (params, options, callback) {
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
    if (params['alias'] == null) {
      const err = new ConfigurationError('Missing required parameter: alias')
      return handleError(err, callback)
    }

    // check required url components
    if ((params['new_index'] != null || params['newIndex'] != null) && (params['alias'] == null)) {
      const err = new ConfigurationError('Missing required parameter of the url: alias')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, alias, newIndex, new_index, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((alias) != null && (new_index || newIndex) != null) {
      path = '/' + encodeURIComponent(alias) + '/' + '_rollover' + '/' + encodeURIComponent(new_index || newIndex)
    } else {
      path = '/' + encodeURIComponent(alias) + '/' + '_rollover'
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

module.exports = buildIndicesRollover
