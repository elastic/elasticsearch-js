// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
const acceptedQuerystring = ['preference', 'routing', 'local', 'ignore_unavailable', 'allow_no_indices', 'expand_wildcards', 'pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { ignoreUnavailable: 'ignore_unavailable', allowNoIndices: 'allow_no_indices', expandWildcards: 'expand_wildcards', errorTrace: 'error_trace', filterPath: 'filter_path' }

function searchShardsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((index) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + encodeURIComponent(index) + '/' + '_search_shards'
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_search_shards'
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

module.exports = searchShardsApi
