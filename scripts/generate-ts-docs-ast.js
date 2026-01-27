#!/usr/bin/env node

/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const ts = require('typescript')
const fs = require('fs')
const path = require('path')

const DOCS_DIR = path.join(__dirname, '../docs/reference/typescript-api')
const SRC_DIR = path.join(__dirname, '../src')

console.log('🔨 TypeScript Documentation Generator')
console.log('====================================\n')

// Setup directories
if (fs.existsSync(DOCS_DIR)) {
  fs.rmSync(DOCS_DIR, { recursive: true, force: true })
}
fs.mkdirSync(DOCS_DIR, { recursive: true })
fs.mkdirSync(path.join(DOCS_DIR, 'apis'), { recursive: true })
fs.mkdirSync(path.join(DOCS_DIR, 'types'), { recursive: true })

// Create TypeScript program
const program = ts.createProgram({
  rootNames: [
    path.join(SRC_DIR, 'client.ts'),
    path.join(SRC_DIR, 'api/index.ts'),
    path.join(SRC_DIR, 'api/types.ts'),
    path.join(SRC_DIR, 'helpers.ts')
  ],
  options: {
    target: ts.ScriptTarget.ES2019,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    skipLibCheck: true
  }
})

const allTypes = new Map()

// Helper: Extract JSDoc comment
function getJSDoc (node) {
  const docs = ts.getJSDocCommentsAndTags(node)
  if (docs.length === 0) return ''

  const parts = []
  docs.forEach(doc => {
    if (ts.isJSDoc(doc) && doc.comment) {
      if (typeof doc.comment === 'string') {
        parts.push(doc.comment)
      } else {
        parts.push(doc.comment.map(c => c.text ?? '').join(''))
      }
    }
  })
  return parts.join('\n').trim()
}

// Helper: Get property description from @property tag
function getPropertyDoc (node, sourceFile) {
  const docs = ts.getJSDocCommentsAndTags(node)

  for (const doc of docs) {
    if (ts.isJSDoc(doc)) {
      // Check for @property tags
      if (doc.tags) {
        for (const tag of doc.tags) {
          if (tag.tagName.text === 'property') {
            // Extract description after property name
            const comment = tag.comment
            if (comment) {
              const commentText = typeof comment === 'string'
                ? comment
                : comment.map(c => c.text ?? '').join('')

              // Format: "@property propName Description here"
              // Strip the first word (property name) from the comment
              const parts = commentText.trim().split(/\s+/)
              if (parts.length > 1) {
                return parts.slice(1).join(' ')
              }
              return commentText.trim()
            }
          }
        }
      }

      // Fallback to regular comment if no @property tag
      if (doc.comment) {
        const commentText = typeof doc.comment === 'string'
          ? doc.comment
          : doc.comment.map(c => c.text ?? '').join('')
        return commentText.trim()
      }
    }
  }

  return ''
}

// Helper: Get parameter docs from JSDoc
function getParamDocs (node) {
  const paramDocs = {}
  const docs = ts.getJSDocCommentsAndTags(node)

  docs.forEach(doc => {
    if (ts.isJSDoc(doc) && doc.tags) {
      doc.tags.forEach(tag => {
        if (tag.tagName.text === 'param' && tag.name) {
          const paramName = tag.name.getText()
          const comment = tag.comment
          if (comment) {
            paramDocs[paramName] = typeof comment === 'string'
              ? comment
              : comment.map(c => c.text ?? '').join('')
          }
        }
      })
    }
  })
  return paramDocs
}

// Helper: Check if type is primitive
function isPrimitive (type) {
  const primitives = ['string', 'number', 'boolean', 'any', 'void', 'null', 'undefined',
    'unknown', 'never', 'object', 'symbol', 'bigint']
  const cleanType = type.replace(/[[\]]/g, '').split('<')[0]
  return primitives.includes(cleanType.toLowerCase())
}

