// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { expectType } from 'tsd'
import { ResponseBody } from '../../lib/Transport'
import { Client } from '../../'

const client = new Client({
  node: 'http://localhost:9200'
})

// No generics
{
  const response = await client.cat.count({ index: 'test' })

  expectType<ResponseBody>(response.body)
  expectType<unknown>(response.meta.context)
}

// Define only the request body
{
  const response = await client.cat.count<string>({ index: 'test' })

  expectType<string>(response.body)
  expectType<unknown>(response.meta.context)
}

// Define request body and  the context
{
  const response = await client.cat.count<string, string>({ index: 'test' })

  expectType<string>(response.body)
  expectType<string>(response.meta.context)
}
