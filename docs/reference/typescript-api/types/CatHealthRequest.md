# CatHealthRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `ts?` | `boolean` | If true, returns `HH:MM:SS` and Unix epoch timestamps. |
| `h?` | [`CatCatHealthColumns`](CatCatHealthColumns.md) | A comma-separated list of columns names to display. It supports simple wildcards. |
| `s?` | [`Names`](Names.md) | List of columns that determine how the table should be sorted.
Sorting defaults to ascending and can be changed by setting `:asc`
or `:desc` as a suffix to the column name. |
| `body?` | `string | { [key: string]: any } & { ts?: never, h?: never, s?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { ts?: never, h?: never, s?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
