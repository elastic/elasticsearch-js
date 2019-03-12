/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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
