var interceptors = [];
var complete = [];
var MockHttpRequest = require('./browser_http');
var XhrServer = MockHttpRequest.MockHttpServer;
var parseUrl = MockHttpRequest.prototype.parseUri;
var _ = require('lodash-node');

var server = new XhrServer(function (request) {
  var reqDetails = {
    method: request.method,
    host: request.urlParts.host,
    path: request.urlParts.relative
  };
  var response = _.find(interceptors, reqDetails);

  if (response) {
    // remove of tick down the times
    if (response.times === 1) {
      var i = interceptors.indexOf(response);
      complete.push(interceptors.splice(i, 1));
    } else {
      response.times--;
    }

    request.receive(response.status, response.body || void 0);
  } else {
    throw new Error('No known match for request: ' + JSON.stringify(reqDetails));
  }
});

server.start();

var mockNock = module.exports = function (url) {
  var parsedUrl = parseUrl(url);
  var req = {
    method: 'GET',
    host: parsedUrl.host,
    times: 1
  };

  var modifyReq = {
    get: function (path) {
      req.path = path;
      req.method = 'GET';
      return modifyReq;
    },
    port: function (path) {
      req.path = path;
      req.method = 'POST';
      return modifyReq;
    },
    times: function (times) {
      req.times = times;
      return modifyReq;
    },
    reply: function (status, body) {
      req.status = status;
      req.body = body;
      switch (typeof req.body) {
      case 'string':
      case 'number':
        break;
      default:
        try {
          req.body = req.body && JSON.stringify(req.body);
        } catch (e) {
          req.body = req.body;
        }
      }
      interceptors.push(req);
      return mockNock(url);
    },
    done: mockNock.done
  };

  return modifyReq;
};

mockNock.done = function () {
  if (interceptors.length) {
    throw new Error('Some interceptors were not called: ' + JSON.stringify(interceptors));
  }
};