/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import assert from 'node:assert'
import * as timersPromises from 'node:timers/promises'
import { Readable } from 'node:stream'
import { errors, TransportResult, TransportRequestOptions, TransportRequestOptionsWithMeta } from '@elastic/transport'
import { Table, TypeMap, tableFromIPC, AsyncRecordBatchStreamReader } from 'apache-arrow/Arrow.node'
import Client from './client'
import * as T from './api/types'
import { Id } from './api/types'

export interface HelpersOptions {
  client: Client
  metaHeader: string | null
  maxRetries: number
}

export interface ScrollSearchOptions extends TransportRequestOptions {
  wait?: number
}

export interface ScrollSearchResponse<TDocument, TAggregations> extends TransportResult<T.SearchResponse<TDocument, TAggregations>, unknown> {
  clear: () => Promise<void>
  documents: TDocument[]
}

export interface MsearchHelperOptions extends T.MsearchRequest {
  operations?: number
  flushInterval?: number
  concurrency?: number
  retries?: number
  wait?: number
}

export interface MsearchHelper extends Promise<void> {
  stop: (error?: Error | null) => void
  search: <TDocument = unknown>(header: T.MsearchMultisearchHeader, body: T.SearchSearchRequestBody) => Promise<MsearchHelperResponse<TDocument>>
}

export interface MsearchHelperResponse<TDocument> {
  body: T.SearchResponse<TDocument>
  documents: TDocument[]
  status: number
  responses: T.MsearchResponse
}

export interface BulkStats {
  total: number
  failed: number
  retry: number
  successful: number
  noop: number
  time: number
  bytes: number
  aborted: boolean
}

interface IndexActionOperation {
  index: T.BulkIndexOperation
}

interface CreateActionOperation {
  create: T.BulkCreateOperation
}

interface UpdateActionOperation {
  update: T.BulkUpdateOperation
}

interface DeleteAction {
  delete: T.BulkDeleteOperation
}

type CreateAction = CreateActionOperation | [CreateActionOperation, unknown]
type IndexAction = IndexActionOperation | [IndexActionOperation, unknown]
type UpdateAction = [UpdateActionOperation, T.BulkUpdateAction]
type Action = IndexAction | CreateAction | UpdateAction | DeleteAction

export interface OnDropDocument<TDocument = unknown> {
  status: number
  operation: Action
  error: T.ErrorCause | null
  document: TDocument
  retried: boolean
}

type BulkResponseItem = Partial<Record<T.BulkOperationType, T.BulkResponseItem>>

export interface OnSuccessDocument<TDocument = unknown> {
  result: BulkResponseItem
  document?: TDocument
}

interface ZippedResult<TDocument = unknown> {
  result: BulkResponseItem
  raw: {
    action: string
    document?: string
  }
  // this is a function so that deserialization is only done when needed
  // to avoid a performance hit
  document?: () => TDocument
}

export interface BulkHelperOptions<TDocument = unknown> extends T.BulkRequest {
  datasource: TDocument[] | Buffer | Readable | AsyncIterator<TDocument>
  onDocument: (doc: TDocument) => Action
  flushBytes?: number
  flushInterval?: number
  concurrency?: number
  retries?: number
  wait?: number
  onDrop?: (doc: OnDropDocument<TDocument>) => void
  onSuccess?: (doc: OnSuccessDocument) => void
  refreshOnCompletion?: boolean | string
}

export interface BulkHelper<T> extends Promise<BulkStats> {
  abort: () => BulkHelper<T>
  readonly stats: BulkStats
}

export interface EsqlColumn {
  name: string
  type: string
}

export interface EsqlHelper {
  toRecords: <TDocument>() => Promise<EsqlToRecords<TDocument>>
  toArrowTable: () => Promise<Table<TypeMap>>
  toArrowReader: () => Promise<AsyncRecordBatchStreamReader>
}

export interface EsqlToRecords<TDocument> {
  columns: EsqlColumn[]
  records: TDocument[]
}

const { ResponseError, ConfigurationError } = errors
const sleep = timersPromises.setTimeout
const pImmediate = timersPromises.setImmediate
/* istanbul ignore next */
const noop = (): void => {}
const kClient = Symbol('elasticsearch-client')
const kMetaHeader = Symbol('meta header')
const kMaxRetries = Symbol('max retries')

