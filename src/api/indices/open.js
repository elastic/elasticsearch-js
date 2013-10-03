var _ = require('../../lib/toolbelt')
  , paramHelper = require('../../lib/param_helper');



/**
 * Perform an elasticsearch [indices.open](http://www.elasticsearch.org/guide/reference/api/admin-indices-open-close/) request
 *
 * @for Client
 * @method indices.open
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 */
function doIndicesOpen(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  request.method = 'post';

  // find the url's params
  if (typeof params.index !== 'object' && params.index) {
    url.index = '' + params.index;
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
  }
  

  // build the url
  if (url.hasOwnProperty('index')) {
    request.url = '/' + encodeURIComponent(url.index) + '/_open';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least [object Object]');
  }
  

  // build the query string
  if (typeof params.timeout !== 'undefined') {
    if (params.timeout instanceof Date) {
      query.timeout = params.timeout.getTime();
    } else if (_.isNumeric(params.timeout)) {
      query.timeout = params.timeout;
    } else {
      throw new TypeError('Invalid timeout: ' + params.timeout + ' should be be some sort of time.');
    }
  }
  
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

module.exports = doIndicesOpen;
