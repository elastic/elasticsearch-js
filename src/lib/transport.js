/**
 * Class that manages making request, called by all of the API methods.
 * @type {[type]}
 */
module.exports = Transport;

var _ = require('./utils');
var errors = require('./errors');
var when = require('when');

function Transport(config) {
  this.config = config;
}

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

  var log = this.config.log;
  var serializer = this.config.serializer;
  var connectionPool = this.config.connectionPool;
  var remainingRetries = this.config.maxRetries;
  var connection; // set in sendReqWithConnection
  var connectionReq; // an object with an abort method, set in sendReqWithConnection
  var request; // the object returned to the user, might be a deferred

  log.debug('starting request', params);

  if (params.body && params.method === 'GET') {
    _.nextTick(respond, new TypeError('Body can not be sent with method "GET"'));
    return;
  }

  // serialize the body
  if (params.body) {
    params.body = serializer[params.bulkBody ? 'bulkBody' : 'serialize'](params.body);
  }

  params.req = {
    timeout: params.timeout,
    method: params.method,
    path: params.path,
    query: params.query,
    body: params.body,
  };

  connectionPool.select(sendReqWithConnection);

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
      log.warning('No living connections');
      respond(new errors.NoConnections());
    }
  }

  function checkRespForFailure(err, body, status) {
    if (err && remainingRetries) {
      remainingRetries--;
      log.error(err.message, '-- retrying');
      connectionPool.select(sendReqWithConnection);
    } else {
      log.info('Request complete');
      respond(err, body, status);
    }
  }

  function respond(err, body, status) {
    var parsedBody;

    if (!err && body) {
      parsedBody = serializer.unserialize(body);
      if (parsedBody == null) {
        err = new errors.Serialization();
      }
    }

    if (!err) {
      // get ignore and ensure that it's an array
      var ignore = params.ignore;
      if (ignore && !_.isArray(ignore)) {
        ignore = [ignore];
      }

      if ((status < 200 || status >= 300)
          && (!ignore || !_.contains(ignore, status))
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
    var defer = when.defer();
    defer.promise.abort = abortRequest;
    request = defer.promise;
  }

  return request;
};

/**
 * Ask an ES node for a list of all the nodes, add/remove nodes from the connection
 * pool as appropriate
 *
 * @param  {Function} cb - Function to call back once complete
 */
Transport.prototype.sniff = function (cb) {
  var config = this.config;

  // make cb a function if it isn't
  cb = typeof cb === 'function' ? cb : _.noop;

  this.request({
    path: '/_cluster/nodes',
    method: 'GET'
  }, function (err, resp) {
    if (!err && resp && resp.nodes) {
      var nodes = config.nodesToHostCallback(resp.nodes);
      config.connectionPool.setNodes(nodes);
    }
    cb(err, resp);
  });
};
