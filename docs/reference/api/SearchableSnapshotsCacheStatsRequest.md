## Interface `SearchableSnapshotsCacheStatsRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { node_id?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | &nbsp; |
| `node_id` | [NodeIds](./NodeIds.md) | The names of the nodes in the cluster to target. |
| `querystring` | { [key: string]: any; } & { node_id?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
