'use strict'

const { test } = require('tap')
const errors = require('../../../src/lib/errors')

test('Errors', t => {
  Object.keys(errors).forEach(name => {
    if (name[0] === '_') return
    t.test(name, t => {
      t.plan(2)
      const err = new errors[name]()
      t.type(err, Error)
      t.true(err instanceof errors._Abstract)
    })
  })
  t.end()
})

test('Status code error', t => {
  t.plan(1)
  const err = new errors['404']()
  t.strictEqual(err.status, 404)
})
