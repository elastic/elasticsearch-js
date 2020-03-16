// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { URL } from 'url'
import { expectType, expectError } from 'tsd'
import { TransportGetConnectionOptions } from '../../lib/Transport'
import {
  Client,
  Serializer,
  Connection,
  ConnectionPool,
  Transport,
  errors
} from '../../'

/**
 * `node` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200'
  })
)

expectType<Client>(
  new Client({
    nodes: ['http://localhost:9200', 'http://localhost:9200']
  })
)

expectType<Client>(
  new Client({
    node: {
      url: new URL('http://localhost:9200'),
      id: 'my-node'
    }
  })
)

expectType<Client>(
  new Client({
    nodes: [{
      url: new URL('http://localhost:9200'),
      id: 'my-node-1'
    }, {
      url: new URL('http://localhost:9201'),
      id: 'my-node-2'
    }]
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 42
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: {
      url: 'http://localhost:9200',
      id: 'my-node'
    }
  })
)

/**
 * `maxRetries` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    maxRetries: 5
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    maxRetries: 'five'
  })
)

/**
 * `requestTimeout` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    requestTimeout: 5
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    requestTimeout: 'five'
  })
)

/**
 * `pingTimeout` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    pingTimeout: 5
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    pingTimeout: 'five'
  })
)

/**
 * `sniffInterval` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    sniffInterval: 5
  })
)

expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    sniffInterval: false
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    sniffInterval: 'five'
  })
)

/**
 * `sniffOnStart` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    sniffOnStart: true
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    sniffOnStart: 'no'
  })
)

/**
 * `sniffEndpoint` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    sniffEndpoint: '/custom'
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    sniffEndpoint: false
  })
)

/**
 * `sniffOnConnectionFault` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    sniffOnConnectionFault: true
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    sniffOnConnectionFault: 'yes'
  })
)

/**
 * `resurrectStrategy` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    resurrectStrategy: 'ping'
  })
)

expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    resurrectStrategy: 'optimistic'
  })
)

expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    resurrectStrategy: 'none'
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    resurrectStrategy: 'custom'
  })
)

/**
 * `suggestCompression` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    suggestCompression: true
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    suggestCompression: 'no'
  })
)

/**
 * `compression` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    compression: 'gzip'
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    compression: 'deflate'
  })
)

/**
 * `headers` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    headers: { foo: 'bar' }
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    headers: 'foo=bar'
  })
)

/**
 * `opaqueIdPrefix` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    opaqueIdPrefix: 'foo-'
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    opaqueIdPrefix: 42
  })
)

/**
 * `name` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    name: 'foo'
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    name: 42
  })
)

/**
 * `auth` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    auth: {
      username: 'username',
      password: 'password'
    }
  })
)

expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    auth: {
      apiKey: 'abcd'
    }
  })
)

expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    auth: {
      apiKey: {
        api_key: 'foo',
        id: 'bar'
      }
    }
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    auth: 'password'
  })
)

/**
 * `cloud` option
 */
expectType<Client>(
  new Client({
    cloud: {
      id: 'localhost:9200'
    }
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    cloud: {
      id: 42
    }
  })
)

/**
 * `agent` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    agent: {
      keepAlive: true,
      keepAliveMsecs: 42,
      maxSockets: 42,
      maxFreeSockets: 42
    }
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    agent: {
      keepAlive: 'yes',
      keepAliveMsecs: true,
      maxSockets: 'all',
      maxFreeSockets: null
    }
  })
)

/**
 * `ssl` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    ssl: {
      ca: 'cert',
      rejectUnauthorized: true
    }
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    ssl: {
      ca: 42,
      rejectUnauthorized: 'yes'
    }
  })
)

/**
 * `generateRequestId` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    generateRequestId (params, options) {
      return 'id'
    }
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    generateRequestId: 'id'
  })
)

/**
 * `nodeSelector` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    nodeSelector (connections) {
      return connections[0]
    }
  })
)

expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    nodeSelector: 'round-robin'
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    nodeSelector (connections) {
      return 'id'
    }
  })
)

/**
 * `nodeFilter` option
 */
expectType<Client>(
  new Client({
    node: 'http://localhost:9200',
    nodeFilter (connection) {
      return true
    }
  })
)

expectError<errors.ConfigurationError>(
  new Client({
    node: 'http://localhost:9200',
    nodeFilter (connection) {
      return 'id'
    }
  })
)

/**
 * `Serializer` option
 */
{
  class CustomSerializer extends Serializer {
    deserialize (str: string) {
      return super.deserialize(str)
    }
  }

  expectType<Client>(
    new Client({
      node: 'http://localhost:9200',
      Serializer: CustomSerializer
    })
  )
}

{
  class CustomSerializer {
    deserialize (str: string) {
      return JSON.parse(str)
    }
  }

  expectError<errors.ConfigurationError>(
    new Client({
      node: 'http://localhost:9200',
      Serializer: CustomSerializer
    })
  )
}

/**
 * `Connection` option
 */
{
  class CustomConnection extends Connection {
    close () {
      return super.close()
    }
  }

  expectType<Client>(
    new Client({
      node: 'http://localhost:9200',
      Connection: CustomConnection
    })
  )
}

{
  class CustomConnection {
    close () {
      return Promise.resolve()
    }
  }

  expectError<errors.ConfigurationError>(
    new Client({
      node: 'http://localhost:9200',
      Connection: CustomConnection
    })
  )
}

/**
 * `ConnectionPool` option
 */
{
  class CustomConnectionPool extends ConnectionPool {
    empty () {
      return super.empty()
    }
  }

  expectType<Client>(
    new Client({
      node: 'http://localhost:9200',
      ConnectionPool: CustomConnectionPool
    })
  )
}

{
  class CustomConnectionPool {
    empty () {
      return this
    }
  }

  expectError<errors.ConfigurationError>(
    new Client({
      node: 'http://localhost:9200',
      ConnectionPool: CustomConnectionPool
    })
  )
}

/**
 * `Transport` option
 */
{
  class CustomTransport extends Transport {
    getConnection (opts: TransportGetConnectionOptions) {
      return super.getConnection(opts)
    }
  }

  expectType<Client>(
    new Client({
      node: 'http://localhost:9200',
      Transport: CustomTransport
    })
  )
}

{
  class CustomTransport {
    getConnection (opts: TransportGetConnectionOptions) {
      return null
    }
  }

  expectError<errors.ConfigurationError>(
    new Client({
      node: 'http://localhost:9200',
      Transport: CustomTransport
    })
  )
}
