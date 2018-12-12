'use strict'

function buildTasksList (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [tasks.list](http://www.elastic.co/guide/en/elasticsearch/reference/master/tasks.html) request
   *
   * @param {list} nodes - A comma-separated list of node IDs or names to limit the returned information; use `_local` to return information from the node you're connecting to, leave empty to get information from all nodes
   * @param {list} actions - A comma-separated list of actions that should be returned. Leave empty to return all.
   * @param {boolean} detailed - Return detailed task information (default: false)
   * @param {string} parent_task_id - Return tasks with specified parent task id (node_id:task_number). Set to -1 to return all.
   * @param {boolean} wait_for_completion - Wait for the matching tasks to complete (default: false)
   * @param {enum} group_by - Group tasks by nodes or parent/child relationships
   * @param {time} timeout - Explicit operation timeout
   */
  return function tasksList (params, options, callback) {
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
        tasksList(params, options, (err, body) => {
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

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'nodes',
      'actions',
      'detailed',
      'parent_task_id',
      'wait_for_completion',
      'group_by',
      'timeout',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'nodes',
      'actions',
      'detailed',
      'parentTaskId',
      'waitForCompletion',
      'groupBy',
      'timeout',
      'pretty',
      'human',
      'errorTrace',
      'source',
      'filterPath'
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
      method = 'GET'
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
    const parts = ['_tasks']
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
      querystring,
      body: null,
      headers: params.headers || null
    }

    const requestOptions = {
      ignore,
      requestTimeout: options.requestTimeout || null,
      maxRetries: options.maxRetries || null,
      asStream: options.asStream || false
    }

    return makeRequest(request, requestOptions, callback)
  }
}

module.exports = buildTasksList
