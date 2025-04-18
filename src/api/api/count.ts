/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
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

interface That {
  transport: Transport
}

const commonQueryParams = ['error_trace', 'filter_path', 'human', 'pretty']

const acceptedParams: Record<string, { path: string[], body: string[], query: string[] }> = {
  count: {
    path: [
      'index'
    ],
    body: [
      'query'
    ],
    query: [
      'allow_no_indices',
      'analyzer',
      'analyze_wildcard',
      'default_operator',
      'df',
      'expand_wildcards',
      'ignore_throttled',
      'ignore_unavailable',
      'lenient',
      'min_score',
      'preference',
      'routing',
      'terminate_after',
      'q'
    ]
  }
}

/**
  * Count search results. Get the number of documents matching a query. The query can be provided either by using a simple query string as a parameter, or by defining Query DSL within the request body. The query is optional. When no query is provided, the API uses `match_all` to count all the documents. The count API supports multi-target syntax. You can run a single count API search across multiple data streams and indices. The operation is broadcast across all shards. For each shard ID group, a replica is chosen and the search is run against it. This means that replicas increase the scalability of the count.
  * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-count | Elasticsearch API documentation}
  */
export default async function CountApi (this: That, params?: T.CountRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CountResponse>
export default async function CountApi (this: That, params?: T.CountRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.CountResponse, unknown>>
export default async function CountApi (this: That, params?: T.CountRequest, options?: TransportRequestOptions): Promise<T.CountResponse>
export default async function CountApi (this: That, params?: T.CountRequest, options?: TransportRequestOptions): Promise<any> {
  const {
    path: acceptedPath,
    body: acceptedBody,
    query: acceptedQuery
  } = acceptedParams.count

  const userQuery = params?.querystring
  const querystring: Record<string, any> = userQuery != null ? { ...userQuery } : {}

  let body: Record<string, any> | string | undefined
  const userBody = params?.body
  if (userBody != null) {
    if (typeof userBody === 'string') {
      body = userBody
    } else {
      body = { ...userBody }
    }
  }

  params = params ?? {}
  for (const key in params) {
    if (acceptedBody.includes(key)) {
      body = body ?? {}
      // @ts-expect-error
      body[key] = params[key]
    } else if (acceptedPath.includes(key)) {
      continue
    } else if (key !== 'body' && key !== 'querystring') {
      if (acceptedQuery.includes(key) || commonQueryParams.includes(key)) {
        // @ts-expect-error
        querystring[key] = params[key]
      } else {
        body = body ?? {}
        // @ts-expect-error
        body[key] = params[key]
      }
    }
  }

  let method = ''
  let path = ''
  if (params.index != null) {
    method = body != null ? 'POST' : 'GET'
    path = `/${encodeURIComponent(params.index.toString())}/_count`
  } else {
    method = body != null ? 'POST' : 'GET'
    path = '/_count'
  }
  const meta: TransportRequestMetadata = {
    name: 'count',
    pathParts: {
      index: params.index
    }
  }
  return await this.transport.request({ path, method, querystring, body, meta }, options)
}
