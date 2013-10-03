var _ = require('../lib/toolbelt')
  , paramHelper = require('../lib/param_helper');



/**
 * Perform an elasticsearch [info](http://elasticsearch.org/guide/) request
 *
 * @for Client
 * @method info
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doInfo(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  if (params.method = _.toLowerString(params.method)) {
    if (params.method === 'get' || params.method === 'head') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of get, head');
    }
  } else {
    request.method = params.body ? 'head' : 'get';
  }

  // find the url's params


  // build the url
  request.url = '/';
  

  // build the query string

  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doInfo;
