# `MsearchTemplateRequest` [interface-MsearchTemplateRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; ccs_minimize_roundtrips?: never; max_concurrent_searches?: never; search_type?: never; rest_total_hits_as_int?: never; typed_keys?: never; search_templates?: never; }) | All values in `body` will be added to the request body. |
| `ccs_minimize_roundtrips` | boolean | If `true`, network round-trips are minimized for cross-cluster search requests. |
| `index` | [Indices](./Indices.md) | A comma-separated list of data streams, indices, and aliases to search. It supports wildcards ( `*`). To search all data streams and indices, omit this parameter or use `*`. |
| `max_concurrent_searches` | [long](./long.md) | The maximum number of concurrent searches the API can run. |
| `querystring` | { [key: string]: any; } & { index?: never; ccs_minimize_roundtrips?: never; max_concurrent_searches?: never; search_type?: never; rest_total_hits_as_int?: never; typed_keys?: never; search_templates?: never; } | All values in `querystring` will be added to the request querystring. |
| `rest_total_hits_as_int` | boolean | If `true`, the response returns `hits.total` as an integer. If `false`, it returns `hits.total` as an object. |
| `search_templates` | [MsearchTemplateRequestItem](./MsearchTemplateRequestItem.md)[] | &nbsp; |
| `search_type` | [SearchType](./SearchType.md) | The type of the search operation. |
| `typed_keys` | boolean | If `true`, the response prefixes aggregation and suggester names with their respective types. |
