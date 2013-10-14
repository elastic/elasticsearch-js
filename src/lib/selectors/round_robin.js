/**
 * Selects a connection the simplest way possible, Round Robin
 *
 * @class selector.roundRobin
 * @constructor
 * @type {Function}
 */
module.exports = RoundRobinSelect;

function RoundRobinSelect(connections) {
  connections.unshift(connections.pop());
  return connections[0];
}
