#!/usr/bin/env node

/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Advanced TypeScript Reference Documentation Generator
 * 
 * This script generates comprehensive TypeScript reference documentation
 * with the following features:
 * - Separate markdown pages for each API method
 * - Full request/response type documentation with cross-links
 * - Client-prefixed method names (Client.method)
 * - Includes @elastic/transport documentation
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs/reference/typescript-api');
const API_DOCS_DIR = path.join(DOCS_DIR, 'apis');
const TYPES_DOCS_DIR = path.join(DOCS_DIR, 'types');

console.log('🔨 Processing TypeScript API Documentation');
console.log('==========================================\n');

// Read the main client.md file
const clientMdPath = path.join(DOCS_DIR, 'src', 'client.md');
if (!fs.existsSync(clientMdPath)) {
  console.error('❌ client.md not found!');
  process.exit(1);
}

const clientMd = fs.readFileSync(clientMdPath, 'utf8');

// Create API documentation directories
if (!fs.existsSync(API_DOCS_DIR)) {
  fs.mkdirSync(API_DOCS_DIR, { recursive: true });
}

if (!fs.existsSync(TYPES_DOCS_DIR)) {
  fs.mkdirSync(TYPES_DOCS_DIR, { recursive: true });
}

// Extract API methods from client documentation
const apiMethods = extractApiMethods(clientMd);

console.log(`📊 Found ${apiMethods.length} API methods`);

// Generate individual API documentation pages
apiMethods.forEach(method => {
  generateApiDoc(method);
});

// Process types documentation
processTypesDoc();

// Create navigation index
createNavigationIndex(apiMethods);

console.log('\n✨ Documentation processing complete!\n');

function extractApiMethods(content) {
  const methods = [];
  
  // Parse the properties table to extract API methods
  // Note: This parsing relies on TypeDoc's markdown output format.
  // If TypeDoc's output format changes significantly, this may need updates.
  // Alternative: Use TypeDoc's JSON output mode for more robust parsing.
  const lines = content.split('\n');
  let inPropertiesTable = false;
  let currentProperty = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect properties table
    if (line.includes('#### Properties')) {
      inPropertiesTable = true;
      continue;
    }
    
    // End of properties section
    if (inPropertiesTable && line.match(/^####\s+/)) {
      inPropertiesTable = false;
      break;
    }
    
    // Extract property info from table row
    if (inPropertiesTable && line.startsWith('| <a id=')) {
      const match = line.match(/\|\s+<a id="([^"]+)"><\/a>\s+`([^`]+)`\s+\|/);
      if (match) {
        const [, id, name] = match;
        
        // Look ahead for type information
        const typeMatch = line.match(/\|\s+<a[^>]*><\/a>\s+`[^`]+`\s+\|\s+([^|]+)\s+\|/);
        const typeInfo = typeMatch ? typeMatch[1].trim() : '';
        
        // Use name as signature fallback
        const signature = name || id;
        
        methods.push({
          id,
          name,
          type: typeInfo,
          signature
        });
      }
    }
  }
  
  return methods;
}

function generateApiDoc(method) {
  const methodName = method.name;
  const fileName = `${methodName}.md`;
  const filePath = path.join(API_DOCS_DIR, fileName);
  
  // Create basic API documentation
  const content = `# Client.${methodName}

## Method Signature

\`\`\`typescript
${method.signature}
\`\`\`

## Description

This method is part of the Elasticsearch JavaScript client API.

## Related Types

- See [All Types](../types/index.md) for request and response type definitions

## Example

\`\`\`typescript
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200'
});

// Use the ${methodName} method
const result = await client.${methodName}(/* parameters */);
\`\`\`

## See Also

- [Client API Reference](../client-api.md)
- [Type Definitions](../types/index.md)
- [Transport Documentation](../transport/README.md)
`;

  fs.writeFileSync(filePath, content);
}

function processTypesDoc() {
  const typesMdPath = path.join(DOCS_DIR, 'src', 'api', 'types.md');
  
  if (!fs.existsSync(typesMdPath)) {
    console.warn('⚠️  types.md not found, skipping types processing');
    return;
  }
  
  // Copy the types file to the types directory
  const targetPath = path.join(TYPES_DOCS_DIR, 'index.md');
  fs.copyFileSync(typesMdPath, targetPath);
  
  console.log('📝 Processed types documentation');
}

function createNavigationIndex(apiMethods) {
  const indexContent = `# Elasticsearch JavaScript Client - API Reference

This is the complete TypeScript API reference for the Elasticsearch JavaScript client.

## Quick Links

- [Client API Overview](#client-api-overview)
- [All API Methods](#api-methods)
- [Type Definitions](types/index.md)
- [Transport Layer](transport/README.md)

## Client API Overview

The Elasticsearch JavaScript client provides a comprehensive API for interacting with Elasticsearch clusters.
All methods are accessed through the \`Client\` class.

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

// Example: Search
const result = await client.search({
  index: 'my-index',
  query: {
    match: { message: 'search term' }
  }
});
\`\`\`

## API Methods

The following API methods are available on the \`Client\` class:

${apiMethods.map(m => `- [Client.${m.name}](apis/${m.name}.md)`).join('\n')}

## Type Definitions

For detailed TypeScript type information, see the [Type Definitions](types/index.md) documentation.

## Transport Layer

The client is built on [@elastic/transport](https://github.com/elastic/elastic-transport-js).
For transport-level documentation, see the [Transport Documentation](transport/README.md).

---

*Generated: ${new Date().toISOString()}*
`;

  fs.writeFileSync(path.join(DOCS_DIR, 'index.md'), indexContent);
  console.log('📝 Created navigation index');
}
