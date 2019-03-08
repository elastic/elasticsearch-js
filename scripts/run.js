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

const { join } = require('path')
const { readdirSync, writeFileSync } = require('fs')
const minimist = require('minimist')
const semver = require('semver')
const ora = require('ora')
const rimraf = require('rimraf')
const standard = require('standard')
const {
  generate,
  cloneAndCheckout,
  genFactory,
  generateRequestTypes,
  generateDocs
} = require('./utils')

start(minimist(process.argv.slice(2), {
  string: ['tag']
}))

function start (opts) {
  const log = ora('Loading Elasticsearch Repository').start()
  if (semver.valid(opts.tag) === null) {
    log.fail(`Missing or invalid tag: ${opts.tag}`)
    return
  }
  const packageFolder = join(__dirname, '..', 'api')
  const apiOutputFolder = join(packageFolder, 'api')
  const mainOutputFile = join(packageFolder, 'index.js')
  const typesOutputFile = join(packageFolder, 'generated.d.ts')
  const docOutputFile = join(__dirname, '..', 'docs', 'reference.asciidoc')
  const requestParamsOutputFile = join(packageFolder, 'requestParams.d.ts')
  const allSpec = []

  log.text = 'Cleaning API folder...'
  rimraf.sync(join(apiOutputFolder, '*.js'))

  cloneAndCheckout({ log, tag: opts.tag }, (err, { apiFolder, xPackFolder }) => {
    if (err) {
      log.fail(err.message)
      return
    }

    const apiFolderContents = readdirSync(apiFolder)
    const xPackFolderContents = readdirSync(xPackFolder)

    apiFolderContents.forEach(generateApiFile(apiFolder, log))
    xPackFolderContents.forEach(generateApiFile(xPackFolder, log))

    writeFileSync(
      requestParamsOutputFile,
      generateRequestTypes(allSpec),
      { encoding: 'utf8' }
    )

    const { fn: factory, types } = genFactory(apiOutputFolder)
    writeFileSync(
      mainOutputFile,
      factory,
      { encoding: 'utf8' }
    )
    writeFileSync(
      typesOutputFile,
      types,
      { encoding: 'utf8' }
    )

    lintFiles(log, () => {
      log.text = 'Generating documentation'
      const allSpec = apiFolderContents.filter(f => f !== '_common.json')
        .map(f => require(join(apiFolder, f)))
        .concat(xPackFolderContents.map(f => require(join(xPackFolder, f))))
      writeFileSync(
        docOutputFile,
        generateDocs(require(join(apiFolder, '_common.json')), allSpec),
        { encoding: 'utf8' }
      )

      log.succeed('Done!')
      console.log('Remember to copy the generated types into the index.d.ts file')
    })
  })

  function generateApiFile (apiFolder, log) {
    var common = null
    try {
      common = require(join(apiFolder, '_common.json'))
    } catch (e) {}

    return function _generateApiFile (file) {
      if (file === '_common.json') return
      log.text = `Processing ${file}`

      const spec = require(join(apiFolder, file))
      allSpec.push(spec)
      const code = generate(spec, common)
      const filePath = join(apiOutputFolder, `${file.slice(0, file.lastIndexOf('.'))}.js`)

      writeFileSync(filePath, code, { encoding: 'utf8' })
    }
  }

  function lintFiles (log, cb) {
    log.text = 'Linting...'
    const files = [join(packageFolder, '*.js'), join(apiOutputFolder, '*.js')]
    standard.lintFiles(files, { fix: true }, err => {
      if (err) {
        return log.fail(err.message)
      }
      cb()
    })
  }
}
