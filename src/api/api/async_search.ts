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
  acceptedParams: Record<string, { path: string[], body: string[], query: string[] }>
}

const commonQueryParams = ['error_trace', 'filter_path', 'human', 'pretty']

export default class AsyncSearch {
  transport: Transport
  acceptedParams: Record<string, { path: string[], body: string[], query: string[] }>
  constructor (transport: Transport) {
    this.transport = transport
    this.acceptedParams = {
      'async_search.delete': {
        path: [
          'id'
        ],
        body: [],
        query: []
      },
      'async_search.get': {
        path: [
          'id'
        ],
        body: [],
        query: [
          'keep_alive',
          'typed_keys',
          'wait_for_completion_timeout'
        ]
      },
      'async_search.status': {
        path: [
          'id'
        ],
        body: [],
        query: [
          'keep_alive'
        ]
      },
      'async_search.submit': {
        path: [
          'index'
        ],
        body: [
          'aggregations',
          'aggs',
          'collapse',
          'explain',
          'ext',
          'from',
          'highlight',
          'track_total_hits',
          'indices_boost',
          'docvalue_fields',
          'knn',
          'min_score',
          'post_filter',
          'profile',
          'query',
          'rescore',
          'script_fields',
          'search_after',
          'size',
          'slice',
          'sort',
          '_source',
          'fields',
          'suggest',
          'terminate_after',
          'timeout',
          'track_scores',
          'version',
          'seq_no_primary_term',
          'stored_fields',
          'pit',
          'runtime_mappings',
          'stats'
        ],
        query: [
          'wait_for_completion_timeout',
          'keep_alive',
          'keep_on_completion',
          'allow_no_indices',
          'allow_partial_search_results',
          'analyzer',
          'analyze_wildcard',
          'batched_reduce_size',
          'ccs_minimize_roundtrips',
          'default_operator',
          'df',
          'docvalue_fields',
          'expand_wildcards',
          'explain',
          'ignore_throttled',
          'ignore_unavailable',
          'lenient',
          'max_concurrent_shard_requests',
          'preference',
          'request_cache',
          'routing',
          'search_type',
          'stats',
          'stored_fields',
          'suggest_field',
          'suggest_mode',
          'suggest_size',
          'suggest_text',
          'terminate_after',
          'timeout',
          'track_total_hits',
          'track_scores',
          'typed_keys',
          'rest_total_hits_as_int',
          'version',
          '_source',
          '_source_excludes',
          '_source_includes',
          'seq_no_primary_term',
          'q',
          'size',
          'from',
          'sort'
        ]
      }
    }
  }

