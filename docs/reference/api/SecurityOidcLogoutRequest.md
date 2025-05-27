## Interface `SecurityOidcLogoutRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { token?: never; refresh_token?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { token?: never; refresh_token?: never; } | All values in `querystring` will be added to the request querystring. |
| `refresh_token` | string | The refresh token to be invalidated. |
| `token` | string | The access token to be invalidated. |
