---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/sql_query_examples.html
---

# SQL [sql_query_examples]

{{es}} SQL is an X-Pack component that allows SQL-like queries to be executed in real-time against {{es}}. Whether using the REST interface, command-line or JDBC, any client can use SQL to search and aggregate data natively inside {{es}}. One can think of {{es}} SQL as a translator, one that understands both SQL and {{es}} and makes it easy to read and process data in real-time, at scale by leveraging {{es}} capabilities.

In the following example we will search all the documents that has the field `house` equals to `stark`, log the result with the tabular view and then manipulate the result to obtain an object easy to navigate.

```js
'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

async function run () {
  await client.index({
    index: 'game-of-thrones',
    document: {
      character: 'Ned Stark',
      quote: 'Winter is coming.',
      house: 'stark'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    document: {
      character: 'Arya Stark',
      quote: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
      house: 'stark'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    refresh: true,
    document: {
      character: 'Tyrion Lannister',
      quote: 'A Lannister always pays his debts.',
      house: 'lannister'
    }
  })

  const result = await client.sql.query({
    query: "SELECT * FROM \"game-of-thrones\" WHERE house='stark'"
  })

  console.log(result)

  const data = result.rows.map(row => {
    const obj = {}
    for (let i = 0; i < row.length; i++) {
      obj[result.columns[i].name] = row[i]
    }
    return obj
  })

  console.log(data)
}

run().catch(console.log)
```

