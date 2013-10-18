var _ = require('../../lib/utils'),
  errors = require('../../lib/errors'),
  q = require('q');

/**
 * Perform an elasticsearch [indices.get_template](http://www.elasticsearch.org/guide/reference/api/admin-indices-templates/) request
 *
 * @for Client
 * @method indices.get_template
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doIndicesGetTemplate(params, cb) {
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
  if (typeof params.name !== 'object' && params.name) {
    parts.name = '' + params.name;
  } else {
    throw new TypeError('Invalid name: ' + params.name + ' should be a string.');
  }


  // build the path
  if (parts.hasOwnProperty('name')) {
    request.path = '/_template/' + encodeURIComponent(parts.name) + '';
  }
  else {
    throw new TypeError('Unable to build a path with those params. Supply at least [object Object]');
  }


  // build the query string

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doIndicesGetTemplate;
