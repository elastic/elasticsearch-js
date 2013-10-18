var _ = require('../../lib/utils'),
  errors = require('../../lib/errors'),
  q = require('q');

/**
 * Perform an elasticsearch [indices.get_aliases](http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/) request
 *
 * @for Client
 * @method indices.get_aliases
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.timeout - Explicit operation timeout
 */
function doIndicesGetAliases(params, cb) {
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


  // build the path
  if (parts.hasOwnProperty('index')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/_aliases';
  }
  else {
    request.path = '/_aliases';
  }


  // build the query string
  if (typeof params.timeout !== 'undefined') {
    if (params.timeout instanceof Date) {
      query.timeout = params.timeout.getTime();
    } else if (_.isNumeric(params.timeout)) {
      query.timeout = params.timeout;
    } else {
      throw new TypeError('Invalid timeout: ' + params.timeout + ' should be be some sort of time.');
    }
  }

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doIndicesGetAliases;
