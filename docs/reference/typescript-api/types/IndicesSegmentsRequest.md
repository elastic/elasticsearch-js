# IndicesSegmentsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`Indices`](Indices.md) | Comma-separated list of data streams, indices, and aliases used to limit the request.
Supports wildcards (`*`).
To target all data streams and indices, omit this parameter or use `*` or `_all`. |
| `allow_no_indices?` | `boolean` | If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices.
This behavior applies even if the request targets other open indices. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Type of index that wildcard patterns can match.
If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams.
Supports comma-separated values, such as `open,hidden`. |
| `ignore_unavailable?` | `boolean` | If `false`, the request returns an error if it targets a missing or closed index. |
| `body?` | `string | { [key: string]: any } & { index?: never, allow_no_indices?: never, expand_wildcards?: never, ignore_unavailable?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, allow_no_indices?: never, expand_wildcards?: never, ignore_unavailable?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
