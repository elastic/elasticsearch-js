'use strict'

class TimeoutError extends Error {
  constructor (message, request) {
    super()
    Error.captureStackTrace(this, TimeoutError)
    this.name = 'TimeoutError'
    this.message = message || 'Timeout Error'
    this.request = request
  }
}

class ConnectionError extends Error {
  constructor (message, request) {
    super()
    Error.captureStackTrace(this, ConnectionError)
    this.name = 'ConnectionError'
    this.message = message || 'Connection Error'
    this.request = request
  }
}

class NoLivingConnectionsError extends Error {
  constructor (message) {
    super()
    Error.captureStackTrace(this, NoLivingConnectionsError)
    this.name = 'NoLivingConnectionsError'
    this.message = message || 'No Living Connections Error'
  }
}

class SerializationError extends Error {
  constructor (message) {
    super()
    Error.captureStackTrace(this, SerializationError)
    this.name = 'SerializationError'
    this.message = message || 'Serialization Error'
  }
}

class DeserializationError extends Error {
  constructor (message) {
    super()
    Error.captureStackTrace(this, DeserializationError)
    this.name = 'DeserializationError'
    this.message = message || 'Deserialization Error'
  }
}

class ConfigurationError extends Error {
  constructor (message) {
    super()
    Error.captureStackTrace(this, ConfigurationError)
    this.name = 'ConfigurationError'
    this.message = message || 'Configuration Error'
  }
}

class ResponseError extends Error {
  constructor ({ body, statusCode, headers }) {
    super()
    Error.captureStackTrace(this, ResponseError)
    this.name = 'ResponseError'
    this.message = (body && body.error && body.error.type) || 'Response Error'
    this.body = body
    this.statusCode = body && typeof body.status === 'number'
      ? body.status
      : statusCode
    this.headers = headers
  }
}

module.exports = {
  TimeoutError,
  ConnectionError,
  NoLivingConnectionsError,
  SerializationError,
  DeserializationError,
  ConfigurationError,
  ResponseError
}
