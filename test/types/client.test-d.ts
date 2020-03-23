// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { expectType } from 'tsd'
import { Client, ApiError, ApiResponse, RequestEvent, ResurrectEvent } from '../../'
import { TransportRequestCallback } from '../..//lib/Transport';

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
}

{
  const result = client.info({ pretty: true }, (err, result) => {
    expectType<ApiError>(err)
    expectType<ApiResponse>(result)
  })
  expectType<TransportRequestCallback>(result)
}

{
  const result = client.info({ pretty: true }, { ignore: [404] }, (err, result) => {
    expectType<ApiError>(err)
    expectType<ApiResponse>(result)
  })
  expectType<TransportRequestCallback>(result)
}

// Promise style
{
  const promise = client.info()
  expectType<Promise<ApiResponse>>(promise)
  promise
    .then(result => expectType<ApiResponse>(result))
    .catch((err: ApiError) => expectType<ApiError>(err))
}

{
  const promise = client.info({ pretty: true })
  expectType<Promise<ApiResponse>>(promise)
  promise
    .then(result => expectType<ApiResponse>(result))
    .catch((err: ApiError) => expectType<ApiError>(err))
}

{
  const promise = client.info({ pretty: true }, { ignore: [404] })
  expectType<Promise<ApiResponse>>(promise)
  promise
    .then(result => expectType<ApiResponse>(result))
    .catch((err: ApiError) => expectType<ApiError>(err))
}

// Promise style with async await
{
  const promise = client.info()
  expectType<Promise<ApiResponse>>(promise)
  try {
    expectType<ApiResponse>(await promise)
  } catch (err) {
    expectType<any>(err)
  }
}

{
  const promise = client.info({ pretty: true })
  expectType<Promise<ApiResponse>>(promise)
  try {
    expectType<ApiResponse>(await promise)
  } catch (err) {
    expectType<any>(err)
  }
}

{
  const promise = client.info({ pretty: true }, { ignore: [404] })
  expectType<Promise<ApiResponse>>(promise)
  try {
    expectType<ApiResponse>(await promise)
  } catch (err) {
    expectType<any>(err)
  }
}