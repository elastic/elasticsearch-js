/**
 * Manager of connections to a node(s), capable of ensuring that connections are clear and living
 * before providing them to the application
 *
 * @class ConnectionPool
 * @constructor
 * @param {Object} config - The config object passed to the transport.
 */

module.exports = ConnectionPool;

var _ = require('./utils');
var Log = require('./log');

function ConnectionPool(config) {
  _.makeBoundMethods(this);

  this.log = config.log;
  if (!this.log) {
    this.log = new Log();
  }

  // get the selector config var
  this.selector = _.funcEnum(config, 'selector', ConnectionPool.selectors, ConnectionPool.defaultSelectors);
  // get the connection class
  this.Connection = _.funcEnum(config, 'connectionClass', ConnectionPool.connectionClasses,
    ConnectionPool.defaultConnectionClass);

  // a map of connections to their "id" property, used when sniffing
  this.index = {};

  this.connections = {
    alive: [],
    dead: []
  };
}

// selector options
ConnectionPool.selectors = require('./selectors');
ConnectionPool.defaultSelectors = 'round_robin';

// get the connection options
ConnectionPool.connectionClasses = require('./connectors');
ConnectionPool.defaultConnectionClass = ConnectionPool.connectionClasses._default;
delete ConnectionPool.connectionClasses._default;

/**
 * Selects a connection from the list using the this.selector
 * Features:
 *  - detects if the selector is async or not
 *  - sync selectors should still return asynchronously
 *  - catches errors in sync selectors
 *  - automatically selects the first dead connection when there no living connections
 *
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
ConnectionPool.prototype.select = function (cb) {
  if (this.connections.alive.length) {
    if (this.selector.length > 1) {
      this.selector(this.connections.alive, cb);
    } else {
      try {
        _.nextTick(cb, null, this.selector(this.connections.alive));
      } catch (e) {
        cb(e);
      }
    }
  } else {
    _.nextTick(cb, null, this.connections.dead[0]);
  }
};

ConnectionPool.prototype.onStatusSet = _.handler(function (status, oldStatus, connection) {
  var from, to, index;

  if (oldStatus === status) {
    if (status === 'dead') {
      // we want to remove the connection from it's current possition and move it to the end
      status = 'redead';
    } else {
      return true;
    }
  }

  switch (status) {
  case 'alive':
    from = this.connections.dead;
    to = this.connections.alive;
    break;
  case 'dead':
    from = this.connections.alive;
    to = this.connections.dead;
    break;
  case 'redead':
    from = this.connections.dead;
    to = this.connections.dead;
    break;
  case 'closed':
    from = this.connections[oldStatus];
    break;
  }

  if (from && from.indexOf) {
    index = from.indexOf(connection);
    if (~index) {
      from.splice(index, 1);
    }
  }

  if (to && to.indexOf) {
    index = to.indexOf(connection);
    if (!~index) {
      to.push(connection);
    }
  }
});

ConnectionPool.prototype.addConnection = function (connection) {
  if (!connection.id) {
    connection.id = connection.host.toString();
  }

  if (!this.index[connection.id]) {
    this.log.info('Adding connection to', connection.id);
    this.index[connection.id] = connection;
    connection.on('status set', this.bound.onStatusSet);
    connection.setStatus('alive');
  }
};

ConnectionPool.prototype.removeConnection = function (connection) {
  if (!connection.id) {
    connection.id = connection.host.toString();
  }

  if (this.index[connection.id]) {
    delete this.index[connection.id];
    connection.setStatus('closed');
    connection.removeListener('status set', this.bound.onStatusSet);
  }
};

ConnectionPool.prototype.setHosts = function (hosts) {
  var connection;
  var i;
  var id;
  var host;
  var toRemove = _.clone(this.index);

  for (i = 0; i < hosts.length; i++) {
    host = hosts[i];
    id = host.toString();
    if (this.index[id]) {
      delete toRemove[id];
    } else {
      connection = new this.Connection(host);
      connection.id = id;
      this.addConnection(connection);
    }
  }

  var removeIds = _.keys(toRemove);
  for (i = 0; i < removeIds.length; i++) {
    this.removeConnection(this.index[removeIds[i]]);
  }
};

ConnectionPool.prototype.close = function () {
  this.setHosts([]);
};
ConnectionPool.prototype.empty = ConnectionPool.prototype.close;
