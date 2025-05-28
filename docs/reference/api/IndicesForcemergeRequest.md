# `IndicesForcemergeRequest` [interface-IndicesForcemergeRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified) |
| `body` | string | ({ [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; flush?: never; ignore_unavailable?: never; max_num_segments?: never; only_expunge_deletes?: never; wait_for_completion?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Whether to expand wildcard expression to concrete indices that are open, closed or both. |
| `flush` | boolean | Specify whether the index should be flushed after performing the operation (default: true) |
| `ignore_unavailable` | boolean | Whether specified concrete indices should be ignored when unavailable (missing or closed) |
| `index` | [Indices](./Indices.md) | A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices |
| `max_num_segments` | [long](./long.md) | The number of segments the index should be merged into (default: dynamic) |
| `only_expunge_deletes` | boolean | Specify whether the operation should only expunge deleted documents |
| `querystring` | { [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; flush?: never; ignore_unavailable?: never; max_num_segments?: never; only_expunge_deletes?: never; wait_for_completion?: never; } | All values in `querystring` will be added to the request querystring. |
| `wait_for_completion` | boolean | Should the request wait until the force merge is completed. |
