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
import { errors, ApiResponse, Connection } from '../../'

const response = {
  body: {},
  statusCode: 200,
  headers: {},
  warnings: null,
  meta: {
    context: {},
    name: 'name',
    request: {
      params: { method: 'GET', path: '/' },
      options: {},
      id: 42
    },
    connection: new Connection(),
    attempts: 0,
    aborted: false,
  }
}

{
  const err = new errors.ElasticsearchClientError()
  expectType<string>(err.name)
  expectType<string>(err.message)
}

{
  const err = new errors.TimeoutError('message', response)
  expectType<string>(err.name)
  expectType<string>(err.message)
  expectType<ApiResponse>(err.meta)
}

{
  const err = new errors.ConnectionError('message', response)
  expectType<string>(err.name)
  expectType<string>(err.message)
  expectType<ApiResponse>(err.meta)
}

{
  const err = new errors.NoLivingConnectionsError('message', response)
  expectType<string>(err.name)
  expectType<string>(err.message)
  expectType<ApiResponse>(err.meta)
}

{
  const err = new errors.SerializationError('message', {})
  expectType<string>(err.name)
  expectType<string>(err.message)
  expectType<any>(err.data)
}

{
  const err = new errors.DeserializationError('message', 'data')
  expectType<string>(err.name)
  expectType<string>(err.message)
  expectType<string>(err.data)
}

{
  const err = new errors.ConfigurationError('message')
  expectType<string>(err.name)
  expectType<string>(err.message)
}

{
  const err = new errors.ResponseError(response)
  expectType<string>(err.name)
  expectType<string>(err.message)
  expectType<ApiResponse>(err.meta)
  expectType<Record<string, any>>(err.body)
  expectType<number>(err.statusCode)
  expectType<Record<string, any>>(err.headers)
}

{
  const err = new errors.RequestAbortedError('message', response)
  expectType<string>(err.name)
  expectType<string>(err.message)
  expectType<ApiResponse>(err.meta)
}