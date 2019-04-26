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

function buildIndex (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError } = opts
  /**
   * Perform a [index](http://www.elastic.co/guide/en/elasticsearch/reference/master/docs-index_.html) request
   *
   * @param {string} id - Document ID
   * @param {string} index - The name of the index
   * @param {string} type - The type of the document
   * @param {string} wait_for_active_shards - Sets the number of shard copies that must be active before proceeding with the index operation. Defaults to 1, meaning the primary shard only. Set to `all` for all shard copies, otherwise set to any non-negative value less than or equal to the total number of copies for the shard (number of replicas + 1)
   * @param {enum} op_type - Explicit operation type
   * @param {string} parent - ID of the parent document
   * @param {enum} refresh - If `true` then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` (the default) then do nothing with refreshes.
   * @param {string} routing - Specific routing value
   * @param {time} timeout - Explicit operation timeout
   * @param {number} version - Explicit version number for concurrency control
   * @param {enum} version_type - Specific version type
   * @param {number} if_seq_no - only perform the index operation if the last operation that has changed the document has the specified sequence number
   * @param {number} if_primary_term - only perform the index operation if the last operation that has changed the document has the specified primary term
   * @param {string} pipeline - The pipeline id to preprocess incoming documents with
   * @param {object} body - The document
   */

  const acceptedQuerystring = [
    'wait_for_active_shards',
    'op_type',
    'parent',
    'refresh',
    'routing',
    'timeout',
    'version',
    'version_type',
    'if_seq_no',
    'if_primary_term',
    'pipeline',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    waitForActiveShards: 'wait_for_active_shards',
    opType: 'op_type',
    versionType: 'version_type',
    ifSeqNo: 'if_seq_no',
    ifPrimaryTerm: 'if_primary_term',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function _index (params, options, callback) {
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
    if (params['body'] == null) {
      const err = new ConfigurationError('Missing required parameter: body')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = null
    var { method, body, id, index, type } = params
    var querystring = semicopy(params, ['method', 'body', 'id', 'index', 'type'])

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null && (id) != null) {
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + encodeURIComponent(id)
    } else if ((index) != null && (id) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_doc' + '/' + encodeURIComponent(id)
    } else if ((index) != null && (type) != null) {
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type)
    } else {
      path = '/' + encodeURIComponent(index) + '/' + '_doc'
    }

    // build request object
    const request = {
      method,
      path,
      body: body || '',
      querystring
    }

    const requestOptions = {
      ignore,
      requestTimeout: options.requestTimeout || null,
      maxRetries: options.maxRetries || null,
      asStream: options.asStream || false,
      headers: options.headers || null,
      querystring: options.querystring || null,
      compression: options.compression || false,
      warnings
    }

    return makeRequest(request, requestOptions, callback)

    function semicopy (obj, exclude) {
      var target = {}
      var keys = Object.keys(obj)
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i]
        if (exclude.indexOf(key) === -1) {
          target[snakeCase[key] || key] = obj[key]
          if (acceptedQuerystring.indexOf(snakeCase[key] || key) === -1) {
            warnings = warnings || []
            warnings.push('Client - Unknown parameter: "' + key + '", sending it as query parameter')
          }
        }
      }
      return target
    }
  }
}

module.exports = buildIndex
