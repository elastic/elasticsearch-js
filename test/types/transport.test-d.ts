// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { expectAssignable } from 'tsd'
import Connection from '../../lib/Connection'
import {
  TransportRequestParams,
  TransportRequestOptions,
  RequestEvent,
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
expectAssignable<TransportRequestOptions>(options)
expectAssignable<RequestEvent>(response)
expectAssignable<ApiResponse>(response)
