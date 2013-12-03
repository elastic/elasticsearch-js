/**
 * Class that manages making request, called by all of the API methods.
 * @type {[type]}
 */
module.exports = Transport;

var _ = require('./utils');
var errors = require('./errors');
var Host = require('./host');
var when = require('when');

function Transport(config) {
  config = config || {};

  var LogClass = _.funcEnum(config, 'logClass', Transport.logs, 'main');
  config.log = this.log = new LogClass(config);

  // overwrite the createDefer method if a new implementation is provided
  if (typeof config.createDefer === 'function') {
    this.createDefer = config.createDefer;
  }

  // setup the connection pool
  var ConnectionPool = _.funcEnum(config, 'connectionPool', Transport.connectionPools, 'main');
  this.connectionPool = new ConnectionPool(config);

  // setup the serializer
  var Serializer = _.funcEnum(config, 'serializer', Transport.serializers, 'json');
  this.serializer = new Serializer(config);

  // setup max retries
  this.maxRetries = config.hasOwnProperty('maxRetries') ? config.maxRetries : 3;

  if (config.hosts) {
    var hostsConfig = _.createArray(config.hosts, function (val) {
      if (_.isPlainObject(val) || _.isString(val)) {
        return val;
      }
    });
    if (!hostsConfig) {
      throw new Error('Invalid hosts config. Expected a URL, an array of urls, a host config object, or an array of ' +
        'host config objects.');
    }

    var hosts = _.map(hostsConfig, function (conf) {
      return new Host(conf);
    });

    if (config.randomizeHosts) {
      hosts = _.shuffle(hosts);
    }

    this.connectionPool.setHosts(hosts);
  }
}

Transport.connectionPools = {
  main: require('./connection_pool')
};

Transport.serializers = {
  json: require('./serializers/json')
};

Transport.logs = {
  main: require('./log')
};

Transport.nodesToHostCallbacks = {
  main: require('./nodes_to_host')
};

/**
 * Perform a request with the client's transport
 *
 * @method request
 * @todo async body writing
 * @todo abort
 * @todo access to custom headers, modifying of request in general
 * @param {object} params
 * @param {String} params.url - The url for the request
 * @param {String} params.method - The HTTP method for the request
 * @param {String} params.body - The body of the HTTP request
 * @param {Function} cb - A function to call back with (error, responseBody, responseStatus)
 */
Transport.prototype.request = function (params, cb) {

  var self = this;
  var remainingRetries = this.maxRetries;
  var connection; // set in sendReqWithConnection
  var connectionReq; // an object with an abort method, set in sendReqWithConnection
  var request; // the object returned to the user, might be a deferred

  self.log.debug('starting request', params);

  if (params.body && params.method === 'GET') {
    _.nextTick(respond, new TypeError('Body can not be sent with method "GET"'));
    return;
  }

  // serialize the body
  if (params.body) {
    params.body = self.serializer[params.bulkBody ? 'bulkBody' : 'serialize'](params.body);
  }

  params.req = {
    requestTimeout: params.requestTimeout,
    method: params.method,
    path: params.path,
    query: params.query,
    body: params.body,
  };

  self.connectionPool.select(sendReqWithConnection);

  function abortRequest() {
    remainingRetries = 0;
    connectionReq.abort();
  }

  function sendReqWithConnection(err, _connection) {
    if (err) {
      respond(err);
    } else if (_connection) {
      connection = _connection;
      connectionReq = connection.request(params.req, checkRespForFailure);
    } else {
      self.log.warning('No living connections');
      respond(new errors.NoConnections());
    }
  }

  function checkRespForFailure(err, body, status) {
    if (err && remainingRetries) {
      remainingRetries--;
      self.log.error(err.message, '-- retrying');
      self.connectionPool.select(sendReqWithConnection);
    } else {
      self.log.info('Request complete');
      respond(err ? new errors.ConnectionFault() : void 0, body, status);
    }
  }

  function respond(err, body, status) {
    var parsedBody;

    if (!err && body) {
      parsedBody = self.serializer.unserialize(body);
      if (parsedBody == null) {
        err = new errors.Serialization();
      }
    }

    if (!err) {
      if ((status < 200 || status >= 300)
          && (!params.ignore || !_.contains(params.ignore, status))
      ) {
        if (errors[status]) {
          err = new errors[status](parsedBody && parsedBody.error);
        } else {
          err = new errors.Generic('unknown error');
        }
      }
    }

    if (params.castExists) {
      if (err && err instanceof errors.NotFound) {
        parsedBody = false;
        err = void 0;
      } else {
        parsedBody = !err;
      }
    }

    if (typeof cb === 'function') {
      cb(err, parsedBody, status);
    } else if (err) {
      request.reject(err);
    } else {
      request.resolve({
        body: parsedBody,
        status: status
      });
    }
  }

  // determine the API based on the presense of a callback
  if (typeof cb === 'function') {
    request = {
      abort: abortRequest
    };
  } else {
    var defer = this.createDefer();
    defer.promise.abort = abortRequest;
    request = defer.promise;
  }

  return request;
};

Transport.prototype.createDefer = function () {
  return when.defer();
};

/**
 * Ask an ES node for a list of all the nodes, add/remove nodes from the connection
 * pool as appropriate
 *
 * @param  {Function} cb - Function to call back once complete
 */
Transport.prototype.sniff = function (cb) {
  var self = this;

  // make cb a function if it isn't
  cb = typeof cb === 'function' ? cb : _.noop;

  this.request({
    path: '/_cluster/nodes',
    method: 'GET'
  }, function (err, resp) {
    if (!err && resp && resp.nodes) {
      var hosts = _.map(self.nodesToHostCallback(resp.nodes), function (hostConfig) {
        return new Host(hostConfig);
      });
      this.connectionPool.setHosts(hosts);
    }
    cb(err, resp);
  });
};

Transport.prototype.close = function () {
  this.log.close();
  this.connectionPool.close();
};
