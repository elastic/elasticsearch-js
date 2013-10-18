var _ = require('../../lib/utils'),
  errors = require('../../lib/errors'),
  q = require('q');

/**
 * Perform an elasticsearch [indices.get_mapping](http://www.elasticsearch.org/guide/reference/api/admin-indices-get-mapping/) request
 *
 * @for Client
 * @method indices.get_mapping
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doIndicesGetMapping(params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  } else {
    params = params || {};
    cb = typeof cb === 'function' ? cb : _.noop;
  }

  var request = {
      ignore: params.ignore,
      method: 'GET'
    },
    parts = {},
    query = {},
    responseOpts = {};


  // find the paths's params
  if (typeof params.index !== 'undefined') {
    switch (typeof params.index) {
    case 'string':
      parts.index = params.index;
      break;
    case 'object':
      if (_.isArray(params.index)) {
        parts.index = params.index.join(',');
      } else {
        throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      parts.index = !!params.index;
    }
  }

  if (typeof params.type !== 'undefined') {
    switch (typeof params.type) {
    case 'string':
      parts.type = params.type;
      break;
    case 'object':
      if (_.isArray(params.type)) {
        parts.type = params.type.join(',');
      } else {
        throw new TypeError('Invalid type: ' + params.type + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      parts.type = !!params.type;
    }
  }


  // build the path
  if (parts.hasOwnProperty('index') && parts.hasOwnProperty('type')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/' + encodeURIComponent(parts.type) + '/_mapping';
  }
  else if (parts.hasOwnProperty('index')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/_mapping';
  }
  else {
    request.path = '/_mapping';
  }


  // build the query string

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doIndicesGetMapping;
