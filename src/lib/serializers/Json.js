/* JSON serializer */

var _ = require('../Utils');

function Json() {}

Json.prototype.serialize = _.bind(JSON.stringify, JSON);

Json.prototype.unserialize = _.bind(JSON.parse, JSON);

module.exports = Json;