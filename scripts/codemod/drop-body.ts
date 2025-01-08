/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License") you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import ts from 'typescript'
import path from 'node:path'
import minimist from 'minimist'

const clientProps = ['diagnostic', 'connectionPool', 'transport', 'serializer', 'child', 'close']
/**
 * Returns true if the interface type is a `Client`, otherwise false
 * @remarks Uses `clientProps` as a duck-typing way to identify `Client` instances. There's probably a better way, but this is probably accurate enough.
 */
function classIsClient(type: ts.InterfaceType) {
  const typeProps = type.getProperties().map(prop => prop.escapedName.toString())

  let hasClientProps = true
  clientProps.forEach(prop => {
    if (!typeProps.includes(prop)) hasClientProps = false
  })
  return hasClientProps
}

/**
  * Returns true if the call expression node is running a client API function, otherwise false
  */
function isClientExpression(node: ts.CallExpression): boolean {
  let flag = false
  function visitIdentifiers(node: ts.Node) {
    if (ts.isIdentifier(node)) {
      const type = checker.getTypeAtLocation(node)
      if (type.isClass() && classIsClient(type)) {
        flag = true
      }
    }
    ts.forEachChild(node, visitIdentifiers)
  }
  visitIdentifiers(node)
  return flag
}

/**
  * Returns an array of all call expressions to `Client` functions
  */
function collectClientCallExpressions(node: ts.SourceFile): ts.CallExpression[] {
  const clientExpressions: ts.CallExpression[] = []

  // recurse through all child nodes looking for `Client` call expressions
  function collect(node: ts.Node) {
    if (ts.isCallExpression(node)) {
      // look for client identifier
      if (isClientExpression(node)) {
        clientExpressions.push(node)
      }
    }

    ts.forEachChild(node, collect)
  }

  ts.forEachChild(node, collect)

  return clientExpressions
}

// function getObjectLiteralExpression(node: ts.Node) {
//   if (ts.isObjectLiteralExpression(node)) {
//     return node
//   } else if (ts.isIdentifier(node)) {
//     // traverse up to assignment
//     // @ts-expect-error
//     let antecedent = node.flowNode.antecedent
//     let parentNode = null
//     while (true) {
//       if (antecedent.node != null) {
//         parentNode = antecedent.node
//         antecedent = antecedent.antecedent
//       } else {
//         break
//       }
//     }
//     return parentNode
//   }
// }

function fixBodyProp(sourceFile: ts.SourceFile, node: ts.Node) {
  if (ts.isObjectLiteralExpression(node)) {
    // @ts-expect-error need to cast `prop` to a more specific type
    const prop = node.properties.find(prop => prop.name.escapedText === 'body')
    if (prop != null) {
      console.log('// needs fix:')
      console.log(sourceFile?.text.slice(node.pos, node.end))

      // TODO: fix { body: value }
      // TODO: fix { body: { ... } }
      // TODO: fix { body }
    }
  } else if (ts.isIdentifier(node)) {
    // @ts-expect-error
    if (node.flowNode.antecedent?.node != null) {
      // @ts-expect-error
      fixBodyProp(sourceFile, node.flowNode.antecedent.node)
    } else {
      // console.log('uh oh')
      // console.log(sourceFile?.text.slice(node.pos, node.end))
    }
  } else {
    // @ts-expect-error
    if (node.flowNode?.antecedent?.node != null) {
      // console.log('two')
      // @ts-expect-error
      fixBodyProp(sourceFile, node.flowNode.antecedent.node)
    } else {
      // console.log('something else')
      // console.log(node.kind)
      // console.log(sourceFile?.text.slice(node.pos, node.end))
    }
  }
  return false
}

function lookForBodyProp(sourceFile: ts.SourceFile, node: ts.CallExpression) {
  if (node.arguments.length === 0) return
  const first = node.arguments[0]
  fixBodyProp(sourceFile, first)
}

// build TS project from provided file names
const args = minimist(process.argv.slice(2))
const cwd = process.cwd()
const files = args._.map(filename => path.join(cwd, filename))
const program = ts.createProgram(files, {})
const checker = program.getTypeChecker()

let processed = 0
program.getSourceFiles().forEach(sourceFile => {
  if (sourceFile.fileName.includes('/node_modules/')) return

  try {
    // get all `Client` call expressions
    const exprs = collectClientCallExpressions(sourceFile)
    console.log(`found ${exprs.length} expressions in ${sourceFile.fileName}`)
    // for each call expression, get the first function argument, determine if it's an object and whether it has a `body` key
    exprs.forEach(expr => lookForBodyProp(sourceFile, expr))
  } catch (e) {
    // continue
    console.error(`Could not process ${sourceFile.fileName}: ${e}`)
  }
  processed++
})
console.log(`Done processing ${processed} files`)