export default class Helpers {
  [kClient]: Client
  [kMetaHeader]: string | null
  [kMaxRetries]: number
  constructor (opts: HelpersOptions) {
    this[kClient] = opts.client
    this[kMetaHeader] = opts.metaHeader
    this[kMaxRetries] = opts.maxRetries
  }

  /**
   * Runs a search operation. The only difference between client.search and this utility,
   * is that we are only returning the hits to the user and not the full ES response.
   * This helper automatically adds `filter_path=hits.hits._source` to the querystring,
   * as it will only need the documents source.
   * @param {object} params - The Elasticsearch's search parameters.
   * @param {object} options - The client optional configuration for this request.
   * @return {array} The documents that matched the request.
   */
  async search<TDocument = unknown> (params: T.SearchRequest, options: TransportRequestOptions = {}): Promise<Array<TDocument & { _id: Id }>> {
    appendFilterPath('hits.hits._id,hits.hits._source', params, true)
    options.meta = true
    const { body: result } = await this[kClient].search<TDocument>(params, options as TransportRequestOptionsWithMeta)
    if (result.hits?.hits != null) {
      return result.hits.hits.map(d => ({
        // Starting with version 8.14.0, _id is optional, but in our case it's always present.
        // See @es_quirk documentation in elasticsearch-specification/specification/_global/search/_types/hits.ts
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        _id: d._id!,
        ...(d._source as TDocument)
      }))
    }
    return []
  }

  /**
   * Runs a scroll search operation. This function returns an async iterator, allowing
   * the user to use a for await loop to get all the results of a given search.
   * ```js
   * for await (const result of client.helpers.scrollSearch({ params })) {
   *   console.log(result)
   * }
   * ```
   * Each result represents the entire body of a single scroll search request,
   * if you just need to scroll the results, use scrollDocuments.
   * This function handles automatically retries on 429 status code.
   * @param {object} params - The Elasticsearch's search parameters.
   * @param {object} options - The client optional configuration for this request.
   * @return {iterator} the async iterator
   */
  async * scrollSearch<TDocument = unknown, TAggregations = unknown> (params: T.SearchRequest, options: ScrollSearchOptions = {}): AsyncIterable<ScrollSearchResponse<TDocument, TAggregations>> {
    options.meta = true
    if (this[kMetaHeader] !== null) {
      options.headers = options.headers ?? {}
      options.headers['x-elastic-client-meta'] = `${this[kMetaHeader] as string},h=s`
    }
    const wait = options.wait ?? 5000
    const maxRetries = options.maxRetries ?? this[kMaxRetries]
    if (Array.isArray(options.ignore)) {
      options.ignore.push(429)
    } else {
      options.ignore = [429]
    }
    params.scroll = params.scroll ?? '1m'
    appendFilterPath('_scroll_id', params, false)

    let response: TransportResult<T.SearchResponse<TDocument, TAggregations>, unknown> | undefined
    for (let i = 0; i <= maxRetries; i++) {
      response = await this[kClient].search<TDocument, TAggregations>(params, options as TransportRequestOptionsWithMeta)
      if (response.statusCode !== 429) break
      await sleep(wait)
    }
    assert(response !== undefined, 'The response is undefined, please file a bug report')

    const { redaction = { type: 'replace' } } = options
    const errorOptions = { redaction }
    if (response.statusCode === 429) {
      throw new ResponseError(response, errorOptions)
    }

    let scroll_id = response.body._scroll_id
    let stop = false
    const clear = async (): Promise<void> => {
      stop = true
      await this[kClient].clearScroll(
        { scroll_id },
        { ignore: [400], ...options }
      )
    }

    while (response.body.hits != null && response.body.hits.hits.length > 0) {
      // scroll id is always present in the response, but it might
      // change over time based on the number of shards
      scroll_id = response.body._scroll_id
      // @ts-expect-error
      response.clear = clear
      addDocumentsGetter<TDocument, TAggregations>(response)

      // @ts-expect-error
      yield response

      if (stop) {
        break
      }

      for (let i = 0; i <= maxRetries; i++) {
        const r = await this[kClient].scroll({
          scroll: params.scroll,
          rest_total_hits_as_int: params.rest_total_hits_as_int,
          scroll_id
        }, options as TransportRequestOptionsWithMeta)
        response = r as TransportResult<T.ScrollResponse<TDocument, TAggregations>, unknown>
        assert(response !== undefined, 'The response is undefined, please file a bug report')
        if (response.statusCode !== 429) break
        await sleep(wait)
      }
      if (response.statusCode === 429) {
        throw new ResponseError(response, errorOptions)
      }
    }

    if (!stop) {
      await clear()
    }
  }

