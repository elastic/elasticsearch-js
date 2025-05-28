# `SecurityGetTokenRequest` [interface-SecurityGetTokenRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { grant_type?: never; scope?: never; password?: never; kerberos_ticket?: never; refresh_token?: never; username?: never; }) | All values in `body` will be added to the request body. |
| `grant_type` | [SecurityGetTokenAccessTokenGrantType](./SecurityGetTokenAccessTokenGrantType.md) | The type of grant. Supported grant types are: `password`, `_kerberos`, `client_credentials`, and `refresh_token`. |
| `kerberos_ticket` | string | The base64 encoded kerberos ticket. If you specify the `_kerberos` grant type, this parameter is required. This parameter is not valid with any other supported grant type. |
| `password` | [Password](./Password.md) | The user's password. If you specify the `password` grant type, this parameter is required. This parameter is not valid with any other supported grant type. |
| `querystring` | { [key: string]: any; } & { grant_type?: never; scope?: never; password?: never; kerberos_ticket?: never; refresh_token?: never; username?: never; } | All values in `querystring` will be added to the request querystring. |
| `refresh_token` | string | The string that was returned when you created the token, which enables you to extend its life. If you specify the `refresh_token` grant type, this parameter is required. This parameter is not valid with any other supported grant type. |
| `scope` | string | The scope of the token. Currently tokens are only issued for a scope of FULL regardless of the value sent with the request. |
| `username` | [Username](./Username.md) | The username that identifies the user. If you specify the `password` grant type, this parameter is required. This parameter is not valid with any other supported grant type. |
