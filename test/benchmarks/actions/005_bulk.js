// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { readFileSync } = require('fs')
const { join } = require('path')
const { Action } = require('../lib')

const payload = []
const OPERATIONS = 10000
module.exports = new Action({
  action: 'bulk',
  category: 'core',
  warmups: 10,
  repetitions: 1000,
  operations: OPERATIONS,
  async setup (benchmark) {
    const doc = JSON.parse(readFileSync(join(benchmark.config.dataSource, 'small', 'document.json'), 'utf8'))
    for (let i = 0; i < OPERATIONS; i++) {
      payload.push(doc)
    }
    await benchmark.runnerClient.indices.delete({ index: 'test-bench-bulk' }, { ignore: [404] })
    await benchmark.runnerClient.indices.create({
      index: 'test-bench-bulk',
      body: { settings: { number_of_shards: 3, refresh_interval: '5s' } }
    })
    await benchmark.runnerClient.cluster.health({ wait_for_status: 'yellow' })
  },
  measure (n, benchmark, done) {
    const bulkBody = []
    for (let i = 0; i < OPERATIONS; i++) {
      bulkBody.push({ index: {} }, payload[i])
    }
    benchmark.runnerClient.bulk({
      index: 'test-bench-bulk',
      body: bulkBody
    }, (err, result) => {
      if (err) {
        done(err, result)
      } else if (result.body.errors === true) {
        done(new Error('Something went wrong during bulk index'), result)
      } else {
        done(err, result)
      }
    })
  }
})
