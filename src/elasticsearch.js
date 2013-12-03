var es = {
  Client: require('./lib/client'),
  ConnectionPool: require('./lib/connection_pool'),
  Transport: require('./lib/transport'),

  errors: require('./lib/errors')
};

module.exports = es;
