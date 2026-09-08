/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'tap'
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = join(__dirname, '..', '..')

function declarationFiles (dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...declarationFiles(full))
    else if (entry.name.endsWith('.d.ts')) out.push(full)
  }
  return out
}

// Bare specifier: an external package import, not a relative or absolute path.
function bareSpecifiers (content: string): string[] {
  const specs: string[] = []
  const re = /(?:from|import\()\s*(['"])([^'"]+)\1/g
  let match
  while ((match = re.exec(content)) !== null) {
    const spec = match[2]
    if (!spec.startsWith('.') && !spec.startsWith('/')) specs.push(spec)
  }
  return specs
}

test('esm declaration files have no bare specifier ending in .js', async t => {
  for (const file of declarationFiles(join(root, 'esm'))) {
    for (const spec of bareSpecifiers(readFileSync(file, 'utf8'))) {
      t.notMatch(spec, /\.js$/, `${relative(root, file)}: bare specifier '${spec}' must not end in .js`)
    }
  }
})

test('esm and lib declaration files agree on bare specifiers', async t => {
  for (const esmFile of declarationFiles(join(root, 'esm'))) {
    const rel = relative(join(root, 'esm'), esmFile)
    const libFile = join(root, 'lib', rel)
    let libContent: string
    try {
      libContent = readFileSync(libFile, 'utf8')
    } catch {
      continue // esm-only files (e.g. package.json shims) have no lib counterpart
    }
    t.same(
      bareSpecifiers(readFileSync(esmFile, 'utf8')).sort(),
      bareSpecifiers(libContent).sort(),
      `bare specifiers must match between esm/${rel} and lib/${rel}`
    )
  }
})

// apache-arrow is an optional peer dependency. Its types must stay out of the
// always-reachable declaration graph so that importing the client does not force
// consumers to install apache-arrow to type-check. Precise types are opt-in via
// the standalone helpers-arrow module.
test('apache-arrow is only referenced from the opt-in helpers-arrow module', async t => {
  for (const dir of ['esm', 'lib']) {
    for (const file of declarationFiles(join(root, dir))) {
      const rel = relative(root, file)
      if (/helpers-arrow\.d\.ts$/.test(file)) {
        t.match(readFileSync(file, 'utf8'), /apache-arrow/, `${rel} should carry the opt-in apache-arrow types`)
        continue
      }
      t.notMatch(readFileSync(file, 'utf8'), /apache-arrow/, `${rel} must not reference apache-arrow`)
    }
  }
})
