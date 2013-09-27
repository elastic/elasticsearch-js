var _ = require('../../lib/utils');



/**
 * Perform an elasticsearch [cluster.putSettings](http://elasticsearch.org/guide/reference/api/admin-cluster-update-settings/) request
 *
 * @for Client
 * @method cluster.putSettings
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doClusterPutSettings(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};
  request.body = params.body || null;

  request.method = 'PUT';

  // find the url's params


  // build the url
  request.url = '/_cluster/settings';
  

  // build the query string

  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doClusterPutSettings;