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
    path.join(SRC_DIR, 'node_modules/@elastic/transport/index.js')
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
