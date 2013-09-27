var _ = require('../../lib/utils');

var ignoreIndicesOptions = ['none', 'missing'];



/**
 * Perform an elasticsearch [indices.validateQuery](http://www.elasticsearch.org/guide/reference/api/validate/) request
 *
 * @for Client
 * @method indices.validateQuery
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {boolean} params.explain - Return detailed information about the error
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {*} params.operation_threading - TODO: ?
 * @param {string} params.source - The URL-encoded query definition (instead of using the request body)
 * @param {string} params.q - Query in the Lucene query string syntax
 */
function doIndicesValidateQuery(params) {
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
    request.url = '/' + url.index + '/' + url.type + '/_validate/query';
  }
  else if (url.hasOwnProperty('index')) {
    request.url = '/' + url.index + '/_validate/query';
  }
  else  {
    request.url = '/_validate/query';
  }
  

  // build the query string
  if (typeof params.explain !== 'undefined') {
    if (params.explain.toLowerCase && (params.explain = params.explain.toLowerCase())
      && (params.explain === 'no' || params.explain === 'off')
    ) {
      query.explain = false;
    } else {
      query.explain = !!params.explain;
    }
  }
  
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
  
  if (typeof params.operation_threading !== 'undefined') {
    query.operation_threading = params.operation_threading;
  }
  
  if (typeof params.source !== 'undefined') {
    if (typeof params.source !== 'object' && typeof params.source !== 'undefined') {
      query.source = '' + params.source;
    } else {
      throw new TypeError('Invalid source: ' + params.source + ' should be a string.');
    }
  }
  
  if (typeof params.q !== 'undefined') {
    if (typeof params.q !== 'object' && typeof params.q !== 'undefined') {
      query.q = '' + params.q;
    } else {
      throw new TypeError('Invalid q: ' + params.q + ' should be a string.');
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doIndicesValidateQuery;