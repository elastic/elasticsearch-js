// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { Readable as ReadableStream } from 'stream'
import { TransportRequestOptions, ApiResponse } from './Transport'
import { Search, Bulk } from '../api/requestParams'

export default class Helpers {
  search<T>(params: Search, options: TransportRequestOptions): Promise<T[]>
  scrollSearch<T, B, C>(params: Search, options: TransportRequestOptions): AsyncIterator<ScrollSearchResult<T, B, C>>
  scrollDocuments<T>(params: Search, options: TransportRequestOptions): AsyncIterator<T>
  bulk(options: BulkHelperOptions): BulkHelper<BulkStats>
}

interface ScrollSearchResult<T= any, B = any, C = any> extends ApiResponse<B, C> {
  clear: () => Promise<void>
  documents: T[]
}

interface BulkHelper<T> extends Promise<T> {
  abort: () => BulkHelper<T>
}

interface BulkStats {
  total: number
  failed: number
  retry: number
  successful: number
  time: number
  bytes: number
  aborted: boolean
}

interface IndexAction {
  index: {
    _index: string
    [key: string]: any
  }
}

interface CreateAction {
  create: {
    _index: string
    [key: string]: any
  }
}

interface UpdateActionOperation {
  update: {
    _index: string
    [key: string]: any
  }
}

interface DeleteAction {
  delete: {
    _index: string
    [key: string]: any
  }
}

type UpdateAction = [UpdateActionOperation, Record<string, any>]
type Action = IndexAction | CreateAction | UpdateAction | DeleteAction
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface BulkHelperOptions extends Omit<Bulk, 'body'> {
  datasource: any[] | Buffer | ReadableStream
  onDocument: (doc: Record<string, any>) => Action
  flushBytes?: number
  concurrency?: number
  retries?: number
  wait?: number,
  onDrop?: (doc: Record<string, any>) => void,
  refreshOnCompletion?: boolean | string
}