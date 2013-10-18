var _ = require('../lib/utils'),
  errors = require('../lib/errors'),
  q = require('q');

/**
 * Perform an elasticsearch [percolate](http://elasticsearch.org/guide/reference/api/percolate/) request
 *
 * @for Client
 * @method percolate
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {boolean} params.prefer_local - With `true`, specify that a local shard should be used if available, with `false`, use a random shard (default: true)
 */
function doPercolate(params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  } else {
    params = params || {};
    cb = typeof cb === 'function' ? cb : _.noop;
  }

  var request = {
      ignore: params.ignore,
      body: params.body || null
    },
    parts = {},
    query = {},
    responseOpts = {};

  // figure out the method
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
  if (typeof params.index !== 'object' && params.index) {
    parts.index = '' + params.index;
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
  }

  if (typeof params.type !== 'object' && params.type) {
    parts.type = '' + params.type;
  } else {
    throw new TypeError('Invalid type: ' + params.type + ' should be a string.');
  }


  // build the path
  if (parts.hasOwnProperty('index') && parts.hasOwnProperty('type')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/' + encodeURIComponent(parts.type) + '/_percolate';
  }
  else {
    throw new TypeError('Unable to build a path with those params. Supply at least [object Object], [object Object]');
  }


  // build the query string
  if (typeof params.prefer_local !== 'undefined') {
    if (params.prefer_local.toLowerCase && (params.prefer_local = params.prefer_local.toLowerCase())
      && (params.prefer_local === 'no' || params.prefer_local === 'off')
    ) {
      query.prefer_local = false;
    } else {
      query.prefer_local = !!params.prefer_local;
    }
  }

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doPercolate;
