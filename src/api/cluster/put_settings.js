var _ = require('../../lib/toolbelt')
  , paramHelper = require('../../lib/param_helper');



/**
 * Perform an elasticsearch [cluster.put_settings](http://elasticsearch.org/guide/reference/api/admin-cluster-update-settings/) request
 *
 * @for Client
 * @method cluster.put_settings
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doClusterPutSettings(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore,
      body: params.body || null
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  request.method = 'put';

  // find the url's params


  // build the url
  request.url = '/_cluster/settings';
  

  // build the query string

  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doClusterPutSettings;
