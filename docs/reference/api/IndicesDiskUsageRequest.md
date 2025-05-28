# `IndicesDiskUsageRequest` [interface-IndicesDiskUsageRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | If false, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`. |
| `body` | string | ({ [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; flush?: never; ignore_unavailable?: never; run_expensive_tasks?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports comma-separated values, such as `open,hidden`. |
| `flush` | boolean | If `true`, the API performs a flush before analysis. If `false`, the response may not include uncommitted data. |
| `ignore_unavailable` | boolean | If `true`, missing or closed indices are not included in the response. |
| `index` | [Indices](./Indices.md) | Comma-separated list of data streams, indices, and aliases used to limit the request. It’s recommended to execute this API with a single index (or the latest backing index of a data stream) as the API consumes resources significantly. |
| `querystring` | { [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; flush?: never; ignore_unavailable?: never; run_expensive_tasks?: never; } | All values in `querystring` will be added to the request querystring. |
| `run_expensive_tasks` | boolean | Analyzing field disk usage is resource-intensive. To use the API, this parameter must be set to `true`. |
