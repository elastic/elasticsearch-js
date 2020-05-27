// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { join } = require('path')
const { readdirSync } = require('fs')
const { errors } = require('../..')
const { Benchmark } = require('./lib')

const env = {
  ELASTICSEARCH_TARGET_URL: process.env.ELASTICSEARCH_TARGET_URL,
  ELASTICSEARCH_REPORT_URL: process.env.ELASTICSEARCH_REPORT_URL,
  DATA_SOURCE: process.env.DATA_SOURCE,
  BUILD_ID: process.env.BUILD_ID,
  TARGET_SERVICE_TYPE: process.env.TARGET_SERVICE_TYPE,
  TARGET_SERVICE_NAME: process.env.TARGET_SERVICE_NAME,
  TARGET_SERVICE_VERSION: process.env.TARGET_SERVICE_VERSION,
  TARGET_SERVICE_OS_FAMILY: process.env.TARGET_SERVICE_OS_FAMILY,
  CLIENT_BRANCH: process.env.CLIENT_BRANCH,
  CLIENT_COMMIT: process.env.CLIENT_COMMIT,
  CLIENT_BENCHMARK_ENVIRONMENT: process.env.CLIENT_BENCHMARK_ENVIRONMENT
}

const missingKeys = []
for (const key in env) {
  if (env[key] === undefined) {
    missingKeys.push(key)
  }
}
if (missingKeys.length > 0) {
  console.error('Missing keys', missingKeys)
  process.exit(1)
}

const benchmark = new Benchmark({
  config: {
    targetUrl: env.ELASTICSEARCH_TARGET_URL,
    reportUrl: env.ELASTICSEARCH_REPORT_URL,
    build_id: env.BUILD_ID,
    environment: env.CLIENT_BENCHMARK_ENVIRONMENT,
    dataSource: env.DATA_SOURCE,
    client: {
      git_branch: env.CLIENT_BRANCH,
      git_commit: env.CLIENT_COMMIT
    },
    target_service: {
      os_family: env.TARGET_SERVICE_OS_FAMILY,
      type: env.TARGET_SERVICE_TYPE,
      name: env.TARGET_SERVICE_NAME,
      version: env.TARGET_SERVICE_VERSION,
      git_branch: env.CLIENT_BRANCH,
      git_commit: env.CLIENT_COMMIT
    }
  }
})

const actions = readdirSync(join(__dirname, 'actions'))
  .map(file => require(join(__dirname, 'actions', file)))

function runAction (action, done) {
  const { setup, measure } = action

  function runSetup () {
    if (typeof setup !== 'function') {
      return runWarmup()
    }
    setup(benchmark)
      .then(() => runWarmup())
      .catch(err => {
        console.error(err)
        process.exit(1)
      })
  }

  function runWarmup () {
    if (action.warmups === 0) {
      return runRepetitions()
    }

    let warmups = action.warmups
    for (let i = 0; i < action.warmups; i++) {
      measure(i, benchmark, next)
    }

    function next (err, result) {
      if (err) throw err
      warmups -= 1
      if (warmups > 0) return

      runRepetitions()
    }
  }

  function runRepetitions () {
    const startTimeGlobal = process.hrtime.bigint()
    const timestamp = new Date().toISOString()

    let repetitions = action.repetitions
    for (let i = 0; i < action.repetitions; i++) {
      measure(i, benchmark, next)
    }

    function next (err, result) {
      if (err instanceof errors.ResponseError) err = null
      benchmark.stats.push({
        statusCode: result.statusCode,
        outcome: err ? 'failure' : 'success'
      })

      repetitions -= 1
      if (repetitions > 0) return

      const duration = process.hrtime.bigint() - startTimeGlobal
      benchmark.stats = benchmark.stats.map(stat => {
        return {
          ...stat,
          ...action,
          timestamp,
          duration: duration / BigInt(action.repetitions), // eslint-disable-line
        }
      })

      done()
    }
  }

  runSetup()
}

function runner (action) {
  runAction(action, () => {
    benchmark.report(() => {
      if (actions.length > 0) {
        runner(actions.shift())
      } else {
        console.log('Done')
      }
    })
  })
}

runner(actions.shift())
