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
 * Pure functions API
 */
{
  // You can compile a query if you need to get
  // the best performances out of your code.
  // The query crafting and compilation should be done
  // outside of your hot code path.
  // First of all you should create your query almost
  // in the same way as you were doing before, the only
  // difference, is that all the paramegers you are passing
  // now should be updated with the `Q.param` API.
  // The only parameter or `Q.param`, is the name of the parameter
  // that you were passing before.
  const query = Q(
    Q.match('description', Q.param('description')),
    Q.filter(
      Q.term('author.name', Q.param('author'))
    ),
    Q.size(10)
  )

  // Afterwards, you can create an interface that represents
  // the input object of the compiled query. The input object
  // contains all the parameters you were passing before, the
  // keys are the same you have passed to the various `Q.param`
  // invocations before. It defaults to `unknown`.
  interface Input {
    description: string
    author: string
  }
  // In this example we will use `Q.compileUnsafe`, the returned function
  // works in the same way as `Q.compile` but the function returned by the
  // unsafe API is an order of magnitude faster.
  // You should NEVER use `Q.compileUnsafe` with untrusted input.
  // Once you have created the query and the input interface,
  // you must pass the  query to `Q.compileUnsafe` and store the result
  // in a variable. `Q.compile` returns a function that accepts
  // a single object parameter, which is the same you have declared
  // in the interface before.
  const compiledQuery = Q.compileUnsafe<Input>(query)

  async function run () {
    const client = new Client({ node: 'http://localhost:9200' })

    const { body } = await client.search({
      index: 'git',
      // Finally, you call the function inside your hot code path,
      // the returned value will be the query.
      body: compiledQuery({
        description: 'fix',
        author: 'delvedor'
      })
    })

    console.log(body.hits.hits)
  }

  run().catch(console.log)
}

/**
 * Fluent API
 */
{
  // The theory behind query compilation is the same here,
  // the query crafting and compilation should be done
  // outside of your hot code path.
  const query = F()
    .match('description', Q.param('description'))
    .filter(f => f
      .term('author.name', Q.param('author'))
    )
    .size(10)

  interface Input {
    description: string
    author: string
  }

  const compiledQuery = query.compileUnsafe<Input>()

  async function run () {
    const client = new Client({ node: 'http://localhost:9200' })

    const { body } = await client.search({
      index: 'git',
      body: compiledQuery({
        description: 'fix',
        author: 'delvedor'
      })
    })

    console.log(body.hits.hits)
  }

  run().catch(console.log)
}
