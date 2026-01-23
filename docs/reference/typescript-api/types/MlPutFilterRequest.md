# MlPutFilterRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `filter_id` | [`Id`](Id.md) | A string that uniquely identifies a filter. |
| `description?` | `string` | A description of the filter. |
| `items?` | `string[]` | The items of the filter. A wildcard `*` can be used at the beginning or the end of an item.
Up to 10000 items are allowed in each filter. |
| `body?` | `string | { [key: string]: any } & { filter_id?: never, description?: never, items?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { filter_id?: never, description?: never, items?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
