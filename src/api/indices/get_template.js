var _ = require('../../lib/utils'),
  paramHelper = require('../../lib/param_helper'),
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
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , parts = {}
    , query = {}
    , responseOpts = {};

  request.method = 'GET';

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
