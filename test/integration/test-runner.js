'use strict'

const t = require('tap')
const semver = require('semver')
const workq = require('workq')
const helper = require('./helper')
const { ConfigurationError } = require('../../lib/errors')

const { delve } = helper

const supportedFeatures = [
  'gtelte',
  'regex',
  'benchmark',
  'stash_in_path',
  'groovy_scripting',
  'headers',
  'transform_and_set',
  'catch_unauthorized'
]

function TestRunner (opts) {
  if (!(this instanceof TestRunner)) {
    return new TestRunner(opts)
  }
  opts = opts || {}

  this.client = opts.client
  this.esVersion = opts.version
  this.response = null
  this.stash = new Map()
  this.tap = opts.tap || t
  this.isPlatinum = opts.isPlatinum
  this.q = opts.q || workq()
}

/**
 * Runs a cleanup, removes all indices and templates
 * @param {queue}
 * @param {function} done
 */
TestRunner.prototype.cleanup = function (q, done) {
  this.tap.comment('Cleanup')

  this.response = null
  this.stash = new Map()

  q.add((q, done) => {
    this.client.indices.delete({ index: '*' }, { ignore: 404 }, err => {
      this.tap.error(err, 'should not error: indices.delete')
      done()
    })
  })

  q.add((q, done) => {
    this.client.indices.deleteTemplate({ name: '*' }, { ignore: 404 }, err => {
      this.tap.error(err, 'should not error: indices.deleteTemplate')
      done()
    })
  })

  q.add((q, done) => {
    this.client.snapshot.delete({ repository: '*', snapshot: '*' }, { ignore: 404 }, err => {
      this.tap.error(err, 'should not error: snapshot.delete')
      done()
    })
  })

  q.add((q, done) => {
    this.client.snapshot.deleteRepository({ repository: '*' }, { ignore: 404 }, err => {
      this.tap.error(err, 'should not error: snapshot.deleteRepository')
      done()
    })
  })

  done()
}

/**
 * Runs some additional API calls to prepare ES for the Platinum test,
 * This set of calls should be executed before the final clenup.
 * @param {queue}
 * @param {function} done
 */
