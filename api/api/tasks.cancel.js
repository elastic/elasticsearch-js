// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildTasksCancel (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
<<<<<<< HEAD
  /**
   * Perform a [tasks.cancel](http://www.elastic.co/guide/en/elasticsearch/reference/master/tasks.html) request
   *
   * @param {string} task_id - Cancel the task with specified task id (node_id:task_number)
   * @param {list} nodes - A comma-separated list of node IDs or names to limit the returned information; use `_local` to return information from the node you're connecting to, leave empty to get information from all nodes
   * @param {list} actions - A comma-separated list of actions that should be cancelled. Leave empty to cancel all.
   * @param {string} parent_task_id - Cancel tasks with specified parent task id (node_id:task_number). Set to -1 to cancel all.
   */
=======
>>>>>>> 69247496... Update code generation (#969)

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

  /**
   * Perform a tasks.cancel request
   * Cancels a task, if it can be cancelled through an API.
   * https://www.elastic.co/guide/en/elasticsearch/reference/master/tasks.html
   */
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

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, taskId, task_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((task_id || taskId) != null) {
      if (method == null) method = 'POST'
      path = '/' + '_tasks' + '/' + encodeURIComponent(task_id || taskId) + '/' + '_cancel'
    } else {
      if (method == null) method = 'POST'
      path = '/' + '_tasks' + '/' + '_cancel'
    }

    // build request object
    const request = {
      method,
      path,
      body: body || '',
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildTasksCancel
