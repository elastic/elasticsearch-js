/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const { join, sep } = require('node:path')
const { readFileSync, writeFileSync, promises } = require('node:fs')
const yaml = require('js-yaml')
const { rimraf } = require('rimraf')
const { mkdir } = promises

const generatedTestsPath = join(__dirname, '..', '..', 'generated-tests')

const stackSkips = [
  // test definition bug: response is empty string
  'cat/fielddata.yml',
  // test definition bug: response is empty string
  'cluster/delete_voting_config_exclusions.yml',
  // test definition bug: response is empty string
  'cluster/voting_config_exclusions.yml',
  // client bug: ILM request takes a "body" param, but "body" is a special keyword in the JS client
  'ilm/10_basic.yml',
  // health report is... not healthy
  'health_report.yml',
  // TODO: `contains` action only supports checking for primitives inside arrays or strings inside strings, not referenced values like objects inside arrays
  'entsearch/10_basic.yml',
  // test definition bug: error message does not match
  'entsearch/30_sync_jobs_stack.yml',
  // no handler found for uri [/knn_test/_knn_search]
  'knn_search.yml',
  // TODO: fix license on ES startup - "Operation failed: Current license is basic."
  'license/10_stack.yml',
  // response.body should be truthy. found: ""
  'logstash/10_basic.yml',
  // test definition bug? security_exception: unable to authenticate user [x_pack_rest_user] for REST request [/_ml/trained_models/test_model/definition/0]
  'machine_learning/clear_tm_deployment_cache.yml',
  // client bug: 0.99995 does not equal 0.5
  'machine_learning/data_frame_evaluate.yml',
  // test definition bug? regex has whitespace, maybe needs to be removed
  'machine_learning/explain_data_frame_analytics.yml',
  // client bug: 4 != 227
  'machine_learning/preview_datafeed.yml',
  // test definition bug: error message does not match
  'machine_learning/revert_model_snapshot.yml',
  // test definition bug: error message does not match
  'machine_learning/update_model_snapshot.yml',
  // version_conflict_engine_exception
  'machine_learning/jobs_crud.yml',
  // test definition bug: error message does not match
  'machine_learning/model_snapshots.yml',
  // test definition bug: error message does not match
  'query_rules/30_test.yml',
  // client bug: 0 != 0.1
  'script/10_basic.yml',
  // client bug: request takes a "body" param, but "body" is a special keyword in the JS client
  'searchable_snapshots/10_basic.yml',
  // test builder bug: does `match` action need to support "array contains value"?
  'security/10_api_key_basic.yml',
  // test definition bug: error message does not match
  'security/140_user.yml',
  // test definition bug: error message does not match
  'security/30_privileges_stack.yml',
  // unknown issue: $profile.enabled path doesn't exist in response
  'security/130_user_profile.yml',
  // test definition bug: error message does not match
  'security/change_password.yml',
  // test builder bug: media_type_header_exception
  'simulate/ingest.yml',
  // client bug: request takes a "body" param, but "body" is a special keyword in the JS client
  'snapshot/10_basic.yml',
  // test definition bug: illegal_argument_exception
  'sql/10_basic.yml',
  // test definition bug: illegal_argument_exception
  'text_structure/10_basic.yml',
  // test definition bug: illegal_argument_exception
  'transform/10_basic.yml',
]

