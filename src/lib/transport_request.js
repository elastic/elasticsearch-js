/**
 * Constructs a function that can be called to make a request to ES
 * @type {[type]}
 */
module.exports = TransportRequest;

var _ = require('./utils');
var EventEmitter = require('events').EventEmitter;
var errors = require('./errors');

function TransportRequest(config, params, cb) {
  // setup event emitter
  EventEmitter.call(this);
  // copy cetain methods into the bound object
  _.makeBoundMethods(this);

  this._params = params;
  this._log = config.log;
  this._serializer = config.serializer;
  this._connectionPool = config.connectionPool;
  this._remainingRetries = config.maxRetries;

  // in cb isn't a function make it one
  if (typeof cb === 'function') {
    this.once('done', cb);
  }

  this._startRequest();
}
_.inherits(TransportRequest, EventEmitter);

TransportRequest.prototype._startRequest = function () {
  var params = this._params;

  this._log.debug('starting request', params);

  if (params.body && params.method === 'GET') {
    process.nextTick(_.bindKey(this, 'respond', new TypeError('Body can not be sent with method "GET"')));
    return;
  }

  // serialize the body
  if (params.body) {
    params.body = this._serializer[params.bulkBody ? 'bulkBody' : 'serialize'](params.body);
  }

  params.req = {
    timeout: params.timeout,
    path: params.path,
    query: params.query,
    method: params.method,
    body: params.body,
  };

  this._connectionPool.select(this.bound._sendReqWithCon);
};

TransportRequest.prototype._sendReqWithCon = _.handler(function (err, con) {
  if (err) {
    this._respond(err);
  } else if (con) {
    this._connection = con;
    this._log.info('Selected', con.status, 'Connection, making request');
    this._request = con.request(this._params.req, this.bound._checkRespForFail);
  } else {
    this._log.warning('No living connections');
    this._respond(new errors.ConnectionFault('No living connections.'));
  }
});

TransportRequest.prototype._checkRespForFail = _.handler(function (err, body, status) {
  if (err && this._remainingRetries) {
    this._remainingRetries--;
    this._log.info('Connection error, retrying');
    this._connectionPool.select(this.bound._sendReqWithCon);
  } else {
    this._log.info('Request complete');
    this._respond(err, body, status);
  }
});

TransportRequest.prototype._respond = _.handler(function (err, body, status) {
  if (this._response) {
    throw new Error('Request responded twice');
  }

  var parsedBody;
  var serializer = this._serializer;

  // get ignore and ensure that it's an array
  var ignore = this._params.ignore;
  if (ignore && !_.isArray(ignore)) {
    ignore = [ignore];
  }

  if (!err && body) {
    parsedBody = serializer.unserialize(body);
    if (parsedBody == null) {
      err = new errors.Serialization();
    }
  }

  if (!err) {
    if ((status < 200 || status >= 300) && !_.contains(ignore, status)) {
      if (errors[status]) {
        err = new errors[status](parsedBody && parsedBody.error);
      } else {
        err = new errors.Generic('unknown error');
      }
    }
  }

  if (this._params.castExists) {
    if (err && err instanceof errors.NotFound) {
      parsedBody = false;
      err = void 0;
    } else {
      parsedBody = !err;
    }
  }

  this._error = err;
  this._response = {
    body: parsedBody,
    status: status
  };

  this.emit('done', this._error, this._response.body, this._response.status);
});

TransportRequest.prototype.abort = function () {
  this.aborted = true;
  if (this.__request) {
    this.__request.abort();
    return true;
  }
  return false;
};

TransportRequest.prototype.then = function (callback, errback) {
  if (this._error) {
    errback(this._error);
  } else if (this._response) {
    callback(this._response);
  } else {
    this.once('done', _.bindKey(this, 'then', callback, errback));
  }
};
