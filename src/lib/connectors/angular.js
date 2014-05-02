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
  var connector = this;

  config.$injector.invoke(['$http', '$q', function ($http, $q) {
    connector.$q = $q;
    connector.$http = $http;

    if (connector.host.auth) {
      connector.$http.defaults.headers.common.Authorization = 'Basic ' + (new Buffer(connector.host.auth, 'utf8')).toString('base64');
    }
  }]);


}
_.inherits(AngularConnector, ConnectionAbstract);

AngularConnector.prototype.request = function (params, cb) {
  var abort = this.$q.defer();

  this.$http({
    method: params.method,
    url: this.host.makeUrl(params),
    data: params.body,
    cache: false,
    headers: this.host.getHeaders(params.headers),
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
