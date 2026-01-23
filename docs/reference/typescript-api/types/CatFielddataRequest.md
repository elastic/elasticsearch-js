# CatFielddataRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `fields?` | [`Fields`](Fields.md) | Comma-separated list of fields used to limit returned information.
To retrieve all fields, omit this parameter. |
| `h?` | [`CatCatFieldDataColumns`](CatCatFieldDataColumns.md) | A comma-separated list of columns names to display. It supports simple wildcards. |
| `s?` | [`Names`](Names.md) | List of columns that determine how the table should be sorted.
Sorting defaults to ascending and can be changed by setting `:asc`
or `:desc` as a suffix to the column name. |
| `body?` | `string | { [key: string]: any } & { fields?: never, h?: never, s?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { fields?: never, h?: never, s?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
