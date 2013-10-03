var _ = require('../../lib/toolbelt')
  , paramHelper = require('../../lib/param_helper');



/**
 * Perform an elasticsearch [indices.get_template](http://www.elasticsearch.org/guide/reference/api/admin-indices-templates/) request
 *
 * @for Client
 * @method indices.get_template
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doIndicesGetTemplate(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  request.method = 'get';

  // find the url's params
  if (typeof params.name !== 'object' && params.name) {
    url.name = '' + params.name;
  } else {
    throw new TypeError('Invalid name: ' + params.name + ' should be a string.');
  }
  

  // build the url
  if (url.hasOwnProperty('name')) {
    request.url = '/_template/' + encodeURIComponent(url.name) + '';
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

module.exports = doIndicesGetTemplate;
