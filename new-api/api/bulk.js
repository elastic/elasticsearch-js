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
const acceptedQuerystring = ['wait_for_active_shards', 'refresh', 'routing', 'timeout', 'type', '_source', '_source_excludes', '_source_exclude', '_source_includes', '_source_include', 'pipeline', 'require_alias', 'pretty', 'human', 'error_trace', 'source', 'filter_path']

const snakeCase = { waitForActiveShards: 'wait_for_active_shards', _sourceExcludes: '_source_excludes', _sourceExclude: '_source_exclude', _sourceIncludes: '_source_includes', _sourceInclude: '_source_include', requireAlias: 'require_alias', errorTrace: 'error_trace', filterPath: 'filter_path' }

function handleError (err, callback) {
  if (callback) {
    process.nextTick(callback, err, { body: null, statusCode: null, headers: null, warnings: null })
    return { then: noop, catch: noop, abort: noop }
  }
  return Promise.reject(err)
}

function snakeCaseKeys (acceptedQuerystring, snakeCase, querystring, warnings) {
  var target = {}
  var keys = Object.keys(querystring)
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i]
    target[snakeCase[key] || key] = querystring[key]
    if (acceptedQuerystring.indexOf(snakeCase[key] || key) === -1) {
      warnings.push('Client - Unknown parameter: "' + key + '", sending it as query parameter')
    }
  }
  return target
}

function noop () {}

function bulkApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: body')
    return handleError(err, callback)
  }

  // check required url components
  if (params['type'] != null && (params['index'] == null)) {
    const err = new Error('Missing required parameter of the url: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, type, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null && (type) != null) {
    if (method == null) method = 'POST'
    path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_bulk'
  } else if ((index) != null) {
    if (method == null) method = 'POST'
    path = '/' + encodeURIComponent(index) + '/' + '_bulk'
  } else {
    if (method == null) method = 'POST'
    path = '/' + '_bulk'
  }

  // build request object
  const request = {
    method,
    path,
    bulkBody: body,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

module.exports = bulkApi
