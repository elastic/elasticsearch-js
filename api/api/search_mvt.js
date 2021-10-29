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
const acceptedQuerystring = ['exact_bounds', 'extent', 'grid_precision', 'grid_type', 'size', 'track_total_hits', 'pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { exactBounds: 'exact_bounds', gridPrecision: 'grid_precision', gridType: 'grid_type', trackTotalHits: 'track_total_hits', errorTrace: 'error_trace', filterPath: 'filter_path' }

function searchMvtApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.index == null) {
    const err = new this[kConfigurationError]('Missing required parameter: index')
    return handleError(err, callback)
  }
  if (params.field == null) {
    const err = new this[kConfigurationError]('Missing required parameter: field')
    return handleError(err, callback)
  }
  if (params.zoom == null) {
    const err = new this[kConfigurationError]('Missing required parameter: zoom')
    return handleError(err, callback)
  }
  if (params.x == null) {
    const err = new this[kConfigurationError]('Missing required parameter: x')
    return handleError(err, callback)
  }
  if (params.y == null) {
    const err = new this[kConfigurationError]('Missing required parameter: y')
    return handleError(err, callback)
  }

  // check required url components
  if (params.y != null && (params.x == null || params.zoom == null || params.field == null || params.index == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: x, zoom, field, index')
    return handleError(err, callback)
  } else if (params.x != null && (params.zoom == null || params.field == null || params.index == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: zoom, field, index')
    return handleError(err, callback)
  } else if (params.zoom != null && (params.field == null || params.index == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: field, index')
    return handleError(err, callback)
  } else if (params.field != null && (params.index == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: index')
    return handleError(err, callback)
  }

  let { method, body, index, field, zoom, x, y, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = body == null ? 'GET' : 'POST'
  path = '/' + encodeURIComponent(index) + '/' + '_mvt' + '/' + encodeURIComponent(field) + '/' + encodeURIComponent(zoom) + '/' + encodeURIComponent(x) + '/' + encodeURIComponent(y)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

module.exports = searchMvtApi
