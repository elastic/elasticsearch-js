var _ = require('../../lib/utils');



/**
 * Perform an elasticsearch [indices.putMapping](http://www.elasticsearch.org/guide/reference/api/admin-indices-put-mapping/) request
 *
 * @for Client
 * @method indices.putMapping
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {boolean} params.ignore_conflicts - Specify whether to ignore conflicts while updating the mapping (default: false)
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 */
function doIndicesPutMapping(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};
  request.body = params.body || null;

  if (params.method) {
    if (params.method === 'PUT' || params.method === 'POST') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of PUT, POST');
    }
  } else {
    request.method = 'PUT';
  }

  // find the url's params
  if (typeof params.index === 'string') {
    url.index = params.index;
  } else if (_.isArray(params.index)) {
    url.index = params.index.join(',');
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list or array.');
  }
  
  if (typeof params.type !== 'object' && typeof params.type !== 'undefined') {
    url.type = '' + params.type;
  } else {
    throw new TypeError('Invalid type: ' + params.type + ' should be a string.');
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type')) {
    request.url = '/' + url.index + '/' + url.type + '/_mapping';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least index, type');
  }
  

  // build the query string
  if (typeof params.ignore_conflicts !== 'undefined') {
    if (params.ignore_conflicts.toLowerCase && (params.ignore_conflicts = params.ignore_conflicts.toLowerCase())
      && (params.ignore_conflicts === 'no' || params.ignore_conflicts === 'off')
    ) {
      query.ignore_conflicts = false;
    } else {
      query.ignore_conflicts = !!params.ignore_conflicts;
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
  
  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doIndicesPutMapping;