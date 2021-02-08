/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
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

  const { body } = await client.security.createApiKey({
    body: {
      name: 'elasticsearch-proxy',
      role_descriptors: {
        'elasticsearch-proxy-users': {
          index: [{
            names: indexNames,
            privileges
          }]
        }
      }
    }
  })

  return Buffer.from(`${body.id}:${body.api_key}`).toString('base64')
}

generateApiKeys()
  .then(console.log)
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
