module.exports = RandomSelect;

function RandomSelect(connections) {
  return connections[Math.floor(Math.random() * connections.length)];
}
