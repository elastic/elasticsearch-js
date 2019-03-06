'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlDeleteModelSnapshot (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [ml.delete_model_snapshot](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-delete-snapshot.html) request
   *
   * @param {string} job_id - The ID of the job to fetch
   * @param {string} snapshot_id - The ID of the snapshot to delete
   */

  const acceptedQuerystring = [

  ]

  const snakeCase = {

  }

  return function mlDeleteModelSnapshot (params, options, callback) {
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
        mlDeleteModelSnapshot(params, options, (err, body) => {
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
    if (params['snapshot_id'] == null && params['snapshotId'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: snapshot_id or snapshotId'),
        result
      )
    }
    if (params.body != null) {
      return callback(
        new ConfigurationError('This API does not require a body'),
        result
      )
    }

    // check required url components
    if ((params['snapshot_id'] != null || params['snapshotId'] != null) && ((params['job_id'] == null && params['jobId'] == null))) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: job_id'),
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
    var { method, body, jobId, job_id, snapshotId, snapshot_id } = params
    var querystring = semicopy(params, ['method', 'body', 'jobId', 'job_id', 'snapshotId', 'snapshot_id'])

    if (method == null) {
      method = 'DELETE'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'model_snapshots' + '/' + encodeURIComponent(snapshot_id || snapshotId)

    // build request object
    const request = {
      method,
      path,
      body: '',
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

module.exports = buildMlDeleteModelSnapshot
