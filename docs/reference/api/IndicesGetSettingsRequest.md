# `IndicesGetSettingsRequest` [interface-IndicesGetSettingsRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with foo but no index starts with `bar`. |
| `body` | string | ({ [key: string]: any; } & { index?: never; name?: never; allow_no_indices?: never; expand_wildcards?: never; flat_settings?: never; ignore_unavailable?: never; include_defaults?: never; local?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports comma-separated values, such as `open,hidden`. |
| `flat_settings` | boolean | If `true`, returns settings in flat format. |
| `ignore_unavailable` | boolean | If `false`, the request returns an error if it targets a missing or closed index. |
| `include_defaults` | boolean | If `true`, return all default settings in the response. |
| `index` | [Indices](./Indices.md) | Comma-separated list of data streams, indices, and aliases used to limit the request. Supports wildcards ( `*`). To target all data streams and indices, omit this parameter or use `*` or `_all`. |
| `local` | boolean | If `true`, the request retrieves information from the local node only. If `false`, information is retrieved from the master node. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `name` | [Names](./Names.md) | Comma-separated list or wildcard expression of settings to retrieve. |
| `querystring` | { [key: string]: any; } & { index?: never; name?: never; allow_no_indices?: never; expand_wildcards?: never; flat_settings?: never; ignore_unavailable?: never; include_defaults?: never; local?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
