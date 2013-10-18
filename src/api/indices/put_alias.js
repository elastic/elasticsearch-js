var _ = require('../../lib/utils'),
  errors = require('../../lib/errors'),
  q = require('q');

/**
 * Perform an elasticsearch [indices.put_alias](http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/) request
 *
 * @for Client
 * @method indices.put_alias
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.timeout - Explicit timestamp for the document
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 */
function doIndicesPutAlias(params, cb) {
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
  if (typeof params.index !== 'object' && params.index) {
    parts.index = '' + params.index;
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
  }

  if (typeof params.name !== 'object' && params.name) {
    parts.name = '' + params.name;
  } else {
    throw new TypeError('Invalid name: ' + params.name + ' should be a string.');
  }


  // build the path
  if (parts.hasOwnProperty('index') && parts.hasOwnProperty('name')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/_alias/' + encodeURIComponent(parts.name) + '';
  }
  else if (parts.hasOwnProperty('name')) {
    request.path = '/_alias/' + encodeURIComponent(parts.name) + '';
  }
  else if (parts.hasOwnProperty('index')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/_alias';
  }
  else {
    request.path = '/_alias';
  }


  // build the query string
  if (typeof params.timeout !== 'undefined') {
    if (params.timeout instanceof Date) {
      query.timeout = params.timeout.getTime();
    } else if (_.isNumeric(params.timeout)) {
      query.timeout = params.timeout;
    } else {
      throw new TypeError('Invalid timeout: ' + params.timeout + ' should be be some sort of time.');
    }
  }

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

module.exports = doIndicesPutAlias;
