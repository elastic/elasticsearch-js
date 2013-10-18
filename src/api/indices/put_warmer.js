var _ = require('../../lib/utils'),
  errors = require('../../lib/errors'),
  q = require('q');

/**
 * Perform an elasticsearch [indices.put_warmer](http://www.elasticsearch.org/guide/reference/api/admin-indices-warmers/) request
 *
 * @for Client
 * @method indices.put_warmer
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 */
function doIndicesPutWarmer(params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  } else {
    params = params || {};
    cb = typeof cb === 'function' ? cb : _.noop;
  }

  var request = {
      ignore: params.ignore,
      body: params.body || null,
      method: 'PUT'
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

  if (typeof params.name !== 'object' && params.name) {
    parts.name = '' + params.name;
  } else {
    throw new TypeError('Invalid name: ' + params.name + ' should be a string.');
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
  if (parts.hasOwnProperty('index') && parts.hasOwnProperty('type') && parts.hasOwnProperty('name')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/' + encodeURIComponent(parts.type) + '/_warmer/' + encodeURIComponent(parts.name) + '';
  }
  else if (parts.hasOwnProperty('index') && parts.hasOwnProperty('name')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/_warmer/' + encodeURIComponent(parts.name) + '';
  }
  else {
    throw new TypeError('Unable to build a path with those params. Supply at least [object Object], [object Object]');
  }


  // build the query string
  if (typeof params.master_timeout !== 'undefined') {
    if (params.master_timeout instanceof Date) {
      query.master_timeout = params.master_timeout.getTime();
    } else if (_.isNumeric(params.master_timeout)) {
      query.master_timeout = params.master_timeout;
    } else {
      throw new TypeError('Invalid master_timeout: ' + params.master_timeout + ' should be be some sort of time.');
    }
  }

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doIndicesPutWarmer;
