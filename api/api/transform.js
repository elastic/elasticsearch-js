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
const acceptedQuerystring = ['force', 'pretty', 'human', 'error_trace', 'source', 'filter_path', 'from', 'size', 'allow_no_match', 'exclude_generated', 'defer_validation', 'timeout', 'wait_for_completion', 'wait_for_checkpoint']
const snakeCase = { errorTrace: 'error_trace', filterPath: 'filter_path', allowNoMatch: 'allow_no_match', excludeGenerated: 'exclude_generated', deferValidation: 'defer_validation', waitForCompletion: 'wait_for_completion', waitForCheckpoint: 'wait_for_checkpoint' }

function TransformApi (transport, ConfigurationError) {
  this.transport = transport
  this[kConfigurationError] = ConfigurationError
}

TransformApi.prototype.deleteTransform = function transformDeleteTransformApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.transform_id == null && params.transformId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: transform_id or transformId')
    return handleError(err, callback)
  }

  let { method, body, transformId, transform_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_transform' + '/' + encodeURIComponent(transform_id || transformId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

TransformApi.prototype.getTransform = function transformGetTransformApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, transformId, transform_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if ((transform_id || transformId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_transform' + '/' + encodeURIComponent(transform_id || transformId)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_transform'
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

TransformApi.prototype.getTransformStats = function transformGetTransformStatsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.transform_id == null && params.transformId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: transform_id or transformId')
    return handleError(err, callback)
  }

  let { method, body, transformId, transform_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'GET'
  path = '/' + '_transform' + '/' + encodeURIComponent(transform_id || transformId) + '/' + '_stats'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

TransformApi.prototype.previewTransform = function transformPreviewTransformApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_transform' + '/' + '_preview'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

TransformApi.prototype.putTransform = function transformPutTransformApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.transform_id == null && params.transformId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: transform_id or transformId')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, transformId, transform_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_transform' + '/' + encodeURIComponent(transform_id || transformId)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

TransformApi.prototype.startTransform = function transformStartTransformApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.transform_id == null && params.transformId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: transform_id or transformId')
    return handleError(err, callback)
  }

  let { method, body, transformId, transform_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_transform' + '/' + encodeURIComponent(transform_id || transformId) + '/' + '_start'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

TransformApi.prototype.stopTransform = function transformStopTransformApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.transform_id == null && params.transformId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: transform_id or transformId')
    return handleError(err, callback)
  }

  let { method, body, transformId, transform_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_transform' + '/' + encodeURIComponent(transform_id || transformId) + '/' + '_stop'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

TransformApi.prototype.updateTransform = function transformUpdateTransformApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.transform_id == null && params.transformId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: transform_id or transformId')
    return handleError(err, callback)
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, transformId, transform_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_transform' + '/' + encodeURIComponent(transform_id || transformId) + '/' + '_update'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

Object.defineProperties(TransformApi.prototype, {
  delete_transform: { get () { return this.deleteTransform } },
  get_transform: { get () { return this.getTransform } },
  get_transform_stats: { get () { return this.getTransformStats } },
  preview_transform: { get () { return this.previewTransform } },
  put_transform: { get () { return this.putTransform } },
  start_transform: { get () { return this.startTransform } },
  stop_transform: { get () { return this.stopTransform } },
  update_transform: { get () { return this.updateTransform } }
})

module.exports = TransformApi
