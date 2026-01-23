#!/usr/bin/env node

/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Comprehensive TypeScript Documentation Generator
 * 
 * Generates exhaustive API reference documentation by parsing TypeScript AST
 */

const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs/reference/typescript-api');
const SRC_DIR = path.join(__dirname, '../src');

console.log('🔨 Comprehensive TypeScript Documentation Generator');
console.log('===================================================\n');

// Clean and setup directories
console.log('📁 Setting up documentation directories...');
if (fs.existsSync(DOCS_DIR)) {
  fs.rmSync(DOCS_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DOCS_DIR, { recursive: true });
fs.mkdirSync(path.join(DOCS_DIR, 'apis'), { recursive: true });
fs.mkdirSync(path.join(DOCS_DIR, 'types'), { recursive: true });

console.log('📚 Parsing TypeScript source files...\n');

// Create program
const program = ts.createProgram({
  rootNames: [
    path.join(SRC_DIR, 'client.ts'),
    path.join(SRC_DIR, 'api/index.ts'),
    path.join(SRC_DIR, 'api/types.ts'),
    path.join(SRC_DIR, 'helpers.ts'),
    path.join(__dirname, '../node_modules/@elastic/transport/index.d.ts')
  ],
  options: {
    target: ts.ScriptTarget.ES2019,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    skipLibCheck: true
  }
});

const checker = program.getTypeChecker();
const allTypes = new Map();

// Helper to get JSDoc comment
function getJSDocComment(node) {
  const docs = ts.getJSDocCommentsAndTags(node);
  if (docs.length === 0) return '';
  
  const parts = [];
  docs.forEach(doc => {
    if (ts.isJSDoc(doc) && doc.comment) {
      if (typeof doc.comment === 'string') {
        parts.push(doc.comment);
      } else {
        parts.push(doc.comment.map(c => c.text || '').join(''));
      }
    }
  });
  return parts.join('\n');
}

// Helper to get parameter docs
function getParamDocs(node) {
  const paramDocs = {};
  const docs = ts.getJSDocCommentsAndTags(node);
  
  docs.forEach(doc => {
    if (ts.isJSDoc(doc) && doc.tags) {
      doc.tags.forEach(tag => {
        if (tag.tagName.text === 'param' && tag.name) {
          const paramName = tag.name.getText();
          const comment = tag.comment;
          if (comment) {
            paramDocs[paramName] = typeof comment === 'string' 
              ? comment 
              : comment.map(c => c.text || '').join('');
          }
        }
      });
    }
  });
  return paramDocs;
}

// Extract APIs
const apis = [];
const apiDir = path.join(SRC_DIR, 'api/api');

if (fs.existsSync(apiDir)) {
  const files = fs.readdirSync(apiDir).filter(f => f.endsWith('.ts'));
  
  files.forEach(file => {
    const filePath = path.join(apiDir, file);
    const sourceFile = program.getSourceFile(filePath);
    if (!sourceFile) return;
    
    const apiName = file.replace('.ts', '');
    
    ts.forEachChild(sourceFile, node => {
      if (ts.isClassDeclaration(node) && node.name) {
        const className = node.name.text;
        const methods = [];
        
        node.members.forEach(member => {
          if (ts.isMethodDeclaration(member) && member.name) {
            const methodName = member.name.getText(sourceFile);
            if (methodName === 'constructor') return;
            
            const comment = getJSDocComment(member);
            const paramDocs = getParamDocs(member);
            const params = [];
            
            member.parameters.forEach(param => {
              if (!param.name) return;
              const paramName = param.name.getText(sourceFile);
              const paramType = param.type ? param.type.getText(sourceFile) : 'any';
              const optional = param.questionToken ? true : false;
              
              params.push({
                name: paramName,
                type: paramType,
                optional,
                description: paramDocs[paramName] || ''
              });
            });
            
            const returnType = member.type ? member.type.getText(sourceFile) : 'any';
            
            methods.push({
              name: methodName,
              comment,
              params,
              returnType
            });
          }
        });
        
        apis.push({
          name: apiName,
          isNamespace: true,
          className,
          methods,
          comment: getJSDocComment(node)
        });
      }
      
      if (ts.isFunctionDeclaration(node) && node.name) {
        const comment = getJSDocComment(node);
        const paramDocs = getParamDocs(node);
        const params = [];
        
        node.parameters.forEach(param => {
          if (!param.name) return;
          const paramName = param.name.getText(sourceFile);
          const paramType = param.type ? param.type.getText(sourceFile) : 'any';
          const optional = param.questionToken ? true : false;
          
          params.push({
            name: paramName,
            type: paramType,
            optional,
            description: paramDocs[paramName] || ''
          });
        });
        
        const returnType = node.type ? node.type.getText(sourceFile) : 'any';
        
        apis.push({
          name: apiName,
          isNamespace: false,
          comment,
          params,
          returnType
        });
      }
    });
  });
}

console.log(`✓ Found ${apis.length} API namespaces/methods`);

// Extract types
const types = [];
const sourceFile = program.getSourceFile(path.join(SRC_DIR, 'api/types.ts'));

if (sourceFile) {
  ts.forEachChild(sourceFile, node => {
    if (ts.isInterfaceDeclaration(node) && 
        node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      const name = node.name.text;
      const comment = getJSDocComment(node);
      const properties = [];
      const extendsTypes = [];
      
      if (node.heritageClauses) {
        node.heritageClauses.forEach(clause => {
          clause.types.forEach(type => {
            extendsTypes.push(type.expression.getText(sourceFile));
          });
        });
      }
      
      node.members.forEach(member => {
        if (ts.isPropertySignature(member) && member.name) {
          const propName = member.name.getText(sourceFile);
          const propType = member.type ? member.type.getText(sourceFile) : 'any';
          const optional = member.questionToken ? true : false;
          const propComment = getJSDocComment(member);
          
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
        properties,
        extends: extendsTypes
      });
      
      allTypes.set(name, { kind: 'interface' });
    }
    
    if (ts.isTypeAliasDeclaration(node) && 
        node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      const name = node.name.text;
      const comment = getJSDocComment(node);
      const typeText = node.type.getText(sourceFile);
      
      types.push({
        kind: 'type',
        name,
        comment,
        definition: typeText
      });
      
      allTypes.set(name, { kind: 'type' });
    }
    
    if (ts.isEnumDeclaration(node) && 
        node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      const name = node.name.text;
      const comment = getJSDocComment(node);
      const members = [];
      
      node.members.forEach(member => {
        if (member.name) {
          const memberName = member.name.getText(sourceFile);
          const memberValue = member.initializer ? member.initializer.getText(sourceFile) : undefined;
          members.push({ name: memberName, value: memberValue });
        }
      });
      
      types.push({
        kind: 'enum',
        name,
        comment,
        members
      });
      
      allTypes.set(name, { kind: 'enum' });
    }
  });
}

console.log(`✓ Found ${types.length} types`);

// Extract helpers
const helpers = { functions: [] };
const helpersFile = program.getSourceFile(path.join(SRC_DIR, 'helpers.ts'));

if (helpersFile) {
  ts.forEachChild(helpersFile, node => {
    if (ts.isClassDeclaration(node) && node.name && node.name.text === 'Helpers') {
      node.members.forEach(member => {
        if (ts.isMethodDeclaration(member) && member.name) {
          const methodName = member.name.getText(helpersFile);
          if (methodName === 'constructor') return;
          
          const comment = getJSDocComment(member);
          const paramDocs = getParamDocs(member);
          const params = [];
          
          member.parameters.forEach(param => {
            if (!param.name) return;
            const paramName = param.name.getText(helpersFile);
            const paramType = param.type ? param.type.getText(helpersFile) : 'any';
            const optional = param.questionToken ? true : false;
            
            params.push({
              name: paramName,
              type: paramType,
              optional,
              description: paramDocs[paramName] || ''
            });
          });
          
          const returnType = member.type ? member.type.getText(helpersFile) : 'any';
          
          helpers.functions.push({
            name: methodName,
            comment,
            params,
            returnType
          });
        }
      });
    }
  });
}

console.log(`✓ Found ${helpers.functions.length} helper functions`);

// Extract Client info
const clientInfo = { options: [], comment: '' };
const clientFile = program.getSourceFile(path.join(SRC_DIR, 'client.ts'));

if (clientFile) {
  ts.forEachChild(clientFile, node => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === 'ClientOptions') {
      clientInfo.comment = getJSDocComment(node);
      
      node.members.forEach(member => {
        if (ts.isPropertySignature(member) && member.name) {
          const propName = member.name.getText(clientFile);
          const propType = member.type ? member.type.getText(clientFile) : 'any';
          const optional = member.questionToken ? true : false;
          const propComment = getJSDocComment(member);
          
          clientInfo.options.push({
            name: propName,
            type: propType,
            optional,
            comment: propComment
          });
        }
      });
    }
  });
}

