'use strict'

const { EventEmitter } = require('events')
const dezalgo = require('dezalgo')
const convertHrtime = require('convert-hrtime')
const workq = require('workq')
const dedent = require('dedent')
const ss = require('simple-statistics')

function buildBenchmark () {
  const q = workq()
  const stats = {}
  var beforeEach = null
  var afterEach = null

  function setBeforeEach (fn) {
    beforeEach = fn
  }

  function setAfterEach (fn) {
    afterEach = fn
  }

  function benchmark (title, opts, fn) {
    if (fn == null) {
      fn = opts
      opts = {}
    }

    stats[title] = []
    var { measure, warmup } = opts
    const b = new B()

    q.add(runBenchmark)
    q.add(elaborateStats)

    // Task that runs the benchmark and collects the stats
    function runBenchmark (q, done) {
      b.comment(`\n# ${title}`)
      b.once('fail', err => {
        b.comment(err)
        if (b.client) {
          b.client.close(done)
        } else {
          done()
        }
      })

      process.nextTick(run)
      async function run () {
        if (beforeEach) {
          try {
            await beforeEach(b)
          } catch (err) {
            b.comment('Error: beforeEach hook has failed')
            return b.fail(err)
          }
        }

        try {
          await fn(b)
        } catch (err) {
          return b.fail(err)
        }

        if (afterEach) {
          try {
            await afterEach(b)
          } catch (err) {
            b.comment('Error: afterEach hook has failed')
            return b.fail(err)
          }
        }

        // still need to warmup
        if (warmup-- > 0) {
          process.nextTick(run)
        // save the actual measure
        } else if (measure-- > 0) {
          stats[title].push(convertHrtime(b.time))
          process.nextTick(run)
        // calculate the statistics
        } else {
          done()
        }
      }
    }

    // task that elaborate the collected stats
    function elaborateStats (q, done) {
      const times = stats[title].map(s => s.seconds)
      b.comment(dedent`
        mean: ${ss.mean(times)}
        median: ${ss.median(times)}
        min: ${ss.min(times)}
        max: ${ss.max(times)}
        standard deviation: ${ss.standardDeviation(times)}
      `)
      done()
    }
  }

  q.drain(done => {
    done()
  })

  return {
    bench: dezalgo(benchmark),
    beforeEach: setBeforeEach,
    afterEach: setAfterEach
  }
}

class B extends EventEmitter {
  constructor (opts) {
    super()
    this.begin = 0
    this.time = 0
    this.client = null
  }

  start () {
    this.begin = process.hrtime()
  }

  end () {
    this.time = process.hrtime(this.begin)
  }

  fail (err) {
    this.emit('fail', err)
  }

  comment (...args) {
    console.log(...args)
  }
}

module.exports = buildBenchmark
