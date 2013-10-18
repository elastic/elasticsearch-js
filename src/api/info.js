var _ = require('../lib/utils'),
  errors = require('../lib/errors'),
  q = require('q');

/**
 * Perform an elasticsearch [info](http://elasticsearch.org/guide/) request
 *
 * @for Client
 * @method info
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doInfo(params, cb) {
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
    if (params.method === 'GET' || params.method === 'HEAD') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of GET, HEAD');
    }
  } else {
    request.method = params.body ? 'HEAD' : 'GET';
  }

  // find the paths's params


  // build the path
  request.path = '/';


  // build the query string

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doInfo;