TestRunner.prototype.cleanupPlatinum = function (q, done) {
  this.tap.comment('Platinum Cleanup')

  q.add((q, done) => {
    this.client.security.getRole((err, { body }) => {
      this.tap.error(err, 'should not error: security.getRole')
      const roles = Object.keys(body).filter(n => helper.esDefaultRoles.indexOf(n) === -1)
      helper.runInParallel(
        this.client, 'security.deleteRole',
        roles.map(r => ({ name: r, refresh: 'wait_for' }))
      )
        .then(() => done())
        .catch(err => this.tap.error(err, 'should not error: security.deleteRole'))
    })
  })

  q.add((q, done) => {
    this.client.security.getUser((err, { body }) => {
      this.tap.error(err, 'should not error: security.getUser')
      const users = Object.keys(body).filter(n => helper.esDefaultUsers.indexOf(n) === -1)
      helper.runInParallel(
        this.client, 'security.deleteUser',
        users.map(r => ({ username: r, refresh: 'wait_for' }))
      )
        .then(() => done())
        .catch(err => this.tap.error(err, 'should not error: security.deleteUser'))
    })
  })

  q.add((q, done) => {
    this.client.security.getPrivileges((err, { body }) => {
      this.tap.error(err, 'should not error: security.getPrivileges')
      const privileges = []
      Object.keys(body).forEach(app => {
        Object.keys(body[app]).forEach(priv => {
          privileges.push({
            name: body[app][priv].name,
            application: body[app][priv].application,
            refresh: 'wait_for'
          })
        })
      })
      helper.runInParallel(this.client, 'security.deletePrivileges', privileges)
        .then(() => done())
        .catch(err => this.tap.error(err, 'should not error: security.deletePrivileges'))
    })
  })

  q.add((q, done) => {
    this.client.ml.stopDatafeed({ datafeedId: '*', force: true }, err => {
      this.tap.error(err, 'should not error: ml.stopDatafeed')
      this.client.ml.getDatafeeds({ datafeedId: '*' }, (err, { body }) => {
        this.tap.error(err, 'should error: not ml.getDatafeeds')
        const feeds = body.datafeeds.map(f => f.datafeed_id)
        helper.runInParallel(
          this.client, 'ml.deleteDatafeed',
          feeds.map(f => ({ datafeedId: f }))
        )
          .then(() => done())
          .catch(err => this.tap.error(err, 'should not error: ml.deleteDatafeed'))
      })
    })
  })

  q.add((q, done) => {
    this.client.ml.closeJob({ jobId: '*', force: true }, err => {
      this.tap.error(err, 'should not error: ml.closeJob')
      this.client.ml.getJobs({ jobId: '*' }, (err, { body }) => {
        this.tap.error(err, 'should not error: ml.getJobs')
        const jobs = body.jobs.map(j => j.job_id)
        helper.runInParallel(
          this.client, 'ml.deleteJob',
          jobs.map(j => ({ jobId: j, waitForCompletion: true, force: true }))
        )
          .then(() => done())
          .catch(err => this.tap.error(err, 'should not error: ml.deleteJob'))
      })
    })
  })

  q.add((q, done) => {
    this.client.xpack.rollup.getJobs({ id: '_all' }, (err, { body }) => {
      this.tap.error(err, 'should not error: rollup.getJobs')
      const jobs = body.jobs.map(j => j.config.id)
      helper.runInParallel(
        this.client, 'xpack.rollup.stopJob',
        jobs.map(j => ({ id: j, waitForCompletion: true }))
      )
        .then(() => helper.runInParallel(
          this.client, 'xpack.rollup.deleteJob',
          jobs.map(j => ({ id: j }))
        ))
        .then(() => done())
        .catch(err => this.tap.error(err, 'should not error: rollup.stopJob/deleteJob'))
    })
  })

  q.add((q, done) => {
    this.client.tasks.list((err, { body }) => {
      this.tap.error(err, 'should not error: tasks.list')
      const tasks = Object.keys(body.nodes)
        .reduce((acc, node) => {
          const { tasks } = body.nodes[node]
          Object.keys(tasks).forEach(id => {
            if (tasks[id].cancellable) acc.push(id)
          })
          return acc
        }, [])

      helper.runInParallel(
        this.client, 'tasks.cancel',
        tasks.map(id => ({ taskId: id }))
      )
        .then(() => done())
        .catch(err => this.tap.error(err, 'should not error: tasks.cancel'))
    })
  })

  q.add((q, done) => {
    this.client.indices.delete({ index: '.ml-*' }, { ignore: 404 }, err => {
      this.tap.error(err, 'should not error: indices.delete (ml indices)')
      done()
    })
  })

  done()
}

/**
 * Runs the given test.
 * It runs the test components in the following order:
 *    - setup
 *    - the actual test
 *    - teardown
 *    - cleanup
* Internally uses a queue to guarantee the order of the test sections.
 * @param {object} setup (null if not needed)
 * @param {object} test
 * @oaram {object} teardown (null if not needed)
 * @param {function} end
 */
TestRunner.prototype.run = function (setup, test, teardown, end) {
  // if we should skip a feature in the setup/teardown section
  // we should skip the entire test file
  const skip = getSkip(setup) || getSkip(teardown)
  if (skip && this.shouldSkip(skip)) {
    this.skip(skip)
    return end()
  }

  if (this.isPlatinum) {
    this.tap.comment('Creating x-pack user')
    // Some platinum test requires this user
    this.q.add((q, done) => {
      this.client.security.putUser({
        username: 'x_pack_rest_user',
        body: { password: 'x-pack-test-password', roles: ['superuser'] }
      }, (err, { body }) => {
        this.tap.error(err, 'should not error: security.putUser')
        done()
      })
    })
  }

  if (setup) {
    this.q.add((q, done) => {
      this.exec('Setup', setup, q, done)
    })
  }

  this.q.add((q, done) => {
    this.exec('Test', test, q, done)
  })

  if (teardown) {
    this.q.add((q, done) => {
      this.exec('Teardown', teardown, q, done)
    })
  }

  if (this.isPlatinum) {
    this.q.add((q, done) => {
      this.cleanupPlatinum(q, done)
    })
  }

  this.q.add((q, done) => {
    this.cleanup(q, done)
  })

  this.q.add((q, done) => end() && done())
}

/**
 * Logs a skip
 * @param {object} the actions
 * @returns {TestRunner}
 */