  /**
   * Runs a scroll search operation. This function returns an async iterator, allowing
   * the user to use a for await loop to get all the documents of a given search.
   * ```js
   * for await (const document of client.helpers.scrollSearch({ params })) {
   *   console.log(document)
   * }
   * ```
   * Each document is what you will find by running a scrollSearch and iterating on the hits array.
   * This helper automatically adds `filter_path=hits.hits._source` to the querystring,
   * as it will only need the documents source.
   * @param {object} params - The Elasticsearch's search parameters.
   * @param {object} options - The client optional configuration for this request.
   * @return {iterator} the async iterator
   */
  async * scrollDocuments<TDocument = unknown> (params: T.SearchRequest, options: ScrollSearchOptions = {}): AsyncIterable<TDocument> {
    appendFilterPath('hits.hits._source', params, true)
    for await (const { documents } of this.scrollSearch<TDocument>(params, options)) {
      for (const document of documents) {
        yield document
      }
    }
  }

  /**
   * Creates a msearch helper instance. Once you configure it, you can use the provided
   * `search` method to add new searches in the queue.
   * @param {object} options - The configuration of the msearch operations.
   * @param {object} reqOptions - The client optional configuration for this request.
   * @return {object} The possible operations to run.
   */
  msearch (options: MsearchHelperOptions = {}, reqOptions: TransportRequestOptions = {}): MsearchHelper {
    const client = this[kClient]
    const {
      operations = 5,
      concurrency = 5,
      flushInterval = 500,
      retries = this[kMaxRetries],
      wait = 5000,
      ...msearchOptions
    } = options
    reqOptions.meta = true

    const { redaction = { type: 'replace' } } = reqOptions
    const errorOptions = { redaction }

    let stopReading = false
    let stopError: Error | null = null
    let timeoutRef = null
    const operationsStream = new Readable({
      objectMode: true,
      read (size) {}
    })

    const p = iterate()
    const helper: MsearchHelper = {
      [Symbol.toStringTag]: 'Promise',
      then (onFulfilled: any, onRejected?: any) {
        return p.then(onFulfilled, onRejected)
      },
      catch (onRejected: any) {
        return p.catch(onRejected)
      },
      finally (onFinally: any) {
        return p.finally(onFinally)
      },
      stop (error = null) {
        if (stopReading) return
        stopReading = true
        stopError = error
        operationsStream.push(null)
      },
      // TODO: support abort a single search?
      // NOTE: the validation checks are synchronous and the callback/promise will
      //       be resolved in the same tick. We might want to fix this in the future.
      search<TDocument = unknown> (header: T.MsearchMultisearchHeader, body: T.SearchSearchRequestBody): Promise<MsearchHelperResponse<TDocument>> {
        if (stopReading) {
          const error = stopError === null
            ? new ConfigurationError('The msearch processor has been stopped')
            : stopError
          return Promise.reject(error)
        }

        if (!(typeof header === 'object' && header !== null && !Array.isArray(header))) {
          return Promise.reject(new ConfigurationError('The header should be an object'))
        }

        if (!(typeof body === 'object' && body !== null && !Array.isArray(body))) {
          return Promise.reject(new ConfigurationError('The body should be an object'))
        }

        let onFulfilled: any = null
        let onRejected: any = null
        const promise = new Promise<MsearchHelperResponse<TDocument>>((resolve, reject) => {
          onFulfilled = resolve
          onRejected = reject
        })
        const callback = function callback (err: Error | null, result: T.MsearchResponse<TDocument>): void {
          err !== null ? onRejected(err) : onFulfilled(result)
        }

        operationsStream.push([header, body, callback])
        return promise
      }
    }

    return helper

    async function iterate (): Promise<void> {
      const { semaphore, finish } = buildSemaphore()
      const msearchBody: Array<T.MsearchMultisearchHeader | T.SearchSearchRequestBody> = []
      const callbacks: any[] = []
      let loadedOperations = 0
      timeoutRef = setTimeout(onFlushTimeout, flushInterval) // eslint-disable-line

      try {
        for await (const operation of operationsStream) {
          timeoutRef.refresh()
          loadedOperations += 1
          msearchBody.push(operation[0], operation[1])
          callbacks.push(operation[2])
          if (loadedOperations >= operations) {
            const send = await semaphore()
            send(msearchBody.slice(), callbacks.slice())
            msearchBody.length = 0
            callbacks.length = 0
            loadedOperations = 0
          }
        }
      } finally {
        clearTimeout(timeoutRef)
      }

      // In some cases the previos http call does not have finished,
      // or we didn't reach the flush bytes threshold, so we force one last operation.
      if (loadedOperations > 0) {
        const send = await semaphore()
        send(msearchBody, callbacks)
      }

      await finish()

      if (stopError !== null) {
        throw stopError
      }

      async function onFlushTimeout (): Promise<void> {
        if (loadedOperations === 0) return
        const msearchBodyCopy = msearchBody.slice()
        const callbacksCopy = callbacks.slice()
        msearchBody.length = 0
        callbacks.length = 0
        loadedOperations = 0
        try {
          const send = await semaphore()
          send(msearchBodyCopy, callbacksCopy)
        } catch (err) {
          /* istanbul ignore next */
          // @ts-expect-error
          helper.stop(err)
        }
      }
    }

    // This function builds a semaphore using the concurrency
    // options of the msearch helper. It is used inside the iterator
    // to guarantee that no more than the number of operations
    // allowed to run at the same time are executed.
    // It returns a semaphore function which resolves in the next tick
    // if we didn't reach the maximim concurrency yet, otherwise it returns
    // a promise that resolves as soon as one of the running request has finshed.
    // The semaphore function resolves a send function, which will be used
    // to send the actual msearch request.
    // It also returns a finish function, which returns a promise that is resolved
    // when there are no longer request running.
    function buildSemaphore (): { semaphore: () => Promise<typeof send>, finish: () => Promise<void> } {
      let resolveSemaphore: ((value?: any) => void) | null = null
      let resolveFinish: ((value?: any) => void) | null = null
      let running = 0

      return { semaphore, finish }

      function finish (): Promise<void> {
        return new Promise((resolve, reject) => {
          if (running === 0) {
            resolve()
          } else {
            resolveFinish = resolve
          }
        })
      }

      function semaphore (): Promise<typeof send> {
        if (running < concurrency) {
          running += 1
          return pImmediate(send)
        } else {
          return new Promise((resolve, reject) => {
            resolveSemaphore = resolve
          })
        }
      }

      function send (msearchBody: Array<T.MsearchMultisearchHeader | T.SearchSearchRequestBody>, callbacks: any[]): void {
        /* istanbul ignore if */
        if (running > concurrency) {
          throw new Error('Max concurrency reached')
        }
        msearchOperation(msearchBody, callbacks, () => {
          running -= 1
          if (resolveSemaphore !== null) {
            running += 1
            resolveSemaphore(send)
            resolveSemaphore = null
          } else if (resolveFinish != null && running === 0) {
            resolveFinish()
          }
        })
      }
    }

    function msearchOperation (msearchBody: Array<T.MsearchMultisearchHeader | T.SearchSearchRequestBody>, callbacks: any[], done: () => void): void {
      let retryCount = retries

      // Instead of going full on async-await, which would make the code easier to read,
      // we have decided to use callback style instead.
      // This because every time we use async await, V8 will create multiple promises
      // behind the scenes, making the code slightly slower.
      tryMsearch(msearchBody, callbacks, retrySearch)
      function retrySearch (msearchBody: Array<T.MsearchMultisearchHeader | T.SearchSearchRequestBody>, callbacks: any[]): void {
        if (msearchBody.length > 0 && retryCount > 0) {
          retryCount -= 1
          setTimeout(tryMsearch, wait, msearchBody, callbacks, retrySearch)
          return
        }

        done()
      }

      // This function never returns an error, if the msearch operation fails,
      // the error is dispatched to all search executors.
      function tryMsearch (msearchBody: Array<T.MsearchMultisearchHeader | T.SearchSearchRequestBody>, callbacks: any[], done: (msearchBody: Array<T.MsearchMultisearchHeader | T.SearchSearchRequestBody>, callbacks: any[]) => void): void {
        client.msearch(Object.assign({}, msearchOptions, { body: msearchBody }), reqOptions as TransportRequestOptionsWithMeta)
          .then(results => {
            const retryBody = []
            const retryCallbacks = []
            const { responses } = results.body
            for (let i = 0, len = responses.length; i < len; i++) {
              const response = responses[i]
              if (response.status === 429 && retryCount > 0) {
                retryBody.push(msearchBody[i * 2])
                retryBody.push(msearchBody[(i * 2) + 1])
                retryCallbacks.push(callbacks[i])
                continue
              }
              const result = { ...results, body: response }
              // @ts-expect-error
              addDocumentsGetter(result)
              if (response.status != null && response.status >= 400) {
                callbacks[i](new ResponseError(result, errorOptions), result)
              } else {
                callbacks[i](null, result)
              }
            }
            done(retryBody, retryCallbacks)
          })
          .catch(err => {
            for (const callback of callbacks) {
              callback(err, null)
            }
            return done([], [])
          })
      }
    }
  }

