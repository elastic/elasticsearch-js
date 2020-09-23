// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
const acceptedQuerystring = ['refresh', 'timeout', 'wait_for_active_shards', 'wait_for_completion', 'requests_per_second', 'scroll', 'slices', 'max_docs', 'pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { waitForActiveShards: 'wait_for_active_shards', waitForCompletion: 'wait_for_completion', requestsPerSecond: 'requests_per_second', maxDocs: 'max_docs', errorTrace: 'error_trace', filterPath: 'filter_path' }

function reindexApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_reindex'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

module.exports = reindexApi
