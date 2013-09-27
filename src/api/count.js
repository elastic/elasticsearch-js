var _ = require('../lib/utils');

var ignoreIndicesOptions = ['none', 'missing'];



/**
 * Perform an elasticsearch [count](http://elasticsearch.org/guide/reference/api/count/) request
 *
 * @for Client
 * @method count
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {number} params.min_score - Include only documents with a specific `_score` value in the result
 * @param {string} params.preference - Specify the node or shard the operation should be performed on (default: random)
 * @param {string} params.routing - Specific routing value
 * @param {string} params.source - The URL-encoded query definition (instead of using the request body)
 */
function doCount(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};
  request.body = params.body || null;

  if (params.method) {
    if (params.method === 'POST' || params.method === 'GET') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of POST, GET');
    }
  } else {
    request.method = 'POST';
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
    request.url = '/' + url.index + '/' + url.type + '/_count';
  }
  else if (url.hasOwnProperty('index')) {
    request.url = '/' + url.index + '/_count';
  }
  else  {
    request.url = '/_count';
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
  
  if (typeof params.min_score !== 'undefined') {
    if (_.isNumeric(params.min_score)) {
      query.min_score = params.min_score * 1;
    } else {
      throw new TypeError('Invalid min_score: ' + params.min_score + ' should be a number.');
    }
  }
  
  if (typeof params.preference !== 'undefined') {
    if (typeof params.preference !== 'object' && typeof params.preference !== 'undefined') {
      query.preference = '' + params.preference;
    } else {
      throw new TypeError('Invalid preference: ' + params.preference + ' should be a string.');
    }
  }
  
  if (typeof params.routing !== 'undefined') {
    if (typeof params.routing !== 'object' && typeof params.routing !== 'undefined') {
      query.routing = '' + params.routing;
    } else {
      throw new TypeError('Invalid routing: ' + params.routing + ' should be a string.');
    }
  }
  
  if (typeof params.source !== 'undefined') {
    if (typeof params.source !== 'object' && typeof params.source !== 'undefined') {
      query.source = '' + params.source;
    } else {
      throw new TypeError('Invalid source: ' + params.source + ' should be a string.');
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doCount;