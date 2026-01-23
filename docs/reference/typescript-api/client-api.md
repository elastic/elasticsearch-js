# Client API Reference

This document provides an overview of the Elasticsearch JavaScript `Client` class and its API methods.

## Table of Contents

- [Client Class](#client-class)
- [Constructor Options](#constructor-options)
- [API Methods](#api-methods)
- [Type Definitions](#type-definitions)
- [Examples](#examples)

## Client Class

The `Client` class is the main entry point for interacting with Elasticsearch.

### Import

```typescript
import { Client } from '@elastic/elasticsearch';
```

### Constructor

```typescript
const client = new Client(options: ClientOptions);
```

## Constructor Options

See the [Full Client Documentation](src/client.md#clientoptions) for complete details on all available options.

### Common Options

```typescript
const client = new Client({
  // Node configuration
  node: 'http://localhost:9200',
  
  // Or multiple nodes
  nodes: ['http://node1:9200', 'http://node2:9200'],
  
  // Cloud configuration
  cloud: {
    id: 'cloud-id-here'
  },
  
  // Authentication
  auth: {
    apiKey: 'api-key-here',
    // or
    username: 'elastic',
    password: 'password'
  },
  
  // Request timeout
  requestTimeout: 30000,
  
  // Max retries
  maxRetries: 3
});
```

## API Methods

All Elasticsearch API endpoints are available as methods on the `Client` instance.

### Document Operations

- [`client.index()`](apis/index.md) - Index a document
- [`client.get()`](apis/get.md) - Get a document by ID
- [`client.update()`](apis/update.md) - Update a document
- [`client.delete()`](apis/delete.md) - Delete a document
- [`client.bulk()`](apis/bulk.md) - Bulk operations
- [`client.mget()`](apis/mget.md) - Multi-get documents

### Search Operations

- [`client.search()`](apis/search.md) - Search for documents
- [`client.msearch()`](apis/msearch.md) - Multi-search
- [`client.count()`](apis/count.md) - Count documents
- [`client.scroll()`](apis/scroll.md) - Scroll through results

### Index Management

- `client.indices.create()` - Create an index
- `client.indices.delete()` - Delete an index
- `client.indices.exists()` - Check if index exists
- `client.indices.putMapping()` - Update mapping
- `client.indices.getMapping()` - Get mapping
- `client.indices.refresh()` - Refresh index

### Cluster Management

- `client.cluster.health()` - Get cluster health
- `client.cluster.stats()` - Get cluster statistics
- `client.cluster.state()` - Get cluster state

### Complete Method List

For a complete list of all available methods, see:
- [All API Methods](index.md)
- [Full TypeDoc Reference](src/client.md)

## Type Definitions

All request and response types are available in the `estypes` namespace:

```typescript
import type * as estypes from '@elastic/elasticsearch/lib/api/types';

// Use specific types
const searchRequest: estypes.SearchRequest = {
  index: 'my-index',
  query: {
    match_all: {}
  }
};

const response: estypes.SearchResponse = await client.search(searchRequest);
```

See [Type Definitions](types/index.md) for complete type documentation.

## Examples

### Basic Search

```typescript
const result = await client.search({
  index: 'products',
  query: {
    match: {
      name: 'laptop'
    }
  }
});

console.log(result.hits.hits);
```

### Index a Document

```typescript
await client.index({
  index: 'products',
  id: '1',
  document: {
    name: 'Laptop',
    price: 999.99,
    category: 'Electronics'
  }
});
```

### Bulk Operations

```typescript
await client.bulk({
  operations: [
    { index: { _index: 'products', _id: '1' } },
    { name: 'Laptop', price: 999.99 },
    { index: { _index: 'products', _id: '2' } },
    { name: 'Mouse', price: 29.99 }
  ]
});
```

### Aggregations

```typescript
const result = await client.search({
  index: 'products',
  size: 0,
  aggs: {
    price_ranges: {
      range: {
        field: 'price',
        ranges: [
          { to: 100 },
          { from: 100, to: 500 },
          { from: 500 }
        ]
      }
    }
  }
});

console.log(result.aggregations);
```

## See Also

- [Type Definitions](types/index.md)
- [Transport Documentation](node_modules/@elastic/transport/README.md)
- [Full API Reference](index.md)

---

*Generated: 2026-01-23T16:25:16.698Z*
