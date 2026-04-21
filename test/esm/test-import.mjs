/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Client } from '@elastic/elasticsearch'

// eslint-disable-next-line no-new
new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'changeme',
  }
})
