# elasticsearch-js changelog

## 1.5 (Feb 6 2014)
- Switched out `keepaliveagent` dependency with `forever-agent`, which is used in the ever popular `request` module, and is much simpler.
- The option to use keep-alive is now all or nothing. `maxKeepAliveTime` and `maxKeepAliveRequests` config parameters have been replaced by `keepAlive`, which will keeps at least `minSockets` connections open forever. See: http://www.elasticsearch.org/guide/en/elasticsearch/client/javascript-api/current/configuration.html#configuration
- Closing the client with `keepAlive` turned on will allow the process to exit. https://github.com/elasticsearch/elasticsearch-js/issues/40
- Fixed a bug that caused invalid param/type errors to not be reported properly, in the browser builds that use promises.
- added the cat.threadPool to the master/1.0/1.x apis
- Enabled Basic auth in the Angular connector -- Thanks @jeff-french!
- Fixed a bug that was preventing index requests (and any other POST/PUT request) from using connections in the connection pool.

## 1.4 (Jan 30 2014)
- The trace log messages will now diaplay the actual host connected to (without auth info) unless they are being written to a bash script
- API Updated with latest changes awaiting 1.0 release

## 1.2/1.3 (Jan 17 2014)
- `apiVersion` config parameter was added. Use this to specify which API the client should provide, we currently offer support for elasticsearch branches "0.90", "1.0", and "master"


## 1.1 (Dec 22 2013)
- Changed the resolution value of promises. Instead of being an object like `{body: ..., status: ...}` it is now
  just the response body.


## 1.0 (Dec 17 2013)
- Initial Release


## pre 1.0
- Another module, now know as es on npm, used the elasticsearch module name. This module had several pre-1.0
  releases so we started at 1.0 to prevent collisions in exiting projects. The history for that project is available [here](https://github.com/ncb000gt/node-es)