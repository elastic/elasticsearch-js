'use strict'

const t = require('tap')
const delve = require('dlv')

function TestRunner (opts) {
  if (!(this instanceof TestRunner)) {
    return new TestRunner(opts)
  }
  opts = opts || {}

  this.client = opts.client
  this.response = null
  this.stash = new Map()
  this.tap = t
}

/**
 * Creates a new context to run the test as subtest
 * @param {string} the name of the test
 * @params {function} a callback that takes and `end` function as parameter
 */
TestRunner.prototype.context = function (name, cb) {
  t.test(name, tap => {
    this.tap = tap

    function end (q, done) {
      this.tap.comment('Cleanup')

      this.response = null
      this.stash = new Map()

      q.add((q, done) => {
        this.client.indices.delete({ index: '*', ignore: 404 }, err => {
          this.tap.error(err, 'should not error: indices.delete')
          done()
        })
      })

      q.add((q, done) => {
        this.client.indices.deleteTemplate({ name: '*', ignore: 404 }, err => {
          this.tap.error(err, 'should not error: indices.deleteTemplate')
          done()
        })
      })

      q.add((q, done) => {
        this.tap.end()
        this.tap = t
        done()
      })

      done()
    }

    cb(end.bind(this))
  })
}

/**
 * Runs the test setup
 * @param {array} the actions to perform
 * @param {Queue}
 */
TestRunner.prototype.setup = function (actions, q) {
  this.tap.comment('Setup')
  actions.forEach(action => {
    if (action.do) {
      this.do(action.do, q)
    }
  })
}

/**
 * Runs the test teardown
 * @param {array} the actions to perform
 * @param {Queue}
 */
TestRunner.prototype.teardown = function (actions, q) {
  this.tap.comment('Teardown')
  q.add((q, done) => done())
}

/**
 * Stashes a value
 * @param {string} the value name
 * @param {any} the actual value
 */
TestRunner.prototype.set = function (key, val) {
  this.stash.set(key, val)
  return this
}

/**
 * Runs a client command
 * @param {object} the action to perform
 * @param {Queue}
 */
TestRunner.prototype.do = function (action, q) {
  q.add((q, done) => {
    const cmd = this.parseDo(action)
    delve(this.client, cmd.method).call(this.client, cmd.params, (err, body, status) => {
      this.tap.error(err, `should not error: ${cmd.method}`)
      this.response = body
      done()
    })
  })
}

/**
 * Runs an actual test
 * @param {string} the name of the test
 * @param {object} the actions to perform
 * @param {Queue}
 */
TestRunner.prototype.exec = function (name, actions, q) {
  this.tap.comment(name)
  actions.forEach(action => {
    if (action.do) {
      this.do(action.do, q)
    }

    if (action.is_true) {
      q.add((q, done) => {
        this.is_true(
          delve(this.response, action.is_true),
          action.is_true
        )
        done()
      })
    }

    if (action.is_false) {
      q.add((q, done) => {
        this.is_false(
          delve(this.response, action.is_false),
          action.is_false
        )
        done()
      })
    }
  })
}

/**
 * Asserts that the given value is truthy
 * @param {any} the value to check
 * @param {string} an optional message
 */
TestRunner.prototype.is_true = function (val, msg) {
  this.tap.true(val, `expect truthy value: ${msg}`)
  return this
}

/**
 * Asserts that the given value is falsey
 * @param {any} the value to check
 * @param {string} an optional message
 */
TestRunner.prototype.is_false = function (val, msg) {
  this.tap.false(val, `expect falsey value: ${msg}`)
  return this
}

/**
 * Gets a `do` action object and returns a structured object,
 * where the action is the key and the parameter is the value.
 * Eg:
 *   {
 *     'indices.create': {
 *       'index': 'test'
 *     },
 *     'warnings': [
 *       '[index] is deprecated'
 *     ]
 *   }
 * becomes
 *   {
 *     method: 'indices.create',
 *     params: {
 *       index: 'test'
 *     },
 *     warnings: [
 *       '[index] is deprecated'
 *     ]
 *   }
 * @params {object}
 * @returns {object}
 */
TestRunner.prototype.parseDo = function (action) {
  return Object.keys(action).reduce((acc, val) => {
    switch (val) {
      case 'catch':
        acc.catch = action.catch
        break
      case 'warnings':
        acc.warnings = action.warnings
        break
      case 'node_selector':
        acc.node_selector = action.node_selector
        break
      default:
        acc.method = val
        acc.params = action[val]
    }
    return acc
  }, {})
}

module.exports = TestRunner
