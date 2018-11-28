'use strict'

const { join } = require('path')
const { readdirSync, writeFileSync } = require('fs')
const minimist = require('minimist')
const semver = require('semver')
const ora = require('ora')
const rimraf = require('rimraf')
const standard = require('standard')
const { generate, cloneAndCheckout, genFactory } = require('./utils')

start(minimist(process.argv.slice(2), {
  string: ['tag']
}))

function start (opts) {
  const log = ora('Loading Elasticsearch Repository').start()
  if (semver.valid(opts.tag) === null) {
    log.fail(`Missing or invalid tag: ${opts.tag}`)
    return
  }
  const packageFolder = join(__dirname, '..', 'api')
  const apiOutputFolder = join(packageFolder, 'api')
  const mainOutputFile = join(packageFolder, 'index.js')
  const typesOutputFile = join(packageFolder, 'generated.d.ts')

  log.text = 'Cleaning API folder...'
  rimraf.sync(join(apiOutputFolder, '*.js'))

  cloneAndCheckout({ log, tag: opts.tag }, (err, { apiFolder, xPackFolder }) => {
    if (err) {
      log.fail(err.message)
      return
    }

    readdirSync(apiFolder).forEach(generateApiFile(apiFolder, log))
    readdirSync(xPackFolder).forEach(generateApiFile(xPackFolder, log))

    const { fn: factory, types } = genFactory(apiOutputFolder)
    writeFileSync(
      mainOutputFile,
      factory,
      { encoding: 'utf8' }
    )
    writeFileSync(
      typesOutputFile,
      types,
      { encoding: 'utf8' }
    )
    lintFiles(log)
  })

  function generateApiFile (apiFolder, log) {
    var common = null
    try {
      common = require(join(apiFolder, '_common.json'))
    } catch (e) {}

    return function _generateApiFile (file) {
      if (file === '_common.json') return
      log.text = `Processing ${file}`

      const spec = require(join(apiFolder, file))
      const code = generate(spec, common)
      const filePath = join(apiOutputFolder, `${file.slice(0, file.lastIndexOf('.'))}.js`)

      writeFileSync(filePath, code, { encoding: 'utf8' })
    }
  }

  function lintFiles (log) {
    log.text = 'Linting...'
    const files = [join(packageFolder, '*.js'), join(apiOutputFolder, '*.js')]
    standard.lintFiles(files, { fix: true }, err => {
      if (err) {
        return log.fail(err.message)
      }
      log.succeed('Done!')
      console.log('Remember to copy the generated types into the index.d.ts file')
    })
  }
}
