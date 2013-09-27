var _ = require('../../lib/utils');



/**
 * Perform an elasticsearch [indices.exists](http://www.elasticsearch.org/guide/reference/api/admin-indices-indices-exists/) request
 *
 * @for Client
 * @method indices.exists
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doIndicesExists(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};

  request.method = 'HEAD';

  // find the url's params
  if (typeof params.index === 'string') {
    url.index = params.index;
  } else if (_.isArray(params.index)) {
    url.index = params.index.join(',');
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list or array.');
  }
  

  // build the url
  if (url.hasOwnProperty('index')) {
    request.url = '/' + url.index + '';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least index');
  }
  

  // build the query string

  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doIndicesExists;