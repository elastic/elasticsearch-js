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
const { Client } = require('../../')
const {
  connection: {
    MockConnectionTimeout,
    buildMockConnection
  }
} = require('../utils')

test('No errors v8', t => {
  t.plan(7)
  const MockConnection = buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 200,
        headers: {
          'x-elastic-product': 'Elasticsearch'
        },
        body: {
          name: '1ef419078577',
          cluster_name: 'docker-cluster',
          cluster_uuid: 'cQ5pAMvRRTyEzObH4L5mTA',
          version: {
            number: '8.0.0-SNAPSHOT',
            build_flavor: 'default',
            build_type: 'docker',
            build_hash: '5fb4c050958a6b0b6a70a6fb3e616d0e390eaac3',
            build_date: '2021-07-10T01:45:02.136546168Z',
            build_snapshot: true,
            lucene_version: '8.9.0',
            minimum_wire_compatibility_version: '7.15.0',
            minimum_index_compatibility_version: '7.0.0'
          },
          tagline: 'You Know, for Search'
        }
      }
    }
  })

  const requests = [{
    method: 'GET',
    path: '/'
  }, {
    method: 'POST',
    path: '/foo/_search'
  }]

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.on('request', (err, event) => {
    t.error(err)
    const req = requests.shift()
    t.equal(event.meta.request.params.method, req.method)
    t.equal(event.meta.request.params.path, req.path)
  })

  client.search({
    index: 'foo',
    body: {
      query: {
        match_all: {}
      }
    }
  }, (err, result) => {
    t.error(err)
  })
})

test('Errors v8', t => {
  t.plan(3)
  const MockConnection = buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 200,
        body: {
          name: '1ef419078577',
          cluster_name: 'docker-cluster',
          cluster_uuid: 'cQ5pAMvRRTyEzObH4L5mTA',
          version: {
            number: '8.0.0-SNAPSHOT',
            build_flavor: 'default',
            build_type: 'docker',
            build_hash: '5fb4c050958a6b0b6a70a6fb3e616d0e390eaac3',
            build_date: '2021-07-10T01:45:02.136546168Z',
            build_snapshot: true,
            lucene_version: '8.9.0',
            minimum_wire_compatibility_version: '7.15.0',
            minimum_index_compatibility_version: '7.0.0'
          },
          tagline: 'You Know, for Search'
        }
      }
    }
  })

  const requests = [{
    method: 'GET',
    path: '/'
  }, {
    method: 'POST',
    path: '/foo/_search'
  }]

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.on('request', (err, event) => {
    const req = requests.shift()
    if (req.method === 'GET') {
      t.error(err)
    } else {
      t.equal(err.message, 'The client noticed that the server is not Elasticsearch and we do not support this unknown product.')
    }
  })

  client.search({
    index: 'foo',
    body: {
      query: {
        match_all: {}
      }
    }
  }, (err, result) => {
    t.equal(err.message, 'The client noticed that the server is not Elasticsearch and we do not support this unknown product.')
  })
})

test('No errors ≤v7.13', t => {
  t.plan(7)
  const MockConnection = buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 200,
        body: {
          name: '1ef419078577',
          cluster_name: 'docker-cluster',
          cluster_uuid: 'cQ5pAMvRRTyEzObH4L5mTA',
          version: {
            number: '7.13.0-SNAPSHOT',
            build_flavor: 'default',
            build_type: 'docker',
            build_hash: '5fb4c050958a6b0b6a70a6fb3e616d0e390eaac3',
            build_date: '2021-07-10T01:45:02.136546168Z',
            build_snapshot: true,
            lucene_version: '8.9.0',
            minimum_wire_compatibility_version: '7.15.0',
            minimum_index_compatibility_version: '7.0.0'
          },
          tagline: 'You Know, for Search'
        }
      }
    }
  })

  const requests = [{
    method: 'GET',
    path: '/'
  }, {
    method: 'POST',
    path: '/foo/_search'
  }]

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.on('request', (err, event) => {
    t.error(err)
    const req = requests.shift()
    t.equal(event.meta.request.params.method, req.method)
    t.equal(event.meta.request.params.path, req.path)
  })

  client.search({
    index: 'foo',
    body: {
      query: {
        match_all: {}
      }
    }
  }, (err, result) => {
    t.error(err)
  })
})

test('Errors ≤v7.13', t => {
  t.plan(3)
  const MockConnection = buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 200,
        body: {
          name: '1ef419078577',
          cluster_name: 'docker-cluster',
          cluster_uuid: 'cQ5pAMvRRTyEzObH4L5mTA',
          version: {
            number: '7.13.0-SNAPSHOT',
            build_flavor: 'other',
            build_type: 'docker',
            build_hash: '5fb4c050958a6b0b6a70a6fb3e616d0e390eaac3',
            build_date: '2021-07-10T01:45:02.136546168Z',
            build_snapshot: true,
            lucene_version: '8.9.0',
            minimum_wire_compatibility_version: '7.15.0',
            minimum_index_compatibility_version: '7.0.0'
          },
          tagline: 'Other'
        }
      }
    }
  })

  const requests = [{
    method: 'GET',
    path: '/'
  }, {
    method: 'POST',
    path: '/foo/_search'
  }]

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.on('request', (err, event) => {
    const req = requests.shift()
    if (req.method === 'GET') {
      t.error(err)
    } else {
      t.equal(err.message, 'The client noticed that the server is not Elasticsearch and we do not support this unknown product.')
    }
  })

  client.search({
    index: 'foo',
    body: {
      query: {
        match_all: {}
      }
    }
  }, (err, result) => {
    t.equal(err.message, 'The client noticed that the server is not Elasticsearch and we do not support this unknown product.')
  })
})

