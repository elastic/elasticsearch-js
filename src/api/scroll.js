var _ = require('../lib/toolbelt')
  , paramHelper = require('../lib/param_helper');



/**
 * Perform an elasticsearch [scroll](http://www.elasticsearch.org/guide/reference/api/search/scroll/) request
 *
 * @for Client
 * @method scroll
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {duration} params.scroll - Specify how long a consistent view of the index should be maintained for scrolled search
 * @param {string} params.scroll_id - The scroll ID for scrolled search
 */
function doScroll(params, callback) {
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
  if (typeof params.scroll_id !== 'undefined') {
    if (typeof params.scroll_id !== 'object' && params.scroll_id) {
      url.scroll_id = '' + params.scroll_id;
    } else {
      throw new TypeError('Invalid scroll_id: ' + params.scroll_id + ' should be a string.');
    }
  }
  

  // build the url
  if (url.hasOwnProperty('scroll_id')) {
    request.url = '/_search/scroll/' + encodeURIComponent(url.scroll_id) + '';
    delete params.scroll_id;
  }
  else {
    request.url = '/_search/scroll';
  }
  

  // build the query string
  if (typeof params.scroll !== 'undefined') {
    if (_.isNumeric(params.scroll) || _.isInterval(params.scroll)) {
      query.scroll = params.scroll;
    } else {
      throw new TypeError('Invalid scroll: ' + params.scroll + ' should be a number or in interval notation (an integer followed by one of Mwdhmsy).');
    }
  }
  
  if (typeof params.scroll_id !== 'undefined') {
    if (typeof params.scroll_id !== 'object' && params.scroll_id) {
      query.scroll_id = '' + params.scroll_id;
    } else {
      throw new TypeError('Invalid scroll_id: ' + params.scroll_id + ' should be a string.');
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doScroll;
