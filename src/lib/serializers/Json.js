/* JSON serializer */

var _ = require('../toolbelt');

function Json(client) {
  this.client = client;
}

Json.prototype.serialize = function (val, replacer, spaces) {
  if (val == null) {
    return null;
  }
  else if (typeof val === 'string') {
    this.client.log.info('body is already a string, not encoding');
    return val;
  } else {
    return JSON.stringify(val, replacer, spaces);
  }
};

Json.prototype.unserialize = _.bind(JSON.parse, JSON);

module.exports = Json;
