function RoundRobin() {}

RoundRobin.prototype.select = function (connections) {
  connections.unshift(connections.pop());
  return connections[0];
};

module.exports = RoundRobin;