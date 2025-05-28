# `WatcherStopRequest` [interface-WatcherStopRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`. |
| `querystring` | { [key: string]: any; } & { master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
