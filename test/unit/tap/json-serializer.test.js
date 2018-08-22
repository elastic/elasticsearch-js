'use strict'

const { test } = require('tap')
const JsonSerializer = require('../../../src/lib/serializers/json')

test('Serializer', t => {
  t.test('Should serialize an objects as JSON', t => {
    t.plan(1)
    const obj = { hello: 'world' }
    const ser = new JsonSerializer()
    t.strictEqual(
      ser.serialize(obj),
      JSON.stringify(obj)
    )
  })

  t.test('Should not modify strings', t => {
    t.plan(1)
    const str = 'hello " world'
    const ser = new JsonSerializer()
    t.strictEqual(
      ser.serialize(str),
      str
    )
  })

  t.test('Should return undefined for invalid values', t => {
    t.plan(2)
    const ser = new JsonSerializer()
    t.strictEqual(
      ser.serialize(null),
      undefined
    )
    t.strictEqual(
      ser.serialize(false),
      undefined
    )
  })

  t.test('Throws on serialization errors', t => {
    t.plan(1)
    const obj = { hello: 'world' }
    obj.circular = obj
    const ser = new JsonSerializer()

    try {
      ser.serialize(obj)
      t.fail('should fail')
    } catch (err) {
      t.ok(err)
    }
  })

  t.test('Should support replacer and spaces', t => {
    t.plan(1)
    const obj = { hello: 'world' }
    const ser = new JsonSerializer()
    t.strictEqual(
      ser.serialize(obj, null, 2),
      JSON.stringify(obj, null, 2)
    )
  })

  t.end()
})

test('Deserializer', t => {
  t.test('Should deserialize a JSON string', t => {
    t.plan(1)
    const str = JSON.stringify({ hello: 'world' })
    const ser = new JsonSerializer()
    t.deepEqual(
      ser.deserialize(str),
      JSON.parse(str)
    )
  })

  t.test('Should ignore non string values', t => {
    t.plan(2)
    const ser = new JsonSerializer()
    t.strictEqual(
      ser.deserialize({}),
      undefined
    )
    t.strictEqual(
      ser.deserialize(42),
      undefined
    )
  })

  t.test('Should return undefined on deserialization errors', t => {
    t.plan(1)
    const ser = new JsonSerializer()
    t.strictEqual(
      ser.deserialize('{"hello"'),
      undefined
    )
  })

  t.end()
})

test('Bulk body', t => {
  const body = [{ index: 'thing' }, { document: 'hi' }]
  const bulk = '{"index":"thing"}\n{"document":"hi"}\n'

  t.test('Should create a string our of an array of objects', t => {
    t.plan(1)
    const ser = new JsonSerializer()
    t.strictEqual(ser.bulkBody(body), bulk)
  })

  t.test('Shoudl add a new line at the end of a string', t => {
    t.plan(1)
    const ser = new JsonSerializer()
    t.strictEqual(ser.bulkBody(''), '\n')
  })

  t.test('Throws on anything else', t => {
    t.plan(2)
    const ser = new JsonSerializer()

    try {
      ser.bulkBody(null)
      t.fail('should fail')
    } catch (err) {
      t.ok(err)
    }

    try {
      ser.bulkBody(false)
      t.fail('should fail')
    } catch (err) {
      t.ok(err)
    }
  })

  t.end()
})
