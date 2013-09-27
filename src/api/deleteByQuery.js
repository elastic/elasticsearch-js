var _ = require('../lib/utils');

var consistencyOptions = ['one', 'quorum', 'all'];
var defaultOperatorOptions = ['AND', 'OR'];
var ignoreIndicesOptions = ['none', 'missing'];
var replicationOptions = ['sync', 'async'];



/**
 * Perform an elasticsearch [deleteByQuery](http://www.elasticsearch.org/guide/reference/api/delete-by-query/) request
 *
 * @for Client
 * @method deleteByQuery
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {string} params.analyzer - The analyzer to use for the query string
 * @param {String} params.consistency - Specific write consistency setting for the operation
 * @param {String} [params.default_operator=OR] - The default operator for query string query (AND or OR)
 * @param {string} params.df - The field to use as default where no field prefix is given in the query string
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {String} [params.replication=sync] - Specific replication type
 * @param {string} params.q - Query in the Lucene query string syntax
 * @param {string} params.routing - Specific routing value
 * @param {string} params.source - The URL-encoded query definition (instead of using the request body)
 * @param {Date|Number} params.timeout - Explicit operation timeout
 */
function doDeleteByQuery(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};
  request.body = params.body || null;

  request.method = 'DELETE';

  // find the url's params
  if (typeof params.index === 'string') {
    url.index = params.index;
  } else if (_.isArray(params.index)) {
    url.index = params.index.join(',');
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list or array.');
  }
  
  if (typeof params.type !== 'undefined') {
    if (typeof params.type === 'string') {
      url.type = params.type;
    } else if (_.isArray(params.type)) {
      url.type = params.type.join(',');
    } else {
      throw new TypeError('Invalid type: ' + params.type + ' should be a comma seperated list or array.');
    }
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type')) {
    request.url = '/' + url.index + '/' + url.type + '/_query';
  }
  else if (url.hasOwnProperty('index')) {
    request.url = '/' + url.index + '/_query';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least index');
  }
  

  // build the query string
  if (typeof params.analyzer !== 'undefined') {
    if (typeof params.analyzer !== 'object' && typeof params.analyzer !== 'undefined') {
      query.analyzer = '' + params.analyzer;
    } else {
      throw new TypeError('Invalid analyzer: ' + params.analyzer + ' should be a string.');
    }
  }
  
  if (typeof params.consistency !== 'undefined') {
    if (_.contains(consistencyOptions, params.consistency)) {
      query.consistency = params.consistency;
    } else {
      throw new TypeError(
        'Invalid consistency: ' + params.consistency +
        ' should be one of ' + consistencyOptions.join(', ') + '.'
      );
    }
  }
  
  if (typeof params.default_operator !== 'undefined') {
    if (_.contains(defaultOperatorOptions, params.default_operator)) {
      query.default_operator = params.default_operator;
    } else {
      throw new TypeError(
        'Invalid default_operator: ' + params.default_operator +
        ' should be one of ' + defaultOperatorOptions.join(', ') + '.'
      );
    }
  }
  
  if (typeof params.df !== 'undefined') {
    if (typeof params.df !== 'object' && typeof params.df !== 'undefined') {
      query.df = '' + params.df;
    } else {
      throw new TypeError('Invalid df: ' + params.df + ' should be a string.');
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
  
  if (typeof params.replication !== 'undefined') {
    if (_.contains(replicationOptions, params.replication)) {
      query.replication = params.replication;
    } else {
      throw new TypeError(
        'Invalid replication: ' + params.replication +
        ' should be one of ' + replicationOptions.join(', ') + '.'
      );
    }
  }
  
  if (typeof params.q !== 'undefined') {
    if (typeof params.q !== 'object' && typeof params.q !== 'undefined') {
      query.q = '' + params.q;
    } else {
      throw new TypeError('Invalid q: ' + params.q + ' should be a string.');
    }
  }
  
  if (typeof params.routing !== 'undefined') {
    if (typeof params.routing !== 'object' && typeof params.routing !== 'undefined') {
      query.routing = '' + params.routing;
    } else {
      throw new TypeError('Invalid routing: ' + params.routing + ' should be a string.');
    }
  }
  
  if (typeof params.source !== 'undefined') {
    if (typeof params.source !== 'object' && typeof params.source !== 'undefined') {
      query.source = '' + params.source;
    } else {
      throw new TypeError('Invalid source: ' + params.source + ' should be a string.');
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
  
  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doDeleteByQuery;