// Helper: Convert type to markdown link
function typeToLink (typeStr, context = 'types') {
  // Handle T.TypeName format (namespace imports from api/types)
  const namespaceMatch = typeStr.match(/\bT\.(\w+)/)
  if (namespaceMatch) {
    const actualType = namespaceMatch[1]
    if (allTypes.has(actualType)) {
      const prefix = context === 'apis' ? '../types/' : ''
      return typeStr.replace(/T\.(\w+)/, `[$1](${prefix}$1.md)`)
    }
  }

  // Handle arrays
  if (typeStr.endsWith('[]')) {
    const baseType = typeStr.slice(0, -2)
    const baseLink = typeToLink(baseType, context)
    return baseLink + '[]'
  }

  // Skip primitives
  if (isPrimitive(typeStr)) {
    return `${typeStr}`
  }

  // Simple type that exists
  if (allTypes.has(typeStr)) {
    const prefix = context === 'apis' ? '../types/' : ''
    return `[${typeStr}](${prefix}${typeStr}.md)`
  }

  // Handle generics - try to link the base type
  const genericMatch = typeStr.match(/^(\w+)</)
  if (genericMatch && allTypes.has(genericMatch[1])) {
    const prefix = context === 'apis' ? '../types/' : ''
    return typeStr.replace(genericMatch[1], `[${genericMatch[1]}](${prefix}${genericMatch[1]}.md)`)
  }

  return `${typeStr}`
}

console.log('📚 Extracting types...')

// Extract all types from api/types.ts
const types = []
const typesFile = program.getSourceFile(path.join(SRC_DIR, 'api/types.ts'))

if (typesFile) {
  ts.forEachChild(typesFile, node => {
    if (ts.isInterfaceDeclaration(node) &&
        node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      const name = node.name.text
      const comment = getJSDoc(node)
      const properties = []
      const extendsTypes = []

      if (node.heritageClauses) {
        node.heritageClauses.forEach(clause => {
          clause.types.forEach(type => {
            extendsTypes.push(type.expression.getText(typesFile))
          })
        })
      }

      node.members.forEach(member => {
        if (ts.isPropertySignature(member) && member.name) {
          const propName = member.name.getText(typesFile)
          const propType = member.type ? member.type.getText(typesFile) : 'any'
          const optional = !!member.questionToken
          const propComment = getJSDoc(member)

          properties.push({
            name: propName,
            type: propType,
            optional,
            comment: propComment
          })
        }
      })

      types.push({
        kind: 'interface',
        name,
        comment,
        properties,
        extends: extendsTypes
      })

      allTypes.set(name, { kind: 'interface' })
    }

    if (ts.isTypeAliasDeclaration(node) &&
        node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      const name = node.name.text
      const comment = getJSDoc(node)
      const typeText = node.type.getText(typesFile)

      types.push({
        kind: 'type',
        name,
        comment,
        definition: typeText
      })

      allTypes.set(name, { kind: 'type' })
    }

    if (ts.isEnumDeclaration(node) &&
        node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      const name = node.name.text
      const comment = getJSDoc(node)
      const members = []

      node.members.forEach(member => {
        if (member.name) {
          const memberName = member.name.getText(typesFile)
          const memberValue = member.initializer ? member.initializer.getText(typesFile) : undefined
          members.push({ name: memberName, value: memberValue })
        }
      })

      types.push({
        kind: 'enum',
        name,
        comment,
        members
      })

      allTypes.set(name, { kind: 'enum' })
    }
  })
}

console.log(`✓ Found ${types.length} types`)

console.log('📚 Extracting API methods...')

// Extract APIs from api/api directory - with deduplication
const apiMap = new Map() // Use Map to deduplicate by fullName
const apiDir = path.join(SRC_DIR, 'api/api')

