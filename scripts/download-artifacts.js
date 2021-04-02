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
const minimist = require('minimist')
const stream = require('stream')
const { promisify } = require('util')
const { createWriteStream, promises } = require('fs')
const rimraf = require('rimraf')
const fetch = require('node-fetch')
const crossZip = require('cross-zip')
const ora = require('ora')

const { mkdir, writeFile } = promises
const pipeline = promisify(stream.pipeline)
const unzip = promisify(crossZip.unzip)
const rm = promisify(rimraf)

const esFolder = join(__dirname, '..', 'elasticsearch')
const zipFolder = join(esFolder, 'artifacts.zip')
const specFolder = join(esFolder, 'rest-api-spec', 'api')
const freeTestFolder = join(esFolder, 'rest-api-spec', 'test', 'free')
const xPackTestFolder = join(esFolder, 'rest-api-spec', 'test', 'platinum')
const artifactInfo = join(esFolder, 'info.json')

async function downloadArtifacts (opts) {
  if (typeof opts.version !== 'string') {
    throw new Error('Missing version')
  }

  const log = ora('Checking out spec and test').start()

  log.text = 'Resolving versions'
  let resolved
  try {
    resolved = await resolve(opts.version, opts.hash)
  } catch (err) {
    log.fail(err.message)
    process.exit(1)
  }

  opts.id = opts.id || resolved.id
  opts.hash = opts.hash || resolved.hash
  opts.version = resolved.version

  const info = loadInfo()

  if (info && info.version === opts.version) {
    if (info.hash === opts.hash && info.id === opts.id) {
      log.succeed('The artifact copy present locally is already up to date')
      return
    }
  }

  log.text = 'Cleanup checkouts/elasticsearch'
  await rm(esFolder)
  await mkdir(esFolder, { recursive: true })

  log.text = 'Downloading artifacts'
  const response = await fetch(resolved.url)
  if (!response.ok) {
    log.fail(`unexpected response ${response.statusText}`)
    process.exit(1)
  }
  await pipeline(response.body, createWriteStream(zipFolder))

  log.text = 'Unzipping'
  await unzip(zipFolder, esFolder)

  log.text = 'Cleanup'
  await rm(zipFolder)

  log.text = 'Update info'
  await writeFile(artifactInfo, JSON.stringify(opts), 'utf8')

  log.succeed('Done')
}

function loadInfo () {
  try {
    return require(artifactInfo)
  } catch (err) {
    return null
  }
}

async function resolve (version, hash) {
  const response = await fetch(`https://artifacts-api.elastic.co/v1/versions/${version}`)
  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`)
  }

  const data = await response.json()
  const esBuilds = data.version.builds
    .filter(build => build.projects.elasticsearch != null)
    .map(build => {
      return {
        projects: build.projects.elasticsearch,
        buildId: build.build_id,
        date: build.start_time,
        version: build.version
      }
    })
    .sort((a, b) => {
      const dA = new Date(a.date)
      const dB = new Date(b.date)
      if (dA > dB) return -1
      if (dA < dB) return 1
      return 0
    })

  if (hash != null) {
    const build = esBuilds.find(build => build.projects.commit_hash === hash)
    if (!build) {
      throw new Error(`Can't find any build with hash '${hash}'`)
    }
    const zipKey = Object.keys(build.projects.packages).find(key => key.startsWith('rest-resources-zip-') && key.endsWith('.zip'))
    return {
      url: build.projects.packages[zipKey].url,
      id: build.buildId,
      hash: build.projects.commit_hash,
      version: build.version
    }
  }

  const lastBuild = esBuilds[0]
  const zipKey = Object.keys(lastBuild.projects.packages).find(key => key.startsWith('rest-resources-zip-') && key.endsWith('.zip'))
  return {
    url: lastBuild.projects.packages[zipKey].url,
    id: lastBuild.buildId,
    hash: lastBuild.projects.commit_hash,
    version: lastBuild.version
  }
}

async function main (options) {
  delete options._
  await downloadArtifacts(options)
}
if (require.main === module) {
  process.on('unhandledRejection', function (err) {
    console.error(err)
    process.exit(1)
  })

  const options = minimist(process.argv.slice(2), {
    string: ['id', 'version', 'hash']
  })
  main(options).catch(t => {
    console.log(t)
    process.exit(2)
  })
}

module.exports = downloadArtifacts
module.exports.locations = {
  specFolder,
  freeTestFolder,
  xPackTestFolder
}
