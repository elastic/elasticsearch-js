# CatNodesRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `full_id?` | `boolean` | If `true`, return the full node ID. If `false`, return the shortened node ID. |
| `include_unloaded_segments?` | `boolean` | If true, the response includes information from segments that are not loaded into memory. |
| `h?` | [`CatCatNodeColumns`](CatCatNodeColumns.md) | A comma-separated list of columns names to display.
It supports simple wildcards. |
| `s?` | [`Names`](Names.md) | A comma-separated list of column names or aliases that determines the sort order.
Sorting defaults to ascending and can be changed by setting `:asc`
or `:desc` as a suffix to the column name. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node. |
| `body?` | `string | { [key: string]: any } & { full_id?: never, include_unloaded_segments?: never, h?: never, s?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { full_id?: never, include_unloaded_segments?: never, h?: never, s?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
