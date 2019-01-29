'use strict'

function buildMlGetModelSnapshots (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [ml.get_model_snapshots](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-snapshot.html) request
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
  return function mlGetModelSnapshots (params, options, callback) {
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
        mlGetModelSnapshots(params, options, (err, body) => {
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
      'from',
      'size',
      'start',
      'end',
      'sort',
      'desc'
    ]
    const acceptedQuerystringCamelCased = [
      'from',
      'size',
      'start',
      'end',
      'sort',
      'desc'
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
      method = params.body == null ? 'GET' : 'POST'
    }

    // validate headers object
    if (params.headers != null && typeof params.headers !== 'object') {
      return callback(
        new ConfigurationError(`Headers should be an object, instead got: ${typeof params.headers}`),
        result
      )
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    if ((params['job_id'] || params['jobId']) != null && (params['snapshot_id'] || params['snapshotId']) != null) {
      path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(params['job_id'] || params['jobId']) + '/' + 'model_snapshots' + '/' + encodeURIComponent(params['snapshot_id'] || params['snapshotId'])
    } else {
      path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(params['job_id'] || params['jobId']) + '/' + 'model_snapshots'
    }

    // build request object
    const request = {
      method,
      path,
      body: params.body || '',
      querystring
    }

    const requestOptions = {
      ignore,
      requestTimeout: options.requestTimeout || null,
      maxRetries: options.maxRetries || null,
      asStream: options.asStream || false,
      headers: options.headers || null
    }

    return makeRequest(request, requestOptions, callback)
  }
}

module.exports = buildMlGetModelSnapshots
