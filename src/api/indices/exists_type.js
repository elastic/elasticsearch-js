var _ = require('../../lib/utils'),
  paramHelper = require('../../lib/param_helper'),
  errors = require('../../lib/errors'),
  q = require('q');

var ignoreIndicesOptions = ['none', 'missing'];

/**
 * Perform an elasticsearch [indices.exists_type](http://www.elasticsearch.org/guide/reference/api/admin-indices-types-exists/) request
 *
 * @for Client
 * @method indices.exists_type
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 */
function doIndicesExistsType(params, cb) {
  params = params || {};

  var request = {
      ignore: _.union([404], params.ignore)
    }
    , parts = {}
    , query = {}
    , responseOpts = {};

  request.method = 'HEAD';

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


  // build the path
  if (parts.hasOwnProperty('index') && parts.hasOwnProperty('type')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/' + encodeURIComponent(parts.type) + '';
  }
  else {
    throw new TypeError('Unable to build a path with those params. Supply at least [object Object], [object Object]');
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

module.exports = doIndicesExistsType;
