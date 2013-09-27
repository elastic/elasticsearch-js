var _ = require('../lib/utils');



/**
 * Perform an elasticsearch [mlt](http://elasticsearch.org/guide/reference/api/more-like-this/) request
 *
 * @for Client
 * @method mlt
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {number} params.boost_terms - The boost factor
 * @param {number} params.max_doc_freq - The word occurrence frequency as count: words with higher occurrence in the corpus will be ignored
 * @param {number} params.max_query_terms - The maximum query terms to be included in the generated query
 * @param {number} params.max_word_len - The minimum length of the word: longer words will be ignored
 * @param {number} params.min_doc_freq - The word occurrence frequency as count: words with lower occurrence in the corpus will be ignored
 * @param {number} params.min_term_freq - The term frequency as percent: terms with lower occurence in the source document will be ignored
 * @param {number} params.min_word_len - The minimum length of the word: shorter words will be ignored
 * @param {list} params.mlt_fields - Specific fields to perform the query against
 * @param {number} params.percent_terms_to_match - How many terms have to match in order to consider the document a match (default: 0.3)
 * @param {string} params.routing - Specific routing value
 * @param {number} params.search_from - The offset from which to return results
 * @param {list} params.search_indices - A comma-separated list of indices to perform the query against (default: the index containing the document)
 * @param {string} params.search_query_hint - The search query hint
 * @param {string} params.search_scroll - A scroll search request definition
 * @param {number} params.search_size - The number of documents to return (default: 10)
 * @param {string} params.search_source - A specific search request definition (instead of using the request body)
 * @param {string} params.search_type - Specific search type (eg. `dfs_then_fetch`, `count`, etc)
 * @param {list} params.search_types - A comma-separated list of types to perform the query against (default: the same type as the document)
 * @param {list} params.stop_words - A list of stop words to be ignored
 */
