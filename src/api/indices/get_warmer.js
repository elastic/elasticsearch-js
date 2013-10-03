var _ = require('../../lib/toolbelt')
  , paramHelper = require('../../lib/param_helper');



/**
 * Perform an elasticsearch [indices.get_warmer](http://www.elasticsearch.org/guide/reference/api/admin-indices-warmers/) request
 *
 * @for Client
 * @method indices.get_warmer
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doIndicesGetWarmer(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  request.method = 'get';

  // find the url's params
  switch (typeof params.index) {
  case 'string':
    url.index = params.index;
    break;
  case 'object':
    if (_.isArray(params.index)) {
      url.index = params.index.join(',');
    } else {
      throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list, array, or boolean.');
    }
    break;
  default:
    url.index = !!params.index;
  }
  
  if (typeof params.name !== 'undefined') {
    if (typeof params.name !== 'object' && params.name) {
      url.name = '' + params.name;
    } else {
      throw new TypeError('Invalid name: ' + params.name + ' should be a string.');
    }
  }
  
  if (typeof params.type !== 'undefined') {
    switch (typeof params.type) {
    case 'string':
      url.type = params.type;
      break;
    case 'object':
      if (_.isArray(params.type)) {
        url.type = params.type.join(',');
      } else {
        throw new TypeError('Invalid type: ' + params.type + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      url.type = !!params.type;
    }
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type') && url.hasOwnProperty('name')) {
    request.url = '/' + encodeURIComponent(url.index) + '/' + encodeURIComponent(url.type) + '/_warmer/' + encodeURIComponent(url.name) + '';
  }
  else if (url.hasOwnProperty('index') && url.hasOwnProperty('name')) {
    request.url = '/' + encodeURIComponent(url.index) + '/_warmer/' + encodeURIComponent(url.name) + '';
  }
  else if (url.hasOwnProperty('index')) {
    request.url = '/' + encodeURIComponent(url.index) + '/_warmer';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least [object Object]');
  }
  

  // build the query string

  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doIndicesGetWarmer;
