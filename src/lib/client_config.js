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
var selectors = require('./selectors');

var connectors = {};
if (process.browser) {
  connectors.Xhr = require('./connectors/xhr');
  connectors.Angular = require('./connectors/angular');
  connectors.jQuery = require('./connectors/jquery');
} else {
  connectors.Http = require('./connectors/http');
}

_.each(connectors, function (conn, name) {
  if (typeof conn !== 'function') {
    delete connectors[name];
  }
});

var serializers = {
  Json: require('./serializers/json')
};

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
  connectionClass: process.browser ? connectors.Xhr : connectors.Http,
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

// remove connector classes that were not included in the build
connectors = _.transform(connectors, function (note, connector, name) {
  if (connector) {
    note[name] = connector;
  }
}, {});

function ClientConfig(config) {
  _.extend(this, defaultConfig, config);

  // validate connectionClass
  if (typeof this.connectionClass !== 'function') {
    if (typeof connectors[this.connectionClass] === 'function') {
      this.connectionClass = connectors[this.connectionClass];
    } else {
      throw new TypeError('Invalid connectionClass "' + this.connectionClass + '". ' +
        'Expected a constructor or one of ' + _.keys(connectors).join(', '));
    }
  }

  // validate selector
  if (typeof this.selector !== 'function') {
    if (_.has(selectors, this.selector)) {
      this.selector = selectors[this.selector];
    } else {
      throw new TypeError('Invalid Selector "' + this.selector + '". ' +
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
 * Shutdown the connectionPool, log outputs, and clear timers
 */
ClientConfig.prototype.close = function () {
  this.log.close();
  this.connectionPool.close();
};
