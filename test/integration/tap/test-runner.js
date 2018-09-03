'use strict'

const t = require('tap')
const delve = require('dlv')
const semver = require('semver')

function TestRunner (opts) {
  if (!(this instanceof TestRunner)) {
    return new TestRunner(opts)
  }
  opts = opts || {}

  this.client = opts.client
  this.esVersion = opts.version
  this.response = null
  this.stash = new Map()
  this.tap = t
}

/**
 * Creates a new context to run the test as subtest
 * @param {string} the name of the test
 * @param {function} a callback that takes and `end` function as parameter
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
  this.exec('Setup', actions, q)
}

/**
 * Runs the test teardown
 * @param {array} the actions to perform
 * @param {Queue}
 */
TestRunner.prototype.teardown = function (actions, q) {
  this.exec('Teardown', actions, q)
}

/**
 * Logs a skip
 * @param {object} the actions
 * @returns {TestRunner}
 */
TestRunner.prototype.skip = function (action) {
  if (action.reason && action.version) {
    this.tap.skip(`Skip: ${action.reason} (${action.version})`)
  // } else if (...) { // other reasons
  } else {
    this.tap.skip('Skipped')
  }
  return this
}

/**
 * Decides if a test should be skipped
 * @param {object} the actions
 * @returns {boolean}
 */
TestRunner.prototype.shouldSkip = function (action) {
  // skip based on the version
  if (action.version) {
    const [min, max] = action.version.split(' - ')
    // if both `min` and `max` are specified
    if (min && max) {
      return semver.satisfies(this.esVersion, action.version)
    // if only `min` is specified
    } else if (min) {
      return semver.gte(this.esVersion, min)
    // if only `max` is specified
    } else if (max) {
      return semver.lte(this.esVersion, max)
    // something went wrong!
    } else {
      throw new Error(`skip: Bad version range: ${action.version}`)
    }
  }
  return false
}

/**
 * Updates the array syntax of keys and values
 * eg: 'hits.hits.1.stuff' to 'hits.hits[1].stuff'
 * @param {object} the action to update
 * @returns {obj} the updated action
 */
TestRunner.prototype.updateArraySyntax = function (obj) {
  const newObj = {}

  for (const key in obj) {
    const newKey = key.replace(/\.\d{1,}\./g, v => `[${v.slice(1, -1)}].`)
    const val = obj[key]

    if (typeof val === 'string') {
      newObj[newKey] = val.replace(/\.\d{1,}\./g, v => `[${v.slice(1, -1)}].`)
    } else if (val !== null && typeof val === 'object') {
      newObj[newKey] = this.updateArraySyntax(val)
    } else {
      newObj[newKey] = val
    }
  }

  return newObj
}

/**
 * Fill the stashed values of a command
 * let's say the we have stashed the `master` value,
 *    is_true: nodes.$master.transport.profiles
 * becomes
 *    is_true: nodes.new_value.transport.profiles
 * @param {object} the action to update
 * @returns {object} the updated action
 */
TestRunner.prototype.fillStashedValues = function (obj) {
  // iterate every key of the object
  for (const key in obj) {
    const val = obj[key]
    // if the key value is a string, and the string includes '$'
    // we run the "update value" code
    if (typeof val === 'string' && val.includes('$')) {
      const parts = val
        // we split the string on the dots
        .split('.')
        // we update every field that start with '$'
        .map(part => {
          if (part[0] === '$') {
            const stashed = this.stash.get(part.slice(1))
            if (stashed == null) {
              throw new Error(`Cannot find stashed value '${part}'`)
            }
            return stashed
          }
          return part
        })
        // recreate the string value
        .join('.')

      // update the key value
      obj[key] = parts
    }

    // go deep in the object
    if (val !== null && typeof val === 'object') {
      this.fillStashedValues(val)
    }
  }

  return obj
}

/**
 * Stashes a value
 * @param {string} the key to search in the previous response
 * @param {string} the name to identify the stashed value
 * @returns {TestRunner}
 */
TestRunner.prototype.set = function (key, name) {
  this.stash.set(name, delve(this.response, key))
  return this
}

/**
 * Runs a client command
 * TODO: handle `action.warning`, `action.catch`...
 * @param {object} the action to perform
 * @param {Queue}
 */
