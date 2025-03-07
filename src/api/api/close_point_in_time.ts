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

/**
  * Close a point in time. A point in time must be opened explicitly before being used in search requests. The `keep_alive` parameter tells Elasticsearch how long it should persist. A point in time is automatically closed when the `keep_alive` period has elapsed. However, keeping points in time has a cost; close them as soon as they are no longer required for search requests.
  * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-open-point-in-time | Elasticsearch API documentation}
  */
export default async function ClosePointInTimeApi (this: That, params: T.ClosePointInTimeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ClosePointInTimeResponse>
export default async function ClosePointInTimeApi (this: That, params: T.ClosePointInTimeRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ClosePointInTimeResponse, unknown>>
export default async function ClosePointInTimeApi (this: That, params: T.ClosePointInTimeRequest, options?: TransportRequestOptions): Promise<T.ClosePointInTimeResponse>
export default async function ClosePointInTimeApi (this: That, params: T.ClosePointInTimeRequest, options?: TransportRequestOptions): Promise<any> {
  const acceptedPath: string[] = []
  const acceptedBody: string[] = ['id']
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
      // @ts-expect-error
      querystring[key] = params[key]
    }
  }

  const method = 'DELETE'
  const path = '/_pit'
  const meta: TransportRequestMetadata = {
    name: 'close_point_in_time'
  }
  return await this.transport.request({ path, method, querystring, body, meta }, options)
}
