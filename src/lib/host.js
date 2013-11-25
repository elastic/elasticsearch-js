/**
 * Class to wrap URLS, formatting them and maintaining their separate details
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

var urlParseFields = [
  'protocol', 'hostname', 'pathname', 'port', 'auth', 'query'
];

var simplify = ['host', 'path'];

function Host(config) {
  config = config || {};

  // defaults
  this.protocol = 'http';
  this.host = 'localhost';
  this.path = '';
  this.port = 9200;
  this.auth = null;
  this.query = null;

  if (typeof config === 'string') {
    if (!startsWithProtocolRE.test(config)) {
      config = 'http://' + config;
    }
    config = _.pick(url.parse(config, false, true), urlParseFields);
  }

  if (_.isObject(config)) {
    // move hostname/portname to host/port semi-intelligently.
    _.each(simplify, function (to) {
      var from = to + 'name';
      if (config[from] && config[to]) {
        if (config[to].indexOf(config[from]) === 0) {
          config[to] = config[from];
        }
      } else if (config[from]) {
        config[to] = config[from];
      }
      delete config[from];
    });
  } else {
    config = {};
  }

  _.assign(this, config);

  // make sure the query string is parsed
  if (this.query === null) {
    // majority case
    this.query = {};
  } else if (!_.isPlainObject(this.query)) {
    this.query = qs.parse(this.query);
  }

  // make sure that the port is a number
  if (typeof this.port !== 'number') {
    this.port = parseInt(this.port, 10);
    if (isNaN(this.port)) {
      this.port = 9200;
    }
  }

  // make sure the path starts with a leading slash
  if (this.path && this.path.charAt(0) !== '/') {
    this.path = '/' + (this.path || '');
  }

  // strip trailing ':' on the protocol (when config comes from url.parse)
  if (this.protocol.substr(-1) === ':') {
    this.protocol = this.protocol.substring(0, this.protocol.length - 1);
  }
}

Host.prototype.makeUrl = function (params) {
  params = params || {};
  // build the port
  var port = '';
  if (this.port !== defaultPort[this.protocol]) {
    // add an actual port
    port = ':' + this.port;
  }

  // build the path
  var path = '' + (this.path || '') + (params.path || '');

  // if path doesn't start with '/' add it.
  if (path.charAt(0) !== '/') {
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

Host.prototype.toString = function () {
  return this.makeUrl();
};
