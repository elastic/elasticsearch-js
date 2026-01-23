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
| `node?` | `string | string[] | NodeOptions | NodeOptions[]` | - |
| `nodes?` | `string | string[] | NodeOptions | NodeOptions[]` | - |
| `Connection?` | `typeof BaseConnection` | - |
| `ConnectionPool?` | `typeof BaseConnectionPool` | - |
| `Transport?` | [`Transport`](./transport.md) | - |
| `Serializer?` | `typeof Serializer` | - |
| `maxRetries?` | `number` | - |
| `requestTimeout?` | `number` | - |
| `pingTimeout?` | `number` | - |
| `sniffInterval?` | `number | boolean` | - |
| `sniffOnStart?` | `boolean` | - |
| `sniffEndpoint?` | `string` | - |
| `sniffOnConnectionFault?` | `boolean` | - |
| `resurrectStrategy?` | `'ping' | 'optimistic' | 'none'` | - |
| `compression?` | `boolean` | - |
| `tls?` | `TlsConnectionOptions` | - |
| `agent?` | `HttpAgentOptions | UndiciAgentOptions | agentFn | false` | - |
| `nodeFilter?` | `nodeFilterFn` | - |
| `nodeSelector?` | `nodeSelectorFn` | - |
| `headers?` | `Record<string, any>` | - |
| `opaqueIdPrefix?` | `string` | - |
| `generateRequestId?` | `generateRequestIdFn` | - |
| `name?` | `string | symbol` | - |
| `auth?` | `BasicAuth | ApiKeyAuth | BearerAuth` | - |
| `context?` | `Context` | - |
| `proxy?` | `string | URL` | - |
| `enableMetaHeader?` | `boolean` | - |
| `cloud?` | `{
    id: string
  }` | - |
| `disablePrototypePoisoningProtection?` | `boolean | 'proto' | 'constructor'` | - |
| `caFingerprint?` | `string` | - |
| `maxResponseSize?` | `number` | - |
| `maxCompressedResponseSize?` | `number` | - |
| `redaction?` | `RedactionOptions` | - |
| `serverMode?` | `'stack' | 'serverless'` | - |

## See Also

- [API Methods](./index.md)
- [Helpers](./helpers.md)
