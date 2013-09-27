var _ = require('../../lib/utils');

var ignoreIndicesOptions = ['none', 'missing'];



/**
 * Perform an elasticsearch [indices.existsAlias](http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/) request
 *
 * @for Client
 * @method indices.existsAlias
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 */
function doIndicesExistsAlias(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};

  request.method = 'HEAD';

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
  
  if (typeof params.name === 'string') {
    url.name = params.name;
  } else if (_.isArray(params.name)) {
    url.name = params.name.join(',');
  } else {
    throw new TypeError('Invalid name: ' + params.name + ' should be a comma seperated list or array.');
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('name')) {
    request.url = '/' + url.index + '/_alias/' + url.name + '';
  }
  else if (url.hasOwnProperty('name')) {
    request.url = '/_alias/' + url.name + '';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least name');
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

  return this.client.request(request);
}

module.exports = doIndicesExistsAlias;