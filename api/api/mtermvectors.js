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

function buildMtermvectors (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [mtermvectors](http://www.elastic.co/guide/en/elasticsearch/reference/master/docs-multi-termvectors.html) request
   *
   * @param {string} index - The index in which the document resides.
   * @param {string} type - The type of the document.
   * @param {list} ids - A comma-separated list of documents ids. You must define ids as parameter or set "ids" or "docs" in the request body
   * @param {boolean} term_statistics - Specifies if total term frequency and document frequency should be returned. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {boolean} field_statistics - Specifies if document count, sum of document frequencies and sum of total term frequencies should be returned. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {list} fields - A comma-separated list of fields to return. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {boolean} offsets - Specifies if term offsets should be returned. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {boolean} positions - Specifies if term positions should be returned. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {boolean} payloads - Specifies if term payloads should be returned. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random) .Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {string} routing - Specific routing value. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {string} parent - Parent id of documents. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {boolean} realtime - Specifies if requests are real-time as opposed to near-real-time (default: true).
   * @param {number} version - Explicit version number for concurrency control
   * @param {enum} version_type - Specific version type
   * @param {object} body - Define ids, documents, parameters or a list of parameters per document here. You must at least provide a list of document ids. See documentation.
   */

  const acceptedQuerystring = [
    'ids',
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

  return function mtermvectors (params, options, callback) {
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
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_mtermvectors'
    } else if ((index) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_mtermvectors'
    } else {
      path = '/' + '_mtermvectors'
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

module.exports = buildMtermvectors
