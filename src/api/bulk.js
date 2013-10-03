var _ = require('../lib/toolbelt')
  , paramHelper = require('../lib/param_helper');

var consistencyOptions = ['one', 'quorum', 'all'];
var replicationOptions = ['sync', 'async'];



/**
 * Perform an elasticsearch [bulk](http://elasticsearch.org/guide/reference/api/bulk/) request
 *
 * @for Client
 * @method bulk
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.consistency - Explicit write consistency setting for the operation
 * @param {boolean} params.refresh - Refresh the index after performing the operation
 * @param {String} [params.replication=sync] - Explicitely set the replication type
 * @param {string} params.type - Default document type for items which don't provide one
 */
function doBulk(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore,
      body: paramHelper.bulkBody(params.body, this.client.serializer) || null
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
  if (typeof params.index !== 'undefined') {
    if (typeof params.index !== 'object' && params.index) {
      url.index = '' + params.index;
    } else {
      throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
    }
  }
  
  if (typeof params.type !== 'undefined') {
    if (typeof params.type !== 'object' && params.type) {
      url.type = '' + params.type;
    } else {
      throw new TypeError('Invalid type: ' + params.type + ' should be a string.');
    }
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type')) {
    request.url = '/' + encodeURIComponent(url.index) + '/' + encodeURIComponent(url.type) + '/_bulk';
    delete params.type;
  }
  else if (url.hasOwnProperty('index')) {
    request.url = '/' + encodeURIComponent(url.index) + '/_bulk';
  }
  else {
    request.url = '/_bulk';
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
  
  if (typeof params.type !== 'undefined') {
    if (typeof params.type !== 'object' && params.type) {
      query.type = '' + params.type;
    } else {
      throw new TypeError('Invalid type: ' + params.type + ' should be a string.');
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doBulk;
