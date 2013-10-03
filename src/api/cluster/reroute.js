var _ = require('../../lib/toolbelt')
  , paramHelper = require('../../lib/param_helper');



/**
 * Perform an elasticsearch [cluster.reroute](http://elasticsearch.org/guide/reference/api/admin-cluster-reroute/) request
 *
 * @for Client
 * @method cluster.reroute
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {boolean} params.dry_run - Simulate the operation only and return the resulting state
 * @param {boolean} params.filter_metadata - Don't return cluster state metadata (default: false)
 */
function doClusterReroute(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore,
      body: params.body || null
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  request.method = 'post';

  // find the url's params


  // build the url
  request.url = '/_cluster/reroute';
  

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
  
  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doClusterReroute;
