var _ = require('../../lib/utils');

var ignoreIndicesOptions = ['none', 'missing'];
var metricFamilyOptions = ['docs', 'fielddata', 'filter_cache', 'flush', 'get', 'groups', 'id_cache', 'ignore_indices', 'indexing', 'merge', 'refresh', 'search', 'store', 'warmer'];



/**
 * Perform an elasticsearch [indices.stats](http://elasticsearch.org/guide/reference/api/admin-indices-stats/) request
 *
 * @for Client
 * @method indices.stats
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {boolean} params.all - Return all available information
 * @param {boolean} params.clear - Reset the default level of detail
 * @param {boolean} params.docs - Return information about indexed and deleted documents
 * @param {boolean} params.fielddata - Return information about field data
 * @param {boolean} params.fields - A comma-separated list of fields for `fielddata` metric (supports wildcards)
 * @param {boolean} params.filter_cache - Return information about filter cache
 * @param {boolean} params.flush - Return information about flush operations
 * @param {boolean} params.get - Return information about get operations
 * @param {boolean} params.groups - A comma-separated list of search groups for `search` statistics
 * @param {boolean} params.id_cache - Return information about ID cache
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {boolean} params.indexing - Return information about indexing operations
 * @param {boolean} params.merge - Return information about merge operations
 * @param {boolean} params.refresh - Return information about refresh operations
 * @param {boolean} params.search - Return information about search operations; use the `groups` parameter to include information for specific search groups
 * @param {boolean} params.store - Return information about the size of the index
 * @param {boolean} params.warmer - Return information about warmers
 */
function doIndicesStats(params) {
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
  
  if (typeof params.index !== 'undefined') {
    if (typeof params.index === 'string') {
      url.index = params.index;
    } else if (_.isArray(params.index)) {
      url.index = params.index.join(',');
    } else {
      throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list or array.');
    }
  }
  
  if (typeof params.indexing_types !== 'undefined') {
    if (typeof params.indexing_types === 'string') {
      url.indexing_types = params.indexing_types;
    } else if (_.isArray(params.indexing_types)) {
      url.indexing_types = params.indexing_types.join(',');
    } else {
      throw new TypeError('Invalid indexing_types: ' + params.indexing_types + ' should be a comma seperated list or array.');
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
  
  if (typeof params.search_groups !== 'undefined') {
    if (typeof params.search_groups === 'string') {
      url.search_groups = params.search_groups;
    } else if (_.isArray(params.search_groups)) {
      url.search_groups = params.search_groups.join(',');
    } else {
      throw new TypeError('Invalid search_groups: ' + params.search_groups + ' should be a comma seperated list or array.');
    }
  }
  

  // build the url
  if (url.hasOwnProperty('index')) {
    request.url = '/' + url.index + '/_stats';
  }
  else  {
    request.url = '/_stats';
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
  
  if (typeof params.docs !== 'undefined') {
    if (params.docs.toLowerCase && (params.docs = params.docs.toLowerCase())
      && (params.docs === 'no' || params.docs === 'off')
    ) {
      query.docs = false;
    } else {
      query.docs = !!params.docs;
    }
  }
  
  if (typeof params.fielddata !== 'undefined') {
    if (params.fielddata.toLowerCase && (params.fielddata = params.fielddata.toLowerCase())
      && (params.fielddata === 'no' || params.fielddata === 'off')
    ) {
      query.fielddata = false;
    } else {
      query.fielddata = !!params.fielddata;
    }
  }
  
  if (typeof params.fields !== 'undefined') {
    if (params.fields.toLowerCase && (params.fields = params.fields.toLowerCase())
      && (params.fields === 'no' || params.fields === 'off')
    ) {
      query.fields = false;
    } else {
      query.fields = !!params.fields;
    }
  }
  
  if (typeof params.filter_cache !== 'undefined') {
    if (params.filter_cache.toLowerCase && (params.filter_cache = params.filter_cache.toLowerCase())
      && (params.filter_cache === 'no' || params.filter_cache === 'off')
    ) {
      query.filter_cache = false;
    } else {
      query.filter_cache = !!params.filter_cache;
    }
  }
  
  if (typeof params.flush !== 'undefined') {
    if (params.flush.toLowerCase && (params.flush = params.flush.toLowerCase())
      && (params.flush === 'no' || params.flush === 'off')
    ) {
      query.flush = false;
    } else {
      query.flush = !!params.flush;
    }
  }
  
  if (typeof params.get !== 'undefined') {
    if (params.get.toLowerCase && (params.get = params.get.toLowerCase())
      && (params.get === 'no' || params.get === 'off')
    ) {
      query.get = false;
    } else {
      query.get = !!params.get;
    }
  }
  
  if (typeof params.groups !== 'undefined') {
    if (params.groups.toLowerCase && (params.groups = params.groups.toLowerCase())
      && (params.groups === 'no' || params.groups === 'off')
    ) {
      query.groups = false;
    } else {
      query.groups = !!params.groups;
    }
  }
  
  if (typeof params.id_cache !== 'undefined') {
    if (params.id_cache.toLowerCase && (params.id_cache = params.id_cache.toLowerCase())
      && (params.id_cache === 'no' || params.id_cache === 'off')
    ) {
      query.id_cache = false;
    } else {
      query.id_cache = !!params.id_cache;
    }
  }
  
  if (typeof params.ignore_indices !== 'undefined') {
    if (_.contains(ignoreIndicesOptions, params.ignore_indices)) {
      query.ignore_indices = params.ignore_indices;
    } else {
      throw new TypeError(
        'Invalid ignore_indices: ' + params.ignore_indices +
        ' should be one of ' + ignoreIndicesOptions.join(', ') + '.'
      );
    }
  }
  
  if (typeof params.indexing !== 'undefined') {
    if (params.indexing.toLowerCase && (params.indexing = params.indexing.toLowerCase())
      && (params.indexing === 'no' || params.indexing === 'off')
    ) {
      query.indexing = false;
    } else {
      query.indexing = !!params.indexing;
    }
  }
  
  if (typeof params.merge !== 'undefined') {
    if (params.merge.toLowerCase && (params.merge = params.merge.toLowerCase())
      && (params.merge === 'no' || params.merge === 'off')
    ) {
      query.merge = false;
    } else {
      query.merge = !!params.merge;
    }
  }
  
  if (typeof params.refresh !== 'undefined') {
    if (params.refresh.toLowerCase && (params.refresh = params.refresh.toLowerCase())
      && (params.refresh === 'no' || params.refresh === 'off')
    ) {
      query.refresh = false;
    } else {
      query.refresh = !!params.refresh;
    }
  }
  
  if (typeof params.search !== 'undefined') {
    if (params.search.toLowerCase && (params.search = params.search.toLowerCase())
      && (params.search === 'no' || params.search === 'off')
    ) {
      query.search = false;
    } else {
      query.search = !!params.search;
    }
  }
  
  if (typeof params.store !== 'undefined') {
    if (params.store.toLowerCase && (params.store = params.store.toLowerCase())
      && (params.store === 'no' || params.store === 'off')
    ) {
      query.store = false;
    } else {
      query.store = !!params.store;
    }
  }
  
  if (typeof params.warmer !== 'undefined') {
    if (params.warmer.toLowerCase && (params.warmer = params.warmer.toLowerCase())
      && (params.warmer === 'no' || params.warmer === 'off')
    ) {
      query.warmer = false;
    } else {
      query.warmer = !!params.warmer;
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doIndicesStats;