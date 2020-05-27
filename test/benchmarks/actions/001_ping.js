// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { Action } = require('../lib')

module.exports = new Action({
  action: 'ping',
  category: 'core',
  measure (n, benchmark, done) {
    benchmark.runnerClient.ping(done)
  }
})
