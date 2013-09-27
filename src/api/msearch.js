var _ = require('../lib/utils');

var searchTypeOptions = ['query_then_fetch', 'query_and_fetch', 'dfs_query_then_fetch', 'dfs_query_and_fetch', 'count', 'scan'];



/**
 * Perform an elasticsearch [msearch](http://www.elasticsearch.org/guide/reference/api/multi-search/) request
 *
 * @for Client
 * @method msearch
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.search_type - Search operation type
 */
function doMsearch(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};
  request.body = params.body || null;

  if (params.method) {
    if (params.method === 'GET' || params.method === 'POST') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of GET, POST');
    }
  } else {
    request.method = 'GET';
  }

  // find the url's params
  if (typeof params.index !== 'undefined') {
    if (typeof params.index === 'string') {
      url.index = params.index;
    } else if (_.isArray(params.index)) {
      url.index = params.index.join(',');
    } else {
      throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list or array.');
    }
  }
  
  if (typeof params.type !== 'undefined') {
    if (typeof params.type === 'string') {
      url.type = params.type;
    } else if (_.isArray(params.type)) {
      url.type = params.type.join(',');
    } else {
      throw new TypeError('Invalid type: ' + params.type + ' should be a comma seperated list or array.');
    }
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type')) {
    request.url = '/' + url.index + '/' + url.type + '/_msearch';
  }
  else if (url.hasOwnProperty('index')) {
    request.url = '/' + url.index + '/_msearch';
  }
  else  {
    request.url = '/_msearch';
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
  
  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doMsearch;