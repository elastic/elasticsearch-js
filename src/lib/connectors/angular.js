/**
 * Connection that registers a module with angular, using angular's $http service
 * to communicate with ES.
 *
 * @class connections.Angular
 */
module.exports = AngularConnection;

var _ = require('../utils');
var ConnectionAbstract = require('../connection');
var ConnectionFault = require('../errors').ConnectionFault;

/* global angular */

function AngularConnection(host, config) {
  ConnectionAbstract.call(this, host, config);
}
_.inherits(AngularConnection, ConnectionAbstract);

AngularConnection.prototype.request = function (params, cb) {
  var timeoutId;

  this.$http({
    method: params.method,
    url: this.host.makeUrl(params),
    data: params.body,
    cache: false,
    timeout: params.timeout !== Infinity ? params.timeout : 0
  }).then(function (response) {
    cb(null, response.data, response.status);
  }, function (err) {
    cb(new ConnectionFault(err.message));
  });

};

// must be overwritten before this connection can be used
AngularConnection.prototype.$http = null;
