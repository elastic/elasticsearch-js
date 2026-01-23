# CatIndicesRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`Indices`](Indices.md) | Comma-separated list of data streams, indices, and aliases used to limit the request.
Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | The type of index that wildcard patterns can match. |
| `health?` | [`HealthStatus`](HealthStatus.md) | The health status used to limit returned indices. By default, the response includes indices of any health status. |
| `include_unloaded_segments?` | `boolean` | If true, the response includes information from segments that are not loaded into memory. |
| `pri?` | `boolean` | If true, the response only includes information from primary shards. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. |
| `h?` | [`CatCatIndicesColumns`](CatCatIndicesColumns.md) | A comma-separated list of columns names to display. It supports simple wildcards. |
| `s?` | [`Names`](Names.md) | List of columns that determine how the table should be sorted.
Sorting defaults to ascending and can be changed by setting `:asc`
or `:desc` as a suffix to the column name. |
| `body?` | `string | { [key: string]: any } & { index?: never, expand_wildcards?: never, health?: never, include_unloaded_segments?: never, pri?: never, master_timeout?: never, h?: never, s?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, expand_wildcards?: never, health?: never, include_unloaded_segments?: never, pri?: never, master_timeout?: never, h?: never, s?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
