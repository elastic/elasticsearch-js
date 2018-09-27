'use strict'

const { test } = require('tap')
const { stub } = require('sinon')
const LoggerAbstract = require('../../src/lib/logger')
const Log = require('../../src/lib/log')

function buildLogger (parent = new Log(), levels = []) {
  return new LoggerAbstract(parent, {
    levels: Log.parseLevels(levels)
  })
}

test('The abstract logger should be overwritten', t => {
  t.plan(1)

  try {
    const logger = buildLogger()
    logger.write()
  } catch (err) {
    t.ok(/overwritten/.test(err.message))
  }
})

test('Levels', t => {
  t.test('Should listen for the specified log level', t => {
    t.plan(5)
    const logger = new Log()
    buildLogger(logger, 'error')
    t.strictEqual(logger.listenerCount('error'), 1)
    t.strictEqual(logger.listenerCount('warning'), 0)
    t.strictEqual(logger.listenerCount('info'), 0)
    t.strictEqual(logger.listenerCount('debug'), 0)
    t.strictEqual(logger.listenerCount('trace'), 0)
  })

  t.test('Should listen to all log levels when the level is trace', t => {
    t.plan(5)
    const logger = new Log()
    buildLogger(logger, 'trace')
    t.strictEqual(logger.listenerCount('error'), 1)
    t.strictEqual(logger.listenerCount('warning'), 1)
    t.strictEqual(logger.listenerCount('info'), 1)
    t.strictEqual(logger.listenerCount('debug'), 1)
    t.strictEqual(logger.listenerCount('trace'), 1)
  })

  t.test('Should listen to the specified levels when the level is an array', t => {
    t.plan(5)
    const logger = new Log()
    buildLogger(logger, ['info', 'trace'])
    t.strictEqual(logger.listenerCount('error'), 0)
    t.strictEqual(logger.listenerCount('warning'), 0)
    t.strictEqual(logger.listenerCount('info'), 1)
    t.strictEqual(logger.listenerCount('debug'), 0)
    t.strictEqual(logger.listenerCount('trace'), 1)
  })

  t.test('The internal levels object should not be altered', t => {
    t.plan(3)
    const logger = buildLogger()
    const levels = ['error']
    logger.setupListeners(levels)
    t.deepEqual(logger.listeningLevels, levels)

    levels.push('info')
    t.notDeepEqual(logger.listeningLevels, levels)

    logger.setupListeners(levels)
    t.deepEqual(logger.listeningLevels, levels)
  })

  t.test('Should throw on unsupported log level', t => {
    t.plan(1)
    const logger = buildLogger()
    try {
      logger.setupListeners(['scream'])
      t.fail('Should throw')
    } catch (err) {
      t.ok(err)
    }
  })

  t.test('Should emits log events', t => {
    t.plan(5)
    const logger = new Log()
    buildLogger(logger, 'trace')
    stub(logger, 'emit')

    logger.error('error')
    t.strictEqual(logger.emit.lastCall.args[0], 'error')

    logger.warning('warning')
    t.strictEqual(logger.emit.lastCall.args[0], 'warning')

    logger.info('info')
    t.strictEqual(logger.emit.lastCall.args[0], 'info')

    logger.debug('debug')
    t.strictEqual(logger.emit.lastCall.args[0], 'debug')

    logger.trace('GET', {}, '', '', 200)
    t.strictEqual(logger.emit.lastCall.args[0], 'trace')
  })

  t.end()
})

test('Timestamp should return the right format', t => {
  t.plan(1)
  const reg = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/
  const logger = buildLogger()
  t.true(reg.test(logger.timestamp()))
})

test('Format', t => {
  t.test('Returns a single string with the message indented', t => {
    t.plan(1)
    const logger = buildLogger()
    const msg = logger.format('LABEL', 'MSG')
    t.strictEqual(
      msg,
      'LABEL: ' + msg.slice(7, 27) + '\n' +
      '  MSG\n' +
      '\n'
    )
  })

  t.test('Should indent multi-line messages', t => {
    t.plan(1)
    const logger = buildLogger()
    const msg = logger.format('LABEL', 'MSG\nwith\nseveral lines')
    t.strictEqual(
      msg,
      'LABEL: ' + msg.slice(7, 27) + '\n' +
      '  MSG\n' +
      '  with\n' +
      '  several lines\n' +
      '\n'
    )
  })

  t.end()
})

test('#onError', t => {
  t.test('uses the Error name when it is not just "Error"', t => {
    t.plan(1)
    const logger = buildLogger()
    logger.write = label => {
      t.strictEqual(label, 'TypeError')
    }

    logger.onError(new TypeError('Typerr'))
  })

  t.test('uses "ERROR" when the error name is "Error"', t => {
    t.plan(1)
    const logger = buildLogger()
    logger.write = label => {
      t.strictEqual(label, 'ERROR')
    }

    logger.onError(new Error('kaboom'))
  })

  t.end()
})

test('#onWarning', t => {
  t.test('uses the "WARNING" label', t => {
    t.plan(1)
    const logger = buildLogger()
    logger.write = label => {
      t.strictEqual(label, 'WARNING')
    }

    logger.onWarning('message')
  })

  t.test('echoes the message', t => {
    t.plan(1)
    const logger = buildLogger()
    logger.write = (label, msg) => {
      t.strictEqual(msg, 'hello')
    }

    logger.onWarning('hello')
  })

  t.end()
})

test('#onInfo', t => {
  t.test('uses the "INFO" label', t => {
    t.plan(1)
    const logger = buildLogger()
    logger.write = label => {
      t.strictEqual(label, 'INFO')
    }

    logger.onInfo('message')
  })

  t.test('echoes the message', t => {
    t.plan(1)
    const logger = buildLogger()
    logger.write = (label, msg) => {
      t.strictEqual(msg, 'hello')
    }

    logger.onInfo('hello')
  })

  t.end()
})

test('#onDebug', t => {
  t.test('uses the "DEBUG" label', t => {
    t.plan(1)
    const logger = buildLogger()
    logger.write = label => {
      t.strictEqual(label, 'DEBUG')
    }

    logger.onDebug('message')
  })

  t.test('echoes the message', t => {
    t.plan(1)
    const logger = buildLogger()
    logger.write = (label, msg) => {
      t.strictEqual(msg, 'hello')
    }

    logger.onDebug('hello')
  })

  t.end()
})

test('#onTrace', t => {
  t.test('uses the "TRACE" label', t => {
    t.plan(1)
    const logger = buildLogger()
    logger.write = label => {
      t.strictEqual(label, 'TRACE')
    }

    logger.onTrace(Log.normalizeTraceArgs('GET', 'http://place/thing?me=true', '{}', '{"ok": true}', 200))
  })

  t.end()
})
