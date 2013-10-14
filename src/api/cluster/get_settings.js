var _ = require('../../lib/utils'),
  paramHelper = require('../../lib/param_helper'),
  errors = require('../../lib/errors'),
  q = require('q');

/**
 * Perform an elasticsearch [cluster.get_settings](http://elasticsearch.org/guide/reference/api/admin-cluster-update-settings/) request
 *
 * @for Client
 * @method cluster.get_settings
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doClusterGetSettings(params, cb) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , parts = {}
    , query = {}
    , responseOpts = {};

  request.method = 'GET';

  // find the paths's params


  // build the path
  request.path = '/_cluster/settings';


  // build the query string

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doClusterGetSettings;
