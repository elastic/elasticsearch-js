# CatRecoveryRequest

## Interface

### Extends

- [`CatCatRequestBase`](CatCatRequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`Indices`](Indices.md) | A comma-separated list of data streams, indices, and aliases used to limit the request.
Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`. |
| `active_only?` | `boolean` | If `true`, the response only includes ongoing shard recoveries. |
| `detailed?` | `boolean` | If `true`, the response includes detailed information about shard recoveries. |
| `h?` | [`CatCatRecoveryColumns`](CatCatRecoveryColumns.md) | A comma-separated list of columns names to display.
It supports simple wildcards. |
| `s?` | [`Names`](Names.md) | A comma-separated list of column names or aliases that determines the sort order.
Sorting defaults to ascending and can be changed by setting `:asc`
or `:desc` as a suffix to the column name. |
| `body?` | `string | { [key: string]: any } & { index?: never, active_only?: never, detailed?: never, h?: never, s?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, active_only?: never, detailed?: never, h?: never, s?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
