var _ = require('../../lib/toolbelt')
  , paramHelper = require('../../lib/param_helper');



/**
 * Perform an elasticsearch [cluster.get_settings](http://elasticsearch.org/guide/reference/api/admin-cluster-update-settings/) request
 *
 * @for Client
 * @method cluster.get_settings
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doClusterGetSettings(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  request.method = 'get';

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

module.exports = doClusterGetSettings;
