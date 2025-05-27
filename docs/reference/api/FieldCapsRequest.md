## Interface `FieldCapsRequest`

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | If false, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with foo but no index starts with bar. |
| `body` | string | ({ [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; ignore_unavailable?: never; include_unmapped?: never; filters?: never; types?: never; include_empty_fields?: never; fields?: never; index_filter?: never; runtime_mappings?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | The type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports comma-separated values, such as `open,hidden`. |
| `fields` | [Fields](./Fields.md) | A list of fields to retrieve capabilities for. Wildcard ( `*`) expressions are supported. |
| `filters` | string | A comma-separated list of filters to apply to the response. |
| `ignore_unavailable` | boolean | If `true`, missing or closed indices are not included in the response. |
| `include_empty_fields` | boolean | If false, empty fields are not included in the response. |
| `include_unmapped` | boolean | If true, unmapped fields are included in the response. |
| `index_filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Filter indices if the provided query rewrites to `match_none` on every shard. IMPORTANT: The filtering is done on a best-effort basis, it uses index statistics and mappings to rewrite queries to `match_none` instead of fully running the request. For instance a range query over a date field can rewrite to `match_none` if all documents within a shard (including deleted documents) are outside of the provided range. However, not all queries can rewrite to `match_none` so this API may return an index even if the provided filter matches no document. |
| `index` | [Indices](./Indices.md) | A comma-separated list of data streams, indices, and aliases used to limit the request. Supports wildcards (*). To target all data streams and indices, omit this parameter or use * or _all. |
| `querystring` | { [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; ignore_unavailable?: never; include_unmapped?: never; filters?: never; types?: never; include_empty_fields?: never; fields?: never; index_filter?: never; runtime_mappings?: never; } | All values in `querystring` will be added to the request querystring. |
| `runtime_mappings` | [MappingRuntimeFields](./MappingRuntimeFields.md) | Define ad-hoc runtime fields in the request similar to the way it is done in search requests. These fields exist only as part of the query and take precedence over fields defined with the same name in the index mappings. |
| `types` | string[] | A comma-separated list of field types to include. Any fields that do not match one of these types will be excluded from the results. It defaults to empty, meaning that all field types are returned. |
