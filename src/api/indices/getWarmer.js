var _ = require('../../lib/utils');



/**
 * Perform an elasticsearch [indices.getWarmer](http://www.elasticsearch.org/guide/reference/api/admin-indices-warmers/) request
 *
 * @for Client
 * @method indices.getWarmer
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doIndicesGetWarmer(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};

  request.method = 'GET';

  // find the url's params
  if (typeof params.index === 'string') {
    url.index = params.index;
  } else if (_.isArray(params.index)) {
    url.index = params.index.join(',');
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list or array.');
  }
  
  if (typeof params.name !== 'undefined') {
    if (typeof params.name !== 'object' && typeof params.name !== 'undefined') {
      url.name = '' + params.name;
    } else {
      throw new TypeError('Invalid name: ' + params.name + ' should be a string.');
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
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type') && url.hasOwnProperty('name')) {
    request.url = '/' + url.index + '/' + url.type + '/_warmer/' + url.name + '';
  }
  else if (url.hasOwnProperty('index') && url.hasOwnProperty('name')) {
    request.url = '/' + url.index + '/_warmer/' + url.name + '';
  }
  else if (url.hasOwnProperty('index')) {
    request.url = '/' + url.index + '/_warmer';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least index');
  }
  

  // build the query string

  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doIndicesGetWarmer;