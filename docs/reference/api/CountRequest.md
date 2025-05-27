## Interface `CountRequest`

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`. |
| `analyze_wildcard` | boolean | If `true`, wildcard and prefix queries are analyzed. This parameter can be used only when the `q` query string parameter is specified. |
| `analyzer` | string | The analyzer to use for the query string. This parameter can be used only when the `q` query string parameter is specified. |
| `body` | string | ({ [key: string]: any; } & { index?: never; allow_no_indices?: never; analyzer?: never; analyze_wildcard?: never; default_operator?: never; df?: never; expand_wildcards?: never; ignore_throttled?: never; ignore_unavailable?: never; lenient?: never; min_score?: never; preference?: never; routing?: never; terminate_after?: never; q?: never; query?: never; }) | All values in `body` will be added to the request body. |
| `default_operator` | [QueryDslOperator](./QueryDslOperator.md) | The default operator for query string query: `AND` or `OR`. This parameter can be used only when the `q` query string parameter is specified. |
| `df` | string | The field to use as a default when no field prefix is given in the query string. This parameter can be used only when the `q` query string parameter is specified. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | The type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. It supports comma-separated values, such as `open,hidden`. |
| `ignore_throttled` | boolean | If `true`, concrete, expanded, or aliased indices are ignored when frozen. |
| `ignore_unavailable` | boolean | If `false`, the request returns an error if it targets a missing or closed index. |
| `index` | [Indices](./Indices.md) | A comma-separated list of data streams, indices, and aliases to search. It supports wildcards ( `*`). To search all data streams and indices, omit this parameter or use `*` or `_all`. |
| `lenient` | boolean | If `true`, format-based query failures (such as providing text to a numeric field) in the query string will be ignored. This parameter can be used only when the `q` query string parameter is specified. |
| `min_score` | [double](./double.md) | The minimum `_score` value that documents must have to be included in the result. |
| `preference` | string | The node or shard the operation should be performed on. By default, it is random. |
| `q` | string | The query in Lucene query string syntax. This parameter cannot be used with a request body. |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Defines the search query using Query DSL. A request body query cannot be used with the `q` query string parameter. |
| `querystring` | { [key: string]: any; } & { index?: never; allow_no_indices?: never; analyzer?: never; analyze_wildcard?: never; default_operator?: never; df?: never; expand_wildcards?: never; ignore_throttled?: never; ignore_unavailable?: never; lenient?: never; min_score?: never; preference?: never; routing?: never; terminate_after?: never; q?: never; query?: never; } | All values in `querystring` will be added to the request querystring. |
| `routing` | [Routing](./Routing.md) | A custom value used to route operations to a specific shard. |
| `terminate_after` | [long](./long.md) | The maximum number of documents to collect for each shard. If a query reaches this limit, Elasticsearch terminates the query early. Elasticsearch collects documents before sorting. IMPORTANT: Use with caution. Elasticsearch applies this parameter to each shard handling the request. When possible, let Elasticsearch perform early termination automatically. Avoid specifying this parameter for requests that target data streams with backing indices across multiple data tiers. |
