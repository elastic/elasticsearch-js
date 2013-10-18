/**
 * Manager of connections to a node(s), capable of ensuring that connections are clear and living
 * before providing them to the application
 *
 * @class ConnectionPool
 * @param {Client} client - The client this pool belongs to
 */

module.exports = ConnectionPool;

var _ = require('./utils'),
  selectors = _.reKey(_.requireDir(module, './selectors'), _.camelCase),
  connectors = _.reKey(_.requireDir(module, './connections'), _.studlyCase),
  EventEmitter = require('events').EventEmitter,
  q = require('q'),
  errors = require('./errors');

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
      cb(null, this.config.selector(this.connections.alive));
    }
  } else {
    cb(new errors.ConnectionFault('No active connections'));
  }
};

ConnectionPool.prototype.empty = function () {
  _.each(this.connection.dead, function (connection) {
    connection.setStatus('closed');
  });
  _.each(this.connection.alive, function (connection) {
    connection.setStatus('closed');
  });
};

ConnectionPool.prototype.setStatus = _.handler(function (status, oldStatus, connection) {
  var origStatus = connection.status, from, to, index;

  if (origStatus === status) {
    return true;
  } else {
    this.config.log.info('connection to', _.formatUrl(connection), 'is', status);
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
  case 'closed':
    from = this.connections[origStatus];
    connection.removeListener('status changed', this.bound.setStatus);
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

ConnectionPool.prototype.add = function (connection) {
  if (!~this.connections.alive.indexOf(connection) && !~this.connections.dead.indexOf(connection)) {
    connection.status = 'alive';
    connection.on('status changed', this.bound.setStatus);
    this.connections.alive.push(connection);
  }
};
