var _ = require('../../lib/toolbelt')
  , paramHelper = require('../../lib/param_helper');



/**
 * Perform an elasticsearch [indices.put_alias](http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/) request
 *
 * @for Client
 * @method indices.put_alias
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.timeout - Explicit timestamp for the document
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 */
function doIndicesPutAlias(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore,
      body: params.body || null
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  request.method = 'put';

  // find the url's params
  if (typeof params.index !== 'object' && params.index) {
    url.index = '' + params.index;
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
  }
  
  if (typeof params.name !== 'object' && params.name) {
    url.name = '' + params.name;
  } else {
    throw new TypeError('Invalid name: ' + params.name + ' should be a string.');
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('name')) {
    request.url = '/' + encodeURIComponent(url.index) + '/_alias/' + encodeURIComponent(url.name) + '';
  }
  else if (url.hasOwnProperty('name')) {
    request.url = '/_alias/' + encodeURIComponent(url.name) + '';
  }
  else if (url.hasOwnProperty('index')) {
    request.url = '/' + encodeURIComponent(url.index) + '/_alias';
  }
  else {
    request.url = '/_alias';
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

module.exports = doIndicesPutAlias;
