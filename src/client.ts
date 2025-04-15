/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License") you may
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

import process from 'node:process'
import { ConnectionOptions as TlsConnectionOptions } from 'node:tls'
import { URL } from 'node:url'
import buffer from 'node:buffer'
import os from 'node:os'
import {
  Transport,
  UndiciConnection,
  WeightedConnectionPool,
  CloudConnectionPool,
  Serializer,
  Diagnostic,
  errors,
  BaseConnectionPool
} from '@elastic/transport'
import {
  HttpAgentOptions,
  UndiciAgentOptions,
  agentFn,
  nodeFilterFn,
  nodeSelectorFn,
  generateRequestIdFn,
  BasicAuth,
  ApiKeyAuth,
  BearerAuth,
  Context
} from '@elastic/transport/lib/types'
import { RedactionOptions } from '@elastic/transport/lib/Transport'
import BaseConnection, { prepareHeaders, ConnectionOptions } from '@elastic/transport/lib/connection/BaseConnection'
import SniffingTransport from './sniffingTransport'
import Helpers from './helpers'
import API from './api'
import packageJson from '../package.json'
import transportPackageJson from '@elastic/transport/package.json'

const kChild = Symbol('elasticsearchjs-child')
const kInitialOptions = Symbol('elasticsearchjs-initial-options')
let clientVersion: string = packageJson.version
/* istanbul ignore next */
if (clientVersion.includes('-')) {
  // clean prerelease
  clientVersion = clientVersion.slice(0, clientVersion.indexOf('-')) + 'p'
}
let transportVersion: string = transportPackageJson.version // eslint-disable-line
/* istanbul ignore next */
if (transportVersion.includes('-')) {
  // clean prerelease
  transportVersion = transportVersion.slice(0, transportVersion.indexOf('-')) + 'p'
}
const nodeVersion = process.versions.node

export interface NodeOptions {
  /** @property url Elasticsearch node's location */
  url: URL
  id?: string
  /** @property agent Custom HTTP agent options */
  agent?: HttpAgentOptions | UndiciAgentOptions
  /** @property ssl Overrides default TLS connection settings */
  ssl?: TlsConnectionOptions
  /** @property headers Custom HTTP headers that should be sent with each request */
  headers?: Record<string, any>
}

