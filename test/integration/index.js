/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
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

async function doTestBuilder (clientOptions) {
  const files = await getAllFiles(yamlFolder)
  await buildTests(files, clientOptions)
}

if (require.main === module) {
  const node = process.env.TEST_ES_SERVER
  const apiKey = process.env.ES_API_SECRET_KEY
  const password = process.env.ELASTIC_PASSWORD
  assert(node != null, 'Environment variable missing: TEST_ES_SERVER')
  assert(apiKey != null || password != null, 'Environment variable missing: ES_API_SECRET_KEY or ELASTIC_PASSWORD')
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
  doTestBuilder(clientOptions)
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}
