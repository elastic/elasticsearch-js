# IndicesDataStreamsStatsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name?` | [`Indices`](Indices.md) | Comma-separated list of data streams used to limit the request.
Wildcard expressions (`*`) are supported.
To target all data streams in a cluster, omit this parameter or use `*`. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Type of data stream that wildcard patterns can match.
Supports comma-separated values, such as `open,hidden`. |
| `body?` | `string | { [key: string]: any } & { name?: never, expand_wildcards?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, expand_wildcards?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
