# `CcrStatsRequest` [interface-CcrStatsRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { master_timeout?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | The period to wait for a connection to the master node. If the master node is not available before the timeout expires, the request fails and returns an error. It can also be set to `-1` to indicate that the request should never timeout. |
| `querystring` | { [key: string]: any; } & { master_timeout?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
