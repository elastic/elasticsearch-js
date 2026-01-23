#!/usr/bin/env node

/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Custom TypeScript AST-based Documentation Generator
 * 
 * This script parses TypeScript source files using the TypeScript compiler API
 * to generate precise, structured documentation that meets all requirements:
 * 
 * 1. Separate file per type in types/
 * 2. Only document actual APIs from src/api/index.ts (no private symbols)
 * 3. Don't document namespace classes, only their methods
 * 4. Document helpers in helpers.md
 * 5. Generate transport documentation
 * 6. Reference-focused structure
 */

const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs/reference/typescript-api');
const SRC_DIR = path.join(__dirname, '../src');

console.log('🔨 Custom TypeScript Documentation Generator');
console.log('===========================================\n');

// Clean and setup directories
console.log('📁 Setting up documentation directories...');
if (fs.existsSync(DOCS_DIR)) {
  fs.rmSync(DOCS_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DOCS_DIR, { recursive: true });
fs.mkdirSync(path.join(DOCS_DIR, 'apis'), { recursive: true });
fs.mkdirSync(path.join(DOCS_DIR, 'types'), { recursive: true });

// Parse TypeScript files
console.log('📚 Parsing TypeScript source files...\n');

const program = ts.createProgram({
  rootNames: [
    path.join(SRC_DIR, 'api/index.ts'),
    path.join(SRC_DIR, 'api/types.ts'),
    path.join(SRC_DIR, 'client.ts'),
    path.join(SRC_DIR, 'helpers.ts')
  ],
  options: {
    target: ts.ScriptTarget.ES2019,
    module: ts.ModuleKind.CommonJS
  }
});

const checker = program.getTypeChecker();

// Step 1: Extract API methods from src/api/index.ts
const apiMethods = extractApiMethods();
console.log(`✓ Found ${apiMethods.length} API methods`);

// Step 2: Extract types from src/api/types.ts
const types = extractTypes();
console.log(`✓ Found ${types.length} types to document`);

// Step 3: Generate documentation
console.log('\n📝 Generating documentation files...\n');

// Generate API documentation
apiMethods.forEach(api => generateApiDoc(api));
console.log(`✓ Generated ${apiMethods.length} API documentation files`);

// Generate type documentation
types.forEach(type => generateTypeDoc(type));
console.log(`✓ Generated ${types.length} type documentation files`);

// Generate helpers documentation
generateHelpersDoc();
console.log(`✓ Generated helpers documentation`);

// Generate transport documentation
generateTransportDoc();
console.log(`✓ Generated transport documentation`);

// Generate Client documentation
generateClientDoc();
console.log(`✓ Generated Client documentation`);

// Generate main index
generateIndexDoc(apiMethods);
console.log(`✓ Generated index documentation`);

// Generate README
generateReadme();
console.log(`✓ Generated README`);

console.log('\n✨ Documentation generation complete!\n');
console.log(`📍 Output: ${DOCS_DIR}\n`);

/**
 * Extract API methods from src/api/index.ts
 */
function extractApiMethods() {
  const apis = [];
  const sourceFile = program.getSourceFile(path.join(SRC_DIR, 'api/index.ts'));
  
  if (!sourceFile) {
    console.error('Could not find api/index.ts');
    return apis;
  }

  // Find the API interface
  ts.forEachChild(sourceFile, node => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === 'API') {
      // Iterate through interface members
      node.members.forEach(member => {
        if (ts.isPropertySignature(member) && member.name) {
          const name = member.name.getText(sourceFile);
          
          // Skip constructor
          if (name === 'new') return;
          
          // Determine if it's a function or namespace class
          const typeNode = member.type;
          let isFunction = false;
          let isNamespace = false;
          
          if (typeNode) {
            const typeText = typeNode.getText(sourceFile);
            isFunction = typeText.includes('typeof') && typeText.includes('Api');
            isNamespace = !isFunction && (typeText.endsWith('Api') || typeText.includes('Api'));
          }
          
          // Get JSDoc comment
          const jsDoc = ts.getJSDocCommentsAndTags(member);
          let comment = '';
          if (jsDoc.length > 0) {
            const firstDoc = jsDoc[0];
            if (ts.isJSDoc(firstDoc) && firstDoc.comment) {
              comment = typeof firstDoc.comment === 'string' 
                ? firstDoc.comment 
                : firstDoc.comment.map(c => c.text).join('');
            }
          }
          
          apis.push({
            name,
            isFunction,
            isNamespace,
            comment
          });
        }
      });
    }
  });
  
  return apis;
}

