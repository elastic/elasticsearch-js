## Interface `SnapshotGetRepositoryRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; local?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `local` | boolean | If `true`, the request gets information from the local node only. If `false`, the request gets information from the master node. |
| `master_timeout` | [Duration](./Duration.md) | The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`. |
| `name` | [Names](./Names.md) | A comma-separated list of snapshot repository names used to limit the request. Wildcard ( `*`) expressions are supported including combining wildcards with exclude patterns starting with `-`. To get information about all snapshot repositories registered in the cluster, omit this parameter or use `*` or `_all`. |
| `querystring` | { [key: string]: any; } & { name?: never; local?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
