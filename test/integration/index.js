/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict'

const assert = require('assert')
const { readFileSync, accessSync, mkdirSync, readdirSync, statSync } = require('fs')
const { join, sep } = require('path')
const yaml = require('js-yaml')
const Git = require('simple-git')
const ora = require('ora')
const tap = require('tap')
const { Client } = require('../../index')
const TestRunner = require('./test-runner')

const esRepo = 'https://github.com/elastic/elasticsearch.git'
const esFolder = join(__dirname, '..', '..', 'elasticsearch')
const yamlFolder = join(esFolder, 'rest-api-spec', 'src', 'main', 'resources', 'rest-api-spec', 'test')
const xPackYamlFolder = join(esFolder, 'x-pack', 'plugin', 'src', 'test', 'resources', 'rest-api-spec', 'test')
const customSkips = [
  // TODO: remove this once 'arbitrary_key' is implemented
  // https://github.com/elastic/elasticsearch/pull/41492
  'indices.split/30_copy_settings.yml',
  // skipping because we are booting ES with `discovery.type=single-node`
  // and this test will fail because of this configuration
  'nodes.stats/30_discovery.yml',
  // the expected error is returning a 503,
  // which triggers a retry and the node to be marked as dead
  'search.aggregation/240_max_buckets.yml'
]
const platinumBlackList = {
  // file path: test name
  'cat.aliases/10_basic.yml': ['Empty cluster'],
  'index/10_with_id.yml': ['Index with ID'],
  'indices.get_alias/10_basic.yml': ['Get alias against closed indices'],
  'indices.get_alias/20_empty.yml': ['Check empty aliases when getting all aliases via /_alias'],
  // https://github.com/elastic/elasticsearch/pull/39400
  'ml/jobs_crud.yml': ['Test put job with id that is already taken'],
  // object keys must me strings, and `0.0.toString()` is `0`
  'ml/evaluate_data_frame.yml': [
    'Test binary_soft_classifition precision',
    'Test binary_soft_classifition recall',
    'Test binary_soft_classifition confusion_matrix'
  ],
  // it gets random failures on CI, must investigate
  'ml/set_upgrade_mode.yml': [
    'Attempt to open job when upgrade_mode is enabled',
    'Setting upgrade mode to disabled from enabled'
  ],
  // investigate why this is failing
  'monitoring/bulk/10_basic.yml': ['*'],
  'monitoring/bulk/20_privileges.yml': ['*'],
  'license/20_put_license.yml': ['*'],
  'snapshot/10_basic.yml': ['*'],
  // the body is correct, but the regex is failing
  'sql/sql.yml': ['Getting textual representation'],
  // we are setting two certificates in the docker config
  'ssl/10_basic.yml': ['*'],
  // docker issue?
  'watcher/execute_watch/60_http_input.yml': ['*'],
  // the checks are correct, but for some reason the test is failing on js side
  // I bet is because the backslashes in the rg
  'watcher/execute_watch/70_invalid.yml': ['*'],
  'watcher/put_watch/10_basic.yml': ['*'],
  'xpack/15_basic.yml': ['*']
}

function Runner (opts) {
  if (!(this instanceof Runner)) {
    return new Runner(opts)
  }
  opts = opts || {}

  assert(opts.node, 'Missing base node')
  this.bailout = opts.bailout
  const options = { node: opts.node }
  if (opts.isPlatinum) {
    options.ssl = {
      // NOTE: this path works only if we run
      // the suite with npm scripts
      ca: readFileSync('.ci/certs/ca.crt', 'utf8'),
      rejectUnauthorized: false
    }
  }
  this.client = new Client(options)
  this.log = ora('Loading yaml suite').start()
}

Runner.prototype.waitCluster = function (callback, times = 0) {
  this.log.text = 'Waiting for ElasticSearch'
  this.client.cluster.health(
    { waitForStatus: 'green', timeout: '50s' },
    (err, res) => {
      if (err && ++times < 10) {
        setTimeout(() => {
          this.waitCluster(callback, times)
        }, 5000)
      } else {
        callback(err)
      }
    }
  )
}

/**
 * Runs the test suite
 */
