var _ = require('../../lib/utils'),
  errors = require('../../lib/errors'),
  q = require('q');

/**
 * Perform an elasticsearch [indices.put_template](http://www.elasticsearch.org/guide/reference/api/admin-indices-templates/) request
 *
 * @for Client
 * @method indices.put_template
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {number} params.order - The order for this template when merging multiple matching ones (higher numbers are merged later, overriding the lower numbers)
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 */
function doIndicesPutTemplate(params, cb) {
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
    if (params.method === 'PUT' || params.method === 'POST') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of PUT, POST');
    }
  } else {
    request.method = 'PUT';
  }

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
  if (typeof params.order !== 'undefined') {
    if (_.isNumeric(params.order)) {
      query.order = params.order * 1;
    } else {
      throw new TypeError('Invalid order: ' + params.order + ' should be a number.');
    }
  }

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

module.exports = doIndicesPutTemplate;
