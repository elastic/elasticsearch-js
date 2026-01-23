# SecurityInvalidateTokenRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `token?` | `string` | An access token.
This parameter cannot be used if any of `refresh_token`, `realm_name`, or `username` are used. |
| `refresh_token?` | `string` | A refresh token.
This parameter cannot be used if any of `refresh_token`, `realm_name`, or `username` are used. |
| `realm_name?` | [`Name`](Name.md) | The name of an authentication realm.
This parameter cannot be used with either `refresh_token` or `token`. |
| `username?` | [`Username`](Username.md) | The username of a user.
This parameter cannot be used with either `refresh_token` or `token`. |
| `body?` | `string | { [key: string]: any } & { token?: never, refresh_token?: never, realm_name?: never, username?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { token?: never, refresh_token?: never, realm_name?: never, username?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
