// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { expectType, expectAssignable } from 'tsd'
import {
  Transport,
  Connection,
  ConnectionPool,
  Serializer
} from '../..'
import {
  TransportRequestParams,
  TransportRequestOptions,
  TransportRequestCallback,
  RequestEvent,
  ApiError,
  ApiResponse
} from '../../lib/Transport'

const params = {
  method: 'POST',
  path: '/search',
  body: { foo: 'bar' },
  querystring: { baz: 'faz' }
}

const options = {
  ignore: [404],
  requestTimeout: 5000,
  maxRetries: 3,
  asStream: false,
  headers: {},
  querystring: {},
  id: 'id',
  context: {},
  warnings: ['warn'],
  opaqueId: 'id'
}

const response = {
  body: {},
  statusCode: 200,
  headers: {},
  warnings: null,
  meta: {
    context: {},
    name: 'name',
    request: {
      params,
      options,
      id: 'id'
    },
    connection: new Connection(),
    attempts: 0,
    aborted: false
  }
}

expectAssignable<TransportRequestParams>(params)
expectAssignable<TransportRequestParams>({ method: 'GET', path: '/' })
expectAssignable<TransportRequestOptions>(options)
expectAssignable<RequestEvent>(response)
expectAssignable<ApiResponse>(response)

const transport = new Transport({
  emit: (event, ...args) => true,
  serializer: new Serializer(),
  connectionPool: new ConnectionPool(),
  maxRetries: 5,
  requestTimeout: 1000,
  suggestCompression: true,
  compression: 'gzip',
  sniffInterval: 1000,
  sniffOnConnectionFault: true,
  sniffEndpoint: '/sniff',
  sniffOnStart: false
})

expectType<Transport>(transport)

expectType<TransportRequestCallback>(transport.request(params, options, (err, result) => {}))
transport.request(params, options, (err, result) => {
  expectType<ApiError>(err)
  expectType<ApiResponse>(result)
})

const promise = transport.request(params, options)
expectType<Promise<ApiResponse>>(promise)
promise.then(result => expectType<ApiResponse>(result))
expectType<ApiResponse>(await promise)
