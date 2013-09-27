var _ = require('../../lib/utils');

var metricFamilyOptions = ['all', 'fs', 'http', 'indices', 'jvm', 'network', 'os', 'process', 'thread_pool', 'transport'];
var metricOptions = ['docs', 'fielddata', 'filter_cache', 'flush', 'get', 'id_cache', 'indexing', 'merges', 'refresh', 'search', 'store', 'warmer'];



/**
 * Perform an elasticsearch [cluster.nodeStats](http://elasticsearch.org/guide/reference/api/admin-cluster-nodes-stats/) request
 *
 * @for Client
 * @method cluster.nodeStats
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {boolean} params.all - Return all available information
 * @param {boolean} params.clear - Reset the default level of detail
 * @param {list} params.fields - A comma-separated list of fields for `fielddata` metric (supports wildcards)
 * @param {boolean} params.fs - Return information about the filesystem
 * @param {boolean} params.http - Return information about HTTP
 * @param {boolean} params.indices - Return information about indices
 * @param {boolean} params.jvm - Return information about the JVM
 * @param {boolean} params.network - Return information about network
 * @param {boolean} params.os - Return information about the operating system
 * @param {boolean} params.process - Return information about the Elasticsearch process
 * @param {boolean} params.thread_pool - Return information about the thread pool
 * @param {boolean} params.transport - Return information about transport
 */
function doClusterNodeStats(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};

  request.method = 'GET';

  // find the url's params
  if (typeof params.fields !== 'undefined') {
    if (typeof params.fields === 'string') {
      url.fields = params.fields;
    } else if (_.isArray(params.fields)) {
      url.fields = params.fields.join(',');
    } else {
      throw new TypeError('Invalid fields: ' + params.fields + ' should be a comma seperated list or array.');
    }
  }
  
  if (typeof params.metric_family !== 'undefined') {
    if (_.contains(metricFamilyOptions, params.metric_family)) {
      url.metric_family = params.metric_family;
    } else {
      throw new TypeError(
        'Invalid metric_family: ' + params.metric_family +
        ' should be one of ' + metricFamilyOptions.join(', ') + '.'
      );
    }
  }
  
  if (typeof params.metric !== 'undefined') {
    if (_.contains(metricOptions, params.metric)) {
      url.metric = params.metric;
    } else {
      throw new TypeError(
        'Invalid metric: ' + params.metric +
        ' should be one of ' + metricOptions.join(', ') + '.'
      );
    }
  }
  
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
    request.url = '/_nodes/' + url.node_id + '/stats';
  }
  else  {
    request.url = '/_nodes/stats';
  }
  

  // build the query string
  if (typeof params.all !== 'undefined') {
    if (params.all.toLowerCase && (params.all = params.all.toLowerCase())
      && (params.all === 'no' || params.all === 'off')
    ) {
      query.all = false;
    } else {
      query.all = !!params.all;
    }
  }
  
  if (typeof params.clear !== 'undefined') {
    if (params.clear.toLowerCase && (params.clear = params.clear.toLowerCase())
      && (params.clear === 'no' || params.clear === 'off')
    ) {
      query.clear = false;
    } else {
      query.clear = !!params.clear;
    }
  }
  
  if (typeof params.fields !== 'undefined') {
    if (typeof params.fields === 'string') {
      query.fields = params.fields;
    } else if (_.isArray(params.fields)) {
      query.fields = params.fields.join(',');
    } else {
      throw new TypeError('Invalid fields: ' + params.fields + ' should be a comma seperated list or array.');
    }
  }
  
  if (typeof params.fs !== 'undefined') {
    if (params.fs.toLowerCase && (params.fs = params.fs.toLowerCase())
      && (params.fs === 'no' || params.fs === 'off')
    ) {
      query.fs = false;
    } else {
      query.fs = !!params.fs;
    }
  }
  
  if (typeof params.http !== 'undefined') {
    if (params.http.toLowerCase && (params.http = params.http.toLowerCase())
      && (params.http === 'no' || params.http === 'off')
    ) {
      query.http = false;
    } else {
      query.http = !!params.http;
    }
  }
  
  if (typeof params.indices !== 'undefined') {
    if (params.indices.toLowerCase && (params.indices = params.indices.toLowerCase())
      && (params.indices === 'no' || params.indices === 'off')
    ) {
      query.indices = false;
    } else {
      query.indices = !!params.indices;
    }
  }
  
  if (typeof params.jvm !== 'undefined') {
    if (params.jvm.toLowerCase && (params.jvm = params.jvm.toLowerCase())
      && (params.jvm === 'no' || params.jvm === 'off')
    ) {
      query.jvm = false;
    } else {
      query.jvm = !!params.jvm;
    }
  }
  
  if (typeof params.network !== 'undefined') {
    if (params.network.toLowerCase && (params.network = params.network.toLowerCase())
      && (params.network === 'no' || params.network === 'off')
    ) {
      query.network = false;
    } else {
      query.network = !!params.network;
    }
  }
  
  if (typeof params.os !== 'undefined') {
    if (params.os.toLowerCase && (params.os = params.os.toLowerCase())
      && (params.os === 'no' || params.os === 'off')
    ) {
      query.os = false;
    } else {
      query.os = !!params.os;
    }
  }
  
  if (typeof params.process !== 'undefined') {
    if (params.process.toLowerCase && (params.process = params.process.toLowerCase())
      && (params.process === 'no' || params.process === 'off')
    ) {
      query.process = false;
    } else {
      query.process = !!params.process;
    }
  }
  
  if (typeof params.thread_pool !== 'undefined') {
    if (params.thread_pool.toLowerCase && (params.thread_pool = params.thread_pool.toLowerCase())
      && (params.thread_pool === 'no' || params.thread_pool === 'off')
    ) {
      query.thread_pool = false;
    } else {
      query.thread_pool = !!params.thread_pool;
    }
  }
  
  if (typeof params.transport !== 'undefined') {
    if (params.transport.toLowerCase && (params.transport = params.transport.toLowerCase())
      && (params.transport === 'no' || params.transport === 'off')
    ) {
      query.transport = false;
    } else {
      query.transport = !!params.transport;
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doClusterNodeStats;