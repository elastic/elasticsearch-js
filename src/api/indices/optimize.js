var _ = require('../../lib/utils');

var ignoreIndicesOptions = ['none', 'missing'];



/**
 * Perform an elasticsearch [indices.optimize](http://www.elasticsearch.org/guide/reference/api/admin-indices-optimize/) request
 *
 * @for Client
 * @method indices.optimize
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {boolean} params.flush - Specify whether the index should be flushed after performing the operation (default: true)
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {number} params.max_num_segments - The number of segments the index should be merged into (default: dynamic)
 * @param {boolean} params.only_expunge_deletes - Specify whether the operation should only expunge deleted documents
 * @param {*} params.operation_threading - TODO: ?
 * @param {boolean} params.refresh - Specify whether the index should be refreshed after performing the operation (default: true)
 * @param {boolean} params.wait_for_merge - Specify whether the request should block until the merge process is finished (default: true)
 */
function doIndicesOptimize(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};

  if (params.method) {
    if (params.method === 'POST' || params.method === 'GET') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of POST, GET');
    }
  } else {
    request.method = 'POST';
  }

  // find the url's params
  if (typeof params.index !== 'undefined') {
    if (typeof params.index === 'string') {
      url.index = params.index;
    } else if (_.isArray(params.index)) {
      url.index = params.index.join(',');
    } else {
      throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list or array.');
    }
  }
  

  // build the url
  if (url.hasOwnProperty('index')) {
    request.url = '/' + url.index + '/_optimize';
  }
  else  {
    request.url = '/_optimize';
  }
  

  // build the query string
  if (typeof params.flush !== 'undefined') {
    if (params.flush.toLowerCase && (params.flush = params.flush.toLowerCase())
      && (params.flush === 'no' || params.flush === 'off')
    ) {
      query.flush = false;
    } else {
      query.flush = !!params.flush;
    }
  }
  
  if (typeof params.ignore_indices !== 'undefined') {
    if (_.contains(ignoreIndicesOptions, params.ignore_indices)) {
      query.ignore_indices = params.ignore_indices;
    } else {
      throw new TypeError(
        'Invalid ignore_indices: ' + params.ignore_indices +
        ' should be one of ' + ignoreIndicesOptions.join(', ') + '.'
      );
    }
  }
  
  if (typeof params.max_num_segments !== 'undefined') {
    if (_.isNumeric(params.max_num_segments)) {
      query.max_num_segments = params.max_num_segments * 1;
    } else {
      throw new TypeError('Invalid max_num_segments: ' + params.max_num_segments + ' should be a number.');
    }
  }
  
  if (typeof params.only_expunge_deletes !== 'undefined') {
    if (params.only_expunge_deletes.toLowerCase && (params.only_expunge_deletes = params.only_expunge_deletes.toLowerCase())
      && (params.only_expunge_deletes === 'no' || params.only_expunge_deletes === 'off')
    ) {
      query.only_expunge_deletes = false;
    } else {
      query.only_expunge_deletes = !!params.only_expunge_deletes;
    }
  }
  
  if (typeof params.operation_threading !== 'undefined') {
    query.operation_threading = params.operation_threading;
  }
  
  if (typeof params.refresh !== 'undefined') {
    if (params.refresh.toLowerCase && (params.refresh = params.refresh.toLowerCase())
      && (params.refresh === 'no' || params.refresh === 'off')
    ) {
      query.refresh = false;
    } else {
      query.refresh = !!params.refresh;
    }
  }
  
  if (typeof params.wait_for_merge !== 'undefined') {
    if (params.wait_for_merge.toLowerCase && (params.wait_for_merge = params.wait_for_merge.toLowerCase())
      && (params.wait_for_merge === 'no' || params.wait_for_merge === 'off')
    ) {
      query.wait_for_merge = false;
    } else {
      query.wait_for_merge = !!params.wait_for_merge;
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doIndicesOptimize;