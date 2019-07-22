// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { readFileSync, accessSync, mkdirSync, readdirSync, statSync } = require('fs')
const { join, sep } = require('path')
const yaml = require('js-yaml')
const Git = require('simple-git')
const tap = require('tap')
const { Client } = require('../../index')
const TestRunner = require('./test-runner')
const { sleep } = require('./helper')

const esRepo = 'https://github.com/elastic/elasticsearch.git'
const esFolder = join(__dirname, '..', '..', 'elasticsearch')
const yamlFolder = join(esFolder, 'rest-api-spec', 'src', 'main', 'resources', 'rest-api-spec', 'test')
const xPackYamlFolder = join(esFolder, 'x-pack', 'plugin', 'src', 'test', 'resources', 'rest-api-spec', 'test')

const ossSkips = {
  // TODO: remove this once 'arbitrary_key' is implemented
  // https://github.com/elastic/elasticsearch/pull/41492
  'indices.split/30_copy_settings.yml': ['*'],
  // skipping because we are booting ES with `discovery.type=single-node`
  // and this test will fail because of this configuration
  'nodes.stats/30_discovery.yml': ['*'],
  // the expected error is returning a 503,
  // which triggers a retry and the node to be marked as dead
  'search.aggregation/240_max_buckets.yml': ['*']
}
const xPackBlackList = {
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

class Runner {
  constructor (opts = {}) {
    const options = { node: opts.node }
    if (opts.isXPack) {
      options.ssl = {
        ca: readFileSync(join(__dirname, '..', '..', '.ci', 'certs', 'ca.crt'), 'utf8'),
        rejectUnauthorized: false
      }
    }
    this.client = new Client(options)
    console.log('Loading yaml suite')
  }

  async waitCluster (client, times = 0) {
    try {
      await client.cluster.health({ waitForStatus: 'green', timeout: '50s' })
    } catch (err) {
      if (++times < 10) {
        await sleep(5000)
        return this.waitCluster(client, times)
      }
      console.error(err)
      process.exit(1)
    }
  }

  async start ({ isXPack }) {
    const { client } = this
    const parse = this.parse.bind(this)

    console.log('Waiting for Elasticsearch')
    await this.waitCluster(client)

    const { body } = await client.info()
    const { number: version, build_hash: sha } = body.version

    console.log(`Checking out sha ${sha}...`)
    await this.withSHA(sha)

    console.log(`Testing ${isXPack ? 'XPack' : 'oss'} api...`)

    const folders = []
      .concat(getAllFiles(yamlFolder))
      .concat(isXPack ? getAllFiles(xPackYamlFolder) : [])
      .filter(t => !/(README|TODO)/g.test(t))
      // we cluster the array based on the folder names,
      // to provide a better test log output
      .reduce((arr, file) => {
        const path = file.slice(file.indexOf('/rest-api-spec/test'), file.lastIndexOf('/'))
        var inserted = false
        for (var i = 0; i < arr.length; i++) {
          if (arr[i][0].includes(path)) {
            inserted = true
            arr[i].push(file)
            break
          }
        }
        if (!inserted) arr.push([file])
        return arr
      }, [])

    for (const folder of folders) {
      // pretty name
      const apiName = folder[0].slice(
        folder[0].indexOf(`${sep}rest-api-spec${sep}test`) + 19,
        folder[0].lastIndexOf(sep)
      )

      tap.test(`Testing ${apiName}`, { bail: true, timeout: 0 }, t => {
        for (const file of folder) {
          const data = readFileSync(file, 'utf8')
          // get the test yaml (as object), some file has multiple yaml documents inside,
          // every document is separated by '---', so we split on the separator
          // and then we remove the empty strings, finally we parse them
          const tests = data
            .split('\n---\n')
            .map(s => s.trim())
            .filter(Boolean)
            .map(parse)

          t.test(
            file.slice(file.lastIndexOf(apiName)),
            testFile(file, tests)
          )
        }
        t.end()
      })
    }

    function testFile (file, tests) {
      return t => {
        // get setup and teardown if present
        var setupTest = null
        var teardownTest = null
        for (const test of tests) {
          if (test.setup) setupTest = test.setup
          if (test.teardown) teardownTest = test.teardown
        }

        tests.forEach(test => {
          const name = Object.keys(test)[0]
          if (name === 'setup' || name === 'teardown') return
          if (shouldSkip(t, isXPack, file, name)) return

          // create a subtest for the specific folder + test file + test name
          t.test(name, async t => {
            const testRunner = new TestRunner({
              client,
              version,
              tap: t,
              isXPack: file.includes('x-pack')
            })
            await testRunner.run(setupTest, test[name], teardownTest)
          })
        })
        t.end()
      }
    }
  }

  parse (data) {
    try {
      var doc = yaml.safeLoad(data)
    } catch (err) {
      console.error(err)
      return
    }
    return doc
  }

  getTest (folder) {
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
  withSHA (sha) {
    return new Promise((resolve, reject) => {
      _withSHA.call(this, err => err ? reject(err) : resolve())
    })

    function _withSHA (callback) {
      var fresh = false
      var retry = 0

      if (!this.pathExist(esFolder)) {
        if (!this.createFolder(esFolder)) {
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
        console.log(`Checking out sha '${sha}'`)
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
        console.log('Pulling elasticsearch repository...')
        git.pull(err => {
          if (err) {
            return callback(err)
          }
          cb()
        })
      }

      function clone (cb) {
        console.log('Cloning elasticsearch repository...')
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
  pathExist (path) {
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
  createFolder (name) {
    try {
      mkdirSync(name)
      return true
    } catch (err) {
      return false
    }
  }
}

if (require.main === module) {
  const node = process.env.TEST_ES_SERVER || 'http://localhost:9200'
  const opts = {
    node,
    isXPack: node.indexOf('@') > -1
  }
  const runner = new Runner(opts)
  runner.start(opts).catch(console.log)
}

const shouldSkip = (t, isXPack, file, name) => {
  var list = Object.keys(ossSkips)
  for (var i = 0; i < list.length; i++) {
    const ossTest = ossSkips[list[i]]
    for (var j = 0; j < ossTest.length; j++) {
      if (file.endsWith(list[i]) && (name === ossTest[j] || ossTest[j] === '*')) {
        const testName = file.slice(file.indexOf(`${sep}elasticsearch${sep}`)) + ' / ' + name
        t.comment(`Skipping test ${testName} because is blacklisted in the oss test`)
        return true
      }
    }
  }

  if (file.includes('x-pack') || isXPack) {
    list = Object.keys(xPackBlackList)
    for (i = 0; i < list.length; i++) {
      const platTest = xPackBlackList[list[i]]
      for (j = 0; j < platTest.length; j++) {
        if (file.endsWith(list[i]) && (name === platTest[j] || platTest[j] === '*')) {
          const testName = file.slice(file.indexOf(`${sep}elasticsearch${sep}`)) + ' / ' + name
          t.comment(`Skipping test ${testName} because is blacklisted in the XPack test`)
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

module.exports = Runner
