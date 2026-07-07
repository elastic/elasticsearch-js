/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'tap'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const tscPath = join(__dirname, '../../node_modules/typescript/bin/tsc')
const tsconfigPath = join(__dirname, 'fixtures/tsconfig.json')

test('ClientOptions and NodeOptions are exported from the ESM entry point types', t => {
  t.plan(1)

  execFileSync(process.execPath, [tscPath, '-p', tsconfigPath], {
    stdio: 'pipe'
  })

  t.pass('ESM entry point types resolve with bundler moduleResolution')
})
