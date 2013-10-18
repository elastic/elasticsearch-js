var _ = require('../../lib/utils'),
  errors = require('../../lib/errors'),
  q = require('q');

/**
 * Perform an elasticsearch [cluster.reroute](http://elasticsearch.org/guide/reference/api/admin-cluster-reroute/) request
 *
 * @for Client
 * @method cluster.reroute
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {boolean} params.dry_run - Simulate the operation only and return the resulting state
 * @param {boolean} params.filter_metadata - Don't return cluster state metadata (default: false)
 */
function doClusterReroute(params, cb) {
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
      method: 'POST'
    },
    parts = {},
    query = {},
    responseOpts = {};


  // find the paths's params


  // build the path
  request.path = '/_cluster/reroute';


  // build the query string
  if (typeof params.dry_run !== 'undefined') {
    if (params.dry_run.toLowerCase && (params.dry_run = params.dry_run.toLowerCase())
      && (params.dry_run === 'no' || params.dry_run === 'off')
    ) {
      query.dry_run = false;
    } else {
      query.dry_run = !!params.dry_run;
    }
  }

  if (typeof params.filter_metadata !== 'undefined') {
    if (params.filter_metadata.toLowerCase && (params.filter_metadata = params.filter_metadata.toLowerCase())
      && (params.filter_metadata === 'no' || params.filter_metadata === 'off')
    ) {
      query.filter_metadata = false;
    } else {
      query.filter_metadata = !!params.filter_metadata;
    }
  }

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doClusterReroute;
