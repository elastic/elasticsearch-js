var _ = require('../../lib/utils');



/**
 * Perform an elasticsearch [cluster.state](http://elasticsearch.org/guide/reference/api/admin-cluster-state/) request
 *
 * @for Client
 * @method cluster.state
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {boolean} params.filter_blocks - Do not return information about blocks
 * @param {boolean} params.filter_index_templates - Do not return information about index templates
 * @param {list} params.filter_indices - Limit returned metadata information to specific indices
 * @param {boolean} params.filter_metadata - Do not return information about indices metadata
 * @param {boolean} params.filter_nodes - Do not return information about nodes
 * @param {boolean} params.filter_routing_table - Do not return information about shard allocation (`routing_table` and `routing_nodes`)
 * @param {boolean} params.local - Return local information, do not retrieve the state from master node (default: false)
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 */
function doClusterState(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};

  request.method = 'GET';

  // find the url's params


  // build the url
  request.url = '/_cluster/state';
  

  // build the query string
  if (typeof params.filter_blocks !== 'undefined') {
    if (params.filter_blocks.toLowerCase && (params.filter_blocks = params.filter_blocks.toLowerCase())
      && (params.filter_blocks === 'no' || params.filter_blocks === 'off')
    ) {
      query.filter_blocks = false;
    } else {
      query.filter_blocks = !!params.filter_blocks;
    }
  }
  
  if (typeof params.filter_index_templates !== 'undefined') {
    if (params.filter_index_templates.toLowerCase && (params.filter_index_templates = params.filter_index_templates.toLowerCase())
      && (params.filter_index_templates === 'no' || params.filter_index_templates === 'off')
    ) {
      query.filter_index_templates = false;
    } else {
      query.filter_index_templates = !!params.filter_index_templates;
    }
  }
  
  if (typeof params.filter_indices !== 'undefined') {
    if (typeof params.filter_indices === 'string') {
      query.filter_indices = params.filter_indices;
    } else if (_.isArray(params.filter_indices)) {
      query.filter_indices = params.filter_indices.join(',');
    } else {
      throw new TypeError('Invalid filter_indices: ' + params.filter_indices + ' should be a comma seperated list or array.');
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
  
  if (typeof params.filter_nodes !== 'undefined') {
    if (params.filter_nodes.toLowerCase && (params.filter_nodes = params.filter_nodes.toLowerCase())
      && (params.filter_nodes === 'no' || params.filter_nodes === 'off')
    ) {
      query.filter_nodes = false;
    } else {
      query.filter_nodes = !!params.filter_nodes;
    }
  }
  
  if (typeof params.filter_routing_table !== 'undefined') {
    if (params.filter_routing_table.toLowerCase && (params.filter_routing_table = params.filter_routing_table.toLowerCase())
      && (params.filter_routing_table === 'no' || params.filter_routing_table === 'off')
    ) {
      query.filter_routing_table = false;
    } else {
      query.filter_routing_table = !!params.filter_routing_table;
    }
  }
  
  if (typeof params.local !== 'undefined') {
    if (params.local.toLowerCase && (params.local = params.local.toLowerCase())
      && (params.local === 'no' || params.local === 'off')
    ) {
      query.local = false;
    } else {
      query.local = !!params.local;
    }
  }
  
  if (typeof params.master_timeout !== 'undefined') {
    if (params.master_timeout instanceof Date) {
      query.master_timeout = params.master_timeout.getTime();
    } else if (_.isNumeric(params.master_timeout)) {
      query.master_timeout = params.master_timeout;
    } else {
      throw new TypeError('Invalid master_timeout: ' + params.master_timeout + ' should be be some sort of time.');
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doClusterState;