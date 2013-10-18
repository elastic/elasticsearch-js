var _ = require('../../lib/utils'),
  errors = require('../../lib/errors'),
  q = require('q');

var ignoreIndicesOptions = ['none', 'missing'];

/**
 * Perform an elasticsearch [indices.flush](http://www.elasticsearch.org/guide/reference/api/admin-indices-flush/) request
 *
 * @for Client
 * @method indices.flush
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {boolean} params.force - TODO: ?
 * @param {boolean} params.full - TODO: ?
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {boolean} params.refresh - Refresh the index after performing the operation
 */
function doIndicesFlush(params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  } else {
    params = params || {};
    cb = typeof cb === 'function' ? cb : _.noop;
  }

  var request = {
      ignore: params.ignore
    },
    parts = {},
    query = {},
    responseOpts = {};

  // figure out the method
  if (params.method = _.toUpperString(params.method)) {
    if (params.method === 'POST' || params.method === 'GET') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of POST, GET');
    }
  } else {
    request.method = params.body ? 'POST' : 'GET';
  }

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
    request.path = '/' + encodeURIComponent(parts.index) + '/_flush';
  }
  else {
    request.path = '/_flush';
  }


  // build the query string
  if (typeof params.force !== 'undefined') {
    if (params.force.toLowerCase && (params.force = params.force.toLowerCase())
      && (params.force === 'no' || params.force === 'off')
    ) {
      query.force = false;
    } else {
      query.force = !!params.force;
    }
  }

  if (typeof params.full !== 'undefined') {
    if (params.full.toLowerCase && (params.full = params.full.toLowerCase())
      && (params.full === 'no' || params.full === 'off')
    ) {
      query.full = false;
    } else {
      query.full = !!params.full;
    }
  }

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

  if (typeof params.refresh !== 'undefined') {
    if (params.refresh.toLowerCase && (params.refresh = params.refresh.toLowerCase())
      && (params.refresh === 'no' || params.refresh === 'off')
    ) {
      query.refresh = false;
    } else {
      query.refresh = !!params.refresh;
    }
  }

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doIndicesFlush;
