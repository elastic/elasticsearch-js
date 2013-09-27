var _ = require('../../lib/utils');



/**
 * Perform an elasticsearch [indices.getTemplate](http://www.elasticsearch.org/guide/reference/api/admin-indices-templates/) request
 *
 * @for Client
 * @method indices.getTemplate
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doIndicesGetTemplate(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};

  request.method = 'GET';

  // find the url's params
  if (typeof params.name !== 'object' && typeof params.name !== 'undefined') {
    url.name = '' + params.name;
  } else {
    throw new TypeError('Invalid name: ' + params.name + ' should be a string.');
  }
  

  // build the url
  if (url.hasOwnProperty('name')) {
    request.url = '/_template/' + url.name + '';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least name');
  }
  

  // build the query string

  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doIndicesGetTemplate;