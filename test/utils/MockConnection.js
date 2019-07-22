// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

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
      date: new Date().toISOString(),
      connection: 'keep-alive',
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

class MockConnectionSniff extends Connection {
  request (params, callback) {
    var aborted = false
    const sniffResult = {
      nodes: {
        'node-1': {
          http: {
            publish_address: 'localhost:9200'
          },
          roles: ['master', 'data', 'ingest']
        },
        'node-2': {
          http: {
            publish_address: 'localhost:9201'
          },
          roles: ['master', 'data', 'ingest']
        }
      }
    }
    const stream = intoStream(JSON.stringify(sniffResult))
    stream.statusCode = setStatusCode(params.path)
    stream.headers = {
      'content-type': 'application/json;utf=8',
      date: new Date().toISOString(),
      connection: 'keep-alive',
      'content-length': '205'
    }
    process.nextTick(() => {
      if (!aborted) {
        if (params.headers.timeout) {
          callback(new TimeoutError('Request timed out', params), null)
        } else {
          callback(null, stream)
        }
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

module.exports = {
  MockConnection,
  MockConnectionTimeout,
  MockConnectionError,
  MockConnectionSniff
}
