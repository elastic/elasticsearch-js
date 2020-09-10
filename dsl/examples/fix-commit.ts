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

import { Client } from '../../'
import { Q, F } from '../'

/**
 * Pure function API
 */
async function run1 () {
  const client = new Client({ node: 'http://localhost:9200' })

  // search commits that contains 'fix' but do not changes test files
  const { body } = await client.search({
    index: 'git',
    body: Q(
      // You can avoid to call `Q.must`, as any query will be
      // sent inside a `must` block unless specified otherwise
      Q.match('description', 'fix'),
      Q.mustNot(Q.term('files', 'test'))
    )
  })

  console.log(body.hits.hits)
}

/**
 * Fluent API
 */
async function run2 () {
  const client = new Client({ node: 'http://localhost:9200' })

  // search commits that contains 'fix' but do not changes test files
  const { body } = await client.search({
    index: 'git',
    body: F()
      // You can avoid to call `.must`, as any query will be
      // sent inside a `must` block unless specified otherwise
      .match('description', 'fix')
      .mustNot(F().term('files', 'test'))
  })

  console.log(body.hits.hits)
}

run1().catch(console.log)
run2().catch(console.log)
