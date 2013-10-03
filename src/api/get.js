var _ = require('../lib/toolbelt')
  , paramHelper = require('../lib/param_helper');



/**
 * Perform an elasticsearch [get](http://elasticsearch.org/guide/reference/api/get/) request
 *
 * @for Client
 * @method get
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String|ArrayOfStrings|Boolean} params.fields - A comma-separated list of fields to return in the response
 * @param {string} params.parent - The ID of the parent document
 * @param {string} params.preference - Specify the node or shard the operation should be performed on (default: random)
 * @param {boolean} params.realtime - Specify whether to perform the operation in realtime or search mode
 * @param {boolean} params.refresh - Refresh the shard containing the document before performing the operation
 * @param {string} params.routing - Specific routing value
 * @param {String|ArrayOfStrings|Boolean} params._source - True or false to return the _source field or not, or a list of fields to return
 * @param {String|ArrayOfStrings|Boolean} params._source_exclude - A list of fields to exclude from the returned _source field
 * @param {String|ArrayOfStrings|Boolean} params._source_include - A list of fields to extract and return from the _source field
 */
function doGet(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  request.method = 'get';

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
  
  if (typeof params._source !== 'undefined') {
    switch (typeof params._source) {
    case 'string':
      query._source = params._source;
      break;
    case 'object':
      if (_.isArray(params._source)) {
        query._source = params._source.join(',');
      } else {
        throw new TypeError('Invalid _source: ' + params._source + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      query._source = !!params._source;
    }
  }
  
  if (typeof params._source_exclude !== 'undefined') {
    switch (typeof params._source_exclude) {
    case 'string':
      query._source_exclude = params._source_exclude;
      break;
    case 'object':
      if (_.isArray(params._source_exclude)) {
        query._source_exclude = params._source_exclude.join(',');
      } else {
        throw new TypeError('Invalid _source_exclude: ' + params._source_exclude + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      query._source_exclude = !!params._source_exclude;
    }
  }
  
  if (typeof params._source_include !== 'undefined') {
    switch (typeof params._source_include) {
    case 'string':
      query._source_include = params._source_include;
      break;
    case 'object':
      if (_.isArray(params._source_include)) {
        query._source_include = params._source_include.join(',');
      } else {
        throw new TypeError('Invalid _source_include: ' + params._source_include + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      query._source_include = !!params._source_include;
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doGet;