export interface ClientOptions {
  /** @property node Elasticsearch node settings, if there is only one node. Required if `nodes` or `cloud` is not set. */
  node?: string | string[] | NodeOptions | NodeOptions[]
  /** @property nodes Elasticsearch node settings, if there are multiple nodes. Required if `node` or `cloud` is not set. */
  nodes?: string | string[] | NodeOptions | NodeOptions[]
  /** @property Connection HTTP connection class to use
    * @defaultValue `UndiciConnection` */
  Connection?: typeof BaseConnection
  /** @property ConnectionPool HTTP connection pool class to use
    * @defaultValue `CloudConnectionPool`, if connecting to Elastic Cloud, otherwise `WeightedConnectionPool` */
  ConnectionPool?: typeof BaseConnectionPool
  /** @property Transport Elastic transport class to use
    * @defaultValue `Transport` */
  Transport?: typeof Transport
  /** @property Serializer Serialization class to use
    * @defaultValue `Serializer` */
  Serializer?: typeof Serializer
  /** @property maxRetries Max number of retries for each request
    * @defaultValue 3 */
  maxRetries?: number
  /** @property requestTimeout Max request timeout in milliseconds for each request
    * @defaultValue 30000 */
  requestTimeout?: number
  /** @property pingTimeout Max number of milliseconds a `ClusterConnectionPool` will wait when pinging nodes before marking them dead
    * @defaultValue 3000 */
  pingTimeout?: number
  /** @property sniffInterval Perform a sniff operation every `n` milliseconds
    * @remarks Sniffing might not be the best solution for you. Read https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how to learn more.
    * @defaultValue */
  sniffInterval?: number | boolean
  /** @property sniffOnStart Perform a sniff once the client is started
    * @remarks Sniffing might not be the best solution for you. Read https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how to learn more.
    * @defaultValue false */
  sniffOnStart?: boolean
  /** @property sniffEndpoint Endpoint to ping during a sniff
    * @remarks Sniffing might not be the best solution for you. Read https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how to learn more.
    * @defaultValue "_nodes/_all/http" */
  sniffEndpoint?: string
  /** @property sniffOnConnectionFault Perform a sniff on connection fault
    * @remarks Sniffing might not be the best solution for you. Read https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how to learn more.
    * @defaultValue false */
  sniffOnConnectionFault?: boolean
  /** @property resurrectStrategy Strategy for resurrecting dead nodes when using `ClusterConnectionPool`. 'ping' will issue a test request to a node and resurrect it if it responds. 'optimistic' marks a node as alive without testing it. 'none` will never attempt to revive a dead connection.
    * @defaultValue 'ping' */
  resurrectStrategy?: 'ping' | 'optimistic' | 'none'
  /** @property compression Enables gzip request body compression
    * @defaultValue `true` if connecting to Elastic Cloud, otherwise `false`. */
  compression?: boolean
  /** @property tls [TLS configuraton](https://nodejs.org/api/tls.html)
    * @defaultValue null */
  tls?: TlsConnectionOptions
  /** @property agent Custom HTTP agent options
    * @defaultValue null */
  agent?: HttpAgentOptions | UndiciAgentOptions | agentFn | false
  /** @property nodeFilter A custom function used by the connection pool to determine which nodes are qualified to receive a request
    * @defaultValue () => true */
  nodeFilter?: nodeFilterFn
  /** @property nodeSelector A custom function used by the connection pool to determine which node should receive the next request
    * @defaultValue A "round robin" function that loops sequentially through each node in the pool. */
  nodeSelector?: nodeSelectorFn
  /** @property headers Custom HTTP headers that should be sent with each request
    * @defaultValue An object with a custom `user-agent` header */
  headers?: Record<string, any>
  /** @property opaqueIdPrefix A string prefix to apply to every generated X-Opaque-Id header
    * @defaultValue null */
  opaqueIdPrefix?: string
  /** @property generateRequestId A custom function for generating unique IDs for each request, to make it easier to associate each API request to a single response
    * @defaultValue A function that increments a number counter starting from 1 */
  generateRequestId?: generateRequestIdFn
  /** @property name A name for this client
    * @defaultValue 'elasticsearch-js' */
  name?: string | symbol
  /** @property auth Authentication options for this Elasticsearch cluster
    * @defaultValue null */
  auth?: BasicAuth | ApiKeyAuth | BearerAuth
  /** @property context A custom object attached to each request that can be used to pass data to client events
    * @defaultValue null */
  context?: Context
  /** @property proxy A proxy URL that, when provided, the client will automatically send all requests through
    * @defaultValue null */
  proxy?: string | URL
  /** @property enableMetaHeader If true, adds an header named `x-elastic-client-meta`, containing a small amount of high-level telemetry data, such as the client and platform version
    * @defaultValue true */
  enableMetaHeader?: boolean
  /** @property cloud Custom configuration for connecting to Elastic Cloud, in lieu of a `node` or `nodes` configuration
    * @remarks Read https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-connecting.html#client-usage for more details
    * @defaultValue null */
  cloud?: {
    id: string
  }
  /** @property disablePrototypePoisoningProtection Disables safe JSON parsing that protects execution of prototype poisoning attacks; disabled by default, as it can introduce a performance penalty
    * @defaultValue true */
  disablePrototypePoisoningProtection?: boolean | 'proto' | 'constructor'
  /** @property caFingerprint If configured, verifies that the fingerprint of the CA certificate that has signed the certificate of the server matches the supplied fingerprint; only accepts SHA256 digest fingerprints
    * @defaultValue null */
  caFingerprint?: string
  /** @property maxResponseSize When configured, verifies that the uncompressed response size is lower than the configured number. If it's higher, it will abort the request. It cannot be higher than `buffer.constants.MAX_STRING_LENGTH`
    * @defaultValue null */
  maxResponseSize?: number
  /** @property maxCompressedResponseSize When configured, verifies that the compressed response size is lower than the configured number. If it's higher, it will abort the request. It cannot be higher than `buffer.constants.MAX_LENGTH`
    * @defaultValue null */
  maxCompressedResponseSize?: number
  /** @property redaction Options for how to redact potentially sensitive data from metadata attached to `Error` objects
    * @remarks Read https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/advanced-config.html#redaction for more details
    * @defaultValue Configuration that will replace known sources of sensitive data */
  redaction?: RedactionOptions
}

