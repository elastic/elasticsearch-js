/**
 * Simple JSON serializer
 * @type {[type]}
 */
module.exports = Json;

var _ = require('../utils');

function Json(client) {
  this.client = client;
}

Json.prototype.serialize = function (val, replacer, spaces) {
  if (val == null) {
    return null;
  }
  else if (typeof val === 'string') {
    return val;
  } else {
    return JSON.stringify(val, replacer, spaces);
  }
};

Json.prototype.unserialize = function (str) {
  if (typeof str === 'string') {
    try {
      return JSON.parse(str);
    } catch (e) {
      this.client.log.error(new Error('unable to parse', str));
      return null;
    }
  } else {
    return str;
  }
};
