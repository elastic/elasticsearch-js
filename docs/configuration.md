
The `Client` constructor accepts a single object as it's argument, and the following keys can be used to configure that client instance:

```js
var elasticsearch = require('elasticsearch');
var es = new elasticsearch.Client({
  ...
});
```

### hosts
Type: `String`, `String[]` or `Object[]`

Default:
```js
hosts: [
  {
    host: 'localhost', port: '9200', protocol: 'http'
  }
]
```

Specify the list of hosts that this client will connect to. If sniffing is enabled, or you call sniff, this list will be used as seeds for discovery of the rest of the cluster.

### log
Type: `String`, `String[]`, `Object`, `Object[]`, or `Constructor`

Default:
```js
log: {
  type: 'stdio',
  levels: ['error', 'warning']
}
```

Unless a constructor is specified, this sets the output settings for the bundled logger. See [setting up logging](docs/setting_up_logging.md) for more information.

### connectionClass
Type: `String`, `Constructor`

Default:
 - Node: `'http'`
 - Browser: `'xhr'`
 - Angular Build: `'angular'`
 - jQuery Build: `'jquery'`

Defines the class that will be used to create connections. If you are looking to implement a protocol besides HTTP you will probably start by writing a Connection class and specifying it here.

### selector
Type: `String`, `Function`

Default: `'roundRobin'`

Options:
  - `'roundRobin'`
  - `'random'`

This function will be used to select a connection from the ConnectionPool. It should received a single argument, the list of "active" connections, and return the connection to use. Use this selector to implement special logic for your client such as preferring nodes in a certain rack or data-center.

To make this function asynchronous, accept a second argument which will be the callback to use. The callback should be called Node-style, with a possible error like `cb(err, selectedConnection)`.

### sniffOnStart
Type: `Boolean`

Default: `false`

Should the client attempt to detect the rest of the cluster when it is first instantiated?

### sniffAfterRequests
Type: `Number` or `false`

Default: `false`

After `n` requests, perform a sniff operation and ensure our list of nodes is up to date.


### sniffOnConnectionFail
Type: `Boolean`

Default: `false`

Should the client immediately sniff for a more current list of nodes when a connection dies? (see [node death](#node-death))

### maxRetries
Type: `Number`

Defailt: `3`

How many times should the client try to connect to other nodes before returning a [ConnectionFault](docs/error.md#connectionfault) error. (see [node death](#node-death))

### timeout
Type: `Number`

Default: 10000

How many milliseconds can the connection take before the request is aborted and retried. (TODO: timeout errors shouldn't cause a retry).

### deadTimeout
Type: `Number`

Default: 30000

How many milliseconds should a dead connection/node sit and wait before it is ping-ed? (see [node death](#node-death))

### maxSockets
Type: `Number`

Default: 10

How many sockets should a connection keep to it's corresponding Elasticsearch node? These sockets are currently kept alive ***forever*** (not like nodes current "keep alive" sockets).

### nodesToHostCallback
Type: `Function`

Default: simple, not much going on [here](src/lib/client_config.js#L65).

This function will receive a list of nodes received during a sniff. The list of nodes should be transformed into an array of objects which will each be used to create [Host](src/lib/host.js) objects. (TODO: allow this function to be async).
