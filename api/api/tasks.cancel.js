// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildTasksCancel (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [tasks.cancel](http://www.elastic.co/guide/en/elasticsearch/reference/master/tasks.html) request
   *
   * @param {string} task_id - Cancel the task with specified task id (node_id:task_number)
   * @param {list} nodes - A comma-separated list of node IDs or names to limit the returned information; use `_local` to return information from the node you're connecting to, leave empty to get information from all nodes
   * @param {list} actions - A comma-separated list of actions that should be cancelled. Leave empty to cancel all.
   * @param {string} parent_task_id - Cancel tasks with specified parent task id (node_id:task_number). Set to -1 to cancel all.
   */

  const acceptedQuerystring = [
    'nodes',
    'actions',
    'parent_task_id',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    parentTaskId: 'parent_task_id',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function tasksCancel (params, options, callback) {
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
    if (params.body != null) {
      const err = new ConfigurationError('This API does not require a body')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, taskId, task_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((task_id || taskId) != null) {
      path = '/' + '_tasks' + '/' + encodeURIComponent(task_id || taskId) + '/' + '_cancel'
    } else {
      path = '/' + '_tasks' + '/' + '_cancel'
    }

    // build request object
    const request = {
      method,
      path,
      body: '',
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildTasksCancel
