var _ = require('../../lib/utils'),
  paramHelper = require('../../lib/param_helper'),
  errors = require('../../lib/errors'),
  q = require('q');

var typeOptions = ['cpu', 'wait', 'block'];

/**
 * Perform an elasticsearch [cluster.node_hot_threads](http://www.elasticsearch.org/guide/reference/api/admin-cluster-nodes-hot-threads/) request
 *
 * @for Client
 * @method cluster.node_hot_threads
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.interval - The interval for the second sampling of threads
 * @param {number} params.snapshots - Number of samples of thread stacktrace (default: 10)
 * @param {number} params.threads - Specify the number of threads to provide information for (default: 3)
 * @param {String} params.type - The type to sample (default: cpu)
 */
function doClusterNodeHotThreads(params, cb) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , parts = {}
    , query = {}
    , responseOpts = {};

  request.method = 'GET';

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
    request.path = '/_nodes/' + encodeURIComponent(parts.node_id) + '/hotthreads';
  }
  else {
    request.path = '/_nodes/hotthreads';
  }


  // build the query string
  if (typeof params.interval !== 'undefined') {
    if (params.interval instanceof Date) {
      query.interval = params.interval.getTime();
    } else if (_.isNumeric(params.interval)) {
      query.interval = params.interval;
    } else {
      throw new TypeError('Invalid interval: ' + params.interval + ' should be be some sort of time.');
    }
  }

  if (typeof params.snapshots !== 'undefined') {
    if (_.isNumeric(params.snapshots)) {
      query.snapshots = params.snapshots * 1;
    } else {
      throw new TypeError('Invalid snapshots: ' + params.snapshots + ' should be a number.');
    }
  }

  if (typeof params.threads !== 'undefined') {
    if (_.isNumeric(params.threads)) {
      query.threads = params.threads * 1;
    } else {
      throw new TypeError('Invalid threads: ' + params.threads + ' should be a number.');
    }
  }

  if (typeof params.type !== 'undefined') {
    if (_.contains(typeOptions, params.type)) {
      query.type = params.type;
    } else {
      throw new TypeError(
        'Invalid type: ' + params.type +
        ' should be one of ' + typeOptions.join(', ') + '.'
      );
    }
  }

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doClusterNodeHotThreads;
