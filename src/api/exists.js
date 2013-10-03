var _ = require('../lib/toolbelt')
  , paramHelper = require('../lib/param_helper');



/**
 * Perform an elasticsearch [exists](http://elasticsearch.org/guide/reference/api/get/) request
 *
 * @for Client
 * @method exists
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {string} params.parent - The ID of the parent document
 * @param {string} params.preference - Specify the node or shard the operation should be performed on (default: random)
 * @param {boolean} params.realtime - Specify whether to perform the operation in realtime or search mode
 * @param {boolean} params.refresh - Refresh the shard containing the document before performing the operation
 * @param {string} params.routing - Specific routing value
 */
function doExists(params, callback) {
  params = params || {};

  var request = {
      ignore: _.union([404], params.ignore)
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  request.method = 'head';

  // find the url's params
  if (typeof params.id !== 'object' && params.id) {
    url.id = '' + params.id;
  } else {
    throw new TypeError('Invalid id: ' + params.id + ' should be a string.');
  }
  
  if (typeof params.index !== 'object' && params.index) {
    url.index = '' + params.index;
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
  }
  
  if (typeof params.type !== 'undefined') {
    if (typeof params.type !== 'object' && params.type) {
      url.type = '' + params.type;
    } else {
      throw new TypeError('Invalid type: ' + params.type + ' should be a string.');
    }
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('id')) {
    request.url = '/' + encodeURIComponent(url.index) + '/' + encodeURIComponent(url.type || '_all') + '/' + encodeURIComponent(url.id) + '';
  }
  else {
    throw new TypeError('Unable to build a url with those params. Supply at least [object Object], [object Object], [object Object]');
  }
  

  // build the query string
  if (typeof params.parent !== 'undefined') {
    if (typeof params.parent !== 'object' && params.parent) {
      query.parent = '' + params.parent;
    } else {
      throw new TypeError('Invalid parent: ' + params.parent + ' should be a string.');
    }
  }
  
  if (typeof params.preference !== 'undefined') {
    if (typeof params.preference !== 'object' && params.preference) {
      query.preference = '' + params.preference;
    } else {
      throw new TypeError('Invalid preference: ' + params.preference + ' should be a string.');
    }
  }
  
  if (typeof params.realtime !== 'undefined') {
    if (params.realtime.toLowerCase && (params.realtime = params.realtime.toLowerCase())
      && (params.realtime === 'no' || params.realtime === 'off')
    ) {
      query.realtime = false;
    } else {
      query.realtime = !!params.realtime;
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
  
  if (typeof params.routing !== 'undefined') {
    if (typeof params.routing !== 'object' && params.routing) {
      query.routing = '' + params.routing;
    } else {
      throw new TypeError('Invalid routing: ' + params.routing + ' should be a string.');
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doExists;
