### Examples
#### create the client
```js
var es = new elasticsearch.Client({
  hosts: [
    'localhost:9200'
  ],
  log: 'trace',
  sniffOnStart: true
});
```
#### call an endpoint
```js
es.cluster.nodeInfo({
  clear: true,
  jvm: true,
  os: ture
}, function (err, resp, status) {
    // do your thing
})
```
#### skip the callback to get a promise back
```js
es.search({
  q: 'pants'
}).then(function (resp) {
  // use resp.body and resp.status
}, function (err) {
  // freak out!
})
```
#### abort a request
```js
var req = es.search({
  q: 'robots'
}, function (err, body, status) {
  clearTimeout(timeout);
  // do something
});
var timeout = setTimeout(function () {
  req.abort();
}, 200);
```
#### or just use the timeout param
```js
es.search({
  q: '*',
  timeout: 200
}).then(function (resp) {
  // Iterate all the hits
})
```
