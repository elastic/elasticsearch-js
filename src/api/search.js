var _ = require('../lib/toolbelt')
  , paramHelper = require('../lib/param_helper');

var defaultOperatorOptions = ['AND', 'OR'];
var ignoreIndicesOptions = ['none', 'missing'];
var searchTypeOptions = ['query_then_fetch', 'query_and_fetch', 'dfs_query_then_fetch', 'dfs_query_and_fetch', 'count', 'scan'];
var suggestModeOptions = ['missing', 'popular', 'always'];



/**
 * Perform an elasticsearch [search](http://www.elasticsearch.org/guide/reference/api/search/) request
 *
 * @for Client
 * @method search
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {string} params.analyzer - The analyzer to use for the query string
 * @param {boolean} params.analyze_wildcard - Specify whether wildcard and prefix queries should be analyzed (default: false)
 * @param {String} [params.default_operator=OR] - The default operator for query string query (AND or OR)
 * @param {string} params.df - The field to use as default where no field prefix is given in the query string
 * @param {boolean} params.explain - Specify whether to return detailed information about score computation as part of a hit
 * @param {String|ArrayOfStrings|Boolean} params.fields - A comma-separated list of fields to return as part of a hit
 * @param {number} params.from - Starting offset (default: 0)
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {String|ArrayOfStrings|Boolean} params.indices_boost - Comma-separated list of index boosts
 * @param {boolean} params.lenient - Specify whether format-based query failures (such as providing text to a numeric field) should be ignored
 * @param {boolean} params.lowercase_expanded_terms - Specify whether query terms should be lowercased
 * @param {string} params.preference - Specify the node or shard the operation should be performed on (default: random)
 * @param {string} params.q - Query in the Lucene query string syntax
 * @param {String|ArrayOfStrings|Boolean} params.routing - A comma-separated list of specific routing values
 * @param {duration} params.scroll - Specify how long a consistent view of the index should be maintained for scrolled search
 * @param {String} params.search_type - Search operation type
 * @param {number} params.size - Number of hits to return (default: 10)
 * @param {String|ArrayOfStrings|Boolean} params.sort - A comma-separated list of <field>:<direction> pairs
 * @param {string} params.source - The URL-encoded request definition using the Query DSL (instead of using request body)
 * @param {String|ArrayOfStrings|Boolean} params._source - True or false to return the _source field or not, or a list of fields to return
 * @param {String|ArrayOfStrings|Boolean} params._source_exclude - A list of fields to exclude from the returned _source field
 * @param {String|ArrayOfStrings|Boolean} params._source_include - A list of fields to extract and return from the _source field
 * @param {String|ArrayOfStrings|Boolean} params.stats - Specific 'tag' of the request for logging and statistical purposes
 * @param {string} params.suggest_field - Specify which field to use for suggestions
 * @param {String} [params.suggest_mode=missing] - Specify suggest mode
 * @param {number} params.suggest_size - How many suggestions to return in response
 * @param {text} params.suggest_text - The source text for which the suggestions should be returned
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {boolean} params.version - Specify whether to return document version as part of a hit
 */
