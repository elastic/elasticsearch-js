var _ = require('../../lib/toolbelt')
  , paramHelper = require('../../lib/param_helper');

var ignoreIndicesOptions = ['none', 'missing'];



/**
 * Perform an elasticsearch [indices.get_alias](http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/) request
 *
 * @for Client
 * @method indices.get_alias
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 */
function doIndicesGetAlias(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  request.method = 'get';

  // find the url's params
  if (typeof params.index !== 'undefined') {
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
  }
  
  switch (typeof params.name) {
  case 'string':
    url.name = params.name;
    break;
  case 'object':
    if (_.isArray(params.name)) {
      url.name = params.name.join(',');
    } else {
      throw new TypeError('Invalid name: ' + params.name + ' should be a comma seperated list, array, or boolean.');
    }
    break;
  default:
    url.name = !!params.name;
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('name')) {
    request.url = '/' + encodeURIComponent(url.index) + '/_alias/' + encodeURIComponent(url.name) + '';
  }
  else if (url.hasOwnProperty('name')) {
    request.url = '/_alias/' + encodeURIComponent(url.name) + '';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least [object Object]');
  }
  

  // build the query string
  if (typeof params.ignore_indices !== 'undefined') {
    if (_.contains(ignoreIndicesOptions, params.ignore_indices)) {
      query.ignore_indices = params.ignore_indices;
    } else {
      throw new TypeError(
        'Invalid ignore_indices: ' + params.ignore_indices +
        ' should be one of ' + ignoreIndicesOptions.join(', ') + '.'
      );
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doIndicesGetAlias;
