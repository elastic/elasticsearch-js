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

function buildIndicesPutSettings (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [indices.put_settings](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-update-settings.html) request
   *
   * @param {list} index - A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices
   * @param {time} master_timeout - Specify timeout for connection to master
   * @param {time} timeout - Explicit operation timeout
   * @param {boolean} preserve_existing - Whether to update existing settings. If set to `true` existing settings on an index remain unchanged, the default is `false`
   * @param {boolean} ignore_unavailable - Whether specified concrete indices should be ignored when unavailable (missing or closed)
   * @param {boolean} allow_no_indices - Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
   * @param {enum} expand_wildcards - Whether to expand wildcard expression to concrete indices that are open, closed or both.
   * @param {boolean} flat_settings - Return settings in flat format (default: false)
   * @param {object} body - The index settings to be updated
   */

  const acceptedQuerystring = [
    'master_timeout',
    'timeout',
    'preserve_existing',
    'ignore_unavailable',
    'allow_no_indices',
    'expand_wildcards',
    'flat_settings',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    masterTimeout: 'master_timeout',
    preserveExisting: 'preserve_existing',
    ignoreUnavailable: 'ignore_unavailable',
    allowNoIndices: 'allow_no_indices',
    expandWildcards: 'expand_wildcards',
    flatSettings: 'flat_settings',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function indicesPutSettings (params, options, callback) {
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
    var { method, body, index, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'PUT'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_settings'
    } else {
      path = '/' + '_settings'
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

module.exports = buildIndicesPutSettings
