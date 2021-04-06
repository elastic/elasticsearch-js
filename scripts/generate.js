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
const { readdirSync, writeFileSync, readFileSync } = require('fs')
const minimist = require('minimist')
const ora = require('ora')
const rimraf = require('rimraf')
const standard = require('standard')
const downloadArtifacts = require('./download-artifacts')
const {
  generate,
  genFactory,
  generateDocs,
  generateRequestTypes
} = require('./utils')

start(minimist(process.argv.slice(2), {
  string: ['version', 'hash']
}))

function start (opts) {
  if (opts.version == null) {
    console.error('Missing version parameter')
    process.exit(1)
  }

  const packageFolder = join(__dirname, '..', 'api')
  const apiOutputFolder = join(packageFolder, 'api')
  const mainOutputFile = join(packageFolder, 'index.js')
  const docOutputFile = join(__dirname, '..', 'docs', 'reference.asciidoc')
  const typeDefFile = join(__dirname, '..', 'index.d.ts')
  const requestParamsOutputFile = join(packageFolder, 'requestParams.d.ts')

  let log
  downloadArtifacts({ version: opts.version, hash: opts.hash })
    .then(onArtifactsDownloaded)
    .catch(err => {
      console.log(err)
      process.exit(1)
    })

  function onArtifactsDownloaded () {
    log = ora('Generating APIs').start()

    log.text = 'Cleaning API folder...'
    rimraf.sync(join(apiOutputFolder, '*.js'))

    const allSpec = readdirSync(downloadArtifacts.locations.specFolder)
      .filter(file => file !== '_common.json')
      .filter(file => !file.includes('deprecated'))
      .sort()
      .map(file => require(join(downloadArtifacts.locations.specFolder, file)))

    const namespaces = namespacify(readdirSync(downloadArtifacts.locations.specFolder))
    for (const namespace in namespaces) {
      if (namespace === '_common') continue
      const code = generate(namespace, namespaces[namespace], downloadArtifacts.locations.specFolder, opts.version)
      const filePath = join(apiOutputFolder, `${namespace}.js`)
      writeFileSync(filePath, code, { encoding: 'utf8' })
    }

    writeFileSync(
      requestParamsOutputFile,
      generateRequestTypes(opts.version, allSpec),
      { encoding: 'utf8' }
    )

    const { fn: factory, types } = genFactory(apiOutputFolder, downloadArtifacts.locations.specFolder, namespaces)
    writeFileSync(
      mainOutputFile,
      factory,
      { encoding: 'utf8' }
    )

    const oldTypeDefString = readFileSync(typeDefFile, 'utf8')
    const start = oldTypeDefString.indexOf('/* GENERATED */')
    const end = oldTypeDefString.indexOf('/* /GENERATED */')
    const newTypeDefString = oldTypeDefString.slice(0, start + 15) + '\n' + types + '\n  ' + oldTypeDefString.slice(end)
    writeFileSync(
      typeDefFile,
      newTypeDefString,
      { encoding: 'utf8' }
    )

    lintFiles(log, () => {
      log.text = 'Generating documentation'
      writeFileSync(
        docOutputFile,
        generateDocs(require(join(downloadArtifacts.locations.specFolder, '_common.json')), allSpec),
        { encoding: 'utf8' }
      )

      log.succeed('Done!')
    })
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
