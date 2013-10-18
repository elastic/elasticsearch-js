var _ = require('../lib/utils'),
  errors = require('../lib/errors'),
  q = require('q');

/**
 * Perform an elasticsearch [scroll](http://www.elasticsearch.org/guide/reference/api/search/scroll/) request
 *
 * @for Client
 * @method scroll
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {duration} params.scroll - Specify how long a consistent view of the index should be maintained for scrolled search
 * @param {string} params.scroll_id - The scroll ID for scrolled search
 */
function doScroll(params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  } else {
    params = params || {};
    cb = typeof cb === 'function' ? cb : _.noop;
  }

  var request = {
      ignore: params.ignore,
      body: params.body || null
    },
    parts = {},
    query = {},
    responseOpts = {};

  // figure out the method
  if (params.method = _.toUpperString(params.method)) {
    if (params.method === 'GET' || params.method === 'POST') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of GET, POST');
    }
  } else {
    request.method = params.body ? 'POST' : 'GET';
  }

  // find the paths's params
  if (typeof params.scroll_id !== 'undefined') {
    if (typeof params.scroll_id !== 'object' && params.scroll_id) {
      parts.scroll_id = '' + params.scroll_id;
    } else {
      throw new TypeError('Invalid scroll_id: ' + params.scroll_id + ' should be a string.');
    }
  }


  // build the path
  if (parts.hasOwnProperty('scroll_id')) {
    request.path = '/_search/scroll/' + encodeURIComponent(parts.scroll_id) + '';
    delete params.scroll_id;
  }
  else {
    request.path = '/_search/scroll';
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

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doScroll;
