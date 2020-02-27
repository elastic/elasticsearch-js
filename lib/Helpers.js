'use strict'

const { promisify } = require('util')

const pImmediate = promisify(setImmediate)
const kGetHits = Symbol('elasticsearch-get-hits')
const kClient = Symbol('elasticsearch-client')
const noop = () => {}

class Helpers {
  constructor (client) {
    this[kClient] = client
  }

  [kGetHits] (body) {
    if (body.hits && body.hits.hits) {
      return body.hits.hits.map(d => d._source)
    }
    return []
  }

  /**
   * Runs a search operation. The only difference between client.search and this utility,
   * is that we are only returning the hits to the user and not the full ES response.
   * @param {object} params - The Elasticsearch's search parameters.
   * @param {object} options - The client optional configuration for this request.
   * @return {array} The documents that matched the request.
   */
  async search (params, options) {
    const response = await this[kClient].search(params, options)
    return this[kGetHits](response.body)
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
   * @param {object} params - The Elasticsearch's search parameters.
   * @param {object} options - The client optional configuration for this request.
   * @return {iterator} the async iterator
   */
  async * scrollSearch (params, options) {
    // TODO: study scroll search slices
    // TODO: retry on 429
    let response = await this[kClient].search(params, options)
    let scrollId = response.body._scroll_id
    let stop = false
    const clear = async () => {
      stop = true
      await this[kClient].clearScroll(
        { body: { scroll_id: scrollId } },
        { ignore: [400] }
      )
    }

    while (response.body.hits.hits.length > 0) {
      scrollId = response.body._scroll_id
      response.clear = clear
      response.documents = this[kGetHits](response.body)

      yield response

      if (!scrollId || stop === true) {
        break
      }

      response = await this[kClient].scroll({
        body: {
          scroll_id: scrollId,
          scroll: params.scroll
        }
      })
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
   * @param {object} params - The Elasticsearch's search parameters.
   * @param {object} options - The client optional configuration for this request.
   * @return {iterator} the async iterator
   */
  async * scrollDocuments (params, options) {
    for await (const { documents } of this.scrollSearch(params)) {
      for (const document of documents) {
        yield document
      }
    }
  }

  /**
   * Creates a bulk helper instance. Once you configure it, you can pick which operation
   * to execute with the given dataset, index, create, update, and delete.
   * @param {object} options - The configuration of the bulk operation.
   * @return {object} The possible orations to run with the datasource.
   */
  bulk (opts) {
    const client = this[kClient]
    const { serialize, deserialize } = client.serializer
    const datasource = opts.datasource
    const flushBytes = opts.flushBytes || 5000000 // 5MB
    const concurrency = opts.concurrency || 5
    const retries = opts.retries || 2
    const wait = opts.wait || 5000
    let onDropFn = noop
    let shouldAbort = false

    const stats = {
      total: 0,
      failed: 0,
      retry: 0,
      successful: 0,
      time: 0,
      bytes: 0,
      aborted: false
    }

    return {
      onDrop,
      index,
      create,
      update,
      abort,
      delete: _delete
    }

    function abort () {
      shouldAbort = true
      stats.aborted = true
      return this
    }

    function onDrop (fn) {
      onDropFn = fn
      return this
    }

    /**
     * Function that iterates over the given datasource and start a bulk operation as soon
     * as it reaches the configured bulk size. It's designed to use the Node.js asynchronous
     * model at this maximum capacity, as it will collect the next body to send while there is
     * a running http call. In this way, the CPU time will be used carefully.
     * The objects will be serialized right away, to approximate the byte length of the body.
     * It creates an array of strings instead of a ndjson string because the bulkOperation
     * will navigate the body for matching failed operations with the original document.
     */
    async function iterate (operation, action, fn) {
      const { semaphore, finish } = buildSemaphore()
      const startTime = Date.now()
      const bulkBody = []
      let actionBody = ''
      let payloadBody = ''
      let chunkBytes = 0

      for await (const chunk of datasource) {
        if (shouldAbort === true) break
        const extendAction = fn(chunk)
        if (operation === 'index' || operation === 'create') {
          actionBody = serialize({ [operation]: { ...action, ...extendAction } })
          payloadBody = typeof chunk === 'string' ? chunk : serialize(chunk)
          chunkBytes += Buffer.byteLength(actionBody) + Buffer.byteLength(payloadBody)
          bulkBody.push(actionBody)
          bulkBody.push(payloadBody)
        } else if (operation === 'update') {
          actionBody = serialize({ update: { ...action, ...extendAction[0] } })
          payloadBody = typeof chunk === 'string'
            ? `{doc:${chunk}}`
            : serialize({ doc: chunk, ...extendAction[1] })
          chunkBytes += Buffer.byteLength(actionBody) + Buffer.byteLength(payloadBody)
          bulkBody.push(actionBody)
          bulkBody.push(payloadBody)
        } else { // delete
          actionBody = serialize({ delete: { ...action, ...extendAction } })
          chunkBytes += Buffer.byteLength(actionBody)
          bulkBody.push(actionBody)
        }
        stats.total += 1

        if (chunkBytes >= flushBytes) {
          stats.bytes += chunkBytes
          const send = await semaphore()
          send(bulkBody.slice())
          bulkBody.length = 0
          chunkBytes = 0
        }
      }

      // In some cases the previos http call does not have finished,
      // or we didn't reach the flush bytes threshold, so we force one last operation.
      if (shouldAbort === false && chunkBytes > 0) {
        const send = await semaphore()
        stats.bytes += chunkBytes
        send(bulkBody)
      }

      await finish()

      stats.time = Date.now() - startTime
      stats.successful = stats.total - stats.failed

      return stats
    }

    /**
     * Creates a bulk index operation.
     * @param {string} action - The configuration for the operation we want to perform.
     *                          For example: `{ _index: 'my-index' }`
     * @param {functin} fn - An optional function that allows to customize the operation
     *                       for each document you want to index.
     *                       For example: doc => ({ _id: doc.id }))
     * @return {object} The statistics of the operation.
     */
    function index (action, fn = noop) {
      return iterate('index', action, fn)
    }

    /**
     * Creates a bulk create operation.
     * @param {string} action - The configuration for the operation we want to perform.
     *                          For example: `{ _index: 'my-index' }`
     * @param {functin} fn - An optional function that allows to customize the operation
     *                       for each document you want to create.
     *                       For example: doc => ({ _id: doc.id }))
     * @return {object} The statistics of the operation.
     */
    function create (action, fn = noop) {
      return iterate('create', action, fn)
    }

    /**
     * Creates a bulk update operation.
     * @param {string} action - The configuration for the operation we want to perform.
     *                          For example: `{ _index: 'my-index' }`
     * @param {functin} fn - An optional function that allows to customize the operation
     *                       for each document you want to update.
     *                       You must return an array with one or two elements, the first
     *                       will be added to the action, the second to the payload.
     *                       For example: doc => ([{ _id: doc.id }, { doc_as_upsert: true }]))
     * @return {object} The statistics of the operation.
     */
    function update (action, fn = noop) {
      return iterate('update', action, fn)
    }

    /**
     * Creates a bulk index operation.
     * @param {string} action - The configuration for the operation we want to perform.
     *                          For example: `{ _index: 'my-index' }`
     * @param {functin} fn - An optional function that allows to customize the operation
     *                       for each document you want to delete.
     *                       For example: doc => ({ _id: doc.id }))
     * @return {object} The statistics of the operation.
     */
    function _delete (action, fn = noop) {
      return iterate('delete', action, fn)
    }

    // This function builds a semaphore using the concurrency
    // options of the bulk helper. It is used inside the iterator
    // to guarantee that no more than the number of operations
    // allowed to run at the same time are executed.
    // It returns a semaphore function which resolves in the next tick
    // if we didn't reach the maximim concurrency yet, otherwise it returns
    // a promise that resolves as soon as one of the running request has finshed.
    // The semaphore function resolves a send function, which will be used
    // to send the actual bulk request.
    // It also returns a finish function, which returns a promise that is resolved
    // when there are no longer request running. It rejects an error if one
    // of the request has failed for some reason.
    function buildSemaphore () {
      let resolveSemaphore = null
      let resolveFinish = null
      let rejectFinish = null
      let error = null
      let running = 0

      return { semaphore, finish }

      function finish () {
        return new Promise((resolve, reject) => {
          if (running === 0) {
            if (error) {
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

      function semaphore () {
        if (running < concurrency) {
          return pImmediate(send)
        } else {
          return new Promise((resolve, reject) => {
            resolveSemaphore = resolve
          })
        }
      }

      function send (bulkBody) {
        if (running >= concurrency) {
          throw new Error('Max concurrency reached')
        }
        running += 1
        bulkOperation(bulkBody, err => {
          running -= 1
          if (err) {
            shouldAbort = true
            error = err
          }
          if (resolveSemaphore) {
            resolveSemaphore(send)
            resolveSemaphore = null
          } else if (resolveFinish && running === 0) {
            if (error) {
              rejectFinish(error)
            } else {
              resolveFinish()
            }
          }
        })
      }
    }

    function bulkOperation (bulkBody, callback) {
      let retryCount = retries
      let isRetrying = false

      // Instead of going full on async-await, which would make the code easier to read,
      // we have decided to use callback style instead.
      // This because every time we use async await, V8 will create multiple promises
      // behind the scenes, making the code slightly slower.
      tryBulk(bulkBody, retryDocuments)
      function retryDocuments (err, bulkBody) {
        if (err) return callback(err)
        if (shouldAbort === true) return callback()
        isRetrying = true

        if (bulkBody.length > 0) {
          if (retryCount > 0) {
            retryCount -= 1
            setTimeout(tryBulk, wait, bulkBody, retryDocuments)
            return
          }
          for (let i = 0, len = bulkBody.length; i < len; i = i + 2) {
            const operation = Object.keys(deserialize(bulkBody[i]))[0]
            onDropFn({
              status: 429,
              error: null,
              operation: deserialize(bulkBody[i]),
              document: operation !== 'delete'
                ? deserialize(bulkBody[i + 1])
                : null,
              retried: isRetrying
            })
            stats.failed += 1
          }
        }
        callback()
      }

      function tryBulk (bulkBody, callback) {
        if (shouldAbort === true) return callback(null, [])
        client.bulk({ body: bulkBody }, (err, { body }) => {
          if (err) return callback(err, null)
          if (body.errors === false) return callback(null, [])
          const retry = []
          const { items } = body
          for (let i = 0, len = items.length; i < len; i++) {
            const action = items[i]
            const operation = Object.keys(action)[0]
            const { status } = action[operation]
            const indexSlice = operation !== 'delete' ? i * 2 : i

            if (status >= 400) {
              // 429 is the only staus code where we might want to retry
              // a document, because it was not an error in the document itself,
              // but the ES node were handling too many operations.
              if (status === 429) {
                stats.retry += 1
                retry.push(bulkBody[indexSlice])
                if (operation !== 'delete') {
                  retry.push(bulkBody[indexSlice + 1])
                }
              } else {
                onDropFn({
                  status: status,
                  error: action[operation].error,
                  operation: deserialize(bulkBody[indexSlice]),
                  document: operation !== 'delete'
                    ? deserialize(bulkBody[indexSlice + 1])
                    : null,
                  retried: isRetrying
                })
                stats.failed += 1
              }
            }
          }
          callback(null, retry)
        })
      }
    }
  }
}

module.exports = Helpers
