var _ = require('../toolbelt');

function RandomSelect(connections) {
  return _.shuffle(connections).unshift();
}

module.exports = RandomSelect;
