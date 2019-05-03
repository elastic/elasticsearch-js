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

function buildIndicesGetFieldMapping (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [indices.get_field_mapping](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-get-field-mapping.html) request
   *
   * @param {list} index - A comma-separated list of index names
   * @param {list} type - A comma-separated list of document types
   * @param {list} fields - A comma-separated list of fields
   * @param {boolean} include_type_name - Whether a type should be returned in the body of the mappings.
   * @param {boolean} include_defaults - Whether the default mapping values should be returned as well
   * @param {boolean} ignore_unavailable - Whether specified concrete indices should be ignored when unavailable (missing or closed)
   * @param {boolean} allow_no_indices - Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
   * @param {enum} expand_wildcards - Whether to expand wildcard expression to concrete indices that are open, closed or both.
   * @param {boolean} local - Return local information, do not retrieve the state from master node (default: false)
   */

  const acceptedQuerystring = [
    'include_type_name',
    'include_defaults',
    'ignore_unavailable',
    'allow_no_indices',
    'expand_wildcards',
    'local',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    includeTypeName: 'include_type_name',
    includeDefaults: 'include_defaults',
    ignoreUnavailable: 'ignore_unavailable',
    allowNoIndices: 'allow_no_indices',
    expandWildcards: 'expand_wildcards',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function indicesGetFieldMapping (params, options, callback) {
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
    if (params['fields'] == null) {
      const err = new ConfigurationError('Missing required parameter: fields')
      return handleError(err, callback)
    }
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
    var { method, body, index, type, fields, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'GET'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null && (fields) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_mapping' + '/' + encodeURIComponent(type) + '/' + 'field' + '/' + encodeURIComponent(fields)
    } else if ((index) != null && (fields) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_mapping' + '/' + 'field' + '/' + encodeURIComponent(fields)
    } else if ((type) != null && (fields) != null) {
      path = '/' + '_mapping' + '/' + encodeURIComponent(type) + '/' + 'field' + '/' + encodeURIComponent(fields)
    } else {
      path = '/' + '_mapping' + '/' + 'field' + '/' + encodeURIComponent(fields)
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

module.exports = buildIndicesGetFieldMapping
