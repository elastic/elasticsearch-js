// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { Readable as ReadableStream } from 'stream'
import { TransportRequestOptions, ApiResponse, RequestBody, ResponseBody } from './Transport'
import { Search, Bulk } from '../api/requestParams'

export default class Helpers {
  search<TRequestBody extends RequestBody, TDocument = unknown>(params: Search<TRequestBody>, options?: TransportRequestOptions): Promise<TDocument[]>
  scrollSearch<TRequestBody extends RequestBody, TDocument = unknown, TResponse = ResponseBody, TContext = unknown>(params: Search<TRequestBody>, options?: TransportRequestOptions): AsyncIterable<ScrollSearchResponse<TDocument, TResponse, TContext>>
  scrollDocuments<TRequestBody extends RequestBody, TDocument = unknown>(params: Search<TRequestBody>, options?: TransportRequestOptions): AsyncIterable<TDocument>
  bulk(options: BulkHelperOptions): BulkHelper<BulkStats>
}

export interface ScrollSearchResponse<TDocument = unknown, TResponse = ResponseBody, TContext = unknown> extends ApiResponse<TResponse, TContext> {
  clear: () => Promise<void>
  documents: TDocument[]
}

export interface BulkHelper<T> extends Promise<T> {
  abort: () => BulkHelper<T>
}

export interface BulkStats {
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

export interface BulkHelperOptions extends Omit<Bulk, 'body'> {
  datasource: any[] | Buffer | ReadableStream | AsyncIterator<any>
  onDocument: (doc: Record<string, any>) => Action
  flushBytes?: number
  concurrency?: number
  retries?: number
  wait?: number,
  onDrop?: (doc: Record<string, any>) => void,
  refreshOnCompletion?: boolean | string
}