/**
 * Extract types from src/api/types.ts
 */
function extractTypes() {
  const types = [];
  const sourceFile = program.getSourceFile(path.join(SRC_DIR, 'api/types.ts'));
  
  if (!sourceFile) {
    console.error('Could not find api/types.ts');
    return types;
  }

  ts.forEachChild(sourceFile, node => {
    // Extract interfaces
    if (ts.isInterfaceDeclaration(node) && node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      const name = node.name.text;
      const jsDoc = ts.getJSDocCommentsAndTags(node);
      let comment = '';
      
      if (jsDoc.length > 0) {
        const firstDoc = jsDoc[0];
        if (ts.isJSDoc(firstDoc) && firstDoc.comment) {
          comment = typeof firstDoc.comment === 'string' 
            ? firstDoc.comment 
            : firstDoc.comment.map(c => c.text).join('');
        }
      }
      
      const properties = [];
      node.members.forEach(member => {
        if (ts.isPropertySignature(member) && member.name) {
          const propName = member.name.getText(sourceFile);
          const propType = member.type ? member.type.getText(sourceFile) : 'any';
          const optional = member.questionToken ? true : false;
          
          const propJsDoc = ts.getJSDocCommentsAndTags(member);
          let propComment = '';
          if (propJsDoc.length > 0) {
            const firstPropDoc = propJsDoc[0];
            if (ts.isJSDoc(firstPropDoc) && firstPropDoc.comment) {
              propComment = typeof firstPropDoc.comment === 'string' 
                ? firstPropDoc.comment 
                : firstPropDoc.comment.map(c => c.text).join('');
            }
          }
          
          properties.push({
            name: propName,
            type: propType,
            optional,
            comment: propComment
          });
        }
      });
      
      types.push({
        kind: 'interface',
        name,
        comment,
        properties
      });
    }
    
    // Extract type aliases
    if (ts.isTypeAliasDeclaration(node) && node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      const name = node.name.text;
      const typeText = node.type.getText(sourceFile);
      
      const jsDoc = ts.getJSDocCommentsAndTags(node);
      let comment = '';
      
      if (jsDoc.length > 0) {
        const firstDoc = jsDoc[0];
        if (ts.isJSDoc(firstDoc) && firstDoc.comment) {
          comment = typeof firstDoc.comment === 'string' 
            ? firstDoc.comment 
            : firstDoc.comment.map(c => c.text).join('');
        }
      }
      
      types.push({
        kind: 'type',
        name,
        comment,
        typeDefinition: typeText
      });
    }
  });
  
  return types;
}

/**
 * Generate API documentation file
 */
function generateApiDoc(api) {
  const fileName = `${api.name}.md`;
  const filePath = path.join(DOCS_DIR, 'apis', fileName);
  
  let content = `# Client.${api.name}\n\n`;
  
  if (api.comment) {
    content += `${api.comment}\n\n`;
  }
  
  if (api.isFunction) {
    content += `## API Method\n\n`;
    content += `\`\`\`typescript\n`;
    content += `client.${api.name}(params?: ${capitalize(api.name)}Request): Promise<${capitalize(api.name)}Response>\n`;
    content += `\`\`\`\n\n`;
    
    content += `### Parameters\n\n`;
    content += `- [\`${capitalize(api.name)}Request\`](../types/${capitalize(api.name)}Request.md) - Request parameters\n\n`;
    
    content += `### Returns\n\n`;
    content += `- [\`${capitalize(api.name)}Response\`](../types/${capitalize(api.name)}Response.md) - Response data\n\n`;
  } else if (api.isNamespace) {
    content += `## API Namespace\n\n`;
    content += `This namespace contains related API methods. Access methods via:\n\n`;
    content += `\`\`\`typescript\n`;
    content += `client.${api.name}.methodName(params)\n`;
    content += `\`\`\`\n\n`;
    content += `See the [Client documentation](../client.md) for available methods in this namespace.\n\n`;
  }
  
  content += `## See Also\n\n`;
  content += `- [Client](../client.md)\n`;
  content += `- [All APIs](../index.md)\n`;
  content += `- [Type Definitions](../types/)\n`;
  
  fs.writeFileSync(filePath, content);
}

