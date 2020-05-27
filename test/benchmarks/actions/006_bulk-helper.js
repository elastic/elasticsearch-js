// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { readFileSync } = require('fs')
const { join } = require('path')
const { Action } = require('../lib')

const payload = []
const OPERATIONS = 1000000

async function * generate () {
  for (const doc of payload) {
    yield doc
  }
}

module.exports = new Action({
  action: 'bulk-helper',
  category: 'helpers',
  warmups: 10,
  repetitions: 10,
  operations: OPERATIONS,
  async setup (benchmark) {
    const doc = JSON.parse(readFileSync(join(benchmark.config.dataSource, 'small', 'document.json'), 'utf8'))
    for (let i = 0; i < OPERATIONS; i++) {
      payload.push(doc)
    }
    await benchmark.runnerClient.indices.delete({ index: 'test-bench-bulk-helper' }, { ignore: [404] })
    await benchmark.runnerClient.indices.create({
      index: 'test-bench-bulk-helper',
      body: { settings: { number_of_shards: 3, refresh_interval: '5s' } }
    })
    await benchmark.runnerClient.cluster.health({ wait_for_status: 'yellow' })
  },
  measure (n, benchmark, done) {
    benchmark.runnerClient.helpers
      .bulk({
        datasource: generate(),
        index: 'test-bench-bulk-helper',
        flushBytes: 2000000,
        concurrency: 8,
        onDocument (doc) {
          return { index: {} }
        }
      })
      .then(stats => {
        if (stats.failed > 0) {
          done(new Error('Bulk operation failed'), { statusCode: 200 })
        } else {
          done(null, { statusCode: 200 })
        }
      })
      .catch(err => {
        done(err, { statusCode: 418 })
      })
  }
})
