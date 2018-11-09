'use strict'

const assert = require('assert')
const { readFileSync, accessSync, mkdirSync, readdirSync, statSync } = require('fs')
const { join, sep } = require('path')
const yaml = require('js-yaml')
const Git = require('simple-git')
const ora = require('ora')
const minimist = require('minimist')
const tap = require('tap')
const elasticsearch = require('../../index')
const TestRunner = require('./test-runner')

const esRepo = 'https://github.com/elastic/elasticsearch.git'
const esFolder = join(__dirname, '..', '..', 'elasticsearch')
const yamlFolder = join(esFolder, 'rest-api-spec', 'src', 'main', 'resources', 'rest-api-spec', 'test')
// const xPackYamlFolder = join(esFolder, 'x-pack', 'plugin', 'src', 'test', 'resources', 'rest-api-spec', 'test')

function Runner (opts) {
  if (!(this instanceof Runner)) {
    return new Runner(opts)
  }
  opts = opts || {}

  assert(opts.node, 'Missing base node')
  this.bailout = opts.bailout
  this.client = new elasticsearch.Client({
    node: opts.node
  })
  this.log = ora('Loading yaml suite').start()
}

/**
 * Runs the test suite
 */
Runner.prototype.start = function () {
  const parse = this.parse.bind(this)
  const client = this.client

  // client.on('response', (request, response) => {
  //   console.log('\n\n')
  //   console.log('REQUEST', request)
  //   console.log('\n')
  //   console.log('RESPONSE', response)
  // })

  // Get the build hash of Elasticsearch
  client.info((err, { body }) => {
    if (err) {
      this.log.fail(err.message)
      return
    }
    const { number: version, build_hash: sha } = body.version

    // Set the repository to the given sha and run the test suite
    this.withSHA(sha, () => {
      this.log.succeed('Done!')
      runTest.call(this, version)
    })

    // client.xpack.license.postStartTrial({ acknowledge: true }, (err, { body }) => {
    //   if (err) {
    //     this.log.fail(err.message)
    //     return
    //   }
    // })
  })

  function runTest (version) {
    const files = []
      .concat(getAllFiles(yamlFolder))
      // .concat(getAllFiles(xPackYamlFolder))
      .filter(t => !/(README|TODO)/g.test(t))

    files.forEach(runTestFile.bind(this))
    function runTestFile (file) {
      // create a subtest for the specific folder
      tap.test(file.slice(file.indexOf(`${sep}elasticsearch${sep}`)), { jobs: 1 }, tap1 => {
        // read the yaml file
        const data = readFileSync(file, 'utf8')
        // get the test yaml (as object), some file has multiple yaml documents inside,
        // every document is separated by '---', so we split on the separator
        // and then we remove the empty strings, finally we parse them
        const tests = data
          .split('---')
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
          // create a subtest for the specific folder + test file + test name
          tap1.test(name, { jobs: 1, bail: this.bailout }, tap2 => {
            const testRunner = TestRunner({ client, version, tap: tap2 })
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
  const opts = minimist(process.argv.slice(2), {
    string: ['node', 'version'],
    boolean: ['bailout'],
    default: {
      // node: 'http://elastic:passw0rd@localhost:9200',
      node: 'http://localhost:9200',
      version: '6.4',
      bailout: false
    }
  })

  const runner = Runner(opts)
  runner.start()
}

const getAllFiles = dir =>
  readdirSync(dir).reduce((files, file) => {
    const name = join(dir, file)
    const isDirectory = statSync(name).isDirectory()
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name]
  }, [])

module.exports = Runner
