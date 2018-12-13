'use strict'

function buildXpackMlGetBuckets (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [xpack.ml.get_buckets](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-bucket.html) request
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
  return function xpackMlGetBuckets (params, options, callback) {
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
        xpackMlGetBuckets(params, options, (err, body) => {
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
    if (params['timestamp'] != null && ((params['job_id'] == null || params['jobId']))) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: job_id'),
        result
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
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
    const acceptedQuerystringCamelCased = [
      'expand',
      'excludeInterim',
      'from',
      'size',
      'start',
      'end',
      'anomalyScore',
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

    // build request object
    const parts = ['_xpack', 'ml', 'anomaly_detectors', params['job_id'] || params['jobId'], 'results', 'buckets', params['timestamp']]
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
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

module.exports = buildXpackMlGetBuckets
