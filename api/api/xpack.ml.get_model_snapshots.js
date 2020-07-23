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

function buildXpackMlGetModelSnapshots (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [xpack.ml.get_model_snapshots](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-snapshot.html) request
   *
   * @param {string} job_id - The ID of the job to fetch
   * @param {string} snapshot_id - The ID of the snapshot to fetch
   * @param {int} from - Skips a number of documents
   * @param {int} size - The default number of documents returned in queries as a string.
   * @param {date} start - The filter 'start' query parameter
   * @param {date} end - The filter 'end' query parameter
   * @param {string} sort - Name of the field to sort on
   * @param {boolean} desc - True if the results should be sorted in descending order
   * @param {object} body - Model snapshot selection criteria
   */

  const acceptedQuerystring = [
    'from',
    'size',
    'start',
    'end',
    'sort',
    'desc'
  ]

  const snakeCase = {

  }

  return function xpackMlGetModelSnapshots (params, options, callback) {
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
    if ((params['snapshot_id'] != null || params['snapshotId'] != null) && ((params['job_id'] == null && params['jobId'] == null))) {
      const err = new ConfigurationError('Missing required parameter of the url: job_id')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, jobId, job_id, snapshotId, snapshot_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((job_id || jobId) != null && (snapshot_id || snapshotId) != null) {
      path = '/' + '_xpack' + '/' + 'ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'model_snapshots' + '/' + encodeURIComponent(snapshot_id || snapshotId)
    } else {
      path = '/' + '_xpack' + '/' + 'ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'model_snapshots'
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

module.exports = buildXpackMlGetModelSnapshots