console.log(`✓ Extracted Client documentation`);

// Extract transport info
const transportInfo = { classes: [], interfaces: [] };
const transportFile = path.join(__dirname, '../node_modules/@elastic/transport/index.d.ts');
const transportSource = program.getSourceFile(transportFile);

if (transportSource) {
  ts.forEachChild(transportSource, node => {
    if (ts.isClassDeclaration(node) && node.name && 
        node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      const className = node.name.text;
      const comment = getJSDocComment(node);
      const methods = [];
      const properties = [];
      
      node.members.forEach(member => {
        if (ts.isMethodDeclaration(member) && member.name) {
          const methodName = member.name.getText(transportSource);
          const methodComment = getJSDocComment(member);
          methods.push({ name: methodName, comment: methodComment });
        }
        
        if (ts.isPropertyDeclaration(member) && member.name) {
          const propName = member.name.getText(transportSource);
          const propType = member.type ? member.type.getText(transportSource) : 'any';
          const propComment = getJSDocComment(member);
          properties.push({ name: propName, type: propType, comment: propComment });
        }
      });
      
      transportInfo.classes.push({
        name: className,
        comment,
        methods,
        properties
      });
    }
    
    if (ts.isInterfaceDeclaration(node) && node.name && 
        node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      const name = node.name.text;
      const comment = getJSDocComment(node);
      const properties = [];
      
      node.members.forEach(member => {
        if (ts.isPropertySignature(member) && member.name) {
          const propName = member.name.getText(transportSource);
          const propType = member.type ? member.type.getText(transportSource) : 'any';
          const propComment = getJSDocComment(member);
          properties.push({ name: propName, type: propType, comment: propComment });
        }
      });
      
      transportInfo.interfaces.push({
        name,
        comment,
        properties
      });
    }
  });
}

