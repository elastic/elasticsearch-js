var _ = require('../../lib/utils');

var formatOptions = ['detailed', 'text'];



/**
 * Perform an elasticsearch [indices.analyze](http://www.elasticsearch.org/guide/reference/api/admin-indices-analyze/) request
 *
 * @for Client
 * @method indices.analyze
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {string} params.analyzer - The name of the analyzer to use
 * @param {string} params.field - Use the analyzer configured for this field (instead of passing the analyzer name)
 * @param {list} params.filters - A comma-separated list of filters to use for the analysis
 * @param {string} params.index - The name of the index to scope the operation
 * @param {boolean} params.prefer_local - With `true`, specify that a local shard should be used if available, with `false`, use a random shard (default: true)
 * @param {string} params.text - The text on which the analysis should be performed (when request body is not used)
 * @param {string} params.tokenizer - The name of the tokenizer to use for the analysis
 * @param {String} [params.format=detailed] - Format of the output
 */
function doIndicesAnalyze(params) {
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
    if (typeof params.index !== 'object' && typeof params.index !== 'undefined') {
      url.index = '' + params.index;
    } else {
      throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
    }
  }
  

  // build the url
  if (url.hasOwnProperty('index')) {
    request.url = '/' + url.index + '/_analyze';
  }
  else  {
    request.url = '/_analyze';
  }
  

  // build the query string
  if (typeof params.analyzer !== 'undefined') {
    if (typeof params.analyzer !== 'object' && typeof params.analyzer !== 'undefined') {
      query.analyzer = '' + params.analyzer;
    } else {
      throw new TypeError('Invalid analyzer: ' + params.analyzer + ' should be a string.');
    }
  }
  
  if (typeof params.field !== 'undefined') {
    if (typeof params.field !== 'object' && typeof params.field !== 'undefined') {
      query.field = '' + params.field;
    } else {
      throw new TypeError('Invalid field: ' + params.field + ' should be a string.');
    }
  }
  
  if (typeof params.filters !== 'undefined') {
    if (typeof params.filters === 'string') {
      query.filters = params.filters;
    } else if (_.isArray(params.filters)) {
      query.filters = params.filters.join(',');
    } else {
      throw new TypeError('Invalid filters: ' + params.filters + ' should be a comma seperated list or array.');
    }
  }
  
  if (typeof params.index !== 'undefined') {
    if (typeof params.index !== 'object' && typeof params.index !== 'undefined') {
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
    if (typeof params.text !== 'object' && typeof params.text !== 'undefined') {
      query.text = '' + params.text;
    } else {
      throw new TypeError('Invalid text: ' + params.text + ' should be a string.');
    }
  }
  
  if (typeof params.tokenizer !== 'undefined') {
    if (typeof params.tokenizer !== 'object' && typeof params.tokenizer !== 'undefined') {
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

  return this.client.request(request);
}

module.exports = doIndicesAnalyze;