  /**
   * Creates a bulk helper instance. Once you configure it, you can pick which operation
   * to execute with the given dataset, index, create, update, and delete.
   * @param {object} options - The configuration of the bulk operation.
   * @param {object} reqOptions - The client optional configuration for this request.
   * @return {object} The possible operations to run with the datasource.
   */
  bulk<TDocument = unknown> (options: BulkHelperOptions<TDocument>, reqOptions: TransportRequestOptions = {}): BulkHelper<TDocument> {
    assert(!(reqOptions.asStream ?? false), 'bulk helper: the asStream request option is not supported')

    const client = this[kClient]
    const { serializer } = client
    if (this[kMetaHeader] !== null) {
      reqOptions.headers = reqOptions.headers ?? {}
      reqOptions.headers['x-elastic-client-meta'] = `${this[kMetaHeader] as string},h=bp`
    }
    reqOptions.meta = true
    const {
      datasource,
      onDocument,
      flushBytes = 5000000,
      flushInterval = 30000,
      concurrency = 5,
      retries = this[kMaxRetries],
      wait = 5000,
      onDrop = noop,
      // onSuccess does not default to noop, to avoid the performance hit
      // of deserializing every document in the bulk request
      onSuccess,
      refreshOnCompletion = false,
      ...bulkOptions
    } = options

    if (datasource === undefined) {
      // @ts-expect-error
      return Promise.reject(new ConfigurationError('bulk helper: the datasource is required'))
    }
    if (!(Array.isArray(datasource) || Buffer.isBuffer(datasource) || isReadableStream(datasource) || isAsyncIterator(datasource))) {
      // @ts-expect-error
      return Promise.reject(new ConfigurationError('bulk helper: the datasource must be an array or a buffer or a readable stream or an async generator'))
    }
    if (onDocument === undefined) {
      // @ts-expect-error
      return Promise.reject(new ConfigurationError('bulk helper: the onDocument callback is required'))
    }

    let shouldAbort = false
    let timeoutRef: any = null
    const stats = {
      total: 0,
      failed: 0,
      retry: 0,
      successful: 0,
      noop: 0,
      time: 0,
      bytes: 0,
      aborted: false
    }

    const p = iterate()
    const helper: BulkHelper<TDocument> = {
      [Symbol.toStringTag]: 'Promise',
      then (onFulfilled: any, onRejected?: any) {
        return p.then(onFulfilled, onRejected)
      },
      catch (onRejected: any) {
        return p.catch(onRejected)
      },
      finally (onFinally: any) {
        return p.finally(onFinally)
      },
      get stats () {
        return stats
      },
      abort () {
        clearTimeout(timeoutRef)
        shouldAbort = true
        stats.aborted = true
        return this
      }
    }

    return helper

    /**
     * Function that iterates over the given datasource and start a bulk operation as soon
     * as it reaches the configured bulk size. It's designed to use the Node.js asynchronous
     * model at this maximum capacity, as it will collect the next body to send while there is
     * a running http call. In this way, the CPU time will be used carefully.
     * The objects will be serialized right away, to approximate the byte length of the body.
     * It creates an array of strings instead of a ndjson string because the bulkOperation
     * will navigate the body for matching failed operations with the original document.
     */
    async function iterate (): Promise<BulkStats> {
      const { semaphore, finish } = buildSemaphore()
      const startTime = Date.now()
      const bulkBody: string[] = []
      let actionBody = ''
      let payloadBody = ''
      let chunkBytes = 0
      timeoutRef = setTimeout(onFlushTimeout, flushInterval) // eslint-disable-line

      // @ts-expect-error datasource is an iterable
      for await (const chunk of datasource) {
        if (shouldAbort) break
        timeoutRef.refresh()
        const result = onDocument(chunk)
        const [action, payload] = Array.isArray(result) ? result : [result, chunk]
        const operation = Object.keys(action)[0]
        if (operation === 'index' || operation === 'create') {
          actionBody = serializer.serialize(action)
          payloadBody = typeof payload === 'string'
            ? payload
            : serializer.serialize(payload)
          chunkBytes += Buffer.byteLength(actionBody) + Buffer.byteLength(payloadBody)
          bulkBody.push(actionBody, payloadBody)
        } else if (operation === 'update') {
          actionBody = serializer.serialize(action)
          payloadBody = typeof chunk === 'string'
            ? `{"doc":${chunk}}`
            : serializer.serialize({ doc: chunk, ...payload })
          chunkBytes += Buffer.byteLength(actionBody) + Buffer.byteLength(payloadBody)
          bulkBody.push(actionBody, payloadBody)
        } else if (operation === 'delete') {
          actionBody = serializer.serialize(action)
          chunkBytes += Buffer.byteLength(actionBody)
          bulkBody.push(actionBody)
        } else {
          clearTimeout(timeoutRef)
          throw new ConfigurationError(`Bulk helper invalid action: '${operation}'`)
        }

        if (chunkBytes >= flushBytes) {
          stats.bytes += chunkBytes
          const bulkBodyCopy = bulkBody.slice()
          bulkBody.length = 0
          chunkBytes = 0
          const send = await semaphore()
          send(bulkBodyCopy)
        }
      }

      clearTimeout(timeoutRef)
      // In some cases the previous http call has not finished,
      // or we didn't reach the flush bytes threshold, so we force one last operation.
      if (!shouldAbort && chunkBytes > 0) {
        const send = await semaphore()
        stats.bytes += chunkBytes
        send(bulkBody)
      }

      await finish()

      if (refreshOnCompletion !== false) {
        await client.indices.refresh({
          index: typeof refreshOnCompletion === 'string'
            ? refreshOnCompletion
            : '_all'
        }, reqOptions)
      }

      stats.time = Date.now() - startTime
      stats.total = stats.successful + stats.failed

      return stats

      async function onFlushTimeout (): Promise<void> {
        if (chunkBytes === 0) return
        stats.bytes += chunkBytes
        const bulkBodyCopy = bulkBody.slice()
        bulkBody.length = 0
        chunkBytes = 0
        try {
          const send = await semaphore()
          send(bulkBodyCopy)
        } catch (err: any) {
          /* istanbul ignore next */
          helper.abort() // eslint-disable-line
        }
      }
    }

    // This function builds a semaphore using the concurrency
    // options of the bulk helper. It is used inside the iterator
    // to guarantee that no more than the number of operations
    // allowed to run at the same time are executed.
    // It returns a semaphore function which resolves in the next tick
    // if we didn't reach the maximum concurrency yet, otherwise it returns
    // a promise that resolves as soon as one of the running requests has finished.
    // The semaphore function resolves a send function, which will be used
    // to send the actual bulk request.
    // It also returns a finish function, which returns a promise that is resolved
    // when there are no longer request running. It rejects an error if one
    // of the request has failed for some reason.
    function buildSemaphore (): { semaphore: () => Promise<typeof send>, finish: () => Promise<void> } {
      let resolveSemaphore: ((value?: any) => void) | null = null
      let resolveFinish: ((value?: any) => void) | null = null
      let rejectFinish: ((value?: any) => void) | null = null
      let error: Error | null = null
      let running = 0

      return { semaphore, finish }

      function finish (): Promise<void> {
        return new Promise((resolve, reject) => {
          if (running === 0) {
            if (error !== null) {
              reject(error)
            } else {
              resolve()
            }
          } else {
            resolveFinish = resolve
            rejectFinish = reject
          }
        })
      }

      function semaphore (): Promise<typeof send> {
        if (running < concurrency) {
          running += 1
          return pImmediate(send)
        } else {
          return new Promise((resolve, reject) => {
            resolveSemaphore = resolve
          })
        }
      }

      function send (bulkBody: string[]): void {
        /* istanbul ignore if */
        if (running > concurrency) {
          throw new Error('Max concurrency reached')
        }
        bulkOperation(bulkBody, err => {
          running -= 1
          if (err != null) {
            shouldAbort = true
            error = err
          }
          if (resolveSemaphore !== null) {
            running += 1
            resolveSemaphore(send)
            resolveSemaphore = null
          } else if (resolveFinish != null && rejectFinish != null && running === 0) {
            if (error != null) {
              rejectFinish(error)
            } else {
              resolveFinish()
            }
          }
        })
      }
    }

    function bulkOperation (bulkBody: string[], callback: (err?: Error | null) => void): void {
      let retryCount = retries
      let isRetrying = false

      // Instead of going full on async-await, which would make the code easier to read,
      // we have decided to use callback style instead.
      // This because every time we use async await, V8 will create multiple promises
      // behind the scenes, making the code slightly slower.
      tryBulk(bulkBody, retryDocuments)
      function retryDocuments (err: Error | null, bulkBody: string[]): void {
        if (err != null) return callback(err)
        if (shouldAbort) return callback()

        if (bulkBody.length > 0) {
          if (retryCount > 0) {
            isRetrying = true
            retryCount -= 1
            stats.retry += bulkBody.length
            setTimeout(tryBulk, wait, bulkBody, retryDocuments)
            return
          }
          for (let i = 0, len = bulkBody.length; i < len; i = i + 2) {
            const operation = Object.keys(serializer.deserialize(bulkBody[i]))[0]
            onDrop({
              status: 429,
              error: null,
              operation: serializer.deserialize(bulkBody[i]),
              // @ts-expect-error
              document: operation !== 'delete'
                ? serializer.deserialize(bulkBody[i + 1])
                /* istanbul ignore next */
                : null,
              retried: isRetrying
            })
            stats.failed += 1
          }
        }
        callback()
      }

      /**
       * Zips bulk response items (the action's result) with the original document body.
       * The raw string version of action and document lines are also included.
       */
      function zipBulkResults (responseItems: BulkResponseItem[], bulkBody: string[]): ZippedResult[] {
        const zipped = []
        let indexSlice = 0
        for (let i = 0, len = responseItems.length; i < len; i++) {
          const result = responseItems[i]
          const operation = Object.keys(result)[0]
          let zipResult

          if (operation === 'delete') {
            zipResult = {
              result,
              raw: { action: bulkBody[indexSlice] }
            }
            indexSlice += 1
          } else {
            const document = bulkBody[indexSlice + 1]
            zipResult = {
              result,
              raw: { action: bulkBody[indexSlice], document },
              // this is a function so that deserialization is only done when needed
              // to avoid a performance hit
              document: () => serializer.deserialize(document)
            }
            indexSlice += 2
          }

          zipped.push(zipResult as ZippedResult)
        }

        return zipped
      }

      function tryBulk (bulkBody: string[], callback: (err: Error | null, bulkBody: string[]) => void): void {
        if (shouldAbort) return callback(null, [])
        client.bulk(Object.assign({}, bulkOptions, { operations: bulkBody }), reqOptions as TransportRequestOptionsWithMeta)
          .then(response => {
            const result = response.body
            const results = zipBulkResults(result.items, bulkBody)

            if (!result.errors) {
              stats.successful += result.items.length
              for (const item of results) {
                const { result, document = noop } = item
                if (result.update?.result === 'noop') {
                  stats.noop++
                }
                if (onSuccess != null) onSuccess({ result, document: document() })
              }
              return callback(null, [])
            }
            const retry = []
            for (const item of results) {
              const { result, raw, document = noop } = item
              const operation = Object.keys(result)[0]
              // @ts-expect-error
              const responseItem = result[operation as keyof T.BulkResponseItemContainer]
              assert(responseItem !== undefined, 'The responseItem is undefined, please file a bug report')

              if (responseItem.status >= 400) {
                // 429 is the only status code where we might want to retry
                // a document, because it was not an error in the document itself,
                // but the ES node was handling too many operations.
                if (responseItem.status === 429) {
                  retry.push(raw.action)
                  /* istanbul ignore next */
                  if (operation !== 'delete') {
                    retry.push(raw.document ?? '')
                  }
                } else {
                  onDrop({
                    status: responseItem.status,
                    error: responseItem.error ?? null,
                    operation: serializer.deserialize(raw.action),
                    // @ts-expect-error
                    document: document(),
                    retried: isRetrying
                  })
                  stats.failed += 1
                }
              } else {
                stats.successful += 1
                if (onSuccess != null) onSuccess({ result, document: document() })
              }
            }
            callback(null, retry)
          })
          .catch(err => {
            callback(err, [])
          })
      }
    }
  }

