var _ = require('../../lib/utils'),
  errors = require('../../lib/errors'),
  q = require('q');

var levelOptions = ['cluster', 'indices', 'shards'];
var waitForStatusOptions = ['green', 'yellow', 'red'];

/**
 * Perform an elasticsearch [cluster.health](http://elasticsearch.org/guide/reference/api/admin-cluster-health/) request
 *
 * @for Client
 * @method cluster.health
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.level=cluster] - Specify the level of detail for returned information
 * @param {boolean} params.local - Return local information, do not retrieve the state from master node (default: false)
 * @param {Date|Number} params.master_timeout - Explicit operation timeout for connection to master node
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {number} params.wait_for_active_shards - Wait until the specified number of shards is active
 * @param {string} params.wait_for_nodes - Wait until the specified number of nodes is available
 * @param {number} params.wait_for_relocating_shards - Wait until the specified number of relocating shards is finished
 * @param {String} params.wait_for_status - Wait until cluster is in a specific state
 */
function doClusterHealth(params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  } else {
    params = params || {};
    cb = typeof cb === 'function' ? cb : _.noop;
  }

  var request = {
      ignore: params.ignore,
      method: 'GET'
    },
    parts = {},
    query = {},
    responseOpts = {};


  // find the paths's params
  if (typeof params.index !== 'undefined') {
    if (typeof params.index !== 'object' && params.index) {
      parts.index = '' + params.index;
    } else {
      throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
    }
  }


  // build the path
  if (parts.hasOwnProperty('index')) {
    request.path = '/_cluster/health/' + encodeURIComponent(parts.index) + '';
  }
  else {
    request.path = '/_cluster/health';
  }


  // build the query string
  if (typeof params.level !== 'undefined') {
    if (_.contains(levelOptions, params.level)) {
      query.level = params.level;
    } else {
      throw new TypeError(
        'Invalid level: ' + params.level +
        ' should be one of ' + levelOptions.join(', ') + '.'
      );
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

  if (typeof params.timeout !== 'undefined') {
    if (params.timeout instanceof Date) {
      query.timeout = params.timeout.getTime();
    } else if (_.isNumeric(params.timeout)) {
      query.timeout = params.timeout;
    } else {
      throw new TypeError('Invalid timeout: ' + params.timeout + ' should be be some sort of time.');
    }
  }

  if (typeof params.wait_for_active_shards !== 'undefined') {
    if (_.isNumeric(params.wait_for_active_shards)) {
      query.wait_for_active_shards = params.wait_for_active_shards * 1;
    } else {
      throw new TypeError('Invalid wait_for_active_shards: ' + params.wait_for_active_shards + ' should be a number.');
    }
  }

  if (typeof params.wait_for_nodes !== 'undefined') {
    if (typeof params.wait_for_nodes !== 'object' && params.wait_for_nodes) {
      query.wait_for_nodes = '' + params.wait_for_nodes;
    } else {
      throw new TypeError('Invalid wait_for_nodes: ' + params.wait_for_nodes + ' should be a string.');
    }
  }

  if (typeof params.wait_for_relocating_shards !== 'undefined') {
    if (_.isNumeric(params.wait_for_relocating_shards)) {
      query.wait_for_relocating_shards = params.wait_for_relocating_shards * 1;
    } else {
      throw new TypeError('Invalid wait_for_relocating_shards: ' + params.wait_for_relocating_shards + ' should be a number.');
    }
  }

  if (typeof params.wait_for_status !== 'undefined') {
    if (_.contains(waitForStatusOptions, params.wait_for_status)) {
      query.wait_for_status = params.wait_for_status;
    } else {
      throw new TypeError(
        'Invalid wait_for_status: ' + params.wait_for_status +
        ' should be one of ' + waitForStatusOptions.join(', ') + '.'
      );
    }
  }

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doClusterHealth;
