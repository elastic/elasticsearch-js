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
import { Q } from '../'

async function run () {
  const client = new Client({ node: 'http://localhost:9200' })

  // define the query clauses
  const fixDescription = Q.must(Q.match('description', 'fix'))
  const files = Q.should(Q.term('files', 'test'), Q.term('files', 'docs'))
  const author = Q.filter(Q.term('author.name', Q.param('author')))
  const { body } = await client.search({
    index: 'git',
    // use the boolean utilities to craft the final query
    body: Q.and(fixDescription, files, author)
  })

  console.log(body.hits.hits)
}

run().catch(console.log)
