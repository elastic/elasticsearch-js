## Interface `CatSnapshotsRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { repository?: never; ignore_unavailable?: never; h?: never; s?: never; master_timeout?: never; time?: never; }) | All values in `body` will be added to the request body. |
| `h` | [Names](./Names.md) | List of columns to appear in the response. Supports simple wildcards. |
| `ignore_unavailable` | boolean | If `true`, the response does not include information from unavailable snapshots. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. |
| `querystring` | { [key: string]: any; } & { repository?: never; ignore_unavailable?: never; h?: never; s?: never; master_timeout?: never; time?: never; } | All values in `querystring` will be added to the request querystring. |
| `repository` | [Names](./Names.md) | A comma-separated list of snapshot repositories used to limit the request. Accepts wildcard expressions. `_all` returns all repositories. If any repository fails during the request, Elasticsearch returns an error. |
| `s` | [Names](./Names.md) | List of columns that determine how the table should be sorted. Sorting defaults to ascending and can be changed by setting `:asc` or `:desc` as a suffix to the column name. |
| `time` | [TimeUnit](./TimeUnit.md) | Unit used to display time values. |
