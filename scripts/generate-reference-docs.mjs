/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import ts from 'typescript'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SRC_DIR = path.join(__dirname, '../src')

const program = ts.createProgram({
  rootNames: [
    path.join(SRC_DIR, 'client.ts'),
    path.join(SRC_DIR, 'api/index.ts'),
    path.join(SRC_DIR, 'api/types.ts'),
    path.join(SRC_DIR, 'helpers.ts'),
    path.join(SRC_DIR, '../node_modules/@elastic/transport/lib/Transport.d.ts'),
    path.join(SRC_DIR, '../node_modules/@elastic/transport/lib/connection/BaseConnection.d.ts'),
    path.join(SRC_DIR, '../node_modules/@elastic/transport/lib/connection/HttpConnection.d.ts'),
    path.join(SRC_DIR, '../node_modules/@elastic/transport/lib/connection/UndiciConnection.d.ts'),
    path.join(SRC_DIR, '../node_modules/@elastic/transport/lib/pool/BaseConnectionPool.d.ts'),
    path.join(SRC_DIR, '../node_modules/@elastic/transport/lib/pool/ClusterConnectionPool.d.ts'),
    path.join(SRC_DIR, '../node_modules/@elastic/transport/lib/pool/CloudConnectionPool.d.ts'),
    path.join(SRC_DIR, '../node_modules/@elastic/transport/lib/pool/WeightedConnectionPool.d.ts'),
    path.join(SRC_DIR, '../node_modules/@elastic/transport/lib/Serializer.d.ts')
  ],
  options: {
    target: ts.ScriptTarget.ES2019,
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    skipLibCheck: true
  }
})

const checker = program.getTypeChecker()

// const allTypes = {}
//
// const clientFile = program.getSourceFile(path.join(SRC_DIR, 'client.ts'))
// ts.forEachChild(clientFile, node => {
//   if (node.name?.text != null) {
//     allTypes[node.name.text]
//   }
// })

const apiMap = new Map()
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

// console.log(apiMap)

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

const clientOptions = []
const clientFile = program.getSourceFile(path.join(SRC_DIR, 'client.ts'))

if (clientFile) {
  ts.forEachChild(clientFile, node => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === 'ClientOptions') {
      node.members.forEach(member => {
        if (ts.isPropertySignature(member) && member.name) {
          const symbol = checker.getSymbolAtLocation(member.name)
          const name = symbol.getName()
          const type = member.type ? member.type.getText(clientFile).replace(/\s+/g, ' ') : 'any'
          const optional = !!member.questionToken

          const jsdocTags = symbol.getJsDocTags(checker)
          const propertyTag = jsdocTags.find(tag => tag.name === 'property')
          const comment = propertyTag ? ts.displayPartsToString(propertyTag.text) : null
          const defaultValueTag = jsdocTags.find(tag => tag.name === 'defaultValue')
          const defaultValue = defaultValueTag ? ts.displayPartsToString(defaultValueTag.text) : null
          clientOptions.push({
            name,
            type,
            optional,
            comment,
            defaultValue
          })
        }
      })
    }
  })
}

// Extract all types from types.ts
const allTypes = new Map()
const typesFile = program.getSourceFile(path.join(SRC_DIR, 'api/types.ts'))

