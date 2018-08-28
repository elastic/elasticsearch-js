'use strict'

const assert = require('assert')
const { readFileSync, accessSync, mkdirSync, readdirSync } = require('fs')
const { join } = require('path')
const yaml = require('js-yaml')
const Git = require('simple-git')
const ora = require('ora')
const workq = require('workq')
const elasticsearch = require('../../../src/elasticsearch')

const esRepo = 'https://github.com/elastic/elasticsearch.git'
const esFolder = join(__dirname, 'yaml')
const yamlFolder = join(esFolder, 'rest-api-spec', 'src', 'main', 'resources', 'rest-api-spec', 'test')

function Runner (opts) {
  if (!(this instanceof Runner)) {
    return new Runner(opts)
  }
  opts = opts || {}

  assert(opts.url, 'Missing url')
  this.client = new elasticsearch.Client({ host: opts.url })
  this.log = ora('Loading yaml suite').start()
  this.q = workq()
}

/**
 * Runs the test suite
 */
Runner.prototype.start = function () {
  const getTest = this.getTest.bind(this)
  const parse = this.parse.bind(this)
  // Get the build hash of Elasticsearch
  this.client.info((err, response, status) => {
    if (err) {
      this.log.fail(err.message)
      return
    }
    const sha = response.version.build_hash
    // Set the repository to the given sha and run the test suite
    this.withSHA(sha, () => runTest.call(this))
  })

  function runTest () {
    this.q.drain(done => {
      this.log.succeed('Done!')
      done()
    })

    const testFolders = getTest()
    testFolders.forEach(testFolder => this.q.add(folderWorker, testFolder))

    // run the tests of the given folder
    function folderWorker (q, testFolder, done) {
      const files = getTest(testFolder)
      files.forEach(file => {
        // get the file path
        const path = join(yamlFolder, testFolder, file)
        // read the yaml file
        const data = readFileSync(path, 'utf8')
        // get the test yaml, some file has multiple yaml documents inside,
        // every document is separated by '---', so we split on it
        // and then we remove the empty strings
        const yamlDocuments = data.split('---').filter(Boolean)
        // Run every test separately
        yamlDocuments.forEach(yamlDocument => q.add(testWorker, yamlDocument))
      })
      done()
    }

    function testWorker (q, yamlDocument, done) {
      // parse the yaml configuration
      const conf = parse(yamlDocument)
      console.log(conf)
      done()
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
 * Returns the content of the `yamlFolder`.
 * If a folder name is given as parameter, it will return
 * the content of join(yamlFolder, folder)
 * @param {string} folder
 * @returns {Array} The content of the given folder
 */
Runner.prototype.getTest = function (folder) {
  const tests = readdirSync(join(yamlFolder, folder || ''))
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

module.exports = Runner
