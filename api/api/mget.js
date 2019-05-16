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

function buildMget (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [mget](http://www.elastic.co/guide/en/elasticsearch/reference/master/docs-multi-get.html) request
   *
   * @param {string} index - The name of the index
   * @param {string} type - The type of the document
   * @param {list} stored_fields - A comma-separated list of stored fields to return in the response
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random)
   * @param {boolean} realtime - Specify whether to perform the operation in realtime or search mode
   * @param {boolean} refresh - Refresh the shard containing the document before performing the operation
   * @param {string} routing - Specific routing value
   * @param {list} _source - True or false to return the _source field or not, or a list of fields to return
   * @param {list} _source_excludes - A list of fields to exclude from the returned _source field
   * @param {list} _source_includes - A list of fields to extract and return from the _source field
   * @param {object} body - Document identifiers; can be either `docs` (containing full document information) or `ids` (when index and type is provided in the URL.
   */

  const acceptedQuerystring = [
    'stored_fields',
    'preference',
    'realtime',
    'refresh',
    'routing',
    '_source',
    '_source_excludes',
    '_source_exclude',
    '_source_includes',
    '_source_include',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    storedFields: 'stored_fields',
    _sourceExcludes: '_source_excludes',
    _sourceExclude: '_source_exclude',
    _sourceIncludes: '_source_includes',
    _sourceInclude: '_source_include',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function mget (params, options, callback) {
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

    // check required url components
    if (params['type'] != null && (params['index'] == null)) {
      const err = new ConfigurationError('Missing required parameter of the url: index')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, index, type, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null) {
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_mget'
    } else if ((index) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_mget'
    } else {
      path = '/' + '_mget'
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

module.exports = buildMget
