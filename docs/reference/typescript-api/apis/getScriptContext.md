# Client.getScriptContext

## Method Signature

```typescript
getScriptContext
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

// Use the getScriptContext method
const result = await client.getScriptContext(/* parameters */);
```

## See Also

- [Client API Reference](../client-api.md)
- [Type Definitions](../types/index.md)
- [Transport Documentation](../transport/README.md)
