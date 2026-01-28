#!/usr/bin/env node
/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const fs = require('fs')
const path = require('path')

// Fix the package.json require in client.js for ESM
const clientPath = path.join(__dirname, '..', 'esm', 'client.js')
const helpersPath = path.join(__dirname, '..', 'esm', 'helpers.js')

// Fix client.js
if (fs.existsSync(clientPath)) {
  let content = fs.readFileSync(clientPath, 'utf8')

  // Check if we need to add createRequire
  const hasPackageRequire = content.includes("require('../package.json')") ||
                            content.includes("require('@elastic/transport/package.json')")

  if (!content.includes('createRequire') && hasPackageRequire) {
    // Find the last import statement
    const lastImportIndex = content.lastIndexOf('import ')
    const newlineAfterImport = content.indexOf('\n', lastImportIndex)

    if (newlineAfterImport !== -1) {
      const beforeImport = content.substring(0, newlineAfterImport + 1)
      const afterImport = content.substring(newlineAfterImport + 1)

      content = beforeImport + "import { createRequire } from 'node:module';\nconst require = createRequire(import.meta.url);\n" + afterImport
    }

    fs.writeFileSync(clientPath, content, 'utf8')
    console.log(`Fixed package.json loading in ${clientPath}`)
  }
} else {
  console.log('client.js not found, skipping fix')
}

// Fix helpers.js - remove incorrect .js extension from apache-arrow import
if (fs.existsSync(helpersPath)) {
  let content = fs.readFileSync(helpersPath, 'utf8')

  // Fix the apache-arrow import that tsc-esm-fix incorrectly modified
  const originalApacheImport = "import { tableFromIPC, AsyncRecordBatchStreamReader } from 'apache-arrow/Arrow.node.js';"
  const fixedApacheImport = "import { tableFromIPC, AsyncRecordBatchStreamReader } from 'apache-arrow/Arrow.node';"

  if (content.includes(originalApacheImport)) {
    content = content.replace(originalApacheImport, fixedApacheImport)
    fs.writeFileSync(helpersPath, content, 'utf8')
    console.log(`Fixed apache-arrow import in ${helpersPath}`)
  }
}
