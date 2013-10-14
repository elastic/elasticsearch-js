/**
 * Connection that registers a module with angular, using angular's $http service
 * to communicate with ES.
 *
 * @class connections.Angular
 */
module.exports = AngularConnection;

var _ = require('../utils'),
  ConnectionAbstract = require('../connection');

function AngularConnection() {

}
_.inherits(AngularConnection, ConnectionAbstract);