console.log(`✓ Extracted Transport documentation`);

// Helper to check if type is primitive
function isPrimitive(type) {
  const primitives = ['string', 'number', 'boolean', 'any', 'void', 'null', 'undefined', 
                      'unknown', 'never', 'object', 'symbol', 'bigint'];
  return primitives.includes(type.toLowerCase());
}

// Helper to convert type to link
function typeToLink(typeStr) {
  if (typeStr.endsWith('[]')) {
    const baseType = typeStr.slice(0, -2);
    if (!isPrimitive(baseType) && allTypes.has(baseType)) {
      return `[\`${baseType}\`](${baseType}.md)[]`;
    }
  }
  
  if (!isPrimitive(typeStr) && allTypes.has(typeStr)) {
    return `[\`${typeStr}\`](${typeStr}.md)`;
  }
  
  const genericMatch = typeStr.match(/^(\w+)</);
  if (genericMatch && !isPrimitive(genericMatch[1]) && allTypes.has(genericMatch[1])) {
    return typeStr.replace(genericMatch[1], `[\`${genericMatch[1]}\`](${genericMatch[1]}.md)`);
  }
  
  return `\`${typeStr}\``;
}

// Generate API docs
console.log('\n📝 Generating documentation files...\n');

apis.forEach(api => {
  if (api.isNamespace && api.methods) {
    api.methods.forEach(method => {
      const fileName = `${api.name}.${method.name}.md`;
      const filePath = path.join(DOCS_DIR, 'apis', fileName);
      
      let content = `# Client.${api.name}.${method.name}\n\n`;
      
      if (method.comment) {
        content += `${method.comment}\n\n`;
      }
      
      content += `## Method Signature\n\n`;
      content += `\`\`\`typescript\n`;
      content += `client.${api.name}.${method.name}(`;
      content += method.params.map(p => `${p.name}${p.optional ? '?' : ''}: ${p.type}`).join(', ');
      content += `): ${method.returnType}\n`;
      content += `\`\`\`\n\n`;
      
      if (method.params.length > 0) {
        content += `### Parameters\n\n`;
        content += `| Parameter | Type | Description |\n`;
        content += `|-----------|------|-------------|\n`;
        method.params.forEach(param => {
          const typeLink = typeToLink(param.type);
          content += `| \`${param.name}${param.optional ? '?' : ''}\` | ${typeLink} | ${param.description || '-'} |\n`;
        });
        content += `\n`;
      }
      
      content += `### Returns\n\n`;
      content += `${typeToLink(method.returnType)}\n\n`;
      
      content += `## See Also\n\n`;
      content += `- [Client](../client.md)\n`;
      content += `- [All APIs](../index.md)\n`;
      
      fs.writeFileSync(filePath, content);
    });
  } else {
    const fileName = `${api.name}.md`;
    const filePath = path.join(DOCS_DIR, 'apis', fileName);
    
    let content = `# Client.${api.name}\n\n`;
    
    if (api.comment) {
      content += `${api.comment}\n\n`;
    }
    
    content += `## Method Signature\n\n`;
    content += `\`\`\`typescript\n`;
    content += `client.${api.name}(`;
    if (api.params) {
      content += api.params.map(p => `${p.name}${p.optional ? '?' : ''}: ${p.type}`).join(', ');
    }
    content += `): ${api.returnType || 'Promise<any>'}\n`;
    content += `\`\`\`\n\n`;
    
    if (api.params && api.params.length > 0) {
      content += `### Parameters\n\n`;
      content += `| Parameter | Type | Description |\n`;
      content += `|-----------|------|-------------|\n`;
      api.params.forEach(param => {
        const typeLink = typeToLink(param.type);
        content += `| \`${param.name}${param.optional ? '?' : ''}\` | ${typeLink} | ${param.description || '-'} |\n`;
      });
      content += `\n`;
    }
    
    content += `### Returns\n\n`;
    content += `${typeToLink(api.returnType || 'any')}\n\n`;
    
    content += `## See Also\n\n`;
    content += `- [Client](../client.md)\n`;
    content += `- [All APIs](../index.md)\n`;
    
    fs.writeFileSync(filePath, content);
  }
});