TestRunner.prototype.do = function (action, done) {
  const cmd = this.parseDo(action)
  delve(this.client, cmd.method).call(this.client, cmd.params, (err, body, status) => {
    if (action.catch) {
      this.tap.true(
        parseDoError(err, action.catch),
        `the error should be: ${action.catch}`
      )
      this.response = err.response
    } else {
      this.tap.error(err, `should not error: ${cmd.method}`)
      this.response = body
    }

    if (action.warning) {
      this.tap.todo('Handle warnings')
    }

    done()
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
  for (var i = 0; i < actions.length; i++) {
    const action = this.fillStashedValues(actions[i])

    if (action.skip) {
      if (this.shouldSkip(action.skip)) {
        this.skip(action.skip)
        break
      }
    }

    if (action.do) {
      q.add((q, done) => {
        this.do(action.do, done)
      })
    }

    if (action.set) {
      q.add((q, done) => {
        const key = Object.keys(action.set)[0]
        this.set(key, action.set[key])
        done()
      })
    }

    if (action.match) {
      q.add((q, done) => {
        const key = Object.keys(action.match)[0]
        this.match(
          delve(this.response, key),
          action.match[key]
        )
        done()
      })
    }

    if (action.lt) {
      q.add((q, done) => {
        const key = Object.keys(action.lt)[0]
        this.lt(
          delve(this.response, key),
          action.lt[key]
        )
        done()
      })
    }

    if (action.gt) {
      q.add((q, done) => {
        const key = Object.keys(action.gt)[0]
        this.gt(
          delve(this.response, key),
          action.gt[key]
        )
        done()
      })
    }

    if (action.lte) {
      q.add((q, done) => {
        const key = Object.keys(action.lte)[0]
        this.lte(
          delve(this.response, key),
          action.lte[key]
        )
        done()
      })
    }

    if (action.gte) {
      q.add((q, done) => {
        const key = Object.keys(action.gte)[0]
        this.gte(
          delve(this.response, key),
          action.gte[key]
        )
        done()
      })
    }

    if (action.length) {
      q.add((q, done) => {
        const key = Object.keys(action.length)[0]
        this.length(
          delve(this.response, key),
          action.length[key]
        )
        done()
      })
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
  }
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
 * Asserts that two values are the same
 * TODO: handle regular expressions
 * @param {any} the first value
 * @param {any} the second value
 * @returns {TestRunner}
 */
TestRunner.prototype.match = function (val1, val2) {
  if (typeof val1 === 'object' && typeof val2 === 'object') {
    this.tap.strictDeepEqual(val1, val2)
  } else {
    this.tap.strictEqual(val1, val2)
  }
  return this
}

/**
 * Asserts that the first value is less than the second
 * It also verifies that the two values are numbers
 * @param {any} the first value
 * @param {any} the second value
 * @returns {TestRunner}
 */
TestRunner.prototype.lt = function (val1, val2) {
  this.tap.type(val1, 'number')
  this.tap.type(val2, 'number')
  this.tap.true(val1 < val2)
  return this
}

/**
 * Asserts that the first value is greater than the second
 * It also verifies that the two values are numbers
 * @param {any} the first value
 * @param {any} the second value
 * @returns {TestRunner}
 */
TestRunner.prototype.gt = function (val1, val2) {
  this.tap.type(val1, 'number')
  this.tap.type(val2, 'number')
  this.tap.true(val1 > val2)
  return this
}

/**
 * Asserts that the first value is less than or equal the second
 * It also verifies that the two values are numbers
 * @param {any} the first value
 * @param {any} the second value
 * @returns {TestRunner}
 */
TestRunner.prototype.lte = function (val1, val2) {
  this.tap.type(val1, 'number')
  this.tap.type(val2, 'number')
  this.tap.true(val1 <= val2)
  return this
}

/**
 * Asserts that the first value is greater than or equal the second
 * It also verifies that the two values are numbers
 * @param {any} the first value
 * @param {any} the second value
 * @returns {TestRunner}
*/
TestRunner.prototype.gte = function (val1, val2) {
  this.tap.type(val1, 'number')
  this.tap.type(val2, 'number')
  this.tap.true(val1 >= val2)
  return this
}

/**
 * Asserts that the given value has the specified length
 * @param {string|object|array} the object to check
 * @param {number} the expected length
 * @returns {TestRunner}
 */
TestRunner.prototype.length = function (val, len) {
  if (typeof val === 'string' || Array.isArray(val)) {
    this.tap.strictEqual(val.length, len)
  } else if (typeof val === 'object' && val !== null) {
    this.tap.strictEqual(Object.keys(val).length, len)
  } else {
    this.tap.fail(`length: the given value is invalid: ${val}`)
  }
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
 * @param {object}
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
        // converts underscore to camelCase
        // eg: put_mapping => putMapping
        acc.method = val.replace(/_([a-z])/g, g => g[1].toUpperCase())
        acc.params = action[val]
    }
    return acc
  }, {})
}

function parseDoError (err, spec) {
  const httpErrors = {
    bad_request: 400,
    unauthorized: 401,
    forbidden: 403,
    missing: 404,
    request_timeout: 408,
    conflict: 409,
    unavailable: 503
  }

  if (httpErrors[spec]) {
    return err.statusCode === httpErrors[spec]
  }

  if (spec === 'request') {
    return err.statusCode >= 400 && err.statusCode < 600
  }

  if (spec.startsWith('/') && spec.endsWith('/')) {
    return new RegExp(spec.slice(1, -1), 'g').test(err.message)
  }

  if (spec === 'param') {
    return err instanceof TypeError
  }
}

module.exports = TestRunner