if (fs.existsSync(apiDir)) {
  const files = fs.readdirSync(apiDir).filter(f => f.endsWith('.ts'))

  files.forEach(file => {
    const filePath = path.join(apiDir, file)
    const sourceFile = program.getSourceFile(filePath)
    if (!sourceFile) return

    const apiName = file.replace('.ts', '')

    ts.forEachChild(sourceFile, node => {
      // Handle class exports (namespace APIs)
      if (ts.isClassDeclaration(node) && node.name) {
        node.members.forEach(member => {
          if (ts.isMethodDeclaration(member) && member.name) {
            const methodName = member.name.getText(sourceFile)
            if (methodName === 'constructor') return

            const fullName = `${apiName}.${methodName}`

            // Deduplicate: only add if not already in map
            if (apiMap.has(fullName)) return

            const comment = getJSDoc(member)
            const paramDocs = getParamDocs(member)
            const params = []

            member.parameters.forEach(param => {
              if (!param.name) return
              const paramName = param.name.getText(sourceFile)
              const paramType = param.type ? param.type.getText(sourceFile) : 'any'
              const optional = !!param.questionToken

              params.push({
                name: paramName,
                type: paramType,
                optional,
                description: paramDocs[paramName] ?? ''
              })
            })

            const returnType = member.type ? member.type.getText(sourceFile) : 'any'

            const apiInfo = {
              fullName,
              namespace: apiName,
              methodName,
              isNamespace: true,
              comment,
              params,
              returnType
            }

            apiMap.set(fullName, apiInfo)
          }
        })
      }

      // Handle function exports (direct APIs)
      if (ts.isFunctionDeclaration(node) && node.name) {
        const fullName = apiName

        // Deduplicate: only add if not already in map
        if (apiMap.has(fullName)) return

        const comment = getJSDoc(node)
        const paramDocs = getParamDocs(node)
        const params = []

        node.parameters.forEach(param => {
          if (!param.name) return
          const paramName = param.name.getText(sourceFile)
          const paramType = param.type ? param.type.getText(sourceFile) : 'any'
          const optional = !!param.questionToken

          params.push({
            name: paramName,
            type: paramType,
            optional,
            description: paramDocs[paramName] ?? ''
          })
        })

        const returnType = node.type ? node.type.getText(sourceFile) : 'any'

        const apiInfo = {
          fullName,
          namespace: null,
          methodName: apiName,
          isNamespace: false,
          comment,
          params,
          returnType
        }

        apiMap.set(fullName, apiInfo)
      }
    })
  })
}

// Convert Map to array for processing
const apis = Array.from(apiMap.values())

console.log(`✓ Found ${apis.length} unique API methods`)

console.log('📚 Extracting Client options...')

// Extract Client options with @property tag support
const clientOptions = []
const clientFile = program.getSourceFile(path.join(SRC_DIR, 'client.ts'))

if (clientFile) {
  ts.forEachChild(clientFile, node => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === 'ClientOptions') {
      node.members.forEach(member => {
        if (ts.isPropertySignature(member) && member.name) {
          const propName = member.name.getText(clientFile)
          const propType = member.type ? member.type.getText(clientFile) : 'any'
          const optional = !!member.questionToken
          const propComment = getPropertyDoc(member, clientFile)

          clientOptions.push({
            name: propName,
            type: propType,
            optional,
            comment: propComment
          })
        }
      })
    }
  })
}

console.log(`✓ Found ${clientOptions.length} client options`)

console.log('📚 Extracting helpers...')

// Extract helpers
const helpers = []
const helpersFile = program.getSourceFile(path.join(SRC_DIR, 'helpers.ts'))

