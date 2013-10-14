var _ = require('../lib/utils'),
  paramHelper = require('../lib/param_helper'),
  errors = require('../lib/errors'),
  q = require('q');

var consistencyOptions = ['one', 'quorum', 'all'];
var replicationOptions = ['sync', 'async'];

/**
 * Perform an elasticsearch [update](http://elasticsearch.org/guide/reference/api/update/) request
 *
 * @for Client
 * @method update
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.consistency - Explicit write consistency setting for the operation
 * @param {String|ArrayOfStrings|Boolean} params.fields - A comma-separated list of fields to return in the response
 * @param {string} params.lang - The script language (default: mvel)
 * @param {string} params.parent - ID of the parent document
 * @param {string} params.percolate - Perform percolation during the operation; use specific registered query name, attribute, or wildcard
 * @param {boolean} params.refresh - Refresh the index after performing the operation
 * @param {String} [params.replication=sync] - Specific replication type
 * @param {number} params.retry_on_conflict - Specify how many times should the operation be retried when a conflict occurs (default: 0)
 * @param {string} params.routing - Specific routing value
 * @param {*} params.script - The URL-encoded script definition (instead of using request body)
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Date|Number} params.timestamp - Explicit timestamp for the document
 * @param {duration} params.ttl - Expiration time for the document
 * @param {number} params.version - Explicit version number for concurrency control
 * @param {number} params.version_type - Explicit version number for concurrency control
 */
function doUpdate(params, cb) {
  params = params || {};

  var request = {
      ignore: params.ignore,
      body: params.body || null
    }
    , parts = {}
    , query = {}
    , responseOpts = {};

  request.method = 'POST';

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

  if (typeof params.type !== 'object' && params.type) {
    parts.type = '' + params.type;
  } else {
    throw new TypeError('Invalid type: ' + params.type + ' should be a string.');
  }


  // build the path
  if (parts.hasOwnProperty('index') && parts.hasOwnProperty('type') && parts.hasOwnProperty('id')) {
    request.path = '/' + encodeURIComponent(parts.index) + '/' + encodeURIComponent(parts.type) + '/' + encodeURIComponent(parts.id) + '/_update';
  }
  else {
    throw new TypeError('Unable to build a path with those params. Supply at least [object Object], [object Object], [object Object]');
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

  if (typeof params.lang !== 'undefined') {
    if (typeof params.lang !== 'object' && params.lang) {
      query.lang = '' + params.lang;
    } else {
      throw new TypeError('Invalid lang: ' + params.lang + ' should be a string.');
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

  if (typeof params.retry_on_conflict !== 'undefined') {
    if (_.isNumeric(params.retry_on_conflict)) {
      query.retry_on_conflict = params.retry_on_conflict * 1;
    } else {
      throw new TypeError('Invalid retry_on_conflict: ' + params.retry_on_conflict + ' should be a number.');
    }
  }

  if (typeof params.routing !== 'undefined') {
    if (typeof params.routing !== 'object' && params.routing) {
      query.routing = '' + params.routing;
    } else {
      throw new TypeError('Invalid routing: ' + params.routing + ' should be a string.');
    }
  }

  if (typeof params.script !== 'undefined') {
    query.script = params.script;
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
    if (_.isNumeric(params.version_type)) {
      query.version_type = params.version_type * 1;
    } else {
      throw new TypeError('Invalid version_type: ' + params.version_type + ' should be a number.');
    }
  }

  request.path = request.path + _.makeQueryString(query);

  this.client.request(request, cb);
}

module.exports = doUpdate;
