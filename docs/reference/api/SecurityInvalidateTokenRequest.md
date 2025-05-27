## Interface `SecurityInvalidateTokenRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { token?: never; refresh_token?: never; realm_name?: never; username?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { token?: never; refresh_token?: never; realm_name?: never; username?: never; } | All values in `querystring` will be added to the request querystring. |
| `realm_name` | [Name](./Name.md) | The name of an authentication realm. This parameter cannot be used with either `refresh_token` or `token`. |
| `refresh_token` | string | A refresh token. This parameter cannot be used if any of `refresh_token`, `realm_name`, or `username` are used. |
| `token` | string | An access token. This parameter cannot be used if any of `refresh_token`, `realm_name`, or `username` are used. |
| `username` | [Username](./Username.md) | The username of a user. This parameter cannot be used with either `refresh_token` or `token`. |
