var _ = require('../../lib/utils');



/**
 * Perform an elasticsearch [indices.getAliases](http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/) request
 *
 * @for Client
 * @method indices.getAliases
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.timeout - Explicit operation timeout
 */
function doIndicesGetAliases(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};

  request.method = 'GET';

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
    request.url = '/' + url.index + '/_aliases';
  }
  else  {
    request.url = '/_aliases';
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
  
  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doIndicesGetAliases;