/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'assert'
import * as http from 'http'
import {
  BaseConnection,
  ConnectionRequestParams,
  ConnectionRequestOptions,
  ConnectionRequestResponse,
  errors,
  ConnectionRequestOptionsAsStream,
  ConnectionRequestResponseAsStream
} from '@elastic/transport'
const {
  ConnectionError,
  TimeoutError
} = errors

export class MockConnection extends BaseConnection {
  async request (params: ConnectionRequestParams, options: ConnectionRequestOptions): Promise<ConnectionRequestResponse>
  async request (params: ConnectionRequestParams, options: ConnectionRequestOptionsAsStream): Promise<ConnectionRequestResponseAsStream>
  async request (params: ConnectionRequestParams, options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = JSON.stringify({ hello: 'world' })
      const statusCode = setStatusCode(params.path)
      const headers = {
        'content-type': 'application/json;utf=8',
        date: new Date().toISOString(),
        connection: 'keep-alive',
        'content-length': '17',
        'x-elastic-product': 'Elasticsearch'
      }
      process.nextTick(resolve, { body, statusCode, headers })
    })
  }
}

export class MockConnectionTimeout extends BaseConnection {
  async request (params: ConnectionRequestParams, options: ConnectionRequestOptions): Promise<ConnectionRequestResponse>
  async request (params: ConnectionRequestParams, options: ConnectionRequestOptionsAsStream): Promise<ConnectionRequestResponseAsStream>
  async request (params: ConnectionRequestParams, options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      process.nextTick(reject, new TimeoutError('Request timed out'))
    })
  }
}

export class MockConnectionError extends BaseConnection {
  async request (params: ConnectionRequestParams, options: ConnectionRequestOptions): Promise<ConnectionRequestResponse>
  async request (params: ConnectionRequestParams, options: ConnectionRequestOptionsAsStream): Promise<ConnectionRequestResponseAsStream>
  async request (params: ConnectionRequestParams, options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      process.nextTick(reject, new ConnectionError('kaboom'))
    })
  }
}

export class MockConnectionSniff extends BaseConnection {
  async request (params: ConnectionRequestParams, options: ConnectionRequestOptions): Promise<ConnectionRequestResponse>
  async request (params: ConnectionRequestParams, options: ConnectionRequestOptionsAsStream): Promise<ConnectionRequestResponseAsStream>
  async request (params: ConnectionRequestParams, options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const sniffResult = {
        nodes: {
          'node-1': {
            http: {
              publish_address: 'localhost:9200'
            }
          },
          'node-2': {
            http: {
              publish_address: 'localhost:9201'
            }
          }
        }
      }
      const body = JSON.stringify(sniffResult)
      const statusCode = setStatusCode(params.path)
      const headers = {
        'content-type': 'application/json;utf=8',
        date: new Date().toISOString(),
        connection: 'keep-alive',
        'content-length': '191',
        'x-elastic-product': 'Elasticsearch'
      }
      if (params.headers?.timeout != null) {
        process.nextTick(reject, new TimeoutError('Request timed out'))
      } else {
        process.nextTick(resolve, { body, statusCode, headers })
      }
    })
  }
}

interface onRequestMock {
  onRequest(opts: ConnectionRequestParams): { body: any, statusCode?: number, headers?: http.IncomingHttpHeaders }
}
export function buildMockConnection (opts: onRequestMock) {
  assert(opts.onRequest, 'Missing required onRequest option')

  class MockConnection extends BaseConnection {
    async request (params: ConnectionRequestParams, options: ConnectionRequestOptions): Promise<ConnectionRequestResponse>
    async request (params: ConnectionRequestParams, options: ConnectionRequestOptionsAsStream): Promise<ConnectionRequestResponseAsStream>
    async request (params: ConnectionRequestParams, options: any): Promise<any> {
      return new Promise((resolve, reject) => {
        params.headers = { ...this.headers, ...params.headers }
        let { body, statusCode, headers } = opts.onRequest(params)
        if (typeof body !== 'string' && !(body instanceof Buffer)) {
          body = JSON.stringify(body)
        }
        statusCode = statusCode || 200
        headers = {
          'content-type': 'application/json;utf=8',
          date: new Date().toISOString(),
          connection: 'keep-alive',
          'content-length': Buffer.byteLength(body) + '',
          'x-elastic-product': 'Elasticsearch',
          ...headers
        }
        process.nextTick(resolve, { body, statusCode, headers })
      })
    }
  }

  return MockConnection
}

function setStatusCode (path: string): number {
  const statusCode = Number(path.slice(1))
  if (Number.isInteger(statusCode)) {
    return statusCode
  }
  return 200
}
