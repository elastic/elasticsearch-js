/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { join, dirname } from 'path'
import { pipeline } from 'stream/promises'
import { createWriteStream, promises } from 'fs'
import { fileURLToPath } from 'url'
import { rimraf } from 'rimraf'
import crossZip from 'cross-zip'
import { promisify } from 'util'
import ora from 'ora'

const { mkdir, cp } = promises
const unzip = promisify(crossZip.unzip)

const __dirname = dirname(fileURLToPath(import.meta.url))

export const testYamlFolder = join(__dirname, '..', 'yaml-rest-tests')
export const zipFile = join(__dirname, '..', 'elasticsearch-clients-tests.zip')
export const schemaFolder = join(__dirname, '..', 'schema')
export const schemaJson = join(schemaFolder, 'schema.json')

export default async function downloadArtifacts (localTests, version = 'main') {
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

// Run if this is the main module
const isMain = import.meta.url === `file://${process.argv[1]}`
if (isMain) {
  process.on('unhandledRejection', function (err) {
    console.error(err)
    process.exit(1)
  })

  downloadArtifacts().catch(t => {
    console.log(t)
    process.exit(2)
  })
}
