# MlUpdateFilterRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `filter_id` | [`Id`](Id.md) | A string that uniquely identifies a filter. |
| `add_items?` | `string`[] | The items to add to the filter. |
| `description?` | `string` | A description for the filter. |
| `remove_items?` | `string`[] | The items to remove from the filter. |
| `body?` | `string | { [key: string]: any } & { filter_id?: never, add_items?: never, description?: never, remove_items?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { filter_id?: never, add_items?: never, description?: never, remove_items?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
