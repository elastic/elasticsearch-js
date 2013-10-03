var _ = require('../lib/toolbelt')
  , paramHelper = require('../lib/param_helper');

var consistencyOptions = ['one', 'quorum', 'all'];
var replicationOptions = ['sync', 'async'];
var versionTypeOptions = ['internal', 'external'];



/**
 * Perform an elasticsearch [create](http://elasticsearch.org/guide/reference/api/index_/) request
 *
 * @for Client
 * @method create
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.consistency - Explicit write consistency setting for the operation
 * @param {string} params.id - Specific document ID (when the POST method is used)
 * @param {string} params.parent - ID of the parent document
 * @param {string} params.percolate - Percolator queries to execute while indexing the document
 * @param {boolean} params.refresh - Refresh the index after performing the operation
 * @param {String} [params.replication=sync] - Specific replication type
 * @param {string} params.routing - Specific routing value
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Date|Number} params.timestamp - Explicit timestamp for the document
 * @param {duration} params.ttl - Expiration time for the document
 * @param {number} params.version - Explicit version number for concurrency control
 * @param {String} params.version_type - Specific version type
 */
function doCreate(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore,
      body: params.body || null
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  if (params.method = _.toLowerString(params.method)) {
    if (params.method === 'post' || params.method === 'put') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of post, put');
    }
  } else {
    request.method = 'post';
  }

  // find the url's params
  if (typeof params.id !== 'undefined') {
    if (typeof params.id !== 'object' && params.id) {
      url.id = '' + params.id;
    } else {
      throw new TypeError('Invalid id: ' + params.id + ' should be a string.');
    }
  }
  
  if (typeof params.index !== 'object' && params.index) {
    url.index = '' + params.index;
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
  }
  
  if (typeof params.type !== 'object' && params.type) {
    url.type = '' + params.type;
  } else {
    throw new TypeError('Invalid type: ' + params.type + ' should be a string.');
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type') && url.hasOwnProperty('id')) {
    request.url = '/' + encodeURIComponent(url.index) + '/' + encodeURIComponent(url.type) + '/' + encodeURIComponent(url.id) + '/_create';
    delete params.id;
  }
  else if (url.hasOwnProperty('index') && url.hasOwnProperty('type')) {
    request.url = '/' + encodeURIComponent(url.index) + '/' + encodeURIComponent(url.type) + '';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least [object Object], [object Object]');
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
  
  if (typeof params.id !== 'undefined') {
    if (typeof params.id !== 'object' && params.id) {
      query.id = '' + params.id;
    } else {
      throw new TypeError('Invalid id: ' + params.id + ' should be a string.');
    }
  }
  
  if (typeof params.parent !== 'undefined') {
    if (typeof params.parent !== 'object' && params.parent) {
      query.parent = '' + params.parent;
    } else {
      throw new TypeError('Invalid parent: ' + params.parent + ' should be a string.');
    }
  }
  
  if (typeof params.percolate !== 'undefined') {
    if (typeof params.percolate !== 'object' && params.percolate) {
      query.percolate = '' + params.percolate;
    } else {
      throw new TypeError('Invalid percolate: ' + params.percolate + ' should be a string.');
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
    if (typeof params.routing !== 'object' && params.routing) {
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
  
  if (typeof params.timestamp !== 'undefined') {
    if (params.timestamp instanceof Date) {
      query.timestamp = params.timestamp.getTime();
    } else if (_.isNumeric(params.timestamp)) {
      query.timestamp = params.timestamp;
    } else {
      throw new TypeError('Invalid timestamp: ' + params.timestamp + ' should be be some sort of time.');
    }
  }
  
  if (typeof params.ttl !== 'undefined') {
    if (_.isNumeric(params.ttl) || _.isInterval(params.ttl)) {
      query.ttl = params.ttl;
    } else {
      throw new TypeError('Invalid ttl: ' + params.ttl + ' should be a number or in interval notation (an integer followed by one of Mwdhmsy).');
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

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doCreate;
