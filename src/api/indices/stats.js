var _ = require('../../lib/utils'),
  paramHelper = require('../../lib/param_helper'),
  errors = require('../../lib/errors'),
  q = require('q');

var ignoreIndicesOptions = ['none', 'missing'];
var metricFamilyOptions = ['completion', 'docs', 'fielddata', 'filter_cache', 'flush', 'get', 'groups', 'id_cache', 'ignore_indices', 'indexing', 'merge', 'refresh', 'search', 'store', 'warmer'];

/**
 * Perform an elasticsearch [indices.stats](http://elasticsearch.org/guide/reference/api/admin-indices-stats/) request
 *
 * @for Client
 * @method indices.stats
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {boolean} params.all - Return all available information
 * @param {boolean} params.clear - Reset the default level of detail
 * @param {boolean} params.completion - Return information about completion suggester stats
 * @param {String|ArrayOfStrings|Boolean} params.completion_fields - A comma-separated list of fields for `completion` metric (supports wildcards)
 * @param {boolean} params.docs - Return information about indexed and deleted documents
 * @param {boolean} params.fielddata - Return information about field data
 * @param {String|ArrayOfStrings|Boolean} params.fielddata_fields - A comma-separated list of fields for `fielddata` metric (supports wildcards)
 * @param {String|ArrayOfStrings|Boolean} params.fields - A comma-separated list of fields for `fielddata` and `completion` metric (supports wildcards)
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
function doIndicesStats(params, cb) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , parts = {}
    , query = {}
    , responseOpts = {};

  request.method = 'GET';

  // find the paths's params
  if (typeof params.fields !== 'undefined') {
    switch (typeof params.fields) {
    case 'string':
      parts.fields = params.fields;
      break;
    case 'object':
      if (_.isArray(params.fields)) {
        parts.fields = params.fields.join(',');
      } else {
        throw new TypeError('Invalid fields: ' + params.fields + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      parts.fields = !!params.fields;
    }
  }

  if (typeof params.index !== 'undefined') {
    switch (typeof params.index) {
    case 'string':
      parts.index = params.index;
      break;
    case 'object':
      if (_.isArray(params.index)) {
        parts.index = params.index.join(',');
      } else {
        throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      parts.index = !!params.index;
    }
  }

  if (typeof params.indexing_types !== 'undefined') {
    switch (typeof params.indexing_types) {
    case 'string':
      parts.indexing_types = params.indexing_types;
      break;
    case 'object':
      if (_.isArray(params.indexing_types)) {
        parts.indexing_types = params.indexing_types.join(',');
      } else {
        throw new TypeError('Invalid indexing_types: ' + params.indexing_types + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      parts.indexing_types = !!params.indexing_types;
    }
  }

  if (typeof params.metric_family !== 'undefined') {
    if (_.contains(metricFamilyOptions, params.metric_family)) {
      parts.metric_family = params.metric_family;
    } else {
      throw new TypeError(
        'Invalid metric_family: ' + params.metric_family +
        ' should be one of ' + metricFamilyOptions.join(', ') + '.'
      );
    }
  }

  if (typeof params.search_groups !== 'undefined') {
    switch (typeof params.search_groups) {
    case 'string':
      parts.search_groups = params.search_groups;
      break;
    case 'object':
      if (_.isArray(params.search_groups)) {
        parts.search_groups = params.search_groups.join(',');
      } else {
        throw new TypeError('Invalid search_groups: ' + params.search_groups + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      parts.search_groups = !!params.search_groups;
    }
  }


  // build the path
  if (parts.hasOwnProperty('index')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/_stats';
  }
  else {
    request.path = '/_stats';
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

  if (typeof params.completion !== 'undefined') {
    if (params.completion.toLowerCase && (params.completion = params.completion.toLowerCase())
      && (params.completion === 'no' || params.completion === 'off')
    ) {
      query.completion = false;
    } else {
      query.completion = !!params.completion;
    }
  }

  if (typeof params.completion_fields !== 'undefined') {
    switch (typeof params.completion_fields) {
    case 'string':
      query.completion_fields = params.completion_fields;
      break;
    case 'object':
      if (_.isArray(params.completion_fields)) {
        query.completion_fields = params.completion_fields.join(',');
      } else {
        throw new TypeError('Invalid completion_fields: ' + params.completion_fields + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      query.completion_fields = !!params.completion_fields;
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

  if (typeof params.fielddata_fields !== 'undefined') {
    switch (typeof params.fielddata_fields) {
    case 'string':
      query.fielddata_fields = params.fielddata_fields;
      break;
    case 'object':
      if (_.isArray(params.fielddata_fields)) {
        query.fielddata_fields = params.fielddata_fields.join(',');
      } else {
        throw new TypeError('Invalid fielddata_fields: ' + params.fielddata_fields + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      query.fielddata_fields = !!params.fielddata_fields;
    }
  }

  if (typeof params.fields !== 'undefined') {
    switch (typeof params.fields) {
    case 'string':
      query.fields = params.fields;
      break;
    case 'object':
      if (_.isArray(params.fields)) {
        query.fields = params.fields.join(',');
      } else {
        throw new TypeError('Invalid fields: ' + params.fields + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
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

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doIndicesStats;
