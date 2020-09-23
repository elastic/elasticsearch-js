// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
const acceptedQuerystring = ['timeout', 'master_timeout', 'context', 'pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { masterTimeout: 'master_timeout', errorTrace: 'error_trace', filterPath: 'filter_path' }

function putScriptApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['id'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: id')
    return handleError(err, callback)
  }
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  // check required url components
  if (params['context'] != null && (params['id'] == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: id')
    return handleError(err, callback)
  }

  var { method, body, id, context, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((id) != null && (context) != null) {
    if (method == null) method = 'PUT'
    path = '/' + '_scripts' + '/' + encodeURIComponent(id) + '/' + encodeURIComponent(context)
  } else {
    if (method == null) method = 'PUT'
    path = '/' + '_scripts' + '/' + encodeURIComponent(id)
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

module.exports = putScriptApi
