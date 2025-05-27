## Interface `ClientOptions`

| Name | Type | Description |
| - | - | - |
| `agent` | [HttpAgentOptions](./HttpAgentOptions.md) | [UndiciAgentOptions](./UndiciAgentOptions.md) | [agentFn](./agentFn.md) | false | agent Custom HTTP agent options 

Default value: null |
| `auth` | [BasicAuth](./BasicAuth.md) | [ApiKeyAuth](./ApiKeyAuth.md) | [BearerAuth](./BearerAuth.md) | auth Authentication options for this Elasticsearch cluster 

Default value: null |
| `caFingerprint` | string | caFingerprint If configured, verifies that the fingerprint of the CA certificate that has signed the certificate of the server matches the supplied fingerprint; only accepts SHA256 digest fingerprints 

Default value: null |
| `cloud` | { id: string; } | cloud Custom configuration for connecting to Elastic Cloud, in lieu of a `node` or `nodes` configuration 

Default value: null |
| `compression` | boolean | compression Enables gzip request body compression 

Default value: `true` if connecting to Elastic Cloud, otherwise `false`. |
| `Connection` | typeof [BaseConnection](./BaseConnection.md) | Connection HTTP connection class to use 

Default value: `UndiciConnection` |
| `ConnectionPool` | typeof [BaseConnectionPool](./BaseConnectionPool.md) | ConnectionPool HTTP connection pool class to use 

Default value: `CloudConnectionPool`, if connecting to Elastic Cloud, otherwise `WeightedConnectionPool` |
| `context` | [Context](./Context.md) | context A custom object attached to each request that can be used to pass data to client events 

Default value: null |
| `disablePrototypePoisoningProtection` | boolean | 'proto' | 'constructor' | disablePrototypePoisoningProtection Disables safe JSON parsing that protects execution of prototype poisoning attacks; disabled by default, as it can introduce a performance penalty 

Default value: true |
| `enableMetaHeader` | boolean | enableMetaHeader If true, adds an header named `x-elastic-client-meta`, containing a small amount of high-level telemetry data, such as the client and platform version 

Default value: true |
| `generateRequestId` | [generateRequestIdFn](./generateRequestIdFn.md) | generateRequestId A custom function for generating unique IDs for each request, to make it easier to associate each API request to a single response 

Default value: A function that increments a number counter starting from 1 |
| `headers` | Record<string, any> | headers Custom HTTP headers that should be sent with each request 

Default value: An object with a custom `user-agent` header |
| `maxCompressedResponseSize` | number | maxCompressedResponseSize When configured, verifies that the compressed response size is lower than the configured number. If it's higher, it will abort the request. It cannot be higher than `buffer.constants.MAX_LENGTH`

Default value: null |
| `maxResponseSize` | number | maxResponseSize When configured, verifies that the uncompressed response size is lower than the configured number. If it's higher, it will abort the request. It cannot be higher than `buffer.constants.MAX_STRING_LENGTH`

Default value: null |
| `maxRetries` | number | maxRetries Max number of retries for each request 

Default value: 3 |
| `name` | string | symbol | name A name for this client 

Default value: 'elasticsearch-js' |
| `node` | string | string[] | [NodeOptions](./NodeOptions.md) | [NodeOptions](./NodeOptions.md)[] | node Elasticsearch node settings, if there is only one node. Required if `nodes` or `cloud` is not set. |
| `nodeFilter` | [nodeFilterFn](./nodeFilterFn.md) | nodeFilter A custom function used by the connection pool to determine which nodes are qualified to receive a request 

Default value: A function that uses the Connection `roles` property to avoid master-only nodes |
| `nodes` | string | string[] | [NodeOptions](./NodeOptions.md) | [NodeOptions](./NodeOptions.md)[] | nodes Elasticsearch node settings, if there are multiple nodes. Required if `node` or `cloud` is not set. |
| `nodeSelector` | [nodeSelectorFn](./nodeSelectorFn.md) | nodeSelector A custom function used by the connection pool to determine which node should receive the next request 

Default value: A "round robin" function that loops sequentially through each node in the pool. |
| `opaqueIdPrefix` | string | opaqueIdPrefix A string prefix to apply to every generated X-Opaque-Id header 

Default value: null |
| `pingTimeout` | number | pingTimeout Max number of milliseconds a `ClusterConnectionPool` will wait when pinging nodes before marking them dead 

Default value: 3000 |
| `proxy` | string | URL | proxy A proxy URL that, when provided, the client will automatically send all requests through 

Default value: null |
| `redaction` | [RedactionOptions](./RedactionOptions.md) | redaction Options for how to redact potentially sensitive data from metadata attached to `Error` objects 

Default value: Configuration that will replace known sources of sensitive data |
| `requestTimeout` | number | requestTimeout Max request timeout in milliseconds for each request 

Default value: No timeout |
| `resurrectStrategy` | 'ping' | 'optimistic' | 'none' | resurrectStrategy Strategy for resurrecting dead nodes when using `ClusterConnectionPool`. 'ping' will issue a test request to a node and resurrect it if it responds. 'optimistic' marks a node as alive without testing it. 'none ` will never attempt to revive a dead connection. 

Default value: 'ping' |
| `Serializer` | typeof [Serializer](./Serializer.md) | Serializer Serialization class to use 

Default value: `Serializer` |
| `serverMode` | 'stack' | 'serverless' | serverMode Setting to "serverless" will change some default behavior, like enabling compression and disabling features that assume the possibility of multiple Elasticsearch nodes. 

Default value: "stack", which sets defaults for a traditional (non-serverless) Elasticsearch instance. |
| `sniffEndpoint` | string | sniffEndpoint Endpoint to ping during a sniff 

Default value: "_nodes/_all/http" |
| `sniffInterval` | number | boolean | sniffInterval Perform a sniff operation every `n` milliseconds 

Default value: false |
| `sniffOnConnectionFault` | boolean | sniffOnConnectionFault Perform a sniff on connection fault 

Default value: false |
| `sniffOnStart` | boolean | sniffOnStart Perform a sniff once the client is started 

Default value: false |
| `tls` | [TlsConnectionOptions](./TlsConnectionOptions.md) | tls [TLS configuraton](https://nodejs.org/api/tls.html) 

Default value: null |
| `Transport` | typeof [Transport](./Transport.md) | Transport Elastic transport class to use 

Default value: `Transport` |
