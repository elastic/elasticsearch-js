var _ = require('../../lib/utils');



/**
 * Perform an elasticsearch [indices.getMapping](http://www.elasticsearch.org/guide/reference/api/admin-indices-get-mapping/) request
 *
 * @for Client
 * @method indices.getMapping
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doIndicesGetMapping(params) {
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
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type')) {
    request.url = '/' + url.index + '/' + url.type + '/_mapping';
  }
  else if (url.hasOwnProperty('index')) {
    request.url = '/' + url.index + '/_mapping';
  }
  else  {
    request.url = '/_mapping';
  }
  

  // build the query string

  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doIndicesGetMapping;