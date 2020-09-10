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

  // the result must be fixes done by delvedor
  let query = Q.bool(
    Q.must(Q.match('description', 'fix')),
    Q.filter(Q.term('author.name', 'delvedor'))
  )

  // Based on a condition, we want to enrich our query
  if (Math.random() >= 0.5) {
    // the results must be fixes done by delvedor
    // on test or do files
    const should = Q.should(
      Q.term('files', 'test'),
      Q.term('files', 'docs')
    )
    // The code below produces the same as the one above
    // If you need to check multiple values for the same key,
    // you can pass an array of strings instead of calling
    // the query function multiple times
    // ```
    //   const should = Q.should(
    //    Q.term('files', ['test', 'docs'])
    //   )
    // ```
    query = Q.and(query, should)
  } else {
    // the results must be fixes or features done by delvedor
    const must = Q.must(
      Q.match('description', 'feature')
    )
    query = Q.or(query, must)
  }

  const { body } = await client.search({
    index: 'git',
    body: Q(query)
  })

  console.log(body.hits.hits)
}

run().catch(console.log)
