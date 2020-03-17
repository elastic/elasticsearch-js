// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

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
  const err = new errors.SerializationError('message')
  expectType<string>(err.name)
  expectType<string>(err.message)
}

{
  const err = new errors.DeserializationError('message')
  expectType<string>(err.name)
  expectType<string>(err.message)
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
  expectType<any>(err.body)
  expectType<number>(err.statusCode)
  expectType<Record<string, any>>(err.headers)
}
