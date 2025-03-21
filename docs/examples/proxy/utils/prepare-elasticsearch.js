/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const { Client } = require('@elastic/elasticsearch')

// Your Cloud Id
const cloudId = ''
// Your admin username
const username = ''
// Your admin password
const password = ''
// The indices or index patterns you will need to access
const indexNames = ['my-index-name-or-pattern']
// see https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices
const privileges = ['read']

async function generateApiKeys (opts) {
  const client = new Client({
    cloud: {
      id: cloudId
    },
    auth: {
      username,
      password
    }
  })

  const result = await client.security.createApiKey({
    name: 'elasticsearch-proxy',
    role_descriptors: {
      'elasticsearch-proxy-users': {
        index: [{
          names: indexNames,
          privileges
        }]
      }
    }
  })

  return Buffer.from(`${result.id}:${result.api_key}`).toString('base64')
}

generateApiKeys()
  .then(console.log)
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
