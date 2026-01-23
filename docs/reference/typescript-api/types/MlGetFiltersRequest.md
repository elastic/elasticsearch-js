# MlGetFiltersRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `filter_id?` | [`Ids`](Ids.md) | A string that uniquely identifies a filter. |
| `from?` | [`integer`](integer.md) | Skips the specified number of filters. |
| `size?` | [`integer`](integer.md) | Specifies the maximum number of filters to obtain. |
| `body?` | `string | { [key: string]: any } & { filter_id?: never, from?: never, size?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { filter_id?: never, from?: never, size?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
