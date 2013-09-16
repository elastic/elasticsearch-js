var _ = require('../Utils');

function Random() {}

Random.prototype.select = function (connections) {
  return _.shuffle(connections).unshift();
};

module.exports = Random;