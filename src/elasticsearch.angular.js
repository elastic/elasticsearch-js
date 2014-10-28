/**
 * Wrapper for the elasticsearch.js client, which will register the client constructor
 * as a factory within angular that can be easily injected with Angular's awesome DI.
 *
 * It will also instruct the client to use Angular's $http service for it's ajax requests
 */
var AngularConnector = require('./lib/connectors/angular');
var Client = require('./lib/client');
var _ = require('./lib/utils');
var JsonSerializer = require('./lib/serializers/json');

process.angular_build = true;

/* global angular */
angular.module('elasticsearch', [])
  .factory('esFactory', ['$injector', '$q', function ($injector, $q) {

    var factory = function (config) {
      config = config || {};
      config.connectionClass = AngularConnector;
      config.$injector = $injector;
      config.defer = function () {
        return $q.defer();
      };
      config.serializer = AngularSerializer;
      return new Client(config);
    };

    _.inherits(AngularSerializer, JsonSerializer);
    function AngularSerializer() {}
    // mimic the JsonSerializer's encode method, but use angular's toJson instead
    AngularSerializer.prototype.encode = function (val) {
      switch (typeof val) {
      case 'string':
        return val;
      case 'object':
        if (val) return angular.toJson(val);
        /* falls through */
      default:
        return;
      }
    };

    factory.errors = require('./lib/errors');
    factory.ConnectionPool = require('./lib/connection_pool');
    factory.Transport = require('./lib/transport');

    return factory;
  }]);
