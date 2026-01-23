# Client.sql

## Method Signature

```typescript
sql
```

## Description

This method is part of the Elasticsearch JavaScript client API.

## Related Types

- See [All Types](../types/index.md) for request and response type definitions

## Example

```typescript
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200'
});

// Use the sql method
const result = await client.sql(/* parameters */);
```

## See Also

- [Client API Reference](../client-api.md)
- [Type Definitions](../types/index.md)
- [Transport Documentation](../transport/README.md)
