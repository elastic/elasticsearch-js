// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { readFileSync } = require('fs')
const { join } = require('path')
const { Action } = require('../lib')

let payload = null
let id = 0
module.exports = new Action({
  action: 'index',
  category: 'core',
  run: 'sequential',
  warmups: 100,
  async setup (benchmark) {
    payload = JSON.parse(readFileSync(join(benchmark.config.dataSource, 'small', 'document.json'), 'utf8'))
    await benchmark.runnerClient.indices.delete({ index: 'test-bench-index' }, { ignore: [404] })
    await benchmark.runnerClient.indices.create({ index: 'test-bench-index' })
    await benchmark.runnerClient.cluster.health({ wait_for_status: 'yellow' })
  },
  measure (n, benchmark, done) {
    benchmark.runnerClient.index({
      index: 'test-bench-index',
      id: `${n}-${id++}`,
      body: payload
    }, (err, result) => {
      if (err) {
        done(err, result)
      } else if (result.statusCode !== 201) {
        done(new Error('Unexpected status code ' + result.statusCode), result)
      } else {
        done(err, result)
      }
    })
  }
})