if (helpersFile) {
  ts.forEachChild(helpersFile, node => {
    if (ts.isClassDeclaration(node) && node.name && node.name.text === 'Helpers') {
      node.members.forEach(member => {
        if (ts.isMethodDeclaration(member) && member.name) {
          const methodName = member.name.getText(helpersFile)
          if (methodName === 'constructor') return

          const comment = getJSDoc(member)
          const paramDocs = getParamDocs(member)
          const params = []

          member.parameters.forEach(param => {
            if (!param.name) return
            const paramName = param.name.getText(helpersFile)
            const paramType = param.type ? param.type.getText(helpersFile) : 'any'
            const optional = !!param.questionToken

            params.push({
              name: paramName,
              type: paramType,
              optional,
              description: paramDocs[paramName] ?? ''
            })
          })

          const returnType = member.type ? member.type.getText(helpersFile) : 'any'

          helpers.push({
            name: methodName,
            comment,
            params,
            returnType
          })
        }
      })
    }
  })
}

console.log(`✓ Found ${helpers.length} helper functions`)

console.log('\n📝 Generating documentation...\n')

// Generate API documentation
apis.forEach(api => {
  const fileName = api.isNamespace ? `${api.namespace}.${api.methodName}.md` : `${api.methodName}.md`
  const filePath = path.join(DOCS_DIR, 'apis', fileName)

  const methodName = api.isNamespace ? `${api.namespace}.${api.methodName}` : api.methodName

  let content = `# Client.${methodName}\n\n`

  if (api.comment) {
    content += `${api.comment}\n\n`
  }

  content += '## Method signature\n\n'
  content += '```typescript\n'
  content += `client.${methodName}(`
  if (api.params && api.params.length > 0) {
    const params = api.params.filter(p => !(p.name === 'this' && p.type === 'That'))
    content += params.map(p => `${p.name}${p.optional ? '?' : ''}: ${p.type}`).join(', ')
  }
  content += `): ${api.returnType}\n`
  content += '```\n\n'

  if (api.params && api.params.length > 0) {
    content += '### Parameters\n\n'
    content += '| Parameter | Type | Description |\n'
    content += '|-----------|------|-------------|\n'
    api.params.forEach(param => {
      if (param.name === 'this' && param.type === 'That') return
      const typeLink = typeToLink(param.type, 'apis')
      const desc = param.description ?? '&nbsp;'
      content += `| \`${param.name}${param.optional ? '?' : ''}\` | ${typeLink} | ${desc} |\n`
    })
    content += '\n'
  }

  content += '### Returns\n\n'
  content += `${typeToLink(api.returnType, 'apis')}\n\n`

  content += '## See Also\n\n'
  content += '- [Client](../client.md)\n'
  content += '- [All APIs](../index.md)\n'

  fs.writeFileSync(filePath, content)
})

console.log(`✓ Generated ${apis.length} API documentation files`)

// Generate type documentation
types.forEach(type => {
  const fileName = `${type.name}.md`
  const filePath = path.join(DOCS_DIR, 'types', fileName)

  let content = `# ${type.name}\n\n`

  if (type.comment) {
    content += `${type.comment}\n\n`
  }

  if (type.kind === 'interface') {
    content += '## Interface\n\n'

    if (type.extends && type.extends.length > 0) {
      content += '### Extends\n\n'
      type.extends.forEach(ext => {
        content += `- ${typeToLink(ext, 'types')}\n`
      })
      content += '\n'
    }

    if (type.properties && type.properties.length > 0) {
      content += '### Properties\n\n'
      content += '| Property | Type | Description |\n'
      content += '|----------|------|-------------|\n'

      type.properties.forEach(prop => {
        const typeLink = typeToLink(prop.type, 'types')
        const desc = prop.comment ?? '&nbsp;'
        content += `| ${prop.name}${prop.optional ? '?' : ''} | ${typeLink} | ${desc} |\n`
      })
      content += '\n'
    }
  } else if (type.kind === 'type') {
    content += '## Type Alias\n\n'

    if (type.definition) {
      content += '```typescript\n'
      content += `type ${type.name} = ${type.definition}\n`
      content += '```\n\n'
    }
  } else if (type.kind === 'enum') {
    content += '## Enum\n\n'

    if (type.members && type.members.length > 0) {
      content += '### Members\n\n'
      content += '| Member | Value |\n'
      content += '|--------|-------|\n'
      type.members.forEach(member => {
        content += `| ${member.name} | ${member.value ?? '&nbsp;'} |\n`
      })
      content += '\n'
    }
  }

  content += '## See Also\n\n'
  content += '- [All Types](./)\n'
  content += '- [API Methods](../index.md)\n'

  fs.writeFileSync(filePath, content)
})

