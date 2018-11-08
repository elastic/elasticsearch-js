'use strict'

function buildXpackMlGetOverallBuckets (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
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
  return function xpackMlGetOverallBuckets (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        xpackMlGetOverallBuckets(params, (err, body) => {
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

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'top_n',
      'bucket_span',
      'overall_score',
      'exclude_interim',
      'start',
      'end',
      'allow_no_jobs'
    ]
    const acceptedQuerystringCamelCased = [
      'topN',
      'bucketSpan',
      'overallScore',
      'excludeInterim',
      'start',
      'end',
      'allowNoJobs'
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

    var ignore = params.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    // build request object
    const parts = ['_xpack', 'ml', 'anomaly_detectors', params['job_id'] || params['jobId'], 'results', 'overall_buckets']
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
      querystring,
      body: params.body || '',
      headers: params.headers || null,
      ignore,
      requestTimeout: params.requestTimeout || null,
      agent: null,
      url: ''
    }

    return makeRequest(request, callback)
  }
}

module.exports = buildXpackMlGetOverallBuckets
