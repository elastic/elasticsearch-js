var _ = require('../../lib/utils'),
  paramHelper = require('../../lib/param_helper'),
  errors = require('../../lib/errors'),
  q = require('q');

/**
 * Perform an elasticsearch [cluster.node_shutdown](http://elasticsearch.org/guide/reference/api/admin-cluster-nodes-shutdown/) request
 *
 * @for Client
 * @method cluster.node_shutdown
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.delay - Set the delay for the operation (default: 1s)
 * @param {boolean} params.exit - Exit the JVM as well (default: true)
 */
function doClusterNodeShutdown(params, cb) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , parts = {}
    , query = {}
    , responseOpts = {};

  request.method = 'POST';

  // find the paths's params
  if (typeof params.node_id !== 'undefined') {
    switch (typeof params.node_id) {
    case 'string':
      parts.node_id = params.node_id;
      break;
    case 'object':
      if (_.isArray(params.node_id)) {
        parts.node_id = params.node_id.join(',');
      } else {
        throw new TypeError('Invalid node_id: ' + params.node_id + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      parts.node_id = !!params.node_id;
    }
  }


  // build the path
  if (parts.hasOwnProperty('node_id')) {
    request.path = '/_cluster/nodes/' + encodeURIComponent(parts.node_id) + '/_shutdown';
  }
  else {
    request.path = '/_shutdown';
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

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doClusterNodeShutdown;
