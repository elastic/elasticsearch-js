/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { readFileSync } from 'fs'
import crypto from 'crypto'
import { join } from 'path'
import https from 'https'
import http from 'http'
import Debug from 'debug'
import stoppable, { StoppableServer } from 'stoppable'

const debug = Debug('elasticsearch-test')

// allow self signed certificates for testing purposes
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const secureOpts = {
  key: readFileSync(join(__dirname, '..', 'fixtures', 'https.key'), 'utf8'),
  cert: readFileSync(join(__dirname, '..', 'fixtures', 'https.cert'), 'utf8')
}

const caFingerprint = getFingerprint(secureOpts.cert
  .split('\n')
  .slice(1, -1)
  .map(line => line.trim())
  .join('')
)

export type ServerHandler = (req: http.IncomingMessage, res: http.ServerResponse) => void
interface Options { secure?: boolean }
type Server = [{ key: string, cert: string, port: number, caFingerprint: string }, StoppableServer]

let id = 0
export default function buildServer (handler: ServerHandler, opts: Options = {}): Promise<Server> {
  const serverId = id++
  debug(`Booting server '${serverId}'`)

  const server = opts.secure
    ? stoppable(https.createServer(secureOpts))
    : stoppable(http.createServer())

  server.on('request', (req, res) => {
    res.setHeader('x-elastic-product', 'Elasticsearch')
    handler(req, res)
  })

  server.on('error', err => {
    console.log('http server error', err)
    process.exit(1)
  })

  return new Promise((resolve, reject) => {
    server.listen(0, () => {
      // @ts-expect-error
      const port = server.address().port
      debug(`Server '${serverId}' booted on port ${port}`)
      resolve([Object.assign({}, secureOpts, { port, caFingerprint }), server])
    })
  })
}

function getFingerprint (content: string, inputEncoding = 'base64', outputEncoding = 'hex'): string {
  const shasum = crypto.createHash('sha256')
  // @ts-expect-error
  shasum.update(content, inputEncoding)
  // @ts-expect-error
  const res = shasum.digest(outputEncoding)
  const arr = res.toUpperCase().match(/.{1,2}/g)
  if (arr == null) {
    throw new Error('Should produce a match')
  }
  return arr.join(':')
}