console.log(`✓ Generated API documentation`);

// Generate type docs
types.forEach(type => {
  const fileName = `${type.name}.md`;
  const filePath = path.join(DOCS_DIR, 'types', fileName);
  
  let content = `# ${type.name}\n\n`;
  
  if (type.comment) {
    content += `${type.comment}\n\n`;
  }
  
  if (type.kind === 'interface') {
    content += `## Interface\n\n`;
    
    if (type.extends && type.extends.length > 0) {
      content += `### Extends\n\n`;
      type.extends.forEach(ext => {
        content += `- ${typeToLink(ext)}\n`;
      });
      content += `\n`;
    }
    
    if (type.properties && type.properties.length > 0) {
      content += `### Properties\n\n`;
      content += `| Property | Type | Description |\n`;
      content += `|----------|------|-------------|\n`;
      
      type.properties.forEach(prop => {
        const typeLink = typeToLink(prop.type);
        const desc = prop.comment || '-';
        content += `| \`${prop.name}${prop.optional ? '?' : ''}\` | ${typeLink} | ${desc} |\n`;
      });
      content += `\n`;
    }
  } else if (type.kind === 'type') {
    content += `## Type Alias\n\n`;
    content += `\`\`\`typescript\n`;
    content += `type ${type.name} = ${type.definition}\n`;
    content += `\`\`\`\n\n`;
  } else if (type.kind === 'enum') {
    content += `## Enum\n\n`;
    if (type.members && type.members.length > 0) {
      content += `### Members\n\n`;
      content += `| Member | Value |\n`;
      content += `|--------|-------|\n`;
      type.members.forEach(member => {
        content += `| \`${member.name}\` | ${member.value || '-'} |\n`;
      });
      content += `\n`;
    }
  }
  
  content += `## See Also\n\n`;
  content += `- [All Types](./)\n`;
  content += `- [API Methods](../index.md)\n`;
  
  fs.writeFileSync(filePath, content);
});

