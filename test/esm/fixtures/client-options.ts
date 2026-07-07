/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ClientOptions, NodeOptions } from '@elastic/elasticsearch'

export const clientOptions: ClientOptions = {
  node: 'http://localhost:9200'
}

export const nodeOptions: NodeOptions = {
  url: new URL('http://localhost:9200')
}
