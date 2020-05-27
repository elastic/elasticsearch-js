// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { Action } = require('../lib')

module.exports = new Action({
  action: 'get',
  category: 'core',
  warmups: 100,
  async setup (benchmark) {
    await benchmark.runnerClient.indices.delete({ index: 'test-bench-get' }, { ignore: [404] })
    await benchmark.runnerClient.index({ index: 'test-bench-get', id: '1', body: { title: 'Test' } })
    await benchmark.runnerClient.cluster.health({ wait_for_status: 'yellow' })
    await benchmark.runnerClient.indices.refresh({ index: 'test-bench-get' })
  },
  measure (n, benchmark, done) {
    benchmark.runnerClient.get({
      index: 'test-bench-get',
      id: '1'
    }, (err, result) => {
      if (err && err.statusCode === 404) {
        done(new Error('The document should exist'), result)
      } else {
        done(err, result)
      }
    })
  }
})
