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

const assert = require('node:assert')
const fetch = require('node-fetch')

function runInParallel (client, operation, options, clientOptions) {
  if (options.length === 0) return Promise.resolve()
  const operations = options.map(opts => {
    const api = delve(client, operation).bind(client)
    return api(opts, clientOptions)
  })

  return Promise.all(operations)
}

// code from https://github.com/developit/dlv
// needed to support an edge case: `a\.b`
// where `a.b` is a single field: { 'a.b': true }
function delve (obj, key, def, p) {
  p = 0
  // handle the key with a dot inside that is not a part of the path
  // and removes the backslashes from the key
  key = key.split
    ? key.split(/(?<!\\)\./g).map(k => k.replace(/\\/g, ''))
    : key.replace(/\\/g, '')
  while (obj && p < key.length) obj = obj[key[p++]]
  return (obj === undefined || p < key.length) ? def : obj
}

function to (promise) {
  return promise.then(data => [null, data], err => [err, undefined])
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function isXPackTemplate (name) {
  if (name.startsWith('.monitoring-')) {
    return true
  }
  if (name.startsWith('.watch') || name.startsWith('.triggered_watches')) {
    return true
  }
  if (name.startsWith('.data-frame-')) {
    return true
  }
  if (name.startsWith('.ml-')) {
    return true
  }
  if (name.startsWith('.transform-')) {
    return true
  }
  if (name.startsWith('.deprecation-')) {
    return true
  }
  switch (name) {
    case '.watches':
    case 'logstash-index-template':
    case '.logstash-management':
    case 'security_audit_log':
    case '.slm-history':
    case '.async-search':
    case 'saml-service-provider':
    case 'ilm-history':
    case 'logs':
    case 'logs-settings':
    case 'logs-mappings':
    case 'metrics':
    case 'metrics-settings':
    case 'metrics-mappings':
    case 'synthetics':
    case 'synthetics-settings':
    case 'synthetics-mappings':
    case '.snapshot-blob-cache':
    case 'data-streams-mappings':
      return true
  }
  return false
}

async function getSpec () {
  const response = await fetch('https://raw.githubusercontent.com/elastic/elasticsearch-specification/main/output/schema/schema.json')
  return await response.json()
}

let spec = null

// some keys for the path used in the yaml test are not support in the client
// for example: snapshot.createRepository({ repository }) will not work.
// This code changes the params to the appropriate name, in the example above,
// "repository" will be renamed to "name"
async function updateParams (cmd) {
  if (spec == null) {
    spec = await getSpec()
  }
  const endpoint = spec.endpoints.find(endpoint => endpoint.name === cmd.api)
  assert(endpoint != null)
  if (endpoint.request == null) return cmd

  const type = spec.types.find(type => type.name.name === endpoint.request.name && type.name.namespace === endpoint.request.namespace)
  assert(type != null)

  const pathParams = type.path.reduce((acc, val) => {
    if (val.codegenName != null) {
      acc[val.name] = val.codegenName
    }
    return acc
  }, {})

  for (const key in cmd.params) {
    if (pathParams[key] != null) {
      cmd.params[pathParams[key]] = cmd.params[key]
      delete cmd.params[key]
    }
  }

  return cmd
}

module.exports = { runInParallel, delve, to, sleep, isXPackTemplate, updateParams }
