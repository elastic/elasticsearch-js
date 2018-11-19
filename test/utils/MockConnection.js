'use strict'

const { Connection } = require('../../index')
const { TimeoutError } = require('../../lib/errors')
const intoStream = require('into-stream')

class MockConnection extends Connection {
  request (params, callback) {
    var aborted = false
    const stream = intoStream(JSON.stringify({ hello: 'world' }))
    stream.statusCode = setStatusCode(params.path)
    stream.headers = {
      'content-type': 'application/json;utf=8',
      'date': new Date().toISOString(),
      'connection': 'keep-alive',
      'content-length': '17'
    }
    process.nextTick(() => {
      if (!aborted) {
        callback(null, stream)
      }
    })
    return {
      abort: () => { aborted = true }
    }
  }
}

class MockConnectionTimeout extends Connection {
  request (params, callback) {
    var aborted = false
    process.nextTick(() => {
      if (!aborted) {
        callback(new TimeoutError('Request timed out', params), null)
      }
    })
    return {
      abort: () => { aborted = true }
    }
  }
}

class MockConnectionError extends Connection {
  request (params, callback) {
    var aborted = false
    process.nextTick(() => {
      if (!aborted) {
        callback(new Error('Kaboom'), null)
      }
    })
    return {
      abort: () => { aborted = true }
    }
  }
}

function setStatusCode (path) {
  const statusCode = Number(path.slice(1))
  if (Number.isInteger(statusCode)) {
    return statusCode
  }
  return 200
}

module.exports = { MockConnection, MockConnectionTimeout, MockConnectionError }
