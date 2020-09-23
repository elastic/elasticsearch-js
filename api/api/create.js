// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
const acceptedQuerystring = ['wait_for_active_shards', 'refresh', 'routing', 'timeout', 'version', 'version_type', 'pipeline', 'pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { waitForActiveShards: 'wait_for_active_shards', versionType: 'version_type', errorTrace: 'error_trace', filterPath: 'filter_path' }

function createApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['id'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: id')
    return handleError(err, callback)
  }
  if (params['index'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: index')
    return handleError(err, callback)
  }
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  var { method, body, id, index, type, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((index) != null && (type) != null && (id) != null) {
    if (method == null) method = 'PUT'
    path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + encodeURIComponent(id) + '/' + '_create'
  } else {
    if (method == null) method = 'PUT'
    path = '/' + encodeURIComponent(index) + '/' + '_create' + '/' + encodeURIComponent(id)
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

module.exports = createApi