export default class Client extends API {
  diagnostic: Diagnostic
  name: string | symbol
  connectionPool: BaseConnectionPool
  transport: SniffingTransport
  serializer: Serializer
  helpers: Helpers

  constructor (opts: ClientOptions) {
    super()
    // @ts-expect-error kChild symbol is for internal use only
    if ((opts.cloud != null) && opts[kChild] === undefined) {
      const { id } = opts.cloud
      if (typeof id !== 'string') {
        throw new errors.ConfigurationError('Cloud ID must be a string.')
      }

      const parts = id.split(':')
      if (parts.length !== 2 || parts[1] === '') {
        throw new errors.ConfigurationError(
          'Cloud ID must be in the format "name:base64string".'
        )
      }

      // the cloud id is `cluster-name:base64encodedurl`
      // the url is a string divided by two '$', the first is the cloud url
      // the second the elasticsearch instance, the third the kibana instance

      let cloudUrls
      try {
        cloudUrls = Buffer.from(parts[1], 'base64').toString().split('$')
      } catch (err) {
        throw new errors.ConfigurationError('Cloud ID base64 decoding failed.')
      }
      if (cloudUrls.length < 2 || cloudUrls[0] === '' || cloudUrls[1] === '') {
        throw new errors.ConfigurationError(
          'Cloud ID base64 must contain at least two "$" separated parts: "<cloudUrl>$<esId>[$<kibanaId>]".'
        )
      }

      opts.node = `https://${cloudUrls[1]}.${cloudUrls[0]}`

      // Cloud has better performance with compression enabled
      // see https://github.com/elastic/elasticsearch-py/pull/704.
      // So unless the user specifies otherwise, we enable compression.
      if (opts.compression == null) opts.compression = true
      if (opts.tls == null ||
         (opts.tls != null && opts.tls.secureProtocol == null)) {
        opts.tls = opts.tls ?? {}
        opts.tls.secureProtocol = 'TLSv1_2_method'
      }
    }

    if (opts.node == null && opts.nodes == null) {
      throw new errors.ConfigurationError('Missing node(s) option')
    }

    // @ts-expect-error kChild symbol is for internal use only
    if (opts[kChild] === undefined) {
      const checkAuth = getAuth(opts.node ?? opts.nodes)
      if ((checkAuth != null) && checkAuth.username !== '' && checkAuth.password !== '') {
        opts.auth = Object.assign({}, opts.auth, { username: checkAuth.username, password: checkAuth.password })
      }
    }

    const options: Required<ClientOptions> = Object.assign({}, {
      Connection: UndiciConnection,
      Transport: SniffingTransport,
      Serializer,
      ConnectionPool: (opts.cloud != null) ? CloudConnectionPool : WeightedConnectionPool,
      maxRetries: 3,
      requestTimeout: 30000,
      pingTimeout: 3000,
      sniffInterval: false,
      sniffOnStart: false,
      sniffEndpoint: '_nodes/_all/http',
      sniffOnConnectionFault: false,
      resurrectStrategy: 'ping',
      compression: false,
      tls: null,
      caFingerprint: null,
      agent: null,
      headers: {
        'user-agent': `elasticsearch-js/${clientVersion} (${os.platform()} ${os.release()}-${os.arch()}; Node.js ${nodeVersion}; Transport ${transportVersion})`
      },
      nodeFilter: null,
      generateRequestId: null,
      name: 'elasticsearch-js',
      auth: null,
      opaqueIdPrefix: null,
      context: null,
      proxy: null,
      enableMetaHeader: true,
      maxResponseSize: null,
      maxCompressedResponseSize: null,
      redaction: {
        type: 'replace',
        additionalKeys: []
      }
    }, opts)

    if (options.caFingerprint != null && isHttpConnection(opts.node ?? opts.nodes)) {
      throw new errors.ConfigurationError('You can\'t configure the caFingerprint with a http connection')
    }

    if (options.maxResponseSize != null && options.maxResponseSize > buffer.constants.MAX_STRING_LENGTH) {
      throw new errors.ConfigurationError(`The maxResponseSize cannot be bigger than ${buffer.constants.MAX_STRING_LENGTH}`)
    }

    if (options.maxCompressedResponseSize != null && options.maxCompressedResponseSize > buffer.constants.MAX_LENGTH) {
      throw new errors.ConfigurationError(`The maxCompressedResponseSize cannot be bigger than ${buffer.constants.MAX_LENGTH}`)
    }

    if (options.enableMetaHeader) {
      let clientMeta = `es=${clientVersion},js=${nodeVersion},t=${transportVersion}`
      if (options.Connection === UndiciConnection) {
        clientMeta += `,un=${nodeVersion}`
      } else {
        // assumes HttpConnection
        clientMeta += `,hc=${nodeVersion}`
      }
      options.headers['x-elastic-client-meta'] = clientMeta
    }

    this.name = options.name
    // @ts-expect-error kInitialOptions symbol is for internal use only
    this[kInitialOptions] = options

    // @ts-expect-error kChild symbol is for internal use only
    if (opts[kChild] !== undefined) {
      // @ts-expect-error kChild symbol is for internal use only
      this.serializer = opts[kChild].serializer
      // @ts-expect-error kChild symbol is for internal use only
      this.connectionPool = opts[kChild].connectionPool
      // @ts-expect-error kChild symbol is for internal use only
      this.diagnostic = opts[kChild].diagnostic
    } else {
      this.diagnostic = new Diagnostic()

      let serializerOptions
      if (opts.disablePrototypePoisoningProtection != null) {
        if (typeof opts.disablePrototypePoisoningProtection === 'boolean') {
          serializerOptions = {
            enablePrototypePoisoningProtection: !opts.disablePrototypePoisoningProtection
          }
        } else {
          serializerOptions = {
            enablePrototypePoisoningProtection: opts.disablePrototypePoisoningProtection
          }
        }
      }
      this.serializer = new options.Serializer(serializerOptions)

      this.connectionPool = new options.ConnectionPool({
        pingTimeout: options.pingTimeout,
        resurrectStrategy: options.resurrectStrategy,
        tls: options.tls,
        agent: options.agent,
        proxy: options.proxy,
        Connection: options.Connection,
        auth: options.auth,
        diagnostic: this.diagnostic,
        caFingerprint: options.caFingerprint
      })

      // ensure default connection values are inherited when creating new connections
      // see https://github.com/elastic/elasticsearch-js/issues/1791
      const nodes = options.node ?? options.nodes
      let nodeOptions: Array<string | ConnectionOptions> = Array.isArray(nodes) ? nodes : [nodes]
      type ConnectionDefaults = Record<string, any>
      nodeOptions = nodeOptions.map(opt => {
        const { tls, headers, auth, requestTimeout: timeout, agent, proxy, caFingerprint } = options
        let defaults: ConnectionDefaults = { tls, headers, auth, timeout, agent, proxy, caFingerprint }

        // strip undefined values from defaults
        defaults = Object.keys(defaults).reduce((acc: ConnectionDefaults, key) => {
          const val = defaults[key]
          if (val !== undefined) acc[key] = val
          return acc
        }, {})

        let newOpts
        if (typeof opt === 'string') {
          newOpts = {
            url: new URL(opt)
          }
        } else {
          newOpts = opt
        }

        return { ...defaults, ...newOpts }
      })
      this.connectionPool.addConnection(nodeOptions)
    }

    this.transport = new options.Transport({
      diagnostic: this.diagnostic,
      connectionPool: this.connectionPool,
      serializer: this.serializer,
      maxRetries: options.maxRetries,
      requestTimeout: options.requestTimeout,
      sniffInterval: options.sniffInterval,
      sniffOnStart: options.sniffOnStart,
      sniffOnConnectionFault: options.sniffOnConnectionFault,
      sniffEndpoint: options.sniffEndpoint,
      compression: options.compression,
      headers: options.headers,
      nodeFilter: options.nodeFilter,
      nodeSelector: options.nodeSelector,
      generateRequestId: options.generateRequestId,
      name: options.name,
      opaqueIdPrefix: options.opaqueIdPrefix,
      context: options.context,
      productCheck: 'Elasticsearch',
      maxResponseSize: options.maxResponseSize,
      maxCompressedResponseSize: options.maxCompressedResponseSize,
      vendoredHeaders: {
        jsonContentType: 'application/vnd.elasticsearch+json; compatible-with=8',
        ndjsonContentType: 'application/vnd.elasticsearch+x-ndjson; compatible-with=8',
        accept: 'application/vnd.elasticsearch+json; compatible-with=8,text/plain'
      },
      redaction: options.redaction
    })

    this.helpers = new Helpers({
      client: this,
      metaHeader: options.enableMetaHeader
        ? `es=${clientVersion},js=${nodeVersion},t=${transportVersion},hc=${nodeVersion}`
        : null,
      maxRetries: options.maxRetries
    })
  }

