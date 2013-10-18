var _ = require('../../lib/utils'),
  errors = require('../../lib/errors'),
  q = require('q');

/**
 * Perform an elasticsearch [indices.exists](http://www.elasticsearch.org/guide/reference/api/admin-indices-indices-exists/) request
 *
 * @for Client
 * @method indices.exists
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doIndicesExists(params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  } else {
    params = params || {};
    cb = typeof cb === 'function' ? cb : _.noop;
  }

  var request = {
      ignore: _.union([404], params.ignore),
      method: 'HEAD'
    },
    parts = {},
    query = {},
    responseOpts = {};


  // find the paths's params
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


  // build the path
  if (parts.hasOwnProperty('index')) {
    request.path = '/' + encodeURIComponent(parts.index) + '';
  }
  else {
    throw new TypeError('Unable to build a path with those params. Supply at least [object Object]');
  }


  // build the query string

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, function (err, response) {
    if (err instanceof errors.NotFound) {
      cb(err, false);
    } else {
      cb(err, true);
    }
  });
}

module.exports = doIndicesExists;
