# `IndicesReloadSearchAnalyzersRequest` [interface-IndicesReloadSearchAnalyzersRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified) |
| `body` | string | ({ [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; ignore_unavailable?: never; resource?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Whether to expand wildcard expression to concrete indices that are open, closed or both. |
| `ignore_unavailable` | boolean | Whether specified concrete indices should be ignored when unavailable (missing or closed) |
| `index` | [Indices](./Indices.md) | A comma-separated list of index names to reload analyzers for |
| `querystring` | { [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; ignore_unavailable?: never; resource?: never; } | All values in `querystring` will be added to the request querystring. |
| `resource` | string | Changed resource to reload analyzers from if applicable |
