# `IndicesDeleteRequest` [interface-IndicesDeleteRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. |
| `body` | string | ({ [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; ignore_unavailable?: never; master_timeout?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports comma-separated values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`. |
| `ignore_unavailable` | boolean | If `false`, the request returns an error if it targets a missing or closed index. |
| `index` | [Indices](./Indices.md) | Comma-separated list of indices to delete. You cannot specify index aliases. By default, this parameter does not support wildcards ( `*`) or `_all`. To use wildcards or `_all`, set the `action.destructive_requires_name` cluster setting to `false`. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `querystring` | { [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; ignore_unavailable?: never; master_timeout?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
