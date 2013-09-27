var _ = require('../utils');

function RandomSelect(connections) {
  return _.shuffle(connections).unshift();
}

module.exports = RandomSelect;