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
const acceptedQuerystring = ['pretty', 'human', 'error_trace', 'source', 'filter_path', 'typed_keys', 'rest_total_hits_as_int', 'wait_for_completion', 'timeout']
const snakeCase = { errorTrace: 'error_trace', filterPath: 'filter_path', typedKeys: 'typed_keys', restTotalHitsAsInt: 'rest_total_hits_as_int', waitForCompletion: 'wait_for_completion' }

function RollupApi (transport, ConfigurationError) {
  this.transport = transport
  this[kConfigurationError] = ConfigurationError
}

RollupApi.prototype.deleteJob = function rollupDeleteJobApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.id == null) {
    const err = new this[kConfigurationError]('Missing required parameter: id')
    return handleError(err, callback)
  }

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_rollup' + '/' + 'job' + '/' + encodeURIComponent(id)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

RollupApi.prototype.getJobs = function rollupGetJobsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((id) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_rollup' + '/' + 'job' + '/' + encodeURIComponent(id)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_rollup' + '/' + 'job'
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

RollupApi.prototype.getRollupCaps = function rollupGetRollupCapsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((id) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_rollup' + '/' + 'data' + '/' + encodeURIComponent(id)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_rollup' + '/' + 'data'
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

RollupApi.prototype.getRollupIndexCaps = function rollupGetRollupIndexCapsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.index == null) {
    const err = new this[kConfigurationError]('Missing required parameter: index')
    return handleError(err, callback)
  }

  let { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'GET'
  path = '/' + encodeURIComponent(index) + '/' + '_rollup' + '/' + 'data'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

RollupApi.prototype.putJob = function rollupPutJobApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.id == null) {
    const err = new this[kConfigurationError]('Missing required parameter: id')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_rollup' + '/' + 'job' + '/' + encodeURIComponent(id)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

RollupApi.prototype.rollup = function rollupRollupApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.index == null) {
    const err = new this[kConfigurationError]('Missing required parameter: index')
    return handleError(err, callback)
  }
  if (params.rollup_index == null && params.rollupIndex == null) {
    const err = new this[kConfigurationError]('Missing required parameter: rollup_index or rollupIndex')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  // check required url components
  if ((params.rollup_index != null || params.rollupIndex != null) && (params.index == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: index')
    return handleError(err, callback)
  }

  let { method, body, index, rollupIndex, rollup_index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + encodeURIComponent(index) + '/' + '_rollup' + '/' + encodeURIComponent(rollup_index || rollupIndex)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

RollupApi.prototype.rollupSearch = function rollupRollupSearchApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.index == null) {
    const err = new this[kConfigurationError]('Missing required parameter: index')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  // check required url components
  if (params.type != null && (params.index == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: index')
    return handleError(err, callback)
  }

  let { method, body, index, type, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((index) != null && (type) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_rollup_search'
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + encodeURIComponent(index) + '/' + '_rollup_search'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

RollupApi.prototype.startJob = function rollupStartJobApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.id == null) {
    const err = new this[kConfigurationError]('Missing required parameter: id')
    return handleError(err, callback)
  }

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_rollup' + '/' + 'job' + '/' + encodeURIComponent(id) + '/' + '_start'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

RollupApi.prototype.stopJob = function rollupStopJobApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.id == null) {
    const err = new this[kConfigurationError]('Missing required parameter: id')
    return handleError(err, callback)
  }

  let { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_rollup' + '/' + 'job' + '/' + encodeURIComponent(id) + '/' + '_stop'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

Object.defineProperties(RollupApi.prototype, {
  delete_job: { get () { return this.deleteJob } },
  get_jobs: { get () { return this.getJobs } },
  get_rollup_caps: { get () { return this.getRollupCaps } },
  get_rollup_index_caps: { get () { return this.getRollupIndexCaps } },
  put_job: { get () { return this.putJob } },
  rollup_search: { get () { return this.rollupSearch } },
  start_job: { get () { return this.startJob } },
  stop_job: { get () { return this.stopJob } }
})

module.exports = RollupApi
