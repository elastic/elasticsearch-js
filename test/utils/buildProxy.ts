/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-ignore
import proxy from 'proxy'
import { readFileSync } from 'fs'
import { join } from 'path'
import * as http from 'http'
import * as https from 'https'

export const ssl = {
  key: readFileSync(join(__dirname, '..', 'fixtures', 'https.key')),
  cert: readFileSync(join(__dirname, '..', 'fixtures', 'https.cert'))
}

type AuthenticateFn = (err: Error | null, valid: boolean) => void
interface ProxyServer extends http.Server {
  authenticate?(req: http.IncomingMessage, fn: AuthenticateFn): void
}

export function createProxy (): Promise<ProxyServer> {
  return new Promise((resolve, reject) => {
    const server = proxy(http.createServer())
    server.listen(0, '127.0.0.1', () => {
      resolve(server)
    })
  })
}

export function createSecureProxy (): Promise<ProxyServer> {
  return new Promise((resolve, reject) => {
    const server = proxy(https.createServer(ssl))
    server.listen(0, '127.0.0.1', () => {
      resolve(server)
    })
  })
}

export function createServer (): Promise<http.Server> {
  return new Promise((resolve, reject) => {
    const server = http.createServer()
    server.listen(0, '127.0.0.1', () => {
      resolve(server)
    })
  })
}

export function createSecureServer (): Promise<http.Server> {
  return new Promise((resolve, reject) => {
    const server = https.createServer(ssl)
    server.listen(0, '127.0.0.1', () => {
      resolve(server)
    })
  })
}
