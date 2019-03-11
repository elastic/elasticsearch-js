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

function buildUpdate (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [update](http://www.elastic.co/guide/en/elasticsearch/reference/master/docs-update.html) request
   *
   * @param {string} id - Document ID
   * @param {string} index - The name of the index
   * @param {string} type - The type of the document
   * @param {string} wait_for_active_shards - Sets the number of shard copies that must be active before proceeding with the update operation. Defaults to 1, meaning the primary shard only. Set to `all` for all shard copies, otherwise set to any non-negative value less than or equal to the total number of copies for the shard (number of replicas + 1)
   * @param {list} _source - True or false to return the _source field or not, or a list of fields to return
   * @param {list} _source_excludes - A list of fields to exclude from the returned _source field
   * @param {list} _source_includes - A list of fields to extract and return from the _source field
   * @param {string} lang - The script language (default: painless)
   * @param {string} parent - ID of the parent document. Is is only used for routing and when for the upsert request
   * @param {enum} refresh - If `true` then refresh the effected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` (the default) then do nothing with refreshes.
   * @param {number} retry_on_conflict - Specify how many times should the operation be retried when a conflict occurs (default: 0)
   * @param {string} routing - Specific routing value
   * @param {time} timeout - Explicit operation timeout
   * @param {number} if_seq_no - only perform the update operation if the last operation that has changed the document has the specified sequence number
   * @param {number} if_primary_term - only perform the update operation if the last operation that has changed the document has the specified primary term
   * @param {object} body - The request definition requires either `script` or partial `doc`
   */

  const acceptedQuerystring = [
    'wait_for_active_shards',
    '_source',
    '_source_excludes',
    '_source_includes',
    'lang',
    'parent',
    'refresh',
    'retry_on_conflict',
    'routing',
    'timeout',
    'if_seq_no',
    'if_primary_term',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    waitForActiveShards: 'wait_for_active_shards',
    _sourceExcludes: '_source_excludes',
    _sourceIncludes: '_source_includes',
    retryOnConflict: 'retry_on_conflict',
    ifSeqNo: 'if_seq_no',
    ifPrimaryTerm: 'if_primary_term',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function update (params, options, callback) {
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
    if (params['id'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: id'),
        result
      )
    }
    if (params['index'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: index'),
        result
      )
    }
    if (params['body'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: body'),
        result
      )
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      return callback(
        new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`),
        result
      )
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
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + encodeURIComponent(id) + '/' + '_update'
    } else {
      path = '/' + encodeURIComponent(index) + '/' + '_update' + '/' + encodeURIComponent(id)
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

module.exports = buildUpdate