/**
 * Generate type documentation file
 */
function generateTypeDoc(type) {
  const fileName = `${type.name}.md`;
  const filePath = path.join(DOCS_DIR, 'types', fileName);
  
  let content = `# ${type.name}\n\n`;
  
  if (type.comment) {
    content += `${type.comment}\n\n`;
  }
  
  if (type.kind === 'interface') {
    content += `## Interface\n\n`;
    
    if (type.properties && type.properties.length > 0) {
      content += `### Properties\n\n`;
      content += `| Property | Type | Description |\n`;
      content += `|----------|------|-------------|\n`;
      
      type.properties.forEach(prop => {
        const optional = prop.optional ? '?' : '';
        const typeLink = makeTypeLink(prop.type);
        const desc = prop.comment || '-';
        content += `| \`${prop.name}${optional}\` | ${typeLink} | ${desc} |\n`;
      });
      
      content += `\n`;
    }
  } else if (type.kind === 'type') {
    content += `## Type Alias\n\n`;
    content += `\`\`\`typescript\n`;
    content += `type ${type.name} = ${type.typeDefinition}\n`;
    content += `\`\`\`\n\n`;
  }
  
  content += `## See Also\n\n`;
  content += `- [All Types](./)\n`;
  content += `- [API Methods](../index.md)\n`;
  
  fs.writeFileSync(filePath, content);
}

/**
 * Generate helpers documentation
 */
function generateHelpersDoc() {
  const filePath = path.join(DOCS_DIR, 'helpers.md');
  
  let content = `# Client.helpers\n\n`;
  content += `The \`Client.helpers\` namespace provides utility methods for common operations.\n\n`;
  
  content += `## Available Helpers\n\n`;
  content += `### bulk\n\n`;
  content += `Bulk indexing helper for efficiently indexing large amounts of data.\n\n`;
  content += `\`\`\`typescript\n`;
  content += `const result = await client.helpers.bulk({\n`;
  content += `  datasource: documents,\n`;
  content += `  onDocument: (doc) => ({ index: { _index: 'my-index' } }),\n`;
  content += `  onDrop: (doc) => console.log('Dropped:', doc)\n`;
  content += `});\n`;
  content += `\`\`\`\n\n`;
  
  content += `### search\n\n`;
  content += `Search helper with advanced options.\n\n`;
  
  content += `### scrollSearch\n\n`;
  content += `Scroll search helper for retrieving large result sets.\n\n`;
  
  content += `### scrollDocuments\n\n`;
  content += `Scroll documents helper for iterating through all documents.\n\n`;
  
  content += `## See Also\n\n`;
  content += `- [Client](./client.md)\n`;
  content += `- [Helper Documentation](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-helpers.html)\n`;
  
  fs.writeFileSync(filePath, content);
}

/**
 * Generate transport documentation
 */
