'use strict'

const { test } = require('tap')
const Serializer = require('../../lib/Serializer')
const { SerializationError, DeserializationError } = require('../../lib/errors')

test('Basic', t => {
  t.plan(2)
  const s = new Serializer()
  const obj = { hello: 'world' }
  const json = JSON.stringify(obj)
  t.strictEqual(s.serialize(obj), json)
  t.deepEqual(s.deserialize(json), obj)
})

test('ndserialize', t => {
  t.plan(1)
  const s = new Serializer()
  const obj = [
    { hello: 'world' },
    { winter: 'is coming' },
    { you_know: 'for search' }
  ]
  t.strictEqual(
    s.ndserialize(obj),
    JSON.stringify(obj[0]) + '\n' +
    JSON.stringify(obj[1]) + '\n' +
    JSON.stringify(obj[2]) + '\n'
  )
})

test('SerializationError', t => {
  t.plan(1)
  const s = new Serializer()
  const obj = { hello: 'world' }
  obj.o = obj
  try {
    s.serialize(obj)
    t.fail('Should fail')
  } catch (err) {
    t.ok(err instanceof SerializationError)
  }
})

test('SerializationError ndserialize', t => {
  t.plan(1)
  const s = new Serializer()
  try {
    s.ndserialize({ hello: 'world' })
    t.fail('Should fail')
  } catch (err) {
    t.ok(err instanceof SerializationError)
  }
})

test('DeserializationError', t => {
  t.plan(1)
  const s = new Serializer()
  const json = '{"hello'
  try {
    s.deserialize(json)
    t.fail('Should fail')
  } catch (err) {
    t.ok(err instanceof DeserializationError)
  }
})