console.log(`✓ Generated ${types.length} type documentation files`)

// Generate helpers documentation
const helpersPath = path.join(DOCS_DIR, 'helpers.md')
let helpersContent = '# Client.helpers\n\n'
helpersContent += 'The `Client.helpers` namespace provides utility methods for common operations.\n\n'

if (helpers.length > 0) {
  helpers.forEach(helper => {
    helpersContent += `## ${helper.name}\n\n`

    if (helper.comment) {
      helpersContent += `${helper.comment}\n\n`
    }

    helpersContent += '### Signature\n\n'
    helpersContent += '```typescript\n'
    helpersContent += `client.helpers.${helper.name}(`
    if (helper.params && helper.params.length > 0) {
      helpersContent += helper.params.map(p => `${p.name}${p.optional ? '?' : ''}: ${p.type}`).join(', ')
    }
    helpersContent += `): ${helper.returnType}\n`
    helpersContent += '```\n\n'

    if (helper.params && helper.params.length > 0) {
      helpersContent += '### Parameters\n\n'
      helpersContent += '| Parameter | Type | Description |\n'
      helpersContent += '|-----------|------|-------------|\n'
      helper.params.forEach(param => {
        const desc = param.description ?? '&nbsp;'
        helpersContent += `| ${param.name}${param.optional ? '?' : ''} | ${param.type} | ${desc} |\n`
      })
      helpersContent += '\n'
    }
  })
}

helpersContent += '## See Also\n\n'
helpersContent += '- [Client](./client.md)\n'

fs.writeFileSync(helpersPath, helpersContent)
console.log('✓ Generated helpers documentation')

// Generate Client documentation
const clientPath = path.join(DOCS_DIR, 'client.md')
let clientContent = '# Client\n\n'
clientContent += 'The main Elasticsearch client class.\n\n'

clientContent += '## Constructor\n\n'
clientContent += '```typescript\n'
clientContent += 'import { Client } from \'@elastic/elasticsearch\';\n\n'
clientContent += 'const client = new Client(options: ClientOptions);\n'
clientContent += '```\n\n'

if (clientOptions.length > 0) {
  clientContent += '### ClientOptions\n\n'
  // clientContent += '| Option | Type | Description |\n'
  // clientContent += '|--------|------|-------------|\n'

  clientOptions.forEach(opt => {
    // Special handling for Transport option to link to transport.md
    let typeLink
    if (opt.name === 'Transport') {
      typeLink = '[`Transport`](./transport.md)'
    } else {
      typeLink = `${opt.type}`
    }
    const desc = opt.comment ?? '&nbsp;'
    clientContent += `| ${opt.name}${opt.optional ? '?' : ''} | ${typeLink} | ${desc} |\n`
  })
  clientContent += '\n'
}

clientContent += '## See Also\n\n'
clientContent += '- [API Methods](./index.md)\n'
clientContent += '- [Helpers](./helpers.md)\n'

fs.writeFileSync(clientPath, clientContent)
console.log('✓ Generated Client documentation')

