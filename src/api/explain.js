var _ = require('../lib/utils');

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
 * @param {list} params.fields - A comma-separated list of fields to return in the response
 * @param {boolean} params.lenient - Specify whether format-based query failures (such as providing text to a numeric field) should be ignored
 * @param {boolean} params.lowercase_expanded_terms - Specify whether query terms should be lowercased
 * @param {string} params.parent - The ID of the parent document
 * @param {string} params.preference - Specify the node or shard the operation should be performed on (default: random)
 * @param {string} params.q - Query in the Lucene query string syntax
 * @param {string} params.routing - Specific routing value
 * @param {string} params.source - The URL-encoded query definition (instead of using the request body)
 */
function doExplain(params) {
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
  if (typeof params.id !== 'object' && typeof params.id !== 'undefined') {
    url.id = '' + params.id;
  } else {
    throw new TypeError('Invalid id: ' + params.id + ' should be a string.');
  }
  
  if (typeof params.index !== 'object' && typeof params.index !== 'undefined') {
    url.index = '' + params.index;
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
  }
  
  if (typeof params.type !== 'object' && typeof params.type !== 'undefined') {
    url.type = '' + params.type;
  } else {
    throw new TypeError('Invalid type: ' + params.type + ' should be a string.');
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type') && url.hasOwnProperty('id')) {
    request.url = '/' + url.index + '/' + url.type + '/' + url.id + '/_explain';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least index, type, id');
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
    if (typeof params.analyzer !== 'object' && typeof params.analyzer !== 'undefined') {
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
    if (typeof params.df !== 'object' && typeof params.df !== 'undefined') {
      query.df = '' + params.df;
    } else {
      throw new TypeError('Invalid df: ' + params.df + ' should be a string.');
    }
  }
  
  if (typeof params.fields !== 'undefined') {
    if (typeof params.fields === 'string') {
      query.fields = params.fields;
    } else if (_.isArray(params.fields)) {
      query.fields = params.fields.join(',');
    } else {
      throw new TypeError('Invalid fields: ' + params.fields + ' should be a comma seperated list or array.');
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
    if (typeof params.parent !== 'object' && typeof params.parent !== 'undefined') {
      query.parent = '' + params.parent;
    } else {
      throw new TypeError('Invalid parent: ' + params.parent + ' should be a string.');
    }
  }
  
  if (typeof params.preference !== 'undefined') {
    if (typeof params.preference !== 'object' && typeof params.preference !== 'undefined') {
      query.preference = '' + params.preference;
    } else {
      throw new TypeError('Invalid preference: ' + params.preference + ' should be a string.');
    }
  }
  
  if (typeof params.q !== 'undefined') {
    if (typeof params.q !== 'object' && typeof params.q !== 'undefined') {
      query.q = '' + params.q;
    } else {
      throw new TypeError('Invalid q: ' + params.q + ' should be a string.');
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

module.exports = doExplain;