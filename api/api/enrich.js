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

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
const acceptedQuerystring = ['pretty', 'human', 'error_trace', 'source', 'filter_path', 'wait_for_completion']
const snakeCase = { errorTrace: 'error_trace', filterPath: 'filter_path', waitForCompletion: 'wait_for_completion' }

function EnrichApi (transport, ConfigurationError) {
  this.transport = transport
  this[kConfigurationError] = ConfigurationError
}

EnrichApi.prototype.deletePolicy = function enrichDeletePolicyApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.name == null) {
    const err = new this[kConfigurationError]('Missing required parameter: name')
    return handleError(err, callback)
  }

  let { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_enrich' + '/' + 'policy' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

EnrichApi.prototype.executePolicy = function enrichExecutePolicyApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.name == null) {
    const err = new this[kConfigurationError]('Missing required parameter: name')
    return handleError(err, callback)
  }

  let { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_enrich' + '/' + 'policy' + '/' + encodeURIComponent(name) + '/' + '_execute'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

EnrichApi.prototype.getPolicy = function enrichGetPolicyApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
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

  return this.transport.request(request, options, callback)
}

EnrichApi.prototype.putPolicy = function enrichPutPolicyApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.name == null) {
    const err = new this[kConfigurationError]('Missing required parameter: name')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_enrich' + '/' + 'policy' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

EnrichApi.prototype.stats = function enrichStatsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'GET'
  path = '/' + '_enrich' + '/' + '_stats'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

Object.defineProperties(EnrichApi.prototype, {
  delete_policy: { get () { return this.deletePolicy } },
  execute_policy: { get () { return this.executePolicy } },
  get_policy: { get () { return this.getPolicy } },
  put_policy: { get () { return this.putPolicy } }
})

module.exports = EnrichApi
