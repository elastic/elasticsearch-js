var _ = require('../../lib/utils'),
  paramHelper = require('../../lib/param_helper'),
  errors = require('../../lib/errors'),
  q = require('q');

/**
 * Perform an elasticsearch [cluster.put_settings](http://elasticsearch.org/guide/reference/api/admin-cluster-update-settings/) request
 *
 * @for Client
 * @method cluster.put_settings
 * @param {Object} params - An object with parameters used to carry out this action
 */
function doClusterPutSettings(params, cb) {
  params = params || {};

  var request = {
      ignore: params.ignore,
      body: params.body || null
    }
    , parts = {}
    , query = {}
    , responseOpts = {};

  request.method = 'PUT';

  // find the paths's params


  // build the path
  request.path = '/_cluster/settings';


  // build the query string

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doClusterPutSettings;
