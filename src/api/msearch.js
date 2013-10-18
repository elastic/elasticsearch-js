var _ = require('../lib/utils'),
  errors = require('../lib/errors'),
  q = require('q');

var searchTypeOptions = ['query_then_fetch', 'query_and_fetch', 'dfs_query_then_fetch', 'dfs_query_and_fetch', 'count', 'scan'];

/**
 * Perform an elasticsearch [msearch](http://www.elasticsearch.org/guide/reference/api/multi-search/) request
 *
 * @for Client
 * @method msearch
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.search_type - Search operation type
 */
function doMsearch(params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  } else {
    params = params || {};
    cb = typeof cb === 'function' ? cb : _.noop;
  }

  var request = {
      ignore: params.ignore,
      body: this.client.config.serializer.bulkBody(params.body || null)
    },
    parts = {},
    query = {},
    responseOpts = {};

  // figure out the method
  if (params.method = _.toUpperString(params.method)) {
    if (params.method === 'GET' || params.method === 'POST') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of GET, POST');
    }
  } else {
    request.method = params.body ? 'POST' : 'GET';
  }

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
  if (parts.hasOwnProperty('index') && parts.hasOwnProperty('type')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/' + encodeURIComponent(parts.type) + '/_msearch';
  }
  else if (parts.hasOwnProperty('index')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/_msearch';
  }
  else {
    request.path = '/_msearch';
  }


  // build the query string
  if (typeof params.search_type !== 'undefined') {
    if (_.contains(searchTypeOptions, params.search_type)) {
      query.search_type = params.search_type;
    } else {
      throw new TypeError(
        'Invalid search_type: ' + params.search_type +
        ' should be one of ' + searchTypeOptions.join(', ') + '.'
      );
    }
  }

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doMsearch;
