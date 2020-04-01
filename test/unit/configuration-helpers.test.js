// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { test } = require('tap')
const { getAuth } = require('../../lib/ConfigurationHelpers')
const { ConfigurationError } = require('../../lib/errors')

test('Should be a valid config with a string node', t => {
  getAuth('http://foobar:9200')
  t.end()
})

test('Should be a valid config with a string node & username + password', t => {
  const auth = getAuth('http://u:p@foobar:9200')
  t.equal(auth.username, 'u')
  t.equal(auth.password, 'p')
  t.end()
})

test('Should be a valid config with a string node & username + no password', t => {
  const auth = getAuth('http://u@foobar:9200')
  t.equal(auth.username, 'u')
  t.equal(auth.password, '')
  t.end()
})

test('Should be a valid config with a URL node', t => {
  getAuth(new URL('http://foobar:9200'))
  t.end()
})

test('Should be a valid config with a node object with string', t => {
  getAuth({ url: 'http://foobar:9200' })
  t.end()
})

test('Should be a valid config with a node object with URL', t => {
  getAuth({ url: new URL('http://foobar:9200') })
  t.end()
})

test('Should be an invalid config with a falsey node', t => {
  t.throws(() => getAuth([{}]), ConfigurationError)
  t.end()
})

test('Should be an invalid config with a falsey node.url', t => {
  t.throws(() => getAuth({ url: undefined }), ConfigurationError, /^invalid url in option "node\.url"/)
  t.end()
})

test('Should be an invalid config with a malformed URL in node', t => {
  t.throws(() => getAuth('farts'), ConfigurationError, /^invalid url in option "node"/)
  t.end()
})

test('Should be an invalid config with a malformed URL in node.url', t => {
  t.throws(() => getAuth({ url: 'farts' }), ConfigurationError, /^invalid url in option "node\.url"/)
  t.end()
})
