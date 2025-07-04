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
  termvectors: {
    path: [
      'index',
      'id'
    ],
    body: [
      'doc',
      'filter',
      'per_field_analyzer',
      'fields',
      'field_statistics',
      'offsets',
      'payloads',
      'positions',
      'term_statistics',
      'routing',
      'version',
      'version_type'
    ],
    query: [
      'fields',
      'field_statistics',
      'offsets',
      'payloads',
      'positions',
      'preference',
      'realtime',
      'routing',
      'term_statistics',
      'version',
      'version_type'
    ]
  }
}

/**
  * Get term vector information. Get information and statistics about terms in the fields of a particular document. You can retrieve term vectors for documents stored in the index or for artificial documents passed in the body of the request. You can specify the fields you are interested in through the `fields` parameter or by adding the fields to the request body. For example: ``` GET /my-index-000001/_termvectors/1?fields=message ``` Fields can be specified using wildcards, similar to the multi match query. Term vectors are real-time by default, not near real-time. This can be changed by setting `realtime` parameter to `false`. You can request three types of values: _term information_, _term statistics_, and _field statistics_. By default, all term information and field statistics are returned for all fields but term statistics are excluded. **Term information** * term frequency in the field (always returned) * term positions (`positions: true`) * start and end offsets (`offsets: true`) * term payloads (`payloads: true`), as base64 encoded bytes If the requested information wasn't stored in the index, it will be computed on the fly if possible. Additionally, term vectors could be computed for documents not even existing in the index, but instead provided by the user. > warn > Start and end offsets assume UTF-16 encoding is being used. If you want to use these offsets in order to get the original text that produced this token, you should make sure that the string you are taking a sub-string of is also encoded using UTF-16. **Behaviour** The term and field statistics are not accurate. Deleted documents are not taken into account. The information is only retrieved for the shard the requested document resides in. The term and field statistics are therefore only useful as relative measures whereas the absolute numbers have no meaning in this context. By default, when requesting term vectors of artificial documents, a shard to get the statistics from is randomly selected. Use `routing` only to hit a particular shard. Refer to the linked documentation for detailed examples of how to use this API.
  * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-termvectors | Elasticsearch API documentation}
  */
export default async function TermvectorsApi<TDocument = unknown> (this: That, params: T.TermvectorsRequest<TDocument>, options?: TransportRequestOptionsWithOutMeta): Promise<T.TermvectorsResponse>
export default async function TermvectorsApi<TDocument = unknown> (this: That, params: T.TermvectorsRequest<TDocument>, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TermvectorsResponse, unknown>>
export default async function TermvectorsApi<TDocument = unknown> (this: That, params: T.TermvectorsRequest<TDocument>, options?: TransportRequestOptions): Promise<T.TermvectorsResponse>
export default async function TermvectorsApi<TDocument = unknown> (this: That, params: T.TermvectorsRequest<TDocument>, options?: TransportRequestOptions): Promise<any> {
  const {
    path: acceptedPath,
    body: acceptedBody,
    query: acceptedQuery
  } = acceptedParams.termvectors

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

  let method = ''
  let path = ''
  if (params.index != null && params.id != null) {
    method = body != null ? 'POST' : 'GET'
    path = `/${encodeURIComponent(params.index.toString())}/_termvectors/${encodeURIComponent(params.id.toString())}`
  } else {
    method = body != null ? 'POST' : 'GET'
    path = `/${encodeURIComponent(params.index.toString())}/_termvectors`
  }
  const meta: TransportRequestMetadata = {
    name: 'termvectors',
    pathParts: {
      index: params.index,
      id: params.id
    }
  }
  return await this.transport.request({ path, method, querystring, body, meta }, options)
}
