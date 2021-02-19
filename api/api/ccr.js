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
const acceptedQuerystring = ['pretty', 'human', 'error_trace', 'source', 'filter_path', 'wait_for_active_shards']
const snakeCase = { errorTrace: 'error_trace', filterPath: 'filter_path', waitForActiveShards: 'wait_for_active_shards' }

function CcrApi (transport, ConfigurationError) {
  this.transport = transport
  this[kConfigurationError] = ConfigurationError
}

CcrApi.prototype.deleteAutoFollowPattern = function ccrDeleteAutoFollowPatternApi (params, options, callback) {
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
  path = '/' + '_ccr' + '/' + 'auto_follow' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

CcrApi.prototype.follow = function ccrFollowApi (params, options, callback) {
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

  let { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + encodeURIComponent(index) + '/' + '_ccr' + '/' + 'follow'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

CcrApi.prototype.followInfo = function ccrFollowInfoApi (params, options, callback) {
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
  path = '/' + encodeURIComponent(index) + '/' + '_ccr' + '/' + 'info'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

CcrApi.prototype.followStats = function ccrFollowStatsApi (params, options, callback) {
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
  path = '/' + encodeURIComponent(index) + '/' + '_ccr' + '/' + 'stats'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

CcrApi.prototype.forgetFollower = function ccrForgetFollowerApi (params, options, callback) {
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

  let { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + encodeURIComponent(index) + '/' + '_ccr' + '/' + 'forget_follower'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

CcrApi.prototype.getAutoFollowPattern = function ccrGetAutoFollowPatternApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((name) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_ccr' + '/' + 'auto_follow' + '/' + encodeURIComponent(name)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_ccr' + '/' + 'auto_follow'
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

CcrApi.prototype.pauseAutoFollowPattern = function ccrPauseAutoFollowPatternApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.name == null) {
    const err = new this[kConfigurationError]('Missing required parameter: name')
    return handleError(err, callback)
  }

  let { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ccr' + '/' + 'auto_follow' + '/' + encodeURIComponent(name) + '/' + 'pause'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

CcrApi.prototype.pauseFollow = function ccrPauseFollowApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.index == null) {
    const err = new this[kConfigurationError]('Missing required parameter: index')
    return handleError(err, callback)
  }

  let { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + encodeURIComponent(index) + '/' + '_ccr' + '/' + 'pause_follow'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

CcrApi.prototype.putAutoFollowPattern = function ccrPutAutoFollowPatternApi (params, options, callback) {
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
  path = '/' + '_ccr' + '/' + 'auto_follow' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

CcrApi.prototype.resumeAutoFollowPattern = function ccrResumeAutoFollowPatternApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.name == null) {
    const err = new this[kConfigurationError]('Missing required parameter: name')
    return handleError(err, callback)
  }

  let { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_ccr' + '/' + 'auto_follow' + '/' + encodeURIComponent(name) + '/' + 'resume'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

CcrApi.prototype.resumeFollow = function ccrResumeFollowApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.index == null) {
    const err = new this[kConfigurationError]('Missing required parameter: index')
    return handleError(err, callback)
  }

  let { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + encodeURIComponent(index) + '/' + '_ccr' + '/' + 'resume_follow'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

CcrApi.prototype.stats = function ccrStatsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'GET'
  path = '/' + '_ccr' + '/' + 'stats'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

CcrApi.prototype.unfollow = function ccrUnfollowApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.index == null) {
    const err = new this[kConfigurationError]('Missing required parameter: index')
    return handleError(err, callback)
  }

  let { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + encodeURIComponent(index) + '/' + '_ccr' + '/' + 'unfollow'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

Object.defineProperties(CcrApi.prototype, {
  delete_auto_follow_pattern: { get () { return this.deleteAutoFollowPattern } },
  follow_info: { get () { return this.followInfo } },
  follow_stats: { get () { return this.followStats } },
  forget_follower: { get () { return this.forgetFollower } },
  get_auto_follow_pattern: { get () { return this.getAutoFollowPattern } },
  pause_auto_follow_pattern: { get () { return this.pauseAutoFollowPattern } },
  pause_follow: { get () { return this.pauseFollow } },
  put_auto_follow_pattern: { get () { return this.putAutoFollowPattern } },
  resume_auto_follow_pattern: { get () { return this.resumeAutoFollowPattern } },
  resume_follow: { get () { return this.resumeFollow } }
})

module.exports = CcrApi