const serverlessSkips = [
  // TODO: sql.getAsync does not set a content-type header but ES expects one
  // transport only sets a content-type if the body is not empty
  'sql/10_basic.yml',
  // TODO: bulk call in setup fails due to "malformed action/metadata line"
  // bulk body is being sent as a Buffer, unsure if related.
  'transform/10_basic.yml',
  // TODO: scripts_painless_execute expects {"result":"0.1"}, gets {"result":"0"}
  // body sent as Buffer, unsure if related
  'script/10_basic.yml',
  // TODO: expects {"outlier_detection.auc_roc.value":0.99995}, gets {"outlier_detection.auc_roc.value":0.5}
  // remove if/when https://github.com/elastic/elasticsearch-clients-tests/issues/37 is resolved
  'machine_learning/data_frame_evaluate.yml',
  // TODO: Cannot perform requested action because job [job-crud-test-apis] is not open
  'machine_learning/jobs_crud.yml',
  // TODO: test runner needs to support ignoring 410 errors
  'enrich/10_basic.yml',
  // TODO: parameter `enabled` is not allowed in source
  // Same underlying problem as https://github.com/elastic/elasticsearch-clients-tests/issues/55
  'cluster/component_templates.yml',
  // TODO: expecting `ct_field` field mapping to be returned, but instead only finds `field`
  'indices/simulate_template.yml',
  'indices/simulate_index_template.yml',
  // TODO: test currently times out
  'inference/10_basic.yml',
  // TODO: Fix: "Trained model deployment [test_model] is not allocated to any nodes"
  'machine_learning/20_trained_model_serverless.yml',
  // TODO: query_rules api not available yet
  'query_rules/10_query_rules.yml',
  'query_rules/20_rulesets.yml',
  'query_rules/30_test.yml',
  // TODO: security.putRole API not available
  'security/50_roles_serverless.yml',
  // TODO: expected undefined to equal 'some_table'
  'entsearch/50_connector_updates.yml',
  // TODO: resource_not_found_exception
  'tasks_serverless.yml',
]

function parse (data) {
  let doc
  try {
    doc = yaml.load(data, { schema: yaml.CORE_SCHEMA })
  } catch (err) {
    console.error(err)
    return
  }
  return doc
}

async function build (yamlFiles, clientOptions) {
  await rimraf(generatedTestsPath)
  await mkdir(generatedTestsPath, { recursive: true })

  for (const file of yamlFiles) {
    const apiName = file.split(`${sep}tests${sep}`)[1]
    const data = readFileSync(file, 'utf8')

    const tests = data
      .split('\n---\n')
      .map(s => s.trim())
      // empty strings
      .filter(Boolean)
      .map(parse)
      // null values
      .filter(Boolean)

    let code = "import { test } from 'tap'\n"
    code += "import { Client } from '@elastic/elasticsearch'\n\n"

    const requires = tests.find(test => test.requires != null)
    let skip = new Set()
    if (requires != null) {
      const { serverless = true, stack = true } = requires.requires
      if (!serverless) skip.add('process.env.TEST_ES_SERVERLESS === "1"')
      if (!stack) skip.add('process.env.TEST_ES_STACK === "1"')
    }

    if (stackSkips.includes(apiName)) skip.add('process.env.TEST_ES_STACK === "1"')
    if (serverlessSkips.includes(apiName)) skip.add('process.env.TEST_ES_SERVERLESS === "1"')

    if (skip.size > 0) {
      code += `test('${apiName}', { skip: ${Array.from(skip).join(' || ')} }, t => {\n`
    } else {
      code += `test('${apiName}', t => {\n`
    }

    for (const test of tests) {
      if (test.setup != null) {
        code += '  t.before(async () => {\n'
        code += indent(buildActions(test.setup), 4)
        code += '  })\n\n'
      }

      if (test.teardown != null) {
        code += '  t.after(async () => {\n'
        code += indent(buildActions(test.teardown), 4)
        code += '  })\n\n'
      }

      for (const key of Object.keys(test).filter(k => !['setup', 'teardown', 'requires'].includes(k))) {
        if (test[key].find(action => Object.keys(action)[0] === 'skip') != null) {
          code += `  t.test('${key}', { skip: true }, async t => {\n`
        } else {
          code += `  t.test('${key}', async t => {\n`
        }
        code += indent(buildActions(test[key]), 4)
        code += '\n    t.end()\n'
        code += '  })\n'
      }
      // if (test.requires != null) requires = test.requires
    }

    code += '\n  t.end()\n'
    code += '})\n'

    const testDir = join(generatedTestsPath, apiName.split(sep).slice(0, -1).join(sep))
    const testFile = join(testDir, apiName.split(sep).pop().replace(/\.ya?ml$/, '.mjs'))
    await mkdir(testDir, { recursive: true })
    writeFileSync(testFile, code, 'utf8')
  }

  function buildActions (actions) {
    let code = `const client = new Client(${JSON.stringify(clientOptions, null, 2)})\n`
    code += 'let response\n\n'

    const vars = new Set()

    for (const action of actions) {
      const key = Object.keys(action)[0]
      switch (key) {
        case 'do':
          code += buildDo(action.do)
          break
        case 'set':
          const setResult = buildSet(action.set, vars)
          vars.add(setResult.varName)
          code += setResult.code
          break
        case 'transform_and_set':
          code += buildTransformAndSet(action.transform_and_set)
          break
        case 'match':
          code += buildMatch(action.match)
          break
        case 'lt':
          code += buildLt(action.lt)
          break
        case 'lte':
          code += buildLte(action.lte)
          break
        case 'gt':
          code += buildGt(action.gt)
          break
        case 'gte':
          code += buildGte(action.gte)
          break
        case 'length':
          code += buildLength(action.length)
          break
        case 'is_true':
          code += buildIsTrue(action.is_true)
          break
        case 'is_false':
          code += buildIsFalse(action.is_false)
          break
        case 'contains':
          code += buildContains(action.contains)
          break
        case 'exists':
          code += buildExists(action.exists)
          break
        case 'skip':
          break
        default:
          console.warn(`Action not supported: ${key}`)
          break
      }
    }
    return code
  }
}