function doSearch(params, callback) {
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
    switch (typeof params.index) {
    case 'string':
      url.index = params.index;
      break;
    case 'object':
      if (_.isArray(params.index)) {
        url.index = params.index.join(',');
      } else {
        throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      url.index = !!params.index;
    }
  }
  
  if (typeof params.type !== 'undefined') {
    switch (typeof params.type) {
    case 'string':
      url.type = params.type;
      break;
    case 'object':
      if (_.isArray(params.type)) {
        url.type = params.type.join(',');
      } else {
        throw new TypeError('Invalid type: ' + params.type + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      url.type = !!params.type;
    }
  }
  

  // build the url
  if (url.hasOwnProperty('type')) {
    request.url = '/' + encodeURIComponent(url.index || '_all') + '/' + encodeURIComponent(url.type) + '/_search';
  }
  else {
    request.url = '/' + encodeURIComponent(url.index || '_all') + '/_search';
  }
  

  // build the query string
  if (typeof params.analyzer !== 'undefined') {
    if (typeof params.analyzer !== 'object' && params.analyzer) {
      query.analyzer = '' + params.analyzer;
    } else {
      throw new TypeError('Invalid analyzer: ' + params.analyzer + ' should be a string.');
    }
  }
  
  if (typeof params.analyze_wildcard !== 'undefined') {
    if (params.analyze_wildcard.toLowerCase && (params.analyze_wildcard = params.analyze_wildcard.toLowerCase())
      && (params.analyze_wildcard === 'no' || params.analyze_wildcard === 'off')
    ) {
      query.analyze_wildcard = false;
    } else {
      query.analyze_wildcard = !!params.analyze_wildcard;
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
  
  if (typeof params.explain !== 'undefined') {
    if (params.explain.toLowerCase && (params.explain = params.explain.toLowerCase())
      && (params.explain === 'no' || params.explain === 'off')
    ) {
      query.explain = false;
    } else {
      query.explain = !!params.explain;
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
  
  if (typeof params.from !== 'undefined') {
    if (_.isNumeric(params.from)) {
      query.from = params.from * 1;
    } else {
      throw new TypeError('Invalid from: ' + params.from + ' should be a number.');
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
  
  if (typeof params.indices_boost !== 'undefined') {
    switch (typeof params.indices_boost) {
    case 'string':
      query.indices_boost = params.indices_boost;
      break;
    case 'object':
      if (_.isArray(params.indices_boost)) {
        query.indices_boost = params.indices_boost.join(',');
      } else {
        throw new TypeError('Invalid indices_boost: ' + params.indices_boost + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      query.indices_boost = !!params.indices_boost;
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
    switch (typeof params.routing) {
    case 'string':
      query.routing = params.routing;
      break;
    case 'object':
      if (_.isArray(params.routing)) {
        query.routing = params.routing.join(',');
      } else {
        throw new TypeError('Invalid routing: ' + params.routing + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      query.routing = !!params.routing;
    }
  }
  
  if (typeof params.scroll !== 'undefined') {
    if (_.isNumeric(params.scroll) || _.isInterval(params.scroll)) {
      query.scroll = params.scroll;
    } else {
      throw new TypeError('Invalid scroll: ' + params.scroll + ' should be a number or in interval notation (an integer followed by one of Mwdhmsy).');
    }
  }
  
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
  
  if (typeof params.size !== 'undefined') {
    if (_.isNumeric(params.size)) {
      query.size = params.size * 1;
    } else {
      throw new TypeError('Invalid size: ' + params.size + ' should be a number.');
    }
  }
  
  if (typeof params.sort !== 'undefined') {
    switch (typeof params.sort) {
    case 'string':
      query.sort = params.sort;
      break;
    case 'object':
      if (_.isArray(params.sort)) {
        query.sort = params.sort.join(',');
      } else {
        throw new TypeError('Invalid sort: ' + params.sort + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      query.sort = !!params.sort;
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
  
  if (typeof params.stats !== 'undefined') {
    switch (typeof params.stats) {
    case 'string':
      query.stats = params.stats;
      break;
    case 'object':
      if (_.isArray(params.stats)) {
        query.stats = params.stats.join(',');
      } else {
        throw new TypeError('Invalid stats: ' + params.stats + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      query.stats = !!params.stats;
    }
  }
  
  if (typeof params.suggest_field !== 'undefined') {
    if (typeof params.suggest_field !== 'object' && params.suggest_field) {
      query.suggest_field = '' + params.suggest_field;
    } else {
      throw new TypeError('Invalid suggest_field: ' + params.suggest_field + ' should be a string.');
    }
  }
  
  if (typeof params.suggest_mode !== 'undefined') {
    if (_.contains(suggestModeOptions, params.suggest_mode)) {
      query.suggest_mode = params.suggest_mode;
    } else {
      throw new TypeError(
        'Invalid suggest_mode: ' + params.suggest_mode +
        ' should be one of ' + suggestModeOptions.join(', ') + '.'
      );
    }
  }
  
  if (typeof params.suggest_size !== 'undefined') {
    if (_.isNumeric(params.suggest_size)) {
      query.suggest_size = params.suggest_size * 1;
    } else {
      throw new TypeError('Invalid suggest_size: ' + params.suggest_size + ' should be a number.');
    }
  }
  
  if (typeof params.suggest_text !== 'undefined') {
    if (typeof params.suggest_text !== 'object' && params.suggest_text) {
      query.suggest_text = '' + params.suggest_text;
    } else {
      throw new TypeError('Invalid suggest_text: ' + params.suggest_text + ' should be a string.');
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
  
  if (typeof params.version !== 'undefined') {
    if (params.version.toLowerCase && (params.version = params.version.toLowerCase())
      && (params.version === 'no' || params.version === 'off')
    ) {
      query.version = false;
    } else {
      query.version = !!params.version;
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doSearch;
