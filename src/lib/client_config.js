/**
 * Manages the configuration of the client.
 *
 * @class ClientConfig
 * @type {Function}
 */
module.exports = ClientConfig;

var url = require('url'),
    _ = require('./utils'),
    selectors = _.reKey(_.requireDir(module, './selectors'), _.camelCase),
    connections = _.requireClasses(module, './connections'),
    extractHostPartsRE = /\[([^:]+):(\d+)]/,
    hostProtocolRE = /^([a-z]+:)?\/\//;

var defaultConfig = {
  hosts: [
    {
      protocol: 'http:',
      host: 'localhost',
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

  this.hosts = _.map(this.hosts, this.transformHost);
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
