# `SecurityActivateUserProfileRequest` [interface-SecurityActivateUserProfileRequest]

| Name | Type | Description |
| - | - | - |
| `access_token` | string | The user's Elasticsearch access token or JWT. Both `access` and `id` JWT token types are supported and they depend on the underlying JWT realm configuration. If you specify the `access_token` grant type, this parameter is required. It is not valid with other grant types. |
| `body` | string | ({ [key: string]: any; } & { access_token?: never; grant_type?: never; password?: never; username?: never; }) | All values in `body` will be added to the request body. |
| `grant_type` | [SecurityGrantType](./SecurityGrantType.md) | The type of grant. |
| `password` | string | The user's password. If you specify the `password` grant type, this parameter is required. It is not valid with other grant types. |
| `querystring` | { [key: string]: any; } & { access_token?: never; grant_type?: never; password?: never; username?: never; } | All values in `querystring` will be added to the request querystring. |
| `username` | string | The username that identifies the user. If you specify the `password` grant type, this parameter is required. It is not valid with other grant types. |