test('No errors v6', t => {
  t.plan(7)
  const MockConnection = buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 200,
        body: {
          name: '1ef419078577',
          cluster_name: 'docker-cluster',
          cluster_uuid: 'cQ5pAMvRRTyEzObH4L5mTA',
          version: {
            number: '6.8.0-SNAPSHOT',
            build_flavor: 'default',
            build_type: 'docker',
            build_hash: '5fb4c050958a6b0b6a70a6fb3e616d0e390eaac3',
            build_date: '2021-07-10T01:45:02.136546168Z',
            build_snapshot: true,
            lucene_version: '8.9.0',
            minimum_wire_compatibility_version: '7.15.0',
            minimum_index_compatibility_version: '7.0.0'
          },
          tagline: 'You Know, for Search'
        }
      }
    }
  })

  const requests = [{
    method: 'GET',
    path: '/'
  }, {
    method: 'POST',
    path: '/foo/_search'
  }]

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.on('request', (err, event) => {
    t.error(err)
    const req = requests.shift()
    t.equal(event.meta.request.params.method, req.method)
    t.equal(event.meta.request.params.path, req.path)
  })

  client.search({
    index: 'foo',
    body: {
      query: {
        match_all: {}
      }
    }
  }, (err, result) => {
    t.error(err)
  })
})

test('Errors v6', t => {
  t.plan(3)
  const MockConnection = buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 200,
        body: {
          name: '1ef419078577',
          cluster_name: 'docker-cluster',
          cluster_uuid: 'cQ5pAMvRRTyEzObH4L5mTA',
          version: {
            number: '6.8.0-SNAPSHOT',
            build_flavor: 'default',
            build_type: 'docker',
            build_hash: '5fb4c050958a6b0b6a70a6fb3e616d0e390eaac3',
            build_date: '2021-07-10T01:45:02.136546168Z',
            build_snapshot: true,
            lucene_version: '8.9.0',
            minimum_wire_compatibility_version: '7.15.0',
            minimum_index_compatibility_version: '7.0.0'
          },
          tagline: 'Other'
        }
      }
    }
  })

  const requests = [{
    method: 'GET',
    path: '/'
  }, {
    method: 'POST',
    path: '/foo/_search'
  }]

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.on('request', (err, event) => {
    const req = requests.shift()
    if (req.method === 'GET') {
      t.error(err)
    } else {
      t.equal(err.message, 'The client noticed that the server is not Elasticsearch and we do not support this unknown product.')
    }
  })

  client.search({
    index: 'foo',
    body: {
      query: {
        match_all: {}
      }
    }
  }, (err, result) => {
    t.equal(err.message, 'The client noticed that the server is not Elasticsearch and we do not support this unknown product.')
  })
})

test('Auth error', t => {
  t.plan(8)
  const MockConnection = buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 401,
        headers: {
          'x-elastic-product': 'Elasticsearch'
        },
        body: {
          security: 'exception'
        }
      }
    }
  })

  process.on('warning', onWarning)
  function onWarning (warning) {
    t.equal(warning.message, 'The client is unable to verify that the server is Elasticsearch due security privileges on the server side.')
  }

  const requests = [{
    method: 'GET',
    path: '/'
  }, {
    method: 'POST',
    path: '/foo/_search'
  }]

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.on('request', (err, event) => {
    t.error(err)
    const req = requests.shift()
    t.equal(event.meta.request.params.method, req.method)
    t.equal(event.meta.request.params.path, req.path)
  })

  client.search({
    index: 'foo',
    body: {
      query: {
        match_all: {}
      }
    }
  }, (err, result) => {
    t.equal(err.statusCode, 401)
    process.removeListener('warning', onWarning)
  })
})

test('500 error', t => {
  t.plan(3)
  const MockConnection = buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 500,
        headers: {
          'x-elastic-product': 'Elasticsearch'
        },
        body: {
          error: 'kaboom'
        }
      }
    }
  })

  const requests = [{
    method: 'GET',
    path: '/'
  }, {
    method: 'POST',
    path: '/foo/_search'
  }]

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.on('request', (err, event) => {
    const req = requests.shift()
    if (req.method === 'GET') {
      t.error(err)
    } else {
      t.equal(err.message, 'The client noticed that the server is not Elasticsearch and we do not support this unknown product.')
    }
  })

  client.search({
    index: 'foo',
    body: {
      query: {
        match_all: {}
      }
    }
  }, (err, result) => {
    t.equal(err.message, 'The client noticed that the server is not Elasticsearch and we do not support this unknown product.')
  })
})

test('TimeoutError', t => {
  t.plan(3)

  const requests = [{
    method: 'GET',
    path: '/'
  }, {
    method: 'POST',
    path: '/foo/_search'
  }]

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnectionTimeout,
    maxRetries: 0
  })

  client.on('request', (err, event) => {
    const req = requests.shift()
    if (req.method === 'GET') {
      t.error(err)
    } else {
      t.equal(err.message, 'The client noticed that the server is not Elasticsearch and we do not support this unknown product.')
    }
  })

  client.search({
    index: 'foo',
    body: {
      query: {
        match_all: {}
      }
    }
  }, (err, result) => {
    t.equal(err.message, 'The client noticed that the server is not Elasticsearch and we do not support this unknown product.')
  })
})
