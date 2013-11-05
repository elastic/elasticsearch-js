/**
 * Class to wrap URLS, formatting them and maintaining their seperate details
 * @type {[type]}
 */
module.exports = Host;

var url = require('url');
var qs = require('querystring');
var _ = require('./utils');

var startsWithProtocolRE = /^([a-z]+:)?\/\//;

// simple reference used when formatting as a url
var defaultPort = {
  http: 80,
  https: 443
};

function Host(config) {
  if (this instanceof Host) {
    if (typeof config === 'string') {
      return Host.fromString(config);
    } else {
      _.extend(this, config || {});
    }
  } else {
    return new Host(config);
  }
}

Host.fromString = function (urlString) {
  if (!startsWithProtocolRE.test(urlString)) {
    urlString = 'http://' + urlString;
  }
  var u = url.parse(urlString, true, true);
  return new Host({
    protocol: u.protocol ? u.protocol.substring(0, u.protocol.length - 1) : 'http',
    host: u.hostname || 'localhost',
    port: u.port || 9200,
    auth: u.auth || '',
    path: u.pathname,
    query: u.query,
  });
};

Host.prototype = {
  protocol: 'http',
  host: 'localhost',
  port: 9200,
  auth: '',
  path: '',
  query: false
};

Host.prototype.makeUrl = function (params) {
  params = params || {};
  // build the port
  var port = '';
  if (this.port !== defaultPort[this.protocol]) {
    // add an actual port
    port = ':' + this.port;
  }

  // build the path
  var path = '';
  // add the path prefix if set
  if (this.path) {
    path += this.path;
  }
  // then the path from the params
  if (params.path) {
    path += params.path;
  }
  // if we still have a path, and it doesn't start with '/' add it.
  if (path && path.charAt(0) !== '/') {
    path = '/' + path;
  }

  // build the query string
  var query = '';
  if (params.query) {
    // if the user passed in a query, merge it with the defaults from the host
    query = qs.stringify(
      _.defaults(typeof params.query === 'string' ? qs.parse(params.query) : params.query, this.query)
    );
  } else if (this.query) {
    // just stringify the hosts query
    query = qs.stringify(this.query);
  }

  return this.protocol + '://' + this.host + port + path + (query ? '?' + query : '');
};
