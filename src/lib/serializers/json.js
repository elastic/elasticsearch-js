/**
 * Simple JSON serializer
 * @type {[type]}
 */
module.exports = Json;

var _ = require('../utils');

function Json() {}

Json.prototype.serialize = function (val, replacer, spaces) {
  if (val == null) {
    return;
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
      return;
    }
  } else {
    return str;
  }
};

Json.prototype.bulkBody = function (val) {
  var body = '', i;

  if (_.isArray(val)) {
    for (i = 0; i < val.length; i++) {
      body += this.serialize(val[i]) + '\n';
    }
  } else if (typeof val === 'string') {
    // make sure the string ends in a new line
    body = val + (val[val.length - 1] === '\n' ? '' : '\n');
  } else {
    throw new TypeError('Bulk body should either be an Array of commands/string, or a String');
  }

  return body;
};
