---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html
---

# JavaScript [introduction]

This is the official Node.js client for {{es}}. This page gives a quick overview about the features of the client.

## Features [_features]

* One-to-one mapping with REST API.
* Generalized, pluggable architecture.
* Configurable, automatic discovery of cluster nodes.
* Persistent, Keep-Alive connections.
* Load balancing across all available nodes.
* Child client support.
* TypeScript support out of the box.

### Install multiple versions [_install_multiple_versions]

If you are using multiple versions of {{es}}, you need to use multiple versions of the client as well. In the past, installing multiple versions of the same package was not possible, but with `npm v6.9`, you can do it via aliasing.

To install different version of the client, run the following command:

```sh
npm install <alias>@npm:@elastic/elasticsearch@<version>
```

For example, if you need to install `7.x` and `6.x`, run the following commands:

```sh
npm install es6@npm:@elastic/elasticsearch@6
npm install es7@npm:@elastic/elasticsearch@7
```

Your `package.json` will look similar to the following example:

```json
"dependencies": {
  "es6": "npm:@elastic/elasticsearch@^6.7.0",
  "es7": "npm:@elastic/elasticsearch@^7.0.0"
}
```

Require the packages from your code by using the alias you have defined.

```js
const { Client: Client6 } = require('es6')
const { Client: Client7 } = require('es7')

const client6 = new Client6({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})
const client7 = new Client7({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

client6.info().then(console.log, console.log)
client7.info().then(console.log, console.log)
```

Finally, if you want to install the client for the next version of {{es}} (the one that lives in the {{es}} main branch), use the following command:

```sh
npm install esmain@github:elastic/elasticsearch-js
```

::::{warning}
This command installs the main branch of the client which is not considered stable.
::::