console.log(`✓ Generated type documentation`);

// Generate helpers doc
const helpersPath = path.join(DOCS_DIR, 'helpers.md');
let helpersContent = `# Client.helpers\n\n`;
helpersContent += `The \`Client.helpers\` namespace provides utility methods for common operations.\n\n`;

if (helpers.functions.length > 0) {
  helpers.functions.forEach(func => {
    helpersContent += `## ${func.name}\n\n`;
    
    if (func.comment) {
      helpersContent += `${func.comment}\n\n`;
    }
    
    helpersContent += `### Signature\n\n`;
    helpersContent += `\`\`\`typescript\n`;
    helpersContent += `client.helpers.${func.name}(`;
    helpersContent += func.params.map(p => `${p.name}${p.optional ? '?' : ''}: ${p.type}`).join(', ');
    helpersContent += `): ${func.returnType}\n`;
    helpersContent += `\`\`\`\n\n`;
    
    if (func.params.length > 0) {
      helpersContent += `### Parameters\n\n`;
      helpersContent += `| Parameter | Type | Description |\n`;
      helpersContent += `|-----------|------|-------------|\n`;
      func.params.forEach(param => {
        helpersContent += `| \`${param.name}${param.optional ? '?' : ''}\` | \`${param.type}\` | ${param.description || '-'} |\n`;
      });
      helpersContent += `\n`;
    }
  });
}

helpersContent += `## See Also\n\n`;
helpersContent += `- [Client](./client.md)\n`;

fs.writeFileSync(helpersPath, helpersContent);
console.log(`✓ Generated helpers documentation`);

// Generate Client doc
const clientPath = path.join(DOCS_DIR, 'client.md');
let clientContent = `# Client\n\n`;
clientContent += `The main Elasticsearch client class.\n\n`;

clientContent += `## Constructor\n\n`;
clientContent += `\`\`\`typescript\n`;
clientContent += `import { Client } from '@elastic/elasticsearch';\n\n`;
clientContent += `const client = new Client(options: ClientOptions);\n`;
clientContent += `\`\`\`\n\n`;

if (clientInfo.options.length > 0) {
  clientContent += `### ClientOptions\n\n`;
  clientContent += `| Option | Type | Description |\n`;
  clientContent += `|--------|------|-------------|\n`;
  
  clientInfo.options.forEach(opt => {
    const typeLink = opt.name === 'Transport' ? '[`Transport`](./transport.md)' : typeToLink(opt.type);
    clientContent += `| \`${opt.name}${opt.optional ? '?' : ''}\` | ${typeLink} | ${opt.comment || '-'} |\n`;
  });
  clientContent += `\n`;
}

clientContent += `## See Also\n\n`;
clientContent += `- [API Methods](./index.md)\n`;
clientContent += `- [Helpers](./helpers.md)\n`;

fs.writeFileSync(clientPath, clientContent);
console.log(`✓ Generated Client documentation`);

// Generate Transport doc
const transportPath = path.join(DOCS_DIR, 'transport.md');
let transportContent = `# Transport Layer\n\n`;
transportContent += `The Elasticsearch JavaScript client is built on [@elastic/transport](https://github.com/elastic/elastic-transport-js).\n\n`;

