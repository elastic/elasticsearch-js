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

function buildClusterReroute (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [cluster.reroute](http://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-reroute.html) request
   *
   * @param {boolean} dry_run - Simulate the operation only and return the resulting state
   * @param {boolean} explain - Return an explanation of why the commands can or cannot be executed
   * @param {boolean} retry_failed - Retries allocation of shards that are blocked due to too many subsequent allocation failures
   * @param {list} metric - Limit the information returned to the specified metrics. Defaults to all but metadata
   * @param {time} master_timeout - Explicit operation timeout for connection to master node
   * @param {time} timeout - Explicit operation timeout
   * @param {object} body - The definition of `commands` to perform (`move`, `cancel`, `allocate`)
   */

  const acceptedQuerystring = [
    'dry_run',
    'explain',
    'retry_failed',
    'metric',
    'master_timeout',
    'timeout',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    dryRun: 'dry_run',
    retryFailed: 'retry_failed',
    masterTimeout: 'master_timeout',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function clusterReroute (params, options, callback) {
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
        clusterReroute(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      return callback(
        new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`),
        result
      )
    }

    var warnings = null
    var { method, body } = params
    var querystring = semicopy(params, ['method', 'body'])

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    path = '/' + '_cluster' + '/' + 'reroute'

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

module.exports = buildClusterReroute