  /**
   * Creates an ES|QL helper instance, to help transform the data returned by an ES|QL query into easy-to-use formats.
   * @param {object} params - Request parameters sent to esql.query()
   * @returns {object} EsqlHelper instance
   */
  esql (params: T.EsqlQueryRequest, reqOptions: TransportRequestOptions = {}): EsqlHelper {
    const client = this[kClient]

    function toRecords<TDocument> (response: T.EsqlEsqlResult): TDocument[] {
      const { columns, values } = response
      return values.map(row => {
        const doc: Partial<TDocument> = {}
        row.forEach((cell, index) => {
          const { name } = columns[index]
          // @ts-expect-error
          doc[name] = cell
        })
        return doc as TDocument
      })
    }

    const metaHeader = this[kMetaHeader]

    const helper: EsqlHelper = {
      /**
       * Pivots ES|QL query results into an array of row objects, rather than the default format where each row is an array of values.
       */
      async toRecords<TDocument>(): Promise<EsqlToRecords<TDocument>> {
        if (metaHeader !== null) {
          reqOptions.headers = reqOptions.headers ?? {}
          reqOptions.headers['x-elastic-client-meta'] = `${metaHeader as string},h=qo`
        }

        params.format = 'json'
        params.columnar = false
        const response = await client.esql.query(params, reqOptions)
        const records: TDocument[] = toRecords(response)
        const { columns } = response
        return { records, columns }
      },

      async toArrowTable (): Promise<Table<TypeMap>> {
        if (metaHeader !== null) {
          reqOptions.headers = reqOptions.headers ?? {}
          reqOptions.headers['x-elastic-client-meta'] = `${metaHeader as string},h=qa`
        }

        params.format = 'arrow'

        // @ts-expect-error the return type will be ArrayBuffer when the format is set to 'arrow'
        const response: ArrayBuffer = await client.esql.query(params, reqOptions)
        return tableFromIPC(response)
      },

      async toArrowReader (): Promise<AsyncRecordBatchStreamReader> {
        if (metaHeader !== null) {
          reqOptions.headers = reqOptions.headers ?? {}
          reqOptions.headers['x-elastic-client-meta'] = `${metaHeader as string},h=qa`
          reqOptions.asStream = true
        }

        params.format = 'arrow'

        const response = await client.esql.query(params, reqOptions) as unknown as Readable
        return await AsyncRecordBatchStreamReader.from(response)
      }
    }

    return helper
  }
}

// Using a getter will improve the overall performances of the code,
// as we will reed the documents only if needed.
function addDocumentsGetter<TDocument, TAggregations> (result: TransportResult<T.SearchResponse<TDocument, TAggregations>, unknown>): void {
  Object.defineProperty(result, 'documents', {
    get () {
      if (this.body.hits?.hits != null) {
        // @ts-expect-error
        return this.body.hits.hits.map(d => d._source)
      }
      return []
    }
  })
}

function appendFilterPath (filter: string, params: Record<string, any>, force: boolean): void {
  if (params.filter_path !== undefined) {
    params.filter_path += ',' + filter // eslint-disable-line
  } else if (force) {
    params.filter_path = filter
  }
}

function isReadableStream (obj: any): obj is Readable {
  return obj != null && typeof obj.pipe === 'function'
}

function isAsyncIterator (obj: any): obj is AsyncIterator<unknown> {
  return obj?.[Symbol.asyncIterator] != null
}
