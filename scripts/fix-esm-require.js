/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const fs = require('fs')
const path = require('path')

function injectCreateRequire (filePath, hasRequireCheck, transform) {
  if (!fs.existsSync(filePath)) {
    console.log(`${filePath} not found, skipping fix`)
    return
  }

  let content = fs.readFileSync(filePath, 'utf8')

  if (transform) {
    content = transform(content)
  }

  if (!content.includes('createRequire') && hasRequireCheck(content)) {
    const lastImportIndex = content.lastIndexOf('import ')
    const newlineAfterImport = content.indexOf('\n', lastImportIndex)

    if (newlineAfterImport !== -1) {
      const beforeImport = content.substring(0, newlineAfterImport + 1)
      const afterImport = content.substring(newlineAfterImport + 1)

      content = beforeImport + 'import { createRequire } from \'node:module\';\nconst require = createRequire(import.meta.url ?? __filename);\n' + afterImport
    }
  }

  fs.writeFileSync(filePath, content, 'utf8')
  console.log(`Fixed require() usage in ${filePath}`)
}

injectCreateRequire(
  path.join(__dirname, '..', 'esm', 'client.js'),
  content => content.includes('require(\'../package.json\')') || content.includes('require(\'@elastic/transport/package.json\')')
)

injectCreateRequire(
  path.join(__dirname, '..', 'esm', 'helpers.js'),
  content => content.includes('require(\'apache-arrow/'),
  content => content.replace(/require\('apache-arrow\/Arrow\.node\.js'\)/g, 'require(\'apache-arrow/Arrow.node\')')
)
