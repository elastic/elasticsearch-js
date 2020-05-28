// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

BigInt.prototype.toJSON = function () { // eslint-disable-line
  return Number(this.toString())
}

const assert = require('assert')
const os = require('os')
const { join } = require('path')
const packageJson = require(join(__dirname, '..', '..', 'package.json'))
const { Client } = require('../../index')

class Benchmark {
  constructor (opts) {
    this.config = opts.config
    this.actions = []
    this.stats = []
    this.runnerClient = new Client({ node: this.config.targetUrl })
    this.reportClient = new Client({ node: this.config.reportUrl })
  }

  register (action) {
    assert(action instanceof Action, 'The action is not an Action')
    this.actions.push(action)
    return this
  }

  report (done) {
    assert(typeof done === 'function', 'Done is not a function')
    const { action } = this.stats[0]
    const stats = this.stats.map(buildEvent.bind(this))
    this.stats.length = 0

    this.reportClient.helpers
      .bulk({
        datasource: (async function * generator () {
          for (const stat of stats) {
            yield stat
          }
        })(),
        onDocument (doc) {
          const date = new Date()
          const month = date.getUTCMonth() + 1
          const _index = `metrics-intake-${date.getUTCFullYear()}-${month < 10 ? '0' + month : month}`
          return { index: { _index } }
        }
      })
      .then(result => {
        console.log(`Done ${action}, total ${result.total}`)
        done()
      })
      .catch(err => {
        console.error(err)
        process.exit(1)
      })

    function buildEvent (stat) {
      return {
        '@timestamp': stat.timestamp,
        labels: {
          build_id: this.config.build_id,
          client: 'elasticsearch-js',
          environment: this.config.environment
        },
        tags: ['bench', 'elasticsearch-js'],
        event: {
          action: stat.action,
          dataset: stat.dataset || null,
          duration: stat.duration,
          outcome: stat.outcome
        },
        http: { response: { status_code: stat.statusCode } },
        benchmark: {
          build_id: this.config.build_id,
          environment: this.config.environment,
          category: stat.category,
          repetitions: stat.repetitions,
          operations: stat.operations,
          runner: {
            os: { family: os.platform() },
            service: {
              type: 'client',
              name: 'elasticsearch-js',
              version: packageJson.version,
              git: {
                branch: this.config.client.git_branch,
                commit: this.config.client.git_commit
              }
            },
            runtime: {
              name: 'node.js',
              version: process.version
            }
          },
          target: {
            os: { family: this.config.target_service.os_family },
            service: {
              type: this.config.target_service.type,
              name: this.config.target_service.name,
              version: this.config.target_service.version,
              git: {
                branch: this.config.target_service.git_branch,
                commit: this.config.target_service.git_commit
              }
            }
          }
        }
      }
    }
  }
}

class Action {
  constructor (opts = {}) {
    assert(opts.action, 'Missing action name')
    assert(opts.action, 'Missing action category')
    assert(opts.measure, 'Missing action measure function')
    this.action = opts.action
    this.category = opts.category
    this.warmups = opts.warmups || Action.DEFAULT_WARMUPS
    this.repetitions = opts.repetitions || Action.DEFAULT_REPETITIONS
    this.operations = opts.operations || Action.DEFAULT_OPERATIONS
    this.setup = opts.setup || null
    this.measure = opts.measure
  }
}

Action.DEFAULT_WARMUPS = 0
Action.DEFAULT_REPETITIONS = 10000
Action.DEFAULT_OPERATIONS = 1

module.exports = { Benchmark, Action }
