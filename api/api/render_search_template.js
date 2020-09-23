// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
const acceptedQuerystring = ['pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { errorTrace: 'error_trace', filterPath: 'filter_path' }

function renderSearchTemplateApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((id) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_render' + '/' + 'template' + '/' + encodeURIComponent(id)
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_render' + '/' + 'template'
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

module.exports = renderSearchTemplateApi
