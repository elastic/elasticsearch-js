# IndicesFieldUsageStatsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`Indices`](Indices.md) | Comma-separated list or wildcard expression of index names used to limit the request. |
| `allow_no_indices?` | `boolean` | If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices.
This behavior applies even if the request targets other open indices.
For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Type of index that wildcard patterns can match.
If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams.
Supports comma-separated values, such as `open,hidden`. |
| `ignore_unavailable?` | `boolean` | If `true`, missing or closed indices are not included in the response. |
| `fields?` | [`Fields`](Fields.md) | Comma-separated list or wildcard expressions of fields to include in the statistics. |
| `body?` | `string | { [key: string]: any } & { index?: never, allow_no_indices?: never, expand_wildcards?: never, ignore_unavailable?: never, fields?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, allow_no_indices?: never, expand_wildcards?: never, ignore_unavailable?: never, fields?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
