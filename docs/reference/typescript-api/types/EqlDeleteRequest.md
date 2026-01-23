# EqlDeleteRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | Identifier for the search to delete.
A search ID is provided in the EQL search API's response for an async search.
A search ID is also provided if the request’s `keep_on_completion` parameter is `true`. |
| `body?` | `string | { [key: string]: any } & { id?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
