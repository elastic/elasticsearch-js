/**
 * Manages the configuration of the client.
 *
 * @class ClientConfig
 * @type {Function}
 */
module.exports = ClientConfig;

var url = require('url');
var _ = require('./utils');
var selectors = _.reKey(_.requireDir(module, './selectors'), _.camelCase);
var connections = _.requireClasses(module, './connections');
var serializers = _.requireClasses(module, './serializers');
var Transport = require('./transport');
var ConnectionPool = require('./connection_pool');
var Log = require('./log');

var extractHostPartsRE = /\[([^:]+):(\d+)]/;
var hostProtocolRE = /^([a-z]+:)?\/\//;

var defaultConfig = {
  hosts: [
    {
      protocol: 'http:',
      hostname: 'localhost',
      port: 9200
    }
  ],
  connectionConstructor: 'Http',
  selector: selectors.roundRobin,
  nodesToHostCallback: function (nodes) {
    var hosts = [];
    _.each(nodes, function (node, id) {
      var hostnameMatches = extractHostPartsRE.exec(node.hostname);
      hosts.push({
        hostname: hostnameMatches[1],
        port: hostnameMatches[2],
        id: id,
        name: node.name,
        servername: node.hostname,
        version: node.version
      });
    });
    return hosts;
  },
  sniffOnStart: false,
  sniffAfterRequests: null,
  sniffOnConnectionFail: false,
  maxRetries: 3
};

function ClientConfig(config) {
  _.extend(this, defaultConfig, config);

  if (typeof this.hosts !== 'object') {
    this.hosts = [this.hosts];
  }

  // validate connectionConstructor
  if (typeof this.connectionConstructor !== 'function') {
    if (_.has(connections, this.connectionConstructor)) {
      this.connectionConstructor = connections[this.connectionConstructor];
    } else {
      throw new TypeError('Invalid connectionConstructor ' + this.connectionConstructor +
        ', specify a function or one of ' + _.keys(connections).join(', '));
    }
  }

  // validate selector
  if (typeof this.selector !== 'function') {
    if (_.has(selectors, this.selector)) {
      this.selector = selectors[this.selector];
    } else {
      throw new TypeError('Invalid Selector ' + this.selector + '. specify a function or one of ' + _.keys(selectors).join(', '));
    }
  }

  this.serializer = new serializers.Json(this);
  this.hosts = _.map(this.hosts, this.transformHost);

  this.log = new Log(this);
  this.transport = new Transport(this);
  this.connectionPool = new ConnectionPool(this);

  this.transport.createConnections(this.hosts);

  if (this.randomizeHosts) {
    this.connectionPool.connections.alive = _.shuffle(this.connectionPool.connections.alive);
  }

}

ClientConfig.prototype.transformHost = function (host) {
  if (typeof host === 'object') {
    if (host.protocol) {
      // the protocol must end in a color
      if (host.protocol[host.protocol.length - 1] !== ':') {
        host.protocol = host.protocol + ':';
      }
    } else {
      host.protocol = 'http:';
    }

    if (host.host && !host.hostname) {
      // utl.format && url.parse uses "hostname" to represent just the name of the host, "host" is "hostname + port"
      host.hostname = host.host;
      delete host.host;
    }

    return host;
  }

  if (!hostProtocolRE.test(host)) {
    host = 'http://' + host;
  }
  var urlInfo = url.parse(host, false, true);
  return {
    protocol: urlInfo.protocol,
    hostname: urlInfo.hostname,
    port: urlInfo.port
  };
};
