// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { stringify } = require('querystring')
const debug = require('debug')('elasticsearch')
const sjson = require('secure-json-parse')
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
      var object = sjson.parse(json)
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
      if (typeof array[i] === 'string') {
        ndjson += array[i] + '\n'
      } else {
        ndjson += this.serialize(array[i]) + '\n'
      }
    }
    return ndjson
  }

  qserialize (object) {
    debug('qserialize', object)
    if (object == null) return ''
    if (typeof object === 'string') return object
    // arrays should be serialized as comma separated list
    const keys = Object.keys(object)
    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i]
      // elasticsearch will complain for keys without a value
      if (object[key] === undefined) {
        delete object[key]
      } else if (Array.isArray(object[key]) === true) {
        object[key] = object[key].join(',')
      }
    }
    return stringify(object)
  }
}

module.exports = Serializer
