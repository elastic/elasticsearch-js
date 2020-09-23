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
const acceptedQuerystring = ['pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { errorTrace: 'error_trace', filterPath: 'filter_path' }

function SlmApi (transport, ConfigurationError) {
  this.transport = transport
  this[kConfigurationError] = ConfigurationError
}

SlmApi.prototype.deleteLifecycle = function slmDeleteLifecycleApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['policy_id'] == null && params['policyId'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: policy_id or policyId')
    return handleError(err, callback)
  }

  var { method, body, policyId, policy_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_slm' + '/' + 'policy' + '/' + encodeURIComponent(policy_id || policyId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SlmApi.prototype.executeLifecycle = function slmExecuteLifecycleApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['policy_id'] == null && params['policyId'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: policy_id or policyId')
    return handleError(err, callback)
  }

  var { method, body, policyId, policy_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_slm' + '/' + 'policy' + '/' + encodeURIComponent(policy_id || policyId) + '/' + '_execute'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SlmApi.prototype.executeRetention = function slmExecuteRetentionApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_slm' + '/' + '_execute_retention'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SlmApi.prototype.getLifecycle = function slmGetLifecycleApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, policyId, policy_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((policy_id || policyId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_slm' + '/' + 'policy' + '/' + encodeURIComponent(policy_id || policyId)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_slm' + '/' + 'policy'
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

SlmApi.prototype.getStats = function slmGetStatsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'GET'
  path = '/' + '_slm' + '/' + 'stats'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

SlmApi.prototype.getStatus = function slmGetStatusApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'GET'
  path = '/' + '_slm' + '/' + 'status'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

SlmApi.prototype.putLifecycle = function slmPutLifecycleApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['policy_id'] == null && params['policyId'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: policy_id or policyId')
    return handleError(err, callback)
  }

  var { method, body, policyId, policy_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_slm' + '/' + 'policy' + '/' + encodeURIComponent(policy_id || policyId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SlmApi.prototype.start = function slmStartApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_slm' + '/' + 'start'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SlmApi.prototype.stop = function slmStopApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_slm' + '/' + 'stop'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

Object.defineProperties(SlmApi.prototype, {
  delete_lifecycle: { get () { return this.deleteLifecycle } },
  execute_lifecycle: { get () { return this.executeLifecycle } },
  execute_retention: { get () { return this.executeRetention } },
  get_lifecycle: { get () { return this.getLifecycle } },
  get_stats: { get () { return this.getStats } },
  get_status: { get () { return this.getStatus } },
  put_lifecycle: { get () { return this.putLifecycle } }
})

module.exports = SlmApi
