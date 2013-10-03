var _ = require('../../lib/toolbelt')
  , paramHelper = require('../../lib/param_helper');

var formatOptions = ['detailed', 'text'];



/**
 * Perform an elasticsearch [indices.analyze](http://www.elasticsearch.org/guide/reference/api/admin-indices-analyze/) request
 *
 * @for Client
 * @method indices.analyze
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {string} params.analyzer - The name of the analyzer to use
 * @param {string} params.field - Use the analyzer configured for this field (instead of passing the analyzer name)
 * @param {String|ArrayOfStrings|Boolean} params.filters - A comma-separated list of filters to use for the analysis
 * @param {string} params.index - The name of the index to scope the operation
 * @param {boolean} params.prefer_local - With `true`, specify that a local shard should be used if available, with `false`, use a random shard (default: true)
 * @param {string} params.text - The text on which the analysis should be performed (when request body is not used)
 * @param {string} params.tokenizer - The name of the tokenizer to use for the analysis
 * @param {String} [params.format=detailed] - Format of the output
 */
function doIndicesAnalyze(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore,
      body: params.body || null
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  if (params.method = _.toLowerString(params.method)) {
    if (params.method === 'get' || params.method === 'post') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of get, post');
    }
  } else {
    request.method = params.body ? 'post' : 'get';
  }

  // find the url's params
  if (typeof params.index !== 'undefined') {
    if (typeof params.index !== 'object' && params.index) {
      url.index = '' + params.index;
    } else {
      throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
    }
  }
  

  // build the url
  if (url.hasOwnProperty('index')) {
    request.url = '/' + encodeURIComponent(url.index) + '/_analyze';
    delete params.index;
  }
  else {
    request.url = '/_analyze';
  }
  

  // build the query string
  if (typeof params.analyzer !== 'undefined') {
    if (typeof params.analyzer !== 'object' && params.analyzer) {
      query.analyzer = '' + params.analyzer;
    } else {
      throw new TypeError('Invalid analyzer: ' + params.analyzer + ' should be a string.');
    }
  }
  
  if (typeof params.field !== 'undefined') {
    if (typeof params.field !== 'object' && params.field) {
      query.field = '' + params.field;
    } else {
      throw new TypeError('Invalid field: ' + params.field + ' should be a string.');
    }
  }
  
  if (typeof params.filters !== 'undefined') {
    switch (typeof params.filters) {
    case 'string':
      query.filters = params.filters;
      break;
    case 'object':
      if (_.isArray(params.filters)) {
        query.filters = params.filters.join(',');
      } else {
        throw new TypeError('Invalid filters: ' + params.filters + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      query.filters = !!params.filters;
    }
  }
  
  if (typeof params.index !== 'undefined') {
    if (typeof params.index !== 'object' && params.index) {
      query.index = '' + params.index;
    } else {
      throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
    }
  }
  
  if (typeof params.prefer_local !== 'undefined') {
    if (params.prefer_local.toLowerCase && (params.prefer_local = params.prefer_local.toLowerCase())
      && (params.prefer_local === 'no' || params.prefer_local === 'off')
    ) {
      query.prefer_local = false;
    } else {
      query.prefer_local = !!params.prefer_local;
    }
  }
  
  if (typeof params.text !== 'undefined') {
    if (typeof params.text !== 'object' && params.text) {
      query.text = '' + params.text;
    } else {
      throw new TypeError('Invalid text: ' + params.text + ' should be a string.');
    }
  }
  
  if (typeof params.tokenizer !== 'undefined') {
    if (typeof params.tokenizer !== 'object' && params.tokenizer) {
      query.tokenizer = '' + params.tokenizer;
    } else {
      throw new TypeError('Invalid tokenizer: ' + params.tokenizer + ' should be a string.');
    }
  }
  
  if (typeof params.format !== 'undefined') {
    if (_.contains(formatOptions, params.format)) {
      query.format = params.format;
    } else {
      throw new TypeError(
        'Invalid format: ' + params.format +
        ' should be one of ' + formatOptions.join(', ') + '.'
      );
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doIndicesAnalyze;
