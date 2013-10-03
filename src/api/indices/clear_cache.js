var _ = require('../../lib/toolbelt')
  , paramHelper = require('../../lib/param_helper');

var ignoreIndicesOptions = ['none', 'missing'];



/**
 * Perform an elasticsearch [indices.clear_cache](http://www.elasticsearch.org/guide/reference/api/admin-indices-clearcache/) request
 *
 * @for Client
 * @method indices.clear_cache
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {boolean} params.field_data - Clear field data
 * @param {boolean} params.fielddata - Clear field data
 * @param {String|ArrayOfStrings|Boolean} params.fields - A comma-separated list of fields to clear when using the `field_data` parameter (default: all)
 * @param {boolean} params.filter - Clear filter caches
 * @param {boolean} params.filter_cache - Clear filter caches
 * @param {boolean} params.filter_keys - A comma-separated list of keys to clear when using the `filter_cache` parameter (default: all)
 * @param {boolean} params.id - Clear ID caches for parent/child
 * @param {boolean} params.id_cache - Clear ID caches for parent/child
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index name to limit the operation
 * @param {boolean} params.recycler - Clear the recycler cache
 */
function doIndicesClearCache(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  if (params.method = _.toLowerString(params.method)) {
    if (params.method === 'post' || params.method === 'get') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of post, get');
    }
  } else {
    request.method = params.body ? 'post' : 'get';
  }

  // find the url's params
  if (typeof params.index !== 'undefined') {
    switch (typeof params.index) {
    case 'string':
      url.index = params.index;
      break;
    case 'object':
      if (_.isArray(params.index)) {
        url.index = params.index.join(',');
      } else {
        throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      url.index = !!params.index;
    }
  }
  

  // build the url
  if (url.hasOwnProperty('index')) {
    request.url = '/' + encodeURIComponent(url.index) + '/_cache/clear';
    delete params.index;
  }
  else {
    request.url = '/_cache/clear';
  }
  

  // build the query string
  if (typeof params.field_data !== 'undefined') {
    if (params.field_data.toLowerCase && (params.field_data = params.field_data.toLowerCase())
      && (params.field_data === 'no' || params.field_data === 'off')
    ) {
      query.field_data = false;
    } else {
      query.field_data = !!params.field_data;
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
  
  if (typeof params.filter !== 'undefined') {
    if (params.filter.toLowerCase && (params.filter = params.filter.toLowerCase())
      && (params.filter === 'no' || params.filter === 'off')
    ) {
      query.filter = false;
    } else {
      query.filter = !!params.filter;
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
  
  if (typeof params.filter_keys !== 'undefined') {
    if (params.filter_keys.toLowerCase && (params.filter_keys = params.filter_keys.toLowerCase())
      && (params.filter_keys === 'no' || params.filter_keys === 'off')
    ) {
      query.filter_keys = false;
    } else {
      query.filter_keys = !!params.filter_keys;
    }
  }
  
  if (typeof params.id !== 'undefined') {
    if (params.id.toLowerCase && (params.id = params.id.toLowerCase())
      && (params.id === 'no' || params.id === 'off')
    ) {
      query.id = false;
    } else {
      query.id = !!params.id;
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
  
  if (typeof params.index !== 'undefined') {
    switch (typeof params.index) {
    case 'string':
      query.index = params.index;
      break;
    case 'object':
      if (_.isArray(params.index)) {
        query.index = params.index.join(',');
      } else {
        throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      query.index = !!params.index;
    }
  }
  
  if (typeof params.recycler !== 'undefined') {
    if (params.recycler.toLowerCase && (params.recycler = params.recycler.toLowerCase())
      && (params.recycler === 'no' || params.recycler === 'off')
    ) {
      query.recycler = false;
    } else {
      query.recycler = !!params.recycler;
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doIndicesClearCache;
