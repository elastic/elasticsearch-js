'use strict'

class BadConfigurationError extends Error {
  constructor (message) {
    super()
    Error.captureStackTrace(this, BadConfigurationError)
    this.name = 'BadConfigurationError'
    this.message = message || 'Bad Configuration Error'
  }
}

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

class ResponseError extends Error {
  constructor (payload, statusCode, headers) {
    super()
    Error.captureStackTrace(this, ResponseError)
    this.name = 'ResponseError'
    this.message = (payload && payload.error && payload.error.type) || 'Response Error'
    this.response = payload
    this.statusCode = (payload && payload.status) || statusCode
    this.headers = headers
  }
}

module.exports = {
  BadConfigurationError,
  TimeoutError,
  ConnectionError,
  NoLivingConnectionsError,
  SerializationError,
  DeserializationError,
  ResponseError
}
