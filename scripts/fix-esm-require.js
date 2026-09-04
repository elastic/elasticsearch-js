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

// Fix module specifiers in emitted ESM declaration files that tsc-esm-fix gets wrong:
//  1. It appends `.js` to bare specifiers pointing at external packages
//     (e.g. `apache-arrow/Arrow.node` -> `.node.js`). A published package never ships
//     a `.js.d.ts`, so that suffix never resolves for type-checking. Strip it.
//  2. It does NOT append `.js` to relative `declare module './x'` specifiers, so ESM
//     module augmentation fails to match its target under NodeNext. Append it.
// Relative/absolute specifiers are left untouched.
function fixEsmDeclarations (dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      fixEsmDeclarations(fullPath)
    } else if (entry.name.endsWith('.d.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8')
      let fixed = content.replace(/((?:from|import\()\s*)(['"])([^'"]+)\.js\2/g, (match, pre, quote, spec) => {
        if (spec.startsWith('.') || spec.startsWith('/')) return match
        return `${pre}${quote}${spec}${quote}`
      })
      fixed = fixed.replace(/(declare module\s+)(['"])(\.[^'"]+)\2/g, (match, pre, quote, spec) => {
        if (/\.(js|mjs|cjs|json)$/.test(spec)) return match
        return `${pre}${quote}${spec}.js${quote}`
      })
      if (fixed !== content) {
        fs.writeFileSync(fullPath, fixed, 'utf8')
        console.log(`Fixed declaration specifiers in ${fullPath}`)
      }
    }
  }
}

fixEsmDeclarations(path.join(__dirname, '..', 'esm'))
