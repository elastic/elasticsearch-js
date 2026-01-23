# SecuritySamlLogoutRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `token` | `string` | The access token that was returned as a response to calling the SAML authenticate API.
Alternatively, the most recent token that was received after refreshing the original one by using a `refresh_token`. |
| `refresh_token?` | `string` | The refresh token that was returned as a response to calling the SAML authenticate API.
Alternatively, the most recent refresh token that was received after refreshing the original access token. |
| `body?` | `string | { [key: string]: any } & { token?: never, refresh_token?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { token?: never, refresh_token?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
