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

/* global $ argv */

'use strict'

import 'zx/globals'

import { readFile, writeFile } from 'fs/promises'
import assert from 'assert'
import { join } from 'desm'
import semver from 'semver'

// xz/globals loads minimist-parsed args as a global `argv`, but it
// interprets args like '8.10' as numbers and shortens them to '8.1'.
// so we have to import and configure minimist ourselves.
import minimist from 'minimist'
const argv = minimist(process.argv.slice(2), { string: ['_', 'task'] })
assert(typeof argv.task === 'string', 'Missing task parameter')

switch (argv.task) {
  case 'release':
    release(argv._).catch(onError)
    break
  case 'bump':
    bump(argv._).catch(onError)
    break
  case 'codegen':
    codegen(argv._).catch(onError)
    break
  default:
    console.log(`Unknown task: ${argv.task}`)
    process.exit(1)
}

async function release (args) {
  assert(args.length === 2, 'Release task expects two parameters')
  let [version, outputFolder] = args

  if (process.env.WORKFLOW === 'snapshot' && !version.endsWith('SNAPSHOT')) {
    version = `${version}-SNAPSHOT`
  }

  await bump([version])

  const packageJson = JSON.parse(await readFile(
    join(import.meta.url, '..', 'package.json'),
    'utf8'
  ))

  await $`npm run build`
  await $`npm pack`
  await $`zip elasticsearch-js-${version}.zip elastic-elasticsearch-${packageJson.version}.tgz`
  await $`rm elastic-elasticsearch-${packageJson.version}.tgz`
  await $`mv ${join(import.meta.url, '..', `elasticsearch-js-${version}.zip`)} ${join(import.meta.url, '..', outputFolder, `elasticsearch-js-${version}.zip`)}`
}

async function bump (args) {
  assert(args.length === 1, 'Bump task expects one parameter')
  let [version] = args
  const packageJson = JSON.parse(await readFile(
    join(import.meta.url, '..', 'package.json'),
    'utf8'
  ))

  if (version.split('.').length === 2) version = `${version}.0`
  const cleanVersion = semver.clean(version.includes('SNAPSHOT') ? version.split('-')[0] : version)
  assert(semver.valid(cleanVersion), `${cleanVersion} is not seen as a valid semver version. raw version: ${version}`)
  packageJson.version = cleanVersion
  packageJson.versionCanary = `${cleanVersion}-canary.0`

  await writeFile(
    join(import.meta.url, '..', 'package.json'),
    JSON.stringify(packageJson, null, 2),
    'utf8'
  )

  const pipeline = await readFile(join(import.meta.url, '..', '.buildkite', 'pipeline.yml'), 'utf8')
  await writeFile(
    join(import.meta.url, '..', '.buildkite', 'pipeline.yml'),
    pipeline.replace(/STACK_VERSION: [0-9]+[0-9\.]*[0-9](?:\-SNAPSHOT)?/, `STACK_VERSION: ${cleanVersion}`),
    'utf8'
  )
}

// this command can only be executed locally for now
async function codegen (args) {
  assert(args.length === 1, 'Codegen task expects one parameter')
  const version = args[0].toString()

  const clientGeneratorPath = join(import.meta.url, '..', '..', 'elastic-client-generator-js')
  const isGeneratorCloned = await $`[[ -d ${clientGeneratorPath} ]]`.exitCode === 0
  assert(isGeneratorCloned, 'You must clone the elastic-client-generator-js first')

  await $`npm install --prefix ${clientGeneratorPath}`

  // generate elasticsearch client. this command will take a while!
  if (version === 'main') {
    await $`npm run elasticsearch --prefix ${clientGeneratorPath} -- --version main`
  } else {
    await $`npm run elasticsearch --prefix ${clientGeneratorPath} -- --version ${version.split('.').slice(0, 2).join('.')}`
  }
  // clean up fixable linter issues
  await $`npm run fix --prefix ${clientGeneratorPath}`

  await $`rm -rf ${join(import.meta.url, '..', 'src', 'api')}`
  await $`mkdir ${join(import.meta.url, '..', 'src', 'api')}`
  await $`cp -R ${join(import.meta.url, '..', '..', 'elastic-client-generator-js', 'output')}/* ${join(import.meta.url, '..', 'src', 'api')}`
  await $`mv ${join(import.meta.url, '..', 'src', 'api', 'reference.md')} ${join(import.meta.url, '..', 'docs', 'reference', 'api-reference.md')}`
  await $`npm run build`

  // run docs example generation
  if (version === 'main') {
    await $`node ./scripts/generate-docs-examples.js`
  } else {
    await $`node ./scripts/generate-docs-examples.js ${version.split('.').slice(0, 2).join('.')}`
  }
}

function onError (err) {
  console.log(err)
  process.exit(1)
}
