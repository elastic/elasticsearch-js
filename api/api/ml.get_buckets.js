// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlGetBuckets (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'expand',
    'exclude_interim',
    'from',
    'size',
    'start',
    'end',
    'anomaly_score',
    'sort',
    'desc'
  ]

  const snakeCase = {
    excludeInterim: 'exclude_interim',
    anomalyScore: 'anomaly_score'

  }

  /**
   * Perform a ml.get_buckets request
   * http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-bucket.html
   */
  return function mlGetBuckets (params, options, callback) {
    options = options || {}
    if (typeof options === 'function') {
      callback = options
      options = {}
    }
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
      options = {}
    }

    // check required parameters
    if (params['job_id'] == null && params['jobId'] == null) {
      const err = new ConfigurationError('Missing required parameter: job_id or jobId')
      return handleError(err, callback)
    }

    // check required url components
    if (params['timestamp'] != null && ((params['job_id'] == null && params['jobId'] == null))) {
      const err = new ConfigurationError('Missing required parameter of the url: job_id')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, jobId, job_id, timestamp, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((job_id || jobId) != null && (timestamp) != null) {
      if (method == null) method = body == null ? 'GET' : 'POST'
      path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'results' + '/' + 'buckets' + '/' + encodeURIComponent(timestamp)
    } else {
      if (method == null) method = body == null ? 'GET' : 'POST'
      path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'results' + '/' + 'buckets'
    }

    // build request object
    const request = {
      method,
      path,
      body: body || '',
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildMlGetBuckets
