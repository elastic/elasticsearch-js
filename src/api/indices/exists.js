var _ = require('../../lib/toolbelt')
  , paramHelper = require('../../lib/param_helper');



/**
 * Perform an elasticsearch [indices.exists](http://www.elasticsearch.org/guide/reference/api/admin-indices-indices-exists/) request
 *
 * @for Client
 * @method indices.exists
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doIndicesExists(params, callback) {
  params = params || {};

  var request = {
      ignore: _.union([404], params.ignore)
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  request.method = 'head';

  // find the url's params
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
  

  // build the url
  if (url.hasOwnProperty('index')) {
    request.url = '/' + encodeURIComponent(url.index) + '';
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

module.exports = doIndicesExists;
