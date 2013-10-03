var _ = require('../lib/toolbelt')
  , paramHelper = require('../lib/param_helper');



/**
 * Perform an elasticsearch [percolate](http://elasticsearch.org/guide/reference/api/percolate/) request
 *
 * @for Client
 * @method percolate
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {boolean} params.prefer_local - With `true`, specify that a local shard should be used if available, with `false`, use a random shard (default: true)
 */
function doPercolate(params, callback) {
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
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type')) {
    request.url = '/' + encodeURIComponent(url.index) + '/' + encodeURIComponent(url.type) + '/_percolate';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least [object Object], [object Object]');
  }
  

  // build the query string
  if (typeof params.prefer_local !== 'undefined') {
    if (params.prefer_local.toLowerCase && (params.prefer_local = params.prefer_local.toLowerCase())
      && (params.prefer_local === 'no' || params.prefer_local === 'off')
    ) {
      query.prefer_local = false;
    } else {
      query.prefer_local = !!params.prefer_local;
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doPercolate;
