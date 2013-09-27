function RoundRobinSelect(connections) {
  connections.unshift(connections.pop());
  return connections[0];
}

module.exports = RoundRobinSelect;