var _ = require('../lib/utils'),
  paramHelper = require('../lib/param_helper'),
  errors = require('../lib/errors'),
  q = require('q');

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
function doExists(params, cb) {
  params = params || {};

  var request = {
      ignore: _.union([404], params.ignore)
    }
    , parts = {}
    , query = {}
    , responseOpts = {};

  request.method = 'HEAD';

  // find the paths's params
  if (typeof params.id !== 'object' && params.id) {
    parts.id = '' + params.id;
  } else {
    throw new TypeError('Invalid id: ' + params.id + ' should be a string.');
  }

  if (typeof params.index !== 'object' && params.index) {
    parts.index = '' + params.index;
  } else {
    throw new TypeError('Invalid index: ' + params.index + ' should be a string.');
  }

  if (typeof params.type !== 'undefined') {
    if (typeof params.type !== 'object' && params.type) {
      parts.type = '' + params.type;
    } else {
      throw new TypeError('Invalid type: ' + params.type + ' should be a string.');
    }
  }


  // build the path
  if (parts.hasOwnProperty('index') && parts.hasOwnProperty('id')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/' + encodeURIComponent(parts.type || '_all') + '/' + encodeURIComponent(parts.id) + '';
  }
  else {
    throw new TypeError('Unable to build a path with those params. Supply at least [object Object], [object Object], [object Object]');
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

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, function (err, response) {
    if (err instanceof errors.NotFound) {
      cb(err, false);
    } else {
      cb(err, true);
    }
  });
}

module.exports = doExists;
