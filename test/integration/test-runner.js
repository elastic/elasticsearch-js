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

/* eslint camelcase: 0 */

const assert = require('assert')
const semver = require('semver')
const helper = require('./helper')
const deepEqual = require('fast-deep-equal')
const { ConfigurationError } = require('../../lib/errors')

const { delve, to, isXPackTemplate, sleep } = helper

const supportedFeatures = [
  'gtelte',
  'regex',
  'benchmark',
  'stash_in_path',
  'groovy_scripting',
  'headers',
  'transform_and_set',
  'catch_unauthorized',
  'arbitrary_key'
]

function build (opts = {}) {
  const client = opts.client
  const esVersion = opts.version
  const isXPack = opts.isXPack
  const stash = new Map()
  let response = null

  /**
   * Runs a cleanup, removes all indices, aliases, templates, and snapshots
   * @returns {Promise}
   */
  async function cleanup (isXPack) {
    response = null
    stash.clear()

    if (isXPack) {
      // wipe rollup jobs
      const { body: jobsList } = await client.rollup.getJobs({ id: '_all' })
      const jobsIds = jobsList.jobs.map(j => j.config.id)
      await helper.runInParallel(
        client, 'rollup.stopJob',
        jobsIds.map(j => ({ id: j, waitForCompletion: true }))
      )
      await helper.runInParallel(
        client, 'rollup.deleteJob',
        jobsIds.map(j => ({ id: j }))
      )

      // delete slm policies
      const { body: policies } = await client.slm.getLifecycle()
      await helper.runInParallel(
        client, 'slm.deleteLifecycle',
        Object.keys(policies).map(p => ({ policy_id: p }))
      )

      // remove 'x_pack_rest_user', used in some xpack test
      await client.security.deleteUser({ username: 'x_pack_rest_user' }, { ignore: [404] })
    }

    // clean snapshots
    const { body: repositories } = await client.snapshot.getRepository()
    for (const repository of Object.keys(repositories)) {
      await client.snapshot.delete({ repository, snapshot: '*' }, { ignore: [404] })
      await client.snapshot.deleteRepository({ repository }, { ignore: [404] })
    }

    if (isXPack) {
      // clean data streams
      await client.indices.deleteDataStream({ name: '*' })
    }

    // clean all indices
    await client.indices.delete({ index: '*,-.ds-ilm-history-*', expand_wildcards: 'open,closed,hidden' }, { ignore: [404] })

    if (isXPack) {
      // delete templates
      const { body: templates } = await client.cat.templates({ h: 'name' })
      for (const template of templates.split('\n').filter(Boolean)) {
        if (isXPackTemplate(template)) continue
        const { body } = await client.indices.deleteTemplate({ name: template }, { ignore: [404] })
        if (JSON.stringify(body).includes(`index_template [${template}] missing`)) {
          await client.indices.deleteIndexTemplate({ name: template }, { ignore: [404] })
        }
      }

      // delete component template
      const { body } = await client.cluster.getComponentTemplate()
      const components = body.component_templates.filter(c => !isXPackTemplate(c.name)).map(c => c.name)
      if (components.length > 0) {
        await client.cluster.deleteComponentTemplate({ name: components.join(',') }, { ignore: [404] })
      }
    } else {
      // clean all templates
      await client.indices.deleteTemplate({ name: '*' })

      // clean all templates
      await client.indices.deleteIndexTemplate({ name: '*' })

      // clean all templates
      await client.cluster.deleteComponentTemplate({ name: '*' })
    }

    // Remove any cluster setting
    const { body: settings } = await client.cluster.getSettings()
    const newSettings = {}
    for (const setting in settings) {
      if (Object.keys(settings[setting]).length === 0) continue
      newSettings[setting] = {}
      for (const key in settings[setting]) {
        newSettings[setting][`${key}.*`] = null
      }
    }
    if (Object.keys(newSettings).length > 0) {
      await client.cluster.putSettings({ body: newSettings })
    }

    if (isXPack) {
      // delete ilm policies
      const preserveIlmPolicies = [
        'ilm-history-ilm-policy', 'slm-history-ilm-policy',
        'watch-history-ilm-policy', 'ml-size-based-ilm-policy',
        'logs', 'metrics'
      ]
      const { body: policies } = await client.ilm.getLifecycle()
      for (const policy in policies) {
        if (preserveIlmPolicies.includes(policy)) continue
        await client.ilm.deleteLifecycle({ policy })
      }

      // delete autofollow patterns
      const { body: patterns } = await client.ccr.getAutoFollowPattern()
      for (const { name } of patterns.patterns) {
        await client.ccr.deleteAutoFollowPattern({ name })
      }

      // delete all tasks
      const { body: nodesTask } = await client.tasks.list()
      const tasks = Object.keys(nodesTask.nodes)
        .reduce((acc, node) => {
          const { tasks } = nodesTask.nodes[node]
          Object.keys(tasks).forEach(id => {
            if (tasks[id].cancellable) acc.push(id)
          })
          return acc
        }, [])

      await helper.runInParallel(
        client, 'tasks.cancel',
        tasks.map(id => ({ taskId: id }))
      )
    }

    // wait for pending task before resolving the promise
    await sleep(100)
    while (true) {
      const { body } = await client.cluster.pendingTasks()
      if (body.tasks.length === 0) break
      await sleep(500)
    }
  }

  /**
   * Runs the given test.
   * It runs the test components in the following order:
   *    - skip check
   *    - xpack user
   *    - setup
   *    - the actual test
   *    - teardown
   *    - xpack cleanup
   *    - cleanup
   * @param {object} setup (null if not needed)
   * @param {object} test
   * @oaram {object} teardown (null if not needed)
   * @returns {Promise}
   */
  async function run (setup, test, teardown, stats, junit) {
    // if we should skip a feature in the setup/teardown section
    // we should skip the entire test file
    const skip = getSkip(setup) || getSkip(teardown)
    if (skip && shouldSkip(esVersion, skip)) {
      junit.skip(skip)
      logSkip(skip)
      return
    }

    if (isXPack) {
      // Some xpack test requires this user
      // tap.comment('Creating x-pack user')
      try {
        await client.security.putUser({
          username: 'x_pack_rest_user',
          body: { password: 'x-pack-test-password', roles: ['superuser'] }
        })
      } catch (err) {
        assert.ifError(err, 'should not error: security.putUser')
      }
    }

    if (setup) await exec('Setup', setup, stats, junit)

    await exec('Test', test, stats, junit)

    if (teardown) await exec('Teardown', teardown, stats, junit)

    await cleanup(isXPack)
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
  function fillStashedValues (obj) {
    if (typeof obj === 'string') {
      return getStashedValues(obj)
    }
    // iterate every key of the object
    for (const key in obj) {
      const val = obj[key]
      // if the key value is a string, and the string includes '${'
      // that we must update the content of '${...}'.
      // eg: 'Basic ${auth}' we search the stahed value 'auth'
      // and the resulting value will be 'Basic valueOfAuth'
      if (typeof val === 'string' && val.includes('${')) {
        while (obj[key].includes('${')) {
          const val = obj[key]
          const start = val.indexOf('${')
          const end = val.indexOf('}', val.indexOf('${'))
          const stashedKey = val.slice(start + 2, end)
          const stashed = stash.get(stashedKey)
          obj[key] = val.slice(0, start) + stashed + val.slice(end + 1)
        }
        continue
      }
      // handle json strings, eg: '{"hello":"$world"}'
      if (typeof val === 'string' && val.includes('"$')) {
        while (obj[key].includes('"$')) {
          const val = obj[key]
          const start = val.indexOf('"$')
          const end = val.indexOf('"', start + 1)
          const stashedKey = val.slice(start + 2, end)
          const stashed = '"' + stash.get(stashedKey) + '"'
          obj[key] = val.slice(0, start) + stashed + val.slice(end + 1)
        }
        continue
      }
      // if the key value is a string, and the string includes '$'
      // we run the "update value" code
      if (typeof val === 'string' && val.includes('$')) {
        // update the key value
        obj[key] = getStashedValues(val)
        continue
      }

      // go deep in the object
      if (val !== null && typeof val === 'object') {
        fillStashedValues(val)
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
            const stashed = stash.get(part.slice(1))
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
  function set (key, name) {
    if (key.includes('_arbitrary_key_')) {
      let currentVisit = null
      for (const path of key.split('.')) {
        if (path === '_arbitrary_key_') {
          const keys = Object.keys(currentVisit)
          const arbitraryKey = keys[getRandomInt(0, keys.length)]
          stash.set(name, arbitraryKey)
        } else {
          currentVisit = delve(response, path)
        }
      }
    } else {
      stash.set(name, delve(response, key))
    }
  }

  /**
   * Applies a given transformation and stashes the result.
   * @param {string} the name to identify the stashed value
   * @param {string} the transformation function as string
   * @returns {TestRunner}
   */
  function transform_and_set (name, transform) {
    if (/base64EncodeCredentials/.test(transform)) {
      const [user, password] = transform
        .slice(transform.indexOf('(') + 1, -1)
        .replace(/ /g, '')
        .split(',')
      const userAndPassword = `${delve(response, user)}:${delve(response, password)}`
      stash.set(name, Buffer.from(userAndPassword).toString('base64'))
    } else {
      throw new Error(`Unknown transform: '${transform}'`)
    }
  }

  /**
   * Runs a client command
   * @param {object} the action to perform
   * @returns {Promise}
   */
  async function doAction (action, stats) {
    const cmd = parseDo(action)
    let api
    try {
      api = delve(client, cmd.method).bind(client)
    } catch (err) {
      console.error(`\nError: Cannot find the method '${cmd.method}' in the client.\n`)
      process.exit(1)
    }

    const options = { ignore: cmd.params.ignore, headers: action.headers }
    if (!Array.isArray(options.ignore)) options.ignore = [options.ignore]
    if (cmd.params.ignore) delete cmd.params.ignore

    const [err, result] = await to(api(cmd.params, options))
    let warnings = result ? result.warnings : null
    const body = result ? result.body : null

    if (action.warnings && warnings === null) {
      assert.fail('We should get a warning header', action.warnings)
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
        assert.fail('We are not expecting warnings', warnings)
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

      stats.assertions += 1
      assert.ok(deepEqual(warnings, action.warnings))
    }

    if (action.catch) {
      stats.assertions += 1
      assert.ok(
        parseDoError(err, action.catch),
        `the error should be: ${action.catch}`
      )
      try {
        response = JSON.parse(err.body)
      } catch (e) {
        response = err.body
      }
    } else {
      stats.assertions += 1
      assert.ifError(err, `should not error: ${cmd.method}`, action)
      response = body
    }
  }

  /**
   * Runs an actual test
   * @param {string} the name of the test
   * @param {object} the actions to perform
   * @returns {Promise}
   */
  async function exec (name, actions, stats, junit) {
    // tap.comment(name)
    for (const action of actions) {
      if (action.skip) {
        if (shouldSkip(esVersion, action.skip)) {
          junit.skip(fillStashedValues(action.skip))
          logSkip(fillStashedValues(action.skip))
          break
        }
      }

      if (action.do) {
        await doAction(fillStashedValues(action.do), stats)
      }

      if (action.set) {
        const key = Object.keys(action.set)[0]
        set(fillStashedValues(key), action.set[key])
      }

      if (action.transform_and_set) {
        const key = Object.keys(action.transform_and_set)[0]
        transform_and_set(key, action.transform_and_set[key])
      }

      if (action.match) {
        stats.assertions += 1
        const key = Object.keys(action.match)[0]
        match(
          // in some cases, the yaml refers to the body with an empty string
          key === '$body' || key === ''
            ? response
            : delve(response, fillStashedValues(key)),
          key === '$body'
            ? action.match[key]
            : fillStashedValues(action.match)[key],
          action.match
        )
      }

      if (action.lt) {
        stats.assertions += 1
        const key = Object.keys(action.lt)[0]
        lt(
          delve(response, fillStashedValues(key)),
          fillStashedValues(action.lt)[key]
        )
      }

      if (action.gt) {
        stats.assertions += 1
        const key = Object.keys(action.gt)[0]
        gt(
          delve(response, fillStashedValues(key)),
          fillStashedValues(action.gt)[key]
        )
      }

      if (action.lte) {
        stats.assertions += 1
        const key = Object.keys(action.lte)[0]
        lte(
          delve(response, fillStashedValues(key)),
          fillStashedValues(action.lte)[key]
        )
      }

      if (action.gte) {
        stats.assertions += 1
        const key = Object.keys(action.gte)[0]
        gte(
          delve(response, fillStashedValues(key)),
          fillStashedValues(action.gte)[key]
        )
      }

      if (action.length) {
        stats.assertions += 1
        const key = Object.keys(action.length)[0]
        length(
          key === '$body' || key === ''
            ? response
            : delve(response, fillStashedValues(key)),
          key === '$body'
            ? action.length[key]
            : fillStashedValues(action.length)[key]
        )
      }

      if (action.is_true) {
        stats.assertions += 1
        const isTrue = fillStashedValues(action.is_true)
        is_true(
          delve(response, isTrue),
          isTrue
        )
      }

      if (action.is_false) {
        stats.assertions += 1
        const isFalse = fillStashedValues(action.is_false)
        is_false(
          delve(response, isFalse),
          isFalse
        )
      }
    }
  }

  return { run }
}

/**
 * Asserts that the given value is truthy
 * @param {any} the value to check
 * @param {string} an optional message
 * @returns {TestRunner}
 */
function is_true (val, msg) {
  assert.ok(val, `expect truthy value: ${msg} - value: ${JSON.stringify(val)}`)
}

/**
 * Asserts that the given value is falsey
 * @param {any} the value to check
 * @param {string} an optional message
 * @returns {TestRunner}
 */
function is_false (val, msg) {
  assert.ok(!val, `expect falsey value: ${msg} - value: ${JSON.stringify(val)}`)
}

/**
 * Asserts that two values are the same
 * @param {any} the first value
 * @param {any} the second value
 * @returns {TestRunner}
 */
function match (val1, val2, action) {
  // both values are objects
  if (typeof val1 === 'object' && typeof val2 === 'object') {
    assert.ok(deepEqual(val1, val2), action)
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
    assert.ok(new RegExp(regStr, 'm').test(val1), `should match pattern provided: ${val2}, action: ${JSON.stringify(action)}`)
    // tap.match(val1, new RegExp(regStr, 'm'), `should match pattern provided: ${val2}, action: ${JSON.stringify(action)}`)
  // everything else
  } else {
    assert.strictEqual(val1, val2, `should be equal: ${val1} - ${val2}, action: ${JSON.stringify(action)}`)
  }
}

/**
 * Asserts that the first value is less than the second
 * It also verifies that the two values are numbers
 * @param {any} the first value
 * @param {any} the second value
 * @returns {TestRunner}
 */
function lt (val1, val2) {
  ;[val1, val2] = getNumbers(val1, val2)
  assert.ok(val1 < val2)
}

/**
 * Asserts that the first value is greater than the second
 * It also verifies that the two values are numbers
 * @param {any} the first value
 * @param {any} the second value
 * @returns {TestRunner}
 */
function gt (val1, val2) {
  ;[val1, val2] = getNumbers(val1, val2)
  assert.ok(val1 > val2)
}

/**
 * Asserts that the first value is less than or equal the second
 * It also verifies that the two values are numbers
 * @param {any} the first value
 * @param {any} the second value
 * @returns {TestRunner}
 */
function lte (val1, val2) {
  ;[val1, val2] = getNumbers(val1, val2)
  assert.ok(val1 <= val2)
}

/**
 * Asserts that the first value is greater than or equal the second
 * It also verifies that the two values are numbers
 * @param {any} the first value
 * @param {any} the second value
 * @returns {TestRunner}
*/
function gte (val1, val2) {
  ;[val1, val2] = getNumbers(val1, val2)
  assert.ok(val1 >= val2)
}

/**
 * Asserts that the given value has the specified length
 * @param {string|object|array} the object to check
 * @param {number} the expected length
 * @returns {TestRunner}
 */
function length (val, len) {
  if (typeof val === 'string' || Array.isArray(val)) {
    assert.strictEqual(val.length, len)
  } else if (typeof val === 'object' && val !== null) {
    assert.strictEqual(Object.keys(val).length, len)
  } else {
    assert.fail(`length: the given value is invalid: ${val}`)
  }
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
function parseDo (action) {
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
      let newKey = key
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
  for (let i = 0; i < arr.length; i++) {
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

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * Logs a skip
 * @param {object} the actions
 * @returns {TestRunner}
 */
function logSkip (action) {
  if (action.reason && action.version) {
    console.log(`Skip: ${action.reason} (${action.version})`)
  } else if (action.features) {
    console.log(`Skip: ${JSON.stringify(action.features)})`)
  } else {
    console.log('Skipped')
  }
}

/**
 * Decides if a test should be skipped
 * @param {object} the actions
 * @returns {boolean}
 */
function shouldSkip (esVersion, action) {
  let shouldSkip = false
  // skip based on the version
  if (action.version) {
    if (action.version.trim() === 'all') return true
    const versions = action.version.split(',').filter(Boolean)
    for (const version of versions) {
      const [min, max] = version.split('-').map(v => v.trim())
      // if both `min` and `max` are specified
      if (min && max) {
        shouldSkip = semver.satisfies(esVersion, action.version)
      // if only `min` is specified
      } else if (min) {
        shouldSkip = semver.gte(esVersion, min)
      // if only `max` is specified
      } else if (max) {
        shouldSkip = semver.lte(esVersion, max)
      // something went wrong!
      } else {
        throw new Error(`skip: Bad version range: ${action.version}`)
      }
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
// function updateArraySyntax (obj) {
//   const newObj = {}

//   for (const key in obj) {
//     const newKey = key.replace(/\.\d{1,}\./g, v => `[${v.slice(1, -1)}].`)
//     const val = obj[key]

//     if (typeof val === 'string') {
//       newObj[newKey] = val.replace(/\.\d{1,}\./g, v => `[${v.slice(1, -1)}].`)
//     } else if (val !== null && typeof val === 'object') {
//       newObj[newKey] = updateArraySyntax(val)
//     } else {
//       newObj[newKey] = val
//     }
//   }

//   return newObj
// }

module.exports = build
