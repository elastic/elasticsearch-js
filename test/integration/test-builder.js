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
  { file: 'entsearch/10_basic.yml', skipReason: 'TODO: `contains` action only supports matching primitives/strings, not objects inside arrays' },
  { file: 'cluster/voting_config_exclusions.yml', skipReason: 'TODO: `contains` action only supports matching primitives/strings, not objects inside arrays' },
  { file: 'cat/fielddata.yml', skipReason: 'test definition bugs on 9.4 branch (fixed on main, pending backport)' },
  { file: 'machine_learning/explain_data_frame_analytics.yml', skipReason: 'test definition bugs on 9.4 branch (fixed on main, pending backport)' },
  { file: 'machine_learning/jobs_crud.yml', skipReason: 'test definition bugs on 9.4 branch (fixed on main, pending backport)' },
  { file: 'security/10_api_key_basic.yml', skipReason: 'test definition bugs on 9.4 branch (fixed on main, pending backport)' },
  { file: 'license/10_stack.yml', skipReason: 'test deletes trial license, breaking all subsequent licensed-feature tests' },
  { file: 'machine_learning/clear_tm_deployment_cache.yml', skipReason: 'test definition bug: uses x_pack_rest_user which does not exist in this test environment' },
  { file: 'machine_learning/data_frame_evaluate.yml', skipReason: 'client bug: 0.99995 does not equal 0.5 (data evaluation returns wrong value)' },
  { file: 'machine_learning/preview_datafeed.yml', skipReason: 'client bug: preview returns 227 results instead of expected 4' },
  { file: 'security/130_user_profile.yml', skipReason: 'unknown issue: $profile.enabled path does not exist in response' },
  { file: 'text_structure/10_basic.yml', skipReason: 'test definition bug: bulk body sent as JSON array, not NDJSON' },
  { file: 'transform/10_basic.yml', skipReason: 'test definition bug: bulk body sent as JSON array, not NDJSON' },
]

const serverlessSkips = [
  { file: 'sql/10_basic.yml', skipReason: 'TODO: sql.getAsync does not set a content-type header but ES expects one; transport only sets a content-type if the body is not empty' },
  { file: 'transform/10_basic.yml', skipReason: 'TODO: bulk call in setup fails due to "malformed action/metadata line"; bulk body is being sent as a Buffer, unsure if related' },
  { file: 'script/10_basic.yml', skipReason: 'TODO: scripts_painless_execute expects {"result":"0.1"}, gets {"result":"0"}; body sent as Buffer, unsure if related' },
  { file: 'machine_learning/data_frame_evaluate.yml', skipReason: 'TODO: expects outlier_detection.auc_roc.value 0.99995, gets 0.5; remove if/when https://github.com/elastic/elasticsearch-clients-tests/issues/37 is resolved' },
  { file: 'machine_learning/jobs_crud.yml', skipReason: 'TODO: Cannot perform requested action because job [job-crud-test-apis] is not open' },
  { file: 'enrich/10_basic.yml', skipReason: 'TODO: test runner needs to support ignoring 410 errors' },
  { file: 'cluster/component_templates.yml', skipReason: 'TODO: parameter `enabled` is not allowed in source; same underlying problem as https://github.com/elastic/elasticsearch-clients-tests/issues/55' },
  { file: 'indices/simulate_template.yml', skipReason: 'TODO: expecting `ct_field` field mapping to be returned, but instead only finds `field`' },
  { file: 'indices/simulate_index_template.yml', skipReason: 'TODO: expecting `ct_field` field mapping to be returned, but instead only finds `field`' },
  { file: 'inference/10_basic.yml', skipReason: 'TODO: test currently times out' },
  { file: 'machine_learning/20_trained_model_serverless.yml', skipReason: 'TODO: Fix: "Trained model deployment [test_model] is not allocated to any nodes"' },
  { file: 'query_rules/10_query_rules.yml', skipReason: 'TODO: query_rules api not available yet' },
  { file: 'query_rules/20_rulesets.yml', skipReason: 'TODO: query_rules api not available yet' },
  { file: 'query_rules/30_test.yml', skipReason: 'TODO: query_rules api not available yet' },
  { file: 'security/50_roles_serverless.yml', skipReason: 'TODO: security.putRole API not available' },
  { file: 'entsearch/50_connector_updates.yml', skipReason: 'TODO: expected undefined to equal \'some_table\'' },
  { file: 'tasks_serverless.yml', skipReason: 'TODO: resource_not_found_exception' },
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

  paramNameMappings = buildParamNameMappings()

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

    let code = 'import { test } from \'tap\'\n'
    code += 'import { Client } from \'@elastic/elasticsearch\'\n\n'

    const requires = tests.find(test => test.requires != null)
    const skip = new Set()
    if (requires != null) {
      const { serverless = true, stack = true } = requires.requires
      if (!serverless) skip.add('process.env.TEST_ES_SERVERLESS === "1"')
      if (!stack) skip.add('process.env.TEST_ES_STACK === "1"')
    }

    const stackSkip = stackSkips.find(s => s.file === apiName)
    if (stackSkip) skip.add(`process.env.TEST_ES_STACK === "1" ? ${JSON.stringify(stackSkip.skipReason)} : false`)
    const serverlessSkip = serverlessSkips.find(s => s.file === apiName)
    if (serverlessSkip) skip.add(`process.env.TEST_ES_SERVERLESS === "1" ? ${JSON.stringify(serverlessSkip.skipReason)} : false`)

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
        case 'set': {
          const setResult = buildSet(action.set, vars)
          vars.add(setResult.varName)
          code += setResult.code
          break
        }
        case 'transform_and_set':{
          code += buildTransformAndSet(action.transform_and_set)
          break
        }
        case 'match':{
          code += buildMatch(action.match)
          break
        }
        case 'lt':{
          code += buildLt(action.lt)
          break
        }
        case 'lte':{
          code += buildLte(action.lte)
          break
        }
        case 'gt':{
          code += buildGt(action.gt)
          break
        }
        case 'gte':{
          code += buildGte(action.gte)
          break
        }
        case 'length':{
          code += buildLength(action.length)
          break
        }
        case 'is_true':{
          code += buildIsTrue(action.is_true)
          break
        }
        case 'is_false':{
          code += buildIsFalse(action.is_false)
          break
        }
        case 'contains':{
          code += buildContains(action.contains)
          break
        }
        case 'exists':{
          code += buildExists(action.exists)
          break
        }
        case 'skip':{
          break
        }
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
    const catchVal = action.catch
    code += 'try {\n'
    code += indent(buildRequest(action), 2)
    code += '  t.fail("Expected an error to be thrown")\n'
    code += '} catch (err) {\n'
    const statusMap = { missing: 404, unauthorized: 401, bad_request: 400, forbidden: 403, conflict: 409, request_timeout: 408, param: 400 }
    if (statusMap[catchVal] != null) {
      code += `  t.equal(err.statusCode, ${statusMap[catchVal]}, \`expected status ${statusMap[catchVal]} for ${catchVal}, got \${err.statusCode}\`)\n`
    } else {
      code += `  t.match(err.toString(), ${buildValLiteral(catchVal)})\n`
    }
    code += '}\n'
  } else {
    code += buildRequest(action)
  }
  return code
}

