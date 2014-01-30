# elasticsearch-js changelog

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