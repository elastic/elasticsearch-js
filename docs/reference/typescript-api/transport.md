# Transport

The Elasticsearch JavaScript client uses [@elastic/transport](https://github.com/elastic/elastic-transport-js) for HTTP communication.

## Overview

The transport layer handles:

- Connection management and pooling
- Request/response lifecycle
- Retries and error handling
- Serialization/deserialization
- Node sniffing and discovery

## Key Classes

### Transport

Main transport class that manages connections and handles requests.

### Connection Classes

- **BaseConnection** - Base connection class
- **HttpConnection** - A connection to an Elasticsearch node, managed by the `http` client in the standard library
- **UndiciConnection** - Connection using the undici HTTP client

### Connection Pool Classes

- **BaseConnectionPool** - Base connection pool
- **WeightedConnectionPool** - Default connection pool
- **ClusterConnectionPool** - Connection pool for cluster deployments
- **CloudConnectionPool** - Connection pool for Elastic Cloud

### Serializer

Handles serialization and deserialization of requests and responses.

## See Also

- [Client Options](./client.md) - See the `Transport` option for configuration
- [@elastic/transport Documentation](https://github.com/elastic/elastic-transport-js)
