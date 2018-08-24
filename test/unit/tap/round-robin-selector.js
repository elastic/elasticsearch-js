'use strict'

const { test } = require('tap')
const rrSelector = require('../../../src/lib/selectors/round_robin')

test('Should choose a selection with round robin', t => {
  t.plan(1)
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  const expected = [].concat(options)
  const selections = []

  for (var i = 0; i < options.length; i++) {
    selections.push(rrSelector(options))
  }

  t.deepEqual(selections, expected)
})
