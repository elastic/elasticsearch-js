var _ = require('../../lib/toolbelt')
  , paramHelper = require('../../lib/param_helper');



/**
 * Perform an elasticsearch [cluster.node_shutdown](http://elasticsearch.org/guide/reference/api/admin-cluster-nodes-shutdown/) request
 *
 * @for Client
 * @method cluster.node_shutdown
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.delay - Set the delay for the operation (default: 1s)
 * @param {boolean} params.exit - Exit the JVM as well (default: true)
 */
function doClusterNodeShutdown(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  request.method = 'post';

  // find the url's params
  if (typeof params.node_id !== 'undefined') {
    switch (typeof params.node_id) {
    case 'string':
      url.node_id = params.node_id;
      break;
    case 'object':
      if (_.isArray(params.node_id)) {
        url.node_id = params.node_id.join(',');
      } else {
        throw new TypeError('Invalid node_id: ' + params.node_id + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      url.node_id = !!params.node_id;
    }
  }
  

  // build the url
  if (url.hasOwnProperty('node_id')) {
    request.url = '/_cluster/nodes/' + encodeURIComponent(url.node_id) + '/_shutdown';
  }
  else {
    request.url = '/_shutdown';
  }
  

  // build the query string
  if (typeof params.delay !== 'undefined') {
    if (params.delay instanceof Date) {
      query.delay = params.delay.getTime();
    } else if (_.isNumeric(params.delay)) {
      query.delay = params.delay;
    } else {
      throw new TypeError('Invalid delay: ' + params.delay + ' should be be some sort of time.');
    }
  }
  
  if (typeof params.exit !== 'undefined') {
    if (params.exit.toLowerCase && (params.exit = params.exit.toLowerCase())
      && (params.exit === 'no' || params.exit === 'off')
    ) {
      query.exit = false;
    } else {
      query.exit = !!params.exit;
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doClusterNodeShutdown;
