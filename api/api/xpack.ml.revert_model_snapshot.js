'use strict'

function buildXpackMlRevertModelSnapshot (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [xpack.ml.revert_model_snapshot](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-revert-snapshot.html) request
   *
   * @param {string} job_id - The ID of the job to fetch
   * @param {string} snapshot_id - The ID of the snapshot to revert to
   * @param {boolean} delete_intervening_results - Should we reset the results back to the time of the snapshot?
   * @param {object} body - Reversion options
   */
  return function xpackMlRevertModelSnapshot (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        xpackMlRevertModelSnapshot(params, (err, body) => {
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

    // check required url components
    if ((params['snapshot_id'] != null || params['snapshotId'] != null) && ((params['job_id'] == null || params['jobId']))) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: job_id'),
        result
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'delete_intervening_results'
    ]
    const acceptedQuerystringCamelCased = [
      'deleteInterveningResults'
    ]

    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i]
      if (acceptedQuerystring.indexOf(key) !== -1) {
        querystring[key] = params[key]
      } else {
        var camelIndex = acceptedQuerystringCamelCased.indexOf(key)
        if (camelIndex !== -1) {
          querystring[acceptedQuerystring[camelIndex]] = params[key]
        }
      }
    }

    // configure http method
    var method = params.method
    if (method == null) {
      method = 'POST'
    }

    // validate headers object
    if (params.headers != null && typeof params.headers !== 'object') {
      return callback(
        new ConfigurationError(`Headers should be an object, instead got: ${typeof params.headers}`),
        result
      )
    }

    var ignore = params.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    // build request object
    const parts = ['_xpack', 'ml', 'anomaly_detectors', params['job_id'] || params['jobId'], 'model_snapshots', params['snapshot_id'] || params['snapshotId'], '_revert']
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
      querystring,
      body: params.body || '',
      headers: params.headers || null,
      ignore,
      requestTimeout: params.requestTimeout || null
    }

    return makeRequest(request, callback)
  }
}

module.exports = buildXpackMlRevertModelSnapshot
