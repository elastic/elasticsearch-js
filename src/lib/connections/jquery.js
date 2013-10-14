module.exports = JqueryConnection;

var _ = require('../utils'),
  ConnectionAbstract = require('../connection');

function JqueryConnection() {

}
_.inherits(JqueryConnection, ConnectionAbstract);
