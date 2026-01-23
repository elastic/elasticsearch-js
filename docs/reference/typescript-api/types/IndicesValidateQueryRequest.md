# IndicesValidateQueryRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`Indices`](Indices.md) | Comma-separated list of data streams, indices, and aliases to search.
Supports wildcards (`*`).
To search all data streams or indices, omit this parameter or use `*` or `_all`. |
| `allow_no_indices?` | `boolean` | If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices.
This behavior applies even if the request targets other open indices. |
| `all_shards?` | `boolean` | If `true`, the validation is executed on all shards instead of one random shard per index. |
| `analyzer?` | `string` | Analyzer to use for the query string.
This parameter can only be used when the `q` query string parameter is specified. |
| `analyze_wildcard?` | `boolean` | If `true`, wildcard and prefix queries are analyzed. |
| `default_operator?` | [`QueryDslOperator`](QueryDslOperator.md) | The default operator for query string query: `and` or `or`. |
| `df?` | `string` | Field to use as default where no field prefix is given in the query string.
This parameter can only be used when the `q` query string parameter is specified. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Type of index that wildcard patterns can match.
If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams.
Supports comma-separated values, such as `open,hidden`. |
| `explain?` | `boolean` | If `true`, the response returns detailed information if an error has occurred. |
| `ignore_unavailable?` | `boolean` | If `false`, the request returns an error if it targets a missing or closed index. |
| `lenient?` | `boolean` | If `true`, format-based query failures (such as providing text to a numeric field) in the query string will be ignored. |
| `rewrite?` | `boolean` | If `true`, returns a more detailed explanation showing the actual Lucene query that will be executed. |
| `q?` | `string` | Query in the Lucene query string syntax. |
| `query?` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | Query in the Lucene query string syntax. |
| `body?` | `string | { [key: string]: any } & { index?: never, allow_no_indices?: never, all_shards?: never, analyzer?: never, analyze_wildcard?: never, default_operator?: never, df?: never, expand_wildcards?: never, explain?: never, ignore_unavailable?: never, lenient?: never, rewrite?: never, q?: never, query?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, allow_no_indices?: never, all_shards?: never, analyzer?: never, analyze_wildcard?: never, default_operator?: never, df?: never, expand_wildcards?: never, explain?: never, ignore_unavailable?: never, lenient?: never, rewrite?: never, q?: never, query?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
