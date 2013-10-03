var _ = require('../../lib/toolbelt')
  , paramHelper = require('../../lib/param_helper');

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
function doIndicesOptimize(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  if (params.method = _.toLowerString(params.method)) {
    if (params.method === 'post' || params.method === 'get') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of post, get');
    }
  } else {
    request.method = params.body ? 'post' : 'get';
  }

  // find the url's params
  if (typeof params.index !== 'undefined') {
    switch (typeof params.index) {
    case 'string':
      url.index = params.index;
      break;
    case 'object':
      if (_.isArray(params.index)) {
        url.index = params.index.join(',');
      } else {
        throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      url.index = !!params.index;
    }
  }
  

  // build the url
  if (url.hasOwnProperty('index')) {
    request.url = '/' + encodeURIComponent(url.index) + '/_optimize';
  }
  else {
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

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doIndicesOptimize;
