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
const acceptedQuerystring = ['master_timeout', 'pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { masterTimeout: 'master_timeout', errorTrace: 'error_trace', filterPath: 'filter_path' }

function FeaturesApi (transport, ConfigurationError) {
  this.transport = transport
  this[kConfigurationError] = ConfigurationError
}

FeaturesApi.prototype.getFeatures = function featuresGetFeaturesApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'GET'
  path = '/' + '_features'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

FeaturesApi.prototype.resetFeatures = function featuresResetFeaturesApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_features' + '/' + '_reset'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

Object.defineProperties(FeaturesApi.prototype, {
  get_features: { get () { return this.getFeatures } },
  reset_features: { get () { return this.resetFeatures } }
})

module.exports = FeaturesApi
