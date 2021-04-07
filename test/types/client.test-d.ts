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

import { expectType } from 'tsd'
import { Client, ApiError, ApiResponse, RequestEvent, ResurrectEvent } from '../../'
import { TransportRequestCallback, TransportRequestPromise } from '../../lib/Transport'

const client = new Client({
  node: 'http://localhost:9200'
})

client.on('request', (err, meta) => {
  expectType<ApiError>(err)
  expectType<RequestEvent>(meta)
})

client.on('response', (err, meta) => {
  expectType<ApiError>(err)
  expectType<RequestEvent>(meta)
})

client.on('sniff', (err, meta) => {
  expectType<ApiError>(err)
  expectType<RequestEvent>(meta)
})

client.on('resurrect', (err, meta) => {
  expectType<null>(err)
  expectType<ResurrectEvent>(meta)
})

// Test all overloads

// Callbacks style
{
  const result = client.info((err, result) => {
    expectType<ApiError>(err)
    expectType<ApiResponse>(result)
  })
  expectType<TransportRequestCallback>(result)
  expectType<void>(result.abort())
}

{
  const result = client.info({ pretty: true }, (err, result) => {
    expectType<ApiError>(err)
    expectType<ApiResponse>(result)
  })
  expectType<TransportRequestCallback>(result)
  expectType<void>(result.abort())
}

{
  const result = client.info({ pretty: true }, { ignore: [404] }, (err, result) => {
    expectType<ApiError>(err)
    expectType<ApiResponse>(result)
  })
  expectType<TransportRequestCallback>(result)
  expectType<void>(result.abort())
}

// Promise style
{
  const promise = client.info()
  expectType<TransportRequestPromise<ApiResponse>>(promise)
  promise
    .then(result => expectType<ApiResponse>(result))
    .catch((err: ApiError) => expectType<ApiError>(err))
  expectType<void>(promise.abort())
}

{
  const promise = client.info({ pretty: true })
  expectType<TransportRequestPromise<ApiResponse>>(promise)
  promise
    .then(result => expectType<ApiResponse>(result))
    .catch((err: ApiError) => expectType<ApiError>(err))
  expectType<void>(promise.abort())
}

{
  const promise = client.info({ pretty: true }, { ignore: [404] })
  expectType<TransportRequestPromise<ApiResponse>>(promise)
  promise
    .then(result => expectType<ApiResponse>(result))
    .catch((err: ApiError) => expectType<ApiError>(err))
  expectType<void>(promise.abort())
}

// Promise style with async await
{
  const promise = client.info()
  expectType<TransportRequestPromise<ApiResponse>>(promise)
  expectType<void>(promise.abort())
  try {
    expectType<ApiResponse>(await promise)
  } catch (err) {
    expectType<any>(err)
  }
}

{
  const promise = client.info({ pretty: true })
  expectType<TransportRequestPromise<ApiResponse>>(promise)
  expectType<void>(promise.abort())
  try {
    expectType<ApiResponse>(await promise)
  } catch (err) {
    expectType<any>(err)
  }
}

{
  const promise = client.info({ pretty: true }, { ignore: [404] })
  expectType<TransportRequestPromise<ApiResponse>>(promise)
  expectType<void>(promise.abort())
  try {
    expectType<ApiResponse>(await promise)
  } catch (err) {
    expectType<any>(err)
  }
}
