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

process.on('unhandledRejection', function (err) {
  console.error(err)
  process.exit(1)
})

const { writeFileSync, readFileSync, accessSync, mkdirSync, readdirSync, statSync } = require('fs')
const { join, sep } = require('path')
const yaml = require('js-yaml')
const Git = require('simple-git')
const ms = require('ms')
const { Client } = require('../../index')
const build = require('./test-runner')
const { sleep } = require('./helper')
const createJunitReporter = require('./reporter')

const esRepo = 'https://github.com/elastic/elasticsearch.git'
const esFolder = join(__dirname, '..', '..', 'elasticsearch')
const yamlFolder = join(esFolder, 'rest-api-spec', 'src', 'main', 'resources', 'rest-api-spec', 'test')
const xPackYamlFolder = join(esFolder, 'x-pack', 'plugin', 'src', 'test', 'resources', 'rest-api-spec', 'test')

const MAX_API_TIME = 1000 * 90
const MAX_FILE_TIME = 1000 * 30
const MAX_TEST_TIME = 1000 * 3

const freeSkips = {
  // TODO: remove this once 'arbitrary_key' is implemented
  // https://github.com/elastic/elasticsearch/pull/41492
  'indices.split/30_copy_settings.yml': ['*'],
  // skipping because we are booting ES with `discovery.type=single-node`
  // and this test will fail because of this configuration
  'nodes.stats/30_discovery.yml': ['*'],
  // the expected error is returning a 503,
  // which triggers a retry and the node to be marked as dead
  'search.aggregation/240_max_buckets.yml': ['*'],
  // the yaml runner assumes that null means "does not exists",
  // while null is a valid json value, so the check will fail
  'search/320_disallow_queries.yml': ['Test disallow expensive queries']
}
const platinumBlackList = {
  // this two test cases are broken, we should
  // return on those in the future.
  'analytics/top_metrics.yml': [
    'sort by keyword field fails',
    'sort by string script fails'
  ],
  'cat.aliases/10_basic.yml': ['Empty cluster'],
  'index/10_with_id.yml': ['Index with ID'],
  'indices.get_alias/10_basic.yml': ['Get alias against closed indices'],
  'indices.get_alias/20_empty.yml': ['Check empty aliases when getting all aliases via /_alias'],
  'text_structure/find_structure.yml': ['*'],
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
  // The cleanup fails with a index not found when retrieving the jobs
  'ml/get_datafeed_stats.yml': ['Test get datafeed stats when total_search_time_ms mapping is missing'],
  // investigate why this is failing
  'monitoring/bulk/10_basic.yml': ['*'],
  'monitoring/bulk/20_privileges.yml': ['*'],
  'license/20_put_license.yml': ['*'],
  'snapshot/10_basic.yml': ['*'],
  'snapshot/20_operator_privileges_disabled.yml': ['*'],
  // the body is correct, but the regex is failing
  'sql/sql.yml': ['Getting textual representation'],
  // we are setting two certificates in the docker config
  'ssl/10_basic.yml': ['*'],
  // very likely, the index template has not been loaded yet.
  // we should run a indices.existsTemplate, but the name of the
  // template may vary during time.
  'transforms_crud.yml': [
    'Test basic transform crud',
    'Test transform with query and array of indices in source',
    'Test PUT continuous transform',
    'Test PUT continuous transform without delay set'
  ],
  'transforms_force_delete.yml': [
    'Test force deleting a running transform'
  ],
  'transforms_cat_apis.yml': ['*'],
  'transforms_start_stop.yml': ['*'],
  'transforms_stats.yml': ['*'],
  'transforms_stats_continuous.yml': ['*'],
  'transforms_update.yml': ['*'],
  // js does not support ulongs
  'unsigned_long/10_basic.yml': ['*'],
  'unsigned_long/20_null_value.yml': ['*'],
  'unsigned_long/30_multi_fields.yml': ['*'],
  'unsigned_long/40_different_numeric.yml': ['*'],
  'unsigned_long/50_script_values.yml': ['*'],
  // docker issue?
  'watcher/execute_watch/60_http_input.yml': ['*'],
  // the checks are correct, but for some reason the test is failing on js side
  // I bet is because the backslashes in the rg
  'watcher/execute_watch/70_invalid.yml': ['*'],
  'watcher/put_watch/10_basic.yml': ['*'],
  'xpack/15_basic.yml': ['*']
}

