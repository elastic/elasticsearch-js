# `CatShardsRequest` [interface-CatShardsRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; bytes?: never; h?: never; s?: never; master_timeout?: never; time?: never; }) | All values in `body` will be added to the request body. |
| `bytes` | [Bytes](./Bytes.md) | The unit used to display byte values. |
| `h` | [Names](./Names.md) | List of columns to appear in the response. Supports simple wildcards. |
| `index` | [Indices](./Indices.md) | A comma-separated list of data streams, indices, and aliases used to limit the request. Supports wildcards ( `*`). To target all data streams and indices, omit this parameter or use `*` or `_all`. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. |
| `querystring` | { [key: string]: any; } & { index?: never; bytes?: never; h?: never; s?: never; master_timeout?: never; time?: never; } | All values in `querystring` will be added to the request querystring. |
| `s` | [Names](./Names.md) | List of columns that determine how the table should be sorted. Sorting defaults to ascending and can be changed by setting `:asc` or `:desc` as a suffix to the column name. |
| `time` | [TimeUnit](./TimeUnit.md) | Unit used to display time values. |
