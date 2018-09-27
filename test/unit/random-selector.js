'use strict'

const { test } = require('tap')
const randomSelector = require('../../src/lib/selectors/random')

test('Should choose a selection randomly', t => {
  t.plan(3)
  const log = { a: 0, b: 0, c: 0 }
  const choices = Object.keys(log)

  for (var i = 0; i < 1000; i++) {
    log[randomSelector(choices)]++
  }

  t.false(log.a < 200 || log.a > 400)
  t.false(log.b < 200 || log.b > 400)
  t.false(log.c < 200 || log.c > 400)
})