  /**
    * Delete an async search. If the asynchronous search is still running, it is cancelled. Otherwise, the saved search results are deleted. If the Elasticsearch security features are enabled, the deletion of a specific async search is restricted to: the authenticated user that submitted the original search request; users that have the `cancel_task` cluster privilege.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-async-search-submit | Elasticsearch API documentation}
    */
  async delete (this: That, params: T.AsyncSearchDeleteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.AsyncSearchDeleteResponse>
  async delete (this: That, params: T.AsyncSearchDeleteRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.AsyncSearchDeleteResponse, unknown>>
  async delete (this: That, params: T.AsyncSearchDeleteRequest, options?: TransportRequestOptions): Promise<T.AsyncSearchDeleteResponse>
  async delete (this: That, params: T.AsyncSearchDeleteRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath
    } = this.acceptedParams['async_search.delete']

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
      if (acceptedPath.includes(key)) {
        continue
      } else if (key !== 'body' && key !== 'querystring') {
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    const method = 'DELETE'
    const path = `/_async_search/${encodeURIComponent(params.id.toString())}`
    const meta: TransportRequestMetadata = {
      name: 'async_search.delete',
      pathParts: {
        id: params.id
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Get async search results. Retrieve the results of a previously submitted asynchronous search request. If the Elasticsearch security features are enabled, access to the results of a specific async search is restricted to the user or API key that submitted it.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-async-search-submit | Elasticsearch API documentation}
    */
  async get<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>> (this: That, params: T.AsyncSearchGetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.AsyncSearchGetResponse<TDocument, TAggregations>>
  async get<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>> (this: That, params: T.AsyncSearchGetRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.AsyncSearchGetResponse<TDocument, TAggregations>, unknown>>
  async get<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>> (this: That, params: T.AsyncSearchGetRequest, options?: TransportRequestOptions): Promise<T.AsyncSearchGetResponse<TDocument, TAggregations>>
  async get<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>> (this: That, params: T.AsyncSearchGetRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath
    } = this.acceptedParams['async_search.get']

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
      if (acceptedPath.includes(key)) {
        continue
      } else if (key !== 'body' && key !== 'querystring') {
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    const method = 'GET'
    const path = `/_async_search/${encodeURIComponent(params.id.toString())}`
    const meta: TransportRequestMetadata = {
      name: 'async_search.get',
      pathParts: {
        id: params.id
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Get the async search status. Get the status of a previously submitted async search request given its identifier, without retrieving search results. If the Elasticsearch security features are enabled, the access to the status of a specific async search is restricted to: * The user or API key that submitted the original async search request. * Users that have the `monitor` cluster privilege or greater privileges.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-async-search-submit | Elasticsearch API documentation}
    */
  async status (this: That, params: T.AsyncSearchStatusRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.AsyncSearchStatusResponse>
  async status (this: That, params: T.AsyncSearchStatusRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.AsyncSearchStatusResponse, unknown>>
  async status (this: That, params: T.AsyncSearchStatusRequest, options?: TransportRequestOptions): Promise<T.AsyncSearchStatusResponse>
  async status (this: That, params: T.AsyncSearchStatusRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath
    } = this.acceptedParams['async_search.status']

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
      if (acceptedPath.includes(key)) {
        continue
      } else if (key !== 'body' && key !== 'querystring') {
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    const method = 'GET'
    const path = `/_async_search/status/${encodeURIComponent(params.id.toString())}`
    const meta: TransportRequestMetadata = {
      name: 'async_search.status',
      pathParts: {
        id: params.id
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Run an async search. When the primary sort of the results is an indexed field, shards get sorted based on minimum and maximum value that they hold for that field. Partial results become available following the sort criteria that was requested. Warning: Asynchronous search does not support scroll or search requests that include only the suggest section. By default, Elasticsearch does not allow you to store an async search response larger than 10Mb and an attempt to do this results in an error. The maximum allowed size for a stored async search response can be set by changing the `search.max_async_search_response_size` cluster level setting.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-async-search-submit | Elasticsearch API documentation}
    */
  async submit<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>> (this: That, params?: T.AsyncSearchSubmitRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.AsyncSearchSubmitResponse<TDocument, TAggregations>>
  async submit<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>> (this: That, params?: T.AsyncSearchSubmitRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.AsyncSearchSubmitResponse<TDocument, TAggregations>, unknown>>
  async submit<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>> (this: That, params?: T.AsyncSearchSubmitRequest, options?: TransportRequestOptions): Promise<T.AsyncSearchSubmitResponse<TDocument, TAggregations>>
  async submit<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>> (this: That, params?: T.AsyncSearchSubmitRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath,
      body: acceptedBody,
      query: acceptedQuery
    } = this.acceptedParams['async_search.submit']

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
        if (key === 'sort' && typeof params[key] === 'string' && params[key].includes(':')) { // eslint-disable-line
          querystring[key] = params[key]
        } else {
          // @ts-expect-error
          body[key] = params[key]
        }
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
      method = 'POST'
      path = `/${encodeURIComponent(params.index.toString())}/_async_search`
    } else {
      method = 'POST'
      path = '/_async_search'
    }
    const meta: TransportRequestMetadata = {
      name: 'async_search.submit',
      pathParts: {
        index: params.index
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }
}
