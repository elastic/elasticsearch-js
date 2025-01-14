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

export default class Tasks {
  transport: Transport
  constructor (transport: Transport) {
    this.transport = transport
  }

  /**
    * Cancel a task. A task may continue to run for some time after it has been cancelled because it may not be able to safely stop its current activity straight away. It is also possible that Elasticsearch must complete its work on other tasks before it can process the cancellation. The get task information API will continue to list these cancelled tasks until they complete. The cancelled flag in the response indicates that the cancellation command has been processed and the task will stop as soon as possible. To troubleshoot why a cancelled task does not complete promptly, use the get task information API with the `?detailed` parameter to identify the other tasks the system is running. You can also use the node hot threads API to obtain detailed information about the work the system is doing instead of completing the cancelled task.
    * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/master/tasks.html | Elasticsearch API documentation}
    */
  async cancel (this: That, params?: T.TasksCancelRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TasksCancelResponse>
  async cancel (this: That, params?: T.TasksCancelRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TasksCancelResponse, unknown>>
  async cancel (this: That, params?: T.TasksCancelRequest, options?: TransportRequestOptions): Promise<T.TasksCancelResponse>
  async cancel (this: That, params?: T.TasksCancelRequest, options?: TransportRequestOptions): Promise<any> {
    const acceptedPath: string[] = ['task_id']
    const querystring: Record<string, any> = {}
    const body = undefined

    params = params ?? {}
    for (const key in params) {
      if (acceptedPath.includes(key)) {
        continue
      } else {
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    let method = ''
    let path = ''
    if (params.task_id != null) {
      method = 'POST'
      path = `/_tasks/${encodeURIComponent(params.task_id.toString())}/_cancel`
    } else {
      method = 'POST'
      path = '/_tasks/_cancel'
    }
    const meta: TransportRequestMetadata = {
      name: 'tasks.cancel',
      pathParts: {
        task_id: params.task_id
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Get task information. Get information about a task currently running in the cluster.
    * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/master/tasks.html | Elasticsearch API documentation}
    */
  async get (this: That, params: T.TasksGetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TasksGetResponse>
  async get (this: That, params: T.TasksGetRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TasksGetResponse, unknown>>
  async get (this: That, params: T.TasksGetRequest, options?: TransportRequestOptions): Promise<T.TasksGetResponse>
  async get (this: That, params: T.TasksGetRequest, options?: TransportRequestOptions): Promise<any> {
    const acceptedPath: string[] = ['task_id']
    const querystring: Record<string, any> = {}
    const body = undefined

    for (const key in params) {
      if (acceptedPath.includes(key)) {
        continue
      } else {
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    const method = 'GET'
    const path = `/_tasks/${encodeURIComponent(params.task_id.toString())}`
    const meta: TransportRequestMetadata = {
      name: 'tasks.get',
      pathParts: {
        task_id: params.task_id
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Get all tasks. Get information about the tasks currently running on one or more nodes in the cluster.
    * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/master/tasks.html | Elasticsearch API documentation}
    */
  async list (this: That, params?: T.TasksListRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TasksListResponse>
  async list (this: That, params?: T.TasksListRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TasksListResponse, unknown>>
  async list (this: That, params?: T.TasksListRequest, options?: TransportRequestOptions): Promise<T.TasksListResponse>
  async list (this: That, params?: T.TasksListRequest, options?: TransportRequestOptions): Promise<any> {
    const acceptedPath: string[] = []
    const querystring: Record<string, any> = {}
    const body = undefined

    params = params ?? {}
    for (const key in params) {
      if (acceptedPath.includes(key)) {
        continue
      } else {
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    const method = 'GET'
    const path = '/_tasks'
    const meta: TransportRequestMetadata = {
      name: 'tasks.list'
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }
}
