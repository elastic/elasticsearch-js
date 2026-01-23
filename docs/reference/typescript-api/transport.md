# Transport

The Elasticsearch JavaScript client is built on [@elastic/transport](https://github.com/elastic/elastic-transport-js).

## Overview

The transport layer handles:

- HTTP/HTTPS connections
- Connection pooling and management
- Request/response serialization
- Retry logic
- Node discovery and sniffing

## Key Classes

### Transport

Main transport class that manages connections and request handling.

### Connection

Base connection class. Specific implementations:

- `UndiciConnection` - Default connection using undici
- `HttpConnection` - HTTP-based connection

### ConnectionPool

Manages a pool of connections. Implementations:

- `CloudConnectionPool` - For Elastic Cloud connections
- `WeightedConnectionPool` - Default connection pool

### Serializer

Handles serialization and deserialization of requests and responses.

## Configuration

Transport options can be configured when creating the client:

```typescript
const client = new Client({
  node: 'http://localhost:9200',
  maxRetries: 3,
  requestTimeout: 30000,
  sniffOnStart: true
});
```

## See Also

- [Client](./client.md)
- [@elastic/transport Documentation](https://github.com/elastic/elastic-transport-js)
