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

const acceptedParams: Record<string, { path: string[], body: string[], query: string[] }> = {
  knn_search: {
    path: [
      'index'
    ],
    body: [],
    query: []
  }
}

/**
  * Performs a kNN search.
  * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/master/search-search.html | Elasticsearch API documentation}
  */
export default async function KnnSearchApi (this: That, params?: T.TODO, options?: TransportRequestOptionsWithOutMeta): Promise<T.TODO>
export default async function KnnSearchApi (this: That, params?: T.TODO, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TODO, unknown>>
export default async function KnnSearchApi (this: That, params?: T.TODO, options?: TransportRequestOptions): Promise<T.TODO>
export default async function KnnSearchApi (this: That, params?: T.TODO, options?: TransportRequestOptions): Promise<any> {
  const {
    path: acceptedPath
  } = acceptedParams.knn_search

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
    if (acceptedPath.includes(key)) {
      continue
    } else if (key !== 'body' && key !== 'querystring') {
      querystring[key] = params[key]
    }
  }

  const method = body != null ? 'POST' : 'GET'
  const path = `/${encodeURIComponent(params.index.toString())}/_knn_search`
  const meta: TransportRequestMetadata = {
    name: 'knn_search',
    pathParts: {
      index: params.index
    }
  }
  return await this.transport.request({ path, method, querystring, body, meta }, options)
}
