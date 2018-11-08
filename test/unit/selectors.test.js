'use strict'

const { test } = require('tap')
const { roundRobinSelector, randomSelector } = require('../../lib/ConnectionPool').internals

test('RoundRobinSelector', t => {
  const selector = roundRobinSelector()
  const arr = [0, 1, 2, 3, 4, 5]

  t.plan(arr.length + 1)
  for (var i = 0; i <= arr.length; i++) {
    t.strictEqual(
      selector(arr),
      i === arr.length ? arr[0] : arr[i]
    )
  }
})

test('RandomSelector', t => {
  t.plan(1)
  const arr = [0, 1, 2, 3, 4, 5]
  t.type(randomSelector(arr), 'number')
})
