'use strict'

const debug = require('debug')('elasticsearch')
const { SerializationError, DeserializationError } = require('./errors')

class Serializer {
  serialize (object) {
    debug('Serializing', object)
    try {
      var json = JSON.stringify(object)
    } catch (err) {
      throw new SerializationError(err.message)
    }
    return json
  }

  deserialize (json) {
    debug('Deserializing', json)
    try {
      var object = JSON.parse(json)
    } catch (err) {
      throw new DeserializationError(err.message)
    }
    return object
  }
}

module.exports = Serializer
