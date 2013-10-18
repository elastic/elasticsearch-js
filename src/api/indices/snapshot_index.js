var _ = require('../../lib/utils'),
  errors = require('../../lib/errors'),
  q = require('q');

var ignoreIndicesOptions = ['none', 'missing'];

/**
 * Perform an elasticsearch [indices.snapshot_index](http://www.elasticsearch.org/guide/reference/api/admin-indices-gateway-snapshot/) request
 *
 * @for Client
 * @method indices.snapshot_index
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 */
function doIndicesSnapshotIndex(params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  } else {
    params = params || {};
    cb = typeof cb === 'function' ? cb : _.noop;
  }

  var request = {
      ignore: params.ignore,
      method: 'POST'
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
    request.path = '/' + encodeURIComponent(parts.index) + '/_gateway/snapshot';
  }
  else {
    request.path = '/_gateway/snapshot';
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

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doIndicesSnapshotIndex;
