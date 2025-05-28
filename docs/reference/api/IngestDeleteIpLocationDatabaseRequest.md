# `IngestDeleteIpLocationDatabaseRequest` [interface-IngestDeleteIpLocationDatabaseRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; master_timeout?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `id` | [Ids](./Ids.md) | A comma-separated list of IP location database configurations. |
| `master_timeout` | [Duration](./Duration.md) | The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. A value of `-1` indicates that the request should never time out. |
| `querystring` | { [key: string]: any; } & { id?: never; master_timeout?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. A value of `-1` indicates that the request should never time out. |
