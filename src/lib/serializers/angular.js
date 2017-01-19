/* global angular */
var _ = require('../utils');
var JsonSerializer = require('../serializers/json');

function AngularSerializer() {}
_.inherits(AngularSerializer, JsonSerializer);

// mimic the JsonSerializer's encode method, but use angular's toJson instead
AngularSerializer.prototype.encode = function (val) {
  if (typeof val === 'string') {
    return val;
  }

  if (val && typeof val === 'object') {
    return angular.toJson(val);
  }
};

module.exports = AngularSerializer;
