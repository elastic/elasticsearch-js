/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Fuzz test runner compatible with the jsfuzz target format.
 *
 * Loads every *.fuzz.mjs target in this directory and hammers each one with
 * random byte buffers for a bounded period.  Any unhandled exception is
 * treated as a crash and reported.
 *
 * Usage:
 *   npm run test:fuzz                   # 10 s per target (default)
 *   FUZZ_TIMEOUT=30 npm run test:fuzz   # 30 s per target
 */

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TIMEOUT_MS = Number(process.env.FUZZ_TIMEOUT ?? 10) * 1000
const MAX_INPUT_BYTES = 4096

/** Generate a random buffer between 0 and MAX_INPUT_BYTES long. */
function randomBuf () {
  const len = Math.floor(Math.random() * MAX_INPUT_BYTES)
  return crypto.randomBytes(len)
}

/** Mutate a buffer with simple byte-flip / splice mutations. */
function mutate (buf) {
  if (buf.length === 0) return randomBuf()
  const out = Buffer.from(buf)
  const mutations = 1 + Math.floor(Math.random() * 4)
  for (let i = 0; i < mutations; i++) {
    const pos = Math.floor(Math.random() * out.length)
    out[pos] = Math.floor(Math.random() * 256)
  }
  return out
}

const seedInputs = [
  Buffer.alloc(0),
  Buffer.from('{}'),
  Buffer.from('null'),
  Buffer.from('{"index":"my-index"}'),
  Buffer.from('a=1&b=hello+world'),
  Buffer.from('http://localhost:9200'),
  Buffer.from('not-json'),
  Buffer.from('\x00\x01\x02\x03')
]

const targetFiles = fs
  .readdirSync(__dirname)
  .filter(f => f.endsWith('.fuzz.mjs'))

const targets = []
for (const f of targetFiles) {
  const mod = await import(pathToFileURL(path.join(__dirname, f)).href)
  targets.push({ name: f, fn: mod.fuzz })
}

let totalCrashes = 0

for (const { name, fn } of targets) {
  console.log(`\n=== ${name} (${TIMEOUT_MS / 1000}s) ===`)
  const deadline = Date.now() + TIMEOUT_MS
  let runs = 0
  let crashes = 0
  const corpus = [...seedInputs]

  while (Date.now() < deadline) {
    const base = corpus[Math.floor(Math.random() * corpus.length)]
    const input = Math.random() < 0.3 ? randomBuf() : mutate(base)

    try {
      fn(input)
      // Add interesting inputs to corpus for further mutation
      if (runs % 50 === 0) corpus.push(input)
    } catch (err) {
      crashes++
      totalCrashes++
      const hex = input.toString('hex').slice(0, 64)
      console.error(`  CRASH after ${runs} runs: ${err.message}`)
      console.error(`  input (hex, first 64 chars): ${hex}`)
      // Write artifact for reproduction
      const artifactPath = path.join(__dirname, `crash-${name}-${runs}.bin`)
      fs.writeFileSync(artifactPath, input)
      console.error(`  artifact: ${artifactPath}`)
    }
    runs++
  }

  const elapsed = (TIMEOUT_MS / 1000).toFixed(0)
  console.log(`  ${runs} runs in ${elapsed}s — ${crashes} crash(es)`)
}

console.log(`\nTotal crashes: ${totalCrashes}`)
process.exit(totalCrashes > 0 ? 1 : 0)
