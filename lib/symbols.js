'use strict'

const kTransport = Symbol('elasticsearch-transport')
const kConnection = Symbol('elasticsearch-connection')
const kConnectionPool = Symbol('elasticsearch-connection-pool')
const kSerializer = Symbol('elasticsearch-serializer')
const kSelector = Symbol('elasticsearch-selector')

module.exports = {
  kTransport,
  kConnection,
  kConnectionPool,
  kSerializer,
  kSelector
}