function buildRequest (action) {
  let code = ''

  const options = { meta: true }

  for (const key of Object.keys(action)) {
    if (key === 'catch') continue

    if (key === 'headers') {
      const { 'Content-Type': _, ...rest } = action.headers
      if (Object.keys(rest).length > 0) options.headers = rest
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

    code += `response = await client.${toCamelCase(key)}(${buildApiParams(key, action[key])}, ${JSON.stringify(options)})\n`
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
    code = `let ${varName} = ${lookup}\n`
  }
  return { code, varName }
}

function buildTransformAndSet (action) {
  return `// TODO buildTransformAndSet: ${JSON.stringify(action)}\n`
}

function buildMatch (action) {
  const key = Object.keys(action)[0]
  const lookup = buildLookup(key)
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
  code += '} else {\n'
  code += `  t.equal(${lookup}.length, ${val})\n`
  code += '}\n'
  return code
}

function buildIsTrue (action) {
  const lookup = `${buildLookup(action)}`
  let errMessage = `\`${action} should be truthy. found: '\$\{JSON.stringify(${lookup})\}'\``
  if (lookup.includes('JSON.stringify')) errMessage = `\`${action} should be truthy. found: '\$\{${lookup}\}'\``
  return `t.ok(${lookup} === "true" || (Boolean(${lookup}) && ${lookup} !== "false"), ${errMessage})\n`
}

function buildIsFalse (action) {
  const lookup = `${buildLookup(action)}`
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

let paramNameMappings
function buildParamNameMappings () {
  const schemaPath = join(__dirname, '..', '..', 'schema', 'schema.json')
  let schema
  try {
    schema = JSON.parse(readFileSync(schemaPath, 'utf8'))
  } catch {
    return {}
  }
  const mappings = {}
  for (const type of schema.types) {
    if (type.kind !== 'request') continue
    for (const prop of type.path ?? []) {
      if (prop.codegenName != null && prop.codegenName !== prop.name) {
        const endpoint = schema.endpoints.find(e =>
          e.request != null && e.request.name === type.name.name && e.request.namespace === type.name.namespace
        )
        if (endpoint != null) {
          if (mappings[endpoint.name] == null) mappings[endpoint.name] = {}
          mappings[endpoint.name][prop.name] = prop.codegenName
        }
      }
    }
  }
  return mappings
}

function buildApiParams (apiName, params) {
  if (Object.keys(params).length === 0) {
    return 'undefined'
  } else {
    const out = {}
    const mapping = paramNameMappings[apiName]
    Object.keys(params).filter(k => k !== 'ignore' && k !== 'headers').forEach(k => {
      const mappedKey = mapping != null && mapping[k] != null ? mapping[k] : k
      out[mappedKey] = params[k]
    })
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
      return `?.[${step}]`
    } else if (step.match(/^\$[a-zA-Z0-9_]+$/)) {
      const lookup = step.replace(/^\$/, '')
      if (lookup === 'body') return ''
      return `?.[${lookup}]`
    } else if (step === '') {
      return ''
    } else {
      return `?.['${step}']`
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
  } else if (Array.isArray(val)) {
    return JSON.stringify(val, null, 2).replace(/"\$([a-zA-Z0-9_]+)"/g, '$1')
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

function isPlainObject (obj) {
  return typeof obj === 'object' && !Array.isArray(obj) && obj != null
}

module.exports = build
