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

const { join } = require('path')
const stream = require('stream')
const { promisify } = require('util')
const { createWriteStream, promises } = require('fs')
const { rimraf } = require('rimraf')
const fetch = require('node-fetch')
const crossZip = require('cross-zip')
const ora = require('ora')

const { mkdir, cp } = promises
const pipeline = promisify(stream.pipeline)
const unzip = promisify(crossZip.unzip)

const testYamlFolder = join(__dirname, '..', 'yaml-rest-tests')
const zipFile = join(__dirname, '..', 'elasticsearch-clients-tests.zip')

const schemaFolder = join(__dirname, '..', 'schema')
const schemaJson = join(schemaFolder, 'schema.json')

async function downloadArtifacts (localTests, version = 'main') {
  const log = ora('Checking out spec and test').start()

  const { GITHUB_TOKEN } = process.env

  if (version !== 'main') {
    version = version.split('.').slice(0, 2).join('.')
  }

  log.text = 'Clean tests folder'
  await rimraf(testYamlFolder)
  await mkdir(testYamlFolder, { recursive: true })

  log.text = `Fetch test YAML files for version ${version}`

  if (localTests) {
    log.text = `Copying local tests from ${localTests}`
    await cp(localTests, testYamlFolder, { recursive: true })
  } else {
    if (!GITHUB_TOKEN) {
      log.fail("Missing required environment variable 'GITHUB_TOKEN'")
      process.exit(1)
    }

    const response = await fetch(`https://api.github.com/repos/elastic/elasticsearch-clients-tests/zipball/${version}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json'
      }
    })

    if (!response.ok) {
      log.fail(`unexpected response ${response.statusText}`)
      process.exit(1)
    }

    log.text = 'Downloading tests zipball'
    await pipeline(response.body, createWriteStream(zipFile))

    log.text = 'Unzipping tests'
    await unzip(zipFile, testYamlFolder)

    log.text = 'Cleanup'
    await rimraf(zipFile)
  }

  log.text = 'Fetching Elasticsearch specification'
  await rimraf(schemaFolder)
  await mkdir(schemaFolder, { recursive: true })

  const response = await fetch(`https://raw.githubusercontent.com/elastic/elasticsearch-specification/${version}/output/schema/schema.json`)
  if (!response.ok) {
    log.fail(`unexpected response ${response.statusText}`)
    process.exit(1)
  }

  log.text = 'Downloading schema.json'
  await pipeline(response.body, createWriteStream(schemaJson))

  log.succeed('Done')
}

async function main () {
  await downloadArtifacts()
}

if (require.main === module) {
  process.on('unhandledRejection', function (err) {
    console.error(err)
    process.exit(1)
  })

  main().catch(t => {
    console.log(t)
    process.exit(2)
  })
}

module.exports = downloadArtifacts
module.exports.locations = { testYamlFolder, zipFile, schemaJson }
