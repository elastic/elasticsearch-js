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
import { Q, A } from '../'

async function run () {
  const client = new Client({ node: 'http://localhost:9200' })

  // 'committers' is the name of the aggregation
  let committersAgg = A.committers.terms('committer.name.keyword')
  // instead of pass other aggregations as parameter
  // to the parent aggregation, you can conditionally add them
  if (Math.random() >= 0.5) {
    committersAgg = A.committers.aggs(
      committersAgg, A.line_stats.stats('stat.insertions')
    )
  }

  const { body } = await client.search({
    index: 'git',
    body: Q(
      Q.size(0),
      A(committersAgg)
    )
  })

  console.log(body.aggregations)
}

run().catch(console.log)
