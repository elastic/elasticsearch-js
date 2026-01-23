# CatMlDataFrameAnalyticsRequest

## Interface

### Extends

- [`CatCatRequestBase`](CatCatRequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id?` | [`Id`](Id.md) | The ID of the data frame analytics to fetch |
| `allow_no_match?` | `boolean` | Whether to ignore if a wildcard expression matches no configs.
(This includes `_all` string or when no configs have been specified.) |
| `h?` | [`CatCatDfaColumns`](CatCatDfaColumns.md) | Comma-separated list of column names to display. |
| `s?` | [`CatCatDfaColumns`](CatCatDfaColumns.md) | Comma-separated list of column names or column aliases used to sort the
response. |
| `body?` | `string | { [key: string]: any } & { id?: never, allow_no_match?: never, h?: never, s?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, allow_no_match?: never, h?: never, s?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
