/**
 * Manager of connections to a node(s), capable of ensuring that connections are clear and living
 * before providing them to the application
 *
 * @class ConnectionPool
 * @param {Client} client - The client this pool belongs to
 */

module.exports = ConnectionPool;

var _ = require('./utils');
var Host = require('./host');

function ConnectionPool(config) {
  _.makeBoundMethods(this);
  this.config = config;
  this.index = {};
  this.connections = {
    alive: [],
    dead: []
  };
}

ConnectionPool.prototype.select = function (cb) {
  if (this.connections.alive.length) {
    if (this.config.selector.length > 1) {
      this.config.selector(this.connections.alive, cb);
    } else {
      try {
        _.nextTick(cb, null, this.config.selector(this.connections.alive));
      } catch (e) {
        this.config.log.error(e);
        cb(e);
      }
    }
  } else {
    _.nextTick(cb, null, this.connections.dead[0]);
  }
};

ConnectionPool.prototype.onStatusChanged = _.handler(function (status, oldStatus, connection) {
  var from, to, index;

  if (oldStatus === status) {
    if (status === 'dead') {
      // we want to remove the connection from it's current possition and move it to the end
      status = 'redead';
    } else {
      return true;
    }
  } else {
    this.config.log.info('connection id:', connection.id, 'is', status);
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
  if (!this.index[connection.id]) {
    this.index[connection.id] = connection;
    connection.on('status changed', this.bound.onStatusChanged);
    connection.setStatus('alive');
  }
};

ConnectionPool.prototype.removeConnection = function (connection) {
  if (this.index[connection.id]) {
    delete this.index[connection.id];
    connection.setStatus('closed');
    connection.removeListener('status changed', this.bound.onStatusChanged);
  }
};

ConnectionPool.prototype.setNodes = function (nodeConfigs) {
  var connection;
  var i;
  var id;
  var node;
  var toRemove = _.clone(this.index);

  for (i = 0; i < nodeConfigs.length; i++) {
    node = nodeConfigs[i];
    if (node instanceof Host) {
      id = node.toString();
      if (this.index[id]) {
        delete toRemove[id];
      } else {
        connection = new this.config.connectionClass(node, this.config);
        connection.id = id;
        this.addConnection(connection);
      }
    }
  }

  _.each(toRemove, this.removeConnection, this);
};

ConnectionPool.prototype.close = function () {
  this.setNodes([]);
};
ConnectionPool.prototype.empty = ConnectionPool.prototype.close;
