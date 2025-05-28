# `ClusterPendingTasksRequest` [interface-ClusterPendingTasksRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { local?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `local` | boolean | If `true`, the request retrieves information from the local node only. If `false`, information is retrieved from the master node. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `querystring` | { [key: string]: any; } & { local?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
