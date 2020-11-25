'use strict'

/**
 * Script for releasing the canary client to npm.
 * It should be executed from the top level directory of the repository.
 *
 * Usage:
 *    node scripts/release-canary.js --otp <otp-code>
 *
 * You can reset the canary count via the `--reset` option
 *    node scripts/release-canary.js --otp <otp-code> --reset
 *
 * You can also do a dry run with the `--dry-run` option
 *    node scripts/release-canary.js --otp <otp-code> --dry-run
 */

const readline = require('readline')
const assert = require('assert')
const { execSync } = require('child_process')
const { writeFile, readFile } = require('fs').promises
const { join } = require('path')
const minimist = require('minimist')
const chalk = require('chalk')

async function release (opts) {
  assert(process.cwd() !== __dirname, 'You should run the script from the top level directory of the repository')
  assert(typeof opts.otp === 'string', 'Missing OTP')
  const packageJson = JSON.parse(await readFile(join(__dirname, '..', 'package.json'), 'utf8'))

  const originalName = packageJson.name
  const originalVersion = packageJson.version
  const currentCanaryVersion = packageJson.versionCanary
  const originalNpmIgnore = await readFile(join(__dirname, '..', '.npmignore'), 'utf8')

  const newCanaryInteger = opts.reset ? 1 : (Number(currentCanaryVersion.split('-')[1].split('.')[1]) + 1)
  const newCanaryVersion = `${originalVersion.split('-')[0]}-canary.${newCanaryInteger}`

  // Update the package.json with the correct name and new version
  packageJson.name = '@elastic/elasticsearch-canary'
  packageJson.version = newCanaryVersion
  packageJson.versionCanary = newCanaryVersion
  packageJson.commitHash = execSync('git log -1 --pretty=format:%h').toString()

  // update the package.json
  await writeFile(
    join(__dirname, '..', 'package.json'),
    JSON.stringify(packageJson, null, 2),
    'utf8'
  )

  // update the npmignore to publish the kibana types as well
  const newNpmIgnore = originalNpmIgnore.slice(0, originalNpmIgnore.indexOf('# CANARY-PACKAGE')) +
                       originalNpmIgnore.slice(originalNpmIgnore.indexOf('# /CANARY-PACKAGE') + 17)
  await writeFile(
    join(__dirname, '..', '.npmignore'),
    newNpmIgnore,
    'utf8'
  )

  // confirm the package.json changes with the user
  const diff = execSync('git diff').toString().split('\n').map(colorDiff).join('\n')
  console.log(diff)
  const answer = await confirm()
  // release on npm with provided otp
  if (answer) {
    execSync(`npm publish --otp ${opts.otp} ${opts['dry-run'] ? '--dry-run' : ''}`, { stdio: 'inherit' })
  } else {
    // the changes were not good, restore the previous canary version
    packageJson.versionCanary = currentCanaryVersion
  }

  // restore the package.json to the original values
  packageJson.name = originalName
  packageJson.version = originalVersion
  delete packageJson.commitHash

  await writeFile(
    join(__dirname, '..', 'package.json'),
    JSON.stringify(packageJson, null, 2),
    'utf8'
  )

  await writeFile(
    join(__dirname, '..', '.npmignore'),
    originalNpmIgnore,
    'utf8'
  )
}

function confirm (question) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rl.question('Does it look good? (y/n) ', (answer) => {
      resolve(answer === 'y')
      rl.close()
    })
  })
}

function colorDiff (line) {
  if (line.startsWith('+')) {
    return chalk.green(line)
  } else if (line.startsWith('-')) {
    return chalk.red(line)
  } else {
    return line
  }
}

release(
  minimist(process.argv.slice(2), {
    unknown (option) {
      console.log(`Unrecognized option: ${option}`)
      process.exit(1)
    },
    string: [
      // The otp code for publishing the package
      'otp'
    ],
    boolean: [
      // Reset the canary version to '1'
      'reset',
      // run all the steps but publish
      'dry-run'
    ]
  })
)
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
