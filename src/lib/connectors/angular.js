/**
 * Connection that registers a module with angular, using angular's $http service
 * to communicate with ES.
 *
 * @class connections.Angular
 */
module.exports = AngularConnector;

const _ = require('../utils');
const ConnectionAbstract = require('../connection');
const ConnectionFault = require('../errors').ConnectionFault;

function AngularConnector(host, config) {
  ConnectionAbstract.call(this, host, config);

  const self = this;
  config.$injector.invoke(['$http', '$q', function ($http, $q) {
    self.$q = $q;
    self.$http = $http;
  }]);

}
_.inherits(AngularConnector, ConnectionAbstract);

AngularConnector.prototype.request = function (params, cb) {
  const abort = this.$q.defer();

  this.$http({
    method: params.method,
    url: this.host.makeUrl(params),
    data: params.body,
    cache: false,
    headers: this.host.getHeaders(params.headers),
    transformRequest: [],
    transformResponse: [],
    // not actually for timing out, that's handled by the transport
    timeout: abort.promise
  }).then(function (response) {
    cb(null, response.data, response.status, response.headers());
  }, function (err) {
    if (err.status) {
      cb(null, err.data, err.status, err.headers());
    } else {
      cb(new ConnectionFault(err.message));
    }
  });

  return function () {
    abort.resolve();
  };
};
