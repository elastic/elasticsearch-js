var _ = require('../../lib/utils');



/**
 * Perform an elasticsearch [indices.putWarmer](http://www.elasticsearch.org/guide/reference/api/admin-indices-warmers/) request
 *
 * @for Client
 * @method indices.putWarmer
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 */
function doIndicesPutWarmer(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};
  request.body = params.body || null;

  request.method = 'PUT';

  // find the url's params
  if (typeof params.index === 'string') {
    url.index = params.index;
  } else if (_.isArray(params.index)) {
    url.index = params.index.join(',');
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list or array.');
  }
  
  if (typeof params.name !== 'object' && typeof params.name !== 'undefined') {
    url.name = '' + params.name;
  } else {
    throw new TypeError('Invalid name: ' + params.name + ' should be a string.');
  }
  
  if (typeof params.type !== 'undefined') {
    if (typeof params.type === 'string') {
      url.type = params.type;
    } else if (_.isArray(params.type)) {
      url.type = params.type.join(',');
    } else {
      throw new TypeError('Invalid type: ' + params.type + ' should be a comma seperated list or array.');
    }
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type') && url.hasOwnProperty('name')) {
    request.url = '/' + url.index + '/' + url.type + '/_warmer/' + url.name + '';
  }
  else if (url.hasOwnProperty('index') && url.hasOwnProperty('name')) {
    request.url = '/' + url.index + '/_warmer/' + url.name + '';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least index, name');
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

  return this.client.request(request);
}

module.exports = doIndicesPutWarmer;