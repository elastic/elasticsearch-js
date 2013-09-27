var _ = require('../../lib/utils');



/**
 * Perform an elasticsearch [indices.getSettings](http://www.elasticsearch.org/guide/reference/api/admin-indices-get-settings/) request
 *
 * @for Client
 * @method indices.getSettings
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doIndicesGetSettings(params) {
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
    request.url = '/' + url.index + '/_settings';
  }
  else  {
    request.url = '/_settings';
  }
  

  // build the query string

  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doIndicesGetSettings;