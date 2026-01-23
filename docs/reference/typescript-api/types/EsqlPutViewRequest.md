# EsqlPutViewRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Id`](Id.md) | The view name to create or update. |
| `query` | `string` | The ES|QL query string from which to create a view. |
| `body?` | `string | { [key: string]: any } & { name?: never, query?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, query?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
