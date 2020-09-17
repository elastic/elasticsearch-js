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
const acceptedQuerystring = ['pretty', 'human', 'error_trace', 'source', 'filter_path', 'wait_for_completion']

const snakeCase = { errorTrace: 'error_trace', filterPath: 'filter_path', waitForCompletion: 'wait_for_completion' }

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

function Enrich (transport) {
  this.transport = transport
}

Enrich.prototype.deletePolicy = function enrichDeletePolicyApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'DELETE'
  path = '/' + '_enrich' + '/' + 'policy' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Enrich.prototype.executePolicy = function enrichExecutePolicyApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'PUT'
  path = '/' + '_enrich' + '/' + 'policy' + '/' + encodeURIComponent(name) + '/' + '_execute'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Enrich.prototype.getPolicy = function enrichGetPolicyApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((name) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_enrich' + '/' + 'policy' + '/' + encodeURIComponent(name)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_enrich' + '/' + 'policy'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Enrich.prototype.putPolicy = function enrichPutPolicyApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }
  if (params['body'] == null) {
    const err = new Error('Missing required parameter: body')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'PUT'
  path = '/' + '_enrich' + '/' + 'policy' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Enrich.prototype.stats = function enrichStatsApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'GET'
  path = '/' + '_enrich' + '/' + '_stats'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

module.exports = Enrich
