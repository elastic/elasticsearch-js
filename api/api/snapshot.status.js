'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildSnapshotStatus (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [snapshot.status](http://www.elastic.co/guide/en/elasticsearch/reference/master/modules-snapshots.html) request
   *
   * @param {string} repository - A repository name
   * @param {list} snapshot - A comma-separated list of snapshot names
   * @param {time} master_timeout - Explicit operation timeout for connection to master node
   * @param {boolean} ignore_unavailable - Whether to ignore unavailable snapshots, defaults to false which means a SnapshotMissingException is thrown
   */

  const acceptedQuerystring = [
    'master_timeout',
    'ignore_unavailable',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    masterTimeout: 'master_timeout',
    ignoreUnavailable: 'ignore_unavailable',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function snapshotStatus (params, options, callback) {
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
        snapshotStatus(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params.body != null) {
      return callback(
        new ConfigurationError('This API does not require a body'),
        result
      )
    }

    // check required url components
    if (params['snapshot'] != null && (params['repository'] == null)) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: repository'),
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
    var { method, body, repository, snapshot } = params
    var querystring = semicopy(params, ['method', 'body', 'repository', 'snapshot'])

    if (method == null) {
      method = 'GET'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    if ((repository) != null && (snapshot) != null) {
      path = '/' + '_snapshot' + '/' + encodeURIComponent(repository) + '/' + encodeURIComponent(snapshot) + '/' + '_status'
    } else if ((repository) != null) {
      path = '/' + '_snapshot' + '/' + encodeURIComponent(repository) + '/' + '_status'
    } else {
      path = '/' + '_snapshot' + '/' + '_status'
    }

    // build request object
    const request = {
      method,
      path,
      body: null,
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

module.exports = buildSnapshotStatus