if (typesFile) {
  ts.forEachChild(typesFile, node => {
    // Interface declarations
    if (ts.isInterfaceDeclaration(node) && node.name) {
      const typeName = node.name.text
      const comment = getJSDoc(node)
      const properties = []
      const extendsTypes = []

      // Get heritage clauses (extends)
      if (node.heritageClauses) {
        node.heritageClauses.forEach(clause => {
          if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
            clause.types.forEach(type => {
              extendsTypes.push(type.expression.getText(typesFile))
            })
          }
        })
      }

      // Get properties
      node.members.forEach(member => {
        if (ts.isPropertySignature(member) && member.name) {
          const propName = member.name.getText(typesFile)
          const propType = member.type ? member.type.getText(typesFile).replace(/\s+/g, ' ') : 'any'
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

      allTypes.set(typeName, {
        kind: 'interface',
        name: typeName,
        comment,
        properties,
        extends: extendsTypes
      })
    }

    // Type aliases
    if (ts.isTypeAliasDeclaration(node) && node.name) {
      const typeName = node.name.text
      const comment = getJSDoc(node)
      const typeDefinition = node.type.getText(typesFile).replace(/\s+/g, ' ')

      allTypes.set(typeName, {
        kind: 'type',
        name: typeName,
        comment,
        definition: typeDefinition
      })
    }

    // Enums
    if (ts.isEnumDeclaration(node) && node.name) {
      const enumName = node.name.text
      const comment = getJSDoc(node)
      const members = []

      node.members.forEach(member => {
        const memberName = member.name.getText(typesFile)
        const memberValue = member.initializer ? member.initializer.getText(typesFile) : undefined
        const memberComment = getJSDoc(member)

        members.push({
          name: memberName,
          value: memberValue,
          comment: memberComment
        })
      })

      allTypes.set(enumName, {
        kind: 'enum',
        name: enumName,
        comment,
        members
      })
    }
  })
}

// Extract Client.helpers functions
const helperFunctions = []
const helpersFile = program.getSourceFile(path.join(SRC_DIR, 'helpers.ts'))

if (helpersFile) {
  // Find the Helpers class
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
            const paramType = param.type ? param.type.getText(helpersFile).replace(/\s+/g, ' ') : 'any'
            const optional = !!param.questionToken

            params.push({
              name: paramName,
              type: paramType,
              optional,
              description: paramDocs[paramName] ?? ''
            })
          })

          const returnType = member.type ? member.type.getText(helpersFile).replace(/\s+/g, ' ') : 'any'

          helperFunctions.push({
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

// Extract Transport class and related classes
const transportClasses = new Map()

// Load transport classes from individual files
const transportFiles = [
  'lib/Transport.d.ts',
  'lib/connection/BaseConnection.d.ts',
  'lib/connection/HttpConnection.d.ts',
  'lib/connection/UndiciConnection.d.ts',
  'lib/pool/BaseConnectionPool.d.ts',
  'lib/pool/ClusterConnectionPool.d.ts',
  'lib/pool/CloudConnectionPool.d.ts',
  'lib/pool/WeightedConnectionPool.d.ts',
  'lib/Serializer.d.ts'
]

transportFiles.forEach(file => {
  const transportPath = path.join(SRC_DIR, '../node_modules/@elastic/transport', file)
  
  if (!fs.existsSync(transportPath)) {
    return
  }

  const transportFile = program.getSourceFile(transportPath)

  if (transportFile) {
    ts.forEachChild(transportFile, node => {
      // Find class declarations
      if (ts.isClassDeclaration(node) && node.name) {
        const className = node.name.text

        const comment = getJSDoc(node)
        const properties = []
        const methods = []
        const constructorParams = []

        node.members.forEach(member => {
          // Properties
          if (ts.isPropertyDeclaration(member) && member.name) {
            const propName = member.name.getText(transportFile)
            const propType = member.type ? member.type.getText(transportFile).replace(/\s+/g, ' ') : 'any'
            const propComment = getJSDoc(member)
            const isPrivate = member.modifiers?.some(m => m.kind === ts.SyntaxKind.PrivateKeyword)
            
            // Skip private properties
            if (isPrivate) return

            properties.push({
              name: propName,
              type: propType,
              comment: propComment
            })
          }

          // Methods
          if (ts.isMethodDeclaration(member) && member.name) {
            const methodName = member.name.getText(transportFile)
            const methodComment = getJSDoc(member)
            const paramDocs = getParamDocs(member)
            const params = []
            const isPrivate = member.modifiers?.some(m => m.kind === ts.SyntaxKind.PrivateKeyword)
            
            // Skip private methods
            if (isPrivate) return

            member.parameters.forEach(param => {
              if (!param.name) return
              const paramName = param.name.getText(transportFile)
              const paramType = param.type ? param.type.getText(transportFile).replace(/\s+/g, ' ') : 'any'
              const optional = !!param.questionToken

              params.push({
                name: paramName,
                type: paramType,
                optional,
                description: paramDocs[paramName] ?? ''
              })
            })

            const returnType = member.type ? member.type.getText(transportFile).replace(/\s+/g, ' ') : 'any'

            methods.push({
              name: methodName,
              comment: methodComment,
              params,
              returnType
            })
          }

          // Constructor
          if (ts.isConstructorDeclaration(member)) {
            const paramDocs = getParamDocs(member)

            member.parameters.forEach(param => {
              if (!param.name) return
              const paramName = param.name.getText(transportFile)
              const paramType = param.type ? param.type.getText(transportFile).replace(/\s+/g, ' ') : 'any'
              const optional = !!param.questionToken

              constructorParams.push({
                name: paramName,
                type: paramType,
                optional,
                description: paramDocs[paramName] ?? ''
              })
            })
          }
        })

        transportClasses.set(className, {
          name: className,
          comment,
          constructorParams,
          properties,
          methods
        })
      }
    })
  }
})

// Build the final DOM structure
const dom = {
  client: {
    options: clientOptions
  },
  apis: Object.fromEntries(apiMap),
  types: Object.fromEntries(allTypes),
  helpers: helperFunctions,
  transport: Object.fromEntries(transportClasses)
}

// Write to dom.json
const outputPath = path.join(__dirname, '../dom.json')
fs.writeFileSync(outputPath, JSON.stringify(dom, null, 2))

console.log(`DOM written to ${outputPath}`)
console.log(`Stats:`)
console.log(`  - APIs: ${apiMap.size}`)
console.log(`  - Types: ${allTypes.size}`)
console.log(`  - Client options: ${clientOptions.length}`)
console.log(`  - Helper functions: ${helperFunctions.length}`)
console.log(`  - Transport classes: ${transportClasses.size}`)
