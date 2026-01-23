# Elasticsearch JavaScript Client - TypeScript API Documentation

Welcome to the TypeScript API reference for the official Elasticsearch JavaScript client.

## 📚 Documentation Index

- **[Client API Reference](client-api.md)** - Main API documentation and usage guide
- **[Complete API Methods List](index.md)** - All available API methods
- **[Type Definitions](types/index.md)** - TypeScript type definitions for all requests and responses
- **[Full TypeDoc Reference](src/client.md)** - Complete TypeDoc-generated documentation
- **[Transport Layer](node_modules/@elastic/transport/README.md)** - @elastic/transport documentation

## 🚀 Quick Start

### Installation

```bash
npm install @elastic/elasticsearch
```

### Basic Usage

```typescript
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200'
});

// Search
const result = await client.search({
  index: 'my-index',
  query: {
    match: { title: 'elasticsearch' }
  }
});

// Index a document
await client.index({
  index: 'my-index',
  id: '1',
  document: {
    title: 'Hello World',
    tags: ['example', 'typescript']
  }
});
```

## 📖 API Organization

### Core Methods

All Elasticsearch API methods are available directly on the `Client` instance:

- `client.search()` - Search for documents
- `client.index()` - Index a document
- `client.bulk()` - Perform bulk operations
- `client.get()` - Retrieve a document
- `client.delete()` - Delete a document
- `client.update()` - Update a document
- And many more...

### Namespaced APIs

Some APIs are organized into logical namespaces:

#### Index Management
- `client.indices.create()` - Create an index
- `client.indices.delete()` - Delete an index
- `client.indices.putMapping()` - Update index mapping
- `client.indices.getMapping()` - Get index mapping

#### Cluster Management
- `client.cluster.health()` - Get cluster health
- `client.cluster.stats()` - Get cluster statistics
- `client.cluster.putSettings()` - Update cluster settings

#### CAT APIs
- `client.cat.indices()` - List indices
- `client.cat.nodes()` - List nodes
- `client.cat.health()` - Cluster health (compact format)

#### And More
- `client.nodes.*` - Node operations
- `client.snapshot.*` - Snapshot and restore
- `client.tasks.*` - Task management
- `client.sql.*` - SQL operations
- `client.ml.*` - Machine learning
- `client.security.*` - Security operations
- Many other specialized namespaces...

## 📝 Type Safety

This client is fully typed with TypeScript. All request parameters and response types are included:

```typescript
import { Client } from '@elastic/elasticsearch';
import type * as estypes from '@elastic/elasticsearch/lib/api/types';

const client = new Client({ node: 'http://localhost:9200' });

// Request and response are fully typed
const response: estypes.SearchResponse = await client.search({
  index: 'my-index',
  query: {
    match_all: {}
  }
});
```

## 🔗 Documentation Structure

This documentation is generated from the TypeScript source code using TypeDoc and includes:

1. **Separate pages for each API method** - Easy to navigate and link to specific methods
2. **Complete type definitions** - All request and response types with cross-references
3. **Transport layer documentation** - Low-level transport configuration and APIs
4. **Client configuration options** - All available client constructor options
5. **Helper utilities** - Additional helper methods and utilities

## 📦 What's Included

- **Client API** (`@elastic/elasticsearch`): Main Elasticsearch client with all API methods
- **Type Definitions** (`estypes`): Complete TypeScript types for all Elasticsearch operations
- **Transport** (`@elastic/transport`): Low-level HTTP transport layer
- **Helpers**: Utility functions for common operations

## 🛠️ Generation

This documentation is automatically generated from the TypeScript source code.

To regenerate:

```bash
npm run docs:generate
```

## 📚 Additional Resources

- [Elasticsearch JavaScript Client GitHub](https://github.com/elastic/elasticsearch-js)
- [Official Documentation](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)
- [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)

---

*Documentation generated: 2026-01-23T16:25:16.697Z*
