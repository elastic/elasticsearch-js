var _ = require('../../lib/utils'),
  paramHelper = require('../../lib/param_helper'),
  errors = require('../../lib/errors'),
  q = require('q');

var ignoreIndicesOptions = ['none', 'missing'];

/**
 * Perform an elasticsearch [indices.validate_query](http://www.elasticsearch.org/guide/reference/api/validate/) request
 *
 * @for Client
 * @method indices.validate_query
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {boolean} params.explain - Return detailed information about the error
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {*} params.operation_threading - TODO: ?
 * @param {string} params.source - The URL-encoded query definition (instead of using the request body)
 * @param {string} params.q - Query in the Lucene query string syntax
 */
function doIndicesValidateQuery(params, cb) {
  params = params || {};

  var request = {
      ignore: params.ignore,
      body: params.body || null
    }
    , parts = {}
    , query = {}
    , responseOpts = {};

  if (params.method = _.toUpperString(params.method)) {
    if (params.method === 'GET' || params.method === 'POST') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of GET, POST');
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
    request.path = '/' + encodeURIComponent(parts.index) + '/' + encodeURIComponent(parts.type) + '/_validate/query';
  }
  else if (parts.hasOwnProperty('index')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/_validate/query';
  }
  else {
    request.path = '/_validate/query';
  }


  // build the query string
  if (typeof params.explain !== 'undefined') {
    if (params.explain.toLowerCase && (params.explain = params.explain.toLowerCase())
      && (params.explain === 'no' || params.explain === 'off')
    ) {
      query.explain = false;
    } else {
      query.explain = !!params.explain;
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

  if (typeof params.operation_threading !== 'undefined') {
    query.operation_threading = params.operation_threading;
  }

  if (typeof params.source !== 'undefined') {
    if (typeof params.source !== 'object' && params.source) {
      query.source = '' + params.source;
    } else {
      throw new TypeError('Invalid source: ' + params.source + ' should be a string.');
    }
  }

  if (typeof params.q !== 'undefined') {
    if (typeof params.q !== 'object' && params.q) {
      query.q = '' + params.q;
    } else {
      throw new TypeError('Invalid q: ' + params.q + ' should be a string.');
    }
  }

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doIndicesValidateQuery;
