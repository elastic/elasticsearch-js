var _ = require('../../lib/toolbelt')
  , paramHelper = require('../../lib/param_helper');

var ignoreIndicesOptions = ['none', 'missing'];



/**
 * Perform an elasticsearch [indices.status](http://elasticsearch.org/guide/reference/api/admin-indices-status/) request
 *
 * @for Client
 * @method indices.status
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {*} params.operation_threading - TODO: ?
 * @param {boolean} params.recovery - Return information about shard recovery
 * @param {boolean} params.snapshot - TODO: ?
 */
function doIndicesStatus(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  request.method = 'get';

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
    request.url = '/' + encodeURIComponent(url.index) + '/_status';
  }
  else {
    request.url = '/_status';
  }
  

  // build the query string
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
  
  if (typeof params.operation_threading !== 'undefined') {
    query.operation_threading = params.operation_threading;
  }
  
  if (typeof params.recovery !== 'undefined') {
    if (params.recovery.toLowerCase && (params.recovery = params.recovery.toLowerCase())
      && (params.recovery === 'no' || params.recovery === 'off')
    ) {
      query.recovery = false;
    } else {
      query.recovery = !!params.recovery;
    }
  }
  
  if (typeof params.snapshot !== 'undefined') {
    if (params.snapshot.toLowerCase && (params.snapshot = params.snapshot.toLowerCase())
      && (params.snapshot === 'no' || params.snapshot === 'off')
    ) {
      query.snapshot = false;
    } else {
      query.snapshot = !!params.snapshot;
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doIndicesStatus;
