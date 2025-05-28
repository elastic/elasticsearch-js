# `IndicesGetFieldMappingRequest` [interface-IndicesGetFieldMappingRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. |
| `body` | string | ({ [key: string]: any; } & { fields?: never; index?: never; allow_no_indices?: never; expand_wildcards?: never; ignore_unavailable?: never; include_defaults?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports comma-separated values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`. |
| `fields` | [Fields](./Fields.md) | Comma-separated list or wildcard expression of fields used to limit returned information. Supports wildcards ( `*`). |
| `ignore_unavailable` | boolean | If `false`, the request returns an error if it targets a missing or closed index. |
| `include_defaults` | boolean | If `true`, return all default settings in the response. |
| `index` | [Indices](./Indices.md) | Comma-separated list of data streams, indices, and aliases used to limit the request. Supports wildcards ( `*`). To target all data streams and indices, omit this parameter or use `*` or `_all`. |
| `querystring` | { [key: string]: any; } & { fields?: never; index?: never; allow_no_indices?: never; expand_wildcards?: never; ignore_unavailable?: never; include_defaults?: never; } | All values in `querystring` will be added to the request querystring. |
