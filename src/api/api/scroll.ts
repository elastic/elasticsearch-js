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
  scroll: {
    path: [],
    body: [
      'scroll',
      'scroll_id'
    ],
    query: [
      'scroll',
      'scroll_id',
      'rest_total_hits_as_int'
    ]
  }
}

/**
  * Run a scrolling search. IMPORTANT: The scroll API is no longer recommend for deep pagination. If you need to preserve the index state while paging through more than 10,000 hits, use the `search_after` parameter with a point in time (PIT). The scroll API gets large sets of results from a single scrolling search request. To get the necessary scroll ID, submit a search API request that includes an argument for the `scroll` query parameter. The `scroll` parameter indicates how long Elasticsearch should retain the search context for the request. The search response returns a scroll ID in the `_scroll_id` response body parameter. You can then use the scroll ID with the scroll API to retrieve the next batch of results for the request. If the Elasticsearch security features are enabled, the access to the results of a specific scroll ID is restricted to the user or API key that submitted the search. You can also use the scroll API to specify a new scroll parameter that extends or shortens the retention period for the search context. IMPORTANT: Results from a scrolling search reflect the state of the index at the time of the initial search request. Subsequent indexing or document changes only affect later search and scroll requests.
  * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-scroll | Elasticsearch API documentation}
  */
export default async function ScrollApi<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>> (this: That, params: T.ScrollRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ScrollResponse<TDocument, TAggregations>>
export default async function ScrollApi<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>> (this: That, params: T.ScrollRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ScrollResponse<TDocument, TAggregations>, unknown>>
export default async function ScrollApi<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>> (this: That, params: T.ScrollRequest, options?: TransportRequestOptions): Promise<T.ScrollResponse<TDocument, TAggregations>>
export default async function ScrollApi<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>> (this: That, params: T.ScrollRequest, options?: TransportRequestOptions): Promise<any> {
  const {
    path: acceptedPath,
    body: acceptedBody,
    query: acceptedQuery
  } = acceptedParams.scroll

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

  const method = body != null ? 'POST' : 'GET'
  const path = '/_search/scroll'
  const meta: TransportRequestMetadata = {
    name: 'scroll',
    pathParts: {
      scroll_id: params.scroll_id
    }
  }
  return await this.transport.request({ path, method, querystring, body, meta }, options)
}
