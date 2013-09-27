var _ = require('../../lib/utils');

var typeOptions = ['cpu', 'wait', 'block'];



/**
 * Perform an elasticsearch [cluster.nodeHotThreads](http://www.elasticsearch.org/guide/reference/api/admin-cluster-nodes-hot-threads/) request
 *
 * @for Client
 * @method cluster.nodeHotThreads
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.interval - The interval for the second sampling of threads
 * @param {number} params.snapshots - Number of samples of thread stacktrace (default: 10)
 * @param {number} params.threads - Specify the number of threads to provide information for (default: 3)
 * @param {String} params.type - The type to sample (default: cpu)
 */
function doClusterNodeHotThreads(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};

  request.method = 'GET';

  // find the url's params
  if (typeof params.node_id !== 'undefined') {
    if (typeof params.node_id === 'string') {
      url.node_id = params.node_id;
    } else if (_.isArray(params.node_id)) {
      url.node_id = params.node_id.join(',');
    } else {
      throw new TypeError('Invalid node_id: ' + params.node_id + ' should be a comma seperated list or array.');
    }
  }
  

  // build the url
  if (url.hasOwnProperty('node_id')) {
    request.url = '/_nodes/' + url.node_id + '/hotthreads';
  }
  else  {
    request.url = '/_nodes/hotthreads';
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
  
  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doClusterNodeHotThreads;