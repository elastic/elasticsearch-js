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

function buildIndicesPutTemplate (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [indices.put_template](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-templates.html) request
   *
   * @param {string} name - The name of the template
   * @param {boolean} include_type_name - Whether a type should be returned in the body of the mappings.
   * @param {number} order - The order for this template when merging multiple matching ones (higher numbers are merged later, overriding the lower numbers)
   * @param {boolean} create - Whether the index template should only be added if new or can also replace an existing one
   * @param {time} timeout - Explicit operation timeout
   * @param {time} master_timeout - Specify timeout for connection to master
   * @param {boolean} flat_settings - Return settings in flat format (default: false)
   * @param {object} body - The template definition
   */

  const acceptedQuerystring = [
    'include_type_name',
    'order',
    'create',
    'timeout',
    'master_timeout',
    'flat_settings',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    includeTypeName: 'include_type_name',
    masterTimeout: 'master_timeout',
    flatSettings: 'flat_settings',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function indicesPutTemplate (params, options, callback) {
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
    if (params['name'] == null) {
      const err = new ConfigurationError('Missing required parameter: name')
      return handleError(err, callback)
    }
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
    var { method, body, name, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'PUT'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    path = '/' + '_template' + '/' + encodeURIComponent(name)

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

module.exports = buildIndicesPutTemplate
