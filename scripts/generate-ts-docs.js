#!/usr/bin/env node

/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * TypeScript Reference Documentation Generator
 * 
 * This script generates comprehensive TypeScript reference documentation
 * for the Elasticsearch JavaScript client with the following features:
 * - Separate markdown pages for each API
 * - Full request/response type documentation
 * - Cross-linked type references
 * - Client-prefixed method names (Client.method)
 * - Includes @elastic/transport documentation
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DOCS_DIR = path.join(__dirname, '../docs/reference/typescript-api');
const SRC_API_DIR = path.join(__dirname, '../src/api/api');

console.log('🔨 TypeScript Reference Documentation Generator');
console.log('================================================\n');

// Step 1: Clean and create docs directory
console.log('📁 Setting up documentation directory...');
if (fs.existsSync(DOCS_DIR)) {
  fs.rmSync(DOCS_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DOCS_DIR, { recursive: true });

// Step 2: Generate base documentation using TypeDoc
console.log('📚 Generating base documentation with TypeDoc...');
try {
  // Set a reasonable timeout (5 minutes) for TypeDoc generation
  execSync('npx typedoc', { 
    stdio: 'inherit',
    timeout: 300000 // 5 minutes
  });
} catch (error) {
  console.error('⚠️  TypeDoc generation had warnings (this is expected)');
}

// Step 3: Process and reorganize documentation
console.log('\n🔄 Processing and reorganizing documentation...');

const TYPEDOC_OUT = path.join(__dirname, '../docs/reference/typescript');

// Move and reorganize files
if (fs.existsSync(TYPEDOC_OUT)) {
  // Copy the generated docs to our target directory
  copyRecursive(TYPEDOC_OUT, DOCS_DIR);
  
  console.log('✅ Documentation generated successfully!');
  console.log(`📍 Location: ${DOCS_DIR}`);
  
  // Step 4: Run post-processing
  console.log('\n🔧 Running post-processing...');
  const processScript = path.join(__dirname, 'process-ts-docs.js');
  try {
    execSync(`node "${processScript}"`, { 
      stdio: 'inherit',
      timeout: 60000 // 1 minute timeout
    });
  } catch (error) {
    console.error('⚠️  Post-processing had issues:', error.message);
  }
  
  // Create an index file
  console.log('\n📝 Creating documentation index...');
  createIndexFile(DOCS_DIR);
} else {
  console.error('❌ TypeDoc output not found!');
  process.exit(1);
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  
  if (fs.statSync(src).isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(item => {
      copyRecursive(path.join(src, item), path.join(dest, item));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function createIndexFile(docsDir) {
  const readmeContent = `# Elasticsearch JavaScript Client - TypeScript API Documentation

Welcome to the TypeScript API reference for the official Elasticsearch JavaScript client.

## 📚 Documentation Index

- **[Client API Reference](client-api.md)** - Main API documentation and usage guide
- **[Complete API Methods List](index.md)** - All available API methods
- **[Type Definitions](types/index.md)** - TypeScript type definitions for all requests and responses
- **[Full TypeDoc Reference](src/client.md)** - Complete TypeDoc-generated documentation
- **[Transport Layer](node_modules/@elastic/transport/README.md)** - @elastic/transport documentation

## 🚀 Quick Start

### Installation

\`\`\`bash
npm install @elastic/elasticsearch
\`\`\`

### Basic Usage

\`\`\`typescript
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
\`\`\`

## 📖 API Organization

### Core Methods

All Elasticsearch API methods are available directly on the \`Client\` instance:

- \`client.search()\` - Search for documents
- \`client.index()\` - Index a document
- \`client.bulk()\` - Perform bulk operations
- \`client.get()\` - Retrieve a document
- \`client.delete()\` - Delete a document
- \`client.update()\` - Update a document
- And many more...

### Namespaced APIs

Some APIs are organized into logical namespaces:

#### Index Management
- \`client.indices.create()\` - Create an index
- \`client.indices.delete()\` - Delete an index
- \`client.indices.putMapping()\` - Update index mapping
- \`client.indices.getMapping()\` - Get index mapping

#### Cluster Management
- \`client.cluster.health()\` - Get cluster health
- \`client.cluster.stats()\` - Get cluster statistics
- \`client.cluster.putSettings()\` - Update cluster settings

#### CAT APIs
- \`client.cat.indices()\` - List indices
- \`client.cat.nodes()\` - List nodes
- \`client.cat.health()\` - Cluster health (compact format)

#### And More
- \`client.nodes.*\` - Node operations
- \`client.snapshot.*\` - Snapshot and restore
- \`client.tasks.*\` - Task management
- \`client.sql.*\` - SQL operations
- \`client.ml.*\` - Machine learning
- \`client.security.*\` - Security operations
- Many other specialized namespaces...

## 📝 Type Safety

This client is fully typed with TypeScript. All request parameters and response types are included:

\`\`\`typescript
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
\`\`\`

## 🔗 Documentation Structure

This documentation is generated from the TypeScript source code using TypeDoc and includes:

1. **Separate pages for each API method** - Easy to navigate and link to specific methods
2. **Complete type definitions** - All request and response types with cross-references
3. **Transport layer documentation** - Low-level transport configuration and APIs
4. **Client configuration options** - All available client constructor options
5. **Helper utilities** - Additional helper methods and utilities

## 📦 What's Included

- **Client API** (\`@elastic/elasticsearch\`): Main Elasticsearch client with all API methods
- **Type Definitions** (\`estypes\`): Complete TypeScript types for all Elasticsearch operations
- **Transport** (\`@elastic/transport\`): Low-level HTTP transport layer
- **Helpers**: Utility functions for common operations

## 🛠️ Generation

This documentation is automatically generated from the TypeScript source code.

To regenerate:

\`\`\`bash
npm run docs:generate
\`\`\`

## 📚 Additional Resources

- [Elasticsearch JavaScript Client GitHub](https://github.com/elastic/elasticsearch-js)
- [Official Documentation](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)
- [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)

---

*Documentation generated: ${new Date().toISOString()}*
`;

  fs.writeFileSync(path.join(docsDir, 'README.md'), readmeContent);
  console.log('📝 Created comprehensive README.md');
  
  // Also create the client-api.md
  const clientApiContent = `# Client API Reference

This document provides an overview of the Elasticsearch JavaScript \`Client\` class and its API methods.

## Table of Contents

- [Client Class](#client-class)
- [Constructor Options](#constructor-options)
- [API Methods](#api-methods)
- [Type Definitions](#type-definitions)
- [Examples](#examples)

## Client Class

The \`Client\` class is the main entry point for interacting with Elasticsearch.

### Import

\`\`\`typescript
import { Client } from '@elastic/elasticsearch';
\`\`\`

### Constructor

\`\`\`typescript
const client = new Client(options: ClientOptions);
\`\`\`

## Constructor Options

See the [Full Client Documentation](src/client.md#clientoptions) for complete details on all available options.

### Common Options

\`\`\`typescript
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
\`\`\`

## API Methods

All Elasticsearch API endpoints are available as methods on the \`Client\` instance.

### Document Operations

- [\`client.index()\`](apis/index.md) - Index a document
- [\`client.get()\`](apis/get.md) - Get a document by ID
- [\`client.update()\`](apis/update.md) - Update a document
- [\`client.delete()\`](apis/delete.md) - Delete a document
- [\`client.bulk()\`](apis/bulk.md) - Bulk operations
- [\`client.mget()\`](apis/mget.md) - Multi-get documents

### Search Operations

- [\`client.search()\`](apis/search.md) - Search for documents
- [\`client.msearch()\`](apis/msearch.md) - Multi-search
- [\`client.count()\`](apis/count.md) - Count documents
- [\`client.scroll()\`](apis/scroll.md) - Scroll through results

### Index Management

- \`client.indices.create()\` - Create an index
- \`client.indices.delete()\` - Delete an index
- \`client.indices.exists()\` - Check if index exists
- \`client.indices.putMapping()\` - Update mapping
- \`client.indices.getMapping()\` - Get mapping
- \`client.indices.refresh()\` - Refresh index

### Cluster Management

- \`client.cluster.health()\` - Get cluster health
- \`client.cluster.stats()\` - Get cluster statistics
- \`client.cluster.state()\` - Get cluster state

### Complete Method List

For a complete list of all available methods, see:
- [All API Methods](index.md)
- [Full TypeDoc Reference](src/client.md)

## Type Definitions

All request and response types are available in the \`estypes\` namespace:

\`\`\`typescript
import type * as estypes from '@elastic/elasticsearch/lib/api/types';

// Use specific types
const searchRequest: estypes.SearchRequest = {
  index: 'my-index',
  query: {
    match_all: {}
  }
};

const response: estypes.SearchResponse = await client.search(searchRequest);
\`\`\`

See [Type Definitions](types/index.md) for complete type documentation.

## Examples

### Basic Search

\`\`\`typescript
const result = await client.search({
  index: 'products',
  query: {
    match: {
      name: 'laptop'
    }
  }
});

console.log(result.hits.hits);
\`\`\`

### Index a Document

\`\`\`typescript
await client.index({
  index: 'products',
  id: '1',
  document: {
    name: 'Laptop',
    price: 999.99,
    category: 'Electronics'
  }
});
\`\`\`

### Bulk Operations

\`\`\`typescript
await client.bulk({
  operations: [
    { index: { _index: 'products', _id: '1' } },
    { name: 'Laptop', price: 999.99 },
    { index: { _index: 'products', _id: '2' } },
    { name: 'Mouse', price: 29.99 }
  ]
});
\`\`\`

### Aggregations

\`\`\`typescript
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
\`\`\`

## See Also

- [Type Definitions](types/index.md)
- [Transport Documentation](node_modules/@elastic/transport/README.md)
- [Full API Reference](index.md)

---

*Generated: ${new Date().toISOString()}*
`;

  fs.writeFileSync(path.join(docsDir, 'client-api.md'), clientApiContent);
  console.log('📝 Created client API reference: client-api.md');
}

console.log('\n✨ Documentation generation complete!\n');
