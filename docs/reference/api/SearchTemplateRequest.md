# `SearchTemplateRequest` [interface-SearchTemplateRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`. |
| `body` | string | ({ [key: string]: any; } & { index?: never; allow_no_indices?: never; ccs_minimize_roundtrips?: never; expand_wildcards?: never; ignore_throttled?: never; ignore_unavailable?: never; preference?: never; routing?: never; scroll?: never; search_type?: never; rest_total_hits_as_int?: never; typed_keys?: never; explain?: never; id?: never; params?: never; profile?: never; source?: never; }) | All values in `body` will be added to the request body. |
| `ccs_minimize_roundtrips` | boolean | If `true`, network round-trips are minimized for cross-cluster search requests. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | The type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports comma-separated values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`. |
| `explain` | boolean | If `true`, returns detailed information about score calculation as part of each hit. If you specify both this and the `explain` query parameter, the API uses only the query parameter. |
| `id` | [Id](./Id.md) | The ID of the search template to use. If no `source` is specified, this parameter is required. |
| `ignore_throttled` | boolean | If `true`, specified concrete, expanded, or aliased indices are not included in the response when throttled. |
| `ignore_unavailable` | boolean | If `false`, the request returns an error if it targets a missing or closed index. |
| `index` | [Indices](./Indices.md) | A comma-separated list of data streams, indices, and aliases to search. It supports wildcards ( `*`). |
| `params` | Record<string, any> | Key-value pairs used to replace Mustache variables in the template. The key is the variable name. The value is the variable value. |
| `preference` | string | The node or shard the operation should be performed on. It is random by default. |
| `profile` | boolean | If `true`, the query execution is profiled. |
| `querystring` | { [key: string]: any; } & { index?: never; allow_no_indices?: never; ccs_minimize_roundtrips?: never; expand_wildcards?: never; ignore_throttled?: never; ignore_unavailable?: never; preference?: never; routing?: never; scroll?: never; search_type?: never; rest_total_hits_as_int?: never; typed_keys?: never; explain?: never; id?: never; params?: never; profile?: never; source?: never; } | All values in `querystring` will be added to the request querystring. |
| `rest_total_hits_as_int` | boolean | If `true`, `hits.total` is rendered as an integer in the response. If `false`, it is rendered as an object. |
| `routing` | [Routing](./Routing.md) | A custom value used to route operations to a specific shard. |
| `scroll` | [Duration](./Duration.md) | Specifies how long a consistent view of the index should be maintained for scrolled search. |
| `search_type` | [SearchType](./SearchType.md) | The type of the search operation. |
| `source` | [ScriptSource](./ScriptSource.md) | An inline search template. Supports the same parameters as the search API's request body. It also supports Mustache variables. If no `id` is specified, this parameter is required. |
| `typed_keys` | boolean | If `true`, the response prefixes aggregation and suggester names with their respective types. |
