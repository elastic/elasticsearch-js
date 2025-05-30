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

export default class Enrich {
  transport: Transport
  acceptedParams: Record<string, { path: string[], body: string[], query: string[] }>
  constructor (transport: Transport) {
    this.transport = transport
    this.acceptedParams = {
      'enrich.delete_policy': {
        path: [
          'name'
        ],
        body: [],
        query: [
          'master_timeout'
        ]
      },
      'enrich.execute_policy': {
        path: [
          'name'
        ],
        body: [],
        query: [
          'master_timeout',
          'wait_for_completion'
        ]
      },
      'enrich.get_policy': {
        path: [
          'name'
        ],
        body: [],
        query: [
          'master_timeout'
        ]
      },
      'enrich.put_policy': {
        path: [
          'name'
        ],
        body: [
          'geo_match',
          'match',
          'range'
        ],
        query: [
          'master_timeout'
        ]
      },
      'enrich.stats': {
        path: [],
        body: [],
        query: [
          'master_timeout'
        ]
      }
    }
  }

  /**
    * Delete an enrich policy. Deletes an existing enrich policy and its enrich index.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-enrich-delete-policy | Elasticsearch API documentation}
    */
  async deletePolicy (this: That, params: T.EnrichDeletePolicyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EnrichDeletePolicyResponse>
  async deletePolicy (this: That, params: T.EnrichDeletePolicyRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.EnrichDeletePolicyResponse, unknown>>
  async deletePolicy (this: That, params: T.EnrichDeletePolicyRequest, options?: TransportRequestOptions): Promise<T.EnrichDeletePolicyResponse>
  async deletePolicy (this: That, params: T.EnrichDeletePolicyRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath
    } = this.acceptedParams['enrich.delete_policy']

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
    const path = `/_enrich/policy/${encodeURIComponent(params.name.toString())}`
    const meta: TransportRequestMetadata = {
      name: 'enrich.delete_policy',
      pathParts: {
        name: params.name
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Run an enrich policy. Create the enrich index for an existing enrich policy.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-enrich-execute-policy | Elasticsearch API documentation}
    */
  async executePolicy (this: That, params: T.EnrichExecutePolicyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EnrichExecutePolicyResponse>
  async executePolicy (this: That, params: T.EnrichExecutePolicyRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.EnrichExecutePolicyResponse, unknown>>
  async executePolicy (this: That, params: T.EnrichExecutePolicyRequest, options?: TransportRequestOptions): Promise<T.EnrichExecutePolicyResponse>
  async executePolicy (this: That, params: T.EnrichExecutePolicyRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath
    } = this.acceptedParams['enrich.execute_policy']

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

    const method = 'PUT'
    const path = `/_enrich/policy/${encodeURIComponent(params.name.toString())}/_execute`
    const meta: TransportRequestMetadata = {
      name: 'enrich.execute_policy',
      pathParts: {
        name: params.name
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Get an enrich policy. Returns information about an enrich policy.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-enrich-get-policy | Elasticsearch API documentation}
    */
  async getPolicy (this: That, params?: T.EnrichGetPolicyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EnrichGetPolicyResponse>
  async getPolicy (this: That, params?: T.EnrichGetPolicyRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.EnrichGetPolicyResponse, unknown>>
  async getPolicy (this: That, params?: T.EnrichGetPolicyRequest, options?: TransportRequestOptions): Promise<T.EnrichGetPolicyResponse>
  async getPolicy (this: That, params?: T.EnrichGetPolicyRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath
    } = this.acceptedParams['enrich.get_policy']

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
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    let method = ''
    let path = ''
    if (params.name != null) {
      method = 'GET'
      path = `/_enrich/policy/${encodeURIComponent(params.name.toString())}`
    } else {
      method = 'GET'
      path = '/_enrich/policy'
    }
    const meta: TransportRequestMetadata = {
      name: 'enrich.get_policy',
      pathParts: {
        name: params.name
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Create an enrich policy. Creates an enrich policy.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-enrich-put-policy | Elasticsearch API documentation}
    */
  async putPolicy (this: That, params: T.EnrichPutPolicyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EnrichPutPolicyResponse>
  async putPolicy (this: That, params: T.EnrichPutPolicyRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.EnrichPutPolicyResponse, unknown>>
  async putPolicy (this: That, params: T.EnrichPutPolicyRequest, options?: TransportRequestOptions): Promise<T.EnrichPutPolicyResponse>
  async putPolicy (this: That, params: T.EnrichPutPolicyRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath,
      body: acceptedBody,
      query: acceptedQuery
    } = this.acceptedParams['enrich.put_policy']

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

    const method = 'PUT'
    const path = `/_enrich/policy/${encodeURIComponent(params.name.toString())}`
    const meta: TransportRequestMetadata = {
      name: 'enrich.put_policy',
      pathParts: {
        name: params.name
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Get enrich stats. Returns enrich coordinator statistics and information about enrich policies that are currently executing.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-enrich-stats | Elasticsearch API documentation}
    */
  async stats (this: That, params?: T.EnrichStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EnrichStatsResponse>
  async stats (this: That, params?: T.EnrichStatsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.EnrichStatsResponse, unknown>>
  async stats (this: That, params?: T.EnrichStatsRequest, options?: TransportRequestOptions): Promise<T.EnrichStatsResponse>
  async stats (this: That, params?: T.EnrichStatsRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath
    } = this.acceptedParams['enrich.stats']

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
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    const method = 'GET'
    const path = '/_enrich/_stats'
    const meta: TransportRequestMetadata = {
      name: 'enrich.stats'
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }
}
