var _ = require('../../lib/utils');



/**
 * Perform an elasticsearch [indices.deleteAlias](http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/) request
 *
 * @for Client
 * @method indices.deleteAlias
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.timeout - Explicit timestamp for the document
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 */
function doIndicesDeleteAlias(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};

  request.method = 'DELETE';

  // find the url's params
  if (typeof params.index !== 'object' && typeof params.index !== 'undefined') {
    url.index = '' + params.index;
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
  }
  
  if (typeof params.name !== 'object' && typeof params.name !== 'undefined') {
    url.name = '' + params.name;
  } else {
    throw new TypeError('Invalid name: ' + params.name + ' should be a string.');
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('name')) {
    request.url = '/' + url.index + '/_alias/' + url.name + '';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least index, name');
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

  return this.client.request(request);
}

module.exports = doIndicesDeleteAlias;