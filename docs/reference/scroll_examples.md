---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/scroll_examples.html
---

# Scroll [scroll_examples]

While a search request returns a single “page” of results, the scroll API can be used to retrieve large numbers of results (or even all results) from a single search request, in much the same way as you would use a cursor on a traditional database.

Scrolling is not intended for real time user requests, but rather for processing large amounts of data, for example in order to reindex the contents of one index into a new index with a different configuration.

::::{note}
The results that are returned from a scroll request reflect the state of the index at the time that the initial search request was made, like a snapshot in time. Subsequent changes to documents (index, update or delete) will only affect later search requests.
::::


In order to use scrolling, the initial search request should specify the scroll parameter in the query string, which tells {{es}} how long it should keep the “search context” alive.

::::{note}
Did you know that we provide an helper for sending scroll requests? You can find it [here](/reference/client-helpers.md#scroll-search-helper).
::::


```js
'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

async function run () {
  const allQuotes = []
  const responseQueue = []

  // Let's index some data!
  const bulkResponse = await client.bulk({
    // here we are forcing an index refresh,
    // otherwise we will not get any result
    // in the consequent search
    refresh: true,
    operations: [
      // operation to perform
      { index: { _index: 'game-of-thrones' } },
      // the document to index
      {
        character: 'Ned Stark',
        quote: 'Winter is coming.'
      },

      { index: { _index: 'game-of-thrones' } },
      {
        character: 'Daenerys Targaryen',
        quote: 'I am the blood of the dragon.'
      },

      { index: { _index: 'game-of-thrones' } },
      {
        character: 'Tyrion Lannister',
        quote: 'A mind needs books like a sword needs a whetstone.'
      }
    ]
  })

  if (bulkResponse.errors) {
    console.log(bulkResponse)
    process.exit(1)
  }

  // start things off by searching, setting a scroll timeout, and pushing
  // our first response into the queue to be processed
  const response = await client.search({
    index: 'game-of-thrones',
    // keep the search results "scrollable" for 30 seconds
    scroll: '30s',
    // for the sake of this example, we will get only one result per search
    size: 1,
    // filter the source to only include the quote field
    _source: ['quote'],
    query: {
      match_all: {}
    }
  })

  responseQueue.push(response)

  while (responseQueue.length) {
    const body = responseQueue.shift()

    // collect the titles from this response
    body.hits.hits.forEach(function (hit) {
      allQuotes.push(hit._source.quote)
    })

    // check to see if we have collected all of the quotes
    if (body.hits.total.value === allQuotes.length) {
      console.log('Every quote', allQuotes)
      break
    }

    // get the next response if there are more quotes to fetch
    responseQueue.push(
      await client.scroll({
        scroll_id: body._scroll_id,
        scroll: '30s'
      })
    )
  }
}

run().catch(console.log)
```

Another cool usage of the `scroll` API can be done with Node.js ≥ 10, by using async iteration!

```js
'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

// Scroll utility
async function * scrollSearch (params) {
  let response = await client.search(params)

  while (true) {
    const sourceHits = response.hits.hits

    if (sourceHits.length === 0) {
      break
    }

    for (const hit of sourceHits) {
      yield hit
    }

    if (!response._scroll_id) {
      break
    }

    response = await client.scroll({
      scroll_id: response._scroll_id,
      scroll: params.scroll
    })
  }
}

async function run () {
  await client.bulk({
    refresh: true,
    operations: [
      { index: { _index: 'game-of-thrones' } },
      {
        character: 'Ned Stark',
        quote: 'Winter is coming.'
      },

      { index: { _index: 'game-of-thrones' } },
      {
        character: 'Daenerys Targaryen',
        quote: 'I am the blood of the dragon.'
      },

      { index: { _index: 'game-of-thrones' } },
      {
        character: 'Tyrion Lannister',
        quote: 'A mind needs books like a sword needs a whetstone.'
      }
    ]
  })

  const params = {
    index: 'game-of-thrones',
    scroll: '30s',
    size: 1,
    _source: ['quote'],
    query: {
      match_all: {}
    }
  }

  for await (const hit of scrollSearch(params)) {
    console.log(hit._source)
  }
}

run().catch(console.log)
```

