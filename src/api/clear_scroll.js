var _ = require('../lib/utils'),
  errors = require('../lib/errors'),
  q = require('q');

/**
 * Perform an elasticsearch [clear_scroll](http://www.elasticsearch.org/guide/reference/api/search/scroll/) request
 *
 * @for Client
 * @method clear_scroll
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doClearScroll(params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  } else {
    params = params || {};
    cb = typeof cb === 'function' ? cb : _.noop;
  }

  var request = {
      ignore: params.ignore,
      method: 'DELETE'
    },
    parts = {},
    query = {},
    responseOpts = {};


  // find the paths's params
  if (typeof params.scroll_id !== 'undefined') {
    switch (typeof params.scroll_id) {
    case 'string':
      parts.scroll_id = params.scroll_id;
      break;
    case 'object':
      if (_.isArray(params.scroll_id)) {
        parts.scroll_id = params.scroll_id.join(',');
      } else {
        throw new TypeError('Invalid scroll_id: ' + params.scroll_id + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      parts.scroll_id = !!params.scroll_id;
    }
  }


  // build the path
  if (parts.hasOwnProperty('scroll_id')) {
    request.path = '/_search/scroll/' + encodeURIComponent(parts.scroll_id) + '';
  }
  else {
    throw new TypeError('Unable to build a path with those params. Supply at least [object Object]');
  }


  // build the query string

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doClearScroll;
