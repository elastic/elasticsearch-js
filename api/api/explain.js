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

function buildExplain (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [explain](http://www.elastic.co/guide/en/elasticsearch/reference/master/search-explain.html) request
   *
   * @param {string} id - The document ID
   * @param {string} index - The name of the index
   * @param {string} type - The type of the document
   * @param {boolean} analyze_wildcard - Specify whether wildcards and prefix queries in the query string query should be analyzed (default: false)
   * @param {string} analyzer - The analyzer for the query string query
   * @param {enum} default_operator - The default operator for query string query (AND or OR)
   * @param {string} df - The default field for query string query (default: _all)
   * @param {list} stored_fields - A comma-separated list of stored fields to return in the response
   * @param {boolean} lenient - Specify whether format-based query failures (such as providing text to a numeric field) should be ignored
   * @param {string} parent - The ID of the parent document
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random)
   * @param {string} q - Query in the Lucene query string syntax
   * @param {string} routing - Specific routing value
   * @param {list} _source - True or false to return the _source field or not, or a list of fields to return
   * @param {list} _source_excludes - A list of fields to exclude from the returned _source field
   * @param {list} _source_includes - A list of fields to extract and return from the _source field
   * @param {object} body - The query definition using the Query DSL
   */

  const acceptedQuerystring = [
    'analyze_wildcard',
    'analyzer',
    'default_operator',
    'df',
    'stored_fields',
    'lenient',
    'parent',
    'preference',
    'q',
    'routing',
    '_source',
    '_source_excludes',
    '_source_includes',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    analyzeWildcard: 'analyze_wildcard',
    defaultOperator: 'default_operator',
    storedFields: 'stored_fields',
    _sourceExcludes: '_source_excludes',
    _sourceIncludes: '_source_includes',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function explain (params, options, callback) {
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

    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        explain(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
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
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null && (id) != null) {
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + encodeURIComponent(id) + '/' + '_explain'
    } else {
      path = '/' + encodeURIComponent(index) + '/' + '_explain' + '/' + encodeURIComponent(id)
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

module.exports = buildExplain
