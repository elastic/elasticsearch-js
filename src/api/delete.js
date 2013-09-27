var _ = require('../lib/utils');

var consistencyOptions = ['one', 'quorum', 'all'];
var replicationOptions = ['sync', 'async'];
var versionTypeOptions = ['internal', 'external'];



/**
 * Perform an elasticsearch [delete](http://elasticsearch.org/guide/reference/api/delete/) request
 *
 * @for Client
 * @method delete
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.consistency - Specific write consistency setting for the operation
 * @param {string} params.parent - ID of parent document
 * @param {boolean} params.refresh - Refresh the index after performing the operation
 * @param {String} [params.replication=sync] - Specific replication type
 * @param {string} params.routing - Specific routing value
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {number} params.version - Explicit version number for concurrency control
 * @param {String} params.version_type - Specific version type
 */
function doDelete(params) {
  var request = {}
    , url = {}
    , query = {};

  params = params || {};

  request.method = 'DELETE';

  // find the url's params
  if (typeof params.id !== 'object' && typeof params.id !== 'undefined') {
    url.id = '' + params.id;
  } else {
    throw new TypeError('Invalid id: ' + params.id + ' should be a string.');
  }
  
  if (typeof params.index !== 'object' && typeof params.index !== 'undefined') {
    url.index = '' + params.index;
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
  }
  
  if (typeof params.type !== 'object' && typeof params.type !== 'undefined') {
    url.type = '' + params.type;
  } else {
    throw new TypeError('Invalid type: ' + params.type + ' should be a string.');
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type') && url.hasOwnProperty('id')) {
    request.url = '/' + url.index + '/' + url.type + '/' + url.id + '';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least index, type, id');
  }
  

  // build the query string
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
  
  if (typeof params.parent !== 'undefined') {
    if (typeof params.parent !== 'object' && typeof params.parent !== 'undefined') {
      query.parent = '' + params.parent;
    } else {
      throw new TypeError('Invalid parent: ' + params.parent + ' should be a string.');
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
  
  if (typeof params.routing !== 'undefined') {
    if (typeof params.routing !== 'object' && typeof params.routing !== 'undefined') {
      query.routing = '' + params.routing;
    } else {
      throw new TypeError('Invalid routing: ' + params.routing + ' should be a string.');
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
  
  if (typeof params.version !== 'undefined') {
    if (_.isNumeric(params.version)) {
      query.version = params.version * 1;
    } else {
      throw new TypeError('Invalid version: ' + params.version + ' should be a number.');
    }
  }
  
  if (typeof params.version_type !== 'undefined') {
    if (_.contains(versionTypeOptions, params.version_type)) {
      query.version_type = params.version_type;
    } else {
      throw new TypeError(
        'Invalid version_type: ' + params.version_type +
        ' should be one of ' + versionTypeOptions.join(', ') + '.'
      );
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  return this.client.request(request);
}

module.exports = doDelete;