function runner (opts = {}) {
  const options = { node: opts.node }
  if (opts.isXPack) {
    options.ssl = {
      ca: readFileSync(join(__dirname, '..', '..', '.ci', 'certs', 'ca.crt'), 'utf8'),
      rejectUnauthorized: false
    }
  }
  const client = new Client(options)
  log('Loading yaml suite')
  start({ client, isXPack: opts.isXPack })
    .catch(console.log)
}

async function waitCluster (client, times = 0) {
  try {
    await client.cluster.health({ waitForStatus: 'green', timeout: '50s' })
  } catch (err) {
    if (++times < 10) {
      await sleep(5000)
      return waitCluster(client, times)
    }
    console.error(err)
    process.exit(1)
  }
}

async function start ({ client, isXPack }) {
  log('Waiting for Elasticsearch')
  await waitCluster(client)

  const { body } = await client.info()
  const { number: version, build_hash: sha } = body.version

  log(`Checking out sha ${sha}...`)
  await withSHA(sha)

  log(`Testing ${isXPack ? 'Platinum' : 'Free'} api...`)
  const junit = createJunitReporter()
  const junitTestSuites = junit.testsuites(`Integration test for ${isXPack ? 'Platinum' : 'Free'} api`)

  const stats = {
    total: 0,
    skip: 0,
    pass: 0,
    assertions: 0
  }
  const folders = getAllFiles(isXPack ? xPackYamlFolder : yamlFolder)
    .filter(t => !/(README|TODO)/g.test(t))
    // we cluster the array based on the folder names,
    // to provide a better test log output
    .reduce((arr, file) => {
      const path = file.slice(file.indexOf('/rest-api-spec/test'), file.lastIndexOf('/'))
      let inserted = false
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][0].includes(path)) {
          inserted = true
          arr[i].push(file)
          break
        }
      }
      if (!inserted) arr.push([file])
      return arr
    }, [])

  const totalTime = now()
  for (const folder of folders) {
    // pretty name
    const apiName = folder[0].slice(
      folder[0].indexOf(`${sep}rest-api-spec${sep}test`) + 19,
      folder[0].lastIndexOf(sep)
    )

    log('Testing ' + apiName.slice(1))
    const apiTime = now()

    for (const file of folder) {
      const testRunner = build({
        client,
        version,
        isXPack: file.includes('x-pack')
      })
      const fileTime = now()
      const data = readFileSync(file, 'utf8')
      // get the test yaml (as object), some file has multiple yaml documents inside,
      // every document is separated by '---', so we split on the separator
      // and then we remove the empty strings, finally we parse them
      const tests = data
        .split('\n---\n')
        .map(s => s.trim())
        // empty strings
        .filter(Boolean)
        .map(parse)
        // null values
        .filter(Boolean)

      // get setup and teardown if present
      let setupTest = null
      let teardownTest = null
      for (const test of tests) {
        if (test.setup) setupTest = test.setup
        if (test.teardown) teardownTest = test.teardown
      }

      const cleanPath = file.slice(file.lastIndexOf(apiName))
      log('    ' + cleanPath)
      const junitTestSuite = junitTestSuites.testsuite(apiName.slice(1) + ' - ' + cleanPath)

      for (const test of tests) {
        const testTime = now()
        const name = Object.keys(test)[0]
        if (name === 'setup' || name === 'teardown') continue
        const junitTestCase = junitTestSuite.testcase(name)

        stats.total += 1
        if (shouldSkip(isXPack, file, name)) {
          stats.skip += 1
          junitTestCase.skip('This test is in the skip list of the client')
          junitTestCase.end()
          continue
        }
        log('        - ' + name)
        try {
          await testRunner.run(setupTest, test[name], teardownTest, stats, junitTestCase)
          stats.pass += 1
        } catch (err) {
          junitTestCase.failure(err)
          junitTestCase.end()
          junitTestSuite.end()
          junitTestSuites.end()
          generateJunitXmlReport(junit, isXPack ? 'platinum' : 'free')
          console.error(err)
          process.exit(1)
        }
        const totalTestTime = now() - testTime
        junitTestCase.end()
        if (totalTestTime > MAX_TEST_TIME) {
          log('          took too long: ' + ms(totalTestTime))
        } else {
          log('          took: ' + ms(totalTestTime))
        }
      }
      junitTestSuite.end()
      const totalFileTime = now() - fileTime
      if (totalFileTime > MAX_FILE_TIME) {
        log(`    ${cleanPath} took too long: ` + ms(totalFileTime))
      } else {
        log(`    ${cleanPath} took: ` + ms(totalFileTime))
      }
    }
    const totalApiTime = now() - apiTime
    if (totalApiTime > MAX_API_TIME) {
      log(`${apiName} took too long: ` + ms(totalApiTime))
    } else {
      log(`${apiName} took: ` + ms(totalApiTime))
    }
  }
  junitTestSuites.end()
  generateJunitXmlReport(junit, isXPack ? 'platinum' : 'free')
  log(`Total testing time: ${ms(now() - totalTime)}`)
  log(`Test stats:
  - Total: ${stats.total}
  - Skip: ${stats.skip}
  - Pass: ${stats.pass}
  - Assertions: ${stats.assertions}
  `)
}