function buildDo (action) {
  let code = ''
  const keys = Object.keys(action)
  if (keys.includes('catch')) {
    code += 'try {\n'
    code += indent(buildRequest(action), 2)
    code += '} catch (err) {\n'
    code += `  t.match(err.toString(), ${buildValLiteral(action.catch)})\n`
    code += '}\n'
  } else {
    code += buildRequest(action)
  }
  return code
}

function buildRequest(action) {
  let code = ''

  const options = { meta: true }

  for (const key of Object.keys(action)) {
    if (key === 'catch') continue

    if (key === 'headers') {
      options.headers = action.headers
      continue
    }

    const params = action[key]
    if (params.ignore != null) {
      if (Array.isArray(params.ignore)) {
        options.ignore = params.ignore
      } else {
        options.ignore = [params.ignore]
      }
    }

    code += `response = await client.${toCamelCase(key)}(${buildApiParams(action[key])}, ${JSON.stringify(options)})\n`
  }
  return code
}

function buildSet (action, vars) {
  const key = Object.keys(action)[0]
  const varName = action[key]
  const lookup = buildLookup(key)

  let code = ''
  if (vars.has(varName)) {
    code = `${varName} = ${lookup}\n`
  } else {
    code =`let ${varName} = ${lookup}\n`
  }
  return { code, varName }
}

function buildTransformAndSet (action) {
  return `// TODO buildTransformAndSet: ${JSON.stringify(action)}\n`
}

function buildMatch (action) {
  const key = Object.keys(action)[0]
  let lookup = buildLookup(key)
  const val = buildValLiteral(action[key])
  return `t.match(${lookup}, ${val})\n`
}

function buildLt (action) {
  const key = Object.keys(action)[0]
  const lookup = buildLookup(key)
  const val = buildValLiteral(action[key])
  return `t.ok(${lookup} < ${val})\n`
}

function buildLte (action) {
  const key = Object.keys(action)[0]
  const lookup = buildLookup(key)
  const val = buildValLiteral(action[key])
  return `t.ok(${lookup} <= ${val})\n`
}

function buildGt (action) {
  const key = Object.keys(action)[0]
  const lookup = buildLookup(key)
  const val = buildValLiteral(action[key])
  return `t.ok(${lookup} > ${val})\n`
}

function buildGte (action) {
  const key = Object.keys(action)[0]
  const lookup = buildLookup(key)
  const val = buildValLiteral(action[key])
  return `t.ok(${lookup} >= ${val})\n`
}

function buildLength (action) {
  const key = Object.keys(action)[0]
  const lookup = buildLookup(key)
  const val = buildValLiteral(action[key])

  let code = ''
  code += `if (typeof ${lookup} === 'object' && !Array.isArray(${lookup})) {\n`
  code += `  t.equal(Object.keys(${lookup}).length, ${val})\n`
  code += `} else {\n`
  code += `  t.equal(${lookup}.length, ${val})\n`
  code += `}\n`
  return code
}

