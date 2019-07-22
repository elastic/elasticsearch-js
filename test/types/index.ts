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

'use strict'

import {
  Client,
  ApiResponse,
  RequestParams,
  RequestEvent,
  ResurrectEvent,
  events,
  errors,
  ClientExtendsCallbackOptions,
  NodeOptions
} from '../../index'

import { TransportRequestParams, TransportRequestOptions } from '../../lib/Transport'
import { URL } from 'url'

const client = new Client({ node: 'http://localhost:9200' })

const nodeOpts: NodeOptions = {
  url: new URL('http://localhost:9200'),
  id: 'winteriscoming',
  headers: { 'foo': 'bar' },
  roles: {
    master: false,
    data: true,
    ingest: false,
    ml: false
  }
}

const client2 = new Client({ node: nodeOpts })

const clientBasicAuth = new Client({
  node: 'http://localhost:9200',
  auth: { username: 'foo', password: 'bar' }
})

const clientApiKeyString = new Client({
  node: 'http://localhost:9200',
  auth: { apiKey: 'foobar' }
})

const clientApiKeyObject = new Client({
  node: 'http://localhost:9200',
  auth: {
    apiKey: {
      id: 'foo',
      api_key: 'bar'
    }
  }
})

client.on(events.RESPONSE, (err: errors.ElasticsearchClientError | null, request: RequestEvent) => {
  if (err) console.log(err)
  const { body, statusCode } = request
  const { params } = request.meta.request
  console.log(params, body, statusCode)
})
client.on(events.RESURRECT, (err: errors.ElasticsearchClientError | null, meta: ResurrectEvent) => {})

// Callbacks
client.info((err: errors.ElasticsearchClientError | null, result: ApiResponse) => {})

client.index({
  index: 'test',
  type: 'test',
  id: 'test',
  body: { hello: 'world' }
}, (err: errors.ElasticsearchClientError | null, result: ApiResponse) => {})

// request options
client.index({
  index: 'test',
  type: 'test',
  id: 'test',
  body: { hello: 'world' }
}, {
  maxRetries: 2,
  ignore: [404],
  requestTimeout: 2000,
  headers: { foo: 'bar' },
  querystring: { baz: 'faz' },
  compression: 'gzip',
  asStream: false
}, (err: errors.ElasticsearchClientError | null, result: ApiResponse) => {})

// Promises
client.info()
  .then((result: ApiResponse) => {})
  .catch((err: errors.ElasticsearchClientError) => {})

client.index({
  index: 'test',
  type: 'test',
  id: 'test',
  body: { hello: 'world' }
})
  .then((result: ApiResponse) => {})
  .catch((err: errors.ElasticsearchClientError) => {})

// request options
client.index({
  index: 'test',
  type: 'test',
  id: 'test',
  body: { hello: 'world' }
}, {
  maxRetries: 2,
  ignore: [404],
  requestTimeout: 2000
})
  .then((result: ApiResponse) => {})
  .catch((err: errors.ElasticsearchClientError) => {})

// --- Use generics ---
// Define the search parameters
interface SearchBody {
  query: {
    match: { foo: string }
  }
}
const searchParams: RequestParams.Search<SearchBody> = {
  index: 'test',
  body: {
    query: {
      match: { foo: 'bar' }
    }
  }
}

// Define the interface of the search response
interface SearchResponse<T> {
  hits: {
    hits: Array<{
      _source: T;
    }>
  }
}

// Define the interface of the source object
interface Source {
  foo: string
}

client.search(searchParams)
  .then((response: ApiResponse<SearchResponse<Source>>) => console.log(response))
  .catch((err: errors.ElasticsearchClientError) => {})

// extend client
client.extend('namespace.method', (options: ClientExtendsCallbackOptions) => {
  return function (params: any) {
    const requestParams: TransportRequestParams = {
      method: 'GET',
      path: '/',
      querystring: {}
    }

    const requestOptions: TransportRequestOptions = {
      ignore: [404],
      maxRetries: 5
    }

    return options.makeRequest(requestParams, requestOptions)
  }
})
