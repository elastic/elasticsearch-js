var _ = require('../../lib/utils');

var ignoreIndicesOptions = ['none', 'missing'];



/**
 * Perform an elasticsearch [indices.existsType](http://www.elasticsearch.org/guide/reference/api/admin-indices-types-exists/) request
 *
 * @for Client
 * @method indices.existsType
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 */
function doIndicesExistsType(params) {
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
  
  if (typeof params.type === 'string') {
    url.type = params.type;
  } else if (_.isArray(params.type)) {
    url.type = params.type.join(',');
  } else {
    throw new TypeError('Invalid type: ' + params.type + ' should be a comma seperated list or array.');
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type')) {
    request.url = '/' + url.index + '/' + url.type + '';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least index, type');
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

module.exports = doIndicesExistsType;