function log (text) {
  process.stdout.write(text + '\n')
}

function now () {
  const ts = process.hrtime()
  return (ts[0] * 1e3) + (ts[1] / 1e6)
}

function parse (data) {
  const schema = yaml.Schema.create(yaml.CORE_SCHEMA, [])
  let doc
  try {
    doc = yaml.safeLoad(data, { schema })
  } catch (err) {
    console.error(err)
    return
  }
  return doc
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
function withSHA (sha) {
  return new Promise((resolve, reject) => {
    _withSHA(err => err ? reject(err) : resolve())
  })

  function _withSHA (callback) {
    let fresh = false
    let retry = 0

    if (!pathExist(esFolder)) {
      if (!createFolder(esFolder)) {
        return callback(new Error('Failed folder creation'))
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
      log(`Checking out sha '${sha}'`)
      git.checkout(sha, err => {
        if (err) {
          if (retry++ > 0) {
            return callback(err)
          }
          return pull(checkout)
        }
        callback()
      })
    }

    function pull (cb) {
      log('Pulling elasticsearch repository...')
      git.pull(err => {
        if (err) {
          return callback(err)
        }
        cb()
      })
    }

    function clone (cb) {
      log('Cloning elasticsearch repository...')
      git.clone(esRepo, esFolder, err => {
        if (err) {
          return callback(err)
        }
        cb()
      })
    }
  }
}

/**
 * Checks if the given path exists
 * @param {string} path
 * @returns {boolean} true if exists, false if not
 */
function pathExist (path) {
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
function createFolder (name) {
  try {
    mkdirSync(name)
    return true
  } catch (err) {
    return false
  }
}

function generateJunitXmlReport (junit, suite) {
  writeFileSync(
    join(__dirname, '..', '..', `${suite}-report-junit.xml`),
    junit.prettyPrint()
  )
}

if (require.main === module) {
  const node = process.env.TEST_ES_SERVER || 'http://localhost:9200'
  const opts = {
    node,
    isXPack: node.indexOf('@') > -1
  }
  runner(opts)
}

const shouldSkip = (isXPack, file, name) => {
  let list = Object.keys(freeSkips)
  for (let i = 0; i < list.length; i++) {
    const freeTest = freeSkips[list[i]]
    for (let j = 0; j < freeTest.length; j++) {
      if (file.endsWith(list[i]) && (name === freeTest[j] || freeTest[j] === '*')) {
        const testName = file.slice(file.indexOf(`${sep}elasticsearch${sep}`)) + ' / ' + name
        log(`Skipping test ${testName} because is blacklisted in the free test`)
        return true
      }
    }
  }

  if (file.includes('x-pack') || isXPack) {
    list = Object.keys(platinumBlackList)
    for (let i = 0; i < list.length; i++) {
      const platTest = platinumBlackList[list[i]]
      for (let j = 0; j < platTest.length; j++) {
        if (file.endsWith(list[i]) && (name === platTest[j] || platTest[j] === '*')) {
          const testName = file.slice(file.indexOf(`${sep}elasticsearch${sep}`)) + ' / ' + name
          log(`Skipping test ${testName} because is blacklisted in the platinum test`)
          return true
        }
      }
    }
  }

  return false
}

const getAllFiles = dir =>
  readdirSync(dir).reduce((files, file) => {
    const name = join(dir, file)
    const isDirectory = statSync(name).isDirectory()
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name]
  }, [])

module.exports = runner