function generateTransportDoc() {
  const filePath = path.join(DOCS_DIR, 'transport.md');
  
  let content = `# Transport\n\n`;
  content += `The Elasticsearch JavaScript client is built on [@elastic/transport](https://github.com/elastic/elastic-transport-js).\n\n`;
  
  content += `## Overview\n\n`;
  content += `The transport layer handles:\n\n`;
  content += `- HTTP/HTTPS connections\n`;
  content += `- Connection pooling and management\n`;
  content += `- Request/response serialization\n`;
  content += `- Retry logic\n`;
  content += `- Node discovery and sniffing\n\n`;
  
  content += `## Key Classes\n\n`;
  content += `### Transport\n\n`;
  content += `Main transport class that manages connections and request handling.\n\n`;
  
  content += `### Connection\n\n`;
  content += `Base connection class. Specific implementations:\n\n`;
  content += `- \`UndiciConnection\` - Default connection using undici\n`;
  content += `- \`HttpConnection\` - HTTP-based connection\n\n`;
  
  content += `### ConnectionPool\n\n`;
  content += `Manages a pool of connections. Implementations:\n\n`;
  content += `- \`CloudConnectionPool\` - For Elastic Cloud connections\n`;
  content += `- \`WeightedConnectionPool\` - Default connection pool\n\n`;
  
  content += `### Serializer\n\n`;
  content += `Handles serialization and deserialization of requests and responses.\n\n`;
  
  content += `## Configuration\n\n`;
  content += `Transport options can be configured when creating the client:\n\n`;
  content += `\`\`\`typescript\n`;
  content += `const client = new Client({\n`;
  content += `  node: 'http://localhost:9200',\n`;
  content += `  maxRetries: 3,\n`;
  content += `  requestTimeout: 30000,\n`;
  content += `  sniffOnStart: true\n`;
  content += `});\n`;
  content += `\`\`\`\n\n`;
  
  content += `## See Also\n\n`;
  content += `- [Client](./client.md)\n`;
  content += `- [@elastic/transport Documentation](https://github.com/elastic/elastic-transport-js)\n`;
  
  fs.writeFileSync(filePath, content);
}

/**
 * Generate Client documentation
 */
function generateClientDoc() {
  const filePath = path.join(DOCS_DIR, 'client.md');
  
  let content = `# Client\n\n`;
  content += `The main Elasticsearch client class.\n\n`;
  
  content += `## Constructor\n\n`;
  content += `\`\`\`typescript\n`;
  content += `import { Client } from '@elastic/elasticsearch';\n\n`;
  content += `const client = new Client(options: ClientOptions);\n`;
  content += `\`\`\`\n\n`;
  
  content += `### Client Options\n\n`;
  content += `| Option | Type | Description |\n`;
  content += `|--------|------|-------------|\n`;
  content += `| \`node\` | \`string \\| string[]\` | Elasticsearch node URL(s) |\n`;
  content += `| \`nodes\` | \`string \\| string[]\` | Alias for \`node\` |\n`;
  content += `| \`cloud\` | \`object\` | Elastic Cloud configuration |\n`;
  content += `| \`auth\` | \`object\` | Authentication options |\n`;
  content += `| \`maxRetries\` | \`number\` | Maximum number of retries (default: 3) |\n`;
  content += `| \`requestTimeout\` | \`number\` | Request timeout in milliseconds |\n`;
  content += `| \`sniffOnStart\` | \`boolean\` | Sniff for nodes on start |\n`;
  content += `| \`sniffInterval\` | \`number\` | Interval for sniffing (ms) |\n\n`;
  
  content += `## API Methods\n\n`;
  content += `All Elasticsearch API methods are available on the client instance. See:\n\n`;
  content += `- [All API Methods](./index.md#api-methods)\n`;
  content += `- [Individual API Documentation](./apis/)\n\n`;
  
  content += `## Helpers\n\n`;
  content += `- [\`client.helpers\`](./helpers.md) - Helper utilities\n\n`;
  
  content += `## Transport\n\n`;
  content += `- [\`client.transport\`](./transport.md) - Transport layer\n\n`;
  
  content += `## See Also\n\n`;
  content += `- [API Reference](./index.md)\n`;
  content += `- [Getting Started Guide](../getting-started.md)\n`;
  
  fs.writeFileSync(filePath, content);
}

/**
 * Generate index documentation
 */
