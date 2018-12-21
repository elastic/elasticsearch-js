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
  var setup = null
  var teardown = null

  function setBeforeEach (fn) {
    beforeEach = fn
  }

  function setAfterEach (fn) {
    afterEach = fn
  }

  function setSetup (fn) {
    setup = fn
  }

  function setTeardown (fn) {
    teardown = fn
  }

  function runSetup (q, done) {
    if (setup !== null) {
      setup(() => {
        setup = null
        done()
      })
    } else {
      done()
    }
  }

  function benchmark (title, opts, fn) {
    if (fn == null) {
      fn = opts
      opts = {}
    }

    stats[title] = []
    var { measure, warmup } = opts
    const b = new B({ iterations: opts.iterations })

    q.add(runSetup)
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
    async function elaborateStats (q) {
      const times = stats[title].map(s => s.milliseconds / b.iterations)
      if (b.client) {
        const { body } = await b.client.nodes.stats({ metric: 'http,jvm,os' })
        const esStats = body.nodes[Object.keys(body.nodes)[0]]
        b.comment(dedent`
          mean: ${ss.mean(times)} ms
          median: ${ss.median(times)} ms
          min: ${ss.min(times)} ms
          max: ${ss.max(times)} ms
          standard deviation: ${ss.standardDeviation(times)}
          http total connections: ${esStats.http.total_opened}
          jvm heap used: ${esStats.jvm.mem.heap_used_percent}%
        `)
      } else {
        b.comment(dedent`
          mean: ${ss.mean(times)} ms
          median: ${ss.median(times)} ms
          min: ${ss.min(times)} ms
          max: ${ss.max(times)} ms
          standard deviation: ${ss.standardDeviation(times)}
        `)
      }
    }
  }

  q.drain(done => {
    if (teardown) {
      teardown(done)
    } else {
      done()
    }
  })

  return {
    bench: dezalgo(benchmark),
    beforeEach: setBeforeEach,
    afterEach: setAfterEach,
    setup: setSetup,
    teardown: setTeardown
  }
}

class B extends EventEmitter {
  constructor (opts) {
    super()
    this.begin = 0
    this.time = 0
    this.iterations = opts.iterations || 1
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
