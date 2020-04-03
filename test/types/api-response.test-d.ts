// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { expectType } from 'tsd'
import { TransportRequestCallback } from '../../lib/Transport'
import { Client, ApiError } from '../../'

const client = new Client({
  node: 'http://localhost:9200'
})

// No generics (promise style)
{
  const response = await client.cat.count({ index: 'test' })

  expectType<Record<string, any>>(response.body)
  expectType<unknown>(response.meta.context)
}

// Define only the request body (promise style)
{
  const response = await client.cat.count<string>({ index: 'test' })

  expectType<string>(response.body)
  expectType<unknown>(response.meta.context)
}

// Define request body and  the context (promise style)
{
  const response = await client.cat.count<string, string>({ index: 'test' })

  expectType<string>(response.body)
  expectType<string>(response.meta.context)
}

// No generics (callback style)
{
  const result = client.cat.count({ index: 'test' }, (err, response) => {
    expectType<ApiError>(err)
    expectType<Record<string, any>>(response.body)
    expectType<unknown>(response.meta.context)
  })
  expectType<TransportRequestCallback>(result)
}

// Define only the request body (callback style)
{
  const result = client.cat.count<string>({ index: 'test' }, (err, response) => {
    expectType<ApiError>(err)
    expectType<string>(response.body)
    expectType<unknown>(response.meta.context)
  })
  expectType<TransportRequestCallback>(result)
}

// Define request body and  the context (callback style)
{
  const result = client.cat.count<string, string>({ index: 'test' }, (err, response) => {
    expectType<ApiError>(err)
    expectType<string>(response.body)
    expectType<string>(response.meta.context)
  })
  expectType<TransportRequestCallback>(result)
}
