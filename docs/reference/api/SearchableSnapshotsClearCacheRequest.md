# `SearchableSnapshotsClearCacheRequest` [interface-SearchableSnapshotsClearCacheRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified) |
| `body` | string | ({ [key: string]: any; } & { index?: never; expand_wildcards?: never; allow_no_indices?: never; ignore_unavailable?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Whether to expand wildcard expression to concrete indices that are open, closed or both. |
| `ignore_unavailable` | boolean | Whether specified concrete indices should be ignored when unavailable (missing or closed) |
| `index` | [Indices](./Indices.md) | A comma-separated list of data streams, indices, and aliases to clear from the cache. It supports wildcards ( `*`). |
| `querystring` | { [key: string]: any; } & { index?: never; expand_wildcards?: never; allow_no_indices?: never; ignore_unavailable?: never; } | All values in `querystring` will be added to the request querystring. |
