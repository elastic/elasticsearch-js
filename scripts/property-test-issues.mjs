/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Runs the Hegel property suite and files one GitHub issue per failing property.
 *
 * Each failure is keyed by `<file> > <test name>`, stored as a hidden marker in the
 * issue body. Existing issues are never duplicated: open ones get a comment only when
 * the minimal example is new, closed ones are reopened unless closed as not planned.
 *
 * Usage (after `npm run build`, with `gh` authenticated):
 *   node scripts/property-test-issues.mjs [--dry-run]
 */

import { execFileSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const LABEL = 'property-test'
const MAX_NEW_ISSUES = 5
// keys are URI-encoded so a `-->` in a test name cannot end the comment
export const marker = key => `<!-- property-test-key: ${encodeURIComponent(key)} -->`
export function readMarker (body) {
  const m = body.match(/<!-- property-test-key: (\S*) -->/)
  if (m == null) return null
  try {
    return decodeURIComponent(m[1])
  } catch {
    return null
  }
}

/**
 * Pairs top-level `not ok` lines from a directly-run tap file with the Hegel failure
 * reports (written to stderr in the same order). tap never runs tests marked TODO, so
 * they have no Hegel report and are dropped before pairing.
 * If the counts disagree (e.g. a non-Hegel crash), examples are dropped rather than misattributed.
 */
export function parseFailures (file, tapOutput, stderr) {
  const tests = []
  for (const line of tapOutput.split('\n')) {
    const m = line.match(/^not ok \d+ - (.*?)(?: # (.*))?$/)
    if (m != null && !/^TODO\b/i.test(m[2] ?? '')) tests.push(m[1])
  }
  // every Hegel report ends with its `.reproduceFailure("<blob>")` line
  const examples = []
  let current = []
  for (const line of stderr.split('\n')) {
    current.push(line)
    const m = line.match(/\.reproduceFailure\("([^"]+)"\)/)
    if (m != null) {
      examples.push({ example: current.join('\n').trim(), blob: m[1] })
      current = []
    }
  }
  const paired = examples.length === tests.length
  return tests.map((name, i) => ({
    file,
    key: `${file} > ${name}`,
    example: paired ? examples[i].example : null,
    blob: paired ? examples[i].blob : null
  }))
}

/** Decides what to do per failure given existing issues ({ number, state, stateReason, key, text }). */
export function planActions (failures, issues, maxNew) {
  const actions = []
  let created = 0
  const seen = new Set()
  for (const failure of failures) {
    if (seen.has(failure.key)) continue
    seen.add(failure.key)
    const issue = issues.find(i => i.key === failure.key)
    if (issue == null) {
      actions.push({ type: created++ < maxNew ? 'create' : 'skip-cap', failure })
    } else if (issue.state === 'CLOSED' && issue.stateReason === 'NOT_PLANNED') {
      actions.push({ type: 'ignore', failure, issue })
    } else if (issue.state === 'CLOSED') {
      actions.push({ type: 'reopen', failure, issue })
    } else if (failure.blob != null && !issue.text.includes(failure.blob)) {
      actions.push({ type: 'comment', failure, issue })
    }
  }
  return actions
}

function gh (...args) {
  return execFileSync('gh', args, { encoding: 'utf8' })
}

function report (failure) {
  const seed = process.env.HEGEL_SEED ?? '<seed>'
  const server = process.env.GITHUB_SERVER_URL
  const run = server != null ? `${server}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}` : 'local run'
  return [
    `Property \`${failure.key}\` failed with \`HEGEL_SEED=${seed}\` (${run}).`,
    '',
    failure.example != null ? '```\n' + failure.example + '\n```' : 'No minimal example could be attributed; see the run log.',
    '',
    `Reproduce locally (POSIX shell): \`npm run build && HEGEL_SEED=${seed} node test/property/${failure.file}\`.`
  ].join('\n')
}

function runSuite (dir) {
  const failures = []
  let crashed = false
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.test.mjs')).sort()) {
    const res = spawnSync(process.execPath, [path.join(dir, file)], {
      encoding: 'utf8',
      // same limit as npm run test:property; tap's 30s default turns slow runs into false failures
      env: { ...process.env, TAP_TIMEOUT: '300' }
    })
    process.stdout.write(res.stdout)
    process.stderr.write(res.stderr)
    const found = parseFailures(file, res.stdout, res.stderr)
    if (res.status !== 0 && found.length === 0) crashed = true
    failures.push(...found)
  }
  return { failures, crashed }
}

function existingIssues () {
  const list = JSON.parse(gh('issue', 'list', '--label', LABEL, '--state', 'all', '--limit', '1000', '--json', 'number,state,stateReason,body,comments'))
  return list.flatMap(issue => {
    const key = readMarker(issue.body)
    if (key == null) return []
    return [{ number: issue.number, state: issue.state, stateReason: issue.stateReason, key, text: issue.body + issue.comments.map(c => c.body).join('\n') }]
  })
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dryRun = process.argv.includes('--dry-run')
  const { failures, crashed } = runSuite(path.join(import.meta.dirname, '..', 'test', 'property'))
  console.log(`\n${failures.length} property failure(s)`)

  if (failures.length > 0) {
    if (!dryRun) gh('label', 'create', LABEL, '--force', '--description', 'Found by the weekly Hegel property test run')
    for (const { type, failure, issue } of planActions(failures, existingIssues(), MAX_NEW_ISSUES)) {
      const prefix = dryRun ? '[dry-run] ' : ''
      if (type === 'skip-cap') console.log(`${prefix}skipped (cap): ${failure.key}`)
      else if (type === 'ignore') console.log(`${prefix}ignored (closed as not planned): #${issue.number}`)
      else console.log(`${prefix}${type}: ${issue != null ? `#${issue.number}` : failure.key}`)
      if (dryRun || type === 'skip-cap' || type === 'ignore') continue
      if (type === 'create') {
        gh('issue', 'create', '--label', LABEL, '--title', `Property test failure: ${failure.key}`, '--body', `${marker(failure.key)}\n${report(failure)}`)
      } else {
        if (type === 'reopen') gh('issue', 'reopen', String(issue.number))
        gh('issue', 'comment', String(issue.number), '--body', report(failure))
      }
    }
  }
  // failures are reported as issues; only fail the job when results could not be parsed
  if (crashed) process.exit(1)
}
