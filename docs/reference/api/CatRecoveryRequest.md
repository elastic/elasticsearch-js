## Interface `CatRecoveryRequest`

| Name | Type | Description |
| - | - | - |
| `active_only` | boolean | If `true`, the response only includes ongoing shard recoveries. |
| `body` | string | ({ [key: string]: any; } & { index?: never; active_only?: never; bytes?: never; detailed?: never; h?: never; s?: never; time?: never; }) | All values in `body` will be added to the request body. |
| `bytes` | [Bytes](./Bytes.md) | The unit used to display byte values. |
| `detailed` | boolean | If `true`, the response includes detailed information about shard recoveries. |
| `h` | [Names](./Names.md) | List of columns to appear in the response. Supports simple wildcards. |
| `index` | [Indices](./Indices.md) | A comma-separated list of data streams, indices, and aliases used to limit the request. Supports wildcards ( `*`). To target all data streams and indices, omit this parameter or use `*` or `_all`. |
| `querystring` | { [key: string]: any; } & { index?: never; active_only?: never; bytes?: never; detailed?: never; h?: never; s?: never; time?: never; } | All values in `querystring` will be added to the request querystring. |
| `s` | [Names](./Names.md) | List of columns that determine how the table should be sorted. Sorting defaults to ascending and can be changed by setting `:asc` or `:desc` as a suffix to the column name. |
| `time` | [TimeUnit](./TimeUnit.md) | Unit used to display time values. |
