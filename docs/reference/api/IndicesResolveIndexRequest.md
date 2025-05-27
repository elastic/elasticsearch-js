## Interface `IndicesResolveIndexRequest`

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`. |
| `body` | string | ({ [key: string]: any; } & { name?: never; expand_wildcards?: never; ignore_unavailable?: never; allow_no_indices?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports comma-separated values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`. |
| `ignore_unavailable` | boolean | If `false`, the request returns an error if it targets a missing or closed index. |
| `name` | [Names](./Names.md) | Comma-separated name(s) or index pattern(s) of the indices, aliases, and data streams to resolve. Resources on remote clusters can be specified using the `<cluster>`: `<name>` syntax. |
| `querystring` | { [key: string]: any; } & { name?: never; expand_wildcards?: never; ignore_unavailable?: never; allow_no_indices?: never; } | All values in `querystring` will be added to the request querystring. |
