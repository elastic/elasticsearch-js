// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlGetInfluencers (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [ml.get_influencers](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-influencer.html) request
   *
   * @param {string} job_id -
   * @param {boolean} exclude_interim - Exclude interim results
   * @param {int} from - skips a number of influencers
   * @param {int} size - specifies a max number of influencers to get
   * @param {string} start - start timestamp for the requested influencers
   * @param {string} end - end timestamp for the requested influencers
   * @param {double} influencer_score - influencer score threshold for the requested influencers
   * @param {string} sort - sort field for the requested influencers
   * @param {boolean} desc - whether the results should be sorted in decending order
   * @param {object} body - Influencer selection criteria
   */

  const acceptedQuerystring = [
    'exclude_interim',
    'from',
    'size',
    'start',
    'end',
    'influencer_score',
    'sort',
    'desc'
  ]

  const snakeCase = {
    excludeInterim: 'exclude_interim',
    influencerScore: 'influencer_score'

  }

  return function mlGetInfluencers (params, options, callback) {
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
    if (params['job_id'] == null && params['jobId'] == null) {
      const err = new ConfigurationError('Missing required parameter: job_id or jobId')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, jobId, job_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'results' + '/' + 'influencers'

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

module.exports = buildMlGetInfluencers
