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

function buildMlGetBuckets (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError } = opts
  /**
   * Perform a [ml.get_buckets](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-bucket.html) request
   *
   * @param {string} job_id - ID of the job to get bucket results from
   * @param {string} timestamp - The timestamp of the desired single bucket result
   * @param {boolean} expand - Include anomaly records
   * @param {boolean} exclude_interim - Exclude interim results
   * @param {int} from - skips a number of buckets
   * @param {int} size - specifies a max number of buckets to get
   * @param {string} start - Start time filter for buckets
   * @param {string} end - End time filter for buckets
   * @param {double} anomaly_score - Filter for the most anomalous buckets
   * @param {string} sort - Sort buckets by a particular field
   * @param {boolean} desc - Set the sort direction
   * @param {object} body - Bucket selection details if not provided in URI
   */

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

    var warnings = null
    var { method, body, jobId, job_id, timestamp } = params
    var querystring = semicopy(params, ['method', 'body', 'jobId', 'job_id', 'timestamp'])

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    if ((job_id || jobId) != null && (timestamp) != null) {
      path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'results' + '/' + 'buckets' + '/' + encodeURIComponent(timestamp)
    } else {
      path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'results' + '/' + 'buckets'
    }

    // build request object
    const request = {
      method,
      path,
      body: body || '',
      querystring
    }

    const requestOptions = {
      ignore,
      requestTimeout: options.requestTimeout || null,
      maxRetries: options.maxRetries || null,
      asStream: options.asStream || false,
      headers: options.headers || null,
      querystring: options.querystring || null,
      compression: options.compression || false,
      warnings
    }

    return makeRequest(request, requestOptions, callback)

    function semicopy (obj, exclude) {
      var target = {}
      var keys = Object.keys(obj)
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i]
        if (exclude.indexOf(key) === -1) {
          target[snakeCase[key] || key] = obj[key]
          if (acceptedQuerystring.indexOf(snakeCase[key] || key) === -1) {
            warnings = warnings || []
            warnings.push('Client - Unknown parameter: "' + key + '", sending it as query parameter')
          }
        }
      }
      return target
    }
  }
}

module.exports = buildMlGetBuckets
