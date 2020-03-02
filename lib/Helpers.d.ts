// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { TransportRequestOptions, ApiResponse } from './Transport'
import { Search } from '../api/requestParams'

export default class Helpers {
  search<T>(params: Search, options: TransportRequestOptions): Promise<T[]>
  scrollSearch<T, B, C>(params: Search, options: TransportRequestOptions): AsyncIterator<ScrollSearchResult<T, B, C>>
  scrollDocuments<T>(params: Search, options: TransportRequestOptions): AsyncIterator<T>
  bulk(options: BulkHelperOptions): BulkHelper
}

interface ScrollSearchResult<T= any, B = any, C = any> extends ApiResponse<B, C> {
  clear: () => Promise<void>
  documents: T[]
}

interface BulkHelper {
  onDrop: (doc: any) => BulkHelper
  abort: () => BulkHelper
  index: (action: BulkAction, fn: BulkIndexCallback) => Promise<BulkStats>
  create: (action: BulkAction, fn: BulkCreateCallback) => Promise<BulkStats>
  update: (action: BulkAction, fn: BulkUpdateCallback) => Promise<BulkStats>
  delete: (action: BulkAction, fn: BulkDeleteCallback) => Promise<BulkStats>
}

type obj = Record<string, any>
type BulkIndexCallback = (doc: obj) => obj
type BulkCreateCallback = (doc: obj) => obj
type BulkUpdateCallback = (doc: obj) => [obj, obj]
type BulkDeleteCallback = (doc: obj) => obj

interface BulkAction {
  _index: string
  [key: string]: any
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

interface BulkHelperOptions {
  datasource: any[]
  flushBytes?: number
  concurrency?: number
  retries?: number
  wait?: number
}