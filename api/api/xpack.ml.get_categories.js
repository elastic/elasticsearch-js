'use strict'

function buildXpackMlGetCategories (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [xpack.ml.get_categories](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-category.html) request
   *
   * @param {string} job_id - The name of the job
   * @param {long} category_id - The identifier of the category definition of interest
   * @param {int} from - skips a number of categories
   * @param {int} size - specifies a max number of categories to get
   * @param {object} body - Category selection details if not provided in URI
   */
  return function xpackMlGetCategories (params, options, callback) {
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
        xpackMlGetCategories(params, options, (err, body) => {
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
      'from',
      'size'
    ]
    const acceptedQuerystringCamelCased = [
      'from',
      'size'
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
    const parts = ['_xpack', 'ml', 'anomaly_detectors', params['job_id'] || params['jobId'], 'results', 'categories']
    const request = {
      method,
      path: (params['job_id'] || params['jobId']) != null
        ? '/' + parts.filter(Boolean).map(encodeURIComponent).join('/')
        : '/_xpack/ml/anomaly_detectors/{job_id}/results/categories/{category_id}',
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

module.exports = buildXpackMlGetCategories
