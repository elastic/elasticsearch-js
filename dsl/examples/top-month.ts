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

  const committers = A.committers.terms(
    { field: 'committer.name.keyword' },
    A.insertions.sum({ field: 'stat.insertions' })
  )
  const topCommittersPerMonth = A.top_committer_per_month.maxBucket(
    { bucket_path: 'committers>insertions' }
  )
  const commitsPerMonth = A.commits_per_month.dateHistogram(
    {
      field: 'committed_date',
      interval: 'day',
      min_doc_count: 1,
      order: { _count: 'desc' }
    },
    // nested aggregations
    committers,
    topCommittersPerMonth
  )
  const topCommittersPerMonthGlobal = A.top_committer_per_month.maxBucket(
    { bucket_path: 'commits_per_month>top_committer_per_month' }
  )

  const { body: topMonths } = await client.search({
    index: 'git',
    body: Q(
      // we want to know the top month for 'delvedor'
      Q.filter(Q.term('author', 'delvedor')),
      Q.size(0),
      A(commitsPerMonth, topCommittersPerMonthGlobal)
    )
  })

  console.log(topMonths)
}

run().catch(console.log)