  /**
   * Creates a child client instance that shared its connection pool with the parent client
   * @see {@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/child.html}
   */
  child (opts: ClientOptions): Client {
    // Merge the new options with the initial ones
    // @ts-expect-error kChild symbol is for internal use only
    const options: ClientOptions = Object.assign({}, this[kInitialOptions], opts)
    // Pass to the child client the parent instances that cannot be overridden
    // @ts-expect-error kInitialOptions symbol is for internal use only
    options[kChild] = {
      connectionPool: this.connectionPool,
      serializer: this.serializer,
      diagnostic: this.diagnostic,
      initialOptions: options
    }

    /* istanbul ignore else */
    if (options.auth !== undefined) {
      options.headers = prepareHeaders(options.headers, options.auth)
    }

    return new Client(options)
  }

  /**
   * Closes all connections in the connection pool. Connections shared with any parent or child instances will also be closed.
   */
  async close (): Promise<void> {
    return await this.connectionPool.empty()
  }
}

function isHttpConnection (node?: string | string[] | NodeOptions | NodeOptions[]): boolean {
  if (Array.isArray(node)) {
    return node.some((n) => (typeof n === 'string' ? new URL(n).protocol : n.url.protocol) === 'http:')
  } else {
    if (node == null) return false
    return (typeof node === 'string' ? new URL(node).protocol : node.url.protocol) === 'http:'
  }
}

function getAuth (node?: string | string[] | NodeOptions | NodeOptions[]): { username: string, password: string } | null {
  if (Array.isArray(node)) {
    for (const url of node) {
      const auth = getUsernameAndPassword(url)
      if (auth != null && auth.username !== '' && auth.password !== '') {
        return auth
      }
    }

    return null
  } else {
    const auth = getUsernameAndPassword(node)
    if (auth != null && auth.username !== '' && auth.password !== '') {
      return auth
    }

    return null
  }

  function getUsernameAndPassword (node?: string | NodeOptions): { username: string, password: string } | null {
    /* istanbul ignore else */
    if (typeof node === 'string') {
      const { username, password } = new URL(node)
      return {
        username: decodeURIComponent(username),
        password: decodeURIComponent(password)
      }
    } else if (node != null && node.url instanceof URL) {
      return {
        username: decodeURIComponent(node.url.username),
        password: decodeURIComponent(node.url.password)
      }
    } else {
      return null
    }
  }
}
