---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-testing.html
---

# Testing [client-testing]

Testing is one of the most important parts of developing an application. The client is very flexible when it comes to testing and is compatible with most testing frameworks (such as [`ava`](https://www.npmjs.com/package/ava), which is used in the examples below).

If you are using this client, you are most likely working with {{es}}, and one of the first issues you face is how to test your application. A perfectly valid solution is to use the real {{es}} instance for testing your application, but you would be doing an integration test, while you want a unit test. There are many ways to solve this problem, you could create the database with Docker, or use an in-memory compatible one, but if you are writing unit tests that can be easily parallelized this becomes quite uncomfortable. A different way of improving your testing experience while doing unit tests is to use a mock.

The client is designed to be easy to extend and adapt to your needs. Thanks to its internal architecture it allows you to change some specific components while keeping the rest of it working as usual. Each {{es}} official client is composed of the following components:

* `API layer`: every {{es}} API that you can call.
* `Transport`: a component that takes care of preparing a request before sending it and handling all the retry and sniffing strategies.
* `ConnectionPool`: {{es}} is a cluster and might have multiple nodes, the `ConnectionPool` takes care of them.
* `Serializer`: A class with all the serialization strategies, from the basic JSON to the new line delimited JSON.
* `Connection`: The actual HTTP library.

The best way to mock {{es}} with the official clients is to replace the `Connection` component since it has very few responsibilities and it does not interact with other internal components other than getting requests and returning responses.


## `@elastic/elasticsearch-mock` [_elasticelasticsearch_mock]

Writing each time a mock for your test can be annoying and error-prone, so we have built a simple yet powerful mocking library specifically designed for this client, and you can install it with the following command:

```sh
npm install @elastic/elasticsearch-mock --save-dev
```

With this library you can create custom mocks for any request you can send to {{es}}. It offers a simple and intuitive API and it mocks only the HTTP layer, leaving the rest of the client working as usual.

Before showing all of its features, and what you can do with it, let’s see an example:

```js
const { Client } = require('@elastic/elasticsearch')
const Mock = require('@elastic/elasticsearch-mock')

const mock = new Mock()
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' },
  Connection: mock.getConnection()
})

mock.add({
  method: 'GET',
  path: '/'
}, () => {
  return { status: 'ok' }
})

client.info().then(console.log, console.log)
```

As you can see it works closely with the client itself, once you have created a new instance of the mock library you just need to call the mock.getConnection() method and pass its result to the Connection option of the client. From now on, every request is handled by the mock library,  and the HTTP layer will never be touched. As a result, your test is significantly faster and you are able to easily parallelize them!

The library allows you to write both “strict” and “loose” mocks, which means that you can write a mock that handles a very specific request or be looser and handle a group of request, let’s see this in action:

```js
mock.add({
  method: 'POST',
  path: '/indexName/_search'
}, () => {
  return {
    hits: {
      total: { value: 1, relation: 'eq' },
      hits: [{ _source: { baz: 'faz' } }]
    }
  }
})

mock.add({
  method: 'POST',
  path: '/indexName/_search',
  body: { query: { match: { foo: 'bar' } } }
}, () => {
  return {
    hits: {
      total: { value: 0, relation: 'eq' },
      hits: []
    }
  }
})
```

In the example above, every search request gets the first response, while every search request that uses the query described in the second mock gets the second response.

You can also specify dynamic paths:

```js
mock.add({
  method: 'GET',
  path: '/:index/_count'
}, () => {
  return { count: 42 }
})

client.count({ index: 'foo' }).then(console.log, console.log) // => { count: 42 }
client.count({ index: 'bar' }).then(console.log, console.log) // => { count: 42 }
```

And wildcards are supported as well.

Another very interesting use case is the ability to create a test that randomly fails to see how your code reacts to failures:

```js
mock.add({
  method: 'GET',
  path: '/:index/_count'
}, () => {
  if (Math.random() > 0.8) {
    return ResponseError({ body: {}, statusCode: 500 })
  } else {
    return { count: 42 }
  }
})
```

We have seen how simple is mocking {{es}} and testing your application, you can find many more features and examples in the [module documentation](https://github.com/elastic/elasticsearch-js-mock).

