// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { Readable as ReadableStream } from 'stream'
import { TransportRequestOptions, ApiError, ApiResponse, RequestBody } from './Transport'
import { Search, Msearch, Bulk } from '../api/requestParams'

export default class Helpers {
  search<TDocument = unknown, TRequestBody extends RequestBody = Record<string, any>>(params: Search<TRequestBody>, options?: TransportRequestOptions): Promise<TDocument[]>
  scrollSearch<TDocument = unknown, TResponse = Record<string, any>, TRequestBody extends  RequestBody = Record<string, any>, TContext = unknown>(params: Search<TRequestBody>, options?: TransportRequestOptions): AsyncIterable<ScrollSearchResponse<TDocument, TResponse, TContext>>
  scrollDocuments<TDocument = unknown, TRequestBody extends RequestBody = Record<string, any>>(params: Search<TRequestBody>, options?: TransportRequestOptions): AsyncIterable<TDocument>
  msearch(options?: MsearchHelperOptions): MsearchHelper
  bulk<TDocument = unknown>(options: BulkHelperOptions<TDocument>): BulkHelper<BulkStats>
}

export interface ScrollSearchResponse<TDocument = unknown, TResponse = Record<string, any>, TContext = unknown> extends ApiResponse<TResponse, TContext> {
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

export interface BulkHelperOptions<TDocument = unknown> extends Omit<Bulk, 'body'> {
  datasource: TDocument[] | Buffer | ReadableStream | AsyncIterator<TDocument>
  onDocument: (doc: TDocument) => Action
  flushBytes?: number
  flushInterval?: number
  concurrency?: number
  retries?: number
  wait?: number
  onDrop?: (doc: OnDropDocument<TDocument>) => void
  refreshOnCompletion?: boolean | string
}

export interface OnDropDocument<TDocument = unknown> {
  status: number
  error: {
    type: string,
    reason: string,
    caused_by: {
      type: string,
      reason: string
    }
  }
  document: TDocument
  retried: boolean
}

export interface MsearchHelperOptions extends Omit<Msearch, 'body'> {
  operations?: number
  flushInterval?: number
  concurrency?: number
  retries?: number
  wait?: number
}

declare type callbackFn<Response, Context> = (err: ApiError, result: ApiResponse<Response, Context>) => void;
export interface MsearchHelper extends Promise<void> {
  stop(error?: Error): void
  search<TResponse = Record<string, any>, TRequestBody extends  RequestBody = Record<string, any>, TContext = unknown>(header: Omit<Search, 'body'>, body: TRequestBody): Promise<ApiResponse<TResponse, TContext>>
  search<TResponse = Record<string, any>, TRequestBody extends  RequestBody = Record<string, any>, TContext = unknown>(header: Omit<Search, 'body'>, body: TRequestBody, callback: callbackFn<TResponse, TContext>): void
}
