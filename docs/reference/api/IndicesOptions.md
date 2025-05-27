## Interface `IndicesOptions`

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | If false, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports comma-separated values, such as `open,hidden`. |
| `ignore_throttled` | boolean | If true, concrete, expanded or aliased indices are ignored when frozen. |
| `ignore_unavailable` | boolean | If true, missing or closed indices are not included in the response. |
