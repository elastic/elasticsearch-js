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
  this.defer = config.defer;
  this.$http = config.$http;
  if(this.host.auth) {
    this.$http.defaults.headers.common.Authorization = 'Basic ' + Buffer(this.host.auth, 'utf8').toString('base64');
  }
}
_.inherits(AngularConnector, ConnectionAbstract);

AngularConnector.prototype.request = function (params, cb) {
  var abort = this.defer();
  this.$http({
    method: params.method,
    url: this.host.makeUrl(params),
    data: params.body,
    cache: false,
    transformRequest: [],
    transformResponse: []
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
