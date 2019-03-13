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

function buildMlFlushJob (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [ml.flush_job](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-flush-job.html) request
   *
   * @param {string} job_id - The name of the job to flush
   * @param {boolean} calc_interim - Calculates interim results for the most recent bucket or all buckets within the latency period
   * @param {string} start - When used in conjunction with calc_interim, specifies the range of buckets on which to calculate interim results
   * @param {string} end - When used in conjunction with calc_interim, specifies the range of buckets on which to calculate interim results
   * @param {string} advance_time - Advances time to the given value generating results and updating the model for the advanced interval
   * @param {string} skip_time - Skips time to the given value without generating results or updating the model for the skipped interval
   * @param {object} body - Flush parameters
   */

  const acceptedQuerystring = [
    'calc_interim',
    'start',
    'end',
    'advance_time',
    'skip_time'
  ]

  const snakeCase = {
    calcInterim: 'calc_interim',
    advanceTime: 'advance_time',
    skipTime: 'skip_time'
  }

  return function mlFlushJob (params, options, callback) {
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

    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        mlFlushJob(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['job_id'] == null && params['jobId'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: job_id or jobId'),
        result
      )
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      return callback(
        new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`),
        result
      )
    }

    var warnings = null
    var { method, body, jobId, job_id } = params
    var querystring = semicopy(params, ['method', 'body', 'jobId', 'job_id'])

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_flush'

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

module.exports = buildMlFlushJob
