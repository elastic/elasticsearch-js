var _ = require('../../lib/utils'),
  paramHelper = require('../../lib/param_helper'),
  errors = require('../../lib/errors'),
  q = require('q');

var ignoreIndicesOptions = ['none', 'missing'];

/**
 * Perform an elasticsearch [indices.status](http://elasticsearch.org/guide/reference/api/admin-indices-status/) request
 *
 * @for Client
 * @method indices.status
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {*} params.operation_threading - TODO: ?
 * @param {boolean} params.recovery - Return information about shard recovery
 * @param {boolean} params.snapshot - TODO: ?
 */
function doIndicesStatus(params, cb) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , parts = {}
    , query = {}
    , responseOpts = {};

  request.method = 'GET';

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
    request.path = '/' + encodeURIComponent(parts.index) + '/_status';
  }
  else {
    request.path = '/_status';
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

  if (typeof params.recovery !== 'undefined') {
    if (params.recovery.toLowerCase && (params.recovery = params.recovery.toLowerCase())
      && (params.recovery === 'no' || params.recovery === 'off')
    ) {
      query.recovery = false;
    } else {
      query.recovery = !!params.recovery;
    }
  }

  if (typeof params.snapshot !== 'undefined') {
    if (params.snapshot.toLowerCase && (params.snapshot = params.snapshot.toLowerCase())
      && (params.snapshot === 'no' || params.snapshot === 'off')
    ) {
      query.snapshot = false;
    } else {
      query.snapshot = !!params.snapshot;
    }
  }

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doIndicesStatus;
