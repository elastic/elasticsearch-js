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
import { TransportRequestCallback, Context } from '../../lib/Transport'
import { Client, ApiError, types } from '../../'

const client = new Client({
  node: 'http://localhost:9200'
})

// No generics (promise style)
{
  const response = await client.cat.count({ index: 'test' })

  expectType<types.CatCountResponse>(response.body)
  expectType<Context>(response.meta.context)
}

// Define the context (promise style)
{
  const response = await client.cat.count<string>({ index: 'test' })

  expectType<types.CatCountResponse>(response.body)
  expectType<string>(response.meta.context)
}

// No generics (callback style)
{
  const result = client.cat.count({ index: 'test' }, (err, response) => {
    expectType<ApiError>(err)
    expectType<types.CatCountResponse>(response.body)
    expectType<Context>(response.meta.context)
  })
  expectType<TransportRequestCallback>(result)
}

// Define the context (callback style)
{
  const result = client.cat.count<string>({ index: 'test' }, (err, response) => {
    expectType<ApiError>(err)
    expectType<types.CatCountResponse>(response.body)
    expectType<string>(response.meta.context)
  })
  expectType<TransportRequestCallback>(result)
}
