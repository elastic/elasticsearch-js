// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { Readable as ReadableStream } from 'stream';
import { expectType, expectAssignable, expectError } from 'tsd'
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
  ApiResponse,
  RequestBody,
  RequestNDBody
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

// verify that RequestBody and RequestNDBody works as expected
interface TestBody { hello: string }
expectAssignable<RequestBody>({ foo: 'bar' })
expectAssignable<RequestBody<TestBody>>({ hello: 'world' })
expectError<RequestBody<TestBody>>({ foo: 'bar' })
expectAssignable<RequestBody>('string')
expectAssignable<RequestBody<TestBody>>('string')
expectAssignable<RequestBody>(Buffer.from('hello world'))
expectAssignable<RequestBody>(new ReadableStream())
expectAssignable<RequestNDBody>([{ foo: 'bar' }])
expectAssignable<RequestNDBody<TestBody>[]>([{ hello: 'world' }])
expectError<RequestNDBody>({ foo: 'bar' })
expectError<RequestNDBody<TestBody>[]>([{ foo: 'bar' }])
expectAssignable<RequestNDBody>(['string'])
expectAssignable<RequestNDBody>(Buffer.from('hello world'))
expectAssignable<RequestNDBody>(new ReadableStream())

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

expectError(
  transport.request({
    method: 'POST',
    path: '/',
    body: 42
  })
)