function doMlt(params) {
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
    request.url = '/' + url.index + '/' + url.type + '/' + url.id + '/_mlt';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least index, type, id');
  }
  

  // build the query string
  if (typeof params.boost_terms !== 'undefined') {
    if (_.isNumeric(params.boost_terms)) {
      query.boost_terms = params.boost_terms * 1;
    } else {
      throw new TypeError('Invalid boost_terms: ' + params.boost_terms + ' should be a number.');
    }
  }
  
  if (typeof params.max_doc_freq !== 'undefined') {
    if (_.isNumeric(params.max_doc_freq)) {
      query.max_doc_freq = params.max_doc_freq * 1;
    } else {
      throw new TypeError('Invalid max_doc_freq: ' + params.max_doc_freq + ' should be a number.');
    }
  }
  
  if (typeof params.max_query_terms !== 'undefined') {
    if (_.isNumeric(params.max_query_terms)) {
      query.max_query_terms = params.max_query_terms * 1;
    } else {
      throw new TypeError('Invalid max_query_terms: ' + params.max_query_terms + ' should be a number.');
    }
  }
  
  if (typeof params.max_word_len !== 'undefined') {
    if (_.isNumeric(params.max_word_len)) {
      query.max_word_len = params.max_word_len * 1;
    } else {
      throw new TypeError('Invalid max_word_len: ' + params.max_word_len + ' should be a number.');
    }
  }
  
  if (typeof params.min_doc_freq !== 'undefined') {
    if (_.isNumeric(params.min_doc_freq)) {
      query.min_doc_freq = params.min_doc_freq * 1;
    } else {
      throw new TypeError('Invalid min_doc_freq: ' + params.min_doc_freq + ' should be a number.');
    }
  }
  
  if (typeof params.min_term_freq !== 'undefined') {
    if (_.isNumeric(params.min_term_freq)) {
      query.min_term_freq = params.min_term_freq * 1;
    } else {
      throw new TypeError('Invalid min_term_freq: ' + params.min_term_freq + ' should be a number.');
    }
  }
  
  if (typeof params.min_word_len !== 'undefined') {
    if (_.isNumeric(params.min_word_len)) {
      query.min_word_len = params.min_word_len * 1;
    } else {
      throw new TypeError('Invalid min_word_len: ' + params.min_word_len + ' should be a number.');
    }
  }
  
  if (typeof params.mlt_fields !== 'undefined') {
    if (typeof params.mlt_fields === 'string') {
      query.mlt_fields = params.mlt_fields;
    } else if (_.isArray(params.mlt_fields)) {
      query.mlt_fields = params.mlt_fields.join(',');
    } else {
      throw new TypeError('Invalid mlt_fields: ' + params.mlt_fields + ' should be a comma seperated list or array.');
    }
  }
  
  if (typeof params.percent_terms_to_match !== 'undefined') {
    if (_.isNumeric(params.percent_terms_to_match)) {
      query.percent_terms_to_match = params.percent_terms_to_match * 1;
    } else {
      throw new TypeError('Invalid percent_terms_to_match: ' + params.percent_terms_to_match + ' should be a number.');
    }
  }
  
  if (typeof params.routing !== 'undefined') {
    if (typeof params.routing !== 'object' && typeof params.routing !== 'undefined') {
      query.routing = '' + params.routing;
    } else {
      throw new TypeError('Invalid routing: ' + params.routing + ' should be a string.');
    }
  }
  
  if (typeof params.search_from !== 'undefined') {
    if (_.isNumeric(params.search_from)) {
      query.search_from = params.search_from * 1;
    } else {
      throw new TypeError('Invalid search_from: ' + params.search_from + ' should be a number.');
    }
  }
  
  if (typeof params.search_indices !== 'undefined') {
    if (typeof params.search_indices === 'string') {
      query.search_indices = params.search_indices;
    } else if (_.isArray(params.search_indices)) {
      query.search_indices = params.search_indices.join(',');
    } else {
      throw new TypeError('Invalid search_indices: ' + params.search_indices + ' should be a comma seperated list or array.');
    }
  }
  
  if (typeof params.search_query_hint !== 'undefined') {
    if (typeof params.search_query_hint !== 'object' && typeof params.search_query_hint !== 'undefined') {
      query.search_query_hint = '' + params.search_query_hint;
    } else {
      throw new TypeError('Invalid search_query_hint: ' + params.search_query_hint + ' should be a string.');
    }
  }
  
  if (typeof params.search_scroll !== 'undefined') {
    if (typeof params.search_scroll !== 'object' && typeof params.search_scroll !== 'undefined') {
      query.search_scroll = '' + params.search_scroll;
    } else {
      throw new TypeError('Invalid search_scroll: ' + params.search_scroll + ' should be a string.');
    }
  }
  
  if (typeof params.search_size !== 'undefined') {
    if (_.isNumeric(params.search_size)) {
      query.search_size = params.search_size * 1;
    } else {
      throw new TypeError('Invalid search_size: ' + params.search_size + ' should be a number.');
    }
  }
  
  if (typeof params.search_source !== 'undefined') {
    if (typeof params.search_source !== 'object' && typeof params.search_source !== 'undefined') {
      query.search_source = '' + params.search_source;
    } else {
      throw new TypeError('Invalid search_source: ' + params.search_source + ' should be a string.');
    }
  }
  
  if (typeof params.search_type !== 'undefined') {
    if (typeof params.search_type !== 'object' && typeof params.search_type !== 'undefined') {
      query.search_type = '' + params.search_type;
    } else {
      throw new TypeError('Invalid search_type: ' + params.search_type + ' should be a string.');
    }
  }
  
  if (typeof params.search_types !== 'undefined') {
    if (typeof params.search_types === 'string') {
      query.search_types = params.search_types;
    } else if (_.isArray(params.search_types)) {
      query.search_types = params.search_types.join(',');
    } else {
      throw new TypeError('Invalid search_types: ' + params.search_types + ' should be a comma seperated list or array.');
    }
  }
  
  if (typeof params.stop_words !== 'undefined') {
    if (typeof params.stop_words === 'string') {
      query.stop_words = params.stop_words;
    } else if (_.isArray(params.stop_words)) {
      query.stop_words = params.stop_words.join(',');
    } else {
      throw new TypeError('Invalid stop_words: ' + params.stop_words + ' should be a comma seperated list or array.');
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doMlt;