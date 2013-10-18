var _ = require('../../lib/utils'),
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
  if (typeof params === 'function') {
    cb = params;
    params = {};
  } else {
    params = params || {};
    cb = typeof cb === 'function' ? cb : _.noop;
  }

  var request = {
      ignore: params.ignore,
      body: params.body || null,
      method: 'PUT'
    },
    parts = {},
    query = {},
    responseOpts = {};


  // find the paths's params


  // build the path
  request.path = '/_cluster/settings';


  // build the query string

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doClusterPutSettings;
