/* elasticsearch-js nodejs transport */
var http = require('http')
  , _ = require('../toolbelt')
  , url = require('url')
  , Q = require('q');

/**
 * Http transport to use in Node.js
 *
 * @class  NodeHttp
 */
function NodeHttp(hosts, client) {
  this.hosts = _.map(hosts, function (host) {
    if (!~host.indexOf('//')) {
      host = '//' + host;
    }
    return _.pick(url.parse(host, false, true), ['hostname', 'port']);
  });
  this.client = client;
}

NodeHttp.prototype.request = function (params) {
  var deferred = Q.defer()
    , req = _.extend(
      url.parse(params.url, false, false),
      this.hosts[Math.round(Math.random() * (this.hosts.length - 1))]
    );

  // we need to have a method
  req.method = params.method || (params.body ? 'post' : 'get');

  // ensure that get isn't being used with a request body
  if (params.body && req.method.toLowerCase() === 'get') {
    deferred.reject(new TypeError('HTTP Method GET can not have a body'));
    return deferred.promise;
  }

  var request = http.request(req, function (res) {
    var response = {
      data : '',
      headers : res.headers,
      status : res.statusCode
    };

    res.setEncoding('utf8');

    res.on('data', function (d) {
      response.data += d;
    });

    res.on('end', function () {
      this.client.log.trace(req.method, req, params.body, response.status, response.data);

      // attempt to parse the response
      if (response.data) {
        try {
          response.data = JSON.parse(response.data);
        } catch (e) {
          response.error = new TypeError('Non-valid JSON reponse from Elasticsearch');
        }
      }

      if (!response.error && response.status >= 400) {
        response.error = new Error(errorMessage(response));
        response.error.status = response.status;
      }

      if (response.error) {
        if (_.contains(params.ignore, response.status)) {
          deferred.resolve(false, response);
        } else {
          // reject with error
          deferred.reject(response.error, response);
        }
      } else {
        // we're done
        deferred.resolve(req.method === 'head' ? true : response.data, response);
      }
    }.bind(this));

  }.bind(this));

  request.on('error', function (err) {
    deferred.reject(err);
  });

  if (params.body) {
    request.write(params.body);
  }

  request.end();

  return deferred.promise;
};

function errorMessage(response) {
  if (response.data.error) {
    return response.data.error;
  } else {
    switch (response.status) {
    case 404:
      return 'Not Found';
    default:
      return response.status + ' - Unkown Error';
    }
  }
}

module.exports = NodeHttp;
