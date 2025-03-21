/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert'
import { Transport, SniffOptions } from '@elastic/transport'

export default class SniffingTransport extends Transport {
  sniff (opts: SniffOptions): void {
    if (this.isSniffing) return
    this.isSniffing = true

    const request = {
      method: 'GET',
      path: this.sniffEndpoint ?? '/_nodes/_all/http'
    }

    this.request(request, { id: opts.requestId, meta: true })
      .then(result => {
        assert(isObject(result.body), 'The body should be an object')
        this.isSniffing = false
        const protocol = result.meta.connection?.url.protocol ?? /* istanbul ignore next */ 'http:'
        const hosts = this.connectionPool.nodesToHost(result.body.nodes, protocol)
        this.connectionPool.update(hosts)

        result.meta.sniff = { hosts, reason: opts.reason }
        this.diagnostic.emit('sniff', null, result)
      })
      .catch(err => {
        this.isSniffing = false
        err.meta.sniff = { hosts: [], reason: opts.reason }
        this.diagnostic.emit('sniff', err, null)
      })
  }
}

function isObject (obj: any): obj is Record<string, any> {
  return typeof obj === 'object'
}
