## Interface `CatNodesRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { bytes?: never; full_id?: never; include_unloaded_segments?: never; h?: never; s?: never; master_timeout?: never; time?: never; }) | All values in `body` will be added to the request body. |
| `bytes` | [Bytes](./Bytes.md) | The unit used to display byte values. |
| `full_id` | boolean | string | If `true`, return the full node ID. If `false`, return the shortened node ID. |
| `h` | [CatCatNodeColumns](./CatCatNodeColumns.md) | A comma-separated list of columns names to display. It supports simple wildcards. |
| `include_unloaded_segments` | boolean | If true, the response includes information from segments that are not loaded into memory. |
| `master_timeout` | [Duration](./Duration.md) | The period to wait for a connection to the master node. |
| `querystring` | { [key: string]: any; } & { bytes?: never; full_id?: never; include_unloaded_segments?: never; h?: never; s?: never; master_timeout?: never; time?: never; } | All values in `querystring` will be added to the request querystring. |
| `s` | [Names](./Names.md) | A comma-separated list of column names or aliases that determines the sort order. Sorting defaults to ascending and can be changed by setting `:asc` or `:desc` as a suffix to the column name. |
| `time` | [TimeUnit](./TimeUnit.md) | The unit used to display time values. |
