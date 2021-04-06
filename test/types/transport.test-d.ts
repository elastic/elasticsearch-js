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
  TransportRequestPromise,
  RequestEvent,
  ApiError,
  RequestBody,
  RequestNDBody,
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

// verify that RequestBody, RequestNDBody and ResponseBody works as expected
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

// querystring as string
transport.request({
  method: 'GET',
  path: '/search',
  querystring: 'baz=faz'
}, options, (err, result) => {
  expectType<ApiError>(err)
  expectType<ApiResponse>(result)
})

// body as object
transport.request(params, options, (err, result) => {
  expectType<ApiError>(err)
  expectType<ApiResponse>(result)
})

// body as string
transport.request({
  method: 'POST',
  path: '/search',
  body: 'hello world',
  querystring: { baz: 'faz' }
}, options, (err, result) => {
  expectType<ApiError>(err)
  expectType<ApiResponse>(result)
})

// body as Buffer
transport.request({
  method: 'POST',
  path: '/search',
  body: Buffer.from('hello world'),
  querystring: { baz: 'faz' }
}, options, (err, result) => {
  expectType<ApiError>(err)
  expectType<ApiResponse>(result)
})

// body as ReadableStream
transport.request({
  method: 'POST',
  path: '/search',
  body: new ReadableStream(),
  querystring: { baz: 'faz' }
}, options, (err, result) => {
  expectType<ApiError>(err)
  expectType<ApiResponse>(result)
})

const promise = transport.request(params, options)
expectType<TransportRequestPromise<ApiResponse>>(promise)
promise.then(result => expectType<ApiResponse>(result))
expectType<ApiResponse>(await promise)

// body that does not respect the RequestBody constraint
expectError(
  transport.request({
    method: 'POST',
    path: '/',
    body: 42
  })
)
