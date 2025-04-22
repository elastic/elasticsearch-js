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

process.on('unhandledRejection', function (err) {
  console.error(err)
  process.exit(1)
})

const assert = require('node:assert')
const url = require('node:url')
const fs = require('node:fs')
const path = require('node:path')
const globby = require('globby')
const semver = require('semver')
const downloadArtifacts = require('../../scripts/download-artifacts')

const buildTests = require('./test-builder')

const yamlFolder = downloadArtifacts.locations.testYamlFolder

const getAllFiles = async dir => {
  const files = await globby(dir, {
    expandDirectories: {
      extensions: ['yml', 'yaml']
    }
  })
  return files.sort()
}

async function doTestBuilder (version, clientOptions) {
  await downloadArtifacts(undefined, version)
  const files = await getAllFiles(yamlFolder)
  await buildTests(files, clientOptions)
}

if (require.main === module) {
  const node = process.env.TEST_ES_SERVER
  const apiKey = process.env.ES_API_SECRET_KEY
  const password = process.env.ELASTIC_PASSWORD
  let version = process.env.STACK_VERSION

  assert(node != null, 'Environment variable missing: TEST_ES_SERVER')
  assert(apiKey != null || password != null, 'Environment variable missing: ES_API_SECRET_KEY or ELASTIC_PASSWORD')
  assert(version != null, 'Environment variable missing: STACK_VERSION')

  version = semver.clean(version.includes('SNAPSHOT') ? version.split('-')[0] : version)

  const clientOptions = { node }
  if (apiKey != null) {
    clientOptions.auth = { apiKey }
  } else {
    clientOptions.auth = { username: 'elastic', password }
  }
  const nodeUrl = new url.URL(node)
  if (nodeUrl.protocol === 'https:') {
    clientOptions.tls = {
      ca: fs.readFileSync(path.join(__dirname, '..', '..', '.buildkite', 'certs', 'ca.crt'), 'utf8'),
      rejectUnauthorized: false
    }
  }

  doTestBuilder(version, clientOptions)
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}