function buildIsTrue (action) {
  let lookup = `${buildLookup(action)}`
  let errMessage = `\`${action} should be truthy. found: '\$\{JSON.stringify(${lookup})\}'\``
  if (lookup.includes('JSON.stringify')) errMessage = `\`${action} should be truthy. found: '\$\{${lookup}\}'\``
  return `t.ok(${lookup} === "true" || (Boolean(${lookup}) && ${lookup} !== "false"), ${errMessage})\n`
}

function buildIsFalse (action) {
  let lookup = `${buildLookup(action)}`
  let errMessage = `\`${action} should be falsy. found: '\$\{JSON.stringify(${lookup})\}'\``
  if (lookup.includes('JSON.stringify')) errMessage = `\`${action} should be falsy. found: '\$\{${lookup}\}'\``
  return `t.ok(${lookup} === "false" || !Boolean(${lookup}), ${errMessage})\n`
}

function buildContains (action) {
  const key = Object.keys(action)[0]
  const lookup = buildLookup(key)
  const val = buildValLiteral(action[key])
  return `t.ok(${lookup}.includes(${val}), '${JSON.stringify(val)} not found in ${key}')\n`
}

function buildExists (keyName) {
  const lookup = buildLookup(keyName)
  return `t.ok(${lookup} != null, \`Key "${keyName}" not found in response body: \$\{JSON.stringify(response.body, null, 2)\}\`)\n`
}

function buildApiParams (params) {
  if (Object.keys(params).length === 0) {
    return 'undefined'
  } else {
    const out = {}
    Object.keys(params).filter(k => k !== 'ignore' && k !== 'headers').forEach(k => out[k] = params[k])
    return buildValLiteral(out)
  }
}

function toCamelCase (name) {
  return name.replace(/_([a-z])/g, g => g[1].toUpperCase())
}

function indent (str, spaces) {
  const tabs = ' '.repeat(spaces)
  return str.replace(/\s+$/, '').split('\n').map(l => `${tabs}${l}`).join('\n') + '\n'
}

function buildLookup (path) {
  if (path === '$body') return '(typeof response.body === "string" ? response.body : JSON.stringify(response.body))'

  const outPath = path.split('.').map(step => {
    if (parseInt(step, 10).toString() === step) {
      return `[${step}]`
    } else if (step.match(/^\$[a-zA-Z0-9_]+$/)) {
      const lookup = step.replace(/^\$/, '')
      if (lookup === 'body') return ''
      return `[${lookup}]`
    } else if (step === '') {
      return ''
    } else {
      return `['${step}']`
    }
  }).join('')
  return `response.body${outPath}`
}

function buildValLiteral (val) {
  if (typeof val === 'string') val = val.trim()
  if (isRegExp(val)) {
    return JSON.stringify(val).replace(/^"/, '').replace(/"$/, '').replaceAll('\\\\', '\\')
  } else if (isVariable(val)) {
    if (val === '$body') return 'JSON.stringify(response.body)'
    return val.replace(/^\$/, '')
  } else if (isPlainObject(val)) {
    return JSON.stringify(cleanObject(val), null, 2).replace(/"\$([a-zA-Z0-9_]+)"/g, '$1')
  } else {
    return JSON.stringify(val)
  }
}

function isRegExp (str) {
  return typeof str === 'string' && str.startsWith('/') && str.endsWith('/')
}

function isVariable (str) {
  return typeof str === 'string' && str.match(/^\$[a-zA-Z0-9_]+$/) != null
}

function cleanObject (obj) {
  Object.keys(obj).forEach(key => {
    let val = obj[key]
    if (typeof val === 'string' && val.trim().startsWith('{') && val.trim().endsWith('}')) {
      // attempt to parse as object
      try {
        val = JSON.parse(val)
      } catch {
      }
    } else if (isPlainObject(val)) {
      val = cleanObject(val)
    } else if (Array.isArray(val)) {
      val = val.map(item => isPlainObject(item) ? cleanObject(item) : item)
    }
    obj[key] = val
  })
  return obj
}

function isPlainObject(obj) {
  return typeof obj === 'object' && !Array.isArray(obj) && obj != null
}

module.exports = build
