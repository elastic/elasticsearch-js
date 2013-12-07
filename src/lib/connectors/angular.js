/**
 * Connection that registers a module with angular, using angular's $http service
 * to communicate with ES.
 *
 * @class connections.Angular
 */
module.exports = AngularConnector;

var _ = require('../utils');
var ConnectionAbstract = require('../connection');
var ConnectionFault = require('../errors').ConnectionFault;

function AngularConnector(host, config) {
  ConnectionAbstract.call(this, host, config);
}
_.inherits(AngularConnector, ConnectionAbstract);

AngularConnector.prototype.request = function (params, cb) {
  var abort = this.$q.defer();
  this.$http({
    method: params.method,
    url: this.host.makeUrl(params),
    data: params.body,
    cache: false,
    timeout: abort.promise
  }).then(function (response) {
    cb(null, response.data, response.status);
  }, function (err) {
    cb(new ConnectionFault(err.message));
  });

  return function () {
    abort.resolve();
  };
};

// must be overwritten before this connection can be used
AngularConnector.prototype.$http = null;
AngularConnector.prototype.$q = null;
