'use strict'

const { test } = require('tap')
const { RoundRobinSelector, RandomSelector } = require('../../lib/Selectors')

test('RoundRobinSelector', t => {
  const s = new RoundRobinSelector()
  const arr = [0, 1, 2, 3, 4, 5]

  t.plan(arr.length + 1)
  for (var i = 0; i <= arr.length; i++) {
    t.strictEqual(
      s.select(arr),
      i === arr.length ? arr[0] : arr[i]
    )
  }
})

test('RandomSelector', t => {
  t.plan(1)
  const s = new RandomSelector()
  const arr = [0, 1, 2, 3, 4, 5]
  t.type(s.select(arr), 'number')
})
