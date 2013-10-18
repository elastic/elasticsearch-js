var _ = require('../../lib/utils'),
  errors = require('../../lib/errors'),
  q = require('q');

var ignoreIndicesOptions = ['none', 'missing'];

/**
 * Perform an elasticsearch [indices.segments](http://elasticsearch.org/guide/reference/api/admin-indices-segments/) request
 *
 * @for Client
 * @method indices.segments
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {*} params.operation_threading - TODO: ?
 */
function doIndicesSegments(params, cb) {
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
    request.path = '/' + encodeURIComponent(parts.index) + '/_segments';
  }
  else {
    request.path = '/_segments';
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

  if (typeof params.operation_threading !== 'undefined') {
    query.operation_threading = params.operation_threading;
  }

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doIndicesSegments;
