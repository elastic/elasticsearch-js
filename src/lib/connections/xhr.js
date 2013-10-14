/**
 * Generic Transport for the browser, using the XmlHttpRequest object
 *
 * @class  connections.Xhr
 */

module.exports = XhrConnection;

var _ = require('../utils'),
  ConnectionAbstract = require('../connection');

function XhrConnection() {

}
_.inherits(XhrConnection, ConnectionAbstract);
