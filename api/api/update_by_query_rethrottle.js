// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
const acceptedQuerystring = ['requests_per_second', 'pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { requestsPerSecond: 'requests_per_second', errorTrace: 'error_trace', filterPath: 'filter_path' }

function updateByQueryRethrottleApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['task_id'] == null && params['taskId'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: task_id or taskId')
    return handleError(err, callback)
  }
  if (params['requests_per_second'] == null && params['requestsPerSecond'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: requests_per_second or requestsPerSecond')
    return handleError(err, callback)
  }

  var { method, body, taskId, task_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_update_by_query' + '/' + encodeURIComponent(task_id || taskId) + '/' + '_rethrottle'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

module.exports = updateByQueryRethrottleApi