// Generate transport documentation
const transportPath = path.join(DOCS_DIR, 'transport.md')
let transportContent = '# Transport\n\n'
transportContent += 'The Elasticsearch JavaScript client uses [@elastic/transport](https://github.com/elastic/elastic-transport-js) for HTTP communication.\n\n'
transportContent += '## Overview\n\n'
transportContent += 'The transport layer handles:\n\n'
transportContent += '- Connection management and pooling\n'
transportContent += '- Request/response lifecycle\n'
transportContent += '- Retries and error handling\n'
transportContent += '- Serialization/deserialization\n'
transportContent += '- Node sniffing and discovery\n\n'
transportContent += '## Key Classes\n\n'
transportContent += '### Transport\n\n'
transportContent += 'Main transport class that manages connections and handles requests.\n\n'
transportContent += '### Connection Classes\n\n'
transportContent += '- **BaseConnection** - Base connection class\n'
transportContent += '- **HttpConnection** - A connection to an Elasticsearch node, managed by the `http` client in the standard library\n'
transportContent += '- **UndiciConnection** - Connection using the undici HTTP client\n\n'
transportContent += '### Connection Pool Classes\n\n'
transportContent += '- **BaseConnectionPool** - Base connection pool\n'
transportContent += '- **WeightedConnectionPool** - Default connection pool\n'
transportContent += '- **ClusterConnectionPool** - Connection pool for cluster deployments\n'
transportContent += '- **CloudConnectionPool** - Connection pool for Elastic Cloud\n\n'
transportContent += '### Serializer\n\n'
transportContent += 'Handles serialization and deserialization of requests and responses.\n\n'
transportContent += '## See Also\n\n'
transportContent += '- [Client Options](./client.md) - See the `Transport` option for configuration\n'
transportContent += '- [@elastic/transport Documentation](https://github.com/elastic/elastic-transport-js)\n'

fs.writeFileSync(transportPath, transportContent)
console.log('✓ Generated Transport documentation')

// Generate index documentation (single alphabetical list)
const indexPath = path.join(DOCS_DIR, 'index.md')
let indexContent = '# Elasticsearch JavaScript Client - API Reference\n\n'
indexContent += 'Complete TypeScript API reference for the Elasticsearch JavaScript client.\n\n'

indexContent += '## Navigation\n\n'
indexContent += '- [Client](./client.md) - Client class and constructor options\n'
indexContent += '- [Helpers](./helpers.md) - Helper utilities\n'
indexContent += '- [Transport](./transport.md) - Transport layer\n'
indexContent += '- [Type Definitions](./types/) - TypeScript types\n\n'

indexContent += '## API Methods\n\n'

// Create single alphabetical list
const sortedApis = apis.slice().sort((a, b) => a.fullName.localeCompare(b.fullName))

sortedApis.forEach(api => {
  const fileName = api.isNamespace ? `${api.namespace}.${api.methodName}.md` : `${api.methodName}.md`
  indexContent += `- [client.${api.fullName}()](apis/${fileName})\n`
})

fs.writeFileSync(indexPath, indexContent)
console.log('✓ Generated index documentation')

// Generate README
const readmePath = path.join(DOCS_DIR, 'README.md')
let readmeContent = '# TypeScript API Reference\n\n'
readmeContent += 'Complete TypeScript API reference for the Elasticsearch JavaScript client.\n\n'
readmeContent += '## Documentation\n\n'
readmeContent += '- **[index.md](./index.md)** - Main API reference\n'
readmeContent += '- **[client.md](./client.md)** - Client class\n'
readmeContent += '- **[apis/](./apis/)** - API methods\n'
readmeContent += '- **[types/](./types/)** - Type definitions\n'
readmeContent += '- **[helpers.md](./helpers.md)** - Helper utilities\n'

fs.writeFileSync(readmePath, readmeContent)
console.log('✓ Generated README')

console.log('\n✨ Documentation generation complete!\n')
console.log(`📍 Output: ${DOCS_DIR}`)
console.log('📊 Generated:')
console.log(`   - ${apis.length} API methods`)
console.log(`   - ${types.length} types`)
console.log(`   - ${helpers.length} helpers`)
console.log(`   - ${clientOptions.length} client options\n`)
