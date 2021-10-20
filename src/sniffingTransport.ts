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

import assert from 'assert'
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