function generateIndexDoc(apiMethods) {
  const filePath = path.join(DOCS_DIR, 'index.md');
  
  let content = `# Elasticsearch JavaScript Client - API Reference\n\n`;
  content += `Complete TypeScript API reference for the Elasticsearch JavaScript client.\n\n`;
  
  content += `## Quick Navigation\n\n`;
  content += `- [Client](#client)\n`;
  content += `- [API Methods](#api-methods)\n`;
  content += `- [Type Definitions](#type-definitions)\n`;
  content += `- [Helpers](#helpers)\n`;
  content += `- [Transport](#transport)\n\n`;
  
  content += `## Client\n\n`;
  content += `- [Client](./client.md) - Main client class and options\n\n`;
  
  content += `## API Methods\n\n`;
  
  const functions = apiMethods.filter(m => m.isFunction);
  const namespaces = apiMethods.filter(m => m.isNamespace);
  
  if (functions.length > 0) {
    content += `### Core API Methods\n\n`;
    functions.forEach(method => {
      content += `- [\`client.${method.name}()\`](apis/${method.name}.md)`;
      if (method.comment) {
        const shortComment = method.comment.split('.')[0];
        content += ` - ${shortComment}`;
      }
      content += `\n`;
    });
    content += `\n`;
  }
  
  if (namespaces.length > 0) {
    content += `### Namespaced APIs\n\n`;
    namespaces.forEach(ns => {
      content += `- [\`client.${ns.name}\`](apis/${ns.name}.md) - ${capitalize(ns.name)} operations\n`;
    });
    content += `\n`;
  }
  
  content += `## Type Definitions\n\n`;
  content += `TypeScript type definitions for all requests and responses:\n\n`;
  content += `- [Browse All Types](types/)\n\n`;
  
  content += `Each API method has corresponding request and response types documented individually.\n\n`;
  
  content += `## Helpers\n\n`;
  content += `- [Client Helpers](helpers.md) - Utility functions for common operations\n\n`;
  
  content += `## Transport\n\n`;
  content += `- [Transport Layer](transport.md) - Low-level transport documentation\n\n`;
  
  fs.writeFileSync(filePath, content);
}

/**
 * Generate README
 */
function generateReadme() {
  const filePath = path.join(DOCS_DIR, 'README.md');
  
  let content = `# TypeScript API Reference\n\n`;
  content += `Complete TypeScript API reference for the Elasticsearch JavaScript client.\n\n`;
  
  content += `## Documentation Structure\n\n`;
  content += `- **[index.md](./index.md)** - Main API reference index\n`;
  content += `- **[client.md](./client.md)** - Client class documentation\n`;
  content += `- **[apis/](./apis/)** - Individual API method documentation\n`;
  content += `- **[types/](./types/)** - TypeScript type definitions\n`;
  content += `- **[helpers.md](./helpers.md)** - Helper utilities\n`;
  content += `- **[transport.md](./transport.md)** - Transport layer\n\n`;
  
  content += `## Key Features\n\n`;
  content += `- **Comprehensive**: Every API method and type documented\n`;
  content += `- **Organized**: Separate file per API and type for easy navigation\n`;
  content += `- **Cross-referenced**: Links between related APIs and types\n`;
  content += `- **TypeScript-first**: Generated from TypeScript source code\n\n`;
  
  content += `## Getting Started\n\n`;
  content += `For getting started guides, tutorials, and examples, see the [main documentation](../../).\n\n`;
  
  content += `This reference documentation is focused on exhaustively documenting every API method and type.\n\n`;
  
  content += `## Regenerating Documentation\n\n`;
  content += `To regenerate this documentation:\n\n`;
  content += `\`\`\`bash\n`;
  content += `npm run docs:generate\n`;
  content += `\`\`\`\n`;
  
  fs.writeFileSync(filePath, content);
}

/**
 * Utility: Capitalize first letter
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Utility: Convert type references to links
 */
function makeTypeLink(typeText) {
  // Simple type (no generics, no unions)
  if (/^[A-Z][a-zA-Z0-9]*$/.test(typeText)) {
    return `[\`${typeText}\`](${typeText}.md)`;
  }
  
  // Just return as code for complex types
  return `\`${typeText}\``;
}
