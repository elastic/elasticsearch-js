## Interface `IngestGetIpLocationDatabaseRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `id` | [Ids](./Ids.md) | Comma-separated list of database configuration IDs to retrieve. Wildcard ( `*`) expressions are supported. To get all database configurations, omit this parameter or use `*`. |
| `master_timeout` | [Duration](./Duration.md) | The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. A value of `-1` indicates that the request should never time out. |
| `querystring` | { [key: string]: any; } & { id?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
