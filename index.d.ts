/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import Client from './lib/client'
import SniffingTransport from './lib/sniffingTransport'

export * from '@elastic/transport'
export * as estypes from './lib/api/types'
export { Client, SniffingTransport }
export type { ClientOptions, NodeOptions } from './lib/client'
export * as helpers from './lib/helpers'
