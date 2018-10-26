'use strict'

const { stringify } = require('querystring')
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

  ndserialize (array) {
    debug('ndserialize', array)
    if (Array.isArray(array) === false) {
      throw new SerializationError('The argument provided is not an array')
    }
    var ndjson = ''
    for (var i = 0, len = array.length; i < len; i++) {
      ndjson += this.serialize(array[i]) + '\n'
    }
    return ndjson
  }

  qserialize (object) {
    debug('qserialize', object)
    // arrays should be serialized as comma separated list
    const keys = Object.keys(object)
    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i]
      if (Array.isArray(object[key]) === true) {
        object[key] = object[key].join(',')
      }
    }
    return stringify(object)
  }
}

module.exports = Serializer
