/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict'

const { test } = require('tap')
const { stringify } = require('querystring')
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

test('ndserialize (strings)', t => {
  t.plan(1)
  const s = new Serializer()
  const obj = [
    JSON.stringify({ hello: 'world' }),
    JSON.stringify({ winter: 'is coming' }),
    JSON.stringify({ you_know: 'for search' })
  ]
  t.strictEqual(
    s.ndserialize(obj),
    obj[0] + '\n' +
    obj[1] + '\n' +
    obj[2] + '\n'
  )
})

test('qserialize', t => {
  t.plan(1)
  const s = new Serializer()
  const obj = {
    hello: 'world',
    you_know: 'for search'
  }

  t.strictEqual(
    s.qserialize(obj),
    stringify(obj)
  )
})

test('qserialize (array)', t => {
  t.plan(1)
  const s = new Serializer()
  const obj = {
    hello: 'world',
    arr: ['foo', 'bar']
  }

  t.strictEqual(
    s.qserialize(obj),
    'hello=world&arr=foo%2Cbar'
  )
})

test('qserialize (string)', t => {
  t.plan(1)
  const s = new Serializer()
  const obj = {
    hello: 'world',
    you_know: 'for search'
  }

  t.strictEqual(
    s.qserialize(stringify(obj)),
    stringify(obj)
  )
})

test('qserialize (key with undefined value)', t => {
  t.plan(1)
  const s = new Serializer()
  const obj = {
    hello: 'world',
    key: undefined,
    foo: 'bar'
  }

  t.strictEqual(
    s.qserialize(obj),
    'hello=world&foo=bar'
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
