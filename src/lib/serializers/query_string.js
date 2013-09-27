/* JSON serializer */

var _ = require('lodash');

function QueryString() {}

QueryString.prototype.serialize = function (obj) {
  return JSON.stringify(obj);
};

// TODO: real query string parsing... there is a well tested module for this :P
QueryString.prototype.unserialize = function (string) {
  return _.object(_.map(_.map(string.split('&'), function splitOnEqlAndDecode(string) {
    return _.map(string.split('='), decodeURIComponent);
  })));
};
module.exports = QueryString;