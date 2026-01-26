# Client

The main Elasticsearch client class.

## Constructor

```typescript
import { Client } from '@elastic/elasticsearch';

const client = new Client(options: ClientOptions);
```

### ClientOptions

| Option | Type | Description |
|--------|------|-------------|
| `node?` | `string | string[] | NodeOptions | NodeOptions[]` | Elasticsearch node settings, if there is only one node. Required if `nodes` or `cloud` is not set. |
| `nodes?` | `string | string[] | NodeOptions | NodeOptions[]` | Elasticsearch node settings, if there are multiple nodes. Required if `node` or `cloud` is not set. |
| `Connection?` | `typeof BaseConnection` | HTTP connection class to use |
| `ConnectionPool?` | `typeof BaseConnectionPool` | HTTP connection pool class to use |
| `Transport?` | [`Transport`](./transport.md) | Elastic transport class to use |
| `Serializer?` | `typeof Serializer` | Serialization class to use |
| `maxRetries?` | `number` | Max number of retries for each request |
| `requestTimeout?` | `number` | Max request timeout in milliseconds for each request |
| `pingTimeout?` | `number` | Max number of milliseconds a `ClusterConnectionPool` will wait when pinging nodes before marking them dead |
| `sniffInterval?` | `number | boolean` | Perform a sniff operation every `n` milliseconds |
| `sniffOnStart?` | `boolean` | Perform a sniff once the client is started |
| `sniffEndpoint?` | `string` | Endpoint to ping during a sniff |
| `sniffOnConnectionFault?` | `boolean` | Perform a sniff on connection fault |
| `resurrectStrategy?` | `'ping' | 'optimistic' | 'none'` | Strategy for resurrecting dead nodes when using `ClusterConnectionPool`. 'ping' will issue a test request to a node and resurrect it if it responds. 'optimistic' marks a node as alive without testing it. 'none` will never attempt to revive a dead connection. |
| `compression?` | `boolean` | Enables gzip request body compression |
| `tls?` | `TlsConnectionOptions` | [TLS configuraton](https://nodejs.org/api/tls.html) |
| `agent?` | `HttpAgentOptions | UndiciAgentOptions | agentFn | false` | Custom HTTP agent options |
| `nodeFilter?` | `nodeFilterFn` | A custom function used by the connection pool to determine which nodes are qualified to receive a request |
| `nodeSelector?` | `nodeSelectorFn` | A custom function used by the connection pool to determine which node should receive the next request |
| `headers?` | `Record<string, any>` | Custom HTTP headers that should be sent with each request |
| `opaqueIdPrefix?` | `string` | A string prefix to apply to every generated X-Opaque-Id header |
| `generateRequestId?` | `generateRequestIdFn` | A custom function for generating unique IDs for each request, to make it easier to associate each API request to a single response |
| `name?` | `string | symbol` | A name for this client |
| `auth?` | `BasicAuth | ApiKeyAuth | BearerAuth` | Authentication options for this Elasticsearch cluster |
| `context?` | `Context` | A custom object attached to each request that can be used to pass data to client events |
| `proxy?` | `string | URL` | A proxy URL that, when provided, the client will automatically send all requests through |
| `enableMetaHeader?` | `boolean` | If true, adds an header named `x-elastic-client-meta`, containing a small amount of high-level telemetry data, such as the client and platform version |
| `cloud?` | `{
    id: string
  }` | Custom configuration for connecting to Elastic Cloud, in lieu of a `node` or `nodes` configuration |
| `disablePrototypePoisoningProtection?` | `boolean | 'proto' | 'constructor'` | Disables safe JSON parsing that protects execution of prototype poisoning attacks; disabled by default, as it can introduce a performance penalty |
| `caFingerprint?` | `string` | If configured, verifies that the fingerprint of the CA certificate that has signed the certificate of the server matches the supplied fingerprint; only accepts SHA256 digest fingerprints |
| `maxResponseSize?` | `number` | When configured, verifies that the uncompressed response size is lower than the configured number. If it's higher, it will abort the request. It cannot be higher than `buffer.constants.MAX_STRING_LENGTH` |
| `maxCompressedResponseSize?` | `number` | When configured, verifies that the compressed response size is lower than the configured number. If it's higher, it will abort the request. It cannot be higher than `buffer.constants.MAX_LENGTH` |
| `redaction?` | `RedactionOptions` | Options for how to redact potentially sensitive data from metadata attached to `Error` objects |
| `serverMode?` | `'stack' | 'serverless'` | Setting to "serverless" will change some default behavior, like enabling compression and disabling features that assume the possibility of multiple Elasticsearch nodes. |

## See Also

- [API Methods](./index.md)
- [Helpers](./helpers.md)
