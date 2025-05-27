## Interface `CatIndicesRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; bytes?: never; expand_wildcards?: never; health?: never; include_unloaded_segments?: never; pri?: never; time?: never; master_timeout?: never; h?: never; s?: never; }) | All values in `body` will be added to the request body. |
| `bytes` | [Bytes](./Bytes.md) | The unit used to display byte values. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | The type of index that wildcard patterns can match. |
| `h` | [Names](./Names.md) | List of columns to appear in the response. Supports simple wildcards. |
| `health` | [HealthStatus](./HealthStatus.md) | The health status used to limit returned indices. By default, the response includes indices of any health status. |
| `include_unloaded_segments` | boolean | If true, the response includes information from segments that are not loaded into memory. |
| `index` | [Indices](./Indices.md) | Comma-separated list of data streams, indices, and aliases used to limit the request. Supports wildcards ( `*`). To target all data streams and indices, omit this parameter or use `*` or `_all`. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. |
| `pri` | boolean | If true, the response only includes information from primary shards. |
| `querystring` | { [key: string]: any; } & { index?: never; bytes?: never; expand_wildcards?: never; health?: never; include_unloaded_segments?: never; pri?: never; time?: never; master_timeout?: never; h?: never; s?: never; } | All values in `querystring` will be added to the request querystring. |
| `s` | [Names](./Names.md) | List of columns that determine how the table should be sorted. Sorting defaults to ascending and can be changed by setting `:asc` or `:desc` as a suffix to the column name. |
| `time` | [TimeUnit](./TimeUnit.md) | The unit used to display time values. |
