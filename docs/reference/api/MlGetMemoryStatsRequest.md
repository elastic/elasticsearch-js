# `MlGetMemoryStatsRequest` [interface-MlGetMemoryStatsRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { node_id?: never; master_timeout?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `node_id` | [Id](./Id.md) | The names of particular nodes in the cluster to target. For example, `nodeId1,nodeId2` or `ml:true` |
| `querystring` | { [key: string]: any; } & { node_id?: never; master_timeout?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
