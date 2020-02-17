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

  async search (params, options) {
    const response = await this[kClient].search(params, options)
    response.documents = this[kGetHits](response.body)
    return response
  }

  // TODO: study scroll search slices
  async * scrollSearch (params, options) {
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

  async * scrollDocuments (params, options) {
    for await (const { documents } of this.scrollSearch(params)) {
      for (const document of documents) {
        yield document
      }
    }
  }

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

    async function iterate (operation, action, fn) {
      const bulkBody = []
      const startTime = Date.now()
      const bulkBodySize = bulkSize * (operation === 'delete' ? 1 : 2)
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
          await runningBulk
          runningBulk = bulkOperation(bulkBody.slice())
          bulkBody.length = 0
        }
      }

      await runningBulk
      if (shouldAbort === false && bulkBody.length > 0) {
        await bulkOperation(bulkBody)
      }

      stats.time = Date.now() - startTime
      stats.successful = stats.total - stats.failed

      return stats
    }

    function index (action, fn = noop) {
      return iterate('index', action, fn)
    }

    function create (action, fn = noop) {
      return iterate('create', action, fn)
    }

    function update (action, fn = noop) {
      return iterate('update', action, fn)
    }

    function _delete (action, fn = noop) {
      return iterate('delete', action, fn)
    }

    function bulkOperation (bulkBody) {
      let retryCount = retries
      let isRetrying = false

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