Runner.prototype.start = function (opts) {
  const parse = this.parse.bind(this)
  const client = this.client

  // client.on('response', (err, meta) => {
  //   console.log('Request', meta.request)
  //   if (err) {
  //     console.log('Error', err)
  //   } else {
  //     console.log('Response', JSON.stringify(meta.response, null, 2))
  //   }
  //   console.log()
  // })

  this.waitCluster(err => {
    if (err) {
      this.log.fail(err.message)
      process.exit(1)
    }
    // Get the build hash of Elasticsearch
    client.info((err, { body }) => {
      if (err) {
        this.log.fail(err.message)
        process.exit(1)
      }
      const { number: version, build_hash: sha } = body.version

      // Set the repository to the given sha and run the test suite
      this.withSHA(sha, () => {
        this.log.succeed(`Testing ${opts.isPlatinum ? 'platinum' : 'oss'} api...`)
        runTest.call(this, version)
      })
    })
  })

  function runTest (version) {
    const files = []
      .concat(getAllFiles(yamlFolder))
      .concat(opts.isPlatinum ? getAllFiles(xPackYamlFolder) : [])
      .filter(t => !/(README|TODO)/g.test(t))

    files.forEach(runTestFile.bind(this))
    function runTestFile (file) {
      for (var i = 0; i < customSkips.length; i++) {
        if (file.endsWith(customSkips[i])) return
      }
      // create a subtest for the specific folder
      tap.test(file.slice(file.indexOf(`${sep}elasticsearch${sep}`)), { jobs: 1 }, tap1 => {
        // read the yaml file
        const data = readFileSync(file, 'utf8')
        // get the test yaml (as object), some file has multiple yaml documents inside,
        // every document is separated by '---', so we split on the separator
        // and then we remove the empty strings, finally we parse them
        const tests = data
          .split('\n---\n')
          .map(s => s.trim())
          .filter(Boolean)
          .map(parse)

        // get setup and teardown if present
        var setupTest = null
        var teardownTest = null
        tests.forEach(test => {
          if (test.setup) setupTest = test.setup
          if (test.teardown) teardownTest = test.teardown
        })

        // run the tests
        tests.forEach(test => {
          const name = Object.keys(test)[0]
          if (name === 'setup' || name === 'teardown') return
          // should skip the test inside `platinumBlackList`
          // if we are testing the platinum apis
          if (opts.isPlatinum) {
            const list = Object.keys(platinumBlackList)
            for (i = 0; i < list.length; i++) {
              const platTest = platinumBlackList[list[i]]
              for (var j = 0; j < platTest.length; j++) {
                if (file.endsWith(list[i]) && (name === platTest[j] || platTest[j] === '*')) {
                  const testName = file.slice(file.indexOf(`${sep}elasticsearch${sep}`)) + ' / ' + name
                  tap.skip(`Skipping test ${testName} because is blacklisted in the platinum test`)
                  return
                }
              }
            }
          }
          // create a subtest for the specific folder + test file + test name
          tap1.test(name, { jobs: 1, bail: this.bailout }, tap2 => {
            const testRunner = TestRunner({
              client,
              version,
              tap: tap2,
              isPlatinum: file.includes('x-pack')
            })
            testRunner.run(setupTest, test[name], teardownTest, () => tap2.end())
          })
        })

        tap1.end()
      })
    }
  }
}

/**
 * Parses a given yaml document
 * @param {string} yaml document
 * @returns {object}
 */
Runner.prototype.parse = function (data) {
  try {
    var doc = yaml.safeLoad(data)
  } catch (err) {
    this.log.fail(err.message)
    return
  }
  return doc
}

/**
 * Returns the filtered content of a given folder
 * @param {string} folder
 * @returns {Array} The content of the given folder
 */
Runner.prototype.getTest = function (folder) {
  const tests = readdirSync(folder)
  return tests.filter(t => !/(README|TODO)/g.test(t))
}

/**
 * Sets the elasticsearch repository to the given sha.
 * If the repository is not present in `esFolder` it will
 * clone the repository and the checkout the sha.
 * If the repository is already present but it cannot checkout to
 * the given sha, it will perform a pull and then try again.
 * @param {string} sha
 * @param {function} callback
 */
Runner.prototype.withSHA = function (sha, callback) {
  var fresh = false
  var retry = 0
  var log = this.log

  if (!this.pathExist(esFolder)) {
    if (!this.createFolder(esFolder)) {
      log.fail('Failed folder creation')
      return
    }
    fresh = true
  }

  const git = Git(esFolder)

  if (fresh) {
    clone(checkout)
  } else {
    checkout()
  }

  function checkout () {
    log.text = `Checking out sha '${sha}'`
    git.checkout(sha, err => {
      if (err) {
        if (retry++ > 0) {
          log.fail(`Cannot checkout sha '${sha}'`)
          return
        }
        return pull(checkout)
      }
      callback()
    })
  }

  function pull (cb) {
    log.text = 'Pulling elasticsearch repository...'
    git.pull(err => {
      if (err) {
        log.fail(err.message)
        return
      }
      cb()
    })
  }

  function clone (cb) {
    log.text = 'Cloning elasticsearch repository...'
    git.clone(esRepo, esFolder, err => {
      if (err) {
        log.fail(err.message)
        return
      }
      cb()
    })
  }
}

/**
 * Checks if the given path exists
 * @param {string} path
 * @returns {boolean} true if exists, false if not
 */
Runner.prototype.pathExist = function (path) {
  try {
    accessSync(path)
    return true
  } catch (err) {
    return false
  }
}

/**
 * Creates the given folder
 * @param {string} name
 * @returns {boolean} true on success, false on failure
 */
Runner.prototype.createFolder = function (name) {
  try {
    mkdirSync(name)
    return true
  } catch (err) {
    return false
  }
}

if (require.main === module) {
  const url = process.env.TEST_ES_SERVER || 'http://localhost:9200'
  const opts = {
    node: url,
    isPlatinum: url.indexOf('@') > -1
  }
  const runner = Runner(opts)
  runner.start(opts)
}

const getAllFiles = dir =>
  readdirSync(dir).reduce((files, file) => {
    const name = join(dir, file)
    const isDirectory = statSync(name).isDirectory()
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name]
  }, [])

module.exports = Runner
