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

function buildXpackMlGetOverallBuckets (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [xpack.ml.get_overall_buckets](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-overall-buckets.html) request
   *
   * @param {string} job_id - The job IDs for which to calculate overall bucket results
   * @param {int} top_n - The number of top job bucket scores to be used in the overall_score calculation
   * @param {string} bucket_span - The span of the overall buckets. Defaults to the longest job bucket_span
   * @param {double} overall_score - Returns overall buckets with overall scores higher than this value
   * @param {boolean} exclude_interim - If true overall buckets that include interim buckets will be excluded
   * @param {string} start - Returns overall buckets with timestamps after this time
   * @param {string} end - Returns overall buckets with timestamps earlier than this time
   * @param {boolean} allow_no_jobs - Whether to ignore if a wildcard expression matches no jobs. (This includes `_all` string or when no jobs have been specified)
   * @param {object} body - Overall bucket selection details if not provided in URI
   */

  const acceptedQuerystring = [
    'top_n',
    'bucket_span',
    'overall_score',
    'exclude_interim',
    'start',
    'end',
    'allow_no_jobs'
  ]

  const snakeCase = {
    topN: 'top_n',
    bucketSpan: 'bucket_span',
    overallScore: 'overall_score',
    excludeInterim: 'exclude_interim',
    allowNoJobs: 'allow_no_jobs'
  }

  return function xpackMlGetOverallBuckets (params, options, callback) {
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

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, jobId, job_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    path = '/' + '_xpack' + '/' + 'ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'results' + '/' + 'overall_buckets'

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

module.exports = buildXpackMlGetOverallBuckets
