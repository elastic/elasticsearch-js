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

/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-misused-new */
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-unused-vars */

// This file was automatically generated by elastic/elastic-client-generator-js
// DO NOT MODIFY IT BY HAND. Instead, modify the source open api file,
// and elastic/elastic-client-generator-js to regenerate this file again.

import {
  Transport,
  TransportRequestMetadata,
  TransportRequestOptions,
  TransportRequestOptionsWithMeta,
  TransportRequestOptionsWithOutMeta,
  TransportResult
} from '@elastic/transport'
import * as T from '../types'
interface That { transport: Transport }

export default class Esql {
  transport: Transport
  constructor (transport: Transport) {
    this.transport = transport
  }

  /**
    * Executes an ESQL request asynchronously
    * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/master/esql-async-query-api.html | Elasticsearch API documentation}
    */
  async asyncQuery (this: That, params?: T.TODO, options?: TransportRequestOptionsWithOutMeta): Promise<T.TODO>
  async asyncQuery (this: That, params?: T.TODO, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TODO, unknown>>
  async asyncQuery (this: That, params?: T.TODO, options?: TransportRequestOptions): Promise<T.TODO>
  async asyncQuery (this: That, params?: T.TODO, options?: TransportRequestOptions): Promise<any> {
    const acceptedPath: string[] = []
    const querystring: Record<string, any> = {}
    const body = undefined

    params = params ?? {}
    for (const key in params) {
      if (acceptedPath.includes(key)) {
        continue
      } else {
        querystring[key] = params[key]
      }
    }

    const method = 'POST'
    const path = '/_query/async'
    const meta: TransportRequestMetadata = {
      name: 'esql.async_query'
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Retrieves the results of a previously submitted async query request given its ID.
    * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/master/esql-async-query-get-api.html | Elasticsearch API documentation}
    */
  async asyncQueryGet (this: That, params?: T.TODO, options?: TransportRequestOptionsWithOutMeta): Promise<T.TODO>
  async asyncQueryGet (this: That, params?: T.TODO, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TODO, unknown>>
  async asyncQueryGet (this: That, params?: T.TODO, options?: TransportRequestOptions): Promise<T.TODO>
  async asyncQueryGet (this: That, params?: T.TODO, options?: TransportRequestOptions): Promise<any> {
    const acceptedPath: string[] = ['id']
    const querystring: Record<string, any> = {}
    const body = undefined

    params = params ?? {}
    for (const key in params) {
      if (acceptedPath.includes(key)) {
        continue
      } else {
        querystring[key] = params[key]
      }
    }

    const method = 'GET'
    const path = `/_query/async/${encodeURIComponent(params.id.toString())}`
    const meta: TransportRequestMetadata = {
      name: 'esql.async_query_get',
      pathParts: {
        id: params.id
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Run an ES|QL query. Get search results for an ES|QL (Elasticsearch query language) query.
    * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/master/esql-rest.html | Elasticsearch API documentation}
    */
  async query (this: That, params: T.EsqlQueryRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EsqlQueryResponse>
  async query (this: That, params: T.EsqlQueryRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.EsqlQueryResponse, unknown>>
  async query (this: That, params: T.EsqlQueryRequest, options?: TransportRequestOptions): Promise<T.EsqlQueryResponse>
  async query (this: That, params: T.EsqlQueryRequest, options?: TransportRequestOptions): Promise<any> {
    const acceptedPath: string[] = []
    const acceptedBody: string[] = ['columnar', 'filter', 'locale', 'params', 'profile', 'query', 'tables']
    const querystring: Record<string, any> = {}
    const body: Record<string, any> = {}

    for (const key in params) {
      if (acceptedBody.includes(key)) {
        // @ts-expect-error
        body[key] = params[key]
      } else if (acceptedPath.includes(key)) {
        continue
      } else {
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    const method = 'POST'
    const path = '/_query'
    const meta: TransportRequestMetadata = {
      name: 'esql.query'
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }
}
