/**
 * Class that manages making request, called by all of the API methods.
 * @type {[type]}
 */
module.exports = Transport;

var _ = require('./utils');
var errors = require('./errors');
var Host = require('./host');
var Promise = require('bluebird');

function Transport(config) {
  var self = this;
  config = config || {};

  var LogClass = (typeof config.log === 'function') ? config.log : require('./log');
  config.log = this.log = new LogClass(config);

  // setup the connection pool
  var ConnectionPool = _.funcEnum(config, 'connectionPool', Transport.connectionPools, 'main');
  this.connectionPool = new ConnectionPool(config);

  // setup the serializer
  var Serializer = _.funcEnum(config, 'serializer', Transport.serializers, 'json');
  this.serializer = new Serializer(config);

  // setup the nodesToHostCallback
  this.nodesToHostCallback = _.funcEnum(config, 'nodesToHostCallback', Transport.nodesToHostCallbacks, 'main');

  // setup max retries
  this.maxRetries = config.hasOwnProperty('maxRetries') ? config.maxRetries : 3;

  // setup endpoint to use for sniffing
  this.sniffEndpoint = config.hasOwnProperty('sniffEndpoint') ? config.sniffEndpoint : '/_nodes/_all/clear';

  // setup requestTimeout default
  this.requestTimeout = config.hasOwnProperty('requestTimeout') ? config.requestTimeout : 30000;

  if (config.hasOwnProperty('defer')) {
    this.defer = config.defer;
  }

  // randomizeHosts option
  var randomizeHosts = config.hasOwnProperty('randomizeHosts') ? !!config.randomizeHosts : true;

  if (config.host) {
    config.hosts = config.host;
  }

  if (config.hosts) {
    var hostsConfig = _.createArray(config.hosts, function (val) {
      if (_.isPlainObject(val) || _.isString(val) || val instanceof Host) {
        return val;
      }
    });
    if (!hostsConfig) {
      throw new TypeError('Invalid hosts config. Expected a URL, an array of urls, a host config object, ' +
        'or an array of host config objects.');
    }

    var hosts = _.map(hostsConfig, function (conf) {
      return (conf instanceof Host) ? conf : new Host(conf);
    });

    if (randomizeHosts) {
      hosts = _.shuffle(hosts);
    }

    this.connectionPool.setHosts(hosts);
  }

  if (config.sniffOnStart) {
    this.sniff();
  }

  if (config.sniffInterval) {
    this._timeout(function doSniff() {
      self.sniff();
      self._timeout(doSniff, config.sniffInterval);
    }, config.sniffInterval);
  }

  this.sniffAfterConnectionFault = config.sniffAfterConnectionFault;
}

Transport.connectionPools = {
  main: require('./connection_pool')
};

Transport.serializers = {
  json: require('./serializers/json')
};

Transport.nodesToHostCallbacks = {
  main: require('./nodes_to_host')
};

Transport.prototype.defer = function () {
  return Promise.defer();
};

/**
 * Perform a request with the client's transport
 *
 * @method request
 * @todo async body writing
 * @todo abort
 * @todo access to custom headers, modifying of request in general
 * @param {object} params
 * @param {Number} params.requestTimeout - timeout for the entire request (inculding all retries)
 * @param {Number} params.maxRetries - number of times the request will be re-run in
 *   the original node chosen can not be connected to.
 * @param {String} params.url - The url for the request
 * @param {String} params.method - The HTTP method for the request
 * @param {String} params.body - The body of the HTTP request
 * @param {Function} cb - A function to call back with (error, responseBody, responseStatus)
 */
