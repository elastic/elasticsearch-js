var _ = require('../../lib/utils'),
  paramHelper = require('../../lib/param_helper'),
  errors = require('../../lib/errors'),
  q = require('q');

var ignoreIndicesOptions = ['none', 'missing'];

/**
 * Perform an elasticsearch [indices.exists_alias](http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/) request
 *
 * @for Client
 * @method indices.exists_alias
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 */
function doIndicesExistsAlias(params, cb) {
  params = params || {};

  var request = {
      ignore: _.union([404], params.ignore)
    }
    , parts = {}
    , query = {}
    , responseOpts = {};

  request.method = 'HEAD';

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

  switch (typeof params.name) {
  case 'string':
    parts.name = params.name;
    break;
  case 'object':
    if (_.isArray(params.name)) {
      parts.name = params.name.join(',');
    } else {
      throw new TypeError('Invalid name: ' + params.name + ' should be a comma seperated list, array, or boolean.');
    }
    break;
  default:
    parts.name = !!params.name;
  }


  // build the path
  if (parts.hasOwnProperty('index') && parts.hasOwnProperty('name')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/_alias/' + encodeURIComponent(parts.name) + '';
  }
  else if (parts.hasOwnProperty('name')) {
    request.path = '/_alias/' + encodeURIComponent(parts.name) + '';
  }
  else {
    throw new TypeError('Unable to build a path with those params. Supply at least [object Object]');
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

  this.client.request(request, function (err, response) {
    if (err instanceof errors.NotFound) {
      cb(err, false);
    } else {
      cb(err, true);
    }
  });
}

module.exports = doIndicesExistsAlias;
