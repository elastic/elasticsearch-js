// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { expectType, expectNotType, expectError } from 'tsd'
import { Client, RequestEvent, ResurrectEvent, ApiError, ApiResponse } from '../../'
import { KibanaClient } from '../../api/kibana'
import { TransportRequestPromise } from '../../lib/Transport'

const client: KibanaClient = new Client({
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

// No generics
{
  const response = await client.cat.count({ index: 'test' })

  expectType<Record<string, any>>(response.body)
  expectType<unknown>(response.meta.context)
}

// Define only the response body
{
  const response = await client.cat.count<string>({ index: 'test' })

  expectType<string>(response.body)
  expectType<unknown>(response.meta.context)
}

// Define response body and the context
{
  const response = await client.cat.count<string, string>({ index: 'test' })

  expectType<string>(response.body)
  expectType<string>(response.meta.context)
}

// Check API returned type and optional parameters
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

// body that does not respect the RequestBody constraint
expectError(
  client.search({
    index: 'hello',
    body: 42
  }).then(console.log)
)

// @ts-expect-error
client.async_search.get()

// callback api is not supported
expectError(client.cat.count({ index: 'test' }, {}, (err: any, result: any) => {}))

// close api, only promises should be supported
// callback api is not supported
expectType<Promise<void>>(client.close())
expectError(client.close(() => {}))

// the child api should return a KibanaClient instance
const child = client.child()
expectType<KibanaClient>(child)
expectNotType<Client>(child)
