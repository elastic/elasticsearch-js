'use strict'

const { join } = require('path')
const split = require('split2')
const { createReadStream } = require('fs')
const { Client } = require('./')
const client = new Client({ node: 'http://localhost:9200' })

// client.on('request', (e, meta) => {
//   console.log('sending request')
// })

// client.on('response', (e, meta) => {
//   console.log('got response')
// })

// const stream = createReadStream(join(__dirname, '..', 'elasticsearch-dsl-js', 'test', 'fixtures', 'stackoverflow.ndjson'))
// const stream = createReadStream(join(__dirname, '..', 'elasticsearch-dsl-js', 'test', 'fixtures', 'small-dataset.ndjson'))
async function run (n) {
  for (var i = 0; i < n; i++) {
    const stream = createReadStream(join(__dirname, '..', 'elasticsearch-dsl-js', 'test', 'fixtures', 'stackoverflow.ndjson'))
    // const stream = createReadStream(join(__dirname, '..', 'demo-stackoverflow', 'stackoverflow.json'))

    const b = client.helpers.bulk({
      datasource: stream.pipe(split()),
      flushBytes: 5000000,
      concurrency: 5,
      onDrop (doc) {
        console.log('dropped', doc)
        b.abort()
      },
      onDocument (doc) {
        return {
          index: { _index: 'stackoverflow' }
        }
      },
      action (doc) {
        return {
          index: {
            _index: 'stackoverflow',
            _id: doc.id
          }
        }
      }
    })

    console.log(await b)

    // b is a thenable
    // b.abort()

    // await b

    // await b.index('stackoverflow', doc => ({ _id: doc.id }))
    // try {
    //   const result = await b.index({ _index: 'stackoverflow' })
    //   console.log(result)
    // } catch (err) {
    //   console.log(err)
    // }
  }
}

run(1).catch(console.log)

// async function run () {
//   let p = Promise.resolve()
//   console.log('a')
//   await p
//   console.log('b')
//   p = new Promise((resolve, reject) => {
//     setTimeout(resolve, 1000)
//   })
//   await p
//   console.log('c')
//   await p
//   console.log('d')
// }

// run()
