var _ = require('../lib/utils'),
  paramHelper = require('../lib/param_helper'),
  errors = require('../lib/errors'),
  q = require('q');

var ignoreIndicesOptions = ['none', 'missing'];

/**
 * Perform an elasticsearch [suggest](http://elasticsearch.org/guide/reference/api/search/suggest/) request
 *
 * @for Client
 * @method suggest
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {string} params.preference - Specify the node or shard the operation should be performed on (default: random)
 * @param {string} params.routing - Specific routing value
 * @param {string} params.source - The URL-encoded request definition (instead of using request body)
 */
function doSuggest(params, cb) {
  params = params || {};

  var request = {
      ignore: params.ignore,
      body: params.body || null
    }
    , parts = {}
    , query = {}
    , responseOpts = {};

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
    request.path = '/' + encodeURIComponent(parts.index) + '/_suggest';
  }
  else {
    request.path = '/_suggest';
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

  if (typeof params.preference !== 'undefined') {
    if (typeof params.preference !== 'object' && params.preference) {
      query.preference = '' + params.preference;
    } else {
      throw new TypeError('Invalid preference: ' + params.preference + ' should be a string.');
    }
  }

  if (typeof params.routing !== 'undefined') {
    if (typeof params.routing !== 'object' && params.routing) {
      query.routing = '' + params.routing;
    } else {
      throw new TypeError('Invalid routing: ' + params.routing + ' should be a string.');
    }
  }

  if (typeof params.source !== 'undefined') {
    if (typeof params.source !== 'object' && params.source) {
      query.source = '' + params.source;
    } else {
      throw new TypeError('Invalid source: ' + params.source + ' should be a string.');
    }
  }

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doSuggest;