if (transportInfo.classes.length > 0) {
  transportContent += `## Classes\n\n`;
  
  transportInfo.classes.forEach(cls => {
    transportContent += `### ${cls.name}\n\n`;
    
    if (cls.comment) {
      transportContent += `${cls.comment}\n\n`;
    }
    
    if (cls.properties.length > 0) {
      transportContent += `#### Properties\n\n`;
      transportContent += `| Property | Type | Description |\n`;
      transportContent += `|----------|------|-------------|\n`;
      cls.properties.forEach(prop => {
        transportContent += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.comment || '-'} |\n`;
      });
      transportContent += `\n`;
    }
    
    if (cls.methods.length > 0) {
      transportContent += `#### Methods\n\n`;
      cls.methods.forEach(method => {
        transportContent += `- \`${method.name}()\``;
        if (method.comment) {
          transportContent += ` - ${method.comment}`;
        }
        transportContent += `\n`;
      });
      transportContent += `\n`;
    }
  });
}

if (transportInfo.interfaces.length > 0) {
  transportContent += `## Interfaces\n\n`;
  
  transportInfo.interfaces.forEach(iface => {
    transportContent += `### ${iface.name}\n\n`;
    
    if (iface.comment) {
      transportContent += `${iface.comment}\n\n`;
    }
    
    if (iface.properties.length > 0) {
      transportContent += `#### Properties\n\n`;
      transportContent += `| Property | Type | Description |\n`;
      transportContent += `|----------|------|-------------|\n`;
      iface.properties.forEach(prop => {
        transportContent += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.comment || '-'} |\n`;
      });
      transportContent += `\n`;
    }
  });
}

transportContent += `## See Also\n\n`;
transportContent += `- [Client](./client.md)\n`;
transportContent += `- [@elastic/transport Documentation](https://github.com/elastic/elastic-transport-js)\n`;

fs.writeFileSync(transportPath, transportContent);
console.log(`✓ Generated Transport documentation`);

// Generate index doc
const indexPath = path.join(DOCS_DIR, 'index.md');
let indexContent = `# Elasticsearch JavaScript Client - API Reference\n\n`;
indexContent += `Complete TypeScript API reference for the Elasticsearch JavaScript client.\n\n`;

indexContent += `## Navigation\n\n`;
indexContent += `- [Client](./client.md)\n`;
indexContent += `- [API Methods](#api-methods)\n`;
indexContent += `- [Type Definitions](./types/)\n`;
indexContent += `- [Helpers](./helpers.md)\n`;
indexContent += `- [Transport](./transport.md)\n\n`;

indexContent += `## API Methods\n\n`;

const allMethods = [];
apis.forEach(api => {
  if (api.isNamespace && api.methods) {
    api.methods.forEach(method => {
      allMethods.push({
        name: `${api.name}.${method.name}`,
        file: `${api.name}.${method.name}.md`
      });
    });
  } else {
    allMethods.push({
      name: api.name,
      file: `${api.name}.md`
    });
  }
});

allMethods.sort((a, b) => a.name.localeCompare(b.name));

allMethods.forEach(method => {
  indexContent += `- [\`client.${method.name}()\`](apis/${method.file})\n`;
});

fs.writeFileSync(indexPath, indexContent);
console.log(`✓ Generated index documentation`);

// Generate README
const readmePath = path.join(DOCS_DIR, 'README.md');
let readmeContent = `# TypeScript API Reference\n\n`;
readmeContent += `Complete TypeScript API reference for the Elasticsearch JavaScript client.\n\n`;

readmeContent += `## Documentation\n\n`;
readmeContent += `- **[index.md](./index.md)** - Main API reference index\n`;
readmeContent += `- **[client.md](./client.md)** - Client class documentation\n`;
readmeContent += `- **[apis/](./apis/)** - Individual API method documentation\n`;
readmeContent += `- **[types/](./types/)** - TypeScript type definitions\n`;
readmeContent += `- **[helpers.md](./helpers.md)** - Helper utilities\n`;
readmeContent += `- **[transport.md](./transport.md)** - Transport layer\n`;

fs.writeFileSync(readmePath, readmeContent);
console.log(`✓ Generated README`);

console.log('\n✨ Documentation generation complete!\n');
console.log(`📍 Output: ${DOCS_DIR}\n`);
