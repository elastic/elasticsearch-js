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
const { readdirSync, readFileSync, writeFileSync } = require('fs')
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
  string: ['tag', 'branch']
}))

function start (opts) {
  const log = ora('Loading Elasticsearch Repository').start()
  if (opts.branch == null && semver.valid(opts.tag) === null) {
    log.fail(`Missing or invalid tag: ${opts.tag}`)
    return
  }
  const packageFolder = join(__dirname, '..', 'api')
  const apiOutputFolder = join(packageFolder, 'api')
  const mainOutputFile = join(packageFolder, 'index.js')
  const typeDefFile = join(__dirname, '..', 'index.d.ts')
  const kibanaTypeDefFile = join(packageFolder, 'kibana.d.ts')
  const docOutputFile = join(__dirname, '..', 'docs', 'reference.asciidoc')
  const requestParamsOutputFile = join(packageFolder, 'requestParams.d.ts')

  log.text = 'Cleaning API folder...'
  rimraf.sync(join(apiOutputFolder, '*.js'))

  cloneAndCheckout({ log, tag: opts.tag, branch: opts.branch }, (err, { apiFolder, xPackFolder }) => {
    if (err) {
      log.fail(err.message)
      return
    }

    const apiFolderContents = readdirSync(apiFolder)
    const xPackFolderContents = readdirSync(xPackFolder)

    const allSpec = apiFolderContents.concat(xPackFolderContents)
      .filter(file => file !== '_common.json')
      .filter(file => !file.includes('deprecated'))
      .sort()
      .map(file => {
        try {
          return JSON.parse(readFileSync(join(apiFolder, file), 'utf8'))
        } catch (err) {
          return JSON.parse(readFileSync(join(xPackFolder, file), 'utf8'))
        }
      })

    const namespaces = namespacify(apiFolderContents.concat(xPackFolderContents))
    for (const namespace in namespaces) {
      if (namespace === '_common') continue
      const code = generate(namespace, namespaces[namespace], { apiFolder, xPackFolder }, opts.branch || opts.tag)
      const filePath = join(apiOutputFolder, `${namespace}.js`)
      writeFileSync(filePath, code, { encoding: 'utf8' })
    }

    writeFileSync(
      requestParamsOutputFile,
      generateRequestTypes(opts.branch || opts.tag, allSpec),
      { encoding: 'utf8' }
    )

    const { fn: factory, types, kibanaTypes } = genFactory(apiOutputFolder, [apiFolder, xPackFolder], namespaces)
    writeFileSync(
      mainOutputFile,
      factory,
      { encoding: 'utf8' }
    )

    let oldTypeDefString = readFileSync(typeDefFile, 'utf8')
    let start = oldTypeDefString.indexOf('/* GENERATED */')
    let end = oldTypeDefString.indexOf('/* /GENERATED */')
    let newTypeDefString = oldTypeDefString.slice(0, start + 15) + '\n' + types + '\n  ' + oldTypeDefString.slice(end)
    writeFileSync(
      typeDefFile,
      newTypeDefString,
      { encoding: 'utf8' }
    )

    oldTypeDefString = readFileSync(kibanaTypeDefFile, 'utf8')
    start = oldTypeDefString.indexOf('/* GENERATED */')
    end = oldTypeDefString.indexOf('/* /GENERATED */')
    newTypeDefString = oldTypeDefString.slice(0, start + 15) + '\n' + kibanaTypes + '\n  ' + oldTypeDefString.slice(end)
    writeFileSync(
      kibanaTypeDefFile,
      newTypeDefString,
      { encoding: 'utf8' }
    )

    lintFiles(log, () => {
      log.text = 'Generating documentation'
      writeFileSync(
        docOutputFile,
        generateDocs(require(join(apiFolder, '_common.json')), allSpec),
        { encoding: 'utf8' }
      )

      log.succeed('Done!')
    })
  })

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

  function namespacify (apis) {
    return apis
      .map(api => api.slice(0, -5))
      .filter(api => api !== '_common')
      .filter(api => !api.includes('deprecated'))
      .reduce((acc, val) => {
        if (val.includes('.')) {
          val = val.split('.')
          acc[val[0]] = acc[val[0]] || []
          acc[val[0]].push(val[1])
        } else {
          acc[val] = []
        }
        return acc
      }, {})
  }
}
