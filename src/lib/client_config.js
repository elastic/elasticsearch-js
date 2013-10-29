/**
 * Manages the configuration of the client.
 *
 * @class ClientConfig
 * @type {Function}
 */
module.exports = ClientConfig;

var url = require('url');
var _ = require('./utils');
var Host = require('./host');
var selectors = _.reKey(_.requireDir(module, './selectors'), _.camelCase);
var connections = _.requireClasses(module, './connections');
var serializers = _.requireClasses(module, './serializers');

var extractHostPartsRE = /\[([^:]+):(\d+)]/;
var hostProtocolRE = /^([a-z]+:)?\/\//;

var defaultClasses = {
  log: require('./log'),
  serializer: serializers.Json,
  connectionPool: require('./connection_pool'),
  transport: require('./transport'),
};

var defaultConfig = {
  hosts: [
    {
      host: 'localhost',
      port: 9200,
      protocol: 'http'
    }
  ],
  connectionClass: connections.Http,
  selector: selectors.roundRobin,
  sniffOnStart: false,
  sniffAfterRequests: null,
  sniffOnConnectionFail: false,
  maxRetries: 3,
  timeout: 10000,
  deadTimeout: 60000,
  maxSockets: 10,
  nodesToHostCallback: function (nodes) {
    var hosts = [];
    _.each(nodes, function (node, id) {
      var hostnameMatches = extractHostPartsRE.exec(node.host);
      hosts.push({
        host: hostnameMatches[1],
        port: hostnameMatches[2],
        _meta: {
          id: id,
          name: node.name,
          servername: node.host,
          version: node.version
        }
      });
    });
    return hosts;
  }
};

function ClientConfig(config) {
  _.extend(this, defaultConfig, config);

  // validate connectionClass
  if (typeof this.connectionClass !== 'function') {
    if (typeof connections[this.connectionClass] === 'function') {
      this.connectionClass = connections[this.connectionClass];
    } else {
      throw new TypeError('Invalid connectionClass ' + this.connectionClass + '. ' +
        'Expected a constructor or one of ' + _.keys(connections).join(', '));
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

  _.each(defaultClasses, function (DefaultClass, prop) {
    this[prop] = typeof this[prop] === 'function' ? new this[prop](this) : new DefaultClass(this);
  }, this);

  // populate the connection pool
  this.connectionPool.setNodes(this.prepareHosts(this.hosts));

  // nodes are completely managed by the connection pool, remove traces of the config
  // value to prevent confusion
  delete this.hosts;
}

ClientConfig.prototype.prepareHosts = function (hosts) {
  var host;
  var i;

  if (!_.isArray(hosts)) {
    hosts = [hosts];
  }

  return _.map(hosts, function (host) {
    return new Host(host);
  });
};

/**
 * Shutdown the connections, log outputs, and clear timers
 */
ClientConfig.prototype.close = function () {
  this.log.close();
  this.connectionPool.close();
};
