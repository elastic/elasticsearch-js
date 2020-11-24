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

import { expectType, expectError } from 'tsd'
import { Readable as ReadableStream } from 'stream';
import { TransportRequestCallback, Context } from '../../lib/Transport'
import { Client, ApiError, types } from '../../'

const client = new Client({
  node: 'http://localhost:9200'
})

interface Source {
  foo: string
}

// body that does not respect the RequestBody constraint
expectError(
  client.search({
    index: 'hello',
    body: 42
  }).then(console.log)
)

// No generics (promise style)
{
  const response = await client.search({
    index: 'test',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  })

  expectType<types.SearchResponse<unknown>>(response.body)
  expectType<Context>(response.meta.context)
}

// Define only the source (promise style)
{
  const response = await client.search<Source>({
    index: 'test',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  })

  expectType<types.SearchResponse<Source>>(response.body)
  expectType<Context>(response.meta.context)
}

// Define response body, request body and the context (promise style)
{
  const response = await client.search<Source, Context>({
    index: 'test',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  })

  expectType<types.SearchResponse<Source>>(response.body)
  expectType<Context>(response.meta.context)
}

// Send request body as string (promise style)
{
  const response = await client.search({
    index: 'test',
    body: 'hello world'
  })

  expectType<types.SearchResponse<unknown>>(response.body)
  expectType<Context>(response.meta.context)
}

// Send request body as buffer (promise style)
{
  const response = await client.search({
    index: 'test',
    body: Buffer.from('hello world')
  })

  expectType<types.SearchResponse<unknown>>(response.body)
  expectType<Context>(response.meta.context)
}

// Send request body as readable stream (promise style)
{
  const response = await client.search({
    index: 'test',
    body: new ReadableStream()
  })

  expectType<types.SearchResponse<unknown>>(response.body)
  expectType<Context>(response.meta.context)
}

// No generics (callback style)
{
  const result = client.search({
    index: 'test',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  }, (err, response) => {
    expectType<ApiError>(err)
    expectType<types.SearchResponse<unknown>>(response.body)
    expectType<Context>(response.meta.context)
  })
  expectType<TransportRequestCallback>(result)
}

// Define only the response body (callback style)
{
  const result = client.search<Source>({
    index: 'test',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  }, (err, response) => {
    expectType<ApiError>(err)
    expectType<types.SearchResponse<Source>>(response.body)
    expectType<Context>(response.meta.context)
  })
  expectType<TransportRequestCallback>(result)
}

// Define response body, request body and the context (callback style)
{
  const result = client.search<Source, Context>({
    index: 'test',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  }, (err, response) => {
    expectType<ApiError>(err)
    expectType<types.SearchResponse<Source>>(response.body)
    expectType<Context>(response.meta.context)
  })
  expectType<TransportRequestCallback>(result)
}

// Send request body as string (callback style)
{
  const result = client.search({
    index: 'test',
    body: 'hello world'
  }, (err, response) => {
    expectType<ApiError>(err)
    expectType<types.SearchResponse<unknown>>(response.body)
    expectType<Context>(response.meta.context)
  })
  expectType<TransportRequestCallback>(result)
}

// Send request body as buffer (callback style)
{
  const result = client.search({
    index: 'test',
    body: Buffer.from('hello world')
  }, (err, response) => {
    expectType<ApiError>(err)
    expectType<types.SearchResponse<unknown>>(response.body)
    expectType<Context>(response.meta.context)
  })
  expectType<TransportRequestCallback>(result)
}

// Send request body as readable stream (callback style)
{
  const result = client.search({
    index: 'test',
    body: new ReadableStream()
  }, (err, response) => {
    expectType<ApiError>(err)
    expectType<types.SearchResponse<unknown>>(response.body)
    expectType<Context>(response.meta.context)
  })
  expectType<TransportRequestCallback>(result)
}
