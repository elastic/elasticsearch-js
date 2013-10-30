/**
 * Wrapper for the elasticsearch.js client, which will register the client constructor
 * as a factory within angular that can be easily injected with Angular's awesome DI.
 *
 * It will also instruct the client to use Angular's $http service for it's ajax requests
 */
var AngularConnector = require('./lib/connectors/angular');
var Transport = require('./lib/transport');
var Client = require('./lib/client');

/* global angular */
angular.module('elasticsearch.client', [])
  .factory('esFactory', ['$http', '$q', function ($http, $q) {

  AngularConnector.prototype.$http = $http;

  // store the original request function
  Transport.prototype._request = Transport.prototype.request;

  // overwrite the request function to return a promise
  // and support the callback
  Transport.prototype.request = function (params, cb) {
    var deferred = $q.defer();
    this._request(params, function (err, body, status) {
      if (typeof cb === 'function') {
        cb(err, body, status);
      }

      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve({ body: body, status: status });
      }
    });

    return deferred.promise;
  };

  return function (config) {
    config = config || {};
    config.connectionClass = AngularConnector;
    return new Client(config);
  };
}]);
