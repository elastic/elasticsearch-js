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

import { ConnectionOptions as TlsConnectionOptions } from 'tls'
import { URL } from 'url'
import buffer from 'buffer'
import os from 'os'
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
import BaseConnection, { prepareHeaders } from '@elastic/transport/lib/connection/BaseConnection'
import SniffingTransport from './sniffingTransport'
import Helpers from './helpers'
import API from './api'

const kChild = Symbol('elasticsearchjs-child')
const kInitialOptions = Symbol('elasticsearchjs-initial-options')
let clientVersion: string = require('../package.json').version // eslint-disable-line
/* istanbul ignore next */
if (clientVersion.includes('-')) {
  // clean prerelease
  clientVersion = clientVersion.slice(0, clientVersion.indexOf('-')) + 'p'
}
let transportVersion: string = require('@elastic/transport/package.json').version // eslint-disable-line
/* istanbul ignore next */
if (transportVersion.includes('-')) {
  // clean prerelease
  transportVersion = transportVersion.slice(0, transportVersion.indexOf('-')) + 'p'
}
const nodeVersion = process.versions.node

export interface NodeOptions {
  url: URL
  id?: string
  agent?: HttpAgentOptions | UndiciAgentOptions
  ssl?: TlsConnectionOptions
  headers?: Record<string, any>
  roles?: {
    master: boolean
    data: boolean
    ingest: boolean
    ml: boolean
  }
}

export interface ClientOptions {
  node?: string | string[] | NodeOptions | NodeOptions[]
  nodes?: string | string[] | NodeOptions | NodeOptions[]
  Connection?: typeof BaseConnection
  ConnectionPool?: typeof BaseConnectionPool
  Transport?: typeof Transport
  Serializer?: typeof Serializer
  maxRetries?: number
  requestTimeout?: number
  pingTimeout?: number
  sniffInterval?: number | boolean
  sniffOnStart?: boolean
  sniffEndpoint?: string
  sniffOnConnectionFault?: boolean
  resurrectStrategy?: 'ping' | 'optimistic' | 'none'
  compression?: boolean
  tls?: TlsConnectionOptions
  agent?: HttpAgentOptions | UndiciAgentOptions | agentFn | false
  nodeFilter?: nodeFilterFn
  nodeSelector?: nodeSelectorFn
  headers?: Record<string, any>
  opaqueIdPrefix?: string
  generateRequestId?: generateRequestIdFn
  name?: string | symbol
  auth?: BasicAuth | ApiKeyAuth | BearerAuth
  context?: Context
  proxy?: string | URL
  enableMetaHeader?: boolean
  cloud?: {
    id: string
  }
  disablePrototypePoisoningProtection?: boolean | 'proto' | 'constructor'
  caFingerprint?: string
  maxResponseSize?: number
  maxCompressedResponseSize?: number
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
      // the cloud id is `cluster-name:base64encodedurl`
      // the url is a string divided by two '$', the first is the cloud url
      // the second the elasticsearch instance, the third the kibana instance
      const cloudUrls = Buffer.from(id.split(':')[1], 'base64').toString().split('$')

      opts.node = `https://${cloudUrls[1]}.${cloudUrls[0]}`

      // Cloud has better performances with compression enabled
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
        'user-agent': `elasticsearch-js/${clientVersion} Node.js ${nodeVersion}; Transport ${transportVersion}; (${os.platform()} ${os.release()} ${os.arch()})`
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
      maxCompressedResponseSize: null
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
      options.headers['x-elastic-client-meta'] = `es=${clientVersion},js=${nodeVersion},t=${transportVersion},hc=${nodeVersion}`
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
      this.serializer = new options.Serializer()
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
      this.connectionPool.addConnection(options.node ?? options.nodes)
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
      }
    })

    this.helpers = new Helpers({
      client: this,
      metaHeader: options.enableMetaHeader
        ? `es=${clientVersion},js=${nodeVersion},t=${transportVersion},hc=${nodeVersion}`
        : null,
      maxRetries: options.maxRetries
    })
  }

  child (opts: ClientOptions): Client {
    // Merge the new options with the initial ones
    // @ts-expect-error kChild symbol is for internal use only
    const options: ClientOptions = Object.assign({}, this[kInitialOptions], opts)
    // Pass to the child client the parent instances that cannot be overriden
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
