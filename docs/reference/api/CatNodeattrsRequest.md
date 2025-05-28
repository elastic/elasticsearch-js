# `CatNodeattrsRequest` [interface-CatNodeattrsRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { h?: never; s?: never; local?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `h` | [Names](./Names.md) | List of columns to appear in the response. Supports simple wildcards. |
| `local` | boolean | If `true`, the request computes the list of selected nodes from the local cluster state. If `false` the list of selected nodes are computed from the cluster state of the master node. In both cases the coordinating node will send requests for further information to each selected node. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. |
| `querystring` | { [key: string]: any; } & { h?: never; s?: never; local?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `s` | [Names](./Names.md) | List of columns that determine how the table should be sorted. Sorting defaults to ascending and can be changed by setting `:asc` or `:desc` as a suffix to the column name. |
