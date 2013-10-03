var _ = require('../lib/toolbelt')
  , paramHelper = require('../lib/param_helper');



/**
 * Perform an elasticsearch [clear_scroll](http://www.elasticsearch.org/guide/reference/api/search/scroll/) request
 *
 * @for Client
 * @method clear_scroll
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doClearScroll(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  request.method = 'delete';

  // find the url's params
  if (typeof params.scroll_id !== 'undefined') {
    switch (typeof params.scroll_id) {
    case 'string':
      url.scroll_id = params.scroll_id;
      break;
    case 'object':
      if (_.isArray(params.scroll_id)) {
        url.scroll_id = params.scroll_id.join(',');
      } else {
        throw new TypeError('Invalid scroll_id: ' + params.scroll_id + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      url.scroll_id = !!params.scroll_id;
    }
  }
  

  // build the url
  if (url.hasOwnProperty('scroll_id')) {
    request.url = '/_search/scroll/' + encodeURIComponent(url.scroll_id) + '';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least [object Object]');
  }
  

  // build the query string

  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doClearScroll;
