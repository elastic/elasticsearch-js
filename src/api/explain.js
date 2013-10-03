var _ = require('../lib/toolbelt')
  , paramHelper = require('../lib/param_helper');

var defaultOperatorOptions = ['AND', 'OR'];



/**
 * Perform an elasticsearch [explain](http://elasticsearch.org/guide/reference/api/explain/) request
 *
 * @for Client
 * @method explain
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {boolean} params.analyze_wildcard - Specify whether wildcards and prefix queries in the query string query should be analyzed (default: false)
 * @param {string} params.analyzer - The analyzer for the query string query
 * @param {String} [params.default_operator=OR] - The default operator for query string query (AND or OR)
 * @param {string} params.df - The default field for query string query (default: _all)
 * @param {String|ArrayOfStrings|Boolean} params.fields - A comma-separated list of fields to return in the response
 * @param {boolean} params.lenient - Specify whether format-based query failures (such as providing text to a numeric field) should be ignored
 * @param {boolean} params.lowercase_expanded_terms - Specify whether query terms should be lowercased
 * @param {string} params.parent - The ID of the parent document
 * @param {string} params.preference - Specify the node or shard the operation should be performed on (default: random)
 * @param {string} params.q - Query in the Lucene query string syntax
 * @param {string} params.routing - Specific routing value
 * @param {string} params.source - The URL-encoded query definition (instead of using the request body)
 * @param {String|ArrayOfStrings|Boolean} params._source - True or false to return the _source field or not, or a list of fields to return
 * @param {String|ArrayOfStrings|Boolean} params._source_exclude - A list of fields to exclude from the returned _source field
 * @param {String|ArrayOfStrings|Boolean} params._source_include - A list of fields to extract and return from the _source field
 */
function doExplain(params, callback) {
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
  if (typeof params.id !== 'object' && params.id) {
    url.id = '' + params.id;
  } else {
    throw new TypeError('Invalid id: ' + params.id + ' should be a string.');
  }
  
  if (typeof params.index !== 'object' && params.index) {
    url.index = '' + params.index;
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
  }
  
  if (typeof params.type !== 'object' && params.type) {
    url.type = '' + params.type;
  } else {
    throw new TypeError('Invalid type: ' + params.type + ' should be a string.');
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type') && url.hasOwnProperty('id')) {
    request.url = '/' + encodeURIComponent(url.index) + '/' + encodeURIComponent(url.type) + '/' + encodeURIComponent(url.id) + '/_explain';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least [object Object], [object Object], [object Object]');
  }
  

  // build the query string
  if (typeof params.analyze_wildcard !== 'undefined') {
    if (params.analyze_wildcard.toLowerCase && (params.analyze_wildcard = params.analyze_wildcard.toLowerCase())
      && (params.analyze_wildcard === 'no' || params.analyze_wildcard === 'off')
    ) {
      query.analyze_wildcard = false;
    } else {
      query.analyze_wildcard = !!params.analyze_wildcard;
    }
  }
  
  if (typeof params.analyzer !== 'undefined') {
    if (typeof params.analyzer !== 'object' && params.analyzer) {
      query.analyzer = '' + params.analyzer;
    } else {
      throw new TypeError('Invalid analyzer: ' + params.analyzer + ' should be a string.');
    }
  }
  
  if (typeof params.default_operator !== 'undefined') {
    if (_.contains(defaultOperatorOptions, params.default_operator)) {
      query.default_operator = params.default_operator;
    } else {
      throw new TypeError(
        'Invalid default_operator: ' + params.default_operator +
        ' should be one of ' + defaultOperatorOptions.join(', ') + '.'
      );
    }
  }
  
  if (typeof params.df !== 'undefined') {
    if (typeof params.df !== 'object' && params.df) {
      query.df = '' + params.df;
    } else {
      throw new TypeError('Invalid df: ' + params.df + ' should be a string.');
    }
  }
  
  if (typeof params.fields !== 'undefined') {
    switch (typeof params.fields) {
    case 'string':
      query.fields = params.fields;
      break;
    case 'object':
      if (_.isArray(params.fields)) {
        query.fields = params.fields.join(',');
      } else {
        throw new TypeError('Invalid fields: ' + params.fields + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      query.fields = !!params.fields;
    }
  }
  
  if (typeof params.lenient !== 'undefined') {
    if (params.lenient.toLowerCase && (params.lenient = params.lenient.toLowerCase())
      && (params.lenient === 'no' || params.lenient === 'off')
    ) {
      query.lenient = false;
    } else {
      query.lenient = !!params.lenient;
    }
  }
  
  if (typeof params.lowercase_expanded_terms !== 'undefined') {
    if (params.lowercase_expanded_terms.toLowerCase && (params.lowercase_expanded_terms = params.lowercase_expanded_terms.toLowerCase())
      && (params.lowercase_expanded_terms === 'no' || params.lowercase_expanded_terms === 'off')
    ) {
      query.lowercase_expanded_terms = false;
    } else {
      query.lowercase_expanded_terms = !!params.lowercase_expanded_terms;
    }
  }
  
  if (typeof params.parent !== 'undefined') {
    if (typeof params.parent !== 'object' && params.parent) {
      query.parent = '' + params.parent;
    } else {
      throw new TypeError('Invalid parent: ' + params.parent + ' should be a string.');
    }
  }
  
  if (typeof params.preference !== 'undefined') {
    if (typeof params.preference !== 'object' && params.preference) {
      query.preference = '' + params.preference;
    } else {
      throw new TypeError('Invalid preference: ' + params.preference + ' should be a string.');
    }
  }
  
  if (typeof params.q !== 'undefined') {
    if (typeof params.q !== 'object' && params.q) {
      query.q = '' + params.q;
    } else {
      throw new TypeError('Invalid q: ' + params.q + ' should be a string.');
    }
  }
  
  if (typeof params.routing !== 'undefined') {
    if (typeof params.routing !== 'object' && params.routing) {
      query.routing = '' + params.routing;
    } else {
      throw new TypeError('Invalid routing: ' + params.routing + ' should be a string.');
    }
  }
  
  if (typeof params.source !== 'undefined') {
    if (typeof params.source !== 'object' && params.source) {
      query.source = '' + params.source;
    } else {
      throw new TypeError('Invalid source: ' + params.source + ' should be a string.');
    }
  }
  
  if (typeof params._source !== 'undefined') {
    switch (typeof params._source) {
    case 'string':
      query._source = params._source;
      break;
    case 'object':
      if (_.isArray(params._source)) {
        query._source = params._source.join(',');
      } else {
        throw new TypeError('Invalid _source: ' + params._source + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      query._source = !!params._source;
    }
  }
  
  if (typeof params._source_exclude !== 'undefined') {
    switch (typeof params._source_exclude) {
    case 'string':
      query._source_exclude = params._source_exclude;
      break;
    case 'object':
      if (_.isArray(params._source_exclude)) {
        query._source_exclude = params._source_exclude.join(',');
      } else {
        throw new TypeError('Invalid _source_exclude: ' + params._source_exclude + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      query._source_exclude = !!params._source_exclude;
    }
  }
  
  if (typeof params._source_include !== 'undefined') {
    switch (typeof params._source_include) {
    case 'string':
      query._source_include = params._source_include;
      break;
    case 'object':
      if (_.isArray(params._source_include)) {
        query._source_include = params._source_include.join(',');
      } else {
        throw new TypeError('Invalid _source_include: ' + params._source_include + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      query._source_include = !!params._source_include;
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doExplain;
