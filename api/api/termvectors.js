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

function buildTermvectors (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [termvectors](http://www.elastic.co/guide/en/elasticsearch/reference/master/docs-termvectors.html) request
   *
   * @param {string} index - The index in which the document resides.
   * @param {string} type - The type of the document.
   * @param {string} id - The id of the document, when not specified a doc param should be supplied.
   * @param {boolean} term_statistics - Specifies if total term frequency and document frequency should be returned.
   * @param {boolean} field_statistics - Specifies if document count, sum of document frequencies and sum of total term frequencies should be returned.
   * @param {list} fields - A comma-separated list of fields to return.
   * @param {boolean} offsets - Specifies if term offsets should be returned.
   * @param {boolean} positions - Specifies if term positions should be returned.
   * @param {boolean} payloads - Specifies if term payloads should be returned.
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random).
   * @param {string} routing - Specific routing value.
   * @param {string} parent - Parent id of documents.
   * @param {boolean} realtime - Specifies if request is real-time as opposed to near-real-time (default: true).
   * @param {number} version - Explicit version number for concurrency control
   * @param {enum} version_type - Specific version type
   * @param {object} body - Define parameters and or supply a document to get termvectors for. See documentation.
   */

  const acceptedQuerystring = [
    'term_statistics',
    'field_statistics',
    'fields',
    'offsets',
    'positions',
    'payloads',
    'preference',
    'routing',
    'parent',
    'realtime',
    'version',
    'version_type',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    termStatistics: 'term_statistics',
    fieldStatistics: 'field_statistics',
    versionType: 'version_type',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function termvectors (params, options, callback) {
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
    if (params['type'] == null) {
      const err = new ConfigurationError('Missing required parameter: type')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, index, type, id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null && (id) != null) {
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + encodeURIComponent(id) + '/' + '_termvectors'
    } else {
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_termvectors'
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

module.exports = buildTermvectors
