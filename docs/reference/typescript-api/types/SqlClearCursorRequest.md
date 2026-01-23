# SqlClearCursorRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `cursor` | `string` | Cursor to clear. |
| `body?` | `string | { [key: string]: any } & { cursor?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { cursor?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
