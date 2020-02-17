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
    let response = await this[kClient].search(params, options)
    let scrollId = response.body._scroll_id
    const clear = async () => {
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

      if (!scrollId) {
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
    const datasource = opts.datasource
    const bulkSize = opts.bulkSize || 1000
    const retries = opts.retries || 2
    const wait = opts.wait || 5000
    let onDropFn = noop
    let shouldAbort = false

    const stats = {
      total: 0,
      failed: 0,
      successful: 0,
      time: 0,
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
     */
    async function iterate (operation, action, fn) {
      const bulkBody = []
      const startTime = Date.now()
      // In every case byt the delete action, the bulk body will have twice the objects
      // for a given bulkSize. Because the body is formated as [action, payload, action, payload]
      const bulkBodySize = bulkSize * (operation === 'delete' ? 1 : 2)
      // We create a promise that will resolve in the next iteration of the event loop
      // so we can start as soon as possible collecting the chunks of the datasource.
      let runningBulk = pImmediate()

      for await (const chunk of datasource) {
        if (shouldAbort === true) break
        const extendAction = fn(chunk)
        if (operation === 'index' || operation === 'create') {
          bulkBody.push({ [operation]: { ...action, ...extendAction } })
          bulkBody.push(chunk)
        } else if (operation === 'update') {
          bulkBody.push({ update: { ...action, ...extendAction[0] } })
          bulkBody.push({ doc: chunk, ...extendAction[1] })
        } else { // delete
          bulkBody.push({ delete: { ...action, ...extendAction } })
        }
        stats.total += 1

        if (bulkBody.length === bulkBodySize) {
          // These are the key lines of this function. on the first run of the function
          // the promise runningBulk will resolve in the next event loop cycle, then we start
          // a new http call, but we don't wait for its result. Since that JS promises  start
          // their execution as soon as they are invoked (so there is no need to call .then)
          // the result is that we will start the http call but don't wait fot its result,
          // but instead start collecting the next batch from the datasource. Once the next batch
          // is ready, we wait for the result of the previus call.
          await runningBulk
          runningBulk = bulkOperation(bulkBody.slice())
          bulkBody.length = 0
        }
      }

      // In some cases the previos http call does not have finished,
      // or we didn't reach the batch size, so we force one last operation.
      await runningBulk
      if (shouldAbort === false && bulkBody.length > 0) {
        await bulkOperation(bulkBody)
      }

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

    function bulkOperation (bulkBody) {
      let retryCount = retries
      let isRetrying = false

      // Instead of going full on async-await, which would make the code easier to read,
      // we have decided to return a single promise, but use callback style inside.
      // This because every time we use async await, V8 will create multiple promises
      // behind the scenes, making the code slightly slower.
      return new Promise((resolve, reject) => {
        tryBulk(bulkBody, retryDocuments)
        function retryDocuments (err, bulkBody) {
          if (err) return reject(err)
          if (shouldAbort === true) return resolve()
          isRetrying = true

          if (bulkBody.length > 0) {
            if (retryCount > 0) {
              retryCount -= 1
              setTimeout(tryBulk, wait, bulkBody, retryDocuments)
              return
            }
            for (let i = 0, len = bulkBody.length; i < len; i = i + 2) {
              const operation = Object.keys(bulkBody[i])[0]
              onDropFn({
                status: 429,
                error: null,
                operation: bulkBody[i],
                document: operation !== 'delete'
                  ? bulkBody[i + 1]
                  : null,
                retried: isRetrying
              })
              stats.failed += 1
            }
          }
          resolve()
        }
      })

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
                retry.push(bulkBody[indexSlice])
                if (operation !== 'delete') {
                  retry.push(bulkBody[indexSlice + 1])
                }
              } else {
                onDropFn({
                  status: status,
                  error: action[operation].error,
                  operation: bulkBody[indexSlice],
                  document: operation !== 'delete'
                    ? bulkBody[indexSlice + 1]
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
