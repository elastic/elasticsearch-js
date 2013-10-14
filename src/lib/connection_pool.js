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

function ConnectionPool(client) {
  this.client = client;
  this.index = {};
  this.connections = {
    alive: [],
    dead: []
  };

  var config = client.config;

  // validate connectionConstructor
  if (typeof config.connectionConstructor !== 'function') {
    if (_.has(connectors, config.connectionConstructor)) {
      config.connectionConstructor = connectors[config.connectionConstructor];
    } else {
      throw new TypeError('Invalid connectionConstructor ' + config.connectionConstructor +
        ', specify a function or one of ' + _.keys(connectors).join(', '));
    }
  }

  this.connectionConstructor = config.connectionConstructor;
  this.setNodes(config.hosts);
}

ConnectionPool.prototype.setNodes = function (nodes) {
  var client = this.client;

  if (!_.isArrayOfObjects(nodes)) {
    throw new TypeError('Invalid hosts: specify an Array of Objects with host and port keys');
  }

  var i, id, prevIndex = _.clone(this.index), connection;
  for (i = 0; i < nodes.length; i++) {
    id = nodes[i].host + ':' + nodes[i].port;
    if (prevIndex[id]) {
      delete prevIndex[id];
    } else {
      client.log.info('Creating connection to ' + id);
      connection = new this.connectionConstructor(this.client, nodes[i]);
      if (!(connection instanceof EventEmitter)) {
        throw new Error('ConnectionConstructor does not implement the event interface');
      } else if (!EventEmitter.listenerCount(connection, 'closed')) {
        throw new Error(
          'Connection Constructor ' + this.connectionConstructor.name +
          ' does not listen for the closed event. No bueno.'
        );
      }
      this.index[id] = connection;
      this.setStatus(connection, 'alive');
    }
  }

  var toRemove = _.keys(prevIndex);
  for (i = 0; i < toRemove.length; i++) {
    client.log.info('Closing connection to ' + toRemove[i]);
    this.index[toRemove[i]].isClosed();
    delete this.index[toRemove[i]];
  }

  client.log.info('Nodes successfully changed');
};

ConnectionPool.prototype.select = function (cb) {
  var config = this.client.config;

  if (typeof config.selector !== 'function') {
    if (_.has(selectors, config.selector)) {
      config.selector = selectors[config.selector];
    } else {
      throw new TypeError('Invalid Selector ' + config.selector + '. specify a function or one of ' + _.keys(selectors).join(', '));
    }
  }

  if (this.connections.alive.length) {
    if (config.selector.length > 1) {
      config.selector(this.connections.alive, cb);
    } else {
      cb(null, config.selector(this.connections.alive));
    }
  } else {
    cb(new errors.ConnectionError('No living connections'));
  }
};


ConnectionPool.prototype.setStatus = function (connection, status) {
  var origStatus = connection.status, from, to, index;

  if (origStatus === status) {
    return true;
  } else {
    this.client.log.info('connection to', _.formatUrl(connection), 'is', status);
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

  connection.status = status;
  connection.emit(status, origStatus);
};