TestRunner.prototype.skip = function (action) {
  if (action.reason && action.version) {
    this.tap.skip(`Skip: ${action.reason} (${action.version})`)
  } else if (action.features) {
    this.tap.skip(`Skip: ${JSON.stringify(action.features)})`)
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
  var shouldSkip = false
  // skip based on the version
  if (action.version) {
    if (action.version.trim() === 'all') return true
    const [min, max] = action.version.split('-').map(v => v.trim())
    // if both `min` and `max` are specified
    if (min && max) {
      shouldSkip = semver.satisfies(this.esVersion, action.version)
    // if only `min` is specified
    } else if (min) {
      shouldSkip = semver.gte(this.esVersion, min)
    // if only `max` is specified
    } else if (max) {
      shouldSkip = semver.lte(this.esVersion, max)
    // something went wrong!
    } else {
      throw new Error(`skip: Bad version range: ${action.version}`)
    }
  }

  if (shouldSkip) return true

  if (action.features) {
    if (!Array.isArray(action.features)) action.features = [action.features]
    // returns true if one of the features is not present in the supportedFeatures
    shouldSkip = !!action.features.filter(f => !~supportedFeatures.indexOf(f)).length
  }

  if (shouldSkip) return true

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
 * @param {object|string} the action to update
 * @returns {object|string} the updated action
 */
TestRunner.prototype.fillStashedValues = function (obj) {
  if (typeof obj === 'string') {
    return getStashedValues.call(this, obj)
  }
  // iterate every key of the object
  for (const key in obj) {
    const val = obj[key]
    // if the key value is a string, and the string includes '${'
    // that we must update the content of '${...}'.
    // eg: 'Basic ${auth}' we search the stahed value 'auth'
    // and the resulting value will be 'Basic valueOfAuth'
    if (typeof val === 'string' && val.includes('${')) {
      const start = val.indexOf('${')
      const end = val.indexOf('}', val.indexOf('${'))
      const stashedKey = val.slice(start + 2, end)
      const stashed = this.stash.get(stashedKey)
      obj[key] = val.slice(0, start) + stashed + val.slice(end + 1)
      continue
    }
    // handle json strings, eg: '{"hello":"$world"}'
    if (typeof val === 'string' && val.includes('"$')) {
      const start = val.indexOf('"$')
      const end = val.indexOf('"', start + 1)
      const stashedKey = val.slice(start + 2, end)
      const stashed = '"' + this.stash.get(stashedKey) + '"'
      obj[key] = val.slice(0, start) + stashed + val.slice(end + 1)
      continue
    }
    // if the key value is a string, and the string includes '$'
    // we run the "update value" code
    if (typeof val === 'string' && val.includes('$')) {
      // update the key value
      obj[key] = getStashedValues.call(this, val)
      continue
    }

    // go deep in the object
    if (val !== null && typeof val === 'object') {
      this.fillStashedValues(val)
    }
  }

  return obj

  function getStashedValues (str) {
    const arr = str
      // we split the string on the dots
      // handle the key with a dot inside that is not a part of the path
      .split(/(?<!\\)\./g)
      // we update every field that start with '$'
      .map(part => {
        if (part[0] === '$') {
          const stashed = this.stash.get(part.slice(1))
          if (stashed == null) {
            throw new Error(`Cannot find stashed value '${part}' for '${JSON.stringify(obj)}'`)
          }
          return stashed
        }
        return part
      })

    // recreate the string value only if the array length is higher than one
    // otherwise return the first element which in some test this could be a number,
    // and call `.join` will coerce it to a string.
    return arr.length > 1 ? arr.join('.') : arr[0]
  }
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
 * Applies a given transformation and stashes the result.
 * @param {string} the name to identify the stashed value
 * @param {string} the transformation function as string
 * @returns {TestRunner}
 */
TestRunner.prototype.transform_and_set = function (name, transform) {
  if (/base64EncodeCredentials/.test(transform)) {
    const [user, password] = transform
      .slice(transform.indexOf('(') + 1, -1)
      .replace(/ /g, '')
      .split(',')
    const userAndPassword = `${delve(this.response, user)}:${delve(this.response, password)}`
    this.stash.set(name, Buffer.from(userAndPassword).toString('base64'))
  } else {
    throw new Error(`Unknown transform: '${transform}'`)
  }
  return this
}

/**
 * Runs a client command
 * @param {object} the action to perform
 * @param {Queue}
 */
TestRunner.prototype.do = function (action, done) {
  const cmd = this.parseDo(action)
  const api = delve(this.client, cmd.method).bind(this.client)
  const options = { ignore: cmd.params.ignore, headers: action.headers }
  if (cmd.params.ignore) delete cmd.params.ignore
  api(cmd.params, options, (err, { body, warnings }) => {
    if (action.warnings && warnings === null) {
      this.tap.fail('We should get a warning header', action.warnings)
    } else if (!action.warnings && warnings !== null) {
      // if there is only the 'default shard will change'
      // warning we skip the check, because the yaml
      // spec may not be updated
      let hasDefaultShardsWarning = false
      warnings.forEach(h => {
        if (/default\snumber\sof\sshards/g.test(h)) {
          hasDefaultShardsWarning = true
        }
      })

      if (hasDefaultShardsWarning === true && warnings.length > 1) {
        this.tap.fail('We are not expecting warnings', warnings)
      }
    } else if (action.warnings && warnings !== null) {
      // if the yaml warnings do not contain the
      // 'default shard will change' warning
      // we do not check it presence in the warnings array
      // because the yaml spec may not be updated
      let hasDefaultShardsWarning = false
      action.warnings.forEach(h => {
        if (/default\snumber\sof\sshards/g.test(h)) {
          hasDefaultShardsWarning = true
        }
      })

      if (hasDefaultShardsWarning === false) {
        warnings = warnings.filter(h => !h.test(/default\snumber\sof\sshards/g))
      }

      this.tap.deepEqual(warnings, action.warnings)
    }

    if (action.catch) {
      this.tap.true(
        parseDoError(err, action.catch),
        `the error should be: ${action.catch}`
      )
      try {
        this.response = JSON.parse(err.body)
      } catch (e) {
        this.response = err.body
      }
    } else {
      this.tap.error(err, `should not error: ${cmd.method}`, action)
      this.response = body
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
TestRunner.prototype.exec = function (name, actions, q, done) {
  this.tap.comment(name)
  for (var i = 0; i < actions.length; i++) {
    const action = actions[i]

    if (action.skip) {
      if (this.shouldSkip(action.skip)) {
        this.skip(this.fillStashedValues(action.skip))
        break
      }
    }

    if (action.do) {
      q.add((q, done) => {
        this.do(this.fillStashedValues(action.do), done)
      })
    }

    if (action.set) {
      q.add((q, done) => {
        const key = Object.keys(action.set)[0]
        this.set(this.fillStashedValues(key), action.set[key])
        done()
      })
    }

    if (action.transform_and_set) {
      q.add((q, done) => {
        const key = Object.keys(action.transform_and_set)[0]
        this.transform_and_set(key, action.transform_and_set[key])
        done()
      })
    }

    if (action.match) {
      q.add((q, done) => {
        const key = Object.keys(action.match)[0]
        this.match(
          // in some cases, the yaml refers to the body with an empty string
          key === '$body' || key === ''
            ? this.response
            : delve(this.response, this.fillStashedValues(key)),
          key === '$body'
            ? action.match[key]
            : this.fillStashedValues(action.match)[key],
          action.match
        )
        done()
      })
    }

    if (action.lt) {
      q.add((q, done) => {
        const key = Object.keys(action.lt)[0]
        this.lt(
          delve(this.response, this.fillStashedValues(key)),
          this.fillStashedValues(action.lt)[key]
        )
        done()
      })
    }

    if (action.gt) {
      q.add((q, done) => {
        const key = Object.keys(action.gt)[0]
        this.gt(
          delve(this.response, this.fillStashedValues(key)),
          this.fillStashedValues(action.gt)[key]
        )
        done()
      })
    }

    if (action.lte) {
      q.add((q, done) => {
        const key = Object.keys(action.lte)[0]
        this.lte(
          delve(this.response, this.fillStashedValues(key)),
          this.fillStashedValues(action.lte)[key]
        )
        done()
      })
    }

    if (action.gte) {
      q.add((q, done) => {
        const key = Object.keys(action.gte)[0]
        this.gte(
          delve(this.response, this.fillStashedValues(key)),
          this.fillStashedValues(action.gte)[key]
        )
        done()
      })
    }

    if (action.length) {
      q.add((q, done) => {
        const key = Object.keys(action.length)[0]
        this.length(
          key === '$body' || key === ''
            ? this.response
            : delve(this.response, this.fillStashedValues(key)),
          key === '$body'
            ? action.length[key]
            : this.fillStashedValues(action.length)[key]
        )
        done()
      })
    }

    if (action.is_true) {
      q.add((q, done) => {
        const isTrue = this.fillStashedValues(action.is_true)
        this.is_true(
          delve(this.response, isTrue),
          isTrue
        )
        done()
      })
    }

    if (action.is_false) {
      q.add((q, done) => {
        const isFalse = this.fillStashedValues(action.is_false)
        this.is_false(
          delve(this.response, isFalse),
          isFalse
        )
        done()
      })
    }
  }
  done()
}

/**
 * Asserts that the given value is truthy
 * @param {any} the value to check
 * @param {string} an optional message
 */
TestRunner.prototype.is_true = function (val, msg) {
  this.tap.true(val, `expect truthy value: ${msg} - value: ${JSON.stringify(val)}`)
  return this
}

/**
 * Asserts that the given value is falsey
 * @param {any} the value to check
 * @param {string} an optional message
 */
TestRunner.prototype.is_false = function (val, msg) {
  this.tap.false(val, `expect falsey value: ${msg} - value: ${JSON.stringify(val)}`)
  return this
}

/**
 * Asserts that two values are the same
 * @param {any} the first value
 * @param {any} the second value
 * @returns {TestRunner}
 */
TestRunner.prototype.match = function (val1, val2, action) {
  // both values are objects
  if (typeof val1 === 'object' && typeof val2 === 'object') {
    this.tap.strictDeepEqual(val1, val2, action)
  // the first value is the body as string and the second a pattern string
  } else if (
    typeof val1 === 'string' && typeof val2 === 'string' &&
    val2.startsWith('/') && (val2.endsWith('/\n') || val2.endsWith('/'))
  ) {
    const regStr = val2
      // match all comments within a "regexp" match arg
      .replace(/([\S\s]?)#[^\n]*\n/g, (match, prevChar) => {
        return prevChar === '\\' ? match : `${prevChar}\n`
      })
      // remove all whitespace from the expression, all meaningful
      // whitespace is represented with \s
      .replace(/\s/g, '')
      .slice(1, -1)
    // 'm' adds the support for multiline regex
    this.tap.match(val1, new RegExp(regStr, 'm'), `should match pattern provided: ${val2}, action: ${JSON.stringify(action)}`)
  // everything else
  } else {
    this.tap.strictEqual(val1, val2, `should be equal: ${val1} - ${val2}, action: ${JSON.stringify(action)}`)
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
  ;[val1, val2] = getNumbers(val1, val2)
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
  ;[val1, val2] = getNumbers(val1, val2)
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
  ;[val1, val2] = getNumbers(val1, val2)
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
  ;[val1, val2] = getNumbers(val1, val2)
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
        acc.params = camelify(action[val])
    }
    return acc
  }, {})

  function camelify (obj) {
    const newObj = {}

    // TODO: add camelCase support for this fields
    const doNotCamelify = ['copy_settings']

    for (const key in obj) {
      const val = obj[key]
      var newKey = key
      if (!~doNotCamelify.indexOf(key)) {
        // if the key starts with `_` we should not camelify the first occurence
        // eg: _source_include => _sourceInclude
        newKey = key[0] === '_'
          ? '_' + key.slice(1).replace(/_([a-z])/g, k => k[1].toUpperCase())
          : key.replace(/_([a-z])/g, k => k[1].toUpperCase())
      }

      if (
        val !== null &&
        typeof val === 'object' &&
        !Array.isArray(val) &&
        key !== 'body'
      ) {
        newObj[newKey] = camelify(val)
      } else {
        newObj[newKey] = val
      }
    }

    return newObj
  }
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
    return new RegExp(spec.slice(1, -1), 'g').test(JSON.stringify(err.body))
  }

  if (spec === 'param') {
    return err instanceof ConfigurationError
  }

  return false
}

function getSkip (arr) {
  if (!Array.isArray(arr)) return null
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].skip) return arr[i].skip
  }
  return null
}

// Gets two *maybe* numbers and returns two valida numbers
// it throws if one or both are not a valid number
// the returned value is an array with the new values
function getNumbers (val1, val2) {
  const val1Numeric = Number(val1)
  if (isNaN(val1Numeric)) {
    throw new TypeError(`val1 is not a valid number: ${val1}`)
  }
  const val2Numeric = Number(val2)
  if (isNaN(val2Numeric)) {
    throw new TypeError(`val2 is not a valid number: ${val2}`)
  }
  return [val1Numeric, val2Numeric]
}

module.exports = TestRunner
