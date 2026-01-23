# SecurityOidcLogoutRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `token` | `string` | The access token to be invalidated. |
| `refresh_token?` | `string` | The refresh token to be invalidated. |
| `body?` | `string | { [key: string]: any } & { token?: never, refresh_token?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { token?: never, refresh_token?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
