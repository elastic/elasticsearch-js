# Client

The main Elasticsearch client class.

## Constructor

```typescript
import { Client } from '@elastic/elasticsearch';

const client = new Client(options: ClientOptions);
```

### Client Options

| Option | Type | Description |
|--------|------|-------------|
| `node` | `string \| string[]` | Elasticsearch node URL(s) |
| `nodes` | `string \| string[]` | Alias for `node` |
| `cloud` | `object` | Elastic Cloud configuration |
| `auth` | `object` | Authentication options |
| `maxRetries` | `number` | Maximum number of retries (default: 3) |
| `requestTimeout` | `number` | Request timeout in milliseconds |
| `sniffOnStart` | `boolean` | Sniff for nodes on start |
| `sniffInterval` | `number` | Interval for sniffing (ms) |

## API Methods

All Elasticsearch API methods are available on the client instance. See:

- [All API Methods](./index.md#api-methods)
- [Individual API Documentation](./apis/)

## Helpers

- [`client.helpers`](./helpers.md) - Helper utilities

## Transport

- [`client.transport`](./transport.md) - Transport layer

## See Also

- [API Reference](./index.md)
- [Getting Started Guide](../getting-started.md)
