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
  query: {}
};

Host.prototype.toUrl = function (path, query) {
  if (query) {
    query = '?' + qs.stringify(_.defaults(typeof query === 'string' ? qs.parse(query) : query, this.query));
  } else {
    query = '';
  }

  return this.protocol + '://' +
    this.host + (this.port !== defaultPort[this.protocol] ? ':' + this.port : '') +
    '/' + this.path + (path || '') + query;
};
