'use strict'

function buildMlGetRecords (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [ml.get_records](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-record.html) request
   *
   * @param {string} job_id -
   * @param {boolean} exclude_interim - Exclude interim results
   * @param {int} from - skips a number of records
   * @param {int} size - specifies a max number of records to get
   * @param {string} start - Start time filter for records
   * @param {string} end - End time filter for records
   * @param {double} record_score -
   * @param {string} sort - Sort records by a particular field
   * @param {boolean} desc - Set the sort direction
   * @param {object} body - Record selection criteria
   */
  return function mlGetRecords (params, options, callback) {
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
        mlGetRecords(params, options, (err, body) => {
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
      'exclude_interim',
      'from',
      'size',
      'start',
      'end',
      'record_score',
      'sort',
      'desc'
    ]
    const acceptedQuerystringCamelCased = [
      'excludeInterim',
      'from',
      'size',
      'start',
      'end',
      'recordScore',
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

    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(params['job_id'] || params['jobId']) + '/' + 'results' + '/' + 'records'

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

module.exports = buildMlGetRecords
