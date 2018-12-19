'use strict'

const { EventEmitter } = require('events')
const dezalgo = require('dezalgo')
const dedent = require('dedent')
const prettyHrtime = require('pretty-hrtime')
const workq = require('workq')

function buildBenchmark (options) {
  options = options || {}
  const q = workq()
  const { beforeEach, afterEach } = options
  const benchStats = {}
  const stats = {
    passed: 0,
    failed: 0
  }

  var only = false
  var count = 0

  function benchmark (title, opts, fn) {
    if (fn == null) {
      fn = opts
      opts = {}
    }

    if (only === true && opts.only !== true) return
    benchStats[title] = []

    const repetitions = opts.repetitions || options.repetitions || { warmup: 0, measure: 1 }
    var { measure, warmup } = repetitions

    q.add((q, done) => {
      const b = new B({ index: ++count })

      b.comment(`\n# ${title}`)

      b.on('end', time => {
        if (warmup-- > 0) {
          process.nextTick(run)
        } else if (measure-- > 0) {
          // TODO: add some stats, such as median
          benchStats[title].push(time)
          process.nextTick(run)
        } else {
          stats.passed++
          b.comment(`1..${repetitions.measure}`)
          b.comment(`ok ${b.index} - ${prettyHrtime(time)} ${rawTime(time)}`)
          done()
        }
      })

      b.on('fail', err => {
        stats.failed++
        b.comment(`1..${repetitions.measure - measure + 1}`)
        b.comment(`not ok ${b.index} -`, err)
        done()
      })

      process.nextTick(run)
      async function run () {
        if (beforeEach) await beforeEach(b)
        await fn(b)
        if (afterEach) await afterEach(b)
      }
    })
  }

  q.drain(done => {
    console.log(dedent`
      \n1..${count}
      # passed: ${stats.passed}
      # failed: ${stats.failed}
    `)

    done()
  })

  benchmark.only = function (title, opts, fn) {
    if (only === true) {
      throw new Error('Only a single "only" benchmark can be specified')
    }
    if (fn == null) {
      fn = opts
      opts = {}
    }
    only = true
    benchmark(title, Object.assign(opts, { only: true }), fn)
  }

  return dezalgo(benchmark)
}

class B extends EventEmitter {
  constructor (opts) {
    super()
    this.begin = 0
    this.index = opts.index
  }

  start () {
    this.begin = process.hrtime()
  }

  end () {
    this.emit('end', process.hrtime(this.begin))
  }

  fail (err) {
    this.emit('fail', err)
  }

  comment (...args) {
    console.log(...args)
  }
}

function rawTime (hr) {
  return `(${hr[0]} s ${hr[1]} ns)`
}

module.exports = buildBenchmark
