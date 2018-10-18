'use strict'

class RoundRobinSelector {
  constructor () {
    this.current = -1
  }

  select (connections) {
    if (++this.current >= connections.length) {
      this.current = 0
    }
    return connections[this.current]
  }
}

class RandomSelector {
  select (connections) {
    const index = Math.floor(Math.random() * connections.length)
    return connections[index]
  }
}

module.exports = { RoundRobinSelector, RandomSelector }
