var _ = require('../../lib/toolbelt')
  , paramHelper = require('../../lib/param_helper');



/**
 * Perform an elasticsearch [indices.delete_mapping](http://www.elasticsearch.org/guide/reference/api/admin-indices-delete-mapping/) request
 *
 * @for Client
 * @method indices.delete_mapping
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 */
function doIndicesDeleteMapping(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  request.method = 'delete';

  // find the url's params
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
  
  if (typeof params.type !== 'object' && params.type) {
    url.type = '' + params.type;
  } else {
    throw new TypeError('Invalid type: ' + params.type + ' should be a string.');
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type')) {
    request.url = '/' + encodeURIComponent(url.index) + '/' + encodeURIComponent(url.type) + '';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least [object Object], [object Object]');
  }
  

  // build the query string
  if (typeof params.master_timeout !== 'undefined') {
    if (params.master_timeout instanceof Date) {
      query.master_timeout = params.master_timeout.getTime();
    } else if (_.isNumeric(params.master_timeout)) {
      query.master_timeout = params.master_timeout;
    } else {
      throw new TypeError('Invalid master_timeout: ' + params.master_timeout + ' should be be some sort of time.');
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doIndicesDeleteMapping;