Transport.prototype.request = function (params, cb) {

  var self = this;
  var remainingRetries = this.maxRetries;
  var requestTimeout = this.requestTimeout;

  var connection; // set in sendReqWithConnection
  var aborted = false; // several connector will respond with an error when the request is aborted
  var requestAborter; // an abort function, returned by connection#request()
  var requestTimeoutId; // the id of the ^timeout
  var ret; // the object returned to the user, might be a promise
  var defer; // the defer object, will be set when we are using promises.

  self.log.debug('starting request', params);

  if (params.body && params.method === 'GET') {
    _.nextTick(respond, new TypeError('Body can not be sent with method "GET"'));
    return;
  }

  // serialize the body
  if (params.body) {
    params.body = self.serializer[params.bulkBody ? 'bulkBody' : 'serialize'](params.body);
  }

  if (params.hasOwnProperty('maxRetries')) {
    remainingRetries = params.maxRetries;
  }

  if (params.hasOwnProperty('requestTimeout')) {
    requestTimeout = params.requestTimeout;
  }

  params.req = {
    method: params.method,
    path: params.path || '/',
    query: params.query,
    body: params.body,
  };

  function sendReqWithConnection(err, _connection) {
    if (aborted) {
      return;
    }

    if (err) {
      respond(err);
    } else if (_connection) {
      connection = _connection;
      requestAborter = connection.request(params.req, checkRespForFailure);
    } else {
      self.log.warning('No living connections');
      respond(new errors.NoConnections());
    }
  }

  function checkRespForFailure(err, body, status, headers) {
    if (aborted) {
      return;
    }

    requestAborter = void 0;

    if (err) {
      connection.setStatus('dead');
      if (remainingRetries) {
        remainingRetries--;
        self.log.error('Request error, retrying' + (err.message ? ' -- ' + err.message : ''));
        self.connectionPool.select(sendReqWithConnection);
      } else {
        self.log.error('Request complete with error' + (err.message ? ' -- ' + err.message : ''));
        respond(new errors.ConnectionFault(err));
      }
    } else {
      self.log.info('Request complete');
      respond(void 0, body, status, headers);
    }
  }

  function respond(err, body, status, headers) {
    if (aborted) {
      return;
    }

    self._timeout(requestTimeoutId);
    var parsedBody;
    var isJson = !headers || (headers['content-type'] && ~headers['content-type'].indexOf('application/json'));

    if (!err && body) {
      if (isJson) {
        parsedBody = self.serializer.deserialize(body);
        if (parsedBody == null) {
          err = new errors.Serialization();
          parsedBody = body;
        }
      } else {
        parsedBody = body;
      }
    }

    // does the response represent an error?
    if (
      (!err || err instanceof errors.Serialization)
      && (status < 200 || status >= 300)
      && (!params.ignore || !_.contains(params.ignore, status))
    ) {
      if (errors[status]) {
        err = new errors[status](parsedBody && parsedBody.error);
      } else {
        err = new errors.Generic('unknown error');
      }
    }

    // can we cast notfound to false?
    if (params.castExists) {
      if (err && err instanceof errors.NotFound) {
        parsedBody = false;
        err = void 0;
      } else {
        parsedBody = !err;
      }
    }

    // how do we send the response?
    if (typeof cb === 'function') {
      if (err) {
        cb(err, parsedBody, status);
      } else {
        cb(void 0, parsedBody, status);
      }
    } else if (err) {
      err.body = parsedBody;
      err.status = status;
      defer.reject(err);
    } else {
      defer.resolve(parsedBody);
    }
  }

  function abortRequest() {
    if (aborted) {
      return;
    }

    aborted = true;
    remainingRetries = 0;
    self._timeout(requestTimeoutId);
    if (typeof requestAborter === 'function') {
      requestAborter();
    }
  }

  if (requestTimeout && requestTimeout !== Infinity) {
    requestTimeoutId = this._timeout(function () {
      respond(new errors.RequestTimeout('Request Timeout after ' + requestTimeout + 'ms'));
      abortRequest();
    }, requestTimeout);
  }

  // determine the response based on the presense of a callback
  if (typeof cb === 'function') {
    ret = {
      abort: abortRequest
    };
  } else {
    defer = this.defer();
    ret = defer.promise;
    ret.abort = abortRequest;
  }


  if (connection) {
    sendReqWithConnection(void 0, connection);
  } else {
    self.connectionPool.select(sendReqWithConnection);
  }

  return ret;
};

Transport.prototype._timeout = function (cb, delay) {
  this._timers = this._timers || [];
  var id;

  if ('function' !== typeof cb) {
    id = cb;
    cb = void 0;
  }

  if (cb) {
    // set the timer
    id = setTimeout(cb, delay);
    this._timers.push(id);
    return id;
  }

  if (id) {
    clearTimeout(id);

    var i = this._timers.indexOf(id);
    if (i !== -1) {
      this._timers.splice(i, 1);
    }
  }
};

/**
 * Ask an ES node for a list of all the nodes, add/remove nodes from the connection
 * pool as appropriate
 *
 * @param  {Function} cb - Function to call back once complete
 */
Transport.prototype.sniff = function (cb) {
  var connectionPool = this.connectionPool;
  var nodesToHostCallback = this.nodesToHostCallback;
  var log = this.log;

  // make cb a function if it isn't
  cb = typeof cb === 'function' ? cb : _.noop;

  this.request({
    path: this.sniffEndpoint,
    method: 'GET'
  }, function (err, resp, status) {
    if (!err && resp && resp.nodes) {
      var hostsConfigs;

      try {
        hostsConfigs = nodesToHostCallback(resp.nodes);
      } catch (e) {
        log.error(new Error('Unable to convert node list from ' + this.sniffEndpoint +
          ' to hosts durring sniff. Encountered error:\n' + (e.stack || e.message)));
        return;
      }

      connectionPool.setHosts(_.map(hostsConfigs, function (hostConfig) {
        return new Host(hostConfig);
      }));
    }
    cb(err, resp, status);
  });
};

/**
 * Close the Transport, which closes the logs and connection pool
 * @return {[type]} [description]
 */
Transport.prototype.close = function () {
  this.log.close();
  _.each(this._timers, clearTimeout);
  this.connectionPool.close();
};
