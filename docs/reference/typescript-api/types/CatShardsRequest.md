# CatShardsRequest

## Interface

### Extends

- [`CatCatRequestBase`](CatCatRequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`Indices`](Indices.md) | A comma-separated list of data streams, indices, and aliases used to limit the request.
Supports wildcards (`*`).
To target all data streams and indices, omit this parameter or use `*` or `_all`. |
| `h?` | [`CatCatShardColumns`](CatCatShardColumns.md) | List of columns to appear in the response. Supports simple wildcards. |
| `s?` | [`Names`](Names.md) | A comma-separated list of column names or aliases that determines the sort order.
Sorting defaults to ascending and can be changed by setting `:asc`
or `:desc` as a suffix to the column name. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node. |
| `body?` | `string | { [key: string]: any } & { index?: never, h?: never, s?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, h?: never, s?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
