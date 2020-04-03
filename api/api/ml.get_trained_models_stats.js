// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlGetTrainedModelsStats (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'allow_no_match',
    'from',
    'size'
  ]

  const snakeCase = {
    allowNoMatch: 'allow_no_match'

  }

  /**
   * Perform a ml.get_trained_models_stats request
   * Retrieves usage information for trained inference models.
   * https://www.elastic.co/guide/en/elasticsearch/reference/current/get-inference-stats.html
   */
  return function mlGetTrainedModelsStats (params, options, callback) {
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
    var { method, body, modelId, model_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((model_id || modelId) != null) {
      if (method == null) method = 'GET'
      path = '/' + '_ml' + '/' + 'inference' + '/' + encodeURIComponent(model_id || modelId) + '/' + '_stats'
    } else {
      if (method == null) method = 'GET'
      path = '/' + '_ml' + '/' + 'inference' + '/' + '_stats'
    }

    // build request object
    const request = {
      method,
      path,
      body: null,
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildMlGetTrainedModelsStats
