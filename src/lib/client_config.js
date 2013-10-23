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
  maxRetries: 3,
  timeout: 10000,
  deadTimeout: 60000
};

function ClientConfig(config) {
  _.extend(this, defaultConfig, config);

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
      throw new TypeError('Invalid Selector ' + this.selector + '. ' +
        'Expected a function or one of ' + _.keys(selectors).join(', '));
    }
  }

  // currently not configurable because!
  this.log = new Log(this);
  this.connectionPool = new ConnectionPool(this);
  this.serializer = new serializers.Json(this);

  // populate the connection pool
  this.connectionPool.setNodes(this.prepareHosts(this.hosts));

  // nodes are completely managed by the connection pool, remove traces of the config
  // value to prevent confusion
  delete this.hosts;
}

ClientConfig.prototype.prepareHosts = function (hosts) {
  var host;
  var i;

  if (_.isArray(hosts)) {
    hosts = [hosts];
  }

  for(i = 0; i < hosts.length; i++) {
    host = hosts[i];
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

      if (!host.hostname) {
        host.hostname = 'localhost';
      }

      if (!host.port) {
        host.port = 9200;
      }
    } else {
      // assume it is a string.

      if (!hostProtocolRE.test(host)) {
        // add a defaul protocol
        host = 'http://' + host;
      }

      // parse the url please, node
      var urlInfo = url.parse(host, false, true);

      // override the host value
      hosts[i] = {
        protocol: urlInfo.protocol || 'http:',
        hostname: urlInfo.hostname || 'localhost',
        port: urlInfo.port || 9200
      };
    }
  }

  return hosts;
};
