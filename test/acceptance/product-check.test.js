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
    MockConnectionError,
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

test('Errors ≤v7.13 (tagline)', t => {
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

test('Errors ≤v7.13 (build flavor)', t => {
  t.plan(5)
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
      t.equal(err.message, 'The client noticed that the server is not a supported distribution of Elasticsearch')
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
    t.equal(err.message, 'The client noticed that the server is not a supported distribution of Elasticsearch')
  })

  setTimeout(() => {
    client.search({
      index: 'foo',
      body: {
        query: {
          match_all: {}
        }
      }
    }, (err, result) => {
      t.equal(err.message, 'The client noticed that the server is not a supported distribution of Elasticsearch')
    })
  }, 100)
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

test('Auth error - 401', t => {
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
    t.equal(warning.message, 'The client is unable to verify that the server is Elasticsearch due to security privileges on the server side. Some functionality may not be compatible if the server is running an unsupported product.')
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

test('Auth error - 403', t => {
  t.plan(8)
  const MockConnection = buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 403,
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
    t.equal(warning.message, 'The client is unable to verify that the server is Elasticsearch due to security privileges on the server side. Some functionality may not be compatible if the server is running an unsupported product.')
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
    t.equal(err.statusCode, 403)
    process.removeListener('warning', onWarning)
  })
})

test('500 error', t => {
  t.plan(8)

  let count = 0
  const requests = [{
    method: 'GET',
    path: '/'
  }, {
    method: 'GET',
    path: '/'
  }, {
    method: 'POST',
    path: '/foo/_search'
  }]

  const MockConnection = buildMockConnection({
    onRequest (params) {
      const req = requests.shift()
      t.equal(req.method, params.method)
      t.equal(req.path, params.path)

      if (count++ >= 1) {
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
      } else {
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
    }
  })

  const client = new Client({
    node: 'http://localhost:9200',
    Connection: MockConnection
  })

  client.search({
    index: 'foo',
    body: {
      query: {
        match_all: {}
      }
    }
  }, (err, result) => {
    t.equal(err.message, '{"error":"kaboom"}')

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
      t.equal(err.message, 'Request timed out')
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
    t.equal(err.message, 'Request timed out')
  })
})

test('ConnectionError', t => {
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
    Connection: MockConnectionError,
    maxRetries: 0
  })

  client.on('request', (err, event) => {
    const req = requests.shift()
    if (req.method === 'GET') {
      t.error(err)
    } else {
      t.equal(err.message, 'Kaboom')
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
    t.equal(err.message, 'Kaboom')
  })
})

test('Multiple subsequent calls, no errors', t => {
  t.plan(15)
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
  }, {
    method: 'HEAD',
    path: '/'
  }, {
    method: 'POST',
    path: '/foo/_doc'
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

  client.ping((err, result) => {
    t.error(err)
  })

  client.index({
    index: 'foo',
    body: {
      foo: 'bar'
    }
  }, (err, result) => {
    t.error(err)
  })
})

test('Multiple subsequent calls, with errors', t => {
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
  }, {
    method: 'HEAD',
    path: '/'
  }, {
    method: 'POST',
    path: '/foo/_doc'
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

  client.ping((err, result) => {
    t.equal(err.message, 'The client noticed that the server is not Elasticsearch and we do not support this unknown product.')
  })

  client.index({
    index: 'foo',
    body: {
      foo: 'bar'
    }
  }, (err, result) => {
    t.equal(err.message, 'The client noticed that the server is not Elasticsearch and we do not support this unknown product.')
  })
})

test('Later successful call', t => {
  t.plan(11)
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

  setTimeout(() => {
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
  }, 100)
})

test('Later errored call', t => {
  t.plan(5)
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

  setTimeout(() => {
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
  }, 100)
})

test('Errors ≤v5', t => {
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
            number: '5.0.0-SNAPSHOT',
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

test('Bad info response', t => {
  t.plan(3)
  const MockConnection = buildMockConnection({
    onRequest (params) {
      return {
        statusCode: 200,
        body: {
          name: '1ef419078577',
          cluster_name: 'docker-cluster',
          cluster_uuid: 'cQ5pAMvRRTyEzObH4L5mTA',
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

test('No multiple checks with child clients', t => {
  t.plan(11)
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

  setTimeout(() => {
    const child = client.child()
    child.search({
      index: 'foo',
      body: {
        query: {
          match_all: {}
        }
      }
    }, (err, result) => {
      t.error(err)
    })
  }, 100)
})
