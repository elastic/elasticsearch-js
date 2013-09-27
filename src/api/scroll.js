var _ = require('../lib/utils');



/**
 * Perform an elasticsearch [scroll](http://www.elasticsearch.org/guide/reference/api/search/scroll/) request
 *
 * @for Client
 * @method scroll
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {duration} params.scroll - Specify how long a consistent view of the index should be maintained for scrolled search
 * @param {string} params.scroll_id - The scroll ID for scrolled search
 */
function doScroll(params) {
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
  if (typeof params.scroll_id !== 'undefined') {
    if (typeof params.scroll_id !== 'object' && typeof params.scroll_id !== 'undefined') {
      url.scroll_id = '' + params.scroll_id;
    } else {
      throw new TypeError('Invalid scroll_id: ' + params.scroll_id + ' should be a string.');
    }
  }
  

  // build the url
  if (url.hasOwnProperty('scroll_id')) {
    request.url = '/_search/scroll/' + url.scroll_id + '';
  }
  else  {
    request.url = '/_search/scroll';
  }
  

  // build the query string
  if (typeof params.scroll !== 'undefined') {
    if (_.isInterval(params.scroll)) {
      query.scroll = params.scroll;
    } else {
      throw new TypeError('Invalid scroll: ' + params.scroll + ' should be in interval notation (an integer followed by one of Mwdhmsy).');
    }
  }
  
  if (typeof params.scroll_id !== 'undefined') {
    if (typeof params.scroll_id !== 'object' && typeof params.scroll_id !== 'undefined') {
      query.scroll_id = '' + params.scroll_id;
    } else {
      throw new TypeError('Invalid scroll_id: ' + params.scroll_id + ' should be a string.');
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doScroll;