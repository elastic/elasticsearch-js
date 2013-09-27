var _ = require('../lib/utils');



/**
 * Perform an elasticsearch [info](http://elasticsearch.org/guide/) request
 *
 * @for Client
 * @method info
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doInfo(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};

  if (params.method) {
    if (params.method === 'GET' || params.method === 'HEAD') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of GET, HEAD');
    }
  } else {
    request.method = 'GET';
  }

  // find the url's params


  // build the url
  request.url = '/';
  

  // build the query string

  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doInfo;