var _ = require('../../lib/utils');



/**
 * Perform an elasticsearch [cluster.getSettings](http://elasticsearch.org/guide/reference/api/admin-cluster-update-settings/) request
 *
 * @for Client
 * @method cluster.getSettings
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doClusterGetSettings(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};

  request.method = 'GET';

  // find the url's params


  // build the url
  request.url = '/_cluster/settings';
  

  // build the query string

  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doClusterGetSettings;